'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, RotateCw, X } from 'lucide-react';
import { shimmerBlurDataUrl } from '@/app/lib/blur-placeholder';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'video';
}

interface ProductImageGalleryProps {
  images: ProductImage[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverControls, setIsOverControls] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!isOverControls) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleControlsEnter = () => {
    setIsOverControls(true);
    setIsHovering(false);
  };

  const handleControlsLeave = () => {
    setIsOverControls(false);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleZoom = () => {
    setZoom((prev) => (prev === 1 ? 2 : 1));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div 
        className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square group cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image
            src={images[selectedIndex]?.url || '/api/placeholder/800/800'}
            alt={images[selectedIndex]?.alt || 'Product'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="max-w-full max-h-full object-contain transition-all duration-200"
            style={{ 
              transform: `scale(${isHovering && !isOverControls ? 2 : zoom}) rotate(${rotation}deg)`,
              transformOrigin: isHovering && !isOverControls ? `${mousePosition.x}% ${mousePosition.y}%` : 'center'
            }}
            priority={selectedIndex === 0}
            placeholder="blur"
            blurDataURL={shimmerBlurDataUrl}
            quality={85}
          />
        </div>

        {/* Zoom Indicator */}
        {isHovering && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
            <ZoomIn className="w-3 h-3" />
            Zoomed 2x
          </div>
        )}

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Control Buttons */}
        <div 
          className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseEnter={handleControlsEnter}
          onMouseLeave={handleControlsLeave}
        >
          <button
            onClick={handleZoom}
            className="bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg"
            title="Zoom"
          >
            <ZoomIn className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={handleRotate}
            className="bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg"
            title="Rotate"
          >
            <RotateCw className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={handleFullscreen}
            className="bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
          {selectedIndex + 1} / {images?.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-3">
        {images?.map((image, index) => (
          <button
            key={image?.id}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? 'border-blue-600 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image?.url}
              alt={image?.alt}
              fill
              sizes="(max-width: 768px) 20vw, 10vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={shimmerBlurDataUrl}
              quality={60}
            />
            {image?.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-800 border-b-[6px] border-b-transparent ml-1"></div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-12">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex]?.url || '/api/placeholder/800/800'}
                alt={images[selectedIndex]?.alt || 'Product'}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                priority
                quality={95}
              />
            </div>
          </div>

          {/* Fullscreen Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleZoom}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <RotateCw className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
