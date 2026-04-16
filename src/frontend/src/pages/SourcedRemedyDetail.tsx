import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  Heart,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MateriaSource, type SourcedRemedy } from "../backend.d";
import {
  useGetSourcedRemedy,
  useSourcesByRemedyName,
} from "../hooks/useSourcedRemedies";

// ─── Source config ────────────────────────────────────────────────────────────
const SOURCE_META = {
  [MateriaSource.boericke]: {
    label: "Boericke's Materia Medica",
    short: "Boericke's MM",
    author: "William Boericke, M.D.",
    year: "1901",
    description:
      "Comprehensive physiological and pathological symptom coverage. Internationally adopted as the definitive reference for homoeopathic prescribers.",
    attribution:
      "According to Boericke's Materia Medica (William Boericke, M.D., 1901):",
    badgeClass:
      "bg-primary/10 text-primary border-primary/30 dark:bg-primary/15",
    accentClass: "border-primary/30 bg-primary/5",
    dotClass: "bg-primary",
  },
  [MateriaSource.allensKeynotes]: {
    label: "Allen's Keynotes",
    short: "Allen's Keynotes",
    author: "H.C. Allen, M.D.",
    year: "1899",
    description:
      "Celebrated keynote repertory capturing the most characteristic and prescribing symptoms. Essential for rapid, accurate case analysis.",
    attribution: "According to Allen's Keynotes (H.C. Allen, M.D., 1899):",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
    accentClass: "border-primary/30 bg-primary/5",
    dotClass: "bg-primary",
  },
  [MateriaSource.lotus]: {
    label: "Lotus Materia Medica",
    short: "Lotus MM",
    author: "Phillip Bailey",
    year: "1995",
    description:
      "Holistic and constitutional perspective on homoeopathic remedies. Explores the deeper essence and personality of each remedy with psychological depth.",
    attribution: "According to Lotus Materia Medica (Phillip Bailey, 1995):",
    badgeClass: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    accentClass: "border-chart-2/30 bg-chart-2/5",
    dotClass: "bg-chart-2",
  },
};

// ─── SectionCard ─────────────────────────────────────────────────────────────
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

// ─── BulletList ───────────────────────────────────────────────────────────────
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

