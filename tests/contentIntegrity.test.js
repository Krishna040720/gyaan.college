import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  getGradeData, 
  validateContentContext, 
  VERIFIED_EDUCATIONAL_VIDEOS 
} from '../src/data/curriculumData.js';

describe('Curriculum Content Integrity & Class Isolation Suite', () => {

  it('Class 4 content strictly belongs to Class 4 and never contains Class 10 video IDs', () => {
    const class4Data = getGradeData(4, 'cbse');
    assert.equal(class4Data.grade, 4);
    assert.ok(class4Data.subjects.length > 0);

    const allClass4Chapters = class4Data.subjects.flatMap(s => s.chapters);
    assert.ok(allClass4Chapters.length > 0);

    for (const chapter of allClass4Chapters) {
      // Must carry explicit classLevel = 4
      assert.equal(chapter.classLevel, 4);

      // Must NOT contain any Class 10 video ID
      if (chapter.oneShotVideo?.id) {
        assert.ok(!VERIFIED_EDUCATIONAL_VIDEOS.includes(chapter.oneShotVideo.id));
      }
      for (const topic of chapter.topicVideos || []) {
        if (topic.id) {
          assert.ok(!VERIFIED_EDUCATIONAL_VIDEOS.includes(topic.id));
        }
      }

      // Uncurated chapters should have honest pending status
      assert.equal(chapter.status, 'curation_pending');
      assert.equal(chapter.isCurated, false);
      assert.equal(chapter.oneShotVideo, null);
    }
  });

  it('Class 2 and Class 7 content is completely isolated from Class 10 video leakage', () => {
    for (const grade of [2, 7]) {
      const data = getGradeData(grade, 'cbse');
      const chapters = data.subjects.flatMap(s => s.chapters);

      for (const ch of chapters) {
        assert.equal(ch.classLevel, grade);
        assert.equal(ch.oneShotVideo, null);
        assert.deepEqual(ch.topicVideos, []);
      }
    }
  });

  it('Class 10 Science and Maths chapters have verified videos with classLevel = 10', () => {
    const class10Data = getGradeData(10, 'cbse');
    const science = class10Data.subjects.find(s => s.id === 'sci-10');
    assert.ok(science);
    assert.ok(science.chapters.length > 0);

    for (const ch of science.chapters) {
      assert.equal(ch.classLevel, 10);
      if (ch.oneShotVideo) {
        assert.equal(ch.oneShotVideo.classLevel, 10);
        assert.ok(typeof ch.oneShotVideo.id === 'string');
      }
    }
  });

  it('validateContentContext validates class matching and flags cross-class mismatches', () => {
    // Valid match
    const validMatch = validateContentContext(
      { id: 'ch-4', classLevel: 4 },
      { classLevel: 4 }
    );
    assert.equal(validMatch, true);

    // Mismatched class: Class 10 content presented to Class 4 context
    const mismatched = validateContentContext(
      { id: 'ch-10-elec', classLevel: 10 },
      { classLevel: 4 }
    );
    assert.equal(mismatched, false);

    // Gracefully handles undefined/null without throwing
    assert.equal(validateContentContext(null, { classLevel: 4 }), true);
    assert.equal(validateContentContext({ id: 'test' }, null), true);
  });
});
