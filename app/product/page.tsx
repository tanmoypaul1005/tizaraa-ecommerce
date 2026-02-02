'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/app/components/ProductCard';
import SortDropdown, { SortOption } from '@/app/components/SortDropdown';
import { MOCK_PRODUCTS, sortProducts } from '@/app/data/products';
import { Filter, Star } from 'lucide-react';

const ProductsPage = () => {
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [minRating, setMinRating] = useState<number>(0);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(true);

    // Get unique values for filters
    const filterOptions = useMemo(() => {
        const colors = new Set<string>();
        const sizes = new Set<string>();

        MOCK_PRODUCTS.forEach(p => {
            p.variants.colors.forEach(c => colors.add(c.name));
            p.variants.sizes.forEach(s => sizes.add(s.value));
        });

        return {
            colors: Array.from(colors),
            sizes: Array.from(sizes),
        };
    }, []);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
        return ['all', ...cats];
    }, []);

    // Calculate filter counts
    const getFilterCount = (filterType: string, value: any) => {
        return MOCK_PRODUCTS.filter(p => {
            let matches = true;

            // Apply other filters except the one being counted
            if (filterType !== 'category' && selectedCategory !== 'all') {
                matches = matches && p.category === selectedCategory;
            }
            if (filterType !== 'price') {
                matches = matches && p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1];
            }
            if (filterType !== 'rating') {
                matches = matches && p.rating >= minRating;
            }
            if (filterType !== 'color' && selectedColors.length > 0) {
                matches = matches && p.variants.colors.some(c => selectedColors.includes(c.name));
            }
            if (filterType !== 'size' && selectedSizes.length > 0) {
                matches = matches && p.variants.sizes.some(s => selectedSizes.includes(s.value));
            }

            // Apply the specific filter being counted
            if (filterType === 'category') {
                matches = matches && (value === 'all' || p.category === value);
            } else if (filterType === 'rating') {
                matches = matches && p.rating >= value;
            } else if (filterType === 'color') {
                matches = matches && p.variants.colors.some(c => c.name === value);
            } else if (filterType === 'size') {
                matches = matches && p.variants.sizes.some(s => s.value === value);
            }

            return matches;
        }).length;
    };

    // Filter products
    const filteredProducts = useMemo(() => {
        let filtered = [...MOCK_PRODUCTS];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter(p => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]);

        // Filter by rating
        if (minRating > 0) {
            filtered = filtered.filter(p => p.rating >= minRating);
        }

        // Filter by colors
        if (selectedColors.length > 0) {
            filtered = filtered.filter(p =>
                p?.variants?.colors.some(c => selectedColors.includes(c.name))
            );
        }

        // Filter by sizes
        if (selectedSizes.length > 0) {
            filtered = filtered?.filter(p =>
                p?.variants?.sizes?.some(s => selectedSizes.includes(s.value))
            );
        }

        return filtered;
    }, [selectedCategory, priceRange, minRating, selectedColors, selectedSizes]);

    // Sort filtered products
    const sortedProducts = useMemo(() => {
        return sortProducts(filteredProducts, sortBy);
    }, [filteredProducts, sortBy]);

    const clearFilters = () => {
        setSelectedCategory('all');
        setPriceRange([0, 200]);
        setMinRating(0);
        setSelectedColors([]);
        setSelectedSizes([]);
    };

    const hasActiveFilters =
        selectedCategory !== 'all' ||
        priceRange[0] !== 0 ||
        priceRange[1] !== 200 ||
        minRating > 0 ||
        selectedColors.length > 0 ||
        selectedSizes.length > 0;

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Category Filter */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <label
                                                key={cat}
                                                className="flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={cat}
                                                        checked={selectedCategory === cat}
                                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-gray-700 group-hover:text-gray-900">
                                                        {cat === 'all' ? 'All Categories' : cat}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {getFilterCount('category', cat)}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200"></div>

                                {/* Price Range Slider */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">${priceRange[0]}</span>
                                            <span className="text-gray-600">${priceRange[1]}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-20 px-2 py-1 border border-gray-300 rounded text-black"
                                                min="0"
                                                max="200"
                                            />
                                            <span className="text-gray-500">to</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-20 px-2 py-1 border border-gray-300 rounded text-black"
                                                min="0"
                                                max="200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200"></div>

                                {/* Rating Filter */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                                    <div className="space-y-2">
                                        {[4, 3, 2, 1, 0].map((rating) => (
                                            <label
                                                key={rating}
                                                className="flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={rating}
                                                        checked={minRating === rating}
                                                        onChange={(e) => setMinRating(Number(e.target.value))}
                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <div className="flex items-center gap-1">
                                                        {rating === 0 ? (
                                                            <span className="text-gray-700">All Ratings</span>
                                                        ) : (
                                                            <>
                                                                {Array.from({ length: rating }).map((_, i) => (
                                                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                ))}
                                                                <span className="text-gray-700 ml-1">& Up</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {getFilterCount('rating', rating)}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200"></div>

                                {/* Color Filter */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Colors</h4>
                                    <div className="space-y-2">
                                        {filterOptions.colors.map((color) => (
                                            <label
                                                key={color}
                                                className="flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColors.includes(color)}
                                                        onChange={() => toggleColor(color)}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-gray-700 group-hover:text-gray-900">
                                                        {color}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {getFilterCount('color', color)}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200"></div>

                                {/* Size Filter */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Sizes</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {filterOptions.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm ${selectedSizes.includes(size)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 w-full">

                        {/* Mobile Filter Toggle & Sort */}
                        <div className="flex items-center gap-4 mb-6 justify-between w-full">
                            <div className="">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
                                <p className="text-gray-600">
                                    Showing {sortedProducts?.length} of {MOCK_PRODUCTS.length} products
                                </p>
                            </div>

                            <div>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl font-medium text-gray-700"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filters
                                    {hasActiveFilters && (
                                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                            Active
                                        </span>
                                    )}
                                </button>
                                <SortDropdown value={sortBy} onChange={setSortBy} />
                            </div>
                        </div>

                        {/* Products Grid */}
                        {sortedProducts?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                {sortedProducts?.map((product) => (
                                    <ProductCard
                                        key={product?.id}
                                        id={product?.id}
                                        name={product?.name}
                                        shortDescription={product?.shortDescription}
                                        basePrice={product?.basePrice}
                                        compareAtPrice={product?.compareAtPrice}
                                        rating={product?.rating}
                                        reviewCount={product?.reviewCount}
                                        image={product?.images[0]?.url}
                                        category={product?.category}
                                        tags={product?.tags}
                                        inStock={product?.inStock}
                                        fullProduct={product}
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
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
