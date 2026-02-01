'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, Heart, AlertTriangle } from 'lucide-react';
import { CartItem } from '../lib/db';
import { useCartStore } from '../store/cartStore';

interface CartItemComponentProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemComponentProps> = ({ item }) => {
  const { updateQuantity, removeItem, moveToSaved } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  const handleMoveToSaved = async () => {
    setIsUpdating(true);
    try {
      await moveToSaved(item.id);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  const isLowStock = item.maxQuantity <= 5;

  return (
    <div className={`flex gap-4 p-4 border-b border-gray-200 last:border-0 ${isUpdating ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
        
        {/* Variants */}
        <div className="flex flex-wrap gap-2 mt-1">
          {item.selectedColor && (
            <span className="text-xs text-gray-600">
              Color: <span className="font-medium">{item.selectedColor}</span>
            </span>
          )}
          {item.selectedMaterial && (
            <span className="text-xs text-gray-600">
              Material: <span className="font-medium">{item.selectedMaterial}</span>
            </span>
          )}
          {item.selectedSize && (
            <span className="text-xs text-gray-600">
              Size: <span className="font-medium uppercase">{item.selectedSize}</span>
            </span>
          )}
        </div>

        {/* Low Stock Warning */}
        {isLowStock && (
          <div className="flex items-center gap-1 mt-1">
            <AlertTriangle className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-orange-600 font-medium">
              Only {item.maxQuantity} left!
            </span>
          </div>
        )}

        {/* Quantity Controls and Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3 h-3 text-black" />
            </button>
            <span className="w-8 text-center font-medium text-sm text-black">{item?.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || item.quantity >= item.maxQuantity}
              className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3 h-3 text-black" />
            </button>
          </div>

          <span className="font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleMoveToSaved}
            disabled={isUpdating}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            <Heart className="w-3 h-3" />
            Save for later
          </button>
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
