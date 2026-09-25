import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { Order, OrderStatus } from '../types/database.types';

const STATUS_STEPS: Array<{ key: OrderStatus; label: string; desc: string }> = [
  { key: 'placed', label: 'Order Placed', desc: 'Received at Bengaluru Central Hub' },
  { key: 'confirmed', label: 'Confirmed & Packed', desc: 'Quality checked and securely packaged' },
  { key: 'shipped', label: 'In Transit / Dispatched', desc: 'Handed over to Delhivery Surface Express' },
  { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier executive assigned with your package' },
  { key: 'delivered', label: 'Delivered (COD Paid)', desc: 'Package delivered and payment collected' }
];

export const OrderTracking: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackingQuery = searchParams.get('tracking') || '';

  const [inputCode, setInputCode] = useState(trackingQuery);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (trackingQuery) {
      setIsLoading(true);
      orderService.getOrderById(trackingQuery).then(res => {
        setOrder(res);
        setSearched(true);
        setIsLoading(false);
      });
    }
  }, [trackingQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setSearchParams({ tracking: inputCode.trim() });
    }
  };

  const getStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'placed': return 0;
      case 'confirmed': return 1;
      case 'shipped': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="container-dense py-4 max-w-3xl">
      <div className="mb-4 pb-2 border-b border-slate-200">
        <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Truck className="w-5 h-5 text-nexora-600" /> Order Tracking &amp; Courier Telemetry
        </h1>
        <p className="text-xs text-slate-500">
          Real-time delivery status for Delhivery &amp; BlueDart express shipments across India.
        </p>
      </div>

      {/* Tracking Search Input */}
      <div className="bg-white border border-slate-200 rounded p-3 mb-4 shadow-xs">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. NEX-2026-123456) or Tracking Number"
              value={inputCode}
              onChange={e => setInputCode(e.target.value)}
              className="w-full text-xs sm:text-sm pl-8 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button type="submit" className="btn-primary text-xs sm:text-sm px-4 py-2 font-bold shrink-0">
            Track Order
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center py-8 text-xs text-slate-500">Fetching live courier telemetry...</div>
      )}

      {/* Results */}
      {!isLoading && searched && !order && (
        <div className="bg-white border border-slate-200 rounded p-6 text-center text-xs space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No Shipment Found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Please check the Order ID or Tracking Number. You can also view all your recent orders in your Account page.
          </p>
          <Link to="/account" className="btn-outline inline-block text-xs mt-2">
            View My Orders
          </Link>
        </div>
      )}

      {!isLoading && order && (
        <div className="bg-white border border-slate-200 rounded p-4 sm:p-6 text-xs space-y-6 shadow-xs">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs text-slate-500">Tracking Shipment for:</div>
              <div className="text-sm font-extrabold text-slate-900">{order.order_number}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Courier: <strong>{order.courier_partner}</strong> • AWB: <span className="font-mono text-nexora-700">{order.tracking_number}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80 text-left sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm text-emerald-700">
                {order.estimated_delivery_date ? new Date(order.estimated_delivery_date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) : '3-4 Days'}
              </span>
            </div>
          </div>

          {/* Visual Progress Steps */}
          <div>
            <h3 className="font-extrabold text-slate-900 uppercase tracking-wide text-xs mb-4">
              Shipment Status Timeline
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.key} className="relative flex items-start gap-3">
                    {/* Circle icon */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div>
                      <div className={`font-bold text-xs sm:text-sm ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Destination & Cash on Delivery Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded">
            <div>
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-nexora-600" /> Destination Address:
              </span>
              <div className="text-[11px] text-slate-600 leading-tight">
                {order.shipping_address.name}<br />
                {order.shipping_address.address_line1}, {order.shipping_address.city} - {order.shipping_address.pincode}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1 mb-1">
                <Package className="w-3.5 h-3.5 text-amber-600" /> Payment on Delivery:
              </span>
              <div className="text-[11px] text-slate-600 leading-tight">
                Total to Pay: <strong className="text-slate-900 rupee">₹{order.total_amount.toLocaleString('en-IN')}</strong><br />
                Method: Cash or UPI QR scan on arrival
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
