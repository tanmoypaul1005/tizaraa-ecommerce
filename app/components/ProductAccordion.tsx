'use client';

import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, Shield, Package } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface ProductAccordionProps {
  items?: AccordionItem[];
}

const ProductAccordion: React.FC<ProductAccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<string[]>(['delivery']);

  const defaultItems: AccordionItem[] = [
    {
      id: 'delivery',
      title: 'Delivery & Returns',
      icon: <Truck className="w-5 h-5" />,
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Free Standard Delivery</p>
              <p>Orders over $50 • Estimated 3-5 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">30-Day Returns</p>
              <p>Free returns on all orders within 30 days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Quality Guarantee</p>
              <p>Premium materials with 1-year warranty</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'specifications',
      title: 'Product Specifications',
      icon: <Package className="w-5 h-5" />,
      content: (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Material</p>
              <p className="font-medium text-gray-900">Premium Cotton Blend</p>
            </div>
            <div>
              <p className="text-gray-500">Weight</p>
              <p className="font-medium text-gray-900">250g</p>
            </div>
            <div>
              <p className="text-gray-500">Dimensions</p>
              <p className="font-medium text-gray-900">30 × 20 × 10 cm</p>
            </div>
            <div>
              <p className="text-gray-500">Country of Origin</p>
              <p className="font-medium text-gray-900">USA</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Machine wash cold with like colors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Tumble dry low heat</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Do not bleach or iron directly on print</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Store in a cool, dry place</span>
          </li>
        </ul>
      ),
    },
  ];

  const accordionItems = items || defaultItems;

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="border-t border-gray-200 divide-y divide-gray-200">
      {accordionItems.map((item) => (
        <div key={item.id} className="py-4">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </span>
              )}
              <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.title}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openItems.includes(item.id) ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              openItems.includes(item.id) ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;
