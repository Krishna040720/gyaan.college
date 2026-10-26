// GYAAN Student Account & Profile Architecture
// Supports Guest mode + Authenticated Student profile persistence via storageService & authService

import { storageService, STORAGE_KEYS } from './storageService.js';
import { authService } from './authService.js';

export const GUEST_STUDENT_PROFILE = {
  id: 'guest',
  name: 'Guest Explorer',
  grade: 10,
  boardId: 'cbse',
  avatar: '🦁',
  role: 'guest',
  isGuest: true,
  createdAt: new Date().toISOString(),
  preferences: {
    soundEnabled: true,
    speechLang: 'en-IN',
    studyReminder: false
  }
};

export const studentService = {
  getProfile() {
    const authUser = authService.getAuthUser();
    if (!authUser || authUser.isGuest) {
      return { ...GUEST_STUDENT_PROFILE };
    }
    return {
      ...GUEST_STUDENT_PROFILE,
      ...authUser,
      isGuest: false
    };
  },

  updateProfile(updates) {
    if (authService.isGuest()) {
      return { ...GUEST_STUDENT_PROFILE, ...updates };
    }
    const current = this.getProfile();
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    storageService.setItem(STORAGE_KEYS.AUTH, updated);
    return updated;
  },

  exportBackup() {
    const profile = this.getProfile();
    const progress = storageService.getItem(STORAGE_KEYS.LEARNING_PROGRESS, {});
    const gamification = storageService.getItem(STORAGE_KEYS.GAMIFICATION, {});

    const backupData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      progress,
      gamification
    };

    return JSON.stringify(backupData, null, 2);
  },

  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.profile || !data.progress) {
        throw new Error('Invalid GYAAN backup file format');
      }

      if (data.profile) {
        authService.signIn(data.profile);
      }
      if (data.progress) {
        storageService.setItem(STORAGE_KEYS.LEARNING_PROGRESS, data.progress);
      }
      if (data.gamification) {
        storageService.setItem(STORAGE_KEYS.GAMIFICATION, data.gamification);
      }
      return { success: true };
    } catch (err) {
      console.error('Failed to restore backup:', err);
      return { success: false, error: err.message };
    }
  },

  exportProfileData() {
    return this.exportBackup();
  },

  importProfileData(jsonString) {
    const res = this.importBackup(jsonString);
    return Boolean(res && res.success);
  }
};
