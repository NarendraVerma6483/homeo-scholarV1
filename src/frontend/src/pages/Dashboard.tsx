import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  FlaskConical,
  Layers,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import {
  DashboardStatSkeleton,
  RemedyCardSkeleton,
} from "../components/LoadingSkeleton";
import { RemedyCard } from "../components/RemedyCard";
import { useAuth } from "../hooks/useAuth";
import { useMyBookmarks } from "../hooks/useBookmarks";
import { useMyQuizHistory, useMyRemedyProgress } from "../hooks/useProgress";
import { useListRemedies } from "../hooks/useRemedies";
import { useMySessions, useMyStats } from "../hooks/useUser";
import type { QuizAttempt, RemedyProgress, StudySession } from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatTotalTime(sessions: StudySession[]): string {
  const total = sessions.reduce((acc, s) => acc + Number(s.durationSeconds), 0);
  return formatDuration(BigInt(total));
}

function formatDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatShortDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function truncatePrincipal(p: string): string {
  if (p.length <= 24) return p;
  return `${p.slice(0, 10)}…${p.slice(-8)}`;
}

function accuracyColor(pct: number): string {
  if (pct >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-destructive";
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  index: number;
}) {
  return (
    <div
      data-ocid={`dashboard.stat_card.${index}`}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="font-display text-3xl font-bold text-foreground leading-none">
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-primary">{icon}</span>
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>
      {count !== undefined && (
        <Badge variant="secondary" className="text-xs ml-auto">
          {count}
        </Badge>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  cta,
  ctaHref,
  ocid,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: string;
  ctaHref?: "/flashcards" | "/quiz" | "/literature";
  ocid: string;
}) {
  return (
    <div
      data-ocid={ocid}
      className="rounded-xl border border-dashed border-border bg-muted/20 p-8 flex flex-col items-center gap-3 text-center"
    >
      <span className="text-muted-foreground/50">{icon}</span>
      <div>
        <p className="font-medium text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      {cta && ctaHref && (
        <Link to={ctaHref}>
          <Button size="sm" variant="outline" data-ocid={`${ocid}_cta_button`}>
            {cta}
          </Button>
        </Link>
      )}
    </div>
  );
}

