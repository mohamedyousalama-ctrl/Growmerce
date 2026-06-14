// Growmerce Real Intelligence System V1 — Phase 7 (optional)
// Edge Function: run-real-intelligence-pipeline
//
// Orchestrator STUB. Calls the safe INTERNAL functions in order:
//   1) build-evidence   2) compose-report   3) run-daily-snapshot
// All three are our own Edge Functions in the SAME project (internal calls, not
// third-party APIs). NO external website fetching, NO AI/LLM, NO publication, NO
// customer notification. Logs an agent_run for the orchestrator.
//
// Service-role server-side only. POST { "report_request_id": "<uuid>" }.
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

/** Call one of our own Edge Functions (internal). Never throws. */
async function callFn(name: string, payload: unknown): Promise<any> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        apikey: SERVICE_ROLE_KEY,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { http_status: res.status, ...data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "call_failed" };
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

  const { data: rr } = await supabase.from("report_requests").select("id, business_id").eq("id", reportRequestId).maybeSingle();
  if (!rr) return json({ ok: false, error: "report_request_not_found" }, 404, cors);

  const { data: run } = await supabase.from("agent_runs").insert({
    report_request_id: reportRequestId, agent_name: "orchestrator_v1", status: "running",
    input_summary: { report_request_id: reportRequestId }, started_at: new Date().toISOString(),
  }).select("id").single();
  const agentRunId = run?.id ?? null;

  // 1) evidence  2) report  3) snapshot — sequential, best-effort.
  const evidence = await callFn("build-evidence", { report_request_id: reportRequestId });
  const report = await callFn("compose-report", { report_request_id: reportRequestId });
  const snapshot = rr.business_id
    ? await callFn("run-daily-snapshot", { business_id: rr.business_id, report_request_id: reportRequestId })
    : { ok: false, error: "no_business_id" };

  const summary = {
    evidence_created: evidence?.evidence_created ?? null,
    report_id: report?.report_id ?? null,
    report_status: report?.status ?? null,
    validation_status: report?.validation_status ?? null,
    snapshot_id: snapshot?.snapshot_id ?? null,
    alerts_created: snapshot?.alerts_created ?? null,
  };

  await supabase.from("agent_runs").update({
    status: "succeeded", output_summary: summary,
    latency_ms: Date.now() - startedAt, finished_at: new Date().toISOString(),
  }).eq("id", agentRunId);

  // Orchestrator does NOT publish and does NOT notify the customer.
  return json({
    ok: true,
    report_request_id: reportRequestId,
    agent_run_id: agentRunId,
    steps: { evidence, report, snapshot },
    summary,
    published: false,
  }, 200, cors);
});
