import { arabicDigits } from '../lib/format';
import type { ConfidenceBand, ConfidenceExplanation } from '../types';

const BAND_AR: Record<ConfidenceBand, string> = {
  low: 'منخفضة',
  medium: 'متوسّطة',
  high: 'عالية',
  very_high: 'عالية جدًا',
};

/**
 * Diagnostic confidence as a CALIBRATION INSTRUMENT, not status (20).
 * Ring + calibration bar fill by score; graduated solidity of the indigo hue — never red/amber/green.
 * Three honest groups: what raised it, what reduced it, what would raise it further (the "potential").
 * Deliberately distinct (label) from input coverage ("وضوح السياق").
 */
export function ConfidenceModule({ explanation }: { explanation: ConfidenceExplanation }) {
  const pct = Math.max(0, Math.min(100, explanation.score));
  return (
    <section className="panel conf-instrument" aria-label="مستوى الثقة في التشخيص">
      <p className="os-label os-label--brand">درجة الثقة في التشخيص · معايرة</p>

      <div className="conf-top">
        <div
          className="conf-ring"
          style={{ ['--pct' as string]: pct }}
          role="img"
          aria-label={`الثقة ${explanation.score} بالمئة — ${BAND_AR[explanation.band]}`}
        >
          <span className="conf-ring__pct">{arabicDigits(explanation.score)}٪</span>
          <span className="conf-ring__cap">{BAND_AR[explanation.band]}</span>
        </div>
        <div className="conf-headline">
          <span className="conf-band-pill">ثقة {BAND_AR[explanation.band]}</span>
          <p className="hint">
            ثقة معايَرة — تخبرك كم نحن متأكّدون من التشخيص. تختلف عن «وضوح السياق» الذي يقيس اكتمال معلوماتك.
          </p>
        </div>
      </div>

      {/* calibration bar: why this number — not 100%, not lower */}
      <div className="conf-calbar">
        <p className="os-label">لماذا {arabicDigits(explanation.score)}٪ — لا ١٠٠٪ ولا أقل</p>
        <div className="conf-calbar__track" aria-hidden>
          <span className="conf-calbar__fill" style={{ inlineSize: `${pct}%` }} />
          <span className="conf-calbar__potential" style={{ insetInlineStart: `${pct}%`, insetInlineEnd: 0 }} />
        </div>
        <div className="conf-calbar__row">
          <span className="now">{arabicDigits(explanation.score)}٪ الآن</span>
          <span>← إمكانية أعلى مع بيانات أكثر</span>
        </div>
      </div>

      <div className="conf-groups">
        <div className="conf-group conf-group--raised">
          <p className="conf-group__label">ما رفع الثقة</p>
          <ul className="conf-group__list">
            {explanation.raisedBy.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
        <div className="conf-group conf-group--reduced">
          <p className="conf-group__label">ما خفّض الثقة</p>
          <ul className="conf-group__list">
            {explanation.reducedBy.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
        <div className="conf-group conf-group--improve">
          <p className="conf-group__label">ما يرفعها أكثر</p>
          <ul className="conf-group__list">
            {explanation.wouldImprove.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </div>

      {explanation.cap && (
        <p className="conf-cap">
          حدّ الثقة الحالي: {BAND_AR[explanation.cap]}{explanation.capReason ? ` — ${explanation.capReason}` : ''}
        </p>
      )}
    </section>
  );
}
