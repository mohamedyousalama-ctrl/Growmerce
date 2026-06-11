import { ProvenanceTag } from './ProvenanceTag';
import type { Provenance } from '../types';

/**
 * AI-suggestion-style card with the accept / edit / reject interaction model (04).
 * Sprint 1 shell: suggestions are mocked; actions are placeholders.
 */
export function SuggestionCard({
  title,
  suggestion,
  provenance = 'demo',
  onAccept,
  onEdit,
  onReject,
}: {
  title: string;
  suggestion: string;
  provenance?: Provenance;
  onAccept?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
}) {
  return (
    <div className="card suggestion">
      <div className="suggestion__head">
        <strong>{title}</strong>
        <ProvenanceTag provenance={provenance} />
      </div>
      <p className="muted">{suggestion}</p>
      <div className="suggestion__actions">
        <button type="button" className="suggestion__btn" onClick={onAccept}>قبول</button>
        <button type="button" className="suggestion__btn" onClick={onEdit}>تعديل</button>
        <button type="button" className="suggestion__btn" onClick={onReject}>رفض</button>
      </div>
    </div>
  );
}
