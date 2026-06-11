import type { ConfidenceBand, OpportunityRecommendation, Priority, Effort } from '../types';

const PRIORITY_AR: Record<Priority, string> = { now: 'الآن', next: 'التالي', plan: 'خطّط لها' };
const EFFORT_AR: Record<Effort, string> = { low: 'منخفض', medium: 'متوسّط', high: 'مرتفع' };
const BAND_AR: Record<ConfidenceBand, string> = { low: 'منخفضة', medium: 'متوسّطة', high: 'عالية', very_high: 'عالية جدًا' };

export interface OpportunityBasedOn {
  findingTitle: string;
  confidenceBand: ConfidenceBand;
  confidenceScore?: number;
  evidenceCount: number;
}

/** The single prioritised opportunity — decision support (20). Links back to its basis. */
export function OpportunityCard({
  opportunity,
  basedOn,
}: {
  opportunity: OpportunityRecommendation;
  basedOn?: OpportunityBasedOn;
}) {
  return (
    <article className="opportunity">
      <span className="opportunity__priority">الأولوية: {PRIORITY_AR[opportunity.priority]}</span>
      <h2 className="opportunity__title">{opportunity.title}</h2>
      <p className="muted">{opportunity.whyItMatters}</p>

      <div className="opportunity__meta">
        <span>
          <b>الأثر المتوقّع</b>
          {opportunity.impact.qualitative}
          {opportunity.impact.range ? ` · ${opportunity.impact.range}` : ''}
          {opportunity.impact.isEstimate ? ' (تقدير)' : ''}
        </span>
        <span><b>الجهد</b>{EFFORT_AR[opportunity.effort]}</span>
        <span><b>الأولوية</b>{PRIORITY_AR[opportunity.priority]}</span>
        <span><b>الثقة</b>{BAND_AR[opportunity.confidence.band]} · <span className="num">{opportunity.confidence.score}٪</span></span>
      </div>

      <div className="opportunity__first">
        <strong>الخطوة الأولى:</strong> {opportunity.firstAction}
      </div>

      {basedOn ? (
        <div className="opportunity__basedon">
          <strong className="hint">مبني على:</strong>
          <ul className="opportunity__basedon-list">
            <li>التشخيص: «{basedOn.findingTitle}»</li>
            <li>
              الثقة في التشخيص: {BAND_AR[basedOn.confidenceBand]}
              {typeof basedOn.confidenceScore === 'number' ? <> · <span className="num">{basedOn.confidenceScore}٪</span></> : null}
            </li>
            <li>الأدلّة: <span className="num">{basedOn.evidenceCount}</span> — راجعها أعلاه</li>
          </ul>
        </div>
      ) : (
        <p className="hint" style={{ marginTop: 'var(--space-3)' }}>
          مستندة إلى {opportunity.evidenceRefs.length} دليل — راجع الأدلّة والاستدلال أعلاه.
        </p>
      )}
    </article>
  );
}
