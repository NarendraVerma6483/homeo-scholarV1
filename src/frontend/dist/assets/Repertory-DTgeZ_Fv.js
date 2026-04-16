import { c as createLucideIcon, j as jsxRuntimeExports, Y as Root$1, Z as Content, _ as Close, X, z as cn, $ as Title, a0 as Portal, a1 as Overlay, r as reactExports, M as Primitive, I as useQueryClient, u as useAuth, E as Search, b as BookOpen, B as Badge, a as Button, f as Skeleton } from "./index-zOgSu2VR.js";
import { I as Input } from "./input-BkajiwmW.js";
import { u as ue } from "./index-6jU_Z7WP.js";
import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
import { u as useMutation } from "./useMutation-BW6BkhXL.js";
import { m as motion } from "./proxy-BTdtC-tV.js";
import { C as Compass } from "./compass-CyNXzvYm.js";
import { C as ChevronRight } from "./chevron-right-DaobTsDe.js";
import { A as AnimatePresence } from "./index-DGdjfSQr.js";
import { C as ChevronDown } from "./chevron-down-CYo2NBJz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$3);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function useMyCases() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["cases", "mine"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.listMyCases();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 2 * 60 * 1e3
  });
}
function useSaveCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      selectedSymptoms,
      clinicalNotes,
      matchingRemedies
    }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.saveCaseAnalysis(
        name,
        selectedSymptoms,
        clinicalNotes,
        matchingRemedies
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    }
  });
}
function useUpdateCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, clinicalNotes }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.updateCase(id, name, clinicalNotes);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({
        queryKey: ["cases", "detail", variables.id]
      });
    }
  });
}
function useDeleteCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Backend not available");
      return backend.deleteCase(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    }
  });
}
function useSearchCases(rawQuery) {
  const { backend, isLoading: backendLoading } = useBackend();
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState(rawQuery);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(rawQuery), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);
  return useQuery({
    queryKey: ["cases", "search", debouncedQuery],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.searchMyCases(debouncedQuery);
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && debouncedQuery.trim().length > 0,
    staleTime: 60 * 1e3
  });
}
const SEED_REPERTORY = [
  // MIND
  {
    id: "mind-anxiety-health",
    symptomCategory: "Mind",
    symptomName: "Anxiety about health",
    description: "Excessive fear and worry about one's health status; hypochondriacal tendencies",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Intense fear of death, disease; restless anxiety"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Fear of insanity, observation; overwhelmed"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(1),
        notes: "Oversensitive, irritable hypochondriac"
      }
    ]
  },
  {
    id: "mind-irritability",
    symptomCategory: "Mind",
    symptomName: "Irritability and anger",
    description: "Quick temper, oversensitivity to noise, touch or criticism; impatience",
    remedies: [
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Fault-finding, competitive, cannot bear contradiction"
      },
      {
        remedyId: "chamomilla",
        remedyName: "Chamomilla",
        grade: BigInt(3),
        notes: "Uncivil, snappish; nothing satisfies"
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(2),
        notes: "Irritable when disturbed, wants to be left alone"
      },
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(1),
        notes: "Philosophical irritability; egotistical"
      }
    ]
  },
  {
    id: "mind-grief",
    symptomCategory: "Mind",
    symptomName: "Grief and sadness",
    description: "Deep sorrow, prolonged grief after loss, tendency to suppress emotions",
    remedies: [
      {
        remedyId: "ignatia",
        remedyName: "Ignatia Amara",
        grade: BigInt(3),
        notes: "Acute grief, sighing, contradictory symptoms"
      },
      {
        remedyId: "nat-mur",
        remedyName: "Natrum Muriaticum",
        grade: BigInt(3),
        notes: "Chronic grief, consolation aggravates, brooding"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Weeps easily, desires consolation"
      },
      {
        remedyId: "aurum-met",
        remedyName: "Aurum Metallicum",
        grade: BigInt(2),
        notes: "Deep despondency, suicidal tendency from grief"
      }
    ]
  },
  // HEAD
  {
    id: "head-throbbing-headache",
    symptomCategory: "Head",
    symptomName: "Throbbing headache",
    description: "Pulsating, pounding headache often with congestion; worse from motion or light",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Violent throbbing; hot red face; worse light, jarring"
      },
      {
        remedyId: "glonoin",
        remedyName: "Gloninum",
        grade: BigInt(3),
        notes: "Bursting, pulsating; rises up like waves"
      },
      {
        remedyId: "nat-mur",
        remedyName: "Natrum Muriaticum",
        grade: BigInt(2),
        notes: "Hammering headache from sunrise to sunset"
      },
      {
        remedyId: "ferrum-phos",
        remedyName: "Ferrum Phosphoricum",
        grade: BigInt(1),
        notes: "Congestive headache in early stages"
      }
    ]
  },
  {
    id: "head-occipital-pain",
    symptomCategory: "Head",
    symptomName: "Occipital headache",
    description: "Pain at the back of the head, often with stiffness of neck",
    remedies: [
      {
        remedyId: "gelsemium",
        remedyName: "Gelsemium",
        grade: BigInt(3),
        notes: "Heavy, dull occipital pain extending to forehead"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Occipital headache from overwork and stimulants"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(1),
        notes: "Cold, damp head; headache from mental exertion"
      }
    ]
  },
  // FEVER
  {
    id: "fever-sudden-onset",
    symptomCategory: "Fever",
    symptomName: "Sudden onset high fever",
    description: "Abrupt rise of temperature, often with chills, heat and restlessness",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Sudden violent fever; hot dry skin; no thirst"
      },
      {
        remedyId: "aconite",
        remedyName: "Aconitum Napellus",
        grade: BigInt(3),
        notes: "After exposure to cold wind; fear, restlessness"
      },
      {
        remedyId: "ferrum-phos",
        remedyName: "Ferrum Phosphoricum",
        grade: BigInt(2),
        notes: "Early febrile stage; no localizing symptoms"
      }
    ]
  },
  {
    id: "fever-chills",
    symptomCategory: "Fever",
    symptomName: "Chills and shivering",
    description: "Marked coldness and shaking chills, often alternating with heat",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Chills at 1 AM; burning internally but chilly"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Chilly; cannot get warm; worse uncovering"
      },
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(2),
        notes: "Chills from uncovering; rheumatic complaints with fever"
      },
      {
        remedyId: "gelsemium",
        remedyName: "Gelsemium",
        grade: BigInt(2),
        notes: "Chills running up the back; anticipatory fever"
      }
    ]
  },
  // STOMACH
  {
    id: "stomach-nausea-vomiting",
    symptomCategory: "Stomach",
    symptomName: "Nausea and vomiting",
    description: "Persistent nausea, retching; vomiting from various causes",
    remedies: [
      {
        remedyId: "ipecac",
        remedyName: "Ipecacuanha",
        grade: BigInt(3),
        notes: "Persistent nausea not relieved by vomiting; clean tongue"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Nausea from overindulgence; ineffectual retching"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Nausea from fatty foods; better in open air"
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Nausea with anxiety; food poisoning"
      }
    ]
  },
  {
    id: "stomach-bloating-flatulence",
    symptomCategory: "Stomach",
    symptomName: "Bloating and flatulence",
    description: "Abdominal distension, trapped gas, rumbling and discomfort after eating",
    remedies: [
      {
        remedyId: "lycopodium",
        remedyName: "Lycopodium Clavatum",
        grade: BigInt(3),
        notes: "Immediate bloating after smallest meal; worse 4–8 PM"
      },
      {
        remedyId: "carbo-veg",
        remedyName: "Carbo Vegetabilis",
        grade: BigInt(3),
        notes: "Extreme flatulence; wants to be fanned"
      },
      {
        remedyId: "china",
        remedyName: "China Officinalis",
        grade: BigInt(2),
        notes: "Flatulence not relieved by passing gas"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Bloating 1–2 hours after eating; sour belching"
      }
    ]
  },
  // RESPIRATORY
  {
    id: "respiratory-dry-cough",
    symptomCategory: "Respiratory",
    symptomName: "Dry, barking cough",
    description: "Hard, dry cough without expectoration; worse at night or on lying down",
    remedies: [
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Dry cough; must hold chest; worse motion; thirst"
      },
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(2),
        notes: "Spasmodic dry cough; worse night; laryngeal irritation"
      },
      {
        remedyId: "phosphorus",
        remedyName: "Phosphorus",
        grade: BigInt(2),
        notes: "Dry tight cough; chest feels heavy; worse lying on left"
      },
      {
        remedyId: "rumex",
        remedyName: "Rumex Crispus",
        grade: BigInt(1),
        notes: "Cough triggered by cold air; tickling in throat-pit"
      }
    ]
  },
  {
    id: "respiratory-asthma",
    symptomCategory: "Respiratory",
    symptomName: "Asthma and wheezing",
    description: "Spasmodic breathlessness, wheezing, tightness in chest; worse at night",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Midnight asthma; anxiety; better sitting upright"
      },
      {
        remedyId: "ipecac",
        remedyName: "Ipecacuanha",
        grade: BigInt(3),
        notes: "Wheezing with nausea; rattling mucus in chest"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Asthma in warm rooms; better open air"
      }
    ]
  },
  // EXTREMITIES
  {
    id: "extremities-joint-pain",
    symptomCategory: "Extremities",
    symptomName: "Joint pain and stiffness",
    description: "Painful, stiff joints; worse from initial movement, cold or damp weather",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(3),
        notes: "Better continued motion; worse initial movement; restless"
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Worse any motion; must keep still; stitching pains"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Cold damp joints; worse cold; slow metabolism"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Wandering joint pains; shifting; better cold application"
      }
    ]
  },
  {
    id: "extremities-numbness",
    symptomCategory: "Extremities",
    symptomName: "Numbness and tingling",
    description: "Pins and needles, loss of sensation in hands and feet; formication",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(2),
        notes: "Numbness after long rest; better on movement"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Cold, numb extremities; icy coldness of feet in bed"
      },
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(1),
        notes: "Burning in soles preventing sleep; soles hot at night"
      }
    ]
  },
  // SKIN
  {
    id: "skin-eczema",
    symptomCategory: "Skin",
    symptomName: "Eczema and skin eruptions",
    description: "Itching, weeping or dry skin eruptions; worse from warmth or washing",
    remedies: [
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(3),
        notes: "Intense itching; worse heat, bathing; dirty appearance"
      },
      {
        remedyId: "graphites",
        remedyName: "Graphites",
        grade: BigInt(3),
        notes: "Honey-like sticky oozing from cracks; behind ears, folds"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Eczema in fair, flabby children; worse cold damp"
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Burning, dry, scaly eruptions; anxiety with skin complaints"
      }
    ]
  },
  {
    id: "skin-urticaria",
    symptomCategory: "Skin",
    symptomName: "Urticaria and hives",
    description: "Wheals, intense itching, swelling; often worse at night or from heat",
    remedies: [
      {
        remedyId: "urtica-urens",
        remedyName: "Urtica Urens",
        grade: BigInt(3),
        notes: "Raised red wheals like nettle rash; burning, itching"
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(3),
        notes: "Rosy-pink oedematous swellings; stinging; better cold"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "After rich fatty foods; worse warmth; weeping patient"
      }
    ]
  },
  // BACK
  {
    id: "back-lower-back-pain",
    symptomCategory: "Back",
    symptomName: "Lower back pain (lumbago)",
    description: "Pain in lumbar region; may be dull aching or sharp; worse on rising from sitting",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(3),
        notes: "Worse initial motion; better continued motion; restless"
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Worse any movement; must be completely still"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Must sit up to turn in bed; backache from desk work"
      },
      {
        remedyId: "kali-carb",
        remedyName: "Kali Carbonicum",
        grade: BigInt(2),
        notes: "Backache during pregnancy; worse 2–4 AM; weakness"
      }
    ]
  },
  // SLEEP
  {
    id: "sleep-insomnia",
    symptomCategory: "Sleep",
    symptomName: "Insomnia and sleeplessness",
    description: "Difficulty falling or staying asleep; waking at specific hours; unrefreshing sleep",
    remedies: [
      {
        remedyId: "coffea",
        remedyName: "Coffea Cruda",
        grade: BigInt(3),
        notes: "Mind too active; thoughts rushing; from joy or good news"
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Wakes 3–4 AM, mind active; from overwork and stimulants"
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Restless after midnight; anxiety drives from bed"
      }
    ]
  },
  {
    id: "sleep-nightmares",
    symptomCategory: "Sleep",
    symptomName: "Nightmares and frightful dreams",
    description: "Vivid frightening dreams; waking in terror; talking or crying in sleep",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Frightful visions; twitching; cries out in sleep"
      },
      {
        remedyId: "stramonium",
        remedyName: "Stramonium",
        grade: BigInt(3),
        notes: "Extreme terror; sees animals; light and company ameliorate"
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Frightful images; wakes anxious; forgets bad dreams"
      }
    ]
  },
  // EYES
  {
    id: "eyes-inflammation",
    symptomCategory: "Eyes",
    symptomName: "Eye inflammation and conjunctivitis",
    description: "Redness, burning, discharge from eyes; photophobia",
    remedies: [
      {
        remedyId: "euphrasia",
        remedyName: "Euphrasia Officinalis",
        grade: BigInt(3),
        notes: "Acrid burning eye discharge; bland nasal catarrh"
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(2),
        notes: "Oedematous, puffy lids; stinging; better cold bathing"
      },
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(2),
        notes: "Extreme photophobia; dilated pupils; dry, red conjunctiva"
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Thick, bland, yellowish discharge; worse warm room"
      }
    ]
  },
  // THROAT
  {
    id: "throat-soreness",
    symptomCategory: "Throat",
    symptomName: "Sore throat and tonsillitis",
    description: "Painful, inflamed throat; difficulty swallowing; may have exudate",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Bright red, dry, hot throat; worse empty swallowing"
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(3),
        notes: "Oedematous swelling; stinging pain; better cold drinks"
      },
      {
        remedyId: "lachesis",
        remedyName: "Lachesis",
        grade: BigInt(3),
        notes: "Left-sided or left to right; worse warm liquids, constriction"
      },
      {
        remedyId: "lycopodium",
        remedyName: "Lycopodium Clavatum",
        grade: BigInt(2),
        notes: "Right-sided or right to left; worse cold drinks"
      }
    ]
  }
];
function useRepertoryEntries() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["repertory", "all"],
    queryFn: async () => {
      if (!backend) return SEED_REPERTORY;
      try {
        const result = await backend.listRepertoryEntries();
        return result.length > 0 ? result : SEED_REPERTORY;
      } catch {
        return SEED_REPERTORY;
      }
    },
    enabled: !backendLoading,
    staleTime: 5 * 60 * 1e3
  });
}
function useSearchRepertory(symptom) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["repertory", "search", symptom],
    queryFn: async () => {
      const lower = symptom.toLowerCase();
      if (!backend) {
        return SEED_REPERTORY.filter(
          (e) => e.symptomName.toLowerCase().includes(lower) || e.description.toLowerCase().includes(lower) || e.symptomCategory.toLowerCase().includes(lower) || e.remedies.some((r) => r.remedyName.toLowerCase().includes(lower))
        );
      }
      try {
        const result = await backend.searchRepertory(symptom);
        return result.length > 0 ? result : SEED_REPERTORY.filter(
          (e) => e.symptomName.toLowerCase().includes(lower) || e.description.toLowerCase().includes(lower)
        );
      } catch {
        return SEED_REPERTORY.filter(
          (e) => e.symptomName.toLowerCase().includes(lower) || e.description.toLowerCase().includes(lower)
        );
      }
    },
    enabled: !backendLoading && symptom.trim().length > 2,
    staleTime: 2 * 60 * 1e3
  });
}
function useSeedRepertory() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not available");
      return await backend.seedRepertory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repertory"] });
    }
  });
}
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
  "Throat"
];
const CATEGORY_COLORS = {
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
  Throat: "bg-destructive/15 text-destructive/80 border-destructive/25"
};
function formatDate(ts) {
  try {
    const ms = Number(ts) / 1e6;
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(ms));
  } catch {
    return "—";
  }
}
function GradeIndicator({ grade }) {
  const g = Number(grade);
  const label = g === 3 ? "Keynote" : g === 2 ? "Notable" : "Minor";
  const colorClass = g === 3 ? "text-primary" : g === 2 ? "text-muted-foreground" : "text-muted-foreground/60";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        colorClass
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex gap-0.5", children: [1, 2, 3].map((dot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-block w-2 h-2 rounded-full border",
              dot <= g ? "bg-current border-current" : "border-current opacity-25"
            )
          },
          dot
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
      ]
    }
  );
}
function RemedyRow({
  remedy,
  index
}) {
  const grade = Number(remedy.grade);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -6 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04 },
      className: cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-smooth",
        grade === 3 ? "bg-primary/5 border-primary/20 hover:bg-primary/8" : grade === 2 ? "bg-muted/40 border-border hover:bg-muted/60" : "bg-background border-border/40 hover:bg-muted/20"
      ),
      "data-ocid": `repertory.remedy.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "font-medium text-sm",
                grade === 3 ? "text-foreground" : "text-foreground/80"
              ),
              children: remedy.remedyName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GradeIndicator, { grade: remedy.grade })
        ] }),
        remedy.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: remedy.notes })
      ] })
    }
  );
}
function SymptomCard({
  entry,
  index,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const sortedRemedies = reactExports.useMemo(
    () => [...entry.remedies].sort((a, b) => Number(b.grade) - Number(a.grade)),
    [entry.remedies]
  );
  const catColor = CATEGORY_COLORS[entry.symptomCategory] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: Math.min(index * 0.04, 0.3) },
      className: "rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden",
      "data-ocid": `repertory.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-start gap-4 p-5 text-left hover:bg-muted/20 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            "aria-expanded": open,
            "data-ocid": `repertory.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                        catColor
                      ),
                      children: entry.symptomCategory
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    entry.remedies.length,
                    " ",
                    entry.remedies.length === 1 ? "remedy" : "remedies"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground leading-snug", children: entry.symptomName }),
                entry.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed", children: entry.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: open ? 180 : 0 },
                  transition: { duration: 0.2 },
                  className: "flex-shrink-0 mt-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            style: { overflow: "hidden" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-3 pb-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Importance:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GradeIndicator, { grade: BigInt(3) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GradeIndicator, { grade: BigInt(2) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GradeIndicator, { grade: BigInt(1) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: sortedRemedies.map((remedy, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                RemedyRow,
                {
                  remedy,
                  index: ri
                },
                `${remedy.remedyId}-${ri}`
              )) })
            ] })
          },
          "body"
        ) })
      ]
    }
  );
}
function CategorySection({
  category,
  entries,
  startIndex
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": `repertory.section.${category.toLowerCase()}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground font-display", children: category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full", children: entries.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SymptomCard, { entry, index: startIndex + i }, entry.id)) })
  ] });
}
function RepertorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-64 mb-1.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full max-w-md" })
      ]
    },
    `skeleton-rep-${i + 1}`
  )) });
}
function SaveCaseModal({
  open,
  onClose,
  selectedSymptoms,
  matchingRemedies
}) {
  const [caseName, setCaseName] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const { mutate: saveCase, isPending } = useSaveCase();
  function handleSubmit(e) {
    e.preventDefault();
    if (!caseName.trim()) return;
    saveCase(
      {
        name: caseName.trim(),
        selectedSymptoms,
        clinicalNotes: notes.trim(),
        matchingRemedies
      },
      {
        onSuccess: () => {
          ue.success("Case saved to diary");
          setCaseName("");
          setNotes("");
          onClose();
        },
        onError: () => ue.error("Failed to save case")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "save_case.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Save Case Analysis" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "case-name", children: "Case Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "case-name",
            value: caseName,
            onChange: (e) => setCaseName(e.target.value),
            placeholder: "e.g. Patient A — Acute Fever",
            required: true,
            "data-ocid": "save_case.name_input"
          }
        )
      ] }),
      (selectedSymptoms.length > 0 || matchingRemedies.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3 space-y-2", children: [
        selectedSymptoms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide", children: [
            "Symptoms (",
            selectedSymptoms.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            selectedSymptoms.slice(0, 6).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs py-0 px-2",
                children: s
              },
              s
            )),
            selectedSymptoms.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs py-0 px-2 text-muted-foreground",
                children: [
                  "+",
                  selectedSymptoms.length - 6
                ]
              }
            )
          ] })
        ] }),
        matchingRemedies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide", children: [
            "Matching Remedies (",
            matchingRemedies.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            matchingRemedies.slice(0, 5).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs py-0 px-2",
                children: r
              },
              r
            )),
            matchingRemedies.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-xs py-0 px-2 text-muted-foreground",
                children: [
                  "+",
                  matchingRemedies.length - 5
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "case-notes", children: "Clinical Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "case-notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Observations, modalities, clinical context…",
            rows: 4,
            "data-ocid": "save_case.notes_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "save_case.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !caseName.trim() || isPending,
            "data-ocid": "save_case.submit_button",
            children: isPending ? "Saving…" : "Save Case"
          }
        )
      ] })
    ] })
  ] }) });
}
function EditCaseModal({
  open,
  onClose,
  savedCase
}) {
  const [name, setName] = reactExports.useState(savedCase.name);
  const [notes, setNotes] = reactExports.useState(savedCase.clinicalNotes);
  const { mutate: updateCase, isPending } = useUpdateCase();
  reactExports.useEffect(() => {
    setName(savedCase.name);
    setNotes(savedCase.clinicalNotes);
  }, [savedCase.name, savedCase.clinicalNotes]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    updateCase(
      { id: savedCase.id, name: name.trim(), clinicalNotes: notes.trim() },
      {
        onSuccess: () => {
          ue.success("Case updated");
          onClose();
        },
        onError: () => ue.error("Failed to update case")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "edit_case.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Case" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-case-name", children: "Case Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "edit-case-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            "data-ocid": "edit_case.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-case-notes", children: "Clinical Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "edit-case-notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            rows: 5,
            "data-ocid": "edit_case.notes_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "edit_case.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !name.trim() || isPending,
            "data-ocid": "edit_case.save_button",
            children: isPending ? "Saving…" : "Save Changes"
          }
        )
      ] })
    ] })
  ] }) });
}
function SavedCaseCard({
  savedCase,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(false);
  const { mutate: deleteCase, isPending: isDeleting } = useDeleteCase();
  function handleDelete() {
    deleteCase(savedCase.id, {
      onSuccess: () => {
        ue.success("Case deleted");
        setDeleteConfirm(false);
      },
      onError: () => ue.error("Failed to delete case")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.06 },
        className: "rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden",
        "data-ocid": `case_diary.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: savedCase.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                formatDate(savedCase.createdAt),
                " ·",
                " ",
                savedCase.selectedSymptoms.length,
                " symptom",
                savedCase.selectedSymptoms.length !== 1 ? "s" : "",
                " ·",
                " ",
                savedCase.matchingRemedies.length,
                " remed",
                savedCase.matchingRemedies.length !== 1 ? "ies" : "y"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                  onClick: () => setEditOpen(true),
                  "aria-label": "Edit case",
                  "data-ocid": `case_diary.edit_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-destructive",
                  onClick: () => setDeleteConfirm(true),
                  "aria-label": "Delete case",
                  "data-ocid": `case_diary.delete_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                  onClick: () => setExpanded((v) => !v),
                  "aria-label": expanded ? "Collapse" : "Expand",
                  "data-ocid": `case_diary.toggle.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: expanded ? 90 : 0 },
                      transition: { duration: 0.18 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
              style: { overflow: "hidden" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-border/60 space-y-3 pt-3", children: [
                savedCase.selectedSymptoms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: "Symptoms" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: savedCase.selectedSymptoms.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs py-0 px-2",
                      children: s
                    },
                    s
                  )) })
                ] }),
                savedCase.matchingRemedies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: "Matching Remedies" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: savedCase.matchingRemedies.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: r }, r)) })
                ] }),
                savedCase.clinicalNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide", children: "Clinical Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap", children: savedCase.clinicalNotes })
                ] })
              ] })
            },
            "detail"
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.18 },
              className: "border-t border-destructive/20 bg-destructive/5 px-4 py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mb-2.5", children: [
                  "Delete “",
                  savedCase.name,
                  "”? This cannot be undone."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      className: "h-7 text-xs",
                      onClick: handleDelete,
                      disabled: isDeleting,
                      "data-ocid": `case_diary.confirm_button.${index + 1}`,
                      children: isDeleting ? "Deleting…" : "Delete"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 text-xs",
                      onClick: () => setDeleteConfirm(false),
                      "data-ocid": `case_diary.cancel_button.${index + 1}`,
                      children: "Cancel"
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    editOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditCaseModal,
      {
        open: editOpen,
        onClose: () => setEditOpen(false),
        savedCase
      }
    )
  ] });
}
function CaseDiary({
  isAuthenticated,
  currentSymptoms,
  currentRemedies
}) {
  const [visible, setVisible] = reactExports.useState(false);
  const [saveOpen, setSaveOpen] = reactExports.useState(false);
  const [caseSearch, setCaseSearch] = reactExports.useState("");
  const { data: allCases = [], isLoading: casesLoading } = useMyCases();
  const { data: searchedCases } = useSearchCases(caseSearch);
  const displayCases = caseSearch.trim().length > 0 ? searchedCases ?? [] : allCases;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setVisible((v) => !v),
          className: "flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
          "data-ocid": "case_diary.toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4 text-primary" }),
            "Case Diary",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-border text-muted-foreground py-0",
                children: allCases.length
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: visible ? 90 : 0 },
                transition: { duration: 0.18 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground" })
              }
            )
          ]
        }
      ),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "gap-1.5 h-8 text-xs shadow-medical-sm",
          onClick: () => setSaveOpen(true),
          "data-ocid": "case_diary.save_analysis.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            "Save Analysis"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
        style: { overflow: "hidden" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/20 p-4 mb-6", children: !isAuthenticated ? (
          /* Login prompt */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center gap-3 py-8 text-center",
              "data-ocid": "case_diary.login_prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-foreground text-sm", children: "Login to use Case Diary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "Save and revisit case analyses with symptoms, clinical notes, and remedy snapshots." })
              ]
            }
          )
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: caseSearch,
                onChange: (e) => setCaseSearch(e.target.value),
                placeholder: "Search saved cases…",
                className: "h-9 pl-9 pr-9 text-sm bg-background",
                "data-ocid": "case_diary.search_input"
              }
            ),
            caseSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCaseSearch(""),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                "aria-label": "Clear",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          casesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-2",
              "data-ocid": "case_diary.loading_state",
              children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg border border-border bg-card p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3 mb-1.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
                  ]
                },
                i
              ))
            }
          ),
          !casesLoading && displayCases.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-2 py-8 text-center",
              "data-ocid": "case_diary.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-medium text-foreground", children: caseSearch ? "No cases found" : "No cases saved yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: caseSearch ? "Try a different search term." : 'Use "Save Analysis" to record a case and its matching remedies.' })
              ]
            }
          ),
          !casesLoading && displayCases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "case_diary.list", children: displayCases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SavedCaseCard, { savedCase: c, index: i }, c.id)) })
        ] }) })
      },
      "diary-panel"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SaveCaseModal,
      {
        open: saveOpen,
        onClose: () => setSaveOpen(false),
        selectedSymptoms: currentSymptoms,
        matchingRemedies: currentRemedies
      }
    )
  ] });
}
function RepertoryPage() {
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setDebouncedSearch(searchInput.trim()),
      350
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchInput]);
  const { data: allEntries = [], isLoading: allLoading } = useRepertoryEntries();
  const { data: searchResults = [], isLoading: searchLoading } = useSearchRepertory(debouncedSearch);
  const { mutate: seedMutate } = useSeedRepertory();
  reactExports.useEffect(() => {
    if (isAuthenticated && !allLoading && allEntries.length === 0) {
      seedMutate();
    }
  }, [isAuthenticated, allLoading, allEntries.length, seedMutate]);
  const isSearching = debouncedSearch.length > 2;
  const isLoading = isSearching ? searchLoading : allLoading;
  const baseEntries = isSearching ? searchResults : allEntries;
  const filteredEntries = reactExports.useMemo(() => {
    if (activeCategory === "All") return baseEntries;
    return baseEntries.filter((e) => e.symptomCategory === activeCategory);
  }, [baseEntries, activeCategory]);
  const grouped = reactExports.useMemo(() => {
    if (isSearching || activeCategory !== "All") return null;
    const map = {};
    for (const entry of filteredEntries) {
      const cat = entry.symptomCategory || "General";
      if (!map[cat]) map[cat] = [];
      map[cat].push(entry);
    }
    return map;
  }, [filteredEntries, isSearching, activeCategory]);
  const sectionStartIndexes = reactExports.useMemo(() => {
    if (!grouped) return {};
    let count = 0;
    const idx = {};
    for (const [cat, catEntries] of Object.entries(grouped)) {
      idx[cat] = count;
      count += catEntries.length;
    }
    return idx;
  }, [grouped]);
  const totalEntries = filteredEntries.length;
  const currentSymptoms = reactExports.useMemo(
    () => filteredEntries.map((e) => e.symptomName),
    [filteredEntries]
  );
  const currentRemedies = reactExports.useMemo(() => {
    const names = /* @__PURE__ */ new Set();
    for (const entry of filteredEntries) {
      for (const r of entry.remedies) {
        if (Number(r.grade) >= 2) names.add(r.remedyName);
      }
    }
    return Array.from(names).slice(0, 20);
  }, [filteredEntries]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "repertory.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "flex items-start gap-4 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-xl text-foreground font-display leading-tight", children: "Repertory" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground mt-0.5", children: "Find remedies by symptom — classical reverse lookup" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "relative max-w-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: searchInput,
                onChange: (e) => setSearchInput(e.target.value),
                placeholder: "Search symptoms, remedies, categories…",
                className: "pl-10 pr-10 h-11 bg-background border-input focus:border-primary transition-smooth",
                "data-ocid": "repertory.search_input"
              }
            ),
            searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearchInput(""),
                className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear search",
                "data-ocid": "repertory.clear_search_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        }
      ),
      searchInput.length > 0 && searchInput.length <= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 ml-0.5", children: "Type at least 3 characters to search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.22 },
          className: "mt-4 flex gap-2 flex-wrap",
          children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              className: cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeCategory === cat ? "bg-primary text-primary-foreground border-primary shadow-medical-sm" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              ),
              "data-ocid": `repertory.filter.${cat.toLowerCase()}`,
              children: cat
            },
            cat
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CaseDiary,
        {
          isAuthenticated,
          currentSymptoms,
          currentRemedies
        }
      ),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex items-center gap-2 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: totalEntries }),
              " ",
              "result",
              totalEntries !== 1 ? "s" : "",
              " for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground italic", children: [
                "“",
                debouncedSearch,
                "”"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: totalEntries }),
              " ",
              "symptom",
              totalEntries !== 1 ? "s" : "",
              activeCategory !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: activeCategory })
              ] })
            ] }) })
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "repertory.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RepertorySkeleton, {}) }),
      !isLoading && filteredEntries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
          "data-ocid": "repertory.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-md text-foreground font-display", children: isSearching ? "No symptoms found" : "No entries yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: isSearching ? `No symptoms matching "${debouncedSearch}". Try a different term.` : "Repertory data will appear here once seeded." }),
            isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearchInput(""),
                className: "text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
                "data-ocid": "repertory.clear_search_button",
                children: "Clear search"
              }
            )
          ]
        }
      ),
      !isLoading && isSearching && filteredEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "repertory.list", children: filteredEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SymptomCard,
        {
          entry,
          index: i,
          defaultOpen: filteredEntries.length <= 3
        },
        entry.id
      )) }),
      !isLoading && !isSearching && activeCategory !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "repertory.list", children: filteredEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SymptomCard, { entry, index: i }, entry.id)) }),
      !isLoading && !isSearching && activeCategory === "All" && grouped && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-10", "data-ocid": "repertory.list", children: Object.entries(grouped).map(([cat, catEntries]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategorySection,
        {
          category: cat,
          entries: catEntries,
          startIndex: sectionStartIndexes[cat] ?? 0
        },
        cat
      )) })
    ] })
  ] });
}
export {
  RepertoryPage as default
};
