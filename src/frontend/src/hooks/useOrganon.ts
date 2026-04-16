import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aphorism } from "../backend.d";
import { useBackend } from "./useBackend";

// ─── Seed data: first 30 aphorisms of the Organon (6th ed.) ──────────────────
export const SEED_APHORISMS: Aphorism[] = [
  {
    id: BigInt(1),
    number: BigInt(1),
    section: "Introduction",
    authenticText:
      "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
    commentary:
      "Hahnemann opens by defining the physician's singular purpose — not to theorise, not to merely palliate, but to truly restore health. This sets the ethical foundation for all homoeopathic practice.",
    keyThemes: ["Mission of Physician", "Cure", "Health"],
  },
  {
    id: BigInt(2),
    number: BigInt(2),
    section: "Introduction",
    authenticText:
      "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
    commentary:
      "The 'ideal of cure' — rapid, gentle, permanent — is the benchmark against which every prescription should be measured. Hahnemann insists that the cure must be grounded in clear, understandable principles, not empirical guesswork.",
    keyThemes: ["Ideal of Cure", "Rapid Gentle Permanent", "Principles"],
  },
  {
    id: BigInt(3),
    number: BigInt(3),
    section: "Introduction",
    authenticText:
      "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease; if he clearly perceives what is curative in medicines, that is to say, in each individual medicine; and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must ensue — then the physician truly understands how to practise medicine.",
    commentary:
      "This aphorism defines the three pillars of the practitioner's art: (1) understanding the disease in the individual, (2) knowing the curative action of medicines, (3) skillfully matching the two. Together these form the complete philosophy of homoeopathic prescribing.",
    keyThemes: ["Three Pillars", "Individualisation", "Prescribing"],
  },
  {
    id: BigInt(4),
    number: BigInt(4),
    section: "Introduction",
    authenticText:
      "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.",
    commentary:
      "Hahnemann extends the physician's role beyond cure to prevention. Knowledge of the factors that disturb health — diet, lifestyle, environment — is equally part of medical competence.",
    keyThemes: ["Prevention", "Health Preservation", "Causative Factors"],
  },
  {
    id: BigInt(5),
    number: BigInt(5),
    section: "Part I",
    authenticText:
      "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm.",
    commentary:
      "The case-taking process must uncover the exciting cause of acute illness and the fundamental cause (miasm) of chronic disease. Hahnemann introduces the concept of miasms here — the underlying disease taints that drive chronic pathology.",
    keyThemes: ["Case Taking", "Exciting Cause", "Miasm", "Chronic Disease"],
  },
  {
    id: BigInt(6),
    number: BigInt(6),
    section: "Part I",
    authenticText:
      "The unprejudiced observer — well aware of the futility of transcendental speculations which can receive no confirmation from experience — be his powers of observation ever so acute, takes note of nothing in every individual disease, except the changes in the health of the body and of the mind which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual.",
    commentary:
      "Hahnemann champions pure empirical observation free from theoretical bias. The physician must note only what is perceptible — the totality of symptoms as expressed by the patient — rather than imposing hypothetical pathological theories.",
    keyThemes: ["Observation", "Totality of Symptoms", "Empiricism"],
  },
  {
    id: BigInt(7),
    number: BigInt(7),
    section: "Part I",
    authenticText:
      "Now, as in a disease, from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed, we can perceive nothing but the morbid symptoms, it must be the symptoms alone by which the disease demands and points to the remedy suited to it.",
    commentary:
      "Since the disease is known only through its symptoms, the symptoms alone guide prescribing. There is no hidden pathology that the physician must guess at — the symptoms are the disease, for practical prescribing purposes.",
    keyThemes: ["Symptoms as Guide", "Simillimum", "Prescribing Basis"],
  },
  {
    id: BigInt(8),
    number: BigInt(8),
    section: "Part I",
    authenticText:
      "It is not conceivable, nor can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire morbid condition, there should or could remain some other distinct morbid state in the body.",
    commentary:
      "When all symptoms are removed, the disease is removed. There is no separate underlying pathological entity apart from what is expressed through symptoms. Symptom removal equals disease removal.",
    keyThemes: ["Symptoms = Disease", "Totality", "Cure"],
  },
  {
    id: BigInt(9),
    number: BigInt(9),
    section: "Part I",
    authenticText:
      "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions, so that our indwelling, reason-gifted mind can freely employ this living, healthy instrument for the higher purposes of our existence.",
    commentary:
      "Here Hahnemann introduces the Vital Force — the non-material, dynamic principle that governs all life functions. In health, it maintains harmony of sensation and function, enabling the mind to pursue higher human purposes.",
    keyThemes: ["Vital Force", "Health", "Dynamis", "Harmony"],
  },
  {
    id: BigInt(10),
    number: BigInt(10),
    section: "Part I",
    authenticText:
      "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) which animates the material organism in health.",
    commentary:
      "The body without the Vital Force is inert matter. All biological functions — sensation, movement, self-repair — are the expressions of this immaterial animating principle, not of the chemistry alone.",
    keyThemes: ["Vital Force", "Life Functions", "Immaterial Principle"],
  },
  {
    id: BigInt(11),
    number: BigInt(11),
    section: "Part I",
    authenticText:
      "When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease.",
    commentary:
      "Disease begins with a dynamic (non-material) disturbance of the Vital Force, not with material lesions. The morbific agent disturbs the Vital Force, which then manifests disease symptoms in the organism. This is the homoeopathic theory of pathogenesis.",
    keyThemes: ["Disease Origin", "Vital Force Derangement", "Dynamic Cause"],
  },
  {
    id: BigInt(12),
    number: BigInt(12),
    section: "Part I",
    authenticText:
      "It is the morbidly affected vital energy alone that produces diseases, so that the morbid phenomena perceptible to our senses express at the same time all the internal changes, that is to say, the whole morbid derangement of the internal dynamis.",
    commentary:
      "The externally perceptible symptoms are the complete and faithful expression of the internal derangement of the Vital Force. This justifies basing the entire prescription on symptoms alone — there is nothing more to know.",
    keyThemes: ["Vital Force", "Symptoms Express Internal Disease", "Dynamis"],
  },
  {
    id: BigInt(13),
    number: BigInt(13),
    section: "Part I",
    authenticText:
      "Therefore disease (that does not come within the province of manual surgery) considered, as it is by the allopathists, as a thing separate from the living whole, from the organism and its animating vital force, and hidden in the interior, is an absurdity.",
    commentary:
      "A direct critique of the allopathic view of disease as a localised, material entity separate from the whole person. For Hahnemann, disease is a dynamic disturbance of the whole organism — not a lesion to be cut out or chemically suppressed.",
    keyThemes: ["Critique of Allopathy", "Holism", "Dynamic Disease"],
  },
  {
    id: BigInt(14),
    number: BigInt(14),
    section: "Part I",
    authenticText:
      "There is, in the interior of man, nothing morbid that is curable and no invisible morbid alteration that is curable which does not make itself known to the accurately observing physician by means of morbid signs and symptoms.",
    commentary:
      "Every curable disease makes itself known through symptoms. If something cannot be perceived as a symptom, it cannot be treated homoeopathically. This principle focuses the physician's attention on what is observable and real.",
    keyThemes: [
      "Symptoms as Disease Expression",
      "Observation",
      "Curable Disease",
    ],
  },
  {
    id: BigInt(15),
    number: BigInt(15),
    section: "Part I",
    authenticText:
      "The suffering of the morbidly affected vital energy and the disease symptoms thereby produced constitute an inseparable whole — they are one and the same.",
    commentary:
      "A succinct summary of the relationship between Vital Force derangement and symptoms: they are not cause and effect but one unified reality. To address the symptoms is to address the deranged Vital Force.",
    keyThemes: ["Vital Force", "Symptoms", "Unity of Disease"],
  },
  {
    id: BigInt(16),
    number: BigInt(16),
    section: "Part I",
    authenticText:
      "Our vital force, as a spirit-like dynamis, cannot be attacked and affected by injurious influences on the healthy organism caused by the external inimical forces that disturb the harmonious play of life, otherwise than in a spirit-like (dynamic, virtual) manner.",
    commentary:
      "The Vital Force, being immaterial, can only be influenced by dynamic (not material) forces. This is why medicines must be prepared dynamically (potentised) to act curatively — they act on the same plane as the Vital Force itself.",
    keyThemes: ["Dynamic Action", "Potentisation", "Vital Force"],
  },
  {
    id: BigInt(17),
    number: BigInt(17),
    section: "Part I",
    authenticText:
      "Now, as in the cure of disease we have to do only with the symptoms of the disease, it is in the nature of things that the physician must pay attention to the symptoms of the disease in order to cure it, inasmuch as the disease is known to us by nothing but its symptoms.",
    commentary:
      "The practical conclusion flows naturally from the theory: the physician's entire attention must be directed to symptoms, because symptoms are the only knowable expression of disease.",
    keyThemes: ["Symptom-Based Practice", "Practical Prescribing"],
  },
  {
    id: BigInt(18),
    number: BigInt(18),
    section: "Part I",
    authenticText:
      "It is a matter of experience, that medicines can only cure similar sufferings — similia similibus curantur.",
    commentary:
      "The Law of Similars stated plainly: medicines cure similar sufferings. This is empirically grounded — Hahnemann discovered it through provings and centuries of accidental observation. 'Like cures like' (similia similibus curantur) is the keystone of homoeopathy.",
    keyThemes: [
      "Law of Similars",
      "Similia Similibus Curantur",
      "Core Principle",
    ],
  },
  {
    id: BigInt(19),
    number: BigInt(19),
    section: "Part I",
    authenticText:
      "Now, as diseases are nothing more than alterations in the state of health of the healthy individual which express themselves by morbid signs, and the cure is also only possible by a change to the healthy condition of the state of health of the diseased individual, it is very evident, that medicines could never cure diseases if they did not possess the power of altering man's state of health.",
    commentary:
      "Medicines are curative precisely because they can alter the state of health. They do not act chemically in the narrow sense — they produce changes in the dynamic state, and it is through this capacity that they cure.",
    keyThemes: ["Medicine Action", "Health Alteration", "Dynamic Power"],
  },
  {
    id: BigInt(20),
    number: BigInt(20),
    section: "Part I",
    authenticText:
      "This spirit-like power to alter man's state of health (and hence to cure diseases) which lies hidden in the inner nature of medicines, can never be discovered by us by a mere inspection of their material nature; only experience can reveal it.",
    commentary:
      "The curative power of medicines cannot be predicted from chemistry or physical inspection — it must be discovered empirically, through provings on healthy human subjects. This is Hahnemann's call for systematic drug testing.",
    keyThemes: ["Drug Proving", "Empiricism", "Hidden Medicine Power"],
  },
  {
    id: BigInt(21),
    number: BigInt(21),
    section: "Part I",
    authenticText:
      "Now, as it is undeniable that the curative principle in medicines is not in itself perceptible, and as in pure experiments with medicines conducted by the most accurate observers, nothing can be observed that can constitute them medicines or remedies except their property of each producing peculiar alterations in the state of health of the human body, it follows that when medicines act as remedies, they can only bring their curative property into play by this their power of altering man's health.",
    commentary:
      "The only medical property of a drug that can be observed is its capacity to alter human health. The proving experiment reveals this. There is no hidden essence separate from the symptom-producing action that makes it a remedy.",
    keyThemes: ["Drug Proving", "Curative Property", "Symptom Production"],
  },
  {
    id: BigInt(22),
    number: BigInt(22),
    section: "Part I",
    authenticText:
      "But this remarkable — some say inexplicable — power of medicines to alter the health of man — which enables medicines to cure disease — is only exercised when medicines encounter a susceptible organism.",
    commentary:
      "The dynamic action of a medicine only occurs when it encounters a susceptible organism. This explains why the same medicine does not affect everyone the same way and why individual susceptibility is central to case-taking.",
    keyThemes: ["Susceptibility", "Dynamic Medicine", "Individual Response"],
  },
  {
    id: BigInt(23),
    number: BigInt(23),
    section: "Part I",
    authenticText:
      "Of all things possible to medicines, only two are available against diseases: either a medicine may excite an opposite condition (contraria contrariis) to the symptom to be removed, which is the allopathic method; or it may excite a condition very similar to the disease.",
    commentary:
      "Hahnemann systematically presents two possible therapeutic strategies: contraries (the allopathic method) and similars (the homoeopathic method). He will proceed to demonstrate that only similars produce true and permanent cure.",
    keyThemes: ["Contraria vs Similia", "Therapeutic Methods", "Comparison"],
  },
  {
    id: BigInt(24),
    number: BigInt(24),
    section: "Part I",
    authenticText: "There is no third mode of treatment.",
    commentary:
      "A deceptively simple statement. Hahnemann insists there are only two logical approaches to therapeutics. This binary framing forces a clear choice: medicine can only act by contraries or by similars.",
    keyThemes: ["Two Methods", "No Third Way", "Therapeutic Logic"],
  },
  {
    id: BigInt(25),
    number: BigInt(25),
    section: "Part I",
    authenticText:
      "In the first mode (contraria contrariis), the mere palliative and antagonistic method, the medicine employed opposes the symptoms with its contrary effects and thus temporarily suppresses the condition, but at the expense of the Vital Force which is thereby weakened and the disease made chronic.",
    commentary:
      "Suppression by contraries — antipyretics for fever, laxatives for constipation — produces only temporary relief. Worse, it weakens the Vital Force and drives the disease deeper, making it chronic. This is a critique of symptomatic allopathic treatment.",
    keyThemes: [
      "Suppression",
      "Palliation",
      "Contraria",
      "Vital Force Weakening",
    ],
  },
  {
    id: BigInt(26),
    number: BigInt(26),
    section: "Part II",
    authenticText:
      "This natural law of cure, which has been confirmed in every pure experiment and every true observation in the world — similia similibus curantur — on which the whole of pure homoeopathy is founded.",
    commentary:
      "The Law of Similars is not a hypothesis — it is a law confirmed by every accurate experiment and observation. Homoeopathy is founded entirely on this empirically verified natural principle.",
    keyThemes: ["Law of Similars", "Natural Law", "Foundation of Homoeopathy"],
  },
  {
    id: BigInt(27),
    number: BigInt(27),
    section: "Part II",
    authenticText:
      "The curative power of medicines, therefore, depends on their symptoms similar to the disease but superior to it in strength, so that each individual case of disease is most surely, radically, rapidly and permanently annihilated and removed only by a medicine capable of producing in the most similar and complete manner the totality of its symptoms.",
    commentary:
      "The simillimum — the most similar medicine — is the one that produces the complete totality of disease symptoms, and in a slightly stronger degree. Its superiority in strength allows it to overcome and annihilate the disease.",
    keyThemes: [
      "Simillimum",
      "Totality",
      "Superiority of Medicine",
      "Rapid Cure",
    ],
  },
  {
    id: BigInt(28),
    number: BigInt(28),
    section: "Part II",
    authenticText:
      "As this natural law of cure manifests itself in every pure experiment and every careful observation, it is beyond all experience.",
    commentary:
      "The Law of Similars transcends individual experimental results — it is a universal principle of nature. Every careful experiment confirms it; it has never been genuinely falsified by accurate observation.",
    keyThemes: ["Law of Similars", "Universal Principle", "Natural Law"],
  },
  {
    id: BigInt(29),
    number: BigInt(29),
    section: "Part II",
    authenticText:
      "Every powerful medicinal substance produces in the human body a peculiar kind of disease; the more powerful the medicine, the more peculiar, marked, and violent the disease.",
    commentary:
      "Powerful medicines produce marked and characteristic diseases in healthy subjects (provings). This is the empirical basis of the Materia Medica — each drug's peculiar symptom-picture becomes the guide for its curative application.",
    keyThemes: ["Drug Proving", "Characteristic Symptoms", "Materia Medica"],
  },
  {
    id: BigInt(30),
    number: BigInt(30),
    section: "Part II",
    authenticText:
      "The human body appears to admit of being much more powerfully affected in its health by medicines (partly because we have the regulation of the dose in our own power) than by morbific agents.",
    commentary:
      "Medicines can be more precisely and powerfully administered than natural disease agents, especially since we control the dose. This gives homoeopathic medicine a decisive therapeutic advantage over disease when correctly applied.",
    keyThemes: ["Dose Control", "Medicine vs Disease", "Therapeutic Advantage"],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function useAphorisms() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<Aphorism[]>({
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
    staleTime: 10 * 60 * 1000,
  });
}

export function useGetAphorism(number: bigint) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<Aphorism | null>({
    queryKey: ["organon", "aphorism", number.toString()],
    queryFn: async () => {
      if (!backend)
        return SEED_APHORISMS.find((a) => a.number === number) ?? null;
      try {
        return await backend.getAphorism(number);
      } catch {
        return SEED_APHORISMS.find((a) => a.number === number) ?? null;
      }
    },
    enabled: !backendLoading && number > BigInt(0),
    staleTime: 10 * 60 * 1000,
  });
}

