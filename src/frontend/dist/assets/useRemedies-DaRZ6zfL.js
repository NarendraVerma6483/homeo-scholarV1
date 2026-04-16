import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
const SEED_REMEDIES = [
  {
    id: "ars-alb",
    name: "Arsenicum Album",
    commonName: "White Arsenic",
    kingdom: "Mineral",
    keySymptomsPhysical: [
      "Burning pains relieved by heat",
      "Restlessness and anxiety",
      "Prostration out of proportion to illness",
      "Thirst for small sips of water",
      "Worsening after midnight (1–3 AM)"
    ],
    keySymptomsEmotional: [
      "Intense fear of death and disease",
      "Perfectionism and fastidiousness",
      "Anxiety about security and finances"
    ],
    modalities: ["< cold, < midnight, > heat, > warm drinks"],
    constitution: "Thin, anxious, restless individual who is chilly and fearful",
    clinicalIndications: [
      "Food poisoning",
      "Asthma",
      "Eczema",
      "Anxiety disorders",
      "Gastroenteritis"
    ],
    relations: [
      "Complementary: Rhus Tox, Carbo Veg",
      "Follows well: Phos, Nux Vom"
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: "belladonna",
    name: "Belladonna",
    commonName: "Deadly Nightshade",
    kingdom: "Plant",
    keySymptomsPhysical: [
      "Sudden violent onset of symptoms",
      "High fever with hot, red, dry skin",
      "Throbbing headache with flushed face",
      "Dilated pupils, bright red throat",
      "Extreme sensitivity to light, noise, jarring"
    ],
    keySymptomsEmotional: [
      "Delirium with violence",
      "Biting, striking, spitting",
      "Fear of imaginary things"
    ],
    modalities: [
      "< light, noise, jarring, afternoon, touch",
      "> rest, standing, warm room"
    ],
    constitution: "Robust, full-blooded individual with a vigorous, reactive constitution",
    clinicalIndications: [
      "High fever",
      "Acute inflammations",
      "Scarlet fever",
      "Acute otitis media",
      "Headache"
    ],
    relations: [
      "Complementary: Calc Carb",
      "Follows well: Aconite, Ferrum Phos"
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: "calc-carb",
    name: "Calcarea Carbonica",
    commonName: "Calcium Carbonate (Oyster Shell)",
    kingdom: "Mineral",
    keySymptomsPhysical: [
      "Tendency to weight gain and obesity",
      "Profuse sour-smelling perspiration on head",
      "Slow teething and bone development in children",
      "Craving for eggs and indigestible things",
      "Cold, damp extremities"
    ],
    keySymptomsEmotional: [
      "Stubborn, obstinate disposition",
      "Fear of insanity and observation",
      "Overwhelmed by responsibilities"
    ],
    modalities: [
      "< cold, damp, exertion, full moon",
      "> dry weather, lying on painful side"
    ],
    constitution: "Fair, fat, flabby individual; children with big belly and big head",
    clinicalIndications: [
      "Hypothyroidism",
      "Obesity",
      "Eczema",
      "Rickets",
      "Anxiety disorders"
    ],
    relations: ["Complementary: Rhus Tox, Bell, Lycopodium"],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: "lycopodium",
    name: "Lycopodium Clavatum",
    commonName: "Club Moss",
    kingdom: "Plant",
    keySymptomsPhysical: [
      "Bloating and flatulence after eating",
      "Symptoms worse on right side, moving left",
      "Desires sweets and warm drinks",
      "Fan-like motion of nostrils in respiratory disease",
      "Premature balding, grey hair"
    ],
    keySymptomsEmotional: [
      "Lack of confidence with false bravado",
      "Fear of being alone yet avoids company",
      "Intellectual, domineering at home"
    ],
    modalities: [
      "< 4–8 PM, right side, warmth, oysters",
      "> motion, warm food/drinks"
    ],
    constitution: "Lean, intellectual individual with a yellowish, wrinkled appearance",
    clinicalIndications: [
      "Liver disorders",
      "IBS",
      "Urinary complaints",
      "Male sexual dysfunction",
      "Eczema"
    ],
    relations: ["Complementary: Iod, Graph", "Antidoted by: Camph, Puls"],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: "nux-vomica",
    name: "Nux Vomica",
    commonName: "Poison Nut",
    kingdom: "Plant",
    keySymptomsPhysical: [
      "Over-sensitivity to all stimuli",
      "Ineffectual urging for stool or urine",
      "Nausea and vomiting from overindulgence",
      "Spasmodic cramping in digestive tract",
      "Wakes at 3–4 AM with mental anxiety"
    ],
    keySymptomsEmotional: [
      "Highly irritable, fault-finding",
      "Type-A personality, workaholic",
      "Competitive, ambitious, impatient"
    ],
    modalities: [
      "< morning, cold, mental exertion, spices",
      "> rest, evening, warm room"
    ],
    constitution: "Thin, nervous, ambitious individual prone to overwork and stimulants",
    clinicalIndications: [
      "Hangover",
      "Indigestion",
      "Constipation",
      "Migraine",
      "Insomnia"
    ],
    relations: ["Complementary: Sepia, Sulphur", "Antidoted by: Ign, Cocc"],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  },
  {
    id: "sulphur",
    name: "Sulphur",
    commonName: "Brimstone (Elemental Sulphur)",
    kingdom: "Mineral",
    keySymptomsPhysical: [
      "Intense burning sensations everywhere",
      "Aggravation from heat in any form",
      "Offensive discharges and body odour",
      "Hungry at 11 AM",
      "Standing is the worst position"
    ],
    keySymptomsEmotional: [
      "Philosophical, theorising mind",
      "Untidy and careless about appearance",
      "Self-centred, egotistical"
    ],
    modalities: [
      "< heat, bathing, standing, 11 AM",
      "> open air, motion, dry warmth"
    ],
    constitution: "Lean, stooped, dirty-looking person; or red-faced, plethoric individual",
    clinicalIndications: [
      "Skin conditions",
      "Eczema",
      "Psoriasis",
      "Haemorrhoids",
      "Diarrhoea"
    ],
    relations: [
      "Complementary: Aconite, Psorinum",
      "Follows well: Aconite, Nux Vom, Merc"
    ],
    createdAt: BigInt(0),
    updatedAt: BigInt(0)
  }
];
function useListRemedies() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["remedies"],
    queryFn: async () => {
      if (!backend) return SEED_REMEDIES;
      try {
        const result = await backend.listRemedies();
        return result.length > 0 ? result : SEED_REMEDIES;
      } catch {
        return SEED_REMEDIES;
      }
    },
    enabled: !backendLoading,
    staleTime: 5 * 60 * 1e3
  });
}
function useGetRemedy(id) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["remedy", id],
    queryFn: async () => {
      if (!backend) return SEED_REMEDIES.find((r) => r.id === id);
      try {
        const result = await backend.getRemedy(id);
        return result ?? SEED_REMEDIES.find((r) => r.id === id);
      } catch {
        return SEED_REMEDIES.find((r) => r.id === id);
      }
    },
    enabled: !backendLoading && !!id
  });
}
function useSearchRemediesByName(query) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["remedies", "search-name", query],
    queryFn: async () => {
      const lower = query.toLowerCase();
      if (!backend) {
        return SEED_REMEDIES.filter(
          (r) => {
            var _a;
            return r.name.toLowerCase().includes(lower) || (((_a = r.commonName) == null ? void 0 : _a.toLowerCase().includes(lower)) ?? false);
          }
        );
      }
      try {
        return await backend.searchRemediesByName(query);
      } catch {
        return SEED_REMEDIES.filter(
          (r) => r.name.toLowerCase().includes(lower)
        );
      }
    },
    enabled: !backendLoading && query.length > 0
  });
}
function useSearchRemediesBySymptom(symptom) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
    queryKey: ["remedies", "search-symptom", symptom],
    queryFn: async () => {
      const lower = symptom.toLowerCase();
      if (!backend) {
        return SEED_REMEDIES.filter(
          (r) => r.keySymptomsPhysical.some(
            (s) => s.toLowerCase().includes(lower)
          ) || r.keySymptomsEmotional.some(
            (s) => s.toLowerCase().includes(lower)
          ) || r.clinicalIndications.some((s) => s.toLowerCase().includes(lower))
        );
      }
      try {
        return await backend.searchRemediesBySymptom(symptom);
      } catch {
        return SEED_REMEDIES.filter(
          (r) => r.keySymptomsPhysical.some((s) => s.toLowerCase().includes(lower))
        );
      }
    },
    enabled: !backendLoading && symptom.length > 0
  });
}
export {
  SEED_REMEDIES as S,
  useSearchRemediesByName as a,
  useSearchRemediesBySymptom as b,
  useGetRemedy as c,
  useListRemedies as u
};
