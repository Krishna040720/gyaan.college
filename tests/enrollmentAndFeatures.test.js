// Automated Test Suite for Enrollment Locking, Due Work System, and Natural Voice Cleaning
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node environment
const storageMap = new Map();
if (!globalThis.localStorage) {
  globalThis.localStorage = {
    getItem: (k) => storageMap.has(k) ? storageMap.get(k) : null,
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: (k) => storageMap.delete(k),
    clear: () => storageMap.clear()
  };
}

import { authService } from '../src/services/authService.js';
import { curriculumService } from '../src/services/curriculumService.js';
import { dueWorkService } from '../src/services/dueWorkService.js';
import { cleanSpeechText, chunkIntoSentences } from '../src/services/aiVoiceService.js';
import { storageService, STORAGE_KEYS } from '../src/services/storageService.js';

describe('Enrollment Context Locking & Academic Integrity Suite', () => {
  beforeEach(() => {
    storageMap.clear();
    authService.signOut();
  });

  test('guest user has no locked enrollment and can explore all classes freely', () => {
    assert.equal(authService.isGuest(), true);
    assert.equal(authService.getEnrollment(), null);
    
    // Guest calling assertLocalEnrollmentMatch should not throw
    assert.doesNotThrow(() => {
      curriculumService.assertLocalEnrollmentMatch(4, 'cbse');
      curriculumService.assertLocalEnrollmentMatch(10, 'icse');
    });
  });

  test('authenticating locks student to enrolledBoard and enrolledClass', () => {
    const user = authService.signIn({
      name: 'Priya Sharma',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    assert.equal(authService.isGuest(), false);
    assert.equal(user.enrolledClass, 10);
    assert.equal(user.enrolledBoard, 'CBSE');

    const enrollment = authService.getEnrollment();
    assert.deepEqual(enrollment, {
      board: 'CBSE',
      boardId: 'cbse',
      classLevel: 10
    });

    // Mismatched class access should be rejected with ENROLLED_CONTEXT_MISMATCH
    assert.throws(() => {
      curriculumService.assertLocalEnrollmentMatch(4, 'cbse');
    }, (err) => {
      return err.code === 'ENROLLED_CONTEXT_MISMATCH' && err.status === 403;
    });

    // Mismatched board access should be rejected with ENROLLED_CONTEXT_MISMATCH
    assert.throws(() => {
      curriculumService.assertLocalEnrollmentMatch(10, 'up_board');
    }, (err) => {
      return err.code === 'ENROLLED_CONTEXT_MISMATCH' && err.status === 403;
    });

    // Matching class and board access succeeds
    assert.doesNotThrow(() => {
      curriculumService.assertLocalEnrollmentMatch(10, 'cbse');
    });
  });

  test('updateEnrollment transitions the student to the confirmed target class and board', () => {
    authService.signIn({
      name: 'Aditya Verma',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const updated = authService.updateEnrollment({
      board: 'ICSE',
      classLevel: 11
    });

    assert.equal(updated.enrolledClass, 11);
    assert.equal(updated.enrolledBoard, 'ICSE');

    const newEnrollment = authService.getEnrollment();
    assert.equal(newEnrollment.classLevel, 11);
    assert.equal(newEnrollment.board, 'ICSE');

    // Access to Class 11 ICSE now succeeds
    assert.doesNotThrow(() => {
      curriculumService.assertLocalEnrollmentMatch(11, 'icse');
    });

    // Access to previous Class 10 is now restricted
    assert.throws(() => {
      curriculumService.assertLocalEnrollmentMatch(10, 'icse');
    }, (err) => err.code === 'ENROLLED_CONTEXT_MISMATCH');
  });

  test('signOut clears enrollment and restores unrestricted guest browsing', () => {
    authService.signIn({
      name: 'Rohan Gupta',
      enrolledClass: 9,
      enrolledBoard: 'CBSE'
    });

    assert.equal(authService.isGuest(), false);
    authService.signOut();

    assert.equal(authService.isGuest(), true);
    assert.equal(authService.getEnrollment(), null);

    // Browsing is unrestricted again
    assert.doesNotThrow(() => {
      curriculumService.assertLocalEnrollmentMatch(6, 'up_board');
    });
  });
});

describe('Due Work & Spaced Repetition Computation Suite', () => {
  beforeEach(() => {
    storageService.removeItem(STORAGE_KEYS.AUTH);
  });

  test('unauthenticated guest receives 0 due tasks and isGuest flag', () => {
    const due = dueWorkService.getDueWork({ grade: 10, boardId: 'cbse' });
    assert.equal(due.isGuest, true);
    assert.equal(due.totalCount, 0);
    assert.equal(due.overdue.length, 0);
    assert.equal(due.dueToday.length, 0);
  });

  test('authenticated student receives prioritized curriculum tasks with valid structure', () => {
    authService.signIn({
      name: 'Ananya Sen',
      enrolledClass: 10,
      enrolledBoard: 'CBSE'
    });

    const due = dueWorkService.getDueWork({ grade: 10, boardId: 'cbse' });
    assert.equal(due.isGuest, false);
    assert.ok(due.totalCount >= 1, 'Should have at least 1 due item');

    const firstTask = due.dueToday[0] || due.overdue[0];
    assert.ok(firstTask.conceptId, 'Must have conceptId');
    assert.ok(firstTask.conceptTitle, 'Must have conceptTitle');
    assert.ok(firstTask.subjectName, 'Must have subjectName');
    assert.ok(firstTask.taskType, 'Must have taskType');
    assert.ok(firstTask.reason, 'Must have pedagogical reason');
    assert.ok(firstTask.priority, 'Must have priority tag');
    assert.ok(firstTask.actionLabel, 'Must have action trigger');
  });
});

describe('Natural Voice Cleaning & Sentence Chunking Suite', () => {
  test('cleanSpeechText strips markdown, badges, and emojis', () => {
    const dirtyText = "★ [EXAM FOCUS] **Ohm's Law** states that: `V = I · R`! 🚀 🦁";
    const cleaned = cleanSpeechText(dirtyText);
    
    assert.ok(!cleaned.includes('★'), 'Should strip star');
    assert.ok(!cleaned.includes('[EXAM FOCUS]'), 'Should strip exam badge');
    assert.ok(!cleaned.includes('**'), 'Should strip markdown bold');
    assert.ok(!cleaned.includes('`'), 'Should strip backticks');
    assert.ok(!cleaned.includes('🚀'), 'Should strip rocket emoji');
    assert.ok(!cleaned.includes('🦁'), 'Should strip lion emoji');
    assert.ok(cleaned.includes("Ohm's Law states that"), 'Should keep content');
  });

  test('cleanSpeechText translates scientific and mathematical symbols into spoken words', () => {
    const scientific = "Resistance is 25 Ω and temperature change is ΔT = 5 °C with a 10% tolerance.";
    const cleaned = cleanSpeechText(scientific);

    assert.ok(cleaned.includes('25 ohms'), 'Should convert Ω to ohms');
    assert.ok(cleaned.includes('change in T') || cleaned.includes('delta T'), 'Should convert Δ to spoken change or delta');
    assert.ok(cleaned.includes('degrees Celsius'), 'Should convert °C to degrees Celsius');
    assert.ok(cleaned.includes('percent'), 'Should convert % to percent');
  });

  test('chunkIntoSentences splits paragraphs into natural sequential speech chunks', () => {
    const paragraph = "Electric current is the rate of flow of charge. It is measured in amperes using an ammeter! Does Ohm's law apply at all temperatures?";
    const chunks = chunkIntoSentences(paragraph);

    assert.equal(chunks.length, 3);
    assert.equal(chunks[0], 'Electric current is the rate of flow of charge.');
    assert.equal(chunks[1], 'It is measured in amperes using an ammeter!');
    assert.equal(chunks[2], "Does Ohm's law apply at all temperatures?");
  });
});
