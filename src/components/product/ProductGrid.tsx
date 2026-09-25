import React from 'react';
import { Product } from '../../types/database.types';
import { CompactProductCard } from './CompactProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2.5">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded p-2 animate-pulse flex flex-col gap-2">
            <div className="aspect-square bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-6 bg-slate-100 rounded w-full mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-8 text-center my-4">
        <div className="text-3xl mb-2">🔍</div>
        <h3 className="font-bold text-slate-800 text-base mb-1">No products match your filters</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Try clearing or adjusting your search term, brand filter, or price range to explore more of our Indian marketplace catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2.5">
      {products.map(product => (
        <CompactProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
