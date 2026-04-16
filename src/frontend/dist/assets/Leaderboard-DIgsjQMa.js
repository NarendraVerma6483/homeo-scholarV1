import { u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Badge, f as Skeleton } from "./index-DkGDOaWJ.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Dk86WgDw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-Cx5V8sin.js";
import { u as useQuery } from "./backend-Cse0PRbs.js";
import { D as Difficulty } from "./backend.d-fDSsbcCm.js";
import { u as useBackend } from "./useBackend-DNKZsOVi.js";
import { m as motion } from "./proxy-Dd56LSHE.js";
function toDifficultyEnum(d) {
  return Difficulty[d];
}
function useLeaderboard(difficulty) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["leaderboard", difficulty],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getLeaderboard(toDifficultyEnum(difficulty));
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && !!backend
  });
}
function useSeedData() {
  const { backend } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["seed", "init"],
    queryFn: async () => {
      if (!backend) return null;
      await Promise.allSettled([
        backend.seedOrganon(),
        backend.seedRepertory(),
        backend.seedSourcedRemedies()
      ]);
      return true;
    },
    enabled: !!backend && isAuthenticated,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false
  });
}
const DIFFICULTY_TABS = [
  {
    key: "beginner",
    label: "Beginner",
    color: "text-[oklch(var(--chart-2))]"
  },
  {
    key: "intermediate",
    label: "Intermediate",
    color: "text-[oklch(var(--chart-4))]"
  },
  {
    key: "advanced",
    label: "Advanced",
    color: "text-[oklch(var(--chart-3))]"
  }
];
const MEDAL = {
  1: {
    label: "🥇",
    style: "bg-[oklch(var(--chart-2)/0.15)] text-[oklch(var(--chart-2))] border border-[oklch(var(--chart-2)/0.4)]"
  },
  2: {
    label: "🥈",
    style: "bg-muted text-muted-foreground border border-border"
  },
  3: {
    label: "🥉",
    style: "bg-[oklch(var(--chart-4)/0.15)] text-[oklch(var(--chart-4))] border border-[oklch(var(--chart-4)/0.4)]"
  }
};
function MedalBadge({ rank }) {
  const medal = MEDAL[rank];
  if (medal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${medal.style}`,
        children: medal.label
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold text-muted-foreground bg-muted border border-border", children: rank });
}
function formatUserId(userId) {
  if (!userId || userId.length <= 16) return userId;
  return `${userId.slice(0, 8)}…${userId.slice(-6)}`;
}
function RowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1 max-w-[160px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14" })
  ] });
}
function LeaderboardTable({ difficulty }) {
  const { data = [], isLoading } = useLeaderboard(difficulty);
  const sorted = [...data].sort((a, b) => Number(b.score) - Number(a.score)).slice(0, 10);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "divide-y divide-border",
        "data-ocid": "leaderboard.loading_state",
        children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}, `skeleton-row-${i + 1}`))
      }
    );
  }
  if (sorted.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
        "data-ocid": "leaderboard.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display-md text-foreground", children: "No scores yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground max-w-xs", children: "Be the first to play and claim the top spot on the leaderboard!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", "data-ocid": "leaderboard.list", children: sorted.map((entry, idx) => {
    const rank = idx + 1;
    const pct = typeof entry.percentage === "number" ? entry.percentage : 0;
    const score = Number(entry.score);
    const total = Number(entry.total);
    const userId = typeof entry.userId === "object" && "toText" in entry.userId ? entry.userId.toText() : String(entry.userId);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -16 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: idx * 0.05, duration: 0.3 },
        className: `flex items-center gap-4 px-5 py-4 transition-smooth hover:bg-muted/30 ${rank <= 3 ? "bg-primary/[0.02]" : ""}`,
        "data-ocid": `leaderboard.item.${rank}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MedalBadge, { rank }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base font-semibold text-foreground truncate", children: entry.displayName || formatUserId(userId) }),
            entry.displayName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground truncate", children: formatUserId(userId) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right min-w-[80px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-base font-bold text-foreground", children: [
              score,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-sm", children: [
                "/",
                total
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              pct.toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right min-w-[80px] hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
            Number(entry.timestamp) / 1e6
          ).toLocaleDateString(void 0, {
            month: "short",
            day: "numeric"
          }) }) })
        ]
      },
      `${userId}-${rank}`
    );
  }) });
}
function LeaderboardPage() {
  const [activeTab, setActiveTab] = reactExports.useState("beginner");
  useSeedData();
  const activeDifficulty = DIFFICULTY_TABS.find((d) => d.key === activeTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "leaderboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🏆" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-xl text-foreground font-display", children: "Leaderboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground mt-0.5", children: "Top 10 players per difficulty level" })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TabsList,
            {
              className: "w-full mb-6 bg-card border border-border shadow-medical-sm p-1 rounded-xl h-auto",
              "data-ocid": "leaderboard.tab",
              children: DIFFICULTY_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: tab.key,
                  className: "flex-1 py-2.5 text-sm font-semibold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medical-sm transition-smooth",
                  "data-ocid": `leaderboard.tab.${tab.key}`,
                  children: tab.label
                },
                tab.key
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.25 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-medical-md border-border overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-0 px-5 pt-5 flex flex-row items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-display-md font-display text-foreground flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activeDifficulty.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: `text-xs font-semibold ${activeDifficulty.color}`,
                        children: "Top 10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-[80px] text-right", children: "Score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-[80px] text-right", children: "Date" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-0 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardTable, { difficulty: activeTab }) })
              ] })
            },
            activeTab
          )
        ]
      }
    ) })
  ] });
}
export {
  LeaderboardPage as default
};
