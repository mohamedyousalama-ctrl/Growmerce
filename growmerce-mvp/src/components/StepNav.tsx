/** Temporary Sprint-1 step navigation (back / next). Replaced by real CTAs in later sprints. */
export function StepNav({
  onBack,
  onNext,
  nextLabel = 'التالي ←',
  backLabel = '→ رجوع',
  nextDisabled,
  hint,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  hint?: string;
}) {
  return (
    <div className="step-nav">
      <div>
        {onBack && (
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            {backLabel}
          </button>
        )}
      </div>
      {hint && <span className="step-nav__hint">{hint}</span>}
      <div>
        {onNext && (
          <button type="button" className="btn btn--primary" onClick={onNext} disabled={nextDisabled}>
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
