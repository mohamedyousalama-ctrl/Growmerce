/*
  Deterministic mock reasoning engine — Sprint 3.

  Branches on the captured StructuredInput to produce a believable, input-specific
  DiagnosticFinding for three scenarios (restaurant/delivery, marketplace seller,
  ecommerce store) + a guarded generic fallback for unclear input.

  This is DETERMINISTIC MOCK reasoning — NOT real AI, NOT real data, NOT benchmarks.
  Every output is provenance: 'demo'. Evidence items carry honest per-item provenance
  (user / inferred / benchmark / demo). Confidence is mocked but structured and capped
  honestly (no fake certainty).

  Source of truth: 19 (patterns), 20 (Brain: reasoning/confidence/GUARD), 22 (tiers/
  evidence), 23 (knowledge framing). Final real engine replaces this module only.
*/
import type {
  ConfidenceBand,
  DiagnosticFinding,
  EvidenceItem,
  StructuredInput,
} from '../types';
import { problemLabel } from './catalog';

type Scenario = 'restaurant' | 'marketplace' | 'ecommerce' | 'qcommerce' | 'generic';

/* ---------- scenario selection ---------- */
function selectScenario(si: StructuredInput): Scenario {
  // Stage 4 platform vertical takes precedence when chosen.
  if (si.platformVertical === 'qcommerce') return 'qcommerce';
  if (si.platformVertical === 'food_delivery') return 'restaurant';
  if (si.platformVertical === 'ecommerce') return 'marketplace';

  switch (si.businessType) {
    case 'restaurant':
      return 'restaurant';
    case 'marketplace_seller':
      return 'marketplace';
    case 'ecommerce_store':
      return 'ecommerce';
    default: {
      // social_commerce / retail / unknown → infer from channels, else generic
      const types = si.channels.map((c) => c.type);
      if (types.includes('delivery')) return 'restaurant';
      if (types.includes('marketplace')) return 'marketplace';
      if (types.includes('store')) return 'ecommerce';
      return 'generic';
    }
  }
}

/* ---------- helpers ---------- */
let n = 0;
const id = (p: string) => `${p}_${++n}`;

/** small deterministic confidence nudge from how much optional context was given */
function richnessBump(si: StructuredInput): number {
  let b = 0;
  if (si.products.length > 0) b += 2;
  if (si.competitors.length > 0) b += 2;
  if (si.market?.region || si.market?.city || si.market?.country) b += 1;
  if (si.links?.websiteUrl || si.links?.storeUrl || si.links?.menuUrl) b += 1;
  if (si.freeText) b += 1;
  return Math.min(b, 7);
}

const PROBLEM_FLAVOR: Record<string, string> = {
  flat_sales: 'وهذا يفسّر ثبات المبيعات رغم وجود الطلب.',
  busy_no_profit: 'وهذا يفسّر ارتفاع الطلبات دون ارتفاع الربح.',
  competitor_stronger: 'وهذا يجعل منافسك يبدو أقوى دون أن يكون منتجه أفضل.',
  promos_not_working: 'وهذا يفسّر ضعف أثر العروض رغم تكرارها.',
  weak_conversion: 'وهذا يفسّر ضعف التحويل رغم وصول الزيارات.',
  low_aov: 'وهذا ينعكس مباشرةً على انخفاض متوسّط قيمة الطلب.',
  weak_repeat: 'وهذا يضعف تكرار الشراء على المدى الأطول.',
  weak_visibility: 'وهذا يفسّر ضعف ظهورك مقارنةً بمنافسيك.',
};

function flavor(si: StructuredInput): string {
  return (si.mainProblem && PROBLEM_FLAVOR[si.mainProblem]) || '';
}

