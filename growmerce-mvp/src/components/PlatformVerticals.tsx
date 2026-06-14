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
    title: 'أسواق إلكترونية',
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
      <p className="section-label">ثلاثة أنواع من المنصات</p>
      <h2 className="verticals__title">ثلاثة أنواع من المنصات</h2>
      <p className="muted verticals__sub">
        أسواق إلكترونية، تطبيقات توصيل، وتجارة سريعة — تُدار بنظام تشغيل نمو واحد.
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
              <p className="os-label">أين يتسرّب الإيراد</p>
              <p className="muted">{problems}</p>
            </div>

            <button type="button" className="btn btn--primary vertical-card__cta" onClick={() => onAudit(v)}>
              {cta} ←
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
