import { JOURNEY_LABELS_AR, JOURNEY_ORDER } from '../state/session';
import type { JourneyState } from '../types';

/** Shows the seven-state intelligence journey and where the user is. */
export function JourneyProgress({ current }: { current: JourneyState }) {
  const currentIdx = JOURNEY_ORDER.indexOf(current);
  return (
    <nav className="journey" aria-label="مسار الذكاء">
      {JOURNEY_ORDER.map((s, i) => {
        const cls =
          i === currentIdx ? 'journey__step--active' : i < currentIdx ? 'journey__step--done' : '';
        return (
          <span key={s} className={`journey__step ${cls}`}>
            {JOURNEY_LABELS_AR[s]}
          </span>
        );
      })}
    </nav>
  );
}
