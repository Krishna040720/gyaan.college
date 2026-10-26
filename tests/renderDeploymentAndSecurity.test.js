import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer, demoStore } from '../server/index.js';

describe('Render Deployment, Security & Startup Seed Suite', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it('1. GET /api/health returns 200 with status ok and startup seed confirmation', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'ok');
    assert.equal(data.service, 'GYAAN AI Backend Service');
    assert.equal(data.demoSeeded, true);
    assert.ok(data.sampleStudent.includes('Demo data'));
    assert.equal(data.flagshipChapter, 'Electricity');
  });

  it('2. GET /api/demo returns flagship chapter and sample student labelled "Demo data"', async () => {
    const res = await fetch(`${baseUrl}/api/demo`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.curriculum);
    assert.equal(data.flagshipChapter.title, 'Electricity');
    assert.equal(data.flagshipChapter.classLevel, 10);
    assert.equal(data.sampleStudent.label, 'Demo data');
    assert.equal(data.sampleStudent.name, 'Aarav Sharma (Demo data)');
    assert.equal(data.sampleStudent.role, 'student');
  });

  it('3. GET /api/voice/logs returns 403 Forbidden for unauthenticated requests', async () => {
    const res = await fetch(`${baseUrl}/api/voice/logs`);
    assert.equal(res.status, 403);
    const data = await res.json();
    assert.ok(data.error.includes('Admin role required'));
  });

  it('4. GET /api/voice/logs returns 403 Forbidden for non-admin student role', async () => {
    const res = await fetch(`${baseUrl}/api/voice/logs`, {
      headers: { 'x-user-role': 'student' }
    });
    assert.equal(res.status, 403);
    const data = await res.json();
    assert.ok(data.error.includes('Admin role required'));
  });

  it('5. GET /api/voice/logs returns 200 OK for admin role with seeded diagnostic traces', async () => {
    const res = await fetch(`${baseUrl}/api/voice/logs`, {
      headers: { 'x-user-role': 'admin' }
    });
    assert.equal(res.status, 200);
    const logs = await res.json();
    assert.ok(Array.isArray(logs));
    assert.ok(logs.length > 0);
    assert.equal(logs[0].chapter_title, 'Electricity');
  });

  it('6. POST /api/voice/seed-demo-logs returns 404 (endpoint removed)', async () => {
    const res = await fetch(`${baseUrl}/api/voice/seed-demo-logs`, {
      method: 'POST'
    });
    assert.equal(res.status, 404);
  });

  it('7. POST /api/voice/cleanup enforces admin role (403 for student, 200 for admin)', async () => {
    const resDenied = await fetch(`${baseUrl}/api/voice/cleanup`, {
      method: 'POST',
      headers: { 'x-user-role': 'student' }
    });
    assert.equal(resDenied.status, 403);

    const resAllowed = await fetch(`${baseUrl}/api/voice/cleanup`, {
      method: 'POST',
      headers: { 'x-user-role': 'admin' }
    });
    assert.equal(resAllowed.status, 200);
    const data = await resAllowed.json();
    assert.equal(data.status, 'ok');
  });

  it('8. DELETE /api/voice/logs enforces admin role (403 for student, 200 for admin)', async () => {
    const resDenied = await fetch(`${baseUrl}/api/voice/logs`, {
      method: 'DELETE',
      headers: { 'x-user-role': 'student' }
    });
    assert.equal(resDenied.status, 403);

    const resAllowed = await fetch(`${baseUrl}/api/voice/logs`, {
      method: 'DELETE',
      headers: { 'x-user-role': 'admin' }
    });
    assert.equal(resAllowed.status, 200);
    const data = await resAllowed.json();
    assert.equal(data.status, 'ok');
  });
});
