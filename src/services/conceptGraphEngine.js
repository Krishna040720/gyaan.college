// GYAAN AI Concept Graph & Prerequisite Diagnostic Engine
// Models concept dependencies as a Directed Acyclic Graph (DAG)
// Diagnoses foundational weaknesses and calculates spaced repetition schedules

import { CONCEPTS_REPOSITORY } from '../data/conceptKnowledgeBase.js';

export class ConceptGraphEngine {
  constructor(concepts = CONCEPTS_REPOSITORY) {
    this.conceptsMap = new Map();
    this.adjacencyList = new Map(); // conceptId -> dependent conceptIds
    this.reverseAdjacency = new Map(); // conceptId -> prerequisite conceptIds
    this.initGraph(concepts);
  }

  initGraph(concepts) {
    this.conceptsMap.clear();
    this.adjacencyList.clear();
    this.reverseAdjacency.clear();

    concepts.forEach(c => {
      this.conceptsMap.set(c.id, c);
      this.adjacencyList.set(c.id, new Set());
      this.reverseAdjacency.set(c.id, new Set());
    });

    concepts.forEach(c => {
      (c.prerequisites || []).forEach(prereqId => {
        if (this.conceptsMap.has(prereqId)) {
          this.adjacencyList.get(prereqId).add(c.id);
          this.reverseAdjacency.get(c.id).add(prereqId);
        }
      });
    });
  }

  /**
   * Returns immediate and upstream prerequisites for a concept
   */
  getPrerequisites(conceptId) {
    const concept = this.conceptsMap.get(conceptId);
    if (!concept) return [];
    return (concept.prerequisites || [])
      .map(id => this.conceptsMap.get(id))
      .filter(Boolean);
  }

  /**
   * Returns downstream concepts that depend on this concept
   */
  getDependentConcepts(conceptId) {
    const deps = this.adjacencyList.get(conceptId);
    if (!deps) return [];
    return Array.from(deps)
      .map(id => this.conceptsMap.get(id))
      .filter(Boolean);
  }

  /**
   * Computes the complete ancestral prerequisite lineage (Root -> ... -> Target)
   */
  getPrerequisiteLineage(conceptId) {
    const lineage = [];
    const visited = new Set();

    const dfs = (currId) => {
      if (visited.has(currId)) return;
      visited.add(currId);

      const prereqs = this.reverseAdjacency.get(currId);
      if (prereqs) {
        prereqs.forEach(pid => dfs(pid));
      }

      if (currId !== conceptId) {
        const item = this.conceptsMap.get(currId);
        if (item) lineage.push(item);
      }
    };

    dfs(conceptId);
    return lineage;
  }

  /**
   * Returns complete graph node snapshot for a concept
   */
  getConceptGraph(conceptId) {
    const concept = this.conceptsMap.get(conceptId);
    if (!concept) return null;
    const prerequisites = this.getPrerequisites(conceptId);
    const dependents = this.getDependentConcepts(conceptId);
    const ancestors = this.getPrerequisiteLineage(conceptId);
    return {
      concept,
      prerequisites,
      dependents,
      ancestors
    };
  }

  /**
   * Evaluates student's readiness to learn this concept based on prerequisite mastery
   */
  checkPrerequisiteHealth(conceptId, studentProgress = {}) {
    const prereqs = this.getPrerequisites(conceptId);
    if (prereqs.length === 0) {
      return {
        ready: true,
        healthScore: 100,
        missingPrerequisites: [],
        status: 'optimal'
      };
    }

    const topicsProgress = studentProgress.topics || {};
    const missing = [];
    let totalScore = 0;

    prereqs.forEach(p => {
      const topicData = topicsProgress[p.id] || { mastery: 0, status: 'not_started' };
      const score = topicData.mastery || 0;
      totalScore += score;

      if (score < 60) {
        missing.push({
          conceptId: p.id,
          title: p.title,
          mastery: score,
          status: topicData.status || 'not_started',
          chapterTitle: p.chapterTitle
        });
      }
    });

    const averageHealth = Math.round(totalScore / prereqs.length);
    const ready = missing.length === 0;

    return {
      ready,
      healthScore: averageHealth,
      missingPrerequisites: missing,
      status: ready ? 'optimal' : missing.some(m => m.mastery === 0) ? 'blocked' : 'at_risk'
    };
  }

  /**
   * Diagnostic Root-Cause Analysis:
   * When a student fails or struggles (<65%), investigates if the struggle stems from a prerequisite!
   */
  diagnoseRootCause({ conceptId, score, _misconceptions = [], _studentAnswer = '', attempts = 1, studentProgress = {} }) {
    const concept = this.conceptsMap.get(conceptId);
    if (!concept) return null;

    const prereqs = this.getPrerequisites(conceptId);
    if (prereqs.length === 0) return null;

    // Check if any prerequisite has low or zero mastery
    for (const prereq of prereqs) {
      const prerequisiteMastery = studentProgress.concepts?.[prereq.id]?.mastery ?? 
                                  studentProgress.topics?.[prereq.id]?.mastery ?? 0;

      // Condition 1: Prerequisite never mastered (<60%) and current attempt failed
      if (prerequisiteMastery < 60 && score < 70) {
        return {
          isPrerequisiteGap: true,
          prerequisiteId: prereq.id,
          prerequisiteTitle: prereq.title,
          prerequisiteChapter: prereq.chapterTitle,
          prerequisiteMastery,
          diagnosticMessage: `Your difficulty in "${concept.title}" appears to stem from foundational gaps in "${prereq.title}". Master the prerequisite first to make this concept effortless!`,
          actionCta: `Diagnose Prerequisite: ${prereq.title}`
        };
      }

      // Condition 2: Repeated failure (attempts >= 2) on current concept
      if (attempts >= 2 && score < 65) {
        return {
          isPrerequisiteGap: true,
          prerequisiteId: prereq.id,
          prerequisiteTitle: prereq.title,
          prerequisiteChapter: prereq.chapterTitle,
          prerequisiteMastery,
          diagnosticMessage: `You've attempted "${concept.title}" multiple times. Rather than retrying blindly, let's strengthen your foundation in "${prereq.title}".`,
          actionCta: `Review Foundational Concept: ${prereq.title}`
        };
      }
    }

    return null;
  }

  /**
   * Spaced Repetition Revision Scheduler (SuperMemo SM-2 inspired interval)
   */
  calculateSpacedRevision({ score, previousInterval = 1, attempts = 1 }) {
    let nextIntervalDays = 1;

    if (score >= 85) {
      // Mastered: expand interval exponentially
      if (attempts <= 1) nextIntervalDays = 3;
      else if (previousInterval <= 3) nextIntervalDays = 7;
      else nextIntervalDays = Math.min(30, Math.round(previousInterval * 2.2));
    } else if (score >= 65) {
      // Developing: review in 2-3 days
      nextIntervalDays = 2;
    } else {
      // Needs revision: reset interval to tomorrow
      nextIntervalDays = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + nextIntervalDays);

    return {
      nextIntervalDays,
      nextRevisionDate: nextDate.toISOString(),
      formattedDueDate: nextDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      })
    };
  }

  /**
   * Checks if a concept is due for revision today
   */
  isRevisionDue(lastStudied, nextRevisionDate) {
    if (!nextRevisionDate) return false;
    const now = new Date();
    const dueDate = new Date(nextRevisionDate);
    return now >= dueDate;
  }
}

export const conceptGraphEngine = new ConceptGraphEngine();