function ActivityRow({
  session,
  index,
}: {
  session: StudySession;
  index: number;
}) {
  const isFlashcard = session.mode === "flashcard";
  return (
    <div
      data-ocid={`dashboard.activity.item.${index}`}
      className="flex items-center gap-4 py-3 border-b border-border last:border-0"
    >
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
          isFlashcard
            ? "bg-primary/10 text-primary"
            : "bg-accent/10 text-accent-foreground"
        }`}
      >
        {isFlashcard ? (
          <Layers className="h-4 w-4" />
        ) : (
          <Brain className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground capitalize">
          {isFlashcard ? "Flashcard Session" : "Quiz Session"}
        </p>
        <p className="text-xs text-muted-foreground">
          {session.remediesStudied.length} remedies studied
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-muted-foreground">
          {formatShortDate(session.completedAt)}
        </p>
        <p className="text-xs font-medium text-foreground">
          {formatDuration(session.durationSeconds)}
        </p>
      </div>
    </div>
  );
}

function QuizRow({ attempt, index }: { attempt: QuizAttempt; index: number }) {
  const pct = Math.round(attempt.score * 100);
  const isMulti = attempt.format === "multiple_choice";
  return (
    <tr
      data-ocid={`dashboard.quiz.item.${index}`}
      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
    >
      <td className="py-3 pr-4">
        <Badge variant="outline" className="text-xs whitespace-nowrap">
          {isMulti ? "Multiple Choice" : "Symptom→Remedy"}
        </Badge>
      </td>
      <td className="py-3 pr-4 text-sm text-foreground font-mono tabular-nums">
        {String(attempt.correctAnswers)}/{String(attempt.totalQuestions)}
      </td>
      <td className={`py-3 pr-4 text-sm font-semibold ${accuracyColor(pct)}`}>
        {pct}%
      </td>
      <td className="py-3 text-xs text-muted-foreground text-right">
        {formatShortDate(attempt.completedAt)}
      </td>
    </tr>
  );
}

function RemedyProgressBar({
  progress,
  index,
  remedyName,
}: {
  progress: RemedyProgress;
  index: number;
  remedyName: string;
}) {
  const total = Number(progress.timesStudied);
  const streak = Number(progress.correctStreak);
  const pct =
    total > 0
      ? Math.min(100, Math.round((streak / Math.max(total, 1)) * 100))
      : 0;
  const confColor =
    progress.confidence === "easy"
      ? "bg-emerald-500"
      : progress.confidence === "medium"
        ? "bg-amber-500"
        : "bg-destructive";

  return (
    <div
      data-ocid={`dashboard.remedy_progress.item.${index}`}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground truncate max-w-[60%]">
          {remedyName}
        </span>
        <span className={`text-xs font-semibold ${accuracyColor(pct)}`}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${confColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {total} sessions · streak {String(progress.correctStreak)}
        </span>
        <Badge
          variant="outline"
          className={`text-[10px] capitalize px-1.5 py-0 ${
            progress.confidence === "easy"
              ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              : progress.confidence === "medium"
                ? "border-amber-500/40 text-amber-600 dark:text-amber-400"
                : "border-destructive/40 text-destructive"
          }`}
        >
          {progress.confidence}
        </Badge>
      </div>
    </div>
  );
}

// ── Auth Gate ─────────────────────────────────────────────────────────────────

function AuthGate({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <ShieldAlert className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Sign in to view your dashboard
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Track your study progress, quiz history, bookmarks, and remedy mastery
          — all in one place.
        </p>
      </div>
      <Button
        size="lg"
        onClick={onLogin}
        data-ocid="dashboard.login_button"
        className="gap-2"
      >
        <Zap className="h-4 w-4" />
        Sign in with Internet Identity
      </Button>
      <Link to="/">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="dashboard.back_home_button"
        >
          Back to home
        </Button>
      </Link>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    principal,
    login,
  } = useAuth();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: sessions, isLoading: sessionsLoading } = useMySessions();
  const { data: quizHistory, isLoading: quizLoading } = useMyQuizHistory();
  const { data: remedyProgress, isLoading: progressLoading } =
    useMyRemedyProgress();
  const { data: bookmarks, isLoading: bookmarksLoading } = useMyBookmarks();
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <DashboardStatSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate onLogin={login} />;
  }

  const recentSessions = (sessions ?? [])
    .slice()
    .sort((a, b) => Number(b.completedAt - a.completedAt))
    .slice(0, 5);

  const recentQuizzes = (quizHistory ?? [])
    .slice()
    .sort((a, b) => Number(b.completedAt - a.completedAt))
    .slice(0, 5);

  const topRemedies = (remedyProgress ?? [])
    .slice()
    .sort((a, b) => Number(b.timesStudied - a.timesStudied))
    .slice(0, 5);

  const bookmarkedRemedies = (remedies ?? []).filter((r) =>
    (bookmarks ?? []).some((b) => b.remedyId === r.id),
  );

  const totalStudyTime = formatTotalTime(sessions ?? []);
  const avgAccuracy = stats ? `${Math.round(stats.averageScore * 100)}%` : "—";
  const totalSessions = stats ? String(stats.totalSessions) : "—";
  const totalQuizzes = stats ? String(stats.totalQuizAttempts) : "—";

  const joinDate =
    sessions && sessions.length > 0
      ? formatDate(
          sessions.reduce(
            (min, s) => (s.completedAt < min ? s.completedAt : min),
            sessions[0].completedAt,
          ),
        )
      : "—";

  return (
    <div className="min-h-screen bg-background">
      {/* Profile header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className="font-display text-lg font-semibold text-foreground font-mono truncate"
                    data-ocid="dashboard.principal_text"
                  >
                    {principal ? truncatePrincipal(principal) : "—"}
                  </h1>
                  <Badge
                    variant="outline"
                    className="text-xs border-primary/30 text-primary shrink-0"
                    data-ocid="dashboard.learner_badge"
                  >
                    <Sparkles className="h-2.5 w-2.5 mr-1" />
                    Registered Learner
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Member since {joinDate}
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div
              className="flex items-center gap-2 flex-wrap"
              data-ocid="dashboard.quick_actions"
            >
              <Link to="/flashcards">
                <Button
                  size="sm"
                  variant="default"
                  className="gap-1.5"
                  data-ocid="dashboard.start_flashcards_button"
                >
                  <Layers className="h-3.5 w-3.5" />
                  Flashcards
                </Button>
              </Link>
              <Link to="/quiz">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  data-ocid="dashboard.take_quiz_button"
                >
                  <Brain className="h-3.5 w-3.5" />
                  Quiz
                </Button>
              </Link>
              <Link to="/literature">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5"
                  data-ocid="dashboard.browse_literature_button"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Literature
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* Stats row */}
        <section data-ocid="dashboard.stats_section">
          <SectionHeader
            icon={<TrendingUp className="h-4 w-4" />}
            title="Your Progress"
          />
          {statsLoading || sessionsLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <DashboardStatSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard
                index={1}
                icon={<Activity className="h-4 w-4" />}
                label="Study Sessions"
                value={totalSessions}
                sub="All time"
              />
              <StatCard
                index={2}
                icon={<Target className="h-4 w-4" />}
                label="Avg Accuracy"
                value={avgAccuracy}
                sub="Across all quizzes"
              />
              <StatCard
                index={3}
                icon={<Clock className="h-4 w-4" />}
                label="Study Time"
                value={totalStudyTime}
                sub="Total recorded"
              />
              <StatCard
                index={4}
                icon={<Award className="h-4 w-4" />}
                label="Quiz Attempts"
                value={totalQuizzes}
                sub="All formats"
              />
            </div>
          )}
        </section>

        {/* Two-column: Recent Activity + Quiz History */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activity */}
          <section data-ocid="dashboard.activity_section">
            <SectionHeader
              icon={<Activity className="h-4 w-4" />}
              title="Recent Sessions"
              count={recentSessions.length}
            />
            <div className="rounded-xl border border-border bg-card p-4">
              {sessionsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-14" />
                    </div>
                  ))}
                </div>
              ) : recentSessions.length === 0 ? (
                <EmptyState
                  icon={<Activity className="h-8 w-8" />}
                  title="No sessions yet"
                  description="Complete your first flashcard or quiz session to see it here."
                  cta="Start studying"
                  ctaHref="/flashcards"
                  ocid="dashboard.activity.empty_state"
                />
              ) : (
                <div>
                  {recentSessions.map((s, i) => (
                    <ActivityRow key={s.id} session={s} index={i + 1} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Quiz History */}
          <section data-ocid="dashboard.quiz_section">
            <SectionHeader
              icon={<Brain className="h-4 w-4" />}
              title="Quiz History"
              count={recentQuizzes.length}
            />
            <div className="rounded-xl border border-border bg-card p-4">
              {quizLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 py-2">
                      <Skeleton className="h-5 w-28 rounded-full" />
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-10" />
                      <Skeleton className="h-5 w-16 ml-auto" />
                    </div>
                  ))}
                </div>
              ) : recentQuizzes.length === 0 ? (
                <EmptyState
                  icon={<Brain className="h-8 w-8" />}
                  title="No quizzes yet"
                  description="Take your first quiz to track your performance here."
                  cta="Take a quiz"
                  ctaHref="/quiz"
                  ocid="dashboard.quiz.empty_state"
                />
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Format
                      </th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Score
                      </th>
                      <th className="pb-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        %
                      </th>
                      <th className="pb-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentQuizzes.map((q, i) => (
                      <QuizRow key={q.id} attempt={q} index={i + 1} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        {/* Remedy Progress */}
        <section data-ocid="dashboard.remedy_progress_section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Remedy Mastery
              </h2>
            </div>
            <Link to="/literature">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs"
                data-ocid="dashboard.remedy_progress.view_all_button"
              >
                Browse all <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            {progressLoading ? (
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : topRemedies.length === 0 ? (
              <EmptyState
                icon={<FlaskConical className="h-8 w-8" />}
                title="No remedy data yet"
                description="Study remedies via flashcards or quizzes to track your mastery."
                cta="Start flashcards"
                ctaHref="/flashcards"
                ocid="dashboard.remedy_progress.empty_state"
              />
            ) : (
              <div className="space-y-5">
                {topRemedies.map((rp, i) => (
                  <RemedyProgressBar
                    key={rp.remedyId}
                    progress={rp}
                    index={i + 1}
                    remedyName={
                      (remedies ?? []).find((r) => r.id === rp.remedyId)
                        ?.name ?? rp.remedyId
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bookmarked Remedies */}
        <section data-ocid="dashboard.bookmarks_section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Bookmarked Remedies
              </h2>
              {bookmarkedRemedies.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {bookmarkedRemedies.length}
                </Badge>
              )}
            </div>
            {bookmarkedRemedies.length > 0 && (
              <Link to="/literature">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs"
                  data-ocid="dashboard.bookmarks.browse_button"
                >
                  Browse <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>

          {bookmarksLoading || remediesLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <RemedyCardSkeleton key={i} />
              ))}
            </div>
          ) : bookmarkedRemedies.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-8 w-8" />}
              title="No bookmarks yet"
              description="Bookmark remedies from the literature browser to save them here."
              cta="Browse Materia Medica"
              ctaHref="/literature"
              ocid="dashboard.bookmarks.empty_state"
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bookmarkedRemedies.map((remedy, i) => (
                <RemedyCard
                  key={remedy.id}
                  remedy={remedy}
                  index={i + 1}
                  compact
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
