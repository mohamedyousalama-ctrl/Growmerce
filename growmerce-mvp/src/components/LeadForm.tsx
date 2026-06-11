import { useState, type FormEvent } from 'react';
import { BUSINESS_TYPES } from '../mock/catalog';
import type { BusinessType, ChannelType, Lead } from '../types';

/**
 * Lead capture — appears AFTER value is shown (04). Continues the intelligence journey,
 * not a generic contact form. Prefilled from the session; required vs optional enforced.
 */
export function LeadForm({
  initial,
  onSubmit,
}: {
  initial?: Partial<Lead>;
  onSubmit?: (lead: Lead) => void | Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Lead>({
    name: '',
    businessName: '',
    whatsapp: '',
    country: '',
    businessType: initial?.businessType,
    mainChannel: initial?.mainChannel,
    contactPermission: false,
    email: '',
    role: '',
    websiteUrl: '',
    note: '',
  });

  const set = (patch: Partial<Lead>) => setForm((f) => ({ ...f, ...patch }));

  const valid =
    form.name.trim() !== '' &&
    form.businessName.trim() !== '' &&
    form.whatsapp.trim() !== '' &&
    form.country.trim() !== '' &&
    !!form.businessType &&
    !!form.mainChannel &&
    form.contactPermission;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit?.(form);
    } catch {
      setError('تعذّر إرسال بياناتك الآن. حُفظت محليًا — حاول مرّة أخرى أو تابع عبر واتساب.');
      setSubmitting(false);
    }
  };

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="lf-name">الاسم *</label>
        <input id="lf-name" value={form.name} onChange={(e) => set({ name: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-biz">اسم النشاط *</label>
        <input id="lf-biz" value={form.businessName} onChange={(e) => set({ businessName: e.target.value })} required />
      </div>

      <div className="field">
        <label htmlFor="lf-wa">واتساب / الجوال *</label>
        <input id="lf-wa" inputMode="tel" value={form.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-country">الدولة *</label>
        <input id="lf-country" value={form.country} onChange={(e) => set({ country: e.target.value })} required />
      </div>

      <div className="field">
        <label htmlFor="lf-bt">نوع النشاط *</label>
        <select id="lf-bt" value={form.businessType ?? ''} onChange={(e) => set({ businessType: (e.target.value || undefined) as BusinessType | undefined })} required>
          <option value="">—</option>
          {BUSINESS_TYPES.map((b) => (
            <option key={b.key} value={b.key}>{b.label}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="lf-channel">القناة الأساسية *</label>
        <select id="lf-channel" value={form.mainChannel ?? ''} onChange={(e) => set({ mainChannel: (e.target.value || undefined) as ChannelType | undefined })} required>
          <option value="">—</option>
          <option value="marketplace">سوق إلكتروني (Marketplace)</option>
          <option value="store">متجر إلكتروني</option>
          <option value="delivery">تطبيق توصيل</option>
          <option value="social">تواصل اجتماعي</option>
          <option value="whatsapp">واتساب</option>
        </select>
      </div>

      {/* optional */}
      <div className="field">
        <label htmlFor="lf-email">البريد الإلكتروني (اختياري)</label>
        <input id="lf-email" type="email" value={form.email ?? ''} onChange={(e) => set({ email: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="lf-role">المسمّى / الدور (اختياري)</label>
        <input id="lf-role" value={form.role ?? ''} onChange={(e) => set({ role: e.target.value })} />
      </div>
      <div className="field field--full">
        <label htmlFor="lf-web">رابط الموقع / المتجر (اختياري)</label>
        <input id="lf-web" inputMode="url" placeholder="https://" value={form.websiteUrl ?? ''} onChange={(e) => set({ websiteUrl: e.target.value })} />
      </div>
      <div className="field field--full">
        <label htmlFor="lf-note">ملاحظة (اختياري)</label>
        <textarea id="lf-note" rows={2} value={form.note ?? ''} onChange={(e) => set({ note: e.target.value })} />
      </div>

      <label className="permission field--full">
        <input type="checkbox" checked={form.contactPermission} onChange={(e) => set({ contactPermission: e.target.checked })} />
        <span>
          أوافق على مشاركة بيانات نشاطي ووسيلة تواصلي مع جرومرس، وعلى أن تتواصل معي بخصوص هذا التشخيص.
          لا رسائل مزعجة.
        </span>
      </label>
      <p className="hint consent-note field--full">
        هذا التشخيص <strong>تجريبي وتوضيحي</strong> ولا يجلب بيانات أسواق حقيقية بعد، ودون نتائج مضمونة.
        نستخدم بياناتك للتواصل معك حول هذا التشخيص فقط، ولا نشاركها مع طرف ثالث لأغراض تسويقية.
      </p>

      <div className="field--full">
        <button type="submit" className="btn btn--primary btn--lg" disabled={!valid || submitting}>
          {submitting ? 'جارٍ الإرسال…' : 'أرسل وتابع إلى التسليم ←'}
        </button>
        {!valid && !submitting && (
          <p className="hint" style={{ marginTop: 'var(--space-2)' }}>الحقول المعلّمة بـ * مطلوبة، مع الموافقة على المشاركة والتواصل.</p>
        )}
        {error && (
          <p className="status-note status-note--error" role="alert" style={{ marginTop: 'var(--space-2)' }}>{error}</p>
        )}
      </div>
    </form>
  );
}
