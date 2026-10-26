import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getGradeData } from '../src/data/curriculumData.js';
import { curriculumService } from '../src/services/curriculumService.js';
import { curriculumHierarchyService } from '../src/services/curriculumHierarchyService.js';
import fs from 'node:fs';
import path from 'node:path';

describe('Phase 1: Notes & Mindmap Navigation and Data Integrity Suite', () => {

  it('1. Class 11 Mathematics contains all 14 chapters starting with Chapter 1: Sets', () => {
    const class11Data = getGradeData(11, 'cbse');
    const mathSubject = class11Data.subjects.find(s => s.name.toLowerCase().includes('math'));
    assert.ok(mathSubject, 'Mathematics subject must exist for Class 11 CBSE');
    assert.equal(mathSubject.chapters.length, 14, 'Class 11 Mathematics must have all 14 statutory chapters');

    const ch1 = mathSubject.chapters[0];
    assert.equal(ch1.id, 'c11-math-ch1', 'Chapter 1 ID must be c11-math-ch1');
    assert.equal(ch1.chapterNumber, 1, 'Chapter 1 number must be 1');
    assert.match(ch1.title, /sets/i, 'Chapter 1 title must contain "Sets"');

    // Verify all 14 chapter titles in order
    const expectedTitles = [
      'Sets',
      'Relations and Functions',
      'Trigonometric Functions',
      'Complex Numbers and Quadratic Equations',
      'Linear Inequalities',
      'Permutations and Combinations',
      'Binomial Theorem',
      'Sequences and Series',
      'Straight Lines',
      'Conic Sections',
      'Introduction to Three-Dimensional Geometry',
      'Limits and Derivatives',
      'Statistics',
      'Probability'
    ];

    expectedTitles.forEach((expectedTitle, idx) => {
      const ch = mathSubject.chapters[idx];
      assert.ok(ch, `Chapter ${idx + 1} must exist`);
      assert.equal(ch.chapterNumber, idx + 1);
      assert.ok(ch.title.toLowerCase().includes(expectedTitle.toLowerCase()), `Chapter ${idx + 1} should be ${expectedTitle}, got: ${ch.title}`);
    });
  });

  it('2. Notes service resolves Chapter 1 (Sets) notes data successfully', async () => {
    const notes = await curriculumService.getNotes('c11-math-ch1', { boardId: 'cbse', classNum: 11, subjectId: 'math' });
    assert.ok(notes, 'Notes must be returned for c11-math-ch1');
    assert.match(notes.chapterTitle, /sets/i);
    assert.ok(notes.topics && notes.topics.length >= 3, 'Sets notes must have at least 3 topics');
    assert.ok(notes.summary, 'Sets notes must have summary');
  });

  it('3. Mindmap hierarchy resolves for Chapter 1 (Sets)', () => {
    const class11Data = getGradeData(11, 'cbse');
    const mathSubject = class11Data.subjects.find(s => s.name.toLowerCase().includes('math'));
    const ch1 = mathSubject.chapters[0];

    const hierarchy = curriculumHierarchyService.getChapterHierarchy(ch1, { boardId: 'cbse', classNum: 11, subjectId: 'math' });
    assert.ok(hierarchy, 'Hierarchy must resolve for Sets');
    assert.equal(hierarchy.chapterId, 'c11-math-ch1');
    const childCount = (hierarchy.units?.length || 0) + (hierarchy.topics?.length || 0);
    assert.ok(childCount > 0, 'Hierarchy must have units or topics');
  });

  it('4. Disallowed phrases "Official NCERT Curriculum Notes" and "Verified Academic Study Material" are absent from code', () => {
    const filesToCheck = [
      'src/components/notes/ChapterNotesView.jsx',
      'src/components/ClassOverview.jsx',
      'src/App.jsx',
      'src/index.css'
    ];

    for (const file of filesToCheck) {
      const fullPath = path.resolve(file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        assert.ok(!content.includes('Official NCERT Curriculum Notes'), `${file} must not contain "Official NCERT Curriculum Notes"`);
        assert.ok(!content.includes('Verified Academic Study Material'), `${file} must not contain "Verified Academic Study Material"`);
      }
    }
  });

  it('5. Print headers and footers are suppressed in CSS', () => {
    const cssPath = path.resolve('src/index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('.print-header-banner'), 'index.css should reference .print-header-banner');
    assert.ok(cssContent.includes('.print-footer-banner'), 'index.css should reference .print-footer-banner');
    assert.ok(cssContent.includes('display: none !important;'), 'banners must be hidden in print styles');
  });
});
