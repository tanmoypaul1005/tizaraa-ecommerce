'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { shimmerBlurDataUrl } from '../lib/blur-placeholder';

export const WishlistBadge = () => {
  const { items } = useWishlistStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
        aria-label="Wishlist"
      >
        <Heart className="w-6 h-6" fill={'none'} />
        {items?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {items?.length}
          </span>
        )}
      </button>

      {/* Wishlist Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                My Wishlist ({items?.length})
              </h3>
            </div>
            
            {items?.length === 0 ? (
              <div className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 mb-2">Your wishlist is empty</p>
                <p className="text-sm text-gray-400">Add items you love to save them for later</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {items?.map((item) => (
                  <Link
                    key={item.productId}
                    href={`/product/${item?.productId}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        placeholder="blur"
                        blurDataURL={shimmerBlurDataUrl}
                        quality={70}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate text-sm">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-900 font-bold mt-1">
                        ${item?.price?.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
