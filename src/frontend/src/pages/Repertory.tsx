import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  FolderOpen,
  Lock,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { RepertoryEntry, RepertoryRemedy } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import {
  useDeleteCase,
  useMyCases,
  useSaveCase,
  useSearchCases,
  useUpdateCase,
} from "../hooks/useCase";
import {
  useRepertoryEntries,
  useSearchRepertory,
  useSeedRepertory,
} from "../hooks/useRepertory";
import type { SavedCase } from "../types";

// ─── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Mind",
  "Head",
  "Fever",
  "Stomach",
  "Respiratory",
  "Extremities",
  "Skin",
  "Back",
  "Sleep",
  "Eyes",
  "Throat",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Mind: "bg-accent/15 text-accent border-accent/30",
  Head: "bg-primary/15 text-primary border-primary/30",
  Fever: "bg-destructive/10 text-destructive border-destructive/20",
  Stomach: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  Respiratory: "bg-chart-5/15 text-chart-5 border-chart-5/30",
  Extremities: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Skin: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  Back: "bg-muted text-muted-foreground border-border",
  Sleep: "bg-primary/10 text-primary border-primary/20",
  Eyes: "bg-accent/10 text-accent/80 border-accent/20",
  Throat: "bg-destructive/15 text-destructive/80 border-destructive/25",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  try {
    const ms = Number(ts) / 1_000_000;
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(ms));
  } catch {
    return "—";
  }
}

// ─── Grade Components ───────────────────────────────────────────────────────

function GradeIndicator({ grade }: { grade: bigint }) {
  const g = Number(grade);
  const label = g === 3 ? "Keynote" : g === 2 ? "Notable" : "Minor";
  const colorClass =
    g === 3
      ? "text-primary"
      : g === 2
        ? "text-muted-foreground"
        : "text-muted-foreground/60";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        colorClass,
      )}
    >
      <span className="flex gap-0.5">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={cn(
              "inline-block w-2 h-2 rounded-full border",
              dot <= g
                ? "bg-current border-current"
                : "border-current opacity-25",
            )}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </span>
  );
}

// ─── Remedy Row ─────────────────────────────────────────────────────────────

