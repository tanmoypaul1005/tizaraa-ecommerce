'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartBadge: React.FC = () => {
  const { items, openCart } = useCartStore();
  const itemCount = items?.length 

  return (
    <button
      onClick={openCart}
      className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};
