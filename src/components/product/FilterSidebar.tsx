import React from 'react';
import { Star, RotateCcw, Filter } from 'lucide-react';
import { Category, Brand } from '../../types/database.types';

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string;
  selectedBrand?: string;
  minPrice?: number;
  maxPrice?: number;
  selectedRating?: number;
  inStockOnly?: boolean;
  onCategoryChange: (catSlug: string | undefined) => void;
  onBrandChange: (brandSlug: string | undefined) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onRatingChange: (rating?: number) => void;
  onInStockChange: (inStock: boolean) => void;
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  selectedRating,
  inStockOnly,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onRatingChange,
  onInStockChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
}) => {
  const content = (
    <div className="bg-white border border-slate-200 rounded p-3 text-xs flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <span className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
          <Filter className="w-3.5 h-3.5 text-nexora-600" /> Filters
        </span>
        <button
          onClick={onReset}
          className="text-nexora-600 hover:text-nexora-800 font-semibold flex items-center gap-0.5 text-[11px]"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <div className="font-bold text-slate-800 mb-1.5 uppercase tracking-wider text-[10px]">
          Category
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`w-full text-left py-1 px-1.5 rounded transition-colors text-xs flex justify-between ${
              !selectedCategory ? 'bg-nexora-50 text-nexora-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(selectedCategory === cat.slug ? undefined : cat.slug)}
              className={`w-full text-left py-1 px-1.5 rounded transition-colors text-xs flex justify-between ${
                selectedCategory === cat.slug ? 'bg-nexora-50 text-nexora-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="font-bold text-slate-800 mb-1.5 uppercase tracking-wider text-[10px]">
          Brand
        </div>
        <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
          {brands.map(brand => (
            <label
              key={brand.id}
              className="flex items-center gap-2 py-0.5 text-slate-700 hover:text-slate-900 cursor-pointer text-xs"
            >
              <input
                type="radio"
                name="brand_filter"
                checked={selectedBrand === brand.slug}
                onChange={() => onBrandChange(selectedBrand === brand.slug ? undefined : brand.slug)}
                className="text-nexora-600 rounded focus:ring-nexora-500 w-3.5 h-3.5"
              />
              <span className="truncate">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Presets & Inputs */}
      <div>
        <div className="font-bold text-slate-800 mb-1.5 uppercase tracking-wider text-[10px]">
          Price (₹)
        </div>
        <div className="space-y-1 mb-2">
          {[
            { label: 'Under ₹2,000', min: undefined, max: 2000 },
            { label: '₹2,000 - ₹10,000', min: 2000, max: 10000 },
            { label: '₹10,000 - ₹50,000', min: 10000, max: 50000 },
            { label: 'Above ₹50,000', min: 50000, max: undefined }
          ].map((preset, idx) => {
            const isMatch = minPrice === preset.min && maxPrice === preset.max;
            return (
              <button
                key={idx}
                onClick={() => onPriceChange(isMatch ? undefined : preset.min, isMatch ? undefined : preset.max)}
                className={`w-full text-left py-0.5 px-1.5 rounded transition-colors text-xs ${
                  isMatch ? 'bg-nexora-50 text-nexora-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice ?? ''}
            onChange={e => onPriceChange(e.target.value ? Number(e.target.value) : undefined, maxPrice)}
            className="w-1/2 p-1 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
          />
          <span className="text-slate-400">-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice ?? ''}
            onChange={e => onPriceChange(minPrice, e.target.value ? Number(e.target.value) : undefined)}
            className="w-1/2 p-1 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Customer Ratings */}
      <div>
        <div className="font-bold text-slate-800 mb-1.5 uppercase tracking-wider text-[10px]">
          Customer Rating
        </div>
        <div className="space-y-1">
          {[4, 3].map(ratingVal => (
            <button
              key={ratingVal}
              onClick={() => onRatingChange(selectedRating === ratingVal ? undefined : ratingVal)}
              className={`w-full flex items-center justify-between py-1 px-1.5 rounded text-xs transition-colors ${
                selectedRating === ratingVal ? 'bg-nexora-50 text-nexora-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-1">
                {ratingVal}★ &amp; above
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${i < ratingVal ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
          <input
            type="checkbox"
            checked={!!inStockOnly}
            onChange={e => onInStockChange(e.target.checked)}
            className="rounded text-nexora-600 focus:ring-nexora-500 w-3.5 h-3.5"
          />
          <span className="font-medium">In-Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-56 shrink-0">
        {content}
      </div>

      {/* Mobile Modal Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900 text-sm">Filters & Refinements</span>
                <button onClick={onCloseMobile} className="text-slate-500 font-bold p-1">✕</button>
              </div>
              {content}
            </div>
            <button onClick={onCloseMobile} className="btn-primary w-full mt-4 py-2 text-xs">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};
