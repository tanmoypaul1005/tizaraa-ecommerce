// IndexedDB utility for persistent cart storage
const DB_NAME = 'TizaraaDB';
const DB_VERSION = 1;
const CART_STORE = 'cart';
const SAVED_STORE = 'savedForLater';
const RECENT_STORE = 'recentlyViewed';

export interface CartItem {
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

export interface SavedItem extends CartItem {
  savedAt: number;
}

export interface RecentlyViewedItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  viewedAt: number;
}

class CartDB {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('IndexedDB not available in server environment'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Cart store
        if (!db.objectStoreNames.contains(CART_STORE)) {
          const cartStore = db.createObjectStore(CART_STORE, { keyPath: 'id' });
          cartStore.createIndex('productId', 'productId', { unique: false });
          cartStore.createIndex('addedAt', 'addedAt', { unique: false });
        }

        // Saved for later store
        if (!db.objectStoreNames.contains(SAVED_STORE)) {
          const savedStore = db.createObjectStore(SAVED_STORE, { keyPath: 'id' });
          savedStore.createIndex('productId', 'productId', { unique: false });
          savedStore.createIndex('savedAt', 'savedAt', { unique: false });
        }

        // Recently viewed store
        if (!db.objectStoreNames.contains(RECENT_STORE)) {
          const recentStore = db.createObjectStore(RECENT_STORE, { keyPath: 'productId' });
          recentStore.createIndex('viewedAt', 'viewedAt', { unique: false });
        }
      };
    });

    return this.initPromise;
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async set<T>(storeName: string, value: T): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(storeName: string, key: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // Cart-specific methods
  async getCartItems(): Promise<CartItem[]> {
    return this.getAll<CartItem>(CART_STORE);
  }

  async saveCartItem(item: CartItem): Promise<void> {
    return this.set(CART_STORE, item);
  }

  async removeCartItem(id: string): Promise<void> {
    return this.delete(CART_STORE, id);
  }

  async clearCart(): Promise<void> {
    return this.clear(CART_STORE);
  }

  // Saved for later methods
  async getSavedItems(): Promise<SavedItem[]> {
    return this.getAll<SavedItem>(SAVED_STORE);
  }

  async saveSavedItem(item: SavedItem): Promise<void> {
    return this.set(SAVED_STORE, item);
  }

  async removeSavedItem(id: string): Promise<void> {
    return this.delete(SAVED_STORE, id);
  }

  // Recently viewed methods
  async getRecentlyViewed(): Promise<RecentlyViewedItem[]> {
    const items = await this.getAll<RecentlyViewedItem>(RECENT_STORE);
    return items.sort((a, b) => b.viewedAt - a.viewedAt).slice(0, 10);
  }

  async addRecentlyViewed(item: RecentlyViewedItem): Promise<void> {
    await this.set(RECENT_STORE, item);
    
    // Keep only last 10 items
    const items = await this.getAll<RecentlyViewedItem>(RECENT_STORE);
    if (items.length > 10) {
      const sorted = items.sort((a, b) => b.viewedAt - a.viewedAt);
      const toRemove = sorted.slice(10);
      for (const item of toRemove) {
        await this.delete(RECENT_STORE, item.productId);
      }
    }
  }
}

export const cartDB = new CartDB();

// Cross-tab synchronization using BroadcastChannel
export const createCartSyncChannel = () => {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) {
    return null;
  }
  return new BroadcastChannel('cart-sync');
};
