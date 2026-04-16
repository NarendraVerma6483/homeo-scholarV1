import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, N as DashboardStatSkeleton, U as User, B as Badge, L as Link, a as Button, d as Brain, b as BookOpen, f as Skeleton, F as FlaskConical, O as RemedyCardSkeleton } from "./index-zOgSu2VR.js";
import { A as Activity, R as RemedyCard } from "./RemedyCard-8qh8UxUa.js";
import { c as useMyBookmarks } from "./useBookmarks-DOxKI-Iw.js";
import { b as useMyQuizHistory, c as useMyRemedyProgress } from "./useProgress-DlvwEECP.js";
import { u as useListRemedies } from "./useRemedies-DaRZ6zfL.js";
import { a as useMyStats, b as useMySessions } from "./useUser-BS7Vp9RY.js";
import { S as Sparkles } from "./sparkles-Br8Y_P3K.js";
import { T as TrendingUp } from "./trending-up-BX8t16rh.js";
import { T as Target, C as Clock } from "./target-BKVkrWyH.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
import { Z as Zap } from "./zap-BibBNvGF.js";
import "./index-6jU_Z7WP.js";
import "./useBackend-C6zFmRYr.js";
import "./useMutation-BW6BkhXL.js";
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
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function formatDuration(seconds) {
  const s = Number(seconds);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  const h = Math.floor(s / 3600);
  const m = Math.round(s % 3600 / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function formatTotalTime(sessions) {
  const total = sessions.reduce((acc, s) => acc + Number(s.durationSeconds), 0);
  return formatDuration(BigInt(total));
}
function formatDate(ns) {
  const ms = Number(ns / BigInt(1e6));
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatShortDate(ns) {
  const ms = Number(ns / BigInt(1e6));
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}
function truncatePrincipal(p) {
  if (p.length <= 24) return p;
  return `${p.slice(0, 10)}…${p.slice(-8)}`;
}
function accuracyColor(pct) {
  if (pct >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-destructive";
}
function StatCard({
  icon,
  label,
  value,
  sub,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `dashboard.stat_card.${index}`,
      className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground leading-none", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub })
      ]
    }
  );
}
function SectionHeader({
  icon,
  title,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
    count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs ml-auto", children: count })
  ] });
}
function EmptyState({
  icon,
  title,
  description,
  cta,
  ctaHref,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "rounded-xl border border-dashed border-border bg-muted/20 p-8 flex flex-col items-center gap-3 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: description })
        ] }),
        cta && ctaHref && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: ctaHref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", "data-ocid": `${ocid}_cta_button`, children: cta }) })
      ]
    }
  );
}
function ActivityRow({
  session,
  index
}) {
  const isFlashcard = session.mode === "flashcard";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `dashboard.activity.item.${index}`,
      className: "flex items-center gap-4 py-3 border-b border-border last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${isFlashcard ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent-foreground"}`,
            children: isFlashcard ? /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground capitalize", children: isFlashcard ? "Flashcard Session" : "Quiz Session" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            session.remediesStudied.length,
            " remedies studied"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatShortDate(session.completedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: formatDuration(session.durationSeconds) })
        ] })
      ]
    }
  );
}
function QuizRow({ attempt, index }) {
  const pct = Math.round(attempt.score * 100);
  const isMulti = attempt.format === "multiple_choice";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      "data-ocid": `dashboard.quiz.item.${index}`,
      className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs whitespace-nowrap", children: isMulti ? "Multiple Choice" : "Symptom→Remedy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pr-4 text-sm text-foreground font-mono tabular-nums", children: [
          String(attempt.correctAnswers),
          "/",
          String(attempt.totalQuestions)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: `py-3 pr-4 text-sm font-semibold ${accuracyColor(pct)}`, children: [
          pct,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-xs text-muted-foreground text-right", children: formatShortDate(attempt.completedAt) })
      ]
    }
  );
}
function RemedyProgressBar({
  progress,
  index,
  remedyName
}) {
  const total = Number(progress.timesStudied);
  const streak = Number(progress.correctStreak);
  const pct = total > 0 ? Math.min(100, Math.round(streak / Math.max(total, 1) * 100)) : 0;
  const confColor = progress.confidence === "easy" ? "bg-emerald-500" : progress.confidence === "medium" ? "bg-amber-500" : "bg-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `dashboard.remedy_progress.item.${index}`,
      className: "space-y-1.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate max-w-[60%]", children: remedyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-semibold ${accuracyColor(pct)}`, children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full transition-all duration-500 ${confColor}`,
            style: { width: `${pct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            total,
            " sessions · streak ",
            String(progress.correctStreak)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-[10px] capitalize px-1.5 py-0 ${progress.confidence === "easy" ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400" : progress.confidence === "medium" ? "border-amber-500/40 text-amber-600 dark:text-amber-400" : "border-destructive/40 text-destructive"}`,
              children: progress.confidence
            }
          )
        ] })
      ]
    }
  );
}
function AuthGate({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-8 w-8 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Sign in to view your dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm", children: "Track your study progress, quiz history, bookmarks, and remedy mastery — all in one place." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "lg",
        onClick: onLogin,
        "data-ocid": "dashboard.login_button",
        className: "gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
          "Sign in with Internet Identity"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        "data-ocid": "dashboard.back_home_button",
        children: "Back to home"
      }
    ) })
  ] });
}
function Dashboard() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    principal,
    login
  } = useAuth();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: sessions, isLoading: sessionsLoading } = useMySessions();
  const { data: quizHistory, isLoading: quizLoading } = useMyQuizHistory();
  const { data: remedyProgress, isLoading: progressLoading } = useMyRemedyProgress();
  const { data: bookmarks, isLoading: bookmarksLoading } = useMyBookmarks();
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-5xl space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardStatSkeleton, {}, i)) }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGate, { onLogin: login });
  }
  const recentSessions = (sessions ?? []).slice().sort((a, b) => Number(b.completedAt - a.completedAt)).slice(0, 5);
  const recentQuizzes = (quizHistory ?? []).slice().sort((a, b) => Number(b.completedAt - a.completedAt)).slice(0, 5);
  const topRemedies = (remedyProgress ?? []).slice().sort((a, b) => Number(b.timesStudied - a.timesStudied)).slice(0, 5);
  const bookmarkedRemedies = (remedies ?? []).filter(
    (r) => (bookmarks ?? []).some((b) => b.remedyId === r.id)
  );
  const totalStudyTime = formatTotalTime(sessions ?? []);
  const avgAccuracy = stats ? `${Math.round(stats.averageScore * 100)}%` : "—";
  const totalSessions = stats ? String(stats.totalSessions) : "—";
  const totalQuizzes = stats ? String(stats.totalQuizAttempts) : "—";
  const joinDate = sessions && sessions.length > 0 ? formatDate(
    sessions.reduce(
      (min, s) => s.completedAt < min ? s.completedAt : min,
      sessions[0].completedAt
    )
  ) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display text-lg font-semibold text-foreground font-mono truncate",
                "data-ocid": "dashboard.principal_text",
                children: principal ? truncatePrincipal(principal) : "—"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-primary/30 text-primary shrink-0",
                "data-ocid": "dashboard.learner_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5 mr-1" }),
                  "Registered Learner"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Member since ",
            joinDate
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 flex-wrap",
          "data-ocid": "dashboard.quick_actions",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/flashcards", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "default",
                className: "gap-1.5",
                "data-ocid": "dashboard.start_flashcards_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
                  "Flashcards"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5",
                "data-ocid": "dashboard.take_quiz_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
                  "Quiz"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "gap-1.5",
                "data-ocid": "dashboard.browse_literature_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
                  "Literature"
                ]
              }
            ) })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-5xl space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.stats_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
            title: "Your Progress"
          }
        ),
        statsLoading || sessionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardStatSkeleton, {}, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              index: 1,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
              label: "Study Sessions",
              value: totalSessions,
              sub: "All time"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              index: 2,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
              label: "Avg Accuracy",
              value: avgAccuracy,
              sub: "Across all quizzes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              index: 3,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              label: "Study Time",
              value: totalStudyTime,
              sub: "Total recorded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              index: 4,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
              label: "Quiz Attempts",
              value: totalQuizzes,
              sub: "All formats"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.activity_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
              title: "Recent Sessions",
              count: recentSessions.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-4", children: sessionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-14" })
          ] }, i)) }) : recentSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-8 w-8" }),
              title: "No sessions yet",
              description: "Complete your first flashcard or quiz session to see it here.",
              cta: "Start studying",
              ctaHref: "/flashcards",
              ocid: "dashboard.activity.empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentSessions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityRow, { session: s, index: i + 1 }, s.id)) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quiz_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
              title: "Quiz History",
              count: recentQuizzes.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-4", children: quizLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 ml-auto" })
          ] }, i)) }) : recentQuizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-8 w-8" }),
              title: "No quizzes yet",
              description: "Take your first quiz to track your performance here.",
              cta: "Take a quiz",
              ctaHref: "/quiz",
              ocid: "dashboard.quiz.empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Format" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Date" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentQuizzes.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuizRow, { attempt: q, index: i + 1 }, q.id)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.remedy_progress_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Remedy Mastery" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1 text-xs",
              "data-ocid": "dashboard.remedy_progress.view_all_button",
              children: [
                "Browse all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-5", children: progressLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full rounded-full" })
        ] }, i)) }) : topRemedies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-8 w-8" }),
            title: "No remedy data yet",
            description: "Study remedies via flashcards or quizzes to track your mastery.",
            cta: "Start flashcards",
            ctaHref: "/flashcards",
            ocid: "dashboard.remedy_progress.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: topRemedies.map((rp, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RemedyProgressBar,
            {
              progress: rp,
              index: i + 1,
              remedyName: ((_a = (remedies ?? []).find((r) => r.id === rp.remedyId)) == null ? void 0 : _a.name) ?? rp.remedyId
            },
            rp.remedyId
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.bookmarks_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Bookmarked Remedies" }),
            bookmarkedRemedies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: bookmarkedRemedies.length })
          ] }),
          bookmarkedRemedies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1 text-xs",
              "data-ocid": "dashboard.bookmarks.browse_button",
              children: [
                "Browse ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
              ]
            }
          ) })
        ] }),
        bookmarksLoading || remediesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RemedyCardSkeleton, {}, i)) }) : bookmarkedRemedies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8" }),
            title: "No bookmarks yet",
            description: "Bookmark remedies from the literature browser to save them here.",
            cta: "Browse Materia Medica",
            ctaHref: "/literature",
            ocid: "dashboard.bookmarks.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: bookmarkedRemedies.map((remedy, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RemedyCard,
          {
            remedy,
            index: i + 1,
            compact: true
          },
          remedy.id
        )) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
