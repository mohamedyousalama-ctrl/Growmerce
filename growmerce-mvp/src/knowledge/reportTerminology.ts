/*
  Growmerce report terminology (knowledge brain).
  Platform-account-management language for the audit/report surface. Static labels.
  Demo/honesty wording is preserved by the components that render these.
*/
export const REPORT_TERMS = {
  finding: { ar: 'تسريب الإيراد على المنصة', en: 'Platform Revenue Leak' },
  evidence: { ar: 'أدلّة المنصة', en: 'Platform Evidence' },
  confidence: { ar: 'درجة الثقة في التشخيص', en: 'Diagnostic Confidence' },
  missingData: { ar: 'البيانات المطلوبة قبل رفع الثقة', en: 'Data Needed Before Full Confidence' },
  ruledOut: { ar: 'فرضيات لم تثبت بعد', en: 'Hypotheses Not Proven Yet' },
  opportunity: { ar: 'أول عملية نمو مقترحة', en: 'First Growth Operation' },
  handoff: { ar: 'تسليم تدقيق المنصات', en: 'Platform Audit Handoff' },
  reasoning: { ar: 'كيف وصلنا إلى ذلك', en: 'How we reached this' },
  pattern: { ar: 'النمط المطابق على المنصة', en: 'Platform Pattern Matched' },
  verification: { ar: 'ما الذي نتحقّق منه على حساباتك', en: 'What we verify on your accounts' },
} as const;

/** Vertical-specific risk labels for display/illustration. */
export const RISK_LABELS = {
  food_delivery: [
    'Fail Rate Risk', 'Menu Quality Gap', 'Commission Burden', 'Prep Time Drag',
    'VFD Calendar Miss', 'Ranking Suppression Risk', 'Keeta Founding Window',
  ],
  ecommerce: [
    'Buy Box Risk', 'Account Health Risk', 'Listing Suppression', 'PPC Waste',
    'TACOS Dependency', 'Inventory Coverage Gap', 'Arabic Listing Gap', 'Competitor Price Pressure',
  ],
  qcommerce: [
    'Stockout Penalty Risk', 'Serviceability Gap', 'Fill Rate Weakness', 'Availability Score Risk',
    'Dead Stock Drag', 'Dark Store Velocity Mismatch', 'PO Fulfillment Risk', 'Price Parity Gap',
  ],
} as const;
