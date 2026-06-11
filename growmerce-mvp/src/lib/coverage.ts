/*
  Context coverage ("وضوح السياق") — Sprint 2.

  NOT diagnostic confidence and NOT a grade of the business. It only measures how complete
  the operator's *context* is, so they can see that more context → a clearer diagnosis.

  Weights (sum to 100):
    business type       = 20
    ≥1 channel          = 20
    main problem        = 20
    ≥1 product/item     = 15
    ≥1 competitor       = 15
    location/market     = 10
*/
import type { StructuredInput } from '../types';

export interface CoveragePart {
  key: string;
  label: string;
  points: number;
  done: boolean;
}

export interface Coverage {
  score: number; // 0..100
  parts: CoveragePart[];
}

export function computeCoverage(si: StructuredInput): Coverage {
  const hasLocation = !!(si.market?.region || si.market?.city || si.market?.country || si.market?.district);

  const parts: CoveragePart[] = [
    { key: 'businessType', label: 'نوع النشاط', points: 20, done: !!si.businessType },
    { key: 'channel', label: 'قناة بيع', points: 20, done: si.channels.length > 0 },
    { key: 'problem', label: 'المشكلة الأساسية', points: 20, done: !!si.mainProblem },
    { key: 'products', label: 'منتجات / أصناف', points: 15, done: si.products.length > 0 },
    { key: 'competitors', label: 'منافسون', points: 15, done: si.competitors.length > 0 },
    { key: 'location', label: 'الموقع / السوق', points: 10, done: hasLocation },
  ];

  const score = parts.reduce((sum, p) => sum + (p.done ? p.points : 0), 0);
  return { score, parts };
}

/** Minimum input to proceed: business type + ≥1 channel + main problem. */
export function meetsMinimum(si: StructuredInput): boolean {
  return !!si.businessType && si.channels.length > 0 && !!si.mainProblem;
}
