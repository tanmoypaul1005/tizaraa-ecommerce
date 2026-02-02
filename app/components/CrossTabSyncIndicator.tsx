'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function CrossTabSyncIndicator() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check if BroadcastChannel is supported
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      setIsSupported(true);

      // Monitor cart sync channel
      const cartChannel = new BroadcastChannel('cart-sync');
      const wishlistChannel = new BroadcastChannel('wishlist-sync');

      const handleSync = () => {
        setIsSyncing(true);
        setLastSyncTime(new Date());
        
        // Reset syncing indicator after animation
        setTimeout(() => {
          setIsSyncing(false);
        }, 1500);
      };

      cartChannel.onmessage = handleSync;
      wishlistChannel.onmessage = handleSync;

      return () => {
        cartChannel.close();
        wishlistChannel.close();
      };
    }
  }, []);

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-xs">
        <WifiOff className="w-4 h-4 text-yellow-600" />
        <span className="text-yellow-800">Cross-tab sync unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isSyncing && (
        <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 text-white animate-fade-in">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <div>
            <div className="font-semibold text-sm">Syncing across tabs...</div>
            <div className="text-xs opacity-90">Updates from another tab</div>
          </div>
        </div>
      )}
      
      {!isSyncing && lastSyncTime && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-xs opacity-0 animate-fade-out">
          <Wifi className="w-4 h-4 text-green-600" />
          <span className="text-green-800">
            Synced {lastSyncTime.toLocaleTimeString()}
          </span>
        </div>
      )}
    </>
  );
}
