'use client';

import { useState, useEffect, useCallback } from 'react';

export function useRealtimeSync<T>(apiUrl: string, initialData: T[]): T[] {
  const [data, setData] = useState<T[]>(initialData);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setData(json.data);
        }
      }
    } catch (err) {
      // Silently keep current data
    }
  }, [apiUrl]);

  useEffect(() => {
    // 1. Initial background fetch
    fetchLatest();

    // 2. BroadcastChannel for instant cross-tab updates (<50ms)
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('visha_cms_sync');
      channel.onmessage = () => {
        fetchLatest();
      };
    } catch (e) {
      // BroadcastChannel not supported in older browsers
    }

    // 3. Storage event listener (fallback cross-tab signal)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'visha_cms_last_update') {
        fetchLatest();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 4. Polling interval (3 seconds) for live cross-device sync
    const interval = setInterval(fetchLatest, 3000);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [fetchLatest]);

  return data;
}

export function notifyCmsUpdate(entity: string) {
  try {
    const channel = new BroadcastChannel('visha_cms_sync');
    channel.postMessage({ type: 'CMS_UPDATED', entity, timestamp: Date.now() });
    channel.close();
  } catch (e) {}

  try {
    localStorage.setItem('visha_cms_last_update', Date.now().toString());
  } catch (e) {}
}
