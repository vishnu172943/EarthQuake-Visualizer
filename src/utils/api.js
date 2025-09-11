// src/utils/api.js

// Cache configuration
export const CACHE_CONFIG = {
  EXPIRY_TIMES: {
    all_hour: 5 * 60 * 1000,      // 5 minutes
    all_day: 15 * 60 * 1000,      // 15 minutes
    all_week: 30 * 60 * 1000,     // 30 minutes
    all_month: 60 * 60 * 1000     // 1 hour
  },
  STORAGE_KEYS: {
    all_hour: 'earthquake_cache_hour',
    all_day: 'earthquake_cache_day',
    all_week: 'earthquake_cache_week',
    all_month: 'earthquake_cache_month'
  },
  FETCH_TIMEOUT: 30000, // 30 seconds timeout
  MAX_RETRIES: 3
};

// API endpoints
export const API_ENDPOINTS = {
  all_hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
  all_day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  all_week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
  all_month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
};

// Fetch with timeout and retry
const fetchWithTimeout = async (url, timeout = CACHE_CONFIG.FETCH_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - the data might be too large. Please try again.');
    }
    throw error;
  }
};

export const fetchWithRetry = async (url, retries = CACHE_CONFIG.MAX_RETRIES) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url);
      if (response.ok) return response;
      
      if (response.status < 500) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      
      if (i === retries - 1) throw error;
      
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};

// Cache management utilities
export const CacheManager = {
  isCacheValid: (timeRange) => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.STORAGE_KEYS[timeRange]);
      if (!cached) return false;
      
      const { timestamp } = JSON.parse(cached);
      const expiryTime = CACHE_CONFIG.EXPIRY_TIMES[timeRange];
      return (Date.now() - timestamp) < expiryTime;
    } catch (error) {
      console.error('Error checking cache validity:', error);
      return false;
    }
  },

  getCachedData: (timeRange) => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.STORAGE_KEYS[timeRange]);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const expiryTime = CACHE_CONFIG.EXPIRY_TIMES[timeRange];
      
      if ((Date.now() - timestamp) < expiryTime) {
        return data;
      }
      
      localStorage.removeItem(CACHE_CONFIG.STORAGE_KEYS[timeRange]);
      return null;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  },

  setCachedData: (timeRange, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(
        CACHE_CONFIG.STORAGE_KEYS[timeRange],
        JSON.stringify(cacheData)
      );
    } catch (error) {
      console.warn('Failed to cache data:', error);
      if (error.name === 'QuotaExceededError') {
        CacheManager.clearOldCache();
      }
    }
  },

  clearOldCache: () => {
    Object.keys(CACHE_CONFIG.STORAGE_KEYS).forEach(key => {
      try {
        const cached = localStorage.getItem(CACHE_CONFIG.STORAGE_KEYS[key]);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          const expiryTime = CACHE_CONFIG.EXPIRY_TIMES[key];
          if ((Date.now() - timestamp) > expiryTime) {
            localStorage.removeItem(CACHE_CONFIG.STORAGE_KEYS[key]);
          }
        }
      } catch { // Removed unused 'error' variable
        localStorage.removeItem(CACHE_CONFIG.STORAGE_KEYS[key]);
      }
    });
  },

  clearAllCache: () => {
    Object.values(CACHE_CONFIG.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};