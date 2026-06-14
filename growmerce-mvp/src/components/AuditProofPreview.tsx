/** Stage 6 — worked audit proof: finding → evidence → confidence → first fix. Example only. */
export function AuditProofPreview({ onAudit }: { onAudit: () => void }) {
  const evidence = [
    'الأصناف الأكثر ظهوراً ليست بالضرورة الأعلى هامشاً.',
    'العروض قد ترفع الطلبات لكنها تخفض متوسط الربح.',
    'غياب بيانات الهامش يمنع رفع الثقة في التشخيص.',
  ];
  return (
    <section className="audit-proof">
      <p className="section-label">مثال من تقرير التدقيق</p>
      <h2 className="audit-proof__title">مثال من تقرير التدقيق</h2>
      <p className="muted audit-proof__sub">
        لا نبدأ بالخدمات. نبدأ بتحديد التسرّب، ثم نثبت ما نعرفه وما نحتاجه قبل التنفيذ.
      </p>

      <article className="dossier-mini">
        <span className="dossier-mini__tag">مثال توضيحي · وضع تجريبي</span>

        <div className="dossier-mini__block">
          <span className="os-label">الملاحظة</span>
          <p className="dossier-mini__finding">قائمة التوصيل قد تدفع العملاء إلى أصناف أقل ربحية.</p>
        </div>

        <div className="dossier-mini__grid">
          <div className="dossier-mini__block">
            <span className="os-label">الأدلّة</span>
            <ul className="dossier-mini__list">
              {evidence.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
          <div className="dossier-mini__block">
            <span className="os-label">مستوى الثقة</span>
            <p className="dossier-mini__conf">متوسط</p>
            <p className="hint">يحتاج تأكيدًا من بيانات الطلبات والهامش قبل رفع الثقة.</p>
          </div>
        </div>

        <div className="dossier-mini__op">
          <span className="os-label">أول إصلاح تشغيلي</span>
          <p>إعادة ترتيب أوّل ٨ أصناف + اختبار عرض كومبو واحد عالي الهامش لمدة ٧ أيام.</p>
        </div>

        <button type="button" className="btn btn--primary dossier-mini__cta" onClick={onAudit}>
          ابدأ تدقيقًا مشابهًا ←
        </button>
      </article>
    </section>
  );
}
