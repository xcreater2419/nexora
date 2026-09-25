import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-1.5 px-3 md:hidden shadow-lg safe-bottom">
      <div className="flex items-center justify-around text-slate-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              isActive ? 'text-nexora-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              isActive ? 'text-nexora-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <Grid className="w-5 h-5" />
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/shop?sort=discount"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'
            }`
          }
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Deals</span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
              isActive ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-rose-600'
            }`
          }
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
              isActive ? 'text-nexora-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>
      </div>
    </div>
  );
};
