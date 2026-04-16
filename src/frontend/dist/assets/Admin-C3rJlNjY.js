import { c as createLucideIcon, k as useQueryClient, u as useAuth, j as jsxRuntimeExports, f as Skeleton, a as Button, b as BookOpen, F as FlaskConical, r as reactExports, B as Badge, E as Principal } from "./index-DkGDOaWJ.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Dk86WgDw.js";
import { I as Input } from "./input-BaWQGvME.js";
import { P as Plus, L as Label, b as Textarea, a as Pencil, T as Trash2 } from "./textarea-B3eRLeTp.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BXNVqdxR.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Cx5V8sin.js";
import { u as ue } from "./index-BV_h6fwr.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-Cse0PRbs.js";
import { u as useMutation } from "./useMutation-BEAjBEet.js";
import { L as Leaf } from "./leaf-aFb8fe7N.js";
import "./index-VQXg3RX_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
const ShieldX = createLucideIcon("shield-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function useBE() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}
function useIsAdmin() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching
  });
}
function useAdminList() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["adminList"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAdminList();
    },
    enabled: !!actor && !isFetching
  });
}
function useBootstrapAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bootstrapAdmin();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
      qc.invalidateQueries({ queryKey: ["adminList"] });
    }
  });
}
function useGrantAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.grantAdmin(principal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminList"] })
  });
}
function useRevokeAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.revokeAdmin(principal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminList"] })
  });
}
function useAdminUpsertSourcedRemedy() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertSourcedRemedy(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] })
  });
}
function useAdminDeleteSourcedRemedy() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteSourcedRemedy(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] })
  });
}
function useAdminBulkImportSourcedRemedies() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportSourcedRemedies(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] })
  });
}
function useAdminUpsertAphorism() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertAphorism(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] })
  });
}
function useAdminDeleteAphorism() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteAphorism(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] })
  });
}
function useAdminBulkImportAphorisms() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportAphorisms(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] })
  });
}
function useAdminUpsertRepertoryEntry() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertRepertoryEntry(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] })
  });
}
function useAdminDeleteRepertoryEntry() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteRepertoryEntry(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] })
  });
}
function useAdminBulkImportRepertoryEntries() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportRepertoryEntries(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] })
  });
}
function useAdminSourcedRemedies() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["sourcedRemedies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSourcedRemedies();
    },
    enabled: !!actor && !isFetching
  });
}
function useAdminAphorisms() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["aphorisms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAphorisms();
    },
    enabled: !!actor && !isFetching
  });
}
function useAdminRepertoryEntries() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["repertoryEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRepertoryEntries();
    },
    enabled: !!actor && !isFetching
  });
}
function csvToArray(s) {
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}
function arrayToCsv(arr) {
  return arr.join(", ");
}
function BulkImportPanel({
  label,
  onImport,
  isPending
}) {
  const [raw, setRaw] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  function handleImport() {
    setError(null);
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
      onImport(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setRaw(((_a2 = ev.target) == null ? void 0 : _a2.result) ?? "");
    };
    reader.readAsText(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }),
      "Bulk Import — ",
      label
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "file",
          accept: ".json",
          onChange: handleFile,
          className: "text-sm",
          "data-ocid": "admin.bulk_import.upload_button"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          placeholder: "Or paste JSON array here…",
          value: raw,
          onChange: (e) => setRaw(e.target.value),
          rows: 5,
          className: "font-mono text-xs",
          "data-ocid": "admin.bulk_import.textarea"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-destructive text-xs",
          "data-ocid": "admin.bulk_import.error_state",
          children: error
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: handleImport,
          disabled: !raw.trim() || isPending,
          "data-ocid": "admin.bulk_import.submit_button",
          children: isPending ? "Importing…" : "Import JSON"
        }
      )
    ] })
  ] });
}
const emptyRemedy = () => ({
  name: "",
  latinName: "",
  remedyId: "",
  source: "boericke",
  keynotes: [],
  mentalSymptoms: [],
  physicalSymptoms: [],
  modalities: { worse: [], better: [] },
  clinicalUses: [],
  constitution: ""
});
function MateriaMedicaTab() {
  var _a, _b;
  const { data: remedies = [], isLoading } = useAdminSourcedRemedies();
  const upsert = useAdminUpsertSourcedRemedy();
  const del = useAdminDeleteSourcedRemedy();
  const bulk = useAdminBulkImportSourcedRemedies();
  const [editing, setEditing] = reactExports.useState(
    null
  );
  const [showForm, setShowForm] = reactExports.useState(false);
  function openNew() {
    setEditing(emptyRemedy());
    setShowForm(true);
  }
  function openEdit(r) {
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
      constitution: r.constitution
    });
    setShowForm(true);
  }
  async function handleSave() {
    if (!editing) return;
    const input = editing;
    await upsert.mutateAsync(input);
    ue.success("Remedy saved");
    setShowForm(false);
    setEditing(null);
  }
  async function handleDelete(id) {
    await del.mutateAsync(id);
    ue.success("Remedy deleted");
  }
  async function handleBulk(data) {
    const count = await bulk.mutateAsync(data);
    ue.success(`${Number(count)} remedies imported`);
  }
  const setField = (key, val) => setEditing((prev) => prev ? { ...prev, [key]: val } : prev);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Materia Medica" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, size: "sm", "data-ocid": "admin.remedy.add_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
        " Add Remedy"
      ] })
    ] }),
    showForm && editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card shadow-medical-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-foreground", children: editing.id ? "Edit Remedy" : "New Remedy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editing.name ?? "",
              onChange: (e) => setField("name", e.target.value),
              "data-ocid": "admin.remedy.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Latin Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editing.latinName ?? "",
              onChange: (e) => setField("latinName", e.target.value),
              "data-ocid": "admin.remedy.latin_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Remedy ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editing.remedyId ?? "",
              onChange: (e) => setField("remedyId", e.target.value),
              "data-ocid": "admin.remedy.remedyid_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Source" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: editing.source ?? "boericke",
              onValueChange: (v) => setField("source", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.remedy.source_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "boericke", children: "Boericke" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "allensKeynotes", children: "Allen's Keynotes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lotus", children: "Lotus Materia Medica" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Keynotes (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: arrayToCsv(editing.keynotes ?? []),
              onChange: (e) => setField("keynotes", csvToArray(e.target.value)),
              rows: 2,
              "data-ocid": "admin.remedy.keynotes_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Mental Symptoms (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: arrayToCsv(editing.mentalSymptoms ?? []),
              onChange: (e) => setField("mentalSymptoms", csvToArray(e.target.value)),
              rows: 2,
              "data-ocid": "admin.remedy.mental_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Physical Symptoms (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: arrayToCsv(editing.physicalSymptoms ?? []),
              onChange: (e) => setField("physicalSymptoms", csvToArray(e.target.value)),
              rows: 2,
              "data-ocid": "admin.remedy.physical_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Modalities — Worse (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: arrayToCsv(((_a = editing.modalities) == null ? void 0 : _a.worse) ?? []),
              onChange: (e) => setField("modalities", {
                ...editing.modalities ?? { better: [] },
                worse: csvToArray(e.target.value)
              }),
              "data-ocid": "admin.remedy.worse_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Modalities — Better (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: arrayToCsv(((_b = editing.modalities) == null ? void 0 : _b.better) ?? []),
              onChange: (e) => setField("modalities", {
                ...editing.modalities ?? { worse: [] },
                better: csvToArray(e.target.value)
              }),
              "data-ocid": "admin.remedy.better_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Clinical Uses (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: arrayToCsv(editing.clinicalUses ?? []),
              onChange: (e) => setField("clinicalUses", csvToArray(e.target.value)),
              "data-ocid": "admin.remedy.clinical_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Constitution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editing.constitution ?? "",
              onChange: (e) => setField("constitution", e.target.value),
              "data-ocid": "admin.remedy.constitution_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: upsert.isPending,
              "data-ocid": "admin.remedy.save_button",
              children: upsert.isPending ? "Saving…" : "Save Remedy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setShowForm(false);
                setEditing(null);
              },
              "data-ocid": "admin.remedy.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.remedy.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : remedies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "admin.remedy.empty_state",
        children: "No remedies yet — add one or bulk import."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border border-border overflow-hidden",
        "data-ocid": "admin.remedy.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell", children: "Latin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground hidden lg:table-cell", children: "Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: remedies.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border hover:bg-muted/30 transition-colors",
              "data-ocid": `admin.remedy.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell italic", children: r.latinName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs capitalize", children: r.source === "allensKeynotes" ? "Allen's" : r.source }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      onClick: () => openEdit(r),
                      "aria-label": "Edit",
                      "data-ocid": `admin.remedy.edit_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive",
                      onClick: () => handleDelete(r.id),
                      "aria-label": "Delete",
                      "data-ocid": `admin.remedy.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            r.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BulkImportPanel,
      {
        label: "Sourced Remedies",
        onImport: handleBulk,
        isPending: bulk.isPending
      }
    )
  ] });
}
const emptyAphorism = () => ({
  number: BigInt(0),
  section: "",
  authenticText: "",
  commentary: "",
  keyThemes: []
});
function OrganonTab() {
  const { data: aphorisms = [], isLoading } = useAdminAphorisms();
  const upsert = useAdminUpsertAphorism();
  const del = useAdminDeleteAphorism();
  const bulk = useAdminBulkImportAphorisms();
  const [editing, setEditing] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  function openEdit(a) {
    setEditing({
      id: a.id,
      number: a.number,
      section: a.section,
      authenticText: a.authenticText,
      commentary: a.commentary,
      keyThemes: a.keyThemes
    });
    setShowForm(true);
  }
  async function handleSave() {
    if (!editing) return;
    await upsert.mutateAsync(editing);
    ue.success("Aphorism saved");
    setShowForm(false);
    setEditing(null);
  }
  async function handleDelete(id) {
    await del.mutateAsync(id);
    ue.success("Aphorism deleted");
  }
  async function handleBulk(data) {
    const count = await bulk.mutateAsync(data);
    ue.success(`${Number(count)} aphorisms imported`);
  }
  const setField = (k, v) => setEditing((prev) => prev ? { ...prev, [k]: v } : prev);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Organon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => {
            setEditing(emptyAphorism());
            setShowForm(true);
          },
          size: "sm",
          "data-ocid": "admin.organon.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Aphorism"
          ]
        }
      )
    ] }),
    showForm && editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card shadow-medical-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-foreground", children: editing.id ? "Edit Aphorism" : "New Aphorism" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aphorism Number *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: Number(editing.number ?? 0),
              onChange: (e) => setField("number", BigInt(e.target.value || 0)),
              "data-ocid": "admin.organon.number_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Section" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editing.section ?? "",
              onChange: (e) => setField("section", e.target.value),
              "data-ocid": "admin.organon.section_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Authentic Text *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: editing.authenticText ?? "",
              onChange: (e) => setField("authenticText", e.target.value),
              rows: 5,
              "data-ocid": "admin.organon.authentic_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Commentary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: editing.commentary ?? "",
              onChange: (e) => setField("commentary", e.target.value),
              rows: 4,
              "data-ocid": "admin.organon.commentary_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Key Themes (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: arrayToCsv(editing.keyThemes ?? []),
              onChange: (e) => setField("keyThemes", csvToArray(e.target.value)),
              "data-ocid": "admin.organon.themes_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: upsert.isPending,
              "data-ocid": "admin.organon.save_button",
              children: upsert.isPending ? "Saving…" : "Save Aphorism"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setShowForm(false);
                setEditing(null);
              },
              "data-ocid": "admin.organon.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.organon.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : aphorisms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "admin.organon.empty_state",
        children: "No aphorisms yet — add one or bulk import."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border border-border overflow-hidden",
        "data-ocid": "admin.organon.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground w-16", children: "§" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Section" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell", children: "Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: aphorisms.map((a, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border hover:bg-muted/30 transition-colors",
              "data-ocid": `admin.organon.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold text-primary", children: String(a.number) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: a.section || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-xs", children: [
                  a.authenticText.slice(0, 80),
                  "…"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      onClick: () => openEdit(a),
                      "aria-label": "Edit",
                      "data-ocid": `admin.organon.edit_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive",
                      onClick: () => handleDelete(a.id),
                      "aria-label": "Delete",
                      "data-ocid": `admin.organon.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            String(a.id)
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BulkImportPanel,
      {
        label: "Aphorisms",
        onImport: handleBulk,
        isPending: bulk.isPending
      }
    )
  ] });
}
const emptyEntry = () => ({
  symptomCategory: "",
  symptomName: "",
  description: "",
  remedies: []
});
function RepertoryTab() {
  const { data: entries = [], isLoading } = useAdminRepertoryEntries();
  const upsert = useAdminUpsertRepertoryEntry();
  const del = useAdminDeleteRepertoryEntry();
  const bulk = useAdminBulkImportRepertoryEntries();
  const [editing, setEditing] = reactExports.useState(
    null
  );
  const [showForm, setShowForm] = reactExports.useState(false);
  const keyCounter = { n: 0 };
  const [remedyRows, setRemedyRows] = reactExports.useState(
    []
  );
  function openEdit(e) {
    setEditing({
      id: e.id,
      symptomCategory: e.symptomCategory,
      symptomName: e.symptomName,
      description: e.description,
      remedies: e.remedies
    });
    setRemedyRows(
      e.remedies.map((r, i) => ({
        remedyId: r.remedyId,
        remedyName: r.remedyName,
        grade: r.grade,
        notes: r.notes,
        _rk: `e-${i}`
      }))
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
      { remedyId: "", remedyName: "", grade: BigInt(1), notes: "", _rk: rk }
    ]);
  }
  function updateRow(rk, field, value) {
    setRemedyRows(
      (rows) => rows.map((r) => r._rk === rk ? { ...r, [field]: value } : r)
    );
  }
  function removeRow(rk) {
    setRemedyRows((rows) => rows.filter((r) => r._rk !== rk));
  }
  async function handleSave() {
    if (!editing) return;
    const input = {
      ...editing,
      remedies: remedyRows.map(({ _rk: _dropped, ...r }) => r)
    };
    await upsert.mutateAsync(input);
    ue.success("Entry saved");
    setShowForm(false);
    setEditing(null);
  }
  async function handleDelete(id) {
    await del.mutateAsync(id);
    ue.success("Entry deleted");
  }
  async function handleBulk(data) {
    const count = await bulk.mutateAsync(data);
    ue.success(`${Number(count)} entries imported`);
  }
  const setField = (k, v) => setEditing((prev) => prev ? { ...prev, [k]: v } : prev);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Repertory" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openNew,
          size: "sm",
          "data-ocid": "admin.repertory.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Entry"
          ]
        }
      )
    ] }),
    showForm && editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-card shadow-medical-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-foreground", children: editing.id ? "Edit Entry" : "New Entry" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Symptom Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: editing.symptomCategory ?? "",
                onChange: (e) => setField("symptomCategory", e.target.value),
                "data-ocid": "admin.repertory.category_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Symptom Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: editing.symptomName ?? "",
                onChange: (e) => setField("symptomName", e.target.value),
                "data-ocid": "admin.repertory.symptom_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: editing.description ?? "",
                onChange: (e) => setField("description", e.target.value),
                rows: 2,
                "data-ocid": "admin.repertory.description_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Remedies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: addRow,
                "data-ocid": "admin.repertory.add_remedy_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                  " Add Remedy"
                ]
              }
            )
          ] }),
          remedyRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-lg border border-border overflow-hidden",
              "data-ocid": "admin.repertory.remedies_table",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-semibold", children: "Remedy Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-semibold w-24", children: "Grade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 font-semibold", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 w-10" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: remedyRows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-t border-border",
                    "data-ocid": `admin.repertory.remedy_row.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: row.remedyName,
                          onChange: (e) => updateRow(row._rk, "remedyName", e.target.value),
                          className: "h-7 text-xs"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: String(row.grade),
                          onValueChange: (v) => updateRow(row._rk, "grade", BigInt(v)),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1", children: "1 — Plain" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2", children: "2 — Italic" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "3", children: "3 — Bold" })
                            ] })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: row.notes,
                          onChange: (e) => updateRow(row._rk, "notes", e.target.value),
                          className: "h-7 text-xs"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "icon",
                          variant: "ghost",
                          className: "h-7 w-7 text-destructive",
                          onClick: () => removeRow(row._rk),
                          "aria-label": "Delete",
                          "data-ocid": `admin.repertory.remove_remedy.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                        }
                      ) })
                    ]
                  },
                  row._rk
                )) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: upsert.isPending,
              "data-ocid": "admin.repertory.save_button",
              children: upsert.isPending ? "Saving…" : "Save Entry"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setShowForm(false);
                setEditing(null);
              },
              "data-ocid": "admin.repertory.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.repertory.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-muted-foreground",
        "data-ocid": "admin.repertory.empty_state",
        children: "No repertory entries yet — add one or bulk import."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-lg border border-border overflow-hidden",
        "data-ocid": "admin.repertory.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Symptom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground w-24", children: "Remedies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-semibold text-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entries.map((e, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border hover:bg-muted/30 transition-colors",
              "data-ocid": `admin.repertory.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground capitalize", children: e.symptomCategory }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: e.symptomName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-primary font-semibold", children: e.remedies.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      onClick: () => openEdit(e),
                      "aria-label": "Edit",
                      "data-ocid": `admin.repertory.edit_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive",
                      onClick: () => handleDelete(e.id),
                      "aria-label": "Delete",
                      "data-ocid": `admin.repertory.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            e.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BulkImportPanel,
      {
        label: "Repertory Entries",
        onImport: handleBulk,
        isPending: bulk.isPending
      }
    )
  ] });
}
function AdminManagementTab({
  currentPrincipal
}) {
  const { data: admins = [], isLoading } = useAdminList();
  const grant = useGrantAdmin();
  const revoke = useRevokeAdmin();
  const [newPrincipal, setNewPrincipal] = reactExports.useState("");
  const masterAdmin = admins[0];
  const isMaster = (masterAdmin == null ? void 0 : masterAdmin.toText()) === currentPrincipal;
  async function handleGrant() {
    if (!newPrincipal.trim()) return;
    try {
      const p = Principal.fromText(newPrincipal.trim());
      const ok = await grant.mutateAsync(p);
      if (ok) {
        ue.success("Admin access granted");
        setNewPrincipal("");
      } else
        ue.error(
          "Could not grant admin — only the master admin can do this"
        );
    } catch {
      ue.error("Invalid principal format");
    }
  }
  async function handleRevoke(p) {
    const ok = await revoke.mutateAsync(p);
    if (ok) ue.success("Admin access revoked");
    else ue.error("Could not revoke — master admin cannot be revoked");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground", children: "Admin Management" }),
      isMaster && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/20 text-primary border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 mr-1" }),
        " Master Admin"
      ] })
    ] }),
    !isMaster && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-500/30 bg-amber-500/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-4 flex items-center gap-3 text-sm text-amber-600 dark:text-amber-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "w-4 h-4 shrink-0" }),
      "You are an admin but not the master admin. Only the master admin can grant or revoke access."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Current Admins" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "space-y-2",
          "data-ocid": "admin.management.loading_state",
          children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i))
        }
      ) : admins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground text-sm",
          "data-ocid": "admin.management.empty_state",
          children: "No admins listed."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", "data-ocid": "admin.management.list", children: admins.map((a, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border",
          "data-ocid": `admin.management.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 text-xs bg-primary/20 text-primary border-primary/30", children: "Master" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground truncate", children: a.toText() }),
              a.toText() === currentPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "shrink-0 text-xs", children: "You" })
            ] }),
            isMaster && idx !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: () => handleRevoke(a),
                disabled: revoke.isPending,
                "data-ocid": `admin.management.revoke_button.${idx + 1}`,
                children: "Revoke"
              }
            )
          ]
        },
        a.toText()
      )) }) })
    ] }),
    isMaster && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Grant Admin Access" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Principal text (e.g. xxxxx-xxxxx-…)",
            value: newPrincipal,
            onChange: (e) => setNewPrincipal(e.target.value),
            className: "font-mono text-xs",
            "data-ocid": "admin.management.principal_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGrant,
            disabled: !newPrincipal.trim() || grant.isPending,
            "data-ocid": "admin.management.grant_button",
            children: grant.isPending ? "Granting…" : "Grant"
          }
        )
      ] })
    ] })
  ] });
}
function AdminPage() {
  const {
    isAuthenticated,
    principal,
    login,
    isLoading: authLoading
  } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const bootstrap = useBootstrapAdmin();
  async function handleBootstrap() {
    const ok = await bootstrap.mutateAsync();
    if (ok) ue.success("You are now the master admin!");
    else
      ue.error(
        "Admin already bootstrapped — contact the master admin for access."
      );
  }
  if (authLoading || adminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 text-center",
        "data-ocid": "admin.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64 mx-auto" })
        ]
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 flex flex-col items-center gap-6",
        "data-ocid": "admin.login_prompt",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Admin Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in with Internet Identity to continue." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: login, "data-ocid": "admin.login_button", children: "Sign In with Internet Identity" })
        ]
      }
    );
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 flex flex-col items-center gap-6",
        "data-ocid": "admin.access_denied",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2 max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Access Denied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your account does not have admin privileges. If you are the first user, you can bootstrap yourself as master admin." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 w-full max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border-border bg-muted/30 p-4 text-xs font-mono text-muted-foreground break-all",
                "data-ocid": "admin.current_principal",
                children: [
                  "Your principal: ",
                  principal ?? "—"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full border-primary/40 text-primary hover:bg-primary/10",
                onClick: handleBootstrap,
                disabled: bootstrap.isPending,
                "data-ocid": "admin.bootstrap_button",
                children: bootstrap.isPending ? "Bootstrapping…" : "Bootstrap as Master Admin"
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 space-y-6",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-2 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: "Admin Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate max-w-xs", children: principal })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "materia", className: "space-y-6", "data-ocid": "admin.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 md:grid-cols-4 w-full md:w-auto bg-muted/50 h-auto p-1 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "materia",
                className: "flex items-center gap-2 py-2 data-[state=active]:bg-card",
                "data-ocid": "admin.tab.materia",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4" }),
                  " Materia Medica"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "organon",
                className: "flex items-center gap-2 py-2 data-[state=active]:bg-card",
                "data-ocid": "admin.tab.organon",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  " Organon"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "repertory",
                className: "flex items-center gap-2 py-2 data-[state=active]:bg-card",
                "data-ocid": "admin.tab.repertory",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4" }),
                  " Repertory"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "management",
                className: "flex items-center gap-2 py-2 data-[state=active]:bg-card",
                "data-ocid": "admin.tab.management",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                  " Admins"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "materia", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MateriaMedicaTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "organon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrganonTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "repertory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RepertoryTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "management", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminManagementTab, { currentPrincipal: principal ?? "" }) })
        ] })
      ]
    }
  );
}
export {
  AdminPage as default
};
