// GYAAN AI Senior Secondary Curriculum Library (Classes 11 & 12)
// Exhaustive, board-specific curriculum coverage for Physics, Mathematics, English, and Biology
// Official alignment: CBSE 2026–27, CISCE/ISC 2026–27, UPMSP Bilingual 2026–27

// =========================================================================
// 1. CBSE CLASS 11 CURRICULUM (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_11_PHYSICS = [
  {
    num: 1,
    titleEn: 'Units and Measurements',
    titleHi: 'मात्रक एवं मापन',
    duration: '45 min',
    oneShotId: null,
    unitName: 'Unit I: Physical World and Measurement',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'System of Units (SI Units & Base Quantities)', titleHi: 'मापन की प्रणालियाँ एवं मूल मात्रक', id: 'c11-phy-ch1-t1', dur: '15 min' },
      { part: 2, titleEn: 'Significant Figures and Error Analysis', titleHi: 'सार्थक अंक एवं त्रुटि विश्लेषण', id: 'c11-phy-ch1-t2', dur: '15 min' },
      { part: 3, titleEn: 'Dimensions of Physical Quantities & Dimensional Analysis', titleHi: 'विमीय विश्लेषण एवं इसके अनुप्रयोग', id: 'c11-phy-ch1-t3', dur: '15 min' }
    ],
    practicalActivity: {
      title: 'Measurement of Internal & External Diameter using Vernier Callipers',
      materials: ['Vernier callipers', 'Cylindrical calorimeter or beaker', 'Magnifying glass'],
      procedure: [
        'Determine the least count and zero error of the vernier callipers.',
        'Gently clamp the lower jaws across the outer surface of the cylinder to measure external diameter at three perpendicular positions.',
        'Insert the upper internal jaws into the rim of the cylinder to measure internal diameter.',
        'Calculate true readings after applying zero correction.'
      ],
      safety: 'Do not exert excessive pressure on the vernier thumb screw to avoid bending the jaws.',
      realWorldApplication: 'High-precision micromachining and quality control in aerospace component manufacturing.'
    },
    keyPoints: [
      'The 7 SI base units are metre, kilogram, second, ampere, kelvin, mole, and candela.',
      'Dimensional formula must balance on both sides of any physically valid equation (Principle of Homogeneity).',
      'Pure numerical constants and trigonometric functions are dimensionless.'
    ],
    formulas: [
      { name: 'Principle of Homogeneity', formula: '[LHS] = [RHS]', desc: 'Dimensions of each additive term must be identical' },
      { name: 'Vernier Least Count', formula: 'LC = 1 MSD - 1 VSD', desc: 'Smallest measurable value on the vernier scale' }
    ],
    solvedQuestions: [
      {
        q: 'Check the dimensional correctness of the relation v^2 = u^2 + 2as.',
        sol: '[v^2] = (LT^-1)^2 = L^2 T^-2. [u^2] = L^2 T^-2. [2as] = (LT^-2)(L) = L^2 T^-2. Since all terms have identical dimensions L^2 T^-2, the relation is dimensionally valid.'
      }
    ]
  },
  {
    num: 2,
    titleEn: 'Motion in a Straight Line',
    titleHi: 'सरल रेखा में गति',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit II: Kinematics',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Position, Path Length, Displacement & Frame of Reference', titleHi: 'स्थिति, पथ लंबाई व विस्थापन', id: 'c11-phy-ch2-t1', dur: '16 min' },
      { part: 2, titleEn: 'Average & Instantaneous Velocity, Acceleration', titleHi: 'औसत व तात्क्षणिक वेग, त्वरण', id: 'c11-phy-ch2-t2', dur: '16 min' },
      { part: 3, titleEn: 'Kinematic Equations of Motion by Calculus Method & Graphs', titleHi: 'कैलकुलस विधि द्वारा गति के समीकरण', id: 'c11-phy-ch2-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Determination of g using a Simple Pendulum',
      materials: ['Metallic spherical bob with hook', 'Cotton thread', 'Stopwatch', 'Split cork and clamp stand'],
      procedure: [
        'Measure length of pendulum from point of suspension to the centre of gravity of the bob.',
        'Displace bob by a small angle (< 5 degrees) and release without push.',
        'Measure the time taken for 20 complete oscillations using a digital stopwatch.',
        'Compute time period T and plot L vs T^2 to calculate acceleration due to gravity g = 4pi^2 (L/T^2).'
      ],
      safety: 'Avoid circular oscillations or drafts of air from fans.',
      realWorldApplication: 'Geophysical gravitational prospecting and inertial navigation pendulums.'
    },
    keyPoints: [
      'Displacement can be positive, negative, or zero; distance traveled is always non-negative.',
      'Slope of position-time graph gives velocity; slope of velocity-time graph gives acceleration.',
      'Area under velocity-time graph equals displacement.'
    ],
    formulas: [
      { name: 'Kinematic Equation 1', formula: 'v = u + a*t', desc: 'Velocity with constant acceleration' },
      { name: 'Kinematic Equation 2', formula: 's = u*t + (1/2)*a*t^2', desc: 'Displacement with constant acceleration' },
      { name: 'Kinematic Equation 3', formula: 'v^2 = u^2 + 2*a*s', desc: 'Velocity-displacement relation' }
    ],
    solvedQuestions: [
      {
        q: 'A ball dropped from a tower of height 45m reaches the ground. Find the time taken (g = 10 m/s^2).',
        sol: 'Using s = ut + (1/2)gt^2 with u = 0: 45 = 0 + (1/2)(10)t^2 => 5t^2 = 45 => t^2 = 9 => t = 3 seconds.'
      }
    ]
  },
  {
    num: 3,
    titleEn: 'Motion in a Plane',
    titleHi: 'समतल में गति',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit II: Kinematics',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Scalars and Vectors, Vector Addition & Resolution', titleHi: 'अदिश व सदिश, सदिशों का वियोजन', id: 'c11-phy-ch3-t1', dur: '16 min' },
      { part: 2, titleEn: 'Projectile Motion (Trajectory, Time of Flight, Range)', titleHi: 'प्रक्षेप्य गति (पथ, उड्डयन काल, परास)', id: 'c11-phy-ch3-t2', dur: '17 min' },
      { part: 3, titleEn: 'Uniform Circular Motion & Centripetal Acceleration', titleHi: 'एकसमान वृत्तीय गति व अभिकेंद्रीय त्वरण', id: 'c11-phy-ch3-t3', dur: '17 min' }
    ],
    keyPoints: [
      'Horizontal component of velocity (u cos θ) remains constant throughout projectile flight.',
      'Trajectory of a projectile launched in uniform gravity is a parabola.',
      'Maximum horizontal range occurs at launch angle θ = 45°.'
    ],
    formulas: [
      { name: 'Time of Flight', formula: 'T = (2*u*sin θ) / g', desc: 'Total time in air' },
      { name: 'Horizontal Range', formula: 'R = (u^2 * sin 2θ) / g', desc: 'Maximum horizontal distance' },
      { name: 'Centripetal Acceleration', formula: 'a_c = v^2 / r = ω^2 * r', desc: 'Radially inward acceleration' }
    ]
  },
  {
    num: 4,
    titleEn: 'Laws of Motion',
    titleHi: 'गति के नियम',
    duration: '52 min',
    oneShotId: null,
    unitName: 'Unit III: Laws of Motion',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Newton’s First & Second Laws of Motion, Momentum & Impulse', titleHi: 'न्यूटन के गति नियम, संवेग व आवेग', id: 'c11-phy-ch4-t1', dur: '17 min' },
      { part: 2, titleEn: 'Conservation of Linear Momentum & Rocket Propulsion', titleHi: 'रैखिक संवेग संरक्षण व रॉकेट नोदन', id: 'c11-phy-ch4-t2', dur: '17 min' },
      { part: 3, titleEn: 'Static and Kinetic Friction, Banking of Circular Roads', titleHi: 'घर्षण एवं सड़कों की बंकन (Banking)', id: 'c11-phy-ch4-t3', dur: '18 min' }
    ],
    formulas: [
      { name: 'Newton’s Second Law', formula: 'F = dp/dt = m*a', desc: 'Rate of change of momentum equals applied force' },
      { name: 'Maximum Safe Speed on Banked Road', formula: 'v_max = sqrt(r*g*(μ + tan θ)/(1 - μ*tan θ))', desc: 'Safety speed limit avoiding skidding' }
    ]
  },
  {
    num: 5,
    titleEn: 'Work, Energy and Power',
    titleHi: 'कार्य, ऊर्जा और शक्ति',
    duration: '46 min',
    oneShotId: null,
    unitName: 'Unit IV: Work, Energy and Power',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Work Done by Constant and Variable Forces, Work-Energy Theorem', titleHi: 'कार्य-ऊर्जा प्रमेय', id: 'c11-phy-ch5-t1', dur: '15 min' },
      { part: 2, titleEn: 'Conservative Forces & Potential Energy of a Spring', titleHi: 'संरक्षी बल व स्प्रिंग की स्थितिज ऊर्जा', id: 'c11-phy-ch5-t2', dur: '15 min' },
      { part: 3, titleEn: 'Elastic and Inelastic Collisions in One and Two Dimensions', titleHi: 'प्रत्यास्थ व अप्रत्यास्थ संघट्ट (Collisions)', id: 'c11-phy-ch5-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Work-Energy Theorem', formula: 'W_net = ΔK = (1/2)*m*v^2 - (1/2)*m*u^2', desc: 'Net work equals change in kinetic energy' },
      { name: 'Spring Potential Energy', formula: 'U = (1/2)*k*x^2', desc: 'Elastic energy stored in deformed spring' }
    ]
  },
  {
    num: 6,
    titleEn: 'System of Particles and Rotational Motion',
    titleHi: 'कणों के निकाय तथा घूर्णी गति',
    duration: '54 min',
    oneShotId: null,
    unitName: 'Unit V: Rotational Motion',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Centre of Mass of Two-Particle and Rigid Bodies', titleHi: 'द्रव्यमान केंद्र (Centre of Mass)', id: 'c11-phy-ch6-t1', dur: '18 min' },
      { part: 2, titleEn: 'Torque, Angular Momentum & Law of Conservation', titleHi: 'बल आघूर्ण एवं कोणीय संवेग संरक्षण', id: 'c11-phy-ch6-t2', dur: '18 min' },
      { part: 3, titleEn: 'Moment of Inertia, Radius of Gyration & Simple Geometries', titleHi: 'जड़त्व आघूर्ण (Moment of Inertia)', id: 'c11-phy-ch6-t3', dur: '18 min' }
    ],
    formulas: [
      { name: 'Torque Vector', formula: 'τ = r × F = I*α', desc: 'Rotational analog of linear force' },
      { name: 'Angular Momentum', formula: 'L = r × p = I*ω', desc: 'Rotational analog of linear momentum' }
    ]
  },
  {
    num: 7,
    titleEn: 'Gravitation',
    titleHi: 'गुरुत्वाकर्षण',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit VI: Gravitation',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Kepler’s Laws of Planetary Motion & Universal Law of Gravitation', titleHi: 'केप्लर के नियम व न्यूटन का गुरुत्वाकर्षण नियम', id: 'c11-phy-ch7-t1', dur: '16 min' },
      { part: 2, titleEn: 'Acceleration Due to Gravity (Variation with Altitude and Depth)', titleHi: 'गुरुत्वीय त्वरण (ऊंचाई व गहराई के साथ परिवर्तन)', id: 'c11-phy-ch7-t2', dur: '16 min' },
      { part: 3, titleEn: 'Gravitational Potential Energy, Escape Velocity & Orbital Velocity', titleHi: 'पलायन वेग व कक्षीय वेग', id: 'c11-phy-ch7-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Escape Velocity', formula: 'v_e = sqrt((2*G*M) / R) = sqrt(2*g*R)', desc: 'Speed to break free from gravitational field (11.2 km/s on Earth)' },
      { name: 'Orbital Speed', formula: 'v_o = sqrt((G*M) / R) = sqrt(g*R)', desc: 'Speed of satellite in close orbit' }
    ]
  },
  {
    num: 8,
    titleEn: 'Mechanical Properties of Solids',
    titleHi: 'ठोसों के यांत्रिक गुण',
    duration: '42 min',
    oneShotId: null,
    unitName: 'Unit VII: Properties of Bulk Matter',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Stress, Strain and Hooke’s Law', titleHi: 'प्रतिबल, विकृति एवं हुक का नियम', id: 'c11-phy-ch8-t1', dur: '14 min' },
      { part: 2, titleEn: 'Stress-Strain Curve & Elastic Moduli (Young, Shear, Bulk)', titleHi: 'यंग, अपरूपण व आयतन प्रत्यास्थता गुणांक', id: 'c11-phy-ch8-t2', dur: '14 min' },
      { part: 3, titleEn: 'Poisson’s Ratio & Elastic Potential Energy in Stretched Wire', titleHi: 'प्वासों अनुपात व प्रत्यास्थ स्थितिज ऊर्जा', id: 'c11-phy-ch8-t3', dur: '14 min' }
    ],
    formulas: [
      { name: 'Young’s Modulus', formula: 'Y = (F*L) / (A*ΔL)', desc: 'Ratio of tensile stress to longitudinal strain' },
      { name: 'Elastic Energy Density', formula: 'u = (1/2) * Stress * Strain', desc: 'Energy stored per unit volume' }
    ]
  },
  {
    num: 9,
    titleEn: 'Mechanical Properties of Fluids',
    titleHi: 'तरलों के यांत्रिक गुण',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit VII: Properties of Bulk Matter',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Pascal’s Law, Hydraulic Lift & Variation of Pressure with Depth', titleHi: 'पास्कल का नियम व हाइड्रोस्टेटिक दाब', id: 'c11-phy-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Viscosity, Stokes’ Law, Terminal Velocity & Streamline Flow', titleHi: 'श्यानता, स्टोक्स नियम व सीमांत वेग', id: 'c11-phy-ch9-t2', dur: '17 min' },
      { part: 3, titleEn: 'Bernoulli’s Principle, Surface Tension & Capillary Rise', titleHi: 'बरनौली प्रमेय व पृष्ठ तनाव', id: 'c11-phy-ch9-t3', dur: '17 min' }
    ],
    formulas: [
      { name: 'Bernoulli’s Equation', formula: 'P + (1/2)*ρ*v^2 + ρ*g*h = Constant', desc: 'Conservation of mechanical energy in ideal fluid flow' },
      { name: 'Stokes’ Law', formula: 'F_viscous = 6*π*η*r*v', desc: 'Viscous drag on spherical body in fluid' }
    ]
  },
  {
    num: 10,
    titleEn: 'Thermal Properties of Matter',
    titleHi: 'द्रव्य के तापीय गुण',
    duration: '46 min',
    oneShotId: null,
    unitName: 'Unit VII: Properties of Bulk Matter',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Temperature, Heat & Thermal Expansion (Anomalous Water Expansion)', titleHi: 'ताप, ऊष्मा एवं तापीय प्रसार', id: 'c11-phy-ch10-t1', dur: '15 min' },
      { part: 2, titleEn: 'Specific Heat Capacity, Calorimetry & Change of State', titleHi: 'विशिष्ट ऊष्मा धारिता व अवस्था परिवर्तन', id: 'c11-phy-ch10-t2', dur: '15 min' },
      { part: 3, titleEn: 'Heat Transfer (Conduction, Convection, Radiation & Stefan’s Law)', titleHi: 'ऊष्मा संचरण एवं स्टीफन का नियम', id: 'c11-phy-ch10-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Heat Transfer by Conduction', formula: 'dQ/dt = K*A*(T1 - T2) / L', desc: 'Rate of heat flow through solid slab' },
      { name: 'Stefan-Boltzmann Law', formula: 'E = σ*A*T^4', desc: 'Total radiant energy emitted by blackbody' }
    ]
  },
  {
    num: 11,
    titleEn: 'Thermodynamics',
    titleHi: 'ऊष्मागतिकी',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit VIII: Thermodynamics',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Thermal Equilibrium, Zeroth Law & First Law of Thermodynamics', titleHi: 'ऊष्मागतिकी का शून्यवाँ व प्रथम नियम', id: 'c11-phy-ch11-t1', dur: '16 min' },
      { part: 2, titleEn: 'Isothermal, Adiabatic, Isobaric & Isochoric Processes', titleHi: 'समतापी व रुद्धोष्म प्रक्रम', id: 'c11-phy-ch11-t2', dur: '16 min' },
      { part: 3, titleEn: 'Second Law of Thermodynamics (Reversible & Irreversible Processes)', titleHi: 'ऊष्मागतिकी का द्वितीय नियम', id: 'c11-phy-ch11-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'First Law of Thermodynamics', formula: 'ΔQ = ΔU + ΔW', desc: 'Conservation of energy in thermodynamic systems' },
      { name: 'Adiabatic Process Relation', formula: 'P * V^γ = Constant', desc: 'Equation of state during zero heat exchange' }
    ]
  },
  {
    num: 12,
    titleEn: 'Kinetic Theory of Gases',
    titleHi: 'अणुगति सिद्धांत',
    duration: '44 min',
    oneShotId: null,
    unitName: 'Unit IX: Kinetic Theory',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Equation of State of Perfect Gas & Kinetic Theory Postulates', titleHi: 'आदर्श गैस समीकरण व अभिगृहीत', id: 'c11-phy-ch12-t1', dur: '14 min' },
      { part: 2, titleEn: 'Pressure of Ideal Gas, RMS Speed & Kinetic Interpretation of Temperature', titleHi: 'गैस दाब व वर्ग माध्य मूल चाल (RMS)', id: 'c11-phy-ch12-t2', dur: '15 min' },
      { part: 3, titleEn: 'Degrees of Freedom, Law of Equipartition of Energy & Mean Free Path', titleHi: 'स्वतंत्रता की कोटि व माध्य मुक्त पथ', id: 'c11-phy-ch12-t3', dur: '15 min' }
    ],
    formulas: [
      { name: 'Ideal Gas Pressure', formula: 'P = (1/3)*ρ*v_rms^2', desc: 'Pressure from molecular momentum transfer' },
      { name: 'Mean Kinetic Energy per Molecule', formula: 'E_k = (3/2)*k_B*T', desc: 'Direct proportional relationship with absolute temperature' }
    ]
  },
  {
    num: 13,
    titleEn: 'Oscillations',
    titleHi: 'दोलन',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit X: Oscillations and Waves',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Periodic & Simple Harmonic Motion (SHM) Kinematics', titleHi: 'सरल आवर्त गति (SHM) की गतिकी', id: 'c11-phy-ch13-t1', dur: '16 min' },
      { part: 2, titleEn: 'Energy in SHM (Kinetic and Potential Energies)', titleHi: 'SHM में गतिज व स्थितिज ऊर्जा', id: 'c11-phy-ch13-t2', dur: '16 min' },
      { part: 3, titleEn: 'Oscillations of Loaded Spring & Simple Pendulum Derivation', titleHi: 'स्प्रिंग व सरल लोलक के दोलन', id: 'c11-phy-ch13-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Simple Pendulum Period', formula: 'T = 2*π * sqrt(L / g)', desc: 'Time period of small oscillations' },
      { name: 'Total Energy in SHM', formula: 'E_total = (1/2)*m*ω^2*A^2', desc: 'Constant sum of kinetic and potential energy' }
    ]
  },
  {
    num: 14,
    titleEn: 'Waves',
    titleHi: 'तरंगें',
    duration: '46 min',
    oneShotId: null,
    unitName: 'Unit X: Oscillations and Waves',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Transverse and Longitudinal Waves, Displacement Relation', titleHi: 'अनुप्रस्थ व अनुदैर्ध्य तरंगें', id: 'c11-phy-ch14-t1', dur: '15 min' },
      { part: 2, titleEn: 'Superposition Principle, Standing Waves in Strings & Organ Pipes', titleHi: 'अध्यारोपण सिद्धांत व अप्रगामी तरंगें', id: 'c11-phy-ch14-t2', dur: '15 min' },
      { part: 3, titleEn: 'Fundamental Harmonics & Acoustic Beats Phenomenon', titleHi: 'मूल स्वरक, संनादी एवं विस्पंद (Beats)', id: 'c11-phy-ch14-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Speed of Wave on Stretched String', formula: 'v = sqrt(T / μ)', desc: 'Tension T and mass per unit length μ' },
      { name: 'Beat Frequency', formula: 'f_beat = |f1 - f2|', desc: 'Periodic variation in loudness due to interference of two close frequencies' }
    ]
  }
];

