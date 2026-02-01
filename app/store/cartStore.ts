'use client';

import { create } from 'zustand';
import { cartDB, CartItem, SavedItem, RecentlyViewedItem, createCartSyncChannel } from '../lib/db';
import { validatePromoCode, detectBundleDiscount, calculateTax, calculateShipping } from '../lib/promo';

interface CartState {
  // Cart items
  items: CartItem[];
  savedItems: SavedItem[];
  recentlyViewed: RecentlyViewedItem[];
  
  // UI state
  isOpen: boolean;
  isLoading: boolean;
  
  // Promo code
  promoCode: string | null;
  promoDiscount: number;
  promoMessage: string;
  
  // Calculated values
  subtotal: number;
  bundleDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Save for later
  moveToSaved: (id: string) => Promise<void>;
  moveToCart: (id: string) => Promise<void>;
  removeSaved: (id: string) => Promise<void>;
  
  // Recently viewed
  addRecentlyViewed: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => Promise<void>;
  
  // Promo code
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  
  // UI actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Sync
  loadFromDB: () => Promise<void>;
  calculateTotals: () => void;
}

let syncChannel: BroadcastChannel | null = null;

export const useCartStore = create<CartState>((set, get) => {
  // Initialize sync channel
  if (typeof window !== 'undefined') {
    syncChannel = createCartSyncChannel();
    
    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        if (event.data.type === 'cart-updated') {
          get().loadFromDB();
        }
      };
    }
  }

  const broadcastUpdate = () => {
    if (syncChannel) {
      syncChannel.postMessage({ type: 'cart-updated' });
    }
  };

  const calculateTotals = () => {
    const { items, promoCode, promoDiscount } = get();
    
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const bundleDiscount = detectBundleDiscount(items.length);
    const bundleDiscountAmount = (subtotal * bundleDiscount) / 100;
    
    const afterBundleDiscount = subtotal - bundleDiscountAmount;
    const afterPromoDiscount = afterBundleDiscount - promoDiscount;
    
    const tax = calculateTax(afterPromoDiscount);
    const shipping = calculateShipping(subtotal, items.length);
    const total = Math.max(0, afterPromoDiscount + tax + shipping);
    
    set({ subtotal, bundleDiscount, tax, shipping, total });
  };

  return {
    // Initial state
    items: [],
    savedItems: [],
    recentlyViewed: [],
    isOpen: false,
    isLoading: false,
    promoCode: null,
    promoDiscount: 0,
    promoMessage: '',
    subtotal: 0,
    bundleDiscount: 0,
    tax: 0,
    shipping: 0,
    total: 0,

    // Add item to cart
    addItem: async (itemData) => {
      try {
        // Ensure DB is initialized
        await cartDB.init();
        
        const { items } = get();
        
        // Generate unique ID based on product and variants
        const variantKey = `${itemData.selectedColor || ''}-${itemData.selectedMaterial || ''}-${itemData.selectedSize || ''}`;
        const id = `${itemData.productId}-${variantKey}`;
        
        // Check if item already exists
        const existingItem = items.find(item => item.id === id);
        
        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = Math.min(
            existingItem.quantity + itemData.quantity,
            itemData.maxQuantity
          );
          await get().updateQuantity(id, newQuantity);
          return;
        }
        
        // Add new item
        const newItem: CartItem = {
          ...itemData,
          id,
          addedAt: Date.now(),
        };
        
        // Optimistic update
        set({ items: [...items, newItem] });
        
        try {
          await cartDB.saveCartItem(newItem);
          get().calculateTotals();
          broadcastUpdate();
        } catch (error) {
          // Rollback on error
          set({ items: items.filter(item => item.id !== id) });
          console.error('Failed to add item to cart:', error);
          throw error;
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        throw new Error('Unable to add item to cart. Please refresh the page and try again.');
      }
    },

    // Update item quantity
    updateQuantity: async (id, quantity) => {
      const { items } = get();
      const item = items.find(i => i.id === id);
      
      if (!item) return;
      
      // Validate quantity
      const validQuantity = Math.max(1, Math.min(quantity, item.maxQuantity));
      const previousQuantity = item.quantity;
      
      // Optimistic update
      const updatedItems = items.map(i =>
        i.id === id ? { ...i, quantity: validQuantity } : i
      );
      set({ items: updatedItems });
      
      try {
        await cartDB.saveCartItem({ ...item, quantity: validQuantity });
        get().calculateTotals();
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        const rolledBackItems = items.map(i =>
          i.id === id ? { ...i, quantity: previousQuantity } : i
        );
        set({ items: rolledBackItems });
        console.error('Failed to update quantity:', error);
        throw error;
      }
    },

    // Remove item from cart
    removeItem: async (id) => {
      const { items } = get();
      const previousItems = [...items];
      
      // Optimistic update
      set({ items: items.filter(item => item.id !== id) });
      
      try {
        await cartDB.removeCartItem(id);
        get().calculateTotals();
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ items: previousItems });
        console.error('Failed to remove item:', error);
        throw error;
      }
    },

    // Clear entire cart
    clearCart: async () => {
      const { items } = get();
      const previousItems = [...items];
      
      // Optimistic update
      set({ items: [], promoCode: null, promoDiscount: 0, promoMessage: '' });
      
      try {
        await cartDB.clearCart();
        get().calculateTotals();
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ items: previousItems });
        console.error('Failed to clear cart:', error);
        throw error;
      }
    },

    // Move item to saved for later
    moveToSaved: async (id) => {
      const { items, savedItems } = get();
      const item = items.find(i => i.id === id);
      
      if (!item) return;
      
      const savedItem: SavedItem = {
        ...item,
        savedAt: Date.now(),
      };
      
      // Optimistic update
      set({
        items: items.filter(i => i.id !== id),
        savedItems: [...savedItems, savedItem],
      });
      
      try {
        await Promise.all([
          cartDB.removeCartItem(id),
          cartDB.saveSavedItem(savedItem),
        ]);
        get().calculateTotals();
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ items, savedItems });
        console.error('Failed to move to saved:', error);
        throw error;
      }
    },

    // Move saved item back to cart
    moveToCart: async (id) => {
      const { items, savedItems } = get();
      const savedItem = savedItems.find(i => i.id === id);
      
      if (!savedItem) return;
      
      const { savedAt, ...cartItem } = savedItem;
      const itemWithNewTimestamp: CartItem = {
        ...cartItem,
        addedAt: Date.now(),
      };
      
      // Optimistic update
      set({
        savedItems: savedItems.filter(i => i.id !== id),
        items: [...items, itemWithNewTimestamp],
      });
      
      try {
        await Promise.all([
          cartDB.removeSavedItem(id),
          cartDB.saveCartItem(itemWithNewTimestamp),
        ]);
        get().calculateTotals();
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ items, savedItems });
        console.error('Failed to move to cart:', error);
        throw error;
      }
    },

    // Remove from saved items
    removeSaved: async (id) => {
      const { savedItems } = get();
      const previousSaved = [...savedItems];
      
      // Optimistic update
      set({ savedItems: savedItems.filter(i => i.id !== id) });
      
      try {
        await cartDB.removeSavedItem(id);
        broadcastUpdate();
      } catch (error) {
        // Rollback on error
        set({ savedItems: previousSaved });
        console.error('Failed to remove saved item:', error);
        throw error;
      }
    },

    // Add to recently viewed
    addRecentlyViewed: async (itemData) => {
      const item: RecentlyViewedItem = {
        ...itemData,
        viewedAt: Date.now(),
      };
      
      try {
        await cartDB.addRecentlyViewed(item);
        const recentlyViewed = await cartDB.getRecentlyViewed();
        set({ recentlyViewed });
      } catch (error) {
        console.error('Failed to add to recently viewed:', error);
      }
    },

    // Apply promo code
    applyPromoCode: (code) => {
      const { subtotal, bundleDiscount } = get();
      const afterBundleDiscount = subtotal - (subtotal * bundleDiscount) / 100;
      
      const result = validatePromoCode(code, afterBundleDiscount);
      
      if (result.valid) {
        set({
          promoCode: code.toUpperCase(),
          promoDiscount: result.discount,
          promoMessage: result.message,
        });
        get().calculateTotals();
      } else {
        set({
          promoCode: null,
          promoDiscount: 0,
          promoMessage: result.message,
        });
      }
    },

    // Remove promo code
    removePromoCode: () => {
      set({ promoCode: null, promoDiscount: 0, promoMessage: '' });
      get().calculateTotals();
    },

    // UI actions
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    // Load from IndexedDB
    loadFromDB: async () => {
      set({ isLoading: true });
      
      try {
        const [items, savedItems, recentlyViewed] = await Promise.all([
          cartDB.getCartItems(),
          cartDB.getSavedItems(),
          cartDB.getRecentlyViewed(),
        ]);
        
        set({ items, savedItems, recentlyViewed, isLoading: false });
        get().calculateTotals();
      } catch (error) {
        console.error('Failed to load from DB:', error);
        set({ isLoading: false });
      }
    },

    calculateTotals,
  };
});

// Initialize cart from DB on client side
if (typeof window !== 'undefined') {
  useCartStore.getState().loadFromDB();
}
