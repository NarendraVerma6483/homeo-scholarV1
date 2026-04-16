import type {
  backendInterface,
  Remedy,
  UserProfile,
  UserStats,
  RemedyProgress,
  StudySession,
  QuizAttempt,
  LeaderboardEntry,
  SpacedRepCard,
  RepertoryEntry,
  Aphorism,
  SourcedRemedy,
  SavedCase,
} from "../backend";
import { Difficulty, MateriaSource, StudyMode, ThemePreference } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("2vxsx-fae");

const sampleRemedies: Remedy[] = [
  {
    id: "aconite",
    name: "Aconitum Napellus",
    latinName: "Aconitum napellus",
    category: "Acute",
    description: "A remedy for sudden, violent onset of symptoms, often after exposure to cold dry winds or fright. Patient is restless, anxious, and fearful of death.",
    keySymptoms: ["Sudden onset", "High fever", "Intense anxiety", "Fear of death", "Restlessness"],
    physicalSymptoms: ["High fever with dry, hot skin", "Rapid, bounding pulse", "Thirst for cold water", "Burning, stinging pain"],
    mentalPicture: "Great fear, anxiety, worry. Fright and shock. Restlessness. Predicts the hour of death.",
    modalities: "Worse: evening and night, cold dry winds, fright. Better: open air.",
    clinicalNotes: "First remedy in sudden fevers, shock, panic attacks. Compare Belladonna for similar sudden onset."
  },
  {
    id: "belladonna",
    name: "Belladonna",
    latinName: "Atropa belladonna",
    category: "Acute",
    description: "Remedy for intense, hot, throbbing conditions. Sudden onset with great heat, redness, and throbbing. The patient is often delirious.",
    keySymptoms: ["Sudden onset", "Throbbing pain", "High fever", "Dilated pupils", "Flushed face"],
    physicalSymptoms: ["Bright red, flushed face", "Throbbing headache", "Hot, dry skin", "Delirium with fever"],
    mentalPicture: "Violent delirium with fever. Sees monsters, wants to bite and strike. Very sensitive to light and noise.",
    modalities: "Worse: touch, jar, noise, light, afternoon. Better: rest in quiet dark room.",
    clinicalNotes: "Key remedy in high fevers with delirium. Sun stroke. Right-sided conditions."
  },
  {
    id: "nux-vomica",
    name: "Nux Vomica",
    latinName: "Strychnos nux-vomica",
    category: "Constitutional",
    description: "The great remedy for the modern businessman. Irritable, chilly, oversensitive. Digestive complaints from overindulgence.",
    keySymptoms: ["Irritability", "Chilliness", "Digestive disturbance", "Oversensitivity", "Constipation"],
    physicalSymptoms: ["Nausea in the morning", "Constipation with ineffectual urging", "Spasmodic pains", "Hypersensitivity to all impressions"],
    mentalPicture: "Very irritable, angry, quarrelsome. Cannot bear noise, odors, light. Driven, workaholic nature.",
    modalities: "Worse: morning, open air, cold, mental exertion. Better: rest, warmth, evening.",
    clinicalNotes: "Antidotes many drugs. Think of Nux for overindulgence in food, stimulants, sedentary habits."
  },
  {
    id: "pulsatilla",
    name: "Pulsatilla",
    latinName: "Pulsatilla nigricans",
    category: "Constitutional",
    description: "Mild, gentle, yielding constitution. Changeable symptoms and moods. Craves open air and company.",
    keySymptoms: ["Changeable symptoms", "Weeping", "Thirstlessness", "Desires open air", "Seeks consolation"],
    physicalSymptoms: ["Thick, bland, yellow-green discharges", "Wandering pains", "Digestive upset from fatty foods", "Menstrual irregularities"],
    mentalPicture: "Gentle, timid, yielding. Cries easily but cheered by consolation. Fears being alone.",
    modalities: "Worse: warmth, evening, fatty foods, beginning motion. Better: open air, cold applications, slow motion.",
    clinicalNotes: "Adapted to mild, fair-haired women. Key remedy for ear infections, sinusitis."
  },
  {
    id: "sulphur",
    name: "Sulphur",
    latinName: "Sulphur",
    category: "Constitutional",
    description: "The king of anti-psoric remedies. Dirty, ragged philosopher. Burning sensations and skin affections.",
    keySymptoms: ["Burning sensations", "Skin eruptions", "Redness of orifices", "Aversion to bathing", "Morning diarrhoea"],
    physicalSymptoms: ["Burning, itching skin", "Red lips and ears", "Hot feet at night", "Offensive discharges"],
    mentalPicture: "Philosophical, theorising mind. Untidy, self-centred. Thinks he is always right. Very lazy.",
    modalities: "Worse: warmth, bathing, wool, 11 AM. Better: open air, dry warm weather.",
    clinicalNotes: "Often follows well after acute remedies. Used to clear miasmatic background. Skin diseases."
  }
];

