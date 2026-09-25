import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
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
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (code: string) => {
    setCouponLoading(true);
    await applyCoupon(code);
    setCouponLoading(false);
  };

  const handleMoveToWishlist = (product: any, itemId: string) => {
    toggleWishlist(product);
    removeFromCart(itemId);
  };

  if (items.length === 0) {
    return (
      <div className="container-dense py-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
          Discover top flagships, noise cancelling earbuds, kitchen essentials, and fashion with 100% Cash on Delivery.
        </p>
        <Link to="/shop" className="btn-primary text-xs px-4 py-2 font-bold">
          Explore Products &rarr;
        </Link>
      </div>
    );
  }

  const freeDeliveryThreshold = 499;
  const freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="container-dense py-4">
      {/* Title */}
      <div className="mb-3 pb-2 border-b border-slate-200 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          100% Pay on Delivery
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Left Column: Items (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Free delivery tracker */}
          <div className="bg-white border border-slate-200 rounded p-3 text-xs">
            {freeDeliveryRemaining > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-nexora-600" /> Add ₹{freeDeliveryRemaining.toLocaleString('en-IN')} more for <strong>FREE Delivery</strong>
                  </span>
                  <span className="font-bold text-slate-900">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-nexora-600 rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>🎉 Congratulations! You have unlocked FREE Express Delivery on this order.</span>
              </div>
            )}
          </div>

          {/* Cart Item Cards */}
          <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
            {items.map(item => {
              const unitPrice = item.product.price + (item.variant?.price_adjustment || 0);
              const unitMrp = item.product.mrp + (item.variant?.price_adjustment || 0);
              const imgUrl = item.variant?.image_url || item.product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80';

              return (
                <div key={item.id} className="p-3 sm:p-4 flex gap-3 sm:gap-4 items-start">
                  <img
                    src={imgUrl}
                    alt={item.product.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-nexora-600 transition-colors line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <span className="font-black text-xs sm:text-sm text-slate-950 shrink-0 rupee">
                          ₹{(unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {item.variant && (
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          Variant: {item.variant.variant_name}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-400 line-through rupee">
                          ₹{(unitMrp * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                          {item.product.discount_percentage}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector and Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2 text-xs">
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          title="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-semibold text-slate-800 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleMoveToWishlist(item.product, item.id)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                        >
                          <Heart className="w-3 h-3" /> Save for Later
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Bill Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Coupon Code Card */}
          <div className="bg-white border border-slate-200 rounded p-3 text-xs">
            <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wide text-xs">
              <Tag className="w-3.5 h-3.5 text-nexora-600" /> Apply Promo Coupon
            </div>

            {appliedCoupon ? (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-800 text-xs flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Coupon "{appliedCoupon.code}" Applied
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    Saved ₹{couponDiscount.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (couponInput.trim()) handleApplyCoupon(couponInput.trim());
                }}
                className="flex gap-1.5 mb-2"
              >
                <input
                  type="text"
                  placeholder="Enter code (e.g. NEXORA10)"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  className="w-full text-xs uppercase px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={couponLoading || !couponInput.trim()}
                  className="btn-outline text-xs px-3 py-1 font-bold shrink-0 disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMessage && !appliedCoupon && (
              <div className="text-[11px] text-rose-600 mt-1">{couponMessage}</div>
            )}

            {/* Quick Clickable Coupons */}
            {!appliedCoupon && (
              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block mb-1">
                  Available Offers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { code: 'NEXORA10', desc: '10% OFF over ₹999' },
                    { code: 'FESTIVE500', desc: '₹500 OFF over ₹4,999' },
                    { code: 'FREESHIP', desc: 'Free Delivery' }
                  ].map(c => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCoupon(c.code)}
                      className="px-2 py-0.5 bg-slate-50 hover:bg-nexora-50 border border-slate-200 hover:border-nexora-300 text-[10px] rounded text-slate-700 text-left transition-colors"
                    >
                      <strong className="text-nexora-700">{c.code}</strong>: {c.desc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white border border-slate-200 rounded p-4 text-xs space-y-2.5 shadow-xs">
            <h2 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
              Price Details ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
            </h2>

            <div className="flex justify-between text-slate-600">
              <span>Total MRP</span>
              <span className="rupee">₹{mrpTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-emerald-600">
              <span>Discount on MRP</span>
              <span className="rupee font-semibold">- ₹{mrpDiscount.toLocaleString('en-IN')}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="rupee font-semibold">- ₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              {deliveryFee === 0 ? (
                <span className="text-emerald-600 font-bold">FREE</span>
              ) : (
                <span className="rupee">₹{deliveryFee}</span>
              )}
            </div>

            <div className="flex justify-between text-slate-600">
              <span>COD Handling Charge</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-sm text-slate-900">
              <span>Total Amount</span>
              <span className="text-base text-slate-950 rupee">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>

            {totalSavings > 0 && (
              <div className="p-2 bg-emerald-50 rounded text-center text-emerald-800 font-bold text-[11px]">
                You will save ₹{totalSavings.toLocaleString('en-IN')} on this order!
              </div>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow mt-3"
            >
              Proceed to COD Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe &amp; Secure Cash on Delivery Inspection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
