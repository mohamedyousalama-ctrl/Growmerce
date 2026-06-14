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
    id: 'onboarding', name_ar: 'تجهيز الحسابات للإطلاق', name_en: 'Onboarding Services',
    summary_ar: 'تسجيل الحساب، تجهيز المستندات، بناء القائمة/الكتالوج، وتحضير نموذج التشغيل.',
    includes: ['تسجيل الحساب أو المتجر', 'تجهيز المستندات وKYC', 'إعداد القائمة/الكتالوج', 'محتوى عربي/إنجليزي', 'إعداد نموذج التشغيل', 'تدريب سريع على بوابة المنصة'],
  },
  {
    id: 'operations', name_ar: 'تشغيل يومي للحسابات', name_en: 'Ongoing Operations Management',
    summary_ar: 'مراقبة يومية، ضبط القائمة، متابعة المؤشرات، والتواصل مع مدير الحساب.',
    includes: ['متابعة معدل الفشل يوميًا', 'دقّة القائمة/الكتالوج', 'تقرير أداء أسبوعي', 'تواصل مع AM المنصة', 'تقويم العروض'],
  },
  {
    id: 'growth', name_ar: 'حملات ونمو مربح', name_en: 'Growth & Advertising',
    summary_ar: 'حملات ممولة، هندسة قائمة، تسعير، ومحتوى لرفع الطلبات دون تدمير الهامش.',
    includes: ['إدارة PPC / الإعلانات الممولة', 'تقويم VFD لتطبيقات التوصيل', 'هندسة القائمة', 'استراتيجية التسعير', 'ذكاء تنافسي', 'محتوى A+ / تصوير / ثنائي اللغة'],
  },
  {
    id: 'expansion', name_ar: 'توسّع متعدد المنصات', name_en: 'Multi-Platform Expansion',
    summary_ar: 'إطلاق على منصات جديدة، توحيد التشغيل، ومتابعة الأداء عبر القنوات.',
    includes: ['إطلاق على منصات جديدة', 'اتساق عبر المنصات', 'توسّع جغرافي', 'تجهيز Keeta / Keemart', 'إطلاق Jumia مصر'],
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
    forWho_ar: 'لمن يريد معرفة أين يتسرّب الإيراد أو الربح أولًا.',
    includes: ['تدقيق الحساب أو المنصة', 'مراجعة القائمة/الكتالوج', 'مراجعة المؤشّرات', 'تقرير واحد واضح', 'خطة عمل أولى'],
  },
  {
    id: 'growth_ops', name_ar: 'عمليات النمو', name_en: 'Growth Operations',
    forWho_ar: 'لمن يريد تشغيلًا أسبوعيًا منضبطًا بعد معرفة موضع التسرب.',
    includes: ['مراقبة أسبوعية للمنصات', 'إدارة الكتالوج والقائمة', 'تقويم الحملات', 'فحص الأسعار', 'فحص صحة الحساب', 'تنسيق PPC/VFD', 'تقرير شهري'],
  },
  {
    id: 'scale', name_ar: 'توسّع متعدد المنصات', name_en: 'Scale / Multi-Platform Pod',
    forWho_ar: 'لمن يدير عدة منصات ويريد دفاعًا وتوسعًا وتشغيلًا موحدًا.',
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
  { title_ar: 'إعلانات وحملات', items: ['إدارة Amazon PPC', 'إدارة Noon Ads', 'تقويم VFD لتطبيقات التوصيل'] },
  { title_ar: 'القوائم والمحتوى', items: ['تصوير القائمة', 'محتوى عربي/إنجليزي', 'إعادة بناء الكتالوج'] },
  { title_ar: 'توسّع المنصات', items: ['تجهيز انضمام Keeta', 'جاهزية Keemart', 'إطلاق Jumia مصر'] },
  { title_ar: 'رقابة وتقارير', items: ['مراقبة أسعار المنافسين', 'تقرير GMV/الأرباح', 'مراقبة نفاد المخزون'] },
];

export const PRICING_NOTE_AR =
  'تبدأ الباقات حسب عدد المنصات، حجم الكتالوج أو القائمة، وتعقيد التشغيل اليومي. النطاق الدقيق يُحدَّد بعد التدقيق — دون وعودٍ مضمونة بالنمو.';
