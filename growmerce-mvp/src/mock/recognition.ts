/*
  Mock recognition cards (Sprint 1 placeholders).
  Pattern statements in the operator's felt language (19 / 21).
  All flagged provenance: 'demo'. Final copy + native review: later sprint.
*/
import type { PatternRecognition } from '../types';

export const RECOGNITION_CARDS: PatternRecognition[] = [
  {
    key: 'delivery_menu_hides_heroes',
    statement: 'قائمتك على تطبيق التوصيل تخفي الأصناف التي يُفترض أن تبيع.',
    vertical: 'restaurant',
    whyLine: 'ترتيب القائمة وصورها يقرّران المبيعات أكثر من الطبق نفسه.',
    provenance: 'demo',
  },
  {
    key: 'discount_erases_margin',
    statement: 'خصمك يرفع عدد الطلبات، لكنه يلتهم هامش الربح.',
    vertical: 'all',
    whyLine: 'الإيرادات قد ترتفع بينما الربح يتآكل بهدوء.',
    provenance: 'demo',
  },
  {
    key: 'trust_gap_checkout',
    statement: 'الزيارات تصل إلى صفحتك، لكن الثقة لا تكفي لإتمام الشراء.',
    vertical: 'ecommerce_store',
    whyLine: 'العميل يصل بنيّة الشراء ثم يتردّد عند لحظة القرار.',
    provenance: 'demo',
  },
  {
    key: 'review_density_gap',
    statement: 'تقييماتك تبدو جيدة للإنسان، لكنها ضعيفة أمام خوارزمية المتجر.',
    vertical: 'marketplace_seller',
    whyLine: 'حداثة التقييمات تحرّك الترتيب أكثر من عددها الإجمالي.',
    provenance: 'demo',
  },
];
