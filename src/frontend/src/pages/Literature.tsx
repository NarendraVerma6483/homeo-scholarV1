import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownAZ,
  BookOpen,
  ChevronRight,
  FlaskConical,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { MateriaSource } from "../backend.d";
import { SourcedRemedyCard } from "../components/SourcedRemedyCard";
import {
  useListRemedies,
  useSearchRemediesByName,
  useSearchRemediesBySymptom,
} from "../hooks/useRemedies";
import { useSourcedRemediesBySource } from "../hooks/useSourcedRemedies";
import type { Remedy } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────
type SearchMode = "name" | "symptom";
type SortOrder = "az" | "za" | "recent";
type SourceTab = "all" | "boericke" | "allensKeynotes" | "lotus";

// ─── Category definitions ─────────────────────────────────────────────────────
type CategoryFilter = {
  id: string;
  label: string;
  match: (r: Remedy) => boolean;
};

const CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "All Remedies", match: () => true },
  {
    id: "acute",
    label: "Acute",
    match: (r) =>
      r.keySymptomsPhysical.some((s) =>
        /sudden|fever|acute|onset|rapid|violent/i.test(s),
      ) ||
      r.clinicalIndications.some((c) =>
        /fever|inflammation|acute|infection/i.test(c),
      ),
  },
  {
    id: "constitutional",
    label: "Constitutional",
    match: (r) =>
      r.constitution.length > 30 &&
      r.keySymptomsEmotional.length >= 3 &&
      r.keySymptomsPhysical.length >= 4,
  },
  {
    id: "mental",
    label: "Mental & Emotional",
    match: (r) =>
      r.keySymptomsEmotional.some((s) =>
        /anxiety|fear|grief|anger|irritab|depress|mania|mental/i.test(s),
      ) ||
      r.clinicalIndications.some((c) => /anxiety|depression|mental/i.test(c)),
  },
  {
    id: "mineral",
    label: "Minerals",
    match: (r) => r.kingdom === "Mineral",
  },
  {
    id: "plant",
    label: "Plants",
    match: (r) => r.kingdom === "Plant",
  },
  {
    id: "animal",
    label: "Animal",
    match: (r) => r.kingdom === "Animal",
  },
];