/* ---------- RESTAURANT / DELIVERY ---------- */
function restaurantFinding(si: StructuredInput): DiagnosticFinding {
  const fid = 'finding_restaurant';
  const hasMenu = si.products.length > 0;
  const evidence: EvidenceItem[] = [
    {
      id: id('ev'),
      claim: 'الأصناف الأعلى ربحًا تظهر في أسفل القائمة لا في صدارتها.',
      type: 'menu_visibility',
      source: hasMenu ? 'القائمة التي أدخلتها' : 'مُستنتج من نوع النشاط',
      tier: hasMenu ? 2 : 3,
      strength: hasMenu ? 'moderate' : 'weak',
      supports: fid,
      provenance: hasMenu ? 'user' : 'inferred',
    },
    {
      id: id('ev'),
      claim: 'فجوات توفّر متكرّرة على أصناف الذروة تُفقد طلبات جاهزة.',
      type: 'availability',
      source: 'افتراض مرجعي لفئة التوصيل',
      tier: 3,
      strength: 'weak',
      supports: fid,
      provenance: 'benchmark',
    },
  ];
  if (si.competitors.length > 0) {
    evidence.push({
      id: id('ev'),
      claim: 'منافس قريب يعرض حِزمًا (كومبو) أوضح وأبرز في القائمة.',
      type: 'offer_structure',
      source: 'إدخال تجريبي للمنافس',
      tier: 4,
      strength: 'weak',
      supports: fid,
      provenance: 'demo',
    });
  }

  return {
    id: fid,
    patternKey: 'delivery_menu_merchandising',
    title: 'قائمتك على تطبيق التوصيل تُخفي أصنافك الأعلى ربحًا — وجودة القائمة (MQI) تكبت ترتيبك.',
    systemNarrative: `لا تبدو المشكلة في حجم الطلب بقدر ما هي في العرض: الأصناف التي يجب أن تتصدّر مدفونة، وبعض أصناف الذروة تنفد، وعبء العمولة يأكل هامشك دون نمو في GMV. ${flavor(si)}`.trim(),
    reasoningTrace: [
      'قرأنا السياق: حدّدنا نوع النشاط (مطعم/توصيل) والقناة الأساسية.',
      'فصلنا بين مشكلة المبيعات ومشكلة الربح.',
      'فحصنا الاحتمالات: ظهور، تحويل، حجم سلّة، تكرار، أو تسعير.',
      'طابقنا الحالة مع نمط معروف في قوائم التوصيل: إخفاء الأصناف البطلة.',
      'استبعدنا تفسيرات أضعف لا تدعمها الإشارات.',
      'حدّدنا ما نحتاجه لرفع الثقة، وأصدرنا قراءة محفوظة.',
    ],
    patternMatch: {
      patternKey: 'delivery_menu_merchandising',
      name: 'إخفاء الأصناف البطلة في قائمة التوصيل',
      family: 'أنماط التوصيل — العرض والتوفّر',
      description: 'القائمة مرتّبة بمنطق المطعم لا بمنطق المشتري، فتُدفن الأصناف الأعلى تحويلًا وربحًا.',
      whyFits: 'نوع نشاطك وقناتك الأساسية وطبيعة المشكلة تتطابق مع هذا النمط المتكرّر.',
      whatWeakens: 'لو أظهرت بيانات الطلبات أن أصنافك البطلة تتصدّر فعلًا وتبيع جيدًا، يضعف هذا النمط.',
    },
    evidence,
    confidence: medium('restaurant', si, {
      raisedBy: ['تطابق نوع النشاط والقناة مع النمط', 'إشارتان مستقلّتان على العرض والتوفّر'],
      reducedBy: ['لا تتوفّر بيانات مبيعات/طلبات فعلية بعد'],
      wouldImprove: ['مشاركة مبيعات الأصناف آخر ٣٠ يومًا', 'إضافة بيانات التكلفة لتقييم الربح'],
      capReason: 'بدون بيانات الطلبات والتكلفة، يبقى سقف الثقة عند المتوسّط.',
    }),
    missingData: [
      { id: id('md'), what: 'مبيعات الأصناف الفعلية', whyItMatters: 'تؤكّد أي الأصناف يجب أن تتصدّر فعلًا.', confidenceImpact: 'ترفع الثقة فوق المتوسّط.', provideNext: 'صدّر مبيعات آخر ٣٠ يومًا.' },
      { id: id('md'), what: 'تكلفة الأصناف', whyItMatters: 'تحدّد الأعلى ربحًا لا الأعلى مبيعًا فقط.', confidenceImpact: 'تتيح تقييم أثر الربح.', provideNext: 'أضف تكلفة الأصناف الأعلى مبيعًا.' },
    ],
    ruledOut: [
      { id: id('ro'), hypothesis: 'المشكلة في حجم الطلب على القناة.', whyRuledOut: 'الطلب على الفئة قائم؛ الأصناف الصحيحة لا تظهر فحسب.', basis: 'إشارة العرض مقابل غياب إشارة ضعف الطلب.' },
      { id: id('ro'), hypothesis: 'المشكلة في السعر.', whyRuledOut: 'لا تتطابق اعتراضات السعر مع وضعك التنافسي.', basis: 'غياب دليل على حساسية سعرية حادّة.' },
    ],
    verificationSteps: [
      'شارك مبيعات الأصناف آخر ٣٠ يومًا.',
      'شارك أداء العروض الأخيرة.',
      'شارك رابط قائمتك على تطبيق التوصيل.',
      'شارك تكلفة/هامش الأصناف الأعلى مبيعًا.',
    ],
    opportunity: {
      id: id('opp'),
      title: 'إعادة ترتيب القائمة لإبراز الأصناف الأعلى ربحًا ومعالجة فجوات التوفّر.',
      impact: { qualitative: 'رفع متوسّط قيمة الطلب والربح', range: '٥٪–١٢٪ (تقدير)', isEstimate: true },
      priority: 'now',
      effort: 'low',
      confidence: { band: 'medium', score: 62, provenance: 'demo' },
      whyItMatters: 'أسرع تحرّك وأقلّه مخاطرة: إظهار ما يجب أن يبيع بدل شراء طلبات أكثر.',
      firstAction: 'انقل أصنافك البطلة إلى أعلى القائمة وحسّن صورها، وراقب التوفّر في الذروة.',
      evidenceRefs: evidence.map((e) => e.id),
      provenance: 'demo',
    },
    provenance: 'demo',
  };
}

