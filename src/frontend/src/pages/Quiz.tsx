import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  LogIn,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useSaveQuizAttempt } from "../hooks/useProgress";
import { SEED_REMEDIES, useListRemedies } from "../hooks/useRemedies";
import type { Remedy } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type DifficultyLevel = "beginner" | "intermediate" | "advanced";
type QuestionCount = 5 | 10 | 15;

interface QuizQuestion {
  remedyId: string;
  remedyName: string;
  symptoms: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ─── Question Generation ──────────────────────────────────────────────────────

function pickSymptoms(remedy: Remedy, difficulty: DifficultyLevel): string[] {
  const physical = remedy.keySymptomsPhysical;
  const emotional = remedy.keySymptomsEmotional;

  if (difficulty === "beginner") {
    // Most obvious: first 3 physical keynotes
    return physical.slice(0, 3);
  }
  if (difficulty === "intermediate") {
    // Mix: 2 physical + 1–2 emotional
    return [...physical.slice(0, 2), ...emotional.slice(0, 2)];
  }
  // Advanced: subtle hints from constitution + modalities
  const constitutionHints = remedy.constitution
    .split(",")
    .map((s) => s.trim())
    .slice(0, 2);
  const modalityHint = remedy.modalities[0] ?? "";
  const combined = [
    ...constitutionHints,
    modalityHint,
    ...emotional.slice(0, 1),
  ].filter(Boolean);
  return combined.slice(0, 4);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildExplanation(remedy: Remedy): string {
  const sentences = remedy.constitution.split(/[.!?]+/).filter(Boolean);
  const desc = sentences.slice(0, 2).join(". ").trim();
  return `${remedy.name}: ${desc}. Key keynote — ${remedy.keySymptomsPhysical[0] ?? ""}`;
}

function generateQuestions(
  remedies: Remedy[],
  difficulty: DifficultyLevel,
  count: QuestionCount,
): QuizQuestion[] {
  const pool = remedies.length >= 4 ? remedies : SEED_REMEDIES;
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, count);

  return selected.map((remedy) => {
    const symptoms = pickSymptoms(remedy, difficulty);
    const distractors = shuffle(pool.filter((r) => r.id !== remedy.id)).slice(
      0,
      3,
    );
    const options = shuffle([...distractors.map((r) => r.name), remedy.name]);
    return {
      remedyId: remedy.id,
      remedyName: remedy.name,
      symptoms,
      options,
      correctIndex: options.indexOf(remedy.name),
      explanation: buildExplanation(remedy),
    };
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; desc: string; color: string; badge: string }
> = {
  beginner: {
    label: "Beginner",
    desc: "Clear keynote symptoms — ideal for first-year students",
    color: "border-primary/40 bg-primary/5 hover:bg-primary/10",
    badge: "bg-primary/15 text-primary",
  },
  intermediate: {
    label: "Intermediate",
    desc: "Mixed physical & mental — for students in clinical years",
    color: "border-accent/40 bg-accent/5 hover:bg-accent/10",
    badge: "bg-accent/15 text-accent-foreground",
  },
  advanced: {
    label: "Advanced",
    desc: "Constitutional hints & modalities — for qualified practitioners",
    color: "border-destructive/30 bg-destructive/5 hover:bg-destructive/10",
    badge: "bg-destructive/15 text-destructive",
  },
};

const QUESTION_COUNT_OPTIONS: QuestionCount[] = [5, 10, 15];

function SetupScreen({
  onStart,
}: {
  onStart: (difficulty: DifficultyLevel, count: QuestionCount) => void;
}) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [count, setCount] = useState<QuestionCount>(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
      data-ocid="quiz.setup"
    >
      {/* Hero */}
      <div className="rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 via-card to-accent/5 p-8 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 shadow-medical-sm">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-display-md text-foreground mb-2">
            Multiple Choice Quiz
          </h2>
          <p className="text-body-base text-muted-foreground max-w-md mx-auto">
            Test your knowledge of homoeopathic Materia Medica. Select your
            difficulty level and number of questions to begin.
          </p>
        </div>
      </div>

      {/* Difficulty */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-medical-sm">
        <h3 className="text-body-lg font-semibold text-foreground mb-1">
          Select Difficulty
        </h3>
        <p className="text-body-sm text-muted-foreground mb-4">
          This affects which symptom clues are shown for each remedy.
        </p>
        <div className="space-y-3" data-ocid="quiz.difficulty.select">
          {(
            Object.entries(DIFFICULTY_CONFIG) as [
              DifficultyLevel,
              (typeof DIFFICULTY_CONFIG)[DifficultyLevel],
            ][]
          ).map(([level, cfg]) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level)}
              data-ocid={`quiz.difficulty.${level}`}
              className={cn(
                "w-full text-left px-4 py-3.5 rounded-xl border-2 transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                difficulty === level
                  ? `${cfg.color} border-2`
                  : "border-border bg-background hover:bg-muted/40",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-body-base font-semibold text-foreground">
                  {cfg.label}
                </span>
                {difficulty === level && (
                  <Badge className={cn("text-xs", cfg.badge)}>Selected</Badge>
                )}
              </div>
              <p className="text-body-sm text-muted-foreground mt-0.5">
                {cfg.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Question count */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-medical-sm">
        <h3 className="text-body-lg font-semibold text-foreground mb-1">
          Number of Questions
        </h3>
        <p className="text-body-sm text-muted-foreground mb-4">
          Each question tests a different remedy.
        </p>
        <div
          className="grid grid-cols-3 gap-3"
          data-ocid="quiz.question_count.select"
        >
          {QUESTION_COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              data-ocid={`quiz.count.${n}`}
              className={cn(
                "py-3 rounded-xl border-2 text-body-base font-semibold transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                count === n
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:bg-muted/40",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Start */}
      <Button
        size="lg"
        onClick={() => onStart(difficulty, count)}
        data-ocid="quiz.start.primary_button"
        className="w-full gap-2 shadow-medical-md text-base"
      >
        <Sparkles className="h-5 w-5" />
        Start Quiz — {count} Questions ({DIFFICULTY_CONFIG[difficulty].label})
      </Button>
    </motion.div>
  );
}

function QuestionCard({
  question,
  index,
  total,
  score,
  onSelect,
  onNext,
  selected,
  answered,
  isLast,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  score: number;
  onSelect: (idx: number) => void;
  onNext: () => void;
  selected: number | null;
  answered: boolean;
  isLast: boolean;
}) {
  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  return (
    <div data-ocid="quiz.question">
      {/* Progress bar */}
      <div className="mb-5 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-body-sm text-muted-foreground font-medium">
            Question{" "}
            <span className="text-foreground font-semibold">{index + 1}</span>{" "}
            of <span className="text-foreground font-semibold">{total}</span>
          </span>
          <span className="text-body-sm text-muted-foreground">
            Score:{" "}
            <span className="text-primary font-bold">
              {score}/{index}
            </span>
          </span>
        </div>
        <Progress value={progress} className="h-2" data-ocid="quiz.progress" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden"
        >
          {/* Question header */}
          <div className="p-6 bg-muted/30 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs font-mono">
                Q{index + 1}
              </Badge>
              <span className="text-body-sm text-muted-foreground">
                Which remedy is indicated by these symptoms?
              </span>
            </div>
            <ul className="space-y-2">
              {question.symptoms.map((symptom) => (
                <li key={symptom} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-body-base font-medium text-foreground leading-snug">
                    {symptom}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Options */}
          <div className="p-6 space-y-3">
            {question.options.map((option, idx) => {
              let optStyle =
                "border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
              let icon: React.ReactNode = null;

              if (answered) {
                if (idx === question.correctIndex) {
                  optStyle =
                    "border-primary bg-primary/10 text-primary cursor-default";
                  icon = (
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  );
                } else if (idx === selected) {
                  optStyle =
                    "border-destructive bg-destructive/10 text-destructive cursor-default";
                  icon = (
                    <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  );
                } else {
                  optStyle = "border-border opacity-40 cursor-default";
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(idx)}
                  disabled={answered}
                  data-ocid={`quiz.option.${idx + 1}`}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "flex items-center justify-between gap-3",
                    optStyle,
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold shrink-0 h-6 w-6 rounded-md flex items-center justify-center",
                        answered && idx === question.correctIndex
                          ? "bg-primary/20 text-primary"
                          : answered && idx === selected
                            ? "bg-destructive/20 text-destructive"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-body-base font-medium truncate">
                      {option}
                    </span>
                  </div>
                  {icon}
                </button>
              );
            })}

            {/* Explanation */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={cn(
                  "rounded-xl p-4 border",
                  selected === question.correctIndex
                    ? "bg-primary/5 border-primary/30"
                    : "bg-destructive/5 border-destructive/20",
                )}
                data-ocid="quiz.explanation"
              >
                <div className="flex items-start gap-2.5">
                  {selected === question.correctIndex ? (
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-body-sm font-semibold text-foreground mb-0.5">
                      {selected === question.correctIndex
                        ? "Correct!"
                        : `Incorrect — the answer is ${question.remedyName}`}
                    </p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {answered && (
              <Button
                onClick={onNext}
                className="w-full gap-2 mt-1"
                data-ocid="quiz.next.button"
              >
                {isLast ? "See Results" : "Next Question"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResultsScreen({
  score,
  total,
  answers,
  timeSecs,
  difficulty,
  isAuthenticated,
  onRetry,
  onLogin,
}: {
  score: number;
  total: number;
  answers: boolean[];
  timeSecs: number;
  difficulty: DifficultyLevel;
  isAuthenticated: boolean;
  onRetry: () => void;
  onLogin: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const mins = Math.floor(timeSecs / 60);
  const secs = timeSecs % 60;

  const grade =
    pct >= 85
      ? { label: "Excellent!", color: "text-primary", icon: Trophy }
      : pct >= 65
        ? {
            label: "Good work!",
            color: "text-accent-foreground",
            icon: Sparkles,
          }
        : {
            label: "Keep studying!",
            color: "text-destructive",
            icon: BookOpen,
          };

  const GradeIcon = grade.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
      data-ocid="quiz.results"
    >
      {/* Score card */}
      <div className="rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 via-card to-accent/5 p-8 text-center">
          <div
            className={cn(
              "h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medical-sm",
              pct >= 65 ? "bg-primary/15" : "bg-destructive/10",
            )}
          >
            <GradeIcon
              className={cn(
                "h-8 w-8",
                pct >= 65 ? "text-primary" : "text-destructive",
              )}
            />
          </div>
          <h2 className={cn("text-display-md mb-1", grade.color)}>
            {grade.label}
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-4xl font-display font-bold text-foreground">
              {pct}%
            </span>
          </div>
          <p className="text-body-base text-muted-foreground">
            You answered{" "}
            <span className="font-bold text-primary">
              {score} of {total}
            </span>{" "}
            correctly
          </p>
          <Badge variant="outline" className="mt-2 capitalize">
            {DIFFICULTY_CONFIG[difficulty].label} difficulty
          </Badge>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
          <div className="p-4 text-center">
            <p className="text-display-md text-primary">{score}</p>
            <p className="text-body-sm text-muted-foreground">Correct</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-display-md text-destructive">{total - score}</p>
            <p className="text-body-sm text-muted-foreground">Incorrect</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-display-md text-foreground">
                {mins > 0 ? `${mins}m ` : ""}
                {secs}s
              </p>
            </div>
            <p className="text-body-sm text-muted-foreground">Time</p>
          </div>
        </div>
      </div>

      {/* Per-question breakdown */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-medical-sm">
        <h3 className="text-body-base font-semibold text-foreground mb-3">
          Question Breakdown
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {answers.map((correct, i) => (
            <div
              key={`ans-${i + 1}`}
              className={cn(
                "rounded-lg p-2.5 text-center text-xs font-bold",
                correct
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20",
              )}
              data-ocid={`quiz.result.item.${i + 1}`}
            >
              Q{i + 1}
              <div className="mt-0.5 text-base">{correct ? "✓" : "✗"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Login prompt (non-authenticated) */}
      {!isAuthenticated && (
        <div
          className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-between gap-3"
          data-ocid="quiz.login_prompt"
        >
          <div className="min-w-0">
            <p className="text-body-sm font-medium text-foreground">
              Save your progress
            </p>
            <p className="text-body-sm text-muted-foreground">
              Log in to record your score and track improvement over time.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onLogin}
            data-ocid="quiz.login.button"
            className="gap-1.5 shrink-0"
          >
            <LogIn className="h-3.5 w-3.5" />
            Login
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onRetry}
          data-ocid="quiz.retry.button"
          className="flex-1 gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button asChild className="flex-1 gap-2" data-ocid="quiz.study.button">
          <Link to="/literature">
            <BookOpen className="h-4 w-4" />
            Study More
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const { data: remedies, isLoading } = useListRemedies();
  const { isAuthenticated, login } = useAuth();
  const saveAttempt = useSaveQuizAttempt();

  const [phase, setPhase] = useState<"setup" | "playing" | "done">("setup");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timeSecs, setTimeSecs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setTimeSecs((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const handleStart = (diff: DifficultyLevel, count: QuestionCount) => {
    const pool = remedies ?? SEED_REMEDIES;
    const qs = generateQuestions(pool, diff, count);
    setQuestions(qs);
    setDifficulty(diff);
    setQuestionCount(qs.length as QuestionCount);
    setPhase("playing");
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setAnswered(false);
    setTimeSecs(0);
  };

  const handleRetry = () => {
    setPhase("setup");
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === questions[currentQ].correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, correct]);
  };

  const handleNext = useCallback(async () => {
    const isLast = currentQ + 1 >= questionCount;
    if (isLast) {
      setPhase("done");
      if (isAuthenticated) {
        try {
          const finalScore =
            score + (selected === questions[currentQ]?.correctIndex ? 1 : 0);
          await saveAttempt.mutateAsync({
            format: "multiple_choice",
            total: questionCount,
            correct: finalScore,
          });
          toast.success("Quiz result saved to your profile!");
        } catch {
          // silently ignore
        }
      }
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [
    currentQ,
    questionCount,
    score,
    selected,
    questions,
    isAuthenticated,
    saveAttempt,
  ]);

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-2xl"
      data-ocid="quiz.page"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <Target className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="text-display-md text-foreground leading-none">
            Multiple Choice Quiz
          </h1>
          <p className="text-body-sm text-muted-foreground mt-0.5">
            Materia Medica — Test your knowledge
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-4" data-ocid="quiz.loading_state">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : phase === "setup" ? (
        <SetupScreen onStart={handleStart} />
      ) : phase === "done" ? (
        <ResultsScreen
          score={score}
          total={questionCount}
          answers={answers}
          timeSecs={timeSecs}
          difficulty={difficulty}
          isAuthenticated={isAuthenticated}
          onRetry={handleRetry}
          onLogin={login}
        />
      ) : questions.length > 0 ? (
        <div>
          <QuestionCard
            question={questions[currentQ]}
            index={currentQ}
            total={questionCount}
            score={score}
            onSelect={handleSelect}
            onNext={handleNext}
            selected={selected}
            answered={answered}
            isLast={currentQ + 1 >= questionCount}
          />
          {/* Login nudge while playing */}
          {!isAuthenticated && (
            <div className="mt-4 rounded-xl border border-border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-body-sm text-muted-foreground">
                Log in to save your score after the quiz.
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={login}
                data-ocid="quiz.login.button"
                className="gap-1.5 shrink-0 text-xs"
              >
                <LogIn className="h-3 w-3" />
                Login
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
