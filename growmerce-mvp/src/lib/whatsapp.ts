/*
  WhatsApp handoff helper (Sprint 4).
  Deep link only — NO WhatsApp API. Placeholder number until a real one is set.
  Builds a concise, pre-filled Arabic message with just enough diagnostic context.
*/
import type { ConfidenceBand } from '../types';

// Placeholder — replace with the real Growmerce WhatsApp number before launch.
export const GROWMERCE_WHATSAPP = '0000000000';

export function buildWhatsAppLink(message: string, phone: string = GROWMERCE_WHATSAPP): string {
  const digits = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
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
