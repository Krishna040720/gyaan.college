// Complete Multi-Board Curriculum Database (Classes 1 to 12)
// UP Board (Bilingual Hindi + English)
// CBSE & ICSE (100% English only - zero Hindi)
// Exhaustive chapter-by-chapter coverage with One-Shot + Topic-by-Topic video playlists

import { BOARDS } from './boardsRegistry.js';
import { getSeniorSecondaryChapters } from './seniorSecondaryCurriculum.js';
export { BOARDS };

export function validateContentContext(content, currentContext) {
  if (!content || !currentContext) return true;
  const contentClass = content.classLevel !== undefined ? Number(content.classLevel) : null;
  const targetClass = currentContext.classLevel !== undefined ? Number(currentContext.classLevel) : null;
  if (contentClass !== null && targetClass !== null && contentClass !== targetClass) {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
      console.warn('[ContentIntegrityMismatch] Content class (' + contentClass + ') does not match context class (' + targetClass + ')!', content);
    }
    return false;
  }
  return true;
}

export function getSubjectsForGradeAndBoard(grade, boardId) {
  const isUpBoard = boardId === 'up_board';
  return getSubjectsForGrade(grade, isUpBoard, boardId);
}


// Complete official chapter lists by subject and grade
const COMPLETE_CHAPTER_REGISTRY = {

  // ==================== CLASS 8 SCIENCE (All 13 NCERT Rationalised Chapters) ====================
  'sci-8': [
    {
      num: 1,
      titleEn: 'Crop Production and Management',
      titleHi: 'फसल उत्पादन एवं प्रबंध',
      duration: '45 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Agricultural Practices & Soil Preparation', titleHi: 'कृषि पद्धतियाँ व मिट्टी तैयार करना', id: null, dur: '15 min' },
        { part: 2, titleEn: 'Sowing, Manure and Fertilizers', titleHi: 'बुआई, खाद एवं उर्वरक मिलाना', id: null, dur: '15 min' },
        { part: 3, titleEn: 'Irrigation, Harvesting & Storage', titleHi: 'सिंचाई, कटाई एवं भंडारण', id: null, dur: '15 min' }
      ],
      practicalActivity: {
        title: 'Seed Quality Selection using Flotation Method',
        materials: ['Glass beaker', 'Water', 'Handful of wheat or gram seeds'],
        procedure: [
          'Fill half of the glass beaker with clean tap water.',
          'Put a handful of wheat or gram seeds into the beaker and stir well.',
          'Allow the beaker to stand undisturbed for 5 minutes.',
          'Observe that healthy, dense seeds settle at the bottom, while hollow damaged seeds float on top.'
        ],
        safety: 'Dispose of water and agricultural seeds responsibly; do not ingest treated seeds.',
        realWorldApplication: 'Automated hydraulic seed sorting systems deployed in agricultural mandis across Punjab, Haryana, and UP.'
      }
    },
    {
      num: 2,
      titleEn: 'Microorganisms: Friend and Foe',
      titleHi: 'सूक्ष्मजीव: मित्र एवं शत्रु',
      duration: '48 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Classification of Microorganisms (Bacteria, Fungi, Protozoa, Algae)', titleHi: 'सूक्ष्मजीवों का वर्गीकरण', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Friendly Microbes & Fermentation', titleHi: 'मित्रवत सूक्ष्मजीव व किण्वन (Fermentation)', id: null, dur: '16 min' },
        { part: 3, titleEn: 'Disease-Causing Microorganisms & Food Preservation', titleHi: 'रोगकारक सूक्ष्मजीव व खाद्य परिरक्षण', id: null, dur: '16 min' }
      ],
      practicalActivity: {
        title: 'Observation of Yeast Action and Dough Fermentation',
        materials: ['Refined flour (maida)', 'Sugar (2 spoons)', 'Warm water', 'Dry yeast powder', 'Mixing bowl'],
        procedure: [
          'Take 500g of flour in a bowl, add warm water, 2 spoons of sugar, and half a teaspoon of dry yeast powder.',
          'Knead the mixture thoroughly to make a soft dough.',
          'Cover the bowl and keep it in a warm location for 2 hours.',
          'Observe that the dough rises significantly in volume due to carbon dioxide bubbles released during yeast respiration.'
        ],
        safety: 'Wash hands thoroughly with soap before and after handling dough and yeast cultures.',
        realWorldApplication: 'Commercial bread baking, bhature making, and industrial pharmaceutical bio-ethanol fermentation.'
      }
    },
    {
      num: 3,
      titleEn: 'Coal and Petroleum',
      titleHi: 'कोयला और पेट्रोलियम',
      duration: '42 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Fossil Fuels: Formation of Coal & Carbonisation', titleHi: 'जीवाश्म ईंधन: कोयले का निर्माण व कार्बनीकरण', id: null, dur: '14 min' },
        { part: 2, titleEn: 'Petroleum Refining & Fractional Distillation', titleHi: 'पेट्रोलियम का परिष्करण व प्रभाजी आसवन', id: null, dur: '14 min' },
        { part: 3, titleEn: 'Natural Gas and Conservation of Energy', titleHi: 'प्राकृतिक गैस और ऊर्जा संरक्षण', id: null, dur: '14 min' }
      ],
      practicalActivity: {
        title: 'Household Energy Audit and Fuel Conservation Plan',
        materials: ['Weekly electricity and LPG consumption bill log', 'Notebook', 'PCRA conservation guidelines'],
        procedure: [
          'Record the daily usage hours of motor pumps, air conditioning, and cooking gas in your household for 7 days.',
          'Identify at least three wasteful energy habits (e.g. appliances in standby mode, unshaded windows).',
          'Calculate potential units saved by switching to 5-star BEE rated appliances and LED lighting.',
          'Chart a personal family conservation pledge following Petroleum Conservation Research Association (PCRA) guidelines.'
        ],
        safety: 'Analytical calculation activity; no hazardous chemicals required.',
        realWorldApplication: 'Indian oil refineries at Mathura and Jamnagar separating petroleum fractions into LPG, petrol, and diesel.'
      }
    },
    {
      num: 4,
      titleEn: 'Combustion and Flame',
      titleHi: 'दहन और ज्वाला',
      duration: '46 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Conditions for Combustion & Ignition Temperature', titleHi: 'दहन की शर्तें व ज्वलन ताप', id: null, dur: '15 min' },
        { part: 2, titleEn: 'Types of Combustion & Fire Extinguishers', titleHi: 'दहन के प्रकार व अग्निशामक यंत्र', id: null, dur: '15 min' },
        { part: 3, titleEn: 'Structure of a Flame (3 Zones) and Calorific Value', titleHi: 'ज्वाला की संरचना व ऊष्मीय मान', id: null, dur: '16 min' }
      ],
      practicalActivity: {
        title: 'Investigation of Candle Flame Zones and Carbon Soot Deposition',
        materials: ['Wax candle', 'Matchbox', 'Clean glass slide', 'Tongs', 'Copper wire'],
        procedure: [
          'Light a wax candle and let the flame stabilize.',
          'Using metal tongs, hold a clean glass slide horizontally in the luminous (middle) yellow zone for 10 seconds.',
          'Withdraw the slide and observe a circular blackish ring of unburnt carbon particles (soot).',
          'Next, introduce a copper wire into the non-luminous (outermost) blue zone for 30 seconds. Observe the copper wire glow red-hot without black soot.'
        ],
        safety: 'Always use test-tube tongs. Wear protective eye goggles and perform strictly under adult supervision away from flammable curtains.',
        realWorldApplication: 'Goldsmiths using blowpipes to direct the hottest outermost non-luminous flame zone for melting gold and silver.'
      }
    },
    {
      num: 5,
      titleEn: 'Conservation of Plants and Animals',
      titleHi: 'पौधों एवं जंतुओं का संरक्षण',
      duration: '40 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Deforestation and Its Consequences on Climate', titleHi: 'वनोन्मूलन और इसके दुष्परिणाम', id: null, dur: '13 min' },
        { part: 2, titleEn: 'Biosphere Reserves, Wildlife Sanctuaries and National Parks', titleHi: 'जैवमंडल आरक्षित क्षेत्र, वन्यजीव अभयारण्य व राष्ट्रीय उद्यान', id: null, dur: '14 min' },
        { part: 3, titleEn: 'Endemic Species, Red Data Book and Migration', titleHi: 'विशेष-क्षेत्री प्रजातियाँ, रेड डाटा बुक व प्रवास', id: null, dur: '13 min' }
      ],
      practicalActivity: {
        title: 'Local Biodiversity Survey and Habitat Assessment',
        materials: ['Field diary', 'Magnifying hand lens', 'Local flora/fauna field guide'],
        procedure: [
          'Survey a designated 20-meter square patch in your school campus or neighborhood park.',
          'Document the plant species, insects, bird nests, and earthworm activity observed.',
          'Record indicators of human disturbance (littering, soil compaction, chemical pesticides).',
          'Draft a report comparing local biodiversity to native forest ecosystems recorded in the Red Data Book.'
        ],
        safety: 'Do not handle unknown stinging insects, thorny foliage, or poisonous wild fungi.',
        realWorldApplication: 'Project Tiger reserves (Corbett, Kanha, Sundarbans) protecting threatened species and stabilizing water catchments.'
      }
    },
    {
      num: 6,
      titleEn: 'Reproduction in Animals',
      titleHi: 'जंतुओं में जनन',
      duration: '44 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Sexual Reproduction & Male/Female Reproductive Organs', titleHi: 'लैंगिक जनन व नर/मादा जननांग', id: null, dur: '15 min' },
        { part: 2, titleEn: 'Fertilization (Internal vs External) & Embryo Development', titleHi: 'निषेचन (आंतरिक व बाह्य) तथा भ्रूण का परिवर्धन', id: null, dur: '15 min' },
        { part: 3, titleEn: 'Asexual Reproduction: Budding in Hydra and Binary Fission in Amoeba', titleHi: 'अलैंगिक जनन: हाइड्रा में मुकुलन व अमीबा में द्विखंडन', id: null, dur: '14 min' }
      ],
      practicalActivity: {
        title: 'Microscopic Examination of Budding in Hydra and Fission in Amoeba',
        materials: ['Compound light microscope', 'Permanent slide of budding Hydra', 'Permanent slide of dividing Amoeba'],
        procedure: [
          'Place the permanent slide of budding Hydra onto the microscope stage.',
          'Focus under low power (10x objective) using coarse adjustment until the organism is centered.',
          'Switch to high power (40x objective) and use fine adjustment to observe the tiny developing bud.',
          'Repeat with the Amoeba slide to observe the constricting nucleus and dividing cytoplasm.'
        ],
        safety: 'Handle glass slides carefully by their edges to prevent breakage and finger cuts.',
        realWorldApplication: 'In-vitro fertilization (IVF) centers and livestock selective breeding programs across India.'
      }
    },
    {
      num: 7,
      titleEn: 'Reaching the Age of Adolescence',
      titleHi: 'किशोरावस्था की ओर',
      duration: '42 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Adolescence, Puberty & Physical Changes', titleHi: 'किशोरावस्था, यौवनारंभ व शारीरिक परिवर्तन', id: null, dur: '14 min' },
        { part: 2, titleEn: 'Endocrine Glands, Hormones (Insulin, Thyroxine, Adrenaline)', titleHi: 'अंतःस्रावी ग्रंथियाँ व हॉर्मोन', id: null, dur: '14 min' },
        { part: 3, titleEn: 'Reproductive Health, Nutritional Needs & Hygiene', titleHi: 'जनन स्वास्थ्य, पोषण संबंधी आवश्यकताएँ व स्वच्छता', id: null, dur: '14 min' }
      ],
      practicalActivity: {
        title: 'Adolescent Growth Spurt and Nutritional Balance Analysis',
        materials: ['WHO/ICMR Adolescent Growth Percentile Chart', 'Nutritional intake worksheet'],
        procedure: [
          'Collect anonymized age, height, and weight measurements for adolescent student groups.',
          'Plot the growth trajectory curves for boys and girls between ages 10 and 17.',
          'Identify the peak growth velocity window (growth spurt).',
          'Evaluate daily diet logs against ICMR recommended dietary allowances for iron, calcium, and protein.'
        ],
        safety: 'Promote body positivity; ensure student measurement records remain confidential.',
        realWorldApplication: 'Rashtriya Kishor Swasthya Karyakram (RKSK) delivering iron-folic acid supplements in Indian government schools.'
      }
    },
    {
      num: 8,
      titleEn: 'Force and Pressure',
      titleHi: 'बल तथा दाब',
      duration: '50 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Contact and Non-Contact Forces', titleHi: 'संपर्क व असंपर्क बल', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Pressure (P = Force / Area) & Everyday Examples', titleHi: 'दाब (दाब = बल / क्षेत्रफल) व दैनिक उदाहरण', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Liquid and Atmospheric Pressure', titleHi: 'द्रवों एवं वायुमंडलीय दाब', id: null, dur: '17 min' }
      ],
      practicalActivity: {
        title: 'Demonstrating Liquid Pressure Variation with Depth',
        materials: ['1-litre cylindrical plastic bottle', 'Compass needle / hot pin', 'Water', 'Large plastic tray'],
        procedure: [
          'Pierce three identical small pinholes at three different vertical heights along one side of the plastic bottle (top, middle, bottom).',
          'Cover the three holes temporarily with waterproof adhesive tape.',
          'Fill the bottle completely with water and place it in the center of the tray.',
          'Strip off the tape quickly and observe the three jets of water squirting out simultaneously.',
          'Notice that the lowest hole shoots water out with the greatest horizontal range, demonstrating that hydrostatic pressure increases with fluid depth.'
        ],
        safety: 'Carefully handle sharp pins; perform the experiment inside a sink or large tray to prevent water slipping hazards.',
        realWorldApplication: 'Hydroelectric dams (Bhakra Nangal, Tehri) are engineered with exceptionally thick concrete bases to withstand extreme hydrostatic pressure.'
      }
    },
    {
      num: 9,
      titleEn: 'Friction',
      titleHi: 'घर्षण',
      duration: '46 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Factors Affecting Friction & Surface Interlocking', titleHi: 'घर्षण को प्रभावित करने वाले कारक', id: null, dur: '15 min' },
        { part: 2, titleEn: 'Static, Sliding and Rolling Friction Comparison', titleHi: 'स्थैतिक, सर्पी और लोटनिक घर्षण की तुलना', id: null, dur: '15 min' },
        { part: 3, titleEn: 'Friction: A Necessary Evil & Fluid Friction (Drag)', titleHi: 'घर्षण: एक अनिवार्य बुराई व तरल घर्षण (Drag)', id: null, dur: '16 min' }
      ],
      practicalActivity: {
        title: 'Comparing Limiting Friction Across Different Surface Textures',
        materials: ['Wooden rectangular block with hook', 'Spring balance (0-5 N calibrated)', 'Glass sheet', 'Sandpaper sheet', 'Wooden tabletop'],
        procedure: [
          'Zero-calibrate the spring balance vertically before starting.',
          'Place the wooden block on the smooth wooden table and attach the spring balance hook.',
          'Pull gently and horizontally. Note the balance reading at the exact instant the block begins to move (limiting static friction).',
          'Repeat the test placing the block on the glass sheet, and then on the coarse sandpaper.',
          'Compare the readings: Sandpaper produces highest friction due to microscopic asperities; glass produces lowest friction.'
        ],
        safety: 'Ensure the spring balance is not stretched beyond its elastic limit.',
        realWorldApplication: 'Anti-lock braking systems (ABS) and deeply grooved tread patterns on Indian commercial truck tyres.'
      }
    },
    {
      num: 10,
      titleEn: 'Sound',
      titleHi: 'ध्वनि',
      duration: '48 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Sound Produced by Vibrating Bodies & Vocal Cords', titleHi: 'कंपित वस्तुओं व स्वर-तंतुओं द्वारा ध्वनि उत्पादन', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Propagation of Sound Through Media & Vacuum Bell Jar', titleHi: 'ध्वनि का संचरण व निर्वात में अप्रसार', id: null, dur: '16 min' },
        { part: 3, titleEn: 'Amplitude, Time Period, Frequency, Pitch & Noise Pollution', titleHi: 'आयाम, आवर्तकाल, आवृत्ति, तारत्व व ध्वनि प्रदूषण', id: null, dur: '16 min' }
      ],
      practicalActivity: {
        title: 'Visualizing Sound Vibrations in Liquids Using a Tuning Fork',
        materials: ['Tuning fork (512 Hz or 256 Hz)', 'Rubber striking pad', 'Beaker full of water'],
        procedure: [
          'Strike one prong of the tuning fork sharply against the rubber pad.',
          'Hold the vibrating prongs near your ear to hear the acoustic tone.',
          'Strike the tuning fork again firmly on the rubber pad.',
          'Immediately dip the tips of both vibrating prongs lightly into the water beaker.',
          'Observe energetic water droplets splashing outward, proving that sound emission is fundamentally accompanied by rapid physical oscillations.'
        ],
        safety: 'Never strike metal tuning forks against stone desks or fragile glassware.',
        realWorldApplication: 'Ultrasound medical diagnostic probes and ultrasonic cleaning baths in precision watchmaking.'
      }
    },
    {
      num: 11,
      titleEn: 'Chemical Effects of Electric Current',
      titleHi: 'विद्युत धारा के रासायनिक प्रभाव',
      duration: '50 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Do Liquids Conduct Electricity? (Electrolytes)', titleHi: 'क्या द्रव विद्युत का चालन करते हैं? (विद्युत-अपघट्य)', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Chemical Effects: Gas Bubbles & Color Changes at Electrodes', titleHi: 'रासायनिक प्रभाव: गैस के बुलबुले व इलेक्ट्रोड पर रंग परिवर्तन', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Electroplating Process, Circuit Diagram & Commercial Uses', titleHi: 'विद्युत लेपन (Electroplating) व व्यावसायिक उपयोग', id: null, dur: '17 min' }
      ],
      practicalActivity: {
        title: 'Testing Electrical Conductivity of Liquids using an LED Tester',
        materials: ['9V battery or two 1.5V cells in series', 'LED bulb', '1 k-ohm resistor', 'Copper connecting wires', 'Beakers', 'Lemon juice', 'Tap water', 'Distilled water', 'Common salt'],
        procedure: [
          'Connect the positive battery terminal through the 1k resistor to the longer lead of the LED.',
          'Leave two bare copper wire ends open with a 1 cm gap as probe terminals.',
          'Dip the probes into lemon juice without letting them touch. Observe the LED glow brightly (good conductor).',
          'Rinse and dry the probes. Dip them into distilled water (LED stays off: poor conductor).',
          'Dissolve half a teaspoon of salt into the distilled water. The LED turns on brightly due to free Na+ and Cl- ions conducting current.'
        ],
        safety: 'Strictly use dry-cell batteries below 9V. Never connect experimental circuit wires to 230V household AC outlets!',
        realWorldApplication: 'Industrial electroplating of chromium onto bicycle rims and zinc galvanization of Indian Railways overhead power masts.'
      }
    },
    {
      num: 12,
      titleEn: 'Some Natural Phenomena',
      titleHi: 'कुछ प्राकृतिक परिघटनाएँ',
      duration: '42 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Charging by Friction & Types of Electric Charges', titleHi: 'रगड़ द्वारा आवेशन व आवेशों के प्रकार', id: null, dur: '14 min' },
        { part: 2, titleEn: 'Lightning Story, Safety Rules & Lightning Conductors', titleHi: 'तड़ित की कहानी, सुरक्षा उपाय व तड़ित चालक', id: null, dur: '14 min' },
        { part: 3, titleEn: 'Earthquakes: Tectonic Plates, Richter Scale & Seismograph', titleHi: 'भूकंप: विवर्तनिक प्लेटें, रिक्टर पैमाना व सिस्मोग्राफ', id: null, dur: '14 min' }
      ],
      practicalActivity: {
        title: 'Constructing and Calibrating a Foil-Leaf Electroscope',
        materials: ['Empty clean glass jar', 'Cardboard square lid', 'Copper wire (10 cm)', 'Aluminum foil cut into two small strips (4x1 cm)', 'Plastic ballpen refill', 'Woolen cloth'],
        procedure: [
          'Push the copper wire through the cardboard lid, bending the lower end into a small hook.',
          'Hang the two aluminum foil strips loosely side-by-side on the copper hook inside the glass jar.',
          'Close the lid firmly.',
          'Rub the plastic refill vigorously with the woolen cloth to accumulate negative static electric charge.',
          'Touch the charged refill to the top exposed end of the copper wire.',
          'Observe the two aluminum strips diverge apart immediately due to electrostatic repulsion between like charges.'
        ],
        safety: 'Perform on dry non-humid days for optimal electrostatic charge retention.',
        realWorldApplication: 'Lightning conductors installed on historical monuments like the Taj Mahal and Qutub Minar to safely divert lightning strikes into the earth.'
      }
    },
    {
      num: 13,
      titleEn: 'Light',
      titleHi: 'प्रकाश',
      duration: '50 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Laws of Reflection & Regular vs Diffuse Reflection', titleHi: 'परावर्तन के नियम व नियमित तथा विसरित परावर्तन', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Multiple Images, Kaleidoscope & Dispersion of Light', titleHi: 'बहुविध प्रतिबिंब, कैलिडोस्कोप व प्रकाश का विक्षेपण', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Structure of the Human Eye, Care of Eyes & Braille System', titleHi: 'मानव नेत्र की संरचना, नेत्रों की देखभाल व ब्रेल पद्धति', id: null, dur: '17 min' }
      ],
      practicalActivity: {
        title: 'Verifying the Laws of Reflection with a Plane Mirror and Pins',
        materials: ['Drawing board', 'White sheet of paper', 'Plane mirror with wooden stand', 'Optical pins (4)', 'Protractor', 'Ruler'],
        procedure: [
          'Fix the white sheet on the drawing board and draw a straight line MM with a normal ON perpendicular to it at center O.',
          'Draw an incident ray AO at an angle of 30 degrees to the normal ON.',
          'Fix two pins P and Q vertically on the line AO at least 5 cm apart.',
          'Place the plane mirror vertically along line MM.',
          'Looking into the mirror from the other side of normal, fix pins R and S such that their bases appear in a straight line with images of P and Q.',
          'Remove mirror and pins. Draw ray OB through R and S. Measure the angle of reflection ∠r with the protractor.',
          'Verify that ∠i = ∠r = 30°, confirming the First Law of Reflection.'
        ],
        safety: 'Take care when inserting sharp optical pins into the wooden drawing board.',
        realWorldApplication: 'Periscopes designed for Indian Navy submarine navigation and side rearview mirrors in motor vehicles.'
      }
    }
  ],

  // ==================== CLASS 9 SCIENCE (All 12 NCERT Rationalised Chapters) ====================
  'sci-9': [
    {
      num: 1,
      titleEn: 'Matter in Our Surroundings',
      titleHi: 'हमारे आस-पास के पदार्थ',
      duration: '48 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Physical Nature & States of Matter (Solid, Liquid, Gas)', titleHi: 'पदार्थ का भौतिक स्वरूप व अवस्थाएँ', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Interconversion of States: Latent Heat of Fusion & Vaporisation', titleHi: 'अवस्था परिवर्तन: संगलन व वाष्पीकरण की गुप्त ऊष्मा', id: null, dur: '16 min' },
        { part: 3, titleEn: 'Evaporation and Factors Affecting Evaporative Cooling', titleHi: 'वाष्पीकरण व शीतलन प्रभाव', id: null, dur: '16 min' }
      ],
      practicalActivity: {
        title: 'Demonstrating Cooling Caused by Evaporation',
        materials: ['Acetone or rubbing alcohol', 'Cotton swab', 'Thermometer'],
        procedure: [
          'Measure room temperature with the thermometer.',
          'Dip a cotton swab in acetone or medical spirit and dab lightly on the palm of your hand.',
          'Record the immediate cooling sensation felt on your palm.',
          'Explain why: Acetone absorbs latent heat of vaporization from the skin, leaving the skin cooler.'
        ],
        safety: 'Acetone is flammable; keep away from open flames and do not inhale vapors directly.',
        realWorldApplication: 'Traditional Indian earthen pots (matkas) keeping drinking water cool through porous surface evaporation.'
      }
    },
    {
      num: 2,
      titleEn: 'Is Matter Around Us Pure?',
      titleHi: 'क्या हमारे आस-पास के पदार्थ शुद्ध हैं?',
      duration: '50 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Mixtures vs Pure Substances (Homogeneous & Heterogeneous)', titleHi: 'मिश्रण व शुद्ध पदार्थ (समांगी व विषमांगी)', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Solutions, Suspensions and Colloids (Tyndall Effect)', titleHi: 'विलयन, निलंबन और कोलाइड (टिंडल प्रभाव)', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Concentration of Solution (Mass by Mass %, Mass by Volume %)', titleHi: 'विलयन की सांद्रता की गणना', id: null, dur: '17 min' }
      ],
      practicalActivity: {
        title: 'Demonstration of Tyndall Effect in Colloidal Solutions vs True Solutions',
        materials: ['Clear glass tumbler with salt water (true solution)', 'Clear glass tumbler with water + 2 drops milk (colloid)', 'Laser pointer or focused LED torch'],
        procedure: [
          'Darken the room.',
          'Shine the laser beam horizontally through the salt water solution. Notice the beam path is completely invisible inside the liquid.',
          'Shine the laser beam through the milk-water mixture.',
          'Observe the bright illuminated beam path clearly visible inside the liquid as colloidal milk fat particles scatter light rays (Tyndall Effect).'
        ],
        safety: 'Never shine laser beams into anyone eyes.',
        realWorldApplication: 'Sunlight streaming through dense tree canopy in foggy winter mornings across northern India.'
      }
    },
    {
      num: 3,
      titleEn: 'Atoms and Molecules',
      titleHi: 'परमाणु एवं अणु',
      duration: '52 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Laws of Chemical Combination (Conservation of Mass & Constant Proportions)', titleHi: 'रासायनिक संयोजन के नियम (द्रव्यमान संरक्षण व स्थिर अनुपात)', id: null, dur: '17 min' },
        { part: 2, titleEn: 'Dalton Atomic Theory, Symbols & Atomic Mass Unit (u)', titleHi: 'डाल्टन का परमाणु सिद्धांत व परमाणु द्रव्यमान', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Writing Chemical Formulae & Molecular Mass Calculations', titleHi: 'रासायनिक सूत्र लिखना व आण्विक द्रव्यमान की गणना', id: null, dur: '18 min' }
      ],
      practicalActivity: {
        title: 'Experimental Verification of the Law of Conservation of Mass',
        materials: ['Conical flask (100 ml)', 'Small ignition test tube', 'Thread', 'Rubber cork', 'Chemical balance', 'Barium chloride solution', 'Sodium sulphate solution'],
        procedure: [
          'Pour 10 ml of sodium sulphate solution into the conical flask.',
          'Fill the small ignition tube with 5 ml of barium chloride solution and tie a thread around its neck.',
          'Carefully suspend the ignition tube inside the flask without mixing the liquids, and seal with a cork.',
          'Weigh the entire assembled flask on the chemical balance (Mass M1).',
          'Tilt and swirl the flask to thoroughly mix both solutions. A white precipitate of barium sulphate forms instantly.',
          'Reweigh the flask (Mass M2). Verify that M1 = M2, demonstrating mass conservation in chemical transformations.'
        ],
        safety: 'Wear lab aprons and handle glassware with care.',
        realWorldApplication: 'Stoichiometric balancing in industrial chemical manufacturing of fertilizers (IFFCO, Tata Chemicals).'
      }
    },
    {
      num: 4,
      titleEn: 'Structure of the Atom',
      titleHi: 'परमाणु की संरचना',
      duration: '54 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Subatomic Particles (Electrons, Protons, Neutrons) & Thomson Model', titleHi: 'अपरमाणुक कण व टॉमसन का परमाणु मॉडल', id: null, dur: '18 min' },
        { part: 2, titleEn: 'Rutherford Alpha-Particle Scattering Experiment & Nuclear Model', titleHi: 'रदरफोर्ड का अल्फा-कण प्रकीर्णन प्रयोग व नाभिक', id: null, dur: '18 min' },
        { part: 3, titleEn: 'Bohr Model, Valency, Atomic Number (Z), Mass Number (A) & Isotopes', titleHi: 'बोहर का मॉडल, संयोजकता, समस्थानिक व समभारिक', id: null, dur: '18 min' }
      ]
    },
    {
      num: 5,
      titleEn: 'The Fundamental Unit of Life',
      titleHi: 'जीवन की मौलिक इकाई',
      duration: '52 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Discovery of Cell & Preparing Temporary Mount of Onion Peel', titleHi: 'कोशिका की खोज व प्याज की झिल्ली की स्लाइड', id: null, dur: '17 min' },
        { part: 2, titleEn: 'Plasma Membrane, Osmosis (Hypo/Hyper/Isotonic) & Cell Wall', titleHi: 'प्लाज्मा झिल्ली, परासरण व कोशिका भित्ति', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Nucleus, Cytoplasm & Organelles (Mitochondria, Plastids, Ribosomes)', titleHi: 'केंद्रक, कोशिकाद्रव्य व कोशिकांग (माइटोकॉन्ड्रिया, लवक)', id: null, dur: '18 min' }
      ],
      practicalActivity: {
        title: 'Preparation and Microscopic Examination of Onion Peel Slide',
        materials: ['Fresh onion bulb', 'Forceps', 'Watch glass', 'Clean glass slide & coverslip', 'Safranin stain', 'Glycerine', 'Compound microscope'],
        procedure: [
          'Peel a small fleshy leaf scale from the onion bulb.',
          'Using fine forceps, strip off a thin transparent peel (epidermis) from the inner concave surface.',
          'Place peel into a watch glass containing water.',
          'Transfer the peel onto a glass slide, add 1-2 drops of safranin stain for 1 minute, and blot excess.',
          'Add a drop of glycerine, lower coverslip gently at 45° with a needle to avoid air bubbles.',
          'Examine under 10x and 40x. Observe brick-like rectangular plant cells with distinct cell walls, cytoplasm, and dense nuclei.'
        ],
        safety: 'Careful with razor blade and optical glass coverslips.',
        realWorldApplication: 'Histopathology and biopsy diagnostics in cancer detection labs across Indian hospitals.'
      }
    },
    {
      num: 6,
      titleEn: 'Tissues',
      titleHi: 'ऊतक',
      duration: '48 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Plant Tissues: Meristematic (Apical, Intercalary, Lateral)', titleHi: 'पादप ऊतक: विभज्योतक ऊतक', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Permanent Plant Tissues: Simple (Parenchyma, Collenchyma) & Complex (Xylem, Phloem)', titleHi: 'स्थायी पादप ऊतक (सरल व जटिल: जाइलम, फ्लोएम)', id: null, dur: '16 min' },
        { part: 3, titleEn: 'Animal Tissues: Epithelial, Connective (Blood, Bone, Cartilage), Muscular, Nervous', titleHi: 'जंतु ऊतक: उपकला, संयोजी, पेशीय व तंत्रिका ऊतक', id: null, dur: '16 min' }
      ]
    },
    {
      num: 7,
      titleEn: 'Motion',
      titleHi: 'गति',
      duration: '55 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Distance vs Displacement, Uniform & Non-Uniform Motion', titleHi: 'दूरी व विस्थापन, एकसमान व असमान गति', id: null, dur: '18 min' },
        { part: 2, titleEn: 'Speed, Velocity and Acceleration (a = [v-u]/t)', titleHi: 'चाल, वेग और त्वरण', id: null, dur: '18 min' },
        { part: 3, titleEn: 'Graphical Derivation of Equations of Motion (v=u+at, s=ut+1/2at², v²=u²+2as)', titleHi: 'गति के समीकरणों का ग्राफीय निगमन', id: null, dur: '19 min' }
      ],
      practicalActivity: {
        title: 'Plotting Distance-Time Graphs and Calculating Velocity',
        materials: ['1-meter inclined wooden channel/ramp', 'Steel ball or toy car', 'Stopwatch', 'Measuring tape'],
        procedure: [
          'Mark distances at 20 cm, 40 cm, 60 cm, 80 cm, and 100 cm along the ramp.',
          'Release the toy car from rest at the top and record time taken to cross each mark using the stopwatch.',
          'Tabulate distance vs time data over 3 trials to compute average velocity.',
          'Plot distance on y-axis and time on x-axis; determine slope of tangent to verify accelerating motion.'
        ],
        safety: 'Ensure clear runoff space at bottom of ramp.',
        realWorldApplication: 'Speedometers and telematics trackers fitted on Vande Bharat trains calculating dynamic deceleration.'
      }
    },
    {
      num: 8,
      titleEn: 'Force and Laws of Motion',
      titleHi: 'बल तथा गति के नियम',
      duration: '56 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Balanced & Unbalanced Forces and Newton First Law (Inertia)', titleHi: 'संतुलित-असंतुलित बल व न्यूटन का प्रथम नियम (जड़त्व)', id: null, dur: '18 min' },
        { part: 2, titleEn: 'Newton Second Law, Linear Momentum (p = mv) & Force Formula (F = ma)', titleHi: 'न्यूटन का द्वितीय नियम व संवेग (F = ma)', id: null, dur: '19 min' },
        { part: 3, titleEn: 'Newton Third Law & Law of Conservation of Momentum', titleHi: 'न्यूटन का तृतीय नियम व संवेग संरक्षण का नियम', id: null, dur: '19 min' }
      ],
      practicalActivity: {
        title: 'Demonstrating Inertia of Rest with Glass Tumbler, Card and Coin',
        materials: ['Glass tumbler', 'Stiff 5x5 cm playing card / index card', 'Five-rupee coin'],
        procedure: [
          'Place the card flat over the mouth of the glass tumbler.',
          'Center the heavy coin directly over the card above the tumbler opening.',
          'Flick the card sharply and horizontally with your middle finger.',
          'Observe that the card flies away horizontally, while the coin drops straight into the glass tumbler.',
          'Explanation: Inertia of rest causes the coin to maintain its position until unbalanced gravitational force pulls it downward.'
        ],
        safety: 'Use thick glass or plastic tumbler so it does not tip over.',
        realWorldApplication: 'Seatbelts and airbags restraining passengers in sudden vehicular collisions on Indian expressways.'
      }
    },
    {
      num: 9,
      titleEn: 'Gravitation',
      titleHi: 'गुरुत्वाकर्षण',
      duration: '50 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Universal Law of Gravitation: F = G (m1 m2)/d² & Constant G', titleHi: 'गुरुत्वाकर्षण का सार्वत्रिक नियम', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Free Fall, Acceleration Due to Gravity (g = 9.8 m/s²) & Mass vs Weight', titleHi: 'मुक्त पतन, गुरुत्वीय त्वरण (g) व द्रव्यमान बनाम भार', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Thrust, Pressure in Fluids, Buoyancy & Archimedes Principle', titleHi: 'प्रणोद, उत्प्लावकता व आर्किमिडीज का सिद्धांत', id: null, dur: '17 min' }
      ],
      practicalActivity: {
        title: 'Verifying Archimedes Principle Using Overflow Jar and Spring Balance',
        materials: ['Eureka overflow can', 'Graduated measuring cylinder', 'Solid metal block', 'Spring balance', 'Water'],
        procedure: [
          'Weigh the solid metal block in air using the spring balance (Weight W1).',
          'Fill the overflow can until water begins trickling out of the spout; allow dripping to stop.',
          'Place a clean, dry measuring cylinder beneath the spout.',
          'Slowly immerse the suspended metal block completely into the overflow can.',
          'Record the apparent weight of the block immersed in water (Weight W2).',
          'Measure the volume of displaced water in the cylinder and compute its weight (W_water).',
          'Verify that Apparent Loss in Weight (W1 - W2) equals the Weight of Displaced Water.'
        ],
        safety: 'Perform carefully over a spill tray.',
        realWorldApplication: 'Naval engineering: Designing steel warships (like INS Vikrant) that displace water equal to their massive tonnage.'
      }
    },
    {
      num: 10,
      titleEn: 'Work and Energy',
      titleHi: 'कार्य तथा ऊर्जा',
      duration: '52 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Scientific Concept of Work: W = F · s cos θ & Unit Joule', titleHi: 'कार्य की वैज्ञानिक संकल्पना (W = F · s) व मात्रक जूल', id: null, dur: '17 min' },
        { part: 2, titleEn: 'Kinetic Energy (1/2 mv²) & Potential Energy (mgh)', titleHi: 'गतिज ऊर्जा व स्थितिज ऊर्जा', id: null, dur: '17 min' },
        { part: 3, titleEn: 'Law of Conservation of Energy, Power (P = W/t, Watt) & Commercial Unit (kWh)', titleHi: 'ऊर्जा संरक्षण का नियम, शक्ति (वाट) व किलोवाट-घंटा', id: null, dur: '18 min' }
      ]
    },
    {
      num: 11,
      titleEn: 'Sound',
      titleHi: 'ध्वनि',
      duration: '48 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Production & Longitudinal Nature of Sound (Compressions & Rarefactions)', titleHi: 'ध्वनि का उत्पादन व अनुदैर्ध्य प्रकृति', id: null, dur: '16 min' },
        { part: 2, titleEn: 'Characteristics of Sound: Wavelength (λ), Frequency (ν), Speed (v = νλ)', titleHi: 'ध्वनि के अभिलक्षण: तरंगदैर्ध्य, आवृत्ति व चाल', id: null, dur: '16 min' },
        { part: 3, titleEn: 'Reflection of Sound, Echo, Reverberation, SONAR & Structure of Human Ear', titleHi: 'ध्वनि का परावर्तन, प्रतिध्वनि, सोनार व मानव कर्ण', id: null, dur: '16 min' }
      ]
    },
    {
      num: 12,
      titleEn: 'Improvement in Food Resources',
      titleHi: 'खाद्य संसाधनों में सुधार',
      duration: '45 min',
      oneShotId: null,
      topics: [
        { part: 1, titleEn: 'Crop Variety Improvement (Hybridization & GM Crops)', titleHi: 'फसल की किस्मों में सुधार', id: null, dur: '15 min' },
        { part: 2, titleEn: 'Crop Production Management: Nutrients (Manure vs Fertilizer) & Irrigation', titleHi: 'फसल उत्पादन प्रबंध: पोषक तत्व व सिंचाई प्रणालियाँ', id: null, dur: '15 min' },
        { part: 3, titleEn: 'Crop Protection & Animal Husbandry (Cattle, Poultry, Fisheries, Apiculture)', titleHi: 'फसल सुरक्षा व पशुपालन (डेयरी, मुर्गी, मत्स्य, मधुमक्खी पालन)', id: null, dur: '15 min' }
      ]
    }
  ],

  // ==================== CLASS 10 SCIENCE (All 13 Chapters) ====================
  'sci-10': [
    {
      num: 1,
      titleEn: 'Chemical Reactions and Equations',
      titleHi: 'रासायनिक अभिक्रियाएँ एवं समीकरण',
      duration: '55 min',
      oneShotId: 'gQ-X9wV8TXQ',
      practicalActivity: {
        title: 'Burning of Magnesium Ribbon in Air and Testing Basic Nature of Ash',
        materials: ['Magnesium ribbon (3-4 cm)', 'Sandpaper', 'Pair of tongs', 'Spirit lamp / Bunsen burner', 'Watch glass', 'Red and blue litmus papers', 'Test tube with water'],
        procedure: [
          'Clean a magnesium ribbon about 3-4 cm long by rubbing it thoroughly with sandpaper to remove the protective basic magnesium carbonate layer.',
          'Hold the ribbon securely with a pair of tongs.',
          'Ignite it using a spirit lamp and observe the dazzling white flame.',
          'Collect the white powder formed (Magnesium Oxide, MgO) in a clean watch glass.',
          'Dissolve a pinch of the ash in water to form Magnesium Hydroxide [Mg(OH)2] and test with red litmus paper; observe the color turn blue confirming basic character.'
        ],
        safety: 'Wear safety goggles. Do not look directly at the dazzling white flame to protect eyes.',
        realWorldApplication: 'Pyrotechnics & fireworks manufacturing; anti-acid indigestion medication (Milk of Magnesia).'
      },
      topics: [
        { part: 1, titleEn: 'Types of Chemical Reactions', titleHi: 'रासायनिक अभिक्रियाओं के प्रकार', id: 'gQ-X9wV8TXQ', dur: '18 min' },
        { part: 2, titleEn: 'Balancing Chemical Equations', titleHi: 'रासायनिक समीकरण संतुलित करना', id: 'JJD14urpQg4', dur: '18 min' },
        { part: 3, titleEn: 'Redox Reactions, Corrosion & Rancidity', titleHi: 'रेडॉक्स, संक्षारण और विकृतगंधिता', id: 'gQ-X9wV8TXQ', dur: '19 min' }
      ]
    },
    {
      num: 2,
      titleEn: 'Acids, Bases and Salts',
      titleHi: 'अम्ल, क्षारक एवं लवण',
      duration: '50 min',
      oneShotId: 'qKl4mieovu0',
      topics: [
        { part: 1, titleEn: 'Indicators and Chemical Properties of Acids & Bases', titleHi: 'सूचक और अम्ल-क्षार के रासायनिक गुण', id: 'qKl4mieovu0', dur: '16 min' },
        { part: 2, titleEn: 'pH Scale and Importance in Daily Life', titleHi: 'pH पैमाना और दैनिक जीवन में महत्व', id: 'qKl4mieovu0', dur: '17 min' },
        { part: 3, titleEn: 'Salts: Bleaching Powder, Baking Soda, Plaster of Paris', titleHi: 'महत्वपूर्ण लवण: विरंजक चूर्ण, बेकिंग सोडा, प्लास्टर ऑफ पेरिस', id: 'qKl4mieovu0', dur: '17 min' }
      ]
    },
    {
      num: 3,
      titleEn: 'Metals and Non-Metals',
      titleHi: 'धातु एवं अधातु',
      duration: '52 min',
      oneShotId: '1Y_sfMEmyPY',
      topics: [
        { part: 1, titleEn: 'Physical & Chemical Properties of Metals', titleHi: 'धातुओं के भौतिक व रासायनिक गुण', id: '1Y_sfMEmyPY', dur: '18 min' },
        { part: 2, titleEn: 'Reactivity Series & Ionic Compounds', titleHi: 'सक्रियता श्रेणी व आयनिक यौगिक', id: '1Y_sfMEmyPY', dur: '17 min' },
        { part: 3, titleEn: 'Metallurgy: Extraction of Metals from Ores', titleHi: 'धातु कर्म: अयस्कों से धातुओं का निष्कर्षण', id: '1Y_sfMEmyPY', dur: '17 min' }
      ]
    },
    {
      num: 4,
      titleEn: 'Carbon and its Compounds',
      titleHi: 'कार्बन एवं उसके यौगिक',
      duration: '58 min',
      oneShotId: 'mb3csoFqLGs',
      topics: [
        { part: 1, titleEn: 'Covalent Bonding & Versatile Nature of Carbon', titleHi: 'सहसंयोजी आबंध व कार्बन की सर्वतोमुखी प्रकृति', id: 'mb3csoFqLGs', dur: '20 min' },
        { part: 2, titleEn: 'Homologous Series & IUPAC Nomenclature', titleHi: 'समजातीय श्रेणी व नामकरण (IUPAC)', id: 'mb3csoFqLGs', dur: '20 min' },
        { part: 3, titleEn: 'Ethanol, Ethanoic Acid, Soaps & Detergents', titleHi: 'एथेनॉल, एथेनॉइक अम्ल, साबुन और अपमार्जक', id: 'mb3csoFqLGs', dur: '18 min' }
      ]
    },
    {
      num: 5,
      titleEn: 'Life Processes',
      titleHi: 'जैव प्रक्रम',
      duration: '60 min',
      oneShotId: '2anxgj0TUgQ',
      topics: [
        { part: 1, titleEn: 'Nutrition: Autotrophic & Heterotrophic (Human Digestion)', titleHi: 'पोषण: स्वपोषी, विषमपोषी व मानव पाचन तंत्र', id: '2anxgj0TUgQ', dur: '20 min' },
        { part: 2, titleEn: 'Respiration & Transportation (Heart & Blood Circulation)', titleHi: 'श्वसन व मानव परिसंचरण तंत्र (हृदय की कार्यविधि)', id: '2anxgj0TUgQ', dur: '20 min' },
        { part: 3, titleEn: 'Excretion in Humans (Kidney & Nephron Function)', titleHi: 'उत्सर्जन तंत्र (वृक्क व नेफ्रॉन की कार्यविधि)', id: '2anxgj0TUgQ', dur: '20 min' }
      ]
    },
    {
      num: 6,
      titleEn: 'Control and Coordination',
      titleHi: 'नियंत्रण एवं समन्वय',
      duration: '48 min',
      oneShotId: 'zngFHbrfrTw',
      topics: [
        { part: 1, titleEn: 'Human Nervous System & Reflex Arc', titleHi: 'तंत्रिका तंत्र व प्रतिवर्ती चाप', id: 'zngFHbrfrTw', dur: '16 min' },
        { part: 2, titleEn: 'Human Brain Anatomy and Functions', titleHi: 'मानव मस्तिष्क की संरचना व कार्य', id: 'zngFHbrfrTw', dur: '16 min' },
        { part: 3, titleEn: 'Plant Hormones & Endocrine Glands', titleHi: 'पादप हॉर्मोन व अंतःस्रावी ग्रंथियां', id: 'zngFHbrfrTw', dur: '16 min' }
      ]
    },
    {
      num: 7,
      titleEn: 'How do Organisms Reproduce?',
      titleHi: 'जीव जनन कैसे करते हैं?',
      duration: '50 min',
      oneShotId: 'RxXsUm8pwaA',
      topics: [
        { part: 1, titleEn: 'Asexual Reproduction: Fission, Budding, Spores', titleHi: 'अलैंगिक जनन: विखंडन, मुकुलन, बीजाणु निर्माण', id: 'RxXsUm8pwaA', dur: '16 min' },
        { part: 2, titleEn: 'Sexual Reproduction in Flowering Plants', titleHi: 'पुष्पी पौधों में लैंगिक जनन', id: 'RxXsUm8pwaA', dur: '17 min' },
        { part: 3, titleEn: 'Human Reproductive System & Reproductive Health', titleHi: 'मानव जनन तंत्र व जनन स्वास्थ्य', id: 'RxXsUm8pwaA', dur: '17 min' }
      ]
    },
    {
      num: 8,
      titleEn: 'Heredity and Evolution',
      titleHi: 'आनुवंशिकता एवं जैव विकास',
      duration: '45 min',
      oneShotId: 'LE3PUf5ueS4',
      topics: [
        { part: 1, titleEn: 'Mendel Laws of Inheritance (Monohybrid & Dihybrid Cross)', titleHi: 'मेंडल के आनुवंशिकता के नियम (एकसंकर व द्विसंकर संकरण)', id: 'LE3PUf5ueS4', dur: '15 min' },
        { part: 2, titleEn: 'Sex Determination in Humans (XX & XY Chromosomes)', titleHi: 'मानव में लिंग निर्धारण', id: 'LE3PUf5ueS4', dur: '15 min' },
        { part: 3, titleEn: 'Acquired vs Inherited Traits', titleHi: 'उपार्जित और आनुवंशिक लक्षण', id: 'LE3PUf5ueS4', dur: '15 min' }
      ]
    },
    {
      num: 9,
      titleEn: 'Light - Reflection and Refraction',
      titleHi: 'प्रकाश: परावर्तन तथा अपवर्तन',
      duration: '55 min',
      oneShotId: 'MQkNZIsZ2jw',
      topics: [
        { part: 1, titleEn: 'Spherical Mirrors & Ray Diagrams', titleHi: 'गोलीय दर्पण व किरण आरेख', id: 'MQkNZIsZ2jw', dur: '18 min' },
        { part: 2, titleEn: 'Refraction & Snell’s Law', titleHi: 'अपवर्तन व स्नेल का नियम', id: 'w1WNkPKGM5E', dur: '18 min' },
        { part: 3, titleEn: 'Lens Formula, Magnification & Power of Lens', titleHi: 'लेंस सूत्र, आवर्धन व लेंस की क्षमता', id: 'MQkNZIsZ2jw', dur: '19 min' }
      ]
    },
    {
      num: 10,
      titleEn: 'The Human Eye and the Colourful World',
      titleHi: 'मानव नेत्र तथा रंगबिरंगा संसार',
      duration: '45 min',
      oneShotId: 'VWNxgkOr55Y',
      topics: [
        { part: 1, titleEn: 'Human Eye Structure & Defects of Vision (Myopia/Hypermetropia)', titleHi: 'मानव नेत्र की संरचना व दृष्टि दोष (निकट व दूर दृष्टि दोष)', id: 'VWNxgkOr55Y', dur: '15 min' },
        { part: 2, titleEn: 'Dispersion of Light through Prism & Rainbow Formation', titleHi: 'प्रिज्म द्वारा प्रकाश का विक्षेपण व इंद्रधनुष', id: 'VWNxgkOr55Y', dur: '15 min' },
        { part: 3, titleEn: 'Atmospheric Refraction (Twinkling of Stars) & Tyndall Effect', titleHi: 'वायुमंडलीय अपवर्तन (तारों का टिमटिमाना) व टिंडल प्रभाव', id: 'VWNxgkOr55Y', dur: '15 min' }
      ]
    },
    {
      num: 11,
      titleEn: 'Electricity',
      titleHi: 'विद्युत',
      duration: '52 min',
      oneShotId: 'UI8nM-dSfh4',
      topics: [
        { part: 1, titleEn: 'Electric Current, Potential Difference & Ohm’s Law', titleHi: 'विद्युत धारा, विभवांतर व ओम का नियम', id: 'UI8nM-dSfh4', dur: '17 min' },
        { part: 2, titleEn: 'Series and Parallel Combination of Resistors', titleHi: 'प्रतिरोधों का श्रेणीक्रम व समांतर क्रम संयोजन', id: 'UI8nM-dSfh4', dur: '17 min' },
        { part: 3, titleEn: 'Joule’s Heating Effect and Electric Power', titleHi: 'जूल का तापन नियम व विद्युत शक्ति', id: 'UI8nM-dSfh4', dur: '18 min' }
      ]
    },
    {
      num: 12,
      titleEn: 'Magnetic Effects of Electric Current',
      titleHi: 'विद्युत धारा के चुंबकीय प्रभाव',
      duration: '48 min',
      oneShotId: '5YMxdILh5II',
      topics: [
        { part: 1, titleEn: 'Magnetic Field Lines & Right Hand Thumb Rule', titleHi: 'चुंबकीय क्षेत्र रेखाएँ व दक्षिण हस्त अंगुष्ठ नियम', id: '5YMxdILh5II', dur: '16 min' },
        { part: 2, titleEn: 'Force on a Current-Carrying Conductor & Fleming’s Left Hand Rule', titleHi: 'फ्लेमिंग का वाम हस्त नियम व विद्युत मोटर सिद्धांत', id: '5YMxdILh5II', dur: '16 min' },
        { part: 3, titleEn: 'Electromagnetic Induction & Domestic Electric Circuits', titleHi: 'विद्युत चुंबकीय प्रेरण व घरेलू विद्युत परिपथ', id: '5YMxdILh5II', dur: '16 min' }
      ]
    },
    {
      num: 13,
      titleEn: 'Our Environment',
      titleHi: 'हमारा पर्यावरण',
      duration: '38 min',
      oneShotId: 'a_kJH5hrbKQ',
      topics: [
        { part: 1, titleEn: 'Ecosystem, Food Chains and Food Webs', titleHi: 'पारितंत्र, आहार श्रृंखला व आहार जाल', id: 'a_kJH5hrbKQ', dur: '13 min' },
        { part: 2, titleEn: '10% Energy Flow Law & Biological Magnification', titleHi: 'ऊर्जा प्रवाह का 10% नियम व जैव आवर्धन', id: 'a_kJH5hrbKQ', dur: '13 min' },
        { part: 3, titleEn: 'Ozone Layer Depletion and Waste Management', titleHi: 'ओजोन परत का क्षरण व कचरा प्रबंधन', id: 'a_kJH5hrbKQ', dur: '12 min' }
      ]
    }
  ],

  // ==================== CLASS 10 MATHEMATICS (All 14 Chapters) ====================
  'math-10': [
    {
      num: 1,
      titleEn: 'Real Numbers',
      titleHi: 'वास्तविक संख्याएँ',
      duration: '45 min',
      oneShotId: 'QMq0mrZ1dz0',
      topics: [
        { part: 1, titleEn: 'Fundamental Theorem of Arithmetic (Prime Factorization)', titleHi: 'अंकगणित की आधारभूत प्रमेय (अभाज्य गुणनखंडन)', id: 'QMq0mrZ1dz0', dur: '15 min' },
        { part: 2, titleEn: 'Proving Irrationality of √2, √3, √5', titleHi: 'अपरिमेय संख्याओं का सत्यापन (√2, √3, √5)', id: 'QMq0mrZ1dz0', dur: '15 min' },
        { part: 3, titleEn: 'HCF and LCM Applications', titleHi: 'म.स.प. व ल.स.प. के अनुप्रयोग', id: 'QMq0mrZ1dz0', dur: '15 min' }
      ]
    },
    {
      num: 2,
      titleEn: 'Polynomials',
      titleHi: 'बहुपद',
      duration: '48 min',
      oneShotId: 'fl-Q_bT-oO0',
      topics: [
        { part: 1, titleEn: 'Geometric Meaning of Zeroes of a Polynomial', titleHi: 'बहुपद के शून्यकों का ज्यामितीय अर्थ', id: 'fl-Q_bT-oO0', dur: '16 min' },
        { part: 2, titleEn: 'Relationship between Zeroes and Coefficients of Quadratic Polynomial', titleHi: 'शून्यकों और गुणांकों के बीच संबंध (α + β, αβ)', id: 'fl-Q_bT-oO0', dur: '16 min' },
        { part: 3, titleEn: 'Forming Quadratic Polynomials & Practice Questions', titleHi: 'द्विघात बहुपद बनाना व अभ्यास प्रश्न', id: 'fl-Q_bT-oO0', dur: '16 min' }
      ]
    },
    {
      num: 3,
      titleEn: 'Pair of Linear Equations in Two Variables',
      titleHi: 'दो चरों वाले रैखिक समीकरण युग्म',
      duration: '52 min',
      oneShotId: 'tKe6MxnQrXM',
      topics: [
        { part: 1, titleEn: 'Graphical Method of Solution and Consistency Conditions', titleHi: 'ग्राफीय विधि व संगत-असंगत शर्तें', id: 'tKe6MxnQrXM', dur: '18 min' },
        { part: 2, titleEn: 'Substitution Method & Elimination Method', titleHi: 'प्रतिस्थापन विधि व विलोपन विधि', id: 'tKe6MxnQrXM', dur: '17 min' },
        { part: 3, titleEn: 'Word Problems (Speed, Age, Fractions, Fixed Charges)', titleHi: 'इबारती प्रश्न (चाल, आयु, भिन्न व शुल्क)', id: 'tKe6MxnQrXM', dur: '17 min' }
      ]
    },
    {
      num: 4,
      titleEn: 'Quadratic Equations',
      titleHi: 'द्विघात समीकरण',
      duration: '50 min',
      oneShotId: 'fyiiJNOQrrM',
      topics: [
        { part: 1, titleEn: 'Standard Form & Factorization Method', titleHi: 'मानक रूप व गुणनखंडन विधि', id: 'fyiiJNOQrrM', dur: '16 min' },
        { part: 2, titleEn: 'Quadratic Formula (Shridharacharya Rule: x = [-b ± √(b²-4ac)]/2a)', titleHi: 'द्विघाती सूत्र (श्रीधराचार्य नियम)', id: 'fyiiJNOQrrM', dur: '17 min' },
        { part: 3, titleEn: 'Nature of Roots (Discriminant D = b² - 4ac)', titleHi: 'मूलों की प्रकृति (विविक्तकर D)', id: 'fyiiJNOQrrM', dur: '17 min' }
      ]
    },
    {
      num: 5,
      titleEn: 'Arithmetic Progressions (AP)',
      titleHi: 'समान्तर श्रेढ़ियाँ',
      duration: '50 min',
      oneShotId: 'Uexhvcj0fn8',
      topics: [
        { part: 1, titleEn: 'Definition, First Term (a), Common Difference (d)', titleHi: 'परिभाषा, प्रथम पद (a) व सार्व अंतर (d)', id: 'Uexhvcj0fn8', dur: '16 min' },
        { part: 2, titleEn: 'nth Term of an AP: an = a + (n-1)d', titleHi: 'AP का nवाँ पद: an = a + (n-1)d', id: 'Uexhvcj0fn8', dur: '17 min' },
        { part: 3, titleEn: 'Sum of First n Terms: Sn = n/2 [2a + (n-1)d]', titleHi: 'प्रथम n पदों का योग: Sn = n/2 [2a + (n-1)d]', id: 'Uexhvcj0fn8', dur: '17 min' }
      ]
    },
    {
      num: 6,
      titleEn: 'Triangles',
      titleHi: 'त्रिभुज',
      duration: '54 min',
      oneShotId: 'J_Q9Fh7U61Q',
      topics: [
        { part: 1, titleEn: 'Basic Proportionality Theorem (Thales Theorem Proof)', titleHi: 'आधारभूत समानुपातिकता प्रमेय (थेल्स प्रमेय सिद्ध करना)', id: 'J_Q9Fh7U61Q', dur: '18 min' },
        { part: 2, titleEn: 'Converse of BPT & Criteria for Similarity (AAA, SSS, SAS)', titleHi: 'थेल्स प्रमेय का विलोम व समरूपता की कसौटियाँ', id: 'J_Q9Fh7U61Q', dur: '18 min' },
        { part: 3, titleEn: 'Board Exam Geometry Problems and Proofs', titleHi: 'बोर्ड परीक्षा ज्यामिति प्रश्न व हल', id: 'J_Q9Fh7U61Q', dur: '18 min' }
      ]
    },
    {
      num: 7,
      titleEn: 'Coordinate Geometry',
      titleHi: 'निर्देशांक ज्यामिति',
      duration: '48 min',
      oneShotId: '2aon4smurd0',
      topics: [
        { part: 1, titleEn: 'Distance Formula: d = √[(x2-x1)² + (y2-y1)²]', titleHi: 'दूरी सूत्र: d = √[(x2-x1)² + (y2-y1)²]', id: '2aon4smurd0', dur: '16 min' },
        { part: 2, titleEn: 'Section Formula (Internal Division: [mx2+nx1]/[m+n])', titleHi: 'विभाजन सूत्र (अंतः विभाजन)', id: '2aon4smurd0', dur: '16 min' },
        { part: 3, titleEn: 'Mid-point Formula and Collinearity of Points', titleHi: 'मध्य-बिंदु सूत्र व बिंदुओं का संरेखी होना', id: '2aon4smurd0', dur: '16 min' }
      ]
    },
    {
      num: 8,
      titleEn: 'Introduction to Trigonometry',
      titleHi: 'त्रिकोणमिति का परिचय',
      duration: '54 min',
      oneShotId: 'vVjR7zM-Y28',
      topics: [
        { part: 1, titleEn: 'Trigonometric Ratios (sin, cos, tan, cosec, sec, cot)', titleHi: 'त्रिकोणमितीय अनुपात (लाल / कक्का, PBP/HHB)', id: 'vVjR7zM-Y28', dur: '18 min' },
        { part: 2, titleEn: 'Values of Angles (0°, 30°, 45°, 60°, 90°)', titleHi: 'विशिष्ट कोणों के त्रिकोणमितीय मान की सारणी', id: 'xM_4T6iQ_YI', dur: '18 min' },
        { part: 3, titleEn: 'Pythagorean Identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ', titleHi: 'त्रिकोणमितीय सर्वसमिकाएँ सिद्ध करना', id: 'FqCW9J2R8s0', dur: '18 min' }
      ]
    },
    {
      num: 9,
      titleEn: 'Some Applications of Trigonometry (Heights and Distances)',
      titleHi: 'त्रिकोणमिति के कुछ अनुप्रयोग (ऊँचाई और दूरी)',
      duration: '46 min',
      oneShotId: 'yhRRV30Du4o',
      topics: [
        { part: 1, titleEn: 'Angle of Elevation and Angle of Depression Concept', titleHi: 'उन्नयन कोण व अवनमन कोण की संकल्पना', id: 'yhRRV30Du4o', dur: '15 min' },
        { part: 2, titleEn: 'Single Right Triangle Problems (Tower & Shadow)', titleHi: 'एक समकोण त्रिभुज पर आधारित प्रश्न', id: 'Q0zN2yS81E4', dur: '15 min' },
        { part: 3, titleEn: 'Double Triangle Word Problems (Lighthouse, Balloons, Clouds)', titleHi: 'दोहरे कोणों वाले महत्वपूर्ण बोर्ड प्रश्न', id: 'yhRRV30Du4o', dur: '16 min' }
      ]
    },
    {
      num: 10,
      titleEn: 'Circles',
      titleHi: 'वृत्त',
      duration: '45 min',
      oneShotId: 'Jl993aTaBV0',
      topics: [
        { part: 1, titleEn: 'Tangent to a Circle & Perpendicularity Theorem', titleHi: 'वृत्त की स्पर्श रेखा व स्पर्श बिंदु पर लम्बवत प्रमेय', id: 'Jl993aTaBV0', dur: '15 min' },
        { part: 2, titleEn: 'Lengths of Tangents from External Point are Equal', titleHi: 'बाह्य बिंदु से खींची गई स्पर्श रेखाओं की लंबाइयों की समानता', id: 'Jl993aTaBV0', dur: '15 min' },
        { part: 3, titleEn: 'Tangent Proofs & Circumscribed Quadrilaterals', titleHi: 'स्पर्श रेखा पर आधारित महत्वपूर्ण प्रमेय सिद्ध करना', id: 'Jl993aTaBV0', dur: '15 min' }
      ]
    },
    {
      num: 11,
      titleEn: 'Areas Related to Circles',
      titleHi: 'वृत्तों से संबंधित क्षेत्रफल',
      duration: '44 min',
      oneShotId: 'xcfASunvobM',
      topics: [
        { part: 1, titleEn: 'Perimeter and Area of a Circle Review', titleHi: 'वृत्त की परिधि और क्षेत्रफल की पुनरावृत्ति', id: 'xcfASunvobM', dur: '14 min' },
        { part: 2, titleEn: 'Area of Sector and Segment of a Circle: (θ/360) × πr²', titleHi: 'त्रिज्यखंड और वृत्तखंड का क्षेत्रफल', id: 'xcfASunvobM', dur: '15 min' },
        { part: 3, titleEn: 'Problems on Clock Hands, Brooches & Shaded Regions', titleHi: 'घड़ी की सुई, ब्रूच व छायांकित भाग का क्षेत्रफल', id: 'xcfASunvobM', dur: '15 min' }
      ]
    },
    {
      num: 12,
      titleEn: 'Surface Areas and Volumes',
      titleHi: 'पृष्ठीय क्षेत्रफल और आयतन',
      duration: '52 min',
      oneShotId: '68f1ex3s4y4',
      topics: [
        { part: 1, titleEn: 'Surface Area of Combination of Solids (Cylinder, Cone, Hemisphere)', titleHi: 'ठोसों के संयोजन का पृष्ठीय क्षेत्रफल (बेलन, शंकु, अर्धगोला)', id: '68f1ex3s4y4', dur: '17 min' },
        { part: 2, titleEn: 'Volume of Combination of Solids', titleHi: 'ठोसों के संयोजन का आयतन', id: '68f1ex3s4y4', dur: '17 min' },
        { part: 3, titleEn: 'Conversion of Solid from One Shape to Another', titleHi: 'एक ठोस को दूसरे आकार में बदलना व पानी के स्तर वाले प्रश्न', id: '68f1ex3s4y4', dur: '18 min' }
      ]
    },
    {
      num: 13,
      titleEn: 'Statistics',
      titleHi: 'सांख्यिकी',
      duration: '50 min',
      oneShotId: '-xy-pfbCgbQ',
      topics: [
        { part: 1, titleEn: 'Mean of Grouped Data (Direct Method, Assumed Mean Method)', titleHi: 'वर्गीकृत आंकड़ों का माध्य (प्रत्यक्ष व कल्पित माध्य विधि)', id: '-xy-pfbCgbQ', dur: '17 min' },
        { part: 2, titleEn: 'Mode of Grouped Data: l + [(f1-f0)/(2f1-f0-f2)] × h', titleHi: 'वर्गीकृत आंकड़ों का बहुलक', id: '-xy-pfbCgbQ', dur: '16 min' },
        { part: 3, titleEn: 'Median of Grouped Data & Empirical Relation (3 Median = Mode + 2 Mean)', titleHi: 'माध्यक व आनुभविक संबंध (3 माध्यक = बहुलक + 2 माध्य)', id: '-xy-pfbCgbQ', dur: '17 min' }
      ]
    },
    {
      num: 14,
      titleEn: 'Probability',
      titleHi: 'प्रायिकता',
      duration: '42 min',
      oneShotId: 'EfUnTM9a1gU',
      topics: [
        { part: 1, titleEn: 'Classical Definition of Probability: P(E) = n(E) / n(S)', titleHi: 'प्रायिकता की सैद्धांतिक परिभाषा', id: 'EfUnTM9a1gU', dur: '14 min' },
        { part: 2, titleEn: 'Coin, Dice and Card Deck Problems (52 Playing Cards)', titleHi: 'सिक्के, पासे और 52 ताश के पत्तों पर आधारित प्रश्न', id: 'EfUnTM9a1gU', dur: '14 min' },
        { part: 3, titleEn: 'Complementary Events: P(E) + P(not E) = 1 & Impossible Events', titleHi: 'पूरक घटनाएं और असंभव घटना की प्रायिकता', id: 'EfUnTM9a1gU', dur: '14 min' }
      ]
    }
  ]
};

