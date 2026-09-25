import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Check,
  ChevronRight,
  Share2,
  Banknote,
  AlertCircle
} from 'lucide-react';
import { productService } from '../services/productService';
import { Product, ProductVariant, Review } from '../types/database.types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/product/ProductGrid';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pincode checker state
  const [pincode, setPincode] = useState(() => localStorage.getItem('nexora_pincode') || '560001');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Reviews mock list
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);

    productService.getProductBySlug(slug).then(prod => {
      setProduct(prod);
      if (prod) {
        setSelectedVariant(prod.variants?.[0] || null);
        setActiveImageIdx(0);

        // Fetch related products
        productService.getProducts({ categorySlug: prod.category?.slug, limit: 6 }).then(res => {
          setRelatedProducts(res.products.filter(p => p.id !== prod.id));
        });

        // Initialize mock reviews for the product
        setReviews([
          {
            id: 'rev-1',
            product_id: prod.id,
            user_id: 'usr-1',
            user_name: 'Aditya Verma (Mumbai)',
            rating: 5,
            title: 'Outstanding quality and prompt COD delivery!',
            comment: 'Arrived within 48 hours in Mumbai via Delhivery. Sealed box, genuine Indian warranty registered successfully. Cash on delivery made it completely worry-free.',
            is_verified_purchase: true,
            helpful_votes: 38,
            created_at: '2026-02-14'
          },
          {
            id: 'rev-2',
            product_id: prod.id,
            user_id: 'usr-2',
            user_name: 'Sneha Patel (Ahmedabad)',
            rating: 4,
            title: 'Value for money, great performance',
            comment: 'Performance matches the technical specs accurately. The build feels premium. Would recommend to anyone looking for authentic gadgets in India.',
            is_verified_purchase: true,
            helpful_votes: 14,
            created_at: '2026-02-18'
          }
        ]);
      }
      setIsLoading(false);
    });
  }, [slug]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincodeInput)) {
      setPincode(pincodeInput);
      localStorage.setItem('nexora_pincode', pincodeInput);
      setPincodeStatus(`Available! Delivery within 2-3 business days with Free COD.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      product_id: product.id,
      user_id: 'demo_user',
      user_name: 'You (Verified Buyer)',
      rating: newReviewRating,
      title: newReviewTitle || 'Great Product',
      comment: newReviewComment,
      is_verified_purchase: true,
      helpful_votes: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  if (isLoading) {
    return (
      <div className="container-dense py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          <div className="aspect-square bg-slate-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-24 bg-slate-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-dense py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">The item you are searching for might have been retired or moved.</p>
        <Link to="/shop" className="btn-primary text-xs">Return to Marketplace Shop</Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ id: 'default', product_id: product.id, image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', alt_text: product.title, display_order: 0, is_primary: true }];

  const currentPrice = product.price + (selectedVariant?.price_adjustment || 0);
  const currentMrp = product.mrp + (selectedVariant?.price_adjustment || 0);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="container-dense py-3 sm:py-4 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to="/shop" className="hover:text-slate-900">Shop</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to={`/shop?category=${product.category.slug}`} className="hover:text-slate-900 truncate">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 bg-white border border-slate-200 rounded-lg p-3 sm:p-5 shadow-xs">
        {/* Left: Gallery (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-2">
          {/* Main Showcase Image */}
          <div className="relative aspect-square bg-slate-50 border border-slate-200 rounded overflow-hidden flex items-center justify-center">
            <img
              src={images[activeImageIdx]?.image_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3Ccircle cx='300' cy='270' r='70' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='400' font-family='sans-serif' font-size='18' font-weight='bold' fill='%2364748b' text-anchor='middle'%3ENEXORA VERIFIED COMMERCIAL PRODUCT%3C/text%3E%3C/svg%3E"}
              alt={images[activeImageIdx]?.alt_text || product.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3Ccircle cx='300' cy='270' r='70' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='400' font-family='sans-serif' font-size='18' font-weight='bold' fill='%2364748b' text-anchor='middle'%3ENEXORA VERIFIED COMMERCIAL PRODUCT%3C/text%3E%3C/svg%3E";
              }}
              className="w-full h-full object-contain"
            />
            {product.discount_percentage > 0 && (
              <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow">
                {product.discount_percentage}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white text-slate-500 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded border overflow-hidden shrink-0 transition-all ${
                    idx === activeImageIdx ? 'border-nexora-600 ring-1 ring-nexora-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-600">
            <div className="p-1.5 bg-slate-50 rounded">
              <Banknote className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <span>Cash on Delivery</span>
            </div>
            <div className="p-1.5 bg-slate-50 rounded">
              <RotateCcw className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <span>{product.return_policy_days} Days Returns</span>
            </div>
            <div className="p-1.5 bg-slate-50 rounded">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span>{product.warranty_info}</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Box (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Brand & SKU */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <Link to={`/shop?brand=${product.brand?.slug}`} className="font-bold text-nexora-600 uppercase tracking-wider hover:underline">
                Brand: {product.brand?.name || 'GENUINE'}
              </Link>
              <span className="text-[11px] font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-slate-500">
                ({product.reviews_count.toLocaleString('en-IN')} ratings &amp; {reviews.length} reviews)
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> In Stock
              </span>
            </div>

            {/* Pricing Section */}
            <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-950 rupee">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {currentMrp > currentPrice && (
                  <span className="text-sm text-slate-400 line-through rupee">
                    ₹{currentMrp.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount_percentage > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Save ₹{(currentMrp - currentPrice).toLocaleString('en-IN')} ({product.discount_percentage}% OFF)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Inclusive of all Indian taxes • Free express courier delivery on orders above ₹499
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Select Edition / Variant:
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`text-xs py-1.5 px-3 rounded border transition-all text-left ${
                          isSelected
                            ? 'border-nexora-600 bg-nexora-50 text-nexora-900 font-bold ring-1 ring-nexora-600'
                            : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                        }`}
                      >
                        <div>{variant.variant_name}</div>
                        {variant.price_adjustment !== 0 && (
                          <div className="text-[10px] text-slate-500">
                            {variant.price_adjustment > 0 ? `+₹${variant.price_adjustment.toLocaleString('en-IN')}` : `-₹${Math.abs(variant.price_adjustment).toLocaleString('en-IN')}`}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Indian Pincode Delivery Estimator */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-nexora-600" /> Delivery &amp; COD Availability
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput || pincode}
                  onChange={e => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-nexora-600"
                />
                <button type="submit" className="btn-outline text-xs px-3 py-1 font-bold shrink-0">
                  Check
                </button>
              </form>
              {pincodeStatus ? (
                <div className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {pincodeStatus}
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-nexora-600" /> Delhivery Express to {pincode} in 2-3 business days
                </div>
              )}
            </div>

            {/* Key Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Key Highlights
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-nexora-600 mt-1.5 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Purchase Action Buttons */}
          <div className="pt-4 border-t border-slate-200 hidden sm:flex items-center gap-3">
            <div className="flex items-center border border-slate-300 rounded bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-amber flex-1 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="btn-primary flex-1 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow"
            >
              Buy Now with COD
            </button>
          </div>
        </div>
      </div>

      {/* Specifications & Description Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
        <h2 className="font-extrabold text-sm sm:text-base text-slate-900 mb-3 pb-2 border-b border-slate-200">
          Technical Specifications &amp; Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
          {Object.entries(product.specifications || {}).map(([key, val]) => (
            <div key={key} className="flex py-1.5 border-b border-slate-100">
              <span className="w-1/3 text-slate-500 font-medium shrink-0">{key}</span>
              <span className="w-2/3 text-slate-900 font-semibold">{val}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 leading-relaxed">
          <h3 className="font-bold text-slate-900 mb-1">Product Description</h3>
          <p>{product.description}</p>
        </div>
      </div>

      {/* Verified Customer Reviews Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
              Customer Ratings &amp; Reviews
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-slate-500">Based on verified Indian marketplace purchases</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-outline text-xs py-1 px-3 self-start sm:self-auto font-bold"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-3">
          {reviews.map(rev => (
            <div key={rev.id} className="p-3 bg-slate-50 border border-slate-100 rounded text-xs space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rev.rating ? 'fill-current text-amber-500' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">{rev.title}</span>
                </div>
                <span className="text-[10px] text-slate-400">{rev.created_at}</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">{rev.comment}</p>
              <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                <span>{rev.user_name}</span>
                {rev.is_verified_purchase && (
                  <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                    • <Check className="w-2.5 h-2.5" /> Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
              Similar Products You Might Like
            </h2>
            <Link to={`/shop?category=${product.category?.slug}`} className="text-xs font-bold text-nexora-600 hover:underline">
              View More &rarr;
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bottom Bar */}
      <div className="sm:hidden fixed bottom-12 left-0 right-0 z-30 bg-white border-t border-slate-200 p-2 shadow-lg flex items-center gap-2 safe-bottom">
        <button
          onClick={handleAddToCart}
          className="btn-amber flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="btn-primary flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1"
        >
          Buy Now (COD)
        </button>
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 shadow-xl border border-slate-200 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Write a Customer Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewReviewRating(r)}
                      className={`p-1.5 rounded border text-center font-bold ${
                        newReviewRating === r ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-white border-slate-200'
                      }`}
                    >
                      {r} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellent build quality, loved the battery life"
                  value={newReviewTitle}
                  onChange={e => setNewReviewTitle(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Detailed Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details of your experience with delivery and product performance..."
                  value={newReviewComment}
                  onChange={e => setNewReviewComment(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-nexora-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="btn-outline text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
