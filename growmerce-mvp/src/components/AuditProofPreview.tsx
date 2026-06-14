/** Stage 6 — worked audit proof: finding → evidence → confidence → missing data → first fix. Example only. */
export function AuditProofPreview({ onAudit }: { onAudit: () => void }) {
  const evidence = [
    'الأصناف الأكثر ظهورًا ليست الأعلى هامشًا.',
    'العرض الأكثر طلبًا قد يخفض متوسط الربح بعد العمولة.',
    'لا توجد بيانات تكلفة كافية لرفع الثقة فوق «متوسطة».',
  ];
  return (
    <section className="audit-proof">
      <p className="section-label">كيف يبدو التقرير؟</p>
      <h2 className="audit-proof__title">مثال من تقرير التدقيق</h2>
      <p className="muted audit-proof__sub">
        لا نبدأ بحملة أو خصم. نبدأ بتحديد موضع التسرب، ثم نوضح الأدلة والبيانات الناقصة قبل أي تنفيذ.
      </p>

      <article className="dossier-mini">
        <span className="dossier-mini__tag">مثال توضيحي · وضع تجريبي</span>

        <div className="dossier-mini__block">
          <span className="os-label">الملاحظة</span>
          <p className="dossier-mini__finding">ترتيب قائمة التوصيل قد يدفع العملاء إلى أصناف عالية الطلب لكنها أقل ربحية.</p>
        </div>

        <div className="dossier-mini__block">
          <span className="os-label">الأدلّة</span>
          <ul className="dossier-mini__list">
            {evidence.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>

        <div className="dossier-mini__block">
          <span className="os-label">مستوى الثقة</span>
          <p className="dossier-mini__conf">ثقة متوسطة <span className="dossier-mini__conf-reason">— بسبب نقص بيانات الهامش</span></p>
        </div>

        <div className="dossier-mini__block">
          <span className="os-label">البيانات الناقصة</span>
          <p className="muted">تكلفة الأصناف، صافي الربح بعد العمولة، أداء العروض.</p>
        </div>

        <div className="dossier-mini__op">
          <span className="os-label">أول إصلاح تشغيلي</span>
          <p>إعادة ترتيب أوّل ٨ أصناف + اختبار عرض كومبو واحد عالي الهامش لمدة ٧ أيام.</p>
        </div>

        <button type="button" className="btn btn--primary dossier-mini__cta" onClick={onAudit}>
          افحص حسابك بنفس المنهج ←
        </button>
      </article>
    </section>
  );
}
