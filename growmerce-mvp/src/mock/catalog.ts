/*
  Shared option catalogs for the Structured Input experience (Sprint 2).
  Arabic-first, operator-grade. Channels map to the typed ChannelType model (24/09).
  These are option sets, not intelligence — kept in one place so input + suggestions agree.
*/
import type { BusinessType, ChannelType, MarketKey, ProductKind } from '../types';

export interface BusinessTypeOption {
  key: BusinessType;
  label: string;
  /** default kind for items added under this business type */
  itemKind: ProductKind;
  itemNoun: string; // e.g. "أصناف" / "منتجات" / "فئات"
}

export const BUSINESS_TYPES: BusinessTypeOption[] = [
  { key: 'restaurant', label: 'مطعم / تطبيق توصيل', itemKind: 'meal', itemNoun: 'أصناف القائمة' },
  { key: 'marketplace_seller', label: 'بائع في سوق إلكتروني', itemKind: 'sku', itemNoun: 'منتجات' },
  { key: 'ecommerce_store', label: 'متجر إلكتروني', itemKind: 'sku', itemNoun: 'منتجات / صفحات' },
  { key: 'social_commerce', label: 'تجارة عبر التواصل / واتساب', itemKind: 'sku', itemNoun: 'منتجات' },
  { key: 'retail', label: 'تجزئة', itemKind: 'category', itemNoun: 'فئات' },
];

export interface ChannelOption {
  key: string; // unique channel id
  type: ChannelType;
  label: string;
  platformName?: string;
}

export const CHANNEL_OPTIONS: ChannelOption[] = [
  { key: 'store', type: 'store', label: 'متجري الإلكتروني' },
  { key: 'amazon', type: 'marketplace', label: 'أمازون', platformName: 'Amazon' },
  { key: 'noon', type: 'marketplace', label: 'نون', platformName: 'Noon' },
  { key: 'delivery', type: 'delivery', label: 'تطبيقات التوصيل' },
  { key: 'whatsapp', type: 'whatsapp', label: 'واتساب' },
  { key: 'instagram', type: 'social', label: 'إنستغرام', platformName: 'Instagram' },
  { key: 'tiktok', type: 'social', label: 'تيك توك', platformName: 'TikTok' },
  { key: 'other_marketplace', type: 'marketplace', label: 'سوق آخر', platformName: 'أخرى' },
];

export interface ProblemOption {
  key: string;
  label: string;
}

/** Operator-grade problem statements (not generic marketing categories). */
export const PROBLEMS: ProblemOption[] = [
  { key: 'flat_sales', label: 'مبيعاتي لا تنمو' },
  { key: 'busy_no_profit', label: 'الطلبات زادت لكن الربح لم يزد' },
  { key: 'competitor_stronger', label: 'المنافسون يبدون أقوى' },
  { key: 'promos_not_working', label: 'العروض والخصومات لا تعمل' },
  { key: 'weak_conversion', label: 'التحويل ضعيف — زيارات بلا شراء' },
  { key: 'low_aov', label: 'متوسّط قيمة الطلب منخفض' },
  { key: 'weak_repeat', label: 'تكرار الشراء ضعيف' },
  { key: 'weak_visibility', label: 'الظهور في السوق ضعيف' },
];

export interface MarketOption {
  key: MarketKey;
  label: string;
}

export const MARKETS: MarketOption[] = [
  { key: 'SA', label: 'السعودية' },
  { key: 'UAE', label: 'الإمارات' },
  { key: 'EG', label: 'مصر' },
  { key: 'GCC', label: 'دول الخليج' },
];

export function channelOptionByKey(key: string): ChannelOption | undefined {
  return CHANNEL_OPTIONS.find((c) => c.key === key);
}

export function problemLabel(key?: string): string | undefined {
  return PROBLEMS.find((p) => p.key === key)?.label;
}

export function businessTypeOption(key?: BusinessType): BusinessTypeOption | undefined {
  return BUSINESS_TYPES.find((b) => b.key === key);
}
