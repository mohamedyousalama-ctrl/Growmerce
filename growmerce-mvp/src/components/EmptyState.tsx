/** Gentle empty state — e.g. visiting /handoff directly without a completed diagnosis. */
export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <section className="empty-state">
      <h1 className="hero__title" style={{ fontSize: 'var(--fs-h1)' }}>{title}</h1>
      <p className="muted">{body}</p>
      <div style={{ marginTop: 'var(--space-5)' }}>
        <button type="button" className="btn btn--primary btn--lg" onClick={onAction}>{actionLabel}</button>
      </div>
    </section>
  );
}
