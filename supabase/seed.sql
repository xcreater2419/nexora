-- ==============================================================================
-- NEXORA - Initial Curated Seed Data (Supabase & PostgreSQL)
-- Recognizable Indian market brands, real products, pricing in INR (₹)
-- ==============================================================================

-- 1. INSERT CATEGORIES
INSERT INTO public.categories (id, name, slug, description, icon, display_order, is_featured) VALUES
('c1000000-0000-0000-0000-000000000001', 'Mobiles & Tablets', 'mobiles-tablets', 'Smartphones, flagship devices, iPads and tablets', 'Smartphone', 1, true),
('c1000000-0000-0000-0000-000000000002', 'Laptops & Computers', 'laptops-computers', 'Ultrabooks, gaming rigs, monitors and peripherals', 'Laptop', 2, true),
('c1000000-0000-0000-0000-000000000003', 'Audio & Wearables', 'audio-wearables', 'TWS earbuds, ANC headphones, smartwatches and fitness bands', 'Headphones', 3, true),
('c1000000-0000-0000-0000-000000000004', 'Home & Kitchen', 'home-kitchen', 'Premium kitchen appliances, air purifiers, and home essentials', 'Home', 4, true),
('c1000000-0000-0000-0000-000000000005', 'Fashion & Apparel', 'fashion-apparel', 'Men and women designer apparel, footwear and ethnic wear', 'Shirt', 5, true),
('c1000000-0000-0000-0000-000000000006', 'Beauty & Grooming', 'beauty-grooming', 'Luxury skincare, haircare and styling grooming tools', 'Sparkles', 6, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 2. INSERT SUBCATEGORIES
INSERT INTO public.subcategories (id, category_id, name, slug, description, display_order) VALUES
('sc100000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Flagship Smartphones', 'flagship-smartphones', 'Top-tier performance & cameras', 1),
('sc100000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Mid-Range Value', 'mid-range-phones', 'Best value 5G phones', 2),
('sc100000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Tablets & iPads', 'tablets-ipads', 'Productivity & creative tablets', 3),

('sc100000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'Ultrabooks & MacBooks', 'ultrabooks-macbooks', 'Thin, lightweight laptops with all-day battery', 1),
('sc100000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Gaming Laptops', 'gaming-laptops', 'High refresh rate & RTX powered laptops', 2),
('sc100000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002', 'Monitors & Keyboards', 'monitors-keyboards', 'Mechanical keyboards & 4K displays', 3),

('sc100000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'TWS Earbuds', 'tws-earbuds', 'True wireless noise cancelling earbuds', 1),
('sc100000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003', 'Over-Ear Headphones', 'over-ear-headphones', 'Audiophile & ANC over-ear headphones', 2),
('sc100000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000003', 'Smartwatches', 'smartwatches', 'AMOLED displays, health tracking & GPS', 3),

('sc100000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000004', 'Kitchen Appliances', 'kitchen-appliances', 'Air fryers, mixer grinders, coffee makers', 1),
('sc100000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000004', 'Vacuum & Air Cleaners', 'vacuum-air-cleaners', 'Cordless stick vacuums & HEPA air purifiers', 2),

('sc100000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000005', 'Men Footwear & Apparel', 'men-fashion', 'Original denim, sneakers and casual wear', 1),
('sc100000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000005', 'Women Ethnic & Fusion', 'women-fashion', 'Handcrafted kurtas, suits and silk sarees', 2),

('sc100000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000006', 'Personal Grooming', 'personal-grooming', 'Trimmers, shavers, hair dryers', 1),
('sc100000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000006', 'Luxury Skincare', 'luxury-skincare', 'Ayurvedic formulations and active serums', 2)
ON CONFLICT (category_id, slug) DO NOTHING;

-- 3. INSERT BRANDS
INSERT INTO public.brands (id, name, slug, origin_country, is_popular) VALUES
('b1000000-0000-0000-0000-000000000001', 'Apple', 'apple', 'USA', true),
('b1000000-0000-0000-0000-000000000002', 'Samsung', 'samsung', 'South Korea', true),
('b1000000-0000-0000-0000-000000000003', 'OnePlus', 'oneplus', 'China', true),
('b1000000-0000-0000-0000-000000000004', 'Sony', 'sony', 'Japan', true),
('b1000000-0000-0000-0000-000000000005', 'boAt', 'boat', 'India', true),
('b1000000-0000-0000-0000-000000000006', 'Noise', 'noise', 'India', true),
('b1000000-0000-0000-0000-000000000007', 'ASUS', 'asus', 'Taiwan', true),
('b1000000-0000-0000-0000-000000000008', 'Dyson', 'dyson', 'Singapore', true),
('b1000000-0000-0000-0000-000000000009', 'Philips', 'philips', 'Netherlands', true),
('b1000000-0000-0000-0000-000000000010', 'Prestige', 'prestige', 'India', true),
('b1000000-0000-0000-0000-000000000011', 'Levi''s', 'levis', 'USA', true),
('b1000000-0000-0000-0000-000000000012', 'Fabindia', 'fabindia', 'India', true),
('b1000000-0000-0000-0000-000000000013', 'Forest Essentials', 'forest-essentials', 'India', true),
('b1000000-0000-0000-0000-000000000014', 'Logitech', 'logitech', 'Switzerland', true),
('b1000000-0000-0000-0000-000000000015', 'Titan', 'titan', 'India', true)
ON CONFLICT (slug) DO NOTHING;

-- 4. INSERT BANNERS
INSERT INTO public.banners (title, subtitle, badge, image_url, link_url, button_text, position, display_order, is_active) VALUES
('Grand Festival Deals', 'Up to 45% OFF on Flagship Smartphones & MacBooks with Free India Delivery', 'FESTIVE SALE', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80', '/shop?category=mobiles-tablets', 'Explore Flagships', 'hero_slider', 1, true),
('Audio Perfection', 'Immersive Sound with Sony ANC & boAt Bass Heads', 'LIMITED TIME', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80', '/shop?category=audio-wearables', 'Shop Audio', 'hero_slider', 2, true),
('Smart Living & Kitchen', 'Upgrade your home with Dyson vacuums and Philips air fryers', 'BEST SELLERS', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80', '/shop?category=home-kitchen', 'Shop Kitchen', 'hero_slider', 3, true);

-- 5. INSERT COUPONS
INSERT INTO public.coupons (code, description, discount_type, discount_value, max_discount_amount, min_order_value, expiry_date, is_active) VALUES
('NEXORA10', 'Flat 10% discount on first COD order above ₹999', 'percentage', 10, 1500, 999, NOW() + INTERVAL '180 days', true),
('FESTIVE500', 'Flat ₹500 OFF on orders above ₹4,999', 'flat', 500, NULL, 4999, NOW() + INTERVAL '90 days', true),
('FREESHIP', 'Free express courier delivery on any order', 'flat', 99, 99, 0, NOW() + INTERVAL '365 days', true),
('TECHEXTRA', 'Additional 5% OFF on Electronics & Gadgets', 'percentage', 5, 2000, 2499, NOW() + INTERVAL '60 days', true)
ON CONFLICT (code) DO NOTHING;
