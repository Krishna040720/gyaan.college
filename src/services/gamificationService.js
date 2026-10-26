// GYAAN Gamification Engine: XP, Daily Streaks, Anti-Abuse & Badges
// Enforces structured rules and prevents spamming unlimited XP
// Fully integrated with authService & storageService: Guests have 0 XP, 0 streak, no fake progress

import { storageService, STORAGE_KEYS } from './storageService.js';
import { authService } from './authService.js';

export const XP_RULES = {
  LESSON_STUDY: 10,
  QUIZ_COMPLETE: 15,
  QUIZ_PERFECT: 10, // bonus for 100%
  VOICE_EXPLANATION: 25,
  VOICE_ACCURACY_BONUS: 15, // bonus for 80%+ accuracy
  WEAK_TOPIC_IMPROVED: 30
};

export const BADGE_DEFINITIONS = [
  {
    id: 'first_step',
    title: 'Curious Scholar',
    desc: 'Completed your first study session',
    icon: '🌱',
    condition: (state) => (state.xp || 0) >= 10
  },
  {
    id: 'voice_pioneer',
    title: 'Voice Pioneer',
    desc: 'Spoke your first explanation to Gyan Guru',
    icon: '🎙️',
    condition: (state) => (state.voiceCount || 0) >= 1
  },
  {
    id: 'feynman_master',
    title: 'Feynman Master',
    desc: 'Achieved 80%+ accuracy in AI voice explanation',
    icon: '🧠',
    condition: (state) => (state.highAccuracyVoiceCount || 0) >= 1
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace',
    desc: 'Completed 3 practice quizzes with distinction',
    icon: '🎯',
    condition: (state) => (state.quizCount || 0) >= 3
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    desc: 'Maintained 3 consecutive days of active learning',
    icon: '🔥',
    condition: (state) => (state.streak || 0) >= 3
  },
  {
    id: 'century_club',
    title: 'Knowledge Century',
    desc: 'Earned 500+ XP in total learning activities',
    icon: '👑',
    condition: (state) => (state.xp || 0) >= 500
  }
];

function getSafeState() {
  if (authService.isGuest()) {
    return {
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      awardedActions: {},
      voiceCount: 0,
      highAccuracyVoiceCount: 0,
      quizCount: 0,
      isGuest: true
    };
  }

  const stored = storageService.getItem(STORAGE_KEYS.GAMIFICATION, null);
  if (!stored) {
    return {
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      awardedActions: {},
      voiceCount: 0,
      highAccuracyVoiceCount: 0,
      quizCount: 0,
      isGuest: false
    };
  }
  return stored;
}

function saveSafeState(state) {
  if (authService.isGuest()) {
    // Unauthenticated visitors do not write persistent progress
    return;
  }
  storageService.setItem(STORAGE_KEYS.GAMIFICATION, state);
}

export const gamificationService = {
  getState() {
    return getSafeState();
  },

  checkAndUpdateStreak() {
    if (authService.isGuest()) {
      return 0;
    }

    const state = getSafeState();
    const today = new Date().toISOString().split('T')[0];
    const last = state.lastActiveDate;

    if (!last) {
      state.streak = 1;
      state.lastActiveDate = today;
      saveSafeState(state);
      return state.streak;
    }

    if (last === today) {
      // Already active today, maintain current streak
      return state.streak;
    }

    const lastDate = new Date(last);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      state.streak += 1;
    } else if (diffDays > 1) {
      // Streak broke, reset to 1
      state.streak = 1;
    }

    state.lastActiveDate = today;
    saveSafeState(state);
    return state.streak;
  },

  /**
   * Awards XP with deduplication protection.
   * Prevents students from spamming clicks to get unlimited XP.
   */
  awardXp(actionType, contextId = '', bonusAmount = 0) {
    if (authService.isGuest()) {
      const baseAmount = XP_RULES[actionType] || 10;
      return { awarded: baseAmount + bonusAmount, totalXp: 0, reason: 'guest_session', isGuest: true };
    }

    const state = getSafeState();
    this.checkAndUpdateStreak();

    const baseAmount = XP_RULES[actionType] || 10;
    const actionKey = `${actionType}:${contextId}`;
    const now = Date.now();
    const lastAwarded = state.awardedActions?.[actionKey] || 0;

    // Cooldown check: same action on the same topic must be separated by at least 60 seconds
    if (contextId && (now - lastAwarded < 60000)) {
      return { awarded: 0, totalXp: state.xp, reason: 'cooldown' };
    }

    const totalToAward = baseAmount + bonusAmount;
    state.xp = (state.xp || 0) + totalToAward;
    if (!state.awardedActions) state.awardedActions = {};
    state.awardedActions[actionKey] = now;

    if (actionType === 'VOICE_EXPLANATION') {
      state.voiceCount = (state.voiceCount || 0) + 1;
      if (bonusAmount > 0) {
        state.highAccuracyVoiceCount = (state.highAccuracyVoiceCount || 0) + 1;
      }
    } else if (actionType === 'QUIZ_COMPLETE') {
      state.quizCount = (state.quizCount || 0) + 1;
    }

    saveSafeState(state);
    return { awarded: totalToAward, totalXp: state.xp, reason: 'success' };
  },

  getBadges() {
    if (authService.isGuest()) {
      return BADGE_DEFINITIONS.map(badge => ({
        ...badge,
        unlocked: false
      }));
    }
    const state = getSafeState();
    return BADGE_DEFINITIONS.map(badge => ({
      ...badge,
      unlocked: badge.condition(state)
    }));
  },

  getLevel() {
    if (authService.isGuest()) {
      return {
        level: 1,
        currentLevelXp: 0,
        nextLevelXp: 100,
        percentage: 0
      };
    }
    const state = getSafeState();
    const level = Math.floor((state.xp || 0) / 100) + 1;
    const currentLevelXp = (state.xp || 0) % 100;
    return {
      level,
      currentLevelXp,
      nextLevelXp: 100,
      percentage: currentLevelXp
    };
  },

  checkStreak() {
    this.checkAndUpdateStreak();
    return this.getGamificationState();
  },

  getGamificationState() {
    if (authService.isGuest()) {
      return {
        xp: 0,
        streak: 0,
        level: 1,
        title: 'Guest Explorer',
        nextLevelXp: 100,
        currentLevelBaseXp: 0,
        progressToNextLevel: 0,
        badges: BADGE_DEFINITIONS.map(b => ({ ...b, unlocked: false })),
        voiceCount: 0,
        quizCount: 0,
        isGuest: true
      };
    }

    const state = getSafeState();
    const levelInfo = this.getLevel();
    const badges = this.getBadges();
    const titles = ['Curious Thinker', 'Active Learner', 'Fearless Communicator', 'Feynman Scholar', 'Board Master'];
    const title = titles[Math.min(levelInfo.level - 1, titles.length - 1)];

    return {
      xp: state.xp || 0,
      streak: state.streak || 0,
      level: levelInfo.level,
      title,
      nextLevelXp: levelInfo.level * 100,
      currentLevelBaseXp: (levelInfo.level - 1) * 100,
      progressToNextLevel: levelInfo.percentage,
      badges,
      voiceCount: state.voiceCount || 0,
      quizCount: state.quizCount || 0,
      isGuest: false
    };
  }
};
