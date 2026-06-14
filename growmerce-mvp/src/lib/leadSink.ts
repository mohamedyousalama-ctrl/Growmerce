/*
  Lead / report-request submission (Launch Readiness V1 + Real Intelligence Phase 1 Sprint 2).

  Submission priority:
    1) Supabase Edge Function (`submit-report-request`) — when VITE_SUPABASE_* configured.
       Persists contact / business / consent / report_request server-side (service role).
    2) Configured form endpoint (VITE_GROWMERCE_LEAD_ENDPOINT) — JSON POST, if set.
    3) localStorage — always written first as a fallback + in-session record.

  localStorage is written FIRST regardless, so a network/persistence failure never blocks
  the in-session handoff or the WhatsApp deep link. The app stays fully usable when nothing
  is configured (clearly flagged in the UI).

  This is persistence only — NOT a CRM, NO marketplace data, NO AI. The diagnostic is still
  the deterministic demo finding (getDiagnostic).
*/
import { saveLead } from './leadStore';
import { SUPABASE_CONFIGURED, submitReportRequest } from './api';
import type { Lead, StructuredInput } from '../types';

const ENDPOINT = (import.meta.env.VITE_GROWMERCE_LEAD_ENDPOINT ?? '').toString().trim();

/** True when a usable HTTPS form endpoint is configured via env. */
export const LEAD_ENDPOINT_CONFIGURED = /^https:\/\/\S+/i.test(ENDPOINT);

/** True when ANY remote sink (Supabase OR form endpoint) is configured. */
export const LEAD_SINK_CONFIGURED = SUPABASE_CONFIGURED || LEAD_ENDPOINT_CONFIGURED;

/** Verbatim consent copy shown in the lead form (kept in sync with LeadForm). */
export const CONSENT_TEXT_SHOWN =
  'أوافق على مشاركة بيانات نشاطي ووسيلة تواصلي مع جرومرس، وعلى أن تتواصل معي بخصوص هذا التشخيص. لا رسائل مزعجة. ' +
  'هذا التشخيص تجريبي وتوضيحي، دون نتائج مضمونة ولا بيانات أسواق حقيقية بعد.';

export interface LeadSubmitResult {
  /** Lead is safely captured (locally and/or remotely) — the journey may continue. */
  ok: boolean;
  /** localStorage write succeeded (fallback record). */
  storedLocally: boolean;
  /** Reached a configured external sink. */
  sentRemote: boolean;
  /** A remote sink is configured at all. */
  configured: boolean;
  /** Which sink ultimately handled it. */
  sink: 'supabase' | 'endpoint' | 'local';
  /** Supabase report_request id, when persisted there. */
  reportRequestId?: string;
  /** Human-readable reason when a remote send failed. */
  error?: string;
}

export interface SubmitExtras {
  /** Full structured input from the session (for report_requests.structured_input). */
  structuredInput?: StructuredInput;
  /** Snapshot of the demo finding the user saw (for report_requests.current_demo_finding). */
  currentDemoFinding?: unknown;
}

/** A user-submitted source captured for the future Evidence Builder (capture only — no analysis). */
export interface SubmittedSource {
  kind: string;             // website | store | menu | competitor | google_sheet | manual_metrics | other
  ownerClass: string;       // own | competitor | market | user_uploaded | unknown
  label?: string;
  url?: string;
  observationType: string;  // url_submitted | sheet_reference | user_note | manual_metric
  payload?: Record<string, unknown>;
}

const isSheetUrl = (u: string): boolean => /docs\.google\.com\/spreadsheets/i.test(u);