// ─── Sort helpers ─────────────────────────────────────────────────────────────
function sortRemedies(remedies: Remedy[], order: SortOrder): Remedy[] {
  const copy = [...remedies];
  if (order === "az") return copy.sort((a, b) => a.name.localeCompare(b.name));
  if (order === "za") return copy.sort((a, b) => b.name.localeCompare(a.name));
  return copy.sort((a, b) =>
    a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0,
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────
function SkeletonGrid() {
  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      data-ocid="literature.loading_state"
    >
      {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => (
        <div
          key={k}
          className="rounded-lg border border-border bg-card p-5 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
            <div className="h-5 w-16 rounded-full bg-muted" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Legacy remedy card (for "All Sources" tab) ───────────────────────────────
function LegacyRemedyCard({
  remedy,
  index,
}: {
  remedy: Remedy;
  index: number;
}) {
  return (
    <Link
      to="/remedy/$id"
      params={{ id: remedy.id }}
      data-ocid={`remedy.item.${index}`}
      className={cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <FlaskConical className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                {remedy.name}
              </h3>
            </div>
            {remedy.commonName && (
              <p className="text-body-sm text-muted-foreground ml-6 truncate italic">
                {remedy.commonName}
              </p>
            )}
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            {remedy.kingdom}
          </Badge>
        </div>

        <ul className="mt-3 space-y-1">
          {remedy.keySymptomsPhysical.slice(0, 2).map((s) => (
            <li
              key={s}
              className="text-body-sm text-muted-foreground flex items-start gap-1.5"
            >
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
              <span className="line-clamp-1">{s}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="text-xs border-primary/20 bg-primary/8 text-primary"
          >
            Classic MM
          </Badge>
          {remedy.clinicalIndications.slice(0, 2).map((c) => (
            <Badge key={c} variant="secondary" className="text-xs">
              {c}
            </Badge>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-body-sm text-muted-foreground">
            {remedy.keySymptomsPhysical.length +
              remedy.keySymptomsEmotional.length}{" "}
            symptoms
          </p>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" />
        </div>
      </div>
    </Link>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LiteraturePage() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("name");
  const [categoryId, setCategoryId] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("az");
  const [sourceTab, setSourceTab] = useState<SourceTab>("all");

  const { data: allRemedies, isLoading: allLoading } = useListRemedies();
  const { data: nameResults, isLoading: nameLoading } = useSearchRemediesByName(
    query.length >= 2 ? query : "",
  );
  const { data: symptomResults, isLoading: symptomLoading } =
    useSearchRemediesBySymptom(
      query.length >= 2 && searchMode === "symptom" ? query : "",
    );

  const { data: boerickeRemedies, isLoading: boerickeLoading } =
    useSourcedRemediesBySource(MateriaSource.boericke);
  const { data: allensRemedies, isLoading: allensLoading } =
    useSourcedRemediesBySource(MateriaSource.allensKeynotes);
  const { data: lotusRemedies, isLoading: lotusLoading } =
    useSourcedRemediesBySource(MateriaSource.lotus);

  const searching = query.length >= 2;
  const isLegacyLoading = searching
    ? searchMode === "name"
      ? nameLoading
      : symptomLoading
    : allLoading;

  const filteredRemedies = useMemo(() => {
    let base = searching
      ? ((searchMode === "name" ? nameResults : symptomResults) ?? [])
      : (allRemedies ?? []);

    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (category && category.id !== "all") {
      base = base.filter(category.match);
    }

    return sortRemedies(base, sortOrder);
  }, [
    searching,
    searchMode,
    nameResults,
    symptomResults,
    allRemedies,
    categoryId,
    sortOrder,
  ]);

  const totalCount = allRemedies?.length ?? 0;
  const hasFilters = categoryId !== "all" || query.length > 0;

  const clearAll = () => {
    setQuery("");
    setCategoryId("all");
    setSortOrder("az");
  };

  const rawSourced =
    sourceTab === "boericke"
      ? (boerickeRemedies ?? [])
      : sourceTab === "lotus"
        ? (lotusRemedies ?? [])
        : (allensRemedies ?? []);
  const sourcedLoading =
    sourceTab === "boericke"
      ? boerickeLoading
      : sourceTab === "lotus"
        ? lotusLoading
        : allensLoading;

  const sourcedSorted = useMemo(() => {
    const copy = [...rawSourced];
    if (sortOrder === "az")
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za")
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    return copy;
  }, [rawSourced, sortOrder]);

  const displayCount =
    sourceTab === "all" ? filteredRemedies.length : sourcedSorted.length;

  return (
    <div className="min-h-full bg-background">
      {/* Page header band */}
      <div className="border-b border-border bg-card shadow-medical-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <h1
                  className="text-display-lg text-foreground"
                  data-ocid="literature.page"
                >
                  Materia Medica
                </h1>
              </div>
              <p className="text-body-sm text-muted-foreground ml-9">
                Classic remedy profiles for homœopathic study and practice
              </p>
            </div>
            {/* Remedy count pill */}
            <div
              className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1.5 self-start sm:self-auto"
              data-ocid="literature.remedy_count"
            >
              <FlaskConical className="h-3.5 w-3.5 text-primary" />
              <span className="text-body-sm font-medium text-primary">
                {isLegacyLoading || sourcedLoading ? "…" : displayCount}{" "}
                {displayCount === 1 ? "remedy" : "remedies"}
                {sourceTab === "all" &&
                  !isLegacyLoading &&
                  totalCount > 0 &&
                  filteredRemedies.length !== totalCount &&
                  ` of ${totalCount}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Source tab switcher */}
      <div className="border-b border-border bg-card/70">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div
            className="flex items-center gap-1 overflow-x-auto"
            data-ocid="literature.source_tabs"
          >
            {(
              [
                { id: "all", label: "All Sources", pill: null },
                {
                  id: "boericke",
                  label: "Boericke's MM",
                  pill: "W.Boericke",
                },
                {
                  id: "allensKeynotes",
                  label: "Allen's Keynotes",
                  pill: "H.C.Allen",
                },
                {
                  id: "lotus",
                  label: "Lotus MM",
                  pill: "P.Bailey",
                },
              ] as { id: SourceTab; label: string; pill: string | null }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSourceTab(tab.id)}
                data-ocid={`literature.source_tab.${tab.id}`}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                  "border-b-2 -mb-px",
                  sourceTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                {tab.label}
                {tab.pill && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                    {tab.pill}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-4 space-y-3">
          {/* Search row — only for "all" tab */}
          {sourceTab === "all" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={
                    searchMode === "name"
                      ? "Search by remedy name…"
                      : "Search by symptom (e.g. burning, anxiety, fever)…"
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-10 bg-background border-input"
                  data-ocid="literature.search_input"
                />
                <AnimatePresence>
                  {query && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      aria-label="Clear search"
                      data-ocid="literature.search_clear.button"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <Tabs
                value={searchMode}
                onValueChange={(v) => setSearchMode(v as SearchMode)}
              >
                <TabsList
                  className="h-10 bg-background border border-input"
                  data-ocid="literature.search_mode.tab"
                >
                  <TabsTrigger value="name" data-ocid="literature.tab.name">
                    By Name
                  </TabsTrigger>
                  <TabsTrigger
                    value="symptom"
                    data-ocid="literature.tab.symptom"
                  >
                    By Symptom
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Select
                value={sortOrder}
                onValueChange={(v) => setSortOrder(v as SortOrder)}
              >
                <SelectTrigger
                  className="w-auto min-w-[160px] bg-background border-input h-10"
                  data-ocid="literature.sort.select"
                >
                  <ArrowDownAZ className="h-3.5 w-3.5 text-muted-foreground mr-1.5 shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az" data-ocid="literature.sort.az">
                    A → Z
                  </SelectItem>
                  <SelectItem value="za" data-ocid="literature.sort.za">
                    Z → A
                  </SelectItem>
                  <SelectItem value="recent" data-ocid="literature.sort.recent">
                    Most Recently Studied
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Sort for sourced tabs */}
          {sourceTab !== "all" && (
            <div className="flex justify-end">
              <Select
                value={sortOrder}
                onValueChange={(v) => setSortOrder(v as SortOrder)}
              >
                <SelectTrigger
                  className="w-auto min-w-[140px] bg-background border-input h-9"
                  data-ocid="literature.sort.select"
                >
                  <ArrowDownAZ className="h-3.5 w-3.5 text-muted-foreground mr-1.5 shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">A → Z</SelectItem>
                  <SelectItem value="za">Z → A</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category filter pills — only for "all" tab */}
          {sourceTab === "all" && (
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium border transition-smooth cursor-pointer",
                    categoryId === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-medical-sm"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                  )}
                  data-ocid={`literature.filter.${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  data-ocid="literature.clear_filters.button"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          )}

          {/* Source description banners */}
          {sourceTab === "boericke" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3"
            >
              <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-body-sm text-foreground">
                <span className="font-semibold">Boericke's Materia Medica</span>{" "}
                — William Boericke's comprehensive remedy guide, first published
                in 1901. Known for detailed physiological and pathological
                symptom coverage.
              </p>
            </motion.div>
          )}
          {sourceTab === "allensKeynotes" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3"
            >
              <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-body-sm text-foreground">
                <span className="font-semibold">Allen's Keynotes</span> — H.C.
                Allen's celebrated keynote repertory, capturing the most
                characteristic and prescribing symptoms for each remedy.
              </p>
            </motion.div>
          )}
          {sourceTab === "lotus" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-3 flex items-start gap-3"
            >
              <BookOpen className="h-4 w-4 text-chart-2 mt-0.5 shrink-0" />
              <p className="text-body-sm text-foreground">
                <span className="font-semibold">Lotus Materia Medica</span> —
                Phillip Bailey's holistic and constitutional approach to
                homoeopathic remedy study. First published in 1995, it explores
                the deeper essence and personality of each remedy with depth,
                clarity, and psychological insight.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results area */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {sourceTab === "all" ? (
            <motion.div
              key="all-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLegacyLoading ? (
                <SkeletonGrid />
              ) : filteredRemedies.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border bg-card/40 text-center"
                  data-ocid="literature.empty_state"
                >
                  <div className="mb-4 p-3 rounded-full bg-muted border border-border">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-display-md text-foreground mb-2">
                    No remedies found
                  </h3>
                  <p className="text-body-sm text-muted-foreground max-w-xs mb-5">
                    {query
                      ? `No results matching "${query}" in this category.`
                      : "No remedies match the selected filters."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    className="border-border hover:border-primary/40"
                    data-ocid="literature.empty_state.reset.button"
                  >
                    <X className="h-3.5 w-3.5 mr-2" />
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  data-ocid="literature.list"
                >
                  {filteredRemedies.map((remedy, i) => (
                    <motion.div
                      key={remedy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(i * 0.04, 0.35),
                        duration: 0.25,
                      }}
                    >
                      <LegacyRemedyCard remedy={remedy} index={i + 1} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={sourceTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sourcedLoading ? (
                <SkeletonGrid />
              ) : sourcedSorted.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border bg-card/40 text-center"
                  data-ocid="literature.sourced_empty_state"
                >
                  <div className="mb-4 p-3 rounded-full bg-muted border border-border">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-display-md text-foreground mb-2">
                    No remedies yet
                  </h3>
                  <p className="text-body-sm text-muted-foreground max-w-xs">
                    {sourceTab === "boericke"
                      ? "Boericke's Materia Medica remedies will appear here."
                      : sourceTab === "lotus"
                        ? "Lotus Materia Medica remedies will appear here."
                        : "Allen's Keynotes remedies will appear here."}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  data-ocid="literature.sourced_list"
                >
                  {sourcedSorted.map((remedy, i) => (
                    <motion.div
                      key={remedy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(i * 0.04, 0.35),
                        duration: 0.25,
                      }}
                    >
                      <SourcedRemedyCard remedy={remedy} index={i + 1} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