/* ---------- MARKETPLACE SELLER ---------- */
function marketplaceFinding(si: StructuredInput): DiagnosticFinding {
  const fid = 'finding_marketplace';
  const evidence: EvidenceItem[] = [
    {
      id: id('ev'),
      claim: 'حداثة تقييماتك تراجعت بينما يتقدّم منافسون بتقييمات أحدث.',
      type: 'review_recency',
      source: 'افتراض مرجعي لفئة السوق',
      tier: 3,
      strength: 'moderate',
      supports: fid,
      provenance: 'benchmark',
    },
    {
      id: id('ev'),
      claim: 'تراجع الترتيب يصاحب تراجع الإشارات الحديثة لا ضعف المنتج.',
      type: 'rank_signal',
      source: 'مُستنتج من السياق',
      tier: 3,
      strength: 'weak',
      supports: fid,
      provenance: 'inferred',
    },
  ];
  if (si.products.length > 0) {
    evidence.push({
      id: id('ev'),
      claim: 'بطاقة المنتج (الصورة/العنوان) لا تبرز ميزتك في صفّ المقارنة.',
      type: 'listing_thumbnail',
      source: 'المنتجات التي أدخلتها',
      tier: 2,
      strength: 'moderate',
      supports: fid,
      provenance: 'user',
    });
  }

  return {
    id: fid,
    patternKey: 'review_density_gap',
    title: 'ظهورك على السوق (Amazon/Noon/Jumia) يتراجع — مخاطر Buy Box وصحة الحساب وحداثة التقييمات.',
    systemNarrative: `تقييماتك تبدو جيدة للإنسان لكنها ضعيفة أمام خوارزمية السوق التي تكافئ الحداثة، بينما قد تفقد Buy Box وتتراجع صحة الحساب (AHR/ODR). ${flavor(si)}`.trim(),
    reasoningTrace: [
      'قرأنا السياق: حدّدنا أنك بائع في سوق إلكتروني وقناتك الأساسية.',
      'فصلنا بين ضعف الظهور وضعف المنتج.',
      'فحصنا الاحتمالات: ترتيب، حداثة تقييمات، بطاقة المنتج، أو السعر.',
      'طابقنا الحالة مع نمط فجوة كثافة/حداثة التقييمات.',
      'استبعدنا تفسيرات أضعف لا تدعمها الإشارات.',
      'حدّدنا ما نحتاجه لرفع الثقة، وأصدرنا قراءة محفوظة.',
    ],
    patternMatch: {
      patternKey: 'review_density_gap',
      name: 'فجوة كثافة/حداثة التقييمات (Review Density Gap)',
      family: 'أنماط السوق — الترتيب والثقة',
      description: 'العدد الإجمالي للتقييمات يبدو جيدًا، لكن حداثتها تراجعت فخسرت إشارة الترتيب.',
      whyFits: 'نوع نشاطك وقناتك ومشكلة الظهور تتطابق مع هذا النمط المتكرّر في الأسواق.',
      whatWeakens: 'لو أظهرت بيانات الترتيب ثباتًا رغم تراجع الحداثة، يضعف هذا النمط.',
    },
    evidence,
    confidence: medium('marketplace', si, {
      raisedBy: ['تطابق القناة ومشكلة الظهور مع النمط', 'إشارة الحداثة مقابل إشارة الترتيب'],
      reducedBy: ['لا تتوفّر بيانات ترتيب/تقييمات فعلية بعد'],
      wouldImprove: ['مشاركة رابط القائمة', 'مشاركة سجلّ التقييمات والترتيب آخر فترة'],
      capReason: 'بدون بيانات الترتيب والتقييمات الفعلية، يبقى السقف عند المتوسّط.',
    }),
    missingData: [
      { id: id('md'), what: 'سجلّ التقييمات وحداثتها', whyItMatters: 'يؤكّد تراجع الحداثة مقابل المنافسين.', confidenceImpact: 'يرفع الثقة فوق المتوسّط.', provideNext: 'شارك رابط القائمة وتاريخ التقييمات.' },
      { id: id('md'), what: 'بيانات الترتيب/الظهور', whyItMatters: 'تربط تراجع الظهور بالحداثة لا بالمنتج.', confidenceImpact: 'تزيل أحد التفسيرات البديلة.', provideNext: 'شارك ترتيب كلماتك الرئيسية.' },
    ],
    ruledOut: [
      { id: id('ro'), hypothesis: 'المشكلة في جودة المنتج.', whyRuledOut: 'التقييمات التاريخية إيجابية في الغالب.', basis: 'غياب إشارة تدهور في رضا العملاء.' },
      { id: id('ro'), hypothesis: 'المشكلة في السعر فقط.', whyRuledOut: 'الظهور يتراجع حتى عند تكافؤ السعر تقريبًا.', basis: 'إشارة الحداثة أقوى تفسيرًا من فجوة السعر.' },
    ],
    verificationSteps: [
      'شارك رابط قائمتك في السوق.',
      'شارك سجلّ التقييمات وحداثتها.',
      'شارك ترتيب كلماتك الرئيسية وظهورك.',
      'شارك روابط أقوى منافسَين.',
    ],
    opportunity: {
      id: id('opp'),
      title: 'تشغيل محرّك لحداثة التقييمات لاستعادة إشارة الترتيب.',
      impact: { qualitative: 'تحسين الظهور والتحويل تدريجيًا', range: '٤٪–١٠٪ (تقدير)', isEstimate: true },
      priority: 'now',
      effort: 'medium',
      confidence: { band: 'medium', score: 64, provenance: 'demo' },
      whyItMatters: 'الحداثة تحرّك الترتيب أكثر من العدد الإجمالي — وهي أرخص إصلاحٍ مستدام.',
      firstAction: 'فعّل طلب تقييم بعد الشراء لأصنافك البطلة، وراقب الحداثة أسبوعيًا.',
      evidenceRefs: evidence.map((e) => e.id),
      provenance: 'demo',
    },
    provenance: 'demo',
  };
}

