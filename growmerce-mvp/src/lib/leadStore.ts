/*
  Thin client-side lead persistence (Sprint 4).
  localStorage only — NOT a CRM, NO external services, NO backend. Just enough to preserve
  the lead payload (+ diagnostic context) for the handoff and a later real CRM hook.
*/
import type { Lead } from '../types';

const LIST_KEY = 'growmerce_mvp_leads';
const LAST_KEY = 'growmerce_mvp_last_lead';

export interface StoredLead {
  lead: Lead;
  savedAt: string; // ISO
  source: 'mvp_vertical_slice_v1';
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Persist a lead (append to a local list + store as the latest). Returns the stored record. */
export function saveLead(lead: Lead): StoredLead {
  const record: StoredLead = { lead, savedAt: new Date().toISOString(), source: 'mvp_vertical_slice_v1' };
  try {
    const list = safeParse<StoredLead[]>(localStorage.getItem(LIST_KEY), []);
    list.push(record);
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
    localStorage.setItem(LAST_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private mode / SSR) — fail quietly; the in-session handoff still works.
  }
  return record;
}

export function getLeads(): StoredLead[] {
  try {
    return safeParse<StoredLead[]>(localStorage.getItem(LIST_KEY), []);
  } catch {
    return [];
  }
}

export function getLastLead(): StoredLead | null {
  try {
    return safeParse<StoredLead | null>(localStorage.getItem(LAST_KEY), null);
  } catch {
    return null;
  }
}
