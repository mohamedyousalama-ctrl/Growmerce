import { Collapsible } from './Collapsible';
import type { RuledOutHypothesis } from '../types';

/** Reasoning discipline: explanations considered and ruled out (20 GUARD / 19). Collapsible. */
export function RuledOutModule({ items }: { items: RuledOutHypothesis[] }) {
  return (
    <Collapsible title="فرضيات لم تثبت بعد" count={items.length}>
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر الفرضيات المستبعَدة هنا.</p>
      ) : (
        <div className="ruledout-list">
          {items.map((r) => (
            <div key={r.id} className="ruledout-item">
              <p className="ruledout-item__h">{r.hypothesis}</p>
              <p className="hint">لماذا استبعدناه؟ {r.whyRuledOut}</p>
              <p className="hint">الأساس: {r.basis}</p>
            </div>
          ))}
        </div>
      )}
    </Collapsible>
  );
}
