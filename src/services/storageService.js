// GYAAN Storage Service
// Centralized, namespaced, and versioned storage manager
// Guarantees clean separation between Guest state and Authenticated Student data

export const STORAGE_KEYS = {
  AUTH: 'gyaan_auth_v1',
  PREFERENCES: 'gyaan_preferences_v1',
  LEARNING_PROGRESS: 'gyaan_learning_progress_v1',
  GAMIFICATION: 'gyaan_gamification_v1',
  CONTENT_CACHE: 'gyaan_content_cache_v1'
};

export const storageService = {
  getItem(key, fallback = null) {
    if (typeof localStorage === 'undefined') {
      return fallback;
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`[storageService] Error parsing item for key "${key}":`, e);
      return fallback;
    }
  },

  setItem(key, value) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`[storageService] Error storing item for key "${key}":`, e);
    }
  },

  removeItem(key) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`[storageService] Error removing key "${key}":`, e);
    }
  },

  clearUserData() {
    this.removeItem(STORAGE_KEYS.AUTH);
    this.removeItem(STORAGE_KEYS.LEARNING_PROGRESS);
    this.removeItem(STORAGE_KEYS.GAMIFICATION);
  }
};
