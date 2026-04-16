// Shared frontend types mirroring backend data structures

export type ThemePreference = "light" | "dark" | "system";
export type StudyMode = "flashcard" | "quiz";
export type Difficulty = "easy" | "medium" | "hard";
export type QuizFormat = "symptom_to_remedy" | "multiple_choice";

export interface Remedy {
  id: string;
  name: string;
  commonName?: string;
  kingdom: string;
  keySymptomsPhysical: string[];
  keySymptomsEmotional: string[];
  modalities: string[];
  constitution: string;
  clinicalIndications: string[];
  relations: string[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface UserProfile {
  principal: string;
  displayName?: string;
  createdAt: bigint;
  lastActive: bigint;
  totalStudySessions: bigint;
  totalQuizAttempts: bigint;
}

export interface StudySession {
  id: string;
  userId: string;
  mode: StudyMode;
  remediesStudied: string[];
  durationSeconds: bigint;
  completedAt: bigint;
}

export interface UserStats {
  totalSessions: bigint;
  totalQuizAttempts: bigint;
  totalCorrect: bigint;
  averageScore: number;
  streakDays: bigint;
  lastStudied?: bigint;
  favoriteRemedies: string[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  format: QuizFormat;
  totalQuestions: bigint;
  correctAnswers: bigint;
  score: number;
  completedAt: bigint;
}

export interface RemedyProgress {
  remedyId: string;
  userId: string;
  confidence: Difficulty;
  timesStudied: bigint;
  lastStudied: bigint;
  correctStreak: bigint;
}

export interface BookmarkEntry {
  remedyId: string;
  addedAt: bigint;
}

export interface FlashcardQuestion {
  remedyId: string;
  remedyName: string;
  symptoms: string[];
  hint?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  remedyId: string;
  explanation?: string;
}

// Helper to unwrap Option from backend
export function unwrapOption<T>(
  opt: { __kind__: "Some"; value: T } | { __kind__: "None" },
): T | undefined {
  return opt.__kind__ === "Some" ? opt.value : undefined;
}

// ─── Leaderboard ────────────────────────────────────────────────────────────

export type LeaderboardDifficulty = "beginner" | "intermediate" | "advanced";

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  score: bigint;
  total: bigint;
  percentage: number;
  difficulty: LeaderboardDifficulty;
  timestamp: bigint;
}

// ─── Spaced Repetition ───────────────────────────────────────────────────────

export interface SpacedRepCard {
  remedyId: string;
  userId: string;
  dueDate: bigint;
  intervalDays: bigint;
  easeFactor: number;
  repetitions: bigint;
  lastReviewed: bigint;
}

// ─── Repertory ───────────────────────────────────────────────────────────────

export interface RepertoryRemedy {
  remedyId: string;
  remedyName: string;
  grade: bigint;
  notes: string;
}

export interface RepertoryEntry {
  id: string;
  symptomCategory: string;
  symptomName: string;
  description: string;
  remedies: RepertoryRemedy[];
}

// ─── Organon ─────────────────────────────────────────────────────────────────

export interface Aphorism {
  id: bigint;
  number: bigint;
  section: string;
  authenticText: string;
  commentary: string;
  keyThemes: string[];
}

// ─── Multi-source Materia Medica ─────────────────────────────────────────────

export type MateriaSource = "boericke" | "allensKeynotes" | "lotus";

// ─── Case Diary ──────────────────────────────────────────────────────────────

export interface SavedCase {
  id: string;
  userId: string;
  name: string;
  selectedSymptoms: string[];
  clinicalNotes: string;
  matchingRemedies: string[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface SourcedRemedyModalities {
  worse: string[];
  better: string[];
}

export interface SourcedRemedy {
  id: string;
  remedyId: string;
  source: MateriaSource;
  name: string;
  latinName: string;
  keynotes: string[];
  mentalSymptoms: string[];
  physicalSymptoms: string[];
  modalities: SourcedRemedyModalities;
  clinicalUses: string[];
  constitution: string;
}
