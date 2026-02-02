'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Types for cart operations
export interface ServerCartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
  selectedSize?: string;
  maxQuantity: number;
  addedAt: number;
}

export interface CartState {
  items: ServerCartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

// Cookie-based cart storage (can be replaced with database)
const CART_COOKIE_NAME = 'tizaraa_cart';
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Helper to get cart from cookies
async function getCartFromCookies(): Promise<CartState> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);
  
  if (!cartCookie?.value) {
    return { items: [], promoCode: null, promoDiscount: 0 };
  }
  
  try {
    return JSON.parse(cartCookie.value);
  } catch {
    return { items: [], promoCode: null, promoDiscount: 0 };
  }
}

// Helper to save cart to cookies
async function saveCartToCookies(cart: CartState) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    maxAge: CART_COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

// Server Action: Add item to cart
export async function addToCartAction(item: Omit<ServerCartItem, 'id' | 'addedAt'>) {
  try {
    const cart = await getCartFromCookies();
    
    // Generate unique ID
    const variantKey = `${item.selectedColor || ''}-${item.selectedMaterial || ''}-${item.selectedSize || ''}`;
    const id = `${item.productId}-${variantKey}`;
    
    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(i => i.id === id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = Math.min(
        existingItem.quantity + item.quantity,
        item.maxQuantity
      );
      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      };
    } else {
      // Add new item
      const newItem: ServerCartItem = {
        ...item,
        id,
        addedAt: Date.now(),
      };
      cart.items.push(newItem);
    }
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}

// Server Action: Update item quantity
export async function updateQuantityAction(id: string, quantity: number) {
  try {
    const cart = await getCartFromCookies();
    
    const itemIndex = cart.items.findIndex(i => i.id === id);
    if (itemIndex === -1) {
      return { success: false, error: 'Item not found' };
    }
    
    const item = cart.items[itemIndex];
    const validQuantity = Math.max(1, Math.min(quantity, item.maxQuantity));
    
    cart.items[itemIndex] = {
      ...item,
      quantity: validQuantity,
    };
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to update quantity' };
  }
}

// Server Action: Remove item from cart
export async function removeFromCartAction(id: string) {
  try {
    const cart = await getCartFromCookies();
    
    cart.items = cart.items.filter(i => i.id !== id);
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to remove item' };
  }
}

// Server Action: Clear cart
export async function clearCartAction() {
  try {
    const cart: CartState = { items: [], promoCode: null, promoDiscount: 0 };
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to clear cart' };
  }
}

// Server Action: Apply promo code
export async function applyPromoCodeAction(code: string) {
  try {
    const cart = await getCartFromCookies();
    
    // Promo code validation logic
    const promoCode = code.toUpperCase();
    let discount = 0;
    let message = '';
    let valid = false;
    
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    switch (promoCode) {
      case 'SAVE10':
        if (subtotal >= 50) {
          discount = subtotal * 0.1;
          message = '10% discount applied!';
          valid = true;
        } else {
          message = 'Minimum order of $50 required';
        }
        break;
      
      case 'SAVE20':
        if (subtotal >= 100) {
          discount = subtotal * 0.2;
          message = '20% discount applied!';
          valid = true;
        } else {
          message = 'Minimum order of $100 required';
        }
        break;
      
      case 'FREESHIP':
        discount = 0; // Shipping discount handled separately
        message = 'Free shipping applied!';
        valid = true;
        break;
      
      default:
        message = 'Invalid promo code';
    }
    
    if (valid) {
      cart.promoCode = promoCode;
      cart.promoDiscount = discount;
    }
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, valid, discount, message, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, valid: false, discount: 0, message: 'Failed to apply promo code' };
  }
}

// Server Action: Remove promo code
export async function removePromoCodeAction() {
  try {
    const cart = await getCartFromCookies();
    
    cart.promoCode = null;
    cart.promoDiscount = 0;
    
    await saveCartToCookies(cart);
    revalidatePath('/');
    
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to remove promo code' };
  }
}

// Server Action: Get cart
export async function getCartAction() {
  try {
    const cart = await getCartFromCookies();
    return { success: true, cart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to get cart' };
  }
}

// Server Action: Sync cart (merge client-side cart with server cart)
export async function syncCartAction(clientCart: CartState) {
  try {
    const serverCart = await getCartFromCookies();
    
    // Merge logic: prefer client cart items, but keep server items not in client
    const mergedItems = [...clientCart.items];
    
    for (const serverItem of serverCart.items) {
      const existsInClient = mergedItems.some(item => item.id === serverItem.id);
      if (!existsInClient) {
        mergedItems.push(serverItem);
      }
    }
    
    const mergedCart: CartState = {
      items: mergedItems,
      promoCode: clientCart.promoCode || serverCart.promoCode,
      promoDiscount: clientCart.promoDiscount || serverCart.promoDiscount,
    };
    
    await saveCartToCookies(mergedCart);
    revalidatePath('/');
    
    return { success: true, cart: mergedCart };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to sync cart' };
  }
}

// Server Action: Calculate cart totals
export async function calculateCartTotalsAction() {
  try {
    const cart = await getCartFromCookies();
    
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Bundle discount (example: 5% off for 3+ items, 10% off for 5+ items)
    let bundleDiscount = 0;
    if (cart.items.length >= 5) {
      bundleDiscount = 10;
    } else if (cart.items.length >= 3) {
      bundleDiscount = 5;
    }
    const bundleDiscountAmount = (subtotal * bundleDiscount) / 100;
    
    // Apply promo discount
    const afterDiscount = subtotal - bundleDiscountAmount - cart.promoDiscount;
    
    // Tax (example: 8%)
    const tax = afterDiscount * 0.08;
    
    // Shipping (free over $100, otherwise $10)
    const shipping = cart.promoCode === 'FREESHIP' || afterDiscount >= 100 ? 0 : 10;
    
    const total = Math.max(0, afterDiscount + tax + shipping);
    
    return {
      success: true,
      totals: {
        subtotal,
        bundleDiscount,
        bundleDiscountAmount,
        promoDiscount: cart.promoDiscount,
        tax,
        shipping,
        total,
      },
    };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to calculate totals' };
  }
}
