import { platformsByVertical, type Vertical } from '../knowledge';

/** Stage 7 — action-led vertical cards ("which one is me?"), each with its own audit CTA. */
const VERTICALS: Array<{
  v: Vertical;
  title: string;
  problems: string;
  cta: string;
}> = [
  {
    v: 'ecommerce',
    title: 'أسواق التجارة الإلكترونية',
    problems: 'Buy Box، صحة الحساب، PPC، ODR، الكتالوج.',
    cta: 'ابدأ تدقيق السوق الإلكتروني',
  },
  {
    v: 'food_delivery',
    title: 'تطبيقات توصيل الطعام',
    problems: 'Fail rate، MQI، وقت التحضير، ترتيب القائمة، VFD.',
    cta: 'ابدأ تدقيق تطبيق التوصيل',
  },
  {
    v: 'qcommerce',
    title: 'التجارة السريعة والمتاجر المظلمة',
    problems: 'نفاد المخزون، Fill Rate، التغطية، PO، التوفّر.',
    cta: 'ابدأ تدقيق التجارة السريعة',
  },
];

export function PlatformVerticals({ onAudit }: { onAudit: (vertical?: Vertical) => void }) {
  return (
    <section className="verticals">
      <p className="section-label">اختر نوع المنصة</p>
      <h2 className="verticals__title">اختر نوع المنصة التي تريد تدقيقها</h2>
      <p className="muted verticals__sub">
        أسواق التجارة الإلكترونية، تطبيقات التوصيل، والتجارة السريعة — تُدار بنظام تشغيل نمو واحد.
      </p>

      <div className="verticals__grid">
        {VERTICALS.map(({ v, title, problems, cta }) => (
          <article key={v} className="vertical-card">
            <header className="vertical-card__head">
              <h3 className="vertical-card__title">{title}</h3>
              <div className="vertical-card__platforms">
                {platformsByVertical(v).map((p) => (
                  <span key={p.id} className="platform-chip platform-chip--sm">{p.name}</span>
                ))}
              </div>
            </header>

            <div className="vertical-card__col">
              <p className="os-label">ما نفحصه</p>
              <p className="muted">{problems}</p>
            </div>

            <button type="button" className="btn btn--primary vertical-card__cta" onClick={() => onAudit(v)}>
              {cta} ←
            </button>
          </article>
        ))}
      </div>

      {/* compact jargon glossary — keeps the cards clean without tooltips */}
      <p className="verticals__glossary hint">
        مصطلحات نراقبها: <b>Buy Box</b> صندوق الشراء الفائز · <b>MQI</b> جودة القائمة · <b>VFD</b> خصومات ممولة من البائع ·
        <b> ODR</b> معدل مشاكل الطلبات · <b>PPC</b> إعلانات الدفع بالنقرة · <b>Fill Rate</b> نسبة تنفيذ الطلبات ·
        <b> PO</b> أمر شراء من المنصة.
      </p>
    </section>
  );
}