// =========================================================================
// 2. CBSE CLASS 12 PHYSICS (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_12_PHYSICS = [
  {
    num: 1,
    titleEn: 'Electric Charges and Fields',
    titleHi: 'वैद्युत आवेश तथा क्षेत्र',
    duration: '50 min',
    unitName: 'Unit I: Electrostatics',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Electric Charge Quantization, Conservation & Coulomb’s Law', titleHi: 'आवेश संरक्षण व कूलॉम का नियम', id: 'c12-phy-ch1-t1', dur: '16 min' },
      { part: 2, titleEn: 'Electric Field Lines, Electric Dipole & Torque in Uniform Field', titleHi: 'विद्युत क्षेत्र रेखाएं व द्विध्रुव', id: 'c12-phy-ch1-t2', dur: '17 min' },
      { part: 3, titleEn: 'Electric Flux & Gauss’s Theorem Applications (Wire, Sheet, Shell)', titleHi: 'गॉस का नियम व इसके अनुप्रयोग', id: 'c12-phy-ch1-t3', dur: '17 min' }
    ],
    formulas: [
      { name: 'Coulomb’s Law', formula: 'F = (1 / (4*π*ε_0)) * (q1*q2 / r^2)', desc: 'Electrostatic force between point charges' },
      { name: 'Gauss’s Law', formula: '∮ E · dA = q_enclosed / ε_0', desc: 'Total electric flux through closed surface' }
    ]
  },
  {
    num: 2,
    titleEn: 'Electrostatic Potential and Capacitance',
    titleHi: 'स्थिरवैद्युत विभव तथा धारिता',
    duration: '48 min',
    unitName: 'Unit I: Electrostatics',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Electric Potential & Equipotential Surfaces', titleHi: 'वैद्युत विभव व समविभव पृष्ठ', id: 'c12-phy-ch2-t1', dur: '16 min' },
      { part: 2, titleEn: 'Dielectrics, Polarization & Parallel Plate Capacitor', titleHi: 'परावैद्युत व समानांतर पट्टिका संधारित्र', id: 'c12-phy-ch2-t2', dur: '16 min' },
      { part: 3, titleEn: 'Combination of Capacitors & Energy Stored in Capacitor', titleHi: 'संधारित्रों का संयोजन व संचित ऊर्जा', id: 'c12-phy-ch2-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Capacitance of Parallel Plate Capacitor', formula: 'C = (K * ε_0 * A) / d', desc: 'Capacitance with dielectric slab of constant K' },
      { name: 'Energy Stored in Capacitor', formula: 'U = (1/2)*C*V^2 = (1/2)*(Q^2 / C)', desc: 'Electrostatic field energy stored between plates' }
    ]
  },
  {
    num: 3,
    titleEn: 'Current Electricity',
    titleHi: 'विद्युत धारा',
    duration: '52 min',
    unitName: 'Unit II: Current Electricity',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Drift Velocity, Mobility & Microscopic Ohm’s Law', titleHi: 'अपवाह वेग, गतिशीलता व ओम का नियम', id: 'c12-phy-ch3-t1', dur: '17 min' },
      { part: 2, titleEn: 'Resistivity Temperature Dependence, Cells in Series & Parallel', titleHi: 'प्रतिरोधकता व सेलों का संयोजन', id: 'c12-phy-ch3-t2', dur: '17 min' },
      { part: 3, titleEn: 'Kirchhoff’s Rules & Wheatstone Bridge Principle', titleHi: 'किरचॉफ के नियम व व्हीटस्टोन सेतु', id: 'c12-phy-ch3-t3', dur: '18 min' }
    ],
    formulas: [
      { name: 'Drift Velocity', formula: 'v_d = (e * E * τ) / m', desc: 'Average velocity of conduction electrons under electric field' },
      { name: 'Wheatstone Balanced Bridge', formula: 'P / Q = R / S', desc: 'Condition for zero galvanometer current' }
    ]
  },
  {
    num: 4,
    titleEn: 'Moving Charges and Magnetism',
    titleHi: 'गतिमान आवेश और चुंबकत्व',
    duration: '50 min',
    unitName: 'Unit III: Magnetic Effects of Current',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Biot-Savart Law & Magnetic Field of Circular Current Loop', titleHi: 'बायो-सावर्ट नियम व वृत्ताकार लूप का क्षेत्र', id: 'c12-phy-ch4-t1', dur: '16 min' },
      { part: 2, titleEn: 'Ampere’s Circuital Law & Solenoid Magnetic Field', titleHi: 'एम्पीयर का नियम व परिनालिका', id: 'c12-phy-ch4-t2', dur: '17 min' },
      { part: 3, titleEn: 'Lorentz Force, Force Between Parallel Conductors & Galvanometer', titleHi: 'लॉरेंट्ज़ बल, समानांतर चालक व गैल्वेनोमीटर', id: 'c12-phy-ch4-t3', dur: '17 min' }
    ],
    formulas: [
      { name: 'Biot-Savart Law', formula: 'dB = (μ_0 / 4π) * (I * dl × r̂) / r^2', desc: 'Magnetic field element due to current element' },
      { name: 'Ampere Definition Force', formula: 'F / L = (μ_0 * I1 * I2) / (2π * d)', desc: 'Force per unit length between parallel currents' }
    ]
  },
  {
    num: 5,
    titleEn: 'Magnetism and Matter',
    titleHi: 'चुंबकत्व एवं द्रव्य',
    duration: '42 min',
    unitName: 'Unit III: Magnetic Effects of Current',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Bar Magnet as an Equivalent Solenoid & Magnetic Dipole Moment', titleHi: 'चुंबकीय द्विध्रुव व दंड चुंबक', id: 'c12-phy-ch5-t1', dur: '14 min' },
      { part: 2, titleEn: 'Gauss’s Law for Magnetism & Earth’s Magnetic Field Components', titleHi: 'चुंबकत्व में गॉस का नियम व भू-चुंबकत्व', id: 'c12-phy-ch5-t2', dur: '14 min' },
      { part: 3, titleEn: 'Classification of Magnetic Materials (Diamagnetic, Paramagnetic, Ferromagnetic)', titleHi: 'प्रति-, अनु- तथा लौहचुंबकीय पदार्थ', id: 'c12-phy-ch5-t3', dur: '14 min' }
    ],
    formulas: [
      { name: 'Gauss’s Law for Magnetism', formula: '∮ B · dA = 0', desc: 'Absence of isolated magnetic monopoles' },
      { name: 'Curie’s Law', formula: 'χ = C / T', desc: 'Paramagnetic susceptibility inversely proportional to temperature' }
    ]
  },
  {
    num: 6,
    titleEn: 'Electromagnetic Induction',
    titleHi: 'वैद्युतचुंबकीय प्रेरण',
    duration: '46 min',
    unitName: 'Unit IV: EMI and Alternating Currents',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Magnetic Flux & Faraday’s Experiments', titleHi: 'चुंबकीय फ्लक्स व फैराडे के प्रयोग', id: 'c12-phy-ch6-t1', dur: '15 min' },
      { part: 2, titleEn: 'Faraday’s Law of Induction & Lenz’s Law of Direction', titleHi: 'फैराडे का नियम व लेन्ज का नियम', id: 'c12-phy-ch6-t2', dur: '15 min' },
      { part: 3, titleEn: 'Self-Inductance, Mutual Inductance & AC Generator', titleHi: 'स्वप्रेरण, अन्योन्य प्रेरण व एसी जनरेटर', id: 'c12-phy-ch6-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'Faraday’s Law of EMI', formula: 'e = - dΦ_B / dt', desc: 'Induced electromotive force equals rate of change of magnetic flux' },
      { name: 'Self-Induced EMF', formula: 'e = - L * (dI / dt)', desc: 'Opposing EMF generated by changing current' }
    ]
  },
  {
    num: 7,
    titleEn: 'Alternating Current',
    titleHi: 'प्रत्यावर्ती धारा',
    duration: '48 min',
    unitName: 'Unit IV: EMI and Alternating Currents',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'AC Voltage Across R, L, and C & Phasor Diagrams', titleHi: 'आर, एल व सी परिपथ में एसी वोल्टता', id: 'c12-phy-ch7-t1', dur: '16 min' },
      { part: 2, titleEn: 'Series LCR Resonance, Quality Factor & Impedance', titleHi: 'श्रेणी एलसीआर अनुनाद व प्रतिबाधा', id: 'c12-phy-ch7-t2', dur: '16 min' },
      { part: 3, titleEn: 'Power in AC Circuits, Wattless Current & Transformer Efficiency', titleHi: 'एसी शक्ति, वाटहीन धारा व ट्रांसफॉर्मर', id: 'c12-phy-ch7-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'LCR Impedance', formula: 'Z = sqrt(R^2 + (X_L - X_C)^2)', desc: 'Total opposition to AC current flow' },
      { name: 'Resonant Frequency', formula: 'f_0 = 1 / (2*π*sqrt(L*C))', desc: 'Condition for maximum current and unity power factor' }
    ]
  },
  {
    num: 8,
    titleEn: 'Electromagnetic Waves',
    titleHi: 'वैद्युतचुंबकीय तरंगें',
    duration: '40 min',
    unitName: 'Unit V: Electromagnetic Waves',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Displacement Current & Maxwell’s Equations Invariance', titleHi: 'विस्थापन धारा व मैक्सवेल समीकरण', id: 'c12-phy-ch8-t1', dur: '13 min' },
      { part: 2, titleEn: 'Electromagnetic Wave Characteristics & Transverse Nature', titleHi: 'विद्युतचुंबकीय तरंगों के अभिलक्षण', id: 'c12-phy-ch8-t2', dur: '13 min' },
      { part: 3, titleEn: 'Electromagnetic Spectrum (Radio to Gamma) & Practical Applications', titleHi: 'विद्युतचुंबकीय स्पेक्ट्रम एवं उपयोग', id: 'c12-phy-ch8-t3', dur: '14 min' }
    ],
    formulas: [
      { name: 'Speed of EM Waves in Vacuum', formula: 'c = 1 / sqrt(μ_0 * ε_0) = E_0 / B_0', desc: 'Speed of light relating dielectric permittivity and magnetic permeability' }
    ]
  },
  {
    num: 9,
    titleEn: 'Ray Optics and Optical Instruments',
    titleHi: 'किरण प्रकाशिकी एवं प्रकाशिक यंत्र',
    duration: '54 min',
    unitName: 'Unit VI: Optics',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Refraction, Total Internal Reflection & Optical Fibres', titleHi: 'अपवर्तन, पूर्ण आंतरिक परावर्तन व प्रकाशीय तंतु', id: 'c12-phy-ch9-t1', dur: '18 min' },
      { part: 2, titleEn: 'Refraction at Spherical Surfaces, Lens Maker’s Formula & Lens Combination', titleHi: 'गोलीय पृष्ठों पर अपवर्तन व लेंस निर्माता सूत्र', id: 'c12-phy-ch9-t2', dur: '18 min' },
      { part: 3, titleEn: 'Refraction Through Prism, Compound Microscope & Astronomical Telescope', titleHi: 'प्रिज्म, सूक्ष्मदर्शी व खगोलीय दूरदर्शी', id: 'c12-phy-ch9-t3', dur: '18 min' }
    ],
    formulas: [
      { name: 'Lens Maker’s Formula', formula: '1/f = (n - 1) * (1/R1 - 1/R2)', desc: 'Focal length in terms of refractive index and radii of curvature' },
      { name: 'Compound Microscope Magnification', formula: 'm = -(L / f_o) * (1 + D / f_e)', desc: 'Magnifying power at least distance of distinct vision D' }
    ]
  },
  {
    num: 10,
    titleEn: 'Wave Optics',
    titleHi: 'तरंग प्रकाशिकी',
    duration: '48 min',
    unitName: 'Unit VI: Optics',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Huygens’ Principle & Proof of Laws of Reflection & Refraction', titleHi: 'हाइगेंस सिद्धांत व परावर्तन/अपवर्तन के नियम', id: 'c12-phy-ch10-t1', dur: '16 min' },
      { part: 2, titleEn: 'Interference of Light & Young’s Double Slit Experiment (YDSE)', titleHi: 'प्रकाश का व्यतिकरण व यंग का द्वि-स्लिट प्रयोग', id: 'c12-phy-ch10-t2', dur: '16 min' },
      { part: 3, titleEn: 'Diffraction at Single Slit & Central Maximum Angular Width', titleHi: 'एकल स्लिट विवर्तन व केंद्रीय उच्चिष्ठ', id: 'c12-phy-ch10-t3', dur: '16 min' }
    ],
    formulas: [
      { name: 'YDSE Fringe Width', formula: 'β = (λ * D) / d', desc: 'Separation between consecutive bright or dark fringes' },
      { name: 'Diffraction Central Maxima Width', formula: '2θ = (2 * λ) / a', desc: 'Angular spread of central diffraction peak' }
    ]
  },
  {
    num: 11,
    titleEn: 'Dual Nature of Radiation and Matter',
    titleHi: 'विकिरण तथा द्रव्य की द्वैत प्रकृति',
    duration: '44 min',
    unitName: 'Unit VII: Dual Nature',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Photoelectric Effect Experimental Observations', titleHi: 'प्रकाशवैद्युत प्रभाव के प्रायोगिक प्रेक्षण', id: 'c12-phy-ch11-t1', dur: '14 min' },
      { part: 2, titleEn: 'Einstein’s Photoelectric Equation & Photon Picture of Radiation', titleHi: 'आइंस्टीन का प्रकाशवैद्युत समीकरण', id: 'c12-phy-ch11-t2', dur: '15 min' },
      { part: 3, titleEn: 'de Broglie Wavelength & Matter Waves', titleHi: 'दे ब्रॉग्ली तरंगदैर्घ्य व द्रव्य तरंगें', id: 'c12-phy-ch11-t3', dur: '15 min' }
    ],
    formulas: [
      { name: 'Einstein’s Photoelectric Equation', formula: 'K_max = h*ν - Φ_0 = e*V_0', desc: 'Conservation of photon energy in electron emission' },
      { name: 'de Broglie Wavelength', formula: 'λ = h / p = h / (m*v) = h / sqrt(2*m*e*V)', desc: 'Wavelength associated with moving particle' }
    ]
  },
  {
    num: 12,
    titleEn: 'Atoms',
    titleHi: 'परमाणु',
    duration: '42 min',
    oneShotId: null,
    unitName: 'Unit VIII: Atoms and Nuclei',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Alpha-Particle Scattering Experiment & Rutherford Model', titleHi: 'अल्फा-कण प्रकीर्णन व रदरफोर्ड मॉडल', id: 'c12-phy-ch12-t1', dur: '14 min' },
      { part: 2, titleEn: 'Bohr’s Postulates for Hydrogen Atom (Radius & Energy of nth Orbit)', titleHi: 'बोहर मॉडल के अभिगृहीत व ऊर्जा स्तर', id: 'c12-phy-ch12-t2', dur: '14 min' },
      { part: 3, titleEn: 'Hydrogen Emission Spectra (Lyman, Balmer, Paschen, Brackett, Pfund)', titleHi: 'हाइड्रोजन का स्पेक्ट्रम', id: 'c12-phy-ch12-t3', dur: '14 min' }
    ],
    formulas: [
      { name: 'Bohr Orbit Energy', formula: 'E_n = -13.6 / n^2 eV', desc: 'Quantized energy levels of electron in hydrogen' },
      { name: 'Rydberg Formula', formula: '1/λ = R_H * (1/n1^2 - 1/n2^2)', desc: 'Wavelength of spectral emission lines' }
    ]
  },
  {
    num: 13,
    titleEn: 'Nuclei',
    titleHi: 'नाभिक',
    duration: '42 min',
    unitName: 'Unit VIII: Atoms and Nuclei',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Nuclear Composition, Size & Nuclear Forces', titleHi: 'नाभिक की संरचना, आकार व नाभिकीय बल', id: 'c12-phy-ch13-t1', dur: '14 min' },
      { part: 2, titleEn: 'Mass Defect, Einstein’s Mass-Energy Equivalence & Binding Energy per Nucleon', titleHi: 'द्रव्यमान क्षति व प्रति न्यूक्लियॉन बंधन ऊर्जा', id: 'c12-phy-ch13-t2', dur: '14 min' },
      { part: 3, titleEn: 'Nuclear Fission, Nuclear Fusion & Controlled Chain Reactions', titleHi: 'नाभिकीय विखंडन एवं संलयन', id: 'c12-phy-ch13-t3', dur: '14 min' }
    ],
    formulas: [
      { name: 'Mass-Energy Equivalence', formula: 'E = Δm * c^2', desc: 'Energy released in nuclear transformations' },
      { name: 'Nuclear Radius', formula: 'R = R_0 * A^(1/3)', desc: 'Empirical formula with R_0 ≈ 1.2 fm' }
    ]
  },
  {
    num: 14,
    titleEn: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
    titleHi: 'अर्धचालक इलेक्ट्रॉनिकी: पदार्थ, युक्तियाँ तथा सरल परिपथ',
    duration: '50 min',
    unitName: 'Unit IX: Electronic Devices',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Energy Bands, Intrinsic & Extrinsic Semiconductors (p-type & n-type)', titleHi: 'ऊर्जा बैंड, नैज व अपद्रव्यी अर्धचालक', id: 'c12-phy-ch14-t1', dur: '16 min' },
      { part: 2, titleEn: 'p-n Junction Diode Formation & Forward/Reverse V-I Characteristics', titleHi: 'p-n संधि डायोड व इसके अभिलक्षण', id: 'c12-phy-ch14-t2', dur: '17 min' },
      { part: 3, titleEn: 'Junction Diode as Half-Wave & Full-Wave Rectifier', titleHi: 'दिष्टकारी के रूप में डायोड (Rectifier)', id: 'c12-phy-ch14-t3', dur: '17 min' }
    ],
    formulas: [
      { name: 'Mass-Action Law', formula: 'n_e * n_h = n_i^2', desc: 'Electron and hole concentration product in equilibrium' },
      { name: 'Full-Wave Rectifier Ripple Frequency', formula: 'f_out = 2 * f_in', desc: 'Output ripple frequency equals twice line frequency' }
    ]
  }
];

