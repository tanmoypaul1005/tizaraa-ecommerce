'use client';

import React from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { shimmerBlurDataUrl } from '@/app/lib/blur-placeholder';

const RecentlyViewed = () => {
  const { recentlyViewed } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
              <p className="text-sm text-gray-600">Your browsing history</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          {recentlyViewed.length > 4 && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentlyViewed.map((item) => (
            <Link
              key={item.productId}
              href={`/product/${item.productId}`}
              className="flex-shrink-0 w-48 group flex flex-col"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 192px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl}
                    quality={75}
                  />
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors flex-grow">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        {recentlyViewed.length > 2 && (
          <p className="text-center text-sm text-gray-500 mt-4 md:hidden">
            Swipe to see more →
          </p>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentlyViewed;
