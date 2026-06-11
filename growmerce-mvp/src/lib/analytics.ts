/*
  Lightweight client-side funnel event logger (Sprint 5).
  NO external analytics service / NO dependencies. Dev: console. Always: a capped
  localStorage event log that a real analytics sink can later replace via this same `track()`.
*/

export type GmEvent =
  | 'recognition_card_clicked'
  | 'diagnostic_started'
  | 'business_type_selected'
  | 'minimum_input_completed'
  | 'diagnostic_result_viewed'
  | 'evidence_opened'
  | 'opportunity_viewed'
  | 'lead_submitted'
  | 'whatsapp_clicked';

export interface TrackedEvent {
  event: GmEvent;
  props?: Record<string, unknown>;
  at: string; // ISO
}

const KEY = 'growmerce_mvp_events';
const CAP = 200;

export function track(event: GmEvent, props?: Record<string, unknown>): void {
  const rec: TrackedEvent = { event, props, at: new Date().toISOString() };
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[gm:event]', event, props ?? '');
  }
  try {
    const raw = localStorage.getItem(KEY);
    const list: TrackedEvent[] = raw ? (JSON.parse(raw) as TrackedEvent[]) : [];
    list.push(rec);
    localStorage.setItem(KEY, JSON.stringify(list.slice(-CAP)));
  } catch {
    // storage unavailable — events are best-effort only
  }
}

export function getEvents(): TrackedEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as TrackedEvent[]) : [];
  } catch {
    return [];
  }
}

export function clearEvents(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
