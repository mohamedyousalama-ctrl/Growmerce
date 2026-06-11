/*
  Mock diagnostic interface — Sprint 1 typed STUB.

  This is the single seam between the UI and (future) real intelligence.
  In Sprint 1 it returns a clearly-DEMO placeholder DiagnosticFinding for the hero
  restaurant / delivery-app scenario. It does NOT implement real reasoning, benchmarks,
  AI inference, or integrations. When the real engine (20/22/24/25) is built, ONLY this
  module changes — the UI contract stays identical.

  Every object below carries provenance: 'demo' and impact.isEstimate: true.
*/
import type { DiagnosticFinding, StructuredInput } from '../types';

export interface GetDiagnosticInput {
  structuredInput: StructuredInput;
}

/** Placeholder hero finding (restaurant on delivery apps). DEMO content only. */
const HERO_FINDING: DiagnosticFinding = {
  id: 'finding_demo_hero',
  patternKey: 'delivery_menu_hides_heroes',
  title: 'قائمتك على تطبيق التوصيل تُخفي أصنافك الأعلى ربحًا.',
  systemNarrative:
    '[محتوى تجريبي] لا توجد لديك مشكلة طلب — لديك مشكلة عرض: الأصناف التي يجب أن تتصدّر مدفونة في القائمة.',
  reasoningTrace: [
    'فحص الطلب مقابل العرض على القناة المختارة…',
    'الفصل بين الإيرادات والربح…',
    'مطابقة الإشارات مع أنماط القائمة والتوفّر…',
    'استبعاد التفسيرات البديلة…',
  ],
  patternMatch: {
    patternKey: 'delivery_menu_hides_heroes',
    name: 'إخفاء الأصناف البطلة في قائمة التوصيل',
    description:
      '[نمط تجريبي] القائمة مرتّبة بمنطق المطعم لا بمنطق المشتري، فتُدفن الأصناف الأعلى تحويلًا وربحًا.',
    causes: ['ترتيب القائمة', 'ضعف الصور', 'غياب إبراز الأصناف البطلة'],
  },
  evidence: [
    {
      id: 'ev_demo_1',
      claim: 'الأصناف الأعلى ربحًا تظهر أسفل القائمة.',
      type: 'menu_visibility',
      source: 'القائمة المُدخلة',
      tier: 2,
      strength: 'moderate',
      supports: 'finding_demo_hero',
      provenance: 'demo',
    },
    {
      id: 'ev_demo_2',
      claim: 'فجوات توفّر متكرّرة على أصناف الذروة.',
      type: 'availability',
      source: 'مُستنتج من السياق',
      tier: 3,
      strength: 'weak',
      supports: 'finding_demo_hero',
      provenance: 'demo',
    },
  ],
  confidence: {
    band: 'medium',
    score: 62,
    raisedBy: ['تطابق إشارتين مستقلّتين', 'منطق العرض واضح في القائمة'],
    reducedBy: ['لا تتوفّر بيانات مبيعات فعلية بعد'],
    wouldImprove: ['ربط بيانات الطلبات', 'إضافة بيانات التكلفة لتقييم الربح'],
    cap: 'medium',
    capReason: 'بدون بيانات التكلفة لا يمكن تأكيد أثر الربح — السقف متوسّط.',
    provenance: 'demo',
  },
  missingData: [
    {
      id: 'md_demo_1',
      what: 'بيانات التكلفة لكل صنف',
      whyItMatters: 'تحدّد أي الأصناف رابحة فعلًا بعد التكاليف.',
      confidenceImpact: 'تسقف الثقة عند "متوسّطة".',
      provideNext: 'أضف تكلفة الأصناف الأعلى مبيعًا.',
    },
  ],
  ruledOut: [
    {
      id: 'ro_demo_1',
      hypothesis: 'المشكلة في حجم الطلب على القناة.',
      whyRuledOut: 'الطلب على الفئة قائم؛ الأصناف الصحيحة لا تظهر فحسب.',
      basis: 'إشارة العرض مقابل غياب إشارة ضعف الطلب.',
    },
    {
      id: 'ro_demo_2',
      hypothesis: 'المشكلة في السعر.',
      whyRuledOut: 'لا تتطابق اعتراضات السعر مع الوضع التنافسي.',
      basis: 'غياب دليل على حساسية سعرية حادّة.',
    },
  ],
  recommendedVerification: 'تأكيد عبر بيانات الطلبات الفعلية لأصناف القائمة.',
  opportunity: {
    id: 'opp_demo_hero',
    title: 'إعادة ترتيب القائمة لإبراز الأصناف الأعلى ربحًا.',
    impact: { qualitative: 'رفع متوسط قيمة الطلب والربح', range: '٥٪–١٢٪ (تقدير)', isEstimate: true },
    priority: 'now',
    effort: 'low',
    confidence: { band: 'medium', score: 62, provenance: 'demo' },
    whyItMatters: '[تجريبي] أسرع تحرّك وأقلّه مخاطرة: إظهار ما يجب أن يبيع.',
    firstAction: 'انقل أصنافك البطلة إلى أعلى القائمة وحسّن صورها.',
    evidenceRefs: ['ev_demo_1', 'ev_demo_2'],
    provenance: 'demo',
  },
  provenance: 'demo',
};

/**
 * Mock diagnostic. Sprint 1: returns the hero placeholder regardless of input.
 * (Deterministic per-input branching arrives in Sprint 3.)
 */
export async function getDiagnostic(input: GetDiagnosticInput): Promise<DiagnosticFinding> {
  // input is intentionally unused in Sprint 1 (stub). Referenced to keep the contract explicit.
  void input;
  // small delay so the "reasoning" state is perceptible in the skeleton
  await new Promise((r) => setTimeout(r, 600));
  return HERO_FINDING;
}
