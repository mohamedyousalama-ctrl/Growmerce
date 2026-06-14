// Growmerce Real Intelligence System V1 — Phase 6
// Edge Function: run-daily-snapshot
//
// Builds a point-in-time snapshot from INTERNAL state only (data_sources,
// evidence_items, reports). NO external fetch, NO scraping, NO customer
// notifications. Compares to the previous snapshot and raises INTERNAL alerts
// (status 'new') for internal state changes only. Cron is NOT wired here.
//
// Service-role server-side only. POST { "business_id": "<uuid>", "report_request_id": "<uuid>"? }.
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("GROWMERCE_ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = ALLOWED_ORIGINS.length === 0 ? "*" : origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
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

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ ok: false, error: "server_not_configured" }, 500, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400, cors); }
  const businessId = body?.business_id;
  const reportRequestId = isUuid(body?.report_request_id) ? body.report_request_id : null;
  if (!isUuid(businessId)) return json({ ok: false, error: "business_id_required" }, 400, cors);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: business } = await supabase.from("businesses").select("id").eq("id", businessId).maybeSingle();
  if (!business) return json({ ok: false, error: "business_not_found" }, 404, cors);

  try {
    // ---- gather INTERNAL state (counts only; no external calls) ----
    const dsQ = supabase.from("data_sources").select("id", { count: "exact", head: true }).eq("business_id", businessId);
    const evQ = supabase.from("evidence_items").select("id", { count: "exact", head: true }).eq("business_id", businessId);
    const [{ count: dataSourcesCount }, { count: evidenceCount }] = await Promise.all([dsQ, evQ]);

    const { data: reports } = await supabase
      .from("reports").select("id, status, validation_status").eq("business_id", businessId);
    const reportsCount = reports?.length ?? 0;
    const inReviewCount = (reports ?? []).filter((r: any) => r.status === "in_review").length;

    const payload = {
      data_sources_count: dataSourcesCount ?? 0,
      evidence_count: evidenceCount ?? 0,
      reports_count: reportsCount,
      in_review_count: inReviewCount,
      captured_at: new Date().toISOString(),
    };

    // ---- previous snapshot for diff ----
    const { data: prevRows } = await supabase
      .from("daily_snapshots").select("payload").eq("business_id", businessId)
      .order("captured_at", { ascending: false }).limit(1);
    const prev = prevRows && prevRows[0] ? (prevRows[0].payload as any) : null;

    const diff = prev ? {
      data_sources_delta: payload.data_sources_count - (prev.data_sources_count ?? 0),
      evidence_delta: payload.evidence_count - (prev.evidence_count ?? 0),
      reports_delta: payload.reports_count - (prev.reports_count ?? 0),
    } : { first_snapshot: true };

    // ---- store snapshot ----
    const { data: snap, error: snapErr } = await supabase.from("daily_snapshots").insert({
      business_id: businessId, report_request_id: reportRequestId,
      payload, diff_from_prev: diff, freshness_class: "recent",
    }).select("id").single();
    if (snapErr) throw snapErr;

    // ---- INTERNAL alerts for state changes (never sent to customers) ----
    const alertsToCreate: Array<{ rule: string; severity: string; title: string; message: string }> = [];
    if (prev) {
      if (payload.evidence_count > (prev.evidence_count ?? 0))
        alertsToCreate.push({ rule: "evidence_created_since_last", severity: "medium", title: "أدلّة جديدة", message: "أُنشئت أدلّة جديدة منذ آخر لقطة." });
      if (payload.data_sources_count > (prev.data_sources_count ?? 0))
        alertsToCreate.push({ rule: "new_data_source", severity: "low", title: "مصدر بيانات جديد", message: "أُضيف مصدر بيانات جديد." });
    }
    if (inReviewCount > 0 && (!prev || inReviewCount > (prev.in_review_count ?? 0)))
      alertsToCreate.push({ rule: "report_ready_for_review", severity: "medium", title: "تقرير جاهز للمراجعة", message: "هناك تقرير بانتظار المراجعة البشرية." });
    if (reportsCount > 0)
      alertsToCreate.push({ rule: "missing_data_unresolved", severity: "low", title: "بيانات ناقصة", message: "ما زالت هناك بيانات ناقصة تحدّ من الثقة." });

    let alertsCreated = 0;
    if (alertsToCreate.length > 0) {
      const { error: alErr } = await supabase.from("alerts").insert(
        alertsToCreate.map((a) => ({
          business_id: businessId, report_request_id: reportRequestId,
          rule: a.rule, severity: a.severity, status: "new", title: a.title, message: a.message,
        })),
      );
      if (!alErr) alertsCreated = alertsToCreate.length;
    }

    return json({ ok: true, business_id: businessId, snapshot_id: snap.id, payload, diff, alerts_created: alertsCreated, status: "succeeded" }, 200, cors);
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : "snapshot_failed" }, 500, cors);
  }
});
