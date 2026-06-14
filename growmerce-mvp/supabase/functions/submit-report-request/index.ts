// Growmerce Real Intelligence System V1 — Phase 1, Sprint 2
// Edge Function: submit-report-request
//
// Public, controlled-demo submission endpoint. The FRONTEND calls this with the
// anon key; this function writes with the SERVICE ROLE key (server-side only,
// never shipped to the client) so it can insert past deny-by-default RLS.
//
// Doctrine: this only PERSISTS what the user submitted + the demo finding they
// saw. It does NOT generate intelligence. The report stays `queued` for a future
// (human-reviewed) pipeline. No AI, no agents, no marketplace data here.
//
// Deploy:  supabase functions deploy submit-report-request
// Secrets: supabase secrets set SUPABASE_SERVICE_ROLE_KEY=... GROWMERCE_ALLOWED_ORIGINS=...
//   (SUPABASE_URL is injected automatically into Edge Functions.)
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("GROWMERCE_ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MAX_BYTES = 256 * 1024; // 256 KB payload ceiling

function corsHeaders(origin: string | null): Record<string, string> {
  // If no allow-list is configured (controlled demo), reflect any origin. Once
  // GROWMERCE_ALLOWED_ORIGINS is set, only those origins are echoed.
  const allow =
    ALLOWED_ORIGINS.length === 0
      ? "*"
      : origin && ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

const trim = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const normPhone = (v: unknown): string => trim(v).replace(/[^\d]/g, "");
const normEmail = (v: unknown): string => trim(v).toLowerCase();
const clip = (v: unknown, n = 2000): string => trim(v).slice(0, n);

// Allowed enums (mirror the CHECK constraints) — unknown values are coerced to safe defaults.
const KINDS = new Set([
  "website", "store", "menu", "marketplace_listing", "competitor",
  "google_sheet", "upload", "manual_metrics", "other",
]);
const OWNERS = new Set(["own", "competitor", "market", "user_uploaded", "unknown"]);
const OBS_TYPES = new Set(["url_submitted", "file_uploaded", "manual_metric", "sheet_reference", "user_note"]);
const MAX_SOURCES = 50; // capture-only guard

const kindOf = (v: unknown): string => (KINDS.has(trim(v)) ? trim(v) : "other");
const ownerOf = (v: unknown): string => (OWNERS.has(trim(v)) ? trim(v) : "unknown");
const obsOf = (v: unknown): string => (OBS_TYPES.has(trim(v)) ? trim(v) : "user_note");

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json({ ok: false, error: "server_not_configured" }, 500, cors);
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BYTES) return json({ ok: false, error: "payload_too_large" }, 413, cors);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400, cors);
  }

  const lead = body?.lead ?? {};
  const context = body?.context ?? {};
  const consent = body?.consent ?? {};

  // ---- validation (do not trust client status/ids) ----
  const name = clip(lead.name, 200);
  const whatsapp = normPhone(lead.whatsapp);
  const businessName = clip(lead.businessName, 200);
  if (!name) return json({ ok: false, error: "name_required" }, 400, cors);
  if (whatsapp.length < 8) return json({ ok: false, error: "whatsapp_required" }, 400, cors);
  if (!businessName) return json({ ok: false, error: "business_name_required" }, 400, cors);
  if (lead.contactPermission !== true) return json({ ok: false, error: "consent_required" }, 400, cors);

  const email = lead.email ? normEmail(lead.email) : null;
  const country = clip(lead.country, 120) || null;
  const role = clip(lead.role, 120) || null;
  const businessType = clip(lead.businessType, 60) || clip(context.businessType, 60) || null;
  const primaryChannel = clip(lead.mainChannel, 60) || null;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    // 1) contact — upsert by whatsapp (simple V1 dedupe)
    let contactId: string | null = null;
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("whatsapp", whatsapp)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      contactId = existing.id;
      await supabase
        .from("contacts")
        .update({ name, email, country, role, source: clip(body?.source, 80) || "mvp_vertical_slice_v1" })
        .eq("id", contactId);
    } else {
      const { data: inserted, error } = await supabase
        .from("contacts")
        .insert({ name, whatsapp, email, country, role, source: clip(body?.source, 80) || "mvp_vertical_slice_v1" })
        .select("id")
        .single();
      if (error) throw error;
      contactId = inserted.id;
    }

    // 2) business — linked to contact
    const { data: business, error: bErr } = await supabase
      .from("businesses")
      .insert({
        contact_id: contactId,
        name: businessName,
        business_type: businessType,
        primary_channel: primaryChannel,
        channels: Array.isArray(context.channels) ? context.channels : [],
        country,
        metadata: {
          websiteUrl: clip(lead.websiteUrl, 500) || null,
          note: clip(lead.note, 2000) || null,
        },
      })
      .select("id")
      .single();
    if (bErr) throw bErr;
    const businessId = business.id;

    // 3) consent record — exact text shown + request metadata
    await supabase.from("consent_records").insert({
      contact_id: contactId,
      business_id: businessId,
      scope: clip(consent.scope, 120) || "contact_about_diagnosis",
      text_shown: clip(consent.textShown, 4000) || null,
      granted_at: new Date().toISOString(),
      ip_address: (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || null,
      user_agent: clip(req.headers.get("user-agent"), 500) || null,
    });

    // 4) report_request — queued for the future (human-reviewed) pipeline
    const { data: rr, error: rErr } = await supabase
      .from("report_requests")
      .insert({
        business_id: businessId,
        contact_id: contactId,
        mode: "auto_draft",
        status: "queued", // server-owned; client status is never trusted
        submitted_payload: body ?? {},
        structured_input: body?.structuredInput ?? {},
        current_demo_finding: body?.currentDemoFinding ?? null,
        priority: "normal",
      })
      .select("id, status")
      .single();
    if (rErr) throw rErr;
    const reportRequestId = rr.id;

    // 5) data sources + raw observations (CAPTURE ONLY — no fetch/extract/parse).
    // Best-effort: a source failure never fails the core submission.
    let sourcesStored = 0;
    const incoming: any[] = Array.isArray(body?.dataSources) ? body.dataSources.slice(0, MAX_SOURCES) : [];

    // optional manual metrics object → its own source
    if (body?.manualMetrics && typeof body.manualMetrics === "object") {
      incoming.push({
        kind: "manual_metrics",
        ownerClass: "own",
        label: "مقاييس يدوية",
        observationType: "manual_metric",
        payload: body.manualMetrics,
      });
    }

    for (const s of incoming) {
      try {
        const url = clip(s?.url, 1000) || null;
        const label = clip(s?.label, 300) || null;
        const sourcePayload = (s?.payload && typeof s.payload === "object") ? s.payload : {};

        const { data: ds, error: dsErr } = await supabase
          .from("data_sources")
          .insert({
            report_request_id: reportRequestId,
            business_id: businessId,
            contact_id: contactId,
            kind: kindOf(s?.kind),
            label,
            url,
            owner_class: ownerOf(s?.ownerClass),
            status: "submitted",
            freshness_class: "unknown",
            metadata: sourcePayload,
          })
          .select("id")
          .single();
        if (dsErr) throw dsErr;

        await supabase.from("raw_observations").insert({
          report_request_id: reportRequestId,
          data_source_id: ds.id,
          observation_type: obsOf(s?.observationType),
          payload: { url, label, ...sourcePayload },
          extraction_method: "user_provided",
          freshness_class: "unknown",
          limitations: "Submitted by user; not extracted, fetched, or verified.",
        });
        sourcesStored += 1;
      } catch {
        // skip this source; keep going
      }
    }

    return json(
      {
        ok: true,
        contact_id: contactId,
        business_id: businessId,
        report_request_id: reportRequestId,
        status: rr.status,
        sources_stored: sourcesStored,
      },
      200,
      cors,
    );
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : "persist_failed" }, 500, cors);
  }
});
