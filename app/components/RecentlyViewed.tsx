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
    <section className="py-8 sm:py-10 lg:py-12 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recently Viewed</h2>
              <p className="text-xs sm:text-sm text-gray-600">Your browsing history</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          {recentlyViewed.length > 4 && (
            <div className="hidden lg:flex gap-2">
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
          className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentlyViewed.map((item) => (
            <Link
              key={item.productId}
              href={`/product/${item.productId}`}
              className="flex-shrink-0 w-36 xs:w-40 sm:w-48 md:w-52 lg:w-56 group flex flex-col"
            >
              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 475px) 144px, (max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 208px, 224px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl}
                    quality={75}
                  />
                </div>

                {/* Content */}
                <div className="p-2.5 sm:p-3 lg:p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors flex-grow">
                    {item.name}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        {recentlyViewed.length > 2 && (
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 lg:hidden">
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
