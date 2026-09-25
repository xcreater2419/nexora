import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { productService, ProductFilterParams } from '../services/productService';
import { Product, Category, Brand } from '../types/database.types';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar } from '../components/product/FilterSidebar';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse filters from URL
  const categorySlug = searchParams.get('category') || undefined;
  const brandSlug = searchParams.get('brand') || undefined;
  const query = searchParams.get('q') || undefined;
  const sort = (searchParams.get('sort') as ProductFilterParams['sort']) || 'popular';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  useEffect(() => {
    productService.getCategories().then(setCategories);
    productService.getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    productService.getProducts({
      page,
      limit: 18,
      categorySlug,
      brandSlug,
      query,
      sort,
      minPrice,
      maxPrice,
      rating,
      inStockOnly,
    }).then(res => {
      if (isCurrent) {
        setProducts(res.products);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [categorySlug, brandSlug, query, sort, minPrice, maxPrice, rating, inStockOnly, page]);

  const updateParam = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(searchParams);
    if (value !== undefined && value !== '') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    setSearchParams(next);
  };

  const activeCategory = categories.find(c => c.slug === categorySlug);
  const activeBrand = brands.find(b => b.slug === brandSlug);

  return (
    <div className="container-dense py-3 sm:py-4">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            {query ? `Search: "${query}"` : activeCategory ? activeCategory.name : activeBrand ? activeBrand.name : 'All Products'}
            <span className="text-xs font-normal text-slate-500">
              ({totalCount} items)
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Authentic electronics and lifestyle catalog for India with Cash on Delivery
          </p>
        </div>

        {/* Sort & Mobile Filter Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden btn-outline flex items-center gap-1.5 text-xs py-1 px-2.5 font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-nexora-600" />
            <span>Filters</span>
            {(categorySlug || brandSlug || minPrice || maxPrice || rating || inStockOnly) && (
              <span className="w-2 h-2 rounded-full bg-nexora-600"></span>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <span className="text-slate-500 hidden xs:inline">Sort:</span>
            <select
              value={sort}
              onChange={e => updateParam('sort', e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-nexora-600"
            >
              <option value="popular">Most Popular</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {(categorySlug || brandSlug || minPrice || maxPrice || rating || inStockOnly) && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold">Active:</span>

          {activeCategory && (
            <span className="inline-flex items-center gap-1 bg-nexora-50 text-nexora-800 px-2 py-0.5 rounded-full border border-nexora-200 text-[11px]">
              {activeCategory.name}
              <button onClick={() => updateParam('category', undefined)}><X className="w-3 h-3 hover:text-rose-600" /></button>
            </span>
          )}

          {activeBrand && (
            <span className="inline-flex items-center gap-1 bg-nexora-50 text-nexora-800 px-2 py-0.5 rounded-full border border-nexora-200 text-[11px]">
              Brand: {activeBrand.name}
              <button onClick={() => updateParam('brand', undefined)}><X className="w-3 h-3 hover:text-rose-600" /></button>
            </span>
          )}

          {(minPrice || maxPrice) && (
            <span className="inline-flex items-center gap-1 bg-nexora-50 text-nexora-800 px-2 py-0.5 rounded-full border border-nexora-200 text-[11px]">
              ₹{minPrice || 0} - ₹{maxPrice || 'Any'}
              <button onClick={() => { updateParam('minPrice', undefined); updateParam('maxPrice', undefined); }}><X className="w-3 h-3 hover:text-rose-600" /></button>
            </span>
          )}

          {rating && (
            <span className="inline-flex items-center gap-1 bg-nexora-50 text-nexora-800 px-2 py-0.5 rounded-full border border-nexora-200 text-[11px]">
              {rating}★ &amp; Above
              <button onClick={() => updateParam('rating', undefined)}><X className="w-3 h-3 hover:text-rose-600" /></button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1 bg-nexora-50 text-nexora-800 px-2 py-0.5 rounded-full border border-nexora-200 text-[11px]">
              In Stock Only
              <button onClick={() => updateParam('inStock', undefined)}><X className="w-3 h-3 hover:text-rose-600" /></button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-[11px] text-rose-600 hover:underline font-semibold ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex items-start gap-4">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          categories={categories}
          brands={brands}
          selectedCategory={categorySlug}
          selectedBrand={brandSlug}
          minPrice={minPrice}
          maxPrice={maxPrice}
          selectedRating={rating}
          inStockOnly={inStockOnly}
          onCategoryChange={slug => updateParam('category', slug)}
          onBrandChange={slug => updateParam('brand', slug)}
          onPriceChange={(min, max) => {
            updateParam('minPrice', min ? String(min) : undefined);
            updateParam('maxPrice', max ? String(max) : undefined);
          }}
          onRatingChange={r => updateParam('rating', r ? String(r) : undefined)}
          onInStockChange={stk => updateParam('inStock', stk ? 'true' : undefined)}
          onReset={handleResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Product Grid & Pagination */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} isLoading={isLoading} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-200 text-xs">
              <button
                disabled={page <= 1}
                onClick={() => updateParam('page', String(page - 1))}
                className="btn-outline px-3 py-1 disabled:opacity-40"
              >
                &larr; Previous
              </button>

              <span className="text-slate-600 font-medium px-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => updateParam('page', String(page + 1))}
                className="btn-outline px-3 py-1 disabled:opacity-40"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
