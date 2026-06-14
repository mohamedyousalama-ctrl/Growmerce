/*
  Growmerce seasonal campaign calendar (knowledge brain).
  Static planning reference — not live dates. Used for positioning + audit framing.
*/
import type { Vertical } from './platforms';

export interface SeasonalEvent {
  id: string;
  name_ar: string;
  name_en: string;
  markets: string[];
  verticals: Vertical[];
  leadTimeDays: number;
  recommendedActions: string[]; // AR
}

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  { id: 'ramadan', name_ar: 'رمضان', name_en: 'Ramadan', markets: ['SA', 'UAE', 'EG', 'GCC'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 45, recommendedActions: ['تجهيز القائمة/الكتالوج الموسمي', 'تقويم VFD/العروض', 'تغطية مخزون إضافية'] },
  { id: 'eid_fitr', name_ar: 'عيد الفطر', name_en: 'Eid Al Fitr', markets: ['SA', 'UAE', 'EG', 'GCC'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 21, recommendedActions: ['حملات العيد', 'تغطية المخزون', 'جاهزية التوصيل'] },
  { id: 'eid_adha', name_ar: 'عيد الأضحى', name_en: 'Eid Al Adha', markets: ['SA', 'UAE', 'EG', 'GCC'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 21, recommendedActions: ['حزم العيد', 'تجهيز المخزون', 'حملات موسمية'] },
  { id: 'sa_national', name_ar: 'اليوم الوطني السعودي', name_en: 'Saudi National Day', markets: ['SA'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 21, recommendedActions: ['عروض اليوم الوطني', 'محتوى محلي', 'تغطية المخزون'] },
  { id: 'sa_founding', name_ar: 'يوم التأسيس السعودي', name_en: 'Saudi Founding Day', markets: ['SA'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 21, recommendedActions: ['عروض التأسيس', 'محتوى محلي'] },
  { id: 'uae_national', name_ar: 'اليوم الوطني الإماراتي', name_en: 'UAE National Day', markets: ['UAE'], verticals: ['ecommerce', 'food_delivery', 'qcommerce'], leadTimeDays: 21, recommendedActions: ['عروض اليوم الوطني', 'محتوى محلي'] },
  { id: 'white_friday', name_ar: 'White Friday', name_en: 'White Friday', markets: ['SA', 'UAE', 'EG'], verticals: ['ecommerce', 'qcommerce'], leadTimeDays: 30, recommendedActions: ['تجهيز القوائم والأسعار', 'تغطية مخزون مكثّفة', 'حملات PPC/Ads'] },
  { id: '11_11', name_ar: '11.11', name_en: '11.11', markets: ['SA', 'UAE', 'EG'], verticals: ['ecommerce', 'qcommerce'], leadTimeDays: 30, recommendedActions: ['تجهيز العروض', 'مخزون الذروة', 'حملات إعلانية'] },
  { id: 'back_to_school', name_ar: 'العودة للمدارس', name_en: 'Back to School', markets: ['SA', 'UAE', 'EG', 'GCC'], verticals: ['ecommerce', 'qcommerce'], leadTimeDays: 30, recommendedActions: ['كتالوج موسمي', 'تغطية مخزون', 'حملات مستهدفة'] },
  { id: 'valentine', name_ar: 'عيد الحب', name_en: "Valentine's Day", markets: ['UAE', 'EG'], verticals: ['ecommerce', 'food_delivery'], leadTimeDays: 14, recommendedActions: ['حزم موسمية', 'حملات قصيرة'] },
];

export function eventsForVertical(v: Vertical): SeasonalEvent[] {
  return SEASONAL_EVENTS.filter((e) => e.verticals.includes(v));
}
