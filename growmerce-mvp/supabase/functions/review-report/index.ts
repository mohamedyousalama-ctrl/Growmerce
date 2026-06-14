// Growmerce Real Intelligence System V1 — Phase 5
// Edge Function: review-report
//
// Human review GATE for real reports. Records a review decision and transitions
// the report status. PUBLISH is only allowed when validation_status = 'passed'.
//
// INTERNAL SKELETON ONLY. Service-role server-side. This sprint does NOT implement
// reviewer auth — production MUST require authenticated reviewers and protect this
// endpoint (secret / allow-list / network rules) before any real launch.
//
// POST { "report_id": "<uuid>", "action": "approve|edit|return_for_more_data|reject|publish",
//        "notes": "...", "edited_finding": { } }
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

const ACTIONS = new Set(["approve", "edit", "return_for_more_data", "reject", "publish"]);

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ ok: false, error: "server_not_configured" }, 500, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400, cors); }
  const reportId = body?.report_id;
  const action = body?.action;
  if (!isUuid(reportId)) return json({ ok: false, error: "report_id_required" }, 400, cors);
  if (!ACTIONS.has(action)) return json({ ok: false, error: "invalid_action" }, 400, cors);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: report } = await supabase
    .from("reports").select("id, report_request_id, status, validation_status, finding").eq("id", reportId).maybeSingle();
  if (!report) return json({ ok: false, error: "report_not_found" }, 404, cors);

  // Determine the resulting status + any update.
  const update: Record<string, unknown> = {};
  let diff: Record<string, unknown> = {};
  let resultStatus = report.status;

  switch (action) {
    case "approve":
      update.status = "approved"; resultStatus = "approved"; break;
    case "return_for_more_data":
      update.status = "returned_for_more_data"; resultStatus = "returned_for_more_data"; break;
    case "reject":
      update.status = "rejected"; resultStatus = "rejected"; break;
    case "edit":
      if (body?.edited_finding && typeof body.edited_finding === "object") {
        diff = { from: report.finding, to: body.edited_finding };
        update.finding = body.edited_finding;
      }
      update.status = "in_review"; resultStatus = "in_review"; break;
    case "publish":
      if (report.validation_status !== "passed") {
        return json({ ok: false, error: "validation_not_passed", validation_status: report.validation_status }, 409, cors);
      }
      update.status = "published"; update.published_at = new Date().toISOString(); resultStatus = "published"; break;
  }

  try {
    if (Object.keys(update).length > 0) {
      const { error: upErr } = await supabase.from("reports").update(update).eq("id", reportId);
      if (upErr) throw upErr;
    }

    const { data: review, error: rvErr } = await supabase.from("report_reviews").insert({
      report_id: reportId,
      report_request_id: report.report_request_id,
      reviewer_id: isUuid(body?.reviewer_id) ? body.reviewer_id : null,
      action,
      notes: typeof body?.notes === "string" ? body.notes.slice(0, 4000) : null,
      diff,
      decided_at: new Date().toISOString(),
    }).select("id").single();
    if (rvErr) throw rvErr;

    return json({ ok: true, report_id: reportId, action, status: resultStatus, review_id: review.id }, 200, cors);
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : "review_failed" }, 500, cors);
  }
});