const sampleProfile: UserProfile = {
  principal: samplePrincipal,
  displayName: "Dr. Student",
  createdAt: BigInt(Date.now() * 1_000_000),
  themePreference: ThemePreference.dark
};

const sampleStats: UserStats = {
  totalSessions: BigInt(12),
  totalStudyTimeSecs: BigInt(7200),
  averageAccuracy: 0.78
};

const sampleProgress: RemedyProgress[] = [
  {
    userId: samplePrincipal,
    remedyId: "aconite",
    correctCount: BigInt(8),
    incorrectCount: BigInt(2),
    lastStudied: BigInt(Date.now() * 1_000_000)
  },
  {
    userId: samplePrincipal,
    remedyId: "belladonna",
    correctCount: BigInt(5),
    incorrectCount: BigInt(3),
    lastStudied: BigInt(Date.now() * 1_000_000)
  }
];

const sampleSessions: StudySession[] = [
  {
    sessionId: "s1",
    userId: samplePrincipal,
    mode: StudyMode.flashcard,
    remedyIds: ["aconite", "belladonna"],
    timestamp: BigInt(Date.now() * 1_000_000),
    durationSecs: BigInt(600),
    accuracy: 0.85
  }
];

const sampleQuizAttempts: QuizAttempt[] = [
  {
    attemptId: "q1",
    userId: samplePrincipal,
    score: BigInt(8),
    total: BigInt(10),
    difficulty: Difficulty.beginner,
    timestamp: BigInt(Date.now() * 1_000_000),
    timeSecs: BigInt(300)
  }
];

