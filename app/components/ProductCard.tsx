'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, ArrowLeftRight, Check } from 'lucide-react';
import { shimmerBlurDataUrl } from '../lib/blur-placeholder';
import { useRouter } from 'next/navigation';
import { useComparisonStore } from '../store/comparisonStore';

interface ProductCardProps {
  id: string;
  name: string;
  shortDescription: string;
  basePrice: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  tags: string[];
  inStock: boolean;
  fullProduct?: any;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  id,
  name,
  shortDescription,
  basePrice,
  compareAtPrice,
  rating,
  reviewCount,
  image,
  category,
  tags,
  inStock,
  fullProduct,
}) => {
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)
    : 0;

  const router = useRouter();
  const { toggleProduct, isInComparison } = useComparisonStore();
  const inComparison = isInComparison(id);

  // Prefetch on hover for faster navigation
  const handleMouseEnter = () => {
    router.prefetch(`/product/${id}`);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (fullProduct) {
      toggleProduct(fullProduct);
    }
  };

  return (
    <Link href={`/product/${id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={handleMouseEnter}
    >
      {/* Image Section */}
      <div  className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={shimmerBlurDataUrl}
          quality={80}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {tags.includes('bestseller') && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Compare Button */}
        {fullProduct && (
          <button
            onClick={handleCompareClick}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${
              inComparison
                ? 'bg-blue-600 text-white shadow-lg scale-110'
                : 'bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 shadow-md'
            }`}
            title={inComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            {inComparison ? (
              <Check className="w-5 h-5" />
            ) : (
              <ArrowLeftRight className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/product/${id}`}
            className="w-full bg-white hover:bg-blue-600 text-gray-900 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Quick View</span>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {category}
        </p>

        {/* Title */}
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{rating}</span>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-2xl font-bold text-gray-900">
            ${basePrice.toFixed(2)}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
