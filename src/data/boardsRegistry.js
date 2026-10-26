// GyaanConnect Unified Board Registry
// Single authoritative source of truth for all supported Indian school boards

export const BOARDS = [
  {
    id: 'cbse',
    name: 'CBSE (NCERT Rationalised 2026–27)',
    shortName: 'CBSE',
    tagline: 'Central Board of Secondary Education • National Curriculum',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'hi', 'hinglish'],
    status: 'active',
    phase: 1,
    isBilingual: false
  },
  {
    id: 'icse',
    name: 'ICSE / ISC (CISCE)',
    shortName: 'ICSE',
    tagline: 'Council for the Indian School Certificate Examinations',
    primaryLanguage: 'en',
    supportedLanguages: ['en'],
    status: 'active',
    phase: 2,
    isBilingual: false
  },
  {
    id: 'up_board',
    name: 'UP Board (UPMSP - Uttar Pradesh)',
    shortName: 'UP Board',
    tagline: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद् • द्विभाषी (Bilingual Hindi/English)',
    primaryLanguage: 'hi',
    supportedLanguages: ['hi', 'en', 'hinglish'],
    status: 'active',
    phase: 3,
    isBilingual: true
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra State Board (MSBSHSE)',
    shortName: 'Maharashtra',
    tagline: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'mr', 'hi'],
    status: 'active',
    phase: 3,
    isBilingual: false
  },
  {
    id: 'bihar',
    name: 'Bihar Board (BSEB)',
    shortName: 'Bihar Board',
    tagline: 'बिहार विद्यालय परीक्षा समिति • हिंदी व English माध्यम',
    primaryLanguage: 'hi',
    supportedLanguages: ['hi', 'en', 'hinglish'],
    status: 'active',
    phase: 3,
    isBilingual: true
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Board (RBSE)',
    shortName: 'Rajasthan',
    tagline: 'Board of Secondary Education, Rajasthan',
    primaryLanguage: 'hi',
    supportedLanguages: ['hi', 'en'],
    status: 'active',
    phase: 3,
    isBilingual: true
  },
  {
    id: 'karnataka',
    name: 'Karnataka Board (KSEAB)',
    shortName: 'Karnataka',
    tagline: 'Karnataka School Examination and Assessment Board',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'kn'],
    status: 'active',
    phase: 3,
    isBilingual: false
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu State Board',
    shortName: 'Tamil Nadu',
    tagline: 'Tamil Nadu State Board of School Examinations',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'ta'],
    status: 'active',
    phase: 3,
    isBilingual: false
  },
  {
    id: 'west_bengal',
    name: 'West Bengal Board (WBBSE)',
    shortName: 'West Bengal',
    tagline: 'West Bengal Board of Secondary Education',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'bn'],
    status: 'active',
    phase: 3,
    isBilingual: false
  },
  {
    id: 'state_boards',
    name: 'Other State & UT Boards',
    shortName: 'State Boards',
    tagline: 'State Curriculum & Universal NCERT Equivalence',
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'hi'],
    status: 'active',
    phase: 4,
    isBilingual: false
  }
];

export function getBoardById(boardId) {
  if (!boardId) return BOARDS[0];
  const normalized = boardId.toLowerCase().trim();
  return BOARDS.find(b => b.id.toLowerCase() === normalized) || BOARDS[0];
}
