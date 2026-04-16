import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Principal } from "@icp-sdk/core/principal";
import {
  BookOpen,
  FlaskConical,
  Leaf,
  Pencil,
  Plus,
  ShieldCheck,
  ShieldX,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  Aphorism,
  AphorismInput,
  MateriaSource,
  RepertoryEntry,
  RepertoryEntryInput,
  SourcedRemedy,
  SourcedRemedyInput,
} from "../backend.d";
import {
  useAdminAphorisms,
  useAdminBulkImportAphorisms,
  useAdminBulkImportRepertoryEntries,
  useAdminBulkImportSourcedRemedies,
  useAdminDeleteAphorism,
  useAdminDeleteRepertoryEntry,
  useAdminDeleteSourcedRemedy,
  useAdminList,
  useAdminRepertoryEntries,
  useAdminSourcedRemedies,
  useAdminUpsertAphorism,
  useAdminUpsertRepertoryEntry,
  useAdminUpsertSourcedRemedy,
  useBootstrapAdmin,
  useGrantAdmin,
  useIsAdmin,
  useRevokeAdmin,
} from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function csvToArray(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function arrayToCsv(arr: string[]): string {
  return arr.join(", ");
}

// ─── Bulk Import Panel ────────────────────────────────────────────────────────

function BulkImportPanel<T>({
  label,
  onImport,
  isPending,
}: {
  label: string;
  onImport: (data: T[]) => void;
  isPending: boolean;
}) {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleImport() {
    setError(null);
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
      onImport(parsed as T[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setRaw((ev.target?.result as string) ?? "");
    reader.readAsText(file);
  }

  return (
    <Card className="border-border bg-muted/30">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          Bulk Import — {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".json"
            onChange={handleFile}
            className="text-sm"
            data-ocid="admin.bulk_import.upload_button"
          />
        </div>
        <Textarea
          placeholder="Or paste JSON array here…"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={5}
          className="font-mono text-xs"
          data-ocid="admin.bulk_import.textarea"
        />
        {error && (
          <p
            className="text-destructive text-xs"
            data-ocid="admin.bulk_import.error_state"
          >
            {error}
          </p>
        )}
        <Button
          size="sm"
          onClick={handleImport}
          disabled={!raw.trim() || isPending}
          data-ocid="admin.bulk_import.submit_button"
        >
          {isPending ? "Importing…" : "Import JSON"}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Materia Medica Tab ───────────────────────────────────────────────────────

const emptyRemedy = (): Partial<SourcedRemedyInput> => ({
  name: "",
  latinName: "",
  remedyId: "",
  source: "boericke" as MateriaSource,
  keynotes: [],
  mentalSymptoms: [],
  physicalSymptoms: [],
  modalities: { worse: [], better: [] },
  clinicalUses: [],
  constitution: "",
});

function MateriaMedicaTab() {
  const { data: remedies = [], isLoading } = useAdminSourcedRemedies();
  const upsert = useAdminUpsertSourcedRemedy();
  const del = useAdminDeleteSourcedRemedy();
  const bulk = useAdminBulkImportSourcedRemedies();

  const [editing, setEditing] = useState<Partial<SourcedRemedyInput> | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);

  function openNew() {
    setEditing(emptyRemedy());
    setShowForm(true);
  }

  function openEdit(r: SourcedRemedy) {
    setEditing({
      id: r.id,
      name: r.name,
      latinName: r.latinName,
      remedyId: r.remedyId,
      source: r.source,
      keynotes: r.keynotes,
      mentalSymptoms: r.mentalSymptoms,
      physicalSymptoms: r.physicalSymptoms,
      modalities: r.modalities,
      clinicalUses: r.clinicalUses,
      constitution: r.constitution,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!editing) return;
    const input = editing as SourcedRemedyInput;
    await upsert.mutateAsync(input);
    toast.success("Remedy saved");
    setShowForm(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    await del.mutateAsync(id);
    toast.success("Remedy deleted");
  }

  async function handleBulk(data: SourcedRemedyInput[]) {
    const count = await bulk.mutateAsync(data);
    toast.success(`${Number(count)} remedies imported`);
  }

  const setField = <K extends keyof SourcedRemedyInput>(
    key: K,
    val: SourcedRemedyInput[K],
  ) => setEditing((prev) => (prev ? { ...prev, [key]: val } : prev));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-display-md text-foreground">Materia Medica</h2>
        <Button onClick={openNew} size="sm" data-ocid="admin.remedy.add_button">
          <Plus className="w-4 h-4 mr-1" /> Add Remedy
        </Button>
      </div>

      {showForm && editing && (
        <Card className="border-primary/30 bg-card shadow-medical-md">
          <CardHeader>
            <CardTitle className="text-foreground">
              {editing.id ? "Edit Remedy" : "New Remedy"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input
                value={editing.name ?? ""}
                onChange={(e) => setField("name", e.target.value)}
                data-ocid="admin.remedy.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Latin Name</Label>
              <Input
                value={editing.latinName ?? ""}
                onChange={(e) => setField("latinName", e.target.value)}
                data-ocid="admin.remedy.latin_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Remedy ID</Label>
              <Input
                value={editing.remedyId ?? ""}
                onChange={(e) => setField("remedyId", e.target.value)}
                data-ocid="admin.remedy.remedyid_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Source</Label>
              <Select
                value={editing.source ?? "boericke"}
                onValueChange={(v) => setField("source", v as MateriaSource)}
              >
                <SelectTrigger data-ocid="admin.remedy.source_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boericke">Boericke</SelectItem>
                  <SelectItem value="allensKeynotes">
                    Allen's Keynotes
                  </SelectItem>
                  <SelectItem value="lotus">Lotus Materia Medica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Keynotes (comma-separated)</Label>
              <Textarea
                value={arrayToCsv(editing.keynotes ?? [])}
                onChange={(e) =>
                  setField("keynotes", csvToArray(e.target.value))
                }
                rows={2}
                data-ocid="admin.remedy.keynotes_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Mental Symptoms (comma-separated)</Label>
              <Textarea
                value={arrayToCsv(editing.mentalSymptoms ?? [])}
                onChange={(e) =>
                  setField("mentalSymptoms", csvToArray(e.target.value))
                }
                rows={2}
                data-ocid="admin.remedy.mental_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Physical Symptoms (comma-separated)</Label>
              <Textarea
                value={arrayToCsv(editing.physicalSymptoms ?? [])}
                onChange={(e) =>
                  setField("physicalSymptoms", csvToArray(e.target.value))
                }
                rows={2}
                data-ocid="admin.remedy.physical_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Modalities — Worse (comma-separated)</Label>
              <Input
                value={arrayToCsv(editing.modalities?.worse ?? [])}
                onChange={(e) =>
                  setField("modalities", {
                    ...(editing.modalities ?? { better: [] }),
                    worse: csvToArray(e.target.value),
                  })
                }
                data-ocid="admin.remedy.worse_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Modalities — Better (comma-separated)</Label>
              <Input
                value={arrayToCsv(editing.modalities?.better ?? [])}
                onChange={(e) =>
                  setField("modalities", {
                    ...(editing.modalities ?? { worse: [] }),
                    better: csvToArray(e.target.value),
                  })
                }
                data-ocid="admin.remedy.better_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Clinical Uses (comma-separated)</Label>
              <Input
                value={arrayToCsv(editing.clinicalUses ?? [])}
                onChange={(e) =>
                  setField("clinicalUses", csvToArray(e.target.value))
                }
                data-ocid="admin.remedy.clinical_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Constitution</Label>
              <Input
                value={editing.constitution ?? ""}
                onChange={(e) => setField("constitution", e.target.value)}
                data-ocid="admin.remedy.constitution_input"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={upsert.isPending}
                data-ocid="admin.remedy.save_button"
              >
                {upsert.isPending ? "Saving…" : "Save Remedy"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                data-ocid="admin.remedy.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.remedy.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : remedies.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.remedy.empty_state"
        >
          No remedies yet — add one or bulk import.
        </div>
      ) : (
        <div
          className="rounded-lg border border-border overflow-hidden"
          data-ocid="admin.remedy.table"
        >
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">
                  Latin
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden lg:table-cell">
                  Source
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {remedies.map((r, idx) => (
                <tr
                  key={r.id}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                  data-ocid={`admin.remedy.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell italic">
                    {r.latinName}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {r.source === "allensKeynotes" ? "Allen's" : r.source}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(r)}
                        aria-label="Edit"
                        data-ocid={`admin.remedy.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(r.id)}
                        aria-label="Delete"
                        data-ocid={`admin.remedy.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BulkImportPanel<SourcedRemedyInput>
        label="Sourced Remedies"
        onImport={handleBulk}
        isPending={bulk.isPending}
      />
    </div>
  );
}

// ─── Organon Tab ──────────────────────────────────────────────────────────────

const emptyAphorism = (): Partial<AphorismInput> => ({
  number: BigInt(0),
  section: "",
  authenticText: "",
  commentary: "",
  keyThemes: [],
});

function OrganonTab() {
  const { data: aphorisms = [], isLoading } = useAdminAphorisms();
  const upsert = useAdminUpsertAphorism();
  const del = useAdminDeleteAphorism();
  const bulk = useAdminBulkImportAphorisms();

  const [editing, setEditing] = useState<Partial<AphorismInput> | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openEdit(a: Aphorism) {
    setEditing({
      id: a.id,
      number: a.number,
      section: a.section,
      authenticText: a.authenticText,
      commentary: a.commentary,
      keyThemes: a.keyThemes,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!editing) return;
    await upsert.mutateAsync(editing as AphorismInput);
    toast.success("Aphorism saved");
    setShowForm(false);
    setEditing(null);
  }

  async function handleDelete(id: bigint) {
    await del.mutateAsync(id);
    toast.success("Aphorism deleted");
  }

  async function handleBulk(data: AphorismInput[]) {
    const count = await bulk.mutateAsync(data);
    toast.success(`${Number(count)} aphorisms imported`);
  }

  const setField = <K extends keyof AphorismInput>(k: K, v: AphorismInput[K]) =>
    setEditing((prev) => (prev ? { ...prev, [k]: v } : prev));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-display-md text-foreground">Organon</h2>
        <Button
          onClick={() => {
            setEditing(emptyAphorism());
            setShowForm(true);
          }}
          size="sm"
          data-ocid="admin.organon.add_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Aphorism
        </Button>
      </div>

      {showForm && editing && (
        <Card className="border-primary/30 bg-card shadow-medical-md">
          <CardHeader>
            <CardTitle className="text-foreground">
              {editing.id ? "Edit Aphorism" : "New Aphorism"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Aphorism Number *</Label>
              <Input
                type="number"
                value={Number(editing.number ?? 0)}
                onChange={(e) =>
                  setField("number", BigInt(e.target.value || 0))
                }
                data-ocid="admin.organon.number_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Section</Label>
              <Input
                value={editing.section ?? ""}
                onChange={(e) => setField("section", e.target.value)}
                data-ocid="admin.organon.section_input"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Authentic Text *</Label>
              <Textarea
                value={editing.authenticText ?? ""}
                onChange={(e) => setField("authenticText", e.target.value)}
                rows={5}
                data-ocid="admin.organon.authentic_input"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Commentary</Label>
              <Textarea
                value={editing.commentary ?? ""}
                onChange={(e) => setField("commentary", e.target.value)}
                rows={4}
                data-ocid="admin.organon.commentary_input"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Key Themes (comma-separated)</Label>
              <Input
                value={arrayToCsv(editing.keyThemes ?? [])}
                onChange={(e) =>
                  setField("keyThemes", csvToArray(e.target.value))
                }
                data-ocid="admin.organon.themes_input"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={upsert.isPending}
                data-ocid="admin.organon.save_button"
              >
                {upsert.isPending ? "Saving…" : "Save Aphorism"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                data-ocid="admin.organon.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.organon.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : aphorisms.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.organon.empty_state"
        >
          No aphorisms yet — add one or bulk import.
        </div>
      ) : (
        <div
          className="rounded-lg border border-border overflow-hidden"
          data-ocid="admin.organon.table"
        >
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground w-16">
                  §
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Section
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">
                  Preview
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {aphorisms.map((a, idx) => (
                <tr
                  key={String(a.id)}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                  data-ocid={`admin.organon.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-bold text-primary">
                    {String(a.number)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {a.section || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-xs">
                    {a.authenticText.slice(0, 80)}…
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(a)}
                        aria-label="Edit"
                        data-ocid={`admin.organon.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(a.id)}
                        aria-label="Delete"
                        data-ocid={`admin.organon.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BulkImportPanel<AphorismInput>
        label="Aphorisms"
        onImport={handleBulk}
        isPending={bulk.isPending}
      />
    </div>
  );
}

// ─── Repertory Tab ────────────────────────────────────────────────────────────

type RemedyRow = {
  remedyId: string;
  remedyName: string;
  grade: bigint;
  notes: string;
};

const emptyEntry = (): Partial<RepertoryEntryInput> => ({
  symptomCategory: "",
  symptomName: "",
  description: "",
  remedies: [],
});

function RepertoryTab() {
  const { data: entries = [], isLoading } = useAdminRepertoryEntries();
  const upsert = useAdminUpsertRepertoryEntry();
  const del = useAdminDeleteRepertoryEntry();
  const bulk = useAdminBulkImportRepertoryEntries();

  const [editing, setEditing] = useState<Partial<RepertoryEntryInput> | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const keyCounter = { n: 0 };
  const [remedyRows, setRemedyRows] = useState<(RemedyRow & { _rk: string })[]>(
    [],
  );

  function openEdit(e: RepertoryEntry) {
    setEditing({
      id: e.id,
      symptomCategory: e.symptomCategory,
      symptomName: e.symptomName,
      description: e.description,
      remedies: e.remedies,
    });
    setRemedyRows(
      e.remedies.map((r, i) => ({
        remedyId: r.remedyId,
        remedyName: r.remedyName,
        grade: r.grade,
        notes: r.notes,
        _rk: `e-${i}`,
      })),
    );
    setShowForm(true);
  }

  function openNew() {
    setEditing(emptyEntry());
    setRemedyRows([]);
    setShowForm(true);
  }

  function addRow() {
    keyCounter.n += 1;
    const rk = `n-${Date.now()}-${keyCounter.n}`;
    setRemedyRows((r) => [
      ...r,
      { remedyId: "", remedyName: "", grade: BigInt(1), notes: "", _rk: rk },
    ]);
  }

  function updateRow(
    rk: string,
    field: keyof RemedyRow,
    value: string | bigint,
  ) {
    setRemedyRows((rows) =>
      rows.map((r) => (r._rk === rk ? { ...r, [field]: value } : r)),
    );
  }

  function removeRow(rk: string) {
    setRemedyRows((rows) => rows.filter((r) => r._rk !== rk));
  }

  async function handleSave() {
    if (!editing) return;
    const input: RepertoryEntryInput = {
      ...(editing as RepertoryEntryInput),
      remedies: remedyRows.map(({ _rk: _dropped, ...r }) => r),
    };
    await upsert.mutateAsync(input);
    toast.success("Entry saved");
    setShowForm(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    await del.mutateAsync(id);
    toast.success("Entry deleted");
  }

  async function handleBulk(data: RepertoryEntryInput[]) {
    const count = await bulk.mutateAsync(data);
    toast.success(`${Number(count)} entries imported`);
  }

  const setField = <K extends keyof RepertoryEntryInput>(
    k: K,
    v: RepertoryEntryInput[K],
  ) => setEditing((prev) => (prev ? { ...prev, [k]: v } : prev));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-display-md text-foreground">Repertory</h2>
        <Button
          onClick={openNew}
          size="sm"
          data-ocid="admin.repertory.add_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Entry
        </Button>
      </div>

      {showForm && editing && (
        <Card className="border-primary/30 bg-card shadow-medical-md">
          <CardHeader>
            <CardTitle className="text-foreground">
              {editing.id ? "Edit Entry" : "New Entry"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Symptom Category *</Label>
                <Input
                  value={editing.symptomCategory ?? ""}
                  onChange={(e) => setField("symptomCategory", e.target.value)}
                  data-ocid="admin.repertory.category_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Symptom Name *</Label>
                <Input
                  value={editing.symptomName ?? ""}
                  onChange={(e) => setField("symptomName", e.target.value)}
                  data-ocid="admin.repertory.symptom_input"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={editing.description ?? ""}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={2}
                  data-ocid="admin.repertory.description_input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Remedies</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addRow}
                  data-ocid="admin.repertory.add_remedy_button"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Remedy
                </Button>
              </div>
              {remedyRows.length > 0 && (
                <div
                  className="rounded-lg border border-border overflow-hidden"
                  data-ocid="admin.repertory.remedies_table"
                >
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-3 py-2 font-semibold">
                          Remedy Name
                        </th>
                        <th className="text-left px-3 py-2 font-semibold w-24">
                          Grade
                        </th>
                        <th className="text-left px-3 py-2 font-semibold">
                          Notes
                        </th>
                        <th className="px-3 py-2 w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {remedyRows.map((row, idx) => (
                        <tr
                          key={row._rk}
                          className="border-t border-border"
                          data-ocid={`admin.repertory.remedy_row.${idx + 1}`}
                        >
                          <td className="px-3 py-2">
                            <Input
                              value={row.remedyName}
                              onChange={(e) =>
                                updateRow(row._rk, "remedyName", e.target.value)
                              }
                              className="h-7 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Select
                              value={String(row.grade)}
                              onValueChange={(v) =>
                                updateRow(row._rk, "grade", BigInt(v))
                              }
                            >
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 — Plain</SelectItem>
                                <SelectItem value="2">2 — Italic</SelectItem>
                                <SelectItem value="3">3 — Bold</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-3 py-2">
                            <Input
                              value={row.notes}
                              onChange={(e) =>
                                updateRow(row._rk, "notes", e.target.value)
                              }
                              className="h-7 text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-destructive"
                              onClick={() => removeRow(row._rk)}
                              aria-label="Delete"
                              data-ocid={`admin.repertory.remove_remedy.${idx + 1}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={upsert.isPending}
                data-ocid="admin.repertory.save_button"
              >
                {upsert.isPending ? "Saving…" : "Save Entry"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                data-ocid="admin.repertory.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2" data-ocid="admin.repertory.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.repertory.empty_state"
        >
          No repertory entries yet — add one or bulk import.
        </div>
      ) : (
        <div
          className="rounded-lg border border-border overflow-hidden"
          data-ocid="admin.repertory.table"
        >
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Symptom
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground w-24">
                  Remedies
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, idx) => (
                <tr
                  key={e.id}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                  data-ocid={`admin.repertory.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 text-muted-foreground capitalize">
                    {e.symptomCategory}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {e.symptomName}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-primary font-semibold">
                    {e.remedies.length}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(e)}
                        aria-label="Edit"
                        data-ocid={`admin.repertory.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(e.id)}
                        aria-label="Delete"
                        data-ocid={`admin.repertory.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BulkImportPanel<RepertoryEntryInput>
        label="Repertory Entries"
        onImport={handleBulk}
        isPending={bulk.isPending}
      />
    </div>
  );
}

// ─── Admin Management Tab ─────────────────────────────────────────────────────

function AdminManagementTab({
  currentPrincipal,
}: { currentPrincipal: string }) {
  const { data: admins = [], isLoading } = useAdminList();
  const grant = useGrantAdmin();
  const revoke = useRevokeAdmin();
  const [newPrincipal, setNewPrincipal] = useState("");

  const masterAdmin = admins[0];
  const isMaster = masterAdmin?.toText() === currentPrincipal;

  async function handleGrant() {
    if (!newPrincipal.trim()) return;
    try {
      const p = Principal.fromText(newPrincipal.trim());
      const ok = await grant.mutateAsync(p);
      if (ok) {
        toast.success("Admin access granted");
        setNewPrincipal("");
      } else
        toast.error(
          "Could not grant admin — only the master admin can do this",
        );
    } catch {
      toast.error("Invalid principal format");
    }
  }

  async function handleRevoke(p: Principal) {
    const ok = await revoke.mutateAsync(p);
    if (ok) toast.success("Admin access revoked");
    else toast.error("Could not revoke — master admin cannot be revoked");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-display-md text-foreground">Admin Management</h2>
        {isMaster && (
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <ShieldCheck className="w-3 h-3 mr-1" /> Master Admin
          </Badge>
        )}
      </div>

      {!isMaster && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="py-4 flex items-center gap-3 text-sm text-amber-600 dark:text-amber-400">
            <ShieldX className="w-4 h-4 shrink-0" />
            You are an admin but not the master admin. Only the master admin can
            grant or revoke access.
          </CardContent>
        </Card>
      )}

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Current Admins
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div
              className="space-y-2"
              data-ocid="admin.management.loading_state"
            >
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : admins.length === 0 ? (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="admin.management.empty_state"
            >
              No admins listed.
            </p>
          ) : (
            <ul className="space-y-2" data-ocid="admin.management.list">
              {admins.map((a, idx) => (
                <li
                  key={a.toText()}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                  data-ocid={`admin.management.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {idx === 0 && (
                      <Badge className="shrink-0 text-xs bg-primary/20 text-primary border-primary/30">
                        Master
                      </Badge>
                    )}
                    <span className="font-mono text-xs text-muted-foreground truncate">
                      {a.toText()}
                    </span>
                    {a.toText() === currentPrincipal && (
                      <Badge variant="outline" className="shrink-0 text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  {isMaster && idx !== 0 && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRevoke(a)}
                      disabled={revoke.isPending}
                      data-ocid={`admin.management.revoke_button.${idx + 1}`}
                    >
                      Revoke
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {isMaster && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground">
              Grant Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Principal text (e.g. xxxxx-xxxxx-…)"
              value={newPrincipal}
              onChange={(e) => setNewPrincipal(e.target.value)}
              className="font-mono text-xs"
              data-ocid="admin.management.principal_input"
            />
            <Button
              onClick={handleGrant}
              disabled={!newPrincipal.trim() || grant.isPending}
              data-ocid="admin.management.grant_button"
            >
              {grant.isPending ? "Granting…" : "Grant"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const {
    isAuthenticated,
    principal,
    login,
    isLoading: authLoading,
  } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const bootstrap = useBootstrapAdmin();

  async function handleBootstrap() {
    const ok = await bootstrap.mutateAsync();
    if (ok) toast.success("You are now the master admin!");
    else
      toast.error(
        "Admin already bootstrapped — contact the master admin for access.",
      );
  }

  if (authLoading || adminLoading) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="admin.loading_state"
      >
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-16 flex flex-col items-center gap-6"
        data-ocid="admin.login_prompt"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-display-md text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">
            Sign in with Internet Identity to continue.
          </p>
        </div>
        <Button size="lg" onClick={login} data-ocid="admin.login_button">
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="container mx-auto px-4 py-16 flex flex-col items-center gap-6"
        data-ocid="admin.access_denied"
      >
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <div className="text-center space-y-2 max-w-md">
          <h1 className="text-display-md text-foreground">Access Denied</h1>
          <p className="text-muted-foreground text-sm">
            Your account does not have admin privileges. If you are the first
            user, you can bootstrap yourself as master admin.
          </p>
        </div>
        <div className="space-y-3 w-full max-w-sm">
          <Card
            className="border-border bg-muted/30 p-4 text-xs font-mono text-muted-foreground break-all"
            data-ocid="admin.current_principal"
          >
            Your principal: {principal ?? "—"}
          </Card>
          <Button
            variant="outline"
            className="w-full border-primary/40 text-primary hover:bg-primary/10"
            onClick={handleBootstrap}
            disabled={bootstrap.isPending}
            data-ocid="admin.bootstrap_button"
          >
            {bootstrap.isPending
              ? "Bootstrapping…"
              : "Bootstrap as Master Admin"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 space-y-6"
      data-ocid="admin.page"
    >
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-display-md text-foreground">Admin Panel</h1>
          <p className="text-xs text-muted-foreground font-mono truncate max-w-xs">
            {principal}
          </p>
        </div>
      </div>

      <Tabs defaultValue="materia" className="space-y-6" data-ocid="admin.tabs">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto bg-muted/50 h-auto p-1 gap-1">
          <TabsTrigger
            value="materia"
            className="flex items-center gap-2 py-2 data-[state=active]:bg-card"
            data-ocid="admin.tab.materia"
          >
            <Leaf className="w-4 h-4" /> Materia Medica
          </TabsTrigger>
          <TabsTrigger
            value="organon"
            className="flex items-center gap-2 py-2 data-[state=active]:bg-card"
            data-ocid="admin.tab.organon"
          >
            <BookOpen className="w-4 h-4" /> Organon
          </TabsTrigger>
          <TabsTrigger
            value="repertory"
            className="flex items-center gap-2 py-2 data-[state=active]:bg-card"
            data-ocid="admin.tab.repertory"
          >
            <FlaskConical className="w-4 h-4" /> Repertory
          </TabsTrigger>
          <TabsTrigger
            value="management"
            className="flex items-center gap-2 py-2 data-[state=active]:bg-card"
            data-ocid="admin.tab.management"
          >
            <Users className="w-4 h-4" /> Admins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materia">
          <MateriaMedicaTab />
        </TabsContent>
        <TabsContent value="organon">
          <OrganonTab />
        </TabsContent>
        <TabsContent value="repertory">
          <RepertoryTab />
        </TabsContent>
        <TabsContent value="management">
          <AdminManagementTab currentPrincipal={principal ?? ""} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
