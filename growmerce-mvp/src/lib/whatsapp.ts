/*
  WhatsApp handoff helper (Sprint 4–5).
  Deep link only — NO WhatsApp API, NO secrets. Number configured via env
  (VITE_GROWMERCE_WHATSAPP_NUMBER). If unset, the app stays usable in a clearly-flagged demo
  mode (the link opens WhatsApp's contact picker rather than a bogus recipient).
*/
import type { ConfidenceBand } from '../types';

const ENV_NUMBER = (import.meta.env.VITE_GROWMERCE_WHATSAPP_NUMBER ?? '').toString().trim();
const ENV_DIGITS = ENV_NUMBER.replace(/[^\d]/g, '');

/** True when a usable WhatsApp number is configured via env. */
export const WHATSAPP_CONFIGURED = ENV_DIGITS.length >= 8;

/** The configured number (digits) or empty string in demo mode. */
export const GROWMERCE_WHATSAPP = WHATSAPP_CONFIGURED ? ENV_DIGITS : '';

export function buildWhatsAppLink(message: string, phone: string = GROWMERCE_WHATSAPP): string {
  const digits = phone.replace(/[^\d]/g, '');
  // No configured number → open WhatsApp's picker safely (no invalid recipient).
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  'مرحبًا جرومرس، أودّ مراجعة تشخيص نمو مبيعاتي على أرقامي الحقيقية. (تجربة تجريبية)';

const BAND_AR: Record<ConfidenceBand, string> = {
  low: 'منخفضة',
  medium: 'متوسّطة',
  high: 'عالية',
  very_high: 'عالية جدًا',
};

export interface DiagnosticMessageArgs {
  businessName?: string;
  businessTypeLabel?: string;
  channelLabel?: string;
  problemLabel?: string;
  findingTitle?: string;
  opportunityTitle?: string;
  confidenceBand?: ConfidenceBand;
}

/**
 * Concise WhatsApp message carrying the diagnosis context (short enough for WhatsApp,
 * not over-exposing internals). Frame: review/verify on real data.
 */
export function buildDiagnosticMessage(a: DiagnosticMessageArgs): string {
  const lines: string[] = ['مرحبًا جرومرس، أودّ مراجعة تشخيص نمو مبيعاتي على أرقامي الحقيقية.'];
  if (a.businessName) lines.push(`النشاط: ${a.businessName}${a.businessTypeLabel ? ` (${a.businessTypeLabel})` : ''}`);
  else if (a.businessTypeLabel) lines.push(`نوع النشاط: ${a.businessTypeLabel}`);
  if (a.channelLabel) lines.push(`القناة الأساسية: ${a.channelLabel}`);
  if (a.problemLabel) lines.push(`المشكلة: ${a.problemLabel}`);
  if (a.findingTitle) lines.push(`التشخيص المبدئي: ${a.findingTitle}`);
  if (a.opportunityTitle) lines.push(`الفرصة المقترحة: ${a.opportunityTitle}`);
  if (a.confidenceBand) lines.push(`الثقة: ${BAND_AR[a.confidenceBand]}`);
  lines.push('— تجربة تجريبية، والأرقام تُؤكَّد على بياناتي.');
  return lines.join('\n');
}