/* ---------- ECOMMERCE STORE ---------- */
function ecommerceFinding(si: StructuredInput): DiagnosticFinding {
  const fid = 'finding_ecommerce';
  const hasLinks = !!(si.links?.storeUrl || si.links?.websiteUrl);
  const evidence: EvidenceItem[] = [
    {
      id: id('ev'),
      claim: 'التسرّب يتركّز عند خطوة الالتزام (الدفع) لا في أعلى الرحلة.',
      type: 'funnel_dropoff',
      source: 'مُستنتج من نمط المشكلة',
      tier: 3,
      strength: 'moderate',
      supports: fid,
      provenance: 'inferred',
    },
    {
      id: id('ev'),
      claim: 'الإثبات والطمأنة (تقييمات/ضمان) ضعيفة عند لحظة القرار.',
      type: 'trust_signal',
      source: 'افتراض مرجعي لرحلة الشراء',
      tier: 3,
      strength: 'weak',
      supports: fid,
      provenance: 'benchmark',
    },
  ];
  if (hasLinks) {
    evidence.push({
      id: id('ev'),
      claim: 'صفحة المنتج/الدفع التي شاركتها لا تجيب أهم اعتراض قبل الشراء.',
      type: 'page_clarity',
      source: 'الرابط الذي أدخلته',
      tier: 2,
      strength: 'moderate',
      supports: fid,
      provenance: 'user',
    });
  }

  return {
    id: fid,
    patternKey: 'checkout_trust_gap',
    title: 'الزيارات تصل لكن الثقة لا تكفي لإتمام الشراء عند لحظة القرار.',
    systemNarrative: `العميل يصل بنيّة الشراء ثم يتردّد عند الالتزام لأن الطمأنة غير كافية في تلك اللحظة. ${flavor(si)}`.trim(),
    reasoningTrace: [
      'قرأنا السياق: حدّدنا أنك متجر إلكتروني وقناتك الأساسية.',
      'فصلنا بين مشكلة الزيارات ومشكلة التحويل.',
      'فحصنا الاحتمالات: ثقة، احتكاك دفع، وضوح صفحة، أو سعر.',
      'طابقنا الحالة مع نمط فجوة الثقة عند لحظة القرار.',
      'استبعدنا تفسيرات أضعف لا تدعمها الإشارات.',
      'حدّدنا ما نحتاجه لرفع الثقة، وأصدرنا قراءة محفوظة.',
    ],
    patternMatch: {
      patternKey: 'checkout_trust_gap',
      name: 'فجوة الثقة عند الدفع/صفحة المنتج',
      family: 'أنماط رحلة العميل — الثقة والاحتكاك',
      description: 'الرحلة تطلب الالتزام قبل أن تبني ثقة كافية، فيغادر العميل عند لحظة القرار.',
      whyFits: 'نوع نشاطك ومشكلة التحويل ووجود زيارات تتطابق مع هذا النمط.',
      whatWeakens: 'لو أظهرت بيانات القمع أن التسرّب أعلى الرحلة لا عند الدفع، يضعف هذا النمط.',
    },
    evidence,
    confidence: medium('ecommerce', si, {
      raisedBy: ['تطابق نوع النشاط ومشكلة التحويل مع النمط', 'وجود زيارات يستبعد مشكلة الطلب'],
      reducedBy: ['لا تتوفّر بيانات قمع/تحليلات فعلية بعد'],
      wouldImprove: ['مشاركة بيانات القمع (الخطوات)', 'مشاركة رابط صفحة المنتج/الدفع'],
      capReason: 'بدون بيانات القمع الفعلية، يبقى السقف عند المتوسّط.',
    }),
    missingData: [
      { id: id('md'), what: 'بيانات القمع خطوةً بخطوة', whyItMatters: 'تحدّد أين يتسرّب العميل بالضبط.', confidenceImpact: 'ترفع الثقة فوق المتوسّط.', provideNext: 'شارك تحويل كل خطوة في الدفع.' },
      { id: id('md'), what: 'الاعتراضات الشائعة قبل الشراء', whyItMatters: 'تكشف الطمأنة الغائبة عند القرار.', confidenceImpact: 'توجّه الإصلاح بدقّة.', provideNext: 'شارك أسئلة العملاء المتكرّرة.' },
    ],
    ruledOut: [
      { id: id('ro'), hypothesis: 'المشكلة في حجم الزيارات.', whyRuledOut: 'الزيارات موجودة؛ التسرّب لاحقٌ لها.', basis: 'إشارة التحويل مقابل غياب إشارة ضعف الزيارات.' },
      { id: id('ro'), hypothesis: 'المشكلة في السعر.', whyRuledOut: 'التردّد يظهر عند الالتزام لا عند رؤية السعر.', basis: 'موضع التسرّب أقرب للثقة منه للسعر.' },
    ],
    verificationSteps: [
      'شارك بيانات القمع (الزيارة → السلة → الدفع → الشراء).',
      'شارك رابط صفحة المنتج وصفحة الدفع.',
      'شارك سياسة الإرجاع/الضمان الحالية.',
      'شارك أبرز اعتراضات العملاء قبل الشراء.',
    ],
    opportunity: {
      id: id('opp'),
      title: 'وضع الإثبات وعكس المخاطرة عند لحظة الالتزام (الدفع).',
      impact: { qualitative: 'رفع التحويل من زيارات موجودة أصلًا', range: '٦٪–١٤٪ (تقدير)', isEstimate: true },
      priority: 'now',
      effort: 'low',
      confidence: { band: 'medium', score: 60, provenance: 'demo' },
      whyItMatters: 'تستعيد عملاء قرّروا الشراء بالفعل — أرخص تحويلٍ متاح.',
      firstAction: 'أضف تقييمات وضمانًا وإجابة أهم اعتراض مباشرةً عند خطوة الدفع.',
      evidenceRefs: evidence.map((e) => e.id),
      provenance: 'demo',
    },
    provenance: 'demo',
  };
}

