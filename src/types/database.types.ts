export type UserRole = 'customer' | 'seller' | 'admin';
export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending_cod' | 'collected_cod' | 'cancelled';
export type DiscountType = 'percentage' | 'flat';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
  origin_country: string;
  is_popular: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  sku: string | null;
  price_adjustment: number;
  attributes: Record<string, string>;
  image_url: string | null;
  stock_quantity?: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand_id: string | null;
  category_id: string;
  subcategory_id: string | null;
  sku: string | null;
  short_description: string | null;
  description: string;
  mrp: number;
  price: number;
  discount_percentage: number;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  is_trending: boolean;
  is_active: boolean;
  warranty_info: string;
  return_policy_days: number;
  cod_available: boolean;
  specifications: Record<string, string>;
  highlights: string[];
  created_at: string;
  updated_at: string;
  // Joined relation fields
  brand?: Brand | null;
  category?: Category;
  subcategory?: Subcategory | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  stock_quantity?: number;
}

export interface Address {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  alternate_phone?: string | null;
  address_line1: string;
  address_line2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  pincode: string;
  address_type: 'Home' | 'Work' | 'Other';
  is_default: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  cart_id?: string;
  product_id: string;
  variant_id?: string | null;
  quantity: number;
  product: Product;
  variant?: ProductVariant | null;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  created_at: string;
  product: Product;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount: number | null;
  min_order_value: number;
  expiry_date: string;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string | null;
  product_title: string;
  variant_name?: string | null;
  unit_price: number;
  quantity: number;
  total_price: number;
  image_url?: string | null;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string | null;
  location: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  subtotal: number;
  discount_amount: number;
  delivery_fee: number;
  total_amount: number;
  payment_method: 'COD';
  payment_status: PaymentStatus;
  status: OrderStatus;
  shipping_address: Address;
  coupon_id?: string | null;
  tracking_number: string | null;
  courier_partner: string;
  estimated_delivery_date: string | null;
  customer_notes?: string | null;
  created_at: string;
  items?: OrderItem[];
  status_history?: OrderStatusHistory[];
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  helpful_votes: number;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  badge: string | null;
  image_url: string;
  mobile_image_url?: string | null;
  link_url: string;
  button_text: string;
  position: 'hero_slider' | 'middle_strip' | 'side_promo';
  display_order: number;
  is_active: boolean;
}

export interface AdminActivityLog {
  id: string;
  admin_id: string;
  action_type: string;
  target_entity: string;
  target_id: string | null;
  details: Record<string, any>;
  ip_address?: string | null;
  created_at: string;
}