const sampleSourcedRemedies: SourcedRemedy[] = [
  {
    id: "boericke-aconite",
    remedyId: "aconite",
    name: "Aconitum Napellus",
    latinName: "Aconitum napellus",
    source: MateriaSource.boericke,
    constitution: "Suitable for full-blooded, robust individuals with a plethoric constitution.",
    keynotes: ["Sudden, violent onset", "Great fear and anxiety", "Predicts the hour of death", "Very restless"],
    mentalSymptoms: ["Great fear, anxiety, and worry accompany every ailment. Fright and shock.", "Restlessness. Predicts the hour of death.", "Music is unbearable; makes her sad."],
    physicalSymptoms: ["Sudden and violent onset of fever after exposure to cold dry wind.", "Skin dry and burning hot.", "Intense thirst for cold water."],
    clinicalUses: ["Sudden fevers", "Shock", "Panic attacks", "Croup"],
    modalities: { better: ["Open air"], worse: ["Evening and night", "Cold dry winds", "Fright"] }
  },
  {
    id: "allens-aconite",
    remedyId: "aconite",
    name: "Aconitum Napellus",
    latinName: "Aconitum napellus",
    source: MateriaSource.allensKeynotes,
    constitution: "Nervous, sanguine temperament; full habit; florid complexion.",
    keynotes: ["Ailments from fright", "Predicts the exact hour of death", "Great anguish and restlessness"],
    mentalSymptoms: ["Thinks his thoughts come from the stomach.", "Great anguish and restlessness — cannot rest in any position."],
    physicalSymptoms: ["Complaints and tension from dry cold air or dry cold wind.", "Fevers: skin dry, burning hot, with anxiety and restlessness."],
    clinicalUses: ["Acute fevers", "Neuralgia", "Shock states"],
    modalities: { better: ["Open air", "Rest"], worse: ["Evening", "Dry cold wind"] }
  },
  {
    id: "lotus-aconite",
    remedyId: "aconite",
    name: "Aconitum Napellus",
    latinName: "Aconitum napellus",
    source: MateriaSource.lotus,
    constitution: "Plethoric, robust constitution with strong vital force.",
    keynotes: ["Extreme restlessness and anxiety", "Fear of death with certainty of dying", "Everything comes on suddenly and violently"],
    mentalSymptoms: ["Extreme anxiety and fear. Sense of impending doom.", "Cannot bear music — it is too sad.", "Clairvoance during fever."],
    physicalSymptoms: ["Dry burning skin without perspiration during fever.", "Eyes red, inflamed; photophobia.", "Pulse full, hard, bounding."],
    clinicalUses: ["Acute inflammatory conditions", "High fevers", "Post-traumatic states"],
    modalities: { better: ["Open air", "Sweating"], worse: ["Night", "Fright", "Cold wind"] }
  },
  {
    id: "boericke-belladonna",
    remedyId: "belladonna",
    name: "Belladonna",
    latinName: "Atropa belladonna",
    source: MateriaSource.boericke,
    constitution: "Full, plethoric constitution; prone to sudden, violent onset.",
    keynotes: ["Throbbing, burning heat", "Bright redness", "Rapid onset and decline", "Great aversion to light, noise, and touch"],
    mentalSymptoms: ["Acute, wild delirium. Sees monsters, insects.", "Wants to run away. Bites and strikes."],
    physicalSymptoms: ["Face flushed, hot, and red.", "Throbbing headache, worse by jar, noise, light.", "High fever with hot dry skin."],
    clinicalUses: ["High fevers", "Sunstroke", "Tonsillitis", "Headaches"],
    modalities: { better: ["Rest in dark quiet room"], worse: ["Touch", "Jar", "Noise", "Light", "Afternoon"] }
  }
];

const sampleRepertoryEntries: RepertoryEntry[] = [
  {
    id: "rep-fever-sudden",
    symptomCategory: "Fever",
    symptomName: "Fever, sudden onset",
    description: "Sudden, violent onset of fever, often after exposure to cold, dry wind or fright.",
    remedies: [
      { remedyId: "aconite", remedyName: "Aconitum Napellus", grade: BigInt(3), notes: "First remedy for sudden fever after cold dry wind" },
      { remedyId: "belladonna", remedyName: "Belladonna", grade: BigInt(3), notes: "Throbbing, burning fever with flushed face" },
      { remedyId: "sulphur", remedyName: "Sulphur", grade: BigInt(2), notes: "When fever is protracted" },
    ]
  },
  {
    id: "rep-anxiety-fear-death",
    symptomCategory: "Mind",
    symptomName: "Fear of death, impending doom",
    description: "Strong conviction of dying; great anxiety and restlessness.",
    remedies: [
      { remedyId: "aconite", remedyName: "Aconitum Napellus", grade: BigInt(3), notes: "Keynote: predicts the hour of death" },
      { remedyId: "nux-vomica", remedyName: "Nux Vomica", grade: BigInt(1), notes: "In oversensitive, chilly patients" },
    ]
  },
  {
    id: "rep-headache-throbbing",
    symptomCategory: "Head",
    symptomName: "Headache, throbbing",
    description: "Violent throbbing pain in the head, often with fever.",
    remedies: [
      { remedyId: "belladonna", remedyName: "Belladonna", grade: BigInt(3), notes: "Right-sided, with red face and fever" },
      { remedyId: "nux-vomica", remedyName: "Nux Vomica", grade: BigInt(2), notes: "Morning headache, with nausea" },
    ]
  }
];

