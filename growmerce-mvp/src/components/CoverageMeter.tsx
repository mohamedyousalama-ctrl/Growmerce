import type { Coverage } from '../lib/coverage';

/**
 * "وضوح السياق" — context completeness (Sprint 2).
 * Calm, calibrated single bar — NOT red/amber/green, NOT a grade of the business.
 * Communicates: more context → clearer diagnosis.
 */
export function CoverageMeter({ coverage }: { coverage: Coverage }) {
  return (
    <div className="card coverage" aria-label="وضوح السياق">
      <div className="coverage__head">
        <strong>وضوح السياق</strong>
        <span className="num coverage__pct">{coverage.score}٪</span>
      </div>
      <div className="coverage__bar" role="presentation">
        <div className="coverage__fill" style={{ inlineSize: `${coverage.score}%` }} />
      </div>
      <p className="hint">كلّما اتّضحت صورة نشاطك، ارتفعت دقّة التشخيص. هذا ليس تقييمًا لنشاطك.</p>
      <ul className="coverage__parts">
        {coverage.parts.map((p) => (
          <li key={p.key} className={p.done ? 'is-done' : ''}>
            <span className="coverage__dot" aria-hidden />
            <span>{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
