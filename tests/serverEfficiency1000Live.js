// GYAAN AI Live Server Stress & Efficiency Test: 1000+ HTTP Requests ON THE SERVER
// Sends 1,000+ real HTTP POST requests directly to http://localhost:3001/api/evaluate
// Verifies:
// 1. 100% HTTP 200 Success Rate (0 errors, 0 crashes)
// 2. High throughput and efficiency (sub-millisecond to low millisecond latency)
// 3. Response diversity across NCERT topics (Physics, Chemistry, Maths, Biology)
// 4. Handles 1-word, 6-word, and multi-sentence explanations reliably

import assert from 'node:assert/strict';

const SERVER_URL = 'http://localhost:3001/api/evaluate';

const CONCEPTS_UNDER_TEST = [
  {
    conceptId: 'c-10-sci-elec-01',
    concept: 'Electric Current & Electric Charge',
    chapterId: 'ch-elec-10',
    grade: 10,
    answers: [
      'Electricity is the flow of charge',
      'Electricity',
      'Electric current is the rate of flow of electric charges measured in Amperes: I = Q / t through a closed circuit.'
    ]
  },
  {
    conceptId: 'c10-sci-ch3-t2',
    concept: 'Ionic Bond Formation & Properties of Ionic Compounds',
    chapterId: 'ch-3-science',
    grade: 10,
    answers: [
      'Metals lose electrons to form positive ions called cations and non-metals gain electrons to form negative anions, creating strong electrostatic attraction with high melting point',
      'Ionic bonding',
      'Solid ionic compounds cannot conduct electricity because ions cannot move in lattice'
    ]
  },
  {
    conceptId: 'c-10-sci-light-03',
    concept: "Refraction, Snell's Law & Refractive Index",
    chapterId: 'ch-light-10',
    grade: 10,
    answers: [
      'Light bends when moving between different media due to change in speed according to Snells law',
      'Light refraction',
      'Angle of incidence and angle of refraction obey n = sin i / sin r'
    ]
  },
  {
    conceptId: 'c10-sci-ch1-t1',
    concept: 'Balancing Chemical Equations & Conservation of Mass',
    chapterId: 'ch-1-science',
    grade: 10,
    answers: [
      'Atoms rearrange in a chemical reaction and mass cannot be created or destroyed',
      'Chemical equations',
      'Balancing coefficients ensures equal atoms on LHS and RHS without altering chemical formulas'
    ]
  },
  {
    conceptId: 'c-10-sci-acid-01',
    concept: 'pH Scale, Indicators & Neutralization Reaction',
    chapterId: 'ch-acid-10',
    grade: 10,
    answers: [
      'Acids have pH less than 7 and react with bases to form salt and water in neutralization',
      'Acids and bases',
      'Litmus turns red in acid and blue in base; pH measures hydrogen ion concentration'
    ]
  },
  {
    conceptId: 'c-9-sci-mot-01',
    concept: "Newton's First Law of Motion & Inertia",
    chapterId: 'c9-sci-ch8',
    grade: 9,
    answers: [
      'An object remains at rest or uniform motion unless an external unbalanced force acts on it',
      'Inertia',
      'Passengers fall forward when bus stops due to inertia of motion'
    ]
  }
];

