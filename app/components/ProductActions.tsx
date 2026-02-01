'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, Facebook, MessageCircle, Linkedin, Mail, Link2, X } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';

interface ProductActionsProps {
  isAvailable: boolean;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onShare: () => void;
  productUrl?: string;
  productTitle?: string;
  productImage?: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isAvailable,
  isInWishlist,
  onAddToCart,
  onToggleWishlist,
  onShare,
  productUrl = '',
  productTitle = 'Check out this amazing product!',
  productImage = '',
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = () => {
    onShare(); // This copies to clipboard
    setShowShareMenu(false);
  };

  const shareButtons = [
    {
      Component: FacebookShareButton,
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-50 hover:text-blue-600',
    },
    {
      Component: TwitterShareButton,
      icon: X,
      label: 'Twitter',
      color: 'hover:bg-gray-100 hover:text-gray-900',
    },
    {
      Component: WhatsappShareButton,
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'hover:bg-green-50 hover:text-green-600',
    },
    {
      Component: LinkedinShareButton,
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-50 hover:text-blue-700',
    },
    {
      Component: EmailShareButton,
      icon: Mail,
      label: 'Email',
      color: 'hover:bg-gray-100 hover:text-gray-700',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
          isAvailable
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:shadow-xl active:scale-[0.98]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isAvailable ? 'Add to Cart' : 'Out of Stock'}
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onToggleWishlist}
          className={`py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
            isInWishlist
              ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
              : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-600' : ''}`} />
          {isInWishlist ? 'Saved' : 'Save'}
        </button>

        <div className="relative z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            type="button"
            className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>

          {/* Share Menu Dropdown */}
          {showShareMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[60]"
                onClick={() => setShowShareMenu(false)}
              />
              
              {/* Share Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[70] overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">Share this product</h3>
                </div>
                
                <div className="p-2 space-y-1">
                  {shareButtons.map(({ Component, icon: Icon, label, color }) => (
                    <div key={label} className="w-full">
                      <Component
                        url={productUrl}
                        title={productTitle}
                        onClick={() => setShowShareMenu(false)}
                      >
                        <div
                          className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-gray-700 transition-all cursor-pointer ${color}`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{label}</span>
                        </div>
                      </Component>
                    </div>
                  ))}
                  
                  {/* Copy Link Button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <Link2 className="w-5 h-5" />
                    <span className="font-medium text-sm">Copy Link</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
