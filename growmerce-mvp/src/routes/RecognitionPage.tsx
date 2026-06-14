import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { RecognitionCard } from '../components/RecognitionCard';
import { PlatformVerticals } from '../components/PlatformVerticals';
import { RevenueLeakPains } from '../components/RevenueLeakPains';
import { ServicePackagesSection } from '../components/ServicePackagesSection';
import { RECOGNITION_CARDS } from '../mock/recognition';
import { useSession } from '../state/session';
import { track } from '../lib/analytics';
import { platformsByVertical, VERTICAL_LABELS, type Vertical } from '../knowledge';
import type { PatternRecognition } from '../types';

const VERTICAL_ORDER: Vertical[] = ['ecommerce', 'food_delivery', 'qcommerce'];

/** `/` — platform-operator entry: who it's for, which platforms, what outcome, what next. */
export function RecognitionPage() {
  const navigate = useNavigate();
  const { goTo, setInput } = useSession();

  const start = (pattern?: PatternRecognition) => {
    if (pattern) track('recognition_card_clicked', { key: pattern.key });
    track('diagnostic_started', { from: pattern ? 'recognition_card' : 'hero' });
    const patch: Parameters<typeof setInput>[0] = {};
    if (pattern?.problemKey) patch.mainProblem = pattern.problemKey;
    if (pattern && pattern.vertical !== 'all') patch.businessType = pattern.vertical;
    if (Object.keys(patch).length) setInput(patch);
    goTo('input');
    navigate('/diagnose');
  };

  return (
    <Shell>
      <div className="container">
        {/* ---------- HERO (platform positioning, 5-second test) ---------- */}
        <section className="home-hero">
          <div>
            <span className="home-hero__eyebrow">إدارة وتشغيل حسابات المنصات · لا وكالة تسويق</span>
            <h1 className="home-hero__title">منتجاتك ومطاعمك موجودة على المنصات. جرومرس يضمن أنها تبيع فعلاً.</h1>
            <p className="home-hero__latin">Your products and restaurants exist on the platforms. Growmerce makes sure they actually sell.</p>
            <p className="home-hero__body">
              إدارة وتشغيل حسابات المنصات للمطاعم والعلامات التجارية وشركات التوزيع في الخليج ومصر — عبر
              Amazon وNoon وJumia وTalabat وHungerStation وJahez وKeeta ومنصات التجارة السريعة.
            </p>

            {/* platform groups above the fold (text chips — safe, no copyrighted logos) */}
            <div className="platform-groups">
              {VERTICAL_ORDER.map((v) => (
                <div key={v} className="platform-group">
                  <span className="platform-group__label">{VERTICAL_LABELS[v].ar}</span>
                  <div className="platform-group__chips">
                    {platformsByVertical(v).map((p) => (
                      <span key={p.id} className="platform-chip">{p.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="platform-proof">نغطّي ١١ منصة في الخليج ومصر — من Amazon وNoon إلى Talabat وKeeta وKeemart.</p>
            <p className="hint platform-lens">تدقيق مبني على معايير المنصات وخبرة التشغيل — قراءة بالأدلّة، لا وعود نتائج مضمونة.</p>

            <div className="home-hero__cta">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => start()}>
                احصل على تدقيق مجاني لحساباتك على المنصات ←
              </button>
              <button type="button" className="btn btn--lg" onClick={() => start()}>
                اكتشف أين تضيع المبيعات
              </button>
            </div>
          </div>

          {/* dark platform-audit preview (Commerce Intelligence OS) */}
          <div className="cmd-preview" aria-hidden="true">
            <span className="cmd-preview__label">تدقيق المنصات</span>
            <div className="cmd-preview__input">
              <span>أين يتسرّب الإيراد على منصاتك؟</span>
              <span className="cmd-preview__caret" />
            </div>
            <ul className="cmd-preview__rows">
              <li><span className="cmd-preview__dot" /> Platform Revenue Leak — تسريب الإيراد</li>
              <li><span className="cmd-preview__dot" /> Fail Rate / Buy Box / Stockout Risk</li>
              <li><span className="cmd-preview__dot" /> First Growth Operation — أول عملية نمو</li>
            </ul>
            <div className="cmd-preview__foot">
              <span>تقرير تدقيق · لا لوحة بيانات</span>
              <span className="cmd-preview__active">الذكاء نشط — تجريبي</span>
            </div>
          </div>
        </section>

        {/* ---------- Stage 2: three platform verticals ---------- */}
        <PlatformVerticals onAudit={() => start()} />

        {/* ---------- Stage 3: revenue-leak pains + commission burden ---------- */}
        <RevenueLeakPains />

        {/* recognition cards = secondary proof of problem recognition */}
        <section>
          <p className="section-label">هل يبدو هذا مألوفًا؟</p>
          <div className="recognition-grid">
            {RECOGNITION_CARDS.map((p) => (
              <RecognitionCard key={p.key} pattern={p} onSelect={start} />
            ))}
          </div>
        </section>

        {/* ---------- Stage 8: services + pricing ---------- */}
        <ServicePackagesSection onAudit={() => start()} />
      </div>
    </Shell>
  );
}
