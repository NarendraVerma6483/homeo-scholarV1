import { c as createLucideIcon, G as useParams, r as reactExports, j as jsxRuntimeExports, a as Button, L as Link, F as FlaskConical, b as BookOpen, B as Badge, z as cn, d as Brain, S as Separator, f as Skeleton } from "./index-zOgSu2VR.js";
import { M as MateriaSource } from "./backend.d-fDSsbcCm.js";
import { a as useGetSourcedRemedy, b as useSourcesByRemedyName } from "./useSourcedRemedies-CDKaJwAb.js";
import { A as ArrowLeft, H as Heart, T as TrendingDown } from "./trending-down-CfAIQ-8k.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
import { m as motion } from "./proxy-BTdtC-tV.js";
import { S as Sparkles } from "./sparkles-Br8Y_P3K.js";
import { T as TrendingUp } from "./trending-up-BX8t16rh.js";
import "./useBackend-C6zFmRYr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const SOURCE_META = {
  [MateriaSource.boericke]: {
    label: "Boericke's Materia Medica",
    short: "Boericke's MM",
    author: "William Boericke, M.D.",
    year: "1901",
    description: "Comprehensive physiological and pathological symptom coverage. Internationally adopted as the definitive reference for homoeopathic prescribers.",
    attribution: "According to Boericke's Materia Medica (William Boericke, M.D., 1901):",
    badgeClass: "bg-primary/10 text-primary border-primary/30 dark:bg-primary/15",
    accentClass: "border-primary/30 bg-primary/5",
    dotClass: "bg-primary"
  },
  [MateriaSource.allensKeynotes]: {
    label: "Allen's Keynotes",
    short: "Allen's Keynotes",
    author: "H.C. Allen, M.D.",
    year: "1899",
    description: "Celebrated keynote repertory capturing the most characteristic and prescribing symptoms. Essential for rapid, accurate case analysis.",
    attribution: "According to Allen's Keynotes (H.C. Allen, M.D., 1899):",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
    accentClass: "border-primary/30 bg-primary/5",
    dotClass: "bg-primary"
  },
  [MateriaSource.lotus]: {
    label: "Lotus Materia Medica",
    short: "Lotus MM",
    author: "Phillip Bailey",
    year: "1995",
    description: "Holistic and constitutional perspective on homoeopathic remedies. Explores the deeper essence and personality of each remedy with psychological depth.",
    attribution: "According to Lotus Materia Medica (Phillip Bailey, 1995):",
    badgeClass: "bg-chart-2/10 text-chart-2 border-chart-2/30",
    accentClass: "border-chart-2/30 bg-chart-2/5",
    dotClass: "bg-chart-2"
  }
};
function SectionCard({
  title,
  icon,
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay, ease: "easeOut" },
      className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg tracking-tight", children: title })
        ] }),
        children
      ]
    }
  );
}
function BulletList({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: "flex items-start gap-3 text-sm text-muted-foreground leading-relaxed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" }),
        item
      ]
    },
    item
  )) });
}
function KeynoteChips({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-medium text-foreground transition-smooth hover:border-primary/60 hover:bg-primary/15",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shrink-0" }),
        item
      ]
    },
    item
  )) });
}
function ModalitiesBlock({
  worse,
  better
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
    worse.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-destructive shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive uppercase tracking-wider", children: "Aggravated by (Worse)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: worse.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start gap-2 text-sm text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-destructive/60 shrink-0" }),
            w
          ]
        },
        w
      )) })
    ] }),
    better.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-chart-2 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-chart-2 uppercase tracking-wider", children: "Ameliorated by (Better)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: better.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start gap-2 text-sm text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-chart-2/60 shrink-0" }),
            b
          ]
        },
        b
      )) })
    ] })
  ] });
}
function SourcePickerCard({
  source,
  isSelected,
  onClick
}) {
  const meta = SOURCE_META[source.source];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `sourced_detail.source_card.${source.source}`,
      className: cn(
        "w-full text-left rounded-xl border p-5 transition-smooth cursor-pointer",
        "hover:shadow-medical-md",
        isSelected ? "border-primary bg-primary/5 shadow-medical-sm" : "border-border bg-card hover:border-primary/40"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: cn("text-xs font-semibold", meta.badgeClass),
              children: meta.short
            }
          ),
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: "Selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: meta.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
          meta.author,
          " · ",
          meta.year
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mt-2 leading-relaxed", children: meta.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-sm text-primary font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "View ",
            source.keynotes.length,
            " keynotes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] })
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" })
  ] });
}
function SourcedRemedyDetailPage() {
  const { id } = useParams({ from: "/sourced-remedy/$id" });
  const { data: remedy, isLoading } = useGetSourcedRemedy(id);
  const { data: allSources } = useSourcesByRemedyName((remedy == null ? void 0 : remedy.name) ?? "");
  const [selectedSourceId, setSelectedSourceId] = reactExports.useState(null);
  const displayedRemedy = selectedSourceId != null ? (allSources == null ? void 0 : allSources.find((s) => s.id === selectedSourceId)) ?? remedy ?? void 0 : remedy ?? void 0;
  const otherSources = displayedRemedy && allSources ? allSources.filter((s) => s.id !== displayedRemedy.id) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "sourced_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center h-12 gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          asChild: true,
          className: "gap-1.5 -ml-2 h-8 text-muted-foreground hover:text-foreground",
          "data-ocid": "sourced_detail.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/literature", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "Materia Medica"
          ] })
        }
      ),
      displayedRemedy && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: displayedRemedy.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: SOURCE_META[displayedRemedy.source].short })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {}) : !displayedRemedy ? (
      /* 404 state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "flex flex-col items-center justify-center py-32 text-center",
          "data-ocid": "sourced_detail.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-9 w-9 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Remedy not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-6 max-w-sm", children: "This remedy doesn't exist in the sourced Materia Medica yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                "data-ocid": "sourced_detail.browse.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: "Browse All Remedies" })
              }
            )
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      allSources && allSources.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          className: "rounded-xl border border-border bg-card p-5 shadow-medical-sm",
          "data-ocid": "sourced_detail.source_picker",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-base", children: [
                "Available Sources for ",
                displayedRemedy.name
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: allSources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SourcePickerCard,
              {
                source,
                isSelected: displayedRemedy.id === source.id,
                onClick: () => setSelectedSourceId(source.id)
              },
              source.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: "easeOut" },
          className: "relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-medical-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/8 blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "font-semibold mb-1",
                    SOURCE_META[displayedRemedy.source].badgeClass
                  ),
                  children: SOURCE_META[displayedRemedy.source].label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground leading-tight", children: displayedRemedy.name }),
              displayedRemedy.latinName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display italic text-lg text-muted-foreground", children: displayedRemedy.latinName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
                SOURCE_META[displayedRemedy.source].author,
                " ·",
                " ",
                SOURCE_META[displayedRemedy.source].year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground italic mt-1", children: SOURCE_META[displayedRemedy.source].attribution }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
                displayedRemedy.clinicalUses.slice(0, 4).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: c }, c)),
                displayedRemedy.clinicalUses.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                  "+",
                  displayedRemedy.clinicalUses.length - 4,
                  " more"
                ] })
              ] })
            ] }) }) })
          ]
        }
      ),
      displayedRemedy.constitution && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.05 },
          className: "rounded-xl border border-primary/25 bg-primary/6 p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider", children: "Constitutional Picture" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-lg text-foreground leading-relaxed", children: displayedRemedy.constitution })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Keynote Symptoms",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          delay: 0.1,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeynoteChips, { items: displayedRemedy.keynotes })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            title: "Mental Symptoms",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
            delay: 0.15,
            children: displayedRemedy.mentalSymptoms.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: displayedRemedy.mentalSymptoms }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Not recorded in this source." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            title: "Physical Symptoms",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3.5 w-3.5" }),
            delay: 0.2,
            children: displayedRemedy.physicalSymptoms.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: displayedRemedy.physicalSymptoms }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Not recorded in this source." })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Modalities",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
          delay: 0.25,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModalitiesBlock,
            {
              worse: displayedRemedy.modalities.worse,
              better: displayedRemedy.modalities.better
            }
          )
        }
      ),
      displayedRemedy.clinicalUses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Clinical Uses",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
          delay: 0.3,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: displayedRemedy.clinicalUses.map((use) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: use }, use)) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      otherSources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.35 },
          className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm",
          "data-ocid": "sourced_detail.other_sources",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Also available in:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: otherSources.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setSelectedSourceId(src.id),
                "data-ocid": `sourced_detail.switch_source.${src.source}.button`,
                className: "gap-2 border-primary/30 hover:border-primary hover:bg-primary/5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                  "View in ",
                  SOURCE_META[src.source].short
                ]
              },
              src.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.4 },
          className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                asChild: true,
                "data-ocid": "sourced_detail.flashcards.button",
                className: "gap-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/flashcards", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                  "Study Flashcard"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                "data-ocid": "sourced_detail.quiz.button",
                className: "gap-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quiz", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }),
                  "Take Quiz"
                ] })
              }
            )
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  SourcedRemedyDetailPage as default
};
