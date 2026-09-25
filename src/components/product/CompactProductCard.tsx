import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../types/database.types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface CompactProductCardProps {
  product: Product;
}

export const CompactProductCard: React.FC<CompactProductCardProps> = ({ product }) => {
  const { addToCart, items } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const isInCart = items.some(i => i.product_id === product.id);

  const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f8fafc'/%3E%3Cstop offset='100%25' stop-color='%23e2e8f0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ccircle cx='200' cy='180' r='48' fill='%23cbd5e1'/%3E%3Cpath d='M180 170h40v20h-40z' fill='%2394a3b8' rx='4'/%3E%3Ctext x='50%25' y='270' font-family='system-ui, sans-serif' font-size='13' font-weight='700' fill='%2364748b' text-anchor='middle'%3ENEXORA VERIFIED%3C/text%3E%3C/svg%3E";

  const primaryImage = product.images?.[0]?.image_url || FALLBACK_IMAGE;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0] || null;
    addToCart(product, defaultVariant, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded hover:border-nexora-300 hover:shadow-card-hover transition-all duration-150 flex flex-col w-full min-w-0 max-w-full overflow-hidden">
      {/* Product Image Box */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={primaryImage}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Discount Badge */}
        {product.discount_percentage > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded shadow-xs">
            {product.discount_percentage}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Stock warning pill */}
        {(product.stock_quantity ?? 0) <= 5 && (product.stock_quantity ?? 0) > 0 && (
          <span className="absolute bottom-1.5 left-1.5 bg-rose-500/90 text-white text-[9px] font-bold px-1 rounded">
            Only {product.stock_quantity} left
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between gap-1.5 min-w-0">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              {product.brand?.name || 'GENUINE'}
            </span>

            {product.rating > 0 && (
              <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1 py-0.2 rounded shrink-0 border border-emerald-200/50">
                {product.rating} <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="text-xs font-semibold text-slate-900 group-hover:text-nexora-700 transition-colors line-clamp-2 leading-tight block mb-1"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Pricing Row */}
          <div className="flex items-baseline flex-wrap gap-1.5 leading-none">
            <span className="text-sm font-extrabold text-slate-950 rupee">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-[11px] text-slate-400 line-through rupee">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Micro Features & Action */}
        <div className="pt-1 border-t border-slate-100 flex items-center justify-between gap-1">
          <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1 py-0.5 rounded truncate">
            COD Eligible
          </span>

          <button
            onClick={handleQuickAdd}
            className={`btn-dense text-[11px] py-1 px-2 rounded font-medium flex items-center gap-1 transition-colors ${
              isInCart
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-nexora-50 hover:bg-nexora-100 text-nexora-800 border border-nexora-200'
            }`}
            title="Quick add to cart"
          >
            {isInCart ? (
              <>
                <Check className="w-3 h-3" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
