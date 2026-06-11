import type { HandoffSummary as HandoffSummaryType } from '../types';

const BAND_AR = { low: 'منخفضة', medium: 'متوسّطة', high: 'عالية', very_high: 'عالية جدًا' } as const;

/** The diagnostic context carried into the Growth Operations / WhatsApp handoff. */
export function HandoffSummary({ summary }: { summary: HandoffSummaryType }) {
  return (
    <div className="handoff__summary">
      <h3 className="panel__title">ملخّص ما وجدناه</h3>

      {summary.businessContext && (
        <p><strong>نشاطك:</strong> {summary.businessContext}</p>
      )}
      <p><strong>التشخيص:</strong> {summary.findingTitle}</p>
      <p>
        <strong>الثقة في التشخيص:</strong> {BAND_AR[summary.confidenceBand]}
        {typeof summary.confidenceScore === 'number' ? <> · <span className="num">{summary.confidenceScore}٪</span></> : null}
      </p>
      <p><strong>الفرصة:</strong> {summary.opportunityTitle}</p>

      {summary.missingSummary && summary.missingSummary.length > 0 && (
        <>
          <p style={{ marginTop: 'var(--space-3)' }}><strong>ما يجب تأكيده:</strong></p>
          <ul className="handoff__list">
            {summary.missingSummary.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </>
      )}

      {summary.verificationSteps && summary.verificationSteps.length > 0 && (
        <>
          <p style={{ marginTop: 'var(--space-3)' }}><strong>خطوات التحقّق على أرقامك:</strong></p>
          <ul className="handoff__list">
            {summary.verificationSteps.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </>
      )}

      {summary.contextDigest && <p className="hint" style={{ marginTop: 'var(--space-3)' }}>{summary.contextDigest}</p>}
    </div>
  );
}
