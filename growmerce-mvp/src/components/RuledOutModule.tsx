import type { RuledOutHypothesis } from '../types';

/** Reasoning discipline: explanations considered and ruled out (20 GUARD / 19 counter-evidence). */
export function RuledOutModule({ items }: { items: RuledOutHypothesis[] }) {
  return (
    <section className="panel" aria-label="فرضيات مستبعَدة">
      <h3 className="panel__title">ما الذي استبعدناه</h3>
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر الفرضيات المستبعَدة هنا.</p>
      ) : (
        <div className="ruledout-list">
          {items.map((r) => (
            <div key={r.id} className="ruledout-item">
              <p className="ruledout-item__h">{r.hypothesis}</p>
              <p className="hint">السبب: {r.whyRuledOut}</p>
              <p className="hint">الأساس: {r.basis}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
