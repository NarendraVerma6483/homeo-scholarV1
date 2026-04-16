import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    principal: Principal;
    displayName: string;
    createdAt: Timestamp;
    themePreference: ThemePreference;
}
export interface SourcedRemedy {
    id: string;
    latinName: string;
    clinicalUses: Array<string>;
    source: MateriaSource;
    physicalSymptoms: Array<string>;
    name: string;
    keynotes: Array<string>;
    modalities: SourcedRemedyModalities;
    mentalSymptoms: Array<string>;
    constitution: string;
    remedyId: string;
}
export type Timestamp = bigint;
export type Time = bigint;
export interface SourcedRemedyInput {
    id?: string;
    latinName: string;
    clinicalUses: Array<string>;
    source: MateriaSource;
    physicalSymptoms: Array<string>;
    name: string;
    keynotes: Array<string>;
    modalities: SourcedRemedyModalities;
    mentalSymptoms: Array<string>;
    constitution: string;
    remedyId: string;
}
export interface SourcedRemedyModalities {
    better: Array<string>;
    worse: Array<string>;
}
export interface RepertoryEntryInput {
    id?: string;
    description: string;
    symptomCategory: string;
    symptomName: string;
    remedies: Array<RepertoryRemedy>;
}
export interface LeaderboardEntry {
    total: bigint;
    displayName: string;
    userId: Principal;
    difficulty: Difficulty;
    score: bigint;
    timestamp: Timestamp;
    percentage: number;
}
export interface AphorismInput {
    id?: bigint;
    keyThemes: Array<string>;
    section: string;
    number: bigint;
    authenticText: string;
    commentary: string;
}
export interface Aphorism {
    id: bigint;
    keyThemes: Array<string>;
    section: string;
    number: bigint;
    authenticText: string;
    commentary: string;
}
export interface SpacedRepCard {
    lastReviewed: Timestamp;
    userId: Principal;
    dueDate: Timestamp;
    intervalDays: bigint;
    remedyId: string;
    easeFactor: number;
    repetitions: bigint;
}
export interface Remedy {
    id: string;
    keySymptoms: Array<string>;
    latinName: string;
    physicalSymptoms: Array<string>;
    name: string;
    description: string;
    modalities: string;
    mentalPicture: string;
    category: string;
    clinicalNotes: string;
}
export interface RepertoryEntry {
    id: string;
    description: string;
    symptomCategory: string;
    symptomName: string;
    remedies: Array<RepertoryRemedy>;
}
export interface QuizAttempt {
    total: bigint;
    attemptId: string;
    userId: Principal;
    difficulty: Difficulty;
    score: bigint;
    timestamp: Timestamp;
    timeSecs: bigint;
}
export interface RepertoryRemedy {
    remedyName: string;
    grade: bigint;
    notes: string;
    remedyId: string;
}
export interface StudySession {
    durationSecs: bigint;
    userId: Principal;
    mode: StudyMode;
    remedyIds: Array<string>;
    timestamp: Timestamp;
    sessionId: string;
    accuracy: number;
}
export interface RemedyProgress {
    userId: Principal;
    lastStudied: Timestamp;
    incorrectCount: bigint;
    correctCount: bigint;
    remedyId: string;
}
export interface SavedCase {
    id: string;
    matchingRemedies: Array<string>;
    userId: string;
    name: string;
    createdAt: Time;
    updatedAt: Time;
    selectedSymptoms: Array<string>;
    clinicalNotes: string;
}
export interface UserStats {
    averageAccuracy: number;
    totalSessions: bigint;
    totalStudyTimeSecs: bigint;
}
export enum Difficulty {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export enum MateriaSource {
    boericke = "boericke",
    allensKeynotes = "allensKeynotes",
    lotus = "lotus"
}
export enum StudyMode {
    flashcard = "flashcard",
    quiz = "quiz"
}
export enum ThemePreference {
    dark = "dark",
    light = "light"
}
export interface backendInterface {
    adminBulkImportAphorisms(inputs: Array<AphorismInput>): Promise<bigint>;
    adminBulkImportRepertoryEntries(inputs: Array<RepertoryEntryInput>): Promise<bigint>;
    adminBulkImportSourcedRemedies(inputs: Array<SourcedRemedyInput>): Promise<bigint>;
    adminDeleteAphorism(id: bigint): Promise<boolean>;
    adminDeleteRepertoryEntry(id: string): Promise<boolean>;
    adminDeleteSourcedRemedy(id: string): Promise<boolean>;
    adminUpsertAphorism(input: AphorismInput): Promise<bigint>;
    adminUpsertRepertoryEntry(input: RepertoryEntryInput): Promise<string>;
    adminUpsertSourcedRemedy(input: SourcedRemedyInput): Promise<string>;
    bootstrapAdmin(): Promise<boolean>;
    deleteCase(id: string): Promise<boolean>;
    deleteRemedy(id: string): Promise<void>;
    getAdminList(): Promise<Array<Principal>>;
    getAllCards(): Promise<Array<SpacedRepCard>>;
    getAphorism(number: bigint): Promise<Aphorism | null>;
    getCaseById(id: string): Promise<SavedCase | null>;
    getDueCards(): Promise<Array<SpacedRepCard>>;
    getLeaderboard(difficulty: Difficulty): Promise<Array<LeaderboardEntry>>;
    getMyBookmarks(): Promise<Array<string>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyQuizHistory(): Promise<Array<QuizAttempt>>;
    getMyRemedyProgress(): Promise<Array<RemedyProgress>>;
    getMySessions(): Promise<Array<StudySession>>;
    getMyStats(): Promise<UserStats>;
    getRemedy(id: string): Promise<Remedy | null>;
    getRepertoryEntry(id: string): Promise<RepertoryEntry | null>;
    getSourcedRemedy(id: string): Promise<SourcedRemedy | null>;
    grantAdmin(principal: Principal): Promise<boolean>;
    initializeCards(): Promise<void>;
    isAdmin(): Promise<boolean>;
    listAphorisms(): Promise<Array<Aphorism>>;
    listMyCases(): Promise<Array<SavedCase>>;
    listRemedies(): Promise<Array<Remedy>>;
    listRepertoryEntries(): Promise<Array<RepertoryEntry>>;
    listSourcedRemedies(): Promise<Array<SourcedRemedy>>;
    listSourcedRemediesBySource(source: MateriaSource): Promise<Array<SourcedRemedy>>;
    listSourcesByRemedyName(name: string): Promise<Array<SourcedRemedy>>;
    recordReview(remedyId: string, quality: bigint): Promise<SpacedRepCard>;
    registerUser(displayName: string): Promise<void>;
    revokeAdmin(principal: Principal): Promise<boolean>;
    saveCaseAnalysis(name: string, selectedSymptoms: Array<string>, clinicalNotes: string, matchingRemedies: Array<string>): Promise<string>;
    saveQuizAttempt(attempt: QuizAttempt): Promise<void>;
    saveStudySession(session: StudySession): Promise<void>;
    searchAphorisms(searchTerm: string): Promise<Array<Aphorism>>;
    searchMyCases(keyword: string): Promise<Array<SavedCase>>;
    searchRemediesByName(term: string): Promise<Array<Remedy>>;
    searchRemediesBySymptom(keyword: string): Promise<Array<Remedy>>;
    searchRepertory(symptom: string): Promise<Array<RepertoryEntry>>;
    seedOrganon(): Promise<void>;
    seedRemedies(): Promise<void>;
    seedRepertory(): Promise<void>;
    seedSourcedRemedies(): Promise<void>;
    submitLeaderboardEntry(displayName: string, score: bigint, total: bigint, difficulty: Difficulty): Promise<void>;
    toggleBookmark(remedyId: string): Promise<void>;
    updateCase(id: string, name: string, clinicalNotes: string): Promise<boolean>;
    updateRemedyProgress(remedyId: string, correct: boolean): Promise<void>;
    upsertRemedy(remedy: Remedy): Promise<void>;
}