// =========================================================================
// 3. CBSE CLASS 11 MATHEMATICS (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_11_MATHEMATICS = [
  {
    num: 1,
    titleEn: 'Sets',
    titleHi: 'समुच्चय',
    duration: '45 min',
    unitName: 'Unit I: Sets and Functions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Representation of Sets, Empty, Finite & Equal Sets', titleHi: 'समुच्चय निरूपण, रिक्त व परिमित समुच्चय', id: 'c11-math-ch1-t1', dur: '15 min' },
      { part: 2, titleEn: 'Subsets, Power Set & Universal Set', titleHi: 'उपसमुच्चय, घात समुच्चय व सार्वत्रिक समुच्चय', id: 'c11-math-ch1-t2', dur: '15 min' },
      { part: 3, titleEn: 'Venn Diagrams, Set Operations (Union, Intersection, Complement)', titleHi: 'वेन आरेख, सम्मिलन व सर्वनिष्ठ', id: 'c11-math-ch1-t3', dur: '15 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'Relations and Functions',
    titleHi: 'संबंध एवं फलन',
    duration: '48 min',
    unitName: 'Unit I: Sets and Functions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Cartesian Product of Sets & Number of Elements', titleHi: 'कार्तीय गुणन', id: 'c11-math-ch2-t1', dur: '16 min' },
      { part: 2, titleEn: 'Relations (Domain, Codomain, Range)', titleHi: 'संबंध (प्रांत, सहप्रांत, परिसर)', id: 'c11-math-ch2-t2', dur: '16 min' },
      { part: 3, titleEn: 'Functions & Real-Valued Function Graphs (Modulus, Signum, Greatest Integer)', titleHi: 'फलन व विशेष फलन आलेख', id: 'c11-math-ch2-t3', dur: '16 min' }
    ]
  },
  {
    num: 3,
    titleEn: 'Trigonometric Functions',
    titleHi: 'त्रिकोणमितीय फलन',
    duration: '54 min',
    unitName: 'Unit I: Sets and Functions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Angles in Radians & Degrees, Sign of Functions', titleHi: 'रेडियन व अंश मापन, चिन्ह नियम', id: 'c11-math-ch3-t1', dur: '18 min' },
      { part: 2, titleEn: 'Compound Angle Formulas & Transformations', titleHi: 'संयुक्त कोण सूत्र', id: 'c11-math-ch3-t2', dur: '18 min' },
      { part: 3, titleEn: 'Multiple and Submultiple Angle Identities', titleHi: 'अपवर्त्य एवं अपवर्तक कोण सर्वसमिकाएं', id: 'c11-math-ch3-t3', dur: '18 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Complex Numbers and Quadratic Equations',
    titleHi: 'सम्मिश्र संख्याएं और द्विघात समीकरण',
    duration: '46 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Need for Complex Numbers, Imaginary Unit i & Algebraic Operations', titleHi: 'काल्पनिक इकाई i व बीजगणितीय संक्रियाएं', id: 'c11-math-ch4-t1', dur: '15 min' },
      { part: 2, titleEn: 'Modulus and Conjugate of Complex Numbers', titleHi: 'मापांक एवं संयुग्मी', id: 'c11-math-ch4-t2', dur: '15 min' },
      { part: 3, titleEn: 'Argand Plane Representation & Quadratic Solutions in Complex Domain', titleHi: 'आर्गांड तल व द्विघात समीकरण हल', id: 'c11-math-ch4-t3', dur: '16 min' }
    ]
  },
  {
    num: 5,
    titleEn: 'Linear Inequalities',
    titleHi: 'रैखिक असमिकाएं',
    duration: '40 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Linear Inequalities in One Variable & Algebraic Solutions', titleHi: 'एक चर वाली रैखिक असमिकाएं', id: 'c11-math-ch5-t1', dur: '20 min' },
      { part: 2, titleEn: 'Graphical Solution of System of Linear Inequalities on Number Line', titleHi: 'संख्या रेखा पर आलेखीय हल', id: 'c11-math-ch5-t2', dur: '20 min' }
    ]
  },
  {
    num: 6,
    titleEn: 'Permutations and Combinations',
    titleHi: 'क्रमचय और संचय',
    duration: '50 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Fundamental Principle of Counting (Multiplication & Addition Rules)', titleHi: 'गणना का आधारभूत सिद्धांत', id: 'c11-math-ch6-t1', dur: '16 min' },
      { part: 2, titleEn: 'Factorial Notation & Permutations (nPr)', titleHi: 'क्रमगुणित n! व क्रमचय सूत्र', id: 'c11-math-ch6-t2', dur: '17 min' },
      { part: 3, titleEn: 'Combinations (nCr) & Combinatorial Problem Solving', titleHi: 'संचय nCr व अनुप्रयोग', id: 'c11-math-ch6-t3', dur: '17 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Binomial Theorem',
    titleHi: 'द्विपद प्रमेय',
    duration: '44 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Statement and Proof of Binomial Theorem for Positive Integral Indices', titleHi: 'धनात्मक पूर्णांक हेतु द्विपद प्रमेय', id: 'c11-math-ch7-t1', dur: '22 min' },
      { part: 2, titleEn: 'General and Middle Terms in Binomial Expansions', titleHi: 'व्यापक एवं मध्य पद', id: 'c11-math-ch7-t2', dur: '22 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Sequences and Series',
    titleHi: 'अनुक्रम तथा श्रेणी',
    duration: '46 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Arithmetic Progression (AP) Recall & nth Term', titleHi: 'समानांतर श्रेणी (AP)', id: 'c11-math-ch8-t1', dur: '15 min' },
      { part: 2, titleEn: 'Geometric Progression (GP), nth Term & Sum of n Terms', titleHi: 'गुणोत्तर श्रेणी (GP) व पदों का योग', id: 'c11-math-ch8-t2', dur: '15 min' },
      { part: 3, titleEn: 'Infinite GP, Geometric Mean (GM) & Relation Between AM and GM', titleHi: 'अनंत GP, गुणोत्तर माध्य व AM-GM संबंध', id: 'c11-math-ch8-t3', dur: '16 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Straight Lines',
    titleHi: 'सरल रेखाएं',
    duration: '50 min',
    unitName: 'Unit III: Coordinate Geometry',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Slope of a Line & Angle Between Two Lines', titleHi: 'रेखा की ढाल व दो रेखाओं के बीच कोण', id: 'c11-math-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Various Forms of Equations of a Line (Point-Slope, Intercept, Normal)', titleHi: 'रेखा के विभिन्न रूप के समीकरण', id: 'c11-math-ch9-t2', dur: '17 min' },
      { part: 3, titleEn: 'Perpendicular Distance of a Point from a Line', titleHi: 'बिंदु से रेखा की लंबवत दूरी', id: 'c11-math-ch9-t3', dur: '17 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Conic Sections',
    titleHi: 'शंकु परिच्छेद',
    duration: '52 min',
    unitName: 'Unit III: Coordinate Geometry',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Circle: Standard Equation & General Form', titleHi: 'वृत्त: मानक एवं सामान्य समीकरण', id: 'c11-math-ch10-t1', dur: '17 min' },
      { part: 2, titleEn: 'Parabola: Directrix, Focus & Standard Forms (y^2 = 4ax)', titleHi: 'परवलय: नियता, नाभि व मानक रूप', id: 'c11-math-ch10-t2', dur: '17 min' },
      { part: 3, titleEn: 'Ellipse and Hyperbola: Equations, Eccentricity & Latus Rectum', titleHi: 'दीर्घवृत्त एवं अतिपरवलय', id: 'c11-math-ch10-t3', dur: '18 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Introduction to Three-Dimensional Geometry',
    titleHi: 'त्रिविमीय ज्यामिति का परिचय',
    duration: '40 min',
    unitName: 'Unit III: Coordinate Geometry',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Coordinate Axes, Coordinate Planes & Coordinates of a Point in 3D', titleHi: 'त्रिविमीय निर्देशांक अक्ष व तल', id: 'c11-math-ch11-t1', dur: '20 min' },
      { part: 2, titleEn: 'Distance Formula and Section Formula in Three Dimensions', titleHi: 'दूरी सूत्र एवं विभाजन सूत्र', id: 'c11-math-ch11-t2', dur: '20 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Limits and Derivatives',
    titleHi: 'सीमा और अवकलज',
    duration: '52 min',
    unitName: 'Unit IV: Calculus',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Intuitive Idea of Limit, Left & Right Hand Limits', titleHi: 'सीमा की संकल्पना व अस्तित्व', id: 'c11-math-ch12-t1', dur: '17 min' },
      { part: 2, titleEn: 'Limits of Polynomial, Rational and Trigonometric Functions', titleHi: 'बीजगणितीय व त्रिकोणमितीय सीमाओं का मूल्यांकन', id: 'c11-math-ch12-t2', dur: '17 min' },
      { part: 3, titleEn: 'Derivative as Rate of Change & Product/Quotient Differentiation Rules', titleHi: 'अवकलज व गुणन/भागफल नियम', id: 'c11-math-ch12-t3', dur: '18 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Statistics',
    titleHi: 'सांख्यिकी',
    duration: '44 min',
    unitName: 'Unit V: Statistics and Probability',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Measures of Dispersion: Range and Mean Deviation', titleHi: 'प्रकीर्णन के माप: परिसर व माध्य विचलन', id: 'c11-math-ch13-t1', dur: '22 min' },
      { part: 2, titleEn: 'Variance and Standard Deviation for Ungrouped and Grouped Data', titleHi: 'प्रसरण एवं मानक विचलन', id: 'c11-math-ch13-t2', dur: '22 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Probability',
    titleHi: 'प्रायिकता',
    duration: '44 min',
    unitName: 'Unit V: Statistics and Probability',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Random Experiments, Sample Spaces and Events', titleHi: 'यादृच्छिक प्रयोग व प्रतिदर्श समष्टि', id: 'c11-math-ch14-t1', dur: '22 min' },
      { part: 2, titleEn: 'Axiomatic Probability, Addition Theorem & Mutually Exclusive Events', titleHi: 'अभिगृहीतीय प्रायिकता व योग प्रमेय', id: 'c11-math-ch14-t2', dur: '22 min' }
    ]
  }
];

// =========================================================================
// 4. CBSE CLASS 12 MATHEMATICS (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_12_MATHEMATICS = [
  {
    num: 1,
    titleEn: 'Relations and Functions',
    titleHi: 'संबंध एवं फलन',
    duration: '46 min',
    unitName: 'Unit I: Relations and Functions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Types of Relations: Reflexive, Symmetric, Transitive & Equivalence', titleHi: 'संबंधों के प्रकार: स्वतुल्य, सममित, संक्रामक व तुल्यता संबंध', id: 'c12-math-ch1-t1', dur: '23 min' },
      { part: 2, titleEn: 'Types of Functions: One-One (Injective), Onto (Surjective) & Bijective', titleHi: 'फलनों के प्रकार: एकैकी व आच्छादक फलन', id: 'c12-math-ch1-t2', dur: '23 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'Inverse Trigonometric Functions',
    titleHi: 'प्रतिलोम त्रिकोणमितीय फलन',
    duration: '44 min',
    unitName: 'Unit I: Relations and Functions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Definition, Range, Domain & Principal Value Branches', titleHi: 'परिभाषा, परिसर, प्रांत व मुख्य मान शाखाएं', id: 'c12-math-ch2-t1', dur: '22 min' },
      { part: 2, titleEn: 'Graphs and Elementary Properties of Inverse Trigonometric Functions', titleHi: 'प्रतिलोम त्रिकोणमितीय फलनों के आलेख व गुणधर्म', id: 'c12-math-ch2-t2', dur: '22 min' }
    ]
  },
  {
    num: 3,
    titleEn: 'Matrices',
    titleHi: 'आव्यूह',
    duration: '48 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Matrix Concepts, Order, Equality & Types of Matrices', titleHi: 'आव्यूह की कोटि व प्रकार', id: 'c12-math-ch3-t1', dur: '16 min' },
      { part: 2, titleEn: 'Matrix Operations (Addition, Scalar Multiplication, Multiplication)', titleHi: 'आव्यूह संक्रियाएं (योग व गुणन)', id: 'c12-math-ch3-t2', dur: '16 min' },
      { part: 3, titleEn: 'Transpose, Symmetric & Skew-Symmetric Matrices, Invertible Matrices', titleHi: 'परिवर्त, सममित व विषम-सममित आव्यूह', id: 'c12-math-ch3-t3', dur: '16 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Determinants',
    titleHi: 'सारणिक',
    duration: '50 min',
    unitName: 'Unit II: Algebra',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Determinant of 2x2 and 3x3 Matrices, Minors and Cofactors', titleHi: 'सारणिक, उपसारणिक एवं सहखंड', id: 'c12-math-ch4-t1', dur: '16 min' },
      { part: 2, titleEn: 'Adjoint and Inverse of a Square Matrix', titleHi: 'आव्यूह का सहखंडज व व्युत्क्रम', id: 'c12-math-ch4-t2', dur: '17 min' },
      { part: 3, titleEn: 'Solving System of Linear Equations using Matrix Inversion', titleHi: 'आव्यूह विधि द्वारा रैखिक समीकरण निकाय का हल', id: 'c12-math-ch4-t3', dur: '17 min' }
    ]
  },
  {
    num: 5,
    titleEn: 'Continuity and Differentiability',
    titleHi: 'सांतत्य तथा अवकलनीयता',
    duration: '54 min',
    unitName: 'Unit III: Calculus',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Continuity at a Point and on an Interval', titleHi: 'फलन की सांतत्यता', id: 'c12-math-ch5-t1', dur: '18 min' },
      { part: 2, titleEn: 'Differentiability, Chain Rule & Implicit Functions', titleHi: 'श्रृंखला नियम व अस्पष्ट फलन', id: 'c12-math-ch5-t2', dur: '18 min' },
      { part: 3, titleEn: 'Logarithmic Differentiation, Parametric Forms & Second-Order Derivatives', titleHi: 'लघुगणकीय अवकलन व द्वितीय कोटि अवकलज', id: 'c12-math-ch5-t3', dur: '18 min' }
    ]
  },
  {
    num: 6,
    titleEn: 'Applications of Derivatives',
    titleHi: 'अवकलज के अनुप्रयोग',
    duration: '50 min',
    unitName: 'Unit III: Calculus',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Rate of Change of Quantities', titleHi: 'राशियों के परिवर्तन की दर', id: 'c12-math-ch6-t1', dur: '16 min' },
      { part: 2, titleEn: 'Increasing and Decreasing Functions (First Derivative Test)', titleHi: 'वर्धमान एवं ह्रासमान फलन', id: 'c12-math-ch6-t2', dur: '17 min' },
      { part: 3, titleEn: 'Maxima and Minima (First and Second Derivative Tests & Optimization)', titleHi: 'उच्चिष्ठ एवं निम्निष्ठ (Maxima & Minima)', id: 'c12-math-ch6-t3', dur: '17 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Integrals',
    titleHi: 'समाकलन',
    duration: '56 min',
    unitName: 'Unit III: Calculus',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Indefinite Integrals & Integration by Substitution', titleHi: 'प्रतिस्थापन द्वारा समाकलन', id: 'c12-math-ch7-t1', dur: '18 min' },
      { part: 2, titleEn: 'Integration by Partial Fractions and Integration by Parts', titleHi: 'आंशिक भिन्न व खंडशः समाकलन (By Parts)', id: 'c12-math-ch7-t2', dur: '19 min' },
      { part: 3, titleEn: 'Definite Integrals & Fundamental Properties of Definite Integrals', titleHi: 'निश्चित समाकलन एवं इसके प्रगुण', id: 'c12-math-ch7-t3', dur: '19 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Applications of the Integrals',
    titleHi: 'समाकलनों के अनुप्रयोग',
    duration: '44 min',
    unitName: 'Unit III: Calculus',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Area Under Simple Curves (Lines, Circles, Parabolas in Standard Form)', titleHi: 'साधारण वक्रों के अंतर्गत क्षेत्रफल', id: 'c12-math-ch8-t1', dur: '22 min' },
      { part: 2, titleEn: 'Area Bounded by a Curve and a Line', titleHi: 'वक्र एवं रेखा से घिरे क्षेत्र का क्षेत्रफल', id: 'c12-math-ch8-t2', dur: '22 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Differential Equations',
    titleHi: 'अवकल समीकरण',
    duration: '48 min',
    unitName: 'Unit III: Calculus',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Order and Degree of Differential Equations & General Solutions', titleHi: 'कोटि एवं घात, व्यापक हल', id: 'c12-math-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Method of Separation of Variables', titleHi: 'पृथक्करणीय चर विधि', id: 'c12-math-ch9-t2', dur: '16 min' },
      { part: 3, titleEn: 'Homogeneous Differential Equations & Linear First-Order Equations (dy/dx + Py = Q)', titleHi: 'समघातीय एवं रैखिक अवकल समीकरण', id: 'c12-math-ch9-t3', dur: '16 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Vector Algebra',
    titleHi: 'सदिश बीजगणित',
    duration: '46 min',
    unitName: 'Unit IV: Vectors and 3D Geometry',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Vectors, Direction Cosines, Position Vectors & Vector Addition', titleHi: 'दिक्-कोसाइन व सदिश योग', id: 'c12-math-ch10-t1', dur: '15 min' },
      { part: 2, titleEn: 'Scalar (Dot) Product of Vectors & Geometric Projection', titleHi: 'अदिश (डॉट) गुणनफल', id: 'c12-math-ch10-t2', dur: '15 min' },
      { part: 3, titleEn: 'Vector (Cross) Product of Vectors & Area of Triangle/Parallelogram', titleHi: 'सदिश (क्रॉस) गुणनफल', id: 'c12-math-ch10-t3', dur: '16 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Three-Dimensional Geometry',
    titleHi: 'त्रिविमीय ज्यामिति',
    duration: '48 min',
    unitName: 'Unit IV: Vectors and 3D Geometry',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Direction Cosines & Direction Ratios of a Line Joining Two Points', titleHi: 'रेखा के दिक्-कोसाइन व दिक्-अनुपात', id: 'c12-math-ch11-t1', dur: '16 min' },
      { part: 2, titleEn: 'Vector and Cartesian Equation of a Line in Space', titleHi: 'रेखा का सदिश व कार्तीय समीकरण', id: 'c12-math-ch11-t2', dur: '16 min' },
      { part: 3, titleEn: 'Angle Between Two Lines & Shortest Distance Between Skew Lines', titleHi: 'विषमतलीय रेखाओं के बीच न्यूनतम दूरी', id: 'c12-math-ch11-t3', dur: '16 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Linear Programming',
    titleHi: 'रैखिक प्रोग्रामन',
    duration: '40 min',
    unitName: 'Unit V: Linear Programming',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Formulation of Linear Programming Problems (Objective Function, Constraints)', titleHi: 'रैखिक प्रोग्रामन समस्या का सूत्रीकरण', id: 'c12-math-ch12-t1', dur: '20 min' },
      { part: 2, titleEn: 'Graphical Method of Solution, Feasible Region & Corner Point Method', titleHi: 'आलेखीय विधि, सुसंगत क्षेत्र व कोनीय बिंदु विधि', id: 'c12-math-ch12-t2', dur: '20 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Probability',
    titleHi: 'प्रायिकता',
    duration: '48 min',
    unitName: 'Unit VI: Probability',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Conditional Probability & Multiplication Theorem on Probability', titleHi: 'सप्रतिबंध प्रायिकता व गुणन नियम', id: 'c12-math-ch13-t1', dur: '16 min' },
      { part: 2, titleEn: 'Independent Events & Theorem of Total Probability', titleHi: 'स्वतंत्र घटनाएं व संपूर्ण प्रायिकता प्रमेय', id: 'c12-math-ch13-t2', dur: '16 min' },
      { part: 3, titleEn: 'Bayes’ Theorem and Its Applications', titleHi: 'बेज प्रमेय (Bayes’ Theorem) व अनुप्रयोग', id: 'c12-math-ch13-t3', dur: '16 min' }
    ]
  }
];

// =========================================================================
// 5. CBSE CLASS 11 BIOLOGY (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_11_BIOLOGY = [
  {
    num: 1,
    titleEn: 'The Living World',
    titleHi: 'जीव जगत',
    duration: '40 min',
    unitName: 'Unit I: Diversity of Living Organisms',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Characteristics of Living Organisms & What is Living?', titleHi: 'सजीवों के लक्षण एवं सजीव क्या है?', id: 'c11-bio-ch1-t1', dur: '13 min' },
      { part: 2, titleEn: 'Binomial Nomenclature & Rules of Taxonomy', titleHi: 'द्विपद नामकरण एवं वर्गिकी के नियम', id: 'c11-bio-ch1-t2', dur: '13 min' },
      { part: 3, titleEn: 'Taxonomic Categories (Species to Kingdom Hierarchy)', titleHi: 'वर्गिकी संवर्ग (जाति से जगत तक)', id: 'c11-bio-ch1-t3', dur: '14 min' }
    ],
    practicalActivity: {
      title: 'Study of Parts of a Compound Microscope',
      materials: ['Compound microscope', 'Lens paper', 'Prepared slide of onion peel'],
      procedure: ['Identify ocular lens, objective lenses, stage, and condenser.', 'Adjust coarse and fine adjustment knobs to focus slide under 10x and 40x magnification.'],
      safety: 'Handle glass slides and optical components with care.'
    },
    keyPoints: [
      'Ernst Mayr is widely known as the Darwin of the 20th century.',
      'Scientific names are binomial: Genus (capitalized) and Species epithet (lowercase), Latin origin, italicized in print.',
      'Taxonomic categories in ascending order: Species, Genus, Family, Order, Class, Phylum/Division, Kingdom.'
    ]
  },
  {
    num: 2,
    titleEn: 'Biological Classification',
    titleHi: 'जीव जगत का वर्गीकरण',
    duration: '45 min',
    unitName: 'Unit I: Diversity of Living Organisms',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Five Kingdom Classification & Kingdom Monera', titleHi: 'पाँच जगत वर्गीकरण एवं जगत मोनेरा', id: 'c11-bio-ch2-t1', dur: '15 min' },
      { part: 2, titleEn: 'Kingdom Protista (Chrysophytes, Dinoflagellates, Euglenoids, Protozoans)', titleHi: 'जगत प्रोटिस्टा के समूह', id: 'c11-bio-ch2-t2', dur: '15 min' },
      { part: 3, titleEn: 'Kingdom Fungi (Phyco-, Asco-, Basidio-, Deuteromycetes) & Viruses', titleHi: 'कवक जगत एवं विषाणु, वाइरॉइड व लाइकेन', id: 'c11-bio-ch2-t3', dur: '15 min' }
    ],
    keyPoints: [
      'R.H. Whittaker proposed the Five Kingdom Classification in 1969 based on cell structure, body organization, mode of nutrition, reproduction, and phylogenetic relationships.',
      'Methanogens are Archaebacteria that produce biogas from cow dung.',
      'Lichens are symbiotic associations between phycobiont (algae) and mycobiont (fungi).'
    ]
  },
  {
    num: 3,
    titleEn: 'Plant Kingdom',
    titleHi: 'वनस्पति जगत',
    duration: '45 min',
    unitName: 'Unit I: Diversity of Living Organisms',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Algae: Chlorophyceae, Phaeophyceae, and Rhodophyceae', titleHi: 'शैवाल का वर्गीकरण (क्लोरो-, फियो- व रोडोफाइसी)', id: 'c11-bio-ch3-t1', dur: '15 min' },
      { part: 2, titleEn: 'Bryophytes (Liverworts & Mosses) and Pteridophytes (Ferns)', titleHi: 'ब्रायोफाइटा एवं टेरिडोफाइटा', id: 'c11-bio-ch3-t2', dur: '15 min' },
      { part: 3, titleEn: 'Gymnosperms, Angiosperms & Alternation of Generations', titleHi: 'जिम्नोस्पर्म, एंजियोस्पर्म एवं पीढ़ी एकांतरण', id: 'c11-bio-ch3-t3', dur: '15 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Animal Kingdom',
    titleHi: 'प्राणि जगत',
    duration: '48 min',
    unitName: 'Unit I: Diversity of Living Organisms',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Basis of Classification (Levels of Organization, Coelom, Symmetry)', titleHi: 'वर्गीकरण का आधार (संगठन स्तर, देहगुहा, सममिति)', id: 'c11-bio-ch4-t1', dur: '16 min' },
      { part: 2, titleEn: 'Non-Chordates: Porifera, Cnidaria, Platyhelminthes to Echinodermata', titleHi: 'अकशेरुकी संघ (पॉरीफेरा से एकाइनोडर्मेटा)', id: 'c11-bio-ch4-t2', dur: '16 min' },
      { part: 3, titleEn: 'Phylum Chordata & Vertebrata Classes (Pisces, Amphibia, Reptilia, Aves, Mammalia)', titleHi: 'कॉर्डेटा संघ एवं कशेरुकी वर्ग', id: 'c11-bio-ch4-t3', dur: '16 min' }
    ]
  },
  {
    num: 5,
    titleEn: 'Morphology of Flowering Plants',
    titleHi: 'पुष्पी पादपों की आकारिकी',
    duration: '46 min',
    unitName: 'Unit II: Structural Organisation in Plants & Animals',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Root and Stem Modifications & Venation in Leaves', titleHi: 'जड़, तना रूपांतरण एवं पर्ण शिराविन्यास', id: 'c11-bio-ch5-t1', dur: '15 min' },
      { part: 2, titleEn: 'Inflorescence and Flower Anatomy (Aestivation & Placentation)', titleHi: 'पुष्पक्रम एवं पुष्प संरचना (दलविन्यास व बीजांडन्यास)', id: 'c11-bio-ch5-t2', dur: '15 min' },
      { part: 3, titleEn: 'Fruit, Seed & Semitechnical Description of Family Solanaceae', titleHi: 'फल, बीज एवं सोलेनेसी कुल का अर्ध-तकनीकी विवरण', id: 'c11-bio-ch5-t3', dur: '16 min' }
    ]
  },
  {
    num: 6,
    titleEn: 'Anatomy of Flowering Plants',
    titleHi: 'पुष्पी पादपों का शारीर',
    duration: '44 min',
    unitName: 'Unit II: Structural Organisation in Plants & Animals',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Meristematic Tissues & Permanent Tissues (Parenchyma, Collenchyma, Sclerenchyma, Xylem, Phloem)', titleHi: 'विभज्योतक एवं स्थायी ऊतक', id: 'c11-bio-ch6-t1', dur: '15 min' },
      { part: 2, titleEn: 'Tissue Systems: Epidermal, Ground, and Vascular Bundles', titleHi: 'ऊतक तंत्र (बाह्यत्वचीय, भरण व संवहन)', id: 'c11-bio-ch6-t2', dur: '14 min' },
      { part: 3, titleEn: 'Internal Structure of Dicot and Monocot Root, Stem, and Leaf', titleHi: 'द्विबीजपत्री व एकबीजपत्री जड़, तने व पत्ती का आंतरिक शारीर', id: 'c11-bio-ch6-t3', dur: '15 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Structural Organisation in Animals',
    titleHi: 'प्राणियों में संरचनात्मक संगठन',
    duration: '42 min',
    unitName: 'Unit II: Structural Organisation in Plants & Animals',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Animal Tissues: Epithelial and Connective Tissues', titleHi: 'उपकला एवं संयोजी ऊतक', id: 'c11-bio-ch7-t1', dur: '14 min' },
      { part: 2, titleEn: 'Muscular (Striated, Smooth, Cardiac) and Neural Tissues', titleHi: 'पेशीय एवं तंत्रिका ऊतक', id: 'c11-bio-ch7-t2', dur: '14 min' },
      { part: 3, titleEn: 'Morphology, Digestive, Circulatory & Reproductive Systems of Frog', titleHi: 'मेंढक (राना टिग्रीना) की आकारिकी व कार्यिकी', id: 'c11-bio-ch7-t3', dur: '14 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Cell: The Unit of Life',
    titleHi: 'कोशिका: जीवन की इकाई',
    duration: '50 min',
    unitName: 'Unit III: Cell Structure and Function',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Cell Theory & Prokaryotic Cell Structure (Envelope, Ribosomes, Inclusions)', titleHi: 'कोशिका सिद्धांत एवं प्रोकैरियोटिक कोशिका', id: 'c11-bio-ch8-t1', dur: '16 min' },
      { part: 2, titleEn: 'Fluid Mosaic Model of Plasma Membrane & Endomembrane System', titleHi: 'प्लाज्मा झिल्ली का फ्लुइड मोजेक मॉडल एवं अंतःझिल्ली तंत्र', id: 'c11-bio-ch8-t2', dur: '17 min' },
      { part: 3, titleEn: 'Mitochondria, Chloroplasts, Ribosomes, Centrosome & Nucleus Structure', titleHi: 'माइटोकॉन्ड्रिया, लवक एवं केंद्रक की संरचना', id: 'c11-bio-ch8-t3', dur: '17 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Biomolecules',
    titleHi: 'जैव अणु',
    duration: '48 min',
    unitName: 'Unit III: Cell Structure and Function',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Biomolecules Analysis, Primary and Secondary Metabolites', titleHi: 'रासायनिक विश्लेषण एवं प्राथमिक व द्वितीयक उपापचयी', id: 'c11-bio-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Structure of Carbohydrates, Amino Acids, Proteins & Nucleic Acids', titleHi: 'कार्बोहाइड्रेट, प्रोटीन एवं न्यूक्लिक अम्ल की संरचना', id: 'c11-bio-ch9-t2', dur: '16 min' },
      { part: 3, titleEn: 'Enzymes: Activation Energy, Mechanism of Action & Competitive Inhibition', titleHi: 'एंजाइम: संक्रियण ऊर्जा, क्रियाविधि व संदमन', id: 'c11-bio-ch9-t3', dur: '16 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Cell Cycle and Cell Division',
    titleHi: 'कोशिका चक्र और कोशिका विभाजन',
    duration: '45 min',
    unitName: 'Unit III: Cell Structure and Function',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Phases of Cell Cycle (G1, S, G2, M Phase and G0 Quiescent Stage)', titleHi: 'कोशिका चक्र की प्रावस्थाएं (G1, S, G2, M प्रावस्था)', id: 'c11-bio-ch10-t1', dur: '15 min' },
      { part: 2, titleEn: 'Mitosis: Stages of Karyokinesis and Cytokinesis', titleHi: 'समसूत्री विभाजन के चरण एवं कोशिकाद्रव्य विभाजन', id: 'c11-bio-ch10-t2', dur: '15 min' },
      { part: 3, titleEn: 'Meiosis I and Meiosis II (Crossing Over, Synaptonemal Complex)', titleHi: 'अर्धसूत्री विभाजन I व II (जीन विनिमय)', id: 'c11-bio-ch10-t3', dur: '15 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Photosynthesis in Higher Plants',
    titleHi: 'उच्च पादपों में प्रकाश-संश्लेषण',
    duration: '50 min',
    unitName: 'Unit IV: Plant Physiology',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Photosynthetic Pigments & Light Reaction (Z-Scheme & Photolysis)', titleHi: 'प्रकाश-संश्लेषण वर्णक एवं प्रकाशिक अभिक्रिया', id: 'c11-bio-ch11-t1', dur: '16 min' },
      { part: 2, titleEn: 'Chemiosmotic Hypothesis & Photophosphorylation (Cyclic & Non-cyclic)', titleHi: 'रसोपरासरणी परिकल्पना एवं फोटोफॉस्फोरिलीकरण', id: 'c11-bio-ch11-t2', dur: '17 min' },
      { part: 3, titleEn: 'Calvin Cycle (C3 Pathway), C4 Dicarboxylic Acid Pathway & Photorespiration', titleHi: 'केल्विन चक्र (C3), C4 चक्र एवं प्रकाश-श्वसन', id: 'c11-bio-ch11-t3', dur: '17 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Respiration in Plants',
    titleHi: 'पादप में श्वसन',
    duration: '46 min',
    unitName: 'Unit IV: Plant Physiology',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Cellular Respiration, Glycolysis (EMP Pathway) & Fermentation', titleHi: 'ग्लाइकोलाइसिस (ईएमपी पथ) एवं किण्वन', id: 'c11-bio-ch12-t1', dur: '15 min' },
      { part: 2, titleEn: 'Aerobic Respiration: Tricarboxylic Acid (Krebs) Cycle in Mitochondria', titleHi: 'क्रेब्स चक्र (टीसीए चक्र)', id: 'c11-bio-ch12-t2', dur: '15 min' },
      { part: 3, titleEn: 'Electron Transport System (ETS), ATP Synthase Complex & Respiratory Quotient (RQ)', titleHi: 'इलेक्ट्रॉन परिवहन तंत्र (ETS) एवं श्वसन गुणांक', id: 'c11-bio-ch12-t3', dur: '16 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Plant Growth and Development',
    titleHi: 'पादप वृद्धि एवं परिवर्धन',
    duration: '44 min',
    unitName: 'Unit IV: Plant Physiology',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Growth Characteristics, Arithmetic & Geometric Growth Rates', titleHi: 'वृद्धि के अभिलक्षण एवं वृद्धि दर', id: 'c11-bio-ch13-t1', dur: '14 min' },
      { part: 2, titleEn: 'Differentiation, Dedifferentiation, Redifferentiation & Plasticity', titleHi: 'विभेदन, निर्विभेदन एवं सुघट्यता', id: 'c11-bio-ch13-t2', dur: '15 min' },
      { part: 3, titleEn: 'Plant Growth Regulators: Auxins, Gibberellins, Cytokinins, Ethylene & ABA', titleHi: 'पादप वृद्धि नियामक हॉर्मोन', id: 'c11-bio-ch13-t3', dur: '15 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Breathing and Exchange of Gases',
    titleHi: 'श्वसन और गैसों का विनिमय',
    duration: '46 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Human Respiratory System & Mechanism of Pulmonary Ventilation', titleHi: 'मानव श्वसन तंत्र एवं श्वासोच्छ्वास की क्रियाविधि', id: 'c11-bio-ch14-t1', dur: '15 min' },
      { part: 2, titleEn: 'Respiratory Volumes & Capacities (TV, IRV, ERV, RV, VC, TLC)', titleHi: 'श्वसन आयतन एवं फेफड़ों की क्षमताएं', id: 'c11-bio-ch14-t2', dur: '15 min' },
      { part: 3, titleEn: 'Gas Exchange at Alveolar Surface & Transport of Oxygen and Carbon Dioxide', titleHi: 'कूपिकाओं पर गैस विनिमय एवं O2 व CO2 का परिवहन', id: 'c11-bio-ch14-t3', dur: '16 min' }
    ]
  },
  {
    num: 15,
    titleEn: 'Body Fluids and Circulation',
    titleHi: 'शरीर द्रव तथा परिसंचरण',
    duration: '48 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Composition of Blood (Plasma, Formed Elements) & Lymph Fluid', titleHi: 'रक्त का संघटन, रुधिर कणिकाएं एवं लसीका', id: 'c11-bio-ch15-t1', dur: '16 min' },
      { part: 2, titleEn: 'Human Heart Structure, Cardiac Cycle & Electrocardiogram (ECG)', titleHi: 'मानव हृदय की संरचना, हृदय चक्र एवं ईसीजी', id: 'c11-bio-ch15-t2', dur: '16 min' },
      { part: 3, titleEn: 'Double Circulation, Regulation of Heart Rate & Hypertension/CAD Disorders', titleHi: 'द्विसंचरण, हृदय का तंत्रिकीय नियमन एवं विकार', id: 'c11-bio-ch15-t3', dur: '16 min' }
    ]
  },
  {
    num: 16,
    titleEn: 'Excretory Products and Their Elimination',
    titleHi: 'उत्सर्जी उत्पाद एवं उनका निष्कासन',
    duration: '46 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Ammonotelism, Ureotelism, Uricotelism & Human Nephron Anatomy', titleHi: 'उत्सर्जन के प्रकार एवं नेफ्रॉन की सूक्ष्म संरचना', id: 'c11-bio-ch16-t1', dur: '15 min' },
      { part: 2, titleEn: 'Urine Formation: Glomerular Filtration, Selective Reabsorption & Tubular Secretion', titleHi: 'मूत्र निर्माण: गुच्छीय निस्यंदन, पुनरावशोषण व स्रावण', id: 'c11-bio-ch16-t2', dur: '15 min' },
      { part: 3, titleEn: 'Counter-Current Mechanism in Henle’s Loop & RAAS Hormonal Regulation', titleHi: 'प्रतिधारा क्रियाविधि एवं रेनिन-एंजियोटेंसिन नियमन', id: 'c11-bio-ch16-t3', dur: '16 min' }
    ]
  },
  {
    num: 17,
    titleEn: 'Locomotion and Movement',
    titleHi: 'गमन एवं संचलन',
    duration: '44 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Structure of Skeletal Muscle Fibres & Contractile Proteins (Actin & Myosin)', titleHi: 'कंकाल पेशी तंतु एवं संकुचनशील प्रोटीन संरचना', id: 'c11-bio-ch17-t1', dur: '14 min' },
      { part: 2, titleEn: 'Sliding Filament Theory of Muscle Contraction & Neuromuscular Junction', titleHi: 'पेशी संकुचन का सर्पी तंतु सिद्धांत', id: 'c11-bio-ch17-t2', dur: '15 min' },
      { part: 3, titleEn: 'Axial & Appendicular Skeleton System, Joints and Myasthenia Gravis/Gout Disorders', titleHi: 'मानव कंकाल तंत्र, संधियाँ एवं पेशीय विकार', id: 'c11-bio-ch17-t3', dur: '15 min' }
    ]
  },
  {
    num: 18,
    titleEn: 'Neural Control and Coordination',
    titleHi: 'तंत्रिकीय नियंत्रण एवं समन्वय',
    duration: '48 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Neuron Structure, Resting Membrane Potential & Action Potential Conduction', titleHi: 'न्यूरॉन संरचना, विश्राम विभव एवं तंत्रिका आवेग संचरण', id: 'c11-bio-ch18-t1', dur: '16 min' },
      { part: 2, titleEn: 'Synaptic Transmission (Electrical & Chemical) & Neurotransmitters', titleHi: 'सिनैप्टिक संचरण एवं न्यूरोट्रांसमीटर', id: 'c11-bio-ch18-t2', dur: '16 min' },
      { part: 3, titleEn: 'Human Brain Parts (Cerebrum, Thalamus, Hypothalamus, Cerebellum, Medulla) & Reflex Action', titleHi: 'मानव मस्तिष्क के भाग एवं प्रतिवर्ती चाप', id: 'c11-bio-ch18-t3', dur: '16 min' }
    ]
  },
  {
    num: 19,
    titleEn: 'Chemical Coordination and Integration',
    titleHi: 'रासायनिक समन्वय तथा एकीकरण',
    duration: '45 min',
    unitName: 'Unit V: Human Physiology',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Hypothalamus, Pituitary Gland Hormones & Feedback Regulation', titleHi: 'हाइपोथैलेमस एवं पीयूष ग्रंथि के हॉर्मोन', id: 'c11-bio-ch19-t1', dur: '15 min' },
      { part: 2, titleEn: 'Thyroid, Parathyroid, Adrenal (Cortex & Medulla) and Pancreatic Islets', titleHi: 'थायरॉयड, पराथायरॉयड, अधिवृक्क व अग्न्याशय', id: 'c11-bio-ch19-t2', dur: '15 min' },
      { part: 3, titleEn: 'Hormone Action Mechanisms (Membrane-bound vs Intracellular Receptors)', titleHi: 'हॉर्मोन क्रिया की आणविक क्रियाविधि', id: 'c11-bio-ch19-t3', dur: '15 min' }
    ]
  }
];