const sampleAphorisms: Aphorism[] = [
  {
    id: BigInt(1),
    number: BigInt(1),
    section: "The Physician's High and Only Mission",
    authenticText: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
    commentary: "Hahnemann opens the Organon by defining the physician's singular purpose: cure. Not palliation, not suppression, but genuine restoration of health. This principle guides all subsequent teachings.",
    keyThemes: ["Mission of physician", "Cure", "Health restoration"]
  },
  {
    id: BigInt(2),
    number: BigInt(2),
    section: "The Highest Ideal of Cure",
    authenticText: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
    commentary: "The ideal cure must be rapid (not prolonged), gentle (not violent or suppressive), and permanent (not a temporary relief). This threefold standard — speed, safety, and permanence — is the hallmark of homoeopathic treatment.",
    keyThemes: ["Ideal cure", "Rapid", "Gentle", "Permanent"]
  },
  {
    id: BigInt(9),
    number: BigInt(9),
    section: "The Vital Force",
    authenticText: "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions.",
    commentary: "Hahnemann introduces the concept of the Vital Force — an immaterial, dynamic power that maintains health and life. Disease is a derangement of this force, not merely a physical alteration.",
    keyThemes: ["Vital force", "Health", "Dynamic principle"]
  }
];

const sampleSavedCases: SavedCase[] = [
  {
    id: "case-001",
    userId: "2vxsx-fae",
    name: "Acute Fever Case — Child, 5 yrs",
    selectedSymptoms: ["rep-fever-sudden", "rep-anxiety-fear-death"],
    clinicalNotes: "Sudden onset fever following cold exposure. Child extremely restless and anxious. Predicting death. Skin dry and hot.",
    matchingRemedies: ["aconite", "belladonna"],
    createdAt: BigInt(Date.now() * 1_000_000 - 86400000000000),
    updatedAt: BigInt(Date.now() * 1_000_000)
  },
  {
    id: "case-002",
    userId: "2vxsx-fae",
    name: "Chronic Headache — Adult Male",
    selectedSymptoms: ["rep-headache-throbbing"],
    clinicalNotes: "Recurring throbbing headaches, worse morning, with nausea. Irritable personality. Sedentary lifestyle.",
    matchingRemedies: ["nux-vomica", "belladonna"],
    createdAt: BigInt(Date.now() * 1_000_000 - 172800000000000),
    updatedAt: BigInt(Date.now() * 1_000_000 - 86400000000000)
  }
];

const sampleLeaderboard: LeaderboardEntry[] = [
  { userId: samplePrincipal, displayName: "Dr. Mehta", score: BigInt(95), total: BigInt(100), difficulty: Difficulty.advanced, timestamp: BigInt(Date.now() * 1_000_000), percentage: 0.95 },
  { userId: samplePrincipal, displayName: "StudentA", score: BigInt(88), total: BigInt(100), difficulty: Difficulty.advanced, timestamp: BigInt(Date.now() * 1_000_000), percentage: 0.88 },
  { userId: samplePrincipal, displayName: "StudentB", score: BigInt(82), total: BigInt(100), difficulty: Difficulty.intermediate, timestamp: BigInt(Date.now() * 1_000_000), percentage: 0.82 },
];

