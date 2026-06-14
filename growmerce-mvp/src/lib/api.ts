/*
  Supabase client edge (Real Intelligence System — Phase 1, Sprint 2).

  Thin, dependency-free wrapper that POSTs a submission to the `submit-report-request`
  Edge Function. The function (server-side, service-role) persists contact / business /
  consent / report_request past deny-by-default RLS.

  SECURITY: only the PUBLIC, RLS-guarded anon key is used here. The Supabase
  service_role key (and any future agent/LLM keys) must NEVER appear in a VITE_ var
  or the client bundle — they live only in Edge Function secrets.

  This is persistence only. No intelligence is generated here; the report stays
  `queued`. The MVP still shows the deterministic/demo finding via getDiagnostic.
*/
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? '').toString().trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').toString().trim();

/** True when a usable Supabase URL + anon key are configured via env. */
export const SUPABASE_CONFIGURED =
  /^https:\/\/\S+/i.test(SUPABASE_URL) && SUPABASE_ANON_KEY.length >= 20;

const FUNCTION_URL = SUPABASE_CONFIGURED
  ? `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/submit-report-request`
  : '';

export interface ReportRequestResult {
  ok: boolean;
  contactId?: string;
  businessId?: string;
  reportRequestId?: string;
  status?: string;
  error?: string;
}

/** POST a submission payload to the Edge Function. Never throws — returns a status. */
export async function submitReportRequest(payload: unknown): Promise<ReportRequestResult> {
  if (!SUPABASE_CONFIGURED) return { ok: false, error: 'supabase_not_configured' };
  try {
    const res = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // anon key authorizes the function call (verify_jwt is off for this public endpoint)
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok || data.ok !== true) {
      return { ok: false, error: (data.error as string) || `HTTP ${res.status}` };
    }
    return {
      ok: true,
      contactId: data.contact_id as string | undefined,
      businessId: data.business_id as string | undefined,
      reportRequestId: data.report_request_id as string | undefined,
      status: data.status as string | undefined,
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network error' };
  }
}