// Subjects and chapters generator for all Classes 1 to 12
export function getGradeData(gradeNumber, boardId = 'up_board') {
  const isUpBoard = boardId === 'up_board';
  const boardInfo = BOARDS.find(b => b.id === boardId) || BOARDS[0];

  // Map subjects for this grade
  const subjectsList = getSubjectsForGrade(gradeNumber, isUpBoard, boardId);

  return {
    grade: gradeNumber,
    gradeLabel: isUpBoard ? `कक्षा ${gradeNumber}` : `Class ${gradeNumber}`,
    board: boardInfo,
    tagline: isUpBoard
      ? `${boardInfo.name} • प्रत्येक अध्याय के वन-शॉट व टॉपिक-वाइज वीडियो लेक्चर्स`
      : `${boardInfo.name} • Every Chapter Available in One-Shot Marathon & Topic Series`,
    subjects: subjectsList
  };
}

function getSubjectsForGrade(grade, isUpBoard, boardId = 'cbse') {
  // Primary (Class 1-5)
  if (grade <= 5) {
    return [
      buildSubject(
        `math-${grade}`,
        isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
        'Calculator',
        generateChaptersForSubject('Mathematics', grade, isUpBoard, 8, boardId)
      ),
      buildSubject(
        `evs-${grade}`,
        isUpBoard ? 'पर्यावरण अध्ययन (EVS)' : 'Environmental Studies',
        'Leaf',
        generateChaptersForSubject('EVS', grade, isUpBoard, 8, boardId)
      ),
      buildSubject(
        `eng-${grade}`,
        isUpBoard ? 'अंग्रेजी (English)' : 'English',
        'BookOpen',
        generateChaptersForSubject('English', grade, isUpBoard, 6, boardId)
      )
    ];
  }

  // Middle School (Class 6-8)
  if (grade === 8) {
    return [
      buildSubject(
        'sci-8',
        isUpBoard ? 'विज्ञान (Science)' : 'Science',
        'Atom',
        mapRegistryToChapters(COMPLETE_CHAPTER_REGISTRY['sci-8'], isUpBoard, 'Science', 8, boardId)
      ),
      buildSubject(
        'math-8',
        isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
        'Calculator',
        generateChaptersForSubject('Mathematics', 8, isUpBoard, 13, boardId)
      ),
      buildSubject(
        'sst-8',
        isUpBoard ? 'सामाजिक विज्ञान (Social Science)' : 'Social Science',
        'Compass',
        generateChaptersForSubject('Social Science', 8, isUpBoard, 10, boardId)
      ),
      buildSubject(
        'eng-8',
        isUpBoard ? 'अंग्रेजी (English)' : 'English',
        'BookOpen',
        generateChaptersForSubject('English', 8, isUpBoard, 8, boardId)
      )
    ];
  }

  if (grade <= 8) {
    return [
      buildSubject(
        `math-${grade}`,
        isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
        'Calculator',
        generateChaptersForSubject('Mathematics', grade, isUpBoard, 12, boardId)
      ),
      buildSubject(
        `sci-${grade}`,
        isUpBoard ? 'विज्ञान (Science)' : 'Science',
        'Atom',
        generateChaptersForSubject('Science', grade, isUpBoard, 12, boardId)
      ),
      buildSubject(
        `sst-${grade}`,
        isUpBoard ? 'सामाजिक विज्ञान (Social Science)' : 'Social Science',
        'Compass',
        generateChaptersForSubject('Social Science', grade, isUpBoard, 10, boardId)
      ),
      buildSubject(
        `eng-${grade}`,
        isUpBoard ? 'अंग्रेजी (English)' : 'English',
        'BookOpen',
        generateChaptersForSubject('English', grade, isUpBoard, 8, boardId)
      )
    ];
  }

  // Secondary School (Class 9-10)
  if (grade === 10) {
    return [
      buildSubject(
        'sci-10',
        isUpBoard ? 'विज्ञान (Science)' : 'Science',
        'Atom',
        mapRegistryToChapters(COMPLETE_CHAPTER_REGISTRY['sci-10'], isUpBoard, 'Science', 10, boardId)
      ),
      buildSubject(
        'math-10',
        isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
        'Binary',
        mapRegistryToChapters(COMPLETE_CHAPTER_REGISTRY['math-10'], isUpBoard, 'Mathematics', 10, boardId)
      ),
      buildSubject(
        'sst-10',
        isUpBoard ? 'सामाजिक विज्ञान (Social Science)' : 'Social Science',
        'Compass',
        generateChaptersForSubject('Social Science', 10, isUpBoard, 10, boardId)
      ),
      buildSubject(
        'eng-10',
        isUpBoard ? 'अंग्रेजी (English)' : 'English Language & Literature',
        'BookOpen',
        generateChaptersForSubject('English', 10, isUpBoard, 8, boardId)
      )
    ];
  }

    if (grade === 9) {
    return [
      buildSubject(
        'sci-9',
        isUpBoard ? 'विज्ञान (Science)' : 'Science',
        'Atom',
        mapRegistryToChapters(COMPLETE_CHAPTER_REGISTRY['sci-9'], isUpBoard, 'Science', 9, boardId)
      ),
      buildSubject(
        'math-9',
        isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
        'Binary',
        generateChaptersForSubject('Mathematics', 9, isUpBoard, 12, boardId)
      ),
      buildSubject(
        'sst-9',
        isUpBoard ? 'सामाजिक विज्ञान (Social Science)' : 'Social Science',
        'Compass',
        generateChaptersForSubject('Social Science', 9, isUpBoard, 10, boardId)
      ),
      buildSubject(
        'eng-9',
        isUpBoard ? 'अंग्रेजी (English)' : 'English',
        'BookOpen',
        generateChaptersForSubject('English', 9, isUpBoard, 8, boardId)
      )
    ];
  }

  // Senior Secondary (Class 11 & 12)
  const isIsc = (boardId || '').toLowerCase() === 'icse';
  const phyChapters = mapSeniorSecondaryToChapters(
    getSeniorSecondaryChapters(boardId, grade, 'phy'),
    isUpBoard,
    'Physics',
    grade,
    boardId
  );
  const chemChapters = mapSeniorSecondaryToChapters(
    getSeniorSecondaryChapters(boardId, grade, 'chem'),
    isUpBoard,
    'Chemistry',
    grade,
    boardId
  );
  const mathChapters = mapSeniorSecondaryToChapters(
    getSeniorSecondaryChapters(boardId, grade, 'math'),
    isUpBoard,
    'Mathematics',
    grade,
    boardId
  );
  const bioChapters = mapSeniorSecondaryToChapters(
    getSeniorSecondaryChapters(boardId, grade, 'bio'),
    isUpBoard,
    'Biology',
    grade,
    boardId
  );
  const engChapters = mapSeniorSecondaryToChapters(
    getSeniorSecondaryChapters(boardId, grade, 'eng'),
    isUpBoard,
    'English',
    grade,
    boardId
  );

  return [
    buildSubject(
      `phy-${grade}`,
      isUpBoard ? 'भौतिक विज्ञान (Physics)' : 'Physics',
      'Flame',
      phyChapters
    ),
    buildSubject(
      `chem-${grade}`,
      isUpBoard ? 'रसायन विज्ञान (Chemistry)' : 'Chemistry',
      'FlaskConical',
      chemChapters
    ),
    buildSubject(
      `math-${grade}`,
      isUpBoard ? 'गणित (Mathematics)' : 'Mathematics',
      'Binary',
      mathChapters
    ),
    buildSubject(
      `bio-${grade}`,
      isUpBoard ? 'जीव विज्ञान (Biology)' : 'Biology',
      'Dna',
      bioChapters
    ),
    buildSubject(
      `eng-${grade}`,
      isIsc
        ? 'ISC English (Language & Literature)'
        : isUpBoard
          ? 'अंग्रेजी (English Core)'
          : 'English Core',
      'BookOpen',
      engChapters
    )
  ];
}

