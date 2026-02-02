'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Tag, Gift, Truck, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItemComponent } from './CartItem';
import { SavedItemComponent } from './SavedItem';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    items,
    savedItems,
    isOpen,
    closeCart,
    subtotal,
    bundleDiscount,
    promoCode,
    promoDiscount,
    promoMessage,
    tax,
    shipping,
    total,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    
    applyPromoCode(promoInput);
    
    // Check if promo was successfully applied
    setTimeout(() => {
      const state = useCartStore.getState();
      if (!state.promoCode && state.promoMessage) {
        setPromoError(state.promoMessage);
      } else {
        setPromoError('');
        setPromoInput('');
      }
    }, 100);
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoInput('');
    setPromoError('');
  };

  if (!isOpen) return null;

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const showFreeShippingProgress = remainingForFreeShipping > 0 && items.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">
              Shopping Cart ({items?.length})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {showFreeShippingProgress && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  Add <span className="font-bold">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
                </p>
                <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bundle Discount Alert */}
        {bundleDiscount > 0 && (
          <div className="p-3 bg-green-50 border-b border-green-100">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-900">
                🎉 <span className="font-bold">{bundleDiscount}% bundle discount</span> applied for {items.length} items!
              </p>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          {items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-600 mb-4">Add some products to get started!</p>
              <Link
                href="/"
                onClick={closeCart}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              {/* Cart Items */}
              <div>
                {items?.map((item) => (
                  <CartItemComponent key={item?.id} item={item} />
                ))}
              </div>

              {/* Saved for Later */}
              {savedItems?.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Saved for Later ({savedItems?.length})
                  </h3>
                  <div className="space-y-2">
                    {savedItems.map((item) => (
                      <SavedItemComponent key={item?.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Promo Code and Totals */}
        {items?.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Promo Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">{promoCode}</p>
                      <p className="text-xs text-green-700">{promoMessage}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-green-700 hover:text-green-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoError('');
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {promoError}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>

              {bundleDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Bundle Discount ({bundleDiscount}%)</span>
                  <span className="font-medium text-green-600">
                    -${((subtotal * bundleDiscount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Promo Discount</span>
                  <span className="font-medium text-green-600">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
