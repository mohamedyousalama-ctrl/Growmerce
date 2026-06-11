import { useState } from 'react';
import { ProvenanceTag } from './ProvenanceTag';

/**
 * Mocked competitor suggestions with accept / edit / reject (04).
 * Clearly marked as demo suggestions — NOT real market data.
 * `names` are the remaining (not yet handled) suggestions; parent removes handled ones.
 */
export function CompetitorSuggestions({
  names,
  onAccept,
  onReject,
}: {
  names: string[];
  onAccept: (name: string) => void;
  onReject: (name: string) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  if (names.length === 0) return null;

  return (
    <div className="card competitor-suggest">
      <div className="suggestion__head">
        <strong>منافسون مقترحون</strong>
        <ProvenanceTag provenance="demo" />
      </div>
      <p className="hint">اقتراحات لتنظيم السياق فقط — وليست بيانات سوق حقيقية. اقبل، عدّل، أو ارفض.</p>

      <ul className="competitor-suggest__list">
        {names.map((name) => {
          const isEditing = editing === name;
          return (
            <li key={name} className="competitor-suggest__row">
              {isEditing ? (
                <input
                  className="add-chip__input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  aria-label="تعديل اسم المنافس"
                  autoFocus
                />
              ) : (
                <span className="competitor-suggest__name">{name}</span>
              )}

              <div className="suggestion__actions">
                {isEditing ? (
                  <button
                    type="button"
                    className="suggestion__btn"
                    onClick={() => {
                      const v = draft.trim() || name;
                      onAccept(v);
                      setEditing(null);
                    }}
                  >
                    حفظ وإضافة
                  </button>
                ) : (
                  <>
                    <button type="button" className="suggestion__btn" onClick={() => onAccept(name)}>قبول</button>
                    <button
                      type="button"
                      className="suggestion__btn"
                      onClick={() => {
                        setEditing(name);
                        setDraft(name);
                      }}
                    >
                      تعديل
                    </button>
                    <button type="button" className="suggestion__btn" onClick={() => onReject(name)}>رفض</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
