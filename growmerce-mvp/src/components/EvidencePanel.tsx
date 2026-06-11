import { ProvenanceTag } from './ProvenanceTag';
import type { EvidenceItem } from '../types';

const STRENGTH_AR: Record<EvidenceItem['strength'], string> = {
  weak: 'ضعيفة',
  moderate: 'متوسّطة',
  strong: 'قوية',
};

/** Shows what the conclusion is based on — proof with source + strength (22). */
export function EvidencePanel({ items }: { items: EvidenceItem[] }) {
  return (
    <section className="panel" aria-label="الأدلّة">
      <h3 className="panel__title">الأدلّة <span className="hint">— على ماذا استندنا</span></h3>
      {items.length === 0 ? (
        <p className="hint">هيكل تجريبي — ستظهر الأدلّة هنا.</p>
      ) : (
        <div className="evidence-list">
          {items.map((ev) => (
            <div key={ev.id} className="evidence-item">
              <span className="evidence-item__claim">{ev.claim}</span>
              <div className="evidence-item__meta">
                <ProvenanceTag provenance={ev.provenance} />
                <span>المصدر: {ev.source}</span>
                <span>المستوى: <span className="num">T{ev.tier}</span></span>
                <span>القوّة: {STRENGTH_AR[ev.strength]}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