// ─── KeynoteChips ─────────────────────────────────────────────────────────────
function KeynoteChips({ items }: { items: string[] }) {
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

// ─── Modality block ───────────────────────────────────────────────────────────
function ModalitiesBlock({
  worse,
  better,
}: {
  worse: string[];
  better: string[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {worse.length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-4 w-4 text-destructive shrink-0" />
            <p className="text-xs font-semibold text-destructive uppercase tracking-wider">
              Aggravated by (Worse)
            </p>
          </div>
          <ul className="space-y-1.5">
            {worse.map((w) => (
              <li
                key={w}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-destructive/60 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
      {better.length > 0 && (
        <div className="rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-chart-2 shrink-0" />
            <p className="text-xs font-semibold text-chart-2 uppercase tracking-wider">
              Ameliorated by (Better)
            </p>
          </div>
          <ul className="space-y-1.5">
            {better.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-chart-2/60 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Source picker card ───────────────────────────────────────────────────────
function SourcePickerCard({
  source,
  isSelected,
  onClick,
}: {
  source: SourcedRemedy;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meta = SOURCE_META[source.source];
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`sourced_detail.source_card.${source.source}`}
      className={cn(
        "w-full text-left rounded-xl border p-5 transition-smooth cursor-pointer",
        "hover:shadow-medical-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-medical-sm"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <Badge
          variant="outline"
          className={cn("text-xs font-semibold", meta.badgeClass)}
        >
          {meta.short}
        </Badge>
        {isSelected && (
          <span className="text-xs font-semibold text-primary">Selected</span>
        )}
      </div>
      <h3 className="font-display font-semibold text-foreground mb-1">
        {meta.label}
      </h3>
      <p className="text-body-sm text-muted-foreground">
        {meta.author} · {meta.year}
      </p>
      <p className="text-body-sm text-muted-foreground mt-2 leading-relaxed">
        {meta.description}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-sm text-primary font-medium">
        <span>View {source.keynotes.length} keynotes</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </button>
  );
}

// ─── Detail skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-56 w-full rounded-2xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
      <Skeleton className="h-40 rounded-xl" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SourcedRemedyDetailPage() {
  const { id } = useParams({ from: "/sourced-remedy/$id" });
  const { data: remedy, isLoading } = useGetSourcedRemedy(id);

  // When remedy is loaded, find other sources for same remedy name
  const { data: allSources } = useSourcesByRemedyName(remedy?.name ?? "");
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);

  // Determine which remedy to display in detail view
  const displayedRemedy: SourcedRemedy | undefined =
    selectedSourceId != null
      ? (allSources?.find((s) => s.id === selectedSourceId) ??
        remedy ??
        undefined)
      : (remedy ?? undefined);

  const otherSources =
    displayedRemedy && allSources
      ? allSources.filter((s) => s.id !== displayedRemedy.id)
      : [];

  return (
    <div className="min-h-screen bg-background" data-ocid="sourced_detail.page">
      {/* Sticky breadcrumb */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center h-12 gap-2 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-1.5 -ml-2 h-8 text-muted-foreground hover:text-foreground"
              data-ocid="sourced_detail.back.button"
            >
              <Link to="/literature">
                <ArrowLeft className="h-3.5 w-3.5" />
                Materia Medica
              </Link>
            </Button>
            {displayedRemedy && (
              <>
                <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                <span className="text-foreground font-medium truncate">
                  {displayedRemedy.name}
                </span>
                <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                <span className="truncate">
                  {SOURCE_META[displayedRemedy.source].short}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <DetailSkeleton />
        ) : !displayedRemedy ? (
          /* 404 state */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="sourced_detail.error_state"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted/30">
              <FlaskConical className="h-9 w-9 text-muted-foreground" />
            </div>
            <h2 className="text-display-md text-foreground mb-2">
              Remedy not found
            </h2>
            <p className="text-body-sm text-muted-foreground mb-6 max-w-sm">
              This remedy doesn't exist in the sourced Materia Medica yet.
            </p>
            <Button
              asChild
              variant="outline"
              data-ocid="sourced_detail.browse.button"
            >
              <Link to="/literature">Browse All Remedies</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ── Available Sources picker (if multiple) ─────────────────── */}
            {allSources && allSources.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-border bg-card p-5 shadow-medical-sm"
                data-ocid="sourced_detail.source_picker"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-foreground text-base">
                    Available Sources for {displayedRemedy.name}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {allSources.map((source) => (
                    <SourcePickerCard
                      key={source.id}
                      source={source}
                      isSelected={displayedRemedy.id === source.id}
                      onClick={() => setSelectedSourceId(source.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-medical-md"
            >
              {/* Decorative orbs */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

              <div className="relative p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    {/* Source badge */}
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-semibold mb-1",
                        SOURCE_META[displayedRemedy.source].badgeClass,
                      )}
                    >
                      {SOURCE_META[displayedRemedy.source].label}
                    </Badge>

                    {/* Remedy name */}
                    <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground leading-tight">
                      {displayedRemedy.name}
                    </h1>

                    {/* Latin name */}
                    {displayedRemedy.latinName && (
                      <p className="font-display italic text-lg text-muted-foreground">
                        {displayedRemedy.latinName}
                      </p>
                    )}

                    {/* Author / year */}
                    <p className="text-body-sm text-muted-foreground">
                      {SOURCE_META[displayedRemedy.source].author} ·{" "}
                      {SOURCE_META[displayedRemedy.source].year}
                    </p>

                    {/* Explicit attribution line */}
                    <p className="text-xs font-semibold text-muted-foreground italic mt-1">
                      {SOURCE_META[displayedRemedy.source].attribution}
                    </p>

                    {/* Clinical uses as badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {displayedRemedy.clinicalUses.slice(0, 4).map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs">
                          {c}
                        </Badge>
                      ))}
                      {displayedRemedy.clinicalUses.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{displayedRemedy.clinicalUses.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Constitutional Picture ───────────────────────────────────── */}
            {displayedRemedy.constitution && (
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
                  {displayedRemedy.constitution}
                </p>
              </motion.div>
            )}

            {/* ── Keynotes ─────────────────────────────────────────────────── */}
            <SectionCard
              title="Keynote Symptoms"
              icon={<Sparkles className="h-3.5 w-3.5" />}
              delay={0.1}
            >
              <KeynoteChips items={displayedRemedy.keynotes} />
            </SectionCard>

            {/* ── Mental / Physical split ───────────────────────────────────── */}
            <div className="grid md:grid-cols-2 gap-4">
              <SectionCard
                title="Mental Symptoms"
                icon={<Brain className="h-3.5 w-3.5" />}
                delay={0.15}
              >
                {displayedRemedy.mentalSymptoms.length > 0 ? (
                  <BulletList items={displayedRemedy.mentalSymptoms} />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Not recorded in this source.
                  </p>
                )}
              </SectionCard>

              <SectionCard
                title="Physical Symptoms"
                icon={<FlaskConical className="h-3.5 w-3.5" />}
                delay={0.2}
              >
                {displayedRemedy.physicalSymptoms.length > 0 ? (
                  <BulletList items={displayedRemedy.physicalSymptoms} />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Not recorded in this source.
                  </p>
                )}
              </SectionCard>
            </div>

            {/* ── Modalities ───────────────────────────────────────────────── */}
            <SectionCard
              title="Modalities"
              icon={<TrendingUp className="h-3.5 w-3.5" />}
              delay={0.25}
            >
              <ModalitiesBlock
                worse={displayedRemedy.modalities.worse}
                better={displayedRemedy.modalities.better}
              />
            </SectionCard>

            {/* ── Clinical Uses ─────────────────────────────────────────────── */}
            {displayedRemedy.clinicalUses.length > 0 && (
              <SectionCard
                title="Clinical Uses"
                icon={<BookOpen className="h-3.5 w-3.5" />}
                delay={0.3}
              >
                <div className="flex flex-wrap gap-2">
                  {displayedRemedy.clinicalUses.map((use) => (
                    <Badge key={use} variant="secondary">
                      {use}
                    </Badge>
                  ))}
                </div>
              </SectionCard>
            )}

            <Separator />

            {/* ── Compare in other source ───────────────────────────────────── */}
            {otherSources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="rounded-xl border border-border bg-card p-6 shadow-medical-sm"
                data-ocid="sourced_detail.other_sources"
              >
                <p className="text-sm font-semibold text-foreground mb-3">
                  Also available in:
                </p>
                <div className="flex flex-wrap gap-3">
                  {otherSources.map((src) => (
                    <Button
                      key={src.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSourceId(src.id)}
                      data-ocid={`sourced_detail.switch_source.${src.source}.button`}
                      className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View in {SOURCE_META[src.source].short}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Study actions ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6 shadow-medical-sm"
            >
              <div className="flex flex-wrap gap-3 justify-end">
                <Button
                  variant="outline"
                  asChild
                  data-ocid="sourced_detail.flashcards.button"
                  className="gap-2"
                >
                  <Link to="/flashcards">
                    <Brain className="h-4 w-4" />
                    Study Flashcard
                  </Link>
                </Button>
                <Button
                  asChild
                  data-ocid="sourced_detail.quiz.button"
                  className="gap-2"
                >
                  <Link to="/quiz">
                    <ChevronRight className="h-4 w-4" />
                    Take Quiz
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
