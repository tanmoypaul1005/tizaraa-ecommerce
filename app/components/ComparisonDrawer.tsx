'use client';

import React from 'react';
import { useComparisonStore } from '../store/comparisonStore';
import { X, Check, Minus, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ComparisonDrawer() {
  const { products, isOpen, closeComparison, removeProduct, clearComparison } = useComparisonStore();

  if (!isOpen) return null;

  const hasProducts = products.length > 0;

  // Get all unique specification labels
  const allSpecLabels = new Set<string>();
  products.forEach(product => {
    product.specifications.forEach(spec => {
      allSpecLabels.add(spec.label);
    });
  });
  const specLabels = Array.from(allSpecLabels);

  // Get specification value for a product
  const getSpecValue = (product: any, label: string) => {
    const spec = product.specifications.find((s: any) => s.label === label);
    return spec?.value || '-';
  };

  // Get all unique tags
  const allTags = new Set<string>();
  products.forEach(product => {
    product.tags.forEach(tag => allTags.add(tag));
  });

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={closeComparison}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
            <p className="text-sm text-gray-600 mt-1">
              {products.length === 0 ? 'No products selected' : `Comparing ${products.length} product${products.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasProducts && (
              <button
                onClick={clearComparison}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeComparison}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {!hasProducts ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Minus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products to Compare</h3>
              <p className="text-gray-600 text-center max-w-md">
                Add products to comparison by clicking the "Compare" button on product cards. You can compare up to 3 products at once.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 bg-white z-10 p-4 text-left font-semibold text-gray-900 border-b-2 border-gray-200 min-w-[150px]">
                        Feature
                      </th>
                      {products.map(product => (
                        <th key={product.id} className="p-4 border-b-2 border-gray-200 min-w-[280px]">
                          <div className="space-y-3">
                            {/* Product Image */}
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={product.images[0].url}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            {/* Product Info */}
                            <div className="text-left">
                              <Link 
                                href={`/product/${product.id}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                              >
                                {product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({product.reviewCount})</span>
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="w-full py-2 px-4 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody>
                    {/* Price */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Price
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-gray-900">
                              ${product.basePrice.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Category */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Category
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {product.category}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Stock Status */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Stock Status
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          {product.inStock ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <Check className="w-5 h-5" />
                              <span className="font-medium">In Stock ({product.stockQuantity})</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-red-600">
                              <X className="w-5 h-5" />
                              <span className="font-medium">Out of Stock</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Colors Available */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Colors Available
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {product.variants.colors.slice(0, 8).map(color => (
                              <div
                                key={color.id}
                                className="w-8 h-8 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                            {product.variants.colors.length > 8 && (
                              <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-medium">
                                +{product.variants.colors.length - 8}
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Sizes Available */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Sizes Available
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {product.variants.sizes.map(size => (
                              <span
                                key={size.id}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                              >
                                {size.value}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Specifications */}
                    {specLabels.map(label => (
                      <tr key={label} className="hover:bg-gray-50">
                        <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                          {label}
                        </td>
                        {products.map(product => (
                          <td key={product.id} className="p-4 border-b border-gray-200 text-gray-700">
                            {getSpecValue(product, label)}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Tags */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Tags
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Description */}
                    <tr className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white p-4 font-medium text-gray-900 border-b border-gray-200">
                        Description
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="p-4 border-b border-gray-200 text-gray-700 text-sm">
                          {product.shortDescription}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-3" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
                {products.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
