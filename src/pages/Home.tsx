import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { productService } from '../services/productService';
import { Product, Category, Brand, Banner } from '../types/database.types';
import { ProductGrid } from '../components/product/ProductGrid';

export const Home: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [flagships, setFlagships] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Product[]>([]);
  const [audioWearables, setAudioWearables] = useState<Product[]>([]);
  const [appliances, setAppliances] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [banList, catList, brandList, prodRes] = await Promise.all([
          productService.getBanners(),
          productService.getCategories(),
          productService.getBrands(),
          productService.getProducts({ limit: 40 })
        ]);

        setBanners(banList);
        setCategories(catList);
        setBrands(brandList);

        const all = prodRes.products;
        setFlagships(all.filter(p => p.category?.slug === 'mobiles-tablets' || p.category?.slug === 'laptops-computers').slice(0, 6));
        setDeals(all.filter(p => p.discount_percentage >= 20).slice(0, 6));
        setAudioWearables(all.filter(p => p.category?.slug === 'audio-wearables').slice(0, 6));
        setAppliances(all.filter(p => p.category?.slug === 'home-kitchen' || p.category?.slug === 'beauty-grooming').slice(0, 6));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Banner carousel auto-slide
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBannerIdx(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBanner = banners[activeBannerIdx] || {
    title: 'Festival of Electronics & Flagships',
    subtitle: 'Up to 45% OFF on Apple, Samsung, OnePlus & Sony with Free India COD Delivery',
    badge: 'GRAND INDIAN FESTIVAL',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
    link_url: '/shop?category=mobiles-tablets',
    button_text: 'Explore Flagships'
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Carousel Section */}
      <div className="container-dense pt-2 sm:pt-3">
        <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-slate-200/50 shadow-xs h-[180px] xs:h-[220px] sm:h-[280px] md:h-[320px]">
          <img
            src={currentBanner.image_url}
            alt={currentBanner.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex items-center p-4 sm:p-8">
            <div className="max-w-lg space-y-1.5 sm:space-y-2.5">
              {currentBanner.badge && (
                <span className="inline-block bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-xs tracking-wider uppercase">
                  {currentBanner.badge}
                </span>
              )}
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {currentBanner.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-md">
                {currentBanner.subtitle}
              </p>
              <div className="pt-1 flex items-center gap-3">
                <Link
                  to={currentBanner.link_url}
                  className="btn-amber text-xs sm:text-sm px-3.5 py-1.5 rounded font-bold shadow"
                >
                  {currentBanner.button_text} &rarr;
                </Link>
                <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cash on Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Carousel dots */}
          {banners.length > 1 && (
            <div className="absolute bottom-2 right-3 flex items-center gap-1.5">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBannerIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeBannerIdx ? 'bg-amber-400 w-5' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Category Icons Strip */}
      <div className="container-dense">
        <div className="bg-white border border-slate-200 rounded p-2.5 shadow-xs">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-1 text-center shrink-0 w-20 sm:w-24 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 overflow-hidden border border-slate-200 group-hover:border-nexora-500 group-hover:shadow-xs transition-all flex items-center justify-center">
                  <img
                    src={cat.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-nexora-700 leading-tight line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Flash Deals Row */}
      <section className="container-dense">
        <div className="bg-amber-500/10 border border-amber-300/60 rounded p-3 mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500 text-slate-950">
              <Zap className="w-4 h-4 fill-current" />
            </span>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 leading-none">
                Lightning Deals &amp; Top Savings
              </h2>
              <span className="text-[11px] text-amber-800 font-medium">
                Verified genuine Indian products with maximum discount
              </span>
            </div>
          </div>
          <Link
            to="/shop?sort=discount"
            className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-0.5"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={deals} isLoading={isLoading} />
      </section>

      {/* Flagships & High-End Tech */}
      <section className="container-dense">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-nexora-600 rounded-xs"></span>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
              Flagship Smartphones &amp; Performance Laptops
            </h2>
          </div>
          <Link
            to="/shop?category=mobiles-tablets"
            className="text-xs font-bold text-nexora-600 hover:text-nexora-800 flex items-center gap-0.5"
          >
            Explore All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={flagships} isLoading={isLoading} />
      </section>

      {/* Indian Brand Spotlight Strip */}
      <section className="container-dense">
        <div className="bg-white border border-slate-200 rounded p-3.5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-nexora-600" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                Recognized Official Brands
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">100% Brand Warranty Guaranteed</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/shop?brand=${brand.slug}`}
                className="p-2 border border-slate-100 rounded hover:border-nexora-400 hover:bg-slate-50 text-center transition-all flex flex-col items-center justify-center group"
              >
                <span className="text-xs font-bold text-slate-800 group-hover:text-nexora-700 truncate w-full">
                  {brand.name}
                </span>
                <span className="text-[9px] text-slate-400">{brand.origin_country}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audio & Smart Wearables */}
      <section className="container-dense">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-emerald-600 rounded-xs"></span>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
              Noise Cancelling Audio &amp; AMOLED Smartwatches
            </h2>
          </div>
          <Link
            to="/shop?category=audio-wearables"
            className="text-xs font-bold text-nexora-600 hover:text-nexora-800 flex items-center gap-0.5"
          >
            Explore Audio <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={audioWearables} isLoading={isLoading} />
      </section>

      {/* Kitchen & Lifestyle Curated */}
      <section className="container-dense">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-purple-600 rounded-xs"></span>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
              Indian Kitchen Essentials &amp; Luxury Skincare
            </h2>
          </div>
          <Link
            to="/shop?category=home-kitchen"
            className="text-xs font-bold text-nexora-600 hover:text-nexora-800 flex items-center gap-0.5"
          >
            Explore Home <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={appliances} isLoading={isLoading} />
      </section>
    </div>
  );
};