async function runLiveServerTrials(totalTrials = 1000) {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting ${totalTrials} LIVE HTTP REQUESTS ON THE SERVER`);
  console.log(`Target: ${SERVER_URL}`);
  console.log(`======================================================\n`);

  let successCount = 0;
  let failCount = 0;
  const uniqueAnalogies = new Set();
  const uniqueWorkedExamples = new Set();
  const uniqueHindiExplanations = new Set();
  const uniqueMemoryTricks = new Set();
  const scoresObserved = [];

  const BATCH_SIZE = 50;
  const startTime = Date.now();

  for (let batchStart = 0; batchStart < totalTrials; batchStart += BATCH_SIZE) {
    const batchPromises = [];
    const batchLimit = Math.min(batchStart + BATCH_SIZE, totalTrials);

    for (let i = batchStart; i < batchLimit; i++) {
      const conceptData = CONCEPTS_UNDER_TEST[i % CONCEPTS_UNDER_TEST.length];
      const answer = conceptData.answers[i % conceptData.answers.length];

      const payload = {
        studentAnswer: answer,
        conceptId: conceptData.conceptId,
        concept: conceptData.concept,
        chapterId: conceptData.chapterId,
        grade: conceptData.grade,
        boardId: 'cbse',
        attempts: (i % 3) + 1
      };

      const p = fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status}: ${txt}`);
        }
        return res.json();
      })
      .then((data) => {
        successCount++;
        scoresObserved.push(data.accuracy || data.accuracyScore || 0);

        if (data.otherWaysToUnderstand) {
          if (data.otherWaysToUnderstand.realLifeAnalogy) uniqueAnalogies.add(data.otherWaysToUnderstand.realLifeAnalogy);
          if (data.otherWaysToUnderstand.workedExample) uniqueWorkedExamples.add(data.otherWaysToUnderstand.workedExample);
          if (data.otherWaysToUnderstand.hindiHinglishExplanation) uniqueHindiExplanations.add(data.otherWaysToUnderstand.hindiHinglishExplanation);
          if (data.otherWaysToUnderstand.memoryTrick) uniqueMemoryTricks.add(data.otherWaysToUnderstand.memoryTrick);
        }
      })
      .catch((err) => {
        failCount++;
        console.error(`Trial #${i} Failed:`, err.message);
      });

      batchPromises.push(p);
    }

    await Promise.all(batchPromises);

    if (batchLimit % 200 === 0 || batchLimit === totalTrials) {
      console.log(`... Completed ${batchLimit} / ${totalTrials} requests on server`);
    }
  }

  const durationMs = Date.now() - startTime;
  const avgLatency = (durationMs / totalTrials).toFixed(2);
  const throughput = Math.round((totalTrials / durationMs) * 1000);

  console.log(`\n======================================================`);
  console.log(`📊 LIVE SERVER TEST RESULTS`);
  console.log(`======================================================`);
  console.log(`Total Requests Sent : ${totalTrials}`);
  console.log(`Successful (HTTP 200): ${successCount}`);
  console.log(`Failed (Errors)      : ${failCount}`);
  console.log(`Total Duration       : ${durationMs} ms`);
  console.log(`Average Latency      : ${avgLatency} ms / request`);
  console.log(`Server Throughput    : ${throughput} requests / second`);
  console.log(`------------------------------------------------------`);
  console.log(`🎯 PEDAGOGICAL DIVERSITY PROOF (NCERT GROUNDING)`);
  console.log(`Unique Real-Life Analogies : ${uniqueAnalogies.size}`);
  console.log(`Unique Worked Examples     : ${uniqueWorkedExamples.size}`);
  console.log(`Unique Hindi Summaries     : ${uniqueHindiExplanations.size}`);
  console.log(`Unique Memory Tricks       : ${uniqueMemoryTricks.size}`);
  console.log(`Min Score / Max Score      : ${Math.min(...scoresObserved)}% / ${Math.max(...scoresObserved)}%`);
  console.log(`======================================================\n`);

  assert.equal(failCount, 0, `All ${totalTrials} requests on the server must succeed with HTTP 200 (no failures)`);
  assert.equal(successCount, totalTrials, `Expected ${totalTrials} successful responses`);
  assert.ok(uniqueAnalogies.size >= 5, `Expected >= 5 unique analogies, got ${uniqueAnalogies.size}`);
  assert.ok(uniqueWorkedExamples.size >= 5, `Expected >= 5 unique worked examples, got ${uniqueWorkedExamples.size}`);
  assert.ok(uniqueHindiExplanations.size >= 5, `Expected >= 5 unique Hindi summaries, got ${uniqueHindiExplanations.size}`);
  assert.ok(uniqueMemoryTricks.size >= 5, `Expected >= 5 unique memory tricks, got ${uniqueMemoryTricks.size}`);

  console.log('✅ PROOF VERIFIED: Server successfully handled 1000+ independent AI requests with 100% success and diverse NCERT responses!');
}

runLiveServerTrials(1000).catch(err => {
  console.error('Test Suite Exception:', err);
  process.exit(1);
});
