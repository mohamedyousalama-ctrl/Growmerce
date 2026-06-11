import type { MissingDataItem } from '../types';

/** Honesty: what's missing, why it matters, and what to provide next (13/22). Visible, not hidden. */
export function MissingDataModule({ items }: { items: MissingDataItem[] }) {
  return (
    <section className="panel" aria-label="ما لا نعرفه بعد">
      <h3 className="panel__title">ما لا نعرفه بعد <span className="hint">— بصراحة</span></h3>
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر البيانات الناقصة هنا.</p>
      ) : (
        <div className="missing-list">
          {items.map((m) => (
            <div key={m.id} className="missing-item">
              <p className="missing-item__what">{m.what}</p>
              <p className="hint">لماذا يهم؟ {m.whyItMatters}</p>
              <p className="hint">كيف يؤثر على الثقة؟ {m.confidenceImpact}</p>
              <p className="hint">ما الذي يمكن إضافته لاحقًا؟ {m.provideNext}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
