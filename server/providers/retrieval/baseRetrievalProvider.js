// Base abstract interface for Embeddings & Retrieval Providers
// Supports swappable providers: Local SQLite (BM25/Cosine), pgvector (PostgreSQL), Gemini Embeddings

export class BaseRetrievalProvider {
  constructor(config = {}) {
    this.name = config.name || 'base_retrieval';
    this.config = config;
  }

  /**
   * Generates embedding vector for a given text
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async embedText(text) {
    throw new Error(`embedText() must be implemented by ${this.constructor.name}`);
  }

  /**
   * Searches for similar curriculum chunks
   * @param {Object} options
   * @param {string} options.query - Student query or transcript
   * @param {number} [options.topK=5]
   * @param {string} [options.boardId='cbse']
   * @param {number} [options.classLevel=10]
   * @param {string} [options.subjectId='science']
   * @param {string} [options.currentChapterId]
   * @param {boolean} [options.forceCurrentChapter=false]
   * @returns {Promise<Array<{ chunk: Object, score: number, method: string }>>}
   */
  async searchSimilar({
    query,
    topK = 5,
    boardId = 'cbse',
    classLevel = 10,
    subjectId = 'science',
    currentChapterId = null,
    forceCurrentChapter = false
  }) {
    throw new Error(`searchSimilar() must be implemented by ${this.constructor.name}`);
  }

  async healthCheck() {
    return {
      healthy: true,
      provider: this.name,
      details: 'Retrieval Provider initialized'
    };
  }
}