/* ---------- Q-COMMERCE / DARK STORE ---------- */
function qcommerceFinding(si: StructuredInput): DiagnosticFinding {
  const fid = 'finding_qcommerce';
  const m = si.platformMetrics ?? {};
  const hasMetrics = !!(m.fillRate || m.oosRate || m.availabilityScore);
  const evidence: EvidenceItem[] = [
    {
      id: id('ev'),
      claim: 'إشارات على نفاد مخزون (OOS) متكرّر يهدّد الظهور ويعرّضك لغرامات نفاد.',
      type: 'stockout_signal',
      source: hasMetrics ? 'المقاييس التي أدخلتها' : 'افتراض مرجعي لفئة التجارة السريعة',
      tier: hasMetrics ? 2 : 3,
      strength: hasMetrics ? 'moderate' : 'weak',
      supports: fid,
      provenance: hasMetrics ? 'user' : 'benchmark',
    },
    {
      id: id('ev'),
      claim: 'ضعف fill rate وتغطية المخزون بالعُقد يقلّلان الطلبات المنفّذة.',
      type: 'fill_rate',
      source: 'مُستنتج من نموذج المتاجر المظلمة',
      tier: 3,
      strength: 'weak',
      supports: fid,
      provenance: 'inferred',
    },
  ];

  return {
    id: fid,
    patternKey: 'stockout_penalty_risk',
    title: 'نفاد المخزون وضعف fill rate يكبتان ظهورك على المتاجر المظلمة (Q-Commerce).',
    systemNarrative:
      `على منصات التجارة السريعة، التوفّر هو المبيعات: نفاد المخزون (OOS) يسبّب غرامات وكبت ظهور، وضعف fill rate يقلّل الطلبات المنفّذة. ${flavor(si)}`.trim(),
    reasoningTrace: [
      'قرأنا السياق: علامة FMCG/توزيع على منصات التجارة السريعة (Talabat Mart/Noon Minutes/InstaShop/Keemart).',
      'فصلنا بين ضعف الطلب وضعف التوفّر/التنفيذ.',
      'فحصنا الاحتمالات: نفاد المخزون، fill rate، تغطية الخدمة، أو المخزون الراكد.',
      'طابقنا الحالة مع نمط مخاطر غرامة نفاد المخزون وضعف fill rate.',
      'استبعدنا تفسيرات أضعف لا تدعمها الإشارات.',
      'حدّدنا ما نحتاجه لرفع الثقة على بيانات العُقد الفعلية.',
    ],
    patternMatch: {
      patternKey: 'stockout_penalty_risk',
      name: 'مخاطر غرامة نفاد المخزون وضعف fill rate',
      family: 'أنماط التجارة السريعة — التوفّر والتنفيذ',
      description: 'التوفّر على العُقد ضعيف فتُفقد طلبات جاهزة وتُفرض غرامات نفاد تكبت الظهور.',
      whyFits: 'نوع نشاطك (FMCG/Q-Commerce) ومنصّاتك تتطابق مع هذا النمط المتكرّر.',
      whatWeakens: 'لو أظهرت بيانات العُقد توفّرًا مرتفعًا وfill rate قويًا، يضعف هذا النمط.',
    },
    evidence,
    confidence: medium('qcommerce', si, {
      raisedBy: ['تطابق نموذج التجارة السريعة مع النمط', 'إشارتان على التوفّر والتنفيذ'],
      reducedBy: ['لا تتوفّر بيانات OOS/fill rate فعلية بعد'],
      wouldImprove: ['مشاركة OOS rate ودرجة التوفّر', 'مشاركة fill rate وتغطية المخزون بالعُقد'],
      capReason: 'بدون بيانات العُقد الفعلية، يبقى سقف الثقة عند المتوسّط.',
    }),
    missingData: [
      { id: id('md'), what: 'OOS rate ودرجة التوفّر', whyItMatters: 'تؤكّد حجم مخاطر النفاد.', confidenceImpact: 'ترفع الثقة فوق المتوسّط.', provideNext: 'شارك OOS rate لكل عُقدة.' },
      { id: id('md'), what: 'fill rate وتغطية المخزون', whyItMatters: 'تحدّد ضعف التنفيذ بدقّة.', confidenceImpact: 'تتيح ترجيح السبب الأقوى.', provideNext: 'شارك fill rate وأيام التغطية.' },
    ],
    ruledOut: [
      { id: id('ro'), hypothesis: 'المشكلة في ضعف الطلب على الفئة.', whyRuledOut: 'الطلب قائم؛ التوفّر/التنفيذ هو ما يكبت الطلبات.', basis: 'إشارة التوفّر مقابل غياب إشارة ضعف الطلب.' },
      { id: id('ro'), hypothesis: 'المشكلة في السعر فقط.', whyRuledOut: 'النفاد وضعف fill rate أقوى تفسيرًا من فجوة السعر.', basis: 'لا دليل كافٍ على حساسية سعرية حادّة.' },
    ],
    verificationSteps: [
      'شارك OOS rate ودرجة التوفّر لكل عُقدة.',
      'شارك fill rate والتزام تنفيذ أوامر الشراء (PO).',
      'شارك قائمة SKU بطيئة الحركة (المخزون الراكد).',
      'شارك تغطية الخدمة مقابل خريطة الطلب.',
    ],
    opportunity: {
      id: id('opp'),
      title: 'ضبط قواعد تغطية المخزون ومراقبة OOS لمنع الغرامات واستعادة الظهور.',
      impact: { qualitative: 'تقليل الغرامات ورفع الطلبات المنفّذة', range: '٥٪–١٢٪ (تقدير)', isEstimate: true },
      priority: 'now',
      effort: 'medium',
      confidence: { band: 'medium', score: 60, provenance: 'demo' },
      whyItMatters: 'على التجارة السريعة، حماية التوفّر أرخص من شراء طلبٍ جديد.',
      firstAction: 'فعّل قواعد حدّ إعادة الطلب لأهم SKU، وراقب OOS يوميًا على العُقد الأعلى طلبًا.',
      evidenceRefs: evidence.map((e) => e.id),
      provenance: 'demo',
    },
    provenance: 'demo',
  };
}

