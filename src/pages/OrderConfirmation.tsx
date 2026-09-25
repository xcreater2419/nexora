import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Truck,
  MapPin,
  Banknote,
  Package,
  Calendar,
  Printer,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { Order } from '../types/database.types';

export const OrderConfirmation: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) return;
    orderService.getOrderById(orderNumber).then(res => {
      setOrder(res);
      setIsLoading(false);
    });
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className="container-dense py-12 text-center text-xs text-slate-500">
        Loading your order confirmation...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-dense py-12 text-center">
        <h2 className="text-base font-bold text-slate-800 mb-2">Order Not Found</h2>
        <Link to="/" className="btn-primary text-xs">Return to Home</Link>
      </div>
    );
  }

  const estDate = order.estimated_delivery_date
    ? new Date(order.estimated_delivery_date).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    : 'In 3-4 Business Days';

  return (
    <div className="container-dense py-6 max-w-3xl">
      {/* Success banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 sm:p-6 text-center space-y-2 mb-4">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h1 className="text-lg sm:text-xl font-black text-slate-900">
          Order Placed Successfully!
        </h1>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Thank you for choosing NEXORA. Your Cash on Delivery order has been registered and sent to our Bengaluru fulfillment center.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-800">
          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">
            Order ID: <strong className="text-nexora-600">{order.order_number}</strong>
          </span>
          <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">
            Estimated Delivery: <strong>{estDate}</strong>
          </span>
        </div>
      </div>

      {/* Invoice Details Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 text-xs space-y-4 shadow-xs">
        {/* Top order summary header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Logistics &amp; Courier</div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <Truck className="w-3.5 h-3.5 text-nexora-600" />
              {order.courier_partner} • Tracking: <span className="font-mono text-nexora-700">{order.tracking_number}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/order-tracking?tracking=${order.order_number}`}
              className="btn-primary text-xs py-1 px-3 font-bold"
            >
              Track Package &rarr;
            </Link>
          </div>
        </div>

        {/* Ordered items table */}
        <div>
          <h3 className="font-extrabold text-slate-900 uppercase tracking-wide text-xs mb-2">
            Items Ordered ({order.items?.length || 0})
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-100 rounded">
            {order.items?.map(item => (
              <div key={item.id} className="p-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.image_url && (
                    <img src={item.image_url} alt="" className="w-10 h-10 object-cover rounded border border-slate-100 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{item.product_title}</div>
                    {item.variant_name && (
                      <div className="text-[10px] text-slate-500">{item.variant_name}</div>
                    )}
                    <div className="text-[11px] text-slate-500">Qty: {item.quantity} × ₹{item.unit_price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <div className="font-bold text-slate-950 text-xs shrink-0 rupee">
                  ₹{item.total_price.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address and payment info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-xs mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-nexora-600" /> Shipping Address
            </h4>
            <div className="text-slate-600 leading-relaxed text-[11px] bg-slate-50 p-2.5 rounded">
              <strong className="text-slate-900">{order.shipping_address.name}</strong><br />
              {order.shipping_address.address_line1}, {order.shipping_address.address_line2 || ''}<br />
              {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}<br />
              Phone: +91 {order.shipping_address.phone}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-xs mb-1 flex items-center gap-1">
              <Banknote className="w-3.5 h-3.5 text-amber-600" /> Payment &amp; Total
            </h4>
            <div className="space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded text-[11px]">
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold text-slate-900">Cash / Pay on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="rupee">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{order.delivery_fee === 0 ? 'FREE' : `₹${order.delivery_fee}`}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Payable on Arrival:</span>
                <span className="rupee text-xs">₹{order.total_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200">
          <Link to="/" className="btn-outline text-xs">
            &larr; Return to Marketplace
          </Link>
          <div className="flex gap-2">
            <Link to="/account" className="btn-outline text-xs">
              View All Orders
            </Link>
            <Link to={`/order-tracking?tracking=${order.order_number}`} className="btn-primary text-xs">
              Live Delhivery Tracking &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
