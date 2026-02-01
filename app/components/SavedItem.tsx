'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, X } from 'lucide-react';
import { SavedItem } from '../lib/db';
import { useCartStore } from '../store/cartStore';

interface SavedItemComponentProps {
  item: SavedItem;
}

export const SavedItemComponent: React.FC<SavedItemComponentProps> = ({ item }) => {
  const { moveToCart, removeSaved } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMoveToCart = async () => {
    setIsUpdating(true);
    try {
      await moveToCart(item.id);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeSaved(item.id);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`flex gap-3 p-3 border border-gray-200 rounded-lg ${isUpdating ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h4>
            <p className="text-sm font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleMoveToCart}
          disabled={isUpdating}
          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
        >
          <ShoppingCart className="w-3 h-3" />
          Move to cart
        </button>
      </div>
    </div>
  );
};
