// High-Performance In-Memory Cache for Admin Dashboard
// Provides instant (<5ms) responses on page reloads and tab navigations

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let cachedDashboardData: CacheEntry<any> | null = null;
const CACHE_TTL_MS = 25000; // 25 seconds TTL

export function getCachedDashboardData<T>(): T | null {
  if (!cachedDashboardData) return null;
  const age = Date.now() - cachedDashboardData.timestamp;
  if (age < CACHE_TTL_MS) {
    return cachedDashboardData.data as T;
  }
  return null;
}

export function setCachedDashboardData<T>(data: T): void {
  cachedDashboardData = {
    data,
    timestamp: Date.now(),
  };
}

export function invalidateDashboardCache(): void {
  cachedDashboardData = null;
}
