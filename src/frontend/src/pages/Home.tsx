import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Microscope,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { RemedyCard } from "../components/RemedyCard";
import { useAuth } from "../hooks/useAuth";
import { SEED_REMEDIES, useListRemedies } from "../hooks/useRemedies";

const PREVIEW_NAMES = ["Arsenicum Album", "Belladonna", "Nux Vomica"];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Materia Medica",
    desc: "Authentic remedy profiles from Boericke, Allen's Keynotes, and Lotus — with exact source citations and complete symptom pictures.",
    href: "/literature",
    cta: "Browse Remedies",
    badge: "Literature",
    accentClass: "bg-primary/10 text-primary ring-primary/20",
  },
  {
    icon: Brain,
    title: "Flashcards & Spaced Review",
    desc: "Adaptive symptom-to-remedy flashcards that learn your weak spots and resurface remedies at the optimal moment for retention.",
    href: "/flashcards",
    cta: "Start Flashcards",
    badge: "Study",
    accentClass: "bg-accent/10 text-accent ring-accent/20",
  },
  {
    icon: Trophy,
    title: "Exam Quiz",
    desc: "Exam-style multiple choice questions with difficulty tiers, score history, and a global leaderboard for competitive practice.",
    href: "/quiz",
    cta: "Take a Quiz",
    badge: "Assessment",
    accentClass: "bg-chart-2/10 text-chart-2 ring-chart-2/20",
  },
];

const STATS = [
  { value: "200+", label: "Remedy Profiles", icon: FlaskConical },
  { value: "1,000+", label: "Symptoms Indexed", icon: Leaf },
  { value: "500+", label: "Quiz Questions", icon: Trophy },
  { value: "Free", label: "For All Students", icon: GraduationCap },
];

const TOOLS = [
  {
    icon: Compass,
    label: "Repertory",
    desc: "Case-based symptom lookup",
    href: "/repertory",
  },
  {
    icon: Microscope,
    label: "Organon",
    desc: "All 291 aphorisms + commentary",
    href: "/organon",
  },
  {
    icon: Activity,
    label: "Dashboard",
    desc: "Progress, streaks & bookmarks",
    href: "/dashboard",
  },
  {
    icon: Zap,
    label: "Leaderboard",
    desc: "Top scorers by difficulty",
    href: "/leaderboard",
  },
];

