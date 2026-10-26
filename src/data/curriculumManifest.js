// GYAAN AI Official Curriculum Source Manifest
// Authoritative record of primary syllabus publications, academic sessions, and verification statuses.

export const ACADEMIC_SESSIONS = {
  CURRENT_TARGET: '2026-27',
  FALLBACK_VERIFIED: '2025-26'
};

export const VERIFICATION_STATUSES = {
  VERIFIED_COMPLETE: 'verified_complete',
  VERIFIED_INCOMPLETE: 'verified_incomplete',
  PARTIALLY_POPULATED: 'partially_populated',
  AWAITING_OFFICIAL_SOURCE: 'awaiting_official_source',
  NOT_SUPPORTED: 'not_supported'
};

export const PROVENANCE_CATEGORIES = {
  OFFICIAL_HEADING: 'official_heading',
  OFFICIAL_SYLLABUS_TOPIC: 'official_syllabus_topic',
  PRESCRIBED_TEXT: 'prescribed_text',
  CURRICULUM_ORGANIZED_SUBTOPIC: 'curriculum_organized_subtopic',
  AI_GENERATED_SUPPLEMENT: 'ai_generated_supplement'
};

export const CURRICULUM_SOURCE_MANIFEST = {
  cbse: {
    boardId: 'cbse',
    boardName: 'Central Board of Secondary Education (CBSE)',
    academicSession: '2026-27',
    primaryPortal: 'https://cbseacademic.nic.in/curriculum_2027.html',
    retrievalDate: '2026-10-17',
    subjects: {
      physics: {
        code: '042',
        title: 'Physics',
        documentUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 10, totalChapters: 14, theoryMarks: 70, practicalMarks: 30 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 9, totalChapters: 14, theoryMarks: 70, practicalMarks: 30 }
        }
      },
      mathematics: {
        code: '041',
        title: 'Mathematics',
        documentUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 5, totalChapters: 14, theoryMarks: 80, practicalMarks: 20 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 6, totalChapters: 13, theoryMarks: 80, practicalMarks: 20 }
        }
      },
      biology: {
        code: '044',
        title: 'Biology',
        documentUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 5, totalChapters: 19, theoryMarks: 70, practicalMarks: 30 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 5, totalChapters: 13, theoryMarks: 70, practicalMarks: 30 }
        }
      },
      english: {
        code: '301',
        title: 'English Core',
        documentUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf',
        prescribedBooks: {
          11: ['Hornbill (Reader)', 'Snapshots (Supplementary)'],
          12: ['Flamingo (Reader)', 'Vistas (Supplementary)']
        },
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalSections: 3, totalWorks: 15, theoryMarks: 80, internalMarks: 20 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalSections: 3, totalWorks: 19, theoryMarks: 80, internalMarks: 20 }
        }
      }
    }
  },

  icse: {
    boardId: 'icse',
    seniorSecondaryName: 'Indian School Certificate (ISC - CISCE)',
    boardName: 'Council for the Indian School Certificate Examinations (CISCE)',
    academicSession: '2026-27',
    primaryPortal: 'https://cisce.org/',
    retrievalDate: '2026-10-17',
    subjects: {
      physics: {
        code: '861',
        title: 'Physics',
        documentUrl: 'https://cisce.org/regulations-and-syllabuses-isc-2027/',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 10, totalChapters: 14, theoryMarks: 70, practicalMarks: 30 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 9, totalChapters: 14, theoryMarks: 70, practicalMarks: 30 }
        }
      },
      mathematics: {
        code: '860',
        title: 'Mathematics',
        documentUrl: 'https://cisce.org/regulations-and-syllabuses-isc-2027/',
        structure: 'Section A (Compulsory: 65M) + Section B or C (Optional: 15M)',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 6, totalChapters: 15, theoryMarks: 80, projectMarks: 20 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 10, totalChapters: 15, theoryMarks: 80, projectMarks: 20 }
        }
      },
      biology: {
        code: '863',
        title: 'Biology',
        documentUrl: 'https://cisce.org/regulations-and-syllabuses-isc-2027/',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 5, totalChapters: 19, theoryMarks: 70, practicalMarks: 30 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalUnits: 5, totalChapters: 14, theoryMarks: 70, practicalMarks: 30 }
        }
      },
      english: {
        code: '801_802',
        title: 'English (Compulsory: Paper 1 Language & Paper 2 Literature)',
        documentUrl: 'https://cisce.org/regulations-and-syllabuses-isc-2027/',
        prescribedBooks: {
          11: ['Macbeth (Acts I & II) by William Shakespeare', 'Prism: Collection of Short Stories', 'Rhapsody: Collection of Poems'],
          12: ['Macbeth (Acts III, IV & V) by William Shakespeare', 'Prism: Collection of Short Stories', 'Rhapsody: Collection of Poems']
        },
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalPapers: 2, totalPrescribedTexts: 11, paperMarks: 80, projectMarks: 20 },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalPapers: 2, totalPrescribedTexts: 11, paperMarks: 80, projectMarks: 20 }
        }
      }
    }
  },

  up_board: {
    boardId: 'up_board',
    boardName: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)',
    academicSession: '2026-27',
    primaryPortal: 'https://upmsp.edu.in/',
    retrievalDate: '2026-10-17',
    isBilingual: true,
    syllabusNote: 'Officially adopted NCERT rationalised core curriculum for Physics, Mathematics, and Biology in Hindi/English bilingual instruction.',
    subjects: {
      physics: {
        title: 'भौतिक विज्ञान (Physics)',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 14, medium: 'Bilingual' },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 14, medium: 'Bilingual' }
        }
      },
      mathematics: {
        title: 'गणित (Mathematics)',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 14, medium: 'Bilingual' },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 13, medium: 'Bilingual' }
        }
      },
      biology: {
        title: 'जीव विज्ञान (Biology)',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 19, medium: 'Bilingual' },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 13, medium: 'Bilingual' }
        }
      },
      english: {
        title: 'अंग्रेजी (English Core / General English)',
        classes: {
          11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 10, medium: 'English/Hindi' },
          12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE, totalChapters: 14, medium: 'English/Hindi' }
        }
      }
    }
  },

  maharashtra: {
    boardId: 'maharashtra',
    boardName: 'Maharashtra State Board (MSBSHSE)',
    academicSession: '2025-26',
    primaryPortal: 'https://www.mahahsscboard.in/',
    retrievalDate: '2026-10-17',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  bihar: {
    boardId: 'bihar',
    boardName: 'Bihar School Examination Board (BSEB)',
    academicSession: '2025-26',
    primaryPortal: 'http://biharboardonline.bihar.gov.in/',
    retrievalDate: '2026-10-17',
    syllabusNote: 'Adopts NCERT textbooks for Science stream; state-specific language papers.',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  rajasthan: {
    boardId: 'rajasthan',
    boardName: 'Board of Secondary Education, Rajasthan (RBSE)',
    academicSession: '2025-26',
    primaryPortal: 'https://rajeduboard.rajasthan.gov.in/',
    retrievalDate: '2026-10-17',
    syllabusNote: '100% NCERT rationalised textbook alignment for Physics, Maths, Biology.',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  karnataka: {
    boardId: 'karnataka',
    boardName: 'Karnataka School Examination and Assessment Board (KSEAB / Pre-University Department)',
    academicSession: '2025-26',
    primaryPortal: 'https://kseab.karnataka.gov.in/',
    retrievalDate: '2026-10-17',
    syllabusNote: 'Pre-University (I PU and II PU) follows NCERT core curriculum for science.',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  tamil_nadu: {
    boardId: 'tamil_nadu',
    boardName: 'Tamil Nadu State Board (TNDGE)',
    academicSession: '2025-26',
    primaryPortal: 'https://dge.tn.gov.in/',
    retrievalDate: '2026-10-17',
    syllabusNote: 'Uses SCERT Tamil Nadu State Board textbooks with distinct chapter sequences.',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  west_bengal: {
    boardId: 'west_bengal',
    boardName: 'West Bengal Council of Higher Secondary Education (WBCHSE)',
    academicSession: '2025-26',
    primaryPortal: 'https://wbchse.wb.gov.in/',
    retrievalDate: '2026-10-17',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED }, 12: { status: VERIFICATION_STATUSES.PARTIALLY_POPULATED } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE }, 12: { status: VERIFICATION_STATUSES.AWAITING_OFFICIAL_SOURCE } } }
    }
  },

  state_boards: {
    boardId: 'state_boards',
    boardName: 'Other State & Union Territory Boards',
    academicSession: '2026-27',
    primaryPortal: 'https://ncert.nic.in/',
    retrievalDate: '2026-10-17',
    syllabusNote: 'National NCERT Core Equivalence used by majority of State Boards adhering to COBSE guidelines.',
    subjects: {
      physics: { classes: { 11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE }, 12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE } } },
      mathematics: { classes: { 11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE }, 12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE } } },
      biology: { classes: { 11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE }, 12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE } } },
      english: { classes: { 11: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE }, 12: { status: VERIFICATION_STATUSES.VERIFIED_COMPLETE } } }
    }
  }
};
