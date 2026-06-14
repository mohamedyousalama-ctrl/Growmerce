/** Stage 3 — pain mirror + commission burden illustration (static, cautious wording). */
const PAINS = [
  {
    title: 'تدفع عمولات عالية ولا تعرف صافي الربح الحقيقي',
    body: 'GMV مرتفع لا يعني ربحًا. بين العمولة (take rate) والإنفاق الإعلاني والخصومات، قد يكون صافيك أقل بكثير مما تظن.',
    tags: ['GMV', 'Commission Burden', 'Ad Spend'],
  },
  {
    title: 'ظهورك ينخفض قبل أن تعرف السبب',
    body: 'fail rate أو فقدان Buy Box أو غرامة نفاد المخزون أو تدهور AHR/MQI — كلها تكبت ترتيبك بصمت قبل أن تظهر في المبيعات.',
    tags: ['Fail Rate', 'Buy Box', 'Stockout Penalty', 'AHR', 'MQI'],
  },
  {
    title: 'تدير منصات كثيرة بفريق صغير',
    body: 'لكل منصة لوحة وقواعد مختلفة. التشتّت بين Amazon وNoon وTalabat وQ-Commerce يجعل التسريبات تمرّ دون أن تُلاحظ.',
    tags: ['Fragmented Dashboards', 'Multi-Platform'],
  },
];

export function RevenueLeakPains() {
  return (
    <section className="pains">
      <p className="section-label">أين يتسرّب الإيراد؟</p>
      <h2 className="pains__title">أين يتسرّب الإيراد على منصاتك؟</h2>

      <div className="pains__grid">
        {PAINS.map((p, i) => (
          <article key={i} className="pain-card">
            <h3 className="pain-card__title">{p.title}</h3>
            <p className="muted">{p.body}</p>
            <div className="pain-card__tags">
              {p.tags.map((t) => <span key={t} className="metric-tag">{t}</span>)}
            </div>
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
        <p className="hint">إذا لم تكن تقيس هذا يوميًا، قد يكون التسريب أكبر من المتوقّع. (مثال توضيحي، لا وعد بالتوفير.)</p>
      </div>
    </section>
  );
}
