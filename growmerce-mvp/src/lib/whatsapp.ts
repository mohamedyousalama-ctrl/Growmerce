/*
  WhatsApp handoff helper (Sprint 1 placeholder number).
  Builds a wa.me deep link with a pre-filled, context-aware message (04 / 21).
  The real business number + final copy come in a later sprint.
*/

// Placeholder — replace with the real Growmerce WhatsApp number before launch.
export const GROWMERCE_WHATSAPP = '0000000000';

export function buildWhatsAppLink(message: string, phone: string = GROWMERCE_WHATSAPP): string {
  const digits = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  'مرحبًا جرومرس، شخّصت نشاطي ووجدت فرصة — أودّ مراجعتها على أرقامي الحقيقية. (تجربة تجريبية)';
