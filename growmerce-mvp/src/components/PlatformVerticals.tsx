import { platformsByVertical, VERTICAL_LABELS, type Vertical } from '../knowledge';

/** Stage 2 — three platform verticals, platform-specific problems + what Growmerce manages. */
const VERTICALS: Array<{
  v: Vertical;
  problems: string[];
  manages: string[];
}> = [
  {
    v: 'ecommerce',
    problems: ['فقدان Buy Box', 'تحذيرات صحة الحساب (AHR)', 'مخاطر ODR', 'تعليق القوائم', 'فجوات مخزون FBA/FBN', 'هدر PPC', 'التباس ACOS/TACOS', 'نقص المحتوى العربي', 'منافس أقل سعرًا'],
    manages: ['تحسين الكتالوج والقوائم', 'SEO عربي/إنجليزي', 'مراقبة صحة الحساب', 'إعادة هيكلة PPC', 'مراجعة نموذج التنفيذ', 'تغطية المخزون', 'تقويم العروض', 'تقرير أداء أسبوعي'],
  },
  {
    v: 'food_delivery',
    problems: ['ارتفاع fail rate', 'ضعف قبول الطلبات', 'بطء وقت التحضير', 'انخفاض MQI', 'صور/وصف قائمة ضعيف', 'تفويت نوافذ VFD', 'عبء العمولة', 'كبت الترتيب', 'نافذة Keeta المبكّرة'],
    manages: ['إعادة بناء القائمة', 'SOP خفض fail rate', 'انضباط التوفّر', 'معايرة وقت التحضير', 'تقويم VFD/CPC', 'إعداد الحملات', 'تحليل عبء العمولة', 'تواصل مع AM المنصة'],
  },
  {
    v: 'qcommerce',
    problems: ['غرامة نفاد المخزون', 'ضعف fill rate', 'انخفاض درجة التوفّر', 'ضعف تغطية الخدمة', 'OOS مرتفع', 'مخزون راكد', 'عدم تطابق سرعة الدوران', 'مخاطر تنفيذ PO', 'فجوة تطابق الأسعار', 'فرصة Keemart المبكّرة'],
    manages: ['جاهزية المورّد', 'قائمة/شهادات SKU', 'تتبّع تنفيذ PO', 'انضباط fill rate', 'قواعد تغطية المخزون', 'مراقبة أسعار المنافسين', 'جاهزية عُقد المتاجر المظلمة', 'تجهيز انضمام Keemart'],
  },
];

export function PlatformVerticals({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="verticals">
      <p className="section-label">ثلاثة عوالم منصات · فريق تشغيل واحد</p>
      <h2 className="verticals__title">ثلاثة عوالم منصات. فريق تشغيل واحد.</h2>
      <p className="muted verticals__sub">
        Marketplaces, delivery apps, and dark-store platforms — managed through one Growth Operations system.
      </p>

      <div className="verticals__grid">
        {VERTICALS.map(({ v, problems, manages }) => (
          <article key={v} className="vertical-card">
            <header className="vertical-card__head">
              <h3 className="vertical-card__title">{VERTICAL_LABELS[v].ar}</h3>
              <p className="vertical-card__en os-label">{VERTICAL_LABELS[v].en}</p>
              <div className="vertical-card__platforms">
                {platformsByVertical(v).map((p) => (
                  <span key={p.id} className="platform-chip platform-chip--sm">{p.name}</span>
                ))}
              </div>
            </header>

            <div className="vertical-card__col">
              <p className="os-label">أين يتسرّب الإيراد</p>
              <ul className="vertical-card__list vertical-card__list--problem">
                {problems.slice(0, 6).map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>

            <div className="vertical-card__col">
              <p className="os-label">ما الذي نشغّله</p>
              <ul className="vertical-card__list vertical-card__list--manage">
                {manages.slice(0, 6).map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>

            <button type="button" className="btn vertical-card__cta" onClick={onAudit}>
              ابدأ تدقيق هذا النوع ←
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
