import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Layout } from './components/layout/Layout';

// Lazy-loaded routes for performance code-splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const Categories = lazy(() => import('./pages/Categories').then(m => ({ default: m.Categories })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Wishlist = lazy(() => import('./pages/Wishlist').then(m => ({ default: m.Wishlist })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then(m => ({ default: m.OrderConfirmation })));
const OrderTracking = lazy(() => import('./pages/OrderTracking').then(m => ({ default: m.OrderTracking })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Account = lazy(() => import('./pages/Account').then(m => ({ default: m.Account })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

const RouteLoading: React.FC = () => (
  <div className="container-dense py-16 flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 border-3 border-nexora-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-xs font-semibold text-slate-500">Loading NEXORA Marketplace...</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                  <Route path="order-tracking" element={<OrderTracking />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="account" element={<Account />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
