import { ProvenanceTag } from './ProvenanceTag';
import { Collapsible } from './Collapsible';
import { track } from '../lib/analytics';
import type { EvidenceItem } from '../types';

const STRENGTH_AR: Record<EvidenceItem['strength'], string> = {
  weak: 'ضعيفة',
  moderate: 'متوسّطة',
  strong: 'قوية',
};

/** What the conclusion is based on — proof with source + strength + provenance (22). Collapsible. */
export function EvidencePanel({ items }: { items: EvidenceItem[] }) {
  const hasIllustrative = items.some((e) => e.provenance !== 'user');
  return (
    <Collapsible
      title="الأدلّة"
      hint="على ماذا استندنا"
      count={items.length}
      onOpen={() => track('evidence_opened')}
    >
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر الأدلّة هنا.</p>
      ) : (
        <>
          <div className="evidence-list">
            {items.map((ev) => (
              <div key={ev.id} className="evidence-item">
                <span className="evidence-item__claim">{ev.claim}</span>
                <div className="evidence-item__meta">
                  <ProvenanceTag provenance={ev.provenance} />
                  <span>المصدر: {ev.source}</span>
                  <span>المستوى: <span className="num">T{ev.tier}</span></span>
                  <span>القوّة: {STRENGTH_AR[ev.strength]}</span>
                  <span>يدعم التشخيص</span>
                </div>
              </div>
            ))}
          </div>
          {hasIllustrative && (
            <p className="hint" style={{ marginTop: 'var(--space-3)' }}>
              بعض الأدلّة هنا مُستنتجة أو مرجعية في هذه التجربة، وليست بيانات خارجية حقيقية — تُؤكَّد على أرقامك لاحقًا.
            </p>
          )}
        </>
      )}
    </Collapsible>
  );
}
