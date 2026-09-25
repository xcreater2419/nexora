import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Coupon } from '../types/database.types';
import { couponService } from '../services/couponService';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  mrpTotal: number;
  mrpDiscount: number;
  couponDiscount: number;
  deliveryFee: number;
  totalPayable: number;
  totalSavings: number;
  appliedCoupon: Coupon | null;
  couponMessage: string | null;
  addToCart: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nexora_cart_items';
const COUPON_STORAGE_KEY = 'nexora_applied_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to save coupon to localStorage:', err);
    }
  }, [appliedCoupon]);

  // Recalculate coupon discount whenever items or coupon change
  useEffect(() => {
    const rawSubtotal = items.reduce((sum, item) => {
      const unitPrice = item.product.price + (item.variant?.price_adjustment || 0);
      return sum + (unitPrice * item.quantity);
    }, 0);

    if (appliedCoupon) {
      if (rawSubtotal < appliedCoupon.min_order_value) {
        setCouponDiscount(0);
        setCouponMessage(`Add ₹${(appliedCoupon.min_order_value - rawSubtotal).toLocaleString('en-IN')} more to reactivate coupon.`);
      } else {
        let disc = 0;
        if (appliedCoupon.discount_type === 'percentage') {
          disc = Math.round((rawSubtotal * appliedCoupon.discount_value) / 100);
          if (appliedCoupon.max_discount_amount && disc > appliedCoupon.max_discount_amount) {
            disc = appliedCoupon.max_discount_amount;
          }
        } else {
          disc = Math.min(appliedCoupon.discount_value, rawSubtotal);
        }
        setCouponDiscount(disc);
        setCouponMessage(`Coupon "${appliedCoupon.code}" applied! Saved ₹${disc.toLocaleString('en-IN')}`);
      }
    } else {
      setCouponDiscount(0);
      setCouponMessage(null);
    }
  }, [items, appliedCoupon]);

  const addToCart = (product: Product, variant?: ProductVariant | null, quantity: number = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        i => i.product_id === product.id && (i.variant_id ?? null) === (variant?.id ?? null)
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = Math.min(10, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }

      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        product_id: product.id,
        variant_id: variant?.id || null,
        quantity: Math.min(10, Math.max(1, quantity)),
        product,
        variant: variant || null
      };

      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: Math.min(10, quantity) } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const rawSubtotal = items.reduce((sum, item) => {
      const unitPrice = item.product.price + (item.variant?.price_adjustment || 0);
      return sum + (unitPrice * item.quantity);
    }, 0);

    const result = await couponService.validateCoupon(code, rawSubtotal);
    if (result.isValid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponDiscount(result.discountAmount);
      setCouponMessage(result.message);
      return { success: true, message: result.message };
    }

    return { success: false, message: result.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
  };

  // Calculations
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const mrpTotal = items.reduce((sum, item) => {
    const unitMrp = item.product.mrp + (item.variant?.price_adjustment || 0);
    return sum + (unitMrp * item.quantity);
  }, 0);

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.product.price + (item.variant?.price_adjustment || 0);
    return sum + (unitPrice * item.quantity);
  }, 0);

  const mrpDiscount = Math.max(0, mrpTotal - subtotal);
  const deliveryFee = subtotal >= 499 || items.length === 0 ? 0 : 49;
  const totalPayable = Math.max(0, subtotal - couponDiscount + deliveryFee);
  const deliverySaved = subtotal >= 499 && items.length > 0 ? 49 : 0;
  const totalSavings = mrpDiscount + couponDiscount + deliverySaved;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        mrpTotal,
        mrpDiscount,
        couponDiscount,
        deliveryFee,
        totalPayable,
        totalSavings,
        appliedCoupon,
        couponMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
