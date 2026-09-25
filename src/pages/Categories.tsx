import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid } from 'lucide-react';
import { productService } from '../services/productService';
import { Category } from '../types/database.types';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService.getCategories().then(cats => {
      setCategories(cats);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container-dense py-4">
      <div className="mb-4 pb-2 border-b border-slate-200">
        <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Grid className="w-5 h-5 text-nexora-600" /> All Categories &amp; Departments
        </h1>
        <p className="text-xs text-slate-500">
          Browse our comprehensive catalog of verified Indian electronics, gadgets, home appliances, and fashion.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 rounded p-3 hover:border-nexora-400 hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="flex gap-3">
                <img
                  src={cat.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80'}
                  alt={cat.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Cash on Delivery Available
                </span>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="text-xs font-bold text-nexora-600 hover:text-nexora-800 flex items-center gap-0.5"
                >
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
