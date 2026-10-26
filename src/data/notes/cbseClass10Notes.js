// GYAAN AI CBSE Class 10 Science and Mathematics Notes
// Pedagogical, textbook-quality notes structured according to the NCERT/CBSE 2026-27 syllabus

export const CBSE_CLASS_10_SCIENCE_NOTES = [
  {
    id: "ch-1-science",
    chapterNumber: 1,
    chapterTitle: "Chemical Reactions and Equations",
    titleHi: "रासायनिक अभिक्रियाएँ एवं समीकरण",
    subjectId: "science",
    subjectName: "Science",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Study of chemical changes where bonds break and form to create new substances. Covers balanced chemical equations conforming to the Law of Conservation of Mass, exothermic vs endothermic reactions, precipitation, and redox processes.",
    practicalActivity: {
      title: "Burning of a Magnesium Ribbon in Air",
      materials: ["Magnesium ribbon (3-4 cm)", "Sandpaper", "Pair of tongs", "Watch glass", "Bunsen burner", "Safety goggles"],
      procedure: [
        "Clean a 3-4 cm piece of magnesium ribbon using sandpaper to remove the protective basic magnesium oxide/carbonate coating.",
        "Hold the ribbon firmly with a pair of tongs and ignite it using a Bunsen burner flame.",
        "Observe the brilliant dazzling white flame and collect the white powder ash (MgO) on a watch glass.",
        "Dissolve the collected ash in a small amount of water and test with red litmus paper; observe turn to blue indicating basic magnesium hydroxide."
      ],
      safety: "Do not look directly into the dazzling white flame; use protective UV/safety glasses to prevent eye damage.",
      realWorldApplication: "Magnesium flares in marine distress signalling and flash photography fireworks."
    },
    quickRevisionPoints: [
      "A chemical reaction involves breaking old chemical bonds and forming new bonds to generate new substances with distinct identities.",
      "Law of Conservation of Mass requires total mass of reactants to equal total mass of products; thus equations must be balanced.",
      "Combination: A + B -> AB; Decomposition: AB -> A + B (requires heat/light/electricity).",
      "Displacement: More reactive element displaces less reactive element from salt solution.",
      "Redox: Oxidation is gain of oxygen/loss of electrons; Reduction is loss of oxygen/gain of electrons."
    ],
    topics: [
      {
        id: "c10-sci-ch1-t1",
        title: "Balancing Chemical Equations & Conservation of Mass",
        content: "Chemical equations represent chemical changes concisely using chemical formulas. Balancing is required by the Law of Conservation of Mass, which states that atoms cannot be created or destroyed in a chemical reaction.",
        mustKnowPoints: [
          "Count atoms of each element on LHS and RHS before adjusting coefficients.",
          "Balance elements with greatest number of atoms first, keeping formulas strictly unchanged (do not alter subscripts).",
          "Include state symbols: (s) solid, (l) liquid, (g) gas, and (aq) aqueous solution."
        ],
        formulas: [
          { name: "Magnesium Oxidation", formula: "2Mg(s) + O₂(g) → 2MgO(s)", desc: "Exothermic synthesis with dazzling flame" },
          { name: "Steam on Iron", formula: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)", desc: "Heterogeneous redox reaction" }
        ],
        solvedNumericals: [
          {
            q: "Balance the skeletal equation: Fe + H₂O → Fe₃O₄ + H₂",
            sol: "Step 1: Balance Fe with coefficient 3 on reactant side: 3Fe + H₂O → Fe₃O₄ + H₂\nStep 2: Balance O by adding coefficient 4 to H₂O: 3Fe + 4H₂O → Fe₃O₄ + H₂\nStep 3: Balance H by adding coefficient 4 to H₂: 3Fe + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)."
          }
        ],
        commonTraps: [
          "Altering subscripts instead of multiplying coefficients (e.g. writing H₂O₂ instead of 2H₂O to balance oxygen)."
        ],
        sections: [
          {
            type: "definition",
            content: "A balanced chemical equation has an equal number of atoms of each element on both reactant and product sides."
          },
          {
            type: "example",
            content: "Balancing combustion of methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Heat."
          }
        ]
      }
    ]
  },
  {
    id: "ch-2-science",
    chapterNumber: 2,
    chapterTitle: "Acids, Bases and Salts",
    titleHi: "अम्ल, क्षारक एवं लवण",
    subjectId: "science",
    subjectName: "Science",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Investigation of sour acids releasing H⁺(aq) ions, bitter bases producing OH⁻(aq) ions, indicators, the logarithmic pH scale, neutralization reactions, and production of essential industrial chemicals from common salt.",
    practicalActivity: {
      title: "Reaction of Zinc Granules with Dilute Sulphuric Acid and Pop Test for Hydrogen",
      materials: ["Zinc granules (5 g)", "Dilute H₂SO₄ (10 mL)", "Test tube with delivery tube", "Soap solution trough", "Burning splint"],
      procedure: [
        "Take about 5 mL of dilute sulphuric acid in a test tube and add a few pieces of clean zinc granules.",
        "Fit a single-bore cork with a glass delivery tube and observe vigorous effervescence of hydrogen gas.",
        "Pass the evolving gas through a trough containing soap solution; soap bubbles filled with gas rise into the air.",
        "Bring a burning candle or splint near a gas-filled soap bubble; it bursts with a characteristic 'pop' sound."
      ],
      safety: "Hydrogen gas is highly flammable; keep splint safely away from open acid containers.",
      realWorldApplication: "Industrial preparation of hydrogen and galvanized corrosion protection."
    },
    quickRevisionPoints: [
      "Acids taste sour, turn blue litmus red, and release hydronium ions H₃O⁺ in aqueous solution.",
      "Bases taste bitter, feel soapy, turn red litmus blue, and liberate hydroxide ions OH⁻ in aqueous solution.",
      "pH = -log[H⁺]; neutral pH = 7, acidic pH < 7, basic pH > 7 at 25°C.",
      "Acid + Base → Salt + Water (Neutralization; ΔH is exothermic).",
      "Important salts: Bleaching powder CaOCl₂, Baking soda NaHCO₃, Washing soda Na₂CO₃·10H₂O, Plaster of Paris CaSO₄·½H₂O."
    ],
    topics: [
      {
        id: "c10-sci-ch2-t1",
        title: "pH Scale, Indicators & Neutralization",
        content: "The pH scale quantifies the concentration of free hydronium ions in aqueous solutions. Universal indicator displays distinct colours across the spectrum from red (strong acid, pH 1) to dark violet (strong base, pH 14).",
        mustKnowPoints: [
          "Dilution of an acid or base is always carried out by adding acid slowly to water with constant stirring, never water to acid.",
          "Tooth decay begins when mouth pH falls below 5.5 due to bacterial acid production.",
          "Antacids like milk of magnesia Mg(OH)₂ neutralize excess gastric hydrochloric acid."
        ],
        formulas: [
          { name: "Neutralization", formula: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)", desc: "Exothermic salt and water synthesis" },
          { name: "Plaster of Paris Hydration", formula: "CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O", desc: "Setting into hard mass of gypsum" }
        ],
        solvedNumericals: [
          {
            q: "Why does dry HCl gas not change the colour of dry blue litmus paper?",
            sol: "Dry HCl gas has no moisture to dissociate into hydrogen ions (H⁺ or H₃O⁺). Acidic behaviour and litmus colour change occur only in aqueous solution where free hydronium ions exist."
          }
        ],
        commonTraps: [
          "Thinking pure water cannot conduct electricity because it has no ions; pure water has tiny equal concentrations [H⁺]=[OH⁻]=10⁻⁷ M, but requires electrolytes to conduct substantial current."
        ],
        sections: [
          {
            type: "definition",
            content: "pH is defined mathematically as the negative logarithm to the base 10 of hydrogen ion concentration: pH = -log₁₀[H⁺]."
          }
        ]
      }
    ]
  },
  {
    id: "ch-3-science",
    chapterNumber: 3,
    chapterTitle: "Metals and Non-Metals",
    titleHi: "धातु एवं अधातु",
    subjectId: "science",
    subjectName: "Science",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Comprehensive study of physical and chemical properties of metals and non-metals, the reactivity series, electrovalent (ionic) bonding mechanism, metallurgy from concentration to refining, corrosion, and alloy prevention.",
    practicalActivity: {
      title: "Testing Electrical Conductivity of Metals and Reaction with Steam",
      materials: ["Copper wire", "Iron strip", "Battery (6V)", "Bulb", "Connecting wires", "Boiling tube", "Glass wool soaked in water", "Burner"],
      procedure: [
        "Assemble an electric circuit with a 6V battery, bulb, switch, and two test terminals.",
        "Insert copper wire, iron strip, and aluminum between terminals; observe that bulb glows brightly, verifying high electrical conductivity.",
        "In a boiling tube, place wet glass wool at the bottom and an iron or aluminum sample in the middle, fitted with a delivery tube.",
        "Heat the metal strongly while vaporizing water; collect hydrogen gas over water trough and test with burning splint."
      ],
      safety: "Hot boiling tubes can crack if cold water backs up; remove delivery tube from water trough before stopping heating.",
      realWorldApplication: "Copper wiring in electrical grids; sacrificial zinc galvanizing to protect ship hulls."
    },
    quickRevisionPoints: [
      "Metals are malleable, ductile, sonorous, good conductors of heat and electricity, and form basic oxides.",
      "Non-metals are generally brittle, poor conductors (except graphite), and form acidic or neutral oxides.",
      "Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au.",
      "Metals above hydrogen in the series displace H₂ gas from dilute HCl/H₂SO₄; metals below (Cu, Ag, Au) do not react.",
      "Ionic compounds form via complete transfer of electrons from metals to non-metals. They have high melting points, brittle crystal lattices, and conduct electricity only in molten or aqueous states."
    ],
    topics: [
      {
        id: "c10-sci-ch3-t1",
        title: "Reactivity Series & Chemical Properties of Metals",
        content: "Metals react with oxygen to form basic oxides (e.g., 2Mg + O₂ → 2MgO). Amphoteric oxides like Al₂O₃ and ZnO react with both acids and bases to yield salt and water. The reactivity series arranges metals in decreasing order of electrode potential.",
        mustKnowPoints: [
          "Potassium (K) and Sodium (Na) react so violently with cold water that evolved H₂ catches fire; stored under kerosene.",
          "Calcium and Magnesium float on water because bubbles of hydrogen gas stick to their surfaces.",
          "Iron does not burn on heating, but iron filings burn vigorously when sprinkled into a flame.",
          "Aqua Regia is a 3:1 mixture of concentrated HCl and concentrated HNO₃ that dissolves noble metals like gold and platinum."
        ],
        formulas: [
          { name: "Amphoteric Reaction with Acid", formula: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O", desc: "Alumina behaving as a base" },
          { name: "Amphoteric Reaction with Base", formula: "Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O", desc: "Alumina producing sodium aluminate" },
          { name: "Thermite Process", formula: "Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat", desc: "Molten iron welds railway tracks" }
        ],
        solvedNumericals: [
          {
            q: "A copper coin is immersed in silver nitrate (AgNO₃) solution. What colour change is observed and why?",
            sol: "Copper is more reactive than silver according to the reactivity series. Copper displaces silver: Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s). The colorless solution turns blue due to formation of Cu²⁺ ions, and shiny greyish-white silver crystals deposit on the copper coin."
          },
          {
            q: "Show the formation of magnesium chloride (MgCl₂) by transfer of electrons.",
            sol: "Magnesium has atomic number 12 (electronic configuration 2, 8, 2). It loses 2 valence electrons: Mg → Mg²⁺ + 2e⁻.\nChlorine has atomic number 17 (2, 8, 7). Each chlorine atom accepts 1 electron: Cl + e⁻ → Cl⁻.\nTwo chlorine atoms accept the two electrons: Mg²⁺ + 2[ :Cl: ]⁻ → [Mg]²⁺ [ :Cl:⁻ ]₂."
          }
        ],
        commonTraps: [
          "Assuming nitric acid (HNO₃) produces H₂ gas when reacting with metals; HNO₃ is a strong oxidizer and oxidizes H₂ to H₂O while being reduced to nitrogen oxides (NO₂, NO). Only Mg and Mn produce H₂ with very dilute HNO₃."
        ],
        sections: [
          {
            type: "definition",
            content: "The reactivity series is a list of metals arranged in the order of their decreasing chemical activities, determined through displacement reactions."
          },
          {
            type: "formula",
            content: "Displacement Law: Metal A + Salt of Metal B → Salt of Metal A + Metal B (only if A is higher than B in the reactivity series)."
          },
          {
            type: "example",
            content: "Iron displaces copper from copper sulphate: Fe(s) + CuSO₄(aq, blue) → FeSO₄(aq, light green) + Cu(s, reddish-brown)."
          }
        ]
      },
      {
        id: "c10-sci-ch3-t2",
        title: "Ionic Bond Formation & Properties of Ionic Compounds",
        content: "Metals lose valence electrons to attain a noble gas octet, forming positively charged cations. Non-metals gain those electrons to form anions. The electrostatic attraction between these oppositely charged ions forms strong ionic bonds.",
        mustKnowPoints: [
          "Ionic compounds have high melting and boiling points due to strong inter-ionic electrostatic attractions.",
          "Solid ionic crystals do not conduct electricity because ions are firmly fixed in lattice positions.",
          "In molten state or aqueous solution, electrostatic bonds break, allowing ions to move freely and conduct electric current.",
          "Ionic compounds are generally brittle and shatter when pressure is applied along crystal cleavage planes."
        ],
        formulas: [
          { name: "Lattice Energy Attraction", formula: "F = k · (q₁ · q₂) / r²", desc: "Coulombic force binding cations and anions" }
        ],
        solvedNumericals: [
          {
            q: "Why do ionic compounds have high melting points?",
            sol: "In ionic compounds like NaCl, ions are held together in a 3D crystal lattice by exceptionally strong electrostatic forces of attraction. A large amount of thermal energy is required to overcome these inter-ionic forces, resulting in high melting points (e.g., NaCl melts at 801 °C / 1074 K)."
          }
        ],
        commonTraps: [
          "Confusing electron transfer (ionic bond) with electron sharing (covalent bond). Metals do not share electrons with non-metals."
        ],
        sections: [
          {
            type: "concept",
            content: "Electron dot structures (Lewis dot structures) illustrate valence electron migration from metal atoms to non-metal atoms."
          }
        ]
      },
      {
        id: "c10-sci-ch3-t3",
        title: "Metallurgy, Extraction & Corrosion Prevention",
        content: "Extraction of metals from ores involves concentration of ore, conversion to oxide (roasting for sulphides, calcination for carbonates), reduction to crude metal (chemical or electrolytic), and refining (electrolytic refining).",
        mustKnowPoints: [
          "Roasting: Heating sulphide ores strongly in the presence of excess air (2ZnS + 3O₂ → 2ZnO + 2SO₂).",
          "Calcination: Heating carbonate ores strongly in limited or no air (ZnCO₃ → ZnO + CO₂).",
          "Highly reactive metals (Na, Ca, Mg, Al) are extracted exclusively by electrolytic reduction of their molten chlorides or oxides.",
          "Corrosion of iron (rusting, Fe₂O₃·xH₂O) requires both oxygen and moisture simultaneously.",
          "Alloying improves properties: Stainless steel (Fe + Ni + Cr) does not rust; Brass (Cu + Zn); Bronze (Cu + Sn); Solder (Pb + Sn, low melting point)."
        ],
        formulas: [
          { name: "Rusting of Iron", formula: "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O", desc: "Hydrated iron(III) oxide reddish-brown flaky deposit" },
          { name: "Roasting Sulphide Ore", formula: "2ZnS + 3O₂ → 2ZnO + 2SO₂", desc: "Thermal conversion in excess air" },
          { name: "Calcination Carbonate Ore", formula: "ZnCO₃ → ZnO + CO₂", desc: "Thermal decomposition in limited air" }
        ],
        solvedNumericals: [
          {
            q: "Differentiate between Roasting and Calcination with chemical equations.",
            sol: "1. Roasting: Process of heating concentrated sulphide ores in the presence of excess air below melting point: 2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂.\n2. Calcination: Process of heating concentrated carbonate or hydrated ores in limited air or absence of air: CaCO₃ → CaO + CO₂."
          }
        ],
        commonTraps: [
          "Confusing cathode and anode polarity during electrolytic refining: impure metal is ALWAYS the anode (positive), pure metal sheet is the cathode (negative)."
        ],
        sections: [
          {
            type: "key_point",
            content: "Galvanization is the method of protecting steel and iron from rusting by coating them with a thin sacrificial layer of zinc."
          }
        ]
      }
    ]
  },
  {
    id: "ch-4-science",
    chapterNumber: 4,
    chapterTitle: "Carbon and its Compounds",
    titleHi: "कार्बन एवं उसके यौगिक",
    subjectId: "science",
    subjectName: "Science",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Exploration of the versatile tetravalent carbon atom, catenation, allotropes (diamond, graphite, fullerene), saturated vs unsaturated hydrocarbons, functional groups, and ethanol/ethanoic acid reactions.",
    practicalActivity: {
      title: "Distinguishing Ethanol and Ethanoic Acid using Sodium Bicarbonate",
      materials: ["Ethanol (2 mL)", "Ethanoic acid (2 mL)", "Solid sodium bicarbonate (NaHCO₃)", "Test tubes", "Lime water"],
      procedure: [
        "Take 2 mL of ethanol in test tube A and 2 mL of ethanoic acid in test tube B.",
        "Add a pinch of solid NaHCO₃ to both test tubes.",
        "Observe test tube B with ethanoic acid produces brisk effervescence of CO₂ gas: CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂.",
        "Pass the gas through fresh lime water; it turns milky, confirming CO₂. Test tube A shows no reaction."
      ],
      safety: "Glacial acetic acid is corrosive; avoid skin contact.",
      realWorldApplication: "Vinegar preservation and industrial synthesis of ethyl ethanoate perfumes."
    },
    quickRevisionPoints: [
      "Carbon forms covalent bonds by sharing electrons (atomic number 6, valency 4).",
      "Catenation (unique ability to bond with other carbon atoms forming chains) and tetravalency account for millions of carbon compounds.",
      "Homologous series: group of compounds with same functional group, differing by -CH₂- unit (14 u molar mass).",
      "Combustion of saturated hydrocarbons gives clean blue flame; unsaturated gives yellow sooty flame.",
      "Saponification: Ester + NaOH → Soap (sodium carboxylate) + Glycerol."
    ],
    topics: [
      {
        id: "c10-sci-ch4-t1",
        title: "Covalent Bonding & Versatile Nature of Carbon",
        content: "Carbon has atomic number 6 (2, 4). To achieve stability, it cannot gain 4 electrons (difficult for 6 protons to hold 10 electrons) or lose 4 electrons (requires enormous ionization energy). Hence, carbon always shares electrons forming covalent bonds.",
        mustKnowPoints: [
          "Diamond has a 3D rigid tetrahedral network (hardest known natural substance).",
          "Graphite has hexagonal planar layers held by weak van der Waals forces, with delocalized free electrons making it a conductor.",
          "Alkanes (C_n H_{2n+2}) are saturated; Alkenes (C_n H_{2n}) and Alkynes (C_n H_{2n-2}) are unsaturated."
        ],
        formulas: [
          { name: "General Alkane", formula: "CₙH₂ₙ₊₂", desc: "Single C-C bonds" },
          { name: "General Alkene", formula: "CₙH₂ₙ", desc: "At least one C=C double bond" },
          { name: "General Alkyne", formula: "CₙH₂ₙ₋₂", desc: "At least one C≡C triple bond" }
        ],
        solvedNumericals: [
          {
            q: "Draw the electron dot structure of ethyne (C₂H₂).",
            sol: "Each carbon shares 3 pairs of electrons with the adjacent carbon (triple bond C≡C) and 1 pair of electrons with a hydrogen atom (single bond C-H): H : C ::: C : H."
          }
        ],
        commonTraps: [
          "Writing carbon with 5 or 3 bonds in structural diagrams; carbon must always have exactly 4 covalent bonds."
        ],
        sections: [
          {
            type: "definition",
            content: "Catenation is the self-linking property of carbon atoms to form long open, branched, or cyclic molecular chains."
          }
        ]
      }
    ]
  },
  {
    id: "ch-11-science",
    chapterNumber: 11,
    chapterTitle: "Electricity",
    titleHi: "विद्युत",
    subjectId: "science",
    subjectName: "Science",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Foundations of current electricity, Ohm's law, resistivity, series and parallel circuits, Joule's law of heating, and electric power calculations.",
    practicalActivity: {
      title: "Verification of Ohm's Law (V-I Characteristic)",
      materials: ["Nichrome wire resistor", "Ammeter", "Voltmeter", "4 dry cells (1.5V each)", "Plug key", "Rheostat"],
      procedure: [
        "Connect the circuit in series with one cell, key, ammeter, and nichrome wire. Connect voltmeter in parallel across nichrome wire.",
        "Close the key and record current I and potential difference V.",
        "Repeat by connecting 2, 3, and 4 cells in series.",
        "Plot V versus I graph; observe a straight line passing through origin, proving V ∝ I."
      ],
      safety: "Ensure ammeter is in series and voltmeter in parallel; disconnect key between readings to avoid wire heating.",
      realWorldApplication: "Domestic circuit wiring and thermal appliances like geysers and toasters."
    },
    quickRevisionPoints: [
      "Electric current I = Q / t (measured in Amperes, 1 A = 1 C/s).",
      "Potential difference V = W / Q (measured in Volts, 1 V = 1 J/C).",
      "Ohm's Law: V = I × R at constant temperature.",
      "Resistance R = ρ × (L / A); depends on length, cross-sectional area, and material resistivity.",
      "Series: R_eq = R₁ + R₂ + ... (same current I); Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (same potential V).",
      "Joule's Heating: H = I²Rt = VIt = (V²/R)t; Electric Power P = VI = I²R = V²/R."
    ],
    topics: [
      {
        id: "c10-sci-ch11-t1",
        title: "Ohm's Law, Resistance & Factors Affecting Resistance",
        content: "At constant temperature, electric current flowing through a metallic conductor is directly proportional to potential difference across its terminals: V = IR.",
        mustKnowPoints: [
          "Resistance is directly proportional to length of wire: R ∝ L.",
          "Resistance is inversely proportional to cross-sectional area: R ∝ 1/A.",
          "Resistivity ρ is an intrinsic material property (independent of length and thickness); measured in Ohm-metre (Ω·m)."
        ],
        formulas: [
          { name: "Ohm's Law", formula: "V = I · R", desc: "V in Volts, I in Amperes, R in Ohms" },
          { name: "Resistivity Formula", formula: "R = ρ · (L / A)", desc: "A = π · r² for circular wires" },
          { name: "Electric Power", formula: "P = V · I = I² · R = V² / R", desc: "Measured in Watts (W)" }
        ],
        solvedNumericals: [
          {
            q: "A cylindrical wire of radius r and length L has resistance R. If its length is doubled and radius halved, find new resistance.",
            sol: "Initial R = ρ L / (π r²).\nNew length L' = 2L, new radius r' = r/2, new area A' = π (r/2)² = (π r²) / 4 = A / 4.\nNew resistance R' = ρ L' / A' = ρ (2L) / (A / 4) = 8 × (ρ L / A) = 8R. The resistance increases 8-fold."
          }
        ],
        commonTraps: [
          "Assuming resistivity changes when wire is stretched or cut; resistivity stays constant, only resistance changes."
        ],
        sections: [
          {
            type: "definition",
            content: "Ohm's law states that electric current through a metallic conductor is directly proportional to the potential difference across its ends, provided temperature remains constant."
          }
        ]
      }
    ]
  }
];

export const CBSE_CLASS_10_MATHS_NOTES = [
  {
    id: "ch-1-mathematics",
    chapterNumber: 1,
    chapterTitle: "Real Numbers",
    titleHi: "वास्तविक संख्याएँ",
    subjectId: "mathematics",
    subjectName: "Mathematics",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Exploration of the Fundamental Theorem of Arithmetic, unique prime factorisation of composite numbers, computation of HCF and LCM, and algebraic proofs of irrationality of √2, √3, √5.",
    practicalActivity: null,
    quickRevisionPoints: [
      "Every composite number can be uniquely expressed as a product of prime factors, apart from the order in which they occur.",
      "For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b.",
      "If a prime p divides a², then p divides a (where a is a positive integer).",
      "Irrational numbers cannot be written in the form p/q (q ≠ 0, p,q integers)."
    ],
    topics: [
      {
        id: "c10-mat-ch1-t1",
        title: "Fundamental Theorem of Arithmetic & HCF/LCM",
        content: "Every composite number greater than 1 can be factored uniquely as a product of primes, up to the rearrangement of factors.",
        mustKnowPoints: [
          "HCF is product of the smallest power of each common prime factor.",
          "LCM is product of the greatest power of each prime factor involved.",
          "Formula HCF(a,b) × LCM(a,b) = a × b holds ONLY for two numbers, not three."
        ],
        formulas: [
          { name: "Product of Two Integers", formula: "HCF(a, b) · LCM(a, b) = a · b", desc: "Valid exclusively for two positive numbers" }
        ],
        solvedNumericals: [
          {
            q: "Find the HCF and LCM of 96 and 404 by prime factorisation method.",
            sol: "96 = 2⁵ × 3\n404 = 2² × 101\nHCF = 2² = 4\nLCM = (96 × 404) / HCF = (96 × 404) / 4 = 9696."
          }
        ],
        commonTraps: [
          "Applying HCF(a,b,c) × LCM(a,b,c) = a × b × c for three numbers (this identity is false for three numbers)."
        ],
        sections: [
          {
            type: "theorem",
            content: "Fundamental Theorem of Arithmetic: Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur."
          }
        ]
      }
    ]
  },
  {
    id: "ch-3-mathematics",
    chapterNumber: 3,
    chapterTitle: "Pair of Linear Equations in Two Variables",
    titleHi: "दो चर वाले रैखिक समीकरण युग्म",
    subjectId: "mathematics",
    subjectName: "Mathematics",
    classLevel: 10,
    boardId: "cbse",
    status: "published",
    summary: "Systematic algebraic and graphical methods for solving simultaneous linear equations a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0, consistency conditions, substitution, and elimination.",
    practicalActivity: null,
    quickRevisionPoints: [
      "Consistent system with unique solution: a₁/a₂ ≠ b₁/b₂ (intersecting lines).",
      "Dependent system with infinitely many solutions: a₁/a₂ = b₁/b₂ = c₁/c₂ (coincident lines).",
      "Inconsistent system with no solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (parallel lines).",
      "Methods of solving: Graphical method, Substitution method, and Elimination method."
    ],
    topics: [
      {
        id: "c10-mat-ch3-t1",
        title: "Consistency Criteria & Graphical Representation",
        content: "Two linear equations in two variables represent two straight lines in a Cartesian plane. The relative coefficients determine whether the lines intersect, coincide, or run parallel.",
        mustKnowPoints: [
          "Intersecting lines: Unique single solution (Consistent).",
          "Parallel lines: No solution (Inconsistent).",
          "Coincident lines: Infinite solutions (Consistent & Dependent)."
        ],
        formulas: [
          { name: "Unique Solution Condition", formula: "a₁ / a₂ ≠ b₁ / b₂", desc: "Intersecting lines at single point" },
          { name: "No Solution Condition", formula: "a₁ / a₂ = b₁ / b₂ ≠ c₁ / c₂", desc: "Parallel lines with zero common points" },
          { name: "Infinite Solutions Condition", formula: "a₁ / a₂ = b₁ / b₂ = c₁ / c₂", desc: "Coincident overlapping lines" }
        ],
        solvedNumericals: [
          {
            q: "Determine whether the pair 2x + 3y = 9 and 4x + 6y = 18 has a unique solution, no solution, or infinitely many solutions.",
            sol: "Rewrite: 2x + 3y - 9 = 0 and 4x + 6y - 18 = 0.\na₁/a₂ = 2/4 = 1/2.\nb₁/b₂ = 3/6 = 1/2.\nc₁/c₂ = -9/-18 = 1/2.\nSince a₁/a₂ = b₁/b₂ = c₁/c₂, the lines are coincident and the pair has infinitely many solutions."
          }
        ],
        commonTraps: [
          "Forgetting to write both equations in standard form (ax + by + c = 0) before taking signs into account for c₁/c₂."
        ],
        sections: [
          {
            type: "concept",
            content: "Elimination method: Multiply one or both equations by non-zero constants so coefficients of one variable become equal, then add or subtract to eliminate that variable."
          }
        ]
      }
    ]
  }
];