export function useSearchAphorisms(searchTerm: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<Aphorism[]>({
    queryKey: ["organon", "search", searchTerm],
    queryFn: async () => {
      const lower = searchTerm.toLowerCase();
      if (!backend) {
        return SEED_APHORISMS.filter(
          (a) =>
            a.authenticText.toLowerCase().includes(lower) ||
            a.commentary.toLowerCase().includes(lower) ||
            a.keyThemes.some((t) => t.toLowerCase().includes(lower)),
        );
      }
      try {
        const result = await backend.searchAphorisms(searchTerm);
        return result.length > 0
          ? result
          : SEED_APHORISMS.filter(
              (a) =>
                a.authenticText.toLowerCase().includes(lower) ||
                a.commentary.toLowerCase().includes(lower) ||
                a.keyThemes.some((t) => t.toLowerCase().includes(lower)),
            );
      } catch {
        return SEED_APHORISMS.filter(
          (a) =>
            a.authenticText.toLowerCase().includes(lower) ||
            a.commentary.toLowerCase().includes(lower) ||
            a.keyThemes.some((t) => t.toLowerCase().includes(lower)),
        );
      }
    },
    enabled: !backendLoading && searchTerm.trim().length > 2,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSeedOrganon() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) return;
      try {
        await backend.seedOrganon();
      } catch {
        // silently ignore if already seeded
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organon"] });
    },
  });
}
