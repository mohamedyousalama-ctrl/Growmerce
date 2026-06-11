import { useState, type KeyboardEvent } from 'react';

/** A small "type and add" control for free entities (products, competitors). Enter or button adds. */
export function AddChipInput({
  placeholder,
  onAdd,
  buttonLabel = 'إضافة',
}: {
  placeholder: string;
  onAdd: (value: string) => void;
  buttonLabel?: string;
}) {
  const [value, setValue] = useState('');

  const commit = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue('');
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    }
  };

  return (
    <div className="add-chip">
      <input
        className="add-chip__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        aria-label={placeholder}
      />
      <button type="button" className="btn add-chip__btn" onClick={commit} disabled={!value.trim()}>
        {buttonLabel}
      </button>
    </div>
  );
}
