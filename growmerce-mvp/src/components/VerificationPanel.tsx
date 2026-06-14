import { Collapsible } from './Collapsible';

/** What Growmerce would need next to validate the finding on real data (bridges to handoff). Collapsible. */
export function VerificationPanel({ steps }: { steps: string[] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <Collapsible title="ما الذي نتحقّق منه على حساباتك" count={steps.length}>
      <p className="hint">هذه ليست أرقامًا حقيقية بعد — هذه الخطوات تنقل القراءة من ترجيح إلى تأكيد.</p>
      <ul className="verification__list">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Collapsible>
  );
}
