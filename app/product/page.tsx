'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/app/components/ProductCard';
import SortDropdown, { SortOption } from '@/app/components/SortDropdown';
import { MOCK_PRODUCTS, sortProducts } from '@/app/data/products';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50-100' | 'over100'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
    return ['all', ...cats];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...MOCK_PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        if (priceRange === 'under50') return p.basePrice < 50;
        if (priceRange === '50-100') return p.basePrice >= 50 && p.basePrice <= 100;
        if (priceRange === 'over100') return p.basePrice > 100;
        return true;
      });
    }

    return filtered;
  }, [selectedCategory, priceRange]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {MOCK_PRODUCTS.length} products
          </p>
        </div>

        {/* Filters & Sort Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {/* Filters */}
            <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="text-black">
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="all" className="text-black">All Prices</option>
                  <option value="under50" className="text-black">Under $50</option>
                  <option value="50-100" className="text-black">$50 - $100</option>
                  <option value="over100" className="text-black">Over $100</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="lg:ml-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                shortDescription={product.shortDescription}
                basePrice={product.basePrice}
                compareAtPrice={product.compareAtPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                image={product.images[0].url}
                category={product.category}
                tags={product.tags}
                inStock={product.inStock}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
