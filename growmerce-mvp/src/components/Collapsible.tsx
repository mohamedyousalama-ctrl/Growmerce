import { useId, useState, type ReactNode } from 'react';

/**
 * Lightweight progressive disclosure (Sprint 5).
 * The section header (title + count) is ALWAYS visible so the section's existence and scale are
 * never hidden — only its body collapses. Accessible (button + aria-expanded/controls).
 */
export function Collapsible({
  title,
  hint,
  count,
  defaultOpen = true,
  onOpen,
  children,
}: {
  title: string;
  hint?: string;
  count?: number;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <section className="panel collapsible">
      <button
        type="button"
        className="collapsible__head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
      >
        <span className="collapsible__title panel__title">
          {title}
          {typeof count === 'number' && <span className="collapsible__count num">{count}</span>}
          {hint && <span className="hint"> — {hint}</span>}
        </span>
        <span className="collapsible__chev" aria-hidden>{open ? '▾' : '▸'}</span>
      </button>
      <div id={bodyId} className="collapsible__body" hidden={!open}>
        {children}
      </div>
    </section>
  );
}
