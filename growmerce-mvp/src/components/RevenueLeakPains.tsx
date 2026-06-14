/** Stage 5 — sharpened pain mirror ("does this happen in your accounts?") + commission example. */
const PAINS = [
  {
    title: 'الطلبات تزيد… لكن الهامش يتآكل.',
    body: 'الخصومات والعمولات والحملات قد ترفع GMV، لكنها تخفي صافي الربح الحقيقي.',
    tags: ['GMV', 'Commission', 'Discounts'],
  },
  {
    title: 'الظهور ينخفض قبل أن تعرف السبب.',
    body: 'Fail rate، ضعف القائمة، خسارة Buy Box، أو نفاد المخزون قد يخفض ترتيبك بصمت.',
    tags: ['Fail Rate', 'Buy Box', 'Stockout', 'MQI'],
  },
  {
    title: 'تدير منصات كثيرة بفريق صغير.',
    body: 'كل منصة لها قواعد ولوحة ومؤشّرات مختلفة — والتسرّب يمرّ بينها.',
    tags: ['Multi-Platform', 'Fragmented Dashboards'],
  },
];

export function RevenueLeakPains({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="pains">
      <p className="section-label">هل يحدث هذا في حساباتك؟</p>
      <h2 className="pains__title">هل يحدث هذا في حساباتك؟</h2>

      <div className="pains__grid">
        {PAINS.map((p, i) => (
          <article key={i} className="pain-card">
            <h3 className="pain-card__title">{p.title}</h3>
            <p className="muted">{p.body}</p>
            <div className="pain-card__tags">
              {p.tags.map((t) => <span key={t} className="metric-tag">{t}</span>)}
            </div>
            <button type="button" className="btn pain-card__cta" onClick={onAudit}>افحص هذا التسرّب ←</button>
          </article>
        ))}
      </div>

      {/* commission burden illustration (static example — not a guarantee) */}
      <div className="burden-illustration">
        <p className="os-label">مثال على عبء العمولة</p>
        <p className="burden-illustration__calc">
          GMV شهري <strong className="num-ar">٣٠٠٬٠٠٠</strong> ر.س × عمولة <strong className="num-ar">٢٥٪</strong> ={' '}
          <strong className="num-ar">٧٥٬٠٠٠</strong> ر.س رسوم منصة — قبل الإعلانات والخصومات.
        </p>
        <p className="hint">إذا لم تكن تقيس هذا يوميًا، قد يكون التسرّب أكبر من المتوقّع. (مثال توضيحي.)</p>
      </div>
    </section>
  );
}
