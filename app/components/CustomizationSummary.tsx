'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CustomizationOption {
  label: string;
  value: string;
}

interface CustomizationSummaryProps {
  options: CustomizationOption[];
  onShare?: () => void;
}

const CustomizationSummary: React.FC<CustomizationSummaryProps> = ({ options, onShare }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (onShare) {
      onShare();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Your Configuration</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Share
            </>
          )}
        </button>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{option.label}:</span>
            <span className="font-medium text-gray-900">{option.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizationSummary;
