import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';
import { Product, Category } from '../../types/database.types';
import { useDebounce } from '../../hooks/useDebounce';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { itemCount, subtotal } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAdmin, toggleAdminRole, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pincode, setPincode] = useState(() => localStorage.getItem('nexora_pincode') || '560001');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState('');
  const [pincodeCity, setPincodeCity] = useState('Bengaluru');

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      productService.getProducts({ query: debouncedQuery, limit: 6 }).then(res => {
        setSuggestions(res.products);
        setShowSuggestions(true);
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePincodeSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(tempPincode)) {
      setPincode(tempPincode);
      localStorage.setItem('nexora_pincode', tempPincode);
      // Rough Indian pincode prefix to city mapping
      const prefix = tempPincode.substring(0, 2);
      if (['11'].includes(prefix)) setPincodeCity('New Delhi');
      else if (['40', '41'].includes(prefix)) setPincodeCity('Mumbai/Pune');
      else if (['56', '57'].includes(prefix)) setPincodeCity('Bengaluru');
      else if (['60'].includes(prefix)) setPincodeCity('Chennai');
      else if (['50'].includes(prefix)) setPincodeCity('Hyderabad');
      else if (['70'].includes(prefix)) setPincodeCity('Kolkata');
      else setPincodeCity('India');
      setShowPincodeModal(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-3">
        <div className="container-dense flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center text-amber-400 font-semibold gap-1">
              <Truck className="w-3.5 h-3.5" /> FREE India Delivery on orders ₹499+
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Cash on Delivery / Pay on Delivery
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" /> 7-Day Easy Returns
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Demo Role Switcher (Active only in offline/demo mode) */}
            {!isSupabaseConfigured() ? (
              <button
                onClick={toggleAdminRole}
                title="Click to toggle between Customer & Admin views in demo mode"
                className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors ${
                  isAdmin
                    ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Demo Role: <span className="underline">{isAdmin ? 'ADMIN' : 'CUSTOMER'}</span>
              </button>
            ) : (
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                isAdmin ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
              }`}>
                {isAdmin ? 'ADMIN' : 'CUSTOMER'}
              </span>
            )}

            {isAdmin && (
              <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold text-[10px] flex items-center gap-1">
                Admin Panel &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main compact header */}
      <div className="container-dense py-2 sm:py-2.5">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gradient-to-tr from-nexora-800 to-nexora-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-base sm:text-lg tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 group-hover:text-nexora-600 transition-colors leading-none">
                NEXORA
              </span>
              <span className="text-[9px] font-semibold text-amber-600 tracking-wider uppercase leading-none mt-0.5 hidden xs:block">
                MARKETPLACE 🇮🇳
              </span>
            </div>
          </Link>

          {/* Delivery Pincode Selector */}
          <button
            onClick={() => setShowPincodeModal(true)}
            className="hidden lg:flex items-center gap-1.5 text-left text-xs px-2 py-1 rounded hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors shrink-0"
            title="Change Delivery Pincode"
          >
            <MapPin className="w-3.5 h-3.5 text-nexora-600 shrink-0" />
            <div className="leading-tight">
              <div className="text-[10px] text-slate-500 font-normal">Deliver to {pincodeCity}</div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-0.5">
                {pincode} <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </button>

          {/* Debounced Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                placeholder="Search iPhone, Sony ANC, boAt, Dyson, Levi's, Prestige..."
                className="w-full text-xs sm:text-sm pl-8 sm:pl-9 pr-14 sm:pr-20 py-1.5 sm:py-2 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-nexora-600 focus:border-nexora-600 text-slate-900 placeholder-slate-400 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 bg-nexora-600 hover:bg-nexora-700 text-white text-xs font-semibold rounded transition-colors"
              >
                Search
              </button>
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in duration-100">
                <div className="bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                  <span>Matching Products</span>
                  <span className="text-[10px] text-slate-400">Press Enter for all</span>
                </div>
                {suggestions.map(item => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-2.5 p-2 hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={item.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=100&q=80'}
                      alt={item.title}
                      className="w-9 h-9 object-cover rounded shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="font-semibold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.mrp > item.price && (
                          <span className="line-through text-slate-400 text-[10px]">₹{item.mrp.toLocaleString('en-IN')}</span>
                        )}
                        <span className="text-emerald-600 font-bold text-[10px]">{item.discount_percentage}% OFF</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Cart, Account */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-1.5 sm:px-2 sm:py-1.5 text-slate-700 hover:text-nexora-600 hover:bg-slate-50 rounded flex items-center gap-1 relative transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="text-xs font-medium hidden xl:inline">Wishlist</span>
            </Link>

            {/* Cart with Indian Rupee micro total */}
            <Link
              to="/cart"
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-nexora-50 hover:bg-nexora-100 text-nexora-900 rounded flex items-center gap-2 relative border border-nexora-200 transition-colors"
              title="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-nexora-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Cart</span>
                <span className="text-xs font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </Link>

            {/* Account / Login */}
            {user ? (
              <div className="relative group">
                <Link
                  to="/account"
                  className="flex items-center gap-1.5 p-1 text-slate-700 hover:bg-slate-100 rounded transition-colors"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                      {user.full_name ? user.full_name[0] : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-medium max-w-[80px] truncate hidden md:inline">
                    {user.full_name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden md:inline" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded shadow-lg py-1 hidden group-hover:block z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.full_name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                  </div>
                  <Link to="/account" className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                    My Account & Orders
                  </Link>
                  <Link to="/account#addresses" className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                    Saved Addresses
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-3 py-1.5 text-xs text-amber-600 font-semibold hover:bg-amber-50">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-outline flex items-center gap-1 text-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Secondary dense category bar */}
      <nav className="bg-slate-100/90 border-t border-slate-200/80 hidden md:block">
        <div className="container-dense flex items-center justify-between text-xs font-medium text-slate-700 py-1.5">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            <Link to="/categories" className="flex items-center gap-1 font-semibold text-slate-900 hover:text-nexora-600 shrink-0">
              <Menu className="w-3.5 h-3.5 text-nexora-600" /> All Categories
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="hover:text-nexora-600 shrink-0 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/shop?sort=discount"
              className="flex items-center gap-1 text-amber-700 font-bold bg-amber-100/70 hover:bg-amber-200/80 px-2 py-0.5 rounded transition-colors text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-amber-600" /> Flash Deals
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 divide-y divide-slate-100 text-sm">
          <div className="py-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-xs font-semibold text-nexora-600 hover:bg-slate-50 rounded"
              >
                View All Categories &rarr;
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded truncate"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="py-2 flex flex-col gap-1.5 text-xs">
            <Link to="/shop?sort=discount" onClick={() => setMobileMenuOpen(false)} className="text-amber-600 font-semibold py-1">
              ⚡ Flash Deals & Clearance
            </Link>
            <Link to="/order-tracking" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 py-1">
              📦 Track Your Order
            </Link>
            <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 py-1">
              👤 My Account & Saved Addresses
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-amber-600 font-bold py-1">
                ⚙️ Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Pincode Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-nexora-600" /> Check Delivery Availability
              </h3>
              <button onClick={() => setShowPincodeModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Enter your 6-digit Indian PIN code to view accurate delivery timelines and Cash on Delivery eligibility.
            </p>
            <form onSubmit={handlePincodeSave} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={tempPincode}
                onChange={e => setTempPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 560001, 110001, 400001"
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPincodeModal(false)}
                  className="btn-outline text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tempPincode.length !== 6}
                  className="btn-primary text-xs disabled:opacity-50"
                >
                  Apply Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
