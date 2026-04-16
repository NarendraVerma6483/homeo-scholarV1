import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  LogIn,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { SpacedRepCard } from "../backend.d";
import { FlashcardSkeleton } from "../components/LoadingSkeleton";
import { useAuth } from "../hooks/useAuth";
import { useUpdateRemedyProgress } from "../hooks/useProgress";
import { useListRemedies } from "../hooks/useRemedies";
import {
  useAllCards,
  useDueCards,
  useInitializeCards,
  useRecordReview,
} from "../hooks/useSpacedRep";
import { useSaveStudySession } from "../hooks/useUser";
import type { Remedy } from "../types";

// ─── Types ─────────────────────────────────────────────────────────────────────

type CardState = "question" | "correct" | "incorrect";
type StudyMode = "free" | "spaced";

interface CardResult {
  remedyId: string;
  correct: boolean;
  markedDifficult: boolean;
  intervalDays?: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function isCorrectAnswer(input: string, remedy: Remedy): boolean {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .trim();
  const answer = normalize(input);
  if (!answer) return false;
  const targets = [remedy.name, remedy.commonName ?? ""].filter(Boolean);
  for (const t of targets) {
    const norm = normalize(t);
    if (norm === answer) return true;
    const words = answer.split(/\s+/).filter(Boolean);
    if (words.length > 0 && words.every((w) => norm.includes(w))) return true;
    if (norm.includes(answer) && answer.length >= 4) return true;
  }
  return false;
}

function useTimer(running: boolean) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  return elapsed;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getIntervalLabel(card: SpacedRepCard | undefined): string | null {
  if (!card) return null;
  const now = BigInt(Date.now()) * 1_000_000n;
  const due = card.dueDate;
  const diffMs = Number((due - now) / 1_000_000n);
  const diffDays = Math.round(diffMs / 86_400_000);
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)}d`;
  if (diffDays === 0) return "Due today";
  return `Due in ${diffDays}d`;
}

function getLastReviewedLabel(card: SpacedRepCard | undefined): string | null {
  if (!card || card.lastReviewed === 0n) return null;
  const now = BigInt(Date.now()) * 1_000_000n;
  const diffMs = Number((now - card.lastReviewed) / 1_000_000n);
  const diffDays = Math.round(diffMs / 86_400_000);
  if (diffDays === 0) return "Last reviewed today";
  if (diffDays === 1) return "Last reviewed yesterday";
  return `Last reviewed ${diffDays} days ago`;
}

function isCardOverdue(card: SpacedRepCard | undefined): boolean {
  if (!card || card.lastReviewed === 0n) return false;
  const now = BigInt(Date.now()) * 1_000_000n;
  return card.dueDate <= now;
}

// ─── Mode Selector ─────────────────────────────────────────────────────────────

function ModeSelector({
  mode,
  onSelect,
  dueCount,
}: {
  mode: StudyMode;
  onSelect: (m: StudyMode) => void;
  dueCount: number;
}) {
  return (
    <div
      className="flex gap-2 p-1 rounded-xl bg-muted/50 border border-border mb-5"
      data-ocid="flashcards.mode_selector"
    >
      <button
        onClick={() => onSelect("free")}
        data-ocid="flashcards.mode.free.tab"
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-body-sm font-semibold transition-smooth ${
          mode === "free"
            ? "bg-card shadow-medical-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        type="button"
      >
        <BookOpen className="h-4 w-4" />
        Free Study
      </button>
      <button
        onClick={() => onSelect("spaced")}
        data-ocid="flashcards.mode.spaced.tab"
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-body-sm font-semibold transition-smooth relative ${
          mode === "spaced"
            ? "bg-primary text-primary-foreground shadow-medical-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        type="button"
      >
        <Zap className="h-4 w-4" />
        Spaced Review
        {dueCount > 0 && (
          <span
            className={`absolute -top-1.5 -right-1 min-w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center px-1 ${
              mode === "spaced"
                ? "bg-primary-foreground text-primary"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {dueCount}
          </span>
        )}
      </button>
    </div>
  );
}

// ─── All-Caught-Up state ───────────────────────────────────────────────────────