function RemedyRow({
  remedy,
  index,
}: {
  remedy: RepertoryRemedy;
  index: number;
}) {
  const grade = Number(remedy.grade);
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-smooth",
        grade === 3
          ? "bg-primary/5 border-primary/20 hover:bg-primary/8"
          : grade === 2
            ? "bg-muted/40 border-border hover:bg-muted/60"
            : "bg-background border-border/40 hover:bg-muted/20",
      )}
      data-ocid={`repertory.remedy.${index + 1}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "font-medium text-sm",
              grade === 3 ? "text-foreground" : "text-foreground/80",
            )}
          >
            {remedy.remedyName}
          </span>
          <GradeIndicator grade={remedy.grade} />
        </div>
        {remedy.notes && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {remedy.notes}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Symptom Card (Accordion) ───────────────────────────────────────────────

function SymptomCard({
  entry,
  index,
  defaultOpen = false,
}: {
  entry: RepertoryEntry;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const sortedRemedies = useMemo(
    () => [...entry.remedies].sort((a, b) => Number(b.grade) - Number(a.grade)),
    [entry.remedies],
  );
  const catColor =
    CATEGORY_COLORS[entry.symptomCategory] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden"
      data-ocid={`repertory.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/20 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        aria-expanded={open}
        data-ocid={`repertory.toggle.${index + 1}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={cn(
                "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                catColor,
              )}
            >
              {entry.symptomCategory}
            </span>
            <span className="text-xs text-muted-foreground">
              {entry.remedies.length}{" "}
              {entry.remedies.length === 1 ? "remedy" : "remedies"}
            </span>
          </div>
          <h3 className="font-display font-semibold text-base text-foreground leading-snug">
            {entry.symptomName}
          </h3>
          {entry.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
              {entry.description}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 border-t border-border/60">
              <div className="flex items-center gap-4 pt-3 pb-3 flex-wrap">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Importance:
                </span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <GradeIndicator grade={BigInt(3)} />
                  <GradeIndicator grade={BigInt(2)} />
                  <GradeIndicator grade={BigInt(1)} />
                </div>
              </div>
              <div className="grid gap-2">
                {sortedRemedies.map((remedy, ri) => (
                  <RemedyRow
                    key={`${remedy.remedyId}-${ri}`}
                    remedy={remedy}
                    index={ri}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Category Section ───────────────────────────────────────────────────────

function CategorySection({
  category,
  entries,
  startIndex,
}: {
  category: string;
  entries: RepertoryEntry[];
  startIndex: number;
}) {
  return (
    <section data-ocid={`repertory.section.${category.toLowerCase()}`}>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-display-md text-foreground font-display">
          {category}
        </h2>
        <span className="text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
          {entries.length}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid gap-3">
        {entries.map((entry, i) => (
          <SymptomCard key={entry.id} entry={entry} index={startIndex + i} />
        ))}
      </div>
    </section>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────

function RepertorySkeleton() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={`skeleton-rep-${i + 1}`}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-64 mb-1.5" />
          <Skeleton className="h-3 w-full max-w-md" />
        </div>
      ))}
    </div>
  );
}

// ─── Save Case Modal ─────────────────────────────────────────────────────────

function SaveCaseModal({
  open,
  onClose,
  selectedSymptoms,
  matchingRemedies,
}: {
  open: boolean;
  onClose: () => void;
  selectedSymptoms: string[];
  matchingRemedies: string[];
}) {
  const [caseName, setCaseName] = useState("");
  const [notes, setNotes] = useState("");
  const { mutate: saveCase, isPending } = useSaveCase();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caseName.trim()) return;
    saveCase(
      {
        name: caseName.trim(),
        selectedSymptoms,
        clinicalNotes: notes.trim(),
        matchingRemedies,
      },
      {
        onSuccess: () => {
          toast.success("Case saved to diary");
          setCaseName("");
          setNotes("");
          onClose();
        },
        onError: () => toast.error("Failed to save case"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="save_case.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Save Case Analysis</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="case-name">Case Name *</Label>
            <Input
              id="case-name"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              placeholder="e.g. Patient A — Acute Fever"
              required
              data-ocid="save_case.name_input"
            />
          </div>

          {/* Snapshot preview */}
          {(selectedSymptoms.length > 0 || matchingRemedies.length > 0) && (
            <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
              {selectedSymptoms.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Symptoms ({selectedSymptoms.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSymptoms.slice(0, 6).map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="text-xs py-0 px-2"
                      >
                        {s}
                      </Badge>
                    ))}
                    {selectedSymptoms.length > 6 && (
                      <Badge
                        variant="outline"
                        className="text-xs py-0 px-2 text-muted-foreground"
                      >
                        +{selectedSymptoms.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              {matchingRemedies.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Matching Remedies ({matchingRemedies.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingRemedies.slice(0, 5).map((r) => (
                      <Badge
                        key={r}
                        variant="secondary"
                        className="text-xs py-0 px-2"
                      >
                        {r}
                      </Badge>
                    ))}
                    {matchingRemedies.length > 5 && (
                      <Badge
                        variant="secondary"
                        className="text-xs py-0 px-2 text-muted-foreground"
                      >
                        +{matchingRemedies.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="case-notes">Clinical Notes</Label>
            <Textarea
              id="case-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observations, modalities, clinical context…"
              rows={4}
              data-ocid="save_case.notes_textarea"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="save_case.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!caseName.trim() || isPending}
              data-ocid="save_case.submit_button"
            >
              {isPending ? "Saving…" : "Save Case"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Case Modal ──────────────────────────────────────────────────────────

function EditCaseModal({
  open,
  onClose,
  savedCase,
}: {
  open: boolean;
  onClose: () => void;
  savedCase: SavedCase;
}) {
  const [name, setName] = useState(savedCase.name);
  const [notes, setNotes] = useState(savedCase.clinicalNotes);
  const { mutate: updateCase, isPending } = useUpdateCase();

  // Sync state when case changes
  useEffect(() => {
    setName(savedCase.name);
    setNotes(savedCase.clinicalNotes);
  }, [savedCase.name, savedCase.clinicalNotes]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    updateCase(
      { id: savedCase.id, name: name.trim(), clinicalNotes: notes.trim() },
      {
        onSuccess: () => {
          toast.success("Case updated");
          onClose();
        },
        onError: () => toast.error("Failed to update case"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="edit_case.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-case-name">Case Name *</Label>
            <Input
              id="edit-case-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="edit_case.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-case-notes">Clinical Notes</Label>
            <Textarea
              id="edit-case-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              data-ocid="edit_case.notes_textarea"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="edit_case.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isPending}
              data-ocid="edit_case.save_button"
            >
              {isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Saved Case Card ──────────────────────────────────────────────────────────

function SavedCaseCard({
  savedCase,
  index,
}: {
  savedCase: SavedCase;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { mutate: deleteCase, isPending: isDeleting } = useDeleteCase();

  function handleDelete() {
    deleteCase(savedCase.id, {
      onSuccess: () => {
        toast.success("Case deleted");
        setDeleteConfirm(false);
      },
      onError: () => toast.error("Failed to delete case"),
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        className="rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden"
        data-ocid={`case_diary.item.${index + 1}`}
      >
        {/* Header row */}
        <div className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {savedCase.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDate(savedCase.createdAt)} ·{" "}
              {savedCase.selectedSymptoms.length} symptom
              {savedCase.selectedSymptoms.length !== 1 ? "s" : ""} ·{" "}
              {savedCase.matchingRemedies.length} remed
              {savedCase.matchingRemedies.length !== 1 ? "ies" : "y"}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setEditOpen(true)}
              aria-label="Edit case"
              data-ocid={`case_diary.edit_button.${index + 1}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => setDeleteConfirm(true)}
              aria-label="Delete case"
              data-ocid={`case_diary.delete_button.${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse" : "Expand"}
              data-ocid={`case_diary.toggle.${index + 1}`}
            >
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.18 }}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Expanded detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="px-4 pb-4 border-t border-border/60 space-y-3 pt-3">
                {savedCase.selectedSymptoms.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Symptoms
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {savedCase.selectedSymptoms.map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="text-xs py-0 px-2"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {savedCase.matchingRemedies.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Matching Remedies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {savedCase.matchingRemedies.map((r) => (
                        <Badge key={r} variant="secondary" className="text-xs">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {savedCase.clinicalNotes && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Clinical Notes
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {savedCase.clinicalNotes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete confirmation */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="border-t border-destructive/20 bg-destructive/5 px-4 py-3"
            >
              <p className="text-xs text-destructive mb-2.5">
                Delete &ldquo;{savedCase.name}&rdquo;? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 text-xs"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  data-ocid={`case_diary.confirm_button.${index + 1}`}
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => setDeleteConfirm(false)}
                  data-ocid={`case_diary.cancel_button.${index + 1}`}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {editOpen && (
        <EditCaseModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          savedCase={savedCase}
        />
      )}
    </>
  );
}

// ─── Case Diary Panel ────────────────────────────────────────────────────────

function CaseDiary({
  isAuthenticated,
  currentSymptoms,
  currentRemedies,
}: {
  isAuthenticated: boolean;
  currentSymptoms: string[];
  currentRemedies: string[];
}) {
  const [visible, setVisible] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [caseSearch, setCaseSearch] = useState("");

  const { data: allCases = [], isLoading: casesLoading } = useMyCases();
  const { data: searchedCases } = useSearchCases(caseSearch);
  const displayCases =
    caseSearch.trim().length > 0 ? (searchedCases ?? []) : allCases;

  return (
    <>
      {/* Panel toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          data-ocid="case_diary.toggle"
        >
          <FolderOpen className="h-4 w-4 text-primary" />
          Case Diary
          <Badge
            variant="outline"
            className="text-xs border-border text-muted-foreground py-0"
          >
            {allCases.length}
          </Badge>
          <motion.div
            animate={{ rotate: visible ? 90 : 0 }}
            transition={{ duration: 0.18 }}
          >
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.div>
        </button>

        {isAuthenticated && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs shadow-medical-sm"
            onClick={() => setSaveOpen(true)}
            data-ocid="case_diary.save_analysis.button"
          >
            <Plus className="h-3.5 w-3.5" />
            Save Analysis
          </Button>
        )}
      </div>

      {/* Panel content */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="diary-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="rounded-xl border border-border bg-muted/20 p-4 mb-6">
              {!isAuthenticated ? (
                /* Login prompt */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-8 text-center"
                  data-ocid="case_diary.login_prompt"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="font-display font-medium text-foreground text-sm">
                    Login to use Case Diary
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Save and revisit case analyses with symptoms, clinical
                    notes, and remedy snapshots.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {/* Search saved cases */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <Input
                      value={caseSearch}
                      onChange={(e) => setCaseSearch(e.target.value)}
                      placeholder="Search saved cases…"
                      className="h-9 pl-9 pr-9 text-sm bg-background"
                      data-ocid="case_diary.search_input"
                    />
                    {caseSearch && (
                      <button
                        type="button"
                        onClick={() => setCaseSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label="Clear"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Loading */}
                  {casesLoading && (
                    <div
                      className="space-y-2"
                      data-ocid="case_diary.loading_state"
                    >
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-border bg-card p-3"
                        >
                          <Skeleton className="h-4 w-2/3 mb-1.5" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty state */}
                  {!casesLoading && displayCases.length === 0 && (
                    <div
                      className="flex flex-col items-center gap-2 py-8 text-center"
                      data-ocid="case_diary.empty_state"
                    >
                      <FileText className="h-8 w-8 text-muted-foreground/40" />
                      <p className="font-display text-sm font-medium text-foreground">
                        {caseSearch ? "No cases found" : "No cases saved yet"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {caseSearch
                          ? "Try a different search term."
                          : 'Use "Save Analysis" to record a case and its matching remedies.'}
                      </p>
                    </div>
                  )}

                  {/* Cases list */}
                  {!casesLoading && displayCases.length > 0 && (
                    <div className="space-y-2" data-ocid="case_diary.list">
                      {displayCases.map((c, i) => (
                        <SavedCaseCard key={c.id} savedCase={c} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SaveCaseModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        selectedSymptoms={currentSymptoms}
        matchingRemedies={currentRemedies}
      />
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function RepertoryPage() {
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      350,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchInput]);

  const { data: allEntries = [], isLoading: allLoading } =
    useRepertoryEntries();
  const { data: searchResults = [], isLoading: searchLoading } =
    useSearchRepertory(debouncedSearch);
  const { mutate: seedMutate } = useSeedRepertory();

  // Seed on mount if authenticated and data is empty
  useEffect(() => {
    if (isAuthenticated && !allLoading && allEntries.length === 0) {
      seedMutate();
    }
  }, [isAuthenticated, allLoading, allEntries.length, seedMutate]);

  const isSearching = debouncedSearch.length > 2;
  const isLoading = isSearching ? searchLoading : allLoading;
  const baseEntries = isSearching ? searchResults : allEntries;

  // Apply category filter
  const filteredEntries = useMemo(() => {
    if (activeCategory === "All") return baseEntries;
    return baseEntries.filter((e) => e.symptomCategory === activeCategory);
  }, [baseEntries, activeCategory]);

  // Group by category for browse view
  const grouped = useMemo(() => {
    if (isSearching || activeCategory !== "All") return null;
    const map: Record<string, RepertoryEntry[]> = {};
    for (const entry of filteredEntries) {
      const cat = entry.symptomCategory || "General";
      if (!map[cat]) map[cat] = [];
      map[cat].push(entry);
    }
    return map;
  }, [filteredEntries, isSearching, activeCategory]);

  // Cumulative start indexes for deterministic data-ocid
  const sectionStartIndexes = useMemo(() => {
    if (!grouped) return {} as Record<string, number>;
    let count = 0;
    const idx: Record<string, number> = {};
    for (const [cat, catEntries] of Object.entries(grouped)) {
      idx[cat] = count;
      count += catEntries.length;
    }
    return idx;
  }, [grouped]);

  const totalEntries = filteredEntries.length;

  // Derive symptom labels and remedy names for current view (for case saving)
  const currentSymptoms = useMemo(
    () => filteredEntries.map((e) => e.symptomName),
    [filteredEntries],
  );
  const currentRemedies = useMemo(() => {
    const names = new Set<string>();
    for (const entry of filteredEntries) {
      for (const r of entry.remedies) {
        if (Number(r.grade) >= 2) names.add(r.remedyName);
      }
    }
    return Array.from(names).slice(0, 20);
  }, [filteredEntries]);

  return (
    <div className="min-h-screen bg-background" data-ocid="repertory.page">
      {/* ── Page Header ── */}
      <div className="bg-card border-b border-border shadow-medical-sm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-4 mb-6"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-medical-sm">
              <Compass className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-display-xl text-foreground font-display leading-tight">
                Repertory
              </h1>
              <p className="text-body-base text-muted-foreground mt-0.5">
                Find remedies by symptom — classical reverse lookup
              </p>
            </div>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative max-w-xl"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search symptoms, remedies, categories…"
              className="pl-10 pr-10 h-11 bg-background border-input focus:border-primary transition-smooth"
              data-ocid="repertory.search_input"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
                data-ocid="repertory.clear_search_button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
          {searchInput.length > 0 && searchInput.length <= 2 && (
            <p className="text-xs text-muted-foreground mt-1.5 ml-0.5">
              Type at least 3 characters to search
            </p>
          )}

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="mt-4 flex gap-2 flex-wrap"
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-medical-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                )}
                data-ocid={`repertory.filter.${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ── Case Diary ── */}
        <CaseDiary
          isAuthenticated={isAuthenticated}
          currentSymptoms={currentSymptoms}
          currentRemedies={currentRemedies}
        />

        {/* Result count summary */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-6"
          >
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isSearching ? (
                <>
                  <span className="font-medium text-foreground">
                    {totalEntries}
                  </span>{" "}
                  result{totalEntries !== 1 ? "s" : ""} for{" "}
                  <span className="font-medium text-foreground italic">
                    &ldquo;{debouncedSearch}&rdquo;
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {totalEntries}
                  </span>{" "}
                  symptom{totalEntries !== 1 ? "s" : ""}
                  {activeCategory !== "All" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-medium text-foreground">
                        {activeCategory}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </motion.div>
        )}

        {/* Loading */}
        {isLoading && (
          <div data-ocid="repertory.loading_state">
            <RepertorySkeleton />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            data-ocid="repertory.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-display-md text-foreground font-display">
              {isSearching ? "No symptoms found" : "No entries yet"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {isSearching
                ? `No symptoms matching "${debouncedSearch}". Try a different term.`
                : "Repertory data will appear here once seeded."}
            </p>
            {isSearching && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                data-ocid="repertory.clear_search_button"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}

        {/* Search results — flat list */}
        {!isLoading && isSearching && filteredEntries.length > 0 && (
          <div className="grid gap-3" data-ocid="repertory.list">
            {filteredEntries.map((entry, i) => (
              <SymptomCard
                key={entry.id}
                entry={entry}
                index={i}
                defaultOpen={filteredEntries.length <= 3}
              />
            ))}
          </div>
        )}

        {/* Category filter — flat list */}
        {!isLoading && !isSearching && activeCategory !== "All" && (
          <div className="grid gap-3" data-ocid="repertory.list">
            {filteredEntries.map((entry, i) => (
              <SymptomCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}

        {/* Grouped browse view */}
        {!isLoading && !isSearching && activeCategory === "All" && grouped && (
          <div className="grid gap-10" data-ocid="repertory.list">
            {Object.entries(grouped).map(([cat, catEntries]) => (
              <CategorySection
                key={cat}
                category={cat}
                entries={catEntries}
                startIndex={sectionStartIndexes[cat] ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
