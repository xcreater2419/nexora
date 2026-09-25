import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, WishlistItem } from '../types/database.types';

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const WISHLIST_STORAGE_KEY = 'nexora_wishlist_items';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save wishlist:', err);
    }
  }, [items]);

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.product_id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setItems(prev => {
      if (prev.some(item => item.product_id === product.id)) {
        return prev.filter(item => item.product_id !== product.id);
      }
      const newItem: WishlistItem = {
        id: `wl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        wishlist_id: 'local_wishlist',
        product_id: product.id,
        created_at: new Date().toISOString(),
        product
      };
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(item => item.product_id !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
