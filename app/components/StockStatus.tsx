'use client';

import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export type StockStatusType = 'in-stock' | 'low-stock' | 'out-of-stock';

interface StockStatusProps {
  status: StockStatusType;
  quantity?: number;
}

const StockStatus: React.FC<StockStatusProps> = ({ status, quantity }) => {
  const statusConfig = {
    'in-stock': {
      icon: <CheckCircle className="w-5 h-5" />,
      text: 'In Stock',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    'low-stock': {
      icon: <AlertCircle className="w-5 h-5" />,
      text: `Only ${quantity || 5} left`,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
    },
    'out-of-stock': {
      icon: <XCircle className="w-5 h-5" />,
      text: 'Out of Stock',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {config.icon}
      <span className="font-medium text-sm">{config.text}</span>
    </div>
  );
};

export default StockStatus;
