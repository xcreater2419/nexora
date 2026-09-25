import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Order, Address } from '../types/database.types';

export const Account: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.hash === '#addresses') {
      setActiveTab('addresses');
    }
  }, [location.hash]);

  useEffect(() => {
    setIsLoading(true);
    orderService.getUserOrders(user?.id || '').then(res => {
      setOrders(res);
      setIsLoading(false);
    });

    try {
      const stored = localStorage.getItem('nexora_saved_addresses');
      if (stored) {
        setAddresses(JSON.parse(stored));
      } else {
        setAddresses([
          {
            id: 'addr-1',
            user_id: user?.id || 'demo_user',
            name: user?.full_name || 'Ganesh Sharma',
            phone: user?.phone?.replace(/\D/g, '') || '9876543210',
            address_line1: 'Flat 402, Prestige Lakeside Habitat',
            address_line2: 'Varthur Main Road, Whitefield',
            landmark: 'Near Forum Shantiniketan Mall',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560087',
            address_type: 'Home',
            is_default: true,
            created_at: '2026-01-01'
          }
        ]);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('nexora_saved_addresses', JSON.stringify(updated));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">DELIVERED</span>;
      case 'shipped':
      case 'out_for_delivery':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">IN TRANSIT</span>;
      case 'confirmed':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">CONFIRMED</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">CANCELLED</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">PLACED (COD)</span>;
    }
  };

  return (
    <div className="container-dense py-4">
      {/* Account Header */}
      <div className="bg-white border border-slate-200 rounded p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-base text-slate-700 border border-slate-200">
            {user?.full_name ? user.full_name[0] : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900">{user?.full_name || 'Valued Customer'}</h1>
              {isAdmin && (
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded uppercase">
                  Admin
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500">{user?.email} • {user?.phone || '+91 98765 43210'}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="btn-amber text-xs py-1 px-3 font-bold">
              Open Admin Portal &rarr;
            </Link>
          )}
          <button
            onClick={() => logout()}
            className="btn-outline text-xs py-1 px-3 text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-4 text-xs font-bold gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-nexora-600 text-nexora-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" /> My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-2 flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'addresses'
              ? 'border-nexora-600 text-nexora-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" /> Saved Addresses ({addresses.length})
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-xs text-slate-400">Loading order history...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded p-8 text-center text-xs space-y-2">
              <Package className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">No Orders Yet</div>
              <p className="text-slate-500 max-w-sm mx-auto">
                Explore thousands of authentic products across smartphones, audio, and appliances.
              </p>
              <Link to="/shop" className="btn-primary inline-block text-xs mt-2">
                Start Shopping &rarr;
              </Link>
            </div>
          ) : (
            orders.map(ord => (
              <div key={ord.id} className="bg-white border border-slate-200 rounded p-3 sm:p-4 text-xs space-y-3 shadow-xs">
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-slate-900">{ord.order_number}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{new Date(ord.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-slate-400">•</span>
                    {getStatusBadge(ord.status)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 rupee text-sm">
                      ₹{ord.total_amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">(COD)</span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  {ord.items?.map(it => (
                    <div key={it.id} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {it.image_url && (
                          <img src={it.image_url} alt="" className="w-8 h-8 object-cover rounded border border-slate-100 shrink-0" />
                        )}
                        <span className="font-medium text-slate-900 truncate">{it.product_title}</span>
                        <span className="text-slate-500 text-[11px] shrink-0">× {it.quantity}</span>
                      </div>
                      <span className="font-semibold text-slate-800 shrink-0 rupee">₹{it.total_price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Action footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-nexora-600" />
                    <span>{ord.courier_partner} ({ord.tracking_number})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/order-tracking?tracking=${ord.order_number}`}
                      className="btn-outline text-[11px] py-1 px-2.5 font-bold flex items-center gap-1"
                    >
                      Track Package <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-white border border-slate-200 rounded p-3 text-xs space-y-2 relative shadow-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{addr.name}</span>
                    <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      {addr.address_type}
                    </span>
                    {addr.is_default && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Default
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-slate-600 leading-relaxed text-[11px]">
                  {addr.address_line1}<br />
                  {addr.address_line2 && <>{addr.address_line2}<br /></>}
                  {addr.landmark && <>Landmark: {addr.landmark}<br /></>}
                  <strong>{addr.city}, {addr.state} - {addr.pincode}</strong><br />
                  Phone: +91 {addr.phone}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
