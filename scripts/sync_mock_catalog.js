import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const catalogJsonPath = path.resolve(ROOT_DIR, 'data', 'verified_catalog.json');
const rawCatalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));

const mockCatalogPath = path.resolve(ROOT_DIR, 'src', 'data', 'mockCatalog.ts');

const categoryMap = {
  'mobiles-tablets': 'c1',
  'laptops-computers': 'c2',
  'audio-wearables': 'c3',
  'home-kitchen': 'c4',
  'fashion-apparel': 'c5',
  'beauty-grooming': 'c6'
};

const brandMap = {
  'apple': 'b1',
  'samsung': 'b2',
  'oneplus': 'b3',
  'sony': 'b4',
  'boat': 'b5',
  'noise': 'b6',
  'asus': 'b7',
  'dyson': 'b8',
  'philips': 'b9',
  'prestige': 'b10',
  'levis': 'b11',
  'fabindia': 'b12',
  'forest-essentials': 'b13',
  'logitech': 'b14',
  'titan': 'b15',
  'google': 'b16',
  'dell': 'b17',
  'hp': 'b18',
  'lenovo': 'b19',
  'hawkins': 'b20',
  'bajaj': 'b21'
};

const allBrands = [
  { id: 'b1', name: 'Apple', slug: 'apple', logo_url: null, website: 'https://apple.com/in', origin_country: 'USA', is_popular: true, created_at: '2026-01-01' },
  { id: 'b2', name: 'Samsung', slug: 'samsung', logo_url: null, website: 'https://samsung.com/in', origin_country: 'South Korea', is_popular: true, created_at: '2026-01-01' },
  { id: 'b3', name: 'OnePlus', slug: 'oneplus', logo_url: null, website: 'https://oneplus.in', origin_country: 'China', is_popular: true, created_at: '2026-01-01' },
  { id: 'b4', name: 'Sony', slug: 'sony', logo_url: null, website: 'https://sony.co.in', origin_country: 'Japan', is_popular: true, created_at: '2026-01-01' },
  { id: 'b5', name: 'boAt', slug: 'boat', logo_url: null, website: 'https://boat-lifestyle.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b6', name: 'Noise', slug: 'noise', logo_url: null, website: 'https://gonoise.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b7', name: 'ASUS', slug: 'asus', logo_url: null, website: 'https://asus.com/in', origin_country: 'Taiwan', is_popular: true, created_at: '2026-01-01' },
  { id: 'b8', name: 'Dyson', slug: 'dyson', logo_url: null, website: 'https://dyson.in', origin_country: 'Singapore', is_popular: true, created_at: '2026-01-01' },
  { id: 'b9', name: 'Philips', slug: 'philips', logo_url: null, website: 'https://philips.co.in', origin_country: 'Netherlands', is_popular: true, created_at: '2026-01-01' },
  { id: 'b10', name: 'Prestige', slug: 'prestige', logo_url: null, website: 'https://prestigexclusive.in', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b11', name: "Levi's", slug: 'levis', logo_url: null, website: 'https://levi.in', origin_country: 'USA', is_popular: true, created_at: '2026-01-01' },
  { id: 'b12', name: 'Fabindia', slug: 'fabindia', logo_url: null, website: 'https://fabindia.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b13', name: 'Forest Essentials', slug: 'forest-essentials', logo_url: null, website: 'https://forestessentialsindia.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b14', name: 'Logitech', slug: 'logitech', logo_url: null, website: 'https://logitech.com', origin_country: 'Switzerland', is_popular: true, created_at: '2026-01-01' },
  { id: 'b15', name: 'Titan', slug: 'titan', logo_url: null, website: 'https://titan.co.in', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b16', name: 'Google', slug: 'google', logo_url: null, website: 'https://store.google.com/in', origin_country: 'USA', is_popular: true, created_at: '2026-01-01' },
  { id: 'b17', name: 'Dell', slug: 'dell', logo_url: null, website: 'https://dell.com/in', origin_country: 'USA', is_popular: true, created_at: '2026-01-01' },
  { id: 'b18', name: 'HP', slug: 'hp', logo_url: null, website: 'https://hp.com/in', origin_country: 'USA', is_popular: true, created_at: '2026-01-01' },
  { id: 'b19', name: 'Lenovo', slug: 'lenovo', logo_url: null, website: 'https://lenovo.com/in', origin_country: 'China', is_popular: true, created_at: '2026-01-01' },
  { id: 'b20', name: 'Hawkins', slug: 'hawkins', logo_url: null, website: 'https://hawkinscookers.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' },
  { id: 'b21', name: 'Bajaj', slug: 'bajaj', logo_url: null, website: 'https://bajajelectricals.com', origin_country: 'India', is_popular: true, created_at: '2026-01-01' }
];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const rawBaseProducts = rawCatalog.map((p, idx) => {
  const brandSlug = slugify(p.brand);
  const catSlug = slugify(p.category);
  const brandId = brandMap[brandSlug] || 'b1';
  const catId = categoryMap[catSlug] || 'c1';
  const prodSlug = slugify(p.product_name);

  return {
    id: `prod-${idx + 1}`,
    title: p.product_name,
    slug: prodSlug,
    brand_id: brandId,
    category_id: catId,
    subcategory_id: null,
    sku: p.model_identifier ? `NEX-${brandSlug.toUpperCase().substring(0, 3)}-${p.model_identifier.replace(/[^\w]/g, '').substring(0, 8)}` : `NEX-${brandSlug.toUpperCase().substring(0, 3)}-${String(idx + 1).padStart(4, '0')}`,
    short_description: p.highlights[0] || `${p.product_name} - Genuine Indian Stock`,
    description: `${p.product_name}. Genuine commercial product from ${p.brand} (${p.model}). Includes ${p.warranty_info}. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.`,
    mrp: p.demo_mrp_inr,
    price: p.demo_selling_price_inr,
    discount_percentage: Math.round(((p.demo_mrp_inr - p.demo_selling_price_inr) / p.demo_mrp_inr) * 100),
    rating: p.demo_rating,
    reviews_count: p.demo_reviews_count,
    is_featured: idx < 8,
    is_trending: idx % 3 === 0,
    is_active: true,
    warranty_info: p.warranty_info,
    return_policy_days: p.return_policy_days || 7,
    cod_available: true,
    stock_quantity: p.demo_stock_quantity || 25,
    specifications: p.specifications,
    highlights: p.highlights,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    images: [
      {
        id: `img-verif-${idx + 1}`,
        product_id: `prod-${idx + 1}`,
        image_url: p.image_url,
        alt_text: p.product_name,
        display_order: 0,
        is_primary: true
      }
    ]
  };
});

// Read existing mockCatalog categories, banners & coupons
const originalContent = fs.readFileSync(mockCatalogPath, 'utf8');
const categoriesMatch = originalContent.match(/export const MOCK_CATEGORIES: Category\[\] = \[([\s\S]*?)\];/);
const bannersMatch = originalContent.match(/export const MOCK_BANNERS: Banner\[\] = \[([\s\S]*?)\];/);
const couponsMatch = originalContent.match(/export const MOCK_COUPONS: Coupon\[\] = \[([\s\S]*?)\];/);

const newFileContent = `import { Product, Category, Brand, Banner, Coupon } from '../types/database.types';

export const MOCK_CATEGORIES: Category[] = [${categoriesMatch[1]}];

export const MOCK_BRANDS: Brand[] = ${JSON.stringify(allBrands, null, 2)};

export const MOCK_BANNERS: Banner[] = [${bannersMatch[1]}];

export const MOCK_COUPONS: Coupon[] = [${couponsMatch[1]}];

const RAW_MOCK_PRODUCTS = ${JSON.stringify(rawBaseProducts, null, 2)};

export const MOCK_PRODUCTS: Product[] = RAW_MOCK_PRODUCTS.map(p => ({
  ...p,
  specifications: p.specifications as unknown as Record<string, string>,
  brand: MOCK_BRANDS.find(b => b.id === p.brand_id),
  category: MOCK_CATEGORIES.find(c => c.id === p.category_id)
}));
`;

fs.writeFileSync(mockCatalogPath, newFileContent, 'utf8');
console.log(`Successfully synced ${rawBaseProducts.length} verified real products with full type safety to src/data/mockCatalog.ts`);