// =========================================================================
// 6. CBSE CLASS 12 BIOLOGY (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_12_BIOLOGY = [
  {
    num: 1,
    titleEn: 'Sexual Reproduction in Flowering Plants',
    titleHi: 'पुष्पी पादपों में लैंगिक प्रजनन',
    duration: '48 min',
    unitName: 'Unit VI: Reproduction',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Flower Structure, Microsporogenesis & Pollen Grain Development', titleHi: 'पुष्प संरचना, लघुबीजाणुजनन व परागकण विकास', id: 'c12-bio-ch1-t1', dur: '16 min' },
      { part: 2, titleEn: 'Megasporogenesis, Embryo Sac Development & Pollination Agents', titleHi: 'गुरुबीजाणुजनन, भ्रूणकोष विकास एवं परागण', id: 'c12-bio-ch1-t2', dur: '16 min' },
      { part: 3, titleEn: 'Double Fertilization, Endosperm & Embryo Development, Apomixis', titleHi: 'द्विनिषेचन, भ्रूणपोष एवं भ्रूण विकास, असंगजनन', id: 'c12-bio-ch1-t3', dur: '16 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'Human Reproduction',
    titleHi: 'मानव जनन',
    duration: '50 min',
    unitName: 'Unit VI: Reproduction',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Male and Female Reproductive Systems Anatomy', titleHi: 'नर एवं मादा जनन तंत्र की शारीरिकी', id: 'c12-bio-ch2-t1', dur: '17 min' },
      { part: 2, titleEn: 'Gametogenesis (Spermatogenesis and Oogenesis) & Menstrual Cycle Hormonal Control', titleHi: 'युग्मकजनन (शुक्राणु व अंडाणु जनन) एवं आर्तव चक्र', id: 'c12-bio-ch2-t2', dur: '17 min' },
      { part: 3, titleEn: 'Fertilization, Cleavage, Blastocyst Implantation, Pregnancy & Parturition', titleHi: 'निषेचन, विदलन, रोपण, सगर्भता एवं प्रसव', id: 'c12-bio-ch2-t3', dur: '16 min' }
    ]
  },
  {
    num: 3,
    titleEn: 'Reproductive Health',
    titleHi: 'जनन स्वास्थ्य',
    duration: '42 min',
    unitName: 'Unit VI: Reproduction',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Population Explosion & Contraceptive Methods (Barrier, IUDs, Oral Pills, Surgical)', titleHi: 'जनसंख्या विस्फोट एवं गर्भनिरोधक विधियाँ', id: 'c12-bio-ch3-t1', dur: '14 min' },
      { part: 2, titleEn: 'Medical Termination of Pregnancy (MTP) & Sexually Transmitted Infections (STIs)', titleHi: 'सगर्भता का चिकित्सीय समापन (MTP) एवं यौन संचारित रोग', id: 'c12-bio-ch3-t2', dur: '14 min' },
      { part: 3, titleEn: 'Infertility Causes & Assisted Reproductive Technologies (IVF, ZIFT, GIFT, ICSI)', titleHi: 'बंध्यता एवं सहायक जनन प्रौद्योगिकी (ART)', id: 'c12-bio-ch3-t3', dur: '14 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Principles of Inheritance and Variation',
    titleHi: 'वंशागति तथा विविधता के सिद्धांत',
    duration: '54 min',
    unitName: 'Unit VII: Genetics and Evolution',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Mendel’s Experiments, Monohybrid Cross & Law of Segregation', titleHi: 'मेंडल के प्रयोग, एकसंकर संकरण व विसंयोजन का नियम', id: 'c12-bio-ch4-t1', dur: '18 min' },
      { part: 2, titleEn: 'Incomplete Dominance, Codominance, Multiple Alleles & Dihybrid Cross', titleHi: 'अपूर्ण प्रभाविता, सहप्रभाविता व द्विसंकर संकरण', id: 'c12-bio-ch4-t2', dur: '18 min' },
      { part: 3, titleEn: 'Chromosomal Theory of Inheritance, Linkage, Recombination & Genetic Disorders', titleHi: 'वंशागति का क्रोमोसोम सिद्धांत, सहलग्नता व आनुवंशिक विकार', id: 'c12-bio-ch4-t3', dur: '18 min' }
    ]
  },
  {
    num: 5,
    titleEn: 'Molecular Basis of Inheritance',
    titleHi: 'वंशागति के आणविक आधार',
    duration: '56 min',
    unitName: 'Unit VII: Genetics and Evolution',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'DNA Structure, Packaging in Chromatin & Search for Genetic Material (Hershey-Chase)', titleHi: 'डीएनए की संरचना, पैकेजिंग व आनुवंशिक पदार्थ की खोज', id: 'c12-bio-ch5-t1', dur: '18 min' },
      { part: 2, titleEn: 'Semiconservative DNA Replication, Transcription Process & Genetic Code', titleHi: 'डीएनए प्रतिकृतियन, अनुलेखन एवं आनुवंशिक कूट', id: 'c12-bio-ch5-t2', dur: '19 min' },
      { part: 3, titleEn: 'Translation, Regulation of Gene Expression (Lac Operon) & DNA Fingerprinting', titleHi: 'अनुवादन, जीन अभिव्यक्ति का नियमन (लैक ऑपेरॉन) व डीएनए फिंगरप्रिंटिंग', id: 'c12-bio-ch5-t3', dur: '19 min' }
    ]
  },
  {
    num: 6,
    titleEn: 'Evolution',
    titleHi: 'विकास',
    duration: '48 min',
    unitName: 'Unit VII: Genetics and Evolution',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Origin of Life (Miller-Urey Experiment) & Biological Evolution Evidence', titleHi: 'जीवन की उत्पत्ति (मिलर-यूरे प्रयोग) व जैव विकास के प्रमाण', id: 'c12-bio-ch6-t1', dur: '16 min' },
      { part: 2, titleEn: 'Darwinian Theory of Natural Selection & Modern Synthetic Theory of Evolution', titleHi: 'डार्विन का प्राकृतिक चयन सिद्धांत व आधुनिक संश्लेषण', id: 'c12-bio-ch6-t2', dur: '16 min' },
      { part: 3, titleEn: 'Hardy-Weinberg Principle, Speciation & Human Evolution Lineage', titleHi: 'हार्डी-वेनबर्ग साम्य, जाति उद्भवन एवं मानव विकास क्रम', id: 'c12-bio-ch6-t3', dur: '16 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Human Health and Disease',
    titleHi: 'मानव स्वास्थ्य तथा रोग',
    duration: '50 min',
    unitName: 'Unit VIII: Biology and Human Welfare',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Common Human Diseases: Typhoid, Pneumonia, Common Cold, Malaria, Amoebiasis', titleHi: 'सामान्य मानव रोग: टाइफाइड, मलेरिया, पेचिश', id: 'c12-bio-ch7-t1', dur: '17 min' },
      { part: 2, titleEn: 'Immunity: Innate, Acquired, Humoral & Cell-Mediated Immunity, Vaccination', titleHi: 'प्रतिरक्षा प्रणाली: सहज, उपार्जित व टीकाकरण', id: 'c12-bio-ch7-t2', dur: '17 min' },
      { part: 3, titleEn: 'AIDS Pathogenesis (HIV), Cancer Oncogenesis & Drug and Alcohol Abuse', titleHi: 'एड्स (एचआईवी), कैंसर एवं नशीली दवाओं का दुरुपयोग', id: 'c12-bio-ch7-t3', dur: '16 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Microbes in Human Welfare',
    titleHi: 'मानव कल्याण में सूक्ष्मजीव',
    duration: '44 min',
    unitName: 'Unit VIII: Biology and Human Welfare',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Microbes in Household Food Products & Industrial Products (Fermentation, Antibiotics)', titleHi: 'घरेलू खाद्य उत्पादों व औद्योगिक किण्वन में सूक्ष्मजीव', id: 'c12-bio-ch8-t1', dur: '15 min' },
      { part: 2, titleEn: 'Microbes in Sewage Treatment Plants (Primary & Biological Treatment)', titleHi: 'वाहितमल उपचार संयंत्र (एसटीपी) में सूक्ष्मजीव', id: 'c12-bio-ch8-t2', dur: '14 min' },
      { part: 3, titleEn: 'Biogas Production (Methanogens), Biocontrol Agents & Biofertilizers', titleHi: 'बायोगैस उत्पादन, जैव-नियंत्रक एवं जैव-उर्वरक', id: 'c12-bio-ch8-t3', dur: '15 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Biotechnology: Principles and Processes',
    titleHi: 'जैव प्रौद्योगिकी - सिद्धांत व प्रक्रम',
    duration: '48 min',
    unitName: 'Unit IX: Biotechnology',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Recombinant DNA Technology Principles & Restriction Endonucleases', titleHi: 'पुनर्योगज डीएनए तकनीक के सिद्धांत व प्रतिबंधन एंजाइम', id: 'c12-bio-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Cloning Vectors (pBR322 Features) & Competent Host Transformation', titleHi: 'क्लोनिंग संवाहक (pBR322) व सक्षम परपोषी रूपांतरण', id: 'c12-bio-ch9-t2', dur: '16 min' },
      { part: 3, titleEn: 'Processes of rDNA Technology: Isolation, PCR Amplification, Bioreactors & Downstream Processing', titleHi: 'rDNA तकनीक के चरण: पीसीआर प्रवर्धन व बायोरिएक्टर', id: 'c12-bio-ch9-t3', dur: '16 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Biotechnology and its Applications',
    titleHi: 'जैव प्रौद्योगिकी एवं उसके उपयोग',
    duration: '46 min',
    unitName: 'Unit IX: Biotechnology',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Biotechnological Applications in Agriculture: Bt Cotton & RNA Interference (RNAi)', titleHi: 'कृषि में जैव प्रौद्योगिकी: बीटी कपास व आरएनए अंतरक्षेप', id: 'c12-bio-ch10-t1', dur: '15 min' },
      { part: 2, titleEn: 'Applications in Medicine: Genetically Engineered Insulin, Gene Therapy for ADA & Molecular Diagnosis', titleHi: 'चिकित्सा में अनुप्रयोग: मानव इंसुलिन व जीन थेरेपी', id: 'c12-bio-ch10-t2', dur: '16 min' },
      { part: 3, titleEn: 'Transgenic Animals & Ethical Issues (GEAC, Biopiracy of Basmati Rice)', titleHi: 'पारजीनी जंतु एवं नैतिक मुद्दे (बायोपायरेसी)', id: 'c12-bio-ch10-t3', dur: '15 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Organisms and Populations',
    titleHi: 'जीव और समष्टियाँ',
    duration: '44 min',
    unitName: 'Unit X: Ecology and Environment',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Organism & Environment: Major Abiotic Factors and Physiological Adaptations', titleHi: 'जीव व पर्यावरण: अजैव कारक एवं कार्यिकीय अनुकूलन', id: 'c12-bio-ch11-t1', dur: '15 min' },
      { part: 2, titleEn: 'Population Attributes, Exponential and Logistic Growth Models (Verhulst-Pearl)', titleHi: 'समष्टि गुणधर्म एवं वृद्धि मॉडल', id: 'c12-bio-ch11-t2', dur: '15 min' },
      { part: 3, titleEn: 'Population Interactions: Mutualism, Competition, Predation, Parasitism, Commensalism', titleHi: 'समष्टि पारस्परिक क्रियाएं: सहोपकारिता, स्पर्धा, परजीविता', id: 'c12-bio-ch11-t3', dur: '14 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Ecosystem',
    titleHi: 'पारितंत्र',
    duration: '46 min',
    unitName: 'Unit X: Ecology and Environment',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Ecosystem Structure and Components (Abiotic, Biotic, Stratification)', titleHi: 'पारितंत्र की संरचना एवं संघटक', id: 'c12-bio-ch12-t1', dur: '15 min' },
      { part: 2, titleEn: 'Primary and Secondary Productivity & Decomposition Steps in Soil', titleHi: 'प्राथमिक उत्पादकता एवं अपघटन के चरण', id: 'c12-bio-ch12-t2', dur: '15 min' },
      { part: 3, titleEn: 'Energy Flow: Trophic Levels, 10% Ecological Law & Pyramids of Number, Biomass, Energy', titleHi: 'ऊर्जा प्रवाह, 10% नियम एवं पारिस्थितिक पिरामिड', id: 'c12-bio-ch12-t3', dur: '16 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Biodiversity and Conservation',
    titleHi: 'जैव विविधता एवं संरक्षण',
    duration: '44 min',
    unitName: 'Unit X: Ecology and Environment',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Levels of Biodiversity & Latitudinal Gradient / Species-Area Relationship (Alexander von Humboldt)', titleHi: 'जैव विविधता के स्तर एवं जाति-क्षेत्र संबंध', id: 'c12-bio-ch13-t1', dur: '15 min' },
      { part: 2, titleEn: 'Loss of Biodiversity & The Evil Quartet of Extinction Factors', titleHi: 'जैव विविधता की क्षति व संकट के चार प्रमुख कारण', id: 'c12-bio-ch13-t2', dur: '14 min' },
      { part: 3, titleEn: 'In-situ (Biosphere Reserves, National Parks) and Ex-situ Conservation Strategies', titleHi: 'स्व-स्थाने एवं बाह्य-स्थाने संरक्षण रणनीतियाँ', id: 'c12-bio-ch13-t3', dur: '15 min' }
    ]
  }
];

// =========================================================================
// 7. CBSE CLASS 11 ENGLISH CORE (Code 301)
// =========================================================================

export const CBSE_CLASS_11_ENGLISH = [
  // Section A: Reading & Writing Skills
  {
    num: 1,
    titleEn: 'Reading Comprehension: Unseen & Case-Based Passages',
    section: 'Section A: Reading Skills',
    category: 'language_skill',
    duration: '40 min',
    topics: [
      { part: 1, titleEn: 'Discursive & Factual Passage Analysis', titleHi: 'अपठित गद्यांश विश्लेषण', id: 'c11-eng-ch1-t1', dur: '20 min' },
      { part: 2, titleEn: 'Vocabulary in Context and Inference Deduction', titleHi: 'शब्दावली एवं अर्थ ग्रहण', id: 'c11-eng-ch1-t2', dur: '20 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'Note-Making and Summarization Technique',
    section: 'Section A: Reading Skills',
    category: 'language_skill',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Systematic Outlining, Heading & Subheading Structuring', titleHi: 'शीर्षक व उपशीर्षक नोट-निर्माण', id: 'c11-eng-ch2-t1', dur: '17 min' },
      { part: 2, titleEn: 'Recognized Abbreviations, Symbol Keys & 50-word Summary', titleHi: 'मानक संक्षिप्त रूप एवं सारांश लेखन', id: 'c11-eng-ch2-t2', dur: '18 min' }
    ]
  },
  {
    num: 3,
    titleEn: 'Creative Writing: Classified Advertisements & Posters',
    section: 'Section B: Creative Writing',
    category: 'writing_skill',
    duration: '40 min',
    topics: [
      { part: 1, titleEn: 'Classified Ads (Situation Vacant, Sale/Purchase, To-Let)', titleHi: 'वर्गीकृत विज्ञापन प्रारूप', id: 'c11-eng-ch3-t1', dur: '20 min' },
      { part: 2, titleEn: 'Public Awareness Posters: Visual Layout, Slogans & Issuing Authority', titleHi: 'पोस्टर निर्माण एवं सामाजिक जागरूकता', id: 'c11-eng-ch3-t2', dur: '20 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Creative Writing: Speech and Debate Composition',
    section: 'Section B: Creative Writing',
    category: 'writing_skill',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Speech Writing: Salutation, Rhetorical Questions & Conclusion', titleHi: 'भाषण लेखन प्रारूप व संबोधन', id: 'c11-eng-ch4-t1', dur: '22 min' },
      { part: 2, titleEn: 'Debate Writing: Motion For/Against, Rebuttals & Persuasive Logic', titleHi: 'वाद-विवाद लेखन एवं तार्किक खंडन', id: 'c11-eng-ch4-t2', dur: '23 min' }
    ]
  },
  // Section C: Literature - Hornbill Prose
  {
    num: 5,
    titleEn: 'The Portrait of a Lady (by Khushwant Singh)',
    section: 'Hornbill: Prose',
    category: 'prescribed_prose',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Life in the Village: Grandmother’s Devotion and Companionship', titleHi: 'गाँव का जीवन एवं दादी का स्नेह', id: 'c11-eng-ch5-t1', dur: '15 min' },
      { part: 2, titleEn: 'The Turning Point: City School, English Lessons and Emotional Distance', titleHi: 'शहर का जीवन एवं वैचारिक दूरी', id: 'c11-eng-ch5-t2', dur: '15 min' },
      { part: 3, titleEn: 'The Final Farewell: Prayers, Death and the Sparrows’ Silent Mourning', titleHi: 'अंतिम विदाई एवं चिड़ियों का मौन विलाप', id: 'c11-eng-ch5-t3', dur: '15 min' }
    ],
    keyPoints: [
      'The author portrays three distinct phases of relationship with his grandmother.',
      'The grandmother disapproved of English school education lacking religious teachings and scriptures.',
      'The sparrows did not eat bread crumbs and flew away silently after her body was carried away.'
    ]
  },
  {
    num: 6,
    titleEn: 'We’re Not Afraid to Die… if We Can All Be Together (Gordon Cook & Alan East)',
    section: 'Hornbill: Prose',
    category: 'prescribed_prose',
    duration: '48 min',
    topics: [
      { part: 1, titleEn: 'Setting Sail on Wavewalker & Facing the Giant Southern Ocean Storm', titleHi: 'वेववॉकर की समुद्री यात्रा व भयंकर तूफान', id: 'c11-eng-ch6-t1', dur: '16 min' },
      { part: 2, titleEn: 'Disaster at Sea: Fractured Ribs, Flooded Cabins & Pumping Water', titleHi: 'समुद्री आपदा एवं जीवन रक्षा संघर्ष', id: 'c11-eng-ch6-t2', dur: '16 min' },
      { part: 3, titleEn: 'Jonathan and Suzanne’s Courage & Pinpointing Ile Amsterdam', titleHi: 'बच्चों का अद्वितीय साहस एवं द्वीप की खोज', id: 'c11-eng-ch6-t3', dur: '16 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Discovering Tut: The Saga Continues (by A.R. Williams)',
    section: 'Hornbill: Prose',
    category: 'prescribed_prose',
    duration: '46 min',
    topics: [
      { part: 1, titleEn: 'Howard Carter’s 1922 Discovery of Tutankhamun’s Tomb & Golden Treasures', titleHi: 'तूतनखामुन के मकबरे की ऐतिहासिक खोज', id: 'c11-eng-ch7-t1', dur: '15 min' },
      { part: 2, titleEn: 'Damage Caused by Chiseling the Mummy & Modern Forensic CT Scanning', titleHi: 'ममी का सीटी स्कैन एवं वैज्ञानिक विश्लेषण', id: 'c11-eng-ch7-t2', dur: '15 min' },
      { part: 3, titleEn: 'Akhenaten’s Religious Turmoil & Mystery of Boy King’s Death', titleHi: 'अखनातेन की धार्मिक क्रांति व राजा की मृत्यु का रहस्य', id: 'c11-eng-ch7-t3', dur: '16 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'The Adventure (by Jayant Narlikar)',
    section: 'Hornbill: Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Professor Gangadharpant Gaitonde’s Transition into Alternate History', titleHi: 'प्रोफेसर गायतोंडे का समानांतर इतिहास में प्रवेश', id: 'c11-eng-ch8-t1', dur: '14 min' },
      { part: 2, titleEn: 'Battle of Panipat in the Alternate Reality: Maratha Victory over Abdali', titleHi: 'पानीपत की तीसरी लड़ाई: मराठा विजय का विकल्प', id: 'c11-eng-ch8-t2', dur: '15 min' },
      { part: 3, titleEn: 'Catastrophe Theory and Many-Worlds Quantum Interpretation by Rajendra Deshpande', titleHi: 'क्वांटम भौतिकी एवं समानांतर ब्रह्मांड व्याख्या', id: 'c11-eng-ch8-t3', dur: '15 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Silk Road (by Nick Middleton)',
    section: 'Hornbill: Prose',
    category: 'prescribed_prose',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Departure from Ravu & Encountering Tibetan Mastiffs on the High Plateau', titleHi: 'रावू से प्रस्थान एवं तिब्बती मैस्टिफ का सामना', id: 'c11-eng-ch9-t1', dur: '15 min' },
      { part: 2, titleEn: 'Crossing the 5515m Pass, Altitude Sickness and Hor’s Desolation', titleHi: 'उच्च पर्वतीय दर्रा पार करना एवं हौर की उदासी', id: 'c11-eng-ch9-t2', dur: '15 min' },
      { part: 3, titleEn: 'Darchen Medical Treatment, Meeting Norbu & Undertaking the Mount Kailash Kora', titleHi: 'दारचेन में इलाज, नोरबू से भेंट एवं कैलाश परिक्रमा', id: 'c11-eng-ch9-t3', dur: '15 min' }
    ]
  },
  // Section C: Literature - Hornbill Poetry
  {
    num: 10,
    titleEn: 'Poem 1: A Photograph (by Shirley Toulson)',
    section: 'Hornbill: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'The Cardboard Photograph: Mother and Cousins at Sea Beach', titleHi: 'कार्डबोर्ड छायाचित्र: माँ व चचेरी बहनें', id: 'c11-eng-ch10-t1', dur: '17 min' },
      { part: 2, titleEn: 'The Transience of Human Life vs the Immortal Ocean & The Silence of Loss', titleHi: 'मानव जीवन की नश्वरता एवं समुद्र की अमरता', id: 'c11-eng-ch10-t2', dur: '18 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Poem 2: The Laburnum Top (by Ted Hughes)',
    section: 'Hornbill: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'The Silent September Tree & The Sudden Arrival of the Goldfinch', titleHi: 'शांत अमलतास वृक्ष एवं गोल्डफिंच पक्षी का आगमन', id: 'c11-eng-ch11-t1', dur: '17 min' },
      { part: 2, titleEn: 'The Chittering Engine of the Bird Family & Return to Infinite Solitude', titleHi: 'परिवार का इंजन एवं अनंत आकाश में प्रस्थान', id: 'c11-eng-ch11-t2', dur: '18 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Poem 3: The Voice of the Rain (by Walt Whitman)',
    section: 'Hornbill: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'The Eternal Poem of Earth: Vapor Rising Impalpable from Land and Sea', titleHi: 'पृथ्वी की अमर कविता: भाप का आकाश में उठना', id: 'c11-eng-ch12-t1', dur: '17 min' },
      { part: 2, titleEn: 'Descending to Lave the Droughts & Cyclic Rebirth of Nature and Song', titleHi: 'धरा को सींचना एवं गीत और वर्षा की समानता', id: 'c11-eng-ch12-t2', dur: '18 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Poem 4: Childhood (by Markus Natten)',
    section: 'Hornbill: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Loss of Innocence: Rationality and Realization that Hell and Heaven are Geographical Fictions', titleHi: 'तार्किकता का उदय एवं बचपन की समाप्ति', id: 'c11-eng-ch13-t1', dur: '17 min' },
      { part: 2, titleEn: 'Adult Hypocrisy, Independent Thinking & The Hidden Face in an Infant', titleHi: 'वयस्कों का दोहरा आचरण एवं बाल मासूमियत', id: 'c11-eng-ch13-t2', dur: '18 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Poem 5: Father to Son (by Elizabeth Jennings)',
    section: 'Hornbill: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Generational Gap: Estrangement Between Father and Son Under the Same Roof', titleHi: 'पीढ़ीगत अंतर एवं पिता-पुत्र के बीच भावनात्मक दूरी', id: 'c11-eng-ch14-t1', dur: '17 min' },
      { part: 2, titleEn: 'Yearning for Reconciliation: The Prodigal Son Motif and Empty Forgiving Hand', titleHi: 'सुलह की तड़प एवं क्षमाशील पिता का हृदय', id: 'c11-eng-ch14-t2', dur: '18 min' }
    ]
  },
  // Section C: Literature - Snapshots Supplementary
  {
    num: 15,
    titleEn: 'Snapshots 1: The Summer of the Beautiful White Horse (William Saroyan)',
    section: 'Snapshots: Supplementary',
    category: 'prescribed_story',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'The Garoghlanian Tribe’s Uncompromising Honesty and Extreme Poverty', titleHi: 'गैरोघलानियन कबीले की ईमानदारी एवं गरीबी', id: 'c11-eng-ch15-t1', dur: '14 min' },
      { part: 2, titleEn: 'Mourad Bringing the Beautiful White Horse to Aram at 4 AM', titleHi: 'मुराद द्वारा सफेद घोड़ा लाना व घुड़सवारी', id: 'c11-eng-ch15-t2', dur: '15 min' },
      { part: 3, titleEn: 'Farmer John Byro’s Trust in Their Lineage and Quiet Return of the Horse', titleHi: 'जॉन बायरो का कबीले पर विश्वास व घोड़ा लौटाना', id: 'c11-eng-ch15-t3', dur: '15 min' }
    ]
  },
  {
    num: 16,
    titleEn: 'Snapshots 2: The Address (by Marga Minco)',
    section: 'Snapshots: Supplementary',
    category: 'prescribed_story',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Post-War Return to 46 Marconi Street & Mrs. Dorling’s Cold Refusal', titleHi: 'युद्धोपरांत 46 मार्कोनी स्ट्रीट की यात्रा व अस्वीकार', id: 'c11-eng-ch16-t1', dur: '14 min' },
      { part: 2, titleEn: 'The Second Visit: Confronting Mother’s Preserved Domestic Belongings in a Stranger’s House', titleHi: 'विस्थापित स्मृतियों एवं पारिवारिक वस्तुओं का सामना', id: 'c11-eng-ch16-t2', dur: '14 min' },
      { part: 3, titleEn: 'Alienation of Tangible Possessions and the Resolution to Forget the Address', titleHi: 'अतीत से विच्छेद एवं पते को भूलने का संकल्प', id: 'c11-eng-ch16-t3', dur: '14 min' }
    ]
  },
  {
    num: 17,
    titleEn: 'Snapshots 3: Mother’s Day (by J.B. Priestley)',
    section: 'Snapshots: Supplementary',
    category: 'prescribed_drama',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Mrs. Annie Pearson’s Subservient Position in Her Selfish Family', titleHi: 'परिवार में माँ की उपेक्षित स्थिति', id: 'c11-eng-ch17-t1', dur: '15 min' },
      { part: 2, titleEn: 'Mrs. Fitzgerald’s Esoteric Personality Swap and Disciplining Doris, Cyril & George', titleHi: 'व्यक्तित्व परिवर्तन एवं परिवार को अनुशासन का पाठ', id: 'c11-eng-ch17-t2', dur: '15 min' },
      { part: 3, titleEn: 'Reclaiming Maternal Dignity and Mutual Respect in the Household', titleHi: 'घरेलू सम्मान एवं मातृत्व के अधिकारों की पुनर्स्थापना', id: 'c11-eng-ch17-t3', dur: '15 min' }
    ]
  },
  {
    num: 18,
    titleEn: 'Snapshots 4: Birth (by A.J. Cronin)',
    section: 'Snapshots: Supplementary',
    category: 'prescribed_story',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Dr. Andrew Manson Summoned to Joe Morgan’s House at Midnight', titleHi: 'डॉ. एंड्रयू का आधी रात को प्रसव हेतु बुलाया जाना', id: 'c11-eng-ch18-t1', dur: '14 min' },
      { part: 2, titleEn: 'A Critical Stillborn Delivery: Saving the Exhausted Mother Susan Morgan', titleHi: 'जटिल प्रसव एवं माता के प्राणों की रक्षा', id: 'c11-eng-ch18-t2', dur: '15 min' },
      { part: 3, titleEn: 'Resuscitation of the Asphyxiated Infant Using Alternate Hot and Cold Basins', titleHi: 'गर्म व ठंडे पानी से नवजात में प्राण फूंकना', id: 'c11-eng-ch18-t3', dur: '15 min' }
    ]
  },
  {
    num: 19,
    titleEn: 'Snapshots 5: The Tale of Melon City (by Vikram Seth)',
    section: 'Snapshots: Supplementary',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'The Just and Placid King & The Triumphal Arch Knocking Off the Crown', titleHi: 'शांतिप्रिय राजा एवं मुकुट गिराने वाला मेहराब', id: 'c11-eng-ch19-t1', dur: '19 min' },
      { part: 2, titleEn: 'The Absurd Chain of Blame, The Royal Hanging & Crowning of a Melon', titleHi: 'दोषारोपण की हास्यास्पद श्रृंखला एवं खरबूजे का राज्याभिषेक', id: 'c11-eng-ch19-t2', dur: '19 min' }
    ]
  }
];

// =========================================================================
// 8. CBSE CLASS 12 ENGLISH CORE (Code 301)
// =========================================================================

export const CBSE_CLASS_12_ENGLISH = [
  // Section A: Reading Skills
  {
    num: 1,
    titleEn: 'Reading Comprehension: Discursive & Case-Based Passages',
    section: 'Section A: Reading Skills',
    category: 'language_skill',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Discursive Passage: Argumentative Logic & Theme Tracing', titleHi: 'तार्किक गद्यांश पठन व विश्लेषण', id: 'c12-eng-ch1-t1', dur: '21 min' },
      { part: 2, titleEn: 'Case-Based Factual Passage: Statistical Graphs & Text Synthesis', titleHi: 'तथ्यात्मक गद्यांश व सांख्यिकी विश्लेषण', id: 'c12-eng-ch1-t2', dur: '21 min' }
    ]
  },
  // Section B: Creative Writing Skills
  {
    num: 2,
    titleEn: 'Short Writing Tasks: Notice Writing & Formal/Informal Invitations',
    section: 'Section B: Creative Writing',
    category: 'writing_skill',
    duration: '40 min',
    topics: [
      { part: 1, titleEn: 'Official Notice Writing: Format, Content in Box & Issuing Authority', titleHi: 'सूचना लेखन प्रारूप एवं बॉक्स निर्माण', id: 'c12-eng-ch2-t1', dur: '20 min' },
      { part: 2, titleEn: 'Formal & Informal Invitations & Replies (Acceptance / Regret)', titleHi: 'निमंत्रण पत्र एवं प्रत्युत्तर प्रारूप', id: 'c12-eng-ch2-t2', dur: '20 min' }
    ]
  },
  {
    num: 3,
    titleEn: 'Long Writing Tasks: Letter of Application for Job & Letter to the Editor',
    section: 'Section B: Creative Writing',
    category: 'writing_skill',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Letter to the Editor: Social Grievances, Cause-Effect & Solutions', titleHi: 'संपादक को पत्र: सामाजिक समस्याएं व सुझाव', id: 'c12-eng-ch3-t1', dur: '22 min' },
      { part: 2, titleEn: 'Job Application: Covering Letter & Detailed Curriculum Vitae (Bio-Data)', titleHi: 'नौकरी हेतु आवेदन पत्र एवं बायोडाटा निर्माण', id: 'c12-eng-ch3-t2', dur: '23 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Long Writing Tasks: Article Writing & Analytical Report Writing',
    section: 'Section B: Creative Writing',
    category: 'writing_skill',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Article Composition: Eye-catching Title, Byline & Systematic Paragraphs', titleHi: 'लेख (आर्टिकल) लेखन प्रारूप', id: 'c12-eng-ch4-t1', dur: '22 min' },
      { part: 2, titleEn: 'Analytical Report Writing: Event Coverage, Date/Place Byline & Factual Tone', titleHi: 'प्रतिवेदन (रिपोर्ट) लेखन प्रारूप', id: 'c12-eng-ch4-t2', dur: '23 min' }
    ]
  },
  // Section C: Flamingo Prose
  {
    num: 5,
    titleEn: 'The Last Lesson (by Alphonse Daudet)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '48 min',
    topics: [
      { part: 1, titleEn: 'Franz’s Morning Reluctance & The Prussian Order on Alsace and Lorraine', titleHi: 'फ्रांज का विद्यालयी भय एवं बर्लिन से आया आदेश', id: 'c12-eng-ch5-t1', dur: '16 min' },
      { part: 2, titleEn: 'The Solemn Classroom, Villagers on Back Benches & M. Hamel’s Green Coat', titleHi: 'गंभीर कक्षा, ग्रामीणों की उपस्थिति व शिक्षक की वेशभूषा', id: 'c12-eng-ch5-t2', dur: '16 min' },
      { part: 3, titleEn: 'Linguistic Chauvinism, The Key to Their Prison & "Vive La France!"', titleHi: 'मातृभाषा का महत्व एवं "फ्रांस अमर रहे!" का उद्घोष', id: 'c12-eng-ch5-t3', dur: '16 min' }
    ],
    keyPoints: [
      'Alphonse Daudet set the story during the Franco-Prussian War (1870-1871).',
      'M. Hamel emphasized that French is the clearest and most logical language in the world.',
      'When people are enslaved, holding fast to their language is like having the key to their prison.'
    ]
  },
  {
    num: 6,
    titleEn: 'Lost Spring: Stories of Stolen Childhood (by Anees Jung)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '46 min',
    topics: [
      { part: 1, titleEn: 'Saheb-e-Alam: Ragpickers of Seemapuri & Garbage as Gold', titleHi: 'साहिब-ए-आलम: सीमापुरी के कचरा बीनने वाले', id: 'c12-eng-ch6-t1', dur: '15 min' },
      { part: 2, titleEn: 'Mukesh: Glass Bangle Makers of Firozabad & The Furnace Dangers', titleHi: 'मुकेश: फिरोजाबाद के कांच चूड़ी उद्योग में बाल श्रमिक', id: 'c12-eng-ch6-t2', dur: '15 min' },
      { part: 3, titleEn: 'The Vicious Circle of Sahukars, Middlemen, Police & The Dream of a Motor Mechanic', titleHi: 'साहूकारों और पुलिस का दुष्चक्र एवं मुकेश का सपना', id: 'c12-eng-ch6-t3', dur: '16 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Deep Water (by William Douglas)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Childhood Trauma at California Beach & The YMCA Pool Drowning Crisis', titleHi: 'कैलिफोर्निया तट का अनुभव एवं वाईएमसीए पूल दुर्घटना', id: 'c12-eng-ch7-t1', dur: '15 min' },
      { part: 2, titleEn: 'The Terror of Suffocation, The Blackout & Descent into Peaceful Oblivion', titleHi: 'डूबने का असहनीय भय एवं अचेत अवस्था', id: 'c12-eng-ch7-t2', dur: '15 min' },
      { part: 3, titleEn: 'Systematic Training by the Instructor & Conquering Fear at Lake Wentworth', titleHi: 'तैराकी प्रशिक्षक का अभ्यास एवं भय पर विजय', id: 'c12-eng-ch7-t3', dur: '15 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'The Rattrap (by Selma Lagerlöf)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Metaphor of the World as a Giant Rattrap & Stealing Thirty Kronor from the Crofter', titleHi: 'दुनिया चूहेदानी है: तीस क्रोनर की चोरी', id: 'c12-eng-ch8-t1', dur: '16 min' },
      { part: 2, titleEn: 'Trapped in the Dense Forest & The Ramsjö Ironworks Ironmaster’s Mistake', titleHi: 'घने जंगल में भटकना व राम्सजो आयरनवर्क्स', id: 'c12-eng-ch8-t2', dur: '17 min' },
      { part: 3, titleEn: 'Edla Willmansson’s Compassion, Christmas Transformation & Captain von Stahle', titleHi: 'एडला की दयालुता एवं चूहेदानी विक्रेता का हृदय परिवर्तन', id: 'c12-eng-ch8-t3', dur: '17 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Indigo (by Louis Fischer)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '48 min',
    topics: [
      { part: 1, titleEn: 'Rajkumar Shukla’s Tenacity & Bringing Mahatma Gandhi to Champaran', titleHi: 'राजकुमार शुक्ला का संकल्प व गांधीजी का चंपारण आगमन', id: 'c12-eng-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'The Exploitative Tinkathia Indigo Sharecropping System & British Planters', titleHi: 'तीनकठिया नील व्यवस्था एवं ब्रिटिश जमींदारों का शोषण', id: 'c12-eng-ch9-t2', dur: '16 min' },
      { part: 3, titleEn: 'First Triumph of Civil Disobedience, 25% Refund Settlement & Self-Reliance', titleHi: 'सविनय अवज्ञा की प्रथम विजय एवं आत्मनिर्भरता की सीख', id: 'c12-eng-ch9-t3', dur: '16 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Poets and Pancakes (by Asokamitran)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Gemini Studios Makeup Department, Truckloads of Pancakes & Hierarchy', titleHi: 'जेमिनी स्टूडियोज का मेकअप विभाग व पैनकेक सौंदर्य प्रसाधन', id: 'c12-eng-ch10-t1', dur: '14 min' },
      { part: 2, titleEn: 'Kothamangalam Subbu: The Indispensable No. 2, Poet and Actor', titleHi: 'कोठामंगलम सुब्बू: बहुमुखी प्रतिभा के धनी', id: 'c12-eng-ch10-t2', dur: '15 min' },
      { part: 3, titleEn: 'Visit of Frank Buchman’s Moral Re-Armament Army & Stephen Spender’s Mystery', titleHi: 'एमआरए दल का नाटक एवं स्टीफन स्पेंडर का अस्पष्ट भाषण', id: 'c12-eng-ch10-t3', dur: '15 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'The Interview (by Christopher Silvester)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Interviews in Modern Journalism: Celebrity Anxieties & V.S. Naipaul/Lewis Carroll Views', titleHi: 'पत्रकारिता में साक्षात्कार: हस्तियों के अनुभव व भय', id: 'c12-eng-ch11-t1', dur: '21 min' },
      { part: 2, titleEn: 'Mukund Padmanabhan’s Interview with Umberto Eco: The Semiotician and Novelist', titleHi: 'मुकुंद पद्मनाभन द्वारा उम्बर्तो एको का साक्षात्कार', id: 'c12-eng-ch11-t2', dur: '21 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Going Places (by A.R. Barton)',
    section: 'Flamingo: Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Sophie’s Adolescent Daydreams vs Working-Class Socioeconomic Reality', titleHi: 'सोफी की अवास्तविक महत्वाकांक्षाएं व पारिवारिक पृष्ठभूमि', id: 'c12-eng-ch12-t1', dur: '14 min' },
      { part: 2, titleEn: 'Her Obsession with Irish Football Prodigy Danny Casey & Confiding in Geoff', titleHi: 'डैनी केसी से काल्पनिक मुलाकात एवं भाई जियोफ पर विश्वास', id: 'c12-eng-ch12-t2', dur: '15 min' },
      { part: 3, titleEn: 'The Solitary Vigil at the Canal Wharf & The Inevitable Disillusionment', titleHi: 'नहर किनारे अकेली प्रतीक्षा एवं कल्पना का टूटना', id: 'c12-eng-ch12-t3', dur: '15 min' }
    ]
  },
  // Section C: Flamingo Poetry
  {
    num: 13,
    titleEn: 'Poem 1: My Mother at Sixty-Six (by Kamala Das)',
    section: 'Flamingo: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Drive to Cochin Airport: Mother’s Ashen, Corpse-like Sleeping Face', titleHi: 'कोचीन हवाईअड्डे की यात्रा एवं माँ का वृद्ध चेहरा', id: 'c12-eng-ch13-t1', dur: '17 min' },
      { part: 2, titleEn: 'Contrasting Young Trees Sprinting, Merry Children & The Painful Parting Smile', titleHi: 'प्रकृति की सजीवता बनाम वृद्धावस्था का भय व अंतिम मुस्कान', id: 'c12-eng-ch13-t2', dur: '18 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Poem 2: Keeping Quiet (by Pablo Neruda)',
    section: 'Flamingo: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Counting to Twelve: A Moment of Total Inactivity and Self-Introspection', titleHi: 'बारह तक गिनती: शांत आत्म-मंथन का आह्वान', id: 'c12-eng-ch14-t1', dur: '17 min' },
      { part: 2, titleEn: 'Cessation of Destructive Wars & Earth’s Lesson of Living Quietude', titleHi: 'युद्धों का विराम एवं प्रकृति से नवजीवन की सीख', id: 'c12-eng-ch14-t2', dur: '18 min' }
    ]
  },
  {
    num: 15,
    titleEn: 'Poem 3: A Thing of Beauty (by John Keats)',
    section: 'Flamingo: Poetry',
    category: 'prescribed_poem',
    duration: '36 min',
    topics: [
      { part: 1, titleEn: 'A Thing of Beauty is a Joy Forever: The Immortal Bower of Peace', titleHi: 'सौंदर्य की अमरता एवं मानसिक शांति का संबल', id: 'c12-eng-ch15-t1', dur: '18 min' },
      { part: 2, titleEn: 'Overcoming Spite, Despondence and Darkness Through Nature and Great Art', titleHi: 'निराशा व दुखों के बीच सौंदर्य का संजीवनी प्रभाव', id: 'c12-eng-ch15-t2', dur: '18 min' }
    ]
  },
  {
    num: 16,
    titleEn: 'Poem 4: A Roadside Stand (by Robert Frost)',
    section: 'Flamingo: Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'The Rustic Roadside Shed Pleading for City Currency to Expand Life', titleHi: 'सड़क किनारे दुकानदारों की आर्थिक लाचारी', id: 'c12-eng-ch16-t1', dur: '19 min' },
      { part: 2, titleEn: 'Calculating Selfish Benefactors, Corrupt Politicians & The Poet’s Deep Grief', titleHi: 'स्वार्थी राजनीतिज्ञों के झूठे वादे एवं कवि की व्यथा', id: 'c12-eng-ch16-t2', dur: '19 min' }
    ]
  },
  {
    num: 17,
    titleEn: 'Poem 5: Aunt Jennifer’s Tigers (by Adrienne Rich)',
    section: 'Flamingo: Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Bright Topaz Tigers Prancing in Chivalric Certainty Across the Screen', titleHi: 'कशीदाकारी के निर्भीक व गर्वित बाघ', id: 'c12-eng-ch17-t1', dur: '17 min' },
      { part: 2, titleEn: 'The Weight of Uncle’s Wedding Band, Patriarchal Oppression & Posthumous Pride', titleHi: 'विवाह की बेड़ियाँ, पितृसत्तात्मक शोषण एवं कला की अमरता', id: 'c12-eng-ch17-t2', dur: '18 min' }
    ]
  },
  // Section C: Vistas Supplementary
  {
    num: 18,
    titleEn: 'Vistas 1: The Third Level (by Jack Finney)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_story',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Charley Discovering the 1894 Level at Grand Central Terminal', titleHi: 'ग्रैंड सेंट्रल टर्मिनल पर 1894 का तीसरा तल', id: 'c12-eng-ch18-t1', dur: '14 min' },
      { part: 2, titleEn: 'Victorian Gaslights, Brass Spittoons, Old Currency & The Escape Wish', titleHi: 'विक्टोरियन युग की जीवनशैली एवं आधुनिक तनाव से पलायन', id: 'c12-eng-ch18-t2', dur: '15 min' },
      { part: 3, titleEn: 'Psychiatrist Sam Weiner’s Letter from Galesburg, Illinois', titleHi: 'मनोचिकित्सक सैम वेइनर का रहस्यमयी पत्र', id: 'c12-eng-ch18-t3', dur: '15 min' }
    ]
  },
  {
    num: 19,
    titleEn: 'Vistas 2: The Tiger King (by Kalki)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_story',
    duration: '46 min',
    topics: [
      { part: 1, titleEn: 'Prophecy of Death by a Tiger & The Infant Prince Challenging Destiny', titleHi: 'सौवें बाघ द्वारा मृत्यु की भविष्यवाणी व राजकुमार की ललकार', id: 'c12-eng-ch19-t1', dur: '15 min' },
      { part: 2, titleEn: 'The Ruthless Campaign of Killing 99 Tigers & Marrying for Tiger Forests', titleHi: 'निनाणवे बाघों का शिकार एवं दीवान की चतुराई', id: 'c12-eng-ch19-t2', dur: '15 min' },
      { part: 3, titleEn: 'The Fateful Wooden Toy Tiger Sliver & The Complete Vengeance of Destiny', titleHi: 'लकड़ी के खिलौने बाघ की फांस एवं नियति का अंतिम प्रहार', id: 'c12-eng-ch19-t3', dur: '16 min' }
    ]
  },
  {
    num: 20,
    titleEn: 'Vistas 3: Journey to the End of the Earth (by Tishani Doshi)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_story',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Expedition to Antarctica on Russian Research Ship Akademik Shokalskiy', titleHi: 'रूसी जहाज शोकाल्स्की पर अंटार्कटिका अभियान', id: 'c12-eng-ch20-t1', dur: '14 min' },
      { part: 2, titleEn: 'Gondwana Supercontinent Geological History & Human Impact on Earth', titleHi: 'गोंडवाना भूभाग का इतिहास एवं मानव निर्मित जलवायु संकट', id: 'c12-eng-ch20-t2', dur: '14 min' },
      { part: 3, titleEn: 'Phytoplankton Microscopic Algae as Ecological Warning & Students on Ice', titleHi: 'पादप प्लवक एवं "स्टूडेंट्स ऑन आइस" कार्यक्रम', id: 'c12-eng-ch20-t3', dur: '14 min' }
    ]
  },
  {
    num: 21,
    titleEn: 'Vistas 4: The Enemy (by Pearl S. Buck)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_story',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Dr. Sadao Hoki and Hana Rescuing Wounded American POW Tom from Shore', titleHi: 'डॉ. सदाओ व हाना द्वारा घायल अमेरिकी सैनिक को बचाना', id: 'c12-eng-ch21-t1', dur: '16 min' },
      { part: 2, titleEn: 'Conflict Between Hippocratic Medical Duty and Wartime National Patriotism', titleHi: 'चिकित्सीय कर्तव्य एवं राष्ट्रभक्ति का द्वंद्व', id: 'c12-eng-ch21-t2', dur: '17 min' },
      { part: 3, titleEn: 'General Takima’s Assassination Promise & Aiding Tom’s Safe Sea Escape', titleHi: 'जनरल की विस्मृति एवं टॉम को सुरक्षित विदा करना', id: 'c12-eng-ch21-t3', dur: '17 min' }
    ]
  },
  {
    num: 22,
    titleEn: 'Vistas 5: On the Face of It (by Susan Hill)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_drama',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Derry’s Acid-Scarred Face, Bitter Withdrawal and Fear of Humiliation', titleHi: 'डेरी का झुलसा चेहरा एवं समाज से कटाव', id: 'c12-eng-ch22-t1', dur: '15 min' },
      { part: 2, titleEn: 'Mr. Lamb’s Tin Leg, The Open Garden Gate and Weed/Flower Equality', titleHi: 'मिस्टर लैम्ब की टिन की टांग एवं सकारात्मक दृष्टिकोण', id: 'c12-eng-ch22-t2', dur: '15 min' },
      { part: 3, titleEn: 'Transformation of Derry’s Outlook & Mr. Lamb’s Tragic Fall from the Ladder', titleHi: 'डेरी का आत्म-विश्वास एवं लैम्ब का आकस्मिक निधन', id: 'c12-eng-ch22-t3', dur: '15 min' }
    ]
  },
  {
    num: 23,
    titleEn: 'Vistas 6: Memories of Childhood (Zitkala-Sa & Bama)',
    section: 'Vistas: Supplementary',
    category: 'prescribed_story',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Zitkala-Sa: The Cutting of My Long Hair and Cultural Dispossession at Carlisle', titleHi: 'जितकाला-सा: लंबे बाल काटे जाना एवं सांस्कृतिक शोषण', id: 'c12-eng-ch23-t1', dur: '22 min' },
      { part: 2, titleEn: 'Bama: We Too are Human Beings, Caste Untouchability & Education as Empowerment', titleHi: 'बामा: छूआछूत का दंश एवं शिक्षा द्वारा स्वाभिमान की विजय', id: 'c12-eng-ch23-t2', dur: '22 min' }
    ]
  }
];

