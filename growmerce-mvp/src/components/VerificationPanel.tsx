/** What Growmerce would need next to validate the finding on real data (bridges to handoff). */
export function VerificationPanel({ steps }: { steps: string[] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <section className="panel verification" aria-label="خطوات التحقّق">
      <h3 className="panel__title">ما نحتاجه للتأكّد على بياناتك الحقيقية</h3>
      <p className="hint">هذه ليست أرقامًا حقيقية بعد — هذه الخطوات تنقل القراءة من ترجيح إلى تأكيد.</p>
      <ul className="verification__list">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
