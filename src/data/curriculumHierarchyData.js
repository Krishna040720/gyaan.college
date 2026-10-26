// GYAAN AI Canonical Hierarchical Curriculum Database
// Implements strict educational hierarchy:
// Board -> Class -> Subject -> Chapter -> Unit (optional) -> Topic -> Subtopic -> Nested Subtopics
// Single authoritative source of truth for Chapter Units View, Mind Map, Notes, and Quizzes

export const PROVENANCE_TYPES = {
  VERIFIED_NCERT: 'verified_ncert',
  BOARD_OFFICIAL: 'board_official',
  TEACHER_REVIEWED: 'teacher_reviewed',
  AI_CURATED: 'ai_curated'
};

export const IMPORTANCE_LEVELS = {
  HIGH_YIELD: 'high_yield',
  BOARD_STANDARD: 'board_standard',
  FOUNDATION: 'foundation'
};

export const CURRICULUM_CATEGORIES = {
  TYPE_A: 'TYPE_A', // Official Curriculum Content (headings, statutory topics, prescribed texts)
  TYPE_B: 'TYPE_B'  // Learning Organization (pedagogical breakdown, study groupings)
};

/**
 * Curated Canonical Hierarchies for Core Chapters
 * Structured with strict parent-child lineage, order indices, and concept IDs
 */