// =========================================================================
// 9. ISC CLASS 11 & 12 ENGLISH (CISCE Prescribed Syllabus)
// =========================================================================

export const ISC_CLASS_11_ENGLISH = [
  // Paper 1: English Language
  {
    num: 1,
    titleEn: 'English Language Paper 1: Directed Writing & Proposal Writing',
    section: 'Paper 1: English Language',
    category: 'language_paper',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Directed Writing: Article, Speech, Cultural Review & Report', titleHi: 'निर्देशित लेखन प्रारूप', id: 'isc11-eng-ch1-t1', dur: '22 min' },
      { part: 2, titleEn: 'Proposal Writing: Heading, Objective, List of Measures & Budget', titleHi: 'प्रस्ताव लेखन (प्रपोजल राइटिंग)', id: 'isc11-eng-ch1-t2', dur: '23 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'English Language Paper 1: Functional Grammar & Reading Comprehension',
    section: 'Paper 1: English Language',
    category: 'language_paper',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Transformation of Sentences, Prepositions & Phrasal Verbs', titleHi: 'वाक्य रूपांतरण एवं व्याकरण', id: 'isc11-eng-ch2-t1', dur: '22 min' },
      { part: 2, titleEn: 'Unseen Passage Analysis, Contextual Vocabulary & 100-word Summary', titleHi: 'अपठित गद्यांश एवं संक्षेपण', id: 'isc11-eng-ch2-t2', dur: '23 min' }
    ]
  },
  // Paper 2: Literature - Drama
  {
    num: 3,
    titleEn: 'Drama: Macbeth Act I (William Shakespeare)',
    section: 'Paper 2: Drama',
    category: 'prescribed_drama',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Scene 1-3: The Witches’ Prophecy on the Heath ("Fair is foul, and foul is fair")', titleHi: 'डायनों की भविष्यवाणी एवं मैकबेथ की महत्वाकांक्षा', id: 'isc11-eng-ch3-t1', dur: '17 min' },
      { part: 2, titleEn: 'Scene 4-5: Lady Macbeth Invoking the Spirits of Cruelty & The Raven Croaking', titleHi: 'लेडी मैकबेथ का क्रूरता का आह्वान', id: 'isc11-eng-ch3-t2', dur: '16 min' },
      { part: 3, titleEn: 'Scene 6-7: Macbeth’s Soliloquy ("If it were done when ’tis done") & Spur to Ambition', titleHi: 'मैकबेथ का प्रसिद्ध स्वगत कथन एवं संशय', id: 'isc11-eng-ch3-t3', dur: '17 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Drama: Macbeth Act II (William Shakespeare)',
    section: 'Paper 2: Drama',
    category: 'prescribed_drama',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Scene 1: Banquo’s Unease & The Dagger of the Mind Soliloquy', titleHi: 'हवा में लटकती खंजर का स्वगत कथन', id: 'isc11-eng-ch4-t1', dur: '16 min' },
      { part: 2, titleEn: 'Scene 2: King Duncan’s Regicide & "Macbeth does murder sleep"', titleHi: 'डंकन की हत्या एवं नींद की हत्या का अपराधबोध', id: 'isc11-eng-ch4-t2', dur: '17 min' },
      { part: 3, titleEn: 'Scene 3-4: The Porter’s Hellgate Comic Relief, Macduff’s Discovery & Flight of Princes', titleHi: 'द्वारपाल का दृश्य एवं हत्या का अनावरण', id: 'isc11-eng-ch4-t3', dur: '17 min' }
    ]
  },
  // Paper 2: Literature - Prism Short Stories
  {
    num: 5,
    titleEn: 'Prism 1: A Living God (by Lafcadio Hearn)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Hamaguchi Gohei Observing the Receding Sea & Tsunami Threat', titleHi: 'हामागुची द्वारा सुनामी के खतरे को भांपना', id: 'isc11-eng-ch5-t1', dur: '21 min' },
      { part: 2, titleEn: 'Setting Fire to Rice Stacks to Guide Villagers to High Ground & Deification', titleHi: 'धान के पूलों में आग लगाकर ग्रामीणों की रक्षा', id: 'isc11-eng-ch5-t2', dur: '21 min' }
    ]
  },
  {
    num: 6,
    titleEn: 'Prism 2: Advice to Youth (by Mark Twain)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '40 min',
    topics: [
      { part: 1, titleEn: 'Satirical Guidance on Obeying Parents, Respecting Superiors & Selective Lying', titleHi: 'माता-पिता की आज्ञाकारिता पर व्यंग्य', id: 'isc11-eng-ch6-t1', dur: '20 min' },
      { part: 2, titleEn: 'Humorous Commentary on Early Rising, Firearms & Moral Character', titleHi: 'समय प्रबंधन व हथियारों पर मार्क ट्वेन का हास्य', id: 'isc11-eng-ch6-t2', dur: '20 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Prism 3: The Paper Menagerie (by Ken Liu)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Magical Origami Animals Breathing Life & Jack’s Mother’s Chinese Heritage', titleHi: 'ओरिगेमी खिलौने एवं चीनी सांस्कृतिक धरोहर', id: 'isc11-eng-ch7-t1', dur: '22 min' },
      { part: 2, titleEn: 'Cultural Assimilation, Rejection of Mother & The Letter Hidden in the Tiger', titleHi: 'सांस्कृतिक हीनता एवं माँ के अंतिम पत्र का मर्म', id: 'isc11-eng-ch7-t2', dur: '23 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Prism 4: The Great Automatic Grammatizator (by Roald Dahl)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Adolf Knipe Inventing a Machine That Writes Stories Mechanically', titleHi: 'कहानियां रचने वाली कंप्यूटर मशीन का आविष्कार', id: 'isc11-eng-ch8-t1', dur: '22 min' },
      { part: 2, titleEn: 'Commodification of Creative Literature & Authors Signing Over Artistic Integrity', titleHi: 'साहित्य का बाजारीकरण एवं लेखकों का समर्पण', id: 'isc11-eng-ch8-t2', dur: '22 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Prism 5: Thank You, Ma’am (by Langston Hughes)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '40 min',
    topics: [
      { part: 1, titleEn: 'Roger Attempting to Snatch Mrs. Luella Bates Washington Jones’s Pocketbook', titleHi: 'रोजर द्वारा पर्स छीनने का असफल प्रयास', id: 'isc11-eng-ch9-t1', dur: '20 min' },
      { part: 2, titleEn: 'Radical Kindness: Washing His Face, Sharing Supper & Giving Ten Dollars for Suede Shoes', titleHi: 'श्रीमती जोन्स की असीम दयालुता एवं संस्कार', id: 'isc11-eng-ch9-t2', dur: '20 min' }
    ]
  },
  // Paper 2: Literature - Rhapsody Poems
  {
    num: 10,
    titleEn: 'Rhapsody 1: Abhisara: The Tryst (Rabindranath Tagore)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'Upagupta the Buddhist Monk Sleeping in the Dust by Mathura Ramparts', titleHi: 'बौद्ध भिक्षु उपगुप्त एवं मथुरा की प्राचीर', id: 'isc11-eng-ch10-t1', dur: '19 min' },
      { part: 2, titleEn: 'Dancing Girl Vasavadatta Stricken with Pestilence & Upagupta’s True Compassion', titleHi: 'वासवदत्ता का पतन एवं उपगुप्त की सच्ची करुणा', id: 'isc11-eng-ch10-t2', dur: '19 min' }
    ]
  },
  {
    num: 11,
    titleEn: 'Rhapsody 2: Why I Like the Hospital (Tony Hoagland)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '35 min',
    topics: [
      { part: 1, titleEn: 'Shedding Pretense: Hospital as Sanctuary of Raw Human Honesty and Fragility', titleHi: 'मानवीय दुर्बलता एवं ढोंगमुक्त अस्पताल का वातावरण', id: 'isc11-eng-ch11-t1', dur: '17 min' },
      { part: 2, titleEn: 'The Acceptance of Illness and Radical Compassion in Clinical Corridors', titleHi: 'रोग की स्वीकार्यता एवं सहानुभूति का मर्म', id: 'isc11-eng-ch11-t2', dur: '18 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Rhapsody 3: Sonnet 116 (William Shakespeare)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '36 min',
    topics: [
      { part: 1, titleEn: 'The Marriage of True Minds: Love as an Ever-Fixed Mark Defying Tempests', titleHi: 'सच्चा प्रेम: तूफानों में अविचल प्रकाशस्तंभ', id: 'isc11-eng-ch12-t1', dur: '18 min' },
      { part: 2, titleEn: 'Love is Not Time’s Fool: Transcending the Sickle Compass of Mortality', titleHi: 'समय के प्रभाव से परे शाश्वत प्रेम', id: 'isc11-eng-ch12-t2', dur: '18 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Rhapsody 4: Death of a Naturalist (Seamus Heaney)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '36 min',
    topics: [
      { part: 1, titleEn: 'Childhood Fascination with Frogspawn, Flax-Dam Odours and Tadpoles', titleHi: 'प्रकृति के प्रति बाल कौतूहल एवं मेंढक के अंडे', id: 'isc11-eng-ch13-t1', dur: '18 min' },
      { part: 2, titleEn: 'The Menacing Mud-Grenade Bullfrogs & Loss of Childlike Pastoral Innocence', titleHi: 'विशाल मेंढकों का भय एवं मासूमियत की समाप्ति', id: 'isc11-eng-ch13-t2', dur: '18 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Rhapsody 5: Strange Meeting (Wilfred Owen)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'Descent into the Sombre Subterranean Dugout of Hell During World War I', titleHi: 'प्रथम विश्व युद्ध के पाताललोक में प्रवेश', id: 'isc11-eng-ch14-t1', dur: '19 min' },
      { part: 2, titleEn: 'Reconciliation with the Slain Enemy: "I am the enemy you killed, my friend"', titleHi: 'शत्रु सैनिक से मिलन: "मैं वही शत्रु हूँ जिसे तुमने मारा"', id: 'isc11-eng-ch14-t2', dur: '19 min' }
    ]
  }
];

export const ISC_CLASS_12_ENGLISH = [
  // Paper 1: English Language
  {
    num: 1,
    titleEn: 'English Language Paper 1: Essay Composition & Directed Writing',
    section: 'Paper 1: English Language',
    category: 'language_paper',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Argumentative & Narrative Essay Writing (400–450 Words)', titleHi: 'तार्किक एवं वर्णनात्मक निबंध लेखन', id: 'isc12-eng-ch1-t1', dur: '22 min' },
      { part: 2, titleEn: 'Directed Writing: Book/Film Review, Cultural Article & Formal Speech', titleHi: 'समीक्षा एवं औपचारिक वक्तव्य लेखन', id: 'isc12-eng-ch1-t2', dur: '23 min' }
    ]
  },
  {
    num: 2,
    titleEn: 'English Language Paper 1: Proposal Writing & Reading Analysis',
    section: 'Paper 1: English Language',
    category: 'language_paper',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'Institutional Proposal Writing: Structural Clarity & Implementation Steps', titleHi: 'संस्थागत प्रस्ताव लेखन प्रारूप', id: 'isc12-eng-ch2-t1', dur: '22 min' },
      { part: 2, titleEn: 'Critical Comprehension, Complex Inferences & Precise 100-word Summary Grid', titleHi: 'गंभीर गद्यांश विश्लेषण एवं संक्षेपण ग्रिड', id: 'isc12-eng-ch2-t2', dur: '23 min' }
    ]
  },
  // Paper 2: Literature - Drama
  {
    num: 3,
    titleEn: 'Drama: Macbeth Act III (William Shakespeare)',
    section: 'Paper 2: Drama',
    category: 'prescribed_drama',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Scene 1-2: Macbeth’s Paranoia Towards Banquo ("To be thus is nothing, but to be safely thus")', titleHi: 'बैंको के प्रति शंका एवं हत्यारों की नियुक्ति', id: 'isc12-eng-ch3-t1', dur: '17 min' },
      { part: 2, titleEn: 'Scene 3: Banquo’s Murder on the Road & Fleance’s Escape into Darkness', titleHi: 'बैंको की हत्या एवं फ्लियांश का पलायन', id: 'isc12-eng-ch3-t2', dur: '16 min' },
      { part: 3, titleEn: 'Scene 4: The Royal Banquet Haunted by Banquo’s Ghost & Macbeth’s Hysteria', titleHi: 'शाही भोज में बैंको के प्रेत का आगमन व आतंक', id: 'isc12-eng-ch3-t3', dur: '17 min' }
    ]
  },
  {
    num: 4,
    titleEn: 'Drama: Macbeth Act IV (William Shakespeare)',
    section: 'Paper 2: Drama',
    category: 'prescribed_drama',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Scene 1: The Witches’ Boiling Cauldron & The Three Apparitions (Armed Head, Bloody Child, Crowned Child)', titleHi: 'डायनों का कड़ाही दृश्य एवं तीन भविष्यवाणियां', id: 'isc12-eng-ch4-t1', dur: '17 min' },
      { part: 2, titleEn: 'Scene 2: The Brutal Massacre of Lady Macduff and Her Children at Fife', titleHi: 'मैकडफ के परिवार का नृशंस संहार', id: 'isc12-eng-ch4-t2', dur: '16 min' },
      { part: 3, titleEn: 'Scene 3: Malcolm Testing Macduff’s Loyalty in England & The Vow of Vengeance', titleHi: 'इंग्लैंड में मैल्कम द्वारा निष्ठा परीक्षा व प्रतिशोध', id: 'isc12-eng-ch4-t3', dur: '17 min' }
    ]
  },
  {
    num: 5,
    titleEn: 'Drama: Macbeth Act V (William Shakespeare)',
    section: 'Paper 2: Drama',
    category: 'prescribed_drama',
    duration: '50 min',
    topics: [
      { part: 1, titleEn: 'Scene 1: Lady Macbeth’s Agonized Sleepwalking ("Out, damned spot! out, I say!")', titleHi: 'लेडी मैकबेथ का निद्राभ्रमण एवं "मिट जा कलंक"', id: 'isc12-eng-ch5-t1', dur: '17 min' },
      { part: 2, titleEn: 'Scene 2-5: Birnam Wood Moving to Dunsinane & "Tomorrow, and tomorrow, and tomorrow" Soliloquy', titleHi: 'बिरनम वन का चलना एवं प्रसिद्ध जीवन-दर्शन स्वगत कथन', id: 'isc12-eng-ch5-t2', dur: '17 min' },
      { part: 3, titleEn: 'Scene 6-9: Macduff Born of Caesarean Section, The Duel & Restoring Order to Scotland', titleHi: 'मैकडफ का रहस्य, द्वंद्वयुद्ध एवं स्कॉटलैंड की मुक्ति', id: 'isc12-eng-ch5-t3', dur: '16 min' }
    ]
  },
  // Paper 2: Literature - Prism Short Stories
  {
    num: 6,
    titleEn: 'Prism 1: Atithi (by Rabindranath Tagore)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Tarapada’s Inherent Wanderlust and Inability to be Tied Down by Domesticity', titleHi: 'तारापद का घुमक्कड़ स्वभाव एवं बंधनमुक्ति', id: 'isc12-eng-ch6-t1', dur: '22 min' },
      { part: 2, titleEn: 'His Relationship with Motilal Babu’s Family, Charushashi’s Jealousy & The Sudden Vanishing', titleHi: 'मोतीलाल बाबू के परिवार में वास एवं रहस्यमयी विदाई', id: 'isc12-eng-ch6-t2', dur: '22 min' }
    ]
  },
  {
    num: 7,
    titleEn: 'Prism 2: The Cookie Lady (by Philip K. Dick)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '42 min',
    topics: [
      { part: 1, titleEn: 'Bubber Surfacing at Old Mrs. Drew’s House for Freshly Baked Cookies', titleHi: 'बबर का श्रीमती ड्रू के घर कुकीज हेतु जाना', id: 'isc12-eng-ch7-t1', dur: '21 min' },
      { part: 2, titleEn: 'The Sinister Parasitic Siphoning of Youthful Vitality & Bubber’s Fading Energy', titleHi: 'वृद्धा द्वारा बालक की जीवनी शक्ति का अवशोषण', id: 'isc12-eng-ch7-t2', dur: '21 min' }
    ]
  },
  {
    num: 8,
    titleEn: 'Prism 3: There Will Come Soft Rains (by Ray Bradbury)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '45 min',
    topics: [
      { part: 1, titleEn: 'The Automated Futuristic Smart House Functioning in an Obliterated Nuclear City', titleHi: 'परमाणु विनाश के बाद स्वचालित स्मार्ट घर की दिनचर्या', id: 'isc12-eng-ch8-t1', dur: '22 min' },
      { part: 2, titleEn: 'The Shadows of the Vaporized Family & The House’s Terminal Fire Breakdown', titleHi: 'मानवविहीन दीवारों पर परछाइयां एवं घर का अग्नि विनाश', id: 'isc12-eng-ch8-t2', dur: '23 min' }
    ]
  },
  {
    num: 9,
    titleEn: 'Prism 4: Indigo (by Satyajit Ray)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '46 min',
    topics: [
      { part: 1, titleEn: 'Aniruddha Bose’s Car Breakdown and Night Stay at Dumurgachhi Indigo Bungalow', titleHi: 'अनिरुद्ध बोस का डुमुरगाछी डाक बंगले में ठहरना', id: 'isc12-eng-ch9-t1', dur: '23 min' },
      { part: 2, titleEn: 'Possession by 19th Century British Planter Eric Prescott’s Ghost & Terror of Hound', titleHi: 'ब्रिटिश नील बागान मालिक की आत्मा का प्रवेश व भय', id: 'isc12-eng-ch9-t2', dur: '23 min' }
    ]
  },
  {
    num: 10,
    titleEn: 'Prism 5: The Medicine Bag (Virginia Driving Hawk Sneve)',
    section: 'Paper 2: Prism Prose',
    category: 'prescribed_prose',
    duration: '44 min',
    topics: [
      { part: 1, titleEn: 'Martin’s Embarrassment of Grandpa Joe Iron Shell Arriving in Sioux Attire', titleHi: 'मार्टिन की झिझक एवं सियोक्स दादाजी का आगमन', id: 'isc12-eng-ch10-t1', dur: '22 min' },
      { part: 2, titleEn: 'The Sacred History of the Medicine Bag, Passing the Heritage & Honoring Tradition', titleHi: 'पवित्र मेडिसिन बैग का इतिहास एवं धरोहर सौंपना', id: 'isc12-eng-ch10-t2', dur: '22 min' }
    ]
  },
  // Paper 2: Literature - Rhapsody Poems
  {
    num: 11,
    titleEn: 'Rhapsody 1: Telephone Conversation (Wole Soyinka)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'The Landlady’s Prejudiced Inquiry: "HOW DARK? ARE YOU LIGHT OR VERY DARK?"', titleHi: 'मकान मालकिन का नस्लीय प्रश्न व विडंबना', id: 'isc12-eng-ch11-t1', dur: '19 min' },
      { part: 2, titleEn: 'The Speaker’s Sophisticated Satirical Retort on Complexion and Human Dignity', titleHi: 'नस्लवाद पर तीखा बौद्धिक व्यंग्य', id: 'isc12-eng-ch11-t2', dur: '19 min' }
    ]
  },
  {
    num: 12,
    titleEn: 'Rhapsody 2: Tithonus (Alfred, Lord Tennyson)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'The Curse of Immortality Without Eternal Youth: Decaying in the Arms of Aurora', titleHi: 'अमरता का अभिशाप एवं उषा काल की देवी का विलाप', id: 'isc12-eng-ch12-t1', dur: '19 min' },
      { part: 2, titleEn: 'Yearning for Release: The Beauty of the Common Grave and Natural Mortality', titleHi: 'मृत्यु की कामना एवं प्राकृतिक अंत की सुंदरता', id: 'isc12-eng-ch12-t2', dur: '19 min' }
    ]
  },
  {
    num: 13,
    titleEn: 'Rhapsody 3: Death Be Not Proud (John Donne)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '36 min',
    topics: [
      { part: 1, titleEn: 'Defiance of Mortality: Death as Slave to Fate, Chance, Kings and Desperate Men', titleHi: 'मृत्यु को चुनौती: भाग्य व संयोग की दासी', id: 'isc12-eng-ch13-t1', dur: '18 min' },
      { part: 2, titleEn: 'The Soul’s Awakening into Eternity: "And death shall be no more; Death, thou shalt die."', titleHi: 'आत्मा की अमरता एवं "मृत्यु, तू स्वयं मर जाएगी"', id: 'isc12-eng-ch13-t2', dur: '18 min' }
    ]
  },
  {
    num: 14,
    titleEn: 'Rhapsody 4: Small Towns and the River (Mamang Dai)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '36 min',
    topics: [
      { part: 1, titleEn: 'The Anxious Calm of North-Eastern Small Towns and Grief of Mortality', titleHi: 'पूर्वोत्तर के छोटे शहरों का मौन व शोक', id: 'isc12-eng-ch14-t1', dur: '18 min' },
      { part: 2, titleEn: 'The Immortal Torrent of the River: Flowing from the Mist with Inherent Soul', titleHi: 'नदी की शाश्वत धारा एवं जनजातीय आस्था', id: 'isc12-eng-ch14-t2', dur: '18 min' }
    ]
  },
  {
    num: 15,
    titleEn: 'Rhapsody 5: Beethoven (Shane Koyczan)',
    section: 'Paper 2: Rhapsody Poetry',
    category: 'prescribed_poem',
    duration: '38 min',
    topics: [
      { part: 1, titleEn: 'The Young Prodigy Enduring Abuse and Father’s Demands at the Piano', titleHi: 'बाल प्रतिभा एवं पिता का कठोर अनुशासन', id: 'isc12-eng-ch15-t1', dur: '19 min' },
      { part: 2, titleEn: 'The Tragedy of Total Deafness Transmuted into Triumphant Ninth Symphony', titleHi: 'बधिरता पर संगीत की विजय एवं नौवीं सिम्फनी', id: 'isc12-eng-ch15-t2', dur: '19 min' }
    ]
  }
];

