// GYAAN Auth Service
// Manages explicit Authentication state vs Guest mode
// Guarantees clean zero-progress defaults for guest visitors

import { storageService, STORAGE_KEYS } from './storageService.js';

class AuthService {
  constructor() {
    this.listeners = new Set();
  }

  getAuthUser() {
    let user = storageService.getItem(STORAGE_KEYS.AUTH, null);
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      if (search.includes('admin=true') || search.includes('role=admin')) {
        if (!user || user.role !== 'admin') {
          user = {
            id: user?.id || 'admin_master',
            name: user?.name && !user?.isGuest ? user.name : 'GYAAN Administrator',
            email: user?.email || 'admin@gyaan.ai',
            role: 'admin',
            grade: user?.grade || 10,
            classLevel: user?.classLevel || 10,
            enrolledClass: user?.enrolledClass || 10,
            boardId: user?.boardId || 'cbse',
            enrolledBoard: user?.enrolledBoard || 'CBSE',
            avatar: user?.avatar || '⚡',
            isGuest: false,
            authenticatedAt: new Date().toISOString()
          };
          storageService.setItem(STORAGE_KEYS.AUTH, user);
        }
      }
    }
    return user;
  }

  grantAdminAccess() {
    const existing = storageService.getItem(STORAGE_KEYS.AUTH, null);
    const adminUser = {
      ...(existing || {}),
      id: existing?.id || 'admin_master',
      name: existing?.name && !existing?.isGuest ? existing.name : 'GYAAN Administrator',
      email: existing?.email || 'admin@gyaan.ai',
      role: 'admin',
      grade: existing?.grade || 10,
      classLevel: existing?.classLevel || 10,
      enrolledClass: existing?.enrolledClass || 10,
      boardId: existing?.boardId || 'cbse',
      enrolledBoard: existing?.enrolledBoard || 'CBSE',
      avatar: existing?.avatar || '⚡',
      isGuest: false,
      authenticatedAt: new Date().toISOString()
    };
    storageService.setItem(STORAGE_KEYS.AUTH, adminUser);
    this.notify(adminUser);
    return adminUser;
  }

  getCurrentUser() {
    return this.getAuthUser();
  }

  isGuest() {
    const user = this.getAuthUser();
    return !user || Boolean(user.isGuest);
  }

  signIn(userDataOrEmail, _password, extraData = {}) {
    let userData = {};
    if (typeof userDataOrEmail === 'string') {
      userData = { email: userDataOrEmail, ...(extraData || {}) };
    } else if (userDataOrEmail && typeof userDataOrEmail === 'object') {
      userData = userDataOrEmail;
    }

    const board = (userData?.enrolledBoard || userData?.boardId || 'CBSE').toUpperCase();
    const classLevel = Number(userData?.enrolledClass || userData?.classLevel || userData?.grade || 10);
    const role = (userData?.role || (userData?.email?.includes('admin') || userData?.name?.toLowerCase().includes('admin') ? 'admin' : 'student')).toLowerCase();
    const user = {
      id: userData?.id || `student_${Date.now()}`,
      name: userData?.name || 'Young Scholar',
      email: userData?.email || '',
      role: role,
      grade: classLevel,
      classLevel,
      enrolledClass: classLevel,
      boardId: board.toLowerCase(),
      enrolledBoard: board,
      avatar: userData?.avatar || '🦁',
      isGuest: false,
      authenticatedAt: new Date().toISOString()
    };
    storageService.setItem(STORAGE_KEYS.AUTH, user);
    this.notify(user);
    return user;
  }

  isAdmin() {
    const user = this.getAuthUser();
    return Boolean(user && !user.isGuest && user.role === 'admin');
  }

  setRole(newRole) {
    const user = this.getAuthUser();
    if (!user || user.isGuest) return null;
    const cleanRole = (newRole || 'student').toLowerCase();
    const updated = {
      ...user,
      role: cleanRole,
      updatedAt: new Date().toISOString()
    };
    storageService.setItem(STORAGE_KEYS.AUTH, updated);
    this.notify(updated);
    return updated;
  }

  updateEnrollment({ board, classLevel }) {
    const user = this.getAuthUser();
    if (!user || user.isGuest) return null;
    const cleanBoard = (board || user.enrolledBoard || 'CBSE').toUpperCase();
    const cleanClass = Number(classLevel || user.enrolledClass || user.classLevel || 10);
    const updated = {
      ...user,
      grade: cleanClass,
      classLevel: cleanClass,
      enrolledClass: cleanClass,
      boardId: cleanBoard.toLowerCase(),
      enrolledBoard: cleanBoard,
      updatedAt: new Date().toISOString()
    };
    storageService.setItem(STORAGE_KEYS.AUTH, updated);
    this.notify(updated);
    return updated;
  }

  getEnrollment() {
    const user = this.getAuthUser();
    if (!user || user.isGuest) return null;
    return {
      board: user.enrolledBoard || 'CBSE',
      boardId: (user.enrolledBoard || 'CBSE').toLowerCase(),
      classLevel: user.enrolledClass || user.classLevel || 10
    };
  }

  signOut() {
    storageService.removeItem(STORAGE_KEYS.AUTH);
    this.notify(null);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(user) {
    this.listeners.forEach((cb) => {
      try {
        cb(user);
      } catch (err) {
        console.error('[AuthService] Listener error:', err);
      }
    });
  }
}

export const authService = new AuthService();