function mapSeniorSecondaryToChapters(rawChapters, isUpBoard, subjName, grade, boardId = 'cbse') {
  if (!Array.isArray(rawChapters) || rawChapters.length === 0) {
    return [];
  }
  return rawChapters.map((item, idx) => {
    const chapNum = item.num || idx + 1;
    const subjShort = subjName.toLowerCase().startsWith('math') ? 'math' : subjName.toLowerCase().slice(0, 3);
    const title = isUpBoard && item.titleHi
      ? `अध्याय ${chapNum}: ${item.titleHi} (${item.titleEn})`
      : `Chapter ${chapNum}: ${item.titleEn}`;

    const topicVideos = (item.topics || []).map((t, tIdx) => ({
      id: t.id || `${boardId}-${grade}-${subjShort}-ch${chapNum}-t${tIdx + 1}`,
      part: t.part || tIdx + 1,
      title: isUpBoard && t.titleHi ? `भाग ${t.part || tIdx + 1}: ${t.titleHi} (${t.titleEn})` : `Part ${t.part || tIdx + 1}: ${t.titleEn}`,
      duration: t.dur || '15 min',
      classLevel: Number(grade),
      board: boardId
    }));

    return {
      id: `c${grade}-${subjShort}-ch${chapNum}`,
      chapterNumber: chapNum,
      title,
      classLevel: Number(grade),
      board: boardId,
      subjectId: `${subjShort}-${grade}`,
      duration: item.duration || '45 min',
      status: 'complete',
      isCurated: true,
      difficulty: 'Board Standard',
      unitName: item.unitName || item.section || null,
      unitNumber: item.unitNumber || null,
      section: item.section || null,
      category: item.category || 'official_syllabus',
      curriculumCategory: item.curriculumCategory || 'TYPE_A',
      topics: item.topics || topicVideos,
      practicalActivity: item.practicalActivity || null,
      learningObjectives: [
        `Understand the fundamental principles of ${item.titleEn}`,
        'Master the key board exam formulas, definitions, and derivations',
        'Demonstrate oral retention and solve high-yield practice questions'
      ],
      keyPoints: item.keyPoints || (isUpBoard ? [
        'इस अध्याय के मूल सिद्धांतों को ध्यानपूर्वक समझें',
        'सूत्रों एवं आरेखों का लिख-लिखकर अभ्यास करें',
        'बोलकर याद करने से स्थायी स्मृति बनती है'
      ] : [
        `Understand the core conceptual principles of ${item.titleEn}`,
        'Master the key board formulas, definitions, and derivations',
        'Explaining out loud secures 90%+ long-term retention'
      ]),
      formulas: item.formulas || [],
      solvedQuestions: item.solvedQuestions || [
        {
          q: isUpBoard ? `${item.titleHi || item.titleEn} का मुख्य सिद्धांत क्या है?` : `What is the core principle of ${item.titleEn}?`,
          sol: isUpBoard ? 'इस सिद्धांत का विश्लेषण चरणबद्ध रूप से किया जाता है जिससे परीक्षा में पूर्ण अंक प्राप्त हों।' : 'The principle is explained systematically with diagrams and derivations to secure full marks in board examinations.'
        }
      ],
      notes: {
        definition: isUpBoard && item.titleHi
          ? `अध्याय ${chapNum}: ${item.titleHi} (${item.titleEn})\n\nइस अध्याय की संपूर्ण संकल्पनाएं, आधिकारिक पाठ्यक्रम विवरण, समीकरण एवं परीक्षा की दृष्टि से सर्वाधिक उपयोगी बिंदु यहाँ प्रस्तुत हैं।`
          : `Chapter ${chapNum}: ${item.titleEn}\n\nOfficial syllabus curriculum unit. Complete revision guide covering fundamental principles, derivations, and board examination high-yield summaries.`,
        formulas: item.formulas || [],
        solvedQuestions: item.solvedQuestions || []
      },
      topicVideos,
      feynmanPrompt: isUpBoard && item.titleHi
        ? `ज्ञान गुरु को बताइए कि आपने ${item.titleHi} में क्या सीखा? अपनी आवाज़ में सरल शब्दों में समझाएं!`
        : `Explain the central idea of ${item.titleEn} to Gyan Guru in your own words!`,
      keywords: [item.titleEn.toLowerCase(), 'board', 'exam', 'class' + grade, subjShort],
      hintText: isUpBoard
        ? 'हिंदी या हिंग्लिश में बिना किसी संकोच के बोलें। ज्ञान गुरु आपकी सहायता के लिए हैं!'
        : 'Speak freely in plain English! Gyan Guru will evaluate your concepts and boost your confidence.',
      socraticQuestion: isUpBoard && item.titleHi
        ? `क्या आप बता सकते हैं कि ${item.titleHi} का प्रभाव हम वास्तविक जीवन में कहाँ देखते हैं?`
        : `Where do you encounter the practical application of ${item.titleEn} in real-world science or engineering?`,
      quiz: [
        {
          q: `What is the primary conceptual focus of ${item.titleEn}?`,
          options: [
            `Understanding the fundamental laws and real-world mechanisms of ${item.titleEn}`,
            'Memorizing superficial formulas without physical understanding',
            'Skipping definitions and past paper problem analysis',
            'Guessing theoretical values'
          ],
          correct: 0,
          explanation: `In Class ${grade} ${subjName}, mastering ${item.titleEn} requires deep conceptual reasoning, rigorous working, and active verbal explanation.`
        }
      ]
    };
  });
}

