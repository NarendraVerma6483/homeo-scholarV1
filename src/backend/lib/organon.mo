import Map "mo:core/Map";

import OrganonTypes "../types/organon";

module {
  public type Aphorism = OrganonTypes.Aphorism;

  // Returns all aphorisms sorted by number
  public func listAphorisms(store : Map.Map<Nat, Aphorism>) : [Aphorism] {
    store.entries()
      .map<(Nat, Aphorism), Aphorism>(func((_, a)) = a)
      .toArray()
  };

  // Returns a single aphorism by its number (1-291)
  public func getAphorism(store : Map.Map<Nat, Aphorism>, number : Nat) : ?Aphorism {
    store.get(number)
  };

  // Full-text search across authenticText, commentary, keyThemes, section (case-insensitive)
  public func searchAphorisms(store : Map.Map<Nat, Aphorism>, searchTerm : Text) : [Aphorism] {
    let term = searchTerm.toLower();
    store.entries()
      .filter(func((_, a) : (Nat, Aphorism)) : Bool {
        if (a.authenticText.toLower().contains(#text term)) return true;
        if (a.commentary.toLower().contains(#text term)) return true;
        if (a.section.toLower().contains(#text term)) return true;
        for (theme in a.keyThemes.values()) {
          if (theme.toLower().contains(#text term)) return true;
        };
        false
      })
      .map<(Nat, Aphorism), Aphorism>(func((_, a)) = a)
      .toArray()
  };

  // Seeds the store with the first 30 aphorisms (authentic text + commentary)
  public func seed(store : Map.Map<Nat, Aphorism>) : () {
    let aphorisms : [Aphorism] = [
      {
        id = 1; number = 1;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.";
        commentary = "Hahnemann opens the Organon by defining the doctor's sole purpose: healing the sick. This deceptively simple statement rules out unnecessary experiments, speculative theorizing, and any treatment that does not serve the patient's recovery. For students, it is a reminder that every clinical decision must be justified by its contribution to cure. Exam tip: Aphorism 1 is often paired with §2 on the ideal of cure.";
        keyThemes = ["physician's mission", "cure", "restoration of health"];
      },
      {
        id = 2; number = 2;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.";
        commentary = "The four adjectives — rapid, gentle, permanent, and based on comprehensible principles — form the benchmark for every homoeopathic prescription. 'Rapid' means without unnecessary delay; 'gentle' forbids harsh measures; 'permanent' excludes palliation that merely suppresses; 'comprehensible principles' demand that the method be rational, not empirical guesswork. This aphorism is the gold standard against which any therapy can be measured.";
        keyThemes = ["ideal of cure", "rapid", "gentle", "permanent", "principles"];
      },
      {
        id = 3; number = 3;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease (knowledge of disease, indication), if he clearly perceives what is curative in medicines, that is to say, in each individual medicine (knowledge of medicinal powers), and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must result — to adapt it, as well in respect to the suitability of the medicine most appropriate according to its mode of action to the case before him... then he understands how to treat judiciously and rationally.";
        commentary = "§3 outlines the three pillars of homoeopathic practice: (1) knowledge of disease — the totality of symptoms of the individual patient; (2) knowledge of drug action — the pathogenetic symptoms produced by medicines in provings; and (3) the art of matching — applying the law of similars to select the most appropriate remedy. All three must be present simultaneously for a rational cure. Students should memorize these three knowledge pillars as they recur throughout the Organon.";
        keyThemes = ["knowledge of disease", "knowledge of medicinal powers", "similars", "three pillars"];
      },
      {
        id = 4; number = 4;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.";
        commentary = "Hahnemann extends the physician's role to preventive medicine. A doctor who understands the causes of disease — whether miasmatic, lifestyle-related, or environmental — has a duty to educate patients and remove those causes. This aphorism underpins homoeopathic counselling on diet, hygiene, and avoidable exciting causes (§7, §77). Key point: the physician is both a healer and a guardian of health.";
        keyThemes = ["preservation of health", "prevention", "causes of disease", "hygiene"];
      },
      {
        id = 5; number = 5;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm. These, together with the observation of the symbols of the exact representation of the patient (§ 6-10) are the most important parts of the examination and the basis of the prescription.";
        commentary = "This aphorism introduces the concept of the exciting cause (what triggered the current illness) versus the fundamental or maintaining cause (typically a chronic miasm). For acute cases the exciting cause is paramount; for chronic cases the physician must trace the deeper miasmatic root. Students should note that §5 is the bridge between case-taking and miasm theory. The reference to §6–10 signals that the full symptom picture (totality) is the actual prescribing basis.";
        keyThemes = ["exciting cause", "fundamental cause", "miasm", "case-taking", "chronic disease"];
      },
      {
        id = 6; number = 6;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The unprejudiced observer — well aware of the futility of transcendental speculations which can receive no confirmation from experience — be his powers of observation ever so acute, takes note of nothing in every individual disease except the changes in the health of the body and of the mind (morbid phenomena, accidents, symptoms) which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual, which are felt by the patient himself, reported by those around him, or are to be observed by the physician. All these perceptible signs represent the disease in its whole extent, that is, together they form the true and only conceivable portrait of the disease.";
        commentary = "One of the most philosophically significant aphorisms: the disease IS its symptoms. Hahnemann rejects invisible hypothetical pathological causes as the basis of prescribing; the totality of perceptible deviations from health constitutes the only reliable portrait of disease. This is why homoeopathy prescribes on symptoms, not on laboratory findings alone. Exam note: §6 is often quoted in questions about 'totality of symptoms' and the unprejudiced observer.";
        keyThemes = ["totality of symptoms", "unprejudiced observer", "morbid phenomena", "portrait of disease"];
      },
      {
        id = 7; number = 7;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Now, as in a disease from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed, we can perceive nothing but the morbid symptoms, it must be the symptoms alone by which the disease demands and points to the remedy suited to relieve it — and, moreover, the totality of these its symptoms, of this outwardly reflected picture of the inner essence of the disease, that is, of the affection of the vital force, must be the principal, or the sole means, whereby the disease can make known what remedy it requires.";
        commentary = "§7 is crucial for understanding the homoeopathic prescribing basis. When no exciting or maintaining cause can be removed, the totality of symptoms is the sole guide to the remedy. The symptoms are the outer reflection of the disturbed vital force — they are not the disease itself, but the vital force's expression of disease. Students frequently confuse 'symptom totality' with prescribing on a single prominent symptom; §7 clarifies that the whole picture is required.";
        keyThemes = ["totality of symptoms", "maintaining cause", "exciting cause", "vital force", "prescribing basis"];
      },
      {
        id = 8; number = 8;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "It is not conceivable, nor can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire collection of the perceptible phenomena, there should or could remain any other than a healthy condition.";
        commentary = "Hahnemann makes a bold epistemological claim: if every symptom is gone, the disease is gone. There is no hidden residual pathology beyond what can be perceived. This directly counters the allopathic tendency to treat a 'disease entity' separate from its symptoms. For the student, this aphorism reinforces why the cure is judged by the disappearance of symptoms, not by laboratory values — though in modern practice both are considered.";
        keyThemes = ["removal of symptoms", "cure", "epistemology", "no hidden disease"];
      },
      {
        id = 9; number = 9;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions, so that our indwelling, reason-gifted mind can freely employ this living, healthy instrument for the higher purposes of our existence.";
        commentary = "Here Hahnemann introduces the vital force — the 'spiritual dynamis' or life force — which governs the body in health. The vital force maintains harmony among all organ systems and sensations. Health is defined as the free, harmonious functioning of this force. Note the dualistic language: the 'material body' is animated by an immaterial 'dynamis'. This concept is central to understanding why homoeopathic medicines work dynamically rather than chemically.";
        keyThemes = ["vital force", "dynamis", "health", "harmony", "autocracy"];
      },
      {
        id = 10; number = 10;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) that animates the material organism in health.";
        commentary = "§10 complements §9: the body without the vital force is inert matter. Sensation, function, and self-preservation all depend on this animating principle. This is the homoeopathic refutation of pure materialism in medicine. Students should understand that this philosophical stance means homoeopathic remedies act on the vital force, not directly on chemical pathways — a key distinction when explaining the mechanism of action.";
        keyThemes = ["vital force", "material organism", "sensation", "function", "immaterial principle"];
      },
      {
        id = 11; number = 11;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease.";
        commentary = "Disease begins with the vital force being disturbed by a morbific (disease-causing) agent. The vital force, now in an abnormal state, produces the symptoms we observe. This aphorism clarifies why homoeopathic treatment targets the vital force — the primary site of disease — rather than just the symptoms. The 'dynamic influence' of the morbific agent parallels how homoeopathic medicines act dynamically. Understanding this chain (morbific agent → vital force → symptoms) is essential for MCQ questions.";
        keyThemes = ["vital force derangement", "morbific agent", "dynamic influence", "disease origin"];
      },
      {
        id = 12; number = 12;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "It is the morbidly affected vital energy alone that produces diseases, so that the morbid phenomena perceptible to our senses express at the same time all the internal changes, that is, the whole morbid derangement of the internal dynamis; in a word they reveal the whole disease; consequently, also, the disappearance under treatment of all the morbid phenomena and of all the morbid alterations that differ from the healthy vital operations, certainly and necessarily implies restoration of the integrity of the vital energy and the restoration of health.";
        commentary = "§12 is the logical conclusion of §9–11: since disease is the vital force's derangement made visible through symptoms, removal of all symptoms means the vital force is restored and the patient is cured. This forms the complete epistemological circle: vital force → symptoms → prescribing → symptom disappearance → restored vital force. Key exam point: the disappearance of all morbid phenomena is both necessary and sufficient for cure.";
        keyThemes = ["vital energy", "morbid phenomena", "restoration", "cure", "internal dynamis"];
      },
      {
        id = 13; number = 13;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Therefore disease (that does not come within the province of manual surgery) considered, as it is by allopathists, as a thing separate from the living whole, from the organism and its animating vital force, and hidden in the interior, be it of ever so subtle a character, is an absurdity, that could only be imagined by minds of a materialistic stamp, and has for thousands of years given to the prevailing system of medicine all those pernicious impulses that have made it a truly mischievous (non-healing) art.";
        commentary = "Hahnemann directly challenges the allopathic concept of disease as a separate entity lodged in the body. For him, disease is not a thing but a state — a derangement of the vital force. This philosophical difference has profound practical consequences: if disease is a state (not a thing), then removing the causes of that state (via similars) restores health; you cannot 'cut out' a vital-force derangement. Students should contrast this with modern germ theory and tissue pathology perspectives.";
        keyThemes = ["disease concept", "materialism", "allopathy critique", "vital force state"];
      },
      {
        id = 14; number = 14;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "There is in the interior of man nothing morbid that is curable and no invisible morbid alteration that is curable which does not make itself known to the accurately observing physician by means of morbid signs and symptoms — an axiom, the truth of which is confirmed by all experience of the world; it is, therefore, absolutely impossible to know the internal condition of the sick except through the symptoms.";
        commentary = "A direct corollary of §6–12: everything that is curable in a disease will manifest as perceptible symptoms. There are no 'silent' curable conditions that escape symptom expression. This axiom gives the physician confidence that thorough symptom-taking captures everything needed for prescribing. For students, §14 counters the worry that important internal pathology might be 'missed' by symptom-based prescribing.";
        keyThemes = ["symptoms as guides", "internal condition", "axiom", "accurate observation"];
      },
      {
        id = 15; number = 15;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The affection of the morbidly deranged, invisible, spirit-like vital force in the living organism, and the morbid symptoms thereby produced in the organism, perceptible to the senses — form an inseparable whole, they are one and the same.";
        commentary = "§15 is the synthesis of the vital-force theory: the invisible derangement of the vital force and the perceptible symptoms are not two separate things — they are one unified phenomenon seen from two angles. This means symptoms are not mere by-products of disease; they ARE the disease as it manifests. Practically, this vindicates prescribing on symptoms alone. Exam shorthand: vital-force derangement = symptoms (inseparable).";
        keyThemes = ["vital force", "symptoms", "inseparable whole", "unity of disease"];
      },
      {
        id = 16; number = 16;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Our vital force, as a spirit-like dynamis, cannot be attacked and affected by injurious influences on the healthy organism caused by the external inimical forces that disturb the harmonious play of life otherwise than in a spirit-like (dynamic, virtual) manner through the medium of the living sensory fibre; and in like manner, all such morbid derangements (diseases) can be removed from it by the physician in no other way than through the spirit-like (dynamic, virtual) alterative powers of the serviceable medicines acting upon our spirit-like vital force.";
        commentary = "§16 explains the mechanism by which both disease and cure operate: dynamically (spirit-like), through the sensory nervous system. Just as a morbific agent disturbs the vital force dynamically, homoeopathic medicines also act dynamically on the vital force. This is why potentized (dynamized) remedies are effective — they work on the same plane as the disease. Key point for exams: dynamic action of medicines mirrors dynamic origin of disease.";
        keyThemes = ["dynamic action", "spirit-like dynamis", "potentization mechanism", "medicines and disease"];
      },
      {
        id = 17; number = 17;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Now, as it is undeniable that the curative agency of medicines rests solely upon the symptoms excited by them in healthy persons, from this it follows, as an unavoidable consequence, that medicines can only cure diseases corresponding to the symptoms they themselves are capable of producing — and that they must be chosen in accordance with the similitude of their symptoms with those of the disease.";
        commentary = "§17 formally states the Law of Similars as a logical consequence of the proving principle. Since medicines are known only by their effects on healthy provers, they can only cure diseases that match those effects. This is the logical foundation of similia similibus curentur. For students: memorize the chain of reasoning — proving reveals drug symptoms → drug symptoms match disease symptoms → similar disease is cured.";
        keyThemes = ["law of similars", "similia similibus curentur", "proving", "symptom similitude"];
      },
      {
        id = 18; number = 18;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "From this, and from §22 it is demonstrated that there is no other possible mode of employing medicines rationally in diseases — that there is no other true therapeutic law — but the law of similar symptoms.";
        commentary = "Hahnemann asserts that Similia is the ONLY rational therapeutic law. He acknowledges §22 (contraria contrariis — the allopathic principle) implicitly, only to dismiss it. The strength of this claim is that it is derived logically from prior aphorisms. Exam note: students sometimes conflate Similia with isopathy (using the same substance). §18 refers specifically to similar — not identical — substances.";
        keyThemes = ["law of similars", "therapeutic law", "rational medicine", "only true law"];
      },
      {
        id = 19; number = 19;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Now, as diseases are nothing more than alterations in the state of health of the healthy individual which express themselves by morbid signs, and the cure is also only possible by a change to the healthy condition of the state of health of the diseased individual, it is very evident that medicines could never cure diseases if they did not possess the power of altering man's state of health, which power consists solely in exciting morbid symptoms in healthy persons, and that they can only cure morbidly affected organisms in a similar morbid affection (§26).";
        commentary = "§19 links the nature of disease (alteration in health state) with the mechanism of cure (another alteration that restores health). Medicines can only alter health states because they produce morbid symptoms in healthy persons. The curative alteration must be similar to the disease alteration. This aphorism explains why testing medicines on healthy persons (provings) is the only scientific way to discover their curative sphere.";
        keyThemes = ["alteration of health state", "provings", "morbid symptoms", "curative mechanism"];
      },
      {
        id = 20; number = 20;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "This spirit-like power to alter man's state of health (and hence to cure diseases) which lies hidden in the inner nature of medicines, has not till now been known in its pure (real, absolute) nature, and can therefore not be taught; — it can only be known by its effects in the organism and in no other way.";
        commentary = "The intrinsic curative power of medicines is not knowable by chemical analysis; it can only be discovered through its effects — provings on healthy people. This is why homoeopathy relies on proving data rather than pharmacochemical reasoning. Students should appreciate that Hahnemann was epistemologically ahead of his time in distinguishing 'knowing a substance's composition' from 'knowing its biological effects'.";
        keyThemes = ["hidden medicinal power", "provings", "effects in organism", "epistemology"];
      },
      {
        id = 21; number = 21;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "We cannot learn the nature of any of these instruments of disease (drugs) from every possible theoretical examination of their crude substances; experience alone can and does teach their medicinal powers.";
        commentary = "§21 reiterates the empirical principle: theoretical chemistry, botany, or mineralogy cannot reveal a medicine's healing powers. Only systematic trials on healthy humans (provings) provide reliable drug knowledge. This aphorism directly challenged the rationalist school of medicine of Hahnemann's era. For students, it means: trust the materia medica built from provings over theoretical pharmacological inference.";
        keyThemes = ["empirical knowledge", "provings", "drug nature", "experience"];
      },
      {
        id = 22; number = 22;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Now if experience show (§24-27) that a curative medicine of the similar kind is preferable to one of the opposite character, and that the former always effects a true and perfect cure, while the latter is incapable of doing so — what an immeasurable advantage has homoeopathy over all other possible methods of cure!";
        commentary = "§22 is Hahnemann's comparative argument: experience confirms that similar remedies (homoeopathic) consistently produce true cures, while opposite remedies (allopathic contraria principle) do not. The reference to §24–27 sets up the formal proof of this superiority. Key exam point: §22 is where Hahnemann explicitly compares homoeopathy with allopathy and declares the former superior based on results.";
        keyThemes = ["homoeopathy vs allopathy", "similar vs opposite", "true cure", "comparative advantage"];
      },
      {
        id = 23; number = 23;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "Pure experience and careful observation alone guided my steps. I had no guide but experience itself, no rule but the dictum 'Try and see.' In this way the following observations, made by me during many years, gradually convinced me, that — in order to provide a cure — the following rule, founded on these observations, holds good: find that remedy whose symptoms most resemble the totality of the symptoms of the sick person.";
        commentary = "Hahnemann recounts his empirical journey: guided only by observation and experiment, he arrived at the law of similars. This autobiographical note underscores the inductive, evidence-based origins of homoeopathy. For students, §23 shows that Hahnemann did not invent homoeopathy from theory but discovered it through systematic clinical and experimental observation — a point relevant to discussions of homoeopathy's scientific basis.";
        keyThemes = ["empirical discovery", "observation", "law of similars", "Hahnemann's method"];
      },
      {
        id = 24; number = 24;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "As the natural disease is unable to remove another of its kind which is dissimilar to it, so neither can one artificial disease produced by medicine remove a natural disease which is dissimilar to it. In both cases we see merely a complication of two diseases without the one destroying the other, but each occupying a different part of the organism.";
        commentary = "§24 introduces the principle that dissimilar diseases coexist rather than cancel each other. Two dissimilar diseases occupy different parts of the organism simultaneously — one does not cure the other. This explains why applying a dissimilar medicine (allopathic approach) merely adds a drug disease on top of the natural disease without removing it. This leads directly to the argument for similars in §26.";
        keyThemes = ["dissimilar diseases", "complication of diseases", "disease coexistence", "no cure by dissimilar"];
      },
      {
        id = 25; number = 25;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "It is only when two similar diseases meet together in the organism that a stronger one destroys the weaker. But the disease extinguished by a stronger similar is not the natural disease, it is an artificial one. Now, homoeopathy takes advantage of this natural law by choosing for every malady a remedy whose peculiar disease-exciting power (disease symptom) most nearly resembles the malady in question, in order to excite an artificial disease nearly resembling the natural one, which on account of its greater strength, rapidly extinguishes and supplants the natural disease.";
        commentary = "§25 is the pivotal aphorism explaining HOW homoeopathy cures. When a stronger similar (artificial drug disease) is introduced, it extinguishes the weaker natural disease. The artificial disease is always stronger because it can be increased in dose. Once the natural disease is extinguished, the short-lived artificial drug disease passes off quickly (especially with appropriate potency). This is the complete mechanism: similar → stronger → extinguishes natural disease → drug disease subsides → cure.";
        keyThemes = ["similar disease stronger", "artificial disease", "extinguishment", "mechanism of cure"];
      },
      {
        id = 26; number = 26;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "This depends on the following homoeopathic law of nature, which was sometimes, though unconsciously, put in practice before my time: A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (while differing in kind) is very similar to the former in its manifestations.";
        commentary = "§26 formally states the Law of Similars as a natural law: a stronger similar dynamic affection permanently extinguishes a weaker one. The phrase 'differing in kind' clarifies that the medicine and the disease are not identical (that would be isopathy) but similar in their symptom expression. The word 'permanently' distinguishes homoeopathic cure from mere palliation. Key exam: §26 = formal statement of the natural law underlying similia.";
        keyThemes = ["law of similars", "natural law", "permanent extinguishment", "dynamic affection"];
      },
      {
        id = 27; number = 27;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "The curative power of medicines, therefore, depends on their symptoms, similar to the disease but superior to it in strength, so that each individual case of disease is most surely, radically, rapidly and permanently annihilated and removed only by a medicine capable of producing (in the human system) in the most similar and complete manner the totality of its symptoms.";
        commentary = "§27 is the comprehensive statement of homoeopathic cure: the medicine must be (a) similar in symptoms, (b) superior in strength, and (c) match the totality. All three conditions together ensure the cure is sure, radical, rapid, and permanent — the four qualities of the ideal cure from §2. This aphorism ties §2 and §26 together elegantly. Exam note: 'totality of symptoms' appears explicitly here as the matching target.";
        keyThemes = ["curative power", "similar symptoms", "superior strength", "totality", "permanent annihilation"];
      },
      {
        id = 28; number = 28;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "As this natural law of cure manifests itself in every pure experiment and every true observation in the world, it will be seen that it matters not at all whether or not an explanation can be offered for it. The principle of curing by the administration of remedies which produce similar symptoms to the disease is a fact which can be confirmed by experience, and is therefore permanently established.";
        commentary = "Hahnemann defends homoeopathy empirically: you do not need a theoretical explanation for the law of similars — clinical experience confirms it. This is a significant methodological stance: in Hahnemann's epistemology, reproducible experience trumps theoretical mechanism. For modern students, this aphorism addresses the frequent criticism that homoeopathy 'lacks a mechanism'. Hahnemann would respond: mechanism is secondary to confirmed clinical experience.";
        keyThemes = ["empirical proof", "natural law", "no explanation required", "experience confirms"];
      },
      {
        id = 29; number = 29;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "As every disease (not exclusively surgical) consists only of a special, morbid, dynamic derangement of our vital energy (vital principle) expressing itself by symptoms, and as the cure likewise consists only in the annihilation of this morbid derangement of the vital principle and can therefore only be effected by a change in the vital energy to a healthy condition — now, as the vital principle is a spirit-like dynamis and can therefore only be affected by a spirit-like (dynamic, virtual) influence, it is quite consistent with this that medicines can only annihilate disease by their spirit-like (dynamic, virtual) powers acting on the vital principle.";
        commentary = "§29 is a master synthesis: disease is dynamic derangement → cure requires dynamic restoration → the vital force is immaterial → medicines must act immaterially (dynamically). This chain of reasoning is why potentized (highly diluted and dynamized) medicines are both rational and necessary. Students often ask 'why potentize?' — §29 provides the philosophical answer. The logic: like acts on like; spirit-like vital force responds to spirit-like medicinal influence.";
        keyThemes = ["dynamic disease", "dynamic cure", "spirit-like influence", "potentization rationale"];
      },
      {
        id = 30; number = 30;
        section = "Part I — The Physician's Mission and Homoeopathic Principles";
        authenticText = "It seems as if these natural diseases had been communicated to mankind for no other purpose than to teach the great physician's art how diseases in general may be cured, and to show man that he possesses in medicines the means of curing all diseases.";
        commentary = "§30 is a reflective conclusion to Part I. Natural diseases are, in a sense, nature's own provings — they teach us the pattern of vital-force disturbances and point to their remedies. This aphorism has a teleological flavour: disease exists partly to reveal its own cure. For students, §30 marks the end of the foundational philosophical section. From §31 onwards, Hahnemann moves into more detailed discussions of disease causes and types.";
        keyThemes = ["natural diseases as teachers", "medicines for all diseases", "teleology", "conclusion of Part I"];
      }
    ];

    for (a in aphorisms.values()) {
      store.add(a.number, a);
    };
  };
};
