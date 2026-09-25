import { Product, Category, Brand, Banner, Coupon } from '../types/database.types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Mobiles & Tablets', slug: 'mobiles-tablets', description: 'Smartphones, flagship devices, iPads and tablets', icon: 'Smartphone', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80', display_order: 1, is_featured: true, created_at: '2026-01-01' },
  { id: 'c2', name: 'Laptops & Computers', slug: 'laptops-computers', description: 'Ultrabooks, gaming rigs, monitors and peripherals', icon: 'Laptop', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', display_order: 2, is_featured: true, created_at: '2026-01-01' },
  { id: 'c3', name: 'Audio & Wearables', slug: 'audio-wearables', description: 'TWS earbuds, ANC headphones, smartwatches and fitness bands', icon: 'Headphones', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', display_order: 3, is_featured: true, created_at: '2026-01-01' },
  { id: 'c4', name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Premium kitchen appliances, air purifiers, and home essentials', icon: 'Home', image_url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80', display_order: 4, is_featured: true, created_at: '2026-01-01' },
  { id: 'c5', name: 'Fashion & Apparel', slug: 'fashion-apparel', description: 'Men and women designer apparel, footwear and ethnic wear', icon: 'Shirt', image_url: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80', display_order: 5, is_featured: true, created_at: '2026-01-01' },
  { id: 'c6', name: 'Beauty & Grooming', slug: 'beauty-grooming', description: 'Luxury skincare, haircare and styling grooming tools', icon: 'Sparkles', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', display_order: 6, is_featured: true, created_at: '2026-01-01' }
];

export const MOCK_BRANDS: Brand[] = [
  {
    "id": "b1",
    "name": "Apple",
    "slug": "apple",
    "logo_url": null,
    "website": "https://apple.com/in",
    "origin_country": "USA",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b2",
    "name": "Samsung",
    "slug": "samsung",
    "logo_url": null,
    "website": "https://samsung.com/in",
    "origin_country": "South Korea",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b3",
    "name": "OnePlus",
    "slug": "oneplus",
    "logo_url": null,
    "website": "https://oneplus.in",
    "origin_country": "China",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b4",
    "name": "Sony",
    "slug": "sony",
    "logo_url": null,
    "website": "https://sony.co.in",
    "origin_country": "Japan",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b5",
    "name": "boAt",
    "slug": "boat",
    "logo_url": null,
    "website": "https://boat-lifestyle.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b6",
    "name": "Noise",
    "slug": "noise",
    "logo_url": null,
    "website": "https://gonoise.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b7",
    "name": "ASUS",
    "slug": "asus",
    "logo_url": null,
    "website": "https://asus.com/in",
    "origin_country": "Taiwan",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b8",
    "name": "Dyson",
    "slug": "dyson",
    "logo_url": null,
    "website": "https://dyson.in",
    "origin_country": "Singapore",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b9",
    "name": "Philips",
    "slug": "philips",
    "logo_url": null,
    "website": "https://philips.co.in",
    "origin_country": "Netherlands",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b10",
    "name": "Prestige",
    "slug": "prestige",
    "logo_url": null,
    "website": "https://prestigexclusive.in",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b11",
    "name": "Levi's",
    "slug": "levis",
    "logo_url": null,
    "website": "https://levi.in",
    "origin_country": "USA",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b12",
    "name": "Fabindia",
    "slug": "fabindia",
    "logo_url": null,
    "website": "https://fabindia.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b13",
    "name": "Forest Essentials",
    "slug": "forest-essentials",
    "logo_url": null,
    "website": "https://forestessentialsindia.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b14",
    "name": "Logitech",
    "slug": "logitech",
    "logo_url": null,
    "website": "https://logitech.com",
    "origin_country": "Switzerland",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b15",
    "name": "Titan",
    "slug": "titan",
    "logo_url": null,
    "website": "https://titan.co.in",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b16",
    "name": "Google",
    "slug": "google",
    "logo_url": null,
    "website": "https://store.google.com/in",
    "origin_country": "USA",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b17",
    "name": "Dell",
    "slug": "dell",
    "logo_url": null,
    "website": "https://dell.com/in",
    "origin_country": "USA",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b18",
    "name": "HP",
    "slug": "hp",
    "logo_url": null,
    "website": "https://hp.com/in",
    "origin_country": "USA",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b19",
    "name": "Lenovo",
    "slug": "lenovo",
    "logo_url": null,
    "website": "https://lenovo.com/in",
    "origin_country": "China",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b20",
    "name": "Hawkins",
    "slug": "hawkins",
    "logo_url": null,
    "website": "https://hawkinscookers.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  },
  {
    "id": "b21",
    "name": "Bajaj",
    "slug": "bajaj",
    "logo_url": null,
    "website": "https://bajajelectricals.com",
    "origin_country": "India",
    "is_popular": true,
    "created_at": "2026-01-01"
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'ban-1',
    title: 'Festival of Electronics & Flagships',
    subtitle: 'Up to 45% OFF on Apple, Samsung, OnePlus & Sony with Free India COD Delivery',
    badge: 'GRAND INDIAN FESTIVAL',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
    link_url: '/shop?category=mobiles-tablets',
    button_text: 'Explore Flagships',
    position: 'hero_slider',
    display_order: 1,
    is_active: true
  },
  {
    id: 'ban-2',
    title: 'Acoustic Precision & ANC Audio',
    subtitle: 'Immersive sound with Sony WH-1000XM5 & boAt Signature Sound at best prices',
    badge: 'AUDIO SPOTLIGHT',
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80',
    link_url: '/shop?category=audio-wearables',
    button_text: 'Shop Audio Deals',
    position: 'hero_slider',
    display_order: 2,
    is_active: true
  },
  {
    id: 'ban-3',
    title: 'Modern Living & Smart Kitchen',
    subtitle: 'Elevate your Indian kitchen with Philips XXL air fryers & Prestige mixer grinders',
    badge: 'HOME ESSENTIALS',
    image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
    link_url: '/shop?category=home-kitchen',
    button_text: 'Shop Kitchen',
    position: 'hero_slider',
    display_order: 3,
    is_active: true
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { id: 'cp1', code: 'NEXORA10', description: 'Flat 10% discount on first COD order above ₹999', discount_type: 'percentage', discount_value: 10, max_discount_amount: 1500, min_order_value: 999, expiry_date: '2026-12-31', usage_limit: 10000, used_count: 142, is_active: true },
  { id: 'cp2', code: 'FESTIVE500', description: 'Flat ₹500 OFF on orders above ₹4,999', discount_type: 'flat', discount_value: 500, max_discount_amount: null, min_order_value: 4999, expiry_date: '2026-12-31', usage_limit: 5000, used_count: 89, is_active: true },
  { id: 'cp3', code: 'FREESHIP', description: 'Free express courier delivery on any order', discount_type: 'flat', discount_value: 49, max_discount_amount: 49, min_order_value: 0, expiry_date: '2026-12-31', usage_limit: null, used_count: 312, is_active: true }
];

const RAW_MOCK_PRODUCTS = [
  {
    "id": "prod-1",
    "title": "Apple iPhone 16 Pro (128GB - Desert Titanium)",
    "slug": "apple-iphone-16-pro-128gb-desert-titanium",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MYNF3HNA",
    "short_description": "Grade 5 Titanium design with refined microblasted finish",
    "description": "Apple iPhone 16 Pro (128GB - Desert Titanium). Genuine commercial product from Apple (iPhone 16 Pro). Includes 1 Year Apple India Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 119900,
    "price": 112900,
    "discount_percentage": 6,
    "rating": 4.8,
    "reviews_count": 342,
    "is_featured": true,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Apple India Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 45,
    "specifications": {
      "Display": "6.3-inch Super Retina XDR OLED 120Hz",
      "Chipset": "A18 Pro Chip with 6-core GPU",
      "Storage": "128GB",
      "Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "OS": "iOS 18"
    },
    "highlights": [
      "Grade 5 Titanium design with refined microblasted finish",
      "Camera Control button for instant capture and visual intelligence",
      "A18 Pro chip enables console-grade gaming and battery efficiency"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-1",
        "product_id": "prod-1",
        "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPhone 16 Pro (128GB - Desert Titanium)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-2",
    "title": "Apple iPhone 16 Pro Max (256GB - Natural Titanium)",
    "slug": "apple-iphone-16-pro-max-256gb-natural-titanium",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MYWU3HNA",
    "short_description": "Largest 6.9-inch Super Retina XDR display with thinnest borders",
    "description": "Apple iPhone 16 Pro Max (256GB - Natural Titanium). Genuine commercial product from Apple (iPhone 16 Pro Max). Includes 1 Year Apple India Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 144900,
    "price": 139900,
    "discount_percentage": 3,
    "rating": 4.9,
    "reviews_count": 489,
    "is_featured": true,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Apple India Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 32,
    "specifications": {
      "Display": "6.9-inch Super Retina XDR OLED 120Hz",
      "Chipset": "A18 Pro Chip with 6-core GPU",
      "Storage": "256GB",
      "Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Battery": "Up to 33 hours video playback"
    },
    "highlights": [
      "Largest 6.9-inch Super Retina XDR display with thinnest borders",
      "Industry-leading battery life up to 33 hours video playback",
      "Next-generation Photographic Styles with real-time tone and color grading"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-2",
        "product_id": "prod-2",
        "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPhone 16 Pro Max (256GB - Natural Titanium)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-3",
    "title": "Apple iPhone 16 (128GB - Ultramarine)",
    "slug": "apple-iphone-16-128gb-ultramarine",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MYEF3HNA",
    "short_description": "Aerospace-grade aluminum enclosure with color-infused back glass",
    "description": "Apple iPhone 16 (128GB - Ultramarine). Genuine commercial product from Apple (iPhone 16). Includes 1 Year Apple India Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 79900,
    "price": 74900,
    "discount_percentage": 6,
    "rating": 4.7,
    "reviews_count": 215,
    "is_featured": true,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Apple India Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 60,
    "specifications": {
      "Display": "6.1-inch Super Retina XDR OLED 60Hz",
      "Chipset": "A18 Bionic Chip",
      "Storage": "128GB",
      "Camera": "48MP Fusion + 12MP Ultra Wide",
      "OS": "iOS 18"
    },
    "highlights": [
      "Aerospace-grade aluminum enclosure with color-infused back glass",
      "A18 Bionic chip with 5-core GPU and Apple Intelligence",
      "48MP Fusion camera with 2x optical-quality Telephoto"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-3",
        "product_id": "prod-3",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPhone 16 (128GB - Ultramarine)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-4",
    "title": "Apple iPhone 15 (128GB - Black)",
    "slug": "apple-iphone-15-128gb-black",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MTP03HNA",
    "short_description": "Dynamic Island bubbles up alerts and Live Activities",
    "description": "Apple iPhone 15 (128GB - Black). Genuine commercial product from Apple (iPhone 15). Includes 1 Year Apple India Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 69900,
    "price": 58999,
    "discount_percentage": 16,
    "rating": 4.7,
    "reviews_count": 890,
    "is_featured": true,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Apple India Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 75,
    "specifications": {
      "Display": "6.1-inch Super Retina XDR OLED",
      "Chipset": "A16 Bionic Chip",
      "Storage": "128GB",
      "Connector": "USB-C",
      "Camera": "48MP + 12MP"
    },
    "highlights": [
      "Dynamic Island bubbles up alerts and Live Activities",
      "48MP main camera captures super-high-resolution photos",
      "Universal USB-C connector with DisplayPort support"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-4",
        "product_id": "prod-4",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPhone 15 (128GB - Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-5",
    "title": "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray)",
    "slug": "samsung-galaxy-s24-ultra-5g-12gb-ram-256gb-titanium-gray",
    "brand_id": "b2",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-SAM-SMS928BD",
    "short_description": "Built-in S Pen with Galaxy AI Circle to Search and Live Translation",
    "description": "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray). Genuine commercial product from Samsung (Galaxy S24 Ultra). Includes 1 Year Manufacturer Comprehensive Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 134999,
    "price": 121999,
    "discount_percentage": 10,
    "rating": 4.7,
    "reviews_count": 289,
    "is_featured": true,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Manufacturer Comprehensive Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 38,
    "specifications": {
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz QHD+",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM": "12GB",
      "Storage": "256GB",
      "Battery": "5000mAh with 45W Fast Charging"
    },
    "highlights": [
      "Built-in S Pen with Galaxy AI Circle to Search and Live Translation",
      "Corning Gorilla Armor anti-reflective glass with Titanium unibody",
      "200MP Quad Tele System with AI ProVisual Zoom"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-5",
        "product_id": "prod-5",
        "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-6",
    "title": "Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black)",
    "slug": "samsung-galaxy-s24-5g-8gb-ram-128gb-onyx-black",
    "brand_id": "b2",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-SAM-SMS921BD",
    "short_description": "Compact 6.2-inch FHD+ Dynamic AMOLED 2X display",
    "description": "Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black). Genuine commercial product from Samsung (Galaxy S24). Includes 1 Year Manufacturer Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 79999,
    "price": 64999,
    "discount_percentage": 19,
    "rating": 4.6,
    "reviews_count": 178,
    "is_featured": true,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Manufacturer Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 50,
    "specifications": {
      "Display": "6.2-inch Dynamic AMOLED 2X 120Hz",
      "Processor": "Exynos 2400 10-core 4nm",
      "RAM": "8GB",
      "Storage": "128GB",
      "Battery": "4000mAh"
    },
    "highlights": [
      "Compact 6.2-inch FHD+ Dynamic AMOLED 2X display",
      "Galaxy AI photo assist and transcript generation",
      "Armor Aluminum 2.0 with IP68 water & dust resistance"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-6",
        "product_id": "prod-6",
        "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-7",
    "title": "Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow)",
    "slug": "samsung-galaxy-z-fold-6-5g-12gb-ram-256gb-silver-shadow",
    "brand_id": "b2",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-SAM-SMF956BD",
    "short_description": "Thinner and lighter dual-rail flex hinge design",
    "description": "Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow). Genuine commercial product from Samsung (Galaxy Z Fold 6). Includes 1 Year Samsung India Warranty including 1-time screen replacement. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 164999,
    "price": 154999,
    "discount_percentage": 6,
    "rating": 4.6,
    "reviews_count": 94,
    "is_featured": true,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Samsung India Warranty including 1-time screen replacement",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 18,
    "specifications": {
      "Inner Display": "7.6-inch Foldable Dynamic AMOLED 2X 120Hz",
      "Cover Display": "6.3-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM": "12GB",
      "Storage": "256GB"
    },
    "highlights": [
      "Thinner and lighter dual-rail flex hinge design",
      "Massive 7.6-inch Dynamic AMOLED 2X inner folding display",
      "Galaxy AI Composer and Note Assist for multi-window productivity"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-7",
        "product_id": "prod-7",
        "image_url": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-8",
    "title": "OnePlus 12 5G (12GB RAM, 256GB - Silky Black)",
    "slug": "oneplus-12-5g-12gb-ram-256gb-silky-black",
    "brand_id": "b3",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-ONE-CPH2573",
    "short_description": "Ultra-bright 4500 nits 2K ProXDR display with Aqua Touch",
    "description": "OnePlus 12 5G (12GB RAM, 256GB - Silky Black). Genuine commercial product from OnePlus (OnePlus 12). Includes 1 Year Comprehensive Manufacturer Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 64999,
    "price": 59999,
    "discount_percentage": 8,
    "rating": 4.8,
    "reviews_count": 512,
    "is_featured": true,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Comprehensive Manufacturer Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 65,
    "specifications": {
      "Display": "6.82-inch 2K ProXDR 120Hz LTPO OLED",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Camera": "4th Gen Hasselblad Camera System (50MP + 64MP + 48MP)",
      "Battery": "5400mAh"
    },
    "highlights": [
      "Ultra-bright 4500 nits 2K ProXDR display with Aqua Touch",
      "Dual Cryo-velocity VC cooling system for sustained gaming",
      "100W SUPERVOOC wired + 50W AIRVOOC wireless charging"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-8",
        "product_id": "prod-8",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "OnePlus 12 5G (12GB RAM, 256GB - Silky Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-9",
    "title": "OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue)",
    "slug": "oneplus-12r-5g-8gb-ram-128gb-cool-blue",
    "brand_id": "b3",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-ONE-CPH2585",
    "short_description": "4th Gen LTPO 1.5K 120Hz display with Dolby Vision",
    "description": "OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue). Genuine commercial product from OnePlus (OnePlus 12R). Includes 1 Year Comprehensive Manufacturer Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 39999,
    "price": 35999,
    "discount_percentage": 10,
    "rating": 4.7,
    "reviews_count": 620,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Comprehensive Manufacturer Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 80,
    "specifications": {
      "Display": "6.78-inch 1.5K LTPO4 AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "8GB",
      "Storage": "128GB",
      "Battery": "5500mAh with 100W Fast Charging"
    },
    "highlights": [
      "4th Gen LTPO 1.5K 120Hz display with Dolby Vision",
      "Largest 5500mAh battery ever on a OnePlus flagship phone",
      "100W SUPERVOOC charging charges 1-100% in 26 minutes"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-9",
        "product_id": "prod-9",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-10",
    "title": "Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel)",
    "slug": "google-pixel-9-pro-xl-16gb-ram-128gb-hazel",
    "brand_id": "b16",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-GOO-GEC77",
    "short_description": "Google Tensor G4 chip with 16GB RAM for advanced Gemini Nano AI",
    "description": "Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel). Genuine commercial product from Google (Pixel 9 Pro XL). Includes 1 Year Google India Manufacturer Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 124999,
    "price": 119999,
    "discount_percentage": 4,
    "rating": 4.7,
    "reviews_count": 140,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Google India Manufacturer Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 25,
    "specifications": {
      "Display": "6.8-inch Super Actua LTPO OLED 120Hz",
      "Processor": "Google Tensor G4 with Titan M2",
      "RAM": "16GB",
      "Storage": "128GB",
      "Camera": "50MP Main + 48MP Ultrawide + 48MP Telephoto"
    },
    "highlights": [
      "Google Tensor G4 chip with 16GB RAM for advanced Gemini Nano AI",
      "Pro triple camera system with 5x Telephoto and 8K Video Boost",
      "Super Actua display with 3000 nits peak brightness"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-10",
        "product_id": "prod-10",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-11",
    "title": "Google Pixel 8a (8GB RAM, 128GB - Bay)",
    "slug": "google-pixel-8a-8gb-ram-128gb-bay",
    "brand_id": "b16",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-GOO-G8HHN",
    "short_description": "Google Tensor G3 chip enables Best Take, Audio Magic Eraser & Circle to Search",
    "description": "Google Pixel 8a (8GB RAM, 128GB - Bay). Genuine commercial product from Google (Pixel 8a). Includes 1 Year Google India Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 52999,
    "price": 44999,
    "discount_percentage": 15,
    "rating": 4.6,
    "reviews_count": 230,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Google India Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 40,
    "specifications": {
      "Display": "6.1-inch Actua OLED 120Hz",
      "Processor": "Google Tensor G3",
      "RAM": "8GB",
      "Storage": "128GB",
      "Battery": "4492mAh with wireless charging"
    },
    "highlights": [
      "Google Tensor G3 chip enables Best Take, Audio Magic Eraser & Circle to Search",
      "64MP main camera with Night Sight and Super Res Zoom up to 8x",
      "Guaranteed 7 years of OS, security and Feature Drop updates"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-11",
        "product_id": "prod-11",
        "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Google Pixel 8a (8GB RAM, 128GB - Bay)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-12",
    "title": "Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey)",
    "slug": "apple-ipad-air-11-inch-m2-chip-wi-fi-128gb-space-grey",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MUWC3HNA",
    "short_description": "Blazing-fast Apple M2 chip with 8-core CPU and 10-core GPU",
    "description": "Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey). Genuine commercial product from Apple (iPad Air 11-inch M2). Includes 1 Year Apple Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 59900,
    "price": 56900,
    "discount_percentage": 5,
    "rating": 4.8,
    "reviews_count": 165,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Apple Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 35,
    "specifications": {
      "Display": "11-inch Liquid Retina IPS Display (2360 x 1640)",
      "Chipset": "Apple M2 Chip",
      "Storage": "128GB",
      "Biometrics": "Touch ID in Top Button",
      "Apple Pencil": "Apple Pencil Pro & USB-C compatible"
    },
    "highlights": [
      "Blazing-fast Apple M2 chip with 8-core CPU and 10-core GPU",
      "11-inch Liquid Retina display with P3 wide color and True Tone",
      "Landscape 12MP Ultra Wide front camera with Center Stage"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-12",
        "product_id": "prod-12",
        "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-13",
    "title": "Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue)",
    "slug": "apple-ipad-10th-gen-109-inch-wi-fi-64gb-blue",
    "brand_id": "b1",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-APP-MPQ03HNA",
    "short_description": "All-screen design with 10.9-inch Liquid Retina display",
    "description": "Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue). Genuine commercial product from Apple (iPad 10th Gen). Includes 1 Year Apple Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 34900,
    "price": 31900,
    "discount_percentage": 9,
    "rating": 4.7,
    "reviews_count": 420,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Apple Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 60,
    "specifications": {
      "Display": "10.9-inch Liquid Retina Display (2360 x 1640)",
      "Chipset": "A14 Bionic Chip",
      "Storage": "64GB",
      "Connector": "USB-C",
      "Camera": "12MP Wide back, 12MP Landscape Ultra Wide front"
    },
    "highlights": [
      "All-screen design with 10.9-inch Liquid Retina display",
      "A14 Bionic chip delivers power for creative and educational apps",
      "USB-C connector and landscape stereo speakers"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-13",
        "product_id": "prod-13",
        "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-14",
    "title": "Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray)",
    "slug": "samsung-galaxy-tab-s9-fe-109-inch-wi-fi-128gb-gray",
    "brand_id": "b2",
    "category_id": "c1",
    "subcategory_id": null,
    "sku": "NEX-SAM-SMX510",
    "short_description": "Inbox water and dust resistant IP68 certified S Pen included",
    "description": "Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray). Genuine commercial product from Samsung (Galaxy Tab S9 FE). Includes 1 Year Samsung India Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 44999,
    "price": 33999,
    "discount_percentage": 24,
    "rating": 4.6,
    "reviews_count": 198,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Samsung India Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 45,
    "specifications": {
      "Display": "10.9-inch WQXGA LCD 90Hz",
      "Processor": "Exynos 1380 Octa-core",
      "RAM": "6GB",
      "Storage": "128GB (Expandable up to 1TB)",
      "S Pen": "Included in box (IP68)"
    },
    "highlights": [
      "Inbox water and dust resistant IP68 certified S Pen included",
      "Bright 10.9-inch 90Hz display with Vision Booster technology",
      "8000mAh battery supporting 45W super-fast charging"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-14",
        "product_id": "prod-14",
        "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-15",
    "title": "Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight)",
    "slug": "apple-macbook-air-15-inch-m3-chip-8gb-unified-memory-256gb-ssd-starlight",
    "brand_id": "b1",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-APP-MXD13HNA",
    "short_description": "Remarkably thin 11.5mm aluminum fanless enclosure",
    "description": "Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight). Genuine commercial product from Apple (MacBook Air 15-inch M3). Includes 1 Year Apple Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 134900,
    "price": 124900,
    "discount_percentage": 7,
    "rating": 4.8,
    "reviews_count": 142,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Apple Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 30,
    "specifications": {
      "Display": "15.3-inch Liquid Retina Display (2880 x 1864)",
      "Processor": "Apple M3 Chip (8-core CPU, 10-core GPU)",
      "Unified Memory": "8GB",
      "Storage": "256GB PCIe SSD",
      "Weight": "1.51 kg"
    },
    "highlights": [
      "Remarkably thin 11.5mm aluminum fanless enclosure",
      "Expansive 15.3-inch Liquid Retina display with 500 nits brightness",
      "Up to 18 hours of battery life and dual external display support"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-15",
        "product_id": "prod-15",
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-16",
    "title": "Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black)",
    "slug": "apple-macbook-pro-14-inch-m3-pro-chip-18gb-unified-memory-512gb-ssd-space-black",
    "brand_id": "b1",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-APP-MRX33HNA",
    "short_description": "M3 Pro chip with hardware-accelerated ray tracing and mesh shading",
    "description": "Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black). Genuine commercial product from Apple (MacBook Pro 14-inch M3 Pro). Includes 1 Year Apple Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 199900,
    "price": 184900,
    "discount_percentage": 8,
    "rating": 4.9,
    "reviews_count": 88,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Apple Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 20,
    "specifications": {
      "Display": "14.2-inch Liquid Retina XDR Mini-LED 120Hz",
      "Processor": "Apple M3 Pro (11-core CPU, 14-core GPU)",
      "Unified Memory": "18GB",
      "Storage": "512GB PCIe SSD",
      "Ports": "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
    },
    "highlights": [
      "M3 Pro chip with hardware-accelerated ray tracing and mesh shading",
      "Liquid Retina XDR display with 1600 nits peak HDR brightness and ProMotion 120Hz",
      "Anodization seal reduces fingerprint appearance on Space Black finish"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-16",
        "product_id": "prod-16",
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-17",
    "title": "ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray)",
    "slug": "asus-rog-zephyrus-g14-amd-ryzen-9-8945hs-rtx-4070-8gb-32gb-ram-1tb-ssd-eclipse-gray",
    "brand_id": "b7",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-ASU-GA403UIQ",
    "short_description": "Gorgeous 3K 120Hz 0.2ms OLED ROG Nebula display with G-SYNC",
    "description": "ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray). Genuine commercial product from ASUS (ROG Zephyrus G14 GA403UI). Includes 1 Year ASUS Onsite Domestic Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 199990,
    "price": 179990,
    "discount_percentage": 10,
    "rating": 4.8,
    "reviews_count": 64,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year ASUS Onsite Domestic Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 15,
    "specifications": {
      "Display": "14-inch 3K (2880 x 1800) OLED 120Hz 500 nits",
      "Processor": "AMD Ryzen 9 8945HS with Ryzen AI NPU",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB M.2 PCIe 4.0 SSD"
    },
    "highlights": [
      "Gorgeous 3K 120Hz 0.2ms OLED ROG Nebula display with G-SYNC",
      "CNC aluminum unibody weighing only 1.5kg with Slash Lighting LED lid",
      "NVIDIA GeForce RTX 4070 Laptop GPU with 90W TGP and MUX Switch"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-17",
        "product_id": "prod-17",
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        "alt_text": "ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-18",
    "title": "Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum)",
    "slug": "dell-xps-13-intel-core-ultra-7-155h-16gb-lpddr5x-512gb-ssd-fhd-infinityedge-platinum",
    "brand_id": "b17",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-DEL-XPS9340U",
    "short_description": "Iconic minimalist design with seamless glass haptic touchpad and touch function row",
    "description": "Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum). Genuine commercial product from Dell (XPS 13 9340). Includes 1 Year Dell Premium Support with Onsite Service. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 149990,
    "price": 139990,
    "discount_percentage": 7,
    "rating": 4.7,
    "reviews_count": 52,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Dell Premium Support with Onsite Service",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 22,
    "specifications": {
      "Display": "13.4-inch FHD+ (1920 x 1200) InfinityEdge 500 nits 120Hz",
      "Processor": "Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)",
      "RAM": "16GB LPDDR5x 7467 MT/s",
      "Storage": "512GB PCIe 4.0 NVMe SSD",
      "Weight": "1.19 kg"
    },
    "highlights": [
      "Iconic minimalist design with seamless glass haptic touchpad and touch function row",
      "Intel Core Ultra 7 processor with dedicated AI NPU acceleration",
      "Machined aluminum and Gorilla Glass 3 construction weighing 1.19kg"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-18",
        "product_id": "prod-18",
        "image_url": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-19",
    "title": "HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)",
    "slug": "hp-omen-16-gaming-laptop-intel-14th-gen-core-i7-14700hx-rtx-4060-8gb-16gb-ram-1tb-ssd",
    "brand_id": "b18",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-HP-16wf1025",
    "short_description": "14th Gen Intel Core i7-14700HX 20-core processor",
    "description": "HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD). Genuine commercial product from HP (Omen 16-wf1025TX). Includes 1 Year HP Onsite Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 154990,
    "price": 134990,
    "discount_percentage": 13,
    "rating": 4.7,
    "reviews_count": 76,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year HP Onsite Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 25,
    "specifications": {
      "Display": "16.1-inch QHD (2560 x 1440) 240Hz 3ms IPS",
      "Processor": "Intel Core i7-14700HX (20 cores, 28 threads)",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)",
      "RAM": "16GB DDR5 5600MHz",
      "Storage": "1TB Gen4 NVMe SSD"
    },
    "highlights": [
      "14th Gen Intel Core i7-14700HX 20-core processor",
      "16.1-inch QHD 240Hz 3ms IPS anti-glare display with 100% sRGB",
      "Omen Tempest Cooling technology with 3-sided venting and 5-way airflow"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-19",
        "product_id": "prod-19",
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        "alt_text": "HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-20",
    "title": "Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED)",
    "slug": "lenovo-thinkpad-x1-carbon-gen-12-intel-core-ultra-7-155h-32gb-ram-1tb-ssd-28k-oled",
    "brand_id": "b19",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-LEN-21KC005V",
    "short_description": "Legendary ThinkPad keyboard with tactile markings and TrackPoint Quick Menu",
    "description": "Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED). Genuine commercial product from Lenovo (ThinkPad X1 Carbon Gen 12). Includes 3 Years Lenovo Premier Support with Accidental Damage Protection. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 239990,
    "price": 214990,
    "discount_percentage": 10,
    "rating": 4.9,
    "reviews_count": 41,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "3 Years Lenovo Premier Support with Accidental Damage Protection",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 14,
    "specifications": {
      "Display": "14-inch 2.8K (2880 x 1800) OLED 120Hz 400 nits HDR500",
      "Processor": "Intel Core Ultra 7 155H",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB PCIe Gen 4 Performance SSD",
      "Weight": "1.09 kg"
    },
    "highlights": [
      "Legendary ThinkPad keyboard with tactile markings and TrackPoint Quick Menu",
      "Ultralight carbon fiber unibody meeting MIL-STD-810H durability standards",
      "Stunning 14-inch 2.8K 120Hz OLED display with Dolby Vision"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-20",
        "product_id": "prod-20",
        "image_url": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-21",
    "title": "Logitech MX Master 3S Wireless Performance Mouse (Graphite)",
    "slug": "logitech-mx-master-3s-wireless-performance-mouse-graphite",
    "brand_id": "b14",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-LOG-91000656",
    "short_description": "Quiet Clicks technology reduces 90% click noise while maintaining tactile feel",
    "description": "Logitech MX Master 3S Wireless Performance Mouse (Graphite). Genuine commercial product from Logitech (MX Master 3S). Includes 1 Year Limited Hardware Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 10995,
    "price": 8995,
    "discount_percentage": 18,
    "rating": 4.9,
    "reviews_count": 840,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Limited Hardware Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 90,
    "specifications": {
      "Sensor": "Darkfield High Precision 8000 DPI",
      "Scroll Wheel": "MagSpeed Electromagnetic SmartShift",
      "Battery Life": "Up to 70 days on full charge",
      "Connectivity": "Bluetooth Low Energy + Logi Bolt USB Receiver"
    },
    "highlights": [
      "Quiet Clicks technology reduces 90% click noise while maintaining tactile feel",
      "8000 DPI Darkfield sensor tracks on any surface including glass",
      "MagSpeed Electromagnetic scrolling scrolls 1000 lines per second"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-21",
        "product_id": "prod-21",
        "image_url": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Logitech MX Master 3S Wireless Performance Mouse (Graphite)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-22",
    "title": "Logitech G502 HERO High Performance Wired Gaming Mouse (Black)",
    "slug": "logitech-g502-hero-high-performance-wired-gaming-mouse-black",
    "brand_id": "b14",
    "category_id": "c2",
    "subcategory_id": null,
    "sku": "NEX-LOG-91000547",
    "short_description": "HERO 25K optical gaming sensor with 1:1 tracking up to 25600 DPI",
    "description": "Logitech G502 HERO High Performance Wired Gaming Mouse (Black). Genuine commercial product from Logitech (G502 HERO). Includes 2 Years Limited Hardware Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 5495,
    "price": 3995,
    "discount_percentage": 27,
    "rating": 4.8,
    "reviews_count": 1250,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "2 Years Limited Hardware Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 110,
    "specifications": {
      "Sensor": "HERO 25K (100 - 25600 DPI)",
      "Max Acceleration": "> 40G",
      "Report Rate": "1000Hz (1ms)",
      "RGB": "LIGHTSYNC 16.8M colors"
    },
    "highlights": [
      "HERO 25K optical gaming sensor with 1:1 tracking up to 25600 DPI",
      "11 programmable buttons with dual-mode hyper-fast scroll wheel",
      "Adjustable weight system with five removable 3.6g weights"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-22",
        "product_id": "prod-22",
        "image_url": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Logitech G502 HERO High Performance Wired Gaming Mouse (Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-23",
    "title": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)",
    "slug": "sony-wh-1000xm5-wireless-noise-cancelling-headphones-black",
    "brand_id": "b4",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-SON-WH1000XM",
    "short_description": "Dual Processors V1 and QN1 control 8 microphones for unparalleled ANC",
    "description": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black). Genuine commercial product from Sony (WH-1000XM5). Includes 1 Year Sony India Domestic Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 34990,
    "price": 26990,
    "discount_percentage": 23,
    "rating": 4.8,
    "reviews_count": 512,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Sony India Domestic Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 52,
    "specifications": {
      "Headphone Type": "Closed Dynamic Over-Ear",
      "Driver Unit": "30mm Carbon Fiber Composite",
      "Bluetooth": "Version 5.2 with LDAC, AAC, SBC",
      "Weight": "250g",
      "Battery": "30 hours (ANC ON), 40 hours (ANC OFF)"
    },
    "highlights": [
      "Dual Processors V1 and QN1 control 8 microphones for unparalleled ANC",
      "Specially designed 30mm carbon fiber driver unit delivers natural sound quality",
      "Up to 30 hours battery life with quick charging (3 min charge for 3 hours playback)"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-23",
        "product_id": "prod-23",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-24",
    "title": "Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)",
    "slug": "sony-wf-1000xm5-truly-wireless-noise-cancelling-earbuds-silver",
    "brand_id": "b4",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-SON-WF1000XM",
    "short_description": "Dynamic Driver X reproduces wide frequencies and deep authentic bass",
    "description": "Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver). Genuine commercial product from Sony (WF-1000XM5). Includes 1 Year Sony India Domestic Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 29990,
    "price": 21990,
    "discount_percentage": 27,
    "rating": 4.7,
    "reviews_count": 320,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Sony India Domestic Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 40,
    "specifications": {
      "Driver Unit": "8.4mm Dynamic Driver X",
      "Water Resistance": "IPX4",
      "Battery Life": "8 hours in earbuds + 16 hours in case (24 hours total)",
      "Hi-Res Audio": "LDAC and DSEE Extreme certified"
    },
    "highlights": [
      "Dynamic Driver X reproduces wide frequencies and deep authentic bass",
      "Two proprietary processors and dual feedback microphones cancel low frequency noise",
      "AI-based bone conduction sensors and deep neural network for clear calls"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-24",
        "product_id": "prod-24",
        "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-25",
    "title": "Apple AirPods Pro 2nd Gen with USB-C Charging Case (White)",
    "slug": "apple-airpods-pro-2nd-gen-with-usb-c-charging-case-white",
    "brand_id": "b1",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-APP-MTJV3HNA",
    "short_description": "Apple H2 chip powers Adaptive Audio, Active Noise Cancellation and Transparency",
    "description": "Apple AirPods Pro 2nd Gen with USB-C Charging Case (White). Genuine commercial product from Apple (AirPods Pro 2). Includes 1 Year Apple Limited Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 24900,
    "price": 22900,
    "discount_percentage": 8,
    "rating": 4.9,
    "reviews_count": 780,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Apple Limited Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 70,
    "specifications": {
      "Chip": "Apple H2 headphone chip, U1 chip in case",
      "Sweat and Water Resistance": "IP54 for earbuds and case",
      "Battery": "Up to 6 hours listening with ANC, 30 hours total with case",
      "Connector": "USB-C, MagSafe, Qi wireless"
    },
    "highlights": [
      "Apple H2 chip powers Adaptive Audio, Active Noise Cancellation and Transparency",
      "Personalized Spatial Audio with dynamic head tracking places sound all around you",
      "MagSafe Charging Case (USB-C) with speaker and lanyard loop"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-25",
        "product_id": "prod-25",
        "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Apple AirPods Pro 2nd Gen with USB-C Charging Case (White)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-26",
    "title": "boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black)",
    "slug": "boat-airdopes-141-anc-truly-wireless-earbuds-gunmetal-black",
    "brand_id": "b5",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-BOA-AD141ANC",
    "short_description": "Active Noise Cancellation up to 32dB cancels out background commute noise",
    "description": "boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black). Genuine commercial product from boAt (Airdopes 141 ANC). Includes 1 Year boAt Lifestyle Manufacturer Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 5990,
    "price": 1499,
    "discount_percentage": 75,
    "rating": 4.5,
    "reviews_count": 1420,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year boAt Lifestyle Manufacturer Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 150,
    "specifications": {
      "Driver": "10mm Signature Drivers",
      "ANC": "Up to 32dB Active Noise Cancellation",
      "Latency": "BEAST Mode 50ms low latency",
      "Bluetooth": "v5.3",
      "Water Resistance": "IPX5"
    },
    "highlights": [
      "Active Noise Cancellation up to 32dB cancels out background commute noise",
      "Massive 42 hours total playtime with ASAP charge (10 mins = 120 mins playtime)",
      "ENx quad microphones provide clear hands-free voice calling"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-26",
        "product_id": "prod-26",
        "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        "alt_text": "boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-27",
    "title": "boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green)",
    "slug": "boat-rockerz-550-over-ear-wireless-headphones-army-green",
    "brand_id": "b5",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-BOA-RCKZ550G",
    "short_description": "50mm dynamic drivers deliver punchy bass and crystalline audio",
    "description": "boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green). Genuine commercial product from boAt (Rockerz 550). Includes 1 Year boAt Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 4999,
    "price": 1799,
    "discount_percentage": 64,
    "rating": 4.4,
    "reviews_count": 980,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year boAt Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 95,
    "specifications": {
      "Driver": "50mm Dynamic Drivers",
      "Battery": "500mAh (Up to 20 Hours Playback)",
      "Connectivity": "Bluetooth v5.0 and 3.5mm AUX dual mode",
      "Charging Time": "2.5 Hours"
    },
    "highlights": [
      "50mm dynamic drivers deliver punchy bass and crystalline audio",
      "Physical noise isolation ear cushions for comfortable prolonged gaming and music",
      "Up to 20 hours of continuous wireless playback"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-27",
        "product_id": "prod-27",
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "alt_text": "boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-28",
    "title": "Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black)",
    "slug": "noise-colorfit-ultra-3-smartwatch-196-inch-amoled-jet-black",
    "brand_id": "b6",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-NOI-WRBSWCOL",
    "short_description": "Massive 1.96-inch AMOLED display with 410x502 resolution and 7-day battery",
    "description": "Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black). Genuine commercial product from Noise (ColorFit Ultra 3). Includes 1 Year Noise Domestic Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 7999,
    "price": 2799,
    "discount_percentage": 65,
    "rating": 4.5,
    "reviews_count": 650,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Noise Domestic Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 110,
    "specifications": {
      "Display": "1.96-inch AMOLED (410 x 502 pixels)",
      "Battery Life": "Up to 7 days (2 days with heavy BT calling)",
      "Water Resistance": "IP68",
      "Sports Modes": "100+ Sports Modes"
    },
    "highlights": [
      "Massive 1.96-inch AMOLED display with 410x502 resolution and 7-day battery",
      "Single-chip TruSync Bluetooth calling with functional rotating crown",
      "Noise Health Suite: 24x7 Heart rate, SpO2, Sleep tracking and Stress monitor"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-28",
        "product_id": "prod-28",
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-29",
    "title": "Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue)",
    "slug": "titan-celestor-smartwatch-143-inch-amoled-gps-bt-calling-deep-blue",
    "brand_id": "b15",
    "category_id": "c3",
    "subcategory_id": null,
    "sku": "NEX-TIT-90176AP0",
    "short_description": "Ultra-sharp 1.43-inch AMOLED display with 1000 nits brightness and AOD",
    "description": "Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue). Genuine commercial product from Titan (Titan Celestor). Includes 1 Year Titan India Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 12995,
    "price": 7995,
    "discount_percentage": 38,
    "rating": 4.7,
    "reviews_count": 154,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "1 Year Titan India Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 45,
    "specifications": {
      "Display": "1.43-inch AMOLED 466x466",
      "GPS": "Built-in standalone GNSS GPS",
      "Battery": "Up to 7 days standard usage",
      "Water Resistance": "3 ATM"
    },
    "highlights": [
      "Ultra-sharp 1.43-inch AMOLED display with 1000 nits brightness and AOD",
      "Standalone multi-satellite GPS for precise outdoor run and trek telemetry",
      "Metallic bezel with premium silicone strap crafted by Titan design studio"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-29",
        "product_id": "prod-29",
        "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-30",
    "title": "Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black)",
    "slug": "philips-digital-air-fryer-xxl-72l-14kg-hd928090-black",
    "brand_id": "b9",
    "category_id": "c4",
    "subcategory_id": null,
    "sku": "NEX-PHI-HD928090",
    "short_description": "Rapid Air Technology with starfish base cooks evenly with up to 90% less fat",
    "description": "Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black). Genuine commercial product from Philips (HD9280/90). Includes 2 Years Philips India Worldwide Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 18995,
    "price": 12999,
    "discount_percentage": 32,
    "rating": 4.7,
    "reviews_count": 310,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "2 Years Philips India Worldwide Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 35,
    "specifications": {
      "Capacity": "7.2 Litres (1.4 kg)",
      "Power": "2000W",
      "Presets": "7 One-touch cooking presets",
      "Cleaning": "QuickClean non-stick dishwasher-safe basket"
    },
    "highlights": [
      "Rapid Air Technology with starfish base cooks evenly with up to 90% less fat",
      "Family-sized 7.2L pan capacity fits a whole chicken or 1.4 kg of French fries",
      "Connected NutriU App allows remote recipe monitoring from your phone"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-30",
        "product_id": "prod-30",
        "image_url": "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-31",
    "title": "Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)",
    "slug": "prestige-iris-plus-750-watt-mixer-grinder-with-4-jars-black",
    "brand_id": "b10",
    "category_id": "c4",
    "subcategory_id": null,
    "sku": "NEX-PRE-IRISPLUS",
    "short_description": "Heavy-duty 750 Watt motor grinds hardest Indian spices and idli batter",
    "description": "Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black). Genuine commercial product from Prestige (Iris Plus 750W). Includes 2 Years Warranty on Product & Motor. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 6195,
    "price": 3299,
    "discount_percentage": 47,
    "rating": 4.5,
    "reviews_count": 1100,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "2 Years Warranty on Product & Motor",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 75,
    "specifications": {
      "Motor Power": "750 Watts",
      "Blades": "Super-efficient 304 Stainless Steel",
      "Jars": "3 Stainless Steel Jars + 1 Transparent Juicer Jar",
      "Speed Controls": "3 Speed + Whip Pulse"
    },
    "highlights": [
      "Heavy-duty 750 Watt motor grinds hardest Indian spices and idli batter",
      "Includes 4 versatile jars: 1.5L Wet Jar, 1.0L Dry Jar, 300ml Chutney Jar, 1.5L Juicer",
      "Ergonomically designed sturdy handles with overload protection switch"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-31",
        "product_id": "prod-31",
        "image_url": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-32",
    "title": "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron)",
    "slug": "dyson-v12-detect-slim-total-clean-cordless-vacuum-cleaner-yellowiron",
    "brand_id": "b8",
    "category_id": "c4",
    "subcategory_id": null,
    "sku": "NEX-DYS-36834001",
    "short_description": "Fluffy Optic illuminated cleaner head reveals invisible micro-dust on hard floors",
    "description": "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron). Genuine commercial product from Dyson (V12 Detect Slim). Includes 2 Years Dyson India Comprehensive Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 55900,
    "price": 48900,
    "discount_percentage": 13,
    "rating": 4.8,
    "reviews_count": 215,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "2 Years Dyson India Comprehensive Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 20,
    "specifications": {
      "Suction Power": "150 Air Watts",
      "Filtration": "Whole-machine HEPA filtration 99.99% to 0.1 microns",
      "Weight": "2.2 kg ultralight",
      "Run Time": "Up to 60 minutes"
    },
    "highlights": [
      "Fluffy Optic illuminated cleaner head reveals invisible micro-dust on hard floors",
      "Piezo sensor continuously measures dust particle sizes and auto-increases suction",
      "Single-button power control with up to 60 minutes fade-free suction"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-32",
        "product_id": "prod-32",
        "image_url": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-33",
    "title": "Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black)",
    "slug": "hawkins-contura-hard-anodized-inner-lid-pressure-cooker-3-litre-black",
    "brand_id": "b20",
    "category_id": "c4",
    "subcategory_id": null,
    "sku": "NEX-HAW-CXT30",
    "short_description": "Hard anodized body absorbs heat faster and will not react with acidic foods",
    "description": "Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black). Genuine commercial product from Hawkins (Contura 3L). Includes 5 Years Hawkins India Limited Guarantee. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 2275,
    "price": 1899,
    "discount_percentage": 17,
    "rating": 4.7,
    "reviews_count": 850,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "5 Years Hawkins India Limited Guarantee",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 85,
    "specifications": {
      "Capacity": "3.0 Litres",
      "Base Thickness": "3.25 mm",
      "Material": "Hard Anodized Aluminum",
      "Cooktop Compatibility": "Gas Stove Compatible"
    },
    "highlights": [
      "Hard anodized body absorbs heat faster and will not react with acidic foods",
      "Rounded curved sides for easy stirring and quick removal of cooked food",
      "Inside-fitting safety lid cannot be opened until internal pressure falls"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-33",
        "product_id": "prod-33",
        "image_url": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-34",
    "title": "Bajaj Rex 500W Mixer Grinder with 3 Jars (White)",
    "slug": "bajaj-rex-500w-mixer-grinder-with-3-jars-white",
    "brand_id": "b21",
    "category_id": "c4",
    "subcategory_id": null,
    "sku": "NEX-BAJ-REX500W",
    "short_description": "500W Titan motor equipped with motor overload protector",
    "description": "Bajaj Rex 500W Mixer Grinder with 3 Jars (White). Genuine commercial product from Bajaj (Bajaj Rex 500W). Includes 1 Year Bajaj Consumer Care Warranty. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 3210,
    "price": 1999,
    "discount_percentage": 38,
    "rating": 4.4,
    "reviews_count": 670,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "1 Year Bajaj Consumer Care Warranty",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 90,
    "specifications": {
      "Power": "500 Watts",
      "Jars": "1.2L Liquidizing, 0.8L Multi-purpose, 0.3L Chutney Jar",
      "Speed Control": "3 Speeds with Incher"
    },
    "highlights": [
      "500W Titan motor equipped with motor overload protector",
      "Multi-functional stainless steel blade system for fine purees and masalas",
      "Rust-proof durable ABS plastic body"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-34",
        "product_id": "prod-34",
        "image_url": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Bajaj Rex 500W Mixer Grinder with 3 Jars (White)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-35",
    "title": "Levi's Men's 511 Slim Fit Stretch Denim Jeans (Dark Indigo)",
    "slug": "levis-mens-511-slim-fit-stretch-denim-jeans-dark-indigo",
    "brand_id": "b11",
    "category_id": "c5",
    "subcategory_id": null,
    "sku": "NEX-LEV-04511536",
    "short_description": "A modern slim fit that provides room to move without sagging",
    "description": "Levi's Men's 511 Slim Fit Stretch Denim Jeans (Dark Indigo). Genuine commercial product from Levi's (Levi's 511 Slim Fit). Includes 100% Genuine Levi's Guarantee. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 3999,
    "price": 2299,
    "discount_percentage": 43,
    "rating": 4.6,
    "reviews_count": 430,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "100% Genuine Levi's Guarantee",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 80,
    "specifications": {
      "Fit": "Slim from hip to ankle",
      "Rise": "Low Rise",
      "Fabric": "99% Cotton, 1% Elastane",
      "Care": "Machine wash cold with like colors"
    },
    "highlights": [
      "A modern slim fit that provides room to move without sagging",
      "Engineered with Levi's Flex active stretch for maximum flexibility",
      "Classic 5-pocket styling with signature arcuate stitching"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-35",
        "product_id": "prod-35",
        "image_url": "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Levi's Men's 511 Slim Fit Stretch Denim Jeans (Dark Indigo)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-36",
    "title": "Levi's Men's 501 Original Fit Button-Fly Jeans (Medium Stonewash)",
    "slug": "levis-mens-501-original-fit-button-fly-jeans-medium-stonewash",
    "brand_id": "b11",
    "category_id": "c5",
    "subcategory_id": null,
    "sku": "NEX-LEV-00501011",
    "short_description": "The original blue jean created in 1873 with iconic straight fit",
    "description": "Levi's Men's 501 Original Fit Button-Fly Jeans (Medium Stonewash). Genuine commercial product from Levi's (Levi's 501 Original). Includes 100% Genuine Levi's Guarantee. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 4499,
    "price": 2699,
    "discount_percentage": 40,
    "rating": 4.7,
    "reviews_count": 520,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "100% Genuine Levi's Guarantee",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 65,
    "specifications": {
      "Fit": "Regular fit through thigh, straight leg",
      "Rise": "Mid Rise",
      "Fabric": "100% Non-Stretch Cotton Denim",
      "Closure": "Button Fly"
    },
    "highlights": [
      "The original blue jean created in 1873 with iconic straight fit",
      "Signature copper rivets and iconic button fly closure",
      "Durable non-stretch heavyweight denim that molds to your body"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-36",
        "product_id": "prod-36",
        "image_url": "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Levi's Men's 501 Original Fit Button-Fly Jeans (Medium Stonewash)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-37",
    "title": "Fabindia Men's Handcrafted Silk Cotton Long Kurta (Maroon)",
    "slug": "fabindia-mens-handcrafted-silk-cotton-long-kurta-maroon",
    "brand_id": "b12",
    "category_id": "c5",
    "subcategory_id": null,
    "sku": "NEX-FAB-10729482",
    "short_description": "Handwoven silk cotton fabric offering regal sheen with breathable comfort",
    "description": "Fabindia Men's Handcrafted Silk Cotton Long Kurta (Maroon). Genuine commercial product from Fabindia (Silk Cotton Long Kurta). Includes Handloom Certification Included. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 3490,
    "price": 2443,
    "discount_percentage": 30,
    "rating": 4.6,
    "reviews_count": 180,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "Handloom Certification Included",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 45,
    "specifications": {
      "Fabric": "Silk Cotton Handloom Blend",
      "Length": "Knee Length",
      "Collar": "Mandarin / Chinese Collar",
      "Occasion": "Festive & Wedding"
    },
    "highlights": [
      "Handwoven silk cotton fabric offering regal sheen with breathable comfort",
      "Classic Chinese collar with mother-of-pearl buttons and side pockets",
      "Traditional artisanal dye techniques crafted by rural Indian handloom clusters"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-37",
        "product_id": "prod-37",
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Fabindia Men's Handcrafted Silk Cotton Long Kurta (Maroon)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-38",
    "title": "Fabindia Women's Chanderi Silk Zari Border Saree (Royal Blue)",
    "slug": "fabindia-womens-chanderi-silk-zari-border-saree-royal-blue",
    "brand_id": "b12",
    "category_id": "c5",
    "subcategory_id": null,
    "sku": "NEX-FAB-10714201",
    "short_description": "Lightweight Chanderi silk with delicate golden zari woven borders",
    "description": "Fabindia Women's Chanderi Silk Zari Border Saree (Royal Blue). Genuine commercial product from Fabindia (Chanderi Zari Saree). Includes Silk Mark Certified Handloom. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 7990,
    "price": 5999,
    "discount_percentage": 25,
    "rating": 4.8,
    "reviews_count": 95,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "Silk Mark Certified Handloom",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 30,
    "specifications": {
      "Fabric": "Pure Chanderi Silk with Zari",
      "Length": "5.5 meters saree + 0.8 meter blouse",
      "Care": "Dry clean only"
    },
    "highlights": [
      "Lightweight Chanderi silk with delicate golden zari woven borders",
      "Includes unstitched blouse piece in matching pure silk blend",
      "Drapes effortlessly with rich Indian heritage luster"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-38",
        "product_id": "prod-38",
        "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Fabindia Women's Chanderi Silk Zari Border Saree (Royal Blue)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-39",
    "title": "Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)",
    "slug": "forest-essentials-soundarya-radiance-cream-with-24k-gold-spf-25-50g",
    "brand_id": "b13",
    "category_id": "c6",
    "subcategory_id": null,
    "sku": "NEX-FOR-FESD50G",
    "short_description": "Formulated with pure 24 Karat gold bhasma, saffron and cold-pressed sesame oil",
    "description": "Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g). Genuine commercial product from Forest Essentials (Soundarya Radiance Cream). Includes 100% Ayurvedic Genuine Formulation. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 5400,
    "price": 4860,
    "discount_percentage": 10,
    "rating": 4.8,
    "reviews_count": 210,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "100% Ayurvedic Genuine Formulation",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 40,
    "specifications": {
      "Skin Type": "Normal, Dry & Mature Skin",
      "Key Ingredients": "24K Gold Bhasma, Saffron, Ashwagandha",
      "Net Weight": "50 grams",
      "Free From": "Parabens, Petrochemicals, SLS"
    },
    "highlights": [
      "Formulated with pure 24 Karat gold bhasma, saffron and cold-pressed sesame oil",
      "Improves skin elasticity while giving a luminous golden glow",
      "SPF 25 broad spectrum UVA/UVB defense against environmental damage"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-39",
        "product_id": "prod-39",
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-40",
    "title": "Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml)",
    "slug": "forest-essentials-delicate-facial-cleanser-kashmiri-saffron-neem-200ml",
    "brand_id": "b13",
    "category_id": "c6",
    "subcategory_id": null,
    "sku": "NEX-FOR-FEFC200M",
    "short_description": "Purifies and cleanses pore deep without stripping natural moisture",
    "description": "Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml). Genuine commercial product from Forest Essentials (Facial Cleanser Saffron & Neem). Includes 100% Ayurvedic Genuine Formulation. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 1550,
    "price": 1395,
    "discount_percentage": 10,
    "rating": 4.7,
    "reviews_count": 380,
    "is_featured": false,
    "is_trending": true,
    "is_active": true,
    "warranty_info": "100% Ayurvedic Genuine Formulation",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 65,
    "specifications": {
      "Skin Type": "All Skin Types (Ideal for combination/blemish prone)",
      "Volume": "200 ml",
      "Ingredients": "Neem Oil, Kashmiri Saffron, Kewda Water"
    },
    "highlights": [
      "Purifies and cleanses pore deep without stripping natural moisture",
      "Infused with therapeutic organic neem and pure Kashmiri saffron",
      "Leaves skin feeling supple, soft and visibly radiant"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-40",
        "product_id": "prod-40",
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-41",
    "title": "Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green)",
    "slug": "philips-oneblade-hybrid-trimmer-shaver-qp2824-lime-green",
    "brand_id": "b9",
    "category_id": "c6",
    "subcategory_id": null,
    "sku": "NEX-PHI-QP282410",
    "short_description": "Revolutionary hybrid blade trims, edges and shaves any length of hair",
    "description": "Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green). Genuine commercial product from Philips (OneBlade QP2824). Includes 2 Years Worldwide Guarantee. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 2195,
    "price": 1699,
    "discount_percentage": 23,
    "rating": 4.6,
    "reviews_count": 740,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "2 Years Worldwide Guarantee",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 85,
    "specifications": {
      "Blade Lifespan": "Up to 4 months per blade",
      "Battery": "NimH battery (45 mins run time)",
      "Waterproof": "IPX7 Washable",
      "Combs": "5-in-1 adjustable stubble comb (1-5mm)"
    },
    "highlights": [
      "Revolutionary hybrid blade trims, edges and shaves any length of hair",
      "Dual protection system with glide coating and rounded polymer tips",
      "100% waterproof IPX7 body for wet or dry shaving in shower"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-41",
        "product_id": "prod-41",
        "image_url": "https://images.unsplash.com/photo-1503925805576-f4e345da9707?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  },
  {
    "id": "prod-42",
    "title": "Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue)",
    "slug": "philips-series-3000-stainless-steel-blade-beard-trimmer-bt323115-blue",
    "brand_id": "b9",
    "category_id": "c6",
    "subcategory_id": null,
    "sku": "NEX-PHI-BT323115",
    "short_description": "Lift & Trim system cuts 30% faster by lifting low-lying hairs to blade level",
    "description": "Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue). Genuine commercial product from Philips (Series 3000 BT3231). Includes 2 + 1 Year Manufacturer Warranty with Registration. 100% Cash on Delivery available across India with free doorstep delivery above ₹499.",
    "mrp": 1895,
    "price": 1399,
    "discount_percentage": 26,
    "rating": 4.5,
    "reviews_count": 890,
    "is_featured": false,
    "is_trending": false,
    "is_active": true,
    "warranty_info": "2 + 1 Year Manufacturer Warranty with Registration",
    "return_policy_days": 7,
    "cod_available": true,
    "stock_quantity": 95,
    "specifications": {
      "Precision Settings": "20 length settings (0.5mm - 10mm)",
      "Run Time": "Up to 60 minutes cordless use",
      "Blades": "Self-sharpening Stainless Steel",
      "Charging": "USB charging cord"
    },
    "highlights": [
      "Lift & Trim system cuts 30% faster by lifting low-lying hairs to blade level",
      "Self-sharpening titanium-coated stainless steel blades stay as sharp as day one",
      "DuraPower technology reduces friction and extends battery life 4 times"
    ],
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z",
    "images": [
      {
        "id": "img-verif-42",
        "product_id": "prod-42",
        "image_url": "https://images.unsplash.com/photo-1503925805576-f4e345da9707?auto=format&fit=crop&w=800&q=80",
        "alt_text": "Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue)",
        "display_order": 0,
        "is_primary": true
      }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = RAW_MOCK_PRODUCTS.map(p => ({
  ...p,
  specifications: p.specifications as unknown as Record<string, string>,
  brand: MOCK_BRANDS.find(b => b.id === p.brand_id),
  category: MOCK_CATEGORIES.find(c => c.id === p.category_id)
}));