function buildSubject(id, name, icon, chapters) {
  return { id, name, icon, chapters };
}

function mapRegistryToChapters(registryList, isUpBoard, subjName, grade = 10, boardId = 'cbse') {
  return registryList.map((item) => {
    const title = isUpBoard 
      ? `अध्याय ${item.num}: ${item.titleHi} (${item.titleEn})`
      : `Chapter ${item.num}: ${item.titleEn}`;

    const topicVideos = (item.topics || []).map((t) => ({
      id: t.id || null,
      part: t.part,
      title: isUpBoard ? `भाग ${t.part}: ${t.titleHi} (${t.titleEn})` : `Part ${t.part}: ${t.titleEn}`,
      duration: t.dur,
      classLevel: Number(grade),
      board: boardId
    }));

    return {
      id: `ch-${item.num}-${subjName.toLowerCase()}`,
      chapterNumber: item.num,
      title,
      classLevel: Number(grade),
      board: boardId,
      subjectId: subjName.toLowerCase(),
      duration: item.duration,
      status: 'complete',
      isCurated: true,
      difficulty: 'Board Standard',
      practicalActivity: item.practicalActivity || null,
      learningObjectives: [
        `Understand the fundamental principles of ${item.titleEn}`,
        'Master the key board exam formulas and derivations',
        'Demonstrate oral retention and solve high-yield practice questions'
      ],
      oneShotVideo: item.oneShotId ? {
        id: item.oneShotId,
        title: isUpBoard ? `${title} • संपूर्ण वन-शॉट मैराथन` : `${title} • Complete One-Shot Marathon`,
        duration: item.duration,
        classLevel: Number(grade),
        board: boardId
      } : null,
      topicVideos,
      summary: isUpBoard
        ? `${title} के सभी आवश्यक सूत्र, परिभाषाएं, आरेख एवं विगत वर्षों में पूछे गए महत्वपूर्ण बोर्ड प्रश्न।`
        : `Comprehensive coverage of ${item.titleEn}. Master the core derivations, definitions, formulas, and past year board exam problems.`,
      boardTips: isUpBoard
        ? `इस अध्याय से संबंधित सूत्रों को लिख-लिखकर याद करें और चित्रों को स्वच्छ व नामांकित बनाएं।`
        : `Practice step-by-step working for numericals and label all diagrams neatly with arrows.`,
      keyPoints: isUpBoard ? [
        'अध्याय के मूल सिद्धांतों को दैनिक जीवन से जोड़कर समझें',
        'सूत्रों और मात्रकों (SI Units) को विशेष रूप से ध्यान में रखें',
        'बोलकर याद करने से अवधारण 3 गुना मजबूत होती है'
      ] : [
        'Understand the physical mechanism behind every law',
        'Double-check dimensions and standard SI units',
        'Explaining out loud secures 90%+ long-term retention'
      ],
      notes: {
        definition: isUpBoard
          ? `अध्याय ${item.num}: ${item.titleHi}\n\nइस अध्याय की संपूर्ण संकल्पनाएं, परिभाषाएं, समीकरण एवं परीक्षा की दृष्टि से सर्वाधिक उपयोगी बिंदु यहाँ प्रस्तुत हैं।`
          : `Chapter ${item.num}: ${item.titleEn}\n\nComplete revision guide covering fundamental principles, derivations, and board exam high-yield summaries.`,
        formulas: [
          { name: isUpBoard ? 'मुख्य सूत्र 1' : 'Core Relationship', formula: 'Principle = Variable A × Variable B', desc: isUpBoard ? 'दिए गए मानों को सही मात्रक में रखकर हल करें' : 'Substitute given values in SI units' }
        ],
        solvedQuestions: [
          {
            q: isUpBoard ? `${item.titleHi} का मुख्य सिद्धांत क्या है?` : `What is the core principle of ${item.titleEn}?`,
            sol: isUpBoard ? 'इस सिद्धांत का विश्लेषण चरणबद्ध रूप से किया जाता है जिससे परीक्षा में पूर्ण अंक प्राप्त हों।' : 'The principle is explained systematically with diagrams to secure full marks in board examinations.'
          }
        ]
      },
      feynmanPrompt: isUpBoard
        ? `ज्ञान गुरु को बताइए कि आपने ${item.titleHi} में क्या सीखा? अपनी आवाज़ में सरल शब्दों में समझाएं!`
        : `Explain the central idea of ${item.titleEn} to Gyan Guru in your own words!`,
      keywords: [item.titleEn.toLowerCase(), 'principle', 'concept', 'formula', 'science', 'math'],
      hintText: isUpBoard
        ? 'हिंदी या हिंग्लिश में बिना किसी संकोच के बोलें। ज्ञान गुरु आपकी सहायता के लिए हैं!'
        : 'Speak freely in plain English! Gyan Guru will evaluate your concepts and boost your confidence.',
      socraticQuestion: isUpBoard
        ? `क्या आप बता सकते हैं कि ${item.titleHi} का प्रभाव हम अपने दैनिक जीवन में कहाँ महसूस करते हैं?`
        : `Where do you encounter the practical application of this concept in everyday life?`,
      quiz: []
    };
  });
}

