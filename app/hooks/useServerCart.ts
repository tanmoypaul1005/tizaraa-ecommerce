'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import {
  addToCartAction,
  updateQuantityAction,
  removeFromCartAction,
  clearCartAction,
  applyPromoCodeAction,
  removePromoCodeAction,
  getCartAction,
  syncCartAction,
  ServerCartItem,
} from '../actions/cartActions';

export function useServerCart() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const cartStore = useCartStore();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync cart when coming back online
  useEffect(() => {
    if (isOnline && !isSyncing) {
      syncWithServer();
    }
  }, [isOnline]);

  const syncWithServer = async () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);
    try {
      const clientCart = {
        items: cartStore.items.map(item => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedMaterial: item.selectedMaterial,
          selectedSize: item.selectedSize,
          maxQuantity: item.maxQuantity,
          addedAt: item.addedAt,
        })),
        promoCode: cartStore.promoCode,
        promoDiscount: cartStore.promoDiscount,
      };

      const result = await syncCartAction(clientCart);
      
      if (result.success && result.cart) {
        // Update local store with merged cart
        console.log('Cart synced with server');
      }
    } catch (error) {
      console.error('Failed to sync cart:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const addItemWithServerAction = async (item: Omit<ServerCartItem, 'id' | 'addedAt'>) => {
    if (!isOnline) {
      // Use local IndexedDB when offline
      return cartStore.addItem(item);
    }

    try {
      const result = await addToCartAction(item);
      
      if (result.success) {
        // Also update local store for immediate UI feedback
        await cartStore.addItem(item);
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Server action failed, falling back to local:', error);
      // Fallback to local
      return cartStore.addItem(item);
    }
  };

  const updateQuantityWithServerAction = async (id: string, quantity: number) => {
    if (!isOnline) {
      return cartStore.updateQuantity(id, quantity);
    }

    try {
      const result = await updateQuantityAction(id, quantity);
      
      if (result.success) {
        await cartStore.updateQuantity(id, quantity);
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Server action failed, falling back to local:', error);
      return cartStore.updateQuantity(id, quantity);
    }
  };

  const removeItemWithServerAction = async (id: string) => {
    if (!isOnline) {
      return cartStore.removeItem(id);
    }

    try {
      const result = await removeFromCartAction(id);
      
      if (result.success) {
        await cartStore.removeItem(id);
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Server action failed, falling back to local:', error);
      return cartStore.removeItem(id);
    }
  };

  const clearCartWithServerAction = async () => {
    if (!isOnline) {
      return cartStore.clearCart();
    }

    try {
      const result = await clearCartAction();
      
      if (result.success) {
        await cartStore.clearCart();
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Server action failed, falling back to local:', error);
      return cartStore.clearCart();
    }
  };

  const applyPromoCodeWithServerAction = async (code: string) => {
    if (!isOnline) {
      // Use local promo validation
      cartStore.applyPromoCode(code);
      return;
    }

    try {
      const result = await applyPromoCodeAction(code);
      
      if (result.success) {
        // Update local store
        cartStore.applyPromoCode(code);
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Server action failed, falling back to local:', error);
      cartStore.applyPromoCode(code);
    }
  };

  return {
    isOnline,
    isSyncing,
    syncWithServer,
    addItem: addItemWithServerAction,
    updateQuantity: updateQuantityWithServerAction,
    removeItem: removeItemWithServerAction,
    clearCart: clearCartWithServerAction,
    applyPromoCode: applyPromoCodeWithServerAction,
  };
}
