'use client';

import React, { useState, useEffect } from 'react';
import ProductImageGallery from '@/app/components/ProductImageGallery';
import VariantSelector, { Variant } from '@/app/components/VariantSelector';
import QuantitySelector from '@/app/components/QuantitySelector';
import ProductActions from '@/app/components/ProductActions';
import ProductAccordion from '@/app/components/ProductAccordion';
import StockStatus, { StockStatusType } from '@/app/components/StockStatus';
import ProductRating from '@/app/components/ProductRating';
import CustomizationSummary from '@/app/components/CustomizationSummary';
import { AlertTriangle } from 'lucide-react';

// Mock product data - Replace with actual API call
const PRODUCT_DATA = {
  id: '01',
  name: 'Premium Customizable T-Shirt',
  description: 'Crafted from the finest organic cotton with superior breathability and comfort. Perfect for any occasion.',
  basePrice: 79.99,
  rating: 4.8,
  reviewCount: 1247,
  images: [
    { id: '1', url: '/api/placeholder/800/800', alt: 'Product front view', type: 'image' as const },
    { id: '2', url: '/api/placeholder/800/800', alt: 'Product back view', type: 'image' as const },
    { id: '3', url: '/api/placeholder/800/800', alt: 'Product detail', type: 'image' as const },
    { id: '4', url: '/api/placeholder/800/800', alt: 'Product in use', type: 'image' as const },
    { id: '5', url: '/api/placeholder/800/800', alt: 'Product video', type: 'video' as const },
  ],
  variants: {
    colors: [
      { id: 'black', name: 'Midnight Black', value: 'black', hex: '#000000', available: true },
      { id: 'white', name: 'Pure White', value: 'white', hex: '#FFFFFF', available: true },
      { id: 'navy', name: 'Navy Blue', value: 'navy', hex: '#1E3A8A', available: true },
      { id: 'gray', name: 'Heather Gray', value: 'gray', hex: '#9CA3AF', available: false },
      { id: 'red', name: 'Crimson Red', value: 'red', hex: '#DC2626', available: true },
    ],
    materials: [
      { id: 'cotton', name: '100% Organic Cotton', value: 'cotton', available: true },
      { id: 'blend', name: 'Cotton Blend', value: 'blend', available: true },
      { id: 'performance', name: 'Performance Tech', value: 'performance', available: false },
    ],
    sizes: [
      { id: 'xs', name: 'Extra Small', value: 'XS', available: true },
      { id: 's', name: 'Small', value: 'S', available: true },
      { id: 'm', name: 'Medium', value: 'M', available: true },
      { id: 'l', name: 'Large', value: 'L', available: true },
      { id: 'xl', name: 'Extra Large', value: 'XL', available: false },
    ],
  },
};

const ProductDetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedMaterial, setSelectedMaterial] = useState('cotton');
  const [selectedSize, setSelectedSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(PRODUCT_DATA.basePrice);
  const [stockStatus, setStockStatus] = useState<StockStatusType>('in-stock');
  const [stockQuantity, setStockQuantity] = useState(15);
  const [showIncompatibleWarning, setShowIncompatibleWarning] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Calculate price based on selected variants
  useEffect(() => {
    let price = PRODUCT_DATA.basePrice;
    
    // Add premium for materials
    if (selectedMaterial === 'blend') price += 10;
    if (selectedMaterial === 'performance') price += 25;
    
    setCurrentPrice(price);

    // Check for incompatible combinations (example logic)
    const isIncompatible = 
      (selectedColor === 'white' && selectedMaterial === 'performance') ||
      (selectedSize === 'xl' && selectedMaterial === 'cotton');
    
    setShowIncompatibleWarning(isIncompatible);

    // Update stock status based on selection
    if (selectedSize === 'xl' || selectedColor === 'gray') {
      setStockStatus('out-of-stock');
      setStockQuantity(0);
    } else if (selectedSize === 'xs' || selectedColor === 'red') {
      setStockStatus('low-stock');
      setStockQuantity(3);
    } else {
      setStockStatus('in-stock');
      setStockQuantity(15);
    }
  }, [selectedColor, selectedMaterial, selectedSize]);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAvailable = stockStatus !== 'out-of-stock' && !showIncompatibleWarning;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    console.log('Adding to cart:', {
      product: PRODUCT_DATA.id,
      color: selectedColor,
      material: selectedMaterial,
      size: selectedSize,
      quantity,
      price: currentPrice,
    });
    // Add your cart logic here
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleShare = () => {
    const config = `color=${selectedColor}&material=${selectedMaterial}&size=${selectedSize}`;
    const url = `${window.location.origin}/product/01?${config}`;
    navigator.clipboard.writeText(url);
  };

  const customizationOptions = [
    { label: 'Color', value: PRODUCT_DATA.variants.colors.find(c => c.id === selectedColor)?.name || '' },
    { label: 'Material', value: PRODUCT_DATA.variants.materials.find(m => m.id === selectedMaterial)?.name || '' },
    { label: 'Size', value: selectedSize.toUpperCase() },
    { label: 'Quantity', value: quantity.toString() },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Image Gallery */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductImageGallery images={PRODUCT_DATA.images} />
          </div>

          {/* Right Section - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {PRODUCT_DATA.name}
              </h1>
              <ProductRating
                rating={PRODUCT_DATA.rating}
                reviewCount={PRODUCT_DATA.reviewCount}
              />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {PRODUCT_DATA.description}
            </p>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </span>
                {currentPrice !== PRODUCT_DATA.basePrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${PRODUCT_DATA.basePrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
            </div>

            {/* Stock Status */}
            <StockStatus status={stockStatus} quantity={stockQuantity} />

            {/* Incompatible Warning */}
            {showIncompatibleWarning && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-semibold">Incompatible Selection</p>
                  <p>This combination of options is not available. Please choose different variants.</p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Variant Selectors */}
            <div className="space-y-6">
              <VariantSelector
                label="Color"
                type="color"
                options={PRODUCT_DATA.variants.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />

              <VariantSelector
                label="Material"
                type="material"
                options={PRODUCT_DATA.variants.materials}
                selected={selectedMaterial}
                onSelect={setSelectedMaterial}
              />

              <VariantSelector
                label="Size"
                type="size"
                options={PRODUCT_DATA.variants.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              max={stockQuantity}
              onChange={setQuantity}
            />

            {/* Customization Summary */}
            <CustomizationSummary
              options={customizationOptions}
              onShare={handleShare}
            />

            {/* Actions */}
            <ProductActions
              isAvailable={isAvailable}
              isInWishlist={isInWishlist}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onShare={handleShare}
            />

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Accordion Sections */}
            <ProductAccordion />
          </div>
        </div>
      </div>

      {/* Sticky Mobile Actions */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden transition-transform duration-300 z-40 ${
          isSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="text-xl font-bold text-gray-900">${currentPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              isAvailable
                ? 'bg-blue-600 text-white active:scale-95'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;