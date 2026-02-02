'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface Variant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  hex?: string;
}

interface VariantSelectorProps {
  label: string;
  type: 'color' | 'material' | 'size';
  options: Variant[];
  selected: string;
  onSelect: (id: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  label,
  type,
  options,
  selected,
  onSelect,
}) => {
  const renderColorOption = (option: Variant) => (
    <button
      key={option.id}
      onClick={() => option?.available && onSelect(option?.id)}
      disabled={!option?.available}
      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
        selected === option?.id
          ? 'border-blue-600 ring-2 ring-blue-200 scale-110'
          : 'border-gray-300 hover:border-gray-400'
      } ${!option.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
      title={option.name}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ backgroundColor: option.hex || option.value }}
      >
        {selected === option?.id && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={3} />
          </div>
        )}
        {!option.available && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-full bg-gray-400 rotate-45"></div>
          </div>
        )}
      </div>
    </button>
  );

  const renderMaterialOption = (option: Variant) => (
    <button
      key={option.id}
      onClick={() => option?.available && onSelect(option?.id)}
      disabled={!option?.available}
      className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
        selected === option.id
          ? 'border-blue-600 bg-blue-50 text-blue-700'
          : 'border-gray-200 hover:border-gray-300 text-gray-700'
      } ${!option?.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {option?.name}
      {!option?.available && <span className="ml-2 text-xs">(Out of stock)</span>}
    </button>
  );

  const renderSizeOption = (option: Variant) => (
    <button
      key={option.id}
      onClick={() => option?.available && onSelect(option.id)}
      disabled={!option?.available}
      className={` min-w-14 px-2 h-10 rounded-lg border-2 transition-all font-semibold ${
        selected === option.id
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 hover:border-gray-400 text-gray-700'
      } ${!option.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {option.value}
      {!option.available && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gray-400 rotate-45"></div>
        </div>
      )}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <span className="text-sm text-gray-600">
          {options?.find((opt) => opt?.id === selected)?.name || 'Select'}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {type === 'color' && options?.map(renderColorOption)}
        {type === 'material' && options?.map(renderMaterialOption)}
        {type === 'size' && options?.map(renderSizeOption)}
      </div>
    </div>
  );
};

export default VariantSelector;
