/*
  Mock context-structuring suggestions (Sprint 2).

  IMPORTANT: these are deterministic, demo CONTEXT suggestions — they help the operator
  structure their business picture. They are NOT market data and NOT intelligence findings.
  Everything is clearly marked as a suggestion/demo in the UI. No real data, no inference.
*/
import type { BusinessType } from '../types';

export interface ContextSuggestions {
  /** suggested item names (products / menu items / categories) */
  items: string[];
  /** suggested channel option keys (see catalog CHANNEL_OPTIONS) */
  channelKeys: string[];
  /** suggested problem keys (see catalog PROBLEMS) */
  problemKeys: string[];
  /** suggested competitor names — DEMO placeholders only */
  competitors: string[];
}

const EMPTY: ContextSuggestions = { items: [], channelKeys: [], problemKeys: [], competitors: [] };

const BY_TYPE: Record<BusinessType, ContextSuggestions> = {
  restaurant: {
    items: ['برجر', 'بطاطس', 'دجاج مقلي', 'مشروبات', 'كومبو وجبة'],
    channelKeys: ['delivery', 'whatsapp', 'instagram'],
    problemKeys: ['flat_sales', 'low_aov', 'promos_not_working'],
    competitors: ['مطعم منافس (تجريبي ١)', 'مطعم منافس (تجريبي ٢)'],
  },
  marketplace_seller: {
    items: ['المنتج الأعلى مبيعًا', 'منتج ضعيف الأداء', 'فئة رئيسية'],
    channelKeys: ['amazon', 'noon'],
    problemKeys: ['weak_visibility', 'competitor_stronger', 'busy_no_profit'],
    competitors: ['متجر منافس (تجريبي ١)', 'متجر منافس (تجريبي ٢)'],
  },
  ecommerce_store: {
    items: ['صفحة المنتج', 'سلّة الشراء', 'المنتج الأكثر زيارة'],
    channelKeys: ['store'],
    problemKeys: ['weak_conversion', 'flat_sales', 'weak_repeat'],
    competitors: ['متجر منافس (تجريبي)'],
  },
  social_commerce: {
    items: ['منتج رائج', 'عرض حزمة', 'منتج بطيء'],
    channelKeys: ['social', 'whatsapp', 'instagram'].filter((k) => k !== 'social'), // social maps via instagram/tiktok
    problemKeys: ['weak_conversion', 'low_aov', 'weak_repeat'],
    competitors: ['حساب منافس (تجريبي)'],
  },
  retail: {
    items: ['منتج رئيسي', 'فئة رئيسية'],
    channelKeys: ['store'],
    problemKeys: ['flat_sales', 'low_aov'],
    competitors: [],
  },
};

/** Deterministic, demo context suggestions based on business type. */
export function getSuggestions(businessType?: BusinessType): ContextSuggestions {
  if (!businessType) return EMPTY;
  return BY_TYPE[businessType] ?? EMPTY;
}
