import { SERVICE_TIERS, PRICING_PACKAGES, ADDONS, PRICING_NOTE_AR } from '../knowledge';

/** Stage 8 — service tiers + pricing packages (knowledge-driven; cautious pricing language). */
export function ServicePackagesSection({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="services">
      <p className="section-label">ماذا نشغّل لك</p>
      <h2 className="services__title">من التدقيق إلى التشغيل عبر كل منصة</h2>
      <p className="muted services__sub">
        أربع طبقات خدمة — من الإطلاق والتسجيل إلى التشغيل اليومي والنمو والتوسّع متعدّد المنصات.
      </p>

      {/* service tiers */}
      <div className="services__grid">
        {SERVICE_TIERS.map((t) => (
          <article key={t.id} className="service-card">
            <p className="os-label">{t.name_en}</p>
            <h3 className="service-card__title">{t.name_ar}</h3>
            <p className="muted">{t.summary_ar}</p>
            <ul className="service-card__list">
              {t.includes.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </article>
        ))}
      </div>

      {/* pricing packages */}
      <h3 className="services__pricing-title">الباقات</h3>
      <div className="pricing__grid">
        {PRICING_PACKAGES.map((p) => (
          <article key={p.id} className="pricing-card">
            <p className="os-label os-label--brand">{p.name_en}</p>
            <h4 className="pricing-card__title">{p.name_ar}</h4>
            <p className="hint">{p.forWho_ar}</p>
            <ul className="pricing-card__list">
              {p.includes.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="addons">
        <p className="os-label">إضافات</p>
        <div className="addons__chips">
          {ADDONS.map((a) => <span key={a} className="metric-tag">{a}</span>)}
        </div>
      </div>

      <p className="hint pricing-note">{PRICING_NOTE_AR}</p>

      <div className="services__cta">
        <button type="button" className="btn btn--primary btn--lg" onClick={onAudit}>
          ابدأ بالتدقيق المجاني ←
        </button>
      </div>
    </section>
  );
}