/* ---------- GENERIC (guarded, lower confidence) ---------- */
function genericFinding(si: StructuredInput): DiagnosticFinding {
  const fid = 'finding_generic';
  const evidence: EvidenceItem[] = [
    {
      id: id('ev'),
      claim: 'هناك إشارة على تسرّب في المبيعات، لكن السياق الحالي لا يحدّد مكانه بدقّة.',
      type: 'weak_signal',
      source: 'مُستنتج من مدخلات محدودة',
      tier: 4,
      strength: 'weak',
      supports: fid,
      provenance: 'inferred',
    },
  ];

  return {
    id: fid,
    patternKey: 'undetermined_leak',
    title: 'نرى إشارة مبكّرة على تسرّب في مبيعاتك، لكننا نحتاج سياقًا أوضح لتحديد مكانه.',
    systemNarrative: 'بالمعطيات الحالية لا يمكننا تثبيت السبب الأقوى بثقة كافية — هذه قراءة أوّلية تحتاج بيانات إضافية.',
    reasoningTrace: [
      'قرأنا السياق المتاح، وهو محدود حتى الآن.',
      'فصلنا بين مشكلة الطلب ومشكلة الربح ومشكلة التحويل.',
      'لم نتمكّن من ترجيح نمطٍ واحد بثقة كافية.',
      'فضّلنا التحفّظ بدل إصدار سبب غير مدعوم.',
      'حدّدنا ما نحتاجه لرفع الثقة قبل التثبيت.',
    ],
    patternMatch: {
      patternKey: 'undetermined_leak',
      name: 'تسرّب غير محدّد بعد',
      family: 'قيد التحديد',
      description: 'الإشارة موجودة لكن السياق غير كافٍ لترجيح نمطٍ بعينه.',
      whyFits: 'المدخلات الحالية لا ترجّح سيناريو محدّدًا بثقة.',
      whatWeakens: 'إضافة قناة أساسية واضحة وبيانات أوّلية يرجّح نمطًا محدّدًا.',
    },
    evidence,
    confidence: {
      band: 'low',
      score: 38 + richnessBump(si),
      raisedBy: ['وجود إشارة أوّلية على تسرّب'],
      reducedBy: ['سياق محدود', 'لا قناة/مشكلة واضحة بما يكفي', 'لا بيانات فعلية'],
      wouldImprove: ['تحديد القناة الأساسية بوضوح', 'تحديد المشكلة الأساسية', 'ربط بيانات أوّلية'],
      cap: 'low',
      capReason: 'القراءة أوّلية ومتحفّظة حتى يتّضح السياق.',
      provenance: 'demo',
    },
    missingData: [
      { id: id('md'), what: 'قناة بيع أساسية واضحة', whyItMatters: 'تحدّد أي مجموعة أنماط ننظر فيها.', confidenceImpact: 'ترفع الثقة من "منخفضة".', provideNext: 'حدّد قناتك الأساسية.' },
      { id: id('md'), what: 'مشكلة تجارية محدّدة', whyItMatters: 'توجّه التشخيص نحو السبب الأرجح.', confidenceImpact: 'تتيح ترجيح نمط.', provideNext: 'اختر المشكلة الأقرب لحالتك.' },
      { id: id('md'), what: 'بيانات أوّلية (طلبات/زيارات)', whyItMatters: 'تحوّل الإشارة إلى دليل.', confidenceImpact: 'ترفع الثقة بشكل ملموس.', provideNext: 'شارك أرقامًا أوّلية ولو تقريبية.' },
    ],
    ruledOut: [
      { id: id('ro'), hypothesis: 'السبب هو ضعف الطلب وحده.', whyRuledOut: 'لم نستبعده نهائيًا، لكن لا دليل كافٍ يرجّحه الآن.', basis: 'غياب إشارات كافية في السياق الحالي.' },
      { id: id('ro'), hypothesis: 'السبب هو الربح وحده.', whyRuledOut: 'لم نستبعده نهائيًا، لكن لا بيانات تكلفة لتأكيده.', basis: 'لا بيانات ربح/تكلفة متاحة.' },
    ],
    verificationSteps: [
      'حدّد قناتك الأساسية ومشكلتك الأساسية.',
      'أضف أصنافك/منتجاتك الرئيسية.',
      'شارك أرقامًا أوّلية للطلبات أو الزيارات.',
    ],
    opportunity: {
      id: id('opp'),
      title: 'ابدأ بأوضح إشارة: حدّد القناة والمشكلة لترجيح السبب الأقوى.',
      impact: { qualitative: 'توضيح مكان التسرّب قبل الإصلاح', isEstimate: true },
      priority: 'next',
      effort: 'low',
      confidence: { band: 'low', score: 42, provenance: 'demo' },
      whyItMatters: 'القرار الجيّد يبدأ من سياق أوضح، لا من تخمين.',
      firstAction: 'أكمل القناة الأساسية والمشكلة، ثم أعد التشخيص.',
      evidenceRefs: evidence.map((e) => e.id),
      provenance: 'demo',
    },
    provenance: 'demo',
  };
}

