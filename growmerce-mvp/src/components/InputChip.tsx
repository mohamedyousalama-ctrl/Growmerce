/** Selectable / editable chip for the structured-input experience (04). */
export function InputChip({
  label,
  selected,
  removable,
  onToggle,
  onRemove,
}: {
  label: string;
  selected?: boolean;
  removable?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
}) {
  return (
    <button
      type="button"
      className={`chip ${selected ? 'chip--selected' : ''}`}
      onClick={onToggle}
      aria-pressed={!!selected}
    >
      <span>{label}</span>
      {removable && (
        <span
          className="chip__remove"
          aria-label="إزالة"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          ✕
        </span>
      )}
    </button>
  );
}