// =========================================================================
// 10. CBSE CLASS 11 & 12 CHEMISTRY (NCERT Rationalised 2026–27)
// =========================================================================

export const CBSE_CLASS_11_CHEMISTRY = [
  {
    num: 1,
    titleEn: 'Some Basic Concepts of Chemistry',
    titleHi: 'रसायन विज्ञान की कुछ मूल अवधारणाएं',
    duration: '45 min',
    oneShotId: null,
    unitName: 'Unit I: Basic Concepts of Chemistry',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Nature of Matter, Laws of Chemical Combination & Dalton\'s Atomic Theory', titleHi: 'द्रव्य की प्रकृति, रासायनिक संयोजन के नियम व डाल्टन सिद्धांत', id: 'c11-chem-ch1-t1', dur: '15 min' },
      { part: 2, titleEn: 'Atomic and Molecular Masses, Mole Concept & Molar Mass', titleHi: 'परमाण्विक द्रव्यमान, मोल संकल्पना एवं मोलर द्रव्यमान', id: 'c11-chem-ch1-t2', dur: '15 min' },
      { part: 3, titleEn: 'Percentage Composition, Empirical & Molecular Formula, Stoichiometry & Limiting Reagent', titleHi: 'मूलानुपाती सूत्र, आण्विक सूत्र, रससमीकरणमिति व सीमांत अभिकर्मक', id: 'c11-chem-ch1-t3', dur: '15 min' }
    ],
    practicalActivity: {
      title: 'Preparation of 250 mL of 0.1 M Standard Solution of Oxalic Acid',
      materials: ['Oxalic acid dihydrate crystals (H2C2O4.2H2O)', 'Analytical chemical balance', 'Watch glass', '250 mL volumetric measuring flask', 'Distilled water wash bottle', 'Glass funnel'],
      procedure: [
        'Calculate exact mass of oxalic acid required: m = M * MolarMass * V(L) = 0.1 * 126.06 * 0.25 = 3.151 g.',
        'Accurately weigh 3.151 g of pure oxalic acid crystals on a watch glass.',
        'Transfer the crystals into a 250 mL volumetric flask via glass funnel with distilled water washings.',
        'Dissolve completely by swirling and make up the volume precisely to the etched meniscus mark.'
      ],
      safety: 'Oxalic acid is poisonous and irritating; wear nitrile gloves and do not ingest.',
      realWorldApplication: 'Standardization of secondary titrants in industrial water testing and quantitative analytical chemistry.'
    },
    keyPoints: [
      'One mole contains exactly 6.02214076 x 10^23 elementary entities (Avogadro constant N_A).',
      'The limiting reagent is completely consumed in a reaction and dictates the maximum theoretical yield of products.',
      'Molarity depends on temperature due to volumetric expansion, whereas Molality (mol/kg) is temperature independent.'
    ],
    formulas: [
      { name: 'Mole Concept', formula: 'n = m / M = N / N_A = V(STP) / 22.4 L', desc: 'Number of moles from mass, particles, or gas volume at STP' },
      { name: 'Molarity', formula: 'M = (w_B / M_B) * (1000 / V_solution(mL))', desc: 'Moles of solute dissolved per litre of solution (mol/L)' },
      { name: 'Molality', formula: 'm = (w_B / M_B) * (1000 / w_A(g))', desc: 'Moles of solute per kilogram of solvent (mol/kg)' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the mass of sodium carbonate (Na2CO3) required to prepare 500 mL of 0.2 M solution.',
        sol: 'Molar mass of Na2CO3 = (2*23) + 12 + (3*16) = 106 g/mol. Using M = (w / M_m) * (1000 / V_mL): 0.2 = (w / 106) * (1000 / 500) => 0.2 = 2w / 106 => w = 0.2 * 53 = 10.6 g.'
      }
    ]
  },
  {
    num: 2,
    titleEn: 'Structure of Atom',
    titleHi: 'परमाणु की संरचना',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit II: Structure of Atom',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Discovery of Subatomic Particles, Rutherford Model & Bohr\'s Quantum Model of Hydrogen', titleHi: 'रदरफोर्ड मॉडल, बोर का हाइड्रोजन परमाणु मॉडल', id: 'c11-chem-ch2-t1', dur: '16 min' },
      { part: 2, titleEn: 'Dual Nature of Matter (de Broglie Relation) & Heisenberg Uncertainty Principle', titleHi: 'द्रव्य की द्वैत प्रकृति (डी ब्रॉग्ली) व हाइजेनबर्ग अनिश्चितता सिद्धांत', id: 'c11-chem-ch2-t2', dur: '17 min' },
      { part: 3, titleEn: 'Quantum Mechanical Model: Orbitals, Quantum Numbers (n, l, m_l, m_s), Aufbau Principle & Hund\'s Rule', titleHi: 'क्वांटम संख्याएं, ऑफबाऊ नियम, पाउली अपवर्जन व हुंड का नियम', id: 'c11-chem-ch2-t3', dur: '17 min' }
    ],
    practicalActivity: {
      title: 'Flame Test for Qualitative Identification of Metal Cations',
      materials: ['Platinum or nichrome wire loop', 'Concentrated HCl in watch glass', 'Bunsen burner', 'Salts of Sodium (NaCl), Potassium (KCl), Calcium (CaCl2), and Copper (CuSO4)'],
      procedure: [
        'Clean nichrome wire loop in concentrated HCl and heat in non-luminous flame until no color is imparted.',
        'Dip wire into paste of test salt with concentrated HCl.',
        'Hold in non-luminous outer oxidizing flame and observe characteristic emission color (Na = Golden Yellow, K = Lilac/Violet, Ca = Brick Red, Cu = Greenish Blue).'
      ],
      safety: 'Concentrated HCl emits corrosive fumes; work in well-ventilated fume hood with safety goggles.',
      realWorldApplication: 'Pyrotechnic formulation in fireworks manufacturing and spectroscopic elemental analysis.'
    },
    keyPoints: [
      'Bohr model assumes quantized angular momentum m*v*r = n*h / (2*pi).',
      'Heisenberg Uncertainty Principle states it is impossible to determine simultaneously both position and momentum of a subatomic particle with arbitrary precision.',
      'Aufbau principle dictates that orbitals are filled in order of increasing (n + l) energy values.'
    ],
    formulas: [
      { name: 'de Broglie Wavelength', formula: 'lambda = h / p = h / (m * v)', desc: 'Wavelength associated with a moving particle with momentum p' },
      { name: 'Heisenberg Uncertainty Relation', formula: 'Delta x * Delta p >= h / (4 * pi)', desc: 'Conjugate product of position and momentum uncertainties' },
      { name: 'Rydberg Formula', formula: '1 / lambda = R_H * (1 / n1^2 - 1 / n2^2)', desc: 'Wavenumber of spectral emission lines for hydrogen atom' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the de Broglie wavelength of an electron moving with a velocity of 2.05 x 10^7 m/s (mass of electron = 9.11 x 10^-31 kg, h = 6.626 x 10^-34 J s).',
        sol: 'lambda = h / (m * v) = (6.626 x 10^-34) / (9.11 x 10^-31 * 2.05 x 10^7) = 6.626 x 10^-34 / 1.8675 x 10^-23 = 3.55 x 10^-11 m = 0.0355 nm.'
      }
    ]
  },
  {
    num: 3,
    titleEn: 'Classification of Elements and Periodicity in Properties',
    titleHi: 'तत्वों का वर्गीकरण एवं गुणधर्मों में आवर्तिता',
    duration: '44 min',
    oneShotId: null,
    unitName: 'Unit III: Periodicity',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Modern Periodic Law, Long Form Periodic Table & IUPAC Nomenclature (Z > 100)', titleHi: 'आधुनिक आवर्त नियम एवं दीर्घ आवर्त सारणी', id: 'c11-chem-ch3-t1', dur: '14 min' },
      { part: 2, titleEn: 'Periodic Trends: Atomic & Ionic Radii, Ionization Enthalpy & Electron Gain Enthalpy', titleHi: 'परमाणु व आयनिक त्रिज्या, आयनन एन्थैल्पी व इलेक्ट्रॉन लब्धि एन्थैल्पी', id: 'c11-chem-ch3-t2', dur: '15 min' },
      { part: 3, titleEn: 'Electronegativity (Pauling Scale), Valence States & Anomalous Behavior of Second Period Elements', titleHi: 'विद्युतऋणात्मकता, संयोजकता व द्वितीय आवर्त के तत्वों का असंगत व्यवहार', id: 'c11-chem-ch3-t3', dur: '15 min' }
    ],
    practicalActivity: {
      title: 'Comparative Study of Reactivity of Metals with Dilute Hydrochloric Acid',
      materials: ['Test tubes', 'Test tube stand', 'Dilute 1M HCl', 'Clean strips of Magnesium (Mg), Zinc (Zn), Iron (Fe), and Copper (Cu)'],
      procedure: [
        'Add 5 mL of dilute HCl into four clean test tubes labeled Mg, Zn, Fe, Cu.',
        'Drop equal surface-area metal strips into each tube and observe the rate of hydrogen effervescence.',
        'Confirm reactivity order: Mg > Zn > Fe > Cu (Cu shows zero reaction at room temperature).'
      ],
      safety: 'Hydrogen gas is flammable; keep away from open flames and wear eye protection.',
      realWorldApplication: 'Galvanization of steel and designing cathodic protection systems for oil pipelines.'
    },
    keyPoints: [
      'Modern Periodic Law states that the physical and chemical properties of elements are periodic functions of their atomic numbers.',
      'Ionization enthalpy decreases down a group due to increased shielding and increases across a period due to increased effective nuclear charge Z_eff.',
      'Nitrogen has higher first ionization enthalpy than Oxygen due to extra stability of half-filled 2p^3 subshell.'
    ],
    formulas: [
      { name: 'Effective Nuclear Charge', formula: 'Z_eff = Z - sigma', desc: 'Slater\'s rule for screening constant sigma' },
      { name: 'Pauling Electronegativity Difference', formula: '|X_A - X_B| = 0.208 * sqrt(Delta)', desc: 'Bond polarity from resonance energy Delta in kcal/mol' }
    ],
    solvedQuestions: [
      {
        q: 'Why is the electron gain enthalpy of Chlorine more negative (-349 kJ/mol) than that of Fluorine (-328 kJ/mol)?',
        sol: 'Fluorine has an extremely compact 2p subshell (n = 2). When an electron enters the compact 2p orbital, it experiences intense interelectronic repulsion. In Chlorine, the incoming electron enters the larger 3p subshell with significantly lower electron-electron repulsion, releasing more energy.'
      }
    ]
  },
  {
    num: 4,
    titleEn: 'Chemical Bonding and Molecular Structure',
    titleHi: 'रासायनिक आबंधन तथा आण्विक संरचना',
    duration: '52 min',
    oneShotId: null,
    unitName: 'Unit IV: Chemical Bonding',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'Kössell-Lewis Approach, Ionic Bond, Lattice Enthalpy & Born-Haber Cycle', titleHi: 'आयनिक बंध, जालक एन्थैल्पी व बॉर्न-हैबर चक्र', id: 'c11-chem-ch4-t1', dur: '17 min' },
      { part: 2, titleEn: 'VSEPR Theory & Prediction of Molecular Geometries (Linear, Trigonal, Tetrahedral, Bent, Octahedral)', titleHi: 'VSEPR सिद्धांत एवं आण्विक ज्यामिति', id: 'c11-chem-ch4-t2', dur: '17 min' },
      { part: 3, titleEn: 'Valence Bond Theory, Hybridization (sp, sp2, sp3, dsp2, sp3d2) & Molecular Orbital Theory (MOT)', titleHi: 'संकरण सिद्धांत (sp, sp2, sp3) एवं आण्विक कक्षक सिद्धांत (MOT)', id: 'c11-chem-ch4-t3', dur: '18 min' }
    ],
    practicalActivity: {
      title: 'Ascending Paper Chromatography of Colored Plant Pigments or Ink Dyes',
      materials: ['Whatman No. 1 filter paper strip', 'Chromatographic jar with lid', 'Capillary tube', 'Solvent mixture (Isopropanol:Water 8:2)', 'Black or green fountain pen ink'],
      procedure: [
        'Draw a light pencil baseline 2 cm from bottom of chromatography paper.',
        'Spot concentrated ink solution using a fine capillary tube and allow to dry.',
        'Suspend paper in developing chamber ensuring solvent level is 1 cm below the pencil line.',
        'Allow solvent front to rise to near top, remove, mark solvent front, and calculate Retention Factor (R_f = distance travelled by solute / distance travelled by solvent).'
      ],
      safety: 'Flammable organic solvent; keep chromatographic jar tightly sealed away from sparks.',
      realWorldApplication: 'Forensic ink analysis in criminal investigations and pharmaceutical purity testing.'
    },
    keyPoints: [
      'Repulsion order in VSEPR theory: Lone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair.',
      'Bond order in MOT equals (N_b - N_a) / 2. A positive bond order indicates a stable molecule.',
      'Paramagnetism in O2 is definitively explained by MOT due to two unpaired electrons in antibonding pi*(2p_x) and pi*(2p_y) orbitals.'
    ],
    formulas: [
      { name: 'Molecular Orbital Bond Order', formula: 'Bond Order = (N_b - N_a) / 2', desc: 'Half difference between bonding and antibonding electrons' },
      { name: 'Dipole Moment', formula: 'mu = q * d', desc: 'Product of charge separation and internuclear distance (Debye)' }
    ],
    solvedQuestions: [
      {
        q: 'Using Molecular Orbital Theory, determine the bond order and magnetic nature of O2 molecule.',
        sol: 'Total electrons in O2 = 16. MO configuration: sigma1s^2 sigma*1s^2 sigma2s^2 sigma*2s^2 sigma2p_z^2 (pi2p_x^2 = pi2p_y^2) (pi*2p_x^1 = pi*2p_y^1). N_b = 10, N_a = 6. Bond Order = (10 - 6) / 2 = 2. Since two unpaired electrons exist in the degenerate pi* antibonding orbitals, O2 is paramagnetic.'
      }
    ]
  },
  {
    num: 5,
    titleEn: 'Chemical Thermodynamics',
    titleHi: 'ऊष्मागतिकी',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit V: Thermodynamics',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'First Law of Thermodynamics: System & Surroundings, State Functions, Internal Energy (U), Work (w) & Heat (q)', titleHi: 'ऊष्मागतिकी का प्रथम नियम: आंतरिक ऊर्जा, कार्य व ऊष्मा', id: 'c11-chem-ch5-t1', dur: '16 min' },
      { part: 2, titleEn: 'Enthalpy (H), Heat Capacities (Cp - Cv = R), Enthalpy of Reaction & Hess\'s Law', titleHi: 'एन्थैल्पी (H), ऊष्मा धारिता व हेस का स्थिर ऊष्मा संकलन नियम', id: 'c11-chem-ch5-t2', dur: '16 min' },
      { part: 3, titleEn: 'Second Law of Thermodynamics: Spontaneity, Entropy (S), Gibbs Free Energy (Delta G) & Equilibrium', titleHi: 'द्वितीय नियम: स्वतःप्रवर्तिता, एन्ट्रॉपी (S) एवं गिब्स मुक्त ऊर्जा (Delta G)', id: 'c11-chem-ch5-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Determination of Enthalpy of Neutralization of Strong Acid (HCl) with Strong Base (NaOH)',
      materials: ['Insulated polystyrene calorimeter with stirrer', '0.1°C precision thermometer', '1.0 M HCl solution (100 mL)', '1.0 M NaOH solution (100 mL)', 'Graduated measuring cylinders'],
      procedure: [
        'Measure 100 mL of 1.0 M HCl into the calorimeter and record initial temperature T1.',
        'Measure 100 mL of 1.0 M NaOH into a separate beaker and record initial temperature T2.',
        'Quickly pour NaOH into calorimeter, stir constantly, and record the maximum final temperature T3.',
        'Calculate heat released q = (m_total * c * Delta T) + (W * Delta T) and enthalpy of neutralization Delta H_neut.'
      ],
      safety: 'Corrosive acids and alkalis; wear laboratory apron, safety glasses, and chemical-resistant gloves.',
      realWorldApplication: 'Bomb calorimetry in food nutritional calorie determination and thermal engineering in chemical reactors.'
    },
    keyPoints: [
      'First Law: Delta U = q + w. For expansion work against constant external pressure, w = -P_ext * Delta V.',
      'Hess\'s Law states that total enthalpy change for a chemical reaction is independent of the pathway taken.',
      'A reaction is spontaneous at constant temperature and pressure if and only if Delta G < 0.'
    ],
    formulas: [
      { name: 'First Law of Thermodynamics', formula: 'Delta U = q - P_ext * Delta V', desc: 'Internal energy change with pressure-volume work' },
      { name: 'Enthalpy-Internal Energy Relation', formula: 'Delta H = Delta U + Delta n_g * R * T', desc: 'Enthalpy change in gaseous reactions where Delta n_g = n_p(g) - n_r(g)' },
      { name: 'Gibbs-Helmholtz Equation', formula: 'Delta G = Delta H - T * Delta S', desc: 'Spontaneity criterion at constant T and P' },
      { name: 'Standard Gibbs Free Energy & Equilibrium', formula: 'Delta G° = -2.303 * R * T * log10(K)', desc: 'Relation between standard free energy and equilibrium constant K' }
    ],
    solvedQuestions: [
      {
        q: 'For the reaction N2(g) + 3H2(g) -> 2NH3(g), calculate Delta H - Delta U at 298 K (R = 8.314 J/(mol K)).',
        sol: 'Delta n_g = moles of gaseous products - moles of gaseous reactants = 2 - (1 + 3) = -2. Using Delta H = Delta U + Delta n_g * R * T: Delta H - Delta U = Delta n_g * R * T = (-2 mol) * (8.314 J/(mol K)) * (298 K) = -4955.1 J = -4.96 kJ.'
      }
    ]
  },
  {
    num: 6,
    titleEn: 'Equilibrium',
    titleHi: 'साम्यावस्था',
    duration: '52 min',
    oneShotId: null,
    unitName: 'Unit VI: Equilibrium',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Dynamic Nature of Equilibrium, Law of Chemical Equilibrium, Kc and Kp Relations', titleHi: 'रासायनिक साम्य, द्रव्य अनुपाती क्रिया नियम, Kc व Kp में संबंध', id: 'c11-chem-ch6-t1', dur: '17 min' },
      { part: 2, titleEn: 'Le Chatelier\'s Principle: Effect of Concentration, Pressure, Temperature & Catalyst on Chemical Equilibrium', titleHi: 'ला-शातेलिए का सिद्धांत एवं साम्य को प्रभावित करने वाले कारक', id: 'c11-chem-ch6-t2', dur: '17 min' },
      { part: 3, titleEn: 'Ionic Equilibrium: Acids & Bases (Arrhenius, Brønsted-Lowry, Lewis), pH, Hydrolysis of Salts, Buffers & K_sp', titleHi: 'आयनिक साम्य: अम्ल-क्षार, pH मान, बफर विलयन एवं विलेयता गुणनफल (K_sp)', id: 'c11-chem-ch6-t3', dur: '18 min' }
    ],
    practicalActivity: {
      title: 'Study of Shift in Equilibrium between Ferric and Thiocyanate Ions',
      materials: ['0.002 M FeCl3 solution', '0.002 M KSCN solution', 'Solid KCl', 'Test tubes and rack', 'Distilled water'],
      procedure: [
        'Mix 5 mL of FeCl3 and 5 mL of KSCN to prepare blood-red [Fe(SCN)]2+ solution and divide equally into 4 test tubes.',
        'Tube 1 serves as control reference.',
        'Add 2 mL of 0.1 M FeCl3 to Tube 2: color deepens red (equilibrium shifts right due to added reactant).',
        'Add solid KCl to Tube 3: red color lightens (equilibrium shifts left as Fe3+ is consumed by complexation).'
      ],
      safety: 'Thiocyanate generates toxic cyanide gases if exposed to concentrated strong acids; handle with care.',
      realWorldApplication: 'Industrial optimization of Haber process ammonia synthesis and blood oxygenation buffer kinetics.'
    },
    keyPoints: [
      'Relationship between Kp and Kc: Kp = Kc * (R*T)^(Delta n_g).',
      'Le Chatelier\'s principle: when an equilibrium system is subjected to change in T, P, or C, the system shifts in the direction that counteracts the applied change.',
      'Buffer solutions resist changes in pH on addition of small amounts of strong acid or alkali; Henderson-Hasselbalch equation describes their pH.'
    ],
    formulas: [
      { name: 'Equilibrium Relation', formula: 'Kp = Kc * (R * T)^(Delta n_g)', desc: 'Pressure equilibrium constant in terms of molar concentration' },
      { name: 'pH Definition', formula: 'pH = -log10[H3O+]', desc: 'Logarithmic measure of hydrogen ion molarity' },
      { name: 'Henderson-Hasselbalch Acidic Buffer', formula: 'pH = pKa + log10([Salt] / [Acid])', desc: 'Buffer pH computation' },
      { name: 'Solubility Product Equilibrium', formula: 'K_sp = [M^(n+)]^x * [A^(m-)]^y', desc: 'Precipitation occurs if Ionic Product Q_sp > K_sp' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the pH of a buffer solution containing 0.1 M acetic acid (CH3COOH) and 0.2 M sodium acetate (CH3COONa). Given Ka for CH3COOH = 1.8 x 10^-5.',
        sol: 'pKa = -log10(1.8 x 10^-5) = 4.74. Applying Henderson-Hasselbalch equation: pH = pKa + log10([Salt] / [Acid]) = 4.74 + log10(0.2 / 0.1) = 4.74 + log10(2) = 4.74 + 0.301 = 5.04.'
      }
    ]
  },
  {
    num: 7,
    titleEn: 'Redox Reactions',
    titleHi: 'अपचयोपचय (रेडॉक्स) अभिक्रियाएं',
    duration: '42 min',
    oneShotId: null,
    unitName: 'Unit VII: Redox Reactions',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Concept of Oxidation & Reduction, Oxidation States & Oxidation Number Rules', titleHi: 'ऑक्सीकरण-अपचयन संकल्पना एवं ऑक्सीकरण संख्या नियम', id: 'c11-chem-ch7-t1', dur: '14 min' },
      { part: 2, titleEn: 'Balancing Redox Reactions: Ion-Electron (Half-Reaction) Method & Oxidation Number Method', titleHi: 'रेडॉक्स अभिक्रियाओं को संतुलित करना: आयन-इलेक्ट्रॉन विधि', id: 'c11-chem-ch7-t2', dur: '14 min' },
      { part: 3, titleEn: 'Redox Titrations, Standard Electrode Potential, Electrochemical Series & Application in Daniell Cell', titleHi: 'रेडॉक्स अनुमापन, मानक इलेक्ट्रोड विभव व वैद्युतरासायनिक श्रेणी', id: 'c11-chem-ch7-t3', dur: '14 min' }
    ],
    practicalActivity: {
      title: 'Volumetric Titration of KMnO4 with Standard Mohr\'s Salt Solution',
      materials: ['Potassium permanganate (KMnO4) solution (~0.02 M)', 'Mohr\'s salt (FeSO4.(NH4)2SO4.6H2O) crystals', '2 M dilute H2SO4', '50 mL burette, 20 mL pipette, 250 mL conical flask'],
      procedure: [
        'Pipette 20 mL of 0.05 M freshly prepared standard Mohr\'s salt solution into conical flask.',
        'Add one test tube (~20 mL) of 2 M dilute H2SO4 to maintain strong acidic medium.',
        'Titrate against KMnO4 solution from burette until a permanent faint pink color persists (KMnO4 acts as self-indicator).',
        'Record concordant titer value and calculate exact molarity of KMnO4 using 5 * M1 * V1 = 1 * M2 * V2.'
      ],
      safety: 'KMnO4 is a powerful oxidizer and stains skin/clothing; do not use HCl (it oxidizes to Cl2 gas).',
      realWorldApplication: 'Determining chemical oxygen demand (COD) in wastewater treatment and metallurgical iron assays.'
    },
    keyPoints: [
      'Oxidation is loss of electrons (increase in oxidation number); Reduction is gain of electrons (decrease in oxidation number).',
      'In balancing acidic redox half-reactions, oxygen atoms are balanced using H2O, and hydrogen atoms are balanced using H+ ions.',
      'A positive standard cell potential E°cell indicates that the redox reaction is thermodynamically favorable under standard states.'
    ],
    formulas: [
      { name: 'Oxidation State Conservation', formula: 'Total Increase in ON = Total Decrease in ON', desc: 'Stoichiometric electron transfer condition' },
      { name: 'Standard EMF of Cell', formula: 'E°_cell = E°_cathode - E°_anode', desc: 'Difference between reduction potentials of cathode and anode' }
    ],
    solvedQuestions: [
      {
        q: 'Balance the redox reaction in acidic medium: MnO4^- + Fe^(2+) -> Mn^(2+) + Fe^(3+).',
        sol: 'Reduction half-reaction: MnO4^- + 8H^+ + 5e^- -> Mn^(2+) + 4H2O. Oxidation half-reaction: Fe^(2+) -> Fe^(3+) + e^-. Multiplying oxidation half-reaction by 5 and adding: MnO4^- + 5Fe^(2+) + 8H^+ -> Mn^(2+) + 5Fe^(3+) + 4H2O. Both mass and charge (+17 on both sides) are perfectly balanced.'
      }
    ]
  },
  {
    num: 8,
    titleEn: 'Organic Chemistry: Some Basic Principles and Techniques',
    titleHi: 'कार्बनिक रसायन: कुछ आधारभूत सिद्धांत तथा तकनीकें',
    duration: '54 min',
    oneShotId: null,
    unitName: 'Unit VIII: Organic Chemistry',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Tetravalence of Carbon, Hybridization, IUPAC Nomenclature & Structural/Stereo Isomerism', titleHi: 'कार्बन की चतुःसंयोजकता, संकरण, IUPAC नामकरण व समावयवता', id: 'c11-chem-ch8-t1', dur: '18 min' },
      { part: 2, titleEn: 'Electronic Displacements in Covalent Bonds: Inductive (+I, -I), Electromeric, Resonance (+R, -R) & Hyperconjugation', titleHi: 'सहसंयोजक आबंध में इलेक्ट्रॉन विस्थापन: प्रेरणिक, अनुनाद व अतिसंयुग्मन प्रभाव', id: 'c11-chem-ch8-t2', dur: '18 min' },
      { part: 3, titleEn: 'Reactive Intermediates (Carbocations, Carbanions, Free Radicals), Fission Types & Qualitative Elemental Analysis', titleHi: 'मध्यवर्ती (कार्बधनायन, कार्बऋणायन, मुक्त मूलक) एवं लेसाने परीक्षण', id: 'c11-chem-ch8-t3', dur: '18 min' }
    ],
    practicalActivity: {
      title: 'Lassaigne\'s Sodium Fusion Test for Detection of Nitrogen, Sulfur, and Halogens',
      materials: ['Metallic sodium piece', 'Ignition tube', 'Organic compound', 'Distilled water in porcelain dish', 'Freshly prepared FeSO4, dilute H2SO4, FeCl3, and AgNO3'],
      procedure: [
        'Fuse small dry sodium metal with organic compound in ignition tube until red hot, then plunge into 10 mL distilled water.',
        'Boil, filter, and use Lassaigne\'s filtrate for qualitative tests.',
        'Test for Nitrogen: Boil filtrate with FeSO4, acidify with dilute H2SO4, add drops of FeCl3 -> Prussian blue color [Fe4[Fe(CN)6]3] confirms Nitrogen.',
        'Test for Halogens: Acidify with dilute HNO3, add AgNO3 -> Curdy white precipitate soluble in NH4OH confirms Chlorine.'
      ],
      safety: 'Sodium metal reacts violently with moisture; handle strictly with forceps, never touch with bare fingers.',
      realWorldApplication: 'Drug quality assurance in pharmaceutical synthesis and purity screening of organic intermediates.'
    },
    keyPoints: [
      'Carbocation stability order: 3° > 2° > 1° > methyl carbocation, governed by hyperconjugation (alpha C-H sigma bonds) and +I inductive effect.',
      'Electrophiles are electron-deficient species (Lewis acids like NO2+, AlCl3); Nucleophiles are electron-rich species (Lewis bases like OH-, NH3).',
      'Hyperconjugation is a no-bond resonance involving delocalization of sigma electrons of C-H bond of an alkyl group directly attached to an atom of unsaturated system or atom with unshared p orbital.'
    ],
    formulas: [
      { name: 'Kjeldahl Nitrogen Estimation', formula: '%N = (1.4 * M * V_acid) / m_sample', desc: 'Quantitative estimation of nitrogen in organic compounds' },
      { name: 'Carius Halogen Estimation', formula: '%Cl = (35.5 / 143.5) * (m_AgCl / m_sample) * 100', desc: 'Quantitative halogen determination via silver halide precipitation' }
    ],
    solvedQuestions: [
      {
        q: 'Arrange the following carbocations in order of increasing stability and explain: (CH3)3C^+, (CH3)2CH^+, CH3CH2^+, CH3^+.',
        sol: 'Order: CH3^+ < CH3CH2^+ < (CH3)2CH^+ < (CH3)3C^+. Explanation: (CH3)3C^+ (tert-butyl) possesses 9 alpha-hydrogens providing 9 hyperconjugative structures along with +I electron donation from three methyl groups, maximally dispersing the positive charge. In contrast, CH3^+ has zero alpha-hydrogens and zero +I stabilization.'
      }
    ]
  },
  {
    num: 9,
    titleEn: 'Hydrocarbons',
    titleHi: 'हाइड्रोकार्बन',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit IX: Hydrocarbons',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Alkanes: Conformations of Ethane (Sawhorse & Newman), Preparation & Free-Radical Halogenation Mechanism', titleHi: 'ऐल्केन: एथेन के संरूपण (न्यूमैन व सॉहॉर्स) व हैलोजनीकरण क्रियाविधि', id: 'c11-chem-ch9-t1', dur: '16 min' },
      { part: 2, titleEn: 'Alkenes: Geometrical Isomerism (cis/trans), Preparation & Electrophilic Addition (Markovnikov & Peroxide Effect)', titleHi: 'ऐल्कीन: ज्यामितीय समावयवता, मार्कोनीकॉफ नियम व परॉक्साइड प्रभाव', id: 'c11-chem-ch9-t2', dur: '17 min' },
      { part: 3, titleEn: 'Alkynes & Arenes: Acidity of Alkynes, Benzene Structure, Aromaticity (Hückel\'s Rule) & Electrophilic Substitution', titleHi: 'ऐल्काइन व ऐरीन: बेन्जीन संरचना, हकल एरोमैटिकता नियम व इलेक्ट्रॉनोंरागी प्रतिस्थापन', id: 'c11-chem-ch9-t3', dur: '17 min' }
    ],
    practicalActivity: {
      title: 'Distinction between Saturated and Unsaturated Hydrocarbons (Bromine Water & Baeyer\'s Test)',
      materials: ['Cyclohexane or liquid paraffin (saturated)', 'Cyclohexene or cooking oil (unsaturated)', 'Bromine water (Br2 in CCl4 or H2O)', 'Alkaline potassium permanganate (Baeyer\'s reagent)', 'Test tubes'],
      procedure: [
        'Add 1 mL of test hydrocarbon to 1 mL of bromine water in two separate test tubes and shake vigorously.',
        'Unsaturated hydrocarbons decolorize the orange-red bromine water immediately without heating.',
        'Repeat with alkaline 1% KMnO4 solution (Baeyer\'s reagent): unsaturated compounds decolorize purple KMnO4 with brown MnO2 precipitate.'
      ],
      safety: 'Bromine vapor causes severe respiratory burns; handle exclusively in a fume cupboard.',
      realWorldApplication: 'Determining iodine value and unsaturation index in edible cooking oils and biofuel processing.'
    },
    keyPoints: [
      'Staggered conformation of ethane is more stable than eclipsed conformation by 12.5 kJ/mol due to minimum torsional strain.',
      'Markovnikov\'s rule: in electrophilic addition of an unsymmetrical reagent HX to an unsymmetrical alkene, the negative part (X-) attaches to the carbon possessing fewer hydrogen atoms.',
      'Hückel\'s Rule of Aromaticity: a planar, cyclic, completely conjugated system with (4n + 2) pi electrons displays extraordinary aromatic stabilization.'
    ],
    formulas: [
      { name: 'Hückel\'s Aromaticity Rule', formula: 'Number of pi electrons = 4n + 2 (where n = 0, 1, 2, 3...)', desc: 'Criteria for aromatic stability in planar monocyclic ring systems' },
      { name: 'Wurtz Alkane Synthesis', formula: '2 R-X + 2 Na --(dry ether)--> R-R + 2 NaX', desc: 'Coupling of alkyl halides to form symmetrical higher alkanes' }
    ],
    solvedQuestions: [
      {
        q: 'Predict the major organic product when propene reacts with HBr in (a) absence of peroxide, (b) presence of benzoyl peroxide.',
        sol: '(a) In absence of peroxide: proceeds via ionic electrophilic addition following Markovnikov\'s rule through the more stable 2° carbocation (CH3-CH^+-CH3) to yield 2-bromopropane as major product. (b) In presence of benzoyl peroxide: proceeds via free radical mechanism (Kharasch effect) through the more stable 2° free radical (CH3-CH*-CH2Br) to yield 1-bromopropane as major product.'
      }
    ]
  }
];

