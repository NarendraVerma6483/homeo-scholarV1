import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Brain,
  ChevronRight,
  FlaskConical,
  Heart,
  Minus,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { RemedyDetailSkeleton } from "../components/LoadingSkeleton";
import { useAuth } from "../hooks/useAuth";
import { useIsBookmarked, useToggleBookmark } from "../hooks/useBookmarks";
import { useUpdateRemedyProgress } from "../hooks/useProgress";
import { useGetRemedy } from "../hooks/useRemedies";
import type { Difficulty } from "../types";

// ── Section wrapper ─────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="rounded-xl border border-border bg-card p-6 shadow-medical-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
            {icon}
          </span>
        )}
        <h3 className="font-display font-semibold text-foreground text-lg tracking-tight">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

// ── Symptom chip list ────────────────────────────────────────────────────────
function SymptomChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-medium text-foreground transition-smooth hover:border-primary/60 hover:bg-primary/15"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          {item}
        </span>
      ))}
    </div>
  );
}

// ── Bulleted list ────────────────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Modality row ─────────────────────────────────────────────────────────────
function ModalityBlock({ lines }: { lines: string[] }) {
  const better = lines.filter((l) => l.startsWith(">"));
  const worse = lines.filter((l) => l.startsWith("<"));
  const other = lines.filter((l) => !l.startsWith(">") && !l.startsWith("<"));

  return (
    <div className="space-y-3">
      {worse.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
          <TrendingDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-destructive mb-1 uppercase tracking-wider">
              Aggravated by
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {worse.map((w) => w.replace(/^<\s*/, "")).join("; ")}
            </p>
          </div>
        </div>
      )}
      {better.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-3">
          <TrendingUp className="h-4 w-4 text-chart-2 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-chart-2 mb-1 uppercase tracking-wider">
              Ameliorated by
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {better.map((b) => b.replace(/^>\s*/, "")).join("; ")}
            </p>
          </div>
        </div>
      )}
      {other.length > 0 && (
        <p className="text-sm text-muted-foreground font-mono bg-muted/50 rounded-md px-3 py-2">
          {other.join(" · ")}
        </p>
      )}
    </div>
  );
}

