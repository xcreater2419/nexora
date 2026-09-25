import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Headphones, Banknote } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-auto border-t border-slate-800">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800 py-4 bg-slate-950/60">
        <div className="container-dense grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs">Cash on Delivery</div>
              <div className="text-[11px] text-slate-500">Pay when your order arrives at your door</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs">100% Genuine Brands</div>
              <div className="text-[11px] text-slate-500">Apple, Samsung, Sony, boAt & more</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs">Express Pan-India Logistics</div>
              <div className="text-[11px] text-slate-500">Free delivery on orders above ₹499</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs">7-Day Easy Returns</div>
              <div className="text-[11px] text-slate-500">Hassle-free doorstep pickup across India</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-dense py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">NEXORA India</div>
            <p className="text-[11px] leading-relaxed text-slate-400 mb-3">
              India's premier high-density digital marketplace for authentic consumer electronics, lifestyle, audio, and kitchen appliances.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
              <Headphones className="w-3.5 h-3.5" /> Toll-Free: 1800-209-8989
            </div>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Categories</div>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/shop?category=mobiles-tablets" className="hover:text-white transition-colors">Flagship Smartphones</Link></li>
              <li><Link to="/shop?category=laptops-computers" className="hover:text-white transition-colors">Laptops & MacBooks</Link></li>
              <li><Link to="/shop?category=audio-wearables" className="hover:text-white transition-colors">TWS Earbuds & Headphones</Link></li>
              <li><Link to="/shop?category=home-kitchen" className="hover:text-white transition-colors">Home & Kitchen Appliances</Link></li>
              <li><Link to="/shop?category=fashion-apparel" className="hover:text-white transition-colors">Designer Fashion & Ethnic Wear</Link></li>
              <li><Link to="/shop?category=beauty-grooming" className="hover:text-white transition-colors">Luxury Ayurvedic Skincare</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Customer Support</div>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/order-tracking" className="hover:text-white transition-colors">Track Delhivery Order</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Cash on Delivery Policy</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Manage Saved Addresses</Link></li>
              <li><Link to="/account#orders" className="hover:text-white transition-colors">Order Returns & Replacement</Link></li>
              <li><a href="mailto:support@nexora.in" className="hover:text-white transition-colors">Contact Support Team</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Marketplace & Admin</div>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold">Admin Portal (Demo)</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Customer Login</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><span className="text-slate-500">Supabase Backend Ready</span></li>
              <li><span className="text-slate-500">PostgreSQL Scalable Architecture</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-3 text-[11px] text-slate-500">
        <div className="container-dense flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            &copy; 2026 NEXORA Marketplace India Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Payment Mode: 100% Cash on Delivery (COD)</span>
            <span>•</span>
            <span>Bengaluru • Mumbai • New Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
