import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test runner
const storageMap = new Map();
globalThis.localStorage = {
  getItem: (k) => storageMap.has(k) ? storageMap.get(k) : null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

import { authService } from '../src/services/authService.js';
import { gamificationService } from '../src/services/gamificationService.js';
import { progressService } from '../src/services/progressService.js';
import { studentService } from '../src/services/studentService.js';

describe('Guest State & Zero-Progress Protection Suite', () => {
  beforeEach(() => {
    storageMap.clear();
    authService.signOut();
  });

  it('unauthenticated visitor is identified as guest', () => {
    assert.equal(authService.isGuest(), true);
    assert.equal(authService.getAuthUser(), null);
  });

  it('guest gamification state has strictly 0 XP, 0 streak, and Level 1 Guest Explorer', () => {
    const gam = gamificationService.getGamificationState();
    assert.equal(gam.isGuest, true);
    assert.equal(gam.xp, 0);
    assert.equal(gam.streak, 0);
    assert.equal(gam.level, 1);
    assert.equal(gam.title, 'Guest Explorer');
    assert.equal(gam.progressToNextLevel, 0);
    assert.ok(Array.isArray(gam.badges));
    assert.ok(gam.badges.every(b => b.unlocked === false));
  });

  it('calling checkStreak() for guest never creates fake streak or awards fake XP', () => {
    const streak = gamificationService.checkAndUpdateStreak();
    assert.equal(streak, 0);
    const gam = gamificationService.checkStreak();
    assert.equal(gam.streak, 0);
    assert.equal(gam.xp, 0);
    assert.equal(storageMap.has('gyaan_gamification_v1'), false);
  });

  it('guest progress engine returns empty queues and 0% syllabus mastery', () => {
    assert.deepEqual(progressService.getRevisionQueue(), []);
    assert.deepEqual(progressService.getWeakTopics(), []);
    assert.deepEqual(progressService.getStrongTopics(), []);
    assert.equal(progressService.getLastStudied(), null);

    const mastery = progressService.getOverallMastery();
    assert.equal(mastery.averageMastery, 0);
    assert.equal(mastery.totalTopics, 0);
    assert.equal(mastery.masteredTopics, 0);
  });

  it('guest student profile shows Guest Explorer without persistent saved state', () => {
    const profile = studentService.getProfile();
    assert.equal(profile.isGuest, true);
    assert.equal(profile.name, 'Guest Explorer');
    assert.equal(profile.role, 'guest');
  });

  it('authenticating a student creates persistent profile and enables progress tracking', () => {
    const user = authService.signIn({
      name: 'Priya Sharma',
      grade: 10,
      boardId: 'cbse',
      avatar: '🚀'
    });

    assert.equal(authService.isGuest(), false);
    assert.equal(user.name, 'Priya Sharma');
    assert.equal(user.grade, 10);

    // Profile reflects authenticated student
    const profile = studentService.getProfile();
    assert.equal(profile.isGuest, false);
    assert.equal(profile.name, 'Priya Sharma');

    // Awarding XP persists to gamification store
    const awardResult = gamificationService.awardXp('LESSON_STUDY', 'topic-1');
    assert.ok(awardResult.awarded > 0);
    const gam = gamificationService.getGamificationState();
    assert.equal(gam.isGuest, false);
    assert.equal(gam.xp, awardResult.awarded);

    // Signing out reverts cleanly to guest state
    authService.signOut();
    assert.equal(authService.isGuest(), true);
    const guestGam = gamificationService.getGamificationState();
    assert.equal(guestGam.xp, 0);
    assert.equal(guestGam.streak, 0);
    assert.equal(guestGam.isGuest, true);
  });
});
