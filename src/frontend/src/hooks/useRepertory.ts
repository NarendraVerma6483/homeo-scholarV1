import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RepertoryEntry } from "../backend.d";
import { useBackend } from "./useBackend";

// Comprehensive seed data for the Repertory
const SEED_REPERTORY: RepertoryEntry[] = [
  // MIND
  {
    id: "mind-anxiety-health",
    symptomCategory: "Mind",
    symptomName: "Anxiety about health",
    description:
      "Excessive fear and worry about one's health status; hypochondriacal tendencies",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Intense fear of death, disease; restless anxiety",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Fear of insanity, observation; overwhelmed",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(1),
        notes: "Oversensitive, irritable hypochondriac",
      },
    ],
  },
  {
    id: "mind-irritability",
    symptomCategory: "Mind",
    symptomName: "Irritability and anger",
    description:
      "Quick temper, oversensitivity to noise, touch or criticism; impatience",
    remedies: [
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Fault-finding, competitive, cannot bear contradiction",
      },
      {
        remedyId: "chamomilla",
        remedyName: "Chamomilla",
        grade: BigInt(3),
        notes: "Uncivil, snappish; nothing satisfies",
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(2),
        notes: "Irritable when disturbed, wants to be left alone",
      },
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(1),
        notes: "Philosophical irritability; egotistical",
      },
    ],
  },
  {
    id: "mind-grief",
    symptomCategory: "Mind",
    symptomName: "Grief and sadness",
    description:
      "Deep sorrow, prolonged grief after loss, tendency to suppress emotions",
    remedies: [
      {
        remedyId: "ignatia",
        remedyName: "Ignatia Amara",
        grade: BigInt(3),
        notes: "Acute grief, sighing, contradictory symptoms",
      },
      {
        remedyId: "nat-mur",
        remedyName: "Natrum Muriaticum",
        grade: BigInt(3),
        notes: "Chronic grief, consolation aggravates, brooding",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Weeps easily, desires consolation",
      },
      {
        remedyId: "aurum-met",
        remedyName: "Aurum Metallicum",
        grade: BigInt(2),
        notes: "Deep despondency, suicidal tendency from grief",
      },
    ],
  },
  // HEAD
  {
    id: "head-throbbing-headache",
    symptomCategory: "Head",
    symptomName: "Throbbing headache",
    description:
      "Pulsating, pounding headache often with congestion; worse from motion or light",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Violent throbbing; hot red face; worse light, jarring",
      },
      {
        remedyId: "glonoin",
        remedyName: "Gloninum",
        grade: BigInt(3),
        notes: "Bursting, pulsating; rises up like waves",
      },
      {
        remedyId: "nat-mur",
        remedyName: "Natrum Muriaticum",
        grade: BigInt(2),
        notes: "Hammering headache from sunrise to sunset",
      },
      {
        remedyId: "ferrum-phos",
        remedyName: "Ferrum Phosphoricum",
        grade: BigInt(1),
        notes: "Congestive headache in early stages",
      },
    ],
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
        notes: "Heavy, dull occipital pain extending to forehead",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Occipital headache from overwork and stimulants",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(1),
        notes: "Cold, damp head; headache from mental exertion",
      },
    ],
  },
  // FEVER
  {
    id: "fever-sudden-onset",
    symptomCategory: "Fever",
    symptomName: "Sudden onset high fever",
    description:
      "Abrupt rise of temperature, often with chills, heat and restlessness",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Sudden violent fever; hot dry skin; no thirst",
      },
      {
        remedyId: "aconite",
        remedyName: "Aconitum Napellus",
        grade: BigInt(3),
        notes: "After exposure to cold wind; fear, restlessness",
      },
      {
        remedyId: "ferrum-phos",
        remedyName: "Ferrum Phosphoricum",
        grade: BigInt(2),
        notes: "Early febrile stage; no localizing symptoms",
      },
    ],
  },
  {
    id: "fever-chills",
    symptomCategory: "Fever",
    symptomName: "Chills and shivering",
    description:
      "Marked coldness and shaking chills, often alternating with heat",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Chills at 1 AM; burning internally but chilly",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Chilly; cannot get warm; worse uncovering",
      },
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(2),
        notes: "Chills from uncovering; rheumatic complaints with fever",
      },
      {
        remedyId: "gelsemium",
        remedyName: "Gelsemium",
        grade: BigInt(2),
        notes: "Chills running up the back; anticipatory fever",
      },
    ],
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
        notes: "Persistent nausea not relieved by vomiting; clean tongue",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Nausea from overindulgence; ineffectual retching",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Nausea from fatty foods; better in open air",
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Nausea with anxiety; food poisoning",
      },
    ],
  },
  {
    id: "stomach-bloating-flatulence",
    symptomCategory: "Stomach",
    symptomName: "Bloating and flatulence",
    description:
      "Abdominal distension, trapped gas, rumbling and discomfort after eating",
    remedies: [
      {
        remedyId: "lycopodium",
        remedyName: "Lycopodium Clavatum",
        grade: BigInt(3),
        notes: "Immediate bloating after smallest meal; worse 4–8 PM",
      },
      {
        remedyId: "carbo-veg",
        remedyName: "Carbo Vegetabilis",
        grade: BigInt(3),
        notes: "Extreme flatulence; wants to be fanned",
      },
      {
        remedyId: "china",
        remedyName: "China Officinalis",
        grade: BigInt(2),
        notes: "Flatulence not relieved by passing gas",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Bloating 1–2 hours after eating; sour belching",
      },
    ],
  },
  // RESPIRATORY
  {
    id: "respiratory-dry-cough",
    symptomCategory: "Respiratory",
    symptomName: "Dry, barking cough",
    description:
      "Hard, dry cough without expectoration; worse at night or on lying down",
    remedies: [
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Dry cough; must hold chest; worse motion; thirst",
      },
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(2),
        notes: "Spasmodic dry cough; worse night; laryngeal irritation",
      },
      {
        remedyId: "phosphorus",
        remedyName: "Phosphorus",
        grade: BigInt(2),
        notes: "Dry tight cough; chest feels heavy; worse lying on left",
      },
      {
        remedyId: "rumex",
        remedyName: "Rumex Crispus",
        grade: BigInt(1),
        notes: "Cough triggered by cold air; tickling in throat-pit",
      },
    ],
  },
  {
    id: "respiratory-asthma",
    symptomCategory: "Respiratory",
    symptomName: "Asthma and wheezing",
    description:
      "Spasmodic breathlessness, wheezing, tightness in chest; worse at night",
    remedies: [
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(3),
        notes: "Midnight asthma; anxiety; better sitting upright",
      },
      {
        remedyId: "ipecac",
        remedyName: "Ipecacuanha",
        grade: BigInt(3),
        notes: "Wheezing with nausea; rattling mucus in chest",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Asthma in warm rooms; better open air",
      },
    ],
  },
  // EXTREMITIES
  {
    id: "extremities-joint-pain",
    symptomCategory: "Extremities",
    symptomName: "Joint pain and stiffness",
    description:
      "Painful, stiff joints; worse from initial movement, cold or damp weather",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(3),
        notes: "Better continued motion; worse initial movement; restless",
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Worse any motion; must keep still; stitching pains",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Cold damp joints; worse cold; slow metabolism",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Wandering joint pains; shifting; better cold application",
      },
    ],
  },
  {
    id: "extremities-numbness",
    symptomCategory: "Extremities",
    symptomName: "Numbness and tingling",
    description:
      "Pins and needles, loss of sensation in hands and feet; formication",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(2),
        notes: "Numbness after long rest; better on movement",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Cold, numb extremities; icy coldness of feet in bed",
      },
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(1),
        notes: "Burning in soles preventing sleep; soles hot at night",
      },
    ],
  },
  // SKIN
  {
    id: "skin-eczema",
    symptomCategory: "Skin",
    symptomName: "Eczema and skin eruptions",
    description:
      "Itching, weeping or dry skin eruptions; worse from warmth or washing",
    remedies: [
      {
        remedyId: "sulphur",
        remedyName: "Sulphur",
        grade: BigInt(3),
        notes: "Intense itching; worse heat, bathing; dirty appearance",
      },
      {
        remedyId: "graphites",
        remedyName: "Graphites",
        grade: BigInt(3),
        notes: "Honey-like sticky oozing from cracks; behind ears, folds",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Eczema in fair, flabby children; worse cold damp",
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Burning, dry, scaly eruptions; anxiety with skin complaints",
      },
    ],
  },
  {
    id: "skin-urticaria",
    symptomCategory: "Skin",
    symptomName: "Urticaria and hives",
    description:
      "Wheals, intense itching, swelling; often worse at night or from heat",
    remedies: [
      {
        remedyId: "urtica-urens",
        remedyName: "Urtica Urens",
        grade: BigInt(3),
        notes: "Raised red wheals like nettle rash; burning, itching",
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(3),
        notes: "Rosy-pink oedematous swellings; stinging; better cold",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "After rich fatty foods; worse warmth; weeping patient",
      },
    ],
  },
  // BACK
  {
    id: "back-lower-back-pain",
    symptomCategory: "Back",
    symptomName: "Lower back pain (lumbago)",
    description:
      "Pain in lumbar region; may be dull aching or sharp; worse on rising from sitting",
    remedies: [
      {
        remedyId: "rhus-tox",
        remedyName: "Rhus Toxicodendron",
        grade: BigInt(3),
        notes: "Worse initial motion; better continued motion; restless",
      },
      {
        remedyId: "bryonia",
        remedyName: "Bryonia",
        grade: BigInt(3),
        notes: "Worse any movement; must be completely still",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(2),
        notes: "Must sit up to turn in bed; backache from desk work",
      },
      {
        remedyId: "kali-carb",
        remedyName: "Kali Carbonicum",
        grade: BigInt(2),
        notes: "Backache during pregnancy; worse 2–4 AM; weakness",
      },
    ],
  },
  // SLEEP
  {
    id: "sleep-insomnia",
    symptomCategory: "Sleep",
    symptomName: "Insomnia and sleeplessness",
    description:
      "Difficulty falling or staying asleep; waking at specific hours; unrefreshing sleep",
    remedies: [
      {
        remedyId: "coffea",
        remedyName: "Coffea Cruda",
        grade: BigInt(3),
        notes: "Mind too active; thoughts rushing; from joy or good news",
      },
      {
        remedyId: "nux-vomica",
        remedyName: "Nux Vomica",
        grade: BigInt(3),
        notes: "Wakes 3–4 AM, mind active; from overwork and stimulants",
      },
      {
        remedyId: "ars-alb",
        remedyName: "Arsenicum Album",
        grade: BigInt(2),
        notes: "Restless after midnight; anxiety drives from bed",
      },
    ],
  },
  {
    id: "sleep-nightmares",
    symptomCategory: "Sleep",
    symptomName: "Nightmares and frightful dreams",
    description:
      "Vivid frightening dreams; waking in terror; talking or crying in sleep",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Frightful visions; twitching; cries out in sleep",
      },
      {
        remedyId: "stramonium",
        remedyName: "Stramonium",
        grade: BigInt(3),
        notes: "Extreme terror; sees animals; light and company ameliorate",
      },
      {
        remedyId: "calc-carb",
        remedyName: "Calcarea Carbonica",
        grade: BigInt(2),
        notes: "Frightful images; wakes anxious; forgets bad dreams",
      },
    ],
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
        notes: "Acrid burning eye discharge; bland nasal catarrh",
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(2),
        notes: "Oedematous, puffy lids; stinging; better cold bathing",
      },
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(2),
        notes: "Extreme photophobia; dilated pupils; dry, red conjunctiva",
      },
      {
        remedyId: "pulsatilla",
        remedyName: "Pulsatilla",
        grade: BigInt(2),
        notes: "Thick, bland, yellowish discharge; worse warm room",
      },
    ],
  },
  // THROAT
  {
    id: "throat-soreness",
    symptomCategory: "Throat",
    symptomName: "Sore throat and tonsillitis",
    description:
      "Painful, inflamed throat; difficulty swallowing; may have exudate",
    remedies: [
      {
        remedyId: "belladonna",
        remedyName: "Belladonna",
        grade: BigInt(3),
        notes: "Bright red, dry, hot throat; worse empty swallowing",
      },
      {
        remedyId: "apis-mel",
        remedyName: "Apis Mellifica",
        grade: BigInt(3),
        notes: "Oedematous swelling; stinging pain; better cold drinks",
      },
      {
        remedyId: "lachesis",
        remedyName: "Lachesis",
        grade: BigInt(3),
        notes: "Left-sided or left to right; worse warm liquids, constriction",
      },
      {
        remedyId: "lycopodium",
        remedyName: "Lycopodium Clavatum",
        grade: BigInt(2),
        notes: "Right-sided or right to left; worse cold drinks",
      },
    ],
  },
];

