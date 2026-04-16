import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, L as Link, F as FlaskConical, B as Badge, z as cn, a as Button } from "./index-zOgSu2VR.js";
import { u as ue } from "./index-6jU_Z7WP.js";
import { u as useIsBookmarked, a as useToggleBookmark, B as BookmarkCheck, b as Bookmark } from "./useBookmarks-DOxKI-Iw.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode);
const KINGDOM_COLORS = {
  Mineral: "bg-muted text-muted-foreground border-border",
  Plant: "bg-primary/10 text-primary border-primary/20",
  Animal: "bg-accent/10 text-accent-foreground border-accent/20"
};
function RemedyCard({
  remedy,
  index,
  className,
  compact = false
}) {
  const { isAuthenticated } = useAuth();
  const isBookmarked = useIsBookmarked(remedy.id);
  const toggleBookmark = useToggleBookmark();
  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      ue.info("Log in to save bookmarks");
      return;
    }
    try {
      const result = await toggleBookmark.mutateAsync(remedy.id);
      ue.success(result ? "Remedy bookmarked" : "Bookmark removed");
    } catch {
      ue.error("Failed to update bookmark");
    }
  };
  const kingdomClass = KINGDOM_COLORS[remedy.kingdom] ?? KINGDOM_COLORS.Mineral;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/remedy/$id",
      params: { id: remedy.id },
      "data-ocid": `remedy.item.${index ?? 1}`,
      className: cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200", children: remedy.name })
            ] }),
            remedy.commonName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground ml-6 truncate", children: remedy.commonName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: cn("text-xs font-medium", kingdomClass),
                children: remedy.kingdom
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 rounded-full opacity-60 group-hover:opacity-100 transition-smooth",
                onClick: handleBookmark,
                "aria-label": isBookmarked ? "Remove bookmark" : "Add bookmark",
                "data-ocid": `remedy.bookmark_button.${index ?? 1}`,
                children: isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1", children: remedy.keySymptomsPhysical.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: remedy.clinicalIndications.slice(0, 3).map((indication) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: indication }, indication)) })
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
export {
  Activity as A,
  RemedyCard as R
};
