/**
 * Opportunity → action bridge (Sprint 4).
 * Moves the user from understanding to action — not a generic consultation CTA.
 * Calm, operator-grade: what we verify next, what we can execute, why it matters, what happens next.
 */
export function OpportunityBridge({
  verificationSteps,
  onContinue,
}: {
  verificationSteps: string[];
  onContinue: () => void;
}) {
  const topVerify = verificationSteps.slice(0, 3);
  return (
    <section className="panel bridge" aria-label="من التشخيص إلى التنفيذ">
      <h3 className="panel__title">لنحوّل التشخيص إلى خطة تنفيذ</h3>

      {topVerify.length > 0 && (
        <div className="bridge__block">
          <strong className="hint">ما الذي نتحقّق منه تاليًا</strong>
          <ul className="bridge__list">
            {topVerify.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      <div className="bridge__block">
        <strong className="hint">لماذا التنفيذ مهم</strong>
        <p className="muted">التشخيص يحدّد الفرصة؛ التنفيذ هو ما يحرّك الرقم فعليًا. لا نكتفي بالقول — نشغّل الإصلاح معك.</p>
      </div>

      <div className="bridge__block">
        <strong className="hint">ماذا يحدث إذا تابعت</strong>
        <p className="muted">نراجع هذا التشخيص على أرقامك الحقيقية، ونتّفق على أوّل إصلاحٍ نشغّله — بدون وعودٍ مضمونة، بل خطوة مبنية على الأدلّة.</p>
      </div>

      <button type="button" className="btn btn--primary btn--lg" onClick={onContinue}>
        لنحوّل التشخيص إلى خطة تنفيذ ←
      </button>
    </section>
  );
}
