import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BookOpen, MessageSquareText, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { Aphorism } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import {
  useAphorisms,
  useSearchAphorisms,
  useSeedOrganon,
} from "../hooks/useOrganon";

// ─── Section constants & colors ───────────────────────────────────────────────
const SECTIONS = [
  "All",
  "Introduction",
  "Part I",
  "Part II",
  "Part III",
  "Part IV",
] as const;

type SectionFilter = (typeof SECTIONS)[number];

const SECTION_COLORS: Record<string, string> = {
  Introduction:
    "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20",
  "Part I": "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "Part II": "bg-chart-3/15 text-chart-3 border-chart-3/30",
  "Part III": "bg-chart-4/15 text-chart-4 border-chart-4/30",
  "Part IV": "bg-chart-5/15 text-chart-5 border-chart-5/30",
};

function getSectionColor(section: string): string {
  return (
    SECTION_COLORS[section] ?? "bg-muted text-muted-foreground border-border"
  );
}

// ─── Key Theme Chip ───────────────────────────────────────────────────────────
function ThemeChip({ theme }: { theme: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15">
      {theme}
    </span>
  );
}

// ─── Aphorism Card ────────────────────────────────────────────────────────────
function AphorismCard({
  aphorism,
  index,
}: {
  aphorism: Aphorism;
  index: number;
}) {
  const num = Number(aphorism.number);
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.5), duration: 0.3 }}
      className="relative"
      data-ocid={`organon.aphorism.${num}`}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

      <div className="pl-6 pr-4 py-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          {/* Large aphorism number */}
          <div className="shrink-0 select-none">
            <span className="font-display text-4xl font-bold leading-none text-primary/40 dark:text-primary/30 tracking-tighter">
              §{num}
            </span>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            {/* Section badge */}
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] uppercase tracking-wider font-semibold mb-2 border",
                getSectionColor(aphorism.section),
              )}
            >
              {aphorism.section}
            </Badge>

            {/* Authentic text — italic, slightly indented, signals authenticity */}
            <blockquote
              className="text-base leading-[1.8] text-foreground/90 italic font-body pl-1"
              data-ocid={`organon.authentic_text.${num}`}
            >
              <span className="not-italic text-primary font-semibold mr-1">
                §{num}.
              </span>
              {aphorism.authenticText}
            </blockquote>

            {/* Key themes */}
            {aphorism.keyThemes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {aphorism.keyThemes.map((t) => (
                  <ThemeChip key={t} theme={t} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Commentary */}
        {aphorism.commentary && (
          <div
            className="ml-14 rounded-xl bg-muted/60 border border-border/70 p-4"
            data-ocid={`organon.commentary.${num}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <MessageSquareText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                Student Commentary
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 font-body">
              {aphorism.commentary}
            </p>
          </div>
        )}
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-6" />
    </motion.article>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function OrganonSkeleton() {
  return (
    <div className="flex flex-col" data-ocid="organon.loading_state">
      {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
        <div key={k} className="pl-6 pr-4 py-5 border-b border-border/40">
          <div className="flex items-start gap-3 mb-4">
            <Skeleton className="w-12 h-10 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="ml-14">
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-4 text-center"
      data-ocid="organon.empty_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-2">
        <BookOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-display-md text-foreground font-display">
        {searchTerm ? "No aphorisms found" : "Organon text coming soon"}
      </h3>
      <p className="text-body-sm text-muted-foreground max-w-xs">
        {searchTerm
          ? `No aphorisms match "${searchTerm}". Try different keywords.`
          : "The full Organon of Medicine will appear here once seeded."}
      </p>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function OrgononPage() {
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("All");

  const { isAuthenticated } = useAuth();
  const { mutate: seedOrganon } = useSeedOrganon();

  const isSearching = search.trim().length > 2;
  const { data: allAphorisms = [], isLoading: loadingAll } = useAphorisms();
  const { data: searchResults = [], isLoading: loadingSearch } =
    useSearchAphorisms(search.trim());

  // Seed only when authenticated and no aphorisms loaded yet
  useEffect(() => {
    if (isAuthenticated && allAphorisms.length === 0) seedOrganon();
  }, [isAuthenticated, allAphorisms.length, seedOrganon]);

  const isLoading = isSearching ? loadingSearch : loadingAll;

  const displayed = useMemo(() => {
    const base = isSearching ? searchResults : allAphorisms;
    if (sectionFilter === "All") return base;
    return base.filter((a) => a.section === sectionFilter);
  }, [isSearching, searchResults, allAphorisms, sectionFilter]);

  const totalCount = allAphorisms.length;

  return (
    <div className="min-h-screen bg-background" data-ocid="organon.page">
      {/* ── Page header band ── */}
      <div className="bg-card border-b border-border shadow-medical-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-7 sm:py-9">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-medical-sm">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h1
                className="text-display-xl text-foreground font-display"
                data-ocid="organon.title"
              >
                Organon of Medicine
              </h1>
            </div>
            <p className="text-body-sm text-muted-foreground ml-14">
              Samuel Hahnemann's Organon of Medicine — 6th Edition · Full
              authentic text with student commentary
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="relative mt-5 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search aphorisms, themes, concepts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-10 bg-background border-input"
              data-ocid="organon.search_input"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                  data-ocid="organon.search_clear.button"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Section pill filters */}
          <div
            className="flex flex-wrap gap-2 mt-4"
            data-ocid="organon.section_filters"
          >
            {SECTIONS.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSectionFilter(sec)}
                className={cn(
                  "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-medium border transition-smooth cursor-pointer",
                  sectionFilter === sec
                    ? "bg-primary text-primary-foreground border-primary shadow-medical-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                )}
                data-ocid={`organon.filter.${sec.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-8">
        {/* Result meta */}
        {!isLoading && displayed.length > 0 && (
          <p className="text-body-sm text-muted-foreground mb-4">
            {isSearching ? (
              <>
                {displayed.length} result{displayed.length !== 1 ? "s" : ""} for
                &ldquo;{search.trim()}&rdquo;
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {displayed.length}
                </span>{" "}
                aphorism{displayed.length !== 1 ? "s" : ""}
                {sectionFilter !== "All" && ` in ${sectionFilter}`}
              </>
            )}
          </p>
        )}

        {/* Content */}
        {isLoading ? (
          <OrganonSkeleton />
        ) : displayed.length === 0 ? (
          <EmptyState searchTerm={search.trim()} />
        ) : (
          <motion.div
            key={`${sectionFilter}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden"
            data-ocid="organon.aphorism_list"
          >
            {displayed.map((a, i) => (
              <AphorismCard key={String(a.id)} aphorism={a} index={i} />
            ))}

            {/* "More coming soon" notice — shown when viewing all / section filters */}
            {!isSearching && (
              <div
                className="flex flex-col items-center gap-2 py-8 px-6 bg-muted/30"
                data-ocid="organon.more_notice"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Showing §1–§{totalCount} of 291 aphorisms
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center max-w-sm">
                  The remaining aphorisms (§{totalCount + 1}–§291) are being
                  prepared and will be added soon. Check back for the complete
                  Organon of Medicine.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