/** Derive normalized data sources from the structured input (URLs, competitors, notes). */
export function buildDataSources(si?: StructuredInput): SubmittedSource[] {
  if (!si) return [];
  const out: SubmittedSource[] = [];
  const links = si.links ?? {};

  const web = links.websiteUrl?.trim();
  if (web) {
    out.push({
      kind: isSheetUrl(web) ? 'google_sheet' : 'website',
      ownerClass: 'own',
      label: 'الموقع',
      url: web,
      observationType: isSheetUrl(web) ? 'sheet_reference' : 'url_submitted',
    });
  }
  const store = links.storeUrl?.trim();
  if (store) out.push({ kind: 'store', ownerClass: 'own', label: 'المتجر', url: store, observationType: 'url_submitted' });
  const menu = links.menuUrl?.trim();
  if (menu) out.push({ kind: 'menu', ownerClass: 'own', label: 'القائمة', url: menu, observationType: 'url_submitted' });

  for (const c of si.competitors ?? []) {
    const name = c.name?.trim();
    if (!name) continue;
    out.push({ kind: 'competitor', ownerClass: 'competitor', label: name, observationType: 'user_note', payload: { name, source: c.source } });
  }

  const note = si.freeText?.trim();
  if (note) out.push({ kind: 'other', ownerClass: 'unknown', label: 'ملاحظة', observationType: 'user_note', payload: { note } });

  return out;
}

export interface LeadPayload {
  source: 'mvp_vertical_slice_v1';
  submittedAt: string; // ISO
  pageUrl: string;
  /** The diagnostic in V1 is demo/illustrative — flagged so no sink treats it as real data. */
  demoDiagnostic: true;
  consent: { granted: boolean; scope: string; textShown: string };
  lead: Lead;
  context?: Lead['context'];
  structuredInput?: unknown;
  currentDemoFinding?: unknown;
  /** Normalized user-submitted sources (capture only — not analyzed yet). */
  dataSources: SubmittedSource[];
}

function buildPayload(lead: Lead, extras?: SubmitExtras): LeadPayload {
  return {
    source: 'mvp_vertical_slice_v1',
    submittedAt: new Date().toISOString(),
    pageUrl: typeof location !== 'undefined' ? location.href : '',
    demoDiagnostic: true,
    consent: {
      granted: lead.contactPermission === true,
      scope: 'contact_about_diagnosis',
      textShown: CONSENT_TEXT_SHOWN,
    },
    lead,
    context: lead.context,
    structuredInput: extras?.structuredInput,
    currentDemoFinding: extras?.currentDemoFinding,
    dataSources: buildDataSources(extras?.structuredInput),
  };
}

/**
 * Persist the lead locally, then send to the highest-priority configured sink.
 * Never throws — returns a status the UI can render as success / fallback / error.
 */
export async function submitLead(lead: Lead, extras?: SubmitExtras): Promise<LeadSubmitResult> {
  // 1) Always persist locally first (fallback + in-session record).
  let storedLocally = false;
  try {
    saveLead(lead);
    storedLocally = true;
  } catch {
    storedLocally = false;
  }

  const configured = LEAD_SINK_CONFIGURED;
  const payload = buildPayload(lead, extras);
  let lastError: string | undefined;

  // 2) Priority 1 — Supabase Edge Function.
  if (SUPABASE_CONFIGURED) {
    const r = await submitReportRequest(payload);
    if (r.ok) {
      return { ok: true, storedLocally, sentRemote: true, configured: true, sink: 'supabase', reportRequestId: r.reportRequestId };
    }
    lastError = r.error;
  }

  // 3) Priority 2 — configured form endpoint.
  if (LEAD_ENDPOINT_CONFIGURED) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return { ok: true, storedLocally, sentRemote: true, configured: true, sink: 'endpoint' };
      }
      lastError = `HTTP ${res.status}`;
    } catch (e) {
      lastError = e instanceof Error ? e.message : 'network error';
    }
  }

  // 4) Local-only outcome (no sink configured, or all configured sinks failed).
  return {
    ok: storedLocally,
    storedLocally,
    sentRemote: false,
    configured,
    sink: 'local',
    error: configured ? lastError : undefined,
  };
}
