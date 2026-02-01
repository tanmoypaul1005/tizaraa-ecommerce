'use client';

import { create } from 'zustand';
import { cartDB, WishlistItem } from '../lib/db';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  
  // Actions
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loadFromDB: () => Promise<void>;
}

let syncChannel: BroadcastChannel | null = null;

export const useWishlistStore = create<WishlistState>((set, get) => {
  // Initialize sync channel
  if (typeof window !== 'undefined') {
    syncChannel = new BroadcastChannel('wishlist-sync');
    
    syncChannel.onmessage = (event) => {
      if (event.data.type === 'wishlist-updated') {
        get().loadFromDB();
      }
    };
  }

  const broadcastUpdate = () => {
    if (syncChannel) {
      syncChannel.postMessage({ type: 'wishlist-updated' });
    }
  };

  return {
    items: [],
    isLoading: false,

    // Add item to wishlist
    addToWishlist: async (itemData) => {
      try {
        await cartDB.init();
        
        const newItem: WishlistItem = {
          ...itemData,
          addedAt: Date.now(),
        };
        
        // Optimistic update
        const { items } = get();
        set({ items: [...items, newItem] });
        
        try {
          await cartDB.addToWishlist(newItem);
          broadcastUpdate();
        } catch (error) {
          // Rollback on error
          set({ items: items.filter(item => item.productId !== newItem.productId) });
          console.error('Failed to add to wishlist:', error);
          throw error;
        }
      } catch (error) {
        console.error('Failed to initialize wishlist:', error);
        throw new Error('Unable to add item to wishlist. Please refresh the page and try again.');
      }
    },

    // Remove item from wishlist
    removeFromWishlist: async (productId) => {
      const { items } = get();
      const previousItems = [...items];
      
      // Optimistic update
      set({ items: items.filter(item => item.productId !== productId) });
      
      try {
        await cartDB.removeFromWishlist(productId);
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ items: previousItems });
        console.error('Failed to remove from wishlist:', error);
        throw error;
      }
    },

    // Toggle wishlist (add if not present, remove if present)
    toggleWishlist: async (itemData) => {
      const { items } = get();
      const exists = items.some(item => item.productId === itemData.productId);
      
      if (exists) {
        await get().removeFromWishlist(itemData.productId);
      } else {
        await get().addToWishlist(itemData);
      }
    },

    // Check if item is in wishlist
    isInWishlist: (productId) => {
      const { items } = get();
      return items.some(item => item.productId === productId);
    },

    // Load from IndexedDB
    loadFromDB: async () => {
      set({ isLoading: true });
      
      try {
        const items = await cartDB.getWishlist();
        set({ items, isLoading: false });
      } catch (error) {
        console.error('Failed to load wishlist from DB:', error);
        set({ isLoading: false });
      }
    },
  };
});

// Initialize wishlist from DB on client side
if (typeof window !== 'undefined') {
  useWishlistStore.getState().loadFromDB();
}
