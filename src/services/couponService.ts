import { Coupon } from '../types/database.types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { MOCK_COUPONS } from '../data/mockCatalog';

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

export const couponService = {
  async validateCoupon(code: string, cartSubtotal: number): Promise<CouponValidationResult> {
    const cleanCode = code.trim().toUpperCase();

    let coupon: Coupon | undefined;

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .eq('code', cleanCode)
          .eq('is_active', true)
          .gt('expiry_date', new Date().toISOString())
          .single();

        if (!error && data) {
          coupon = data as Coupon;
        }
      } catch (err) {
        console.warn('Supabase coupon check error:', err);
      }
    }

    if (!coupon) {
      coupon = MOCK_COUPONS.find(c => c.code === cleanCode && c.is_active);
    }

    if (!coupon) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Coupon "${cleanCode}" is invalid or expired.`,
      };
    }

    if (cartSubtotal < coupon.min_order_value) {
      const shortfall = coupon.min_order_value - cartSubtotal;
      return {
        isValid: false,
        discountAmount: 0,
        message: `Add items worth ₹${shortfall.toLocaleString('en-IN')} more to use coupon ${cleanCode}.`,
      };
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = Math.round((cartSubtotal * coupon.discount_value) / 100);
      if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
        discountAmount = coupon.max_discount_amount;
      }
    } else {
      discountAmount = Math.min(coupon.discount_value, cartSubtotal);
    }

    return {
      isValid: true,
      coupon,
      discountAmount,
      message: `Coupon "${cleanCode}" applied! You save ₹${discountAmount.toLocaleString('en-IN')}`,
    };
  },

  async getAllActiveCoupons(): Promise<Coupon[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .eq('is_active', true)
          .gt('expiry_date', new Date().toISOString());

        if (!error && data) {
          return data as Coupon[];
        }
      } catch (err) {
        console.warn('Supabase getAllActiveCoupons error:', err);
      }
    }
    return MOCK_COUPONS.filter(c => c.is_active);
  }
};