export const mockBackend: backendInterface = {
  listRemedies: async () => sampleRemedies,
  getRemedy: async (id: string) => sampleRemedies.find(r => r.id === id) ?? null,
  searchRemediesByName: async (term: string) => sampleRemedies.filter(r => r.name.toLowerCase().includes(term.toLowerCase()) || r.latinName.toLowerCase().includes(term.toLowerCase())),
  searchRemediesBySymptom: async (keyword: string) => sampleRemedies.filter(r => r.keySymptoms.some(s => s.toLowerCase().includes(keyword.toLowerCase()))),
  upsertRemedy: async () => undefined,
  deleteRemedy: async () => undefined,
  seedRemedies: async () => undefined,

  getMyProfile: async () => sampleProfile,
  registerUser: async () => undefined,

  getMyBookmarks: async () => ["aconite", "belladonna"],
  toggleBookmark: async () => undefined,

  getMySessions: async () => sampleSessions,
  saveStudySession: async () => undefined,

  getMyQuizHistory: async () => sampleQuizAttempts,
  saveQuizAttempt: async () => undefined,

  getMyRemedyProgress: async () => sampleProgress,
  updateRemedyProgress: async () => undefined,

  getMyStats: async () => sampleStats,

  // Leaderboard
  getLeaderboard: async (_difficulty: Difficulty): Promise<LeaderboardEntry[]> => sampleLeaderboard.filter(e => e.difficulty === _difficulty),
  submitLeaderboardEntry: async () => undefined,

  // Spaced repetition
  getDueCards: async (): Promise<SpacedRepCard[]> => [],
  getAllCards: async (): Promise<SpacedRepCard[]> => [],
  recordReview: async (_remedyId: string, _quality: bigint): Promise<SpacedRepCard> => ({
    remedyId: _remedyId,
    userId: samplePrincipal,
    dueDate: BigInt(Date.now() * 1_000_000),
    intervalDays: BigInt(1),
    easeFactor: 2.5,
    repetitions: BigInt(0),
    lastReviewed: BigInt(Date.now() * 1_000_000),
  }),
  initializeCards: async () => undefined,

  // Repertory
  listRepertoryEntries: async (): Promise<RepertoryEntry[]> => sampleRepertoryEntries,
  searchRepertory: async (symptom: string): Promise<RepertoryEntry[]> =>
    sampleRepertoryEntries.filter(e =>
      e.symptomName.toLowerCase().includes(symptom.toLowerCase()) ||
      e.symptomCategory.toLowerCase().includes(symptom.toLowerCase())
    ),
  getRepertoryEntry: async (id: string): Promise<RepertoryEntry | null> =>
    sampleRepertoryEntries.find(e => e.id === id) ?? null,
  seedRepertory: async () => undefined,

  // Organon
  listAphorisms: async (): Promise<Aphorism[]> => sampleAphorisms,
  getAphorism: async (number: bigint): Promise<Aphorism | null> =>
    sampleAphorisms.find(a => a.number === number) ?? null,
  searchAphorisms: async (term: string): Promise<Aphorism[]> =>
    sampleAphorisms.filter(a =>
      a.authenticText.toLowerCase().includes(term.toLowerCase()) ||
      a.commentary.toLowerCase().includes(term.toLowerCase())
    ),
  seedOrganon: async () => undefined,

  // Sourced remedies
  listSourcedRemedies: async (): Promise<SourcedRemedy[]> => sampleSourcedRemedies,
  getSourcedRemedy: async (id: string): Promise<SourcedRemedy | null> =>
    sampleSourcedRemedies.find(r => r.id === id) ?? null,
  listSourcesByRemedyName: async (name: string): Promise<SourcedRemedy[]> =>
    sampleSourcedRemedies.filter(r => r.name.toLowerCase().includes(name.toLowerCase())),
  listSourcedRemediesBySource: async (_source: MateriaSource): Promise<SourcedRemedy[]> =>
    sampleSourcedRemedies.filter(r => r.source === _source),
  seedSourcedRemedies: async () => undefined,

  // Case Diary
  listMyCases: async (): Promise<SavedCase[]> => sampleSavedCases,
  getCaseById: async (id: string): Promise<SavedCase | null> =>
    sampleSavedCases.find(c => c.id === id) ?? null,
  saveCaseAnalysis: async (_name: string, _symptoms: string[], _notes: string, _remedies: string[]): Promise<string> => "mock-case-id",
  updateCase: async (_id: string, _name: string, _notes: string): Promise<boolean> => true,
  deleteCase: async (_id: string): Promise<boolean> => true,
  searchMyCases: async (keyword: string): Promise<SavedCase[]> =>
    sampleSavedCases.filter(c =>
      c.name.toLowerCase().includes(keyword.toLowerCase()) ||
      c.clinicalNotes.toLowerCase().includes(keyword.toLowerCase())
    ),
};
