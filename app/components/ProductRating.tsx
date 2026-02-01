'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  showReviewLink?: boolean;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewCount,
  showReviewLink = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-5 h-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-gray-900">{rating.toFixed(1)}</span>
        {showReviewLink ? (
          <button className="text-gray-600 hover:text-blue-600 transition-colors underline">
            ({reviewCount} reviews)
          </button>
        ) : (
          <span className="text-gray-600">({reviewCount} reviews)</span>
        )}
      </div>
    </div>
  );
};

export default ProductRating;