export function useRepertoryEntries() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<RepertoryEntry[]>({
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
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchRepertory(symptom: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<RepertoryEntry[]>({
    queryKey: ["repertory", "search", symptom],
    queryFn: async () => {
      const lower = symptom.toLowerCase();
      if (!backend) {
        return SEED_REPERTORY.filter(
          (e) =>
            e.symptomName.toLowerCase().includes(lower) ||
            e.description.toLowerCase().includes(lower) ||
            e.symptomCategory.toLowerCase().includes(lower) ||
            e.remedies.some((r) => r.remedyName.toLowerCase().includes(lower)),
        );
      }
      try {
        const result = await backend.searchRepertory(symptom);
        return result.length > 0
          ? result
          : SEED_REPERTORY.filter(
              (e) =>
                e.symptomName.toLowerCase().includes(lower) ||
                e.description.toLowerCase().includes(lower),
            );
      } catch {
        return SEED_REPERTORY.filter(
          (e) =>
            e.symptomName.toLowerCase().includes(lower) ||
            e.description.toLowerCase().includes(lower),
        );
      }
    },
    enabled: !backendLoading && symptom.trim().length > 2,
    staleTime: 2 * 60 * 1000,
  });
}

export function useGetRepertoryEntry(id: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<RepertoryEntry | null>({
    queryKey: ["repertory", "entry", id],
    queryFn: async () => {
      if (!backend) return SEED_REPERTORY.find((e) => e.id === id) ?? null;
      try {
        return await backend.getRepertoryEntry(id);
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSeedRepertory() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not available");
      return await backend.seedRepertory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repertory"] });
    },
  });
}
