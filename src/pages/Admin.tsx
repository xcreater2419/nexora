import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Tag,
  Image,
  Activity,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminService, AdminKPIMetrics } from '../services/adminService';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { couponService } from '../services/couponService';
import { Product, Order, OrderStatus, Coupon, Banner, AdminActivityLog } from '../types/database.types';
import { isSupabaseConfigured } from '../services/supabaseClient';

export const Admin: React.FC = () => {
  const { user, isAdmin, toggleAdminRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'kpi' | 'products' | 'inventory' | 'orders' | 'coupons' | 'banners' | 'logs'>('kpi');
  const [kpis, setKpis] = useState<AdminKPIMetrics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [logs, setLogs] = useState<AdminActivityLog[]>([]);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Edit / Add modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    price: 999,
    mrp: 1499,
    stock_quantity: 25,
    category_id: 'c1',
    warranty_info: '1 Year Manufacturer Warranty'
  });

  const loadAllAdminData = async () => {
    const [kpiRes, prodList, ordList, coupList, banList] = await Promise.all([
      adminService.getKPIMetrics(),
      adminService.getProducts(),
      orderService.getStoredOrders(),
      couponService.getAllActiveCoupons(),
      productService.getBanners()
    ]);

    setKpis(kpiRes);
    setProducts(prodList);
    setOrders(ordList);
    setCoupons(coupList);
    setBanners(banList);
    const logsData = await adminService.getLogs();
    setLogs(logsData);
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleUpdateStock = async (prodId: string, current: number, delta: number) => {
    const newStock = Math.max(0, current + delta);
    await adminService.updateInventoryStock(prodId, newStock);
    loadAllAdminData();
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    await adminService.updateOrderStatus(orderId, newStatus, `Admin changed status to ${newStatus}`);
    loadAllAdminData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await adminService.deleteProduct(id);
      loadAllAdminData();
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await adminService.updateProduct({
        id: editingProduct.id,
        title: productForm.title,
        price: Number(productForm.price),
        mrp: Number(productForm.mrp),
        stock_quantity: Number(productForm.stock_quantity),
        warranty_info: productForm.warranty_info
      });
    } else {
      await adminService.createProduct({
        title: productForm.title,
        slug: productForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
        brand_id: 'b1',
        category_id: productForm.category_id,
        subcategory_id: null,
        sku: `NEX-ADM-${Date.now().toString().slice(-5)}`,
        short_description: productForm.title,
        description: productForm.title + ' authentic genuine marketplace model.',
        mrp: Number(productForm.mrp),
        price: Number(productForm.price),
        discount_percentage: Math.round(((Number(productForm.mrp) - Number(productForm.price)) / Number(productForm.mrp)) * 100),
        rating: 4.5,
        reviews_count: 1,
        is_featured: false,
        is_trending: false,
        is_active: true,
        warranty_info: productForm.warranty_info,
        return_policy_days: 7,
        cod_available: true,
        stock_quantity: Number(productForm.stock_quantity),
        specifications: { "Warranty": productForm.warranty_info },
        highlights: ["100% Genuine Certified Indian Stock"],
        images: [{ id: `img-${Date.now()}`, product_id: '', image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80', alt_text: productForm.title, display_order: 0, is_primary: true }]
      });
    }
    setShowAddProductModal(false);
    setEditingProduct(null);
    loadAllAdminData();
  };

  if (!isAdmin) {
    const isLive = isSupabaseConfigured();
    return (
      <div className="container-dense py-12 text-center max-w-lg mx-auto">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-base font-extrabold text-slate-900">Admin Authorization Required</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isLive ? (
              <>
                NEXORA is connected to a live Supabase backend. Admin access is strictly protected by PostgreSQL Row Level Security (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">public.is_admin()</code>) and cannot be self-assigned.
                <br /><br />
                To grant admin privileges to this account, execute in your Supabase SQL Editor:
                <code className="block mt-2 bg-slate-900 text-amber-300 p-2.5 rounded text-[11px] font-mono text-left select-all">
                  UPDATE public.profiles SET role = &apos;admin&apos; WHERE email = &apos;{user?.email || 'your-email@example.com'}&apos;;
                </code>
              </>
            ) : (
              <>
                This dashboard uses secure database-backed RLS policies (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">public.is_admin()</code>). To inspect and test admin capabilities in offline demo mode, activate the demo role below.
              </>
            )}
          </p>
          {!isLive && (
            <button
              onClick={toggleAdminRole}
              className="btn-amber text-xs font-bold px-4 py-2"
            >
              Activate Demo Admin Role
            </button>
          )}
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    orderStatusFilter === 'all' || o.status === orderStatusFilter
  );

  return (
    <div className="container-dense py-4 space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">NEXORA Admin Console</span>
          </div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
            Store Operations &amp; Catalog Management
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAllAdminData}
            className="btn-outline text-white border-slate-700 hover:bg-slate-800 text-xs py-1 px-2.5 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <Link to="/" className="btn-amber text-xs py-1 px-3 font-bold">
            Customer View &rarr;
          </Link>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded p-3 text-xs shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Total Sales (COD)</div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1 rupee">
            ₹{kpis?.totalSales.toLocaleString('en-IN') || '0'}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Cash/Pay on Delivery</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3 text-xs shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Total Orders</div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {kpis?.totalOrders || orders.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Dispatched via Delhivery Express</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3 text-xs shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Active Products</div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {kpis?.activeProducts || products.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Verified Commercial Products</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3 text-xs shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Low Stock Items</div>
          <div className="text-lg sm:text-xl font-black text-rose-600 mt-1">
            {kpis?.lowStockItems || 0}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">&le; 5 units in warehouse</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-3 sm:gap-6 overflow-x-auto no-scrollbar">
        {[
          { key: 'products', label: 'Products', count: products.length },
          { key: 'inventory', label: 'Inventory', count: kpis?.lowStockItems ? `${kpis.lowStockItems} low` : null },
          { key: 'orders', label: 'Orders', count: orders.length },
          { key: 'coupons', label: 'Coupons', count: coupons.length },
          { key: 'banners', label: 'Banners', count: banners.length },
          { key: 'logs', label: 'Audit Logs', count: logs.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2 whitespace-nowrap flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === tab.key
                ? 'border-nexora-600 text-nexora-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-semibold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Products Table */}
      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs text-xs space-y-3 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search products by title, brand, SKU..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-nexora-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  title: '',
                  slug: '',
                  price: 999,
                  mrp: 1499,
                  stock_quantity: 25,
                  category_id: 'c1',
                  warranty_info: '1 Year Manufacturer Warranty'
                });
                setShowAddProductModal(true);
              }}
              className="btn-primary text-xs py-1.5 px-3 font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-2">Item</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Price (₹)</th>
                  <th className="p-2">MRP (₹)</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.slice(0, 15).map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2 flex items-center gap-2 max-w-xs">
                      <img
                        src={prod.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=100&q=80'}
                        alt=""
                        className="w-8 h-8 rounded object-cover border border-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-semibold text-slate-900 truncate">{prod.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{prod.sku}</div>
                      </div>
                    </td>
                    <td className="p-2 text-slate-700 font-medium">{prod.brand?.name || 'GENUINE'}</td>
                    <td className="p-2 font-bold text-slate-900 rupee">₹{prod.price.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-slate-400 line-through rupee">₹{prod.mrp.toLocaleString('en-IN')}</td>
                    <td className="p-2">
                      <span className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                        (prod.stock_quantity ?? 0) <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {prod.stock_quantity} left
                      </span>
                    </td>
                    <td className="p-2 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setProductForm({
                            title: prod.title,
                            slug: prod.slug,
                            price: prod.price,
                            mrp: prod.mrp,
                            stock_quantity: prod.stock_quantity || 0,
                            category_id: prod.category_id,
                            warranty_info: prod.warranty_info
                          });
                          setShowAddProductModal(true);
                        }}
                        className="text-nexora-600 hover:text-nexora-800 font-semibold p-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs p-3 sm:p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
              Warehouse Stock Balances
            </h3>
            <span className="text-[11px] text-slate-500">Live Indian Fulfillment Hub Stock</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-2">Product Title</th>
                  <th className="p-2">Current Stock</th>
                  <th className="p-2">Warehouse</th>
                  <th className="p-2 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2 font-medium text-slate-900 truncate max-w-sm">
                      {prod.title}
                    </td>
                    <td className="p-2">
                      <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                        (prod.stock_quantity ?? 0) <= 5 ? 'bg-rose-100 text-rose-900' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {prod.stock_quantity ?? 0} units
                      </span>
                    </td>
                    <td className="p-2 text-slate-500 text-[11px]">Bengaluru Hub-1</td>
                    <td className="p-2 text-right space-x-1.5">
                      <button
                        onClick={() => handleUpdateStock(prod.id, prod.stock_quantity ?? 0, 10)}
                        className="btn-outline text-[10px] py-0.5 px-2"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleUpdateStock(prod.id, prod.stock_quantity ?? 0, 50)}
                        className="btn-outline text-[10px] py-0.5 px-2"
                      >
                        +50
                      </button>
                      <button
                        onClick={() => handleUpdateStock(prod.id, prod.stock_quantity ?? 0, -(prod.stock_quantity ?? 0))}
                        className="btn-outline text-[10px] py-0.5 px-2 text-rose-600"
                        title="Mark Out of Stock"
                      >
                        Set 0
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Manager */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs p-3 sm:p-4 text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
              Customer Orders &amp; COD Tracking
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px]">Filter Status:</span>
              <select
                value={orderStatusFilter}
                onChange={e => setOrderStatusFilter(e.target.value)}
                className="p-1 border border-slate-300 rounded text-xs bg-white"
              >
                <option value="all">All Orders</option>
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-6 text-slate-400">No orders match this status filter.</div>
            ) : (
              filteredOrders.map(ord => (
                <div key={ord.id} className="border border-slate-200 rounded p-3 space-y-2 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs sm:text-sm">{ord.order_number}</div>
                      <div className="text-[11px] text-slate-500">
                        Customer: <strong>{ord.shipping_address.name}</strong> • Phone: +91 {ord.shipping_address.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-black text-slate-900 text-sm rupee">
                          ₹{ord.total_amount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-amber-700 font-bold uppercase">Cash on Delivery</div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={ord.status}
                        onChange={e => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="p-1 border border-slate-300 rounded font-bold text-xs bg-white text-slate-800"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered (Paid)</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 flex flex-wrap justify-between gap-2">
                    <div>
                      Ship to: {ord.shipping_address.address_line1}, {ord.shipping_address.city} - {ord.shipping_address.pincode}
                    </div>
                    <div className="text-slate-400">
                      AWB: <span className="font-mono text-nexora-700">{ord.tracking_number}</span> ({ord.courier_partner})
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Coupons */}
      {activeTab === 'coupons' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs p-3 sm:p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
              Active Marketplace Coupons
            </h3>
            <span className="text-[11px] text-slate-500">Instant Cart Discounts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {coupons.map(cp => (
              <div key={cp.id} className="p-3 border border-slate-200 rounded space-y-1.5 bg-slate-50">
                <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-nexora-700 font-mono">{cp.code}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    ACTIVE
                  </span>
                </div>
                <div className="text-slate-600">{cp.description}</div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  Min Order: ₹{cp.min_order_value} • Type: {cp.discount_type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Banners */}
      {activeTab === 'banners' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs p-3 sm:p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
              Hero Slider &amp; Promotional Banners
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {banners.map(b => (
              <div key={b.id} className="border border-slate-200 rounded overflow-hidden">
                <img src={b.image_url} alt="" className="w-full h-28 object-cover" />
                <div className="p-2.5 space-y-1">
                  <span className="text-[9px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded uppercase">
                    {b.badge}
                  </span>
                  <div className="font-bold text-slate-900">{b.title}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{b.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Audit Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200 rounded shadow-xs p-3 sm:p-4 text-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide pb-2 border-b border-slate-100">
            Admin Operation Audit Logs
          </h3>

          <div className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <div className="text-slate-400 py-4">No recent activity recorded yet.</div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="py-2 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 uppercase">{log.action_type.replace(/_/g, ' ')}</span>
                    <span className="text-slate-500 ml-2">Entity: {log.target_entity} ({log.target_id || 'N/A'})</span>
                  </div>
                  <span className="text-slate-400 font-mono">{new Date(log.created_at).toLocaleTimeString('en-IN')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-5 shadow-2xl text-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              {editingProduct ? 'Edit Product' : 'Add New Marketplace Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-2.5">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM6 Headphones"
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp}
                    onChange={e => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Warehouse Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock_quantity}
                    onChange={e => setProductForm({ ...productForm, stock_quantity: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Warranty Details</label>
                  <input
                    type="text"
                    value={productForm.warranty_info}
                    onChange={e => setProductForm({ ...productForm, warranty_info: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="btn-outline text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