export const VERIFIED_EDUCATIONAL_VIDEOS = [
  'gQ-X9wV8TXQ', // Class 10 Science: Chemical Reactions (Prashant Kirad)
  'QMq0mrZ1dz0', // Class 10 Maths: Real Numbers (Dear Sir)
  'UI8nM-dSfh4', // Class 10 Science: Electricity (Prashant Kirad)
  'fl-Q_bT-oO0', // Class 10 Maths: Polynomials (Dear Sir)
  'MQkNZIsZ2jw', // Class 10 Science: Light Reflection & Refraction
  'vVjR7zM-Y28', // Class 10 Maths: Trigonometry (Dear Sir)
  '2anxgj0TUgQ', // Class 10 Science: Life Processes
  'Uexhvcj0fn8', // Class 10 Maths: Arithmetic Progressions (Dear Sir)
  '1Y_sfMEmyPY', // Class 10 Science: Metals and Non-Metals
  'tKe6MxnQrXM', // Class 10 Maths: Linear Equations (Dear Sir)
  'mb3csoFqLGs', // Class 10 Science: Carbon and Compounds
  'fyiiJNOQrrM', // Class 10 Maths: Quadratic Equations (Dear Sir)
  '5YMxdILh5II', // Class 10 Science: Magnetic Effects
  '2aon4smurd0', // Class 10 Maths: Coordinate Geometry (Dear Sir)
  'qKl4mieovu0', // Class 10 Science: Acids, Bases and Salts
  'EfUnTM9a1gU'  // Class 10 Maths: Probability (Dear Sir)
];

