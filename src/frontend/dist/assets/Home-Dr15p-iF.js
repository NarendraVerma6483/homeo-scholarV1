import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, B as Badge, a as Button, L as Link, b as BookOpen, d as Brain, e as LayoutDashboard, S as Separator, F as FlaskConical, T as Trophy, f as Skeleton } from "./index-zOgSu2VR.js";
import { A as Activity, R as RemedyCard } from "./RemedyCard-8qh8UxUa.js";
import { u as useListRemedies, S as SEED_REMEDIES } from "./useRemedies-DaRZ6zfL.js";
import { m as motion } from "./proxy-BTdtC-tV.js";
import { S as Star } from "./star--nQ6TmcB.js";
import { S as Sparkles } from "./sparkles-Br8Y_P3K.js";
import { C as Compass } from "./compass-CyNXzvYm.js";
import { Z as Zap } from "./zap-BibBNvGF.js";
import "./index-6jU_Z7WP.js";
import "./useBookmarks-DOxKI-Iw.js";
import "./useBackend-C6zFmRYr.js";
import "./useMutation-BW6BkhXL.js";
import "./chevron-right-DaobTsDe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
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
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
const Microscope = createLucideIcon("microscope", __iconNode);
const PREVIEW_NAMES = ["Arsenicum Album", "Belladonna", "Nux Vomica"];
const FEATURES = [
  {
    icon: BookOpen,
    title: "Materia Medica",
    desc: "Authentic remedy profiles from Boericke, Allen's Keynotes, and Lotus — with exact source citations and complete symptom pictures.",
    href: "/literature",
    cta: "Browse Remedies",
    badge: "Literature",
    accentClass: "bg-primary/10 text-primary ring-primary/20"
  },
  {
    icon: Brain,
    title: "Flashcards & Spaced Review",
    desc: "Adaptive symptom-to-remedy flashcards that learn your weak spots and resurface remedies at the optimal moment for retention.",
    href: "/flashcards",
    cta: "Start Flashcards",
    badge: "Study",
    accentClass: "bg-accent/10 text-accent ring-accent/20"
  },
  {
    icon: Trophy,
    title: "Exam Quiz",
    desc: "Exam-style multiple choice questions with difficulty tiers, score history, and a global leaderboard for competitive practice.",
    href: "/quiz",
    cta: "Take a Quiz",
    badge: "Assessment",
    accentClass: "bg-chart-2/10 text-chart-2 ring-chart-2/20"
  }
];
const STATS = [
  { value: "200+", label: "Remedy Profiles", icon: FlaskConical },
  { value: "1,000+", label: "Symptoms Indexed", icon: Leaf },
  { value: "500+", label: "Quiz Questions", icon: Trophy },
  { value: "Free", label: "For All Students", icon: GraduationCap }
];
const TOOLS = [
  {
    icon: Compass,
    label: "Repertory",
    desc: "Case-based symptom lookup",
    href: "/repertory"
  },
  {
    icon: Microscope,
    label: "Organon",
    desc: "All 291 aphorisms + commentary",
    href: "/organon"
  },
  {
    icon: Activity,
    label: "Dashboard",
    desc: "Progress, streaks & bookmarks",
    href: "/dashboard"
  },
  {
    icon: Zap,
    label: "Leaderboard",
    desc: "Top scorers by difficulty",
    href: "/leaderboard"
  }
];
function HomePage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: remedies, isLoading: remediesLoading } = useListRemedies();
  const previewRemedies = (() => {
    const all = remedies ?? SEED_REMEDIES;
    const matches = PREVIEW_NAMES.map(
      (name) => all.find((r) => r.name === name) ?? all[0]
    ).filter(Boolean);
    return matches.length >= 3 ? matches.slice(0, 3) : all.slice(0, 3);
  })();
  const shortPrincipal = principal ? `${principal.slice(0, 5)}…${principal.slice(-3)}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden gradient-background pb-28 pt-24 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[100px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/5 h-[360px] w-[360px] rounded-full bg-accent/8 blur-[80px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-0 h-[200px] w-[200px] rounded-full bg-chart-2/5 blur-[60px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-32 left-8 h-24 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-32 right-8 h-24 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.025]",
            style: {
              backgroundImage: "linear-gradient(var(--border-color, oklch(0.88 0 0)) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0 0) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative z-10 mx-auto max-w-3xl text-center", children: [
        isAuthenticated && shortPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm text-primary",
            "data-ocid": "hero.welcome_badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-current" }),
              "Welcome back,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs opacity-75", children: shortPrincipal })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "gap-1.5 border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                    "Med / Similiar — Knowledge Platform"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-5 font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl", children: [
                "Med /",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Similiar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-hidden": "true",
                      className: "absolute -bottom-2 left-0 w-full",
                      height: "6",
                      viewBox: "0 0 200 6",
                      fill: "none",
                      preserveAspectRatio: "none",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M2 4 C50 2, 100 5, 198 3",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          className: "text-primary/40"
                        }
                      )
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-4 max-w-xl font-display text-xl font-light text-foreground/70 sm:text-2xl leading-relaxed", children: "The complete clinical reference for homoeopathic students & practitioners" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex flex-wrap items-center justify-center gap-2", children: ["Boericke", "Allen's Keynotes", "Lotus MM", "Organon"].map(
                (src) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm",
                    children: src
                  },
                  src
                )
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    asChild: true,
                    className: "gap-2 px-7 shadow-medical-md",
                    "data-ocid": "hero.start_learning.primary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/literature", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                      "Open Literature",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    asChild: true,
                    className: "gap-2 border-border bg-card/50 backdrop-blur-sm hover:bg-card",
                    "data-ocid": "hero.browse_remedies.secondary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/flashcards", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                      "Practice Now"
                    ] })
                  }
                )
              ] }),
              isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.35, duration: 0.4 },
                  className: "mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        asChild: true,
                        className: "h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
                        "data-ocid": "hero.go_to_dashboard.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-3 w-3" }),
                          "Dashboard"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        asChild: true,
                        className: "h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
                        "data-ocid": "hero.continue_studying.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/flashcards", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3 w-3" }),
                          "Continue Studying"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        asChild: true,
                        className: "h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
                        "data-ocid": "hero.repertory.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/repertory", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3 w-3" }),
                          "Case Analysis"
                        ] })
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-card px-4 py-6 shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-0 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.07 },
        className: "flex flex-col items-center justify-center gap-1.5 py-5 px-4 text-center first:rounded-l-lg last:rounded-r-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground tracking-wide", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-3 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Core Study Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-12 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-lg mb-3 text-foreground", children: "Everything You Need to Succeed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-lg text-base text-muted-foreground leading-relaxed", children: "Three powerful tools built for homoeopathic students and practitioners — from authoritative reference to exam readiness." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          className: "group relative rounded-2xl border border-border bg-card shadow-card-elevated card-hover overflow-hidden",
          "data-ocid": `home.feature.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-smooth group-hover:opacity-100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${feature.accentClass}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "h-5 w-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-border bg-muted/50 text-xs text-muted-foreground",
                    children: feature.badge
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2.5 font-display text-lg font-semibold text-foreground", children: feature.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-7 text-sm text-muted-foreground leading-relaxed", children: feature.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  asChild: true,
                  className: "h-auto gap-1.5 p-0 text-sm text-primary hover:text-primary",
                  "data-ocid": `home.feature.cta.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: feature.href, children: [
                    feature.cta,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" })
                  ] })
                }
              )
            ] })
          ]
        },
        feature.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-y border-border px-4 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-1.5", children: "More Clinical Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Advanced features for deeper study and case analysis" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4", children: TOOLS.map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: tool.href,
              className: "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-medical-sm transition-smooth hover:border-primary/30 hover:shadow-medical-md",
              "data-ocid": `home.tool.${tool.label.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 transition-smooth group-hover:bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(tool.icon, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: tool.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug mt-0.5", children: tool.desc })
                ] })
              ]
            }
          )
        },
        tool.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-lg text-foreground mb-2", children: "Featured Remedies" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground", children: "A preview of what's inside the Materia Medica browser." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                asChild: true,
                className: "shrink-0 gap-2 shadow-medical-sm",
                "data-ocid": "home.view_all_remedies.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/literature", children: [
                  "View All Remedies",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid gap-5 md:grid-cols-3",
          "data-ocid": "home.remedies.list",
          children: remediesLoading ? ["skel-1", "skel-2", "skel-3"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-5 shadow-medical-sm",
              "data-ocid": `home.remedies.loading_state.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/5 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/5 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full mb-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5 mb-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/5" })
              ]
            },
            key
          )) : previewRemedies.map((remedy, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RemedyCard,
                {
                  remedy,
                  index: i + 1,
                  "data-ocid": `home.remedies.item.${i + 1}`
                }
              )
            },
            remedy.id
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-t border-border bg-card px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-primary/5 blur-[80px]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative z-10 mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md mb-3 text-foreground", children: "Ready to Master the Materia Medica?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-3 max-w-md text-base text-muted-foreground leading-relaxed", children: "Start with flashcards for daily revision, dive into the authentic literature, or analyse a case with the Repertory tool." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-9 text-xs text-muted-foreground/70 max-w-xs", children: "Login with Internet Identity to unlock progress tracking, spaced repetition, and case diary." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  asChild: true,
                  className: "gap-2 px-7 shadow-medical-md",
                  "data-ocid": "bottom_cta.start_flashcards.primary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/flashcards", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                    "Start Flashcards"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  asChild: true,
                  className: "gap-2",
                  "data-ocid": "bottom_cta.take_quiz.secondary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quiz", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
                    "Take a Quiz"
                  ] })
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  HomePage as default
};
