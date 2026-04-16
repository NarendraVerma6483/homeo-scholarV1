import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { useLeaderboard, useSeedData } from "../hooks/useLeaderboard";

type DifficultyKey = "beginner" | "intermediate" | "advanced";

const DIFFICULTY_TABS: { key: DifficultyKey; label: string; color: string }[] =
  [
    {
      key: "beginner",
      label: "Beginner",
      color: "text-[oklch(var(--chart-2))]",
    },
    {
      key: "intermediate",
      label: "Intermediate",
      color: "text-[oklch(var(--chart-4))]",
    },
    {
      key: "advanced",
      label: "Advanced",
      color: "text-[oklch(var(--chart-3))]",
    },
  ];

const MEDAL: Record<number, { label: string; style: string }> = {
  1: {
    label: "🥇",
    style:
      "bg-[oklch(var(--chart-2)/0.15)] text-[oklch(var(--chart-2))] border border-[oklch(var(--chart-2)/0.4)]",
  },
  2: {
    label: "🥈",
    style: "bg-muted text-muted-foreground border border-border",
  },
  3: {
    label: "🥉",
    style:
      "bg-[oklch(var(--chart-4)/0.15)] text-[oklch(var(--chart-4))] border border-[oklch(var(--chart-4)/0.4)]",
  },
};

function MedalBadge({ rank }: { rank: number }) {
  const medal = MEDAL[rank];
  if (medal) {
    return (
      <span
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${medal.style}`}
      >
        {medal.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold text-muted-foreground bg-muted border border-border">
      {rank}
    </span>
  );
}

function formatUserId(userId: string): string {
  if (!userId || userId.length <= 16) return userId;
  return `${userId.slice(0, 8)}…${userId.slice(-6)}`;
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <Skeleton className="w-9 h-9 rounded-full" />
      <Skeleton className="h-4 flex-1 max-w-[160px]" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-14" />
    </div>
  );
}

interface LeaderboardTableProps {
  difficulty: DifficultyKey;
}

function LeaderboardTable({ difficulty }: LeaderboardTableProps) {
  const { data = [], isLoading } = useLeaderboard(difficulty);

  const sorted = [...data]
    .sort((a, b) => Number(b.score) - Number(a.score))
    .slice(0, 10);

  if (isLoading) {
    return (
      <div
        className="divide-y divide-border"
        data-ocid="leaderboard.loading_state"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <RowSkeleton key={`skeleton-row-${i + 1}`} />
        ))}
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4 text-center"
        data-ocid="leaderboard.empty_state"
      >
        <span className="text-5xl">🏆</span>
        <p className="text-display-md text-foreground">No scores yet</p>
        <p className="text-body-base text-muted-foreground max-w-xs">
          Be the first to play and claim the top spot on the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border" data-ocid="leaderboard.list">
      {sorted.map((entry, idx) => {
        const rank = idx + 1;
        const pct = typeof entry.percentage === "number" ? entry.percentage : 0;
        const score = Number(entry.score);
        const total = Number(entry.total);
        const userId =
          typeof entry.userId === "object" &&
          "toText" in (entry.userId as object)
            ? (entry.userId as { toText: () => string }).toText()
            : String(entry.userId);

        return (
          <motion.div
            key={`${userId}-${rank}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className={`flex items-center gap-4 px-5 py-4 transition-smooth hover:bg-muted/30 ${
              rank <= 3 ? "bg-primary/[0.02]" : ""
            }`}
            data-ocid={`leaderboard.item.${rank}`}
          >
            {/* Rank */}
            <MedalBadge rank={rank} />

            {/* Player name */}
            <div className="flex-1 min-w-0">
              <p className="text-body-base font-semibold text-foreground truncate">
                {entry.displayName || formatUserId(userId)}
              </p>
              {entry.displayName && (
                <p className="text-body-sm text-muted-foreground truncate">
                  {formatUserId(userId)}
                </p>
              )}
            </div>

            {/* Score */}
            <div className="text-right min-w-[80px]">
              <p className="text-body-base font-bold text-foreground">
                {score}
                <span className="text-muted-foreground font-normal text-sm">
                  /{total}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">{pct.toFixed(1)}%</p>
            </div>

            {/* Date */}
            <div className="text-right min-w-[80px] hidden sm:block">
              <p className="text-xs text-muted-foreground">
                {new Date(
                  Number(entry.timestamp) / 1_000_000,
                ).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<DifficultyKey>("beginner");
  useSeedData();

  // Seed once on mount when authenticated — handled by useSeedData hook above

  const activeDifficulty = DIFFICULTY_TABS.find((d) => d.key === activeTab)!;

  return (
    <div className="min-h-screen bg-background" data-ocid="leaderboard.page">
      {/* Page Header */}
      <div className="bg-card border-b border-border shadow-medical-sm">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-medical-sm">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h1 className="text-display-xl text-foreground font-display">
                Leaderboard
              </h1>
              <p className="text-body-base text-muted-foreground mt-0.5">
                Top 10 players per difficulty level
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as DifficultyKey)}
        >
          {/* Tab Bar */}
          <TabsList
            className="w-full mb-6 bg-card border border-border shadow-medical-sm p-1 rounded-xl h-auto"
            data-ocid="leaderboard.tab"
          >
            {DIFFICULTY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-medical-sm transition-smooth"
                data-ocid={`leaderboard.tab.${tab.key}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Active difficulty badge */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="shadow-medical-md border-border overflow-hidden">
              <CardHeader className="pb-0 px-5 pt-5 flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-display-md font-display text-foreground flex items-center gap-3">
                  <span>{activeDifficulty.label}</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs font-semibold ${activeDifficulty.color}`}
                  >
                    Top 10
                  </Badge>
                </CardTitle>

                {/* Column headers */}
                <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <span className="w-[80px] text-right">Score</span>
                  <span className="w-[80px] text-right">Date</span>
                </div>
              </CardHeader>

              <CardContent className="px-0 pb-0 mt-4">
                <LeaderboardTable difficulty={activeTab} />
              </CardContent>
            </Card>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
