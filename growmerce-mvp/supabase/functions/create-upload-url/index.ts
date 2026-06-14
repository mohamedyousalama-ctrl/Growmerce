// Growmerce — Edge Function: create-upload-url
//
// Returns a short-lived SIGNED UPLOAD URL for the PRIVATE `report-uploads` bucket so
// the frontend can PUT a file WITHOUT any public storage policy and WITHOUT the service
// role key ever reaching the client. The signed URL is created server-side with the
// service role. Files are stored for MANUAL review — never auto-analyzed.
//
// POST { report_request_id, filename, contentType }  →  { ok, path, token, signedUrl }
//
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = (Deno.env.get("GROWMERCE_ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);
const BUCKET = "report-uploads";
const ALLOWED_EXT = ["pdf", "png", "jpg", "jpeg", "csv", "xls", "xlsx", "doc", "docx"];

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
const safeName = (s: string) => s.replace(/[^\w.\-]+/g, "_").slice(0, 120);

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ ok: false, error: "server_not_configured" }, 500, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400, cors); }
  const reportRequestId = body?.report_request_id;
  const filename = typeof body?.filename === "string" ? body.filename : "";
  if (!isUuid(reportRequestId)) return json({ ok: false, error: "report_request_id_required" }, 400, cors);
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (!filename || !ALLOWED_EXT.includes(ext)) return json({ ok: false, error: "unsupported_file_type" }, 400, cors);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const path = `${reportRequestId}/${Date.now()}_${safeName(filename)}`;

  try {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error || !data) throw error ?? new Error("signed_url_failed");

    // best-effort: record the storage path on the matching uploaded_files row
    await supabase
      .from("uploaded_files")
      .update({ storage_path: path, upload_status: "uploaded" })
      .eq("report_request_id", reportRequestId)
      .eq("original_filename", filename);

    return json({ ok: true, path, token: data.token, signedUrl: data.signedUrl }, 200, cors);
  } catch (e) {
    return json({ ok: false, error: e instanceof Error ? e.message : "signed_url_failed" }, 500, cors);
  }
});
