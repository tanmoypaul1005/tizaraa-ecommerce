'use client';

import React from 'react';
import { useServiceWorkerUpdate } from '@/app/hooks/usePWA';
import { RefreshCw } from 'lucide-react';

const UpdateNotification = () => {
  const { needsUpdate, update } = useServiceWorkerUpdate();

  if (!needsUpdate) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-sm">
        <div className="flex-1">
          <p className="font-semibold text-sm">Update Available!</p>
          <p className="text-xs text-blue-100">A new version is ready</p>
        </div>
        <button
          onClick={update}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateNotification;
