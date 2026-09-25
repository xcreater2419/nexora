import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { CompactProductCard } from '../components/product/CompactProductCard';

export const Wishlist: React.FC = () => {
  const { items, itemCount, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addToCart(item.product, item.product.variants?.[0] || null, 1);
    });
    clearWishlist();
  };

  if (itemCount === 0) {
    return (
      <div className="container-dense py-12 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
          Save your favorite electronics, smartphones, and fashion items here to track price drops and deals.
        </p>
        <Link to="/shop" className="btn-primary text-xs px-4 py-2 font-bold">
          Explore Products &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="container-dense py-4">
      {/* Title */}
      <div className="mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            My Wishlist ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500">Your personal collection of saved products</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMoveAllToCart}
            className="btn-primary text-xs py-1 px-3 font-bold flex items-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="btn-outline text-xs py-1 px-2 text-rose-600 hover:text-rose-700"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2.5">
        {items.map(item => (
          <div key={item.id} className="relative group">
            <CompactProductCard product={item.product} />
          </div>
        ))}
      </div>
    </div>
  );
};
