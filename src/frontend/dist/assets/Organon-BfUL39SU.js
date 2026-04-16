import { c as createLucideIcon, k as useQueryClient, r as reactExports, u as useAuth, j as jsxRuntimeExports, b as BookOpen, h as Search, X, g as cn, f as Skeleton, B as Badge } from "./index-DkGDOaWJ.js";
import { I as Input } from "./input-BaWQGvME.js";
import { u as useQuery } from "./backend-Cse0PRbs.js";
import { u as useMutation } from "./useMutation-BEAjBEet.js";
import { u as useBackend } from "./useBackend-DNKZsOVi.js";
import { m as motion } from "./proxy-Dd56LSHE.js";
import { A as AnimatePresence } from "./index-Bnt5fvol.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M13 8H7", key: "14i4kc" }],
  ["path", { d: "M17 12H7", key: "16if0g" }]
];
const MessageSquareText = createLucideIcon("message-square-text", __iconNode);
const SEED_APHORISMS = [
  {
    id: BigInt(1),
    number: BigInt(1),
    section: "Introduction",
    authenticText: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
    commentary: "Hahnemann opens by defining the physician's singular purpose — not to theorise, not to merely palliate, but to truly restore health. This sets the ethical foundation for all homoeopathic practice.",
    keyThemes: ["Mission of Physician", "Cure", "Health"]
  },
  {
    id: BigInt(2),
    number: BigInt(2),
    section: "Introduction",
    authenticText: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
    commentary: "The 'ideal of cure' — rapid, gentle, permanent — is the benchmark against which every prescription should be measured. Hahnemann insists that the cure must be grounded in clear, understandable principles, not empirical guesswork.",
    keyThemes: ["Ideal of Cure", "Rapid Gentle Permanent", "Principles"]
  },
  {
    id: BigInt(3),
    number: BigInt(3),
    section: "Introduction",
    authenticText: "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease; if he clearly perceives what is curative in medicines, that is to say, in each individual medicine; and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must ensue — then the physician truly understands how to practise medicine.",
    commentary: "This aphorism defines the three pillars of the practitioner's art: (1) understanding the disease in the individual, (2) knowing the curative action of medicines, (3) skillfully matching the two. Together these form the complete philosophy of homoeopathic prescribing.",
    keyThemes: ["Three Pillars", "Individualisation", "Prescribing"]
  },
  {
    id: BigInt(4),
    number: BigInt(4),
    section: "Introduction",
    authenticText: "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.",
    commentary: "Hahnemann extends the physician's role beyond cure to prevention. Knowledge of the factors that disturb health — diet, lifestyle, environment — is equally part of medical competence.",
    keyThemes: ["Prevention", "Health Preservation", "Causative Factors"]
  },
  {
    id: BigInt(5),
    number: BigInt(5),
    section: "Part I",
    authenticText: "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm.",
    commentary: "The case-taking process must uncover the exciting cause of acute illness and the fundamental cause (miasm) of chronic disease. Hahnemann introduces the concept of miasms here — the underlying disease taints that drive chronic pathology.",
    keyThemes: ["Case Taking", "Exciting Cause", "Miasm", "Chronic Disease"]
  },
  {
    id: BigInt(6),
    number: BigInt(6),
    section: "Part I",
    authenticText: "The unprejudiced observer — well aware of the futility of transcendental speculations which can receive no confirmation from experience — be his powers of observation ever so acute, takes note of nothing in every individual disease, except the changes in the health of the body and of the mind which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual.",
    commentary: "Hahnemann champions pure empirical observation free from theoretical bias. The physician must note only what is perceptible — the totality of symptoms as expressed by the patient — rather than imposing hypothetical pathological theories.",
    keyThemes: ["Observation", "Totality of Symptoms", "Empiricism"]
  },
  {
    id: BigInt(7),
    number: BigInt(7),
    section: "Part I",
    authenticText: "Now, as in a disease, from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed, we can perceive nothing but the morbid symptoms, it must be the symptoms alone by which the disease demands and points to the remedy suited to it.",
    commentary: "Since the disease is known only through its symptoms, the symptoms alone guide prescribing. There is no hidden pathology that the physician must guess at — the symptoms are the disease, for practical prescribing purposes.",
    keyThemes: ["Symptoms as Guide", "Simillimum", "Prescribing Basis"]
  },
  {
    id: BigInt(8),
    number: BigInt(8),
    section: "Part I",
    authenticText: "It is not conceivable, nor can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire morbid condition, there should or could remain some other distinct morbid state in the body.",
    commentary: "When all symptoms are removed, the disease is removed. There is no separate underlying pathological entity apart from what is expressed through symptoms. Symptom removal equals disease removal.",
    keyThemes: ["Symptoms = Disease", "Totality", "Cure"]
  },
  {
    id: BigInt(9),
    number: BigInt(9),
    section: "Part I",
    authenticText: "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions, so that our indwelling, reason-gifted mind can freely employ this living, healthy instrument for the higher purposes of our existence.",
    commentary: "Here Hahnemann introduces the Vital Force — the non-material, dynamic principle that governs all life functions. In health, it maintains harmony of sensation and function, enabling the mind to pursue higher human purposes.",
    keyThemes: ["Vital Force", "Health", "Dynamis", "Harmony"]
  },
  {
    id: BigInt(10),
    number: BigInt(10),
    section: "Part I",
    authenticText: "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) which animates the material organism in health.",
    commentary: "The body without the Vital Force is inert matter. All biological functions — sensation, movement, self-repair — are the expressions of this immaterial animating principle, not of the chemistry alone.",
    keyThemes: ["Vital Force", "Life Functions", "Immaterial Principle"]
  },
  {
    id: BigInt(11),
    number: BigInt(11),
    section: "Part I",
    authenticText: "When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease.",
    commentary: "Disease begins with a dynamic (non-material) disturbance of the Vital Force, not with material lesions. The morbific agent disturbs the Vital Force, which then manifests disease symptoms in the organism. This is the homoeopathic theory of pathogenesis.",
    keyThemes: ["Disease Origin", "Vital Force Derangement", "Dynamic Cause"]
  },
  {
    id: BigInt(12),
    number: BigInt(12),
    section: "Part I",
    authenticText: "It is the morbidly affected vital energy alone that produces diseases, so that the morbid phenomena perceptible to our senses express at the same time all the internal changes, that is to say, the whole morbid derangement of the internal dynamis.",
    commentary: "The externally perceptible symptoms are the complete and faithful expression of the internal derangement of the Vital Force. This justifies basing the entire prescription on symptoms alone — there is nothing more to know.",
    keyThemes: ["Vital Force", "Symptoms Express Internal Disease", "Dynamis"]
  },
  {
    id: BigInt(13),
    number: BigInt(13),
    section: "Part I",
    authenticText: "Therefore disease (that does not come within the province of manual surgery) considered, as it is by the allopathists, as a thing separate from the living whole, from the organism and its animating vital force, and hidden in the interior, is an absurdity.",
    commentary: "A direct critique of the allopathic view of disease as a localised, material entity separate from the whole person. For Hahnemann, disease is a dynamic disturbance of the whole organism — not a lesion to be cut out or chemically suppressed.",
    keyThemes: ["Critique of Allopathy", "Holism", "Dynamic Disease"]
  },
  {
    id: BigInt(14),
    number: BigInt(14),
    section: "Part I",
    authenticText: "There is, in the interior of man, nothing morbid that is curable and no invisible morbid alteration that is curable which does not make itself known to the accurately observing physician by means of morbid signs and symptoms.",
    commentary: "Every curable disease makes itself known through symptoms. If something cannot be perceived as a symptom, it cannot be treated homoeopathically. This principle focuses the physician's attention on what is observable and real.",
    keyThemes: [
      "Symptoms as Disease Expression",
      "Observation",
      "Curable Disease"
    ]
  },
  {
    id: BigInt(15),
    number: BigInt(15),
    section: "Part I",
    authenticText: "The suffering of the morbidly affected vital energy and the disease symptoms thereby produced constitute an inseparable whole — they are one and the same.",
    commentary: "A succinct summary of the relationship between Vital Force derangement and symptoms: they are not cause and effect but one unified reality. To address the symptoms is to address the deranged Vital Force.",
    keyThemes: ["Vital Force", "Symptoms", "Unity of Disease"]
  },
  {
    id: BigInt(16),
    number: BigInt(16),
    section: "Part I",
    authenticText: "Our vital force, as a spirit-like dynamis, cannot be attacked and affected by injurious influences on the healthy organism caused by the external inimical forces that disturb the harmonious play of life, otherwise than in a spirit-like (dynamic, virtual) manner.",
    commentary: "The Vital Force, being immaterial, can only be influenced by dynamic (not material) forces. This is why medicines must be prepared dynamically (potentised) to act curatively — they act on the same plane as the Vital Force itself.",
    keyThemes: ["Dynamic Action", "Potentisation", "Vital Force"]
  },
  {
    id: BigInt(17),
    number: BigInt(17),
    section: "Part I",
    authenticText: "Now, as in the cure of disease we have to do only with the symptoms of the disease, it is in the nature of things that the physician must pay attention to the symptoms of the disease in order to cure it, inasmuch as the disease is known to us by nothing but its symptoms.",
    commentary: "The practical conclusion flows naturally from the theory: the physician's entire attention must be directed to symptoms, because symptoms are the only knowable expression of disease.",
    keyThemes: ["Symptom-Based Practice", "Practical Prescribing"]
  },
  {
    id: BigInt(18),
    number: BigInt(18),
    section: "Part I",
    authenticText: "It is a matter of experience, that medicines can only cure similar sufferings — similia similibus curantur.",
    commentary: "The Law of Similars stated plainly: medicines cure similar sufferings. This is empirically grounded — Hahnemann discovered it through provings and centuries of accidental observation. 'Like cures like' (similia similibus curantur) is the keystone of homoeopathy.",
    keyThemes: [
      "Law of Similars",
      "Similia Similibus Curantur",
      "Core Principle"
    ]
  },
  {
    id: BigInt(19),
    number: BigInt(19),
    section: "Part I",
    authenticText: "Now, as diseases are nothing more than alterations in the state of health of the healthy individual which express themselves by morbid signs, and the cure is also only possible by a change to the healthy condition of the state of health of the diseased individual, it is very evident, that medicines could never cure diseases if they did not possess the power of altering man's state of health.",
    commentary: "Medicines are curative precisely because they can alter the state of health. They do not act chemically in the narrow sense — they produce changes in the dynamic state, and it is through this capacity that they cure.",
    keyThemes: ["Medicine Action", "Health Alteration", "Dynamic Power"]
  },
  {
    id: BigInt(20),
    number: BigInt(20),
    section: "Part I",
    authenticText: "This spirit-like power to alter man's state of health (and hence to cure diseases) which lies hidden in the inner nature of medicines, can never be discovered by us by a mere inspection of their material nature; only experience can reveal it.",
    commentary: "The curative power of medicines cannot be predicted from chemistry or physical inspection — it must be discovered empirically, through provings on healthy human subjects. This is Hahnemann's call for systematic drug testing.",
    keyThemes: ["Drug Proving", "Empiricism", "Hidden Medicine Power"]
  },
  {
    id: BigInt(21),
    number: BigInt(21),
    section: "Part I",
    authenticText: "Now, as it is undeniable that the curative principle in medicines is not in itself perceptible, and as in pure experiments with medicines conducted by the most accurate observers, nothing can be observed that can constitute them medicines or remedies except their property of each producing peculiar alterations in the state of health of the human body, it follows that when medicines act as remedies, they can only bring their curative property into play by this their power of altering man's health.",
    commentary: "The only medical property of a drug that can be observed is its capacity to alter human health. The proving experiment reveals this. There is no hidden essence separate from the symptom-producing action that makes it a remedy.",
    keyThemes: ["Drug Proving", "Curative Property", "Symptom Production"]
  },
  {
    id: BigInt(22),
    number: BigInt(22),
    section: "Part I",
    authenticText: "But this remarkable — some say inexplicable — power of medicines to alter the health of man — which enables medicines to cure disease — is only exercised when medicines encounter a susceptible organism.",
    commentary: "The dynamic action of a medicine only occurs when it encounters a susceptible organism. This explains why the same medicine does not affect everyone the same way and why individual susceptibility is central to case-taking.",
    keyThemes: ["Susceptibility", "Dynamic Medicine", "Individual Response"]
  },
  {
    id: BigInt(23),
    number: BigInt(23),
    section: "Part I",
    authenticText: "Of all things possible to medicines, only two are available against diseases: either a medicine may excite an opposite condition (contraria contrariis) to the symptom to be removed, which is the allopathic method; or it may excite a condition very similar to the disease.",
    commentary: "Hahnemann systematically presents two possible therapeutic strategies: contraries (the allopathic method) and similars (the homoeopathic method). He will proceed to demonstrate that only similars produce true and permanent cure.",
    keyThemes: ["Contraria vs Similia", "Therapeutic Methods", "Comparison"]
  },
  {
    id: BigInt(24),
    number: BigInt(24),
    section: "Part I",
    authenticText: "There is no third mode of treatment.",
    commentary: "A deceptively simple statement. Hahnemann insists there are only two logical approaches to therapeutics. This binary framing forces a clear choice: medicine can only act by contraries or by similars.",
    keyThemes: ["Two Methods", "No Third Way", "Therapeutic Logic"]
  },
  {
    id: BigInt(25),
    number: BigInt(25),
    section: "Part I",
    authenticText: "In the first mode (contraria contrariis), the mere palliative and antagonistic method, the medicine employed opposes the symptoms with its contrary effects and thus temporarily suppresses the condition, but at the expense of the Vital Force which is thereby weakened and the disease made chronic.",
    commentary: "Suppression by contraries — antipyretics for fever, laxatives for constipation — produces only temporary relief. Worse, it weakens the Vital Force and drives the disease deeper, making it chronic. This is a critique of symptomatic allopathic treatment.",
    keyThemes: [
      "Suppression",
      "Palliation",
      "Contraria",
      "Vital Force Weakening"
    ]
  },
  {
    id: BigInt(26),
    number: BigInt(26),
    section: "Part II",
    authenticText: "This natural law of cure, which has been confirmed in every pure experiment and every true observation in the world — similia similibus curantur — on which the whole of pure homoeopathy is founded.",
    commentary: "The Law of Similars is not a hypothesis — it is a law confirmed by every accurate experiment and observation. Homoeopathy is founded entirely on this empirically verified natural principle.",
    keyThemes: ["Law of Similars", "Natural Law", "Foundation of Homoeopathy"]
  },
  {
    id: BigInt(27),
    number: BigInt(27),
    section: "Part II",
    authenticText: "The curative power of medicines, therefore, depends on their symptoms similar to the disease but superior to it in strength, so that each individual case of disease is most surely, radically, rapidly and permanently annihilated and removed only by a medicine capable of producing in the most similar and complete manner the totality of its symptoms.",
    commentary: "The simillimum — the most similar medicine — is the one that produces the complete totality of disease symptoms, and in a slightly stronger degree. Its superiority in strength allows it to overcome and annihilate the disease.",
    keyThemes: [
      "Simillimum",
      "Totality",
      "Superiority of Medicine",
      "Rapid Cure"
    ]
  },
  {
    id: BigInt(28),
    number: BigInt(28),
    section: "Part II",
    authenticText: "As this natural law of cure manifests itself in every pure experiment and every careful observation, it is beyond all experience.",
    commentary: "The Law of Similars transcends individual experimental results — it is a universal principle of nature. Every careful experiment confirms it; it has never been genuinely falsified by accurate observation.",
    keyThemes: ["Law of Similars", "Universal Principle", "Natural Law"]
  },
  {
    id: BigInt(29),
    number: BigInt(29),
    section: "Part II",
    authenticText: "Every powerful medicinal substance produces in the human body a peculiar kind of disease; the more powerful the medicine, the more peculiar, marked, and violent the disease.",
    commentary: "Powerful medicines produce marked and characteristic diseases in healthy subjects (provings). This is the empirical basis of the Materia Medica — each drug's peculiar symptom-picture becomes the guide for its curative application.",
    keyThemes: ["Drug Proving", "Characteristic Symptoms", "Materia Medica"]
  },
  {
    id: BigInt(30),
    number: BigInt(30),
    section: "Part II",
    authenticText: "The human body appears to admit of being much more powerfully affected in its health by medicines (partly because we have the regulation of the dose in our own power) than by morbific agents.",
    commentary: "Medicines can be more precisely and powerfully administered than natural disease agents, especially since we control the dose. This gives homoeopathic medicine a decisive therapeutic advantage over disease when correctly applied.",
    keyThemes: ["Dose Control", "Medicine vs Disease", "Therapeutic Advantage"]
  }
];
function useAphorisms() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["organon", "all"],
    queryFn: async () => {
      if (!backend) return SEED_APHORISMS;
      try {
        const result = await backend.listAphorisms();
        return result.length > 0 ? result : SEED_APHORISMS;
      } catch {
        return SEED_APHORISMS;
      }
    },
    enabled: !backendLoading,
    staleTime: 10 * 60 * 1e3
  });
}
function useSearchAphorisms(searchTerm) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["organon", "search", searchTerm],
    queryFn: async () => {
      const lower = searchTerm.toLowerCase();
      if (!backend) {
        return SEED_APHORISMS.filter(
          (a) => a.authenticText.toLowerCase().includes(lower) || a.commentary.toLowerCase().includes(lower) || a.keyThemes.some((t) => t.toLowerCase().includes(lower))
        );
      }
      try {
        const result = await backend.searchAphorisms(searchTerm);
        return result.length > 0 ? result : SEED_APHORISMS.filter(
          (a) => a.authenticText.toLowerCase().includes(lower) || a.commentary.toLowerCase().includes(lower) || a.keyThemes.some((t) => t.toLowerCase().includes(lower))
        );
      } catch {
        return SEED_APHORISMS.filter(
          (a) => a.authenticText.toLowerCase().includes(lower) || a.commentary.toLowerCase().includes(lower) || a.keyThemes.some((t) => t.toLowerCase().includes(lower))
        );
      }
    },
    enabled: !backendLoading && searchTerm.trim().length > 2,
    staleTime: 2 * 60 * 1e3
  });
}
function useSeedOrganon() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) return;
      try {
        await backend.seedOrganon();
      } catch {
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organon"] });
    }
  });
}
const SECTIONS = [
  "All",
  "Introduction",
  "Part I",
  "Part II",
  "Part III",
  "Part IV"
];
const SECTION_COLORS = {
  Introduction: "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20",
  "Part I": "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "Part II": "bg-chart-3/15 text-chart-3 border-chart-3/30",
  "Part III": "bg-chart-4/15 text-chart-4 border-chart-4/30",
  "Part IV": "bg-chart-5/15 text-chart-5 border-chart-5/30"
};
function getSectionColor(section) {
  return SECTION_COLORS[section] ?? "bg-muted text-muted-foreground border-border";
}
function ThemeChip({ theme }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15", children: theme });
}
function AphorismCard({
  aphorism,
  index
}) {
  const num = Number(aphorism.number);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: Math.min(index * 0.025, 0.5), duration: 0.3 },
      className: "relative",
      "data-ocid": `organon.aphorism.${num}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 pr-4 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-4xl font-bold leading-none text-primary/40 dark:text-primary/30 tracking-tighter", children: [
              "§",
              num
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-[10px] uppercase tracking-wider font-semibold mb-2 border",
                    getSectionColor(aphorism.section)
                  ),
                  children: aphorism.section
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "blockquote",
                {
                  className: "text-base leading-[1.8] text-foreground/90 italic font-body pl-1",
                  "data-ocid": `organon.authentic_text.${num}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "not-italic text-primary font-semibold mr-1", children: [
                      "§",
                      num,
                      "."
                    ] }),
                    aphorism.authenticText
                  ]
                }
              ),
              aphorism.keyThemes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children: aphorism.keyThemes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeChip, { theme: t }, t)) })
            ] })
          ] }),
          aphorism.commentary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "ml-14 rounded-xl bg-muted/60 border border-border/70 p-4",
              "data-ocid": `organon.commentary.${num}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareText, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest font-semibold text-muted-foreground", children: "Student Commentary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/80 font-body", children: aphorism.commentary })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-border to-transparent mx-6" })
      ]
    }
  );
}
function OrganonSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", "data-ocid": "organon.loading_state", children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 pr-4 py-5 border-b border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-10 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }) })
  ] }, k)) });
}
function EmptyState({ searchTerm }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
      "data-ocid": "organon.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-md text-foreground font-display", children: searchTerm ? "No aphorisms found" : "Organon text coming soon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground max-w-xs", children: searchTerm ? `No aphorisms match "${searchTerm}". Try different keywords.` : "The full Organon of Medicine will appear here once seeded." })
      ]
    }
  );
}
function OrgononPage() {
  const [search, setSearch] = reactExports.useState("");
  const [sectionFilter, setSectionFilter] = reactExports.useState("All");
  const { isAuthenticated } = useAuth();
  const { mutate: seedOrganon } = useSeedOrganon();
  const isSearching = search.trim().length > 2;
  const { data: allAphorisms = [], isLoading: loadingAll } = useAphorisms();
  const { data: searchResults = [], isLoading: loadingSearch } = useSearchAphorisms(search.trim());
  reactExports.useEffect(() => {
    if (isAuthenticated && allAphorisms.length === 0) seedOrganon();
  }, [isAuthenticated, allAphorisms.length, seedOrganon]);
  const isLoading = isSearching ? loadingSearch : loadingAll;
  const displayed = reactExports.useMemo(() => {
    const base = isSearching ? searchResults : allAphorisms;
    if (sectionFilter === "All") return base;
    return base.filter((a) => a.section === sectionFilter);
  }, [isSearching, searchResults, allAphorisms, sectionFilter]);
  const totalCount = allAphorisms.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "organon.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-5xl py-7 sm:py-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-medical-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-display-xl text-foreground font-display",
                  "data-ocid": "organon.title",
                  children: "Organon of Medicine"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground ml-14", children: "Samuel Hahnemann's Organon of Medicine — 6th Edition · Full authentic text with student commentary" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-5 max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search aphorisms, themes, concepts…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-10 pr-10 bg-background border-input",
            "data-ocid": "organon.search_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, scale: 0.7 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.7 },
            onClick: () => setSearch(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "Clear search",
            "data-ocid": "organon.search_clear.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2 mt-4",
          "data-ocid": "organon.section_filters",
          children: SECTIONS.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSectionFilter(sec),
              className: cn(
                "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-medium border transition-smooth cursor-pointer",
                sectionFilter === sec ? "bg-primary text-primary-foreground border-primary shadow-medical-sm" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              ),
              "data-ocid": `organon.filter.${sec.toLowerCase().replace(/\s+/g, "_")}`,
              children: sec
            },
            sec
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-5xl py-8", children: [
      !isLoading && displayed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground mb-4", children: isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        displayed.length,
        " result",
        displayed.length !== 1 ? "s" : "",
        " for “",
        search.trim(),
        "”"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: displayed.length }),
        " ",
        "aphorism",
        displayed.length !== 1 ? "s" : "",
        sectionFilter !== "All" && ` in ${sectionFilter}`
      ] }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(OrganonSkeleton, {}) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { searchTerm: search.trim() }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.25 },
          className: "rounded-xl border border-border bg-card shadow-medical-sm overflow-hidden",
          "data-ocid": "organon.aphorism_list",
          children: [
            displayed.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AphorismCard, { aphorism: a, index: i }, String(a.id))),
            !isSearching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-2 py-8 px-6 bg-muted/30",
                "data-ocid": "organon.more_notice",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                      "Showing §1–§",
                      totalCount,
                      " of 291 aphorisms"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center max-w-sm", children: [
                    "The remaining aphorisms (§",
                    totalCount + 1,
                    "–§291) are being prepared and will be added soon. Check back for the complete Organon of Medicine."
                  ] })
                ]
              }
            )
          ]
        },
        `${sectionFilter}-${search}`
      )
    ] })
  ] });
}
export {
  OrgononPage as default
};
