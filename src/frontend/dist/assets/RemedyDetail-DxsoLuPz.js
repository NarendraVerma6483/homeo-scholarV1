import { c as createLucideIcon, i as useParams, u as useAuth, j as jsxRuntimeExports, a as Button, L as Link, R as RemedyDetailSkeleton, F as FlaskConical, B as Badge, d as Brain, S as Separator, b as BookOpen } from "./index-DkGDOaWJ.js";
import { u as ue } from "./index-BV_h6fwr.js";
import { u as useIsBookmarked, a as useToggleBookmark, B as BookmarkCheck, b as Bookmark } from "./useBookmarks-BFYGa-63.js";
import { u as useUpdateRemedyProgress } from "./useProgress-DkiOtIuB.js";
import { c as useGetRemedy } from "./useRemedies-BhJvKYIn.js";
import { A as ArrowLeft, H as Heart, T as TrendingDown } from "./trending-down-DQmdz5ve.js";
import { C as ChevronRight } from "./chevron-right-Bch4nWzA.js";
import { m as motion } from "./proxy-Dd56LSHE.js";
import { S as Sparkles } from "./sparkles-BbAcXARW.js";
import { T as TrendingUp } from "./trending-up-CPfmGkvJ.js";
import "./backend-Cse0PRbs.js";
import "./useMutation-BEAjBEet.js";
import "./useBackend-DNKZsOVi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
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
function SymptomChips({ items }) {
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
function ModalityBlock({ lines }) {
  const better = lines.filter((l) => l.startsWith(">"));
  const worse = lines.filter((l) => l.startsWith("<"));
  const other = lines.filter((l) => !l.startsWith(">") && !l.startsWith("<"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    worse.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-destructive mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-destructive mb-1 uppercase tracking-wider", children: "Aggravated by" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: worse.map((w) => w.replace(/^<\s*/, "")).join("; ") })
      ] })
    ] }),
    better.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-chart-2/30 bg-chart-2/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-chart-2 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-chart-2 mb-1 uppercase tracking-wider", children: "Ameliorated by" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: better.map((b) => b.replace(/^>\s*/, "")).join("; ") })
      ] })
    ] }),
    other.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-mono bg-muted/50 rounded-md px-3 py-2", children: other.join(" · ") })
  ] });
}
const CONFIDENCE_OPTIONS = [
  { label: "Hard", value: "hard", icon: ThumbsDown },
  { label: "Medium", value: "medium", icon: Minus },
  { label: "Easy", value: "easy", icon: ThumbsUp }
];
function RemedyDetailPage() {
  const { id } = useParams({ from: "/remedy/$id" });
  const { data: remedy, isLoading } = useGetRemedy(id);
  const { isAuthenticated } = useAuth();
  const isBookmarked = useIsBookmarked(id);
  const toggleBookmark = useToggleBookmark();
  const updateProgress = useUpdateRemedyProgress();
  const handleBookmark = async () => {
    if (!isAuthenticated) {
      ue.info("Log in to save bookmarks");
      return;
    }
    try {
      const added = await toggleBookmark.mutateAsync(id);
      ue.success(added ? "Remedy bookmarked" : "Bookmark removed");
    } catch {
      ue.error("Failed to update bookmark");
    }
  };
  const handleConfidence = async (confidence) => {
    if (!isAuthenticated) {
      ue.info("Log in to track progress");
      return;
    }
    try {
      await updateProgress.mutateAsync({ remedyId: id, confidence });
      ue.success(`Marked as ${confidence}`);
    } catch {
      ue.error("Failed to update progress");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "remedy_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center h-12 gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          asChild: true,
          className: "gap-1.5 -ml-2 h-8 text-muted-foreground hover:text-foreground",
          "data-ocid": "remedy_detail.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/literature", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "Materia Medica"
          ] })
        }
      ),
      remedy && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: remedy.name })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RemedyDetailSkeleton, {}) : !remedy ? (
      /* 404 state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "flex flex-col items-center justify-center py-32 text-center",
          "data-ocid": "remedy_detail.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-9 w-9 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Remedy not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-6 max-w-sm", children: "The remedy you're looking for doesn't exist in the Materia Medica yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                "data-ocid": "remedy_detail.browse.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/literature", children: "Browse All Remedies" })
              }
            )
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-primary/40 text-primary bg-primary/8 font-medium mb-1",
                    children: [
                      remedy.kingdom,
                      " Kingdom"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground leading-tight", children: remedy.name }),
                remedy.commonName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display italic text-lg text-muted-foreground", children: remedy.commonName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-1", children: [
                  remedy.clinicalIndications.slice(0, 4).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: c }, c)),
                  remedy.clinicalIndications.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    "+",
                    remedy.clinicalIndications.length - 4,
                    " more"
                  ] })
                ] })
              ] }),
              isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: isBookmarked ? "default" : "outline",
                  size: "sm",
                  onClick: handleBookmark,
                  "data-ocid": "remedy_detail.bookmark.button",
                  className: "gap-2 shrink-0 self-start",
                  children: [
                    isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
                    isBookmarked ? "Saved" : "Save"
                  ]
                }
              )
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-lg text-foreground leading-relaxed", children: remedy.constitution })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Key Symptoms",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          delay: 0.1,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SymptomChips,
            {
              items: [
                ...remedy.keySymptomsPhysical,
                ...remedy.keySymptomsEmotional
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            title: "Mental & Emotional Picture",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
            delay: 0.15,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: remedy.keySymptomsEmotional })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            title: "Physical Symptoms",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3.5 w-3.5" }),
            delay: 0.2,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: remedy.keySymptomsPhysical })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Modalities",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
          delay: 0.25,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalityBlock, { lines: remedy.modalities })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionCard,
        {
          title: "Clinical Notes",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
          delay: 0.3,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Clinical Indications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: remedy.clinicalIndications.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: c }, c)) })
            ] }),
            remedy.relations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Relations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: remedy.relations })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.35 },
          className: "rounded-xl border border-border bg-card p-6 shadow-medical-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6", children: [
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-2", children: "How well do you know this remedy?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: CONFIDENCE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleConfidence(opt.value),
                  "data-ocid": `remedy_detail.confidence.${opt.value}.button`,
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(opt.icon, { className: "h-3.5 w-3.5" }),
                    opt.label
                  ]
                },
                opt.value
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 sm:ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  asChild: true,
                  "data-ocid": "remedy_detail.flashcards.button",
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
                  "data-ocid": "remedy_detail.quiz.button",
                  className: "gap-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quiz", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }),
                    "Take Quiz"
                  ] })
                }
              )
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  RemedyDetailPage as default
};
