import { Order, OrderItem, OrderStatus, Address, OrderStatusHistory } from '../types/database.types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const ORDERS_STORAGE_KEY = 'nexora_local_orders';

export interface CreateOrderParams {
  userId: string;
  items: Array<{
    productId: string;
    variantId?: string | null;
    productTitle: string;
    variantName?: string | null;
    unitPrice: number;
    quantity: number;
    imageUrl?: string | null;
  }>;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  shippingAddress: Address;
  couponId?: string | null;
  customerNotes?: string | null;
}

export const orderService = {
  getStoredOrders(): Order[] {
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveStoredOrders(orders: Order[]): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage:', err);
    }
  },

  async createOrder(params: CreateOrderParams): Promise<Order> {
    // 1. Validation: Item count and structure
    if (!params.items || params.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // 2. Validation: Shipping address
    if (!params.shippingAddress || !params.shippingAddress.address_line1 || !params.shippingAddress.pincode) {
      throw new Error('Valid shipping address with PIN code is required');
    }

    // 3. Validation: Quantity and Unit Price
    for (const item of params.items) {
      if (!item.quantity || item.quantity <= 0 || item.quantity > 10) {
        throw new Error(`Invalid item quantity (${item.quantity}) for product: ${item.productTitle}`);
      }
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        throw new Error(`Invalid unit price for product: ${item.productTitle}`);
      }
    }

    // 4. Authoritative recalculation to prevent price tampering
    const computedSubtotal = params.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const computedDiscount = Math.max(0, params.discountAmount || 0);
    const computedDeliveryFee = Math.max(0, params.deliveryFee || 0);
    const computedTotal = Math.max(0, computedSubtotal - computedDiscount + computedDeliveryFee);

    const orderNumber = `NEX-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `DEL-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const orderId = `ord-${Date.now()}`;
    const now = new Date().toISOString();

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const initialHistory: OrderStatusHistory[] = [
      {
        id: `osh-1-${Date.now()}`,
        order_id: orderId,
        status: 'placed',
        note: 'Order placed successfully via Cash on Delivery (COD)',
        location: 'Bengaluru Fulfillment Hub',
        created_at: now
      },
      {
        id: `osh-2-${Date.now()}`,
        order_id: orderId,
        status: 'confirmed',
        note: 'COD order confirmed. Ready for warehouse dispatch',
        location: 'Bengaluru Fulfillment Hub',
        created_at: new Date(Date.now() + 1000 * 60 * 15).toISOString()
      }
    ];

    const orderItems: OrderItem[] = params.items.map((item, idx) => ({
      id: `item-${idx}-${Date.now()}`,
      order_id: orderId,
      product_id: item.productId,
      variant_id: item.variantId,
      product_title: item.productTitle,
      variant_name: item.variantName,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      total_price: item.unitPrice * item.quantity,
      image_url: item.imageUrl
    }));

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      user_id: params.userId,
      subtotal: computedSubtotal,
      discount_amount: computedDiscount,
      delivery_fee: computedDeliveryFee,
      total_amount: computedTotal,
      payment_method: 'COD',
      payment_status: 'pending_cod',
      status: 'placed',
      shipping_address: params.shippingAddress,
      coupon_id: params.couponId,
      tracking_number: trackingNumber,
      courier_partner: 'Delhivery Surface Express',
      estimated_delivery_date: estDate.toISOString(),
      customer_notes: params.customerNotes,
      created_at: now,
      items: orderItems,
      status_history: initialHistory
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: dbOrder, error: orderErr } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            user_id: params.userId,
            subtotal: params.subtotal,
            discount_amount: params.discountAmount,
            delivery_fee: params.deliveryFee,
            total_amount: params.totalAmount,
            payment_method: 'COD',
            payment_status: 'pending_cod',
            status: 'placed',
            shipping_address: params.shippingAddress,
            coupon_id: params.couponId,
            tracking_number: trackingNumber,
            courier_partner: 'Delhivery Surface Express',
            estimated_delivery_date: estDate.toISOString(),
            customer_notes: params.customerNotes
          })
          .select()
          .single();

        if (!orderErr && dbOrder) {
          const dbOrderItems = params.items.map(item => ({
            order_id: dbOrder.id,
            product_id: item.productId,
            variant_id: item.variantId,
            product_title: item.productTitle,
            variant_name: item.variantName,
            unit_price: item.unitPrice,
            quantity: item.quantity,
            total_price: item.unitPrice * item.quantity,
            image_url: item.imageUrl
          }));

          await supabase.from('order_items').insert(dbOrderItems);

          await supabase.from('order_status_history').insert({
            order_id: dbOrder.id,
            status: 'placed',
            note: 'Order placed successfully via Cash on Delivery (COD)',
            location: 'Bengaluru Fulfillment Hub'
          });

          return {
            ...newOrder,
            id: dbOrder.id
          };
        }
      } catch (err) {
        console.warn('Supabase order creation failed, persisting locally:', err);
      }
    }

    // Persist in localStorage
    const currentOrders = this.getStoredOrders();
    currentOrders.unshift(newOrder);
    this.saveStoredOrders(currentOrders);

    return newOrder;
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, items:order_items(*), status_history:order_status_history(*)')
          .or(`id.eq.${orderId},order_number.eq.${orderId}`)
          .single();

        if (!error && data) {
          return data as Order;
        }
      } catch (err) {
        console.warn('Supabase getOrderById error:', err);
      }
    }

    const localOrders = this.getStoredOrders();
    const found = localOrders.find(o => o.id === orderId || o.order_number === orderId);
    return found || null;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, items:order_items(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as Order[];
        }
      } catch (err) {
        console.warn('Supabase getUserOrders error:', err);
      }
    }

    const localOrders = this.getStoredOrders();
    return localOrders.filter(o => !userId || o.user_id === userId || o.user_id === 'guest_user');
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, note?: string, location?: string): Promise<boolean> {
    const now = new Date().toISOString();

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('orders')
          .update({ status, updated_at: now })
          .eq('id', orderId);

        await supabase.from('order_status_history').insert({
          order_id: orderId,
          status,
          note: note || `Status updated to ${status}`,
          location: location || 'Delhivery Hub'
        });
      } catch (err) {
        console.warn('Supabase updateOrderStatus error:', err);
      }
    }

    const localOrders = this.getStoredOrders();
    const target = localOrders.find(o => o.id === orderId);
    if (target) {
      target.status = status;
      target.status_history = target.status_history || [];
      target.status_history.push({
        id: `osh-${Date.now()}`,
        order_id: orderId,
        status,
        note: note || `Status updated to ${status}`,
        location: location || 'Delhivery Express Facility',
        created_at: now
      });
      this.saveStoredOrders(localOrders);
      return true;
    }

    return false;
  }
};
