import { c as createLucideIcon, I as useQueryClient, u as useAuth, r as reactExports, j as jsxRuntimeExports, J as FlashcardSkeleton, b as BookOpen, a as Button, L as Link, d as Brain, K as LogIn, B as Badge, T as Trophy } from "./index-zOgSu2VR.js";
import { I as Input } from "./input-BkajiwmW.js";
import { R as RotateCcw, C as CircleCheck, P as Progress, a as CircleX } from "./progress-B_SzsD9K.js";
import { u as ue } from "./index-6jU_Z7WP.js";
import { u as useUpdateRemedyProgress } from "./useProgress-DlvwEECP.js";
import { u as useListRemedies } from "./useRemedies-DaRZ6zfL.js";
import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
import { u as useMutation } from "./useMutation-BW6BkhXL.js";
import { u as useSaveStudySession } from "./useUser-BS7Vp9RY.js";
import { Z as Zap } from "./zap-BibBNvGF.js";
import { m as motion } from "./proxy-BTdtC-tV.js";
import { C as Clock, T as Target } from "./target-BKVkrWyH.js";
import { A as AnimatePresence } from "./index-DGdjfSQr.js";
import { S as Star } from "./star--nQ6TmcB.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
import { S as Sparkles } from "./sparkles-Br8Y_P3K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
function useDueCards() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["spaced-rep", "due"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getDueCards();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 60 * 1e3
  });
}
function useAllCards() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["spaced-rep", "all"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getAllCards();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 2 * 60 * 1e3
  });
}
function useRecordReview() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      remedyId,
      quality
    }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.recordReview(remedyId, BigInt(quality));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaced-rep"] });
    }
  });
}
function useInitializeCards() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not available");
      return backend.initializeCards();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaced-rep"] });
    }
  });
}
function isCorrectAnswer(input, remedy) {
  const normalize = (s) => s.toLowerCase().replace(/[^a-z\s]/g, "").trim();
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
function useTimer(running) {
  const [elapsed, setElapsed] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1e3);
    return () => clearInterval(id);
  }, [running]);
  return elapsed;
}
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
function getIntervalLabel(card) {
  if (!card) return null;
  const now = BigInt(Date.now()) * 1000000n;
  const due = card.dueDate;
  const diffMs = Number((due - now) / 1000000n);
  const diffDays = Math.round(diffMs / 864e5);
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)}d`;
  if (diffDays === 0) return "Due today";
  return `Due in ${diffDays}d`;
}
function getLastReviewedLabel(card) {
  if (!card || card.lastReviewed === 0n) return null;
  const now = BigInt(Date.now()) * 1000000n;
  const diffMs = Number((now - card.lastReviewed) / 1000000n);
  const diffDays = Math.round(diffMs / 864e5);
  if (diffDays === 0) return "Last reviewed today";
  if (diffDays === 1) return "Last reviewed yesterday";
  return `Last reviewed ${diffDays} days ago`;
}
function isCardOverdue(card) {
  if (!card || card.lastReviewed === 0n) return false;
  const now = BigInt(Date.now()) * 1000000n;
  return card.dueDate <= now;
}
function ModeSelector({
  mode,
  onSelect,
  dueCount
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-2 p-1 rounded-xl bg-muted/50 border border-border mb-5",
      "data-ocid": "flashcards.mode_selector",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onSelect("free"),
            "data-ocid": "flashcards.mode.free.tab",
            className: `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-body-sm font-semibold transition-smooth ${mode === "free" ? "bg-card shadow-medical-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            type: "button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
              "Free Study"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onSelect("spaced"),
            "data-ocid": "flashcards.mode.spaced.tab",
            className: `flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-body-sm font-semibold transition-smooth relative ${mode === "spaced" ? "bg-primary text-primary-foreground shadow-medical-sm" : "text-muted-foreground hover:text-foreground"}`,
            type: "button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
              "Spaced Review",
              dueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute -top-1.5 -right-1 min-w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center px-1 ${mode === "spaced" ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`,
                  children: dueCount
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function AllCaughtUp({
  allCards,
  remedies,
  onFreeStudy
}) {
  var _a;
  const upcoming = allCards.filter((c) => c.dueDate > BigInt(Date.now()) * 1000000n).sort((a, b) => Number(a.dueDate - b.dueDate));
  const nextDue = upcoming[0];
  const nextDueDays = nextDue ? Math.max(
    1,
    Math.round(
      Number(
        (nextDue.dueDate - BigInt(Date.now()) * 1000000n) / 1000000n
      ) / 864e5
    )
  ) : null;
  const nextRemedyName = nextDue && ((_a = remedies.find((r) => r.id === nextDue.remedyId)) == null ? void 0 : _a.name);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden",
      "data-ocid": "flashcards.spaced.caught_up",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/10 border-b border-border px-6 py-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { delay: 0.15, type: "spring", stiffness: 380 },
              className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-8 w-8 text-emerald-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "All caught up! 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground max-w-xs mx-auto", children: "You've reviewed all due cards. Great work keeping your study schedule!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-body-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
              "Cards in rotation"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm font-semibold text-foreground", children: allCards.length })
          ] }),
          nextDue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-body-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-4 w-4 text-primary" }),
              "Next review"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm font-semibold text-foreground", children: [
              nextRemedyName ?? nextDue.remedyId,
              " in ",
              nextDueDays,
              "d"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-body-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 text-primary" }),
              "Upcoming in 7 days"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm font-semibold text-foreground", children: [
              upcoming.filter(
                (c) => Number(
                  (c.dueDate - BigInt(Date.now()) * 1000000n) / 1000000n
                ) < 7 * 864e5
              ).length,
              " ",
              "cards"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full gap-2",
            onClick: onFreeStudy,
            "data-ocid": "flashcards.spaced.free_study.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
              "Continue with Free Study"
            ]
          }
        ) })
      ]
    }
  );
}
function SpacedSummaryModal({
  results,
  elapsed,
  streak,
  onStudyAgain
}) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      "data-ocid": "flashcards.spaced.summary.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-medical-lg overflow-hidden",
            initial: { scale: 0.9, y: 20 },
            animate: { scale: 1, y: 0 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b border-border px-6 py-5 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { delay: 0.2, type: "spring", stiffness: 400 },
                    className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-7 w-7 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Spaced Review Done!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground mt-1", children: [
                  total,
                  " cards reviewed · cards scheduled for optimal retention"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-px bg-border", children: [
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-primary" }),
                  label: "Accuracy",
                  value: `${pct}%`
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-orange-400" }),
                  label: "Best Streak",
                  value: streak
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500" }),
                  label: "Correct",
                  value: correct
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-muted-foreground" }),
                  label: "Time",
                  value: formatTime(elapsed)
                }
              ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card px-5 py-4 flex flex-col items-center gap-1",
                  children: [
                    stat.icon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-display-md text-foreground", children: stat.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: stat.label })
                  ]
                },
                stat.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-body-sm text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Performance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    correct,
                    "/",
                    total,
                    " correct"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 px-6 py-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    asChild: true,
                    "data-ocid": "flashcards.spaced.summary.view_progress.button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View Progress" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "flex-1",
                    onClick: onStudyAgain,
                    "data-ocid": "flashcards.spaced.summary.study_again.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 mr-1.5" }),
                      "Review Again"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SummaryModal({
  results,
  elapsed,
  streak,
  onStudyAgain
}) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round(correct / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      "data-ocid": "flashcards.summary.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-medical-lg overflow-hidden",
            initial: { scale: 0.9, y: 20 },
            animate: { scale: 1, y: 0 },
            transition: { type: "spring", stiffness: 300, damping: 25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b border-border px-6 py-5 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { delay: 0.2, type: "spring", stiffness: 400 },
                    className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-3",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-7 w-7 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Session Complete!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground mt-1", children: [
                  "You've studied all ",
                  total,
                  " flashcards"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-px bg-border m-0", children: [
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-primary" }),
                  label: "Accuracy",
                  value: `${pct}%`
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-orange-400" }),
                  label: "Best Streak",
                  value: streak
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500" }),
                  label: "Correct",
                  value: correct
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-muted-foreground" }),
                  label: "Time",
                  value: formatTime(elapsed)
                }
              ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card px-5 py-4 flex flex-col items-center gap-1",
                  children: [
                    stat.icon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-display-md text-foreground", children: stat.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: stat.label })
                  ]
                },
                stat.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-body-sm text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Performance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    correct,
                    "/",
                    total,
                    " correct"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 px-6 py-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    asChild: true,
                    "data-ocid": "flashcards.summary.view_progress.button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View Progress" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "flex-1",
                    onClick: onStudyAgain,
                    "data-ocid": "flashcards.summary.study_again.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 mr-1.5" }),
                      "Study Again"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function CardIntervalFooter({
  card,
  mode
}) {
  if (!card) return null;
  const lastReviewedLabel = getLastReviewedLabel(card);
  const intervalLabel = getIntervalLabel(card);
  const overdue = isCardOverdue(card);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-6 pb-4 pt-0", children: [
    lastReviewedLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
      lastReviewedLabel
    ] }),
    mode === "spaced" && intervalLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `flex items-center gap-1 text-xs font-medium ml-auto ${overdue ? "text-destructive" : "text-primary"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3 w-3" }),
          intervalLabel
        ]
      }
    )
  ] });
}
function FlashcardsPage() {
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();
  const { isAuthenticated, login } = useAuth();
  const updateProgress = useUpdateRemedyProgress();
  const saveSession = useSaveStudySession();
  const { data: dueCards, isLoading: dueCardsLoading } = useDueCards();
  const { data: allCards } = useAllCards();
  const initializeCards = useInitializeCards();
  const recordReview = useRecordReview();
  const [studyMode, setStudyMode] = reactExports.useState("free");
  const [deck, setDeck] = reactExports.useState([]);
  const [deckReady, setDeckReady] = reactExports.useState(false);
  const [spacedDeck, setSpacedDeck] = reactExports.useState([]);
  const [spacedDeckReady, setSpacedDeckReady] = reactExports.useState(false);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [cardState, setCardState] = reactExports.useState("question");
  const [userInput, setUserInput] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [lastReviewedCard, setLastReviewedCard] = reactExports.useState(null);
  const [sessionStart] = reactExports.useState(Date.now());
  const [streak, setStreak] = reactExports.useState(0);
  const [bestStreak, setBestStreak] = reactExports.useState(0);
  const [showSummary, setShowSummary] = reactExports.useState(false);
  const [sessionDone, setSessionDone] = reactExports.useState(false);
  const timerRunning = !showSummary && !sessionDone;
  const elapsed = useTimer(timerRunning);
  const inputRef = reactExports.useRef(null);
  const initializeMutate = initializeCards.mutate;
  const initializePending = initializeCards.isPending;
  reactExports.useEffect(() => {
    if (studyMode === "spaced" && isAuthenticated && !initializePending) {
      initializeMutate();
    }
  }, [studyMode, isAuthenticated, initializePending, initializeMutate]);
  reactExports.useEffect(() => {
    if (remedies && remedies.length > 0 && !deckReady) {
      setDeck([...remedies]);
      setDeckReady(true);
    }
  }, [remedies, deckReady]);
  reactExports.useEffect(() => {
    if (studyMode !== "spaced") return;
    if (!dueCards || !remedies) return;
    const dueRemedies = dueCards.map((c) => remedies.find((r) => r.id === c.remedyId)).filter((r) => r !== void 0);
    setSpacedDeck(dueRemedies);
    setSpacedDeckReady(true);
  }, [dueCards, remedies, studyMode]);
  const handleModeSwitch = (newMode) => {
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
  const progress = total > 0 ? Math.round(currentIndex / total * 100) : 0;
  const currentSpacedCard = remedy && allCards ? allCards.find((c) => c.remedyId === remedy.id) : void 0;
  reactExports.useEffect(() => {
    if (cardState === "question") {
      setTimeout(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }, [cardState]);
  const handleSubmit = reactExports.useCallback(async () => {
    if (!remedy || !userInput.trim()) return;
    const correct = isCorrectAnswer(userInput, remedy);
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setBestStreak((prev) => Math.max(prev, newStreak));
    setCardState(correct ? "correct" : "incorrect");
    if (isAuthenticated && studyMode === "free") {
      try {
        await updateProgress.mutateAsync({
          remedyId: remedy.id,
          confidence: correct ? "easy" : "hard"
        });
      } catch {
      }
    }
    let updatedCard = null;
    if (isAuthenticated && studyMode === "spaced") {
      try {
        const quality = correct ? 5 : 2;
        updatedCard = await recordReview.mutateAsync({
          remedyId: remedy.id,
          quality
        });
        setLastReviewedCard(updatedCard);
      } catch {
      }
    }
    setResults((prev) => [
      ...prev,
      {
        remedyId: remedy.id,
        correct,
        markedDifficult: false,
        intervalDays: updatedCard ? Number(updatedCard.intervalDays) : void 0
      }
    ]);
  }, [
    remedy,
    userInput,
    streak,
    isAuthenticated,
    studyMode,
    updateProgress,
    recordReview
  ]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && cardState === "question") handleSubmit();
  };
  const markDifficult = reactExports.useCallback(() => {
    if (!remedy || studyMode === "spaced") return;
    setDeck((prev) => {
      const newDeck = [...prev];
      newDeck.push({ ...remedy });
      return newDeck;
    });
    setResults(
      (prev) => prev.map(
        (r, i) => i === prev.length - 1 ? { ...r, markedDifficult: true } : r
      )
    );
    ue("Card re-queued to end of deck", { icon: "🔁" });
  }, [remedy, studyMode]);
  const goNext = reactExports.useCallback(async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setSessionDone(true);
      if (isAuthenticated) {
        const duration = Math.floor((Date.now() - sessionStart) / 1e3);
        try {
          await saveSession.mutateAsync({
            mode: "flashcard",
            remediesStudied: results.map((r) => r.remedyId),
            durationSeconds: duration
          });
          ue.success("Session saved! Great work.");
        } catch {
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
    results
  ]);
  const restart = reactExports.useCallback(() => {
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
  const isLoadingFreeStudy = remediesLoading || !deckReady;
  const isLoadingSpaced = studyMode === "spaced" && (dueCardsLoading || !spacedDeckReady);
  if (studyMode === "free" && isLoadingFreeStudy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlashcardSkeleton, {}) });
  }
  if (studyMode === "spaced" && isLoadingSpaced) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlashcardSkeleton, {}) });
  }
  if (studyMode === "free" && !remedy && !showSummary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 rounded-xl border border-border bg-card",
        "data-ocid": "flashcards.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground mb-4", children: "No remedies available. Browse Materia Medica first." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "flashcards.browse.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: "Browse Remedies" }) })
        ]
      }
    ) });
  }
  const dueCount = (dueCards == null ? void 0 : dueCards.length) ?? 0;
  const correctCount = results.filter((r) => r.correct).length;
  const cardsCompleted = results.length;
  if (studyMode === "spaced" && spacedDeckReady && spacedDeck.length === 0 && !showSummary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-6 max-w-2xl",
        "data-ocid": "flashcards.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Flashcards" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeSelector,
            {
              mode: studyMode,
              onSelect: handleModeSwitch,
              dueCount
            }
          ),
          !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-8 text-center",
              "data-ocid": "flashcards.spaced.login_required",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-10 w-10 text-primary mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-md text-foreground mb-2", children: "Login Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-5", children: "Spaced Review tracks your personal progress and schedules reviews just for you." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: login,
                    "data-ocid": "flashcards.spaced.login.button",
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                      "Log in with Internet Identity"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            AllCaughtUp,
            {
              allCards: allCards ?? [],
              remedies: remedies ?? [],
              onFreeStudy: () => handleModeSwitch("free")
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showSummary && studyMode === "spaced" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SpacedSummaryModal,
      {
        results,
        elapsed,
        streak: bestStreak,
        onStudyAgain: restart
      }
    ),
    showSummary && studyMode === "free" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SummaryModal,
      {
        results,
        elapsed,
        streak: bestStreak,
        onStudyAgain: restart
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-6 max-w-2xl",
        "data-ocid": "flashcards.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Flashcards" }),
              studyMode === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Symptom → Remedy" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-primary/20 text-primary border-primary/30 hover:bg-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1" }),
                "Adaptive Review"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: restart,
                "data-ocid": "flashcards.restart.button",
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                  "Restart"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeSelector,
            {
              mode: studyMode,
              onSelect: handleModeSwitch,
              dueCount
            }
          ),
          studyMode === "spaced" && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "mb-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center justify-between gap-3",
              "data-ocid": "flashcards.spaced.login_nudge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground truncate", children: "Log in to activate adaptive spaced repetition tracking." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: login,
                    "data-ocid": "flashcards.spaced.login.button",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border",
                "data-ocid": "flashcards.streak.display",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Flame,
                    {
                      className: `h-4 w-4 ${streak > 0 ? "text-orange-400" : "text-muted-foreground"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-body-sm font-semibold tabular-nums ${streak > 0 ? "text-foreground" : "text-muted-foreground"}`,
                      children: streak
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "streak" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm font-mono tabular-nums text-foreground", children: formatTime(elapsed) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm font-semibold tabular-nums text-foreground", children: [
                correctCount,
                "/",
                cardsCompleted
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Card ",
                Math.min(currentIndex + 1, total),
                " of ",
                total
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress,
                "% complete"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                value: progress,
                className: "h-1.5",
                "data-ocid": "flashcards.progress"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -12 },
              transition: { duration: 0.22, ease: "easeOut" },
              className: "rounded-2xl border border-border bg-card shadow-medical-md overflow-hidden",
              "data-ocid": "flashcards.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 pb-5 bg-muted/20 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Identify the remedy from these symptoms" }),
                    studyMode === "free" && currentSpacedCard && isCardOverdue(currentSpacedCard) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs border-destructive/40 text-destructive shrink-0 ml-2",
                        "data-ocid": "flashcards.overdue_badge",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-2.5 w-2.5 mr-1" }),
                          "Due for review"
                        ]
                      }
                    ),
                    studyMode === "spaced" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: "text-xs bg-primary/15 text-primary border-primary/30 hover:bg-primary/15 shrink-0 ml-2",
                        "data-ocid": "flashcards.spaced_badge",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5 mr-1" }),
                          "Spaced Review"
                        ]
                      }
                    )
                  ] }),
                  remedy && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 mb-4", children: [
                      remedy.keySymptomsPhysical.slice(0, 3).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.li,
                        {
                          initial: { opacity: 0, x: -8 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: i * 0.06 },
                          className: "flex items-start gap-2.5 text-body-base text-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" }),
                            s
                          ]
                        },
                        s
                      )),
                      remedy.keySymptomsEmotional.slice(0, 2).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.li,
                        {
                          initial: { opacity: 0, x: -8 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: (3 + i) * 0.06 },
                          className: "flex items-start gap-2.5 text-body-sm text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" }),
                            s
                          ]
                        },
                        s
                      ))
                    ] }),
                    remedy.modalities[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-primary/70" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: remedy.modalities[0] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5", children: cardState === "question" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Type the remedy name — partial or full (case-insensitive)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        ref: inputRef,
                        value: userInput,
                        onChange: (e) => setUserInput(e.target.value),
                        onKeyDown: handleKeyDown,
                        placeholder: "e.g. Arsenicum, Belladonna...",
                        className: "flex-1",
                        "data-ocid": "flashcards.answer.input",
                        autoComplete: "off",
                        spellCheck: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: handleSubmit,
                        disabled: !userInput.trim(),
                        "data-ocid": "flashcards.submit.button",
                        className: "shrink-0",
                        children: [
                          "Submit",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
                        ]
                      }
                    )
                  ] })
                ] }) : cardState === "correct" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "space-y-4",
                    "data-ocid": "flashcards.correct.feedback",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500 shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold text-emerald-600 dark:text-emerald-400", children: "Correct! ✓" }),
                          streak > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600/70 dark:text-emerald-400/70", children: [
                            "🔥 ",
                            streak,
                            " in a row!"
                          ] }),
                          studyMode === "spaced" && lastReviewedCard && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-3 w-3 inline mr-1" }),
                            "Review in ",
                            Number(lastReviewedCard.intervalDays),
                            "d"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Answer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display-md text-primary font-display", children: remedy == null ? void 0 : remedy.name }),
                        (remedy == null ? void 0 : remedy.commonName) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mt-0.5", children: remedy.commonName }),
                        remedy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Link,
                          {
                            to: "/remedy/$id",
                            params: { id: remedy.id },
                            className: "inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2",
                            "data-ocid": "flashcards.remedy_detail.link",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                              "View in Materia Medica"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FeedbackActions,
                        {
                          onMarkDifficult: studyMode === "free" ? markDifficult : void 0,
                          onNext: goNext,
                          isLast: currentIndex + 1 >= total
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "space-y-4",
                    "data-ocid": "flashcards.incorrect.feedback",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/20", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-destructive shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold text-destructive", children: "Incorrect" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                            "You answered:",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                              '"',
                              userInput,
                              '"'
                            ] })
                          ] }),
                          studyMode === "spaced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive/80 mt-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3 w-3 inline mr-1" }),
                            lastReviewedCard ? "Review tomorrow" : "Will be scheduled for tomorrow"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Correct Answer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display-md text-primary font-display", children: remedy == null ? void 0 : remedy.name }),
                        (remedy == null ? void 0 : remedy.commonName) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mt-0.5", children: remedy.commonName }),
                        remedy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Link,
                          {
                            to: "/remedy/$id",
                            params: { id: remedy.id },
                            className: "inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2",
                            "data-ocid": "flashcards.remedy_detail.link",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                              "View in Materia Medica"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FeedbackActions,
                        {
                          onMarkDifficult: studyMode === "free" ? markDifficult : void 0,
                          onNext: goNext,
                          isLast: currentIndex + 1 >= total
                        }
                      )
                    ]
                  }
                ) }),
                (studyMode === "spaced" || currentSpacedCard) && cardState === "question" && /* @__PURE__ */ jsxRuntimeExports.jsx(CardIntervalFooter, { card: currentSpacedCard, mode: studyMode })
              ]
            },
            `${studyMode}-${currentIndex}-${cardState}`
          ) }),
          cardState === "question" && studyMode === "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  setCurrentIndex((i) => Math.max(0, i - 1));
                  setCardState("question");
                  setUserInput("");
                },
                disabled: currentIndex === 0,
                "data-ocid": "flashcards.prev.button",
                children: "← Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  if (currentIndex < total - 1) {
                    setCurrentIndex((i) => i + 1);
                    setCardState("question");
                    setUserInput("");
                  }
                },
                disabled: currentIndex >= total - 1,
                "data-ocid": "flashcards.skip.button",
                className: "gap-1.5",
                children: [
                  "Skip ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] }),
          !isAuthenticated && studyMode === "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 },
              className: "mt-5 rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center justify-between gap-3",
              "data-ocid": "flashcards.login.nudge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground truncate", children: "Log in to save your progress and track confidence levels." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: login,
                    "data-ocid": "flashcards.login.button",
                    className: "gap-1.5 shrink-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5" }),
                      "Login"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function FeedbackActions({
  onMarkDifficult,
  onNext,
  isLast
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
    onMarkDifficult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: onMarkDifficult,
        "data-ocid": "flashcards.mark_difficult.button",
        className: "gap-1.5 text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
          "Mark Difficult"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        onClick: onNext,
        "data-ocid": "flashcards.next.button",
        className: "flex-1 gap-1.5",
        children: isLast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
          "Finish Session"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Next Card",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] })
      }
    )
  ] });
}
export {
  FlashcardsPage as default
};
