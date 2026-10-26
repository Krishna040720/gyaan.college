// GYAAN AI Concept Knowledge Base & Hierarchical Curriculum Database
// Structured according to: Board -> Academic Year -> Class -> Subject -> Book/Curriculum -> Chapter -> Concept -> Learning Objective
// Fully scalable for Indian boards (CBSE, ICSE, UPMSP, State Boards) and Classes 1 to 12.

export const ACADEMIC_YEARS = ['2026-27', '2025-26'];
export const CURRENT_ACADEMIC_YEAR = '2026-27';
export const CURRICULUM_VERSION = 'v2026.1';

import { BOARDS } from './boardsRegistry.js';
export { BOARDS };

// Content authority classifications
export const CONTENT_STATUSES = {
  VERIFIED: 'verified',          // Curriculum verified / NCERT official
  TEACHER_CREATED: 'teacher_created', // Reviewed educator content
  AI_GENERATED: 'ai_generated',  // Algorithmic supplementary
  USER_GENERATED: 'user_generated'
};

// Scalable Concept Knowledge Base Registry
// Every concept has complete prerequisite lineage, must-know points, misconceptions, and learning objectives
export const CONCEPTS_REPOSITORY = [
  // =========================================================================
  // CLASS 9 SCIENCE: FORCE AND LAWS OF MOTION (Core Physics Prerequisite Root)
  // =========================================================================
  {
    id: 'c-9-sci-mot-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch8',
    chapterTitle: 'Force and Laws of Motion',
    chapterAliases: ['c9-sci-ch8', 'ch-force-9', 'ch-8-science'],
    title: "Newton's First Law of Motion & Inertia",
    description: "An object remains in a state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force. Inertia as the natural tendency of an object to resist changes in its state of motion.",
    learningObjectives: [
      "State Newton's First Law of Motion clearly",
      "Define inertia and its three types: inertia of rest, inertia of motion, and inertia of direction",
      "Correlate mass as a quantitative measure of inertia",
      "Explain daily life phenomena: why passengers lean forward when a bus applies sudden brakes"
    ],
    prerequisites: [],
    dependentConcepts: ['c-9-sci-mot-02', 'c-11-phy-vec-01'],
    relatedConcepts: ['c-9-sci-grav-01'],
    mustKnowPoints: [
      "Newton's First Law: An object continues in its state of rest or uniform motion along a straight line unless acted on by an external unbalanced force",
      "Inertia is the inherent property of a body to resist any change in its velocity or state of rest",
      "Mass is the direct quantitative measure of inertia: larger mass means greater inertia",
      "Balanced forces do not change the state of motion (net force = 0); only an unbalanced force causes acceleration",
      "When a moving bus stops suddenly, the lower body stops with the bus while the upper body continues moving forward due to inertia of motion"
    ],
    acceptableExplanations: [
      "Newton's first law says things keep doing what they are doing unless pushed or pulled by an unbalanced force. Heavy objects have more inertia, meaning they are harder to start or stop.",
      "An object will stay at rest or keep moving at constant velocity unless a net external force acts on it. This tendency to resist change is called inertia."
    ],
    commonMisconceptions: [
      {
        misconception: "A continuous force is required to keep an object moving at a constant speed.",
        correction: "According to Newton's First Law and Galileo's experiments, no force is required to maintain constant velocity. Objects slow down on Earth only because of external resistive forces like friction and air drag."
      },
      {
        misconception: "Inertia is a force that acts on moving objects.",
        correction: "Inertia is NOT a force; it is an intrinsic physical property of matter proportional to mass that measures resistance to acceleration."
      }
    ],
    examples: [
      "Shaking a tree branch vigorously causes leaves and ripe fruits to detach due to inertia of rest.",
      "Dust particles fly out of a carpet when struck with a stick because the carpet moves while dust stays behind due to inertia."
    ],
    applications: [
      "Mandatory seatbelts in automobiles to restrain passengers during sudden deceleration",
      "Athletes running a short distance before taking a long jump to harness inertia of motion"
    ],
    difficulty: 'easy',
    sourceReferences: [
      { source: 'NCERT Class 9 Science (Rationalised 2026-27)', chapter: 8, section: '8.2', page: '116-119' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-9-sci-mot-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch8',
    chapterTitle: 'Force and Laws of Motion',
    chapterAliases: ['c9-sci-ch8', 'ch-force-9', 'ch-8-science'],
    title: "Newton's Second Law of Motion & Momentum (F = ma)",
    description: "Linear momentum as p = mv, the rate of change of momentum is directly proportional to applied unbalanced force in the direction of the force, mathematical derivation F = k·ma (F = ma), and unit Newton.",
    learningObjectives: [
      "Define linear momentum (p = mv) and its SI unit kg·m/s",
      "State Newton's Second Law of Motion mathematically: F ∝ dp/dt",
      "Derive the formula F = m × a from first principles",
      "Define 1 Newton of force as the force that causes 1 kg mass to accelerate at 1 m/s²",
      "Explain why a cricket fielder pulls hands backward while catching a fast ball"
    ],
    prerequisites: ['c-9-sci-mot-01'],
    dependentConcepts: ['c-9-sci-mot-03', 'c-11-phy-proj-01', 'c-11-phy-work-01'],
    mustKnowPoints: [
      "Linear momentum is the product of mass and velocity: p = m × v (vector quantity in the direction of velocity)",
      "Newton's Second Law: The rate of change of momentum is directly proportional to the applied unbalanced force: F = m(v - u) / t = m × a",
      "SI unit of force is Newton (N), where 1 N = 1 kg·m/s²",
      "When catching a cricket ball, pulling hands back increases the time interval (t), which reduces the rate of change of momentum and thus decreases the impact force on hands",
      "Acceleration is directly proportional to net force and inversely proportional to mass: a = F / m"
    ],
    acceptableExplanations: [
      "Newton's second law says that force equals mass times acceleration (F = ma). More precisely, force is how fast momentum changes over time.",
      "If you want to accelerate an object, you have to apply an unbalanced force. Heavy objects require more force for the same acceleration."
    ],
    commonMisconceptions: [
      {
        misconception: "Force is a property that a moving body carries with it.",
        correction: "Bodies carry momentum and kinetic energy, NOT force. Force is an external interaction between two bodies that causes a change in momentum."
      }
    ],
    examples: [
      "A fast-moving cricket ball hurts much more than a slow tennis ball of similar mass because of higher momentum.",
      "A loaded truck requires a much stronger braking force than an empty truck to stop within the same distance."
    ],
    applications: [
      "Airbags in cars deploying in milliseconds to lengthen deceleration time, cutting peak impact force",
      "High jumpers landing on foam mattresses or sandpits to increase impact duration and prevent injuries"
    ],
    difficulty: 'medium',
    sourceReferences: [
      { source: 'NCERT Class 9 Science (Rationalised 2026-27)', chapter: 8, section: '8.3', page: '120-123' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-9-sci-mot-03',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch8',
    chapterTitle: 'Force and Laws of Motion',
    chapterAliases: ['c9-sci-ch8', 'ch-force-9', 'ch-8-science'],
    title: "Newton's Third Law & Conservation of Linear Momentum",
    description: "To every action there is always an equal and opposite reaction acting on two different bodies. Law of Conservation of Momentum: total momentum of an isolated system remains constant.",
    learningObjectives: [
      "State Newton's Third Law: Action and reaction are equal in magnitude, opposite in direction, and act on two different bodies",
      "Explain why action and reaction forces NEVER cancel each other out",
      "State and derive the Law of Conservation of Linear Momentum (m1 u1 + m2 u2 = m1 v1 + m2 v2)",
      "Explain recoil velocity of a gun and rocket propulsion"
    ],
    prerequisites: ['c-9-sci-mot-02'],
    dependentConcepts: ['c-11-phy-proj-01'],
    mustKnowPoints: [
      "Action and reaction forces are strictly equal in magnitude and opposite in direction",
      "Crucial rule: Action and reaction act on TWO DIFFERENT bodies, which is why they NEVER cancel each other out",
      "Forces always occur in matched pairs; an isolated single force cannot exist in nature",
      "Law of Conservation of Momentum: In an isolated system with no external unbalanced force, total momentum before collision equals total momentum after collision",
      "Recoil of a gun: Gun recoils backward with velocity V = -(m_bullet × v_bullet) / M_gun to conserve total initial zero momentum"
    ],
    commonMisconceptions: [
      {
        misconception: "Action and reaction cancel each other because they are equal and opposite, so nothing can ever accelerate.",
        correction: "Forces can only cancel if they act on the SAME body! Action acts on body A, while reaction acts on body B. Each body experiences an unbalanced force and accelerates."
      }
    ],
    difficulty: 'medium',
    sourceReferences: [
      { source: 'NCERT Class 9 Science (Rationalised 2026-27)', chapter: 8, section: '8.4', page: '124-128' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },

  // =========================================================================
  // CLASS 9 SCIENCE: GRAVITATION
  // =========================================================================
  {
    id: 'c-9-sci-grav-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch9',
    chapterTitle: 'Gravitation',
    chapterAliases: ['c9-sci-ch9', 'c9-sci-ch10', 'ch-grav-9'],
    title: "Universal Law of Gravitation & Gravitational Constant G",
    description: "Every object in the universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them: F = G (m1 m2) / d².",
    learningObjectives: [
      "State Newton's Universal Law of Gravitation",
      "Formulate F = G (m1 m2) / d² and explain the inverse-square law",
      "State the universal gravitational constant G = 6.673 × 10⁻¹¹ N·m²/kg²",
      "Explain the significance of gravitation in holding the solar system and causing ocean tides"
    ],
    prerequisites: ['c-9-sci-mot-02'],
    dependentConcepts: ['c-9-sci-grav-02', 'c-11-phy-proj-01'],
    mustKnowPoints: [
      "Gravitational force is directly proportional to product of masses: F ∝ m1 × m2",
      "Gravitational force is inversely proportional to square of distance: F ∝ 1 / d²",
      "Formula: F = G × (m1 × m2) / d², where G is the Universal Gravitational Constant",
      "Value of G is constant everywhere in the universe: G = 6.673 × 10⁻¹¹ N·m²/kg²",
      "Gravitational force is always attractive and acts along the line joining the centers of the two bodies"
    ],
    difficulty: 'medium',
    sourceReferences: [
      { source: 'NCERT Class 9 Science (Rationalised 2026-27)', chapter: 9, section: '9.1', page: '131-134' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-9-sci-grav-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch9',
    chapterTitle: 'Gravitation',
    chapterAliases: ['c9-sci-ch9', 'c9-sci-ch10', 'ch-grav-9'],
    title: "Free Fall, Acceleration Due to Gravity (g) & Mass vs Weight",
    description: "Acceleration experienced during free fall under Earth's gravity: g = GM/R² (approx 9.8 m/s²), variations with altitude/depth/equator, and strict distinction between scalar mass (kg) and vector weight (N).",
    learningObjectives: [
      "Define free fall and acceleration due to gravity (g)",
      "Derive g = G·M / R² and calculate its average Earth value (9.8 m/s²)",
      "Explain why g is greater at the poles and smaller at the equator",
      "Distinguish rigorously between mass (amount of matter, kg) and weight (force of gravity W = mg, N)",
      "Explain weightlessness in free fall and on the Moon (g_moon = g_earth / 6)"
    ],
    prerequisites: ['c-9-sci-grav-01', 'c-9-sci-mot-02'],
    dependentConcepts: ['c-11-phy-proj-01'],
    mustKnowPoints: [
      "Free fall occurs when an object falls solely under the influence of gravity with no other forces acting",
      "Formula for acceleration due to gravity: g = G × M_earth / R_earth² = 9.8 m/s²",
      "Mass is the measure of matter; it is scalar, constant everywhere, and never zero",
      "Weight is the gravitational force exerted by Earth: W = m × g; it is a vector measured in Newtons and varies with location",
      "Acceleration due to gravity g is independent of the mass of the falling body: all objects fall at the same rate in vacuum"
    ],
    commonMisconceptions: [
      {
        misconception: "Heavy objects fall faster than light objects.",
        correction: "In vacuum without air resistance, heavy and light objects accelerate at the identical rate g = 9.8 m/s². Galileo proved this at the Leaning Tower of Pisa, and Apollo 15 confirmed it with a feather and hammer on the Moon."
      },
      {
        misconception: "Mass and weight are the same thing and can both be measured in kilograms.",
        correction: "Mass is intrinsic matter measured in kg. Weight is a gravitational force measured in Newtons (W = mg). A 60 kg person has mass 60 kg everywhere, but weighs ~588 N on Earth and only ~98 N on the Moon."
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 9 SCIENCE: ATOMS AND MOLECULES (Chemistry Prerequisite Root)
  // =========================================================================
  {
    id: 'c-9-sci-atom-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch3',
    chapterTitle: 'Atoms and Molecules',
    chapterAliases: ['c9-sci-ch3', 'ch-atom-9'],
    title: "Laws of Chemical Combination & Dalton's Atomic Theory",
    description: "Law of Conservation of Mass (Lavoisier), Law of Constant Proportions (Proust), postulates of Dalton's Atomic Theory, atomic mass unit (u), and atomic symbols.",
    learningObjectives: [
      "State the Law of Conservation of Mass and Law of Definite Proportions",
      "Enumerate Dalton's atomic postulates that explain both laws",
      "Define unified atomic mass unit (u) relative to Carbon-12 isotope (1/12th mass of C-12 atom)"
    ],
    prerequisites: [],
    dependentConcepts: ['c-9-sci-atom-02', 'c-10-sci-chem-01'],
    mustKnowPoints: [
      "Law of Conservation of Mass: Mass can neither be created nor destroyed in a chemical reaction",
      "Law of Constant Proportions: In a pure chemical substance, elements are always present in definite proportions by mass (e.g., H₂O is always 1:8 hydrogen to oxygen by mass)",
      "Dalton's Postulate: All matter consists of indivisible particles called atoms; atoms of a given element are identical in mass and chemical properties",
      "Unified atomic mass unit (u) is defined as exactly 1/12th the mass of one Carbon-12 atom"
    ],
    difficulty: 'easy',
    status: 'verified'
  },
  {
    id: 'c-9-sci-atom-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch3',
    chapterTitle: 'Atoms and Molecules',
    chapterAliases: ['c9-sci-ch3', 'ch-atom-9'],
    title: "The Mole Concept, Avogadro Constant & Molar Mass",
    description: "A mole as a counting unit in chemistry containing 6.022 × 10²³ particles (atoms, molecules, ions), relationship between mass, moles, and particle count (n = m / M = N / N_A).",
    learningObjectives: [
      "Define 1 mole as the amount of substance containing Avogadro number of particles (N_A = 6.022 × 10²³)",
      "Convert between mass in grams, moles, and number of particles using n = m / M",
      "Calculate molar mass of molecular compounds"
    ],
    prerequisites: ['c-9-sci-atom-01'],
    dependentConcepts: ['c-10-sci-chem-01'],
    mustKnowPoints: [
      "One mole contains exactly 6.022 × 10²³ elementary entities (Avogadro's Number, N_A)",
      "The mass of 1 mole of any substance in grams equals its atomic or molecular mass in atomic mass units (u)",
      "Fundamental mole formulas: n = mass in grams (m) / molar mass (M) = number of particles (N) / 6.022 × 10²³",
      "1 mole of H₂O weighs 18 grams and contains 6.022 × 10²³ water molecules"
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 9 SCIENCE: THE FUNDAMENTAL UNIT OF LIFE (Cell Biology Root)
  // =========================================================================
  {
    id: 'c-9-sci-cell-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 9,
    subject: 'Science',
    subjectId: 'sci-9',
    chapterId: 'c9-sci-ch5',
    chapterTitle: 'The Fundamental Unit of Life',
    chapterAliases: ['c9-sci-ch5', 'ch-cell-9'],
    title: "Plasma Membrane, Osmosis & Diffusion",
    description: "Structure of selectively permeable plasma membrane, diffusion of gases (O₂ and CO₂), osmosis of water across hypotonic, isotonic, and hypertonic solutions, and endocytosis.",
    learningObjectives: [
      "Define plasma membrane as a flexible lipid-protein bilayer that is selectively permeable",
      "Differentiate diffusion (spontaneous movement from high to low concentration) and osmosis (water movement across semi-permeable membrane)",
      "Predict cell behavior in hypotonic (swells/turgid), isotonic (stable), and hypertonic (shrinks/plasmolysis) solutions"
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-sci-life-01', 'c-10-sci-life-04'],
    mustKnowPoints: [
      "Plasma membrane is selectively permeable: it permits entry and exit of specific materials while preventing others",
      "Diffusion is net movement of substances from higher concentration to lower concentration down a concentration gradient",
      "Osmosis is diffusion of water across a selectively permeable membrane",
      "In a hypotonic solution (lower solute outside), water enters the cell, causing animal cells to burst and plant cells to become turgid",
      "In a hypertonic solution (higher solute outside), water leaves the cell, causing plasmolysis in plant cells"
    ],
    difficulty: 'easy',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: ELECTRICITY (Flagship Conceptual Suite)
  // =========================================================================
  {
    id: 'c-10-sci-elec-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-elec-10',
    chapterTitle: 'Electricity',
    chapterAliases: ['ch-11-science', 'ch-elec-10'],
    title: 'Electric Current & Electric Charge',
    description: 'Electric current as the rate of flow of electric charge through a conductor (I = Q/t), unit Ampere, and conventional current direction versus electron flow.',
    learningObjectives: [
      'Define electric charge and its SI unit Coulomb (C)',
      'Formulate electric current as I = Q/t with SI unit Ampere (A)',
      'Explain how an ammeter measures current in series connection',
      'Distinguish between conventional current (positive to negative) and actual electron flow'
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-sci-elec-02', 'c-10-sci-elec-03', 'c-12-phy-elec-01'],
    relatedConcepts: ['c-10-sci-elec-04'],
    mustKnowPoints: [
      'Electric current is the rate of flow of electric charges: I = Q / t',
      'One Ampere is the flow of one Coulomb of charge per second (1 A = 1 C/s)',
      'Current is measured by an Ammeter, which is always connected in series because of low resistance',
      'Conventional current flows from positive terminal to negative terminal, which is opposite to electron motion',
      'Charge of one electron is 1.6 × 10⁻¹⁹ Coulombs; 1 Coulomb contains approx 6.25 × 10¹⁸ electrons'
    ],
    acceptableExplanations: [
      'Electric current is how fast electric charge flows through a wire. Mathematically I equals Q divided by t. It is measured in Amperes using an ammeter.',
      'Just like water flowing through a pipe, electric current is electric charges passing a cross-section per second. By convention it flows from positive to negative.'
    ],
    commonMisconceptions: [
      {
        misconception: 'Current is consumed or used up when passing through a bulb or resistor.',
        correction: 'Electric charge is strictly conserved. The same amount of current leaves a component as enters it. What is consumed is electrical potential energy, converted into heat and light.'
      },
      {
        misconception: 'Electrons travel at the speed of light along the wire.',
        correction: 'Individual electrons drift very slowly (fractions of a mm per second, called drift velocity). The electric field and energy propagate near the speed of light, which is why the bulb lights instantly.'
      }
    ],
    examples: [
      'A stream of water flowing steadily through a garden hose at 2 liters per second is analogous to 2 Amperes of current.',
      'Lighting up a flashlight: The battery pushes 0.5 Coulombs of charge per second through the bulb filament.'
    ],
    applications: [
      'Circuit breakers and fuses rated in Amperes (5A for lights, 15A for geysers/heaters)',
      'Mobile phone charging rate (e.g. 5V 2A charger)'
    ],
    difficulty: 'easy',
    sourceReferences: [
      { source: 'NCERT Class 10 Science (Rationalised 2026-27)', chapter: 11, section: '11.1', page: '199-200' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-10-sci-elec-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-elec-10',
    chapterTitle: 'Electricity',
    chapterAliases: ['ch-11-science', 'ch-elec-10'],
    title: 'Electric Potential & Potential Difference',
    description: 'Electric potential difference (V = W/Q) as work done in moving a unit positive charge between two points, unit Volt, and voltmeter connection in parallel.',
    learningObjectives: [
      'Define electric potential difference between two points',
      'Express potential difference mathematically: V = W / Q',
      'Define the SI unit Volt (1 V = 1 J/C)',
      'Explain why a voltmeter is connected in parallel across components'
    ],
    prerequisites: ['c-10-sci-elec-01'],
    dependentConcepts: ['c-10-sci-elec-03'],
    relatedConcepts: ['c-10-sci-elec-05'],
    mustKnowPoints: [
      'Electric potential difference between two points is work done in moving unit positive charge: V = W / Q',
      'SI unit is Volt (V). One Volt is the potential difference when 1 Joule of work moves 1 Coulomb of charge (1 V = 1 J/C)',
      'Potential difference is maintained in a circuit by chemical action inside a cell or battery',
      'A Voltmeter has very high resistance and is always connected in parallel across the two points to avoid drawing current'
    ],
    acceptableExplanations: [
      'Potential difference is the electrical pressure created by a battery that forces charges to move. It equals work done per unit charge, V = W/Q, measured in Volts with a voltmeter in parallel.',
      'To make charges flow, there must be a difference in electrical potential, just like water needs a height difference to flow downhill.'
    ],
    commonMisconceptions: [
      {
        misconception: 'Voltage flows through wires just like electric current.',
        correction: 'Voltage does NOT flow; voltage is a potential difference between two points (an electrical pressure). Current is what flows through the conductor.'
      },
      {
        misconception: 'A battery creates electric charges out of nothing.',
        correction: 'A battery does not create charges; it merely provides the potential difference (energy) to push existing electrons present in the conductor.'
      }
    ],
    examples: [
      'A water pump lifting water to a rooftop tank creates gravitational potential difference; a battery creates electric potential difference.',
      'A 1.5V AA battery does 1.5 Joules of work on every Coulomb of charge moving between its terminals.'
    ],
    applications: [
      'Standard Indian domestic power supply maintaining 220 Volts AC',
      'Car batteries maintaining 12 Volts DC'
    ],
    difficulty: 'medium',
    sourceReferences: [
      { source: 'NCERT Class 10 Science (Rationalised 2026-27)', chapter: 11, section: '11.2', page: '201-202' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-10-sci-elec-03',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-elec-10',
    chapterTitle: 'Electricity',
    chapterAliases: ['ch-11-science', 'ch-elec-10'],
    title: "Ohm's Law & Resistance",
    description: "The fundamental relationship between potential difference and electric current at constant temperature: V = I × R, factors affecting resistance, and resistivity.",
    learningObjectives: [
      "State Ohm's Law and its mathematical formulation V = IR",
      "Explain the condition: temperature and physical dimensions must remain constant",
      "Define electrical resistance (R) and its SI unit Ohm (Ω)",
      "Interpret the linear V-I graph for an ohmic conductor",
      "Identify factors determining resistance: length (L), area (A), material (ρ), and temperature"
    ],
    prerequisites: ['c-10-sci-elec-01', 'c-10-sci-elec-02'],
    dependentConcepts: ['c-10-sci-elec-04', 'c-10-sci-elec-05', 'c-12-phy-curr-01'],
    relatedConcepts: ['c-10-sci-elec-06'],
    mustKnowPoints: [
      "Ohm's Law: At constant temperature, current through a conductor is directly proportional to potential difference across its ends (V ∝ I)",
      "Mathematical formula: V = I × R, where R is the constant called electrical resistance",
      "SI unit of resistance is Ohm (Ω). One Ohm is 1 Volt divided by 1 Ampere (1 Ω = 1 V / 1 A)",
      "The V-I graph is a straight line passing through the origin; its slope gives resistance R",
      "Resistance formula: R = ρ × (L / A), where ρ is electrical resistivity in Ohm-meter (Ω·m)",
      "Resistance increases with length (R ∝ L) and decreases with cross-sectional area (R ∝ 1/A)"
    ],
    acceptableExplanations: [
      "Ohm's Law states that at constant temperature, the current in a metallic wire is directly proportional to the voltage applied across its ends, so V = IR. Resistance is the property of the conductor to oppose the flow of current.",
      "If you double the voltage across a resistor at constant temperature, the current also doubles. Resistance is the ratio of V to I, measured in Ohms."
    ],
    commonMisconceptions: [
      {
        misconception: 'If you double the voltage, resistance will double because R = V/I.',
        correction: 'For an ohmic conductor at constant temperature, resistance R is a physical constant of the material. When you double V, current I doubles, keeping R unchanged.'
      },
      {
        misconception: 'Resistance and resistivity are the exact same thing.',
        correction: 'Resistance (R) depends on the size and shape (length and thickness) of the wire. Resistivity (ρ) is an intrinsic property of the material that does not change when the wire is cut or stretched.'
      },
      {
        misconception: "Ohm's Law applies to all electrical devices without exception.",
        correction: "Ohm's Law only holds for metallic (ohmic) conductors at constant temperature. It fails for diodes, transistors, filaments whose temperature changes, and electrolytes."
      }
    ],
    examples: [
      'Pushing water through a thin pipe requires more pressure than through a wide pipe; similarly, thin wires have higher resistance than thick wires.',
      'Copper is used for household wires due to low resistivity; nichrome is used in heaters due to high resistance and high melting point.'
    ],
    applications: [
      'Volume control knobs (potentiometers/rheostats) adjusting resistance to control current',
      'Choosing thick copper wiring for high-power air conditioners to minimize resistance'
    ],
    difficulty: 'medium',
    sourceReferences: [
      { source: 'NCERT Class 10 Science (Rationalised 2026-27)', chapter: 11, section: '11.3', page: '203-207' }
    ],
    languages: ['en', 'hi', 'hinglish'],
    status: 'verified'
  },
  {
    id: 'c-10-sci-elec-04',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-elec-10',
    chapterTitle: 'Electricity',
    chapterAliases: ['ch-11-science', 'ch-elec-10'],
    title: 'Series and Parallel Combination of Resistors',
    description: 'Equivalent resistance derivations for series (Rs = R1 + R2 + R3) and parallel (1/Rp = 1/R1 + 1/R2 + 1/R3) circuits, and domestic wiring advantages.',
    learningObjectives: [
      'Derive equivalent resistance for series combination (Rs = R1 + R2 + ...)',
      'Derive equivalent resistance for parallel combination (1/Rp = 1/R1 + 1/R2 + ...)',
      'Recognize that current is constant in series, while voltage is constant in parallel',
      'Explain why household appliances are always connected in parallel'
    ],
    prerequisites: ['c-10-sci-elec-03'],
    dependentConcepts: ['c-10-sci-elec-05', 'c-12-phy-curr-01'],
    mustKnowPoints: [
      'In series: Same current flows through all resistors (I is constant); total potential difference V = V1 + V2 + V3',
      'Series equivalent resistance: Rs = R1 + R2 + R3 (always greater than the largest individual resistor)',
      'In parallel: Same potential difference across all resistors (V is constant); total current I = I1 + I2 + I3',
      'Parallel equivalent resistance: 1/Rp = 1/R1 + 1/R2 + 1/R3 (always smaller than the smallest individual resistor)',
      'Domestic wiring uses parallel connection because each appliance gets full 220V rating and failure of one appliance does not disrupt others'
    ],
    acceptableExplanations: [
      'In a series circuit, resistors are connected end to end so the same current passes through all of them, adding up resistance: Rs = R1 + R2. In parallel, each resistor is connected across the same two points so voltage is identical, giving 1/Rp = 1/R1 + 1/R2.',
      'Series increases total resistance because it increases effective length. Parallel decreases total resistance because it provides multiple paths (greater effective area).'
    ],
    commonMisconceptions: [
      {
        misconception: 'Adding more resistors in parallel increases the total circuit resistance.',
        correction: 'Adding resistors in parallel ALWAYS decreases total resistance because you are opening additional parallel pathways for current to flow.'
      },
      {
        misconception: 'In series, the first resistor takes most of the current leaving less for the second.',
        correction: 'Current cannot accumulate or vanish in a series loop; current through every resistor in series is strictly identical.'
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-elec-05',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-elec-10',
    chapterTitle: 'Electricity',
    chapterAliases: ['ch-11-science', 'ch-elec-10'],
    title: "Joule's Heating Effect & Electric Power",
    description: "Heating effect of electric current (H = I²Rt), electric power formulas (P = VI = I²R = V²/R), commercial unit of energy (kWh), and safety fuses.",
    learningObjectives: [
      "State Joule's Law of Heating: H = I²Rt",
      "Calculate electric power using P = VI, P = I²R, and P = V²/R",
      "Convert between Joules and commercial units: 1 kWh = 3.6 × 10⁶ J",
      "Explain the working principle and rating of an electric fuse"
    ],
    prerequisites: ['c-10-sci-elec-03', 'c-10-sci-elec-04'],
    dependentConcepts: [],
    mustKnowPoints: [
      "Joule's Law of Heating states heat produced in a resistor is directly proportional to: (1) square of current (I²), (2) resistance (R), and (3) time (t): H = I²Rt",
      'Electric power is the rate at which electrical energy is consumed: P = V × I = I²R = V² / R; SI unit is Watt (W)',
      'Commercial unit of electric energy is kilowatt-hour (kWh), commonly known as 1 "unit": 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ Joules',
      'Electric fuse is a safety device with a low melting point wire connected in series with the live wire that melts during overload or short-circuit'
    ],
    commonMisconceptions: [
      {
        misconception: 'A 100 Watt bulb has higher resistance than a 60 Watt bulb connected to 220V supply.',
        correction: 'Since P = V² / R and voltage V is constant (220V), higher power means LOWER resistance! A 100W bulb has lower resistance than a 60W bulb.'
      }
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: LIGHT - REFLECTION & REFRACTION
  // =========================================================================
  {
    id: 'c-10-sci-light-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-light-10',
    chapterTitle: 'Light - Reflection and Refraction',
    chapterAliases: ['ch-9-science', 'ch-light-10'],
    title: 'Spherical Mirrors & Ray Diagrams',
    description: 'Concave and convex mirrors, pole, center of curvature, focus, focal length (f = R/2), standard ray rules, and image formation.',
    learningObjectives: [
      'Distinguish between concave (converging) and convex (diverging) spherical mirrors',
      'Define pole (P), center of curvature (C), principal axis, and principal focus (F)',
      'Use the relationship between focal length and radius of curvature: f = R / 2',
      'Construct accurate ray diagrams for concave and convex mirrors'
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-sci-light-02', 'c-10-sci-light-03'],
    mustKnowPoints: [
      'Concave mirror has an inward-curving reflecting surface that converges parallel rays to a real focus',
      'Convex mirror has an outward-curving reflecting surface that diverges rays, having a virtual focus behind the mirror',
      'Relationship between focal length f and radius of curvature R is f = R / 2',
      'Concave mirror forms real and inverted images for all positions except when object is between pole P and focus F (where it forms an enlarged, virtual, erect image)',
      'Convex mirror ALWAYS forms a virtual, erect, and diminished image regardless of object position, providing a wide field of view'
    ],
    commonMisconceptions: [
      {
        misconception: 'Convex mirrors can form real images if the object is brought very close.',
        correction: 'A convex mirror can NEVER form a real image of a real object. It always forms a virtual, erect, and diminished image behind the mirror.'
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-light-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-light-10',
    chapterTitle: 'Light - Reflection and Refraction',
    chapterAliases: ['ch-9-science', 'ch-light-10'],
    title: 'Mirror Formula & Magnification',
    description: 'Cartesian sign convention, mirror formula (1/f = 1/v + 1/u), and linear magnification (m = -v/u = h_i / h_o).',
    learningObjectives: [
      'Apply the New Cartesian Sign Convention correctly to all measurements',
      'Solve numericals using the mirror formula: 1/f = 1/v + 1/u',
      'Interpret magnification m: sign indicates inverted (-) vs erect (+), magnitude indicates magnified (>1) vs diminished (<1)'
    ],
    prerequisites: ['c-10-sci-light-01'],
    dependentConcepts: ['c-10-sci-light-04'],
    mustKnowPoints: [
      'Cartesian Sign Convention: Distances in direction of incident light are positive; opposite to incident light are negative. Object distance u is ALWAYS negative',
      'Focal length f is negative for concave mirrors and positive for convex mirrors',
      'Mirror formula: 1/f = 1/v + 1/u',
      'Linear magnification: m = height of image / height of object = - v / u',
      'Negative m means real and inverted image; positive m means virtual and erect image'
    ],
    commonMisconceptions: [
      {
        misconception: 'Forgetting the minus sign in mirror magnification (writing m = v/u).',
        correction: 'Mirror magnification is strictly m = -v/u. The minus sign is part of the formula. In lenses, it is m = +v/u.'
      }
    ],
    difficulty: 'hard',
    status: 'verified'
  },
  {
    id: 'c-10-sci-light-03',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-light-10',
    chapterTitle: 'Light - Reflection and Refraction',
    chapterAliases: ['ch-9-science', 'ch-light-10'],
    title: "Refraction, Snell's Law & Refractive Index",
    description: "Bending of light across optical media, laws of refraction, Snell's Law (sin i / sin r = constant), and absolute vs relative refractive index.",
    learningObjectives: [
      'Explain refraction as the bending of light caused by a change in wave speed',
      "State Snell's Law of refraction: (sin i / sin r) = constant = n₂₁",
      'Define absolute refractive index: n = c / v',
      'Predict bending towards the normal (rare to dense) and away from normal (dense to rare)'
    ],
    prerequisites: ['c-10-sci-light-01'],
    dependentConcepts: ['c-10-sci-light-04'],
    mustKnowPoints: [
      'Refraction occurs because light changes speed when entering a medium of different optical density',
      'When light enters an optically denser medium, it slows down and bends TOWARDS the normal (i > r)',
      'When light enters an optically rarer medium, it speeds up and bends AWAY from the normal (i < r)',
      "Snell's Law: The ratio of sine of angle of incidence to sine of angle of refraction is constant: sin i / sin r = n₂₁",
      'Absolute refractive index of a medium is n = speed of light in vacuum (c) / speed of light in medium (v)'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-light-04',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-light-10',
    chapterTitle: 'Light - Reflection and Refraction',
    chapterAliases: ['ch-9-science', 'ch-light-10'],
    title: 'Lenses, Lens Formula & Power of Lens',
    description: 'Convex and concave lenses, lens formula (1/f = 1/v - 1/u), magnification (m = v/u), and power of a lens in Dioptres (P = 1/f in meters).',
    learningObjectives: [
      'Distinguish converging (convex) and diverging (concave) lenses',
      'Solve numericals with the lens formula: 1/f = 1/v - 1/u',
      'Calculate power of lens P = 1 / f(m) and understand the unit Dioptre (D)'
    ],
    prerequisites: ['c-10-sci-light-02', 'c-10-sci-light-03'],
    mustKnowPoints: [
      'Convex lens converges rays and has a positive focal length; concave lens diverges rays and has a negative focal length',
      'Lens formula: 1/f = 1/v - 1/u (notice the minus sign between v and u)',
      'Magnification of lens: m = height of image / height of object = + v / u',
      'Power of a lens is the reciprocal of its focal length in meters: P = 1 / f (in meters); unit is Dioptre (D)',
      'Power of a convex lens is positive (+); power of a concave lens is negative (-)'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: CHEMICAL REACTIONS & EQUATIONS
  // =========================================================================
  {
    id: 'c-10-sci-chem-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-chem-10',
    chapterTitle: 'Chemical Reactions and Equations',
    chapterAliases: ['ch-1-science', 'ch-chem-10'],
    title: 'Balancing Chemical Equations & Law of Conservation of Mass',
    description: 'Chemical change indicators, word equations, skeletal equations, balancing atoms to satisfy the Law of Conservation of Mass, and state symbols.',
    learningObjectives: [
      'Identify signs of chemical reactions: gas evolution, color change, temperature change, precipitate',
      'Formulate the Law of Conservation of Mass in chemical reactions',
      'Master the hit-and-trial method for balancing chemical equations',
      'Include physical state symbols: (s), (l), (g), (aq)'
    ],
    prerequisites: ['c-9-sci-atom-01'],
    dependentConcepts: ['c-10-sci-chem-02', 'c-10-sci-chem-03'],
    mustKnowPoints: [
      'Law of Conservation of Mass: Mass can neither be created nor destroyed in a chemical reaction; total mass of reactants must equal total mass of products',
      'Number of atoms of each element must remain identical before and after the reaction',
      'When balancing, ONLY change stoichiometric coefficients in front of formulas, NEVER change chemical subscripts',
      'Example: Fe + H₂O → Fe₃O₄ + H₂ balances to 3Fe + 4H₂O → Fe₃O₄ + 4H₂'
    ],
    commonMisconceptions: [
      {
        misconception: 'Changing subscript numbers to balance equations (e.g. changing H₂O to H₂O₂ to balance oxygen).',
        correction: 'Subscripts define the chemical identity of the substance! Changing H₂O to H₂O₂ turns water into toxic hydrogen peroxide. Only stoichiometric coefficients in front can be modified.'
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-chem-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-chem-10',
    chapterTitle: 'Chemical Reactions and Equations',
    chapterAliases: ['ch-1-science', 'ch-chem-10'],
    title: 'Types of Chemical Reactions',
    description: 'Combination, Decomposition (thermal, electrolytic, photolytic), Displacement, Double Displacement, and Precipitation reactions with balanced equations.',
    learningObjectives: [
      'Classify chemical reactions into combination, decomposition, displacement, and double displacement',
      'Distinguish thermal, electrolytic, and photolytic decomposition with examples',
      'Explain displacement reactions based on the metal reactivity series',
      'Define precipitation reactions in double displacement'
    ],
    prerequisites: ['c-10-sci-chem-01'],
    dependentConcepts: ['c-10-sci-chem-03', 'c-10-sci-metal-01'],
    mustKnowPoints: [
      'Combination reaction: Two or more reactants combine to form a single product (e.g., CaO + H₂O → Ca(OH)₂ + Heat)',
      'Decomposition reaction: A single reactant breaks down into two or more simpler products; requires energy (endothermic)',
      'Photolytic decomposition example: 2AgCl (white) --sunlight--> 2Ag (grey) + Cl₂ (used in black-and-white photography)',
      'Displacement reaction: More reactive element displaces a less reactive element from its salt solution (e.g., Fe + CuSO₄(blue) → FeSO₄(green) + Cu)',
      'Double displacement: Exchange of ions between reactants (e.g., Na₂SO₄ + BaCl₂ → BaSO₄(white ppt) + 2NaCl)'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-chem-03',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-chem-10',
    chapterTitle: 'Chemical Reactions and Equations',
    chapterAliases: ['ch-1-science', 'ch-chem-10'],
    title: 'Redox Reactions, Corrosion & Rancidity',
    description: 'Oxidation (gain of oxygen / loss of hydrogen / loss of electrons), reduction, oxidizing vs reducing agents, corrosion of iron/copper/silver, and rancidity prevention.',
    learningObjectives: [
      'Define oxidation and reduction in terms of oxygen, hydrogen, and electron transfer',
      'Identify the oxidized substance, reduced substance, oxidizing agent, and reducing agent in a redox reaction',
      'Explain corrosion mechanisms and prevention (galvanization, painting, oiling)',
      'Explain rancidity of fats/oils and methods of prevention (nitrogen flushing, antioxidants)'
    ],
    prerequisites: ['c-10-sci-chem-01', 'c-10-sci-chem-02'],
    mustKnowPoints: [
      'Oxidation is gain of oxygen or loss of hydrogen. Reduction is loss of oxygen or gain of hydrogen',
      'In a redox reaction, both processes occur simultaneously. The substance that gets reduced acts as the oxidizing agent; the substance that gets oxidized acts as the reducing agent',
      'In CuO + H₂ → Cu + H₂O: CuO is reduced to Cu (acting as oxidizing agent); H₂ is oxidized to H₂O (acting as reducing agent)',
      'Corrosion is the gradual deterioration of metals by moisture and atmospheric gases. Rust is hydrated ferric oxide: Fe₂O₃·xH₂O',
      'Rancidity is aerial oxidation of unsaturated fats and oils causing foul taste and odor; prevented by packaging in inert nitrogen gas'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: ACIDS, BASES AND SALTS
  // =========================================================================
  {
    id: 'c-10-sci-acid-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-acid-10',
    chapterTitle: 'Acids, Bases and Salts',
    chapterAliases: ['ch-2-science', 'ch-acid-10'],
    title: 'pH Scale, Indicators & Neutralization Reaction',
    description: 'H⁺ / OH⁻ ions in aqueous solutions, natural and synthetic indicators, the 0-14 pH scale, neutralization reaction (Acid + Base → Salt + Water), and daily life pH importance.',
    learningObjectives: [
      'Explain why acids generate H⁺ (aq) / H₃O⁺ ions and bases generate OH⁻ (aq) ions only in water',
      'Interpret the pH scale from 0 to 14 (acidic < 7, neutral = 7, basic > 7)',
      'Formulate neutralization: Acid + Base → Salt + Water (H⁺ + OH⁻ → H₂O)',
      'Explain pH significance in digestive system, tooth decay (pH < 5.5), and soil'
    ],
    prerequisites: ['c-10-sci-chem-01'],
    dependentConcepts: ['c-10-sci-acid-02'],
    mustKnowPoints: [
      'Acids furnish H⁺ / hydronium (H₃O⁺) ions in aqueous solution; dry HCl gas does not change dry litmus paper color',
      'Bases furnish OH⁻ (hydroxide) ions in aqueous solution; water-soluble bases are called alkalis',
      'The pH scale measures hydrogen ion concentration; lower pH denotes higher H⁺ concentration',
      'Neutralization reaction: Acid + Base → Salt + Water (e.g., HCl + NaOH → NaCl + H₂O)',
      'Tooth decay starts when mouth pH drops below 5.5 due to acid-producing bacterial breakdown of sugars'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-acid-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-acid-10',
    chapterTitle: 'Acids, Bases and Salts',
    chapterAliases: ['ch-2-science', 'ch-acid-10'],
    title: 'Important Salts: Baking Soda, Bleaching Powder & Plaster of Paris',
    description: 'Chemical formulas, preparations from common salt (NaCl), chlor-alkali process, water of crystallization, and applications of NaHCO₃, CaOCl₂, and CaSO₄·½H₂O.',
    learningObjectives: [
      'Describe the Chlor-alkali process: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂',
      'State formula and preparation of Bleaching Powder: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O',
      'Explain Baking Soda (NaHCO₃) vs Baking Powder (NaHCO₃ + mild edible tartaric acid)',
      'Explain Plaster of Paris (CaSO₄·½H₂O) setting into Gypsum (CaSO₄·2H₂O)'
    ],
    prerequisites: ['c-10-sci-acid-01'],
    mustKnowPoints: [
      'Bleaching powder is CaOCl₂, prepared by action of chlorine on dry slaked lime Ca(OH)₂',
      'Baking soda is sodium hydrogen carbonate (NaHCO₃); on heating it releases CO₂: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂',
      'Baking powder combines baking soda with tartaric acid to neutralize bitter tasting Na₂CO₃',
      'Plaster of Paris is calcium sulphate hemihydrate: CaSO₄·½H₂O; on mixing with water it sets hard into gypsum CaSO₄·2H₂O'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: METALS AND NON-METALS
  // =========================================================================
  {
    id: 'c-10-sci-metal-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-metal-10',
    chapterTitle: 'Metals and Non-Metals',
    chapterAliases: ['ch-3-science', 'ch-metal-10'],
    title: 'Reactivity Series & Ionic Bonding Formation',
    description: 'Arrangement of metals in order of decreasing chemical reactivity (K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au), formation of ionic compounds by complete electron transfer, and lattice properties.',
    learningObjectives: [
      'Memorize and apply the metal reactivity series in single displacement reactions',
      'Draw electron dot structures demonstrating ionic bond formation in NaCl and MgCl₂',
      'Explain physical properties of ionic compounds: high melting/boiling points, brittleness, electrical conduction only in molten/aqueous states'
    ],
    prerequisites: ['c-10-sci-chem-02'],
    mustKnowPoints: [
      'Reactivity series places highly electropositive metals (K, Na) at top and least reactive (Au, Pt) at bottom',
      'Metals above hydrogen displace hydrogen gas from dilute acids; metals below hydrogen (Cu, Ag, Au) do not',
      'Ionic bonds form when metals donate valence electrons to non-metals, creating electrostatic attraction between cations and anions',
      'Ionic compounds do not conduct electricity in solid state (ions locked in crystal lattice), but conduct freely in molten or aqueous state'
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: CARBON AND ITS COMPOUNDS
  // =========================================================================
  {
    id: 'c-10-sci-carb-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-carb-10',
    chapterTitle: 'Carbon and its Compounds',
    chapterAliases: ['ch-4-science', 'ch-carb-10'],
    title: 'Covalent Bonding, Tetravalency & Catenation of Carbon',
    description: 'Sharing of electron pairs to achieve noble gas configuration, single/double/triple covalent bonds (CH₄, O₂, N₂), why carbon forms covalent bonds (energy barriers of C⁴⁺ and C⁴⁻), catenation and tetravalency.',
    learningObjectives: [
      'Explain why carbon shares electrons instead of forming C⁴⁺ or C⁴⁻ ions',
      'Construct electron dot structures for methane, water, oxygen, and nitrogen',
      'Define catenation (self-linking ability of carbon into chains/rings) and tetravalency (4 valence electrons)'
    ],
    prerequisites: ['c-9-sci-atom-01'],
    dependentConcepts: ['c-10-sci-carb-02'],
    mustKnowPoints: [
      'Carbon has atomic number 6 (electronic configuration 2, 4); it cannot gain 4 electrons (too difficult for 6 protons to hold 10 electrons) nor lose 4 electrons (requires enormous ionization energy)',
      'Therefore, carbon attains stability exclusively by SHARING valence electrons, forming strong covalent bonds',
      'Catenation is the unique ability of carbon atoms to form strong covalent bonds with other carbon atoms into open chains, branches, or closed rings',
      'Carbon forms very strong, stable covalent bonds because its small atomic size allows the nucleus to hold shared electron pairs tightly'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-carb-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-carb-10',
    chapterTitle: 'Carbon and its Compounds',
    chapterAliases: ['ch-4-science', 'ch-carb-10'],
    title: 'Homologous Series, Functional Groups & IUPAC Nomenclature',
    description: 'Saturated (alkanes CnH2n+2) vs unsaturated hydrocarbons (alkenes CnH2n, alkynes CnH2n-2), functional groups (-OH, -CHO, >C=O, -COOH, -X), homologous series characteristics, and systematic naming.',
    learningObjectives: [
      'Differentiate saturated hydrocarbons (single bonds, burn with clean blue flame) and unsaturated hydrocarbons (double/triple bonds, yellow sooty flame)',
      'Define homologous series: successive members differ by -CH₂- unit and 14 u molecular mass',
      'Identify functional groups: alcohol (-OH), aldehyde (-CHO), ketone (>C=O), carboxylic acid (-COOH)',
      'Assign IUPAC names to simple carbon compounds'
    ],
    prerequisites: ['c-10-sci-carb-01'],
    mustKnowPoints: [
      'Homologous series is a family of organic compounds sharing the same functional group and general formula; adjacent members differ by -CH₂- and 14 atomic mass units',
      'Members of a homologous series exhibit identical chemical properties and a gradation in physical properties (melting/boiling points increase with mass)',
      'Alkanes general formula: CₙH₂ₙ₊₂; Alkenes: CₙH₂ₙ; Alkynes: CₙH₂ₙ₋₂',
      'Carboxylic acid group is -COOH (suffix -oic acid); Alcohol group is -OH (suffix -ol); Aldehyde group is -CHO (suffix -al)'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 SCIENCE: LIFE PROCESSES
  // =========================================================================
  {
    id: 'c-10-sci-life-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-life-10',
    chapterTitle: 'Life Processes',
    chapterAliases: ['ch-5-science', 'ch-life-10'],
    title: 'Photosynthesis & Stomatal Regulation in Autotrophs',
    description: 'Autotrophic nutrition, biochemical equation 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O, three key events of photosynthesis, role of chlorophyll, and guard cell turgor mechanism regulating stomatal pores.',
    learningObjectives: [
      'Write the balanced equation of photosynthesis',
      'Detail the 3 key events: light absorption by chlorophyll, water photolysis with energy conversion, and CO₂ reduction to carbohydrate',
      'Explain how stomatal pores open and close through osmotic water movement into guard cells'
    ],
    prerequisites: ['c-9-sci-cell-01'],
    dependentConcepts: ['c-10-sci-life-02'],
    mustKnowPoints: [
      'Photosynthesis equation: 6CO₂ + 6H₂O --sunlight/chlorophyll--> C₆H₁₂O₆ + 6O₂',
      'Three main steps: (1) Absorption of light energy by chlorophyll, (2) Conversion of light to chemical energy and splitting of water into hydrogen and oxygen, (3) Reduction of carbon dioxide to carbohydrates',
      'Desert plants take up CO₂ at night and prepare an intermediate compound, which is acted upon by chlorophyll during the daytime',
      'Guard cells swell when water flows into them, causing stomatal pore to open; they shrink and become flaccid when water leaves, closing the pore'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-life-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-life-10',
    chapterTitle: 'Life Processes',
    chapterAliases: ['ch-5-science', 'ch-life-10'],
    title: 'Aerobic vs Anaerobic Respiration & ATP Energy Currency',
    description: 'Breakdown of glucose in cytoplasm to pyruvate (glycolysis), aerobic respiration in mitochondria producing 38 ATP, anaerobic fermentation in yeast (ethanol + CO₂), and lactic acid build-up in muscle cells causing cramps.',
    learningObjectives: [
      'Map the 3 cellular pathways of glucose breakdown',
      'Distinguish aerobic (presence of O₂, high ATP yield) and anaerobic respiration (absence of O₂, low ATP yield)',
      'Explain muscle cramps caused by accumulation of lactic acid during vigorous exercise',
      'Explain ATP as the universal energy currency'
    ],
    prerequisites: ['c-10-sci-life-01'],
    mustKnowPoints: [
      'Glycolysis occurs in the cytoplasm: 6-carbon glucose is converted into two 3-carbon pyruvate molecules',
      'Pathway 1 (Mitochondria, Aerobic): Pyruvate + O₂ → CO₂ + H₂O + large energy (~38 ATP)',
      'Pathway 2 (Yeast, Anaerobic Fermentation): Pyruvate → Ethanol + CO₂ + 2 ATP',
      'Pathway 3 (Human muscle cells during strenuous exertion): Pyruvate → Lactic acid + 2 ATP (causes muscle fatigue/cramps)'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-sci-life-03',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Science',
    subjectId: 'sci-10',
    chapterId: 'ch-life-10',
    chapterTitle: 'Life Processes',
    chapterAliases: ['ch-5-science', 'ch-life-10'],
    title: 'Double Circulation in Humans & Four-Chambered Heart',
    description: 'Structure of the human heart (atria and ventricles), separation of oxygenated and deoxygenated blood, pulmonary circulation vs systemic circulation, valves preventing backflow, and blood pressure (120/80 mmHg).',
    learningObjectives: [
      'Trace blood flow through right atrium → right ventricle → lungs → left atrium → left ventricle → aorta',
      'Explain the adaptive advantage of complete chamber separation in warm-blooded mammals',
      'Define double circulation (pulmonary and systemic circuits)',
      'Differentiate arteries (thick-walled, high pressure, carry oxygenated blood except pulmonary artery) and veins (thin-walled, with valves)'
    ],
    prerequisites: ['c-10-sci-life-01'],
    mustKnowPoints: [
      'Human heart has 4 chambers (two atria, two ventricles) preventing mixing of oxygenated and deoxygenated blood to maintain high metabolic efficiency',
      'Double circulation means blood passes through the heart TWICE during each complete cardiac cycle: pulmonary circuit (heart-lungs-heart) and systemic circuit (heart-body-heart)',
      'Tricuspid and bicuspid (mitral) valves ensure strictly unidirectional blood flow and prevent backflow when ventricles contract',
      'Ventricles have much thicker muscular walls than atria because they have to pump blood to distant body organs under high pressure'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: REAL NUMBERS & POLYNOMIALS
  // =========================================================================
  {
    id: 'c-10-math-real-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-real-10',
    chapterTitle: 'Real Numbers',
    chapterAliases: ['ch-1-mathematics', 'ch-real-10'],
    title: 'Fundamental Theorem of Arithmetic & HCF/LCM',
    description: 'Every composite number can be expressed uniquely as a product of prime powers, relationship between HCF and LCM: HCF(a, b) × LCM(a, b) = a × b.',
    learningObjectives: [
      'State the Fundamental Theorem of Arithmetic',
      'Compute HCF and LCM of numbers using prime factorization',
      'Verify the product relation: HCF(a, b) × LCM(a, b) = a × b for two positive integers'
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-math-real-02', 'c-10-math-poly-01'],
    mustKnowPoints: [
      'Fundamental Theorem of Arithmetic: Every composite number can be uniquely expressed as a product of primes, irrespective of the order of prime factors',
      'HCF is the product of the smallest power of each common prime factor involved in the numbers',
      'LCM is the product of the greatest power of each prime factor involved in the numbers',
      'For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b (Only valid for two numbers, NOT for three!)'
    ],
    commonMisconceptions: [
      {
        misconception: 'Using HCF(a, b, c) × LCM(a, b, c) = a × b × c for three numbers.',
        correction: 'The identity HCF × LCM = Product only holds true for TWO numbers. For three numbers, a more complex inclusion-exclusion formula applies.'
      }
    ],
    difficulty: 'easy',
    status: 'verified'
  },
  {
    id: 'c-10-math-real-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-real-10',
    chapterTitle: 'Real Numbers',
    chapterAliases: ['ch-1-mathematics', 'ch-real-10'],
    title: 'Revisiting Irrational Numbers: Proving √2, √3, √5 Irrational',
    description: 'Proof by contradiction using the Fundamental Theorem of Arithmetic (if prime p divides a², then p divides a).',
    learningObjectives: [
      'Prove the theorem: If prime p divides a², then p divides a for positive integer a',
      'Execute proof by contradiction to establish irrationality of √2, √3, √5',
      'Prove expressions like 3 + 2√5 and 1/√2 are irrational'
    ],
    prerequisites: ['c-10-math-real-01'],
    mustKnowPoints: [
      'Proof by contradiction assumes the opposite: suppose √2 is rational, express as √2 = a/b where a and b are co-prime integers (HCF = 1)',
      'Squaring gives 2b² = a², proving 2 divides a², which implies 2 divides a',
      'Substitute a = 2c to show 2 divides b, contradicting that a and b are co-prime',
      'Therefore, the initial assumption is false and √2 must be irrational'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-math-poly-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-poly-10',
    chapterTitle: 'Polynomials',
    chapterAliases: ['ch-2-mathematics', 'ch-poly-10'],
    title: 'Zeroes of a Polynomial & Geometric Meaning',
    description: 'Geometric interpretation of zeroes as x-coordinates where graph y = p(x) intersects the x-axis, degree and maximum number of zeroes.',
    learningObjectives: [
      'Define zeroes of a polynomial algebraically: values of x where p(x) = 0',
      'Interpret zeroes graphically as intersections of y = p(x) with the x-axis',
      'Correlate polynomial degree n with maximum possible real zeroes (at most n)'
    ],
    prerequisites: ['c-10-math-real-01'],
    dependentConcepts: ['c-10-math-poly-02', 'c-10-math-quad-01'],
    mustKnowPoints: [
      'A real number k is a zero of polynomial p(x) if p(k) = 0',
      'The number of real zeroes of y = p(x) equals the number of times the curve touches or intersects the x-axis',
      'A linear polynomial ax + b has exactly one zero (-b/a); its graph is a straight line',
      'A quadratic polynomial ax² + bx + c has at most 2 real zeroes; its graph is a parabola (opening upwards if a > 0, downwards if a < 0)'
    ],
    difficulty: 'easy',
    status: 'verified'
  },
  {
    id: 'c-10-math-poly-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-poly-10',
    chapterTitle: 'Polynomials',
    chapterAliases: ['ch-2-mathematics', 'ch-poly-10'],
    title: 'Relationship Between Zeroes and Coefficients of a Quadratic Polynomial',
    description: 'Sum of zeroes α + β = -b/a, product of zeroes αβ = c/a, and constructing quadratic polynomials k[x² - (α+β)x + αβ].',
    learningObjectives: [
      'Verify relations: Sum of zeroes α + β = -(coefficient of x) / (coefficient of x²) = -b/a',
      'Verify relation: Product of zeroes αβ = (constant term) / (coefficient of x²) = c/a',
      'Form quadratic polynomials given the sum and product of zeroes'
    ],
    prerequisites: ['c-10-math-poly-01'],
    dependentConcepts: ['c-10-math-quad-01'],
    mustKnowPoints: [
      'For quadratic polynomial p(x) = ax² + bx + c with zeroes α and β:',
      'Sum of zeroes: α + β = -b / a',
      'Product of zeroes: α · β = c / a',
      'A quadratic polynomial with zeroes α and β can be constructed as: p(x) = k [x² - (α + β)x + αβ], where k is any non-zero real constant'
    ],
    commonMisconceptions: [
      {
        misconception: 'Forgetting the negative sign in sum of zeroes: writing α + β = b/a.',
        correction: 'Sum of zeroes is strictly NEGATIVE b over a: α + β = -b/a. Product is positive c over a: αβ = c/a.'
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: QUADRATIC EQUATIONS
  // =========================================================================
  {
    id: 'c-10-math-quad-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-quad-10',
    chapterTitle: 'Quadratic Equations',
    chapterAliases: ['ch-4-mathematics', 'ch-quad-10'],
    title: 'Discriminant & Nature of Roots (Shridharacharya Rule)',
    description: 'Standard quadratic form ax² + bx + c = 0, discriminant D = b² - 4ac, nature of roots (real/distinct, real/equal, no real roots), and the quadratic formula.',
    learningObjectives: [
      'Express quadratic equations in standard form ax² + bx + c = 0 (a ≠ 0)',
      'Calculate the discriminant D = b² - 4ac',
      'Determine the nature of roots based on D (D > 0, D = 0, D < 0)',
      'Apply the quadratic formula x = [-b ± √(b² - 4ac)] / 2a to solve equations'
    ],
    prerequisites: ['c-10-math-poly-01', 'c-10-math-poly-02'],
    dependentConcepts: [],
    mustKnowPoints: [
      'Standard form: ax² + bx + c = 0 with a ≠ 0',
      'Discriminant: D = b² - 4ac',
      'Case 1: If D > 0, the equation has two distinct real roots: x = (-b ± √D) / 2a',
      'Case 2: If D = 0, the equation has two equal (coincident) real roots: x = -b / 2a',
      'Case 3: If D < 0, the equation has NO real roots (imaginary conjugate roots)'
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: ARITHMETIC PROGRESSIONS
  // =========================================================================
  {
    id: 'c-10-math-ap-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-ap-10',
    chapterTitle: 'Arithmetic Progressions',
    chapterAliases: ['ch-5-mathematics', 'ch-ap-10'],
    title: 'nth Term of an Arithmetic Progression: an = a + (n-1)d',
    description: 'Definition of an AP, first term a, common difference d (positive, negative, or zero), general term formula an = a + (n-1)d, and finding terms from the end.',
    learningObjectives: [
      'Identify an AP by verifying that the common difference d = aₖ₊₁ - aₖ is constant',
      'Derive and apply the general term formula: an = a + (n - 1)d',
      'Find the nth term from the end of a finite AP: l - (n - 1)d'
    ],
    prerequisites: ['c-10-math-real-01'],
    dependentConcepts: ['c-10-math-ap-02'],
    mustKnowPoints: [
      'An AP is a sequence of numbers in which each term is obtained by adding a fixed constant d to the preceding term',
      'Formula for nth term: an = a + (n - 1)d, where a is first term and d is common difference',
      'Common difference d can be positive (increasing AP), negative (decreasing AP), or zero (constant AP)',
      'Three consecutive numbers in an AP can be conveniently taken as (a - d), a, (a + d)'
    ],
    difficulty: 'easy',
    status: 'verified'
  },
  {
    id: 'c-10-math-ap-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-ap-10',
    chapterTitle: 'Arithmetic Progressions',
    chapterAliases: ['ch-5-mathematics', 'ch-ap-10'],
    title: 'Sum of First n Terms of an AP: Sn = n/2 [2a + (n-1)d]',
    description: 'Gauss summation technique, formulas Sn = n/2 [2a + (n-1)d] and Sn = n/2 [a + l], and relationship between sum and general term (an = Sn - S_{n-1}).',
    learningObjectives: [
      'Derive Sn = n/2 [2a + (n - 1)d]',
      'Use the alternative formula Sn = n/2 [first term + last term] = n/2 [a + l]',
      'Deduce the nth term using an = Sn - S_{n-1}'
    ],
    prerequisites: ['c-10-math-ap-01'],
    mustKnowPoints: [
      'Sum formula: Sn = n/2 [2a + (n - 1)d]',
      'If first term a and last term l are known: Sn = n/2 [a + l]',
      'Sum of first n natural numbers is: Sn = n(n + 1) / 2',
      'The nth term is always equal to difference of sums: an = Sn - S_{n-1}'
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: TRIANGLES
  // =========================================================================
  {
    id: 'c-10-math-tri-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-tri-10',
    chapterTitle: 'Triangles',
    chapterAliases: ['ch-6-mathematics', 'ch-tri-10'],
    title: "Basic Proportionality Theorem (Thales' Theorem) & Converse",
    description: "If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, the other two sides are divided in the same ratio: AD/DB = AE/EC. Complete geometric area proof and converse.",
    learningObjectives: [
      "State and prove Thales' Theorem using area of triangles",
      "Apply Thales' Theorem corollaries: AD/AB = AE/AC and AB/DB = AC/EC",
      "State and apply the Converse of BPT"
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-math-tri-02'],
    mustKnowPoints: [
      "Thales' Theorem: In ΔABC, if line DE is parallel to BC (DE ∥ BC), then AD / DB = AE / EC",
      "Proof method: Construct altitudes EN ⊥ AB and DM ⊥ AC, and join BE and CD. Ratio of Area(ΔADE)/Area(ΔBDE) = AD/DB",
      "Converse of BPT: If a line divides any two sides of a triangle in the same ratio, the line must be parallel to the third side",
      "BPT applies in trapeziums and parallel projection geometries"
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS: INTRODUCTION TO TRIGONOMETRY
  // =========================================================================
  {
    id: 'c-10-math-trig-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-trig-10',
    chapterTitle: 'Introduction to Trigonometry',
    chapterAliases: ['ch-8-mathematics', 'ch-trig-10'],
    title: 'Trigonometric Ratios & Standard Angle Values',
    description: 'Definitions of sin θ, cos θ, tan θ, cosec θ, sec θ, cot θ in a right-angled triangle, reciprocal relationships, and exact values for 0°, 30°, 45°, 60°, 90°.',
    learningObjectives: [
      'Define sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj in right triangle',
      'Memorize the standard trigonometric table (sin 30° = 1/2, cos 30° = √3/2, tan 45° = 1)',
      'Explain why tan 90° and sec 90° are undefined'
    ],
    prerequisites: [],
    dependentConcepts: ['c-10-math-trig-02', 'c-11-phy-vec-01'],
    mustKnowPoints: [
      'In a right triangle with acute angle θ: sin θ = Opposite / Hypotenuse, cos θ = Adjacent / Hypotenuse, tan θ = Opposite / Adjacent',
      'Reciprocal relations: cosec θ = 1 / sin θ, sec θ = 1 / cos θ, cot θ = 1 / tan θ',
      'Quotient relations: tan θ = sin θ / cos θ and cot θ = cos θ / sin θ',
      'Values of sin θ increase monotonically from 0 to 1 as angle goes from 0° to 90°; cos θ decreases from 1 to 0'
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-10-math-trig-02',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 10,
    subject: 'Mathematics',
    subjectId: 'math-10',
    chapterId: 'ch-trig-10',
    chapterTitle: 'Introduction to Trigonometry',
    chapterAliases: ['ch-8-mathematics', 'ch-trig-10'],
    title: 'Fundamental Trigonometric Identities',
    description: 'Derivations of sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and 1 + cot²θ = cosec²θ using the Pythagorean theorem, and proving trigonometric identities.',
    learningObjectives: [
      'Derive sin²θ + cos²θ = 1 by dividing Pythagoras relation a² + b² = c² by hypotenuse c²',
      'Derive 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ',
      'Prove complex trigonometric identities by converting terms to sin θ and cos θ'
    ],
    prerequisites: ['c-10-math-trig-01'],
    mustKnowPoints: [
      'Identity 1: sin²θ + cos²θ = 1 (valid for 0° ≤ θ ≤ 90°)',
      'Identity 2: 1 + tan²θ = sec²θ (sec²θ - tan²θ = 1, valid for 0° ≤ θ < 90°)',
      'Identity 3: 1 + cot²θ = cosec²θ (cosec²θ - cot²θ = 1, valid for 0° < θ ≤ 90°)',
      'Standard proof tactic: Express all sec, cosec, tan, cot in terms of sin θ and cos θ and find common denominator'
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 11 PHYSICS: VECTORS & PROJECTILE MOTION (Classic Prerequisite Hierarchy Example)
  // =========================================================================
  {
    id: 'c-11-phy-vec-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 11,
    subject: 'Physics',
    subjectId: 'phy-11',
    chapterId: 'ch-motion-plane-11',
    chapterTitle: 'Motion in a Plane',
    chapterAliases: ['c11-phy-ch3', 'c11-phy-ch4', 'ch-motion-plane-11'],
    title: 'Vectors & Resolution into Orthogonal Components',
    description: 'Scalars vs vectors, vector addition (triangle and parallelogram law), resolving a vector into horizontal and vertical components (Ax = A cos θ, Ay = A sin θ).',
    learningObjectives: [
      'Differentiate scalars and vectors with magnitude and directional properties',
      'Apply parallelogram and triangle laws of vector addition',
      'Resolve any 2D vector into perpendicular Cartesian components: Ax = A cos θ, Ay = A sin θ',
      'Reconstruct vector magnitude |A| = √(Ax² + Ay²) and direction tan θ = Ay / Ax'
    ],
    prerequisites: ['c-9-sci-mot-01', 'c-10-math-trig-01'],
    dependentConcepts: ['c-11-phy-proj-01', 'c-11-phy-work-01', 'c-12-phy-elec-01'],
    mustKnowPoints: [
      'A vector has both magnitude and direction and obeys vector addition laws',
      'Horizontal component: Ax = A cos θ (where θ is angle made with horizontal axis)',
      'Vertical component: Ay = A sin θ',
      'Perpendicular components act independently of each other without interfering',
      'Resultant magnitude is |A| = √(Ax² + Ay²)'
    ],
    commonMisconceptions: [
      {
        misconception: 'Assuming the horizontal component is always cos θ and vertical is always sin θ regardless of where the angle is measured.',
        correction: 'The component adjacent to angle θ is ALWAYS A cos θ; the opposite component is A sin θ. If θ is measured with the vertical axis, vertical is cos θ!'
      }
    ],
    difficulty: 'medium',
    status: 'verified'
  },
  {
    id: 'c-11-phy-proj-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 11,
    subject: 'Physics',
    subjectId: 'phy-11',
    chapterId: 'ch-motion-plane-11',
    chapterTitle: 'Motion in a Plane',
    chapterAliases: ['c11-phy-ch3', 'c11-phy-ch4', 'ch-motion-plane-11'],
    title: 'Projectile Motion & Parabolic Trajectory',
    description: 'Two-dimensional motion under constant gravitational acceleration, independence of horizontal and vertical motions, time of flight, maximum height, and horizontal range.',
    learningObjectives: [
      'Analyze 2D projectile motion as two independent 1D motions (constant velocity horizontally, free fall vertically)',
      'Derive equation of parabolic path: y = (tan θ)x - [g / (2u² cos² θ)] x²',
      'Derive time of flight: T = (2u sin θ) / g',
      'Derive maximum height: H = (u² sin² θ) / 2g',
      'Derive horizontal range: R = (u² sin 2θ) / g and condition for maximum range (θ = 45°)'
    ],
    prerequisites: ['c-11-phy-vec-01', 'c-9-sci-mot-02', 'c-9-sci-grav-02'],
    dependentConcepts: [],
    mustKnowPoints: [
      'Horizontal velocity remains CONSTANT throughout flight because there is no horizontal acceleration (ax = 0): ux = u cos θ',
      'Vertical motion undergoes constant downward gravitational acceleration (ay = -g): uy = u sin θ - gt',
      'At the highest point of trajectory, vertical velocity is zero (vy = 0), but horizontal velocity is STILL u cos θ',
      'Time of flight: T = (2u sin θ) / g',
      'Maximum height: H = (u² sin² θ) / (2g)',
      'Horizontal range: R = (u² sin 2θ) / g; maximum range occurs at launch angle θ = 45°'
    ],
    commonMisconceptions: [
      {
        misconception: 'At the highest point of projectile path, the acceleration of the projectile is zero.',
        correction: 'Acceleration due to gravity g is strictly downwards and CONSTANT throughout the entire flight, even at the highest point! Only the vertical component of velocity vy is zero at peak.'
      },
      {
        misconception: 'Heavier projectiles land faster than lighter projectiles launched at the same angle and speed.',
        correction: 'In the absence of air resistance, mass does not enter any equation of motion. All projectiles follow the identical trajectory regardless of mass.'
      }
    ],
    difficulty: 'hard',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 11 PHYSICS: WORK, ENERGY AND POWER
  // =========================================================================
  {
    id: 'c-11-phy-work-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 11,
    subject: 'Physics',
    subjectId: 'phy-11',
    chapterId: 'ch-work-11',
    chapterTitle: 'Work, Energy and Power',
    chapterAliases: ['c11-phy-ch5', 'c11-phy-ch6', 'ch-work-11'],
    title: 'Work Done by Force & The Work-Energy Theorem',
    description: 'Scalar product definition of work W = F · d = F d cos θ, positive/negative/zero work, kinetic energy (K = 1/2 m v²), and proof of Work-Energy Theorem (W_net = ΔK).',
    learningObjectives: [
      'Calculate work done as scalar dot product W = F · d = F d cos θ',
      'Distinguish positive work (θ < 90°), negative work (θ > 90°, like friction), and zero work (θ = 90°, like centripetal force)',
      'Derive the Work-Energy Theorem: Total work done by all forces equals change in kinetic energy: W_net = 1/2 m v² - 1/2 m u²'
    ],
    prerequisites: ['c-11-phy-vec-01', 'c-9-sci-mot-02'],
    mustKnowPoints: [
      'Work is a scalar quantity defined as W = F · d = |F| |d| cos θ; unit is Joule (1 J = 1 N·m)',
      'No work is done when displacement is zero or when force is perpendicular to displacement (cos 90° = 0)',
      'Kinetic energy is the energy of motion: K = 1/2 m v²',
      'Work-Energy Theorem states that the net work done by all forces (conservative, non-conservative, external) on a particle equals the change in its kinetic energy: W_net = ΔK'
    ],
    difficulty: 'medium',
    status: 'verified'
  },

  // =========================================================================
  // CLASS 12 PHYSICS: ELECTROSTATICS & CURRENT ELECTRICITY
  // =========================================================================
  {
    id: 'c-12-phy-elec-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 12,
    subject: 'Physics',
    subjectId: 'phy-12',
    chapterId: 'ch-electro-12',
    chapterTitle: 'Electric Charges and Fields',
    chapterAliases: ['c12-phy-ch1', 'ch-electro-12'],
    title: "Coulomb's Law & Principle of Superposition",
    description: "Electrostatic force between stationary point charges: F = 1/(4πε₀) · (q1 q2)/r², vector formulation, dielectric constant, and superposition principle for multiple charges.",
    learningObjectives: [
      "State Coulomb's Law and its mathematical vector form",
      "Explain the permittivity of free space ε₀ = 8.854 × 10⁻¹² C²/(N·m²) and constant 1/(4πε₀) = 9 × 10⁹ N·m²/C²",
      "Apply the superposition principle to calculate net electrostatic force on a charge"
    ],
    prerequisites: ['c-10-sci-elec-01', 'c-11-phy-vec-01'],
    dependentConcepts: ['c-12-phy-curr-01'],
    mustKnowPoints: [
      "Coulomb's Law states electrostatic force between point charges is proportional to product of charges and inversely proportional to square of separation: F = k (q1 q2) / r²",
      "In vacuum: k = 1 / (4πε₀) ≈ 9 × 10⁹ N·m²/C²",
      "In a dielectric medium of relative permittivity ε_r: force is reduced by factor K: F_med = F_vac / K",
      "Principle of Superposition: Net force on any charge equals the vector sum of individual forces exerted by all other charges taken one at a time"
    ],
    difficulty: 'hard',
    status: 'verified'
  },
  {
    id: 'c-12-phy-curr-01',
    board: 'CBSE',
    academicYear: '2026-27',
    class: 12,
    subject: 'Physics',
    subjectId: 'phy-12',
    chapterId: 'ch-curr-12',
    chapterTitle: 'Current Electricity',
    chapterAliases: ['c12-phy-ch3', 'ch-curr-12'],
    title: "Kirchhoff's Laws & Wheatstone Bridge Principle",
    description: "Kirchhoff's First Law (Junction Rule based on charge conservation) and Second Law (Loop Rule based on energy conservation), balanced Wheatstone bridge condition (R1/R2 = R3/R4).",
    learningObjectives: [
      "State Kirchhoff's Junction Rule (KCL): Σ I = 0 at any electrical node, demonstrating conservation of charge",
      "State Kirchhoff's Loop Rule (KVL): Σ ΔV = 0 around any closed mesh, demonstrating conservation of energy",
      "Apply sign conventions for traversing resistors and EMF sources",
      "Derive the balanced Wheatstone bridge condition R1/R2 = R3/R4 using Kirchhoff's laws"
    ],
    prerequisites: ['c-10-sci-elec-03', 'c-10-sci-elec-04'],
    mustKnowPoints: [
      "Kirchhoff's First Law (KCL): Sum of currents entering a junction equals sum of currents leaving (Σ I_in = Σ I_out) — derived from conservation of charge",
      "Kirchhoff's Second Law (KVL): In any closed electrical loop, the algebraic sum of changes in potential is zero (Σ IR + Σ E = 0) — derived from conservation of energy",
      "Wheatstone Bridge is balanced when no current flows through galvanometer (Ig = 0), yielding condition R1 / R2 = R3 / R4",
      "Bridge sensitivity is highest when all four resistances are approximately equal in magnitude"
    ],
    difficulty: 'hard',
    status: 'verified'
  }
];

// Helper functions for curriculum access
export function getAllBoards() {
  return BOARDS;
}

export function getConceptsForChapter(chapterId, chapterTitle = '') {
  if (!chapterId) return [];
  const normalizedId = (chapterId || '').toLowerCase().trim();
  const normalizedTitle = (chapterTitle || '').toLowerCase().trim();

  const results = CONCEPTS_REPOSITORY.filter(c => {
    // 1. Exact match on chapterId
    if (c.chapterId && c.chapterId.toLowerCase() === normalizedId) return true;
    
    // 2. Match on aliases
    if (Array.isArray(c.chapterAliases) && c.chapterAliases.some(a => a.toLowerCase() === normalizedId)) return true;

    // 3. Normalized title match if title is provided
    if (normalizedTitle && c.chapterTitle && (
      normalizedTitle.includes(c.chapterTitle.toLowerCase()) || 
      c.chapterTitle.toLowerCase().includes(normalizedTitle)
    )) return true;

    // 4. Keyword heuristic on chapterId
    if (normalizedId.includes('elec') && c.chapterTitle?.toLowerCase().includes('electricity')) return true;
    if (normalizedId.includes('light') && c.chapterTitle?.toLowerCase().includes('light')) return true;
    if (normalizedId.includes('chem') && c.chapterTitle?.toLowerCase().includes('chemical')) return true;
    if (normalizedId.includes('acid') && c.chapterTitle?.toLowerCase().includes('acids')) return true;
    if (normalizedId.includes('metal') && c.chapterTitle?.toLowerCase().includes('metals')) return true;
    if (normalizedId.includes('carb') && c.chapterTitle?.toLowerCase().includes('carbon')) return true;
    if (normalizedId.includes('life') && c.chapterTitle?.toLowerCase().includes('life processes')) return true;
    if (normalizedId.includes('real') && c.chapterTitle?.toLowerCase().includes('real numbers')) return true;
    if (normalizedId.includes('poly') && c.chapterTitle?.toLowerCase().includes('polynomials')) return true;
    if (normalizedId.includes('quad') && c.chapterTitle?.toLowerCase().includes('quadratic')) return true;
    if (normalizedId.includes('ap') && c.chapterTitle?.toLowerCase().includes('arithmetic')) return true;
    if (normalizedId.includes('tri') && c.chapterTitle?.toLowerCase().includes('triangles')) return true;
    if (normalizedId.includes('trig') && c.chapterTitle?.toLowerCase().includes('trigonometry')) return true;
    if ((normalizedId.includes('motion') || normalizedId.includes('vec') || normalizedId.includes('plane')) && c.chapterTitle?.toLowerCase().includes('motion in a plane')) return true;
    if (normalizedId.includes('force') && c.chapterTitle?.toLowerCase().includes('force')) return true;
    if (normalizedId.includes('grav') && c.chapterTitle?.toLowerCase().includes('gravitation')) return true;
    if (normalizedId.includes('atom') && c.chapterTitle?.toLowerCase().includes('atoms')) return true;
    if (normalizedId.includes('cell') && c.chapterTitle?.toLowerCase().includes('unit of life')) return true;
    if (normalizedId.includes('work') && c.chapterTitle?.toLowerCase().includes('work, energy')) return true;

    return false;
  });

  return results;
}

export function getConceptById(conceptId) {
  return CONCEPTS_REPOSITORY.find(c => c.id === conceptId) || null;
}

export function getConceptsForSubject(classNum, subjectName) {
  const normSubj = (subjectName || '').toLowerCase();
  return CONCEPTS_REPOSITORY.filter(c => 
    c.class === Number(classNum) && 
    (c.subject.toLowerCase() === normSubj || c.subjectId.toLowerCase().includes(normSubj) || normSubj.includes(c.subject.toLowerCase()))
  );
}
