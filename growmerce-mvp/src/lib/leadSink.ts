/*
  Lead submission (Launch Readiness V1).

  Sends a captured lead — WITH its diagnostic context — to a single, operator-configured
  HTTPS endpoint (VITE_GROWMERCE_LEAD_ENDPOINT). That endpoint can be any of:
    • a form-endpoint service (Formspree / Web3Forms / Basin / Formspark)
    • a serverless function (Netlify / Vercel / Cloudflare)
    • a Google Apps Script web app (Sheets sink)
    • a Supabase REST insert URL (with its own headers configured server-side)

  The app only POSTs JSON — NO vendor SDK, NO secrets in source, NO backend here.
  localStorage is always written first as a fallback + in-session record. If no endpoint
  is configured, the app stays fully usable in a clearly-flagged local-only mode.

  This is NOT a CRM and does NOT fetch real marketplace data — the diagnostic is still demo.
*/
import { saveLead } from './leadStore';
import type { Lead } from '../types';

const ENDPOINT = (import.meta.env.VITE_GROWMERCE_LEAD_ENDPOINT ?? '').toString().trim();

/** True when a usable HTTPS lead endpoint is configured via env. */
export const LEAD_SINK_CONFIGURED = /^https:\/\/\S+/i.test(ENDPOINT);

export interface LeadSubmitResult {
  /** Lead is safely captured (locally and/or remotely) — the journey may continue. */
  ok: boolean;
  /** localStorage write succeeded (fallback record). */
  storedLocally: boolean;
  /** Reached the configured external sink. */
  sentRemote: boolean;
  /** An external sink endpoint is configured at all. */
  configured: boolean;
  /** Human-readable reason when the remote send failed. */
  error?: string;
}

export interface LeadPayload {
  source: 'mvp_vertical_slice_v1';
  submittedAt: string; // ISO
  pageUrl: string;
  /** The diagnostic in V1 is demo/illustrative — flagged so the sink never treats it as real data. */
  demoDiagnostic: true;
  lead: Lead;
  context?: Lead['context'];
}

/**
 * Persist the lead locally, then (if an endpoint is configured) POST it to the real sink.
 * Never throws — returns a status the UI can render as success/error. The local fallback
 * means a network failure never blocks the in-session handoff.
 */
export async function submitLead(lead: Lead): Promise<LeadSubmitResult> {
  // 1) Always persist locally first (fallback + in-session record).
  let storedLocally = false;
  try {
    saveLead(lead);
    storedLocally = true;
  } catch {
    storedLocally = false;
  }

  // 2) No sink configured → local-only success (clearly a fallback).
  if (!LEAD_SINK_CONFIGURED) {
    return { ok: storedLocally, storedLocally, sentRemote: false, configured: false };
  }

  // 3) POST the lead + diagnostic context to the configured endpoint.
  const payload: LeadPayload = {
    source: 'mvp_vertical_slice_v1',
    submittedAt: new Date().toISOString(),
    pageUrl: typeof location !== 'undefined' ? location.href : '',
    demoDiagnostic: true,
    lead,
    context: lead.context,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return {
        ok: storedLocally, // local fallback still holds the lead
        storedLocally,
        sentRemote: false,
        configured: true,
        error: `HTTP ${res.status}`,
      };
    }
    return { ok: true, storedLocally, sentRemote: true, configured: true };
  } catch (e) {
    return {
      ok: storedLocally,
      storedLocally,
      sentRemote: false,
      configured: true,
      error: e instanceof Error ? e.message : 'network error',
    };
  }
}
