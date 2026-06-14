/*
  Growmerce platform audit pattern library (knowledge brain).
  Static, demo/deterministic pattern definitions — NOT real findings, NO external data.
  Used by mock scenarios and report display to speak platform-account-management language.
*/
import type { Vertical } from './platforms';

export interface PatternKnowledge {
  pattern_id: string;
  vertical: Vertical;
  title_ar: string;
  title_en: string;
  platforms: string[];      // platform ids
  signals: string[];        // AR signal phrases
  required_evidence: string[]; // AR evidence needed
  confidence_cap: number;   // honest cap until real data
  missing_data: string[];   // AR
  finding_template_ar: string;
  opportunity_template_ar: string;
  growth_ops_actions: string[]; // AR
}

export const PATTERNS: PatternKnowledge[] = [
  // ---- Food Delivery ----
  {
    pattern_id: 'FD-01', vertical: 'food_delivery',
    title_ar: 'عبء العمولة دون نمو في GMV', title_en: 'Commission Burden Without GMV Growth',
    platforms: ['talabat', 'hungerstation', 'jahez'],
    signals: ['عمولة مرتفعة', 'GMV ثابت', 'إنفاق إعلاني بلا أثر واضح'],
    required_evidence: ['GMV شهري', 'نسبة العمولة', 'إنفاق VFD/CPC'], confidence_cap: 55,
    missing_data: ['صافي الإيراد بعد الرسوم', 'تكلفة الأصناف'],
    finding_template_ar: 'العمولة تأكل هامشك بينما GMV لا ينمو — التسريب في الاقتصاد لا في الطلب.',
    opportunity_template_ar: 'تحليل عبء العمولة وإعادة توجيه الإنفاق نحو ما يرفع الطلبات المربحة.',
    growth_ops_actions: ['تحليل العمولة', 'إعادة هيكلة VFD/CPC', 'هندسة القائمة للربح'],
  },
  {
    pattern_id: 'FD-02', vertical: 'food_delivery',
    title_ar: 'كبت الترتيب بسبب ارتفاع fail rate', title_en: 'Fail Rate Ranking Suppression',
    platforms: ['talabat', 'hungerstation', 'jahez', 'keeta'],
    signals: ['fail rate مرتفع', 'قبول منخفض', 'وقت تحضير طويل'],
    required_evidence: ['fail rate', 'acceptance rate', 'prep time'], confidence_cap: 55,
    missing_data: ['سجل الطلبات الفاشلة', 'أسباب الرفض'],
    finding_template_ar: 'ارتفاع fail rate يكبت ترتيبك على المنصة فتقل الطلبات قبل أن تصل.',
    opportunity_template_ar: 'تشغيل SOP لخفض fail rate وانضباط التوفّر ومعايرة وقت التحضير.',
    growth_ops_actions: ['SOP خفض fail rate', 'انضباط التوفّر', 'معايرة وقت التحضير'],
  },
  {
    pattern_id: 'FD-03', vertical: 'food_delivery',
    title_ar: 'فجوة جودة القائمة (MQI)', title_en: 'Menu Quality Index Gap',
    platforms: ['talabat', 'hungerstation', 'jahez', 'keeta'],
    signals: ['صور ناقصة', 'وصف ضعيف', 'تصنيف غير مرتّب'],
    required_evidence: ['تغطية صور القائمة', 'اكتمال الوصف عربي/إنجليزي'], confidence_cap: 55,
    missing_data: ['تحويل القائمة الفعلي'],
    finding_template_ar: 'جودة القائمة ضعيفة فتفقد تحويلًا وظهورًا رغم وجود الطلب.',
    opportunity_template_ar: 'إعادة بناء القائمة: صور احترافية ووصف ثنائي اللغة وترتيب يبيع.',
    growth_ops_actions: ['إعادة بناء القائمة', 'تصوير الأصناف', 'محتوى ثنائي اللغة'],
  },
  {
    pattern_id: 'FD-04', vertical: 'food_delivery',
    title_ar: 'تفويت تقويم الحملات الموسمية', title_en: 'Missed Campaign Calendar',
    platforms: ['talabat', 'hungerstation', 'jahez'],
    signals: ['عدم المشاركة في VFD', 'تفويت رمضان/المواسم'],
    required_evidence: ['سجل المشاركة في الحملات'], confidence_cap: 50,
    missing_data: ['أداء الحملات السابقة'],
    finding_template_ar: 'تفويت نوافذ الحملات الموسمية يضيّع طلبات لا تعود.',
    opportunity_template_ar: 'بناء تقويم VFD/CPC موسمي والاستعداد قبل كل نافذة.',
    growth_ops_actions: ['تقويم الحملات', 'تجهيز VFD مسبقًا', 'قياس الأثر'],
  },
  {
    pattern_id: 'FD-05', vertical: 'food_delivery',
    title_ar: 'فرصة بائع مؤسِّس على Keeta', title_en: 'Keeta Founding Vendor Opportunity',
    platforms: ['keeta'],
    signals: ['Keeta في نمو مبكّر', 'منافسة أقل حاليًا'],
    required_evidence: ['حالة الانضمام إلى Keeta'], confidence_cap: 45,
    missing_data: ['شروط النافذة الحالية'],
    finding_template_ar: 'نافذة دخول مبكّرة على Keeta قد تمنح أفضلية للمتقدّمين أولًا.',
    opportunity_template_ar: 'تجهيز الانضمام المبكّر إلى Keeta قبل اشتداد المنافسة.',
    growth_ops_actions: ['تجهيز انضمام Keeta', 'بناء القائمة', 'SOP التشغيل'],
  },
  // ---- E-Commerce ----
  {
    pattern_id: 'EC-01', vertical: 'ecommerce',
    title_ar: 'مخاطر Buy Box والتنافس السعري', title_en: 'Buy Box / Price Competitiveness Risk',
    platforms: ['amazon', 'noon'],
    signals: ['فقدان Buy Box', 'منافس أقل سعرًا'],
    required_evidence: ['حالة Buy Box', 'أسعار المنافسين'], confidence_cap: 55,
    missing_data: ['سجل فقدان Buy Box', 'هامش السعر'],
    finding_template_ar: 'فقدان Buy Box يحوّل مبيعاتك للمنافس رغم وجود الطلب على منتجك.',
    opportunity_template_ar: 'مراقبة Buy Box ومعالجة فجوة السعر والمحتوى لاستعادته.',
    growth_ops_actions: ['مراقبة Buy Box', 'مراجعة التسعير', 'تحسين القائمة'],
  },
  {
    pattern_id: 'EC-02', vertical: 'ecommerce',
    title_ar: 'مخاطر صحة الحساب على الإيراد', title_en: 'Account Health Revenue Risk',
    platforms: ['amazon', 'noon', 'jumia'],
    signals: ['تحذيرات AHR', 'ارتفاع ODR', 'قوائم معلّقة'],
    required_evidence: ['AHR', 'ODR', 'سجل التعليقات'], confidence_cap: 55,
    missing_data: ['أسباب العيوب', 'تاريخ المخالفات'],
    finding_template_ar: 'تدهور صحة الحساب يهدّد استمرار البيع قبل أن يظهر في المبيعات.',
    opportunity_template_ar: 'مراقبة AHR/ODR ومعالجة أسباب العيوب وحماية الحساب.',
    growth_ops_actions: ['مراقبة AHR/ODR', 'معالجة العيوب', 'خطة حماية الحساب'],
  },
  {
    pattern_id: 'EC-03', vertical: 'ecommerce',
    title_ar: 'إنفاق PPC بلا نمو عضوي', title_en: 'PPC Spend Without Organic Lift',
    platforms: ['amazon', 'noon'],
    signals: ['ACOS مرتفع', 'اعتماد كامل على الإعلان (TACOS)'],
    required_evidence: ['ACOS', 'TACOS', 'هيكل الحملات'], confidence_cap: 55,
    missing_data: ['الكلمات المهدِرة', 'التحويل العضوي'],
    finding_template_ar: 'الإعلان يحرّك المبيعات لكن لا يبني نموًا عضويًا — اعتماد مكلف.',
    opportunity_template_ar: 'إعادة هيكلة PPC وبناء الظهور العضوي لخفض TACOS.',
    growth_ops_actions: ['إعادة هيكلة PPC', 'تحسين القوائم للعضوي', 'تقرير ACOS/TACOS'],
  },
  {
    pattern_id: 'EC-04', vertical: 'ecommerce',
    title_ar: 'فجوة جودة القوائم وSEO العربي', title_en: 'Listing Quality / Arabic SEO Gap',
    platforms: ['amazon', 'noon', 'jumia'],
    signals: ['محتوى عربي ناقص', 'صور/كلمات ضعيفة'],
    required_evidence: ['اكتمال القائمة عربي/إنجليزي'], confidence_cap: 55,
    missing_data: ['تحويل صفحة المنتج'],
    finding_template_ar: 'ضعف المحتوى العربي يقلّل الظهور والتحويل في أسواق الخليج ومصر.',
    opportunity_template_ar: 'إعادة بناء القوائم بمحتوى عربي/إنجليزي وSEO وصور أفضل.',
    growth_ops_actions: ['إعادة بناء القوائم', 'SEO عربي', 'A+ content/صور'],
  },
  {
    pattern_id: 'EC-05', vertical: 'ecommerce',
    title_ar: 'مخاطر تغطية المخزون', title_en: 'Inventory Coverage Risk',
    platforms: ['amazon', 'noon', 'jumia'],
    signals: ['نقص أيام التغطية', 'نفاد متكرّر'],
    required_evidence: ['أيام المخزون', 'سرعة الدوران'], confidence_cap: 55,
    missing_data: ['خطة التوريد'],
    finding_template_ar: 'ضعف تغطية المخزون يهدّد الترتيب والمبيعات عند الذروة.',
    opportunity_template_ar: 'ضبط قواعد تغطية المخزون وخطة توريد تحمي الظهور.',
    growth_ops_actions: ['قواعد تغطية المخزون', 'تنبيهات النفاد', 'تخطيط التوريد'],
  },
  // ---- Q-Commerce ----
  {
    pattern_id: 'QC-01', vertical: 'qcommerce',
    title_ar: 'مخاطر غرامة نفاد المخزون', title_en: 'Stockout Penalty Risk',
    platforms: ['talabat_mart', 'noon_minutes', 'instashop'],
    signals: ['OOS مرتفع', 'غرامات نفاد', 'توفّر منخفض'],
    required_evidence: ['OOS rate', 'availability score'], confidence_cap: 55,
    missing_data: ['سجل الغرامات', 'تغطية المخزون بالعُقد'],
    finding_template_ar: 'نفاد المخزون يسبّب غرامات وكبت ظهور على المتاجر المظلمة.',
    opportunity_template_ar: 'قواعد تغطية المخزون ومراقبة OOS لمنع الغرامات.',
    growth_ops_actions: ['قواعد التوفّر', 'مراقبة OOS', 'تتبّع تنفيذ PO'],
  },
  {
    pattern_id: 'QC-02', vertical: 'qcommerce',
    title_ar: 'ضعف fill rate', title_en: 'Fill Rate Weakness',
    platforms: ['talabat_mart', 'noon_minutes', 'instashop', 'keemart'],
    signals: ['fill rate منخفض', 'تأخّر تنفيذ PO'],
    required_evidence: ['fill rate', 'PO SLA'], confidence_cap: 55,
    missing_data: ['أسباب نقص التنفيذ'],
    finding_template_ar: 'ضعف fill rate يقلّل الطلبات ويضر علاقتك بالمنصة.',
    opportunity_template_ar: 'انضباط تنفيذ أوامر الشراء ورفع fill rate.',
    growth_ops_actions: ['انضباط PO', 'تغطية المخزون', 'تقارير fill rate'],
  },
  {
    pattern_id: 'QC-03', vertical: 'qcommerce',
    title_ar: 'مخزون راكد وعدم تطابق سرعة الدوران', title_en: 'Dead Stock and Velocity Mismatch',
    platforms: ['talabat_mart', 'noon_minutes'],
    signals: ['مخزون راكد', 'دوران غير متطابق بالعُقد'],
    required_evidence: ['SKU بطيئة الحركة', 'دوران المخزون'], confidence_cap: 55,
    missing_data: ['بيانات الدوران بالعُقدة'],
    finding_template_ar: 'مخزون راكد يجمّد رأس المال ويشغل عُقد المتاجر المظلمة.',
    opportunity_template_ar: 'إعادة توزيع المخزون حسب سرعة الدوران بالعُقد.',
    growth_ops_actions: ['تحليل الدوران', 'تصفية الراكد', 'توزيع حسب العُقدة'],
  },
  {
    pattern_id: 'QC-04', vertical: 'qcommerce',
    title_ar: 'فجوة تغطية الخدمة', title_en: 'Serviceability Gap',
    platforms: ['talabat_mart', 'instashop', 'noon_minutes'],
    signals: ['مناطق غير مغطّاة', 'عُقد ناقصة'],
    required_evidence: ['تغطية الخدمة بالعُقد'], confidence_cap: 50,
    missing_data: ['خريطة الطلب مقابل التغطية'],
    finding_template_ar: 'فجوة تغطية الخدمة تحدّ من الطلب الممكن قبل أن يبدأ.',
    opportunity_template_ar: 'جاهزية العُقد وتوسيع التغطية حيث يوجد الطلب.',
    growth_ops_actions: ['جاهزية العُقد', 'تحليل التغطية', 'خطة توسّع'],
  },
  {
    pattern_id: 'QC-05', vertical: 'qcommerce',
    title_ar: 'فرصة مورّد مبكّر على Keemart', title_en: 'Keemart Early Vendor Opportunity',
    platforms: ['keemart'],
    signals: ['Keemart في نمو مبكّر'],
    required_evidence: ['حالة الانضمام إلى Keemart'], confidence_cap: 45,
    missing_data: ['شروط النافذة الحالية'],
    finding_template_ar: 'نافذة مورّد مبكّرة على Keemart قد تمنح أفضلية مبكّرة.',
    opportunity_template_ar: 'تجهيز انضمام Keemart المبكّر وجاهزية SKU.',
    growth_ops_actions: ['تجهيز انضمام Keemart', 'جاهزية SKU', 'قواعد التوفّر'],
  },
];

export function patternsByVertical(v: Vertical): PatternKnowledge[] {
  return PATTERNS.filter((p) => p.vertical === v);
}
export function patternById(id: string): PatternKnowledge | undefined {
  return PATTERNS.find((p) => p.pattern_id === id);
}