// ── Confidence options ────────────────────────────────────────────────────────
const CONFIDENCE_OPTIONS: {
  label: string;
  value: Difficulty;
  icon: React.ElementType;
}[] = [
  { label: "Hard", value: "hard", icon: ThumbsDown },
  { label: "Medium", value: "medium", icon: Minus },
  { label: "Easy", value: "easy", icon: ThumbsUp },
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function RemedyDetailPage() {
  const { id } = useParams({ from: "/remedy/$id" });
  const { data: remedy, isLoading } = useGetRemedy(id);
  const { isAuthenticated } = useAuth();
  const isBookmarked = useIsBookmarked(id);
  const toggleBookmark = useToggleBookmark();
  const updateProgress = useUpdateRemedyProgress();

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.info("Log in to save bookmarks");
      return;
    }
    try {
      const added = await toggleBookmark.mutateAsync(id);
      toast.success(added ? "Remedy bookmarked" : "Bookmark removed");
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  const handleConfidence = async (confidence: Difficulty) => {
    if (!isAuthenticated) {
      toast.info("Log in to track progress");
      return;
    }
    try {
      await updateProgress.mutateAsync({ remedyId: id, confidence });
      toast.success(`Marked as ${confidence}`);
    } catch {
      toast.error("Failed to update progress");
    }
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="remedy_detail.page">
      {/* Sticky breadcrumb bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center h-12 gap-2 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-1.5 -ml-2 h-8 text-muted-foreground hover:text-foreground"
              data-ocid="remedy_detail.back.button"
            >
              <Link to="/literature">
                <ArrowLeft className="h-3.5 w-3.5" />
                Materia Medica
              </Link>
            </Button>
            {remedy && (
              <>
                <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                <span className="text-foreground font-medium truncate">
                  {remedy.name}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <RemedyDetailSkeleton />
        ) : !remedy ? (
          /* 404 state */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="remedy_detail.error_state"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted/30">
              <FlaskConical className="h-9 w-9 text-muted-foreground" />
            </div>
            <h2 className="text-display-md text-foreground mb-2">
              Remedy not found
            </h2>
            <p className="text-body-sm text-muted-foreground mb-6 max-w-sm">
              The remedy you're looking for doesn't exist in the Materia Medica
              yet.
            </p>
            <Button
              asChild
              variant="outline"
              data-ocid="remedy_detail.browse.button"
            >
              <Link to="/literature">Browse All Remedies</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-medical-md"
            >
              {/* Decorative orb */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

              <div className="relative p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    {/* Category badge */}
                    <Badge
                      variant="outline"
                      className="border-primary/40 text-primary bg-primary/8 font-medium mb-1"
                    >
                      {remedy.kingdom} Kingdom
                    </Badge>

                    {/* Remedy name — Fraunces display type */}
                    <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground leading-tight">
                      {remedy.name}
                    </h1>

                    {/* Latin / common name */}
                    {remedy.commonName && (
                      <p className="font-display italic text-lg text-muted-foreground">
                        {remedy.commonName}
                      </p>
                    )}

                    {/* Clinical indication badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {remedy.clinicalIndications.slice(0, 4).map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                      {remedy.clinicalIndications.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{remedy.clinicalIndications.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Bookmark */}
                  {isAuthenticated && (
                    <Button
                      variant={isBookmarked ? "default" : "outline"}
                      size="sm"
                      onClick={handleBookmark}
                      data-ocid="remedy_detail.bookmark.button"
                      className="gap-2 shrink-0 self-start"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── Constitutional Picture ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-xl border border-primary/25 bg-primary/6 p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Constitutional Picture
                </p>
              </div>
              <p className="text-body-lg text-foreground leading-relaxed">
                {remedy.constitution}
              </p>
            </motion.div>

            {/* ── Key Symptoms chips ──────────────────────────────────────── */}
            <SectionCard
              title="Key Symptoms"
              icon={<Sparkles className="h-3.5 w-3.5" />}
              delay={0.1}
            >
              <SymptomChips
                items={[
                  ...remedy.keySymptomsPhysical,
                  ...remedy.keySymptomsEmotional,
                ]}
              />
            </SectionCard>

            {/* ── Mental & Emotional / Physical ─────────────────────────── */}
            <div className="grid md:grid-cols-2 gap-4">
              <SectionCard
                title="Mental & Emotional Picture"
                icon={<Brain className="h-3.5 w-3.5" />}
                delay={0.15}
              >
                <BulletList items={remedy.keySymptomsEmotional} />
              </SectionCard>

              <SectionCard
                title="Physical Symptoms"
                icon={<FlaskConical className="h-3.5 w-3.5" />}
                delay={0.2}
              >
                <BulletList items={remedy.keySymptomsPhysical} />
              </SectionCard>
            </div>

            {/* ── Modalities ───────────────────────────────────────────────── */}
            <SectionCard
              title="Modalities"
              icon={<TrendingUp className="h-3.5 w-3.5" />}
              delay={0.25}
            >
              <ModalityBlock lines={remedy.modalities} />
            </SectionCard>

            {/* ── Clinical Notes ───────────────────────────────────────────── */}
            <SectionCard
              title="Clinical Notes"
              icon={<BookOpen className="h-3.5 w-3.5" />}
              delay={0.3}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Clinical Indications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {remedy.clinicalIndications.map((c) => (
                      <Badge key={c} variant="secondary">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
                {remedy.relations.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Relations
                      </p>
                      <BulletList items={remedy.relations} />
                    </div>
                  </>
                )}
              </div>
            </SectionCard>

            <Separator />

            {/* ── Study Actions ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-xl border border-border bg-card p-6 shadow-medical-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                {/* Confidence tracking */}
                {isAuthenticated && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">
                      How well do you know this remedy?
                    </p>
                    <div className="flex gap-2">
                      {CONFIDENCE_OPTIONS.map((opt) => (
                        <Button
                          key={opt.value}
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfidence(opt.value)}
                          data-ocid={`remedy_detail.confidence.${opt.value}.button`}
                          className="gap-1.5"
                        >
                          <opt.icon className="h-3.5 w-3.5" />
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Study navigation */}
                <div className="flex gap-3 sm:ml-auto">
                  <Button
                    variant="outline"
                    asChild
                    data-ocid="remedy_detail.flashcards.button"
                    className="gap-2"
                  >
                    <Link to="/flashcards">
                      <Brain className="h-4 w-4" />
                      Study Flashcard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    data-ocid="remedy_detail.quiz.button"
                    className="gap-2"
                  >
                    <Link to="/quiz">
                      <ChevronRight className="h-4 w-4" />
                      Take Quiz
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