/* ---------- confidence helper (medium-capped scenarios) ---------- */
function medium(
  scenario: Exclude<Scenario, 'generic'>,
  si: StructuredInput,
  parts: { raisedBy: string[]; reducedBy: string[]; wouldImprove: string[]; capReason: string },
) {
  const base: Record<Exclude<Scenario, 'generic'>, number> = {
    restaurant: 58,
    marketplace: 60,
    ecommerce: 56,
    qcommerce: 57,
  };
  const score = Math.min(69, base[scenario] + richnessBump(si));
  const band: ConfidenceBand = 'medium';
  return {
    band,
    score,
    raisedBy: parts.raisedBy,
    reducedBy: parts.reducedBy,
    wouldImprove: parts.wouldImprove,
    cap: band,
    capReason: parts.capReason,
    provenance: 'demo' as const,
  };
}

/** Build a deterministic finding from the captured input. */
export function buildFinding(si: StructuredInput): DiagnosticFinding {
  n = 0; // stable ids per build
  switch (selectScenario(si)) {
    case 'restaurant':
      return restaurantFinding(si);
    case 'marketplace':
      return marketplaceFinding(si);
    case 'ecommerce':
      return ecommerceFinding(si);
    case 'qcommerce':
      return qcommerceFinding(si);
    default:
      return genericFinding(si);
  }
}