export const CANONICAL_CHAPTER_HIERARCHIES = {
  // =========================================================================
  // CLASS 10 SCIENCE: CHAPTER 1 — CHEMICAL REACTIONS AND EQUATIONS (Has Units)
  // =========================================================================
  'ch-1-science': {
    chapterId: 'ch-1-science',
    chapterAliases: ['ch-1-science', 'c10-sci-ch1', 'ch-chem-10'],
    chapterTitle: 'Chemical Reactions and Equations',
    chapterNumber: 1,
    classLevel: 10,
    board: 'CBSE',
    subjectId: 'sci-10',
    subjectName: 'Science',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Science, Chapter 1',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c10-chem-01',
        type: 'unit',
        chapterId: 'ch-1-science',
        unitNumber: 1,
        title: 'Chemical Equations and Representation',
        description: 'Writing word and chemical equations, state symbols, and mathematical conservation of mass.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-chem-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-01',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-01',
            title: 'Writing Chemical Equations',
            description: 'Representing chemical reactions using chemical formulae of reactants and products with physical state notation.',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Class 10 Science, Section 1.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            keyTakeaways: [
              'Reactants are written on the LHS and products on the RHS with an arrow pointing to products.',
              'Physical states are denoted by (s) for solid, (l) for liquid, (g) for gas, and (aq) for aqueous solution.'
            ],
            subtopics: [
              {
                id: 'st-c10-chem-01-01-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-01',
                parentTopicId: 't-c10-chem-01-01',
                conceptId: 'c-10-sci-chem-01',
                title: 'Word Equations vs Skeletal Chemical Equations',
                description: 'Converting descriptive chemical change statements into compact molecular formulae representations.',
                order: 1,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 1.1.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-01-01-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-01',
                parentTopicId: 't-c10-chem-01-01',
                conceptId: 'c-10-sci-chem-01',
                title: 'Physical State Symbols and Reaction Conditions',
                description: 'Specifying temperature, pressure, and catalysts above or below the reaction arrow.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-chem-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-01',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-01',
            title: 'Balancing Chemical Equations',
            description: 'Equalizing the number of atoms of each element on both sides to satisfy the Law of Conservation of Mass.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Class 10 Science, Section 1.1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            keyTakeaways: [
              'Law of Conservation of Mass: Total mass of reactants equals total mass of products.',
              'Coefficients alter the number of molecules, never alter subscripts in chemical formulae.'
            ],
            subtopics: [
              {
                id: 'st-c10-chem-01-02-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-01',
                parentTopicId: 't-c10-chem-01-02',
                conceptId: 'c-10-sci-chem-01',
                title: 'Law of Conservation of Mass in Reactions',
                description: 'Atoms cannot be created or destroyed during ordinary chemical transformations.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-01-02-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-01',
                parentTopicId: 't-c10-chem-01-02',
                conceptId: 'c-10-sci-chem-01',
                title: 'Step-by-Step Hit-and-Trial Balancing Technique',
                description: 'Methodical balance starting with compound containing maximum number of atoms.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      },
      {
        id: 'u-c10-chem-02',
        type: 'unit',
        chapterId: 'ch-1-science',
        unitNumber: 2,
        title: 'Types of Chemical Reactions',
        description: 'Combination, decomposition, displacement, and double displacement transformations.',
        order: 2,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-chem-02-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-02',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-02',
            title: 'Combination Reactions & Exothermic Processes',
            description: 'Two or more substances combine to form a single product, accompanied by energy evolution.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-02-01-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-01',
                conceptId: 'c-10-sci-chem-02',
                title: 'Synthesis of Slaked Lime from Quicklime',
                description: 'CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat. Highly exothermic whitening process.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activity 1.4',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-02-01-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-01',
                conceptId: 'c-10-sci-chem-02',
                title: 'Respiration as an Exothermic Process',
                description: 'Breakdown of glucose with oxygen to release ATP energy in living cells.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.2.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-chem-02-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-02',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-02',
            title: 'Decomposition Reactions',
            description: 'A single reactant breaks down to yield multiple simpler products via heat, electricity, or light.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-02-02-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-02',
                conceptId: 'c-10-sci-chem-02',
                title: 'Thermal Decomposition of Ferrous Sulphate & Lead Nitrate',
                description: 'Green FeSO4 crystals lose water of crystallization and emit pungent SO2/SO3 gases; Pb(NO3)2 produces brown NO2 fumes.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activities 1.5 & 1.6',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-02-02-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-02',
                conceptId: 'c-10-sci-chem-02',
                title: 'Electrolytic Decomposition of Water',
                description: 'Electrolysis yielding 2:1 volume ratio of hydrogen at cathode to oxygen at anode.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activity 1.7',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-02-02-03',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-02',
                conceptId: 'c-10-sci-chem-02',
                title: 'Photochemical Decomposition of Silver Halides',
                description: '2AgCl(s) -> 2Ag(s) + Cl2(g) in sunlight; utilized in black-and-white photography.',
                order: 3,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Activity 1.8',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-chem-02-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-02',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-02',
            title: 'Displacement and Double Displacement Reactions',
            description: 'Reactions involving displacement based on metal activity, and precipitation via ion exchange.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Sections 1.2.3 & 1.2.4',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-02-03-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-03',
                conceptId: 'c-10-sci-chem-02',
                title: 'Single Displacement & Reactivity Series',
                description: 'Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). Iron displaces copper turning blue solution green.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activity 1.9',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-02-03-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-02',
                parentTopicId: 't-c10-chem-02-03',
                conceptId: 'c-10-sci-chem-02',
                title: 'Double Displacement & Precipitation Formation',
                description: 'Na2SO4(aq) + BaCl2(aq) -> BaSO4(s)↓ + 2NaCl(aq). White precipitate of barium sulphate.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activity 1.10',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      },
      {
        id: 'u-c10-chem-03',
        type: 'unit',
        chapterId: 'ch-1-science',
        unitNumber: 3,
        title: 'Oxidation, Reduction and Everyday Effects',
        description: 'Redox electron/oxygen transfer mechanisms, corrosion of metals, and prevention of food rancidity.',
        order: 3,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-chem-03-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-03',
            title: 'Redox Reactions and Electron Transfer',
            description: 'Simultaneous oxidation (loss of electrons/gain of oxygen) and reduction (gain of electrons/loss of oxygen).',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2.5',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-03-01-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-03',
                parentTopicId: 't-c10-chem-03-01',
                conceptId: 'c-10-sci-chem-03',
                title: 'Oxidation and Reduction Definition via Oxygen/Hydrogen',
                description: '2Cu + O2 -> 2CuO (Oxidation); CuO + H2 -> Cu + H2O (Redox reaction).',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.2.5',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-03-01-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-03',
                parentTopicId: 't-c10-chem-03-01',
                conceptId: 'c-10-sci-chem-03',
                title: 'Identifying Oxidizing and Reducing Agents',
                description: 'Substance reduced acts as oxidizing agent; substance oxidized acts as reducing agent.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.2.5',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-chem-03-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-03',
            title: 'Effects of Oxidation in Everyday Life',
            description: 'Corrosion of structural metals and oxidative degradation of oily food products.',
            order: 2,
            importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
            source: 'NCERT Section 1.3',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-03-02-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-03',
                parentTopicId: 't-c10-chem-03-02',
                conceptId: 'c-10-sci-chem-03',
                title: 'Corrosion of Metals (Rusting, Green Copper, Black Silver)',
                description: 'Slow destruction of metals by moisture and airborne gases; galvanization and electroplating defense.',
                order: 1,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.3.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-chem-03-02-02',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-03',
                parentTopicId: 't-c10-chem-03-02',
                conceptId: 'c-10-sci-chem-03',
                title: 'Rancidity Prevention in Food',
                description: 'Unpleasant smell/taste caused by fat oxidation; prevention using nitrogen flushing and BHA/BHT antioxidants.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.3.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-chem-03-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-1-science',
            unitId: 'u-c10-chem-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-chem-01',
            title: 'NCERT Lab Experiment: Magnesium Ribbon Combustion',
            description: 'Practical protocol: burning magnesium in air and testing basic character of magnesium oxide ash.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Activity 1.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-chem-03-03-01',
                type: 'subtopic',
                chapterId: 'ch-1-science',
                unitId: 'u-c10-chem-03',
                parentTopicId: 't-c10-chem-03-03',
                conceptId: 'c-10-sci-chem-01',
                title: 'Apparatus Safety & Litmus Verification',
                description: 'Cleaning ribbon with sandpaper to remove protective oxide layer and verifying Mg(OH)2 turns red litmus blue.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Activity 1.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 10 SCIENCE: CHAPTER 11 — ELECTRICITY (Has Units & Nested Subtopics)
  // =========================================================================
  'ch-11-science': {
    chapterId: 'ch-11-science',
    chapterAliases: ['ch-11-science', 'ch-elec-10', 'c10-sci-ch11', 'c10-sci-ch12'],
    chapterTitle: 'Electricity',
    chapterNumber: 11,
    classLevel: 10,
    board: 'CBSE',
    subjectId: 'sci-10',
    subjectName: 'Science',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Science, Chapter 11 (Legacy Ch 12)',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c10-elec-01',
        type: 'unit',
        chapterId: 'ch-11-science',
        unitNumber: 1,
        title: 'Electric Current, Charge and Potential Difference',
        description: 'Rate of charge flow, ammeter connection, work done per unit charge, and electromotive force.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-elec-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-01',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-01',
            title: 'Electric Current and Circuit Flow',
            description: 'Quantifying rate of flow of electric charges across a conductor cross-section (I = Q/t).',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Section 11.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-01-01-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-01',
                parentTopicId: 't-c10-elec-01-01',
                conceptId: 'c-10-sci-elec-01',
                title: 'Charge Quantization and Ampere Definition',
                description: 'Q = ne; 1 Ampere equals 1 Coulomb of charge flowing per second (approx 6.25 × 10^18 electrons).',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-01-01-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-01',
                parentTopicId: 't-c10-elec-01-01',
                conceptId: 'c-10-sci-elec-01',
                title: 'Conventional Current vs Electronic Drift',
                description: 'Conventional current flows from positive to negative terminal; electrons drift from negative to positive.',
                order: 2,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 11.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-elec-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-01',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-01',
            title: 'Electric Potential and Potential Difference',
            description: 'Work done in moving a unit positive charge between two points in an electrostatic field (V = W/Q).',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-01-02-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-01',
                parentTopicId: 't-c10-elec-01-02',
                conceptId: 'c-10-sci-elec-01',
                title: 'Volt Definition and Work Formula',
                description: '1 Volt is potential difference when 1 Joule of work is done moving 1 Coulomb of charge (1 V = 1 J/C).',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-01-02-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-01',
                parentTopicId: 't-c10-elec-01-02',
                conceptId: 'c-10-sci-elec-01',
                title: 'Voltmeter Parallel Connection',
                description: 'A high-resistance voltmeter is connected in parallel across the components whose potential difference is measured.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 11.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      },
      {
        id: 'u-c10-elec-02',
        type: 'unit',
        chapterId: 'ch-11-science',
        unitNumber: 2,
        title: "Ohm's Law, Resistance and Electrical Resistivity",
        description: 'V-I proportionality, internal opposition to current, geometric dimensions, and material resistivity.',
        order: 2,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-elec-02-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-02',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-02',
            title: "Ohm's Law & V-I Characteristics",
            description: 'Potential difference across metallic wire is directly proportional to current, provided temperature remains constant.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.3',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-02-01-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-02',
                parentTopicId: 't-c10-elec-02-01',
                conceptId: 'c-10-sci-elec-02',
                title: 'Mathematical Formulation (V = I·R)',
                description: 'Constant ratio V/I represents conductor resistance R; slope of V-I graph gives resistance.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.3',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-02-01-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-02',
                parentTopicId: 't-c10-elec-02-01',
                conceptId: 'c-10-sci-elec-02',
                title: 'Definition of 1 Ohm (1 Ω = 1 V / 1 A)',
                description: 'Resistance of a conductor when 1 Volt potential difference produces 1 Ampere current.',
                order: 2,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 11.3',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-elec-02-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-02',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-02',
            title: 'Factors Affecting Resistance & Electrical Resistivity',
            description: 'Resistance depends on length (R ∝ l), cross-sectional area (R ∝ 1/A), and intrinsic material resistivity (ρ).',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.4',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-02-02-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-02',
                parentTopicId: 't-c10-elec-02-02',
                conceptId: 'c-10-sci-elec-02',
                title: 'Length and Cross-Sectional Area Proportionality',
                description: 'Doubling length doubles resistance; doubling area halves resistance (thicker wire has less resistance).',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.4',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-02-02-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-02',
                parentTopicId: 't-c10-elec-02-02',
                conceptId: 'c-10-sci-elec-02',
                title: 'Specific Resistivity Formula (ρ = R·A / l)',
                description: 'Material-specific property independent of dimensions; measured in Ohm-metre (Ω·m).',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.4',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
                subtopics: [
                  {
                    id: 'nst-c10-elec-02-02-02-01',
                    type: 'subtopic',
                    chapterId: 'ch-11-science',
                    unitId: 'u-c10-elec-02',
                    parentTopicId: 'st-c10-elec-02-02-02',
                    conceptId: 'c-10-sci-elec-02',
                    title: 'Resistivity Spectrum (Conductors vs Alloys vs Insulators)',
                    description: 'Metals (10^-8 Ω·m) vs Heating Alloys (10^-6 Ω·m) vs Glass/Rubber insulators (10^12 to 10^17 Ω·m).',
                    order: 1,
                    importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                    source: 'NCERT Table 11.2',
                    provenance: PROVENANCE_TYPES.VERIFIED_NCERT
                  },
                  {
                    id: 'nst-c10-elec-02-02-02-02',
                    type: 'subtopic',
                    chapterId: 'ch-11-science',
                    unitId: 'u-c10-elec-02',
                    parentTopicId: 'st-c10-elec-02-02-02',
                    conceptId: 'c-10-sci-elec-02',
                    title: 'Why Heating Elements Use Nichrome Alloys',
                    description: 'Alloys have higher resistivity than constituent metals and do not oxidize (burn) at red-hot temperatures.',
                    order: 2,
                    importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                    source: 'NCERT Section 11.4 Board Note',
                    provenance: PROVENANCE_TYPES.VERIFIED_NCERT
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'u-c10-elec-03',
        type: 'unit',
        chapterId: 'ch-11-science',
        unitNumber: 3,
        title: 'Resistor Networks, Joule Heating and Electrical Power',
        description: 'Series vs parallel circuits, thermal dissipation, domestic wiring safety, and commercial power units.',
        order: 3,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-elec-03-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-03',
            title: 'Resistors in Series and Parallel Networks',
            description: 'Analyzing current and voltage distribution across combined resistive networks in circuits.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.5',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-03-01-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-01',
                conceptId: 'c-10-sci-elec-03',
                title: 'Series Combination Derivation (Rs = R1 + R2 + R3)',
                description: 'Identical current passes through every resistor; total voltage is the sum of individual voltage drops.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.5.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-03-01-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-01',
                conceptId: 'c-10-sci-elec-03',
                title: 'Parallel Combination Derivation (1/Rp = 1/R1 + 1/R2 + 1/R3)',
                description: 'Identical potential difference across each branch; total current is sum of branch currents.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.5.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-03-01-03',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-01',
                conceptId: 'c-10-sci-elec-03',
                title: 'Advantages of Parallel Domestic Circuits',
                description: 'Independent switches, uniform 220V appliance voltage, and failure of one bulb does not break the entire circuit.',
                order: 3,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.5.3',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-elec-03-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-04',
            title: "Heating Effect of Current (Joule's Law)",
            description: 'Conversion of electrical energy into thermal dissipation according to H = I^2·R·t.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.6',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-03-02-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-02',
                conceptId: 'c-10-sci-elec-04',
                title: "Mathematical Derivation of Joule's Law",
                description: 'Heat produced is proportional to square of current, resistance, and time of flow (H = I^2·R·t = V·I·t).',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.6',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-03-02-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-02',
                conceptId: 'c-10-sci-elec-04',
                title: 'Electric Safety Fuse and Low Melting Point Lead-Tin Wire',
                description: 'Overload safety device that melts and breaks circuit when current exceeds rated capacity (e.g. 5A, 15A).',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 11.6.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-elec-03-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'sci-10',
            chapterId: 'ch-11-science',
            unitId: 'u-c10-elec-03',
            parentTopicId: null,
            conceptId: 'c-10-sci-elec-04',
            title: 'Electric Power and Commercial Unit of Energy',
            description: 'Rate of electrical work consumption, Watt, and billing calculations in Board examinations.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 11.7',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-elec-03-03-01',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-03',
                conceptId: 'c-10-sci-elec-04',
                title: 'Electric Power Equations (P = VI = I^2·R = V^2 / R)',
                description: 'Power is rate of energy consumption; 1 Watt = 1 Volt × 1 Ampere.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.7',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-elec-03-03-02',
                type: 'subtopic',
                chapterId: 'ch-11-science',
                unitId: 'u-c10-elec-03',
                parentTopicId: 't-c10-elec-03-03',
                conceptId: 'c-10-sci-elec-04',
                title: 'Commercial Unit of Energy (1 kWh = 3.6 × 10^6 J)',
                description: 'Energy consumed when 1000 Watts operates for 1 hour; calculating cost of electricity bills.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 11.7',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 10 SCIENCE: CHAPTER 13 — OUR ENVIRONMENT (Direct Topics - NO Units)
  // Demonstrates clean direct Chapter -> Topics -> Subtopics without fake units
  // =========================================================================
  'ch-13-science': {
    chapterId: 'ch-13-science',
    chapterAliases: ['ch-13-science', 'c10-sci-ch13', 'ch-env-10'],
    chapterTitle: 'Our Environment',
    chapterNumber: 13,
    classLevel: 10,
    board: 'CBSE',
    subjectId: 'sci-10',
    subjectName: 'Science',
    hasUnits: false, // NO UNITS — direct topic hierarchy
    source: 'NCERT Rationalised 2026–27 Science, Chapter 13',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    topics: [
      {
        id: 't-c10-env-01',
        type: 'topic',
        board: 'CBSE',
        classLevel: 10,
        subjectId: 'sci-10',
        chapterId: 'ch-13-science',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-10-sci-env-01',
        title: 'Ecosystem and its Interacting Components',
        description: 'Structural and functional biological systems formed by interactions between living organisms and physical abiotic factors.',
        order: 1,
        importance: IMPORTANCE_LEVELS.FOUNDATION,
        source: 'NCERT Section 13.1',
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        subtopics: [
          {
            id: 'st-c10-env-01-01',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-01',
            conceptId: 'c-10-sci-env-01',
            title: 'Biotic and Abiotic Factors',
            description: 'Living components (plants, animals, microbes) interacting with non-living physical environment (temperature, rainfall, soil, wind).',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Section 13.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          },
          {
            id: 'st-c10-env-01-02',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-01',
            conceptId: 'c-10-sci-env-01',
            title: 'Producers, Consumers and Decomposers',
            description: 'Autotrophic synthesizers, heterotrophic herbivores/carnivores, and saprophytic nutrient recyclers in nature.',
            order: 2,
            importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
            source: 'NCERT Section 13.1.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          }
        ]
      },
      {
        id: 't-c10-env-02',
        type: 'topic',
        board: 'CBSE',
        classLevel: 10,
        subjectId: 'sci-10',
        chapterId: 'ch-13-science',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-10-sci-env-02',
        title: 'Food Chains, Food Webs and Energy Flow',
        description: 'Unidirectional flow of solar energy through sequential trophic feeding levels in natural ecosystems.',
        order: 2,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'NCERT Section 13.1.2',
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        subtopics: [
          {
            id: 'st-c10-env-02-01',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-02',
            conceptId: 'c-10-sci-env-02',
            title: 'Trophic Levels and the 10% Energy Law (Lindeman)',
            description: 'Only 10% of chemical energy is transferred to next trophic level; 90% lost as heat and metabolic maintenance.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 13.1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          },
          {
            id: 'st-c10-env-02-02',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-02',
            conceptId: 'c-10-sci-env-02',
            title: 'Biological Magnification of Toxic Pesticides',
            description: 'Progressive accumulation of non-biodegradable chemicals (like DDT) in highest concentrations in top consumers (humans).',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 13.1.3',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          }
        ]
      },
      {
        id: 't-c10-env-03',
        type: 'topic',
        board: 'CBSE',
        classLevel: 10,
        subjectId: 'sci-10',
        chapterId: 'ch-13-science',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-10-sci-env-03',
        title: 'Environmental Challenges and Waste Management',
        description: 'Anthropogenic degradation of stratospheric ozone and solid waste accumulation problems in India.',
        order: 3,
        importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
        source: 'NCERT Section 13.2',
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        subtopics: [
          {
            id: 'st-c10-env-03-01',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-03',
            conceptId: 'c-10-sci-env-03',
            title: 'Stratospheric Ozone Layer Depletion & CFCs',
            description: 'O3 absorption of harmful solar UV radiation; catalytic destruction by chlorofluorocarbons (Montreal Protocol 1987).',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 13.2.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          },
          {
            id: 'st-c10-env-03-02',
            type: 'subtopic',
            chapterId: 'ch-13-science',
            unitId: null,
            parentTopicId: 't-c10-env-03',
            conceptId: 'c-10-sci-env-03',
            title: 'Biodegradable vs Non-Biodegradable Waste Disposal',
            description: 'Enzymatic biological breakdown vs synthetic plastics persistence; composting, biogas, and recycling.',
            order: 2,
            importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
            source: 'NCERT Section 13.2.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: CHAPTER 1 — REAL NUMBERS (Has Units)
  // =========================================================================
  'ch-1-mathematics': {
    chapterId: 'ch-1-mathematics',
    chapterAliases: ['ch-1-mathematics', 'c10-mat-ch1', 'ch-real-10'],
    chapterTitle: 'Real Numbers',
    chapterNumber: 1,
    classLevel: 10,
    board: 'CBSE',
    subjectId: 'math-10',
    subjectName: 'Mathematics',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Mathematics, Chapter 1',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c10-mat-01',
        type: 'unit',
        chapterId: 'ch-1-mathematics',
        unitNumber: 1,
        title: 'Fundamental Theorem of Arithmetic',
        description: 'Prime factorisation, canonical decomposition, and HCF-LCM relationships.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-mat-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'math-10',
            chapterId: 'ch-1-mathematics',
            unitId: 'u-c10-mat-01',
            parentTopicId: null,
            conceptId: 'c-10-mat-real-01',
            title: 'Fundamental Theorem of Arithmetic Statement',
            description: 'Every composite number can be expressed as a unique product of primes, apart from the order in which prime factors occur.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-mat-01-01-01',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-01',
                parentTopicId: 't-c10-mat-01-01',
                conceptId: 'c-10-mat-real-01',
                title: 'Prime Factorisation Trees & Canonical Form',
                description: 'Decomposing composite integers into prime powers: n = p1^a1 · p2^a2 ··· pk^ak.',
                order: 1,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-mat-01-01-02',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-01',
                parentTopicId: 't-c10-mat-01-01',
                conceptId: 'c-10-mat-real-01',
                title: 'Why 4^n or 6^n Cannot End with Digit Zero',
                description: 'Exam proof showing prime factorisation lacks the factor 5, hence cannot end with 0 for any natural n.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Example 1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c10-mat-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'math-10',
            chapterId: 'ch-1-mathematics',
            unitId: 'u-c10-mat-01',
            parentTopicId: null,
            conceptId: 'c-10-mat-real-01',
            title: 'HCF and LCM via Prime Factor Method',
            description: 'Finding Highest Common Factor (product of smallest powers) and Lowest Common Multiple (product of greatest powers).',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-mat-01-02-01',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-01',
                parentTopicId: 't-c10-mat-01-02',
                conceptId: 'c-10-mat-real-01',
                title: 'Relationship: HCF(a, b) × LCM(a, b) = a × b',
                description: 'Verifying product relationship for two positive integers and calculating unknown LCM/HCF.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-mat-01-02-02',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-01',
                parentTopicId: 't-c10-mat-01-02',
                conceptId: 'c-10-mat-real-01',
                title: 'Word Problems on HCF and LCM',
                description: 'Applications involving circular tracks meeting times (LCM) and maximum container capacities (HCF).',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Exercise 1.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      },
      {
        id: 'u-c10-mat-02',
        type: 'unit',
        chapterId: 'ch-1-mathematics',
        unitNumber: 2,
        title: 'Revisiting Irrational Numbers',
        description: 'Rigorous proofs of irrationality using proof by contradiction.',
        order: 2,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c10-mat-02-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 10,
            subjectId: 'math-10',
            chapterId: 'ch-1-mathematics',
            unitId: 'u-c10-mat-02',
            parentTopicId: null,
            conceptId: 'c-10-mat-real-02',
            title: 'Theorem: Prime Divisibility of Squares',
            description: 'Let p be a prime number. If p divides a^2, then p divides a, where a is a positive integer.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Theorem 1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c10-mat-02-01-01',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-02',
                parentTopicId: 't-c10-mat-02-01',
                conceptId: 'c-10-mat-real-02',
                title: 'Proof that √2, √3, and √5 are Irrational',
                description: 'Standard 3-mark board examination proof by contradiction assuming co-prime integers a and b.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Theorem 1.3',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c10-mat-02-01-02',
                type: 'subtopic',
                chapterId: 'ch-1-mathematics',
                unitId: 'u-c10-mat-02',
                parentTopicId: 't-c10-mat-02-01',
                conceptId: 'c-10-mat-real-02',
                title: 'Irrationality of Linear Combinations (a ± b√p)',
                description: 'Proving numbers of the form 3 + 2√5 or 1/√2 are irrational using rational arithmetic properties.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Example 6',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: CHAPTER 2 — POLYNOMIALS (Direct Topics - NO Units)
  // Demonstrates clean direct Chapter -> Topics -> Subtopics in Mathematics
  // =========================================================================
  'ch-2-mathematics': {
    chapterId: 'ch-2-mathematics',
    chapterAliases: ['ch-2-mathematics', 'c10-mat-ch2', 'ch-poly-10'],
    chapterTitle: 'Polynomials',
    chapterNumber: 2,
    classLevel: 10,
    board: 'CBSE',
    subjectId: 'math-10',
    subjectName: 'Mathematics',
    hasUnits: false, // Direct topic hierarchy
    source: 'NCERT Rationalised 2026–27 Mathematics, Chapter 2',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    topics: [
      {
        id: 't-c10-poly-01',
        type: 'topic',
        board: 'CBSE',
        classLevel: 10,
        subjectId: 'math-10',
        chapterId: 'ch-2-mathematics',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-10-mat-poly-01',
        title: 'Geometrical Meaning of Zeroes of a Polynomial',
        description: 'Zeroes correspond exactly to the x-coordinates of points where the graph y = p(x) intersects the x-axis.',
        order: 1,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'NCERT Section 2.2',
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        subtopics: [
          {
            id: 'st-c10-poly-01-01',
            type: 'subtopic',
            chapterId: 'ch-2-mathematics',
            unitId: null,
            parentTopicId: 't-c10-poly-01',
            conceptId: 'c-10-mat-poly-01',
            title: 'Linear and Parabolic Curves (Parabola Openings)',
            description: 'Linear polynomials intersect at 1 point; quadratic curves y = ax^2 + bx + c form upward (a > 0) or downward (a < 0) parabolas.',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Section 2.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          },
          {
            id: 'st-c10-poly-01-02',
            type: 'subtopic',
            chapterId: 'ch-2-mathematics',
            unitId: null,
            parentTopicId: 't-c10-poly-01',
            conceptId: 'c-10-mat-poly-01',
            title: 'Determining Number of Zeroes from NCERT Graphs',
            description: 'Solving standard 1-mark board questions by counting x-axis intersection points.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Exercise 2.1',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          }
        ]
      },
      {
        id: 't-c10-poly-02',
        type: 'topic',
        board: 'CBSE',
        classLevel: 10,
        subjectId: 'math-10',
        chapterId: 'ch-2-mathematics',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-10-mat-poly-02',
        title: 'Relationship Between Zeroes and Coefficients',
        description: 'Formulas connecting roots α, β of quadratic ax^2 + bx + c to polynomial coefficients.',
        order: 2,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'NCERT Section 2.3',
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        subtopics: [
          {
            id: 'st-c10-poly-02-01',
            type: 'subtopic',
            chapterId: 'ch-2-mathematics',
            unitId: null,
            parentTopicId: 't-c10-poly-02',
            conceptId: 'c-10-mat-poly-02',
            title: 'Sum and Product of Zeroes (α + β = -b/a, α·β = c/a)',
            description: 'Verification of relations after finding zeroes by middle-term splitting.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 2.3',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          },
          {
            id: 'st-c10-poly-02-02',
            type: 'subtopic',
            chapterId: 'ch-2-mathematics',
            unitId: null,
            parentTopicId: 't-c10-poly-02',
            conceptId: 'c-10-mat-poly-02',
            title: 'Forming a Quadratic Polynomial from Sum and Product',
            description: 'p(x) = k[x^2 - (α + β)x + α·β], where k is any non-zero real constant.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Exercise 2.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 11 PHYSICS: CHAPTER 1 — UNITS AND MEASUREMENTS (Has Units)
  // =========================================================================
  'c11-phy-ch1': {
    chapterId: 'c11-phy-ch1',
    chapterAliases: ['c11-phy-ch1', 'cbse-11-phy-ch01', 'ch-1-physics-11'],
    chapterTitle: 'Units and Measurements',
    chapterNumber: 1,
    classLevel: 11,
    board: 'CBSE',
    subjectId: 'phy-11',
    subjectName: 'Physics',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Physics, Chapter 1',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c11-phy-01',
        type: 'unit',
        chapterId: 'c11-phy-ch1',
        unitNumber: 1,
        title: 'Unit I: Physical World and Measurement',
        description: 'System of units, errors in measurement, and dimensional analysis.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c11-phy-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'phy-11',
            chapterId: 'c11-phy-ch1',
            unitId: 'u-c11-phy-01',
            parentTopicId: null,
            conceptId: 'c-11-phy-units-01',
            title: 'System of Units (SI Units & Base Quantities)',
            description: 'The seven fundamental base quantities and SI system definitions.',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Section 1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-phy-01-01-01',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-01',
                conceptId: 'c-11-phy-units-01',
                title: 'Fundamental vs Derived SI Units',
                description: 'Definitions of metre, kilogram, second, ampere, kelvin, mole, and candela.',
                order: 1,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 1.2.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-phy-01-01-02',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-01',
                conceptId: 'c-11-phy-units-01',
                title: 'Astronomical Unit, Light Year & Parsec',
                description: 'Large distance scales and parallax method for astronomical bodies.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.2.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c11-phy-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'phy-11',
            chapterId: 'c11-phy-ch1',
            unitId: 'u-c11-phy-01',
            parentTopicId: null,
            conceptId: 'c-11-phy-errors-02',
            title: 'Significant Figures and Error Analysis',
            description: 'Systematic and random errors, propagation of errors, and precision rules.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.4',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-phy-01-02-01',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-02',
                conceptId: 'c-11-phy-errors-02',
                title: 'Absolute, Relative, and Percentage Error',
                description: 'Formulas for combination of errors in addition, subtraction, multiplication, and powers.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.4.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-phy-01-02-02',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-02',
                conceptId: 'c-11-phy-errors-02',
                title: 'Rules for Arithmetic Operations with Significant Figures',
                description: 'Rounding-off rules and limiting precision to least accurate component.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.4.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c11-phy-01-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'phy-11',
            chapterId: 'c11-phy-ch1',
            unitId: 'u-c11-phy-01',
            parentTopicId: null,
            conceptId: 'c-11-phy-dim-03',
            title: 'Dimensional Analysis and Its Applications',
            description: 'Dimensional formulas, homogeneity principle, and converting units across systems.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.5',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-phy-01-03-01',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-03',
                conceptId: 'c-11-phy-dim-03',
                title: 'Principle of Homogeneity of Dimensions',
                description: 'Checking equation consistency by balancing additive dimensional powers.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.5.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-phy-01-03-02',
                type: 'subtopic',
                chapterId: 'c11-phy-ch1',
                unitId: 'u-c11-phy-01',
                parentTopicId: 't-c11-phy-01-03',
                conceptId: 'c-11-phy-dim-03',
                title: 'Deriving Relations Between Physical Quantities',
                description: 'Formulating empirical equations from dimensional constraints.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.5.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 11 MATHEMATICS: CHAPTER 1 — SETS (Has Units)
  // =========================================================================
  'c11-math-ch1': {
    chapterId: 'c11-math-ch1',
    chapterAliases: ['c11-math-ch1', 'cbse-11-math-ch01', 'ch-1-math-11'],
    chapterTitle: 'Sets',
    chapterNumber: 1,
    classLevel: 11,
    board: 'CBSE',
    subjectId: 'math-11',
    subjectName: 'Mathematics',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Mathematics, Chapter 1',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c11-math-01',
        type: 'unit',
        chapterId: 'c11-math-ch1',
        unitNumber: 1,
        title: 'Unit I: Sets and Functions',
        description: 'Set notation, operations, Venn diagrams, and subsets.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c11-math-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'math-11',
            chapterId: 'c11-math-ch1',
            unitId: 'u-c11-math-01',
            parentTopicId: null,
            conceptId: 'c-11-mat-set-01',
            title: 'Representation of Sets and Special Sets',
            description: 'Defining sets, roster form, set-builder form, and standard number sets.',
            order: 1,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'NCERT Section 1.2',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-math-01-01-01',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-01',
                conceptId: 'c-11-mat-set-01',
                title: 'Roster Form vs Set-Builder Notation',
                description: 'Listing elements explicitly versus stating property p(x).',
                order: 1,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 1.2',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-math-01-01-02',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-01',
                conceptId: 'c-11-mat-set-01',
                title: 'Empty, Finite, Infinite & Equal Sets',
                description: 'The null set ∅, cardinality, and equality of elements.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'NCERT Section 1.3',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c11-math-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'math-11',
            chapterId: 'c11-math-ch1',
            unitId: 'u-c11-math-01',
            parentTopicId: null,
            conceptId: 'c-11-mat-set-02',
            title: 'Subsets, Intervals & Power Sets',
            description: 'Inclusion relations, intervals as subsets of R, and power set cardinality 2^n.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.4',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-math-01-02-01',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-02',
                conceptId: 'c-11-mat-set-02',
                title: 'Open and Closed Intervals of Real Numbers',
                description: '(a, b), [a, b], [a, b), and (a, b] geometric representation on number line.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.4.1',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-math-01-02-02',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-02',
                conceptId: 'c-11-mat-set-02',
                title: 'Power Set P(A) and Universal Set U',
                description: 'Set of all subsets and total element count n(P(A)) = 2^m.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.5',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c11-math-01-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 11,
            subjectId: 'math-11',
            chapterId: 'c11-math-ch1',
            unitId: 'u-c11-math-01',
            parentTopicId: null,
            conceptId: 'c-11-mat-set-03',
            title: 'Venn Diagrams and Set Operations',
            description: 'Union, intersection, difference, and complement of sets with De Morgan’s laws.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.6',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c11-math-01-03-01',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-03',
                conceptId: 'c-11-mat-set-03',
                title: 'Union and Intersection Laws (De Morgan’s Laws)',
                description: '(A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′ algebraic proofs.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.8',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c11-math-01-03-02',
                type: 'subtopic',
                chapterId: 'c11-math-ch1',
                unitId: 'u-c11-math-01',
                parentTopicId: 't-c11-math-01-03',
                conceptId: 'c-11-mat-set-03',
                title: 'Cardinality Problems on Union and Intersection',
                description: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B) practical board exam word problems.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.9',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 11 ENGLISH: CHAPTER 5 — THE PORTRAIT OF A LADY (Direct Topics)
  // Demonstrates clean direct Chapter -> Topics -> Subtopics in Literature
  // =========================================================================
  'c11-eng-ch5': {
    chapterId: 'c11-eng-ch5',
    chapterAliases: ['c11-eng-ch5', 'cbse-11-eng-ch05'],
    chapterTitle: 'The Portrait of a Lady (by Khushwant Singh)',
    chapterNumber: 5,
    classLevel: 11,
    board: 'CBSE',
    subjectId: 'eng-11',
    subjectName: 'English Core',
    hasUnits: false, // Direct literary analysis
    source: 'NCERT Hornbill Class 11, Chapter 1 (Prose)',
    provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
    topics: [
      {
        id: 't-c11-eng-05-01',
        type: 'topic',
        board: 'CBSE',
        classLevel: 11,
        subjectId: 'eng-11',
        chapterId: 'c11-eng-ch5',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-11-eng-portrait-01',
        title: 'Life in the Village: Grandmother’s Devotion and Companionship',
        description: 'The idyllic bond between grandson and grandmother, morning prayers, and temple education.',
        order: 1,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'Hornbill Prose 1',
        provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
        subtopics: [
          {
            id: 'st-c11-eng-05-01-01',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-01',
            conceptId: 'c-11-eng-portrait-01',
            title: 'Village Morning Routine and Temple Schooling',
            description: 'Plastering the slate, feeding stale chapattis to street dogs, and recitation of prayers.',
            order: 1,
            importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
            source: 'Hornbill Text Section 1',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          },
          {
            id: 'st-c11-eng-05-01-02',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-01',
            conceptId: 'c-11-eng-portrait-01',
            title: 'Physical Appearance: An Expanse of Pure White Serenity',
            description: 'The winter landscape portrait, silver locks, telling beads of rosary, and spotless white garments.',
            order: 2,
            importance: IMPORTANCE_LEVELS.FOUNDATION,
            source: 'Hornbill Text Section 1',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          }
        ]
      },
      {
        id: 't-c11-eng-05-02',
        type: 'topic',
        board: 'CBSE',
        classLevel: 11,
        subjectId: 'eng-11',
        chapterId: 'c11-eng-ch5',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-11-eng-portrait-02',
        title: 'City Transition and Ideological Distance',
        description: 'The turning point in their friendship: English school, western science, and rejection of music.',
        order: 2,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'Hornbill Prose 1',
        provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
        subtopics: [
          {
            id: 'st-c11-eng-05-02-01',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-02',
            conceptId: 'c-11-eng-portrait-02',
            title: 'Disapproval of Western Science and Lack of Scripture Teaching',
            description: 'Grandmother’s silence as dissent against gravity, Archimedes principle, and secular education.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Hornbill Text Section 2',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          },
          {
            id: 'st-c11-eng-05-02-02',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-02',
            conceptId: 'c-11-eng-portrait-02',
            title: 'Accepting Seclusion with the Spinning Wheel and Sparrows',
            description: 'The half-hour afternoon feeding of hundreds of little birds as the happiest moment of her day.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Hornbill Text Section 2',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          }
        ]
      },
      {
        id: 't-c11-eng-05-03',
        type: 'topic',
        board: 'CBSE',
        classLevel: 11,
        subjectId: 'eng-11',
        chapterId: 'c11-eng-ch5',
        unitId: null,
        parentTopicId: null,
        conceptId: 'c-11-eng-portrait-03',
        title: 'The Final Farewell: Demise and the Sparrows’ Mourning',
        description: 'Author’s return from abroad, beating the dilapidated drum, peaceful death, and avian grief.',
        order: 3,
        importance: IMPORTANCE_LEVELS.HIGH_YIELD,
        source: 'Hornbill Prose 1',
        provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
        subtopics: [
          {
            id: 'st-c11-eng-05-03-01',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-03',
            conceptId: 'c-11-eng-portrait-03',
            title: 'Grandmother’s Foreboding and Refusal to Talk Before Demise',
            description: 'Devoting her final hours exclusively to silent prayer and counting rosary beads.',
            order: 1,
            importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
            source: 'Hornbill Text Section 3',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          },
          {
            id: 'st-c11-eng-05-03-02',
            type: 'subtopic',
            chapterId: 'c11-eng-ch5',
            unitId: null,
            parentTopicId: 't-c11-eng-05-03',
            conceptId: 'c-11-eng-portrait-03',
            title: 'The Sparrows’ Silent Homage and Disdain for Bread Crumbs',
            description: 'Thousands of birds sitting quietly in the courtyard without chirruping and flying away silently.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Hornbill Text Section 3',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 12 PHYSICS: CHAPTER 1 — ELECTRIC CHARGES AND FIELDS (Has Units)
  // =========================================================================
  'c12-phy-ch1': {
    chapterId: 'c12-phy-ch1',
    chapterAliases: ['c12-phy-ch1', 'cbse-12-phy-ch01'],
    chapterTitle: 'Electric Charges and Fields',
    chapterNumber: 1,
    classLevel: 12,
    board: 'CBSE',
    subjectId: 'phy-12',
    subjectName: 'Physics',
    hasUnits: true,
    source: 'NCERT Rationalised 2026–27 Physics Part 1, Chapter 1',
    provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
    units: [
      {
        id: 'u-c12-phy-01',
        type: 'unit',
        chapterId: 'c12-phy-ch1',
        unitNumber: 1,
        title: 'Unit I: Electrostatics',
        description: 'Electric charges, Coulomb’s law, electric field, dipoles, and Gauss’s law.',
        order: 1,
        provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
        topics: [
          {
            id: 't-c12-phy-01-01',
            type: 'topic',
            board: 'CBSE',
            classLevel: 12,
            subjectId: 'phy-12',
            chapterId: 'c12-phy-ch1',
            unitId: 'u-c12-phy-01',
            parentTopicId: null,
            conceptId: 'c-12-phy-charge-01',
            title: 'Electric Charges, Quantization & Coulomb’s Law',
            description: 'Properties of charge, induction, Coulomb’s inverse square law, and dielectric medium effects.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.2–1.6',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c12-phy-01-01-01',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-01',
                conceptId: 'c-12-phy-charge-01',
                title: 'Additivity, Conservation and Quantization (q = ne)',
                description: 'Millikan’s experimental evidence and microscopic vs macroscopic charge limits.',
                order: 1,
                importance: IMPORTANCE_LEVELS.FOUNDATION,
                source: 'NCERT Section 1.5',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c12-phy-01-01-02',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-01',
                conceptId: 'c-12-phy-charge-01',
                title: 'Coulomb’s Law in Vector Form and Principle of Superposition',
                description: 'F = (1/4πε0)(q1 q2 / r^2) r̂ and net force from multiple discrete charges.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.6',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c12-phy-01-02',
            type: 'topic',
            board: 'CBSE',
            classLevel: 12,
            subjectId: 'phy-12',
            chapterId: 'c12-phy-ch1',
            unitId: 'u-c12-phy-01',
            parentTopicId: null,
            conceptId: 'c-12-phy-field-02',
            title: 'Electric Field, Field Lines & Dipole Dynamics',
            description: 'Field due to system of charges, lines of force, electric dipole field, and torque.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.8–1.11',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c12-phy-01-02-01',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-02',
                conceptId: 'c-12-phy-field-02',
                title: 'Electric Field of Dipole at Axial and Equatorial Points',
                description: 'E_axial = 2p/(4πε0 r^3) and E_equatorial = -p/(4πε0 r^3) derivations for r >> a.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.10',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c12-phy-01-02-02',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-02',
                conceptId: 'c-12-phy-field-02',
                title: 'Torque on Dipole in Uniform Field and Potential Energy',
                description: 'τ = p × E and U = - p · E work done in rotating dipole.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.11',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          },
          {
            id: 't-c12-phy-01-03',
            type: 'topic',
            board: 'CBSE',
            classLevel: 12,
            subjectId: 'phy-12',
            chapterId: 'c12-phy-ch1',
            unitId: 'u-c12-phy-01',
            parentTopicId: null,
            conceptId: 'c-12-phy-gauss-03',
            title: 'Gauss’s Theorem and Applications',
            description: 'Electric flux, Gauss’s law closed surface integration, and electrostatic applications.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'NCERT Section 1.14–1.15',
            provenance: PROVENANCE_TYPES.VERIFIED_NCERT,
            subtopics: [
              {
                id: 'st-c12-phy-01-03-01',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-03',
                conceptId: 'c-12-phy-gauss-03',
                title: 'Electric Flux and Gauss’s Law Statement (∮ E · dA = q/ε0)',
                description: 'Conceptual proof using spherical Gaussian surface around point charge.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.14',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              },
              {
                id: 'st-c12-phy-01-03-02',
                type: 'subtopic',
                chapterId: 'c12-phy-ch1',
                unitId: 'u-c12-phy-01',
                parentTopicId: 't-c12-phy-01-03',
                conceptId: 'c-12-phy-gauss-03',
                title: 'Field Due to Infinitely Long Wire & Uniformly Charged Plane Sheet',
                description: 'E = λ/(2πε0 r) and E = σ/(2ε0) step-by-step 5-mark board derivations.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'NCERT Section 1.15',
                provenance: PROVENANCE_TYPES.VERIFIED_NCERT
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CLASS 11 ISC ENGLISH: CHAPTER 3 — DRAMA: MACBETH ACT I (Has Units)
  // Demonstrates CISCE / ISC Prescribed Literature Structure
  // =========================================================================
  'c11-eng-ch3': {
    chapterId: 'c11-eng-ch3',
    chapterAliases: ['c11-eng-ch3', 'isc11-eng-ch3', 'isc-11-eng-ch03'],
    chapterTitle: 'Drama: Macbeth Act I (William Shakespeare)',
    chapterNumber: 3,
    classLevel: 11,
    board: 'ICSE',
    subjectId: 'eng-11',
    subjectName: 'ISC English',
    hasUnits: true,
    source: 'CISCE Prescribed Syllabus ISC 2026–27 Literature in English Paper 2',
    provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
    units: [
      {
        id: 'u-isc11-eng-02',
        type: 'unit',
        chapterId: 'c11-eng-ch3',
        unitNumber: 2,
        title: 'Paper 2: Drama (Macbeth)',
        description: 'Prescribed Shakespearean tragedy: Macbeth Act I scene-by-scene critical analysis.',
        order: 1,
        provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
        topics: [
          {
            id: 't-isc11-eng-03-01',
            type: 'topic',
            board: 'ICSE',
            classLevel: 11,
            subjectId: 'eng-11',
            chapterId: 'c11-eng-ch3',
            unitId: 'u-isc11-eng-02',
            parentTopicId: null,
            conceptId: 'c-isc11-eng-mac-01',
            title: 'The Witches’ Prophecy on the Heath',
            description: 'Act I Scenes 1–3: Moral inversion, thunder and lightning, and the three prophecies to Macbeth and Banquo.',
            order: 1,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Macbeth Act I Scenes 1–3',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
            subtopics: [
              {
                id: 'st-isc11-eng-03-01-01',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-01',
                conceptId: 'c-isc11-eng-mac-01',
                title: '"Fair is foul, and foul is fair" Moral Inversion Motif',
                description: 'The supernatural atmosphere establishing thematic ambiguity between appearance and reality.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'Act I Scene 1',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              },
              {
                id: 'st-isc11-eng-03-01-02',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-01',
                conceptId: 'c-isc11-eng-mac-01',
                title: 'Thane of Glamis, Cawdor, and King Hereafter Prophecies',
                description: 'Macbeth’s start of fear vs Banquo’s rational skepticism of the instruments of darkness.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'Act I Scene 3',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              }
            ]
          },
          {
            id: 't-isc11-eng-03-02',
            type: 'topic',
            board: 'ICSE',
            classLevel: 11,
            subjectId: 'eng-11',
            chapterId: 'c11-eng-ch3',
            unitId: 'u-isc11-eng-02',
            parentTopicId: null,
            conceptId: 'c-isc11-eng-mac-02',
            title: 'Lady Macbeth Invoking the Spirits of Cruelty',
            description: 'Act I Scene 5: Inverness castle, reading the letter, and demanding to be unsexed for regicide.',
            order: 2,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Macbeth Act I Scene 5',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
            subtopics: [
              {
                id: 'st-isc11-eng-03-02-01',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-02',
                conceptId: 'c-isc11-eng-mac-02',
                title: '"Unsex me here" Soliloquy and Rejection of Feminine Pity',
                description: 'Invocation of dark spirits to fill her from the crown to the toe top-full of direst cruelty.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'Act I Scene 5 Lines 39–53',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              },
              {
                id: 'st-isc11-eng-03-02-02',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-02',
                conceptId: 'c-isc11-eng-mac-02',
                title: '"Look like the innocent flower, but be the serpent under ’t"',
                description: 'The Machiavellian art of dissimulation and deception directed at Duncan’s arrival.',
                order: 2,
                importance: IMPORTANCE_LEVELS.BOARD_STANDARD,
                source: 'Act I Scene 5 Lines 64–66',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              }
            ]
          },
          {
            id: 't-isc11-eng-03-03',
            type: 'topic',
            board: 'ICSE',
            classLevel: 11,
            subjectId: 'eng-11',
            chapterId: 'c11-eng-ch3',
            unitId: 'u-isc11-eng-02',
            parentTopicId: null,
            conceptId: 'c-isc11-eng-mac-03',
            title: 'Macbeth’s Soliloquy and Vaunting Ambition',
            description: 'Act I Scene 7: Weighing moral karma, hospitality duty, Duncan’s meek virtues, and spur of ambition.',
            order: 3,
            importance: IMPORTANCE_LEVELS.HIGH_YIELD,
            source: 'Macbeth Act I Scene 7',
            provenance: PROVENANCE_TYPES.BOARD_OFFICIAL,
            subtopics: [
              {
                id: 'st-isc11-eng-03-03-01',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-03',
                conceptId: 'c-isc11-eng-mac-03',
                title: '"If it were done when ’tis done" Moral Repercussions',
                description: 'Even-handed justice commending the poisoned chalice to our own lips.',
                order: 1,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'Act I Scene 7 Lines 1–12',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              },
              {
                id: 'st-isc11-eng-03-03-02',
                type: 'subtopic',
                chapterId: 'c11-eng-ch3',
                unitId: 'u-isc11-eng-02',
                parentTopicId: 't-isc11-eng-03-03',
                conceptId: 'c-isc11-eng-mac-03',
                title: 'Duncan’s Double Trust as Kinsman and Host vs Vaulting Ambition',
                description: 'The sole driving motive o’erleaping itself and falling on the other.',
                order: 2,
                importance: IMPORTANCE_LEVELS.HIGH_YIELD,
                source: 'Act I Scene 7 Lines 13–28',
                provenance: PROVENANCE_TYPES.BOARD_OFFICIAL
              }
            ]
          }
        ]
      }
    ]
  }
};
