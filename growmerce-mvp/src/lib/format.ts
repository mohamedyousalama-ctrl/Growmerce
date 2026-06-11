/* Small display helpers for Arabic maturity (board-11 Phase F). Display-only — no data change. */

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/** Convert Western digits in a string/number to Arabic-Indic digits (for Arabic contexts). */
export function arabicDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}
