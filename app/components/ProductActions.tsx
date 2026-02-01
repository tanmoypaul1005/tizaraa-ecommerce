'use client';

import React from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';

interface ProductActionsProps {
  isAvailable: boolean;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onShare: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isAvailable,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onShare,
}) => {
  return (
    <div className="space-y-3">
      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
          isAvailable
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:shadow-xl active:scale-[0.98]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isAvailable ? 'Add to Cart' : 'Out of Stock'}
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onToggleWishlist}
          className={`py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
            isInWishlist
              ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
              : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-600' : ''}`} />
          {isInWishlist ? 'Saved' : 'Save'}
        </button>

        <button
          onClick={onShare}
          className="py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
