'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = 99,
  onChange,
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-2 gap-x-4 flex items-center">
      <div className="text-sm font-semibold text-gray-900 ">Quantity</div>
      <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden ">
        <button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="px-4 py-3 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 text-center font-semibold text-gray-900 focus:outline-none"
        />
        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="px-4 py-3 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      {max < 10 && (
        <p className="text-xs text-orange-600 font-medium">Only {max} left in stock</p>
      )}
    </div>
  );
};

export default QuantitySelector;
