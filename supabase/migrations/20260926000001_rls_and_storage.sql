-- ==============================================================================
-- NEXORA - Row Level Security (RLS) & Storage Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND is_active = TRUE
  );
$$;

-- 1. PROFILES
CREATE POLICY "Public profiles can be viewed by anyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
ON public.profiles FOR ALL
USING (public.is_admin());

-- Automatic profile creation on auth.users insert (STRICT CUSTOMER ROLE - PREVENTS SELF-ELEVATION)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'customer'::public.user_role -- Strictly default to customer; never trust client-provided role metadata
  );

  INSERT INTO public.wishlists (user_id)
  VALUES (new.id)
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to prevent customers from modifying their own role
CREATE OR REPLACE FUNCTION public.protect_user_role()
RETURNS trigger AS $$
BEGIN
  IF (OLD.role IS DISTINCT FROM NEW.role) AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only system administrators can modify user roles';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_protect_user_role ON public.profiles;
CREATE TRIGGER trg_protect_user_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_user_role();

-- 2. CATEGORIES, SUBCATEGORIES, BRANDS
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read subcategories" ON public.subcategories FOR SELECT USING (true);
CREATE POLICY "Admin manage subcategories" ON public.subcategories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admin manage brands" ON public.brands FOR ALL USING (public.is_admin());

-- 3. PRODUCTS, IMAGES, VARIANTS, INVENTORY
CREATE POLICY "Public read active products" ON public.products FOR SELECT
USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admin manage product images" ON public.product_images FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Admin manage product variants" ON public.product_variants FOR ALL USING (public.is_admin());

CREATE POLICY "Public read inventory stock" ON public.inventory FOR SELECT USING (true);
CREATE POLICY "Admin manage inventory" ON public.inventory FOR ALL USING (public.is_admin());

-- 4. ADDRESSES
CREATE POLICY "Users can manage own addresses" ON public.addresses
FOR ALL USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view customer addresses for orders" ON public.addresses
FOR SELECT USING (public.is_admin());

-- 5. CARTS & CART ITEMS
CREATE POLICY "Users can manage their carts" ON public.carts
FOR ALL USING (auth.uid() = user_id OR (user_id IS NULL AND session_token IS NOT NULL));

CREATE POLICY "Users can manage cart items" ON public.cart_items
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.carts
    WHERE carts.id = cart_items.cart_id
    AND (carts.user_id = auth.uid() OR (carts.user_id IS NULL AND carts.session_token IS NOT NULL))
  )
);

-- 6. WISHLISTS & WISHLIST ITEMS
CREATE POLICY "Users can view own wishlist" ON public.wishlists
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist items" ON public.wishlist_items
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.wishlists
    WHERE wishlists.id = wishlist_items.wishlist_id
    AND wishlists.user_id = auth.uid()
  )
);

-- 7. COUPONS & USAGE
CREATE POLICY "Public read active coupons" ON public.coupons
FOR SELECT USING (is_active = true AND expiry_date > NOW());
CREATE POLICY "Admin manage coupons" ON public.coupons FOR ALL USING (public.is_admin());

CREATE POLICY "Users view own coupon usage" ON public.coupon_usage
FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert coupon usage during order" ON public.coupon_usage
FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin view all coupon usage" ON public.coupon_usage FOR ALL USING (public.is_admin());

-- 8. ORDERS, ITEMS & TRACKING
CREATE POLICY "Users view own orders" ON public.orders
FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can place new orders" ON public.orders
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all orders" ON public.orders
FOR ALL USING (public.is_admin());

CREATE POLICY "Users view own order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.user_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Users insert order items for their order" ON public.order_items
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Users view order tracking history" ON public.order_status_history
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_status_history.order_id
    AND (orders.user_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Admins add order status history" ON public.order_status_history
FOR ALL USING (public.is_admin());

-- 9. REVIEWS
CREATE POLICY "Public view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create review" ON public.reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review" ON public.reviews
FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin delete review" ON public.reviews FOR DELETE USING (public.is_admin());

-- 10. BANNERS & COLLECTIONS
CREATE POLICY "Public view active banners" ON public.banners FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin manage banners" ON public.banners FOR ALL USING (public.is_admin());

CREATE POLICY "Public view collections" ON public.collections FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin manage collections" ON public.collections FOR ALL USING (public.is_admin());

CREATE POLICY "Public view collection products" ON public.collection_products FOR SELECT USING (true);
CREATE POLICY "Admin manage collection products" ON public.collection_products FOR ALL USING (public.is_admin());

-- 11. ADMIN LOGS
CREATE POLICY "Admins read activity logs" ON public.admin_activity_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins insert activity logs" ON public.admin_activity_logs FOR INSERT WITH CHECK (public.is_admin());

-- ==============================================================================
-- 12. STORAGE BUCKETS & POLICIES
-- ==============================================================================
-- Note: Insert into storage.buckets for 'product-images', 'banner-images', 'brand-logos'
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('product-images', 'product-images', true),
  ('banner-images', 'banner-images', true),
  ('brand-logos', 'brand-logos', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read images from these buckets
CREATE POLICY "Public Access for product images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('product-images', 'banner-images', 'brand-logos', 'avatars'));

-- Admin can upload, update, delete images
CREATE POLICY "Admin Upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('product-images', 'banner-images', 'brand-logos') AND public.is_admin());

CREATE POLICY "Admin Update product images"
ON storage.objects FOR UPDATE
USING (bucket_id IN ('product-images', 'banner-images', 'brand-logos') AND public.is_admin());

CREATE POLICY "Admin Delete product images"
ON storage.objects FOR DELETE
USING (bucket_id IN ('product-images', 'banner-images', 'brand-logos') AND public.is_admin());

CREATE POLICY "User upload avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
