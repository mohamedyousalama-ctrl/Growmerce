import { Collapsible } from './Collapsible';
import type { MissingDataItem } from '../types';

/** Honesty: what's missing, why it matters, what to provide next (13/22). Visible (header), collapsible body. */
export function MissingDataModule({ items }: { items: MissingDataItem[] }) {
  return (
    <Collapsible title="البيانات المطلوبة قبل رفع الثقة" hint="بصراحة" count={items.length}>
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
    </Collapsible>
  );
}
