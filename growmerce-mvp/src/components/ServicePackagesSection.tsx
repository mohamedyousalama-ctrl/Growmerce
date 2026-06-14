import { SERVICE_TIERS, PRICING_PACKAGES, ADDON_GROUPS, PRICING_NOTE_AR } from '../knowledge';

/** Stages 9–10 — services reframed as the execution path after diagnosis; grouped add-ons. */
export function ServicePackagesSection({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="services">
      <p className="section-label">من التشخيص إلى التشغيل اليومي</p>
      <h2 className="services__title">من التشخيص إلى التشغيل اليومي</h2>
      <p className="muted services__sub">
        بعد أن نعرف موضع التسرّب، نختار مسار التشغيل المناسب — من إطلاق الحسابات إلى التشغيل اليومي والنمو والتوسّع.
      </p>

      {/* service tiers = execution path (Arabic-first) */}
      <div className="services__grid">
        {SERVICE_TIERS.map((t) => (
          <article key={t.id} className="service-card">
            <h3 className="service-card__title">{t.name_ar}</h3>
            <p className="service-card__meta os-label">{t.name_en}</p>
            <p className="muted">{t.summary_ar}</p>
            <ul className="service-card__list">
              {t.includes.slice(0, 5).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </article>
        ))}
      </div>

      {/* pricing packages — starter audit is the recommended first step */}
      <h3 className="services__pricing-title">الباقات</h3>
      <div className="pricing__grid">
        {PRICING_PACKAGES.map((p) => {
          const recommended = p.id === 'starter';
          return (
            <article key={p.id} className={`pricing-card${recommended ? ' pricing-card--recommended' : ''}`}>
              {recommended && <span className="pricing-card__badge">أفضل نقطة بداية</span>}
              <h4 className="pricing-card__title">{p.name_ar}</h4>
              <p className="pricing-card__meta os-label os-label--brand">{p.name_en}</p>
              <p className="hint">{p.forWho_ar}</p>
              <ul className="pricing-card__list">
                {p.includes.slice(0, 5).map((x, i) => <li key={i}>{x}</li>)}
              </ul>
              {recommended && (
                <button type="button" className="btn btn--primary pricing-card__cta" onClick={onAudit}>ابدأ من هنا ←</button>
              )}
            </article>
          );
        })}
      </div>

      {/* grouped add-ons */}
      <div className="addon-groups">
        <p className="os-label">إضافات حسب الحاجة</p>
        <div className="addon-groups__grid">
          {ADDON_GROUPS.map((g) => (
            <div key={g.title_ar} className="addon-group">
              <h4 className="addon-group__title">{g.title_ar}</h4>
              <ul className="addon-group__list">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="hint pricing-note">{PRICING_NOTE_AR}</p>
    </section>
  );
}
