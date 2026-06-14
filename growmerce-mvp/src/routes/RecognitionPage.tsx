import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { PlatformVerticals } from '../components/PlatformVerticals';
import { RevenueLeakPains } from '../components/RevenueLeakPains';
import { AuditProofPreview } from '../components/AuditProofPreview';
import { GrowthOpsProcess } from '../components/GrowthOpsProcess';
import { ServicePackagesSection } from '../components/ServicePackagesSection';
import { useSession } from '../state/session';
import { track } from '../lib/analytics';
import { platformById, type Vertical } from '../knowledge';
import type { BusinessType } from '../types';

const VERT_TO_BT: Record<Vertical, BusinessType> = {
  ecommerce: 'marketplace_seller',
  food_delivery: 'restaurant',
  qcommerce: 'retail',
};
const QUICK_PLATFORMS = ['amazon', 'noon', 'jumia', 'talabat', 'hungerstation', 'jahez', 'keeta', 'keemart'];

/** `/` — active Commerce Intelligence entry: feel the problem → start a free platform audit. */
export function RecognitionPage() {
  const navigate = useNavigate();
  const { goTo, setInput } = useSession();
  const [entryUrl, setEntryUrl] = useState('');

  const go = (opts?: { vertical?: Vertical; platform?: string; url?: string }) => {
    track('diagnostic_started', { from: opts?.platform ? 'hero_platform' : opts?.vertical ? 'vertical' : 'hero' });
    const patch: Parameters<typeof setInput>[0] = {};
    if (opts?.vertical) {
      patch.platformVertical = opts.vertical;
      patch.businessType = VERT_TO_BT[opts.vertical];
    }
    if (opts?.platform) patch.platformMetrics = { platforms: opts.platform };
    if (opts?.url?.trim()) patch.links = { storeUrl: opts.url.trim() }; // captured, NOT analyzed
    if (Object.keys(patch).length) setInput(patch);
    goTo('input');
    navigate('/diagnose');
  };
  const startPlatform = (id: string) => {
    const p = platformById(id);
    go({ vertical: p?.vertical, platform: p?.name });
  };

  return (
    <Shell>
      <div className="container">
        {/* ---------- HERO ---------- */}
        <section className="home-hero">
          <div>
            <span className="home-hero__eyebrow">تشغيل حساباتك على المنصات — لا حملات فقط</span>
            <h1 className="home-hero__title">نجد أين تتسرّب مبيعاتك على المنصات — ثم نشغّل الإصلاح.</h1>
            <p className="home-hero__body">
              تدقيق وتشغيل لحسابات المطاعم، المتاجر، والعلامات التجارية عبر Amazon وNoon وTalabat وHungerStation
              وKeeta وJumia ومنصات التجارة السريعة.
            </p>

            {/* active diagnostic entry */}
            <div className="hero-entry">
              <p className="hero-entry__title">الصق رابط حسابك أو اختر منصة للبدء</p>
              <div className="hero-entry__row">
                <input
                  className="hero-entry__input"
                  inputMode="url"
                  placeholder="رابط حسابك على Noon / Talabat / Amazon…"
                  value={entryUrl}
                  onChange={(e) => setEntryUrl(e.target.value)}
                  aria-label="رابط حسابك على المنصة"
                />
                <button type="button" className="btn btn--primary" onClick={() => go({ url: entryUrl })}>
                  ابدأ التدقيق المجاني
                </button>
              </div>
              <div className="hero-entry__chips">
                {QUICK_PLATFORMS.map((id) => (
                  <button key={id} type="button" className="platform-chip platform-chip--btn" onClick={() => startPlatform(id)}>
                    {platformById(id)?.name}
                  </button>
                ))}
              </div>
              <p className="hero-entry__journey hint">
                اختر المنصة ← أجب على ٥ أسئلة ← استلم تقرير تدقيق أوّلي ← ناقش الإصلاح على واتساب
              </p>
              <p className="hint">نقطة بداية للتدقيق — لا يتم تحليل الرابط آليًا بعد (وضع تجريبي).</p>
            </div>

            <div className="home-hero__cta">
              <button type="button" className="btn btn--lg" onClick={() => go()}>اكتشف موضع التسرّب</button>
            </div>

            <p className="platform-proof">نغطّي ١١ منصة في الخليج ومصر — من Amazon وNoon إلى Talabat وKeeta وKeemart.</p>
            <p className="hint direct-channels">قنوات مباشرة أيضًا: WhatsApp · Instagram · TikTok · الطلب المباشر.</p>
          </div>

          {/* dark mini diagnostic preview (Commerce Intelligence OS) */}
          <div className="cmd-preview" aria-hidden="true">
            <span className="cmd-preview__label">تدقيق المنصة</span>
            <div className="cmd-preview__input">
              <span>المدخل: حساب مطعم على Talabat</span>
              <span className="cmd-preview__caret" />
            </div>
            <ul className="cmd-preview__rows">
              <li><span className="cmd-preview__dot" /> فحص ترتيب القائمة</li>
              <li><span className="cmd-preview__dot" /> مراجعة معدل الفشل (fail rate)</li>
              <li><span className="cmd-preview__dot" /> قراءة وقت التحضير</li>
              <li><span className="cmd-preview__dot" /> تقدير عبء العمولة والخصومات</li>
              <li><span className="cmd-preview__dot" /> تحديد أوّل إصلاح تشغيلي</li>
            </ul>
            <div className="cmd-preview__foot">
              <span>الناتج: تقرير تدقيق + أول ٣ إصلاحات</span>
              <span className="cmd-preview__active">وضع تجريبي — مثال توضيحي</span>
            </div>
          </div>
        </section>

        {/* ---------- 2. Pain recognition ---------- */}
        <RevenueLeakPains onAudit={() => go()} />

        {/* ---------- 3. Worked audit proof ---------- */}
        <AuditProofPreview onAudit={() => go()} />

        {/* ---------- 4. Platform verticals ---------- */}
        <PlatformVerticals onAudit={(v) => go({ vertical: v })} />

        {/* ---------- 5. Growth Operations explanation ---------- */}
        <GrowthOpsProcess />

        {/* ---------- 6. Services / packages ---------- */}
        <ServicePackagesSection onAudit={() => go()} />

        {/* ---------- 7. Final CTA ---------- */}
        <section className="final-cta">
          <h2 className="final-cta__title">ابدأ تدقيق منصاتك المجاني</h2>
          <p className="muted">ستعرف: أين يتسرّب الإيراد · ما الأدلّة المتاحة · درجة الثقة · البيانات الناقصة · أوّل عملية نمو.</p>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => go()}>ابدأ التدقيق المجاني ←</button>
        </section>
      </div>
    </Shell>
  );
}
