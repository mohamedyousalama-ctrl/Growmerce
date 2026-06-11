import type { OpportunityRecommendation, Priority, Effort } from '../types';

const PRIORITY_AR: Record<Priority, string> = { now: 'الآن', next: 'التالي', plan: 'خطّط لها' };
const EFFORT_AR: Record<Effort, string> = { low: 'منخفض', medium: 'متوسّط', high: 'مرتفع' };
const BAND_AR = { low: 'منخفضة', medium: 'متوسّطة', high: 'عالية', very_high: 'عالية جدًا' } as const;

/** The single prioritised opportunity — decision support (20). Links back to its basis. */
export function OpportunityCard({ opportunity }: { opportunity: OpportunityRecommendation }) {
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
        <span><b>الثقة</b>{BAND_AR[opportunity.confidence.band]} · <span className="num">{opportunity.confidence.score}٪</span></span>
      </div>

      <div className="opportunity__first">
        <strong>الخطوة الأولى:</strong> {opportunity.firstAction}
      </div>

      <p className="hint" style={{ marginTop: 'var(--space-3)' }}>
        مستندة إلى {opportunity.evidenceRefs.length} دليل — راجع الأدلّة والاستدلال أعلاه.
      </p>
    </article>
  );
}
