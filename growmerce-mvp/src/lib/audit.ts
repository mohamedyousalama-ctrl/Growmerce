/*
  Free Platform Audit intake (human-reviewed lead magnet).

  Submit priority: Supabase Edge Function (submit-report-request) when configured,
  else localStorage draft — the lead is NEVER lost, and WhatsApp handoff always works.
  Files: metadata is always captured; best-effort binary upload via signed URLs
  (create-upload-url Edge Function) when configured — never blocks submission.

  NO AI, NO scraping, NO external data. Files are NOT auto-analyzed — they are stored
  for manual review. The audit report is delivered manually within 2 business days.
*/
import { saveLead } from './leadStore';
import { SUPABASE_CONFIGURED, submitReportRequest } from './api';
import { buildWhatsAppLink } from './whatsapp';
import type { Lead } from '../types';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? '').toString().trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').toString().trim();

export interface AuditFileMeta {
  name: string;
  size: number;
  type: string;
}

/** Full audit draft captured across the 5 steps. */
export interface AuditDraft {
  verticals: string[];        // step 1 (labels)
  platforms: string[];        // step 2 platform names
  links: string[];            // account/store/menu/product links
  competitorLinks: string[];
  metrics: Record<string, string>; // step 3 (all optional)
  mainProblem: string;
  name: string;
  whatsapp: string;
  email: string;
  businessName: string;
  country: string;
  city: string;
  consent: boolean;
}

export interface AuditSubmitResult {
  ok: boolean;
  reportRequestId?: string;
  sink: 'supabase' | 'local';
  filesUploaded: number;
  filesTotal: number;
  error?: string;
}

export const CONSENT_TEXT_AUDIT =
  'أوافق على أن تستخدم جرومرس البيانات والملفات المرسلة لمراجعة طلب التدقيق والتواصل معي بخصوص التقرير.';

const isSheet = (u: string) => /docs\.google\.com\/spreadsheets/i.test(u);

function buildDataSources(d: AuditDraft) {
  const out: Array<Record<string, unknown>> = [];
  for (const url of d.links) {
    const u = url.trim();
    if (!u) continue;
    out.push({
      kind: isSheet(u) ? 'google_sheet' : 'store',
      ownerClass: 'own',
      label: 'رابط حساب',
      url: u,
      observationType: isSheet(u) ? 'sheet_reference' : 'url_submitted',
    });
  }
  for (const url of d.competitorLinks) {
    const u = url.trim();
    if (!u) continue;
    out.push({ kind: 'competitor', ownerClass: 'competitor', label: 'رابط منافس', url: u, observationType: 'url_submitted' });
  }
  return out;
}

function buildPayload(d: AuditDraft, files: AuditFileMeta[]) {
  const lead: Lead = {
    name: d.name,
    businessName: d.businessName,
    whatsapp: d.whatsapp,
    country: [d.country, d.city].filter(Boolean).join(' / '),
    email: d.email,
    contactPermission: d.consent,
    context: {
      channels: d.platforms,
      mainProblem: d.mainProblem,
      provenance: 'user',
    },
  };
  return {
    source: 'free_platform_audit',
    submittedAt: new Date().toISOString(),
    pageUrl: typeof location !== 'undefined' ? location.href : '',
    auditRequest: true,
    mode: 'human_review',
    promisedDelivery: '2_business_days',
    consent: { granted: d.consent, scope: 'audit_review_and_contact', textShown: CONSENT_TEXT_AUDIT },
    lead,
    context: lead.context,
    verticals: d.verticals,
    dataSources: buildDataSources(d),
    manualMetrics: { ...d.metrics, platforms: d.platforms.join(', '), mainProblem: d.mainProblem },
    files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
  };
}

/** Best-effort signed-URL upload (never throws). Returns count uploaded. */
async function uploadFiles(reportRequestId: string, files: File[]): Promise<number> {
  if (!SUPABASE_CONFIGURED || !reportRequestId || files.length === 0) return 0;
  const fnUrl = `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/create-upload-url`;
  let uploaded = 0;
  for (const file of files) {
    try {
      const res = await fetch(fnUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}`, apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ report_request_id: reportRequestId, filename: file.name, contentType: file.type }),
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok || !data.signedUrl) continue;
      const put = await fetch(data.signedUrl as string, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (put.ok) uploaded += 1;
    } catch {
      // skip this file; never block submission
    }
  }
  return uploaded;
}

const DRAFT_KEY = 'growmerce_audit_drafts';

/** Submit the audit: Supabase if configured, else localStorage. Never loses the lead. */
export async function submitAudit(d: AuditDraft, files: File[]): Promise<AuditSubmitResult> {
  const fileMeta: AuditFileMeta[] = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  const payload = buildPayload(d, fileMeta);

  // always keep a local draft (fallback + record); reuse the lead store too
  try {
    const list = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? '[]') as unknown[];
    list.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem(DRAFT_KEY, JSON.stringify(list.slice(-50)));
    saveLead(payload.lead);
  } catch {
    /* private mode — ignore */
  }

  if (!SUPABASE_CONFIGURED) {
    return { ok: true, sink: 'local', filesUploaded: 0, filesTotal: files.length };
  }

  const r = await submitReportRequest(payload);
  if (!r.ok) {
    // backend failed — lead is safe locally; let the UI offer WhatsApp
    return { ok: true, sink: 'local', filesUploaded: 0, filesTotal: files.length, error: r.error };
  }
  const filesUploaded = await uploadFiles(r.reportRequestId ?? '', files);
  return { ok: true, reportRequestId: r.reportRequestId, sink: 'supabase', filesUploaded, filesTotal: files.length };
}

/** WhatsApp link carrying the audit summary (fallback + follow-up). */
export function buildAuditWhatsAppLink(d: AuditDraft, reportRequestId: string | undefined, fileCount: number): string {
  const lines = ['أرسلت طلب تدقيق مجاني وأرغب في متابعة التقرير.'];
  if (reportRequestId) lines.push(`رقم الطلب: ${reportRequestId}`);
  if (d.name) lines.push(`الاسم: ${d.name}`);
  if (d.businessName) lines.push(`النشاط: ${d.businessName}`);
  if (d.verticals.length) lines.push(`النوع: ${d.verticals.join('، ')}`);
  if (d.platforms.length) lines.push(`المنصّات: ${d.platforms.join('، ')}`);
  if (d.mainProblem) lines.push(`المشكلة: ${d.mainProblem}`);
  lines.push(`روابط: ${d.links.filter((l) => l.trim()).length} · ملفات: ${fileCount}`);
  return buildWhatsAppLink(lines.join('\n'));
}
