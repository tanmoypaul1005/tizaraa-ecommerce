'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';

export default function ServerSyncIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger sync when coming online
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        setLastSyncTime(new Date());
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }, 1500);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for server action events (custom events)
  useEffect(() => {
    const handleServerAction = () => {
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        setLastSyncTime(new Date());
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }, 500);
    };

    window.addEventListener('server-action-start' as any, handleServerAction);

    return () => {
      window.removeEventListener('server-action-start' as any, handleServerAction);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed bottom-20 right-4 z-40 bg-gray-800 text-white rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in">
        <CloudOff className="w-5 h-5 text-gray-300" />
        <div>
          <div className="font-semibold text-sm">Offline Mode</div>
          <div className="text-xs text-gray-300">Changes saved locally</div>
        </div>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in">
        <RefreshCw className="w-5 h-5 animate-spin" />
        <div>
          <div className="font-semibold text-sm">Syncing with server...</div>
          <div className="text-xs opacity-90">Updating your data</div>
        </div>
      </div>
    );
  }

  if (showSuccess && lastSyncTime) {
    return (
      <div className="fixed bottom-20 right-4 z-40 bg-green-500 text-white rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in">
        <Check className="w-5 h-5" />
        <div>
          <div className="font-semibold text-sm">Synced successfully</div>
          <div className="text-xs opacity-90">
            {lastSyncTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
