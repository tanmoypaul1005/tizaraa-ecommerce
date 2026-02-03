'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import ProductImageGallery from '@/app/components/ProductImageGallery';
import VariantSelector from '@/app/components/VariantSelector';
import QuantitySelector from '@/app/components/QuantitySelector';
import ProductActions from '@/app/components/ProductActions';
import ProductAccordion from '@/app/components/ProductAccordion';
import StockStatus, { StockStatusType } from '@/app/components/StockStatus';
import ProductRating from '@/app/components/ProductRating';
import CustomizationSummary from '@/app/components/CustomizationSummary';
import RecentlyViewed from '@/app/components/RecentlyViewed';
import { AlertTriangle } from 'lucide-react';
import { getProductById } from '@/app/data/products';
import { useCartStore } from '@/app/store/cartStore';
import { useWishlistStore } from '@/app/store/wishlistStore';

export default function ProductDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = params.product_id as string;
  const product = getProductById(productId);
  const { addItem, addRecentlyViewed, openCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stockStatus, setStockStatus] = useState<StockStatusType>('in-stock');
  const [stockQuantity, setStockQuantity] = useState(15);
  const [showIncompatibleWarning, setShowIncompatibleWarning] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [productUrl, setProductUrl] = useState('');

  // Check if product is in wishlist
  const productInWishlist = product ? isInWishlist(product.id) : false;

  // Update URL when configuration changes (without page reload)
  useEffect(() => {
    if (selectedColor && selectedMaterial && selectedSize && typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.set('color', selectedColor);
      params.set('material', selectedMaterial);
      params.set('size', selectedSize);

      // Update URL without reload
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);

      // Set shareable URL
      const shareUrl = `${window.location.origin}${newUrl}`;
      setProductUrl(shareUrl);
    }
  }, [selectedColor, selectedMaterial, selectedSize]);

  // Add to recently viewed when product loads
  useEffect(() => {
    if (product) {
      addRecentlyViewed({
        productId: product.id,
        name: product.name,
        image: product.images[0].url,
        price: product.basePrice,
      });
    }
  }, [product, addRecentlyViewed]);

  // Load configuration from URL parameters or set defaults
  useEffect(() => {
    if (product) {
      // Try to load from URL parameters
      const urlColor = searchParams.get('color');
      const urlMaterial = searchParams.get('material');
      const urlSize = searchParams.get('size');

      // Validate and set color from URL or use first available
      if (urlColor && product.variants.colors.find(c => c.id === urlColor && c.available)) {
        setSelectedColor(urlColor);
      } else {
        const firstAvailableColor = product.variants.colors.find(c => c.available);
        if (firstAvailableColor) setSelectedColor(firstAvailableColor.id);
      }

      // Validate and set material from URL or use first available
      if (urlMaterial && product.variants.materials.find(m => m.id === urlMaterial && m.available)) {
        setSelectedMaterial(urlMaterial);
      } else {
        const firstAvailableMaterial = product.variants.materials.find(m => m.available);
        if (firstAvailableMaterial) setSelectedMaterial(firstAvailableMaterial.id);
      }

      // Validate and set size from URL or use first available
      if (urlSize && product.variants.sizes.find(s => s.id === urlSize && s.available)) {
        setSelectedSize(urlSize);
      } else {
        const firstAvailableSize = product.variants.sizes.find(s => s.available);
        if (firstAvailableSize) setSelectedSize(firstAvailableSize.id);
      }

      // setCurrentPrice(product.basePrice);
      setStockQuantity(product.stockQuantity);
      setStockStatus(
        product.stockQuantity > 50 ? 'in-stock' :
          product.stockQuantity > 0 ? 'low-stock' : 'out-of-stock'
      );
    }
  }, [product, searchParams]);

  useEffect(() => {
    if (!product) return;

    let price = product.basePrice;
    const selectedMat = product.variants.materials.find(m => m.id === selectedMaterial);
    if (selectedMat?.priceModifier) price += selectedMat.priceModifier;

    const selectedSz = product.variants.sizes.find(s => s.id === selectedSize);
    if (selectedSz?.priceModifier) price += selectedSz.priceModifier;

    setCurrentPrice(price);

    const isIncompatible = false;
    setShowIncompatibleWarning(isIncompatible);

    const colorVariant = product.variants.colors.find(c => c.id === selectedColor);
    const materialVariant = product.variants.materials.find(m => m.id === selectedMaterial);
    const sizeVariant = product.variants.sizes.find(s => s.id === selectedSize);

    if (!colorVariant?.available || !materialVariant?.available || !sizeVariant?.available) {
      setStockStatus('out-of-stock');
      setStockQuantity(0);
    } else {
      const qty = product.stockQuantity;
      setStockQuantity(qty);
      setStockStatus(qty > 50 ? 'in-stock' : qty > 0 ? 'low-stock' : 'out-of-stock');
    }
  }, [selectedColor, selectedMaterial, selectedSize, product]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600">The product you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const isAvailable = stockStatus !== 'out-of-stock' && !showIncompatibleWarning;

  const handleAddToCart = async () => {
    if (!isAvailable || !product) return;

    setIsAddingToCart(true);

    try {

      await addItem({
        productId: product?.id,
        name: product?.name,
        image: product?.images[0]?.url,
        price: currentPrice,
        quantity,
        selectedColor: product?.variants?.colors?.find(c => c.id === selectedColor)?.name,
        selectedMaterial: product?.variants?.materials?.find(m => m.id === selectedMaterial)?.name,
        selectedSize,
        maxQuantity: stockQuantity,
      });

      // Open cart drawer to show the added item
      openCart();
    } catch (error) {
      alert(`Failed to add item to cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;

    try {
      await toggleWishlist({
        productId: product?.id,
        name: product?.name,
        image: product?.images[0]?.url,
        price: currentPrice,
      });
    } catch (error) {
      alert(`Failed to update wishlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleShare = () => {
    const config = `color=${selectedColor}&material=${selectedMaterial}&size=${selectedSize}`;
    const url = `${window.location.origin}/product/${productId}?${config}`;
    navigator.clipboard.writeText(url);
  };

  const customizationOptions = [
    { label: 'Color', value: product?.variants?.colors.find(c => c?.id === selectedColor)?.name || '' },
    { label: 'Material', value: product?.variants?.materials?.find(m => m?.id === selectedMaterial)?.name || '' },
    { label: 'Size', value: selectedSize?.toUpperCase() },
    { label: 'Quantity', value: quantity?.toString() },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-8 lg:self-start">
            {/* Product Images with 3D Viewer as First Image */}
            <ProductImageGallery 
              images={product.images} 
              show3DViewer={true}
              productColor={product?.variants?.colors.find(c => c?.id === selectedColor)?.hex || '#3b82f6'}
              productMaterial={selectedMaterial}
              productType={product.model3D || 'default'}
              productName={product.name}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">${currentPrice?.toFixed(2)}</span>
                {product?.compareAtPrice && currentPrice !== product?.compareAtPrice && (
                  <span className="text-xl text-gray-400 line-through">${product?.compareAtPrice?.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
            </div>

            <StockStatus status={stockStatus} quantity={stockQuantity} />

            {showIncompatibleWarning && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-semibold">Incompatible Selection</p>
                  <p>This combination of options is not available. Please choose different variants.</p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200"></div>

            <div className="space-y-6">
              {product?.variants?.colors?.length > 0 && (
                <VariantSelector
                  label="Color"
                  type="color"
                  options={product?.variants?.colors}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                />
              )}

              {product.variants.materials.length > 0 && (
                <VariantSelector
                  label="Material"
                  type="material"
                  options={product?.variants?.materials}
                  selected={selectedMaterial}
                  onSelect={setSelectedMaterial}
                />
              )}

              {product?.variants?.sizes?.length > 0 && (
                <VariantSelector
                  label="Size"
                  type="size"
                  options={product.variants.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            <QuantitySelector quantity={quantity} max={stockQuantity} onChange={setQuantity} />

            <CustomizationSummary options={customizationOptions} onShare={handleShare} />

            <ProductActions
              isAvailable={isAvailable}
              isInWishlist={productInWishlist}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onShare={handleShare}
              productUrl={productUrl}
              productTitle={`${product.name} - Check out this amazing product!`}
              productImage={product.images[0].url}
            />

            <div className="border-t border-gray-200"></div>

            <ProductAccordion />
          </div>
        </div>

        {/* Recently Viewed Products */}
        <RecentlyViewed />
      </div>

      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden transition-transform duration-300 z-40 ${isSticky ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="text-xl font-bold text-gray-900">${currentPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${isAvailable
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
}
