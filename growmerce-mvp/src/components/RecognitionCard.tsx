import type { PatternRecognition } from '../types';

/** A pattern stated in the operator's words — the "that's my problem" moment (19). */
export function RecognitionCard({
  pattern,
  onSelect,
}: {
  pattern: PatternRecognition;
  onSelect?: (pattern: PatternRecognition) => void;
}) {
  return (
    <article
      className="card reco-card"
      onClick={() => onSelect?.(pattern)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect?.(pattern);
      }}
    >
      <p className="reco-card__statement">{pattern.statement}</p>
      {pattern.whyLine && <p className="reco-card__why">{pattern.whyLine}</p>}
      <span className="reco-card__cta">هل يحدث هذا في نشاطك؟ ابدأ التشخيص ←</span>
    </article>
  );
}
