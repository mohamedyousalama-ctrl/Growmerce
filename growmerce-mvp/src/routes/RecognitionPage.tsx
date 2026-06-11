import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { RecognitionCard } from '../components/RecognitionCard';
import { RECOGNITION_CARDS } from '../mock/recognition';
import { useSession } from '../state/session';
import type { PatternRecognition } from '../types';

/** `/` — Recognition entry. Thin, calm, recognition-led. NOT a brochure homepage. */
export function RecognitionPage() {
  const navigate = useNavigate();
  const { goTo, setInput } = useSession();

  const start = (pattern?: PatternRecognition) => {
    if (pattern?.key) setInput({ mainProblem: pattern.key });
    goTo('input');
    navigate('/diagnose');
  };

  return (
    <Shell>
      <div className="container">
        <section className="hero">
          <span className="hero__eyebrow">نظام ذكاء تجاري — لا وكالة تسويق</span>
          <h1 className="hero__title">نجد أين تتسرّب مبيعاتك أونلاين — ونشغّل الإصلاح.</h1>
          <p className="hero__sub">
            ليست لديك مشكلة زيارات على الأرجح، بل مشكلة تسرّب. نشخّص بالأدلّة، ونخبرك كم نحن متأكّدون.
          </p>
          <p className="hero__channels">
            عبر الأسواق، والمتاجر، وتطبيقات التوصيل، والتواصل الاجتماعي، وواتساب.
          </p>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <button type="button" className="btn btn--primary btn--lg" onClick={() => start()}>
              شخّص تسرّب مبيعاتك ←
            </button>
          </div>
        </section>

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
