import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Types "../types/remedy";

module {
  public type RemedyMap = Map.Map<Text, Types.Remedy>;

  public func getById(remedies : RemedyMap, id : Text) : ?Types.Remedy {
    remedies.get(id);
  };

  public func listAll(remedies : RemedyMap) : [Types.Remedy] {
    remedies.values().toArray();
  };

  public func searchByName(remedies : RemedyMap, term : Text) : [Types.Remedy] {
    let lower = term.toLower();
    remedies.values().filter(func(r : Types.Remedy) : Bool {
      r.name.toLower().contains(#text lower) or r.latinName.toLower().contains(#text lower)
    }).toArray();
  };

  public func searchBySymptom(remedies : RemedyMap, keyword : Text) : [Types.Remedy] {
    let lower = keyword.toLower();
    remedies.values().filter(func(r : Types.Remedy) : Bool {
      let inKey = r.keySymptoms.any(func(s : Text) : Bool { s.toLower().contains(#text lower) });
      let inPhys = r.physicalSymptoms.any(func(s : Text) : Bool { s.toLower().contains(#text lower) });
      let inMental = r.mentalPicture.toLower().contains(#text lower);
      inKey or inPhys or inMental
    }).toArray();
  };

  public func upsert(remedies : RemedyMap, remedy : Types.Remedy) : () {
    remedies.add(remedy.id, remedy);
  };

  public func remove(remedies : RemedyMap, id : Text) : () {
    remedies.remove(id);
  };

  public func seedSampleData(remedies : RemedyMap) : () {
    let samples : [Types.Remedy] = [
      {
        id = "arnica-montana";
        name = "Arnica Montana";
        latinName = "Arnica montana";
        description = "The foremost remedy for trauma, injury, bruising, and shock. Derived from the mountain daisy, Arnica is indicated wherever there is physical or emotional trauma, soreness, and bruising.";
        keySymptoms = [
          "Bruising and soreness after injury",
          "Says he is well when seriously ill",
          "Fear of being touched or approached",
          "Bed feels too hard",
          "Muscular overexertion and fatigue",
        ];
        mentalPicture = "Denies being sick; insists he is fine. Irritable and indifferent to others' suffering. Fear of being touched because of the soreness. May be confused after head injury.";
        physicalSymptoms = [
          "Ecchymosis and bruised pain all over",
          "Involuntary defecation and urination",
          "Offensive breath; bitter taste",
          "Nosebleed after every fit of coughing",
          "Left-sided complaints predominate",
        ];
        modalities = "Worse: touch, motion, rest, lying on affected side, damp cold. Better: lying with head low, lying still.";
        clinicalNotes = "First-line remedy for any acute trauma. Use 30C or 200C potency for injuries. Excellent for post-surgical recovery, sports injuries, and childbirth trauma.";
        category = "Trauma & First Aid";
      },
      {
        id = "bryonia-alba";
        name = "Bryonia Alba";
        latinName = "Bryonia alba";
        description = "The great remedy for dryness and stitching pains that are worse from any motion. Bryonia patients want to lie absolutely still and be left alone.";
        keySymptoms = [
          "All complaints worse from any motion",
          "Extreme thirst for large quantities of cold water",
          "Dryness of mucous membranes",
          "Irritable; wants to be left alone",
          "Stitching, tearing pains",
        ];
        mentalPicture = "Extremely irritable; does not want to speak or be disturbed. Preoccupied with business and money worries even when delirious. Anxious about the future.";
        physicalSymptoms = [
          "Dry mouth, lips and tongue",
          "Splitting headache worse from least motion",
          "Hard, dry stool",
          "Pleurisy with stitching chest pain",
          "Joints hot, red, swollen with stitching pain",
        ];
        modalities = "Worse: motion, warmth, eating, morning, in room. Better: lying still, pressure, cold things, rest, open air.";
        clinicalNotes = "Excellent for respiratory complaints, pleuritis, and joint inflammations. The hallmark is: any motion aggravates. Commonly used in 30C–200C range.";
        category = "Respiratory & Joints";
      },
      {
        id = "phosphorus";
        name = "Phosphorus";
        latinName = "Phosphorus";
        description = "A deep-acting polychrest for tall, slender, sensitive, sympathetic individuals who are very impressionable and fear being alone. Associated with bleeding tendencies and burning pains.";
        keySymptoms = [
          "Burning pains; heat in palms",
          "Desire for cold drinks which are vomited when warm",
          "Great sensitivity to external impressions",
          "Hemorrhages; bright red blood",
          "Fear of thunderstorms and the dark",
        ];
        mentalPicture = "Sociable, warm, affectionate but easily exhausted. Hypersensitive to all stimuli — light, sound, odors. Clairvoyant tendencies. Fear of being alone; better with company.";
        physicalSymptoms = [
          "Easy bleeding from small wounds",
          "Laryngitis with loss of voice",
          "Hunger soon after eating",
          "Fatty degeneration of liver",
          "Bilateral pneumonia with rust-colored sputum",
        ];
        modalities = "Worse: lying on left side, twilight, cold, thunderstorms, touch, mental fatigue. Better: eating, cold food, cold open air, sleep, warm bathing.";
        clinicalNotes = "Important remedy for pneumonia, hepatitis, and hemorrhagic conditions. The Phosphorus constitution is artistic, impressionable, and generous. Avoid repetition in sensitive patients.";
        category = "Respiratory & Hemorrhagic";
      },
      {
        id = "sulphur";
        name = "Sulphur";
        latinName = "Sulphur";
        description = "The king of anti-psoric remedies and one of the most commonly used polychrests. Suited to philosophical, untidy individuals with hot, burning skin eruptions and offensive discharges.";
        keySymptoms = [
          "Burning sensations everywhere",
          "Skin itching, burning, worse from warmth and washing",
          "Redness of orifices",
          "Hot feet; uncovers them at night",
          "Offensive odors from body",
        ];
        mentalPicture = "Philosophical, self-centered, theoretical thinker. Unkempt appearance despite intelligence. Lazy, critical, ego-centric. Delusion of being wealthy or great.";
        physicalSymptoms = [
          "Chronic skin conditions: eczema, psoriasis",
          "Empty feeling in stomach at 11 AM",
          "Diarrhea driving out of bed early morning",
          "Leucorrhea excoriating, burning",
          "Cataracts; dark spots before eyes",
        ];
        modalities = "Worse: warmth, bathing, rest, standing, wool clothing. Better: dry warm weather, lying on right side, open air.";
        clinicalNotes = "Often used as an intercurrent remedy to clear suppressed skin disease or to stimulate a sluggish reaction. One of Hahnemann's most important anti-psorics.";
        category = "Skin & Anti-Psoric";
      },
      {
        id = "pulsatilla-nigricans";
        name = "Pulsatilla Nigricans";
        latinName = "Pulsatilla nigricans";
        description = "The windflower remedy — gentle, yielding, changeable. Suited to mild, weepy, affectionate individuals with wandering symptoms and thick, bland yellow-green discharges.";
        keySymptoms = [
          "Symptoms changeable and shifting",
          "Thick, bland, yellow-green discharges",
          "Weeps easily; seeks consolation",
          "Thirstlessness with dry mouth",
          "Worse in warm rooms; better in open air",
        ];
        mentalPicture = "Gentle, mild, yielding, timid. Moody and changeable in emotions. Craves affection and sympathy. Religious disposition. Children cling to mother.";
        physicalSymptoms = [
          "Styes and thick bland eye discharges",
          "Wandering joint pains",
          "Amenorrhea or irregular menses",
          "Indigestion after rich, fatty foods",
          "Varicose veins during pregnancy",
        ];
        modalities = "Worse: warmth, warm room, rich fatty food, evening, lying on left side. Better: open air, cold applications, walking slowly, consolation.";
        clinicalNotes = "One of the best remedies for children and women. Frequently indicated in puberty and menopause. Excellent for styes, otitis media, and hormonal irregularities.";
        category = "Women & Children";
      },
      {
        id = "nux-vomica";
        name = "Nux Vomica";
        latinName = "Nux vomica";
        description = "The remedy for the modern, stressed, over-worked individual with a sedentary lifestyle, stimulant abuse, and hypersensitivity to all impressions.";
        keySymptoms = [
          "Hypersensitivity to noise, light, odors",
          "Indigestion and constipation",
          "Chilly and cannot get warm",
          "Frequent ineffectual urge for stool",
          "Irritable, impatient, quarrelsome",
        ];
        mentalPicture = "Ambitious, driven, competitive. Easily angered and offended. Oversensitive. Cannot endure contradiction. Prone to addiction to stimulants, alcohol, drugs.";
        physicalSymptoms = [
          "Spasmodic cramps in abdomen",
          "Constipation with frequent urge",
          "Hangover, ill effects of alcohol",
          "Cramping of muscles from cold",
          "Nasal congestion worse at night",
        ];
        modalities = "Worse: morning, open air, cold, noise, strong smells, mental exertion, stimulants. Better: rest, evening, strong pressure, nap.";
        clinicalNotes = "Antidote to over-medication and ill effects of modern lifestyle. Compare Strychninum for convulsions. Very useful in first trimester nausea of pregnancy.";
        category = "Digestive & Lifestyle";
      },
      {
        id = "belladonna";
        name = "Belladonna";
        latinName = "Atropa belladonna";
        description = "The remedy for sudden, violent, acute conditions with intense heat, redness, throbbing, and dilation. Everything is intense and comes on suddenly.";
        keySymptoms = [
          "Sudden violent onset of symptoms",
          "High fever with burning, dry skin",
          "Throbbing headache",
          "Delirium with frightful visions",
          "Congestion — face red and hot",
        ];
        mentalPicture = "In acute states: delirium, biting, striking, seeing terrifying visions. Rapid alternation of states. Bores head in pillow during fever.";
        physicalSymptoms = [
          "Throat bright red, swollen, tonsils enlarged",
          "Pupils dilated",
          "Throbbing carotids",
          "Scarlet fever with bright red eruption",
          "Right-sided symptoms predominate",
        ];
        modalities = "Worse: touch, motion, noise, drafts, after 3 PM, jarring. Better: light covering, semi-erect position, bending backwards.";
        clinicalNotes = "The first remedy to think of in acute fevers with the classic triad: sudden onset, burning heat, throbbing. Compare Ferrum phosphoricum in gentler cases.";
        category = "Acute Fevers & Inflammations";
      },
      {
        id = "calcarea-carbonica";
        name = "Calcarea Carbonica";
        latinName = "Calcarea carbonica";
        description = "One of Hahnemann's great anti-psorics. A deep constitutional remedy suited to fair, fat, flabby individuals who are slow but persistent, cold, and prone to glandular swellings.";
        keySymptoms = [
          "Cold damp feet; sweaty head in children",
          "Slow, methodical, obstinate",
          "Desire for eggs and indigestible things",
          "Glandular swellings",
          "Anxiety about health and future",
        ];
        mentalPicture = "Reliable, thorough, hard-working but slow. Great anxiety about health — fear of insanity or serious disease. Overwhelmed by responsibilities. Stubborn.";
        physicalSymptoms = [
          "Sour taste, sour vomiting in children",
          "Delayed dentition and bone development",
          "Fontanelle remains open too long",
          "Profuse sweating on slightest exertion",
          "Uterine polyps and fibroids",
        ];
        modalities = "Worse: cold damp, exertion, standing, milk, full moon. Better: dry climate, lying on painful side, constipation.";
        clinicalNotes = "One of the most important constitutional remedies, particularly for children and overweight adults. Slow metabolism, low stamina, but industrious when well.";
        category = "Constitutional & Pediatric";
      },
      {
        id = "lycopodium-clavatum";
        name = "Lycopodium Clavatum";
        latinName = "Lycopodium clavatum";
        description = "A deep polychrest suited to intellectual individuals with weak digestion and liver function, who compensate for inner insecurity with arrogance and domineering behavior.";
        keySymptoms = [
          "Bloating and flatulence after eating",
          "Symptoms right-sided or moving right to left",
          "Worse 4–8 PM",
          "Cowardly outwardly but craves power",
          "Desire for sweets and warm food",
        ];
        mentalPicture = "Intellectually superior, proud, bossy — yet inwardly insecure and cowardly. Anticipation anxiety before performing. Fear of failing, losing power, or being alone.";
        physicalSymptoms = [
          "Fan-like motion of alae nasi",
          "Liver complaints and jaundice",
          "Impotence in young men",
          "Kidney stones on right side",
          "Deep furrowed brow even in sleep",
        ];
        modalities = "Worse: 4–8 PM, right side, warm room, warm food, pressure of clothes. Better: warm drinks, motion, cold applications, belching.";
        clinicalNotes = "Excellent for chronic liver disease, irritable bowel, and prostate complaints. Often completes the work of Sulphur. Frequently used as a constitutional remedy in men.";
        category = "Liver & Digestive";
      },
      {
        id = "natrum-muriaticum";
        name = "Natrum Muriaticum";
        latinName = "Natrum muriaticum";
        description = "The salt remedy — profound, closed, grieving individuals who cannot let go of old hurts. Watery secretions, thirst, and aversion to consolation are hallmarks.";
        keySymptoms = [
          "Dwells on past grief and disappointments",
          "Aversion to consolation when sad",
          "Craving for salt",
          "Headache from sunrise to sunset",
          "Watery discharges like egg white",
        ];
        mentalPicture = "Reserved, sensitive, romantic. Holds on to grief. Cries alone, avoids crying in public. Feels deeply but shows little outwardly. Disappointed in love.";
        physicalSymptoms = [
          "Herpes on lips after emotional grief or sun exposure",
          "Mapped tongue with vesicles",
          "Constipation with dry crumbling stools",
          "Emaciation despite good appetite",
          "Intermittent fever with chill from 10–11 AM",
        ];
        modalities = "Worse: heat of sun, 10 AM, seashore, consolation, mental exertion, grief. Better: open air, cold bathing, going without regular meals, pressure against back.";
        clinicalNotes = "Important remedy for chronic grief reactions, herpes, and migraines. Hahnemann's sodium chloride potentized. Compare Ignatia for acute grief.";
        category = "Grief & Emotional";
      },
      {
        id = "apis-mellifica";
        name = "Apis Mellifica";
        latinName = "Apis mellifica";
        description = "The honeybee remedy for stinging, burning, edematous conditions. Characterised by rosy, translucent swellings that pit on pressure, thirstlessness, and heat aggravation.";
        keySymptoms = [
          "Burning, stinging pains",
          "Rosy, translucent edematous swellings",
          "Thirstlessness even with fever",
          "Worse from heat in any form",
          "Jealous, busy, restless",
        ];
        mentalPicture = "Jealous, suspicious, apathetic or excitable. Busy as a bee; restless. Can be clumsy. Grief and fright as causation. Awkward — drops things.";
        physicalSymptoms = [
          "Sudden piercing, stinging pains",
          "Edema of eyelids, face, extremities",
          "Urticaria with stinging and itching",
          "Ascites and anasarca",
          "Ovarian cysts with right-sided pain",
        ];
        modalities = "Worse: heat, hot room, touch, pressure, after sleep, right side. Better: cold applications, cold bathing, open air, uncovering.";
        clinicalNotes = "Essential remedy for allergic reactions, angioedema, insect stings, and urinary tract infections with stitching pain. Compare Belladonna for sudden heat without edema.";
        category = "Allergic & Edematous";
      },
      {
        id = "ignatia-amara";
        name = "Ignatia Amara";
        latinName = "Ignatia amara";
        description = "The primary remedy for acute grief, disappointment, and emotional shock. Ignatia patients show contradictory and paradoxical symptoms — they sigh frequently and cannot be comforted.";
        keySymptoms = [
          "Frequent, involuntary sighing",
          "Ailments from grief, disappointed love, fright",
          "Contradictory and paradoxical symptoms",
          "Lump sensation in throat (globus hystericus)",
          "Rapid alternation of moods",
        ];
        mentalPicture = "Highly sensitive, idealistic, romantic. Profound grief reactions. Silent grief with much sighing. Cannot reconcile with loss. Inappropriate laughing or weeping.";
        physicalSymptoms = [
          "Headache as if a nail driven in",
          "Sore throat better from swallowing solids",
          "Empty, sinking feeling in stomach not relieved by eating",
          "Hiccough after meals or emotional upset",
          "Spasmodic, dry cough from tickle in throat",
        ];
        modalities = "Worse: morning, open air, after meals, coffee, smoking, grief, consolation. Better: change of position, lying on painful side, warmth, hard pressure, eating.";
        clinicalNotes = "The acute counterpart to Natrum Muriaticum. First remedy to consider in fresh grief, acute bereavement, and emotional shock. Often yields quickly in 200C or 1M potency.";
        category = "Grief & Emotional";
      },
    ];

    for (remedy in samples.values()) {
      remedies.add(remedy.id, remedy);
    };
  };
};
