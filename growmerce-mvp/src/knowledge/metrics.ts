/*
  Growmerce metric dictionary (knowledge brain).
  Specialist definitions used in positioning, audit questions, and report language.
  Static knowledge — not live data.
*/
import type { Vertical } from './platforms';

export interface MetricKnowledge {
  id: string;
  vertical: Vertical | 'all';
  abbr?: string;
  definition_ar: string;
  definition_en: string;
  healthyTarget?: string;
  warningThreshold?: string;
  platformImpact: string; // AR — why it matters on platforms
  relatedPatterns: string[];
}

export const METRICS: MetricKnowledge[] = [
  { id: 'gmv', vertical: 'all', abbr: 'GMV', definition_ar: 'إجمالي قيمة البضائع المباعة عبر المنصة.', definition_en: 'Gross Merchandise Value.', platformImpact: 'أساس قياس العمولة وصافي الإيراد.', relatedPatterns: ['FD-01'] },
  { id: 'take_rate', vertical: 'all', abbr: 'Take Rate', definition_ar: 'نسبة ما تأخذه المنصة من كل عملية.', definition_en: 'Platform take rate / commission %.', platformImpact: 'يحدّد عبء العمولة على الربح.', relatedPatterns: ['FD-01'] },
  { id: 'commission_burden', vertical: 'all', definition_ar: 'إجمالي العمولات والرسوم كنسبة من الإيراد.', definition_en: 'Total commission + fees as a share of revenue.', warningThreshold: '> 30٪ بدون نمو GMV', platformImpact: 'يأكل الربح بصمت إن لم يُقَس يوميًا.', relatedPatterns: ['FD-01'] },
  { id: 'fail_rate', vertical: 'food_delivery', definition_ar: 'نسبة الطلبات الفاشلة/المرفوضة/الملغاة.', definition_en: 'Order fail/cancel/reject rate.', healthyTarget: '< 3٪', warningThreshold: '> 5٪', platformImpact: 'يكبت الترتيب ويقلّل الطلبات.', relatedPatterns: ['FD-02'] },
  { id: 'acceptance_rate', vertical: 'food_delivery', definition_ar: 'نسبة قبول الطلبات الواردة.', definition_en: 'Order acceptance rate.', healthyTarget: '> 95٪', platformImpact: 'القبول المنخفض يضر الظهور.', relatedPatterns: ['FD-02'] },
  { id: 'prep_time', vertical: 'food_delivery', definition_ar: 'زمن تحضير الطلب قبل الاستلام.', definition_en: 'Order preparation time.', warningThreshold: 'أعلى من المتوسّط للفئة', platformImpact: 'البطء يخفض الترتيب ورضا العميل.', relatedPatterns: ['FD-02'] },
  { id: 'mqi', vertical: 'food_delivery', abbr: 'MQI', definition_ar: 'مؤشّر جودة القائمة (صور/وصف/تصنيف).', definition_en: 'Menu Quality Index.', warningThreshold: 'صور ناقصة أو وصف ضعيف', platformImpact: 'القائمة الضعيفة تخفض التحويل والظهور.', relatedPatterns: ['FD-03'] },
  { id: 'vfd', vertical: 'food_delivery', abbr: 'VFD', definition_ar: 'حملات مموّلة من البائع داخل التطبيق.', definition_en: 'Vendor-Funded Deals.', platformImpact: 'تفويت نوافذها يضيّع طلبات موسمية.', relatedPatterns: ['FD-04'] },
  { id: 'buy_box', vertical: 'ecommerce', abbr: 'Buy Box', definition_ar: 'صندوق الشراء الفائز على صفحة المنتج.', definition_en: 'Buy Box ownership.', warningThreshold: 'فقدان متكرّر للـ Buy Box', platformImpact: 'فقدانه يعني فقدان غالبية المبيعات.', relatedPatterns: ['EC-01'] },
  { id: 'ahr', vertical: 'ecommerce', abbr: 'AHR', definition_ar: 'تقييم صحة الحساب على المنصة.', definition_en: 'Account Health Rating.', warningThreshold: 'تحذيرات/انخفاض AHR', platformImpact: 'تدهوره يهدّد استمرار البيع.', relatedPatterns: ['EC-02'] },
  { id: 'odr', vertical: 'ecommerce', abbr: 'ODR', definition_ar: 'معدّل عيوب الطلبات (مرتجعات/شكاوى).', definition_en: 'Order Defect Rate.', healthyTarget: '< 1٪', platformImpact: 'تجاوزه يعرّض الحساب للتعليق.', relatedPatterns: ['EC-02'] },
  { id: 'acos', vertical: 'ecommerce', abbr: 'ACOS', definition_ar: 'تكلفة الإعلان كنسبة من مبيعات الإعلان.', definition_en: 'Advertising Cost of Sales.', warningThreshold: 'ACOS مرتفع بلا ربح', platformImpact: 'ارتفاعه يأكل هامش الإعلان.', relatedPatterns: ['EC-03'] },
  { id: 'roas', vertical: 'ecommerce', abbr: 'ROAS', definition_ar: 'العائد على الإنفاق الإعلاني.', definition_en: 'Return On Ad Spend.', platformImpact: 'مؤشّر كفاءة الحملات.', relatedPatterns: ['EC-03'] },
  { id: 'tacos', vertical: 'ecommerce', abbr: 'TACOS', definition_ar: 'إجمالي تكلفة الإعلان كنسبة من إجمالي المبيعات.', definition_en: 'Total Advertising Cost of Sales.', warningThreshold: 'اعتماد كامل على الإعلان', platformImpact: 'يكشف الاعتماد المفرط على الإعلان مقابل النمو العضوي.', relatedPatterns: ['EC-03'] },
  { id: 'inventory_velocity', vertical: 'all', definition_ar: 'سرعة دوران المخزون.', definition_en: 'Inventory velocity.', platformImpact: 'يحدّد تغطية المخزون ومخاطر النفاد.', relatedPatterns: ['EC-05', 'QC-03'] },
  { id: 'fill_rate', vertical: 'qcommerce', definition_ar: 'نسبة تنفيذ الكميات المطلوبة من المتجر المظلم.', definition_en: 'Order fill rate.', healthyTarget: '> 95٪', warningThreshold: '< 90٪', platformImpact: 'ضعفه يقلّل الطلبات ويزيد الغرامات.', relatedPatterns: ['QC-02'] },
  { id: 'availability_score', vertical: 'qcommerce', definition_ar: 'درجة توفّر المنتجات على العُقد.', definition_en: 'Availability score.', warningThreshold: 'انخفاض التوفّر', platformImpact: 'ضعفه يخفض الظهور والمبيعات.', relatedPatterns: ['QC-01', 'QC-04'] },
  { id: 'oos_rate', vertical: 'qcommerce', abbr: 'OOS', definition_ar: 'نسبة نفاد المخزون (Out Of Stock).', definition_en: 'Out-of-stock rate.', warningThreshold: '> 5٪', platformImpact: 'يسبّب غرامات وفقدان ظهور.', relatedPatterns: ['QC-01'] },
  { id: 'dead_stock', vertical: 'qcommerce', definition_ar: 'مخزون راكد بطيء/متوقّف الحركة.', definition_en: 'Dead stock.', platformImpact: 'يجمّد رأس المال ويستهلك العقد.', relatedPatterns: ['QC-03'] },
  { id: 'stockout_penalty', vertical: 'qcommerce', definition_ar: 'غرامة المنصة عند نفاد المخزون.', definition_en: 'Stockout penalty.', platformImpact: 'تكلفة مباشرة وكبت ظهور.', relatedPatterns: ['QC-01'] },
  { id: 'serviceability', vertical: 'qcommerce', definition_ar: 'قدرة تغطية المناطق/العُقد بالخدمة.', definition_en: 'Serviceability coverage.', platformImpact: 'فجوتها تحدّ من الطلب الممكن.', relatedPatterns: ['QC-04'] },
];

export function metricById(id: string): MetricKnowledge | undefined {
  return METRICS.find((m) => m.id === id);
}
export function metricsByVertical(v: Vertical): MetricKnowledge[] {
  return METRICS.filter((m) => m.vertical === v || m.vertical === 'all');
}
