/*
  Growmerce platform taxonomy (knowledge brain).
  Static, specialist data — NOT live data, NO external calls. Used to power
  platform-specific positioning, diagnostic options, and report language.
*/
export type Vertical = 'ecommerce' | 'food_delivery' | 'qcommerce';

export interface PlatformKnowledge {
  id: string;
  name: string;
  vertical: Vertical;
  markets: string[];          // e.g. ['SA','UAE','EG','GCC']
  businessModel: string;      // short AR description of how vendors engage
  keyMetrics: string[];       // metric ids (see metrics.ts) most relevant
  coreRisks: string[];        // AR risk phrases
  serviceActions: string[];   // AR actions Growmerce operates
  commonDocuments: string[];  // AR onboarding docs
  campaignRelevance: string;  // AR note on campaigns/seasonality
  note?: string;              // optional positioning note (e.g. early window)
}

export const VERTICAL_LABELS: Record<Vertical, { ar: string; en: string }> = {
  ecommerce: { ar: 'أسواق التجارة الإلكترونية', en: 'E-Commerce Marketplaces' },
  food_delivery: { ar: 'تطبيقات توصيل الطعام', en: 'Food Delivery Platforms' },
  qcommerce: { ar: 'التجارة السريعة والمتاجر المظلمة', en: 'Q-Commerce / Dark Stores' },
};

