/*
  Scenario-aware Growth Operations execution examples (Sprint 4).
  "ما الذي يمكن أن نساعد في تشغيله؟" — these are execution EXAMPLES, not guaranteed results.
  Keyed by the finding's patternKey, with a business-type fallback.
*/
import type { BusinessType } from '../types';

const BY_PATTERN: Record<string, string[]> = {
  delivery_menu_merchandising: [
    'مراجعة ترتيب المنيو',
    'تحسين العروض والباقات',
    'مراجعة التسعير والعمولة',
    'اختبار عناصر ذات قيمة أعلى',
    'تحسين ظهور الأصناف المهمة',
  ],
  review_density_gap: [
    'تحسين صفحة المنتج',
    'مراجعة الصور والعنوان والوصف',
    'خطة مراجعات وثقة',
    'مقارنة السعر والقيمة',
    'ترتيب أولويات المنتجات',
  ],
  checkout_trust_gap: [
    'مراجعة صفحة المنتج',
    'تحسين الثقة قبل الدفع',
    'مراجعة رحلة السلة والدفع',
    'تحسين العرض الأول',
    'بناء متابعة بعد الزيارة أو الشراء',
  ],
  undetermined_leak: [
    'توضيح القناة والمشكلة الأساسية',
    'تجميع بيانات أوّلية للطلبات أو الزيارات',
    'تحديد أوضح إشارة للبدء',
  ],
};

const BY_TYPE: Partial<Record<BusinessType, string>> = {
  restaurant: 'delivery_menu_merchandising',
  marketplace_seller: 'review_density_gap',
  ecommerce_store: 'checkout_trust_gap',
};

/** Execution examples for the handoff, by finding pattern (fallback: business type, then generic). */
export function getGrowthOpsExamples(patternKey?: string, businessType?: BusinessType): string[] {
  if (patternKey && BY_PATTERN[patternKey]) return BY_PATTERN[patternKey];
  const mapped = businessType ? BY_TYPE[businessType] : undefined;
  if (mapped && BY_PATTERN[mapped]) return BY_PATTERN[mapped];
  return BY_PATTERN.undetermined_leak;
}
