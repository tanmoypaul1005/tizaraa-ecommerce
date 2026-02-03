'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { MOCK_PRODUCTS, Product } from '@/app/data/products';

interface SearchResult extends Product {
  matchType: 'name' | 'description' | 'category' | 'tag';
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search query to avoid excessive searches while typing
  const [debouncedQuery] = useDebounce(query, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Error loading recent searches:', err);
      setRecentSearches([]);
    }
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time search with debounce
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchTerm = debouncedQuery.toLowerCase().trim();
      const foundProducts: SearchResult[] = [];

      MOCK_PRODUCTS.forEach((product) => {
        try {
          // Check name match
          if (product.name?.toLowerCase().includes(searchTerm)) {
            foundProducts.push({ ...product, matchType: 'name' });
          }
          // Check description match
          else if (product.description?.toLowerCase().includes(searchTerm)) {
            foundProducts.push({ ...product, matchType: 'description' });
          }
          // Check category match
          else if (product.category?.toLowerCase().includes(searchTerm)) {
            foundProducts.push({ ...product, matchType: 'category' });
          }
          // Check tags match
          else if (product.tags?.some(tag => tag?.toLowerCase().includes(searchTerm))) {
            foundProducts.push({ ...product, matchType: 'tag' });
          }
        } catch (err) {
          console.error('Error processing product:', product.id, err);
        }
      });

      setResults(foundProducts.slice(0, 5)); // Limit to 5 results
      setIsLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleSearch = (searchQuery: string): void => {
    if (searchQuery.trim().length < 2) return;

    try {
      // Save to recent searches
      const updated = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery),
      ].slice(0, 5);
      
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving recent search:', err);
    }
  };

  const handleClear = (): void => {
    setQuery('');
    setResults([]);
    setError(null);
    setIsLoading(false);
  };

  const handleResultClick = (product: Product): void => {
    handleSearch(query);
    setIsOpen(false);
    setQuery('');
  };

  const popularSearches = ['T-Shirt', 'Sneakers', 'Premium', 'Leather'];

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-black placeholder:text-black"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
          {/* Error State */}
          {error ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Search Error
              </h3>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setQuery('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : query.trim().length >= 2 ? (
            <>
              {/* Loading State */}
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Searching...
                  </h3>
                  <p className="text-gray-500">
                    Finding products for "{query}"
                  </p>
                </div>
              ) : results.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500 font-medium px-3 py-1">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => handleResultClick(product)}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={product.images?.[0]?.url || '/placeholder.png'}
                      alt={product.name || 'Product'}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {highlightText(product.name || '', query)}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {product.matchType === 'name' 
                          ? highlightText(product.shortDescription || '', query)
                          : highlightText(product.category || '', query)
                        }
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-gray-900">
                          ${product.basePrice?.toFixed(2) || '0.00'}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                          {product.matchType}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // No Results State
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find anything for "{query}"
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setQuery(suggestion);
                          handleSearch(suggestion);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
          ) : (
            // Recent & Popular Searches
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-1">
                    Recent Searches
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors flex items-center gap-2"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-sm rounded-full transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
