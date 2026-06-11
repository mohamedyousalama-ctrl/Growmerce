import type { Provenance } from '../types';

const LABELS: Record<Provenance, string> = {
  user: 'من بياناتك',
  inferred: 'مُستنتج',
  benchmark: 'مرجعي',
  demo: 'بيانات تجريبية',
};

/** Honest provenance tag — demo/mock is explicitly, visibly marked. */
export function ProvenanceTag({ provenance }: { provenance: Provenance }) {
  return <span className={`prov prov--${provenance}`}>{LABELS[provenance]}</span>;
}

export function DemoBanner({ note }: { note?: string }) {
  return (
    <div className="demo-banner" role="note">
      <span aria-hidden>⚠︎</span>
      <span>{note ?? 'هذا عرض تجريبي — الذكاء هنا محاكى لإثبات التجربة، وليس بيانات حقيقية بعد.'}</span>
    </div>
  );
}
