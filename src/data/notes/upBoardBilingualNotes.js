// GYAAN AI — UP Board (UPMSP) Bilingual Notes Library (Classes 11 & 12)
// Official bilingual Hindi + English study notes conforming to UPMSP 2026–27 curriculum

export const UP_BOARD_CLASS_11_NOTES = [
  {
    "id": "up11-phy-ch1",
    "chapterNumber": 1,
    "chapterTitle": "Units and Measurements | मात्रक एवं मापन",
    "titleEn": "Units and Measurements",
    "titleHi": "मात्रक एवं मापन",
    "classLevel": 11,
    "boardId": "up_board",
    "subjectId": "phy-11",
    "subjectName": "भौतिक विज्ञान (Physics)",
    "definitionHi": "मापन किसी अज्ञात राशि की उसी प्रकार की किसी मानक ज्ञात राशि से तुलना करने की प्रक्रिया है। मात्रक दो प्रकार के होते हैं: मूल मात्रक (Base Units) तथा व्युत्पन्न मात्रक (Derived Units)।",
    "definitionEn": "Measurement is the process of comparing an unknown physical quantity with an internationally accepted reference standard called a unit.",
    "topics": [
      {
        "id": "up11-phy-ch1-t1",
        "title": "System of Units & Base Quantities | मापन की पद्धतियाँ एवं मूल राशियाँ",
        "titleHi": "मापन की पद्धतियाँ एवं मूल राशियाँ",
        "contentHi": "अन्तर्राष्ट्रीय मात्रक प्रणाली (SI प्रणाली) में 7 मूल राशियाँ हैं: लम्बाई (मीटर, m), द्रव्यमान (किलोग्राम, kg), समय (सैकण्ड, s), विद्युत धारा (एम्पियर, A), ऊष्मागतिक ताप (केल्विन, K), पदार्थ की मात्रा (मोल, mol) तथा ज्योति तीव्रता (कैन्डेला, cd)। दो पूरक मात्रक समतल कोण (रेडियन) एवं घन कोण (स्टेरेडियन) हैं।",
        "contentEn": "The International System of Units (SI) comprises 7 fundamental base units and 2 supplementary dimensionless units (radian and steradian).",
        "formulas": [
          {
            "name": "विमीय समांगता का सिद्धांत (Principle of Homogeneity)",
            "formula": "[LHS] = [RHS]",
            "desc": "समीकरण के दोनों पक्षों के प्रत्येक पद की विमाएँ समान होनी चाहिए।"
          }
        ],
        "solvedNumericals": [
          {
            "problem": "विमीय विधि से समीकरण v^2 = u^2 + 2as की शुद्धता की जाँच कीजिए।",
            "given": "v = अंतिम वेग [LT^-1], u = प्रारंभिक वेग [LT^-1], a = त्वरण [LT^-2], s = विस्थापन [L].",
            "formula": "[LHS] = [v^2] = (LT^-1)^2 = L^2 T^-2. [RHS] = [u^2] + [2as] = L^2 T^-2 + (LT^-2)(L) = L^2 T^-2.",
            "answer": "चूंकि दोनों पक्षों की विमाएँ समान (L^2 T^-2) हैं, अतः दिया गया समीकरण विमीय दृष्टि से सत्य है।"
          }
        ]
      }
    ]
  },
  {
    "id": "up11-phy-ch4",
    "chapterNumber": 4,
    "chapterTitle": "Laws of Motion | गति के नियम",
    "titleEn": "Laws of Motion",
    "titleHi": "गति के नियम",
    "classLevel": 11,
    "boardId": "up_board",
    "subjectId": "phy-11",
    "subjectName": "भौतिक विज्ञान (Physics)",
    "definitionHi": "न्यूटन के तीन गति नियम बल, संवेग परिवर्तन तथा क्रिया-प्रतिक्रिया के संबंधों को स्थापित करते हैं। द्वितीय नियम मूलभूत नियम है जिससे प्रथम व तृतीय नियम प्राप्त किए जा सकते हैं।",
    "definitionEn": "Newton's laws of motion form the bedrock of classical mechanics connecting force, inertia, and momentum conservation.",
    "topics": [
      {
        "id": "up11-phy-ch4-t1",
        "title": "Newton's Second Law & Friction | न्यूटन का द्वितीय नियम एवं घर्षण",
        "titleHi": "न्यूटन का द्वितीय नियम एवं घर्षण",
        "contentHi": "संवेग परिवर्तन की दर लगाए गए बाह्य असंतुलित बल के अनुक्रमानुपाती होती है: F = dp/dt = ma। सीमांत स्थैतिक घर्षण f_s = mu_s * N, जहां mu_s स्थैतिक घर्षण गुणांक है।",
        "contentEn": "Rate of change of momentum is directly proportional to applied force F = dp/dt = ma.",
        "formulas": [
          {
            "name": "गति का द्वितीय नियम",
            "formula": "F = m * a",
            "desc": "बल = द्रव्यमान × त्वरण"
          },
          {
            "name": "घर्षण बल",
            "formula": "f_s = mu_s * N",
            "desc": "सीमांत घर्षण"
          }
        ]
      }
    ]
  }
];
export const UP_BOARD_CLASS_12_NOTES = [
  {
    "id": "up12-chem-ch1",
    "chapterNumber": 1,
    "chapterTitle": "Solutions | विलयन",
    "titleEn": "Solutions",
    "titleHi": "विलयन",
    "classLevel": 12,
    "boardId": "up_board",
    "subjectId": "chem-12",
    "subjectName": "रसायन विज्ञान (Chemistry)",
    "definitionHi": "दो या दो से अधिक अवयवों का समांगी मिश्रण विलयन कहलाता है। विलयन के अणुसंख्य गुणधर्म (Colligative properties) केवल विलेय के कणों की संख्या पर निर्भर करते हैं, उनकी प्रकृति पर नहीं।",
    "definitionEn": "A solution is a homogeneous mixture of two or more components. Colligative properties depend solely on solute particle count.",
    "topics": [
      {
        "id": "up12-chem-ch1-t1",
        "title": "Raoult's Law & Colligative Properties | राउल्ट का नियम एवं अणुसंख्य गुणधर्म",
        "titleHi": "राउल्ट का नियम एवं अणुसंख्य गुणधर्म",
        "contentHi": "वाष्पशील द्रवों के विलयन में प्रत्येक अवयव का आंशिक वाष्प दाब उसके मोल प्रभाज के समानुपाती होता है: p_A = p_A° * x_A। हिमांक में अवनमन Delta T_f = K_f * m।",
        "contentEn": "Raoult's Law states that partial vapour pressure of each volatile component is proportional to its mole fraction.",
        "formulas": [
          {
            "name": "राउल्ट का नियम",
            "formula": "p_total = p_A°*x_A + p_B°*x_B",
            "desc": "आदर्श विलयन का वाष्प दाब"
          },
          {
            "name": "क्वथनांक उन्नयन",
            "formula": "Delta T_b = K_b * m",
            "desc": "मोलल उन्नयन स्थिरांक"
          }
        ],
        "solvedNumericals": [
          {
            "problem": "18 ग्राम ग्लूकोस (C6H12O6) को 100 ग्राम जल में घोला गया है। विलयन का क्वथनांक ज्ञात कीजिए (जल के लिए K_b = 0.52 K kg/mol)।",
            "given": "w_B = 18 g, M_B = 180 g/mol, w_A = 100 g = 0.1 kg, K_b = 0.52 K kg/mol.",
            "formula": "Delta T_b = K_b * (w_B / M_B) * (1000 / w_A) = 0.52 * (18 / 180) * (1000 / 100) = 0.52 * 0.1 * 10 = 0.52 K.",
            "answer": "विलयन का क्वथनांक T_b = 100°C + 0.52°C = 100.52°C (373.52 K)।"
          }
        ]
      }
    ]
  }
];