export default function HomePage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();

  const previewRemedies = (() => {
    const all = remedies ?? SEED_REMEDIES;
    const matches = PREVIEW_NAMES.map(
      (name) => all.find((r) => r.name === name) ?? all[0],
    ).filter(Boolean);
    return matches.length >= 3 ? matches.slice(0, 3) : all.slice(0, 3);
  })();

  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}…${principal.slice(-3)}`
    : null;

  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-background pb-28 pt-24 px-4">
        {/* Layered decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[100px]" />
          <div className="absolute bottom-0 right-1/5 h-[360px] w-[360px] rounded-full bg-accent/8 blur-[80px]" />
          <div className="absolute top-1/3 left-0 h-[200px] w-[200px] rounded-full bg-chart-2/5 blur-[60px]" />
          {/* Fine rule lines */}
          <div className="absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-32 left-8 h-24 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
          <div className="absolute top-32 right-8 h-24 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border-color, oklch(0.88 0 0)) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0 0) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          {/* Authenticated welcome strip */}
          {isAuthenticated && shortPrincipal && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm text-primary"
              data-ocid="hero.welcome_badge"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Welcome back,{" "}
              <span className="font-mono text-xs opacity-75">
                {shortPrincipal}
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Label pill */}
            <div className="mb-6 flex items-center justify-center">
              <Badge
                variant="outline"
                className="gap-1.5 border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-primary"
              >
                <Sparkles className="h-3 w-3" />
                Med / Similia — Knowledge Platform
              </Badge>
            </div>

            {/* Main headline */}
            <h1 className="mb-5 font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              Homoeo{" "}
              <span className="relative inline-block">
                <span className="text-primary">Scholar</span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 4 C50 2, 100 5, 198 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mx-auto mb-4 max-w-xl font-display text-xl font-light text-foreground/70 sm:text-2xl leading-relaxed">
              The complete clinical reference for homoeopathic students &amp;
              practitioners
            </p>

            {/* Source tags */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
              {["Boericke", "Allen's Keynotes", "Lotus MM", "Organon"].map(
                (src) => (
                  <span
                    key={src}
                    className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
                  >
                    {src}
                  </span>
                ),
              )}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                asChild
                className="gap-2 px-7 shadow-medical-md"
                data-ocid="hero.start_learning.primary_button"
              >
                <Link to="/literature">
                  <BookOpen className="h-4 w-4" />
                  Open Literature
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 border-border bg-card/50 backdrop-blur-sm hover:bg-card"
                data-ocid="hero.browse_remedies.secondary_button"
              >
                <Link to="/flashcards">
                  <Brain className="h-4 w-4" />
                  Practice Now
                </Link>
              </Button>
            </div>

            {/* Authenticated quick links */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  data-ocid="hero.go_to_dashboard.button"
                >
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-3 w-3" />
                    Dashboard
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  data-ocid="hero.continue_studying.button"
                >
                  <Link to="/flashcards">
                    <Brain className="h-3 w-3" />
                    Continue Studying
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  data-ocid="hero.repertory.button"
                >
                  <Link to="/repertory">
                    <Compass className="h-3 w-3" />
                    Case Analysis
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Stats bar ────────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card px-4 py-6 shadow-medical-sm">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center justify-center gap-1.5 py-5 px-4 text-center first:rounded-l-lg last:rounded-r-lg"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Tools Grid ──────────────────────────────────────────────────── */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 flex items-center gap-3"
          >
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Core Study Tools
            </span>
            <span className="h-px flex-1 bg-border" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-display-lg mb-3 text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto max-w-lg text-base text-muted-foreground leading-relaxed">
              Three powerful tools built for homoeopathic students and
              practitioners — from authoritative reference to exam readiness.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative rounded-2xl border border-border bg-card shadow-card-elevated card-hover overflow-hidden"
                data-ocid={`home.feature.item.${i + 1}`}
              >
                {/* Top accent strip */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-smooth group-hover:opacity-100" />

                <div className="p-7">
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${feature.accentClass}`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-border bg-muted/50 text-xs text-muted-foreground"
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="mb-2.5 font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mb-7 text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-auto gap-1.5 p-0 text-sm text-primary hover:text-primary"
                    data-ocid={`home.feature.cta.${i + 1}`}
                  >
                    <Link to={feature.href}>
                      {feature.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── More Tools ───────────────────────────────────────────────────────── */}
      <section className="bg-muted/20 border-y border-border px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-1.5">
              More Clinical Tools
            </h2>
            <p className="text-sm text-muted-foreground">
              Advanced features for deeper study and case analysis
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={tool.href}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-medical-sm transition-smooth hover:border-primary/30 hover:shadow-medical-md"
                  data-ocid={`home.tool.${tool.label.toLowerCase()}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 transition-smooth group-hover:bg-primary/15">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">
                      {tool.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Remedies ────────────────────────────────────────────────── */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h2 className="text-display-lg text-foreground mb-2">
                Featured Remedies
              </h2>
              <p className="text-base text-muted-foreground">
                A preview of what's inside the Materia Medica browser.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="shrink-0 gap-2 shadow-medical-sm"
              data-ocid="home.view_all_remedies.button"
            >
              <Link to="/literature">
                View All Remedies
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.div>

          <div
            className="grid gap-5 md:grid-cols-3"
            data-ocid="home.remedies.list"
          >
            {remediesLoading
              ? (["skel-1", "skel-2", "skel-3"] as const).map((key, i) => (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-card p-5 shadow-medical-sm"
                    data-ocid={`home.remedies.loading_state.${i + 1}`}
                  >
                    <Skeleton className="h-5 w-3/5 mb-2" />
                    <Skeleton className="h-4 w-2/5 mb-4" />
                    <Skeleton className="h-3 w-full mb-1.5" />
                    <Skeleton className="h-3 w-4/5 mb-1.5" />
                    <Skeleton className="h-3 w-3/5" />
                  </div>
                ))
              : previewRemedies.map((remedy, i) => (
                  <motion.div
                    key={remedy.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <RemedyCard
                      remedy={remedy}
                      index={i + 1}
                      data-ocid={`home.remedies.item.${i + 1}`}
                    />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-card px-4 py-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-primary/5 blur-[80px]" />
        </div>
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-display-md mb-3 text-foreground">
              Ready to Master the Materia Medica?
            </h2>
            <p className="mx-auto mb-3 max-w-md text-base text-muted-foreground leading-relaxed">
              Start with flashcards for daily revision, dive into the authentic
              literature, or analyse a case with the Repertory tool.
            </p>
            <p className="mx-auto mb-9 text-xs text-muted-foreground/70 max-w-xs">
              Login with Internet Identity to unlock progress tracking, spaced
              repetition, and case diary.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                asChild
                className="gap-2 px-7 shadow-medical-md"
                data-ocid="bottom_cta.start_flashcards.primary_button"
              >
                <Link to="/flashcards">
                  <Brain className="h-4 w-4" />
                  Start Flashcards
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2"
                data-ocid="bottom_cta.take_quiz.secondary_button"
              >
                <Link to="/quiz">
                  <Trophy className="h-4 w-4" />
                  Take a Quiz
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
