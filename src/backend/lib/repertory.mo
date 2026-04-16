import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

import RepertoryTypes "../types/repertory";

module {
  public type RepertoryEntry = RepertoryTypes.RepertoryEntry;
  public type RepertoryRemedy = RepertoryTypes.RepertoryRemedy;

  // Returns all repertory entries
  public func listEntries(store : Map.Map<Text, RepertoryEntry>) : [RepertoryEntry] {
    store.values().toArray()
  };

  // Returns entries whose symptomName, description, or remedy names contain the term (case-insensitive)
  public func searchEntries(store : Map.Map<Text, RepertoryEntry>, symptom : Text) : [RepertoryEntry] {
    let lower = symptom.toLower();
    store.values().filter(func(entry : RepertoryEntry) : Bool {
      let nameMatch = entry.symptomName.toLower().contains(#text lower);
      let descMatch = entry.description.toLower().contains(#text lower);
      let catMatch = entry.symptomCategory.toLower().contains(#text lower);
      let remedyMatch = entry.remedies.any(func(r : RepertoryRemedy) : Bool {
        r.remedyName.toLower().contains(#text lower)
      });
      nameMatch or descMatch or catMatch or remedyMatch
    }).toArray()
  };

  // Returns a single entry by id
  public func getEntry(store : Map.Map<Text, RepertoryEntry>, id : Text) : ?RepertoryEntry {
    store.get(id)
  };

  // Seeds the store with 27 symptom entries across 10 categories
  public func seed(store : Map.Map<Text, RepertoryEntry>) : () {
    let entries : [RepertoryEntry] = [
      // ── MIND ──────────────────────────────────────────────────────────────
      {
        id = "mind-anxiety-night";
        symptomCategory = "Mind";
        symptomName = "Anxiety worse at night";
        description = "Intense anxiety and restlessness that worsens after midnight, with fear and anguish.";
        remedies = [
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 3; notes = "Classic remedy — anxiety after midnight, restlessness, fear of death" },
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 3; notes = "Sudden intense anxiety with fear, especially after fright" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 2; notes = "Anxiety with desire for company and reassurance" },
          { remedyId = "calc-carb"; remedyName = "Calcarea Carbonica"; grade = 2; notes = "Anxiety about health and future, worse at night" },
        ];
      },
      {
        id = "mind-fear-death";
        symptomCategory = "Mind";
        symptomName = "Fear of death";
        description = "Pronounced fear of dying, with anxiety and restlessness, often sudden onset.";
        remedies = [
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 3; notes = "Predicts exact time of death; intense sudden fear" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 3; notes = "Fear of death with restlessness, especially at night" },
          { remedyId = "nit-ac"; remedyName = "Nitric Acid"; grade = 2; notes = "Despairs of recovery; fear of death" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 2; notes = "Fear when alone; wants company" },
        ];
      },
      {
        id = "mind-restlessness";
        symptomCategory = "Mind";
        symptomName = "Restlessness";
        description = "Physical and mental restlessness; constant need to move or change position.";
        remedies = [
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 3; notes = "Restlessness with anxiety; moves from place to place" },
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 3; notes = "Restlessness due to pain; better from movement" },
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 2; notes = "Restlessness with fear and anxiety" },
          { remedyId = "zinc"; remedyName = "Zincum Metallicum"; grade = 2; notes = "Restless legs; fidgety feet" },
        ];
      },
      {
        id = "mind-grief-silent";
        symptomCategory = "Mind";
        symptomName = "Grief / Silent grief";
        description = "Deep grief held internally; does not weep openly; brooding and sighing.";
        remedies = [
          { remedyId = "nat-mur"; remedyName = "Natrum Muriaticum"; grade = 3; notes = "Dwells on past grief; weeps alone; consolation aggravates" },
          { remedyId = "ign"; remedyName = "Ignatia Amara"; grade = 3; notes = "Acute grief with sighing; contradictory symptoms" },
          { remedyId = "staph"; remedyName = "Staphysagria"; grade = 2; notes = "Silent indignation; suppressed grief and anger" },
          { remedyId = "aur"; remedyName = "Aurum Metallicum"; grade = 2; notes = "Deep grief with hopelessness; loathing of life" },
        ];
      },
      {
        id = "mind-irritability-morning";
        symptomCategory = "Mind";
        symptomName = "Irritability in the morning";
        description = "Marked irritability on waking; cross and peevish before breakfast.";
        remedies = [
          { remedyId = "nux-vom"; remedyName = "Nux Vomica"; grade = 3; notes = "Irritable on waking, better after eating" },
          { remedyId = "bry"; remedyName = "Bryonia Alba"; grade = 2; notes = "Irritable, wants to be left alone, worse any motion" },
          { remedyId = "cham"; remedyName = "Chamomilla"; grade = 2; notes = "Extremely irritable; nothing pleases" },
          { remedyId = "lyc"; remedyName = "Lycopodium"; grade = 2; notes = "Irritable on waking; dictatorial at home" },
        ];
      },
      // ── HEAD ──────────────────────────────────────────────────────────────
      {
        id = "head-headache-sun";
        symptomCategory = "Head";
        symptomName = "Headache from sun exposure";
        description = "Head pain brought on or worsened by exposure to sun or heat; often throbbing.";
        remedies = [
          { remedyId = "bell"; remedyName = "Belladonna"; grade = 3; notes = "Throbbing headache from sun; face flushed, eyes glassy" },
          { remedyId = "glon"; remedyName = "Glonoine"; grade = 3; notes = "Sunstroke headache; surging of blood to head" },
          { remedyId = "nat-carb"; remedyName = "Natrum Carbonicum"; grade = 2; notes = "Chronic effects of sunstroke" },
          { remedyId = "lach"; remedyName = "Lachesis"; grade = 2; notes = "Headache worse in sun; left-sided" },
        ];
      },
      {
        id = "head-headache-occipital";
        symptomCategory = "Head";
        symptomName = "Occipital headache";
        description = "Pain at the back of the head (occiput), often extending to neck and shoulders.";
        remedies = [
          { remedyId = "gels"; remedyName = "Gelsemium"; grade = 3; notes = "Heavy, dull occipital headache; band-like pressure" },
          { remedyId = "sil"; remedyName = "Silicea"; grade = 2; notes = "Occipital pain extending over vertex to forehead" },
          { remedyId = "cimic"; remedyName = "Cimicifuga"; grade = 2; notes = "Occipital headache with neck stiffness" },
          { remedyId = "phos-ac"; remedyName = "Phosphoric Acid"; grade = 2; notes = "Occipital headache from mental exhaustion" },
        ];
      },
      {
        id = "head-headache-nausea";
        symptomCategory = "Head";
        symptomName = "Headache with nausea";
        description = "Head pain accompanied by nausea, vomiting, or gastric disturbance.";
        remedies = [
          { remedyId = "iris"; remedyName = "Iris Versicolor"; grade = 3; notes = "Migraine with violent vomiting; burning in throat" },
          { remedyId = "ipec"; remedyName = "Ipecacuanha"; grade = 3; notes = "Persistent nausea with headache; clean tongue" },
          { remedyId = "nux-vom"; remedyName = "Nux Vomica"; grade = 2; notes = "Gastric headache with nausea; worse mornings" },
          { remedyId = "tab"; remedyName = "Tabacum"; grade = 2; notes = "Sick headache with deathly nausea and coldness" },
        ];
      },
      // ── FEVER ─────────────────────────────────────────────────────────────
      {
        id = "fever-high-delirium";
        symptomCategory = "Fever";
        symptomName = "High fever with delirium";
        description = "Sudden high temperature with mental confusion, delirium, or hallucinations.";
        remedies = [
          { remedyId = "bell"; remedyName = "Belladonna"; grade = 3; notes = "Sudden high fever; flushed face; glassy eyes; delirium" },
          { remedyId = "hyos"; remedyName = "Hyoscyamus Niger"; grade = 3; notes = "Muttering delirium; picks at bedclothes; loquacity" },
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 2; notes = "Sudden violent fever; great thirst; skin dry and hot" },
          { remedyId = "stram"; remedyName = "Stramonium"; grade = 2; notes = "Violent delirium; desire for light and company" },
        ];
      },
      {
        id = "fever-intermittent";
        symptomCategory = "Fever";
        symptomName = "Intermittent fever";
        description = "Recurring periodic fever with chills, heat, and sweat stages (malaria-type pattern).";
        remedies = [
          { remedyId = "chin"; remedyName = "China Officinalis"; grade = 3; notes = "Debility from loss of fluids; periodic fevers" },
          { remedyId = "nat-mur"; remedyName = "Natrum Muriaticum"; grade = 3; notes = "Intermittent fever with thirst; worse 10–11 am" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 2; notes = "Periodic fever; chills with restlessness" },
          { remedyId = "eupath-perf"; remedyName = "Eupatorium Perfoliatum"; grade = 2; notes = "Bone-breaking pains with fever; great thirst before chill" },
        ];
      },
      {
        id = "fever-thirst";
        symptomCategory = "Fever";
        symptomName = "Fever with intense thirst";
        description = "High temperature accompanied by great thirst for cold or large quantities of water.";
        remedies = [
          { remedyId = "bry"; remedyName = "Bryonia Alba"; grade = 3; notes = "Great thirst for large cold drinks at long intervals" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 3; notes = "Intense thirst for ice-cold water during fever" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 2; notes = "Thirst for sips of warm water; restlessness" },
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 2; notes = "Great thirst for cold water at onset of fever" },
        ];
      },
      // ── STOMACH ───────────────────────────────────────────────────────────
      {
        id = "stomach-nausea-motion";
        symptomCategory = "Stomach";
        symptomName = "Nausea worse from motion";
        description = "Persistent nausea triggered or worsened by any movement; motion sickness.";
        remedies = [
          { remedyId = "cocc"; remedyName = "Cocculus Indicus"; grade = 3; notes = "Sea/car sickness; nausea from watching moving objects" },
          { remedyId = "ipec"; remedyName = "Ipecacuanha"; grade = 3; notes = "Constant nausea not relieved by vomiting; clean tongue" },
          { remedyId = "tab"; remedyName = "Tabacum"; grade = 3; notes = "Deathly nausea; cold sweat; pallor; worse least motion" },
          { remedyId = "petro"; remedyName = "Petroleum"; grade = 2; notes = "Nausea with travel; worse sea/car; occipital headache" },
        ];
      },
      {
        id = "stomach-burning-cold-drinks";
        symptomCategory = "Stomach";
        symptomName = "Burning stomach pain relieved by cold drinks";
        description = "Intense burning sensation in stomach or oesophagus that is soothed by cold liquids.";
        remedies = [
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 3; notes = "Burning in stomach; craves and is relieved by cold drinks" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 2; notes = "Burning pains paradoxically relieved by heat (usually); but some cases cold" },
          { remedyId = "iris"; remedyName = "Iris Versicolor"; grade = 2; notes = "Burning from mouth to anus; acrid vomiting" },
          { remedyId = "rob"; remedyName = "Robinia"; grade = 2; notes = "Hyperacidity; sour eructations; burning worse lying" },
        ];
      },
      {
        id = "stomach-excessive-hunger";
        symptomCategory = "Stomach";
        symptomName = "Excessive hunger";
        description = "Ravenous appetite; hunger soon after eating; eats much but feels weak or loses weight.";
        remedies = [
          { remedyId = "iod"; remedyName = "Iodum"; grade = 3; notes = "Ravenous hunger; eats and yet loses flesh; restless" },
          { remedyId = "nat-mur"; remedyName = "Natrum Muriaticum"; grade = 2; notes = "Hungry yet losing weight; craves salt" },
          { remedyId = "lyc"; remedyName = "Lycopodium"; grade = 2; notes = "Hungry but full after few bites; hungry again soon" },
          { remedyId = "sulph"; remedyName = "Sulphur"; grade = 2; notes = "Hungry at 11 am; skin affections; burning" },
          { remedyId = "cina"; remedyName = "Cina"; grade = 2; notes = "Canine hunger especially in children; worms" },
        ];
      },
      // ── RESPIRATORY ───────────────────────────────────────────────────────
      {
        id = "resp-dry-cough-night";
        symptomCategory = "Respiratory";
        symptomName = "Dry cough worse at night";
        description = "Hard, dry, teasing cough that predominantly disturbs sleep and worsens at night.";
        remedies = [
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 3; notes = "Dry croupy cough at night; sudden onset after cold" },
          { remedyId = "bell"; remedyName = "Belladonna"; grade = 3; notes = "Dry spasmodic cough; worse at night; irritating" },
          { remedyId = "hyos"; remedyName = "Hyoscyamus Niger"; grade = 2; notes = "Dry spasmodic cough lying down; relieved sitting up" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 2; notes = "Dry cough worse evening and lying down; chest tight" },
        ];
      },
      {
        id = "resp-croup-barking";
        symptomCategory = "Respiratory";
        symptomName = "Croup / barking cough";
        description = "Harsh, barking cough with hoarseness; membrane-like deposits in throat; worse at night.";
        remedies = [
          { remedyId = "acon"; remedyName = "Aconitum Napellus"; grade = 3; notes = "Croup at night after cold dry wind; sudden onset" },
          { remedyId = "hep-sul"; remedyName = "Hepar Sulphuris"; grade = 3; notes = "Croupy cough with rattling; worse cold; very sensitive" },
          { remedyId = "spong"; remedyName = "Spongia Tosta"; grade = 3; notes = "Barking saw-like cough; worse before midnight" },
          { remedyId = "kali-bich"; remedyName = "Kali Bichromicum"; grade = 2; notes = "Membranous croup; tough stringy mucus" },
        ];
      },
      {
        id = "resp-rattling-chest";
        symptomCategory = "Respiratory";
        symptomName = "Rattling mucus in chest";
        description = "Audible rattling or bubbling sounds in chest from accumulated mucus; may be unable to expectorate.";
        remedies = [
          { remedyId = "ant-tart"; remedyName = "Antimonium Tartaricum"; grade = 3; notes = "Loud rattling; too weak to raise mucus; drowsy, sweaty" },
          { remedyId = "hep-sul"; remedyName = "Hepar Sulphuris"; grade = 2; notes = "Rattling loose cough; very sensitive to cold" },
          { remedyId = "ipec"; remedyName = "Ipecacuanha"; grade = 2; notes = "Rattling with constant nausea; spasmodic breathing" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 2; notes = "Crackling in chest; haemoptysis; trembling after cough" },
        ];
      },
      // ── EXTREMITIES ───────────────────────────────────────────────────────
      {
        id = "ext-joint-cold-damp";
        symptomCategory = "Extremities";
        symptomName = "Joint pain worse in cold damp weather";
        description = "Rheumatic pains in joints that are aggravated by cold, wet conditions; may improve with warmth.";
        remedies = [
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 3; notes = "Stiffness worse first motion, better continued motion; hot damp weather aggravates" },
          { remedyId = "dulc"; remedyName = "Dulcamara"; grade = 3; notes = "Rheumatism in cold wet weather; worse change to damp" },
          { remedyId = "calc-carb"; remedyName = "Calcarea Carbonica"; grade = 2; notes = "Cold damp joints; sweat on head; chilly" },
          { remedyId = "nux-vom"; remedyName = "Nux Vomica"; grade = 2; notes = "Rheumatism worse cold; chilly irritable patient" },
        ];
      },
      {
        id = "ext-restless-legs";
        symptomCategory = "Extremities";
        symptomName = "Restless legs at night";
        description = "Irresistible urge to move legs at night; creeping or crawling sensation; prevents sleep.";
        remedies = [
          { remedyId = "zinc"; remedyName = "Zincum Metallicum"; grade = 3; notes = "Restless feet at night; cannot keep still; exhaustion" },
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 2; notes = "Restless limbs; must move constantly; worse rest" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 2; notes = "Restless legs with anxiety at night" },
          { remedyId = "mag-phos"; remedyName = "Magnesia Phosphorica"; grade = 2; notes = "Cramps and twitching in legs at night" },
        ];
      },
      // ── SKIN ──────────────────────────────────────────────────────────────
      {
        id = "skin-urticaria";
        symptomCategory = "Skin";
        symptomName = "Urticaria / Hives";
        description = "Raised itching wheals on the skin; may appear suddenly and shift location.";
        remedies = [
          { remedyId = "apis"; remedyName = "Apis Mellifica"; grade = 3; notes = "Rosy, burning, stinging oedematous urticaria; worse heat" },
          { remedyId = "urt-urens"; remedyName = "Urtica Urens"; grade = 3; notes = "Annual urticaria; intense itching and burning; shellfish allergy" },
          { remedyId = "nat-mur"; remedyName = "Natrum Muriaticum"; grade = 2; notes = "Urticaria from exertion; worse heat; suppressed grief" },
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 2; notes = "Intense itching urticaria; worse cold wet" },
        ];
      },
      {
        id = "skin-burning-eruptions";
        symptomCategory = "Skin";
        symptomName = "Burning eruptions";
        description = "Skin eruptions with marked burning sensation; may look vesicular or pustular.";
        remedies = [
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 3; notes = "Burning relieved by heat; dry scaly eruptions; restlessness" },
          { remedyId = "sulph"; remedyName = "Sulphur"; grade = 3; notes = "Burning itching worse heat and washing; red orifices" },
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 2; notes = "Vesicular eruptions with intense burning; better hot applications" },
          { remedyId = "cant"; remedyName = "Cantharis"; grade = 2; notes = "Violent burning blisters; burning before, during, after urination" },
        ];
      },
      {
        id = "skin-dry-itching";
        symptomCategory = "Skin";
        symptomName = "Dry itching skin";
        description = "Generalised dryness of skin with intense itching; scratching may cause bleeding or no relief.";
        remedies = [
          { remedyId = "sulph"; remedyName = "Sulphur"; grade = 3; notes = "Dry scaly itching skin; worse warmth of bed and washing" },
          { remedyId = "psor"; remedyName = "Psorinum"; grade = 3; notes = "Dirty-looking dry skin; intense itching; worse warmth of bed" },
          { remedyId = "alum"; remedyName = "Alumina"; grade = 2; notes = "Extreme dryness of skin and mucous membranes; itching without eruptions" },
          { remedyId = "petr"; remedyName = "Petroleum"; grade = 2; notes = "Rough cracked skin; worse winter; fissures that bleed" },
        ];
      },
      // ── BACK ──────────────────────────────────────────────────────────────
      {
        id = "back-lower-pain-motion";
        symptomCategory = "Back";
        symptomName = "Lower back pain worse from motion";
        description = "Lumbar or sacral pain that worsens with any movement, lifting, or change of position.";
        remedies = [
          { remedyId = "bry"; remedyName = "Bryonia Alba"; grade = 3; notes = "Every motion aggravates; must lie perfectly still; hard pressure relieves" },
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 2; notes = "Pain worse on first motion, better continued movement" },
          { remedyId = "nux-vom"; remedyName = "Nux Vomica"; grade = 2; notes = "Must sit up to turn in bed; spasmodic back pain" },
          { remedyId = "kali-carb"; remedyName = "Kali Carbonicum"; grade = 2; notes = "Weakness and pain in lower back; worse 3 am" },
        ];
      },
      {
        id = "back-stiff-neck-morning";
        symptomCategory = "Back";
        symptomName = "Stiff neck in the morning";
        description = "Cervical stiffness and pain on waking that improves with movement during the day.";
        remedies = [
          { remedyId = "rhus-tox"; remedyName = "Rhus Toxicodendron"; grade = 3; notes = "Stiffness worse on first motion, better continued movement and warmth" },
          { remedyId = "lac-c"; remedyName = "Lachnanthes"; grade = 2; notes = "Stiff neck drawing to one side; rheumatic torticollis" },
          { remedyId = "cimic"; remedyName = "Cimicifuga"; grade = 2; notes = "Stiff neck with pain in nape; worse cold damp" },
          { remedyId = "calc-phos"; remedyName = "Calcarea Phosphorica"; grade = 2; notes = "Neck stiffness in young persons; worse cold" },
        ];
      },
      // ── SLEEP ─────────────────────────────────────────────────────────────
      {
        id = "sleep-mental-activity";
        symptomCategory = "Sleep";
        symptomName = "Sleeplessness from mental activity";
        description = "Inability to sleep due to racing thoughts, active mind, or mental overwork.";
        remedies = [
          { remedyId = "coff"; remedyName = "Coffea Cruda"; grade = 3; notes = "Sleeplessness from rush of ideas; mind overactive; slightest noise wakes" },
          { remedyId = "nux-vom"; remedyName = "Nux Vomica"; grade = 3; notes = "Wakes at 3–4 am with busy mind; from overwork or stimulants" },
          { remedyId = "ign"; remedyName = "Ignatia Amara"; grade = 2; notes = "Sleeplessness from grief or emotional stress" },
          { remedyId = "calc-carb"; remedyName = "Calcarea Carbonica"; grade = 2; notes = "Restless sleeplessness; many thoughts; anxiety about health" },
        ];
      },
      {
        id = "sleep-day-night-reversal";
        symptomCategory = "Sleep";
        symptomName = "Sleepy by day, wide awake at night";
        description = "Reversal of normal sleep pattern; drowsy during daytime but cannot sleep at night.";
        remedies = [
          { remedyId = "lyc"; remedyName = "Lycopodium"; grade = 3; notes = "Sleepy by day; wakes at night with empty feeling" },
          { remedyId = "phos"; remedyName = "Phosphorus"; grade = 2; notes = "Sleepy after meals; restless at night; vivid dreams" },
          { remedyId = "sulph"; remedyName = "Sulphur"; grade = 2; notes = "Drowsy by day; wide awake at night; early morning waking" },
          { remedyId = "ars-alb"; remedyName = "Arsenicum Album"; grade = 2; notes = "Wide awake midnight–2 am; then sleepy in day" },
        ];
      },
      // ── EYES ──────────────────────────────────────────────────────────────
      {
        id = "eyes-conjunctivitis-burning";
        symptomCategory = "Eyes";
        symptomName = "Conjunctivitis with burning discharge";
        description = "Inflammation of conjunctiva with red eyes, burning pain, and acrid or bland discharge.";
        remedies = [
          { remedyId = "allium-c"; remedyName = "Allium Cepa"; grade = 3; notes = "Acrid nasal discharge with bland eye discharge; hay fever" },
          { remedyId = "euphr"; remedyName = "Euphrasia"; grade = 3; notes = "Acrid burning eye discharge with bland nasal discharge" },
          { remedyId = "apis"; remedyName = "Apis Mellifica"; grade = 2; notes = "Oedematous swelling; stinging; better cold applications" },
          { remedyId = "arg-nit"; remedyName = "Argentum Nitricum"; grade = 2; notes = "Purulent ophthalmia; copious discharge; corners affected" },
        ];
      },
      // ── THROAT ────────────────────────────────────────────────────────────
      {
        id = "throat-pain-swallowing";
        symptomCategory = "Throat";
        symptomName = "Throat pain worse on swallowing";
        description = "Sore throat with sharp or burning pain aggravated by swallowing food, liquids, or saliva.";
        remedies = [
          { remedyId = "bell"; remedyName = "Belladonna"; grade = 3; notes = "Bright red throat; tonsils enlarged; worse empty swallowing" },
          { remedyId = "merc-sol"; remedyName = "Mercurius Solubilis"; grade = 3; notes = "Throat raw; profuse saliva; offensive breath; worse at night" },
          { remedyId = "lach"; remedyName = "Lachesis"; grade = 3; notes = "Left-sided; worse empty swallowing; tight collar intolerable" },
          { remedyId = "hep-sul"; remedyName = "Hepar Sulphuris"; grade = 2; notes = "Splinter sensation in throat; very sensitive to cold" },
          { remedyId = "ign"; remedyName = "Ignatia Amara"; grade = 2; notes = "Sensation of lump; relieved by swallowing solids" },
        ];
      },
    ];

    for (entry in entries.vals()) {
      store.add(entry.id, entry);
    };
  };
};