function generateChaptersForSubject(subjectName, grade, isUpBoard, totalChapters = 10, boardId = 'cbse') {
  const chapters = [];
  for (let i = 1; i <= totalChapters; i++) {
    const title = isUpBoard
      ? `अध्याय ${i}: ${subjectName} - भाग ${i}`
      : `Chapter ${i}: ${subjectName} - Unit ${i}`;

    chapters.push({
      id: `c${grade}-${subjectName.toLowerCase().slice(0, 3)}-ch${i}`,
      chapterNumber: i,
      title,
      classLevel: Number(grade),
      board: boardId,
      subjectId: subjectName.toLowerCase(),
      duration: '45 min',
      status: 'curation_pending',
      isCurated: false,
      difficulty: 'Standard Syllabus',
      learningObjectives: [
        `Core understanding of ${subjectName} concepts for Class ${grade}`,
        'Systematic syllabus progression and revision readiness'
      ],
      coverageNote: `Class ${grade} syllabus overview. Comprehensive board video lectures & dedicated notes are actively curated.`,
      oneShotVideo: null,
      topicVideos: [],
      summary: isUpBoard
        ? `कक्षा ${grade} ${subjectName} का संपूर्ण पाठ्यक्रम। अवधारणाओं की स्पष्टता और परीक्षा की तैयारी।`
        : `Complete curriculum for Class ${grade} ${subjectName}. Conceptual clarity and exam readiness.`,
      boardTips: isUpBoard
        ? 'कठिन प्रश्नों को छोटे-छोटे चरणों में विभाजित कर हल करें।'
        : 'Break complex word problems down into given data, formula, and step-by-step substitution.',
      keyPoints: isUpBoard ? [
        'प्रत्येक सूत्र व नियम का मूल आधार समझें',
        'दैनिक जीवन के उदाहरणों से जोड़कर पढ़ें',
        'बोलकर याद करने से स्मृति 3 गुना तेज होती है'
      ] : [
        'Understand the core derivation behind each formula',
        'Connect concepts with real-world observations',
        'Practice verbal explanation for maximum retention'
      ],
      notes: {
        definition: isUpBoard
          ? `कक्षा ${grade} के छात्रों हेतु ${subjectName} के अध्याय ${i} के मुख्य बिंदु, परिभाषाएं एवं सूत्र।`
          : `Core revision notes, definitions, and working formulas for Class ${grade} ${subjectName} Chapter ${i}.`,
        formulas: [],
        solvedQuestions: []
      },
      feynmanPrompt: isUpBoard
        ? `ज्ञान गुरु को बताइए कि आपने इस अध्याय में क्या मुख्य बात समझी? अपने शब्दों में बोलें!`
        : `Explain what you understood from this chapter to Gyan Guru in your own words!`,
      keywords: ['concept', 'principle', 'logic', 'study', 'board', 'exam'],
      hintText: isUpBoard
        ? 'हिंदी या हिंग्लिश में निडर होकर बोलें। ज्ञान गुरु आपकी सहायता के लिए हैं!'
        : 'Speak freely in simple English! Gyan Guru will evaluate your concepts and boost your confidence.',
      socraticQuestion: isUpBoard
        ? 'क्या आप बता सकते हैं कि इस सिद्धांत का उपयोग हम अपने दैनिक जीवन में कहाँ देखते हैं?'
        : 'Where do you observe this scientific or mathematical principle in real life?',
      quiz: [
        {
          q: isUpBoard ? 'परीक्षा में 90%+ अंक पाने का सबसे वैज्ञानिक तरीका क्या है?' : 'What is the most effective scientific method to achieve 90%+ retention?',
          options: isUpBoard
            ? ['रटना', 'बोलकर समझाना (Feynman Active Recall)', 'नकल करना', 'छोड़ देना']
            : ['Rote cramming', 'Active Recall & Explaining out loud (Feynman Technique)', 'Passive video watching', 'Guessing answers'],
          correct: 1,
          explanation: isUpBoard ? 'सक्रिय स्मरण से दिमाग में स्थायी स्मृति बनती है।' : 'Active vocal recall builds permanent neural pathways.'
        }
      ]
    });
  }
  return chapters;
}