function AllCaughtUp({
  allCards,
  remedies,
  onFreeStudy,
}: {
  allCards: SpacedRepCard[];
  remedies: Remedy[];
  onFreeStudy: () => void;
}) {
  // Find the soonest upcoming card
  const upcoming = allCards
    .filter((c) => c.dueDate > BigInt(Date.now()) * 1_000_000n)
    .sort((a, b) => Number(a.dueDate - b.dueDate));

  const nextDue = upcoming[0];
  const nextDueDays = nextDue
    ? Math.max(
        1,
        Math.round(
          Number(
            (nextDue.dueDate - BigInt(Date.now()) * 1_000_000n) / 1_000_000n,
          ) / 86_400_000,
        ),
      )
    : null;

  const nextRemedyName =
    nextDue && remedies.find((r) => r.id === nextDue.remedyId)?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden"
      data-ocid="flashcards.spaced.caught_up"
    >
      {/* Green band */}
      <div className="bg-emerald-500/10 border-b border-border px-6 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 380 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4"
        >
          <CalendarCheck className="h-8 w-8 text-emerald-500" />
        </motion.div>
        <h2 className="text-display-md text-foreground mb-2">
          All caught up! 🎉
        </h2>
        <p className="text-body-sm text-muted-foreground max-w-xs mx-auto">
          You've reviewed all due cards. Great work keeping your study schedule!
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Cards in rotation
          </div>
          <span className="text-body-sm font-semibold text-foreground">
            {allCards.length}
          </span>
        </div>

        {nextDue && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
              <Timer className="h-4 w-4 text-primary" />
              Next review
            </div>
            <span className="text-body-sm font-semibold text-foreground">
              {nextRemedyName ?? nextDue.remedyId} in {nextDueDays}d
            </span>
          </div>
        )}

        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 text-primary" />
            Upcoming in 7 days
          </div>
          <span className="text-body-sm font-semibold text-foreground">
            {
              upcoming.filter(
                (c) =>
                  Number(
                    (c.dueDate - BigInt(Date.now()) * 1_000_000n) / 1_000_000n,
                  ) <
                  7 * 86_400_000,
              ).length
            }{" "}
            cards
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={onFreeStudy}
          data-ocid="flashcards.spaced.free_study.button"
        >
          <BookOpen className="h-4 w-4" />
          Continue with Free Study
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Spaced Review Summary ─────────────────────────────────────────────────────

interface SpacedSummaryProps {
  results: CardResult[];
  elapsed: number;
  streak: number;
  onStudyAgain: () => void;
}

