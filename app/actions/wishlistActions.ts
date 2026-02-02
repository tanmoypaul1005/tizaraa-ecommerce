'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface ServerWishlistItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  addedAt: number;
}

// Cookie-based wishlist storage
const WISHLIST_COOKIE_NAME = 'tizaraa_wishlist';
const WISHLIST_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

// Helper to get wishlist from cookies
async function getWishlistFromCookies(): Promise<ServerWishlistItem[]> {
  const cookieStore = await cookies();
  const wishlistCookie = cookieStore.get(WISHLIST_COOKIE_NAME);
  
  if (!wishlistCookie?.value) {
    return [];
  }
  
  try {
    return JSON.parse(wishlistCookie.value);
  } catch {
    return [];
  }
}

// Helper to save wishlist to cookies
async function saveWishlistToCookies(wishlist: ServerWishlistItem[]) {
  const cookieStore = await cookies();
  cookieStore.set(WISHLIST_COOKIE_NAME, JSON.stringify(wishlist), {
    maxAge: WISHLIST_COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

// Server Action: Add to wishlist
export async function addToWishlistAction(item: Omit<ServerWishlistItem, 'addedAt'>) {
  try {
    const wishlist = await getWishlistFromCookies();
    
    // Check if already in wishlist
    const exists = wishlist.some(i => i.productId === item.productId);
    
    if (!exists) {
      const newItem: ServerWishlistItem = {
        ...item,
        addedAt: Date.now(),
      };
      wishlist.push(newItem);
      
      await saveWishlistToCookies(wishlist);
      revalidatePath('/');
    }
    
    return { success: true, wishlist };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to add to wishlist' };
  }
}

// Server Action: Remove from wishlist
export async function removeFromWishlistAction(productId: string) {
  try {
    let wishlist = await getWishlistFromCookies();
    
    wishlist = wishlist.filter(i => i.productId !== productId);
    
    await saveWishlistToCookies(wishlist);
    revalidatePath('/');
    
    return { success: true, wishlist };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to remove from wishlist' };
  }
}

// Server Action: Toggle wishlist
export async function toggleWishlistAction(item: Omit<ServerWishlistItem, 'addedAt'>) {
  try {
    let wishlist = await getWishlistFromCookies();
    
    const index = wishlist.findIndex(i => i.productId === item.productId);
    
    if (index >= 0) {
      wishlist.splice(index, 1);
    } else {
      const newItem: ServerWishlistItem = {
        ...item,
        addedAt: Date.now(),
      };
      wishlist.push(newItem);
    }
    
    await saveWishlistToCookies(wishlist);
    revalidatePath('/');
    
    return { success: true, wishlist, isInWishlist: index < 0 };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to toggle wishlist' };
  }
}

// Server Action: Get wishlist
export async function getWishlistAction() {
  try {
    const wishlist = await getWishlistFromCookies();
    return { success: true, wishlist };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to get wishlist' };
  }
}

// Server Action: Clear wishlist
export async function clearWishlistAction() {
  try {
    await saveWishlistToCookies([]);
    revalidatePath('/');
    
    return { success: true, wishlist: [] };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to clear wishlist' };
  }
}

// Server Action: Check if in wishlist
export async function isInWishlistAction(productId: string) {
  try {
    const wishlist = await getWishlistFromCookies();
    const isInWishlist = wishlist.some(i => i.productId === productId);
    
    return { success: true, isInWishlist };
  } catch (error) {
    console.error('Server action error:', error);
    return { success: false, error: 'Failed to check wishlist' };
  }
}
