import { u as useAuth, r as reactExports, j as jsxRuntimeExports, f as Skeleton, a as Button, K as LogIn, B as Badge, z as cn, T as Trophy, b as BookOpen, L as Link } from "./index-zOgSu2VR.js";
import { R as RotateCcw, P as Progress, C as CircleCheck, a as CircleX } from "./progress-B_SzsD9K.js";
import { u as ue } from "./index-6jU_Z7WP.js";
import { a as useSaveQuizAttempt } from "./useProgress-DlvwEECP.js";
import { u as useListRemedies, S as SEED_REMEDIES } from "./useRemedies-DaRZ6zfL.js";
import { T as Target, C as Clock } from "./target-BKVkrWyH.js";
import { m as motion } from "./proxy-BTdtC-tV.js";
import { S as Sparkles } from "./sparkles-Br8Y_P3K.js";
import { A as AnimatePresence } from "./index-DGdjfSQr.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
import "./useBackend-C6zFmRYr.js";
import "./useMutation-BW6BkhXL.js";
function pickSymptoms(remedy, difficulty) {
  const physical = remedy.keySymptomsPhysical;
  const emotional = remedy.keySymptomsEmotional;
  if (difficulty === "beginner") {
    return physical.slice(0, 3);
  }
  if (difficulty === "intermediate") {
    return [...physical.slice(0, 2), ...emotional.slice(0, 2)];
  }
  const constitutionHints = remedy.constitution.split(",").map((s) => s.trim()).slice(0, 2);
  const modalityHint = remedy.modalities[0] ?? "";
  const combined = [
    ...constitutionHints,
    modalityHint,
    ...emotional.slice(0, 1)
  ].filter(Boolean);
  return combined.slice(0, 4);
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function buildExplanation(remedy) {
  const sentences = remedy.constitution.split(/[.!?]+/).filter(Boolean);
  const desc = sentences.slice(0, 2).join(". ").trim();
  return `${remedy.name}: ${desc}. Key keynote — ${remedy.keySymptomsPhysical[0] ?? ""}`;
}
function generateQuestions(remedies, difficulty, count) {
  const pool = remedies.length >= 4 ? remedies : SEED_REMEDIES;
  const shuffled = shuffle(pool);
  const selected = shuffled.slice(0, count);
  return selected.map((remedy) => {
    const symptoms = pickSymptoms(remedy, difficulty);
    const distractors = shuffle(pool.filter((r) => r.id !== remedy.id)).slice(
      0,
      3
    );
    const options = shuffle([...distractors.map((r) => r.name), remedy.name]);
    return {
      remedyId: remedy.id,
      remedyName: remedy.name,
      symptoms,
      options,
      correctIndex: options.indexOf(remedy.name),
      explanation: buildExplanation(remedy)
    };
  });
}
const DIFFICULTY_CONFIG = {
  beginner: {
    label: "Beginner",
    desc: "Clear keynote symptoms — ideal for first-year students",
    color: "border-primary/40 bg-primary/5 hover:bg-primary/10",
    badge: "bg-primary/15 text-primary"
  },
  intermediate: {
    label: "Intermediate",
    desc: "Mixed physical & mental — for students in clinical years",
    color: "border-accent/40 bg-accent/5 hover:bg-accent/10",
    badge: "bg-accent/15 text-accent-foreground"
  },
  advanced: {
    label: "Advanced",
    desc: "Constitutional hints & modalities — for qualified practitioners",
    color: "border-destructive/30 bg-destructive/5 hover:bg-destructive/10",
    badge: "bg-destructive/15 text-destructive"
  }
};
const QUESTION_COUNT_OPTIONS = [5, 10, 15];
function SetupScreen({
  onStart
}) {
  const [difficulty, setDifficulty] = reactExports.useState("beginner");
  const [count, setCount] = reactExports.useState(10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "space-y-6",
      "data-ocid": "quiz.setup",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/10 via-card to-accent/5 p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Multiple Choice Quiz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground max-w-md mx-auto", children: "Test your knowledge of homoeopathic Materia Medica. Select your difficulty level and number of questions to begin." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-lg font-semibold text-foreground mb-1", children: "Select Difficulty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-4", children: "This affects which symptom clues are shown for each remedy." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "quiz.difficulty.select", children: Object.entries(DIFFICULTY_CONFIG).map(([level, cfg]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setDifficulty(level),
              "data-ocid": `quiz.difficulty.${level}`,
              className: cn(
                "w-full text-left px-4 py-3.5 rounded-xl border-2 transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                difficulty === level ? `${cfg.color} border-2` : "border-border bg-background hover:bg-muted/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-base font-semibold text-foreground", children: cfg.label }),
                  difficulty === level && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("text-xs", cfg.badge), children: "Selected" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mt-0.5", children: cfg.desc })
              ]
            },
            level
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-lg font-semibold text-foreground mb-1", children: "Number of Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-4", children: "Each question tests a different remedy." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-3",
              "data-ocid": "quiz.question_count.select",
              children: QUESTION_COUNT_OPTIONS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCount(n),
                  "data-ocid": `quiz.count.${n}`,
                  className: cn(
                    "py-3 rounded-xl border-2 text-body-base font-semibold transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    count === n ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:bg-muted/40"
                  ),
                  children: n
                },
                n
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: () => onStart(difficulty, count),
            "data-ocid": "quiz.start.primary_button",
            className: "w-full gap-2 shadow-medical-md text-base",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
              "Start Quiz — ",
              count,
              " Questions (",
              DIFFICULTY_CONFIG[difficulty].label,
              ")"
            ]
          }
        )
      ]
    }
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
  isLast
}) {
  const progress = (index + (answered ? 1 : 0)) / total * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "quiz.question", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm text-muted-foreground font-medium", children: [
          "Question",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: index + 1 }),
          " ",
          "of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: total })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm text-muted-foreground", children: [
          "Score:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
            score,
            "/",
            index
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2", "data-ocid": "quiz.progress" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.22, ease: "easeOut" },
        className: "rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-muted/30 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-mono", children: [
                "Q",
                index + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "Which remedy is indicated by these symptoms?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: question.symptoms.map((symptom) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-base font-medium text-foreground leading-snug", children: symptom })
            ] }, symptom)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
            question.options.map((option, idx) => {
              let optStyle = "border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
              let icon = null;
              if (answered) {
                if (idx === question.correctIndex) {
                  optStyle = "border-primary bg-primary/10 text-primary cursor-default";
                  icon = /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0" });
                } else if (idx === selected) {
                  optStyle = "border-destructive bg-destructive/10 text-destructive cursor-default";
                  icon = /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-destructive shrink-0" });
                } else {
                  optStyle = "border-border opacity-40 cursor-default";
                }
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => onSelect(idx),
                  disabled: answered,
                  "data-ocid": `quiz.option.${idx + 1}`,
                  className: cn(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "flex items-center justify-between gap-3",
                    optStyle
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "font-mono text-xs font-bold shrink-0 h-6 w-6 rounded-md flex items-center justify-center",
                            answered && idx === question.correctIndex ? "bg-primary/20 text-primary" : answered && idx === selected ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground"
                          ),
                          children: String.fromCharCode(65 + idx)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-base font-medium truncate", children: option })
                    ] }),
                    icon
                  ]
                },
                option
              );
            }),
            answered && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.15 },
                className: cn(
                  "rounded-xl p-4 border",
                  selected === question.correctIndex ? "bg-primary/5 border-primary/30" : "bg-destructive/5 border-destructive/20"
                ),
                "data-ocid": "quiz.explanation",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                  selected === question.correctIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary mt-0.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-destructive mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold text-foreground mb-0.5", children: selected === question.correctIndex ? "Correct!" : `Incorrect — the answer is ${question.remedyName}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground leading-relaxed", children: question.explanation })
                  ] })
                ] })
              }
            ),
            answered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: onNext,
                className: "w-full gap-2 mt-1",
                "data-ocid": "quiz.next.button",
                children: [
                  isLast ? "See Results" : "Next Question",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ]
      },
      index
    ) })
  ] });
}
function ResultsScreen({
  score,
  total,
  answers,
  timeSecs,
  difficulty,
  isAuthenticated,
  onRetry,
  onLogin
}) {
  const pct = Math.round(score / total * 100);
  const mins = Math.floor(timeSecs / 60);
  const secs = timeSecs % 60;
  const grade = pct >= 85 ? { label: "Excellent!", color: "text-primary", icon: Trophy } : pct >= 65 ? {
    label: "Good work!",
    color: "text-accent-foreground",
    icon: Sparkles
  } : {
    label: "Keep studying!",
    color: "text-destructive",
    icon: BookOpen
  };
  const GradeIcon = grade.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35 },
      className: "space-y-5",
      "data-ocid": "quiz.results",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/10 via-card to-accent/5 p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medical-sm",
                  pct >= 65 ? "bg-primary/15" : "bg-destructive/10"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GradeIcon,
                  {
                    className: cn(
                      "h-8 w-8",
                      pct >= 65 ? "text-primary" : "text-destructive"
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("text-display-md mb-1", grade.color), children: grade.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-display font-bold text-foreground", children: [
              pct,
              "%"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-base text-muted-foreground", children: [
              "You answered",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                score,
                " of ",
                total
              ] }),
              " ",
              "correctly"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "mt-2 capitalize", children: [
              DIFFICULTY_CONFIG[difficulty].label,
              " difficulty"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 divide-x divide-border border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display-md text-primary", children: score }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Correct" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display-md text-destructive", children: total - score }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Incorrect" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-display-md text-foreground", children: [
                  mins > 0 ? `${mins}m ` : "",
                  secs,
                  "s"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Time" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-medical-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-base font-semibold text-foreground mb-3", children: "Question Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: answers.map((correct, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "rounded-lg p-2.5 text-center text-xs font-bold",
                correct ? "bg-primary/10 text-primary border border-primary/20" : "bg-destructive/10 text-destructive border border-destructive/20"
              ),
              "data-ocid": `quiz.result.item.${i + 1}`,
              children: [
                "Q",
                i + 1,
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-base", children: correct ? "✓" : "✗" })
              ]
            },
            `ans-${i + 1}`
          )) })
        ] }),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-between gap-3",
            "data-ocid": "quiz.login_prompt",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium text-foreground", children: "Save your progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Log in to record your score and track improvement over time." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: onLogin,
                  "data-ocid": "quiz.login.button",
                  className: "gap-1.5 shrink-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5" }),
                    "Login"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: onRetry,
              "data-ocid": "quiz.retry.button",
              className: "flex-1 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Try Again"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1 gap-2", "data-ocid": "quiz.study.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/literature", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
            "Study More"
          ] }) })
        ] })
      ]
    }
  );
}
function QuizPage() {
  const { data: remedies, isLoading } = useListRemedies();
  const { isAuthenticated, login } = useAuth();
  const saveAttempt = useSaveQuizAttempt();
  const [phase, setPhase] = reactExports.useState("setup");
  const [difficulty, setDifficulty] = reactExports.useState("beginner");
  const [questionCount, setQuestionCount] = reactExports.useState(10);
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(null);
  const [answered, setAnswered] = reactExports.useState(false);
  const [score, setScore] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState([]);
  const [timeSecs, setTimeSecs] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setTimeSecs((t) => t + 1), 1e3);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);
  const handleStart = (diff, count) => {
    const pool = remedies ?? SEED_REMEDIES;
    const qs = generateQuestions(pool, diff, count);
    setQuestions(qs);
    setDifficulty(diff);
    setQuestionCount(qs.length);
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
  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === questions[currentQ].correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, correct]);
  };
  const handleNext = reactExports.useCallback(async () => {
    var _a;
    const isLast = currentQ + 1 >= questionCount;
    if (isLast) {
      setPhase("done");
      if (isAuthenticated) {
        try {
          const finalScore = score + (selected === ((_a = questions[currentQ]) == null ? void 0 : _a.correctIndex) ? 1 : 0);
          await saveAttempt.mutateAsync({
            format: "multiple_choice",
            total: questionCount,
            correct: finalScore
          });
          ue.success("Quiz result saved to your profile!");
        } catch {
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
    saveAttempt
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "quiz.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground leading-none", children: "Multiple Choice Quiz" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mt-0.5", children: "Materia Medica — Test your knowledge" })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "quiz.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
        ] }) : phase === "setup" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SetupScreen, { onStart: handleStart }) : phase === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultsScreen,
          {
            score,
            total: questionCount,
            answers,
            timeSecs,
            difficulty,
            isAuthenticated,
            onRetry: handleRetry,
            onLogin: login
          }
        ) : questions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionCard,
            {
              question: questions[currentQ],
              index: currentQ,
              total: questionCount,
              score,
              onSelect: handleSelect,
              onNext: handleNext,
              selected,
              answered,
              isLast: currentQ + 1 >= questionCount
            }
          ),
          !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Log in to save your score after the quiz." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: login,
                "data-ocid": "quiz.login.button",
                className: "gap-1.5 shrink-0 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3 w-3" }),
                  "Login"
                ]
              }
            )
          ] })
        ] }) : null
      ]
    }
  );
}
export {
  QuizPage as default
};
