import type { MissingDataItem } from '../types';

/** Honesty: what's missing, why it matters, and what to provide next (13/22). Visible, not hidden. */
export function MissingDataModule({ items }: { items: MissingDataItem[] }) {
  return (
    <section className="panel" aria-label="بيانات ناقصة">
      <h3 className="panel__title">ما الذي ينقصنا <span className="hint">— بصراحة</span></h3>
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر البيانات الناقصة هنا.</p>
      ) : (
        <div className="missing-list">
          {items.map((m) => (
            <div key={m.id}>
              <p className="missing-item__what">{m.what}</p>
              <p className="hint">لماذا يهمّ: {m.whyItMatters}</p>
              <p className="hint">الأثر على الثقة: {m.confidenceImpact}</p>
              <p className="hint">ما يمكنك تقديمه: {m.provideNext}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
