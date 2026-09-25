-- ==============================================================================
-- NEXORA - VERIFIED REAL COMMERCIAL PRODUCT CATALOG SEED
-- Total Verified Unique Real Products: 42
-- Generated: 2026-09-25T20:12:41.979Z
-- ==============================================================================

BEGIN;


INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPhone 16 Pro (128GB - Desert Titanium)', 'apple-iphone-16-pro-128gb-desert-titanium', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MYNF3HNA', 'Apple iPhone 16 Pro (128GB - Desert Titanium)', 'Apple iPhone 16 Pro (128GB - Desert Titanium) - Official Apple commercial model (iPhone 16 Pro). Genuine certified Indian inventory.', 119900, 112900, 4.8, 342, false, false, true, '{"Display":"6.3-inch Super Retina XDR OLED 120Hz","Chipset":"A18 Pro Chip with 6-core GPU","Storage":"128GB","Camera":"48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto","OS":"iOS 18"}'::jsonb, ARRAY['Grade 5 Titanium design with refined microblasted finish', 'Camera Control button for instant capture and visual intelligence', 'A18 Pro chip enables console-grade gaming and battery efficiency']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80', 'Apple iPhone 16 Pro (128GB - Desert Titanium)', 0, true FROM public.products WHERE slug = 'apple-iphone-16-pro-128gb-desert-titanium'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 45, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-iphone-16-pro-128gb-desert-titanium'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPhone 16 Pro Max (256GB - Natural Titanium)', 'apple-iphone-16-pro-max-256gb-natural-titanium', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MYWU3HNA', 'Apple iPhone 16 Pro Max (256GB - Natural Titanium)', 'Apple iPhone 16 Pro Max (256GB - Natural Titanium) - Official Apple commercial model (iPhone 16 Pro Max). Genuine certified Indian inventory.', 144900, 139900, 4.9, 489, false, false, true, '{"Display":"6.9-inch Super Retina XDR OLED 120Hz","Chipset":"A18 Pro Chip with 6-core GPU","Storage":"256GB","Camera":"48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto","Battery":"Up to 33 hours video playback"}'::jsonb, ARRAY['Largest 6.9-inch Super Retina XDR display with thinnest borders', 'Industry-leading battery life up to 33 hours video playback', 'Next-generation Photographic Styles with real-time tone and color grading']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80', 'Apple iPhone 16 Pro Max (256GB - Natural Titanium)', 0, true FROM public.products WHERE slug = 'apple-iphone-16-pro-max-256gb-natural-titanium'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 32, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-iphone-16-pro-max-256gb-natural-titanium'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPhone 16 (128GB - Ultramarine)', 'apple-iphone-16-128gb-ultramarine', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MYEF3HNA', 'Apple iPhone 16 (128GB - Ultramarine)', 'Apple iPhone 16 (128GB - Ultramarine) - Official Apple commercial model (iPhone 16). Genuine certified Indian inventory.', 79900, 74900, 4.7, 215, false, false, true, '{"Display":"6.1-inch Super Retina XDR OLED 60Hz","Chipset":"A18 Bionic Chip","Storage":"128GB","Camera":"48MP Fusion + 12MP Ultra Wide","OS":"iOS 18"}'::jsonb, ARRAY['Aerospace-grade aluminum enclosure with color-infused back glass', 'A18 Bionic chip with 5-core GPU and Apple Intelligence', '48MP Fusion camera with 2x optical-quality Telephoto']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'Apple iPhone 16 (128GB - Ultramarine)', 0, true FROM public.products WHERE slug = 'apple-iphone-16-128gb-ultramarine'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 60, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'apple-iphone-16-128gb-ultramarine'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPhone 15 (128GB - Black)', 'apple-iphone-15-128gb-black', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MTP03HNA', 'Apple iPhone 15 (128GB - Black)', 'Apple iPhone 15 (128GB - Black) - Official Apple commercial model (iPhone 15). Genuine certified Indian inventory.', 69900, 58999, 4.7, 890, false, false, true, '{"Display":"6.1-inch Super Retina XDR OLED","Chipset":"A16 Bionic Chip","Storage":"128GB","Connector":"USB-C","Camera":"48MP + 12MP"}'::jsonb, ARRAY['Dynamic Island bubbles up alerts and Live Activities', '48MP main camera captures super-high-resolution photos', 'Universal USB-C connector with DisplayPort support']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'Apple iPhone 15 (128GB - Black)', 0, true FROM public.products WHERE slug = 'apple-iphone-15-128gb-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 75, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'apple-iphone-15-128gb-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray)', 'samsung-galaxy-s24-ultra-5g-12gb-ram-256gb-titanium-gray', 'c1000000-0000-0000-0000-000000000001', 'NEX-SAM-SMS928BD', 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray)', 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray) - Official Samsung commercial model (Galaxy S24 Ultra). Genuine certified Indian inventory.', 134999, 121999, 4.7, 289, false, false, true, '{"Display":"6.8-inch Dynamic AMOLED 2X 120Hz QHD+","Processor":"Snapdragon 8 Gen 3 for Galaxy","RAM":"12GB","Storage":"256GB","Battery":"5000mAh with 45W Fast Charging"}'::jsonb, ARRAY['Built-in S Pen with Galaxy AI Circle to Search and Live Translation', 'Corning Gorilla Armor anti-reflective glass with Titanium unibody', '200MP Quad Tele System with AI ProVisual Zoom']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB - Titanium Gray)', 0, true FROM public.products WHERE slug = 'samsung-galaxy-s24-ultra-5g-12gb-ram-256gb-titanium-gray'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 38, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'samsung-galaxy-s24-ultra-5g-12gb-ram-256gb-titanium-gray'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black)', 'samsung-galaxy-s24-5g-8gb-ram-128gb-onyx-black', 'c1000000-0000-0000-0000-000000000001', 'NEX-SAM-SMS921BD', 'Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black)', 'Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black) - Official Samsung commercial model (Galaxy S24). Genuine certified Indian inventory.', 79999, 64999, 4.6, 178, false, false, true, '{"Display":"6.2-inch Dynamic AMOLED 2X 120Hz","Processor":"Exynos 2400 10-core 4nm","RAM":"8GB","Storage":"128GB","Battery":"4000mAh"}'::jsonb, ARRAY['Compact 6.2-inch FHD+ Dynamic AMOLED 2X display', 'Galaxy AI photo assist and transcript generation', 'Armor Aluminum 2.0 with IP68 water & dust resistance']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', 'Samsung Galaxy S24 5G (8GB RAM, 128GB - Onyx Black)', 0, true FROM public.products WHERE slug = 'samsung-galaxy-s24-5g-8gb-ram-128gb-onyx-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 50, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'samsung-galaxy-s24-5g-8gb-ram-128gb-onyx-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow)', 'samsung-galaxy-z-fold-6-5g-12gb-ram-256gb-silver-shadow', 'c1000000-0000-0000-0000-000000000001', 'NEX-SAM-SMF956BD', 'Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow)', 'Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow) - Official Samsung commercial model (Galaxy Z Fold 6). Genuine certified Indian inventory.', 164999, 154999, 4.6, 94, false, false, true, '{"Inner Display":"7.6-inch Foldable Dynamic AMOLED 2X 120Hz","Cover Display":"6.3-inch Dynamic AMOLED 2X","Processor":"Snapdragon 8 Gen 3 for Galaxy","RAM":"12GB","Storage":"256GB"}'::jsonb, ARRAY['Thinner and lighter dual-rail flex hinge design', 'Massive 7.6-inch Dynamic AMOLED 2X inner folding display', 'Galaxy AI Composer and Note Assist for multi-window productivity']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', 'Samsung Galaxy Z Fold 6 5G (12GB RAM, 256GB - Silver Shadow)', 0, true FROM public.products WHERE slug = 'samsung-galaxy-z-fold-6-5g-12gb-ram-256gb-silver-shadow'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 18, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'samsung-galaxy-z-fold-6-5g-12gb-ram-256gb-silver-shadow'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'OnePlus 12 5G (12GB RAM, 256GB - Silky Black)', 'oneplus-12-5g-12gb-ram-256gb-silky-black', 'c1000000-0000-0000-0000-000000000001', 'NEX-ONE-CPH2573', 'OnePlus 12 5G (12GB RAM, 256GB - Silky Black)', 'OnePlus 12 5G (12GB RAM, 256GB - Silky Black) - Official OnePlus commercial model (OnePlus 12). Genuine certified Indian inventory.', 64999, 59999, 4.8, 512, false, false, true, '{"Display":"6.82-inch 2K ProXDR 120Hz LTPO OLED","Processor":"Snapdragon 8 Gen 3","RAM":"12GB","Storage":"256GB","Camera":"4th Gen Hasselblad Camera System (50MP + 64MP + 48MP)","Battery":"5400mAh"}'::jsonb, ARRAY['Ultra-bright 4500 nits 2K ProXDR display with Aqua Touch', 'Dual Cryo-velocity VC cooling system for sustained gaming', '100W SUPERVOOC wired + 50W AIRVOOC wireless charging']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'OnePlus 12 5G (12GB RAM, 256GB - Silky Black)', 0, true FROM public.products WHERE slug = 'oneplus-12-5g-12gb-ram-256gb-silky-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 65, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'oneplus-12-5g-12gb-ram-256gb-silky-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue)', 'oneplus-12r-5g-8gb-ram-128gb-cool-blue', 'c1000000-0000-0000-0000-000000000001', 'NEX-ONE-CPH2585', 'OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue)', 'OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue) - Official OnePlus commercial model (OnePlus 12R). Genuine certified Indian inventory.', 39999, 35999, 4.7, 620, false, false, true, '{"Display":"6.78-inch 1.5K LTPO4 AMOLED 120Hz","Processor":"Snapdragon 8 Gen 2","RAM":"8GB","Storage":"128GB","Battery":"5500mAh with 100W Fast Charging"}'::jsonb, ARRAY['4th Gen LTPO 1.5K 120Hz display with Dolby Vision', 'Largest 5500mAh battery ever on a OnePlus flagship phone', '100W SUPERVOOC charging charges 1-100% in 26 minutes']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'OnePlus 12R 5G (8GB RAM, 128GB - Cool Blue)', 0, true FROM public.products WHERE slug = 'oneplus-12r-5g-8gb-ram-128gb-cool-blue'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 80, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'oneplus-12r-5g-8gb-ram-128gb-cool-blue'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel)', 'google-pixel-9-pro-xl-16gb-ram-128gb-hazel', 'c1000000-0000-0000-0000-000000000001', 'NEX-GOO-GEC77', 'Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel)', 'Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel) - Official Google commercial model (Pixel 9 Pro XL). Genuine certified Indian inventory.', 124999, 119999, 4.7, 140, false, false, true, '{"Display":"6.8-inch Super Actua LTPO OLED 120Hz","Processor":"Google Tensor G4 with Titan M2","RAM":"16GB","Storage":"128GB","Camera":"50MP Main + 48MP Ultrawide + 48MP Telephoto"}'::jsonb, ARRAY['Google Tensor G4 chip with 16GB RAM for advanced Gemini Nano AI', 'Pro triple camera system with 5x Telephoto and 8K Video Boost', 'Super Actua display with 3000 nits peak brightness']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'Google Pixel 9 Pro XL (16GB RAM, 128GB - Hazel)', 0, true FROM public.products WHERE slug = 'google-pixel-9-pro-xl-16gb-ram-128gb-hazel'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 25, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'google-pixel-9-pro-xl-16gb-ram-128gb-hazel'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Google Pixel 8a (8GB RAM, 128GB - Bay)', 'google-pixel-8a-8gb-ram-128gb-bay', 'c1000000-0000-0000-0000-000000000001', 'NEX-GOO-G8HHN', 'Google Pixel 8a (8GB RAM, 128GB - Bay)', 'Google Pixel 8a (8GB RAM, 128GB - Bay) - Official Google commercial model (Pixel 8a). Genuine certified Indian inventory.', 52999, 44999, 4.6, 230, false, false, true, '{"Display":"6.1-inch Actua OLED 120Hz","Processor":"Google Tensor G3","RAM":"8GB","Storage":"128GB","Battery":"4492mAh with wireless charging"}'::jsonb, ARRAY['Google Tensor G3 chip enables Best Take, Audio Magic Eraser & Circle to Search', '64MP main camera with Night Sight and Super Res Zoom up to 8x', 'Guaranteed 7 years of OS, security and Feature Drop updates']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 'Google Pixel 8a (8GB RAM, 128GB - Bay)', 0, true FROM public.products WHERE slug = 'google-pixel-8a-8gb-ram-128gb-bay'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 40, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'google-pixel-8a-8gb-ram-128gb-bay'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey)', 'apple-ipad-air-11-inch-m2-chip-wi-fi-128gb-space-grey', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MUWC3HNA', 'Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey)', 'Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey) - Official Apple commercial model (iPad Air 11-inch M2). Genuine certified Indian inventory.', 59900, 56900, 4.8, 165, false, false, true, '{"Display":"11-inch Liquid Retina IPS Display (2360 x 1640)","Chipset":"Apple M2 Chip","Storage":"128GB","Biometrics":"Touch ID in Top Button","Apple Pencil":"Apple Pencil Pro & USB-C compatible"}'::jsonb, ARRAY['Blazing-fast Apple M2 chip with 8-core CPU and 10-core GPU', '11-inch Liquid Retina display with P3 wide color and True Tone', 'Landscape 12MP Ultra Wide front camera with Center Stage']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 'Apple iPad Air 11-inch (M2 chip, Wi-Fi 128GB - Space Grey)', 0, true FROM public.products WHERE slug = 'apple-ipad-air-11-inch-m2-chip-wi-fi-128gb-space-grey'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 35, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-ipad-air-11-inch-m2-chip-wi-fi-128gb-space-grey'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue)', 'apple-ipad-10th-gen-109-inch-wi-fi-64gb-blue', 'c1000000-0000-0000-0000-000000000001', 'NEX-APP-MPQ03HNA', 'Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue)', 'Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue) - Official Apple commercial model (iPad 10th Gen). Genuine certified Indian inventory.', 34900, 31900, 4.7, 420, false, false, true, '{"Display":"10.9-inch Liquid Retina Display (2360 x 1640)","Chipset":"A14 Bionic Chip","Storage":"64GB","Connector":"USB-C","Camera":"12MP Wide back, 12MP Landscape Ultra Wide front"}'::jsonb, ARRAY['All-screen design with 10.9-inch Liquid Retina display', 'A14 Bionic chip delivers power for creative and educational apps', 'USB-C connector and landscape stereo speakers']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 'Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB - Blue)', 0, true FROM public.products WHERE slug = 'apple-ipad-10th-gen-109-inch-wi-fi-64gb-blue'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 60, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'apple-ipad-10th-gen-109-inch-wi-fi-64gb-blue'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray)', 'samsung-galaxy-tab-s9-fe-109-inch-wi-fi-128gb-gray', 'c1000000-0000-0000-0000-000000000001', 'NEX-SAM-SMX510', 'Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray)', 'Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray) - Official Samsung commercial model (Galaxy Tab S9 FE). Genuine certified Indian inventory.', 44999, 33999, 4.6, 198, false, false, true, '{"Display":"10.9-inch WQXGA LCD 90Hz","Processor":"Exynos 1380 Octa-core","RAM":"6GB","Storage":"128GB (Expandable up to 1TB)","S Pen":"Included in box (IP68)"}'::jsonb, ARRAY['Inbox water and dust resistant IP68 certified S Pen included', 'Bright 10.9-inch 90Hz display with Vision Booster technology', '8000mAh battery supporting 45W super-fast charging']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 'Samsung Galaxy Tab S9 FE (10.9-inch, Wi-Fi 128GB - Gray)', 0, true FROM public.products WHERE slug = 'samsung-galaxy-tab-s9-fe-109-inch-wi-fi-128gb-gray'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 45, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'samsung-galaxy-tab-s9-fe-109-inch-wi-fi-128gb-gray'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight)', 'apple-macbook-air-15-inch-m3-chip-8gb-unified-memory-256gb-ssd-starlight', 'c1000000-0000-0000-0000-000000000002', 'NEX-APP-MXD13HNA', 'Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight)', 'Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight) - Official Apple commercial model (MacBook Air 15-inch M3). Genuine certified Indian inventory.', 134900, 124900, 4.8, 142, false, false, true, '{"Display":"15.3-inch Liquid Retina Display (2880 x 1864)","Processor":"Apple M3 Chip (8-core CPU, 10-core GPU)","Unified Memory":"8GB","Storage":"256GB PCIe SSD","Weight":"1.51 kg"}'::jsonb, ARRAY['Remarkably thin 11.5mm aluminum fanless enclosure', 'Expansive 15.3-inch Liquid Retina display with 500 nits brightness', 'Up to 18 hours of battery life and dual external display support']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 'Apple MacBook Air 15-inch (M3 chip, 8GB Unified Memory, 256GB SSD - Starlight)', 0, true FROM public.products WHERE slug = 'apple-macbook-air-15-inch-m3-chip-8gb-unified-memory-256gb-ssd-starlight'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 30, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-macbook-air-15-inch-m3-chip-8gb-unified-memory-256gb-ssd-starlight'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black)', 'apple-macbook-pro-14-inch-m3-pro-chip-18gb-unified-memory-512gb-ssd-space-black', 'c1000000-0000-0000-0000-000000000002', 'NEX-APP-MRX33HNA', 'Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black)', 'Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black) - Official Apple commercial model (MacBook Pro 14-inch M3 Pro). Genuine certified Indian inventory.', 199900, 184900, 4.9, 88, false, false, true, '{"Display":"14.2-inch Liquid Retina XDR Mini-LED 120Hz","Processor":"Apple M3 Pro (11-core CPU, 14-core GPU)","Unified Memory":"18GB","Storage":"512GB PCIe SSD","Ports":"3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"}'::jsonb, ARRAY['M3 Pro chip with hardware-accelerated ray tracing and mesh shading', 'Liquid Retina XDR display with 1600 nits peak HDR brightness and ProMotion 120Hz', 'Anodization seal reduces fingerprint appearance on Space Black finish']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 'Apple MacBook Pro 14-inch (M3 Pro chip, 18GB Unified Memory, 512GB SSD - Space Black)', 0, true FROM public.products WHERE slug = 'apple-macbook-pro-14-inch-m3-pro-chip-18gb-unified-memory-512gb-ssd-space-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 20, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-macbook-pro-14-inch-m3-pro-chip-18gb-unified-memory-512gb-ssd-space-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray)', 'asus-rog-zephyrus-g14-amd-ryzen-9-8945hs-rtx-4070-8gb-32gb-ram-1tb-ssd-eclipse-gray', 'c1000000-0000-0000-0000-000000000002', 'NEX-ASU-GA403UIQ', 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray)', 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray) - Official ASUS commercial model (ROG Zephyrus G14 GA403UI). Genuine certified Indian inventory.', 199990, 179990, 4.8, 64, false, false, true, '{"Display":"14-inch 3K (2880 x 1800) OLED 120Hz 500 nits","Processor":"AMD Ryzen 9 8945HS with Ryzen AI NPU","Graphics":"NVIDIA GeForce RTX 4070 8GB GDDR6","RAM":"32GB LPDDR5X","Storage":"1TB M.2 PCIe 4.0 SSD"}'::jsonb, ARRAY['Gorgeous 3K 120Hz 0.2ms OLED ROG Nebula display with G-SYNC', 'CNC aluminum unibody weighing only 1.5kg with Slash Lighting LED lid', 'NVIDIA GeForce RTX 4070 Laptop GPU with 90W TGP and MUX Switch']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80', 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB RAM, 1TB SSD - Eclipse Gray)', 0, true FROM public.products WHERE slug = 'asus-rog-zephyrus-g14-amd-ryzen-9-8945hs-rtx-4070-8gb-32gb-ram-1tb-ssd-eclipse-gray'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 15, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'asus-rog-zephyrus-g14-amd-ryzen-9-8945hs-rtx-4070-8gb-32gb-ram-1tb-ssd-eclipse-gray'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum)', 'dell-xps-13-intel-core-ultra-7-155h-16gb-lpddr5x-512gb-ssd-fhd-infinityedge-platinum', 'c1000000-0000-0000-0000-000000000002', 'NEX-DEL-XPS9340U', 'Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum)', 'Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum) - Official Dell commercial model (XPS 13 9340). Genuine certified Indian inventory.', 149990, 139990, 4.7, 52, false, false, true, '{"Display":"13.4-inch FHD+ (1920 x 1200) InfinityEdge 500 nits 120Hz","Processor":"Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)","RAM":"16GB LPDDR5x 7467 MT/s","Storage":"512GB PCIe 4.0 NVMe SSD","Weight":"1.19 kg"}'::jsonb, ARRAY['Iconic minimalist design with seamless glass haptic touchpad and touch function row', 'Intel Core Ultra 7 processor with dedicated AI NPU acceleration', 'Machined aluminum and Gorilla Glass 3 construction weighing 1.19kg']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80', 'Dell XPS 13 (Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, FHD+ InfinityEdge - Platinum)', 0, true FROM public.products WHERE slug = 'dell-xps-13-intel-core-ultra-7-155h-16gb-lpddr5x-512gb-ssd-fhd-infinityedge-platinum'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 22, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'dell-xps-13-intel-core-ultra-7-155h-16gb-lpddr5x-512gb-ssd-fhd-infinityedge-platinum'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)', 'hp-omen-16-gaming-laptop-intel-14th-gen-core-i7-14700hx-rtx-4060-8gb-16gb-ram-1tb-ssd', 'c1000000-0000-0000-0000-000000000002', 'NEX-HP-16wf1025', 'HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)', 'HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD) - Official HP commercial model (Omen 16-wf1025TX). Genuine certified Indian inventory.', 154990, 134990, 4.7, 76, false, false, true, '{"Display":"16.1-inch QHD (2560 x 1440) 240Hz 3ms IPS","Processor":"Intel Core i7-14700HX (20 cores, 28 threads)","Graphics":"NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)","RAM":"16GB DDR5 5600MHz","Storage":"1TB Gen4 NVMe SSD"}'::jsonb, ARRAY['14th Gen Intel Core i7-14700HX 20-core processor', '16.1-inch QHD 240Hz 3ms IPS anti-glare display with 100% sRGB', 'Omen Tempest Cooling technology with 3-sided venting and 5-way airflow']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80', 'HP Omen 16 Gaming Laptop (Intel 14th Gen Core i7-14700HX, RTX 4060 8GB, 16GB RAM, 1TB SSD)', 0, true FROM public.products WHERE slug = 'hp-omen-16-gaming-laptop-intel-14th-gen-core-i7-14700hx-rtx-4060-8gb-16gb-ram-1tb-ssd'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 25, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'hp-omen-16-gaming-laptop-intel-14th-gen-core-i7-14700hx-rtx-4060-8gb-16gb-ram-1tb-ssd'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED)', 'lenovo-thinkpad-x1-carbon-gen-12-intel-core-ultra-7-155h-32gb-ram-1tb-ssd-28k-oled', 'c1000000-0000-0000-0000-000000000002', 'NEX-LEN-21KC005V', 'Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED)', 'Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED) - Official Lenovo commercial model (ThinkPad X1 Carbon Gen 12). Genuine certified Indian inventory.', 239990, 214990, 4.9, 41, false, false, true, '{"Display":"14-inch 2.8K (2880 x 1800) OLED 120Hz 400 nits HDR500","Processor":"Intel Core Ultra 7 155H","RAM":"32GB LPDDR5X","Storage":"1TB PCIe Gen 4 Performance SSD","Weight":"1.09 kg"}'::jsonb, ARRAY['Legendary ThinkPad keyboard with tactile markings and TrackPoint Quick Menu', 'Ultralight carbon fiber unibody meeting MIL-STD-810H durability standards', 'Stunning 14-inch 2.8K 120Hz OLED display with Dolby Vision']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80', 'Lenovo ThinkPad X1 Carbon Gen 12 (Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 2.8K OLED)', 0, true FROM public.products WHERE slug = 'lenovo-thinkpad-x1-carbon-gen-12-intel-core-ultra-7-155h-32gb-ram-1tb-ssd-28k-oled'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 14, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'lenovo-thinkpad-x1-carbon-gen-12-intel-core-ultra-7-155h-32gb-ram-1tb-ssd-28k-oled'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Logitech MX Master 3S Wireless Performance Mouse (Graphite)', 'logitech-mx-master-3s-wireless-performance-mouse-graphite', 'c1000000-0000-0000-0000-000000000002', 'NEX-LOG-91000656', 'Logitech MX Master 3S Wireless Performance Mouse (Graphite)', 'Logitech MX Master 3S Wireless Performance Mouse (Graphite) - Official Logitech commercial model (MX Master 3S). Genuine certified Indian inventory.', 10995, 8995, 4.9, 840, false, false, true, '{"Sensor":"Darkfield High Precision 8000 DPI","Scroll Wheel":"MagSpeed Electromagnetic SmartShift","Battery Life":"Up to 70 days on full charge","Connectivity":"Bluetooth Low Energy + Logi Bolt USB Receiver"}'::jsonb, ARRAY['Quiet Clicks technology reduces 90% click noise while maintaining tactile feel', '8000 DPI Darkfield sensor tracks on any surface including glass', 'MagSpeed Electromagnetic scrolling scrolls 1000 lines per second']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80', 'Logitech MX Master 3S Wireless Performance Mouse (Graphite)', 0, true FROM public.products WHERE slug = 'logitech-mx-master-3s-wireless-performance-mouse-graphite'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 90, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'logitech-mx-master-3s-wireless-performance-mouse-graphite'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Logitech G502 HERO High Performance Wired Gaming Mouse (Black)', 'logitech-g502-hero-high-performance-wired-gaming-mouse-black', 'c1000000-0000-0000-0000-000000000002', 'NEX-LOG-91000547', 'Logitech G502 HERO High Performance Wired Gaming Mouse (Black)', 'Logitech G502 HERO High Performance Wired Gaming Mouse (Black) - Official Logitech commercial model (G502 HERO). Genuine certified Indian inventory.', 5495, 3995, 4.8, 1250, false, false, true, '{"Sensor":"HERO 25K (100 - 25600 DPI)","Max Acceleration":"> 40G","Report Rate":"1000Hz (1ms)","RGB":"LIGHTSYNC 16.8M colors"}'::jsonb, ARRAY['HERO 25K optical gaming sensor with 1:1 tracking up to 25600 DPI', '11 programmable buttons with dual-mode hyper-fast scroll wheel', 'Adjustable weight system with five removable 3.6g weights']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80', 'Logitech G502 HERO High Performance Wired Gaming Mouse (Black)', 0, true FROM public.products WHERE slug = 'logitech-g502-hero-high-performance-wired-gaming-mouse-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 110, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'logitech-g502-hero-high-performance-wired-gaming-mouse-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)', 'sony-wh-1000xm5-wireless-noise-cancelling-headphones-black', 'c1000000-0000-0000-0000-000000000003', 'NEX-SON-WH1000XM', 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)', 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black) - Official Sony commercial model (WH-1000XM5). Genuine certified Indian inventory.', 34990, 26990, 4.8, 512, false, false, true, '{"Headphone Type":"Closed Dynamic Over-Ear","Driver Unit":"30mm Carbon Fiber Composite","Bluetooth":"Version 5.2 with LDAC, AAC, SBC","Weight":"250g","Battery":"30 hours (ANC ON), 40 hours (ANC OFF)"}'::jsonb, ARRAY['Dual Processors V1 and QN1 control 8 microphones for unparalleled ANC', 'Specially designed 30mm carbon fiber driver unit delivers natural sound quality', 'Up to 30 hours battery life with quick charging (3 min charge for 3 hours playback)']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)', 0, true FROM public.products WHERE slug = 'sony-wh-1000xm5-wireless-noise-cancelling-headphones-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 52, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'sony-wh-1000xm5-wireless-noise-cancelling-headphones-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)', 'sony-wf-1000xm5-truly-wireless-noise-cancelling-earbuds-silver', 'c1000000-0000-0000-0000-000000000003', 'NEX-SON-WF1000XM', 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)', 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver) - Official Sony commercial model (WF-1000XM5). Genuine certified Indian inventory.', 29990, 21990, 4.7, 320, false, false, true, '{"Driver Unit":"8.4mm Dynamic Driver X","Water Resistance":"IPX4","Battery Life":"8 hours in earbuds + 16 hours in case (24 hours total)","Hi-Res Audio":"LDAC and DSEE Extreme certified"}'::jsonb, ARRAY['Dynamic Driver X reproduces wide frequencies and deep authentic bass', 'Two proprietary processors and dual feedback microphones cancel low frequency noise', 'AI-based bone conduction sensors and deep neural network for clear calls']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Silver)', 0, true FROM public.products WHERE slug = 'sony-wf-1000xm5-truly-wireless-noise-cancelling-earbuds-silver'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 40, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'sony-wf-1000xm5-truly-wireless-noise-cancelling-earbuds-silver'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Apple AirPods Pro 2nd Gen with USB-C Charging Case (White)', 'apple-airpods-pro-2nd-gen-with-usb-c-charging-case-white', 'c1000000-0000-0000-0000-000000000003', 'NEX-APP-MTJV3HNA', 'Apple AirPods Pro 2nd Gen with USB-C Charging Case (White)', 'Apple AirPods Pro 2nd Gen with USB-C Charging Case (White) - Official Apple commercial model (AirPods Pro 2). Genuine certified Indian inventory.', 24900, 22900, 4.9, 780, false, false, true, '{"Chip":"Apple H2 headphone chip, U1 chip in case","Sweat and Water Resistance":"IP54 for earbuds and case","Battery":"Up to 6 hours listening with ANC, 30 hours total with case","Connector":"USB-C, MagSafe, Qi wireless"}'::jsonb, ARRAY['Apple H2 chip powers Adaptive Audio, Active Noise Cancellation and Transparency', 'Personalized Spatial Audio with dynamic head tracking places sound all around you', 'MagSafe Charging Case (USB-C) with speaker and lanyard loop']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 'Apple AirPods Pro 2nd Gen with USB-C Charging Case (White)', 0, true FROM public.products WHERE slug = 'apple-airpods-pro-2nd-gen-with-usb-c-charging-case-white'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 70, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'apple-airpods-pro-2nd-gen-with-usb-c-charging-case-white'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black)', 'boat-airdopes-141-anc-truly-wireless-earbuds-gunmetal-black', 'c1000000-0000-0000-0000-000000000003', 'NEX-BOA-AD141ANC', 'boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black)', 'boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black) - Official boAt commercial model (Airdopes 141 ANC). Genuine certified Indian inventory.', 5990, 1499, 4.5, 1420, false, false, true, '{"Driver":"10mm Signature Drivers","ANC":"Up to 32dB Active Noise Cancellation","Latency":"BEAST Mode 50ms low latency","Bluetooth":"v5.3","Water Resistance":"IPX5"}'::jsonb, ARRAY['Active Noise Cancellation up to 32dB cancels out background commute noise', 'Massive 42 hours total playtime with ASAP charge (10 mins = 120 mins playtime)', 'ENx quad microphones provide clear hands-free voice calling']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 'boAt Airdopes 141 ANC Truly Wireless Earbuds (Gunmetal Black)', 0, true FROM public.products WHERE slug = 'boat-airdopes-141-anc-truly-wireless-earbuds-gunmetal-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 150, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'boat-airdopes-141-anc-truly-wireless-earbuds-gunmetal-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green)', 'boat-rockerz-550-over-ear-wireless-headphones-army-green', 'c1000000-0000-0000-0000-000000000003', 'NEX-BOA-RCKZ550G', 'boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green)', 'boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green) - Official boAt commercial model (Rockerz 550). Genuine certified Indian inventory.', 4999, 1799, 4.4, 980, false, false, true, '{"Driver":"50mm Dynamic Drivers","Battery":"500mAh (Up to 20 Hours Playback)","Connectivity":"Bluetooth v5.0 and 3.5mm AUX dual mode","Charging Time":"2.5 Hours"}'::jsonb, ARRAY['50mm dynamic drivers deliver punchy bass and crystalline audio', 'Physical noise isolation ear cushions for comfortable prolonged gaming and music', 'Up to 20 hours of continuous wireless playback']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'boAt Rockerz 550 Over-Ear Wireless Headphones (Army Green)', 0, true FROM public.products WHERE slug = 'boat-rockerz-550-over-ear-wireless-headphones-army-green'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 95, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'boat-rockerz-550-over-ear-wireless-headphones-army-green'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black)', 'noise-colorfit-ultra-3-smartwatch-196-inch-amoled-jet-black', 'c1000000-0000-0000-0000-000000000003', 'NEX-NOI-WRBSWCOL', 'Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black)', 'Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black) - Official Noise commercial model (ColorFit Ultra 3). Genuine certified Indian inventory.', 7999, 2799, 4.5, 650, false, false, true, '{"Display":"1.96-inch AMOLED (410 x 502 pixels)","Battery Life":"Up to 7 days (2 days with heavy BT calling)","Water Resistance":"IP68","Sports Modes":"100+ Sports Modes"}'::jsonb, ARRAY['Massive 1.96-inch AMOLED display with 410x502 resolution and 7-day battery', 'Single-chip TruSync Bluetooth calling with functional rotating crown', 'Noise Health Suite: 24x7 Heart rate, SpO2, Sleep tracking and Stress monitor']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 'Noise ColorFit Ultra 3 Smartwatch (1.96-inch AMOLED - Jet Black)', 0, true FROM public.products WHERE slug = 'noise-colorfit-ultra-3-smartwatch-196-inch-amoled-jet-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 110, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'noise-colorfit-ultra-3-smartwatch-196-inch-amoled-jet-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue)', 'titan-celestor-smartwatch-143-inch-amoled-gps-bt-calling-deep-blue', 'c1000000-0000-0000-0000-000000000003', 'NEX-TIT-90176AP0', 'Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue)', 'Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue) - Official Titan commercial model (Titan Celestor). Genuine certified Indian inventory.', 12995, 7995, 4.7, 154, false, false, true, '{"Display":"1.43-inch AMOLED 466x466","GPS":"Built-in standalone GNSS GPS","Battery":"Up to 7 days standard usage","Water Resistance":"3 ATM"}'::jsonb, ARRAY['Ultra-sharp 1.43-inch AMOLED display with 1000 nits brightness and AOD', 'Standalone multi-satellite GPS for precise outdoor run and trek telemetry', 'Metallic bezel with premium silicone strap crafted by Titan design studio']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 'Titan Celestor Smartwatch (1.43-inch AMOLED, GPS, BT Calling - Deep Blue)', 0, true FROM public.products WHERE slug = 'titan-celestor-smartwatch-143-inch-amoled-gps-bt-calling-deep-blue'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 45, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'titan-celestor-smartwatch-143-inch-amoled-gps-bt-calling-deep-blue'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black)', 'philips-digital-air-fryer-xxl-72l-14kg-hd928090-black', 'c1000000-0000-0000-0000-000000000004', 'NEX-PHI-HD928090', 'Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black)', 'Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black) - Official Philips commercial model (HD9280/90). Genuine certified Indian inventory.', 18995, 12999, 4.7, 310, false, false, true, '{"Capacity":"7.2 Litres (1.4 kg)","Power":"2000W","Presets":"7 One-touch cooking presets","Cleaning":"QuickClean non-stick dishwasher-safe basket"}'::jsonb, ARRAY['Rapid Air Technology with starfish base cooks evenly with up to 90% less fat', 'Family-sized 7.2L pan capacity fits a whole chicken or 1.4 kg of French fries', 'Connected NutriU App allows remote recipe monitoring from your phone']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', 'Philips Digital Air Fryer XXL 7.2L 1.4kg (HD9280/90 - Black)', 0, true FROM public.products WHERE slug = 'philips-digital-air-fryer-xxl-72l-14kg-hd928090-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 35, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'philips-digital-air-fryer-xxl-72l-14kg-hd928090-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)', 'prestige-iris-plus-750-watt-mixer-grinder-with-4-jars-black', 'c1000000-0000-0000-0000-000000000004', 'NEX-PRE-IRISPLUS', 'Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)', 'Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black) - Official Prestige commercial model (Iris Plus 750W). Genuine certified Indian inventory.', 6195, 3299, 4.5, 1100, false, false, true, '{"Motor Power":"750 Watts","Blades":"Super-efficient 304 Stainless Steel","Jars":"3 Stainless Steel Jars + 1 Transparent Juicer Jar","Speed Controls":"3 Speed + Whip Pulse"}'::jsonb, ARRAY['Heavy-duty 750 Watt motor grinds hardest Indian spices and idli batter', 'Includes 4 versatile jars: 1.5L Wet Jar, 1.0L Dry Jar, 300ml Chutney Jar, 1.5L Juicer', 'Ergonomically designed sturdy handles with overload protection switch']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80', 'Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)', 0, true FROM public.products WHERE slug = 'prestige-iris-plus-750-watt-mixer-grinder-with-4-jars-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 75, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'prestige-iris-plus-750-watt-mixer-grinder-with-4-jars-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron)', 'dyson-v12-detect-slim-total-clean-cordless-vacuum-cleaner-yellowiron', 'c1000000-0000-0000-0000-000000000004', 'NEX-DYS-36834001', 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron)', 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron) - Official Dyson commercial model (V12 Detect Slim). Genuine certified Indian inventory.', 55900, 48900, 4.8, 215, false, false, true, '{"Suction Power":"150 Air Watts","Filtration":"Whole-machine HEPA filtration 99.99% to 0.1 microns","Weight":"2.2 kg ultralight","Run Time":"Up to 60 minutes"}'::jsonb, ARRAY['Fluffy Optic illuminated cleaner head reveals invisible micro-dust on hard floors', 'Piezo sensor continuously measures dust particle sizes and auto-increases suction', 'Single-button power control with up to 60 minutes fade-free suction']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', 'Dyson V12 Detect Slim Total Clean Cordless Vacuum Cleaner (Yellow/Iron)', 0, true FROM public.products WHERE slug = 'dyson-v12-detect-slim-total-clean-cordless-vacuum-cleaner-yellowiron'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 20, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'dyson-v12-detect-slim-total-clean-cordless-vacuum-cleaner-yellowiron'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black)', 'hawkins-contura-hard-anodized-inner-lid-pressure-cooker-3-litre-black', 'c1000000-0000-0000-0000-000000000004', 'NEX-HAW-CXT30', 'Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black)', 'Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black) - Official Hawkins commercial model (Contura 3L). Genuine certified Indian inventory.', 2275, 1899, 4.7, 850, false, false, true, '{"Capacity":"3.0 Litres","Base Thickness":"3.25 mm","Material":"Hard Anodized Aluminum","Cooktop Compatibility":"Gas Stove Compatible"}'::jsonb, ARRAY['Hard anodized body absorbs heat faster and will not react with acidic foods', 'Rounded curved sides for easy stirring and quick removal of cooked food', 'Inside-fitting safety lid cannot be opened until internal pressure falls']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80', 'Hawkins Contura Hard Anodized Inner Lid Pressure Cooker 3 Litre (Black)', 0, true FROM public.products WHERE slug = 'hawkins-contura-hard-anodized-inner-lid-pressure-cooker-3-litre-black'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 85, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'hawkins-contura-hard-anodized-inner-lid-pressure-cooker-3-litre-black'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Bajaj Rex 500W Mixer Grinder with 3 Jars (White)', 'bajaj-rex-500w-mixer-grinder-with-3-jars-white', 'c1000000-0000-0000-0000-000000000004', 'NEX-BAJ-REX500W', 'Bajaj Rex 500W Mixer Grinder with 3 Jars (White)', 'Bajaj Rex 500W Mixer Grinder with 3 Jars (White) - Official Bajaj commercial model (Bajaj Rex 500W). Genuine certified Indian inventory.', 3210, 1999, 4.4, 670, false, false, true, '{"Power":"500 Watts","Jars":"1.2L Liquidizing, 0.8L Multi-purpose, 0.3L Chutney Jar","Speed Control":"3 Speeds with Incher"}'::jsonb, ARRAY['500W Titan motor equipped with motor overload protector', 'Multi-functional stainless steel blade system for fine purees and masalas', 'Rust-proof durable ABS plastic body']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80', 'Bajaj Rex 500W Mixer Grinder with 3 Jars (White)', 0, true FROM public.products WHERE slug = 'bajaj-rex-500w-mixer-grinder-with-3-jars-white'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 90, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'bajaj-rex-500w-mixer-grinder-with-3-jars-white'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Levi''s Men''s 511 Slim Fit Stretch Denim Jeans (Dark Indigo)', 'levis-mens-511-slim-fit-stretch-denim-jeans-dark-indigo', 'c1000000-0000-0000-0000-000000000005', 'NEX-LEV-04511536', 'Levi''s Men''s 511 Slim Fit Stretch Denim Jeans (Dark Indigo)', 'Levi''s Men''s 511 Slim Fit Stretch Denim Jeans (Dark Indigo) - Official Levi''s commercial model (Levi''''s 511 Slim Fit). Genuine certified Indian inventory.', 3999, 2299, 4.6, 430, false, false, true, '{"Fit":"Slim from hip to ankle","Rise":"Low Rise","Fabric":"99% Cotton, 1% Elastane","Care":"Machine wash cold with like colors"}'::jsonb, ARRAY['A modern slim fit that provides room to move without sagging', 'Engineered with Levi''s Flex active stretch for maximum flexibility', 'Classic 5-pocket styling with signature arcuate stitching']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80', 'Levi''s Men''s 511 Slim Fit Stretch Denim Jeans (Dark Indigo)', 0, true FROM public.products WHERE slug = 'levis-mens-511-slim-fit-stretch-denim-jeans-dark-indigo'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 80, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'levis-mens-511-slim-fit-stretch-denim-jeans-dark-indigo'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Levi''s Men''s 501 Original Fit Button-Fly Jeans (Medium Stonewash)', 'levis-mens-501-original-fit-button-fly-jeans-medium-stonewash', 'c1000000-0000-0000-0000-000000000005', 'NEX-LEV-00501011', 'Levi''s Men''s 501 Original Fit Button-Fly Jeans (Medium Stonewash)', 'Levi''s Men''s 501 Original Fit Button-Fly Jeans (Medium Stonewash) - Official Levi''s commercial model (Levi''''s 501 Original). Genuine certified Indian inventory.', 4499, 2699, 4.7, 520, false, false, true, '{"Fit":"Regular fit through thigh, straight leg","Rise":"Mid Rise","Fabric":"100% Non-Stretch Cotton Denim","Closure":"Button Fly"}'::jsonb, ARRAY['The original blue jean created in 1873 with iconic straight fit', 'Signature copper rivets and iconic button fly closure', 'Durable non-stretch heavyweight denim that molds to your body']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80', 'Levi''s Men''s 501 Original Fit Button-Fly Jeans (Medium Stonewash)', 0, true FROM public.products WHERE slug = 'levis-mens-501-original-fit-button-fly-jeans-medium-stonewash'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 65, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'levis-mens-501-original-fit-button-fly-jeans-medium-stonewash'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Fabindia Men''s Handcrafted Silk Cotton Long Kurta (Maroon)', 'fabindia-mens-handcrafted-silk-cotton-long-kurta-maroon', 'c1000000-0000-0000-0000-000000000005', 'NEX-FAB-10729482', 'Fabindia Men''s Handcrafted Silk Cotton Long Kurta (Maroon)', 'Fabindia Men''s Handcrafted Silk Cotton Long Kurta (Maroon) - Official Fabindia commercial model (Silk Cotton Long Kurta). Genuine certified Indian inventory.', 3490, 2443, 4.6, 180, false, false, true, '{"Fabric":"Silk Cotton Handloom Blend","Length":"Knee Length","Collar":"Mandarin / Chinese Collar","Occasion":"Festive & Wedding"}'::jsonb, ARRAY['Handwoven silk cotton fabric offering regal sheen with breathable comfort', 'Classic Chinese collar with mother-of-pearl buttons and side pockets', 'Traditional artisanal dye techniques crafted by rural Indian handloom clusters']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 'Fabindia Men''s Handcrafted Silk Cotton Long Kurta (Maroon)', 0, true FROM public.products WHERE slug = 'fabindia-mens-handcrafted-silk-cotton-long-kurta-maroon'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 45, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'fabindia-mens-handcrafted-silk-cotton-long-kurta-maroon'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Fabindia Women''s Chanderi Silk Zari Border Saree (Royal Blue)', 'fabindia-womens-chanderi-silk-zari-border-saree-royal-blue', 'c1000000-0000-0000-0000-000000000005', 'NEX-FAB-10714201', 'Fabindia Women''s Chanderi Silk Zari Border Saree (Royal Blue)', 'Fabindia Women''s Chanderi Silk Zari Border Saree (Royal Blue) - Official Fabindia commercial model (Chanderi Zari Saree). Genuine certified Indian inventory.', 7990, 5999, 4.8, 95, false, false, true, '{"Fabric":"Pure Chanderi Silk with Zari","Length":"5.5 meters saree + 0.8 meter blouse","Care":"Dry clean only"}'::jsonb, ARRAY['Lightweight Chanderi silk with delicate golden zari woven borders', 'Includes unstitched blouse piece in matching pure silk blend', 'Drapes effortlessly with rich Indian heritage luster']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 'Fabindia Women''s Chanderi Silk Zari Border Saree (Royal Blue)', 0, true FROM public.products WHERE slug = 'fabindia-womens-chanderi-silk-zari-border-saree-royal-blue'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 30, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'fabindia-womens-chanderi-silk-zari-border-saree-royal-blue'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)', 'forest-essentials-soundarya-radiance-cream-with-24k-gold-spf-25-50g', 'c1000000-0000-0000-0000-000000000006', 'NEX-FOR-FESD50G', 'Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)', 'Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g) - Official Forest Essentials commercial model (Soundarya Radiance Cream). Genuine certified Indian inventory.', 5400, 4860, 4.8, 210, false, false, true, '{"Skin Type":"Normal, Dry & Mature Skin","Key Ingredients":"24K Gold Bhasma, Saffron, Ashwagandha","Net Weight":"50 grams","Free From":"Parabens, Petrochemicals, SLS"}'::jsonb, ARRAY['Formulated with pure 24 Karat gold bhasma, saffron and cold-pressed sesame oil', 'Improves skin elasticity while giving a luminous golden glow', 'SPF 25 broad spectrum UVA/UVB defense against environmental damage']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', 'Forest Essentials Soundarya Radiance Cream with 24K Gold & SPF 25 (50g)', 0, true FROM public.products WHERE slug = 'forest-essentials-soundarya-radiance-cream-with-24k-gold-spf-25-50g'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 40, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'forest-essentials-soundarya-radiance-cream-with-24k-gold-spf-25-50g'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml)', 'forest-essentials-delicate-facial-cleanser-kashmiri-saffron-neem-200ml', 'c1000000-0000-0000-0000-000000000006', 'NEX-FOR-FEFC200M', 'Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml)', 'Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml) - Official Forest Essentials commercial model (Facial Cleanser Saffron & Neem). Genuine certified Indian inventory.', 1550, 1395, 4.7, 380, false, false, true, '{"Skin Type":"All Skin Types (Ideal for combination/blemish prone)","Volume":"200 ml","Ingredients":"Neem Oil, Kashmiri Saffron, Kewda Water"}'::jsonb, ARRAY['Purifies and cleanses pore deep without stripping natural moisture', 'Infused with therapeutic organic neem and pure Kashmiri saffron', 'Leaves skin feeling supple, soft and visibly radiant']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', 'Forest Essentials Delicate Facial Cleanser Kashmiri Saffron & Neem (200ml)', 0, true FROM public.products WHERE slug = 'forest-essentials-delicate-facial-cleanser-kashmiri-saffron-neem-200ml'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 65, 5, 'Bengaluru Fulfillment Hub' FROM public.products WHERE slug = 'forest-essentials-delicate-facial-cleanser-kashmiri-saffron-neem-200ml'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green)', 'philips-oneblade-hybrid-trimmer-shaver-qp2824-lime-green', 'c1000000-0000-0000-0000-000000000006', 'NEX-PHI-QP282410', 'Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green)', 'Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green) - Official Philips commercial model (OneBlade QP2824). Genuine certified Indian inventory.', 2195, 1699, 4.6, 740, false, false, true, '{"Blade Lifespan":"Up to 4 months per blade","Battery":"NimH battery (45 mins run time)","Waterproof":"IPX7 Washable","Combs":"5-in-1 adjustable stubble comb (1-5mm)"}'::jsonb, ARRAY['Revolutionary hybrid blade trims, edges and shaves any length of hair', 'Dual protection system with glide coating and rounded polymer tips', '100% waterproof IPX7 body for wet or dry shaving in shower']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1503925805576-f4e345da9707?auto=format&fit=crop&w=800&q=80', 'Philips OneBlade Hybrid Trimmer & Shaver QP2824 (Lime Green)', 0, true FROM public.products WHERE slug = 'philips-oneblade-hybrid-trimmer-shaver-qp2824-lime-green'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 85, 5, 'Mumbai Bhiwandi Central' FROM public.products WHERE slug = 'philips-oneblade-hybrid-trimmer-shaver-qp2824-lime-green'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), 'Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue)', 'philips-series-3000-stainless-steel-blade-beard-trimmer-bt323115-blue', 'c1000000-0000-0000-0000-000000000006', 'NEX-PHI-BT323115', 'Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue)', 'Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue) - Official Philips commercial model (Series 3000 BT3231). Genuine certified Indian inventory.', 1895, 1399, 4.5, 890, false, false, true, '{"Precision Settings":"20 length settings (0.5mm - 10mm)","Run Time":"Up to 60 minutes cordless use","Blades":"Self-sharpening Stainless Steel","Charging":"USB charging cord"}'::jsonb, ARRAY['Lift & Trim system cuts 30% faster by lifting low-lying hairs to blade level', 'Self-sharpening titanium-coated stainless steel blades stay as sharp as day one', 'DuraPower technology reduces friction and extends battery life 4 times']
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1503925805576-f4e345da9707?auto=format&fit=crop&w=800&q=80', 'Philips Series 3000 Stainless Steel Blade Beard Trimmer (BT3231/15 - Blue)', 0, true FROM public.products WHERE slug = 'philips-series-3000-stainless-steel-blade-beard-trimmer-bt323115-blue'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, 95, 5, 'Delhi-NCR Alpha-2' FROM public.products WHERE slug = 'philips-series-3000-stainless-steel-blade-beard-trimmer-bt323115-blue'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;

COMMIT;
