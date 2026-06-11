import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { RecognitionCard } from '../components/RecognitionCard';
import { RECOGNITION_CARDS } from '../mock/recognition';
import { useSession } from '../state/session';
import { track } from '../lib/analytics';
import type { PatternRecognition } from '../types';

/** `/` — Recognition entry. Thin, calm, recognition-led. NOT a brochure homepage. */
export function RecognitionPage() {
  const navigate = useNavigate();
  const { goTo, setInput } = useSession();

  const start = (pattern?: PatternRecognition) => {
    if (pattern) track('recognition_card_clicked', { key: pattern.key });
    track('diagnostic_started', { from: pattern ? 'recognition_card' : 'hero' });
    // Seed the input step from the recognition card (continuity into "teaching" the system).
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
        <section className="home-hero">
          {/* editorial Arabic headline + primary statement */}
          <div>
            <span className="home-hero__eyebrow">نظام ذكاء تجاري · لا وكالة تسويق</span>
            <h1 className="home-hero__title">سؤالٌ واحد — لتخرج بدليلٍ، لا بوعد.</h1>
            <p className="home-hero__latin">Bring one question. Leave with evidence — not a promise.</p>
            <p className="home-hero__body">
              ليست لديك مشكلة زيارات على الأرجح، بل مشكلة <strong>تسرّب</strong>. نشخّص أين تتسرّب
              مبيعاتك بالأدلّة، ونخبرك كم نحن متأكّدون — عبر الأسواق والمتاجر وتطبيقات التوصيل والتواصل وواتساب.
            </p>
            <div className="home-hero__cta">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => start()}>
                شخّص تسرّب مبيعاتك ←
              </button>
            </div>
          </div>

          {/* dark command / intelligence preview (Direction A — Commerce Intelligence OS) */}
          <div className="cmd-preview" aria-hidden="true">
            <span className="cmd-preview__label">سؤالك الأول</span>
            <div className="cmd-preview__input">
              <span>أين يتسرّب الربح؟</span>
              <span className="cmd-preview__caret" />
            </div>
            <ul className="cmd-preview__rows">
              <li><span className="cmd-preview__dot" /> تُحدّد قنواتك ومنافسيك</li>
              <li><span className="cmd-preview__dot" /> تكشف موضع التسرّب بالأدلّة</li>
              <li><span className="cmd-preview__dot" /> تحصل على تقرير قرار — والرقم</li>
            </ul>
            <div className="cmd-preview__foot">
              <span>تقرير قرار · لا لوحة بيانات</span>
              <span className="cmd-preview__active">الذكاء نشط — تجريبي</span>
            </div>
          </div>
        </section>

        {/* recognition cards = secondary proof of problem recognition */}
        <section>
          <p className="section-label">هل يبدو هذا مألوفًا؟</p>
          <div className="recognition-grid">
            {RECOGNITION_CARDS.map((p) => (
              <RecognitionCard key={p.key} pattern={p} onSelect={start} />
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
