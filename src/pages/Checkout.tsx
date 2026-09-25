import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Truck,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Address } from '../types/database.types';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Chandigarh'
];

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    user_id: 'usr_demo_india_01',
    name: 'Ganesh Sharma',
    phone: '9876543210',
    alternate_phone: '9123456780',
    address_line1: 'Flat 402, Prestige Lakeside Habitat',
    address_line2: 'Varthur Main Road, Whitefield',
    landmark: 'Near Forum Shantiniketan Mall',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560087',
    address_type: 'Home',
    is_default: true,
    created_at: '2026-01-01'
  },
  {
    id: 'addr-2',
    user_id: 'usr_demo_india_01',
    name: 'Ganesh Sharma (Work)',
    phone: '9876543210',
    address_line1: 'Tower B, 7th Floor, Embassy Tech Village',
    address_line2: 'Outer Ring Road, Devarabisanahalli',
    landmark: 'Opposite Cisco Campus',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    address_type: 'Work',
    is_default: false,
    created_at: '2026-01-15'
  }
];

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, couponDiscount = 0, deliveryFee, totalPayable, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem('nexora_saved_addresses');
      return stored ? JSON.parse(stored) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || '');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [customerNotes, setCustomerNotes] = useState('');

  // New address form state
  const [formData, setFormData] = useState({
    name: user?.full_name || '',
    phone: user?.phone?.replace(/\D/g, '') || '',
    alternate_phone: '',
    address_line1: '',
    address_line2: '',
    landmark: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    address_type: 'Home' as 'Home' | 'Work' | 'Other'
  });

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      user_id: user?.id || 'guest_user',
      ...formData,
      is_default: false,
      created_at: new Date().toISOString()
    };

    const updated = [newAddr, ...addresses];
    setAddresses(updated);
    setSelectedAddressId(newAddr.id);
    localStorage.setItem('nexora_saved_addresses', JSON.stringify(updated));
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) {
      alert('Please select or add a delivery address');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);
    try {
      const finalDeliveryFee = deliveryOption === 'express' ? deliveryFee + 50 : deliveryFee;
      const order = await orderService.createOrder({
        userId: user?.id || 'guest_user',
        items: items.map(i => ({
          productId: i.product.id,
          variantId: i.variant?.id || null,
          productTitle: i.product.title,
          variantName: i.variant?.variant_name || null,
          unitPrice: i.product.price + (i.variant?.price_adjustment || 0),
          quantity: i.quantity,
          imageUrl: i.variant?.image_url || i.product.images?.[0]?.image_url || null
        })),
        subtotal,
        discountAmount: couponDiscount,
        deliveryFee: finalDeliveryFee,
        totalAmount: totalPayable + (deliveryOption === 'express' ? 50 : 0),
        shippingAddress: selectedAddress,
        couponId: appliedCoupon?.id || null,
        customerNotes: customerNotes.trim() || null
      });

      clearCart();
      navigate(`/order-confirmation/${order.order_number}`);
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);
  const extraExpress = deliveryOption === 'express' ? 50 : 0;
  const finalTotal = totalPayable + extraExpress;

  return (
    <div className="container-dense py-4">
      {/* Title */}
      <div className="mb-4 pb-2 border-b border-slate-200">
        <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Checkout: Cash on Delivery
        </h1>
        <p className="text-xs text-slate-500">
          No credit card or online payment required. Pay safely when your order arrives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Left Column: Address, Delivery Speed, Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Step 1: Delivery Address */}
          <div className="bg-white border border-slate-200 rounded p-4 text-xs space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-xs">
                <MapPin className="w-4 h-4 text-nexora-600" /> 1. Select Delivery Address
              </span>
              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-nexora-600 hover:text-nexora-800 font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" /> {showNewAddressForm ? 'Cancel' : 'Add New Address'}
              </button>
            </div>

            {/* Address Selection Cards */}
            {!showNewAddressForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addresses.map(addr => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3 rounded border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-nexora-600 bg-nexora-50/60 ring-1 ring-nexora-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{addr.name}</span>
                        <span className="text-[10px] font-semibold bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                          {addr.address_type}
                        </span>
                      </div>
                      <div className="text-slate-600 leading-tight space-y-0.5 text-[11px]">
                        <div>{addr.address_line1}</div>
                        {addr.address_line2 && <div>{addr.address_line2}</div>}
                        {addr.landmark && <div className="text-slate-500">Landmark: {addr.landmark}</div>}
                        <div className="font-semibold text-slate-900">{addr.city}, {addr.state} - {addr.pincode}</div>
                        <div className="text-slate-500 pt-0.5">Phone: +91 {addr.phone}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Indian Address Form */}
            {showNewAddressForm && (
              <form onSubmit={handleAddNewAddress} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">10-Digit Mobile Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs rounded-l">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-full p-2 border border-slate-300 rounded-r text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Flat, House no., Building, Company, Apartment *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 301, Lakeview Residency"
                    value={formData.address_line1}
                    onChange={e => setFormData({ ...formData, address_line1: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Area, Street, Sector, Village</label>
                    <input
                      type="text"
                      placeholder="e.g. 12th Main, Indiranagar"
                      value={formData.address_line2}
                      onChange={e => setFormData({ ...formData, address_line2: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Metro Station / BDA Complex"
                      value={formData.landmark}
                      onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Town / City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none bg-white"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">6-Digit PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="560038"
                      value={formData.pincode}
                      onChange={e => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-center pt-1">
                  <span className="font-semibold text-slate-700">Address Type:</span>
                  {(['Home', 'Work', 'Other'] as const).map(type => (
                    <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="addr_type"
                        checked={formData.address_type === type}
                        onChange={() => setFormData({ ...formData, address_type: type })}
                        className="text-nexora-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(false)}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs">
                    Save and Use This Address
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Step 2: Courier & Delivery Speed */}
          <div className="bg-white border border-slate-200 rounded p-4 text-xs space-y-3 shadow-xs">
            <span className="font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-xs pb-2 border-b border-slate-100">
              <Truck className="w-4 h-4 text-nexora-600" /> 2. Delivery Speed &amp; Courier
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                onClick={() => setDeliveryOption('standard')}
                className={`p-3 rounded border cursor-pointer flex gap-2.5 items-start transition-all ${
                  deliveryOption === 'standard'
                    ? 'border-nexora-600 bg-nexora-50/50 ring-1 ring-nexora-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="delivery_speed"
                  checked={deliveryOption === 'standard'}
                  onChange={() => setDeliveryOption('standard')}
                  className="mt-0.5 text-nexora-600"
                />
                <div>
                  <div className="font-bold text-slate-900">Standard Surface Delivery</div>
                  <div className="text-[11px] text-slate-500">3-4 Business Days via Delhivery Express</div>
                  <div className="text-emerald-700 font-bold text-[11px] mt-0.5">
                    {deliveryFee === 0 ? 'FREE (Orders ₹499+)' : `₹${deliveryFee}`}
                  </div>
                </div>
              </label>

              <label
                onClick={() => setDeliveryOption('express')}
                className={`p-3 rounded border cursor-pointer flex gap-2.5 items-start transition-all ${
                  deliveryOption === 'express'
                    ? 'border-nexora-600 bg-nexora-50/50 ring-1 ring-nexora-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="delivery_speed"
                  checked={deliveryOption === 'express'}
                  onChange={() => setDeliveryOption('express')}
                  className="mt-0.5 text-nexora-600"
                />
                <div>
                  <div className="font-bold text-slate-900">Priority Air Express</div>
                  <div className="text-[11px] text-slate-500">1-2 Business Days via BlueDart Priority Air</div>
                  <div className="text-slate-800 font-bold text-[11px] mt-0.5">
                    +₹50 Extra
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method (Pure Cash on Delivery) */}
          <div className="bg-white border border-slate-200 rounded p-4 text-xs space-y-3 shadow-xs">
            <span className="font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 text-xs pb-2 border-b border-slate-100">
              <Banknote className="w-4 h-4 text-amber-600" /> 3. Payment Method: Cash on Delivery (COD)
            </span>

            <div className="p-3 bg-amber-500/10 border border-amber-300/80 rounded flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                ₹
              </div>
              <div className="space-y-1">
                <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                  100% Cash / Pay on Delivery (Pre-Selected)
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  No advance payment or credit card details required. You can pay cash or scan the delivery executive's UPI QR code (Google Pay, PhonePe, Paytm) right at your doorstep.
                </p>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free open-box delivery verification available upon request
                </div>
              </div>
            </div>

            {/* Delivery Instructions note */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Delivery Instructions or Landmark Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, ring second floor doorbell"
                value={customerNotes}
                onChange={e => setCustomerNotes(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-nexora-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Confirmation Box (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded p-4 text-xs space-y-3 shadow-xs">
            <h2 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider pb-2 border-b border-slate-100">
              Order Summary ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
            </h2>

            {/* Items mini list */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-50">
              {items.map(item => (
                <div key={item.id} className="pt-1.5 first:pt-0 flex gap-2 items-center">
                  <img
                    src={item.variant?.image_url || item.product.images?.[0]?.image_url}
                    alt=""
                    className="w-9 h-9 object-cover rounded border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 truncate">{item.product.title}</div>
                    <div className="text-[10px] text-slate-500">
                      Qty: {item.quantity} {item.variant ? `• ${item.variant.variant_name}` : ''}
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0 rupee">
                    ₹{((item.product.price + (item.variant?.price_adjustment || 0)) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="rupee">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {deliveryOption === 'express' ? (
                    <span className="font-bold text-slate-900">+₹50 (Priority Air)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="rupee">₹{deliveryFee}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="font-bold text-slate-900">Cash on Delivery</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-slate-900">
                <span>Amount Payable on Delivery:</span>
                <span className="text-lg text-slate-950 rupee">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Selected Address preview */}
            {selectedAddress && (
              <div className="p-2.5 bg-slate-50 rounded text-[11px] border border-slate-200/80">
                <span className="font-bold text-slate-800 block mb-0.5">Shipping to:</span>
                <div className="text-slate-600 leading-tight">
                  {selectedAddress.name} ({selectedAddress.phone})<br />
                  {selectedAddress.address_line1}, {selectedAddress.city} - {selectedAddress.pincode}
                </div>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || !selectedAddressId}
              className="btn-amber w-full py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm Cash on Delivery Order'} &rarr;
            </button>

            <div className="text-[10px] text-slate-400 text-center leading-tight">
              By confirming, you agree to receive Delhivery shipment tracking updates via SMS &amp; WhatsApp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
