'use client';

import React from 'react';
import { useComparisonStore } from '../store/comparisonStore';
import { ArrowLeftRight } from 'lucide-react';

const ComparisonBadge: React.FC = () => {
  const { products, openComparison } = useComparisonStore();
  const count = products.length;

  if (count === 0) return null;

  return (
    <button
      onClick={openComparison}
      className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors group"
      aria-label={`Compare ${count} products`}
    >
      <ArrowLeftRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );
};

export default ComparisonBadge;
