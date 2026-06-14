/*
  Growmerce service offering + pricing architecture (knowledge brain).
  Static content. Pricing is intentionally framed as "starts from / depends on scope" —
  no guaranteed results, no fabricated numbers.
*/
export interface ServiceTier {
  id: string;
  name_ar: string;
  name_en: string;
  summary_ar: string;
  includes: string[]; // AR
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'onboarding', name_ar: 'إطلاق الحسابات وتجهيزها', name_en: 'Onboarding Services',
    summary_ar: 'تسجيل الحساب وتجهيز الكتالوج/القائمة والمحتوى والامتثال.',
    includes: ['تسجيل الحساب/المتجر', 'تجميع المستندات وKYC', 'إعداد القائمة/الكتالوج', 'محتوى عربي/إنجليزي', 'إعداد نموذج التنفيذ', 'تدريب على بوابة المنصة'],
  },
  {
    id: 'operations', name_ar: 'إدارة التشغيل اليومي', name_en: 'Ongoing Operations Management',
    summary_ar: 'مراقبة يومية وانضباط تشغيلي وتقارير وتواصل مع مدير الحساب.',
    includes: ['مراقبة fail rate/النفاد/القوائم يوميًا', 'دقّة القائمة/الكتالوج', 'تقرير أداء أسبوعي', 'تواصل مع AM المنصة', 'إدارة تقويم العروض'],
  },
  {
    id: 'growth', name_ar: 'النمو والحملات', name_en: 'Growth & Advertising',
    summary_ar: 'حملات مدفوعة وهندسة قائمة وتسعير وذكاء تنافسي ومحتوى.',
    includes: ['PPC/إعلانات مموّلة', 'هندسة القائمة', 'استراتيجية التسعير', 'ذكاء تنافسي', 'A+ content/تصوير/محتوى ثنائي اللغة'],
  },
  {
    id: 'expansion', name_ar: 'التوسّع متعدّد المنصات', name_en: 'Multi-Platform Expansion',
    summary_ar: 'إطلاق على منصات جديدة واتساق عبر القنوات وتوسّع جغرافي.',
    includes: ['إطلاق على منصات جديدة', 'اتساق عبر المنصات', 'توسّع جغرافي', 'فرص Keeta/Keemart المبكّرة'],
  },
];

export interface PricingPackage {
  id: string;
  name_ar: string;
  name_en: string;
  forWho_ar: string;
  includes: string[]; // AR
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter', name_ar: 'تدقيق المنصات المبدئي', name_en: 'Starter Platform Audit',
    forWho_ar: 'من يريد معرفة أين يتسرّب الإيراد أولًا.',
    includes: ['تدقيق المنصات', 'مراجعة القائمة/القوائم', 'مراجعة المؤشّرات', 'تقرير واحد', 'خطة عمل واحدة', 'تسليم عبر واتساب'],
  },
  {
    id: 'growth_ops', name_ar: 'عمليات النمو', name_en: 'Growth Operations',
    forWho_ar: 'من يريد تشغيلًا أسبوعيًا منضبطًا.',
    includes: ['مراقبة أسبوعية للمنصات', 'إدارة الكتالوج والقائمة', 'تقويم الحملات', 'فحص الأسعار', 'فحص صحة الحساب', 'تنسيق PPC/VFD', 'تقرير شهري'],
  },
  {
    id: 'scale', name_ar: 'باقة التوسّع متعدّد المنصات', name_en: 'Scale / Multi-Platform Pod',
    forWho_ar: 'من يدير عدّة منصات ويريد دفاعًا وتوسّعًا.',
    includes: ['مراقبة يومية', 'تواصل مع AM المنصات', 'تقارير GMV', 'متابعة معدل الفشل ومعالجته', 'مراجعة استراتيجية شهرية', 'توسّع لمنصات جديدة'],
  },
];

export const ADDONS: string[] = [
  'إدارة Amazon PPC',
  'إدارة Noon Ads',
  'تقويم VFD على Talabat/Jahez',
  'تصوير/محتوى القائمة',
  'إعادة بناء القوائم عربي/إنجليزي',
  'مراقبة نفاد المخزون في Q-Commerce',
  'تجهيز انضمام Keeta/Keemart',
  'إطلاق Jumia مصر',
  'مراقبة أسعار المنافسين',
  'تقرير GMV/الأرباح الشهري',
];

/** Grouped add-ons (4 categories) — easier to scan than a flat chip dump. */
export interface AddonGroup {
  title_ar: string;
  items: string[];
}
export const ADDON_GROUPS: AddonGroup[] = [
  { title_ar: 'إعلانات ومنصات', items: ['إدارة Amazon PPC', 'إدارة Noon Ads', 'تقويم VFD على Talabat/Jahez'] },
  { title_ar: 'المحتوى والقوائم', items: ['تصوير القائمة', 'محتوى عربي/إنجليزي', 'إعادة بناء الكتالوج'] },
  { title_ar: 'التوسّع', items: ['تجهيز انضمام Keeta', 'جاهزية Keemart', 'إطلاق Jumia مصر'] },
  { title_ar: 'الرقابة والتقارير', items: ['مراقبة أسعار المنافسين', 'تقرير GMV/الأرباح', 'مراقبة نفاد المخزون'] },
];

export const PRICING_NOTE_AR =
  'تبدأ الباقات حسب عدد المنصات، حجم الكتالوج أو القائمة، وتعقيد التشغيل اليومي. النطاق الدقيق يُحدَّد بعد التدقيق — دون وعودٍ مضمونة بالنمو.';
