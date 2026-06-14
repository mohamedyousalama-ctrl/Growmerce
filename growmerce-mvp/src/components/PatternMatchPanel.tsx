import type { PatternMatch } from '../types';

/** Which known pattern the finding maps to — enough to build trust, not full doctrine (19). */
export function PatternMatchPanel({ match }: { match: PatternMatch }) {
  return (
    <section className="panel pattern-match" aria-label="النمط المطابق">
      <h3 className="panel__title">النمط المطابق على المنصة</h3>
      <p className="pattern-match__name">{match.name}</p>
      {match.family && <p className="pattern-match__family">العائلة: {match.family}</p>}
      <p className="muted">{match.description}</p>
      {match.whyFits && (
        <p className="hint"><strong>لماذا يناسب حالتك؟</strong> {match.whyFits}</p>
      )}
      {match.whatWeakens && (
        <p className="hint"><strong>ما الذي يُضعف هذا التطابق؟</strong> {match.whatWeakens}</p>
      )}
    </section>
  );
}
