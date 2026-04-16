import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, o as Presence, p as Primitive, q as useControllableState, s as useComposedRefs, t as composeEventHandlers, v as useSize, w as createContextScope, g as cn, x as Root, C as Content, y as Close, X, z as Title, A as Portal, O as Overlay, k as useQueryClient, u as useAuth, h as Search, b as BookOpen, B as Badge, a as Button, f as Skeleton } from "./index-DkGDOaWJ.js";
import { u as usePrevious, C as Check, a as ChevronDown } from "./index-VQXg3RX_.js";
import { I as Input } from "./input-BaWQGvME.js";
import { P as Plus, a as Pencil, T as Trash2, L as Label, b as Textarea } from "./textarea-B3eRLeTp.js";
import { u as ue } from "./index-BV_h6fwr.js";
import { u as useQuery } from "./backend-Cse0PRbs.js";
import { u as useMutation } from "./useMutation-BEAjBEet.js";
import { u as useBackend } from "./useBackend-DNKZsOVi.js";
import { m as motion } from "./proxy-Dd56LSHE.js";
import { C as Compass } from "./compass-Cxor_MdW.js";
import { A as AnimatePresence } from "./index-Bnt5fvol.js";
import { C as ChevronRight } from "./chevron-right-Bch4nWzA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$2);
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
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
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
function computeClassicalAnalysis(selectedEntries) {
  const allRemedyNames = /* @__PURE__ */ new Set();
  for (const entry of selectedEntries) {
    for (const r of entry.remedies) {
      allRemedyNames.add(r.remedyName);
    }
  }
  const scores = [];
  for (const name of allRemedyNames) {
    const grades = selectedEntries.map((entry) => {
      const match = entry.remedies.find((r) => r.remedyName === name);
      return match ? Number(match.grade) : 0;
    });
    const total = grades.reduce((a, b) => a + b, 0);
    if (total > 0) {
      scores.push({ remedyName: name, grades, total });
    }
  }
  return scores.sort((a, b) => b.total - a.total);
}
function GradeCell({ grade }) {
  if (grade === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-8 text-muted-foreground/40 text-sm font-mono", children: "—" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-0.5",
        grade === 3 ? "text-primary" : grade === 2 ? "text-muted-foreground" : "text-muted-foreground/60"
      ),
      title: grade === 3 ? "Grade 3 — Keynote" : grade === 2 ? "Grade 2 — Notable" : "Grade 1 — Minor",
      children: [1, 2, 3].map((dot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "inline-block w-2 h-2 rounded-full border",
            dot <= grade ? "bg-current border-current" : "border-current opacity-20"
          )
        },
        dot
      ))
    }
  );
}
function TotalScoreBadge({ score, rank }) {
  const isTop = rank === 0;
  const isSecond = rank === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-lg text-sm font-bold font-mono tabular-nums",
        isTop ? "bg-primary text-primary-foreground shadow-sm" : isSecond ? "bg-primary/20 text-primary" : "bg-muted text-foreground"
      ),
      children: score
    }
  );
}
function ClassicalAnalysisPanel({
  selectedEntries,
  onClear
}) {
  const scores = reactExports.useMemo(
    () => computeClassicalAnalysis(selectedEntries),
    [selectedEntries]
  );
  const rubricLabels = selectedEntries.map((e) => e.symptomName);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      className: "rounded-xl border border-primary/25 bg-card shadow-medical-sm overflow-hidden mb-8",
      "data-ocid": "analysis.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 bg-primary/5 border-b border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Classical Repertory Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-primary/30 text-primary py-0",
                children: [
                  selectedEntries.length,
                  " rubrics"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs text-muted-foreground hover:text-foreground gap-1.5",
              onClick: onClear,
              "data-ocid": "analysis.clear_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                "Clear selection"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border/60 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: "Selected Rubrics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background border border-border text-xs text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground font-semibold", children: [
                  "R",
                  i + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[160px] truncate", children: entry.symptomName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-xs px-1.5 py-0.5 rounded",
                      CATEGORY_COLORS[entry.symptomCategory] ?? "bg-muted text-muted-foreground border-border"
                    ),
                    children: entry.symptomCategory
                  }
                )
              ]
            },
            entry.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2.5 border-b border-border/40 flex items-center gap-5 text-xs text-muted-foreground bg-background/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium uppercase tracking-wide", children: "Grade key:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCell, { grade: 3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3 — Keynote (bold)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCell, { grade: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2 — Notable (italic)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCell, { grade: 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1 — Minor (plain)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 font-mono text-sm", children: "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Absent (0)" })
          ] })
        ] }),
        scores.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 py-10 text-center",
            "data-ocid": "analysis.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-8 h-8 text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-medium text-muted-foreground", children: "No remedies matched the selected rubrics" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "analysis.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 pl-5 pr-3 font-semibold text-xs text-muted-foreground uppercase tracking-wider w-8", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 font-semibold text-xs text-muted-foreground uppercase tracking-wider min-w-[160px]", children: "Remedy" }),
            rubricLabels.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-center py-3 px-2 font-semibold text-xs text-muted-foreground uppercase tracking-wider max-w-[80px]",
                title: label,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary/70", children: [
                  "R",
                  i + 1
                ] })
              },
              `col-${i + 1}`
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 pl-3 pr-5 font-semibold text-xs text-muted-foreground uppercase tracking-wider", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: scores.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.tr,
            {
              initial: { opacity: 0, x: -4 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.03, duration: 0.2 },
              className: cn(
                "border-b border-border/30 transition-colors",
                i === 0 ? "bg-primary/5 hover:bg-primary/8" : i === 1 ? "bg-primary/[0.02] hover:bg-muted/30" : "hover:bg-muted/20"
              ),
              "data-ocid": `analysis.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pl-5 pr-3 text-xs text-muted-foreground font-mono", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "font-medium",
                        i === 0 ? "text-foreground" : "text-foreground/80"
                      ),
                      children: row.remedyName
                    }
                  ),
                  i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "ml-2 text-[10px] py-0 px-1.5 border-primary/30 text-primary",
                      children: "Top"
                    }
                  )
                ] }),
                row.grades.map((g, gi) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "py-3 px-2 text-center",
                      "data-ocid": `analysis.grade.${i + 1}.${gi + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCell, { grade: g })
                    },
                    `grade-${row.remedyName}-${((_a = selectedEntries[gi]) == null ? void 0 : _a.id) ?? gi}`
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pl-3 pr-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TotalScoreBadge, { score: row.total, rank: i }) })
              ]
            },
            row.remedyName
          )) })
        ] }) }),
        scores.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Scores computed by classical sum-of-grades method — each remedy's grades across all selected rubrics are summed. Higher total = stronger indication." }) })
      ]
    }
  );
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
  defaultOpen = false,
  isSelected,
  onToggleSelect
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
      className: cn(
        "rounded-xl border bg-card shadow-medical-sm overflow-hidden transition-smooth",
        isSelected ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
      ),
      "data-ocid": `repertory.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-5 pt-5 pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-shrink-0 mt-0.5 pt-0.5",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `rubric-${entry.id}`,
                  checked: isSelected,
                  onCheckedChange: () => onToggleSelect(entry),
                  "aria-label": `Select rubric: ${entry.symptomName}`,
                  className: cn("border-border", isSelected && "border-primary"),
                  "data-ocid": `repertory.checkbox.${index + 1}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpen((v) => !v),
              className: "flex-1 flex items-start gap-4 text-left pb-5 hover:bg-transparent focus-visible:outline-none",
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
                    ] }),
                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] py-0 px-1.5 border-primary/40 text-primary",
                        children: "Rubric selected"
                      }
                    )
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
          )
        ] }),
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
  startIndex,
  selectedIds,
  onToggleSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": `repertory.section.${category.toLowerCase()}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground font-display", children: category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full", children: entries.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SymptomCard,
      {
        entry,
        index: startIndex + i,
        isSelected: selectedIds.has(entry.id),
        onToggleSelect
      },
      entry.id
    )) })
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/20 p-4 mb-6", children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
function SelectionBar({
  count,
  onAnalyze,
  onClear
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 12 },
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      className: "sticky top-2 z-10 mb-5",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 bg-card border border-primary/30 rounded-xl shadow-medical px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold font-mono", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: count === 1 ? "1 rubric selected — select more for multi-rubric analysis" : `${count} rubrics selected` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 text-xs text-muted-foreground",
              onClick: onClear,
              "data-ocid": "repertory.clear_rubrics_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1" }),
                "Clear"
              ]
            }
          ),
          count >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 gap-1.5 text-xs",
              onClick: onAnalyze,
              "data-ocid": "repertory.analyze_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5" }),
                "Analyse"
              ]
            }
          )
        ] })
      ] })
    }
  ) });
}
function RepertoryPage() {
  const { isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showAnalysis, setShowAnalysis] = reactExports.useState(false);
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
  function handleToggleSelect(entry) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(entry.id)) {
        next.delete(entry.id);
      } else {
        next.add(entry.id);
      }
      return next;
    });
    setShowAnalysis(false);
  }
  function handleClearSelection() {
    setSelectedIds(/* @__PURE__ */ new Set());
    setShowAnalysis(false);
  }
  const selectedEntries = reactExports.useMemo(
    () => allEntries.filter((e) => selectedIds.has(e.id)),
    [allEntries, selectedIds]
  );
  const currentSymptoms = reactExports.useMemo(
    () => showAnalysis && selectedEntries.length >= 2 ? selectedEntries.map((e) => e.symptomName) : filteredEntries.map((e) => e.symptomName),
    [filteredEntries, selectedEntries, showAnalysis]
  );
  const currentRemedies = reactExports.useMemo(() => {
    const source = showAnalysis && selectedEntries.length >= 2 ? selectedEntries : filteredEntries;
    const names = /* @__PURE__ */ new Set();
    for (const entry of source) {
      for (const r of entry.remedies) {
        if (Number(r.grade) >= 2) names.add(r.remedyName);
      }
    }
    return Array.from(names).slice(0, 20);
  }, [filteredEntries, selectedEntries, showAnalysis]);
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-base text-muted-foreground mt-0.5", children: "Select rubrics (symptoms) and run classical sum-of-grades analysis" })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectionBar,
        {
          count: selectedIds.size,
          onAnalyze: () => setShowAnalysis(true),
          onClear: handleClearSelection
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAnalysis && selectedEntries.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClassicalAnalysisPanel,
        {
          selectedEntries,
          onClear: handleClearSelection
        }
      ) }),
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
              ] }),
              selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                  selectedIds.size,
                  " rubric",
                  selectedIds.size !== 1 ? "s" : "",
                  " selected — check boxes to add more"
                ] })
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
          defaultOpen: filteredEntries.length <= 3,
          isSelected: selectedIds.has(entry.id),
          onToggleSelect: handleToggleSelect
        },
        entry.id
      )) }),
      !isLoading && !isSearching && activeCategory !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", "data-ocid": "repertory.list", children: filteredEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SymptomCard,
        {
          entry,
          index: i,
          isSelected: selectedIds.has(entry.id),
          onToggleSelect: handleToggleSelect
        },
        entry.id
      )) }),
      !isLoading && !isSearching && activeCategory === "All" && grouped && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-10", "data-ocid": "repertory.list", children: Object.entries(grouped).map(([cat, catEntries]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategorySection,
        {
          category: cat,
          entries: catEntries,
          startIndex: sectionStartIndexes[cat] ?? 0,
          selectedIds,
          onToggleSelect: handleToggleSelect
        },
        cat
      )) })
    ] })
  ] });
}
export {
  RepertoryPage as default
};