export const PLATFORMS: PlatformKnowledge[] = [
  // ---- E-Commerce ----
  {
    id: 'amazon', name: 'Amazon', vertical: 'ecommerce', markets: ['SA', 'UAE', 'EG'],
    businessModel: 'بيع 1P/3P عبر FBA أو FBM مع صحة حساب وBuy Box.',
    keyMetrics: ['buy_box', 'ahr', 'odr', 'acos', 'tacos', 'inventory_velocity'],
    coreRisks: ['فقدان Buy Box', 'إنذارات صحة الحساب (AHR)', 'ارتفاع ODR', 'تعليق القوائم', 'هدر إنفاق PPC', 'نقص المخزون'],
    serviceActions: ['تحسين القوائم', 'SEO عربي/إنجليزي', 'مراقبة AHR/ODR', 'إعادة هيكلة PPC', 'مراجعة نموذج التخزين', 'تقويم العروض'],
    commonDocuments: ['سجل تجاري', 'شهادة ضريبية', 'علامة تجارية/براند ريجستري', 'فواتير موردين'],
    campaignRelevance: 'White Friday و11.11 ورمضان مواسم حرجة على Amazon.',
  },
  {
    id: 'noon', name: 'Noon', vertical: 'ecommerce', markets: ['SA', 'UAE', 'EG'],
    businessModel: 'بيع عبر FBN/FBP مع إعلانات Noon Ads.',
    keyMetrics: ['buy_box', 'odr', 'acos', 'inventory_velocity'],
    coreRisks: ['ضعف الظهور', 'هدر Noon Ads', 'نقص المحتوى العربي', 'تعليق القوائم'],
    serviceActions: ['إدارة Noon Ads', 'تحسين القوائم', 'تغطية المخزون (FBN)', 'مراقبة الأسعار'],
    commonDocuments: ['سجل تجاري', 'شهادة ضريبية', 'بيانات الحساب البنكي'],
    campaignRelevance: 'Yellow Friday ورمضان واليوم الوطني محطات رئيسية.',
  },
  {
    id: 'jumia', name: 'Jumia', vertical: 'ecommerce', markets: ['EG'],
    businessModel: 'بيع عبر FBJ أو شحن البائع في السوق المصري.',
    keyMetrics: ['odr', 'inventory_velocity', 'acos'],
    coreRisks: ['ضعف الظهور في مصر', 'نسبة إلغاء/إرجاع مرتفعة', 'نقص المخزون'],
    serviceActions: ['إطلاق وتجهيز الحساب', 'تحسين القوائم بالعربية', 'إدارة FBJ', 'تقويم العروض'],
    commonDocuments: ['سجل تجاري مصري', 'بطاقة ضريبية', 'حساب بنكي'],
    campaignRelevance: 'Black Friday والمواسم المحلية في مصر.',
  },
  // ---- Food Delivery ----
  {
    id: 'talabat', name: 'Talabat', vertical: 'food_delivery', markets: ['SA', 'UAE', 'EG', 'GCC'],
    businessModel: 'مطاعم على السوق مع عمولة وحملات ممولة من البائع (VFD).',
    keyMetrics: ['fail_rate', 'acceptance_rate', 'prep_time', 'mqi', 'commission_burden', 'vfd'],
    coreRisks: ['ارتفاع fail rate', 'ضعف جودة القائمة (MQI)', 'تفويت نوافذ VFD', 'عبء العمولة', 'كبت الترتيب'],
    serviceActions: ['إعادة بناء القائمة', 'SOP لخفض fail rate', 'انضباط التوفّر', 'معايرة وقت التحضير', 'تقويم VFD/CPC', 'تحليل العمولة'],
    commonDocuments: ['رخصة بلدية', 'سجل تجاري', 'صور قائمة', 'حساب بنكي'],
    campaignRelevance: 'رمضان والإجازات وحملات VFD الموسمية.',
  },
  {
    id: 'hungerstation', name: 'HungerStation', vertical: 'food_delivery', markets: ['SA'],
    businessModel: 'سوق توصيل سعودي مع إعلانات وحملات ممولة.',
    keyMetrics: ['fail_rate', 'acceptance_rate', 'prep_time', 'mqi', 'commission_burden'],
    coreRisks: ['ارتفاع fail rate', 'ضعف القائمة', 'كبت الترتيب', 'عبء العمولة'],
    serviceActions: ['تحسين القائمة', 'انضباط التوفّر', 'حملات مموّلة', 'تقارير أسبوعية'],
    commonDocuments: ['رخصة بلدية', 'سجل تجاري', 'صور قائمة'],
    campaignRelevance: 'رمضان واليوم الوطني السعودي مواسم ذروة.',
  },
  {
    id: 'jahez', name: 'Jahez', vertical: 'food_delivery', markets: ['SA'],
    businessModel: 'سوق توصيل سعودي مع إعلانات داخل التطبيق.',
    keyMetrics: ['fail_rate', 'acceptance_rate', 'prep_time', 'mqi'],
    coreRisks: ['ارتفاع fail rate', 'ضعف الظهور', 'ضعف صور القائمة'],
    serviceActions: ['تحسين القائمة والصور', 'SOP التشغيل', 'حملات الظهور', 'تواصل مع AM'],
    commonDocuments: ['رخصة بلدية', 'سجل تجاري', 'صور قائمة'],
    campaignRelevance: 'رمضان والمواسم المحلية.',
  },
  {
    id: 'keeta', name: 'Keeta', vertical: 'food_delivery', markets: ['SA'],
    businessModel: 'لاعب توصيل صاعد في السعودية بنافذة بائع مبكّرة.',
    keyMetrics: ['fail_rate', 'acceptance_rate', 'mqi'],
    coreRisks: ['تفويت نافذة التأسيس المبكّرة', 'ضعف الجاهزية التشغيلية'],
    serviceActions: ['تجهيز الانضمام المبكّر', 'بناء القائمة', 'SOP التشغيل', 'تجهيز الحملات'],
    commonDocuments: ['رخصة بلدية', 'سجل تجاري', 'صور قائمة'],
    campaignRelevance: 'نافذة دخول مبكّرة — أفضلية للمتقدّمين أولًا.',
    note: 'فرصة بائع مؤسِّس مبكّر (Keeta founding window).',
  },
  // ---- Q-Commerce ----
  {
    id: 'talabat_mart', name: 'Talabat Mart', vertical: 'qcommerce', markets: ['SA', 'UAE', 'GCC'],
    businessModel: 'متاجر مظلمة سريعة — توريد 1P/3P حسب العقدة.',
    keyMetrics: ['fill_rate', 'availability_score', 'oos_rate', 'stockout_penalty', 'inventory_velocity'],
    coreRisks: ['غرامة نفاد المخزون', 'ضعف fill rate', 'مخزون راكد', 'فجوة تغطية الخدمة'],
    serviceActions: ['جاهزية المورّد', 'انضباط fill rate', 'قواعد تغطية المخزون', 'مراقبة الأسعار'],
    commonDocuments: ['سجل تجاري', 'شهادات المنتجات', 'بيانات SKU', 'حساب بنكي'],
    campaignRelevance: 'مواسم الطلب المرتفع ورمضان.',
  },
  {
    id: 'instashop', name: 'InstaShop', vertical: 'qcommerce', markets: ['UAE', 'GCC'],
    businessModel: 'تجارة سريعة عبر المتاجر الشريكة.',
    keyMetrics: ['fill_rate', 'availability_score', 'oos_rate'],
    coreRisks: ['ضعف التوفّر', 'مخزون راكد', 'فجوة تطابق الأسعار'],
    serviceActions: ['جاهزية الكتالوج', 'انضباط التوفّر', 'مراقبة تطابق الأسعار'],
    commonDocuments: ['سجل تجاري', 'بيانات SKU', 'شهادات المنتجات'],
    campaignRelevance: 'مواسم الطلب في الإمارات والخليج.',
  },
  {
    id: 'noon_minutes', name: 'Noon Minutes', vertical: 'qcommerce', markets: ['SA', 'UAE'],
    businessModel: 'تجارة سريعة من متاجر Noon المظلمة.',
    keyMetrics: ['fill_rate', 'availability_score', 'oos_rate', 'stockout_penalty'],
    coreRisks: ['غرامة نفاد المخزون', 'ضعف fill rate', 'عدم تطابق سرعة الدوران بالعُقد'],
    serviceActions: ['جاهزية المورّد', 'تتبّع تنفيذ أوامر الشراء (PO)', 'قواعد تغطية المخزون'],
    commonDocuments: ['سجل تجاري', 'بيانات SKU', 'شهادات'],
    campaignRelevance: 'مواسم الطلب المرتفع.',
  },
  {
    id: 'keemart', name: 'Keemart', vertical: 'qcommerce', markets: ['SA'],
    businessModel: 'لاعب متاجر مظلمة صاعد بنافذة مورّد مبكّرة.',
    keyMetrics: ['fill_rate', 'availability_score', 'oos_rate'],
    coreRisks: ['تفويت نافذة المورّد المبكّرة', 'ضعف الجاهزية'],
    serviceActions: ['تجهيز انضمام Keemart المبكّر', 'جاهزية SKU', 'قواعد التوفّر'],
    commonDocuments: ['سجل تجاري', 'بيانات SKU', 'شهادات المنتجات'],
    campaignRelevance: 'نافذة دخول مبكّرة.',
    note: 'فرصة مورّد مبكّر (Keemart early vendor opportunity).',
  },
];

export function platformsByVertical(v: Vertical): PlatformKnowledge[] {
  return PLATFORMS.filter((p) => p.vertical === v);
}
export function platformById(id: string): PlatformKnowledge | undefined {
  return PLATFORMS.find((p) => p.id === id);
}
