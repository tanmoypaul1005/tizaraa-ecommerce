'use client';

import { create } from 'zustand';
import { Product } from '../data/products';

interface ComparisonState {
  products: Product[];
  isOpen: boolean;
  maxProducts: number;
  
  // Actions
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearComparison: () => void;
  toggleProduct: (product: Product) => void;
  isInComparison: (productId: string) => boolean;
  canAddMore: () => boolean;
  
  // UI actions
  openComparison: () => void;
  closeComparison: () => void;
  toggleComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  products: [],
  isOpen: false,
  maxProducts: 3,

  // Add product to comparison
  addProduct: (product) => {
    const { products, maxProducts } = get();
    
    // Check if already in comparison
    if (products.some(p => p.id === product.id)) {
      return;
    }
    
    // Check max limit
    if (products.length >= maxProducts) {
      alert(`You can only compare up to ${maxProducts} products at a time`);
      return;
    }
    
    set({ products: [...products, product] });
  },

  // Remove product from comparison
  removeProduct: (productId) => {
    const { products } = get();
    set({ products: products.filter(p => p.id !== productId) });
  },

  // Clear all products from comparison
  clearComparison: () => {
    set({ products: [] });
  },

  // Toggle product in comparison
  toggleProduct: (product) => {
    const { isInComparison, addProduct, removeProduct } = get();
    
    if (isInComparison(product.id)) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  },

  // Check if product is in comparison
  isInComparison: (productId) => {
    const { products } = get();
    return products.some(p => p.id === productId);
  },

  // Check if can add more products
  canAddMore: () => {
    const { products, maxProducts } = get();
    return products.length < maxProducts;
  },

  // UI actions
  openComparison: () => set({ isOpen: true }),
  closeComparison: () => set({ isOpen: false }),
  toggleComparison: () => set((state) => ({ isOpen: !state.isOpen })),
}));
