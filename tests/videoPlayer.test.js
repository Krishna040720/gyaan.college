import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

function resolvePlayerState({ video, selectedClass }) {
  const videoId = video?.id;
  const isClassValid = !video?.classLevel || !selectedClass || Number(video.classLevel) === Number(selectedClass);
  const isValidYouTubeId = Boolean(videoId && YOUTUBE_ID_REGEX.test(videoId));
  const isAvailable = Boolean(videoId && isValidYouTubeId && isClassValid);

  if (!isAvailable) {
    return 'UNAVAILABLE';
  }
  return 'READY';
}

describe('Video Player Integrity & State Resolution Suite', () => {

  it('correctly accepts standard 11-character YouTube video IDs', () => {
    const validIds = ['gQ-X9wV8TXQ', 'UI8nM-dSfh4', '2anxgj0TUgQ', '1Y_sfMEmyPY', 'fl-Q_bT-oO0'];
    for (const id of validIds) {
      assert.ok(YOUTUBE_ID_REGEX.test(id), `Expected ${id} to be valid`);
    }
  });

  it('rejects invalid, malformed, or injected YouTube IDs', () => {
    const invalidIds = ['', 'short', 'way_too_long_for_youtube_id', 'invalid@char', 'bad id 1234'];
    for (const id of invalidIds) {
      assert.equal(YOUTUBE_ID_REGEX.test(id), false, `Expected ${id} to be rejected`);
    }
  });

  it('transitions to UNAVAILABLE when video object is null or missing id', () => {
    const stateNull = resolvePlayerState({ video: null, selectedClass: 4 });
    assert.equal(stateNull, 'UNAVAILABLE');

    const stateNoId = resolvePlayerState({ video: { title: 'Pending' }, selectedClass: 4 });
    assert.equal(stateNoId, 'UNAVAILABLE');
  });

  it('transitions to UNAVAILABLE when video classLevel does not match selected class', () => {
    // Class 10 video requested in Class 4 context
    const stateMismatch = resolvePlayerState({
      video: { id: 'gQ-X9wV8TXQ', classLevel: 10 },
      selectedClass: 4
    });
    assert.equal(stateMismatch, 'UNAVAILABLE');
  });

  it('transitions to READY when valid YouTube video matches selected class', () => {
    const stateMatch = resolvePlayerState({
      video: { id: 'gQ-X9wV8TXQ', classLevel: 10 },
      selectedClass: 10
    });
    assert.equal(stateMatch, 'READY');
  });
});
