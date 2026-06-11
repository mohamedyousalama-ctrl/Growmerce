import type { ConfidenceBand, ConfidenceExplanation } from '../types';

const BAND_AR: Record<ConfidenceBand, string> = {
  low: 'منخفضة',
  medium: 'متوسّطة',
  high: 'عالية',
  very_high: 'عالية جدًا',
};

const BAND_LEVEL: Record<ConfidenceBand, number> = { low: 1, medium: 2, high: 3, very_high: 4 };

/**
 * Confidence as CALIBRATION, not status (20).
 * The meter fills by band (faint → solid intelligence hue); it is never red/amber/green.
 * Always paired with what raised/reduced it and what would improve it.
 */
export function ConfidenceModule({ explanation }: { explanation: ConfidenceExplanation }) {
  const level = BAND_LEVEL[explanation.band];
  return (
    <section className="panel confidence" aria-label="مستوى الثقة">
      <div className="confidence__head">
        <div>
          <h3 className="panel__title">مستوى الثقة</h3>
          <span className="confidence__band">{BAND_AR[explanation.band]}</span>
          <span className="confidence__score num"> · {explanation.score}٪</span>
        </div>
      </div>

      <div className="confidence__meter" aria-hidden>
        {[1, 2, 3, 4].map((seg) => (
          <span key={seg} className={`confidence__seg confidence__seg--${seg} ${seg <= level ? 'is-on' : ''}`} />
        ))}
      </div>
      <p className="hint">الثقة معايَرة — تخبرك كم نحن متأكّدون، لا أنها "جيدة" أو "سيئة".</p>

      <div className="confidence__factors">
        <div>
          <strong className="hint">ما رفع الثقة</strong>
          <ul className="factor-list">
            {explanation.raisedBy.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
        <div>
          <strong className="hint">ما خفّض الثقة</strong>
          <ul className="factor-list">
            {explanation.reducedBy.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </div>

      <div>
        <strong className="hint">ما الذي يرفع الثقة أكثر</strong>
        <ul className="factor-list">
          {explanation.wouldImprove.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>

      {explanation.cap && (
        <p className="factor-cap">
          السقف: {BAND_AR[explanation.cap]}{explanation.capReason ? ` — ${explanation.capReason}` : ''}
        </p>
      )}
    </section>
  );
}