export const CBSE_CLASS_12_CHEMISTRY = [
  {
    num: 1,
    titleEn: 'Solutions',
    titleHi: 'विलयन',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit I: Solutions',
    unitNumber: 1,
    topics: [
      { part: 1, titleEn: 'Types of Solutions, Expressing Concentration (Molarity, Molality, Mole Fraction) & Henry\'s Law of Gas Solubility', titleHi: 'विलयन के प्रकार, सांद्रता पद (मोलरता, मोललता) व हेनरी का नियम', id: 'c12-chem-ch1-t1', dur: '16 min' },
      { part: 2, titleEn: 'Vapour Pressure of Liquid Solutions, Raoult\'s Law, Ideal & Non-Ideal Solutions (Positive & Negative Deviations)', titleHi: 'वाष्प दाब, राउल्ट का नियम, आदर्श व अनादर्श विलयन (धनात्मक व ऋणात्मक विचलन)', id: 'c12-chem-ch1-t2', dur: '16 min' },
      { part: 3, titleEn: 'Colligative Properties: Relative Lowering of Vapour Pressure, Elevation of Boiling Point, Depression of Freezing Point, Osmotic Pressure & Van \'t Hoff Factor (i)', titleHi: 'अणुसंख्य गुणधर्म: क्वथनांक उन्नयन, हिमांक अवनमन, परासरण दाब व वॉन्ट हॉफ गुणक (i)', id: 'c12-chem-ch1-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Determination of Molecular Mass of Non-Volatile Solute by Elevation in Boiling Point',
      materials: ['Landsberger boiling point apparatus or Cottrell apparatus', 'Beckmann precision differential thermometer', 'Pure solvent (water or acetone)', 'Non-volatile solute (urea or sucrose)', 'Heating mantle'],
      procedure: [
        'Determine the exact normal boiling point T_b° of pure solvent.',
        'Dissolve a known mass w_B (e.g. 5.0 g) of non-volatile solute into known mass w_A (100 g) of solvent.',
        'Measure the elevated boiling point T_b of the resulting solution.',
        'Calculate Delta T_b = T_b - T_b° and compute molar mass M_B = (1000 * K_b * w_B) / (Delta T_b * w_A).'
      ],
      safety: 'Boiling organic liquids pose fire hazards; use electric heating mantles instead of open flames.',
      realWorldApplication: 'Formulation of automotive antifreeze solutions (ethylene glycol in water) and hemodialysis fluid preparation.'
    },
    keyPoints: [
      'Henry\'s Law: p = K_H * x. The higher the K_H value at a given temperature, the lower the solubility of the gas in the liquid.',
      'Non-ideal solutions showing positive deviation (e.g. Ethanol + Acetone) form minimum-boiling azeotropes; those showing negative deviation (e.g. Acetone + Chloroform) form maximum-boiling azeotropes.',
      'Van \'t Hoff factor i = (Normal molar mass) / (Abnormal molar mass) = 1 + (n - 1)*alpha for dissociation.'
    ],
    formulas: [
      { name: 'Henry\'s Law', formula: 'p = K_H * x', desc: 'Partial pressure of gas over solution proportional to its mole fraction' },
      { name: 'Raoult\'s Law for Volatile Binary Mixture', formula: 'P_total = p_A + p_B = p_A° * x_A + p_B° * x_B', desc: 'Vapour pressure of ideal solution' },
      { name: 'Elevation in Boiling Point', formula: 'Delta T_b = i * K_b * m = i * K_b * (1000 * w_B) / (M_B * w_A)', desc: 'Ebullioscopic constant relation' },
      { name: 'Depression in Freezing Point', formula: 'Delta T_f = i * K_f * m = i * K_f * (1000 * w_B) / (M_B * w_A)', desc: 'Cryoscopic constant relation' },
      { name: 'Osmotic Pressure', formula: 'pi = i * C * R * T = i * (n_B / V) * R * T', desc: 'Pressure required to stop osmosis' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the freezing point of a solution containing 18 g of glucose (C6H12O6, M = 180 g/mol) dissolved in 200 g of water. K_f for water = 1.86 K kg/mol.',
        sol: 'Moles of glucose n_B = 18 / 180 = 0.1 mol. Mass of water w_A = 200 g = 0.2 kg. Molality m = 0.1 / 0.2 = 0.5 mol/kg. For glucose (non-electrolyte), i = 1. Delta T_f = K_f * m = 1.86 * 0.5 = 0.93 K. Freezing point of solution T_f = 0°C - 0.93°C = -0.93°C (272.22 K).'
      }
    ]
  },
  {
    num: 2,
    titleEn: 'Electrochemistry',
    titleHi: 'वैद्युतरसायन',
    duration: '52 min',
    oneShotId: null,
    unitName: 'Unit II: Electrochemistry',
    unitNumber: 2,
    topics: [
      { part: 1, titleEn: 'Galvanic Cells, Standard Electrode Potentials & Nernst Equation (EMF Calculation at 298 K)', titleHi: 'गैल्वेनिक सेल, मानक इलेक्ट्रोड विभव एवं नर्नस्ट समीकरण', id: 'c12-chem-ch2-t1', dur: '17 min' },
      { part: 2, titleEn: 'Conductance in Electrolytic Solutions, Specific (kappa) & Molar Conductivity (Lambda_m), Kohlrausch\'s Law', titleHi: 'वैद्युतअपघटनी चालकता, मोलर चालकता एवं कोलराउश का नियम', id: 'c12-chem-ch2-t2', dur: '17 min' },
      { part: 3, titleEn: 'Electrolysis, Faraday\'s Laws, Commercial Batteries (Lead-Acid, Dry Cell) & Fuel Cells', titleHi: 'वैद्युतअपघटन, फैराडे के नियम, बैटरी व ईंधन सेल', id: 'c12-chem-ch2-t3', dur: '18 min' }
    ],
    practicalActivity: {
      title: 'Measurement of EMF of Daniell Cell with Varying Cu2+ and Zn2+ Concentrations',
      materials: ['Zinc strip and Copper strip', '1 M ZnSO4 and 1 M CuSO4 solutions', 'Agar-agar KCl salt bridge', 'High-impedance digital voltmeter', 'Two 100 mL beakers'],
      procedure: [
        'Place zinc strip in ZnSO4 solution (anode) and copper strip in CuSO4 solution (cathode).',
        'Connect the two half-cells with a U-tube KCl-agar salt bridge.',
        'Connect electrodes to digital voltmeter and record standard EMF: E°cell = E°(Cu2+/Cu) - E°(Zn2+/Zn) = 0.34 - (-0.76) = 1.10 V.',
        'Dilute CuSO4 to 0.1 M and 0.01 M to verify Nernst equation: Ecell decreases as Cu2+ concentration decreases.'
      ],
      safety: 'Heavy metal salts are toxic to aquatic ecosystems; dispose of solutions in designated waste carboys.',
      realWorldApplication: 'Lithium-ion battery design for electric vehicles and corrosion protection in marine infrastructure.'
    },
    keyPoints: [
      'Nernst equation connects cell potential with reaction quotient: E_cell = E°_cell - (0.0591 / n) * log10(Q) at 298 K.',
      'Kohlrausch\'s Law of Independent Migration of Ions: limiting molar conductivity of an electrolyte can be represented as sum of individual contributions of anion and cation.',
      'In lead-acid storage battery during discharge: Pb(s) + PbO2(s) + 2H2SO4(aq) -> 2PbSO4(s) + 2H2O(l), consuming sulfuric acid.'
    ],
    formulas: [
      { name: 'Nernst Equation at 298 K', formula: 'E_cell = E°_cell - (0.0591 / n) * log10(Q)', desc: 'Electrode potential under non-standard concentration conditions' },
      { name: 'Molar Conductivity', formula: 'Lambda_m = (kappa * 1000) / M', desc: 'Conductivity of solution containing 1 mole of electrolyte (S cm^2 mol^-1)' },
      { name: 'Kohlrausch\'s Law', formula: 'Lambda°_m = nu_+ * lambda°_+ + nu_- * lambda°_-', desc: 'Limiting molar conductivity at infinite dilution' },
      { name: 'Standard Free Energy & EMF', formula: 'Delta G° = -n * F * E°_cell', desc: 'Thermodynamic maximum electrical work' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the EMF of the cell at 298 K: Mg(s) | Mg^(2+)(0.001 M) || Cu^(2+)(0.0001 M) | Cu(s). Given E°(Mg^(2+)/Mg) = -2.37 V, E°(Cu^(2+)/Cu) = +0.34 V.',
        sol: 'E°_cell = E°_cathode - E°_anode = +0.34 - (-2.37) = +2.71 V. Overall cell reaction: Mg + Cu^(2+) -> Mg^(2+) + Cu (n = 2). Applying Nernst equation: E_cell = E°_cell - (0.0591 / 2) * log10([Mg^(2+)] / [Cu^(2+)]) = 2.71 - 0.02955 * log10(0.001 / 0.0001) = 2.71 - 0.02955 * log10(10) = 2.71 - 0.02955 * 1 = 2.68 V.'
      }
    ]
  },
  {
    num: 3,
    titleEn: 'Chemical Kinetics',
    titleHi: 'रासायनिक बलगतिकी',
    duration: '46 min',
    oneShotId: null,
    unitName: 'Unit III: Chemical Kinetics',
    unitNumber: 3,
    topics: [
      { part: 1, titleEn: 'Rate of Reaction (Average & Instantaneous), Factors Influencing Rate, Rate Law & Rate Constant (k)', titleHi: 'अभिक्रिया का वेग, वेग नियम व विशिष्ट वेग नियतांक', id: 'c12-chem-ch3-t1', dur: '15 min' },
      { part: 2, titleEn: 'Order and Molecularity, Integrated Rate Equations for Zero & First-Order Reactions, Half-Life Period (t_1/2)', titleHi: 'अभिक्रिया की कोटि व आण्विकता, शून्य व प्रथम कोटि के समाकलित वेग समीकरण', id: 'c12-chem-ch3-t2', dur: '15 min' },
      { part: 3, titleEn: 'Temperature Dependence of Reaction Rate, Arrhenius Equation (k = A*e^(-Ea/RT)) & Collision Theory', titleHi: 'आरहेनियस समीकरण, सक्रियण ऊर्जा (Ea) एवं संघट्ट सिद्धांत', id: 'c12-chem-ch3-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Study of Reaction Rate between Sodium Thiosulfate and Hydrochloric Acid',
      materials: ['0.1 M Na2S2O3 solution', '1 M HCl solution', 'Conical flasks', 'Cross-marked white paper tile', 'Stopwatch', 'Thermometer'],
      procedure: [
        'Place conical flask containing 50 mL of Na2S2O3 over a bold cross mark on white paper.',
        'Add 5 mL of 1 M HCl, start stopwatch instantly, swirl once, and look vertically through flask.',
        'Record time taken t for the cross to become completely invisible due to colloidal sulfur precipitation (Na2S2O3 + 2HCl -> 2NaCl + SO2 + S(s) + H2O).',
        'Repeat at 30°C, 40°C, 50°C to verify that reaction rate increases exponentially with temperature.'
      ],
      safety: 'Sulfur dioxide (SO2) gas is emitted; persons with asthma must avoid inhaling fumes; keep lab well-ventilated.',
      realWorldApplication: 'Determining shelf-life and degradation kinetics of pharmaceuticals and food products.'
    },
    keyPoints: [
      'Order of a reaction is experimentally determined and can be zero, fractional, or negative; molecularity is a theoretical whole integer (1, 2, or 3).',
      'For a first-order reaction, the half-life t_1/2 = 0.693 / k is completely independent of initial reactant concentration [A]0.',
      'Arrhenius equation reveals that as activation energy Ea increases, the rate constant k decreases, making the reaction slower.'
    ],
    formulas: [
      { name: 'Zero-Order Integrated Rate Equation', formula: 'k = ([A]0 - [A]) / t,  t_1/2 = [A]0 / (2*k)', desc: 'Rate constant unit is mol L^-1 s^-1' },
      { name: 'First-Order Integrated Rate Equation', formula: 'k = (2.303 / t) * log10([A]0 / [A]),  t_1/2 = 0.693 / k', desc: 'Rate constant unit is s^-1' },
      { name: 'Arrhenius Temperature Dependence', formula: 'log10(k2 / k1) = (E_a / (2.303 * R)) * ((T2 - T1) / (T1 * T2))', desc: 'Calculation of activation energy E_a' }
    ],
    solvedQuestions: [
      {
        q: 'A first-order reaction is found to have a rate constant k = 5.5 x 10^-14 s^-1. Find the half-life of the reaction.',
        sol: 'For a first-order reaction: t_1/2 = 0.693 / k = 0.693 / (5.5 x 10^-14 s^-1) = 1.26 x 10^13 seconds (approximately 4 x 10^5 years).'
      }
    ]
  },
  {
    num: 4,
    titleEn: 'The d- and f-Block Elements',
    titleHi: 'd- एवं f-ब्लॉक के तत्व',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit IV: d- and f-Block Elements',
    unitNumber: 4,
    topics: [
      { part: 1, titleEn: 'General Properties of Transition Metals (3d Series): Electronic Configuration, Variable Oxidation States & Metallic Character', titleHi: 'संक्रमण तत्वों के सामान्य गुण: इलेक्ट्रॉनिक विन्यास, ऑक्सीकरण अवस्थाएं', id: 'c12-chem-ch4-t1', dur: '16 min' },
      { part: 2, titleEn: 'Catalytic Properties, Colored Ion Formation, Interstitial Compounds, Alloy Formation & Magnetic Moment (mu = sqrt(n(n+2)))', titleHi: 'उत्प्रेरकीय गुण, रंगीन आयन निर्माण व चुंबकीय आघूर्ण', id: 'c12-chem-ch4-t2', dur: '16 min' },
      { part: 3, titleEn: 'Preparation & Strong Oxidizing Action of K2Cr2O7 and KMnO4; Lanthanoid Contraction and Consequences', titleHi: 'K2Cr2O7 व KMnO4 का विरचन व ऑक्सीकारक गुण; लैन्थेनॉइड आकुंचन', id: 'c12-chem-ch4-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Redox Reactions and Color Transformations of Potassium Dichromate (K2Cr2O7)',
      materials: ['K2Cr2O7 solution', 'Dilute H2SO4', 'Sodium sulfite (Na2SO3) or Mohr\'s salt', 'NaOH solution', 'Test tubes'],
      procedure: [
        'Observe orange color of acidified K2Cr2O7 solution due to Cr2O7^(2-) dichromate ions.',
        'Add dilute NaOH: solution turns bright yellow due to shift to chromate CrO4^(2-) ions (Cr2O7^2- + 2OH- -> 2CrO4^2- + H2O).',
        'Re-acidify with H2SO4: yellow color reverts to orange.',
        'Add Na2SO3 to acidified orange solution: color turns deep green due to reduction of Cr(VI) to Cr(III) ions: Cr2O7^2- + 3SO3^2- + 8H+ -> 2Cr^3+(green) + 3SO4^2- + 4H2O.'
      ],
      safety: 'Hexavalent chromium (Cr VI) is a verified carcinogen and skin allergen; wear nitrile gloves and handle with extreme care.',
      realWorldApplication: 'Industrial chrome tanning of leather, breathalyzer alcohol detection, and corrosion-resistant superalloys.'
    },
    keyPoints: [
      'Transition metals exhibit variable oxidation states because the energy difference between (n-1)d and ns subshells is extremely small.',
      'Spin-only magnetic moment formula: mu = sqrt(n * (n + 2)) Bohr Magnetons (BM), where n is the number of unpaired d-electrons.',
      'Lanthanoid contraction is the steady decrease in atomic and ionic radii from Lanthanum to Lutetium caused by the poor shielding effect of 4f electrons.'
    ],
    formulas: [
      { name: 'Spin-Only Magnetic Moment', formula: 'mu = sqrt(n * (n + 2)) BM', desc: 'Bohr Magnetons calculation for unpaired electrons n' },
      { name: 'Permanganate Acidic Reduction', formula: 'MnO4^- + 8H^+ + 5e^- -> Mn^(2+) + 4H2O (E° = +1.51 V)', desc: '5-electron transfer in acidic medium' }
    ],
    solvedQuestions: [
      {
        q: 'Calculate the spin-only magnetic moment of Fe^(2+) ion in aqueous solution (Atomic number of Fe = 26).',
        sol: 'Electronic configuration of neutral Fe = [Ar] 3d^6 4s^2. For Fe^(2+) ion: [Ar] 3d^6. In d^6 configuration, filling 5 orbitals: one pair and 4 unpaired electrons (n = 4). Using mu = sqrt(n*(n+2)) = sqrt(4 * 6) = sqrt(24) = 4.90 BM.'
      }
    ]
  },
  {
    num: 5,
    titleEn: 'Coordination Compounds',
    titleHi: 'उपसहसंयोजन यौगिक',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit V: Coordination Compounds',
    unitNumber: 5,
    topics: [
      { part: 1, titleEn: 'Werner\'s Coordination Theory, Ligands (Monodentate, Chelating, Ambidentate) & IUPAC Nomenclature Rules', titleHi: 'वार्नर सिद्धांत, लिगैंड के प्रकार एवं IUPAC नामकरण', id: 'c12-chem-ch5-t1', dur: '16 min' },
      { part: 2, titleEn: 'Isomerism: Geometrical (cis/trans, fac/mer), Optical, Linkage, Coordination & Ionization Isomerism', titleHi: 'उपसहसंयोजन समावयवता: ज्यामितीय, प्रकाशिक व आयनन समावयवता', id: 'c12-chem-ch5-t2', dur: '17 min' },
      { part: 3, titleEn: 'Valence Bond Theory (VBT) vs Crystal Field Theory (CFT): Octahedral & Tetrahedral Splitting, Spectrochemical Series', titleHi: 'क्रिस्टल क्षेत्र सिद्धांत (CFT), d-कक्षकों का विपाटन एवं स्पेक्ट्रमीरासायनिक श्रेणी', id: 'c12-chem-ch5-t3', dur: '17 min' }
    ],
    practicalActivity: {
      title: 'Synthesis of Tetraamminecopper(II) Sulfate Monohydrate [Cu(NH3)4]SO4.H2O',
      materials: ['Copper(II) sulfate pentahydrate (CuSO4.5H2O)', 'Concentrated aqueous ammonia solution', 'Ethanol', 'Ice bath', 'Buchner funnel and suction flask'],
      procedure: [
        'Dissolve 4 g CuSO4.5H2O in 15 mL water in a beaker.',
        'Add concentrated ammonia solution dropwise with constant stirring until the light blue Cu(OH)2 precipitate redissolves to form a deep ultramarine blue solution.',
        'Add 20 mL of ethanol slowly to precipitate [Cu(NH3)4]SO4.H2O crystals.',
        'Cool in ice bath, filter crystals under suction, wash with ethanol, and air-dry.'
      ],
      safety: 'Concentrated ammonia vapors are strongly pungent; dispense strictly inside a functioning fume hood.',
      realWorldApplication: 'Chelation therapy using EDTA for heavy metal lead poisoning and cisplatin antitumor chemotherapy.'
    },
    keyPoints: [
      'Chelate ligands (like oxalate ox^2- and ethylenediamine en) form ring complexes that exhibit extraordinary thermodynamic chelate stability.',
      'In octahedral crystal field splitting, d-orbitals split into lower energy t2g (d_xy, d_yz, d_xz) and higher energy eg (d_x2-y2, d_z2) sets by Delta_o.',
      'Strong field ligands (like CN-, CO) cause pairing of electrons leading to low-spin inner orbital complexes, whereas weak field ligands (like F-, Cl-) form high-spin outer orbital complexes.'
    ],
    formulas: [
      { name: 'Octahedral Crystal Field Splitting', formula: 'CFSE = (-0.4 * n_t2g + 0.6 * n_eg) * Delta_o + m * P', desc: 'Crystal field stabilization energy calculation' },
      { name: 'Tetrahedral vs Octahedral Splitting', formula: 'Delta_t = (4 / 9) * Delta_o', desc: 'Tetrahedral crystal field splitting magnitude' }
    ],
    solvedQuestions: [
      {
        q: 'Write the IUPAC name and state the hybridization and magnetic nature of [Co(NH3)6]^(3+) (Atomic number of Co = 27).',
        sol: 'IUPAC Name: Hexaamminecobalt(III) ion. Oxidation state: Co^(3+) -> [Ar] 3d^6. NH3 acts as a strong field ligand in Co(III) complexes, forcing all 6 d-electrons to pair up into t2g orbitals (t2g^6 eg^0). The two vacant 3d orbitals hybridize with one 4s and three 4p orbitals yielding d^2sp^3 inner-orbital octahedral hybridization. Since all electrons are paired, the complex is diamagnetic.'
      }
    ]
  },
  {
    num: 6,
    titleEn: 'Haloalkanes and Haloarenes',
    titleHi: 'हैलोऐल्केन तथा हैलोऐरीन',
    duration: '48 min',
    oneShotId: null,
    unitName: 'Unit VI: Haloalkanes and Haloarenes',
    unitNumber: 6,
    topics: [
      { part: 1, titleEn: 'Classification, IUPAC Nomenclature & Nature of C-X Bond in Alkyl & Aryl Halides', titleHi: 'वर्गीकरण, IUPAC नामकरण एवं C-X आबंध की प्रकृति', id: 'c12-chem-ch6-t1', dur: '16 min' },
      { part: 2, titleEn: 'Nucleophilic Substitution Mechanisms: SN1 (Carbocation Intermediate, Racemization) vs SN2 (Walden Inversion)', titleHi: 'नाभिकरागी प्रतिस्थापन अभिक्रियाएं: SN1 बनाम SN2 क्रियाविधि व त्रिविम रसायन', id: 'c12-chem-ch6-t2', dur: '16 min' },
      { part: 3, titleEn: 'Elimination Reactions (Saytzeff Rule), Polyhalogen Compounds (Chloroform, Freons) & Low Reactivity of Haloarenes', titleHi: 'विलोपन अभिक्रियाएं (सेत्ज़ेफ नियम) एवं हैलोऐरीन की निम्न क्रियाशीलता', id: 'c12-chem-ch6-t3', dur: '16 min' }
    ],
    practicalActivity: {
      title: 'Distinction between Haloalkane (Alkyl Halide) and Haloarene (Aryl Halide) using Ethanolic AgNO3',
      materials: ['n-Butyl bromide (haloalkane)', 'Bromobenzene (haloarene)', 'Ethanolic silver nitrate (AgNO3) solution', 'Dilute nitric acid (HNO3)', 'Test tubes and warm water bath'],
      procedure: [
        'Add 1 mL ethanolic AgNO3 to 0.5 mL n-butyl bromide in tube A and 0.5 mL bromobenzene in tube B.',
        'Warm both tubes gently in a 60°C water bath.',
        'Tube A produces a pale yellow AgBr precipitate readily due to facile nucleophilic substitution.',
        'Tube B displays no precipitate: haloarenes are inert to nucleophilic substitution due to partial double bond character of C-X from resonance.'
      ],
      safety: 'Halogenated hydrocarbons produce hazardous vapors; handle with gloves under exhaust ventilation.',
      realWorldApplication: 'Synthesis of non-stick PTFE (Teflon) polymers and halogenated anesthetics in medical surgeries.'
    },
    keyPoints: [
      'SN2 reaction is a concerted one-step mechanism favored by 1° alkyl halides with complete Walden inversion of stereochemical configuration.',
      'SN1 reaction is a two-step mechanism via planar carbocation intermediate favored by 3° alkyl halides resulting in partial racemization.',
      'Haloarenes are extremely unreactive toward nucleophilic substitution due to: (i) resonance stabilization imparting partial double-bond character to C-Cl bond, (ii) sp2 hybridization of phenyl carbon.'
    ],
    formulas: [
      { name: 'SN2 Rate Law', formula: 'Rate = k * [R-X] * [Nu^-]', desc: 'Bimolecular second-order substitution kinetics' },
      { name: 'SN1 Rate Law', formula: 'Rate = k * [R-X]', desc: 'Unimolecular first-order substitution kinetics via carbocation' }
    ],
    solvedQuestions: [
      {
        q: 'Which compound in each of the following pairs will react faster in an SN2 reaction with OH^-: (i) CH3Br or CH3I, (ii) (CH3)3CCl or CH3Cl?',
        sol: '(i) CH3I reacts faster because iodide (I-) is a larger ion with longer, weaker C-I bond and is a significantly better leaving group than bromide (Br-). (ii) CH3Cl reacts much faster because SN2 transitions are sterically hindered; primary methyl chloride has virtually zero steric hindrance compared to bulky tertiary butyl chloride.'
      }
    ]
  },
  {
    num: 7,
    titleEn: 'Alcohols, Phenols and Ethers',
    titleHi: 'ऐल्कोहॉल, फीनॉल एवं ईथर',
    duration: '50 min',
    oneShotId: null,
    unitName: 'Unit VII: Alcohols, Phenols and Ethers',
    unitNumber: 7,
    topics: [
      { part: 1, titleEn: 'Classification, Nomenclature & Industrial Preparation of Alcohols and Phenols (from Cumene & Diazonium Salts)', titleHi: 'ऐल्कोहॉल व फीनॉल का वर्गीकरण, नामकरण एवं क्यूमीन से निर्माण', id: 'c12-chem-ch7-t1', dur: '16 min' },
      { part: 2, titleEn: 'Physical Properties, Acidity of Phenols, Esterification, Dehydration Mechanism & Oxidation Reactions', titleHi: 'भौतिक व रासायनिक गुण: फीनॉल की अम्लीय प्रकृति व निर्जलीकरण क्रियाविधि', id: 'c12-chem-ch7-t2', dur: '17 min' },
      { part: 3, titleEn: 'Ethers: Williamson Synthesis, Cleavage of C-O Bond with HX & Named Reactions (Kolbe\'s & Reimer-Tiemann)', titleHi: 'ईथर: विलियमसन संश्लेषण, C-O आबंध विदलन, कोल्बे व राइमर-टीमैन अभिक्रियाएं', id: 'c12-chem-ch7-t3', dur: '17 min' }
    ],
    practicalActivity: {
      title: 'Lucas Test for Distinguishing Primary, Secondary, and Tertiary Alcohols',
      materials: ['Lucas Reagent (anhydrous ZnCl2 dissolved in concentrated HCl)', '1-Butanol (1°)', '2-Butanol (2°)', 'tert-Butyl alcohol (3°)', 'Test tubes and stopwatch'],
      procedure: [
        'Add 2 mL of Lucas reagent to 0.5 mL of each alcohol at room temperature and shake.',
        'Tertiary alcohol turns cloudy immediately with oily alkyl chloride layer forming within seconds.',
        'Secondary alcohol produces cloudiness within 5 minutes.',
        'Primary alcohol remains completely clear at room temperature; cloudiness appears only on prolonged boiling.'
      ],
      safety: 'Lucas reagent contains anhydrous ZnCl2 and concentrated HCl which cause severe chemical burns; wear face shield.',
      realWorldApplication: 'Industrial production of aspirin (acetylsalicylic acid) via acetylation of salicylic acid and antiseptic formulation.'
    },
    keyPoints: [
      'Phenols are significantly more acidic than alcohols because phenoxide ion is stabilized by resonance delocalization of negative charge into benzene ring.',
      'Reimer-Tiemann Reaction: heating phenol with chloroform in presence of aqueous NaOH introduces an aldehyde group at ortho position to yield salicylaldehyde.',
      'Williamson ether synthesis involves SN2 attack of an alkoxide ion on an unhindered primary alkyl halide: R-O^- + R\'-X -> R-O-R\' + X^-.'
    ],
    formulas: [
      { name: 'Kolbe\'s Reaction', formula: 'C6H5OH + NaOH + CO2 (4-7 atm, 400 K) --(H+)--> 2-Hydroxybenzoic acid (Salicylic acid)', desc: 'Electrophilic carboxylation of phenoxide' },
      { name: 'Reimer-Tiemann Reaction', formula: 'C6H5OH + CHCl3 + 3 NaOH --(H+)--> Salicylaldehyde + 3 NaCl + 2 H2O', desc: 'Dichlorocarbene intermediate reaction' }
    ],
    solvedQuestions: [
      {
        q: 'Write the mechanism of acid-catalyzed dehydration of ethanol to yield ethene at 443 K.',
        sol: 'Step 1: Protonation of ethanol to form ethyloxonium ion: CH3-CH2-OH + H^+ <=> CH3-CH2-O^+H2. Step 2 (Rate-determining step): Loss of water molecule to form ethyl carbocation: CH3-CH2-O^+H2 -> CH3-CH2^+ + H2O. Step 3: Elimination of a proton from the beta-carbon by water base to regenerate catalyst and form ethene: CH3-CH2^+ -> CH2=CH2 + H^+.'
      }
    ]
  },
  {
    num: 8,
    titleEn: 'Aldehydes, Ketones and Carboxylic Acids',
    titleHi: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल',
    duration: '54 min',
    oneShotId: null,
    unitName: 'Unit VIII: Aldehydes, Ketones and Carboxylic Acids',
    unitNumber: 8,
    topics: [
      { part: 1, titleEn: 'Nomenclature, Carbonyl Nature & Preparation (Rosenmund, Stephen, Etard, Gattermann-Koch, Friedel-Crafts)', titleHi: 'कार्बोनिल समूह की संरचना एवं निर्माण विधियां (रोज़ेनमुंड, स्टीफन, ईटार्ड)', id: 'c12-chem-ch8-t1', dur: '18 min' },
      { part: 2, titleEn: 'Nucleophilic Addition Reactions, Addition-Elimination (Hydrazones, Oximes), Aldol Condensation, Cannizzaro & Haloform Tests', titleHi: 'नाभिकरागी योगज अभिक्रियाएं, ऐल्डोल संघनन, कैनिजारो व हैलोफॉर्म परीक्षण', id: 'c12-chem-ch8-t2', dur: '18 min' },
      { part: 3, titleEn: 'Carboxylic Acids: Acidity & Substituent Effects, Preparation & Key Reactions (Hell-Volhard-Zelinsky HVZ Reaction)', titleHi: 'कार्बोक्सिलिक अम्ल: अम्लीय सामर्थ्य, HVZ अभिक्रिया एवं विबोक्सिलीकरण', id: 'c12-chem-ch8-t3', dur: '18 min' }
    ],
    practicalActivity: {
      title: 'Tollens\' Silver Mirror Test and Fehling\'s Test for Distinguishing Aldehydes from Ketones',
      materials: ['Tollens\' reagent (ammoniacal silver nitrate)', 'Fehling\'s solution A (CuSO4) and Fehling\'s solution B (Rochelle salt + NaOH)', 'Acetaldehyde (aldehyde)', 'Acetone (ketone)', 'Hot water bath'],
      procedure: [
        'Add 1 mL of freshly prepared Tollens\' reagent to 0.5 mL of acetaldehyde in a clean test tube and warm in hot water bath.',
        'A brilliant shining silver mirror forms on inner glass wall due to reduction of Ag+ to metallic silver Ag(s).',
        'Repeat with acetone: no silver mirror forms (ketones do not reduce Tollens\' reagent).',
        'In Fehling\'s test, aldehydes reduce alkaline Cu2+ complex to form red cuprous oxide Cu2O precipitate.'
      ],
      safety: 'Tollens\' reagent forms explosive silver fulminate precipitates upon standing; always prepare freshly and dispose of immediately with dilute nitric acid.',
      realWorldApplication: 'Industrial manufacture of silvered mirrors and clinical urinalysis screening for reducing sugars in diabetes.'
    },
    keyPoints: [
      'Aldehydes are generally more reactive toward nucleophilic addition than ketones due to steric and electronic factors (two alkyl groups reduce partial positive charge on carbonyl carbon).',
      'Aldol condensation requires at least one alpha-hydrogen atom; Cannizzaro reaction is undergone exclusively by aldehydes lacking alpha-hydrogens (e.g. Formaldehyde, Benzaldehyde) in concentrated alkali.',
      'Electron-withdrawing groups (like -NO2, -F, -Cl) stabilize carboxylate anion by -I inductive effect and dramatically increase carboxylic acid strength.'
    ],
    formulas: [
      { name: 'Aldol Condensation', formula: '2 CH3CHO --(dil. NaOH)--> CH3-CH(OH)-CH2-CHO --(Delta)--> CH3-CH=CH-CHO + H2O', desc: 'Formation of alpha,beta-unsaturated aldehyde (crotonaldehyde)' },
      { name: 'Cannizzaro Disproportionation', formula: '2 HCHO + conc. NaOH -> HCOONa (Sodium formate) + CH3OH (Methanol)', desc: 'Self oxidation-reduction of aldehydes lacking alpha-H' },
      { name: 'Hell-Volhard-Zelinsky (HVZ) Reaction', formula: 'R-CH2-COOH + X2 --(Red P / H2O)--> R-CH(X)-COOH + HX', desc: 'Alpha-halogenation of carboxylic acids' }
    ],
    solvedQuestions: [
      {
        q: 'An organic compound [A] with molecular formula C8H8O forms an orange-red precipitate with 2,4-DNP reagent and gives a yellow precipitate on heating with iodine in presence of sodium hydroxide. It neither reduces Tollens\' or Fehling\'s reagent, nor does it decolorize bromine water. Identify [A] and write the reactions.',
        sol: 'Compound [A] forms 2,4-DNP derivative => contains a carbonyl group. Gives positive iodoform test => contains a methyl ketone group (-COCH3). Does not reduce Tollens\' or Fehling\'s reagent => it is a ketone, not an aldehyde. Does not decolorize bromine water => no olefinic unsaturation; ring is aromatic benzene. With formula C8H8O, [A] is Acetophenone (C6H5COCH3). Iodoform reaction: C6H5COCH3 + 3NaOI -> C6H5COONa + CHI3(yellow ppt) + 2NaOH.'
      }
    ]
  },
  {
    num: 9,
    titleEn: 'Amines',
    titleHi: 'ऐमीन',
    duration: '44 min',
    oneShotId: null,
    unitName: 'Unit IX: Amines',
    unitNumber: 9,
    topics: [
      { part: 1, titleEn: 'Classification, Structure & Preparation: Reduction of Nitro Compounds, Gabriel Phthalimide Synthesis & Hoffmann Bromamide Reaction', titleHi: 'ऐमीन का वर्गीकरण, गैब्रिएल थैलिमाइड व हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रियाएं', id: 'c12-chem-ch9-t1', dur: '15 min' },
      { part: 2, titleEn: 'Physical Properties & Basicity of Amines: Gas Phase vs Aqueous Solution (Steric & Hydration Effects)', titleHi: 'ऐमीन के भौतिक गुण एवं क्षारीय सामर्थ्य (जलीय व गैसीय प्रावस्था में क्रम)', id: 'c12-chem-ch9-t2', dur: '14 min' },
      { part: 3, titleEn: 'Chemical Reactions: Carbylamine Test, Hinsberg Test (Distinction of 1°, 2°, 3° Amines) & Diazonium Salt Synthetic Reactions', titleHi: 'कार्बिलऐमीन परीक्षण, हिंसबर्ग परीक्षण व डाइऐज़ोनियम लवण की रासायनिक अभिक्रियाएं', id: 'c12-chem-ch9-t3', dur: '15 min' }
    ],
    practicalActivity: {
      title: 'Azo Dye Coupling Test for Primary Aromatic Amines (Aniline)',
      materials: ['Aniline', 'Dilute HCl', 'Sodium nitrite (NaNO2) solution', 'Beta-naphthol (2-naphthol)', 'Dilute NaOH solution', 'Crushed ice bath'],
      procedure: [
        'Dissolve 0.5 mL aniline in 2 mL dilute HCl and cool in ice bath below 5°C.',
        'Add ice-cold NaNO2 solution slowly to prepare benzenediazonium chloride (diazotization).',
        'In a separate test tube, dissolve 0.1 g beta-naphthol in 2 mL dilute 10% NaOH and cool in ice.',
        'Pour diazonium salt solution into alkaline beta-naphthol solution: an intense scarlet-red azo dye precipitates immediately.'
      ],
      safety: 'Diazonium salts are unstable and explosive when dry; keep strictly in ice-cold aqueous solution below 5°C.',
      realWorldApplication: 'Synthetic azo dye manufacturing in textile coloring and sulfa drug antibiotics.'
    },
    keyPoints: [
      'In aqueous solution, the basicity order of aliphatic amines is: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (Secondary > Tertiary > Primary for ethyl groups), governed by combined inductive (+I), steric hindrance, and hydration stabilization.',
      'Gabriel phthalimide synthesis is exclusively used for preparing pure primary aliphatic amines; aryl amines cannot be prepared because aryl halides do not undergo nucleophilic substitution with phthalimide anion.',
      'Hinsberg reagent (benzenesulfonyl chloride) distinguishes amines: 1° amine yields alkali-soluble sulfonamide; 2° amine yields alkali-insoluble sulfonamide; 3° amine does not react.'
    ],
    formulas: [
      { name: 'Hoffmann Bromamide Degradation', formula: 'R-CONH2 + Br2 + 4 NaOH -> R-NH2 + Na2CO3 + 2 NaBr + 2 H2O', desc: 'Prepares primary amine with one carbon atom less than parent amide' },
      { name: 'Carbylamine Isocyanide Test', formula: 'R-NH2 + CHCl3 + 3 KOH --(Delta)--> R-NC (Foul smelling isocyanide) + 3 KCl + 3 H2O', desc: 'Specific test for primary aliphatic and aromatic amines' },
      { name: 'Sandmeyer Reaction', formula: 'Ar-N2^+ Cl^- --(Cu2Cl2 / HCl)--> Ar-Cl + N2', desc: 'Synthesis of haloarenes from diazonium salts' }
    ],
    solvedQuestions: [
      {
        q: 'How will you distinguish between Ethylamine (1° amine) and Diethylamine (2° amine) using Hinsberg reagent?',
        sol: 'When treated with benzenesulfonyl chloride (Hinsberg reagent): (1) Ethylamine reacts to form N-ethylbenzenesulfonamide (C6H5SO2NHC2H5). Because it carries an acidic hydrogen attached to nitrogen, it dissolves in aqueous potassium hydroxide (KOH) to form a clear soluble potassium salt. (2) Diethylamine reacts to form N,N-diethylbenzenesulfonamide (C6H5SO2N(C2H5)2), which lacks an acidic hydrogen on nitrogen and remains completely insoluble in aqueous KOH.'
      }
    ]
  },
  {
    num: 10,
    titleEn: 'Biomolecules',
    titleHi: 'जैव-अणु',
    duration: '46 min',
    oneShotId: null,
    unitName: 'Unit X: Biomolecules',
    unitNumber: 10,
    topics: [
      { part: 1, titleEn: 'Carbohydrates: Monosaccharides (D/L-Glucose & Fructose Haworth Cyclic Structures), Disaccharides (Glycosidic Linkage in Sucrose, Maltose, Lactose) & Polysaccharides (Starch, Cellulose, Glycogen)', titleHi: 'कार्बोहाइड्रेट: ग्लूकोज व फ्रुक्टोज की चक्रीय संरचना, ग्लाइकोसिडिक बंध, स्टार्च व सेलुलोस', id: 'c12-chem-ch10-t1', dur: '15 min' },
      { part: 2, titleEn: 'Proteins: Amino Acids (Zwitterion Structure, Essential vs Non-essential), Peptide Bond, Primary, Secondary (alpha-Helix, beta-Pleated Sheet), Tertiary & Denaturation', titleHi: 'प्रोटीन: ऐमीनो अम्ल, ज्विटर आयन, पेप्टाइड आबंध, प्राथमिक-द्वितीयक संरचना व विकृतीकरण', id: 'c12-chem-ch10-t2', dur: '16 min' },
      { part: 3, titleEn: 'Nucleic Acids (DNA Double Helix & RNA Structure, Nucleotides vs Nucleosides, Genetic Code) & Vitamins (Classification, Deficiency Diseases)', titleHi: 'न्यूक्लिक अम्ल: DNA व RNA संरचना, न्यूक्लियोटाइड, आनुवंशिक कोड एवं विटामिन', id: 'c12-chem-ch10-t3', dur: '15 min' }
    ],
    practicalActivity: {
      title: 'Biuret Test and Xanthoproteic Test for Detection of Proteins in Food Samples',
      materials: ['Egg albumin solution or milk filtrate', '10% NaOH solution', '1% CuSO4 solution', 'Concentrated nitric acid (HNO3)', 'Test tubes and dropper'],
      procedure: [
        'Biuret Test: Add 2 mL of 10% NaOH to 2 mL protein sample, then add 4-5 drops of 1% CuSO4 solution and mix.',
        'Appearance of violet/purple coordination complex confirms peptide linkages (-CO-NH-).',
        'Xanthoproteic Test: Add 1 mL concentrated HNO3 to protein sample and boil gently.',
        'A yellow precipitate forms which turns bright orange upon addition of excess NH4OH or NaOH, confirming presence of aromatic amino acids (tyrosine, tryptophan).'
      ],
      safety: 'Concentrated nitric acid stains skin bright yellow and causes severe acid burns; handle with glass dropper and wear gloves.',
      realWorldApplication: 'Clinical diagnostic tests for proteinuria in kidney disease screening and nutritional food analysis.'
    },
    keyPoints: [
      'Amino acids exist as dipolar Zwitterions with both acidic -COO^- and basic -NH3^+ groups, explaining their high melting points and water solubility.',
      'Denaturation of proteins (by heat, acid, or heavy metals) disrupts secondary and tertiary structures by breaking hydrogen and disulfide bonds, leaving primary sequence intact.',
      'DNA consists of deoxyribose sugar and bases Adenine (A), Thymine (T), Guanine (G), Cytosine (C); Chargaff\'s rule states A pairs with T via 2 hydrogen bonds and G pairs with C via 3 hydrogen bonds.'
    ],
    formulas: [
      { name: 'Peptide Bond Formation', formula: '-COOH + H2N- -> -CO-NH- (Peptide Linkage) + H2O', desc: 'Condensation polymerisation between alpha-amino acids' },
      { name: 'Chargaff\'s Rule of Base Pairing', formula: 'Moles of Adenine (A) = Moles of Thymine (T), Moles of Guanine (G) = Moles of Cytosine (C)', desc: 'Purine-pyrimidine stoichiometric equivalence in double-stranded DNA' }
    ],
    solvedQuestions: [
      {
        q: 'What is meant by the denaturation of a protein? What happens to primary, secondary, and tertiary structures of a protein during coagulation of egg white on boiling?',
        sol: 'Denaturation is a phenomenon wherein a native protein loses its biological activity when subjected to physical changes (like heating) or chemical changes (like pH alteration). During boiling of an egg, hydrogen bonds and ionic interactions stabilizing the delicate secondary (alpha-helix) and tertiary (globular folds) structures are irreversibly uncoiled and destroyed, causing the albumin protein to coagulate. Crucially, the covalent peptide bonds forming the primary structure remain completely intact.'
      }
    ]
  }
];

// Helper to look up senior secondary subject chapters
export function getSeniorSecondaryChapters(boardId, grade, subjectKey) {
  const normBoard = (boardId || 'cbse').toLowerCase();
  const numGrade = Number(grade);
  const normSubj = (subjectKey || '').toLowerCase();

  // 1. ISC Specific Curricula (CISCE Class 11 & 12)
  if (normBoard === 'icse') {
    if (normSubj.includes('eng')) {
      return numGrade === 11 ? ISC_CLASS_11_ENGLISH : ISC_CLASS_12_ENGLISH;
    }
    if (normSubj.includes('phy')) {
      return numGrade === 11 ? CBSE_CLASS_11_PHYSICS : CBSE_CLASS_12_PHYSICS;
    }
    if (normSubj.includes('math')) {
      return numGrade === 11 ? CBSE_CLASS_11_MATHEMATICS : CBSE_CLASS_12_MATHEMATICS;
    }
    if (normSubj.includes('bio')) {
      return numGrade === 11 ? CBSE_CLASS_11_BIOLOGY : CBSE_CLASS_12_BIOLOGY;
    }
    if (normSubj.includes('chem')) {
      return numGrade === 11 ? CBSE_CLASS_11_CHEMISTRY : CBSE_CLASS_12_CHEMISTRY;
    }
  }

  // 2. UP Board (UPMSP - NCERT rationalised core bilingual)
  if (normBoard === 'up_board') {
    if (normSubj.includes('phy')) {
      return numGrade === 11 ? CBSE_CLASS_11_PHYSICS : CBSE_CLASS_12_PHYSICS;
    }
    if (normSubj.includes('math')) {
      return numGrade === 11 ? CBSE_CLASS_11_MATHEMATICS : CBSE_CLASS_12_MATHEMATICS;
    }
    if (normSubj.includes('bio')) {
      return numGrade === 11 ? CBSE_CLASS_11_BIOLOGY : CBSE_CLASS_12_BIOLOGY;
    }
    if (normSubj.includes('eng')) {
      return numGrade === 11 ? CBSE_CLASS_11_ENGLISH : CBSE_CLASS_12_ENGLISH;
    }
    if (normSubj.includes('chem')) {
      return numGrade === 11 ? CBSE_CLASS_11_CHEMISTRY : CBSE_CLASS_12_CHEMISTRY;
    }
  }

  // 3. CBSE & Universal NCERT Core (also adopted by Rajasthan, Bihar, Karnataka, West Bengal, State Boards)
  if (normSubj.includes('phy')) {
    return numGrade === 11 ? CBSE_CLASS_11_PHYSICS : CBSE_CLASS_12_PHYSICS;
  }
  if (normSubj.includes('math')) {
    return numGrade === 11 ? CBSE_CLASS_11_MATHEMATICS : CBSE_CLASS_12_MATHEMATICS;
  }
  if (normSubj.includes('bio')) {
    return numGrade === 11 ? CBSE_CLASS_11_BIOLOGY : CBSE_CLASS_12_BIOLOGY;
  }
  if (normSubj.includes('eng')) {
    return numGrade === 11 ? CBSE_CLASS_11_ENGLISH : CBSE_CLASS_12_ENGLISH;
  }
  if (normSubj.includes('chem')) {
    return numGrade === 11 ? CBSE_CLASS_11_CHEMISTRY : CBSE_CLASS_12_CHEMISTRY;
  }

  return [];
}

