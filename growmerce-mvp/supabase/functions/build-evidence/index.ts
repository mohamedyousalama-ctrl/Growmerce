// Growmerce Real Intelligence System V1 — Phase 3
// Edge Function: build-evidence
//
// Converts already-captured raw_observations (USER-PROVIDED only) into DRAFT
// evidence_items. NO external fetch, NO AI, NO OCR, NO scraping, NO benchmarks.
// Strength/tier are conservative and rule-assigned. Idempotent: skips an
// observation that already has an evidence_item. Logs an agent_run.
//
// Service-role server-side only. Deploy with verify_jwt=false (internal/admin use;
// protect via secret/allow-list before any real launch).
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("GROWMERCE_ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = ALLOWED_ORIGINS.length === 0
    ? "*"
    : origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}
const isUuid = (v: unknown): v is string =>
  typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

const VALID_SOURCE_TYPES = new Set([
  "website", "store", "menu", "marketplace_listing", "competitor",
  "google_sheet", "upload", "manual_metrics", "user_note", "other",
]);

interface Mapped {
  claim_supported: string;
  relation: string;
  source_type: string;
  extraction_method: string;
  origin_class: string;
  strength: string;
  source_tier: number;
  freshness_class: string;
  confidence_impact: number;
  limitations: string;
  provenance: string;
}

/** Conservative, rule-only mapping. Never claims anything was fetched/verified. */
function mapObservation(obs: any, ds: any): Mapped {
  const dsKind = ds?.kind && VALID_SOURCE_TYPES.has(ds.kind) ? ds.kind : "other";
  const base = {
    extraction_method: "user_provided",
    origin_class: "user",
    provenance: "user",
    freshness_class: "unknown",
  };

  // Competitor takes precedence (detected by the data_source kind).
  if (ds?.kind === "competitor") {
    return {
      ...base,
      claim_supported: "The user identified a competitor or comparable business for future comparison.",
      relation: "contextual",
      source_type: "competitor",
      strength: "weak",
      source_tier: 2,
      confidence_impact: 0,
      limitations: "Competitor reference was provided by the user; no external comparison has been performed yet.",
    };
  }

  switch (obs.observation_type) {
    case "url_submitted":
      return {
        ...base,
        claim_supported: "The user provided a source URL that may support future verification.",
        relation: "contextual",
        source_type: dsKind,
        strength: "weak",
        source_tier: 2,
        confidence_impact: 0,
        limitations: "URL captured but not yet fetched or analyzed.",
      };
    case "sheet_reference":
      return {
        ...base,
        claim_supported: "The user provided a spreadsheet reference for future data extraction.",
        relation: "contextual",
        source_type: "google_sheet",
        strength: "weak",
        source_tier: 2,
        confidence_impact: 0,
        limitations: "Spreadsheet reference captured but not accessed or parsed yet.",
      };
    case "manual_metric":
      return {
        ...base,
        claim_supported: "The user provided manual business metrics for future analysis.",
        relation: "supports",
        source_type: "manual_metrics",
        strength: "moderate",
        source_tier: 1,
        confidence_impact: 4,
        limitations: "Manual metric is user-provided and not independently verified.",
      };
    case "user_note":
    default:
      return {
        ...base,
        claim_supported: "The user provided qualitative context for the diagnostic request.",
        relation: "contextual",
        source_type: "user_note",
        strength: "weak",
        source_tier: 2,
        confidence_impact: 0,
        limitations: "User note is subjective and requires verification.",
      };
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ ok: false, error: "server_not_configured" }, 500, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400, cors); }
  const reportRequestId = body?.report_request_id;
  if (!isUuid(reportRequestId)) return json({ ok: false, error: "report_request_id_required" }, 400, cors);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const startedAt = Date.now();

  // validate report_request + open an agent_run
  const { data: rr } = await supabase
    .from("report_requests")
    .select("id, business_id, contact_id")
    .eq("id", reportRequestId)
    .maybeSingle();
  if (!rr) return json({ ok: false, error: "report_request_not_found" }, 404, cors);

  const { data: run } = await supabase
    .from("agent_runs")
    .insert({
      report_request_id: reportRequestId,
      agent_name: "evidence_builder_v1",
      status: "running",
      input_summary: { report_request_id: reportRequestId },
      started_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  const agentRunId = run?.id ?? null;

  try {
    const { data: observations, error: obsErr } = await supabase
      .from("raw_observations")
      .select("id, data_source_id, observation_type, payload, observed_at")
      .eq("report_request_id", reportRequestId);
    if (obsErr) throw obsErr;

    // data_sources lookup (for kind)
    const { data: sources } = await supabase
      .from("data_sources")
      .select("id, kind, url, label")
      .eq("report_request_id", reportRequestId);
    const sourceById = new Map<string, any>((sources ?? []).map((s: any) => [s.id, s]));

    // existing evidence for idempotency (skip observations already converted)
    const { data: existing } = await supabase
      .from("evidence_items")
      .select("raw_observation_id")
      .eq("report_request_id", reportRequestId);
    const done = new Set<string>((existing ?? []).map((e: any) => e.raw_observation_id).filter(Boolean));

    let created = 0;
    let skipped = 0;

    for (const obs of observations ?? []) {
      if (obs.id && done.has(obs.id)) { skipped += 1; continue; }
      const ds = obs.data_source_id ? sourceById.get(obs.data_source_id) : null;
      const m = mapObservation(obs, ds);

      const { error: insErr } = await supabase.from("evidence_items").insert({
        report_request_id: reportRequestId,
        business_id: rr.business_id,
        contact_id: rr.contact_id,
        data_source_id: obs.data_source_id ?? null,
        raw_observation_id: obs.id,
        claim_supported: m.claim_supported,
        relation: m.relation,
        source_type: m.source_type,
        extraction_method: m.extraction_method,
        origin_class: m.origin_class,
        value_signals: obs.payload ?? {},
        raw_excerpt: ds?.url ?? ds?.label ?? null,
        proof_ref: null,
        strength: m.strength,
        source_tier: m.source_tier,
        freshness_at: null,
        freshness_class: m.freshness_class,
        confidence_impact: m.confidence_impact,
        limitations: m.limitations,
        provenance: m.provenance,
        status: "draft",
      });
      if (insErr) { skipped += 1; continue; }
      created += 1;
    }

    await supabase.from("agent_runs").update({
      status: "succeeded",
      output_summary: { evidence_created: created, evidence_skipped: skipped },
      latency_ms: Date.now() - startedAt,
      finished_at: new Date().toISOString(),
    }).eq("id", agentRunId);

    return json({
      ok: true,
      report_request_id: reportRequestId,
      evidence_created: created,
      evidence_skipped: skipped,
      agent_run_id: agentRunId,
      status: "succeeded",
    }, 200, cors);
  } catch (e) {
    await supabase.from("agent_runs").update({
      status: "failed",
      error: e instanceof Error ? e.message : "evidence_build_failed",
      latency_ms: Date.now() - startedAt,
      finished_at: new Date().toISOString(),
    }).eq("id", agentRunId);
    return json({ ok: false, error: e instanceof Error ? e.message : "evidence_build_failed", agent_run_id: agentRunId, status: "failed" }, 500, cors);
  }
});
