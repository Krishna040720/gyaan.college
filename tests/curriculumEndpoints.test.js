import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server/index.js';

describe('Curriculum REST API Endpoints Suite', () => {
  let server;
  let port;
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, () => {
        port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('GET /api/health returns health telemetry and service metadata', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'GYAAN AI Backend Service');
    assert.equal(body.version, '2026.1');
    assert.equal(typeof body.geminiConfigured, 'boolean');
  });

  it('GET /api/curriculum/boards returns all authoritative boards', async () => {
    const res = await fetch(`${baseUrl}/api/curriculum/boards`);
    assert.equal(res.status, 200);
    const boards = await res.json();
    assert.ok(Array.isArray(boards));
    assert.ok(boards.length >= 4);

    const ids = boards.map(b => b.id);
    assert.ok(ids.includes('cbse'));
    assert.ok(ids.includes('icse'));
    assert.ok(ids.includes('up_board'));
    assert.ok(ids.includes('state_boards'));
  });

  it('GET /api/curriculum/classes returns grades 1 through 12', async () => {
    const res = await fetch(`${baseUrl}/api/curriculum/classes`);
    assert.equal(res.status, 200);
    const classes = await res.json();
    assert.deepEqual(classes, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('GET /api/curriculum/subjects validates query parameters', async () => {
    // Missing class
    const missingRes = await fetch(`${baseUrl}/api/curriculum/subjects`);
    assert.equal(missingRes.status, 400);

    // Invalid class number
    const invalidRes = await fetch(`${baseUrl}/api/curriculum/subjects?class=99`);
    assert.equal(invalidRes.status, 400);

    // Invalid board
    const badBoardRes = await fetch(`${baseUrl}/api/curriculum/subjects?class=10&board=invalid_board`);
    assert.equal(badBoardRes.status, 400);

    // Valid query
    const validRes = await fetch(`${baseUrl}/api/curriculum/subjects?class=10&board=cbse`);
    assert.equal(validRes.status, 200);
    const subjects = await validRes.json();
    assert.ok(Array.isArray(subjects));
    assert.ok(subjects.length > 0);
  });

  it('GET /api/curriculum/chapters returns authentic NCERT chapters with lab activities', async () => {
    // Class 10 Science
    const sci10Res = await fetch(`${baseUrl}/api/curriculum/chapters?class=10&subject=sci-10&board=cbse`);
    assert.equal(sci10Res.status, 200);
    const sci10Chapters = await sci10Res.json();
    assert.equal(sci10Chapters.length, 13);
    assert.ok(sci10Chapters[0].title.includes('Chemical Reactions and Equations'));
    assert.ok(sci10Chapters[0].practicalActivity);
    assert.ok(sci10Chapters[0].practicalActivity.materials.length > 0);

    // Class 8 Science (NCERT 13 chapters)
    const sci8Res = await fetch(`${baseUrl}/api/curriculum/chapters?class=8&subject=sci-8&board=cbse`);
    assert.equal(sci8Res.status, 200);
    const sci8Chapters = await sci8Res.json();
    assert.equal(sci8Chapters.length, 13);
    assert.ok(sci8Chapters[0].title.includes('Crop Production and Management'));

    // Class 9 Science (NCERT 12 chapters)
    const sci9Res = await fetch(`${baseUrl}/api/curriculum/chapters?class=9&subject=sci-9&board=cbse`);
    assert.equal(sci9Res.status, 200);
    const sci9Chapters = await sci9Res.json();
    assert.equal(sci9Chapters.length, 12);
  });

  it('GET /api/curriculum/chapters does NOT fabricate chapters for uncurated grades', async () => {
    const uncuratedRes = await fetch(`${baseUrl}/api/curriculum/chapters?class=5&subject=evs-5&board=cbse`);
    assert.equal(uncuratedRes.status, 200);
    const chapters = await uncuratedRes.json();

    // Verify uncurated entries have honest status: 'curation_pending'
    chapters.forEach(ch => {
      assert.equal(ch.status, 'curation_pending');
      assert.equal(ch.isCurated, false);
      assert.ok(Array.isArray(ch.quiz));
    });
  });

  it('GET /api/curriculum/concept/:id/graph returns full prerequisite and dependent graph', async () => {
    const res = await fetch(`${baseUrl}/api/curriculum/concept/c-10-sci-elec-03/graph`);
    assert.equal(res.status, 200);
    const graph = await res.json();
    assert.ok(graph.concept);
    assert.equal(graph.concept.id, 'c-10-sci-elec-03');
    assert.ok(Array.isArray(graph.prerequisites));
    assert.ok(Array.isArray(graph.dependents));
  });
});
