import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { MobileBottomNav } from './MobileBottomNav';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden pb-14 md:pb-4">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};