function SpacedSummaryModal({
  results,
  elapsed,
  streak,
  onStudyAgain,
}: SpacedSummaryProps) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-ocid="flashcards.spaced.summary.dialog"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-medical-lg overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-primary/10 border-b border-border px-6 py-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-3"
          >
            <Zap className="h-7 w-7 text-primary" />
          </motion.div>
          <h2 className="text-display-md text-foreground">
            Spaced Review Done!
          </h2>
          <p className="text-body-sm text-muted-foreground mt-1">
            {total} cards reviewed · cards scheduled for optimal retention
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border">
          {[
            {
              icon: <Target className="h-5 w-5 text-primary" />,
              label: "Accuracy",
              value: `${pct}%`,
            },
            {
              icon: <Flame className="h-5 w-5 text-orange-400" />,
              label: "Best Streak",
              value: streak,
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
              label: "Correct",
              value: correct,
            },
            {
              icon: <Clock className="h-5 w-5 text-muted-foreground" />,
              label: "Time",
              value: formatTime(elapsed),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card px-5 py-4 flex flex-col items-center gap-1"
            >
              {stat.icon}
              <span className="text-display-md text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 pt-5">
          <div className="flex justify-between text-body-sm text-muted-foreground mb-2">
            <span>Performance</span>
            <span>
              {correct}/{total} correct
            </span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        <div className="flex gap-3 px-6 py-5">
          <Button
            variant="outline"
            className="flex-1"
            asChild
            data-ocid="flashcards.spaced.summary.view_progress.button"
          >
            <Link to="/dashboard">View Progress</Link>
          </Button>
          <Button
            className="flex-1"
            onClick={onStudyAgain}
            data-ocid="flashcards.spaced.summary.study_again.button"
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Review Again
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Free Study Summary Modal ─────────────────────────────────────────────────

interface SummaryProps {
  results: CardResult[];
  elapsed: number;
  streak: number;
  onStudyAgain: () => void;
}

function SummaryModal({
  results,
  elapsed,
  streak,
  onStudyAgain,
}: SummaryProps) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-ocid="flashcards.summary.dialog"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-medical-lg overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-primary/10 border-b border-border px-6 py-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-3"
          >
            <Trophy className="h-7 w-7 text-primary" />
          </motion.div>
          <h2 className="text-display-md text-foreground">Session Complete!</h2>
          <p className="text-body-sm text-muted-foreground mt-1">
            You've studied all {total} flashcards
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border m-0">
          {[
            {
              icon: <Target className="h-5 w-5 text-primary" />,
              label: "Accuracy",
              value: `${pct}%`,
            },
            {
              icon: <Flame className="h-5 w-5 text-orange-400" />,
              label: "Best Streak",
              value: streak,
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
              label: "Correct",
              value: correct,
            },
            {
              icon: <Clock className="h-5 w-5 text-muted-foreground" />,
              label: "Time",
              value: formatTime(elapsed),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card px-5 py-4 flex flex-col items-center gap-1"
            >
              {stat.icon}
              <span className="text-display-md text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 pt-5">
          <div className="flex justify-between text-body-sm text-muted-foreground mb-2">
            <span>Performance</span>
            <span>
              {correct}/{total} correct
            </span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        <div className="flex gap-3 px-6 py-5">
          <Button
            variant="outline"
            className="flex-1"
            asChild
            data-ocid="flashcards.summary.view_progress.button"
          >
            <Link to="/dashboard">View Progress</Link>
          </Button>
          <Button
            className="flex-1"
            onClick={onStudyAgain}
            data-ocid="flashcards.summary.study_again.button"
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Study Again
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card Footer (spaced info) ─────────────────────────────────────────────────

function CardIntervalFooter({
  card,
  mode,
}: {
  card: SpacedRepCard | undefined;
  mode: StudyMode;
}) {
  if (!card) return null;
  const lastReviewedLabel = getLastReviewedLabel(card);
  const intervalLabel = getIntervalLabel(card);
  const overdue = isCardOverdue(card);

  return (
    <div className="flex items-center gap-3 px-6 pb-4 pt-0">
      {lastReviewedLabel && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {lastReviewedLabel}
        </span>
      )}
      {mode === "spaced" && intervalLabel && (
        <span
          className={`flex items-center gap-1 text-xs font-medium ml-auto ${
            overdue ? "text-destructive" : "text-primary"
          }`}
        >
          <Timer className="h-3 w-3" />
          {intervalLabel}
        </span>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function FlashcardsPage() {
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();
  const { isAuthenticated, login } = useAuth();
  const updateProgress = useUpdateRemedyProgress();
  const saveSession = useSaveStudySession();

  // Spaced rep hooks
  const { data: dueCards, isLoading: dueCardsLoading } = useDueCards();
  const { data: allCards } = useAllCards();
  const initializeCards = useInitializeCards();
  const recordReview = useRecordReview();

  // Study mode
  const [studyMode, setStudyMode] = useState<StudyMode>("free");

  // Free study deck state
  const [deck, setDeck] = useState<Remedy[]>([]);
  const [deckReady, setDeckReady] = useState(false);

  // Spaced review deck state (built from dueCards + remedies)
  const [spacedDeck, setSpacedDeck] = useState<Remedy[]>([]);
  const [spacedDeckReady, setSpacedDeckReady] = useState(false);

  // Current card state (shared)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>("question");
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<CardResult[]>([]);

  // After-answer feedback for spaced mode
  const [lastReviewedCard, setLastReviewedCard] =
    useState<SpacedRepCard | null>(null);

  // Session meta
  const [sessionStart] = useState(Date.now());
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);

  const timerRunning = !showSummary && !sessionDone;
  const elapsed = useTimer(timerRunning);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize spaced rep cards when auth user enters spaced mode
  const initializeMutate = initializeCards.mutate;
  const initializePending = initializeCards.isPending;
  useEffect(() => {
    if (studyMode === "spaced" && isAuthenticated && !initializePending) {
      initializeMutate();
    }
  }, [studyMode, isAuthenticated, initializePending, initializeMutate]);

  // Build FREE study deck when remedies load
  useEffect(() => {
    if (remedies && remedies.length > 0 && !deckReady) {
      setDeck([...remedies]);
      setDeckReady(true);
    }
  }, [remedies, deckReady]);

  // Build SPACED deck from dueCards + remedies lookup
  useEffect(() => {
    if (studyMode !== "spaced") return;
    if (!dueCards || !remedies) return;
    const dueRemedies = dueCards
      .map((c) => remedies.find((r) => r.id === c.remedyId))
      .filter((r): r is Remedy => r !== undefined);
    setSpacedDeck(dueRemedies);
    setSpacedDeckReady(true);
  }, [dueCards, remedies, studyMode]);

  // Reset session when switching mode
  const handleModeSwitch = (newMode: StudyMode) => {
    setStudyMode(newMode);
    setCurrentIndex(0);
    setCardState("question");
    setUserInput("");
    setResults([]);
    setStreak(0);
    setBestStreak(0);
    setShowSummary(false);
    setSessionDone(false);
    setLastReviewedCard(null);
    if (newMode === "spaced") {
      setSpacedDeckReady(false);
    }
  };

  const activeDeck = studyMode === "spaced" ? spacedDeck : deck;
  const remedy = activeDeck[currentIndex];
  const total = activeDeck.length;
  const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

  // Find the SpacedRepCard for the current remedy (for footer info)
  const currentSpacedCard =
    remedy && allCards
      ? allCards.find((c) => c.remedyId === remedy.id)
      : undefined;

  // Focus input when new question appears
  useEffect(() => {
    if (cardState === "question") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [cardState]);

  // ── Submit answer ─────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    if (!remedy || !userInput.trim()) return;

    const correct = isCorrectAnswer(userInput, remedy);
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setBestStreak((prev) => Math.max(prev, newStreak));
    setCardState(correct ? "correct" : "incorrect");

    // Update free study progress
    if (isAuthenticated && studyMode === "free") {
      try {
        await updateProgress.mutateAsync({
          remedyId: remedy.id,
          confidence: correct ? "easy" : "hard",
        });
      } catch {
        /* noop */
      }
    }

    // Record spaced rep review
    let updatedCard: SpacedRepCard | null = null;
    if (isAuthenticated && studyMode === "spaced") {
      try {
        const quality = correct ? 5 : 2;
        updatedCard = await recordReview.mutateAsync({
          remedyId: remedy.id,
          quality,
        });
        setLastReviewedCard(updatedCard);
      } catch {
        /* noop */
      }
    }

    setResults((prev) => [
      ...prev,
      {
        remedyId: remedy.id,
        correct,
        markedDifficult: false,
        intervalDays: updatedCard
          ? Number(updatedCard.intervalDays)
          : undefined,
      },
    ]);
  }, [
    remedy,
    userInput,
    streak,
    isAuthenticated,
    studyMode,
    updateProgress,
    recordReview,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && cardState === "question") handleSubmit();
  };

  // ── Mark as difficult ─────────────────────────────────────────────────────────

  const markDifficult = useCallback(() => {
    if (!remedy || studyMode === "spaced") return;
    setDeck((prev) => {
      const newDeck = [...prev];
      newDeck.push({ ...remedy });
      return newDeck;
    });
    setResults((prev) =>
      prev.map((r, i) =>
        i === prev.length - 1 ? { ...r, markedDifficult: true } : r,
      ),
    );
    toast("Card re-queued to end of deck", { icon: "🔁" });
  }, [remedy, studyMode]);

  // ── Next card ─────────────────────────────────────────────────────────────────

  const goNext = useCallback(async () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= total) {
      setSessionDone(true);
      if (isAuthenticated) {
        const duration = Math.floor((Date.now() - sessionStart) / 1000);
        try {
          await saveSession.mutateAsync({
            mode: "flashcard",
            remediesStudied: results.map((r) => r.remedyId),
            durationSeconds: duration,
          });
          toast.success("Session saved! Great work.");
        } catch {
          /* noop */
        }
      }
      setShowSummary(true);
    } else {
      setCurrentIndex(nextIndex);
      setCardState("question");
      setUserInput("");
      setLastReviewedCard(null);
    }
  }, [
    currentIndex,
    total,
    isAuthenticated,
    sessionStart,
    saveSession,
    results,
  ]);

  // ── Restart ───────────────────────────────────────────────────────────────────

  const restart = useCallback(() => {
    if (!remedies) return;
    if (studyMode === "free") {
      setDeck([...remedies]);
    } else {
      setSpacedDeckReady(false);
    }
    setCurrentIndex(0);
    setCardState("question");
    setUserInput("");
    setResults([]);
    setStreak(0);
    setBestStreak(0);
    setShowSummary(false);
    setSessionDone(false);
    setLastReviewedCard(null);
    if (studyMode === "free") setDeckReady(true);
  }, [remedies, studyMode]);

  // ── Loading states ────────────────────────────────────────────────────────────

  const isLoadingFreeStudy = remediesLoading || !deckReady;
  const isLoadingSpaced =
    studyMode === "spaced" && (dueCardsLoading || !spacedDeckReady);

  if (studyMode === "free" && isLoadingFreeStudy) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <FlashcardSkeleton />
      </div>
    );
  }

  if (studyMode === "spaced" && isLoadingSpaced) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <FlashcardSkeleton />
      </div>
    );
  }

  // ── Empty states ──────────────────────────────────────────────────────────────

  if (studyMode === "free" && !remedy && !showSummary) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div
          className="text-center py-16 rounded-xl border border-border bg-card"
          data-ocid="flashcards.empty_state"
        >
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-body-base text-muted-foreground mb-4">
            No remedies available. Browse Materia Medica first.
          </p>
          <Button asChild data-ocid="flashcards.browse.button">
            <Link to="/literature">Browse Remedies</Link>
          </Button>
        </div>
      </div>
    );
  }

  const dueCount = dueCards?.length ?? 0;
  const correctCount = results.filter((r) => r.correct).length;
  const cardsCompleted = results.length;

  // ── Spaced Review: All caught up ──────────────────────────────────────────────

  if (
    studyMode === "spaced" &&
    spacedDeckReady &&
    spacedDeck.length === 0 &&
    !showSummary
  ) {
    return (
      <div
        className="container mx-auto px-4 py-6 max-w-2xl"
        data-ocid="flashcards.page"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h1 className="text-display-md text-foreground">Flashcards</h1>
          </div>
        </div>
        <ModeSelector
          mode={studyMode}
          onSelect={handleModeSwitch}
          dueCount={dueCount}
        />
        {!isAuthenticated ? (
          <div
            className="rounded-xl border border-border bg-card p-8 text-center"
            data-ocid="flashcards.spaced.login_required"
          >
            <Zap className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-display-md text-foreground mb-2">
              Login Required
            </h3>
            <p className="text-body-sm text-muted-foreground mb-5">
              Spaced Review tracks your personal progress and schedules reviews
              just for you.
            </p>
            <Button
              onClick={login}
              data-ocid="flashcards.spaced.login.button"
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              Log in with Internet Identity
            </Button>
          </div>
        ) : (
          <AllCaughtUp
            allCards={allCards ?? []}
            remedies={remedies ?? []}
            onFreeStudy={() => handleModeSwitch("free")}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {showSummary && studyMode === "spaced" && (
        <SpacedSummaryModal
          results={results}
          elapsed={elapsed}
          streak={bestStreak}
          onStudyAgain={restart}
        />
      )}
      {showSummary && studyMode === "free" && (
        <SummaryModal
          results={results}
          elapsed={elapsed}
          streak={bestStreak}
          onStudyAgain={restart}
        />
      )}

      <div
        className="container mx-auto px-4 py-6 max-w-2xl"
        data-ocid="flashcards.page"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h1 className="text-display-md text-foreground">Flashcards</h1>
            {studyMode === "free" ? (
              <Badge variant="secondary" className="text-xs">
                Symptom → Remedy
              </Badge>
            ) : (
              <Badge className="text-xs bg-primary/20 text-primary border-primary/30 hover:bg-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                Adaptive Review
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={restart}
            data-ocid="flashcards.restart.button"
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </Button>
        </div>

        {/* ── Mode Selector ── */}
        <ModeSelector
          mode={studyMode}
          onSelect={handleModeSwitch}
          dueCount={dueCount}
        />

        {/* ── Login Required for Spaced Mode ── */}
        {studyMode === "spaced" && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center justify-between gap-3"
            data-ocid="flashcards.spaced.login_nudge"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Zap className="h-4 w-4 text-primary shrink-0" />
              <p className="text-body-sm text-muted-foreground truncate">
                Log in to activate adaptive spaced repetition tracking.
              </p>
            </div>
            <Button
              size="sm"
              onClick={login}
              data-ocid="flashcards.spaced.login.button"
              className="gap-1.5 shrink-0"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </Button>
          </motion.div>
        )}

        {/* ── Session stats row ── */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border"
            data-ocid="flashcards.streak.display"
          >
            <Flame
              className={`h-4 w-4 ${streak > 0 ? "text-orange-400" : "text-muted-foreground"}`}
            />
            <span
              className={`text-body-sm font-semibold tabular-nums ${streak > 0 ? "text-foreground" : "text-muted-foreground"}`}
            >
              {streak}
            </span>
            <span className="text-xs text-muted-foreground">streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-body-sm font-mono tabular-nums text-foreground">
              {formatTime(elapsed)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border ml-auto">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-body-sm font-semibold tabular-nums text-foreground">
              {correctCount}/{cardsCompleted}
            </span>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="mb-5 space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Card {Math.min(currentIndex + 1, total)} of {total}
            </span>
            <span>{progress}% complete</span>
          </div>
          <Progress
            value={progress}
            className="h-1.5"
            data-ocid="flashcards.progress"
          />
        </div>

        {/* ── Flashcard ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${studyMode}-${currentIndex}-${cardState}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden"
            data-ocid="flashcards.card"
          >
            {/* Symptoms section */}
            <div className="px-6 pt-6 pb-5 bg-muted/20 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Identify the remedy from these symptoms
                </p>
                {/* Due badge in free study if card is overdue */}
                {studyMode === "free" &&
                  currentSpacedCard &&
                  isCardOverdue(currentSpacedCard) && (
                    <Badge
                      variant="outline"
                      className="text-xs border-destructive/40 text-destructive shrink-0 ml-2"
                      data-ocid="flashcards.overdue_badge"
                    >
                      <Timer className="h-2.5 w-2.5 mr-1" />
                      Due for review
                    </Badge>
                  )}
                {studyMode === "spaced" && (
                  <Badge
                    className="text-xs bg-primary/15 text-primary border-primary/30 hover:bg-primary/15 shrink-0 ml-2"
                    data-ocid="flashcards.spaced_badge"
                  >
                    <Zap className="h-2.5 w-2.5 mr-1" />
                    Spaced Review
                  </Badge>
                )}
              </div>

              {remedy && (
                <>
                  <ul className="space-y-2.5 mb-4">
                    {remedy.keySymptomsPhysical.slice(0, 3).map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-2.5 text-body-base text-foreground"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {s}
                      </motion.li>
                    ))}
                    {remedy.keySymptomsEmotional.slice(0, 2).map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (3 + i) * 0.06 }}
                        className="flex items-start gap-2.5 text-body-sm text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                        {s}
                      </motion.li>
                    ))}
                  </ul>

                  {remedy.modalities[0] && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border">
                      <Star className="h-3 w-3 text-primary/70" />
                      <p className="text-xs font-mono text-muted-foreground">
                        {remedy.modalities[0]}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Answer section */}
            <div className="px-6 py-5">
              {cardState === "question" ? (
                <div className="space-y-3">
                  <p className="text-body-sm text-muted-foreground">
                    Type the remedy name — partial or full (case-insensitive)
                  </p>
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. Arsenicum, Belladonna..."
                      className="flex-1"
                      data-ocid="flashcards.answer.input"
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!userInput.trim()}
                      data-ocid="flashcards.submit.button"
                      className="shrink-0"
                    >
                      Submit
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : cardState === "correct" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                  data-ocid="flashcards.correct.feedback"
                >
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-body-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        Correct! ✓
                      </p>
                      {streak > 1 && (
                        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                          🔥 {streak} in a row!
                        </p>
                      )}
                      {/* Spaced rep feedback */}
                      {studyMode === "spaced" && lastReviewedCard && (
                        <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                          <CalendarCheck className="h-3 w-3 inline mr-1" />
                          Review in {Number(lastReviewedCard.intervalDays)}d
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Answer
                    </p>
                    <p className="text-display-md text-primary font-display">
                      {remedy?.name}
                    </p>
                    {remedy?.commonName && (
                      <p className="text-body-sm text-muted-foreground mt-0.5">
                        {remedy.commonName}
                      </p>
                    )}
                    {remedy && (
                      <Link
                        to="/remedy/$id"
                        params={{ id: remedy.id }}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        data-ocid="flashcards.remedy_detail.link"
                      >
                        <BookOpen className="h-3 w-3" />
                        View in Materia Medica
                      </Link>
                    )}
                  </div>

                  <FeedbackActions
                    onMarkDifficult={
                      studyMode === "free" ? markDifficult : undefined
                    }
                    onNext={goNext}
                    isLast={currentIndex + 1 >= total}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                  data-ocid="flashcards.incorrect.feedback"
                >
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/20">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-body-sm font-semibold text-destructive">
                        Incorrect
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You answered:{" "}
                        <span className="font-mono text-foreground">
                          "{userInput}"
                        </span>
                      </p>
                      {/* Spaced rep feedback */}
                      {studyMode === "spaced" && (
                        <p className="text-xs text-destructive/80 mt-0.5">
                          <Timer className="h-3 w-3 inline mr-1" />
                          {lastReviewedCard
                            ? "Review tomorrow"
                            : "Will be scheduled for tomorrow"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Correct Answer
                    </p>
                    <p className="text-display-md text-primary font-display">
                      {remedy?.name}
                    </p>
                    {remedy?.commonName && (
                      <p className="text-body-sm text-muted-foreground mt-0.5">
                        {remedy.commonName}
                      </p>
                    )}
                    {remedy && (
                      <Link
                        to="/remedy/$id"
                        params={{ id: remedy.id }}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        data-ocid="flashcards.remedy_detail.link"
                      >
                        <BookOpen className="h-3 w-3" />
                        View in Materia Medica
                      </Link>
                    )}
                  </div>

                  <FeedbackActions
                    onMarkDifficult={
                      studyMode === "free" ? markDifficult : undefined
                    }
                    onNext={goNext}
                    isLast={currentIndex + 1 >= total}
                  />
                </motion.div>
              )}
            </div>

            {/* Card interval footer */}
            {(studyMode === "spaced" || currentSpacedCard) &&
              cardState === "question" && (
                <CardIntervalFooter card={currentSpacedCard} mode={studyMode} />
              )}
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation (prev/skip) — free study only ── */}
        {cardState === "question" && studyMode === "free" && (
          <div className="mt-4 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCurrentIndex((i) => Math.max(0, i - 1));
                setCardState("question");
                setUserInput("");
              }}
              disabled={currentIndex === 0}
              data-ocid="flashcards.prev.button"
            >
              ← Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentIndex < total - 1) {
                  setCurrentIndex((i) => i + 1);
                  setCardState("question");
                  setUserInput("");
                }
              }}
              disabled={currentIndex >= total - 1}
              data-ocid="flashcards.skip.button"
              className="gap-1.5"
            >
              Skip <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ── Login nudge ── */}
        {!isAuthenticated && studyMode === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center justify-between gap-3"
            data-ocid="flashcards.login.nudge"
          >
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-body-sm text-muted-foreground truncate">
                Log in to save your progress and track confidence levels.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={login}
              data-ocid="flashcards.login.button"
              className="gap-1.5 shrink-0"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </Button>
          </motion.div>
        )}
      </div>
    </>
  );
}

// ─── Feedback action buttons ───────────────────────────────────────────────────

function FeedbackActions({
  onMarkDifficult,
  onNext,
  isLast,
}: {
  onMarkDifficult?: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-2 pt-1">
      {onMarkDifficult && (
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkDifficult}
          data-ocid="flashcards.mark_difficult.button"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Star className="h-3.5 w-3.5" />
          Mark Difficult
        </Button>
      )}
      <Button
        size="sm"
        onClick={onNext}
        data-ocid="flashcards.next.button"
        className="flex-1 gap-1.5"
      >
        {isLast ? (
          <>
            <Trophy className="h-3.5 w-3.5" />
            Finish Session
          </>
        ) : (
          <>
            Next Card
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
      </Button>
    </div>
  );
}
