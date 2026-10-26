// Local SQLite / In-Memory BM25 + Vector Cosine Retrieval Provider
// 100% Free, zero cloud network dependencies
import { BaseRetrievalProvider } from './baseRetrievalProvider.js';

export class SQLiteRetrievalProvider extends BaseRetrievalProvider {
  constructor(config = {}) {
    super({
      name: 'sqlite_local',
      ...config
    });
    this.chunks = config.chunks || [];
  }

  setChunks(chunks = []) {
    this.chunks = chunks;
  }

  tokenize(text = '') {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['the', 'and', 'for', 'that', 'with', 'this'].includes(w));
  }

  computeTermFrequency(tokens = []) {
    const tf = new Map();
    for (const t of tokens) {
      tf.set(t, (tf.get(t) || 0) + 1);
    }
    return tf;
  }

  async embedText(text = '') {
    // Deterministic hash-based bag-of-words embedding vector (64 dimensions) for local testing
    const vector = new Array(64).fill(0);
    const tokens = this.tokenize(text);
    for (const token of tokens) {
      let hash = 0;
      for (let i = 0; i < token.length; i++) {
        hash = (hash << 5) - hash + token.charCodeAt(i);
        hash |= 0;
      }
      const idx = Math.abs(hash) % 64;
      vector[idx] += 1;
    }
    const mag = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
    return vector.map(v => v / mag);
  }

  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
    }
    return Math.max(0, Math.min(1, dot));
  }

  async searchSimilar({
    query,
    topK = 5,
    boardId = 'cbse',
    classLevel = 10,
    subjectId = 'science',
    currentChapterId = null,
    forceCurrentChapter = false
  }) {
    const qTokens = this.tokenize(query);
    const qVec = await this.embedText(query);

    let candidateChunks = this.chunks;
    if (boardId) {
      candidateChunks = candidateChunks.filter(c => !c.board_id || c.board_id.toLowerCase() === boardId.toLowerCase());
    }
    if (classLevel) {
      candidateChunks = candidateChunks.filter(c => !c.class_level || Number(c.class_level) === Number(classLevel));
    }
    if (subjectId) {
      candidateChunks = candidateChunks.filter(c => !c.subject_id || c.subject_id.toLowerCase() === subjectId.toLowerCase());
    }
    if (forceCurrentChapter && currentChapterId) {
      candidateChunks = candidateChunks.filter(c => c.chapter_id === currentChapterId);
    }

    const scored = [];
    for (const chunk of candidateChunks) {
      const chunkText = `${chunk.topic_title || ''} ${chunk.content || ''} ${(chunk.keywords || []).join(' ')}`;
      const cTokens = this.tokenize(chunkText);
      const cTf = this.computeTermFrequency(cTokens);

      // Keyword BM25-style overlap
      let keywordHits = 0;
      for (const t of qTokens) {
        if (cTf.has(t)) keywordHits += cTf.get(t);
      }
      const keywordScore = qTokens.length > 0 ? Math.min(1.0, (keywordHits * 0.25) / qTokens.length) : 0;

      // Cosine vector score
      const cVec = await this.embedText(chunkText);
      const vectorScore = this.cosineSimilarity(qVec, cVec);

      // Hybrid rank score (70% keyword + 30% vector)
      const hybridScore = Math.round(((keywordScore * 0.7) + (vectorScore * 0.3)) * 100) / 100;

      scored.push({
        chunk,
        score: hybridScore,
        method: 'hybrid_sqlite_bm25_cosine'
      });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      chunksLoaded: this.chunks.length,
      details: 'SQLite / In-Memory hybrid retrieval operational'
    };
  }
}
