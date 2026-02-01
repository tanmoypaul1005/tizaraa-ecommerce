'use client';

import React from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">You're Offline</h1>
          <p className="text-gray-600">
            It looks like you've lost your internet connection. Please check your network and try again.
          </p>
        </div>

        {/* Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium">
            Don't worry! Your cart and browsing data are saved locally.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Connection
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>

        {/* Tips */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3 font-semibold">Troubleshooting Tips:</p>
          <ul className="text-xs text-gray-600 text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Check if your Wi-Fi or mobile data is turned on</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Try turning airplane mode on and off</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Restart your device if the problem persists</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
