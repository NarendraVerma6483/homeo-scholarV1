import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, F as FlaskConical, B as Badge, g as cn, r as reactExports, b as BookOpen, h as Search, X, a as Button } from "./index-DkGDOaWJ.js";
import { I as Input } from "./input-BaWQGvME.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BXNVqdxR.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-Cx5V8sin.js";
import { M as MateriaSource } from "./backend.d-fDSsbcCm.js";
import { C as ChevronRight } from "./chevron-right-Bch4nWzA.js";
import { u as useListRemedies, a as useSearchRemediesByName, b as useSearchRemediesBySymptom } from "./useRemedies-BhJvKYIn.js";
import { u as useSourcedRemediesBySource } from "./useSourcedRemedies-CtDBfYTJ.js";
import { A as AnimatePresence } from "./index-Bnt5fvol.js";
import { m as motion } from "./proxy-Dd56LSHE.js";
import "./index-VQXg3RX_.js";
import "./backend-Cse0PRbs.js";
import "./useBackend-DNKZsOVi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
];
const ArrowDownAZ = createLucideIcon("arrow-down-a-z", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SOURCE_CONFIG = {
  [MateriaSource.boericke]: {
    label: "Boericke's MM",
    className: "bg-[oklch(0.62_0.22_48/0.12)] text-primary border-primary/30 dark:bg-[oklch(0.62_0.22_48/0.18)]"
  },
  [MateriaSource.allensKeynotes]: {
    label: "Allen's Keynotes",
    className: "bg-primary/10 text-primary border-primary/30"
  }
};
function SourcedRemedyCard({
  remedy,
  index = 1,
  className
}) {
  const sourceConf = SOURCE_CONFIG[remedy.source];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/sourced-remedy/$id",
      params: { id: remedy.id },
      "data-ocid": `sourced_remedy.item.${index}`,
      className: cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200", children: remedy.name })
            ] }),
            remedy.latinName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground ml-6 truncate italic", children: remedy.latinName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: cn(
                "text-xs font-semibold shrink-0",
                sourceConf.className
              ),
              children: sourceConf.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-3", children: remedy.keynotes.slice(0, 2).map((kn) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-1.5 text-body-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: kn })
            ]
          },
          kn
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
            remedy.keynotes.length,
            " keynotes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" })
        ] })
      ] })
    }
  );
}
const CATEGORIES = [
  { id: "all", label: "All Remedies", match: () => true },
  {
    id: "acute",
    label: "Acute",
    match: (r) => r.keySymptomsPhysical.some(
      (s) => /sudden|fever|acute|onset|rapid|violent/i.test(s)
    ) || r.clinicalIndications.some(
      (c) => /fever|inflammation|acute|infection/i.test(c)
    )
  },
  {
    id: "constitutional",
    label: "Constitutional",
    match: (r) => r.constitution.length > 30 && r.keySymptomsEmotional.length >= 3 && r.keySymptomsPhysical.length >= 4
  },
  {
    id: "mental",
    label: "Mental & Emotional",
    match: (r) => r.keySymptomsEmotional.some(
      (s) => /anxiety|fear|grief|anger|irritab|depress|mania|mental/i.test(s)
    ) || r.clinicalIndications.some((c) => /anxiety|depression|mental/i.test(c))
  },
  {
    id: "mineral",
    label: "Minerals",
    match: (r) => r.kingdom === "Mineral"
  },
  {
    id: "plant",
    label: "Plants",
    match: (r) => r.kingdom === "Plant"
  },
  {
    id: "animal",
    label: "Animal",
    match: (r) => r.kingdom === "Animal"
  }
];
function sortRemedies(remedies, order) {
  const copy = [...remedies];
  if (order === "az") return copy.sort((a, b) => a.name.localeCompare(b.name));
  if (order === "za") return copy.sort((a, b) => b.name.localeCompare(a.name));
  return copy.sort(
    (a, b) => a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0
  );
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
      "data-ocid": "literature.loading_state",
      children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-border bg-card p-5 animate-pulse",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-3/4 rounded bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded bg-muted" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-16 rounded-full bg-muted" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded bg-muted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-5/6 rounded bg-muted" })
            ] })
          ]
        },
        k
      ))
    }
  );
}
function LegacyRemedyCard({
  remedy,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/remedy/$id",
      params: { id: remedy.id },
      "data-ocid": `remedy.item.${index}`,
      className: cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200", children: remedy.name })
            ] }),
            remedy.commonName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground ml-6 truncate italic", children: remedy.commonName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs shrink-0", children: remedy.kingdom })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1", children: remedy.keySymptomsPhysical.slice(0, 2).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "text-body-sm text-muted-foreground flex items-start gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: s })
            ]
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs border-primary/20 bg-primary/8 text-primary",
              children: "Classic MM"
            }
          ),
          remedy.clinicalIndications.slice(0, 2).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: c }, c))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
            remedy.keySymptomsPhysical.length + remedy.keySymptomsEmotional.length,
            " ",
            "symptoms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" })
        ] })
      ] })
    }
  );
}
function LiteraturePage() {
  const [query, setQuery] = reactExports.useState("");
  const [searchMode, setSearchMode] = reactExports.useState("name");
  const [categoryId, setCategoryId] = reactExports.useState("all");
  const [sortOrder, setSortOrder] = reactExports.useState("az");
  const [sourceTab, setSourceTab] = reactExports.useState("all");
  const { data: allRemedies, isLoading: allLoading } = useListRemedies();
  const { data: nameResults, isLoading: nameLoading } = useSearchRemediesByName(
    query.length >= 2 ? query : ""
  );
  const { data: symptomResults, isLoading: symptomLoading } = useSearchRemediesBySymptom(
    query.length >= 2 && searchMode === "symptom" ? query : ""
  );
  const { data: boerickeRemedies, isLoading: boerickeLoading } = useSourcedRemediesBySource(MateriaSource.boericke);
  const { data: allensRemedies, isLoading: allensLoading } = useSourcedRemediesBySource(MateriaSource.allensKeynotes);
  const { data: lotusRemedies, isLoading: lotusLoading } = useSourcedRemediesBySource(MateriaSource.lotus);
  const searching = query.length >= 2;
  const isLegacyLoading = searching ? searchMode === "name" ? nameLoading : symptomLoading : allLoading;
  const filteredRemedies = reactExports.useMemo(() => {
    let base = searching ? (searchMode === "name" ? nameResults : symptomResults) ?? [] : allRemedies ?? [];
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
    sortOrder
  ]);
  const totalCount = (allRemedies == null ? void 0 : allRemedies.length) ?? 0;
  const hasFilters = categoryId !== "all" || query.length > 0;
  const clearAll = () => {
    setQuery("");
    setCategoryId("all");
    setSortOrder("az");
  };
  const rawSourced = sourceTab === "boericke" ? boerickeRemedies ?? [] : sourceTab === "lotus" ? lotusRemedies ?? [] : allensRemedies ?? [];
  const sourcedLoading = sourceTab === "boericke" ? boerickeLoading : sourceTab === "lotus" ? lotusLoading : allensLoading;
  const sourcedSorted = reactExports.useMemo(() => {
    const copy = [...rawSourced];
    if (sortOrder === "az")
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za")
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    return copy;
  }, [rawSourced, sortOrder]);
  const displayCount = sourceTab === "all" ? filteredRemedies.length : sourcedSorted.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 max-w-6xl py-6 sm:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end gap-4 justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-display-lg text-foreground",
              "data-ocid": "literature.page",
              children: "Materia Medica"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground ml-9", children: "Classic remedy profiles for homœopathic study and practice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1.5 self-start sm:self-auto",
          "data-ocid": "literature.remedy_count",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3.5 w-3.5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm font-medium text-primary", children: [
              isLegacyLoading || sourcedLoading ? "…" : displayCount,
              " ",
              displayCount === 1 ? "remedy" : "remedies",
              sourceTab === "all" && !isLegacyLoading && totalCount > 0 && filteredRemedies.length !== totalCount && ` of ${totalCount}`
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-1 overflow-x-auto",
        "data-ocid": "literature.source_tabs",
        children: [
          { id: "all", label: "All Sources", pill: null },
          {
            id: "boericke",
            label: "Boericke's MM",
            pill: "W.Boericke"
          },
          {
            id: "allensKeynotes",
            label: "Allen's Keynotes",
            pill: "H.C.Allen"
          },
          {
            id: "lotus",
            label: "Lotus MM",
            pill: "P.Bailey"
          }
        ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSourceTab(tab.id),
            "data-ocid": `literature.source_tab.${tab.id}`,
            className: cn(
              "relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200",
              "border-b-2 -mb-px",
              sourceTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            ),
            children: [
              tab.label,
              tab.pill && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20", children: tab.pill })
            ]
          },
          tab.id
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-6xl py-4 space-y-3", children: [
      sourceTab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: searchMode === "name" ? "Search by remedy name…" : "Search by symptom (e.g. burning, anxiety, fever)…",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              className: "pl-10 pr-10 bg-background border-input",
              "data-ocid": "literature.search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: query && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              onClick: () => setQuery(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200",
              "aria-label": "Clear search",
              "data-ocid": "literature.search_clear.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            value: searchMode,
            onValueChange: (v) => setSearchMode(v),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsList,
              {
                className: "h-10 bg-background border border-input",
                "data-ocid": "literature.search_mode.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "name", "data-ocid": "literature.tab.name", children: "By Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "symptom",
                      "data-ocid": "literature.tab.symptom",
                      children: "By Symptom"
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sortOrder,
            onValueChange: (v) => setSortOrder(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectTrigger,
                {
                  className: "w-auto min-w-[160px] bg-background border-input h-10",
                  "data-ocid": "literature.sort.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownAZ, { className: "h-3.5 w-3.5 text-muted-foreground mr-1.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "az", "data-ocid": "literature.sort.az", children: "A → Z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "za", "data-ocid": "literature.sort.za", children: "Z → A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "recent", "data-ocid": "literature.sort.recent", children: "Most Recently Studied" })
              ] })
            ]
          }
        )
      ] }),
      sourceTab !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: sortOrder,
          onValueChange: (v) => setSortOrder(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SelectTrigger,
              {
                className: "w-auto min-w-[140px] bg-background border-input h-9",
                "data-ocid": "literature.sort.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownAZ, { className: "h-3.5 w-3.5 text-muted-foreground mr-1.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "az", children: "A → Z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "za", children: "Z → A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "recent", children: "Recent" })
            ] })
          ]
        }
      ) }),
      sourceTab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
        CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCategoryId(cat.id),
            className: cn(
              "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium border transition-smooth cursor-pointer",
              categoryId === cat.id ? "bg-primary text-primary-foreground border-primary shadow-medical-sm" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            ),
            "data-ocid": `literature.filter.${cat.id}`,
            children: cat.label
          },
          cat.id
        )),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: clearAll,
            className: "h-6 px-2 text-xs text-muted-foreground hover:text-foreground",
            "data-ocid": "literature.clear_filters.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 mr-1" }),
              "Clear all"
            ]
          }
        )
      ] }),
      sourceTab === "boericke" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          className: "rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Boericke's Materia Medica" }),
              " ",
              "— William Boericke's comprehensive remedy guide, first published in 1901. Known for detailed physiological and pathological symptom coverage."
            ] })
          ]
        }
      ),
      sourceTab === "allensKeynotes" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          className: "rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Allen's Keynotes" }),
              " — H.C. Allen's celebrated keynote repertory, capturing the most characteristic and prescribing symptoms for each remedy."
            ] })
          ]
        }
      ),
      sourceTab === "lotus" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -4 },
          animate: { opacity: 1, y: 0 },
          className: "rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-3 flex items-start gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-chart-2 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Lotus Materia Medica" }),
              " — Phillip Bailey's holistic and constitutional approach to homoeopathic remedy study. First published in 1995, it explores the deeper essence and personality of each remedy with depth, clarity, and psychological insight."
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 max-w-6xl py-6 sm:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: sourceTab === "all" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        children: isLegacyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : filteredRemedies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border bg-card/40 text-center",
            "data-ocid": "literature.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-md text-foreground mb-2", children: "No remedies found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground max-w-xs mb-5", children: query ? `No results matching "${query}" in this category.` : "No remedies match the selected filters." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: clearAll,
                  className: "border-border hover:border-primary/40",
                  "data-ocid": "literature.empty_state.reset.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 mr-2" }),
                    "Clear Filters"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.25 },
            "data-ocid": "literature.list",
            children: filteredRemedies.map((remedy, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  delay: Math.min(i * 0.04, 0.35),
                  duration: 0.25
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegacyRemedyCard, { remedy, index: i + 1 })
              },
              remedy.id
            ))
          }
        )
      },
      "all-tab"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        children: sourcedLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : sourcedSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border bg-card/40 text-center",
            "data-ocid": "literature.sourced_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-md text-foreground mb-2", children: "No remedies yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground max-w-xs", children: sourceTab === "boericke" ? "Boericke's Materia Medica remedies will appear here." : sourceTab === "lotus" ? "Lotus Materia Medica remedies will appear here." : "Allen's Keynotes remedies will appear here." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.25 },
            "data-ocid": "literature.sourced_list",
            children: sourcedSorted.map((remedy, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  delay: Math.min(i * 0.04, 0.35),
                  duration: 0.25
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourcedRemedyCard, { remedy, index: i + 1 })
              },
              remedy.id
            ))
          }
        )
      },
      sourceTab
    ) }) })
  ] });
}
export {
  LiteraturePage as default
};
