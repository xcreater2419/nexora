import { Product, Category, Brand, Banner } from '../types/database.types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS, MOCK_BANNERS } from '../data/mockCatalog';

export interface ProductFilterParams {
  page?: number;
  limit?: number;
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStockOnly?: boolean;
  sort?: 'popular' | 'price_low_high' | 'price_high_low' | 'newest' | 'rating' | 'discount';
  query?: string;
}

export interface PaginatedProductsResult {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export const productService = {
  async getProducts(params: ProductFilterParams = {}): Promise<PaginatedProductsResult> {
    const page = params.page || 1;
    const limit = params.limit || 18;
    const offset = (page - 1) * limit;

    if (isSupabaseConfigured() && supabase) {
      try {
        const selectFields = (params.categorySlug || params.brandSlug)
          ? '*, brand:brands!inner(*), category:categories!inner(*), images:product_images(*), variants:product_variants(*)'
          : '*, brand:brands(*), category:categories(*), images:product_images(*), variants:product_variants(*)';

        let queryBuilder = supabase
          .from('products')
          .select(selectFields, { count: 'exact' })
          .eq('is_active', true);

        if (params.categorySlug) {
          queryBuilder = queryBuilder.eq('category.slug', params.categorySlug);
        }

        if (params.brandSlug) {
          queryBuilder = queryBuilder.eq('brand.slug', params.brandSlug);
        }

        if (params.query) {
          queryBuilder = queryBuilder.textSearch('search_vector', params.query, { type: 'websearch' });
        }

        if (params.minPrice !== undefined) {
          queryBuilder = queryBuilder.gte('price', params.minPrice);
        }

        if (params.maxPrice !== undefined) {
          queryBuilder = queryBuilder.lte('price', params.maxPrice);
        }

        if (params.rating !== undefined) {
          queryBuilder = queryBuilder.gte('rating', params.rating);
        }

        switch (params.sort) {
          case 'price_low_high':
            queryBuilder = queryBuilder.order('price', { ascending: true });
            break;
          case 'price_high_low':
            queryBuilder = queryBuilder.order('price', { ascending: false });
            break;
          case 'rating':
            queryBuilder = queryBuilder.order('rating', { ascending: false });
            break;
          case 'newest':
            queryBuilder = queryBuilder.order('created_at', { ascending: false });
            break;
          case 'discount':
            queryBuilder = queryBuilder.order('discount_percentage', { ascending: false });
            break;
          case 'popular':
          default:
            queryBuilder = queryBuilder.order('reviews_count', { ascending: false });
            break;
        }

        const { data, count, error } = await queryBuilder.range(offset, offset + limit - 1);

        if (error) {
          console.warn('Supabase query error, falling back to local dataset:', error.message);
        } else if (data) {
          const totalCount = count || data.length;
          return {
            products: data as Product[],
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
            hasMore: offset + limit < totalCount,
          };
        }
      } catch (err) {
        console.warn('Supabase connection failed, falling back to local dataset:', err);
      }
    }

    // Local / Offline fallback implementation
    let filtered = [...MOCK_PRODUCTS];

    if (params.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand?.name.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q) ||
        p.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    if (params.categorySlug) {
      filtered = filtered.filter(p => p.category?.slug === params.categorySlug);
    }

    if (params.brandSlug) {
      filtered = filtered.filter(p => p.brand?.slug === params.brandSlug);
    }

    if (params.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= params.maxPrice!);
    }

    if (params.rating !== undefined) {
      filtered = filtered.filter(p => p.rating >= params.rating!);
    }

    if (params.inStockOnly) {
      filtered = filtered.filter(p => (p.stock_quantity ?? 0) > 0);
    }

    switch (params.sort) {
      case 'price_low_high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount_percentage - a.discount_percentage);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews_count - a.reviews_count);
        break;
    }

    const totalCount = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      products: paginated,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit) || 1,
      hasMore: offset + limit < totalCount,
    };
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, brand:brands(*), category:categories(*), images:product_images(*), variants:product_variants(*)')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          return data as Product;
        }
      } catch (err) {
        console.warn('Supabase getProductBySlug error, using fallback:', err);
      }
    }

    const local = MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug);
    return local || null;
  },

  async getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data) {
          return data as Category[];
        }
      } catch (err) {
        console.warn('Supabase getCategories error:', err);
      }
    }
    return MOCK_CATEGORIES;
  },

  async getBrands(): Promise<Brand[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('name', { ascending: true });

        if (!error && data) {
          return data as Brand[];
        }
      } catch (err) {
        console.warn('Supabase getBrands error:', err);
      }
    }
    return MOCK_BRANDS;
  },

  async getBanners(): Promise<Banner[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('banners')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!error && data) {
          return data as Banner[];
        }
      } catch (err) {
        console.warn('Supabase getBanners error:', err);
      }
    }
    return MOCK_BANNERS;
  }
};
