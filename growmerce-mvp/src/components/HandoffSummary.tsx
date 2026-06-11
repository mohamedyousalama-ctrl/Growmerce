import type { HandoffSummary as HandoffSummaryType } from '../types';

const BAND_AR = { low: 'منخفضة', medium: 'متوسّطة', high: 'عالية', very_high: 'عالية جدًا' } as const;

/** The diagnostic context carried into the Growth Operations / WhatsApp handoff. */
export function HandoffSummary({ summary }: { summary: HandoffSummaryType }) {
  return (
    <div className="handoff__summary">
      <h3 className="panel__title">ملخّص ما وجدناه</h3>
      <p><strong>التشخيص:</strong> {summary.findingTitle}</p>
      <p><strong>الفرصة:</strong> {summary.opportunityTitle}</p>
      <p className="hint">مستوى الثقة: {BAND_AR[summary.confidenceBand]}</p>
      <p className="hint">{summary.contextDigest}</p>

      {summary.whatGrowmerceCanExecute && summary.whatGrowmerceCanExecute.length > 0 && (
        <>
          <p style={{ marginTop: 'var(--space-3)' }}><strong>ما يمكن أن تشغّله جرومرس:</strong></p>
          <ul className="handoff__exec">
            {summary.whatGrowmerceCanExecute.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
