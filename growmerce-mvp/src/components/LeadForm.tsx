import { useState, type FormEvent } from 'react';
import type { Lead } from '../types';

/**
 * Lead capture — appears AFTER value is shown (04). Sprint 1 shell: collects the fields and
 * hands them up; persistence is a thin stub in Sprint 4.
 */
export function LeadForm({ onSubmit }: { onSubmit?: (lead: Lead) => void }) {
  const [form, setForm] = useState<Lead>({
    name: '',
    businessName: '',
    whatsapp: '',
    country: '',
    contactPermission: false,
  });

  const set = (patch: Partial<Lead>) => setForm((f) => ({ ...f, ...patch }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="lf-name">الاسم</label>
        <input id="lf-name" value={form.name} onChange={(e) => set({ name: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-biz">اسم النشاط</label>
        <input id="lf-biz" value={form.businessName} onChange={(e) => set({ businessName: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-wa">واتساب / الجوال</label>
        <input id="lf-wa" inputMode="tel" value={form.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-email">البريد الإلكتروني (اختياري)</label>
        <input id="lf-email" type="email" value={form.email ?? ''} onChange={(e) => set({ email: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="lf-country">الدولة</label>
        <input id="lf-country" value={form.country} onChange={(e) => set({ country: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="lf-channel">القناة الرئيسية</label>
        <select
          id="lf-channel"
          value={form.mainChannel ?? ''}
          onChange={(e) => set({ mainChannel: (e.target.value || undefined) as Lead['mainChannel'] })}
        >
          <option value="">—</option>
          <option value="marketplace">متجر سوق (Marketplace)</option>
          <option value="store">متجر إلكتروني</option>
          <option value="delivery">تطبيق توصيل</option>
          <option value="social">تواصل اجتماعي</option>
          <option value="whatsapp">واتساب</option>
        </select>
      </div>

      <label className="permission field--full">
        <input
          type="checkbox"
          checked={form.contactPermission}
          onChange={(e) => set({ contactPermission: e.target.checked })}
        />
        <span>أوافق على أن تتواصل جرومرس معي بخصوص نتائج التشخيص. لا رسائل مزعجة.</span>
      </label>

      <div className="field--full">
        <button type="submit" className="btn btn--primary btn--lg" disabled={!form.contactPermission}>
          أرسل نتائجي وتابع
        </button>
      </div>
    </form>
  );
}
