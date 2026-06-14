/** Stage 5 — sharpened pain mirror ("does this happen in your accounts?") + commission example. */
const PAINS = [
  {
    title: 'الطلبات تزيد… لكن صافي الربح لا يظهر.',
    body: 'الخصومات والعمولات والحملات قد ترفع إجمالي المبيعات، لكنها تخفي صافي الربح.',
    tags: ['GMV / إجمالي المبيعات', 'Commission / العمولة'],
    cta: 'افحص تآكل الهامش',
  },
  {
    title: 'الظهور ينخفض قبل أن تعرف السبب.',
    body: 'ضعف القائمة، معدل الفشل، خسارة Buy Box، أو نفاد المخزون قد يخفض ترتيبك قبل أن تلاحظ.',
    tags: ['Fail Rate / معدل الفشل', 'Buy Box', 'Stockout / نفاد المخزون'],
    cta: 'افحص انخفاض الظهور',
  },
  {
    title: 'تدير منصات كثيرة بفريق صغير.',
    body: 'كل منصة لها لوحة، قواعد، مؤشرات، مدير حساب، ومواعيد حملات مختلفة — والتسريب يحدث بينها.',
    tags: ['Multi-Platform / تعدّد المنصات'],
    cta: 'افحص تشتّت المنصات',
  },
];

export function RevenueLeakPains({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="pains">
      <p className="section-label">علامات تسرّب المبيعات</p>
      <h2 className="pains__title">هل يحدث هذا في حساباتك؟</h2>

      <div className="pains__grid">
        {PAINS.map((p, i) => (
          <article key={i} className="pain-card">
            <h3 className="pain-card__title">{p.title}</h3>
            <p className="muted">{p.body}</p>
            <div className="pain-card__tags">
              {p.tags.map((t) => <span key={t} className="metric-tag">{t}</span>)}
            </div>
            <button type="button" className="btn pain-card__cta" onClick={onAudit}>{p.cta} ←</button>
          </article>
        ))}
      </div>

      {/* commission burden illustration (static example — not a guarantee) */}
      <div className="burden-illustration">
        <p className="os-label">مثال على عبء العمولة</p>
        <p className="burden-illustration__headline">ارتفاع GMV لا يعني ارتفاع الربح.</p>
        <p className="burden-illustration__calc">
          مبيعات شهرية (GMV) بقيمة <strong className="num-ar">٣٠٠٬٠٠٠</strong> ر.س × عمولة <strong className="num-ar">٢٥٪</strong> ={' '}
          <strong className="num-ar">٧٥٬٠٠٠</strong> ر.س رسومًا للمنصة — قبل الإعلانات والخصومات.
        </p>
        <p className="hint">إذا لم تفصل العمولة والخصومات والإعلانات عن إجمالي المبيعات، فقد يكون التسرّب أكبر مما يظهر في GMV. (مثال توضيحي.)</p>
      </div>
    </section>
  );
}
