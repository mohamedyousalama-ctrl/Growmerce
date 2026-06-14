import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { PlatformVerticals } from '../components/PlatformVerticals';
import { RevenueLeakPains } from '../components/RevenueLeakPains';
import { AuditProofPreview } from '../components/AuditProofPreview';
import { GrowthOpsProcess } from '../components/GrowthOpsProcess';
import { ServicePackagesSection } from '../components/ServicePackagesSection';
import { track } from '../lib/analytics';
import { buildWhatsAppLink, DEFAULT_WA_MESSAGE } from '../lib/whatsapp';
import { platformById, type Vertical } from '../knowledge';

const QUICK_PLATFORMS = ['amazon', 'noon', 'jumia', 'talabat', 'hungerstation', 'jahez', 'keeta', 'keemart'];

/** `/` — active Commerce Intelligence entry: feel the problem → start the free platform audit. */
export function RecognitionPage() {
  const navigate = useNavigate();
  const [entryUrl, setEntryUrl] = useState('');

  // Start the free audit intake (carry vertical/platform/link as query params).
  const go = (opts?: { vertical?: Vertical; platform?: string; url?: string }) => {
    track('diagnostic_started', { from: opts?.platform ? 'hero_platform' : opts?.vertical ? 'vertical' : 'hero' });
    const q = new URLSearchParams();
    if (opts?.vertical) q.set('v', opts.vertical);
    if (opts?.platform) q.set('p', opts.platform);
    if (opts?.url?.trim()) q.set('l', opts.url.trim());
    const qs = q.toString();
    navigate(`/audit${qs ? `?${qs}` : ''}`);
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
            <span className="home-hero__eyebrow">تدقيق وتشغيل حساباتك على المنصات — لا حملات فقط</span>
            <h1 className="home-hero__title">نحدّد أين تتسرّب مبيعاتك وربحك على المنصات — ثم نبدأ أول إصلاح تشغيلي.</h1>
            <p className="home-hero__body">
              للمطاعم والمتاجر والعلامات التجارية التي تبيع عبر Amazon وNoon وTalabat وHungerStation
              وKeeta وJumia ومنصات التجارة السريعة.
              <br />
              نراجع الحساب، القائمة/الكتالوج، الظهور، العمولة، الخصومات، الإعلانات، ومؤشرات صحة الحساب.
            </p>

            {/* active diagnostic entry */}
            <div className="hero-entry">
              <p className="hero-entry__title">ابدأ بتدقيق حساب واحد</p>
              <p className="hero-entry__or">الصق رابط حسابك أو اختر المنصة</p>
              <input
                className="hero-entry__input"
                dir="auto"
                inputMode="url"
                placeholder="مثال: رابط المتجر أو صفحة المطعم على المنصة"
                value={entryUrl}
                onChange={(e) => setEntryUrl(e.target.value)}
                aria-label="الصق رابط حسابك أو اختر المنصة"
              />
              <div className="hero-entry__chips">
                {QUICK_PLATFORMS.map((id) => (
                  <button key={id} type="button" className="platform-chip platform-chip--btn" onClick={() => startPlatform(id)}>
                    {platformById(id)?.name}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn--primary hero-entry__cta" onClick={() => go({ url: entryUrl })}>
                ابدأ التدقيق المجاني ←
              </button>
              <p className="hero-entry__journey hint">
                اختر المنصة ← أجب عن ٥ أسئلة تشغيلية ← استلم تقرير تدقيق أولي ← ناقش أول إصلاح على واتساب
              </p>
              <p className="hint">نقطة بداية للتدقيق — لا يتم تحليل الرابط آليًا بعد (وضع تجريبي).</p>
            </div>

            <p className="platform-proof">نغطّي ١١ منصة في الخليج ومصر — من Amazon وNoon إلى Talabat وKeeta وKeemart.</p>
            <p className="hint direct-channels">قنوات مباشرة أيضًا: WhatsApp · Instagram · TikTok · الطلب المباشر.</p>
            <p className="hint">
              <a href="/diagnose" onClick={(e) => { e.preventDefault(); navigate('/diagnose'); }} style={{ color: 'var(--color-brand-strong)' }}>
                شاهد مثالًا تفاعليًا لطريقة قراءة التقرير
              </a>{' '}— مثال توضيحي، ليس التقرير النهائي.
            </p>
          </div>

          {/* dark mini diagnostic preview (Commerce Intelligence OS) */}
          <div className="cmd-preview" aria-hidden="true">
            <span className="cmd-preview__label">تدقيق المنصة</span>
            <div className="cmd-preview__input">
              <span>المدخل: حساب مطعم على Talabat</span>
              <span className="cmd-preview__caret" />
            </div>
            <ul className="cmd-preview__rows cmd-preview__rows--progress">
              <li className="is-done"><span className="cmd-preview__dot" /> قراءة الحساب والقائمة</li>
              <li className="is-done"><span className="cmd-preview__dot" /> فحص الظهور ومؤشرات الصحة</li>
              <li className="is-active"><span className="cmd-preview__dot" /> تقدير عبء العمولة والخصومات</li>
              <li><span className="cmd-preview__dot" /> تحديد موضع تسرّب الإيراد أو الربح</li>
              <li><span className="cmd-preview__dot" /> اقتراح أول إصلاح تشغيلي</li>
            </ul>
            <div className="cmd-preview__bar" aria-hidden><span /></div>
            <div className="cmd-preview__foot">
              <span>الناتج: تقرير تدقيق أولي + أولويات إصلاح قابلة للتنفيذ</span>
              <span className="cmd-preview__active">وضع تجريبي — مثال توضيحي</span>
            </div>
          </div>
        </section>

        {/* ---------- 2. Pain recognition ---------- */}
        <div id="pains"><RevenueLeakPains onAudit={() => go()} /></div>

        {/* ---------- 3. Worked audit proof ---------- */}
        <div id="proof"><AuditProofPreview onAudit={() => go()} /></div>

        {/* ---------- 4. Platform verticals ---------- */}
        <div id="platforms"><PlatformVerticals onAudit={(v) => go({ vertical: v })} /></div>

        {/* ---------- 5. Growth Operations explanation ---------- */}
        <div id="process"><GrowthOpsProcess /></div>

        {/* ---------- 6. Services / packages ---------- */}
        <div id="pricing"><ServicePackagesSection onAudit={() => go()} /></div>

        {/* ---------- 7. Final CTA ---------- */}
        <section className="final-cta">
          <h2 className="final-cta__title">ابدأ بتدقيق أولي لحساباتك على المنصات</h2>
          <p className="muted">
            سنراجع المنصة التي تختارها، ونوضّح أين يتسرّب الإيراد، ما الأدلّة المتاحة، ما البيانات الناقصة،
            وما أوّل إصلاح تشغيلي مقترح.
          </p>
          <div className="final-cta__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => go()}>ابدأ التدقيق المجاني ←</button>
            <a
              className="btn btn--whatsapp-outline btn--lg"
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('whatsapp_clicked', { from: 'final_cta' })}
            >
              ناقش عبر واتساب
            </a>
          </div>
        </section>
      </div>
    </Shell>
  );
}
