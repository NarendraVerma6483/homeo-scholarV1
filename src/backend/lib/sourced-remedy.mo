import Map "mo:core/Map";
import Text "mo:core/Text";

import SourcedRemedyTypes "../types/sourced-remedy";

module {
  public type SourcedRemedy = SourcedRemedyTypes.SourcedRemedy;
  public type MateriaSource = SourcedRemedyTypes.MateriaSource;

  // Returns all sourced remedy entries
  public func listAll(store : Map.Map<Text, SourcedRemedy>) : [SourcedRemedy] {
    store.values().toArray()
  };

  // Returns a single sourced remedy by its unique id
  public func getById(store : Map.Map<Text, SourcedRemedy>, id : Text) : ?SourcedRemedy {
    store.get(id)
  };

  // Returns all source entries for a given remedy name — case-insensitive partial match
  public func listByRemedyName(store : Map.Map<Text, SourcedRemedy>, name : Text) : [SourcedRemedy] {
    let lower = name.toLower();
    store.values().filter(func(r) { r.name.toLower().contains(#text lower) }).toArray()
  };

  // Returns all entries belonging to a given source
  public func listBySource(store : Map.Map<Text, SourcedRemedy>, source : MateriaSource) : [SourcedRemedy] {
    store.values().filter(func(r) {
      switch (r.source, source) {
        case (#boericke, #boericke) true;
        case (#allensKeynotes, #allensKeynotes) true;
        case (#lotus, #lotus) true;
        case (_,_) false;
      }
    }).toArray()
  };

  // Seeds 50 remedies × 3 sources = 150 entries
  public func seed(store : Map.Map<Text, SourcedRemedy>) : () {
    let entries : [SourcedRemedy] = [
      // ── ARNICA MONTANA ──────────────────────────────────────────
      {
        id = "arnica-montana-boericke";
        remedyId = "arnica-montana";
        source = #boericke;
        name = "Arnica Montana";
        latinName = "Arnica montana";
        keynotes = [
          "The great remedy for effects of injuries, blows, bruises, contusions, and all forms of trauma",
          "Fear of being touched; fears approach of persons near them",
          "Sore, lame, bruised feeling throughout the body as if beaten",
          "Tendency to small haemorrhages; petechial spots on skin",
          "Patient says he is well when quite ill; does not want a doctor"
        ];
        mentalSymptoms = [
          "Indifference, unconsciousness; when spoken to answers correctly but relapses",
          "Aversion to being touched; dreads approach because of pain from contact",
          "Thinks he is well, refuses medical aid",
          "Fear of instant death from a stroke; nervous; can't bear pain",
          "Brain fatigue; stupor after injuries to head",
          "Hopeless about recovery"
        ];
        physicalSymptoms = [
          "Body feels sore and bruised; bed feels too hard",
          "Traumatic neuralgia, especially after operations or injuries",
          "Ecchymoses; black-and-blue discolouration from injuries",
          "Nosebleed from trauma; blood dark and clotted",
          "Gout with extreme sensitiveness; joints swollen and sore",
          "Purpura haemorrhagica; tendency to haemorrhage into tissue",
          "Chronic myalgia; muscles fatigued and sore"
        ];
        modalities = {
          worse = ["Rest", "Lying still", "Wine", "Damp cold", "Motion"];
          better = ["Lying down with head low", "Movement when chronic", "Pressure"];
        };
        clinicalUses = [
          "Trauma and injuries — first aid remedy",
          "Post-surgical pain and bruising",
          "Concussion and head injuries",
          "Rheumatism and gout",
          "Haemorrhage and ecchymosis",
          "Overexertion and muscular soreness"
        ];
        constitution = "Suits plethoric, robust individuals who are prone to venous congestion. Particularly useful after mechanical injuries. The Arnica patient often denies illness and refuses help despite being in obvious distress.";
      },
      {
        id = "arnica-montana-allens";
        remedyId = "arnica-montana";
        source = #allensKeynotes;
        name = "Arnica Montana";
        latinName = "Arnica montana";
        keynotes = [
          "Great prostration with desire to lie down; body aches as if beaten",
          "Everything on which patient lies seems too hard",
          "Involuntary defecation and urination; stupor from injuries",
          "Whole body hypersensitive; slightest touch causes pain",
          "Small haemorrhages on skin: black and blue spots",
          "Patient says there is nothing wrong with him"
        ];
        mentalSymptoms = [
          "Afraid of being struck by those coming towards him",
          "Says he is well, does not want the doctor"
        ];
        physicalSymptoms = [
          "Bed feels too hard; soreness as if bruised",
          "Traumatic haemorrhages; dark, clotted blood"
        ];
        modalities = {
          worse = ["Touch", "Rest", "Motion (acute)"];
          better = ["Lying with head low", "Open air"];
        };
        clinicalUses = [
          "All effects of trauma and mechanical injuries",
          "Post-operative pain"
        ];
        constitution = "Plethoric, ruddy subjects prone to trauma and haemorrhage.";
      },

      // ── BRYONIA ALBA ─────────────────────────────────────────────
      {
        id = "bryonia-alba-boericke";
        remedyId = "bryonia-alba";
        source = #boericke;
        name = "Bryonia Alba";
        latinName = "Bryonia alba";
        keynotes = [
          "Aggravation from any motion, however slight; absolute rest relieves",
          "Stitching, tearing pains worse on movement and deep breathing",
          "Great thirst for large quantities of cold water at long intervals",
          "Dryness of all mucous membranes: lips parched and dry",
          "Irritable, wishes to be left alone; cross and touchy"
        ];
        mentalSymptoms = [
          "Very irritable; disposed to be angry and excited",
          "Thinks only of business; delirium of business matters",
          "Anxiety about the future, especially financial matters",
          "Talks of home and wants to go home when away",
          "Melancholy and despondent; tearful in children",
          "Mental symptoms relieved by perspiration"
        ];
        physicalSymptoms = [
          "Stitching pains in chest, worse on inspiration and motion",
          "Constipation: stools dry, hard, large as if burnt",
          "Headache as if brain would split on motion; bursting type",
          "Dry pleuritis with stitching pains; must lie on painful side",
          "Joints red, swollen, hot; worse on slightest movement",
          "Cough dry, hard, racking; worse after eating, in warm room",
          "Gastric fever with coated tongue and bilious vomiting"
        ];
        modalities = {
          worse = ["Motion", "Exertion", "Morning", "Eating", "Warmth", "Hot weather"];
          better = ["Rest", "Lying still", "Pressure", "Cold things", "Open air"];
        };
        clinicalUses = [
          "Pleuritis and pneumonia",
          "Rheumatoid arthritis",
          "Constipation",
          "Bronchitis and dry cough",
          "Typhoid fever",
          "Synovitis"
        ];
        constitution = "Suits dark, bilious, irritable individuals of a nervous temperament. The Bryonia patient is tall, dark, and lean with a dry, hot skin. They are industrious, worry about their livelihood, and hate to move.";
      },
      {
        id = "bryonia-alba-allens";
        remedyId = "bryonia-alba";
        source = #allensKeynotes;
        name = "Bryonia Alba";
        latinName = "Bryonia alba";
        keynotes = [
          "All complaints are worse from motion, even the least",
          "Wants to keep perfectly still; motion = aggravation",
          "Mucous membranes dry: lips cracked, parched; intense thirst for large amounts",
          "Stitching pains everywhere, worse on breathing and motion",
          "Constipation: stools hard, dry, dark, as if burnt",
          "Talks of nothing but business in delirium",
          "Irritable; wishes to be at home when away"
        ];
        mentalSymptoms = [
          "Delirium: talks of business, wants to go home",
          "Irritable, cross; aversion to company"
        ];
        physicalSymptoms = [
          "Bursting headache worse on any motion",
          "Stitching chest pains; dry, racking cough"
        ];
        modalities = {
          worse = ["Motion", "Warmth", "Morning"];
          better = ["Rest", "Pressure", "Cold drinks"];
        };
        clinicalUses = [
          "Pleuritis, pneumonia, bronchitis",
          "Rheumatism: hot swollen joints, worse motion"
        ];
        constitution = "Dark, bilious, irritable individuals; business-minded worriers.";
      },

      // ── PHOSPHORUS ───────────────────────────────────────────────
      {
        id = "phosphorus-boericke";
        remedyId = "phosphorus";
        source = #boericke;
        name = "Phosphorus";
        latinName = "Phosphorus";
        keynotes = [
          "Tall, slender subjects with delicate skin and fine hair; great susceptibility",
          "Haemorrhage: profuse, bright-red, from any orifice",
          "Burning pains: burning in throat, stomach, between shoulder blades",
          "Strong desire for ice-cold water which is vomited when warm in stomach",
          "Great sensitivity to external impressions: light, sound, odours, touch"
        ];
        mentalSymptoms = [
          "Indifference to friends and relatives; apathy",
          "Clairvoyance; heightened psychic sensitivity",
          "Fearfulness: of thunderstorm, of being alone, of dark",
          "Over-sympathetic; takes on others' sufferings",
          "Affectionate, craves company and reassurance",
          "Anxiety in the evening; restlessness and worry"
        ];
        physicalSymptoms = [
          "Haemorrhage small wounds bleed profusely; petechiae",
          "Hepatitis; fatty degeneration of the liver",
          "Pneumonia: hepatisation stage; rust-coloured sputum",
          "Gastric ulcer with burning; vomiting of blood",
          "Spinal cord diseases; lightning-like pains",
          "Cataracts and glaucoma; visual disturbances",
          "Anaemia; tall thin persons with fine hair lose flesh"
        ];
        modalities = {
          worse = ["Evening and twilight", "Cold and damp", "Lying on left side", "Mental exertion", "Warm food"];
          better = ["Dark", "Cold food and water", "Sleep", "Rubbing", "Open air"];
        };
        clinicalUses = [
          "Pneumonia and respiratory diseases",
          "Haemorrhagic disorders",
          "Liver diseases (hepatitis, cirrhosis)",
          "Nervous system affections",
          "Diabetes mellitus",
          "Optic neuritis and eye diseases"
        ];
        constitution = "Tall, slender, narrow-chested individuals with fine blonde or red hair and delicate, transparent skin. They are vivid, sympathetic, impressionable, and crave company, yet tire easily and are prone to haemorrhage and tissue degeneration.";
      },
      {
        id = "phosphorus-allens";
        remedyId = "phosphorus";
        source = #allensKeynotes;
        name = "Phosphorus";
        latinName = "Phosphorus";
        keynotes = [
          "Tall, slender, anaemic; fine hair; delicate, waxy skin",
          "Haemorrhage: bright red, from any orifice; small wounds bleed freely",
          "Burning pains; burning between shoulder blades",
          "Craves cold water; vomited as soon as it becomes warm in stomach",
          "Desire for company; fear of being alone, especially in the dark",
          "Hepatisation of lungs; rust-coloured expectoration"
        ];
        mentalSymptoms = [
          "Sympathetic, affectionate; fears thunderstorms",
          "Anxiety in the evening; clairvoyance and heightened sensitivity"
        ];
        physicalSymptoms = [
          "Hepatic degeneration; jaundice with burning",
          "Profuse, bright-red haemorrhage from all orifices"
        ];
        modalities = {
          worse = ["Twilight", "Warm food or drinks", "Lying on left side"];
          better = ["Cold food and water", "Dark", "Rubbing"];
        };
        clinicalUses = [
          "Pneumonia, haemoptysis",
          "Liver disease, haemorrhagic tendency"
        ];
        constitution = "Tall, delicate, rapidly-growing youths with fine hair and transparent skin.";
      },

      // ── SULPHUR ──────────────────────────────────────────────────
      {
        id = "sulphur-boericke";
        remedyId = "sulphur";
        source = #boericke;
        name = "Sulphur";
        latinName = "Sulphur";
        keynotes = [
          "Burning sensations everywhere: heat of vertex, burning of feet forced out of bed at night",
          "Redness of all orifices: lips, anus, margins of eyelids",
          "Morning diarrhoea driving out of bed; painless",
          "Skin: itching and burning, worse from heat of bed and washing",
          "Lean, stoop-shouldered, untidy individuals; or overfed and sluggish"
        ];
        mentalSymptoms = [
          "Philosophical bent; imagines he possesses great wealth and beauty",
          "Selfishness; aversion to washing and bathing",
          "Forgetfulness and inattention; makes mistakes in speaking",
          "Theoretical, speculative mind; full of plans and ideas",
          "Irritable; critical of others; complaining",
          "Anxiety about salvation"
        ];
        physicalSymptoms = [
          "Vertex hot; feet burning; obliged to uncover them at night",
          "Diarrhoea: early morning, painless, driving out of bed",
          "Skin: itching violently; worse scratching, worse warmth of bed",
          "Unhealthy skin: every little injury tends to suppurate",
          "Standing is the worst position; fatigue from standing",
          "Plethoric congestion; flushing of face",
          "Leucorrhea and skin eruptions; suppressed eruptions"
        ];
        modalities = {
          worse = ["Rest", "Standing", "Warmth of bed", "Heat", "Washing", "11 a.m."];
          better = ["Dry warm weather", "Moving", "Drawing up affected limb"];
        };
        clinicalUses = [
          "Skin diseases: eczema, psoriasis, acne",
          "Chronic disease with suppressed eruptions",
          "Gastrointestinal disorders",
          "Respiratory diseases: bronchitis, asthma",
          "Scrofulosis and lymphadenopathy",
          "Intercurrent remedy to clear the case"
        ];
        constitution = "Lean, stoop-shouldered, lazy, dirty, philosophical subjects or fat, sluggish individuals. Sulphur is the prince of polychrests and often the intercurrent remedy that clears a blocked case. The constitutional picture includes selfishness, redness of orifices, burning feet, and aversion to bathing.";
      },
      {
        id = "sulphur-allens";
        remedyId = "sulphur";
        source = #allensKeynotes;
        name = "Sulphur";
        latinName = "Sulphur";
        keynotes = [
          "Burning of vertex; heat and burning of soles of feet at night",
          "Redness of all orifices (lips, ears, nostrils, anus)",
          "Skin: itching and burning, worse from heat of bed and bathing",
          "Early morning diarrhoea drives patient out of bed at 5 a.m.",
          "Catnap sleep; wakes up happy, wears off quickly",
          "Standing is worst position; always tired from standing",
          "Aggravated by rest; all symptoms worse at 11 a.m."
        ];
        mentalSymptoms = [
          "Philosophical; imagines he is a great personage",
          "Selfish, critical; aversion to washing"
        ];
        physicalSymptoms = [
          "Burning feet; must put out of bed at night",
          "Unhealthy skin; every scratch suppurates"
        ];
        modalities = {
          worse = ["11 a.m.", "Warmth of bed", "Washing", "Standing"];
          better = ["Dry warm weather", "Moving"];
        };
        clinicalUses = [
          "Skin diseases; eczema with suppressed eruptions",
          "Intercurrent remedy to unblock cases"
        ];
        constitution = "Ragged philosopher or dirty sluggard; red orifices, lean or obese.";
      },

      // ── PULSATILLA NIGRICANS ─────────────────────────────────────
      {
        id = "pulsatilla-nigricans-boericke";
        remedyId = "pulsatilla-nigricans";
        source = #boericke;
        name = "Pulsatilla Nigricans";
        latinName = "Pulsatilla nigricans";
        keynotes = [
          "Changeability: symptoms ever-changing, shifting pains that move from place to place",
          "Weeping disposition; gentle, mild, yielding temperament; craves sympathy",
          "No thirst even with fever; dry mouth without thirst",
          "Worse in warm room, warm food, warm applications; better in open air",
          "Thick, bland, yellowish-green discharges from all mucous membranes"
        ];
        mentalSymptoms = [
          "Timid, mild, tearful; weeps easily and often at trifles",
          "Craves sympathy and consolation; always better when consoled",
          "Despondency with weeping; religious melancholy",
          "Jealousy; suspicious nature; easily hurt",
          "Fear: of being alone, of the dark, of men",
          "Mood changeable: laughing one moment, crying the next"
        ];
        physicalSymptoms = [
          "Catarrh with thick, bland, non-irritating yellow discharge",
          "Menstrual irregularities; delayed, scanty, painful menses",
          "Digestive complaints from rich, fatty food; nausea and heartburn",
          "Varicose veins during pregnancy; phlebitis",
          "Orchitis and epididymitis from mumps",
          "Styes and conjunctivitis with thick yellow discharge",
          "Wandering rheumatic pains; joints hot, swollen"
        ];
        modalities = {
          worse = ["Warm room", "Heat", "Rich fatty food", "Evening", "Lying on left side"];
          better = ["Open air", "Cold applications", "Walking slowly in open air", "Sitting up"];
        };
        clinicalUses = [
          "Female genital disorders; menstrual irregularities",
          "Catarrhal conditions of mucous membranes",
          "Digestive disorders from rich food",
          "Conjunctivitis and styes",
          "Rheumatic conditions",
          "Childhood illnesses with weeping child"
        ];
        constitution = "Mild, gentle, yielding women or children with fair hair and blue eyes, prone to weeping and craving sympathy. The classic Pulsatilla patient is an emotional woman of lymphatic temperament who feels worse in warm environments and better in the open air.";
      },
      {
        id = "pulsatilla-nigricans-allens";
        remedyId = "pulsatilla-nigricans";
        source = #allensKeynotes;
        name = "Pulsatilla Nigricans";
        latinName = "Pulsatilla nigricans";
        keynotes = [
          "Mild, gentle, yielding disposition; weeps easily; craves sympathy",
          "No two stools alike; symptoms ever-shifting and changeable",
          "Thirstlessness with nearly all complaints, even during fever",
          "Thick, bland, non-irritating yellow-green mucous discharges",
          "Worse in warm room and from heat; better in open air",
          "Contradictory and alternating states; laughter through tears"
        ];
        mentalSymptoms = [
          "Weeps; desires consolation; gentle and yielding",
          "Jealousy and suspicion; mood changeable like April weather"
        ];
        physicalSymptoms = [
          "Wandering pains; shifting from place to place",
          "Delayed, irregular menses; suppression of menses"
        ];
        modalities = {
          worse = ["Warmth", "Rich fatty food", "Evening"];
          better = ["Open air", "Cold applications"];
        };
        clinicalUses = [
          "Amenorrhoea and menstrual disorders",
          "Catarrhal states with bland yellow discharge"
        ];
        constitution = "Fair, gentle, yielding women; lymphatic temperament.";
      },

      // ── NUX VOMICA ───────────────────────────────────────────────
      {
        id = "nux-vomica-boericke";
        remedyId = "nux-vomica";
        source = #boericke;
        name = "Nux Vomica";
        latinName = "Nux vomica";
        keynotes = [
          "Over-sensitive to all external impressions: noise, light, odours, touch",
          "Irritable, impatient, fault-finding, hypercritical; nothing is done right",
          "Sedentary individuals who indulge in rich food, wine, coffee, and stimulants",
          "Constipation with ineffectual urging; never-get-done sensation",
          "Chilliness: cannot get warm; worse in cold air, better in warm room"
        ];
        mentalSymptoms = [
          "Hypersensitive, irritable, quarrelsome, impatient",
          "Extremely competitive; works hard, plays hard",
          "Cannot tolerate noise, light, smell or music",
          "Impulse to kill; homicidal and suicidal thoughts",
          "Anxiety of conscience; fear of failure",
          "Very fastidious; wants everything in exact order"
        ];
        physicalSymptoms = [
          "Constipation with constant ineffectual desire for stool",
          "Haemorrhoids with constipation; constant backache",
          "Indigestion: nausea and vomiting in the morning",
          "Hypersensitivity of skin to touch; crawling sensations",
          "Spasmodic cough with chest pain; worse at night",
          "Insomnia: wakes at 3 a.m., cannot sleep; drowsy after meals",
          "Catalepsy and convulsions from anger"
        ];
        modalities = {
          worse = ["Cold", "Morning", "After eating", "Mental exertion", "Stimulants", "Anger"];
          better = ["Warm room", "Damp wet weather", "Strong pressure", "Evening", "Rest"];
        };
        clinicalUses = [
          "Digestive disorders; constipation and haemorrhoids",
          "Liver congestion from alcohol abuse",
          "Insomnia from mental overwork",
          "Spasmodic conditions: colic, asthma",
          "Drug antidote (abuse of stimulants)",
          "Hyperacidity and dyspepsia"
        ];
        constitution = "Thin, irritable, dark-haired individuals who are mentally vigorous but physically weak from over-indulgence. The Nux vomica type is the classic high-achiever who burns the candle at both ends: overwork, over-eating, over-stimulation, with a resultant nervous, dyspeptic state.";
      },
      {
        id = "nux-vomica-allens";
        remedyId = "nux-vomica";
        source = #allensKeynotes;
        name = "Nux Vomica";
        latinName = "Nux vomica";
        keynotes = [
          "Oversensitive to all external impressions: light, noise, odours",
          "Irritable, cross, fault-finding; nothing pleases",
          "Constipation: frequent ineffectual desire; feeling as if not finished",
          "Chilly; cannot get warm; wants to be covered in all stages of fever",
          "Sedentary habits; abuses coffee, alcohol, and stimulants",
          "Wakes at 3 a.m. with mental activity; cannot sleep again"
        ];
        mentalSymptoms = [
          "Very irritable, quarrelsome, fastidious; impulse to kill",
          "Competitive; fears failure; over-anxious about business"
        ];
        physicalSymptoms = [
          "Constipation with constant desire; haemorrhoids",
          "Indigestion: nausea and sour vomiting in mornings"
        ];
        modalities = {
          worse = ["Cold", "Morning", "Eating", "Mental exertion"];
          better = ["Warmth", "Strong pressure", "Damp weather"];
        };
        clinicalUses = [
          "Dyspepsia, constipation from sedentary life",
          "Hangover; antidote for over-use of stimulants"
        ];
        constitution = "Thin, dark, nervous, irritable subjects; sedentary over-achievers.";
      },

      // ── BELLADONNA ───────────────────────────────────────────────
      {
        id = "belladonna-boericke";
        remedyId = "belladonna";
        source = #boericke;
        name = "Belladonna";
        latinName = "Atropa belladonna";
        keynotes = [
          "Sudden, violent onset; all symptoms come and go suddenly",
          "Great heat, redness, throbbing and burning; bright-red skin",
          "Pupils dilated; eyes brilliant and staring; photophobia",
          "Throbbing headache: worse on stooping, jarring, movement; better from pressure",
          "Delirium: sees faces; wants to run away; strikes and bites"
        ];
        mentalSymptoms = [
          "Acute mania; wild delirium; sees monsters and black dogs",
          "Desire to bite, strike, spit; violent outbursts",
          "Fear of imaginary things; hallucinations",
          "Restlessness; tosses in bed; wildly delirious",
          "Morose; confusion of mind",
          "Exalted mental powers between paroxysms"
        ];
        physicalSymptoms = [
          "High fever with burning, dry skin; face flushed and red",
          "Congestive headache with throbbing carotids",
          "Tonsillitis: bright red; sudden onset; difficulty swallowing",
          "Convulsions; sudden onset; starting from fright or teething",
          "Right-sided complaints predominate",
          "Menstrual blood bright red, hot, profuse; early onset",
          "Earache: sudden, violent; right side; throbbing pain"
        ];
        modalities = {
          worse = ["Touch", "Noise", "Draught of air", "Light", "Jarring", "Afternoon 3 p.m."];
          better = ["Rest in semi-darkness", "Warmth", "Standing or sitting upright"];
        };
        clinicalUses = [
          "Acute fevers with sudden onset",
          "Tonsillitis and scarlet fever",
          "Convulsions in children",
          "Congestion and inflammatory states",
          "Suppressed menses with cerebral symptoms",
          "Acute otitis media"
        ];
        constitution = "Full-blooded, plethoric individuals with robust constitution. Belladonna acts on the great vascular and nervous systems causing active congestion. It suits those of sanguine temperament with excitable nervous systems — very sensitive to light, noise, and cold air.";
      },
      {
        id = "belladonna-allens";
        remedyId = "belladonna";
        source = #allensKeynotes;
        name = "Belladonna";
        latinName = "Atropa belladonna";
        keynotes = [
          "Great dryness and heat of skin; face red, hot; eyes brilliant",
          "Complaints come on suddenly and with great violence",
          "Throbbing and burning everywhere; throbbing pain in head",
          "Dilated pupils; photophobia; starting or jumping in sleep",
          "Right-sided remedy; worse from touch, jar, cold air, noise",
          "Delirium: talks wildly; sees monsters; tries to bite and strike"
        ];
        mentalSymptoms = [
          "Wild delirium; hallucinates; desire to bite, strike, tear things",
          "Startles from sleep; fear of imaginary things"
        ];
        physicalSymptoms = [
          "Bursting, throbbing headache; worse stooping and jarring",
          "Scarlet fever; throat bright red, glazed; tonsils swollen"
        ];
        modalities = {
          worse = ["Touch", "Jar", "Noise", "Draft"];
          better = ["Rest in darkness", "Pressure", "Standing"];
        };
        clinicalUses = [
          "Acute febrile conditions; scarlatina; tonsillitis",
          "Convulsions; hot, red, throbbing inflammations"
        ];
        constitution = "Plethoric, sanguine, excitable subjects prone to violent congestion.";
      },

      // ── CALCAREA CARBONICA ────────────────────────────────────────
      {
        id = "calcarea-carbonica-boericke";
        remedyId = "calcarea-carbonica";
        source = #boericke;
        name = "Calcarea Carbonica";
        latinName = "Calcarea carbonica";
        keynotes = [
          "Fair, fat, flabby and chilly; profuse perspiration on head, neck, and upper body",
          "Head sweats during sleep, wetting pillow; cold and damp",
          "Craving for eggs, indigestible things; aversion to meat",
          "Delayed dentition; delayed development; slow to walk and talk",
          "Fears: of insanity, being observed, of disease, of dark and mice"
        ];
        mentalSymptoms = [
          "Anxiety: fears she will lose her reason; will be observed in her confusion",
          "Forgetful; misplaces words; confusion of mind",
          "Obstinate; fixed ideas; stubborn about trifles",
          "Aversion to work; intellectual effort causes headache",
          "Melancholy and weeping in the evening",
          "Fear of dark, heights, mice, and of impending misfortune"
        ];
        physicalSymptoms = [
          "Cold, clammy hands and feet; cold damp skin",
          "Profuse night sweats on the head; sour-smelling perspiration",
          "Enlarged glands; tonsils and lymph nodes swollen",
          "Sour belching and vomiting; sour stool in children",
          "Obesity in children and women; tendency to accumulate fat",
          "Uterine fibroids with profuse flooding menses",
          "Curvature of spine; rickets; late fontanelle closure"
        ];
        modalities = {
          worse = ["Cold in every form", "Wet damp weather", "Physical and mental exertion", "Ascending stairs", "Morning"];
          better = ["Dry weather", "Lying on painful side", "Sneezing"];
        };
        clinicalUses = [
          "Developmental delays in children",
          "Scrofulous conditions and glandular enlargements",
          "Hypothyroidism and obesity",
          "Uterine disorders and menorrhagia",
          "Dental caries and delayed dentition",
          "Rheumatism and arthritis in cold damp weather"
        ];
        constitution = "The classic type is fair, flabby, pot-bellied, and perspiring, with a passive, lymphatic temperament. Calcarea carbonica suits children who are slow to develop, adults who tire easily, and oversensitive individuals who fear exertion and cold environments.";
      },
      {
        id = "calcarea-carbonica-allens";
        remedyId = "calcarea-carbonica";
        source = #allensKeynotes;
        name = "Calcarea Carbonica";
        latinName = "Calcarea carbonica";
        keynotes = [
          "Fair, fat, flabby, cold and damp; head sweats profusely during sleep",
          "Sour smell: sour vomiting, sour stool, sour perspiration",
          "Craving for eggs and indigestible things",
          "Head sweats wetting the pillow; cold and clammy extremities",
          "Slow dentition; open fontanelle; late in learning to walk",
          "Fears: losing reason, of being observed, heights, dark, mice"
        ];
        mentalSymptoms = [
          "Fear of insanity; anxiety that others will observe her confusion",
          "Obstinate; forgetful; fixed ideas"
        ];
        physicalSymptoms = [
          "Cold, damp perspiration on head and neck at night",
          "Enlarged glands; sour stools in children"
        ];
        modalities = {
          worse = ["Cold", "Dampness", "Exertion", "Ascending"];
          better = ["Dry weather", "Lying on painful side"];
        };
        clinicalUses = [
          "Slow development in children; rickets",
          "Scrofula; glandular and tonsil enlargement"
        ];
        constitution = "Lymphatic, pale, fat children and adults; cold, damp, sour.";
      },

      // ── LYCOPODIUM CLAVATUM ───────────────────────────────────────
      {
        id = "lycopodium-clavatum-boericke";
        remedyId = "lycopodium-clavatum";
        source = #boericke;
        name = "Lycopodium Clavatum";
        latinName = "Lycopodium clavatum";
        keynotes = [
          "Intellectual excellence but physical weakness; premature ageing",
          "Bloating and flatulence after eating; abdomen full and tight from eating a little",
          "Hunger with rapid satiety; sensation of fullness on eating a small amount",
          "Symptoms right-sided or moving from right to left",
          "Worse 4–8 p.m.; best from warm drinks and warm food"
        ];
        mentalSymptoms = [
          "Lack of self-confidence; dreads being alone; starts new things with hesitation",
          "Dictatorial, domineering at home; cowardly outside",
          "Fear of public appearance; yet overbearing with subordinates",
          "Apprehension; dread of failure",
          "Irritable in the morning and evening",
          "Forgetfulness; confusion in writing; wrong words"
        ];
        physicalSymptoms = [
          "Bloating: abdomen distended after a few mouthfuls of food",
          "Constipation: stools hard, small, unsatisfactory; right-sided",
          "Fan-like motion of alae nasi in pneumonia or difficult breathing",
          "Liver and gallbladder affections; hepatitis",
          "Right-sided tonsillitis; sore throat worse swallowing",
          "Red sand in urine; renal colic right side",
          "Hair falls prematurely; baldness early"
        ];
        modalities = {
          worse = ["4–8 p.m.", "Right side", "Pressure of clothes", "Warm room", "Eating to satiety"];
          better = ["Warm food and drink", "Movement", "Uncovering", "After midnight"];
        };
        clinicalUses = [
          "Digestive disorders: flatulence, constipation",
          "Liver and biliary tract diseases",
          "Renal calculi and urinary disorders",
          "Respiratory diseases: pneumonia, asthma",
          "Premature senility and debility",
          "Sexual neurasthenia and impotence"
        ];
        constitution = "Intellectually keen but physically underdeveloped or prematurely aged. Lean, withered appearance with a sallow, earthy complexion. The Lycopodium person craves authority but lacks confidence, dominates the home but fears the public sphere.";
      },
      {
        id = "lycopodium-clavatum-allens";
        remedyId = "lycopodium-clavatum";
        source = #allensKeynotes;
        name = "Lycopodium Clavatum";
        latinName = "Lycopodium clavatum";
        keynotes = [
          "Bloating immediately after eating even a small amount",
          "Desires warm drinks and food; averse to cold",
          "Right-sided complaints; symptoms go from right to left",
          "Worse 4 to 8 p.m.; fan-like motion of alae nasi in fever",
          "Constipation; red sand in urine; premature baldness",
          "Cowardly; lacks self-confidence; domineers at home, timid in public"
        ];
        mentalSymptoms = [
          "Dreads undertaking anything; fears failure; dictatorial at home",
          "Confusion; wrong words; irritable morning and evening"
        ];
        physicalSymptoms = [
          "Abdomen distended; eating a little causes fullness",
          "Red sand in urine; lithic acid deposits"
        ];
        modalities = {
          worse = ["4–8 p.m.", "Right side", "Cold food"];
          better = ["Warm food and drink", "Motion", "After midnight"];
        };
        clinicalUses = [
          "Dyspepsia with flatulence; liver affections",
          "Renal calculi; right-sided nephritis"
        ];
        constitution = "Lean, withered, sallow skin; intellectual but physically weak.";
      },

      // ── NATRUM MURIATICUM ─────────────────────────────────────────
      {
        id = "natrum-muriaticum-boericke";
        remedyId = "natrum-muriaticum";
        source = #boericke;
        name = "Natrum Muriaticum";
        latinName = "Natrum muriaticum";
        keynotes = [
          "Ill effects of grief, fright, and vexation; chronic grief, keeps it to herself",
          "Aversion to consolation; weeping when alone; worse when consoled",
          "Craving for salt and salty food; great thirst",
          "Headache as if hammers were beating in the head; anaemic headache",
          "Map-like tongue with red insular patches; geographic tongue"
        ];
        mentalSymptoms = [
          "Great grief, dwells on past grievances; silent grief",
          "Aversion to consolation; gets angry if consoled",
          "Reserved, closed, introvert; doesn't want to cry in public",
          "Easily offended; bears grudges",
          "Fear of robbers; anxiety in company",
          "Indifference to those once loved"
        ];
        physicalSymptoms = [
          "Thin, emaciated despite eating well; loss of flesh",
          "Constipation: stools dry, hard, crumbling; tearful after stool",
          "Leucorrhoea: white, watery, profuse; excoriating",
          "Herpes labialis (cold sores); fever blisters",
          "Chilliness; anaemia; greenish complexion",
          "Intermittent fever with violent headache",
          "Oedema; puffy and watery appearance"
        ];
        modalities = {
          worse = ["Consolation", "Heat", "10–11 a.m.", "Seashore", "Mental exertion"];
          better = ["Open air", "Cold bathing", "Sweating", "Rest", "Going without regular meals"];
        };
        clinicalUses = [
          "Anaemia and debility from grief",
          "Intermittent fever and malaria",
          "Migraine headaches",
          "Skin diseases: eczema, psoriasis, herpes",
          "Leucorrhoea and menstrual irregularities",
          "Oedema and water retention"
        ];
        constitution = "Pale, thin, poorly nourished individuals with greasy skin and watery appearance. Often affected by grief, mortification, or suppressed emotions. They appear self-sufficient and reserved but are deeply sensitive inside, crying alone and being wounded by the slightest remark.";
      },
      {
        id = "natrum-muriaticum-allens";
        remedyId = "natrum-muriaticum";
        source = #allensKeynotes;
        name = "Natrum Muriaticum";
        latinName = "Natrum muriaticum";
        keynotes = [
          "Ill effects of grief, disappointed love; keeps grief to herself",
          "Consolation aggravates; cries alone, angry if comforted",
          "Craving for salt; great thirst",
          "Headache like hammers beating in the brain",
          "Map-tongue: red patches with white edges",
          "Lean; emaciates from neck down despite eating well"
        ];
        mentalSymptoms = [
          "Silent, reserved grief; aversion to consolation",
          "Easily offended; bears grudges; wants to be alone"
        ];
        physicalSymptoms = [
          "Herpes labialis; dry mucous membranes; great emaciation",
          "Constipation; dry crumbling stools; tearful after"
        ];
        modalities = {
          worse = ["10–11 a.m.", "Consolation", "Seashore", "Heat"];
          better = ["Open air", "Cold bathing", "Rest"];
        };
        clinicalUses = [
          "Grief-related complaints; chronic anaemia",
          "Intermittent fever; migraine headaches"
        ];
        constitution = "Thin, sallow, watery; introvert suffering silently from suppressed grief.";
      },

      // ── APIS MELLIFICA ────────────────────────────────────────────
      {
        id = "apis-mellifica-boericke";
        remedyId = "apis-mellifica";
        source = #boericke;
        name = "Apis Mellifica";
        latinName = "Apis mellifica";
        keynotes = [
          "Oedema: swelling, puffiness of cellular tissue; bag-like swelling under eyes",
          "Burning, stinging pains like bee stings; worse from heat, better from cold",
          "Absence of thirst in almost all complaints, even with fever",
          "Intolerance to heat in any form; symptoms worse in warm room",
          "Acute inflammation: shiny, rosy-red, hot, tender, puffy swelling"
        ];
        mentalSymptoms = [
          "Jealousy; hard to please; suspicious",
          "Apathetic or overly busy, restless",
          "Indifference to everything; low vitality",
          "Fidgety; can't keep still; constant motion",
          "Stupor and coma in severe cases"
        ];
        physicalSymptoms = [
          "Dropsy and oedema of skin and body cavities",
          "Bright's disease with scanty, dark urine",
          "Tonsillitis and throat: uvula swollen like a bag of water",
          "Ovarian cysts and right ovarian pain",
          "Urticaria with burning and stinging",
          "Meningitis with shrieking; cri encéphalique",
          "Chest oppression; breathlessness from pericardial effusion"
        ];
        modalities = {
          worse = ["Heat", "Warm room", "Touch", "Pressure", "After sleeping", "Right side"];
          better = ["Cold", "Cold applications", "Open air", "Uncovering", "Sitting upright"];
        };
        clinicalUses = [
          "Oedema and dropsy",
          "Urticaria and allergic swellings",
          "Bright's disease (nephritis)",
          "Ovarian cysts and pelvic inflammation",
          "Meningitis (adjunctive)",
          "Erysipelas and cellulitis"
        ];
        constitution = "Busy, industrious, jealous types or those in acute anaphylactic and oedematous states. Apis acts on the cellular tissue and skin, causing rapid oedema. The characteristic modalities — thirstlessness and aggravation from heat — guide its prescription strongly.";
      },
      {
        id = "apis-mellifica-allens";
        remedyId = "apis-mellifica";
        source = #allensKeynotes;
        name = "Apis Mellifica";
        latinName = "Apis mellifica";
        keynotes = [
          "Stinging, burning pains like bee stings; better cold, worse heat",
          "Oedema: bag-like swelling below eyes; pitting oedema anywhere",
          "Thirstlessness in most complaints, including during fever",
          "Worse from heat in any form; intolerance of warm room",
          "Rapid swelling, puffiness, redness; rosy-red hue",
          "Scanty, dark, albuminous urine in nephritis"
        ];
        mentalSymptoms = [
          "Jealous, hard to please; apathetic or restlessly busy",
          "Sudden shrieking (cri encéphalique) in meningitis"
        ];
        physicalSymptoms = [
          "Bag-like oedema under eyes; pitting oedema of extremities",
          "Urticaria with burning, stinging; better cold applications"
        ];
        modalities = {
          worse = ["Heat", "After sleep", "Touch", "Right side"];
          better = ["Cold", "Open air", "Uncovering"];
        };
        clinicalUses = [
          "Urticaria, angio-oedema, erysipelas",
          "Nephritis with oedema; ovarian cysts"
        ];
        constitution = "Busy, industrious, jealous; oedematous states without thirst.";
      },

      // ── IGNATIA AMARA ─────────────────────────────────────────────
      {
        id = "ignatia-amara-boericke";
        remedyId = "ignatia-amara";
        source = #boericke;
        name = "Ignatia Amara";
        latinName = "Strychnos ignatii";
        keynotes = [
          "Ill effects of grief, worry, disappointment; the great grief remedy",
          "Contradictory symptoms: sore throat better swallowing solids; hunger better not eating",
          "Hysterical spasms after emotional shock; globus hystericus",
          "Frequent sighing; involuntary sighs in conversation",
          "Rapidly changing moods; laughing and crying alternately"
        ];
        mentalSymptoms = [
          "Brooding grief; cannot get over loss; suppressed sorrow",
          "Idealistic; sensitive to reproof; cannot bear contradiction",
          "Silent grief with sighing; great sadness",
          "Mood changeable: laughs immoderately then weeps",
          "Hysterical; convulsive sobs; unable to speak from emotion",
          "Self-reproach; self-criticism after grief"
        ];
        physicalSymptoms = [
          "Spasmodic and paroxysmal complaints throughout",
          "Globus hystericus: lump in throat",
          "Contradictory: tonsils sore but better swallowing solids",
          "Insomnia from grief; light sleep with frightful dreams",
          "Headache as if a nail driven into side of head",
          "Twitching and jerking of muscles; chorea",
          "Alternating constipation and diarrhoea after grief"
        ];
        modalities = {
          worse = ["Morning", "Open air", "After eating", "Coffee", "Smoking", "External warmth"];
          better = ["While eating", "Change of position", "Hard pressure", "Swallowing solids"];
        };
        clinicalUses = [
          "Acute grief reactions",
          "Hysteria and hysterical paralysis",
          "Spasmodic conditions: chorea, globus",
          "Insomnia from emotional causes",
          "Migraine from grief or stress",
          "Shock after bad news"
        ];
        constitution = "Refined, sensitive, emotional women particularly susceptible to grief, fright, or disappointed love. The Ignatia patient appears outwardly restrained but is churning inside with contradictory emotions; the characteristic sighing and changeable moods are pathognomonic.";
      },
      {
        id = "ignatia-amara-allens";
        remedyId = "ignatia-amara";
        source = #allensKeynotes;
        name = "Ignatia Amara";
        latinName = "Strychnos ignatii";
        keynotes = [
          "Ill effects of grief; brooding silent grief with sighing",
          "Contradictory symptoms: sore throat better from swallowing",
          "Globus hystericus: sensation of lump in throat",
          "Rapidly alternating moods: laughter and weeping",
          "Spasmodic symptoms; twitching of muscles; chorea",
          "Frequent, involuntary sighing; great sadness"
        ];
        mentalSymptoms = [
          "Sensitive, idealistic; broods; cannot bear contradiction",
          "Hysterical; laughter alternating with weeping"
        ];
        physicalSymptoms = [
          "Lump in throat (globus); spasmodic cough",
          "Nail-like headache; worse from noise, better from pressure"
        ];
        modalities = {
          worse = ["Coffee", "Tobacco", "Open air", "Morning"];
          better = ["Hard pressure", "Change of position", "Eating"];
        };
        clinicalUses = [
          "Acute grief; hysteria; emotional shock",
          "Insomnia from grief; spasmodic conditions"
        ];
        constitution = "Sensitive, idealistic, emotional women; the acute grief remedy.";
      },

      // ── ARSENICUM ALBUM ───────────────────────────────────────────
      {
        id = "arsenicum-album-boericke";
        remedyId = "arsenicum-album";
        source = #boericke;
        name = "Arsenicum Album";
        latinName = "Arsenicum album";
        keynotes = [
          "Anxious restlessness: moves from chair to chair; cannot rest in any position",
          "Burning pains paradoxically relieved by heat; warmth ameliorates",
          "Intense prostration disproportionate to the disease",
          "Thirst for small sips of water at frequent intervals",
          "Midnight aggravation: worse 12 midnight to 2 a.m."
        ];
        mentalSymptoms = [
          "Anguish and restlessness; fear of death; thinks it useless to take medicine",
          "Fear of being alone; wants company",
          "Extremely fastidious; everything must be in place",
          "Anxiety about health; hypochondriac",
          "Miserly; grasping; malicious",
          "Fear of germs; obsessive cleanliness"
        ];
        physicalSymptoms = [
          "Burning discharges; excoriating, watery, burning nasal discharge",
          "Gastroenteritis with simultaneous vomiting and diarrhoea",
          "Asthma worse at midnight; cannot lie down; burning in chest",
          "Skin: itching, burning papules; carbuncles; gangrene",
          "Oedema; dropsy of internal organs",
          "Periodical complaints at regular intervals",
          "Septic conditions; offensive discharges"
        ];
        modalities = {
          worse = ["Cold", "Cold food and drinks", "Midnight", "Exertion", "Alone"];
          better = ["Warmth in all forms", "Hot drinks", "Motion", "Company", "Head raised"];
        };
        clinicalUses = [
          "Gastroenteritis and food poisoning",
          "Asthma and respiratory disorders",
          "Skin diseases with burning",
          "Septicaemia and malignant conditions",
          "Anxiety states and panic",
          "Malaria (periodic fevers)"
        ];
        constitution = "Thin, pale, wiry individuals with marked anxiety and restlessness, who are meticulous and fastidious. The Arsenicum patient fears death yet cannot sit still; they improve from warmth despite having burning sensations, and their midnight aggravation is highly characteristic.";
      },
      {
        id = "arsenicum-album-allens";
        remedyId = "arsenicum-album";
        source = #allensKeynotes;
        name = "Arsenicum Album";
        latinName = "Arsenicum album";
        keynotes = [
          "Great anxiety and restlessness; cannot rest in any position",
          "Burning pains relieved by heat; externally and internally",
          "Thirst for small sips; cannot drink large amounts",
          "Worse after midnight (12–2 a.m.)",
          "Great prostration; exhaustion disproportionate to illness",
          "Watery, burning, excoriating discharges from all orifices"
        ];
        mentalSymptoms = [
          "Fear of death; thinks medicines are useless; wants company",
          "Fastidious; must have everything in order"
        ];
        physicalSymptoms = [
          "Simultaneous vomiting and diarrhoea; food poisoning",
          "Asthma; burning in chest; cannot lie down at midnight"
        ];
        modalities = {
          worse = ["Cold", "Midnight", "Alone"];
          better = ["Warmth", "Hot drinks", "Company"];
        };
        clinicalUses = [
          "Gastroenteritis, food poisoning",
          "Asthma; anxiety states; septic conditions"
        ];
        constitution = "Thin, anxious, restless, fastidious; fears death; midnight sufferer.";
      },

      // ── RHUS TOXICODENDRON ────────────────────────────────────────
      {
        id = "rhus-toxicodendron-boericke";
        remedyId = "rhus-toxicodendron";
        source = #boericke;
        name = "Rhus Toxicodendron";
        latinName = "Rhus toxicodendron";
        keynotes = [
          "Great restlessness: must move constantly; relief from motion but returns when still",
          "Pains and stiffness worse on beginning to move; better from continued motion",
          "Triangular red tip of tongue; dry coated tongue",
          "Symptoms worse in cold, wet weather and at night",
          "Hot painful blisters; vesicular eruptions; herpes"
        ];
        mentalSymptoms = [
          "Restlessness with mental anxiety; cannot stay in one position",
          "Suicidal thoughts from mental despondency; fear at night",
          "Weeping without knowing why; great sadness",
          "Apprehensive; anxiety worse at night in bed",
          "Forgetfulness; makes mistakes in speaking and writing"
        ];
        physicalSymptoms = [
          "Rheumatism: stiffness worse initial motion, better continued motion",
          "Sciatica: worse lying still; better walking and warmth",
          "Typhoid fever with great restlessness and delirium",
          "Skin: vesicular eruptions, urticaria; intense itching and burning",
          "Tendon sheaths and joint capsule involvement",
          "Tearing, aching pains in muscles and joints",
          "Paralysis after exposure to cold and wet"
        ];
        modalities = {
          worse = ["Cold wet rainy weather", "At night", "Initial motion", "Rest", "Cold food"];
          better = ["Continued motion", "Warmth", "Warm applications", "Walking", "Dry weather"];
        };
        clinicalUses = [
          "Rheumatism and arthritis",
          "Sciatica and lumbago",
          "Skin diseases: herpes, vesicular eruptions",
          "Sprains and strains; overexertion",
          "Typhoid fever",
          "Tendinitis and bursitis"
        ];
        constitution = "Individuals who are worse in cold wet weather, with a strong rheumatic tendency and restlessness. The Rhus tox patient is driven to keep moving; their characteristic initial aggravation from beginning to move that improves with continued motion is pathognomonic.";
      },
      {
        id = "rhus-toxicodendron-allens";
        remedyId = "rhus-toxicodendron";
        source = #allensKeynotes;
        name = "Rhus Toxicodendron";
        latinName = "Rhus toxicodendron";
        keynotes = [
          "Stiffness and pain worse on first movement; better from continued motion",
          "Great restlessness: must keep moving; returns if still",
          "Red triangular tip of tongue; dry, coated",
          "Worse in cold wet weather and at night",
          "Vesicular eruptions; intense itching and burning of skin",
          "Tendon and fascial involvement; sprains and strains"
        ];
        mentalSymptoms = [
          "Restlessness; anxiety at night; suicidal despondency",
          "Weeps without knowing why"
        ];
        physicalSymptoms = [
          "Rheumatism: better warm applications and continued motion",
          "Vesicular herpes; urticaria with burning"
        ];
        modalities = {
          worse = ["Cold wet weather", "Initial motion", "Night"];
          better = ["Continued motion", "Warmth", "Dry weather"];
        };
        clinicalUses = [
          "Rheumatism; sprains; sciatica",
          "Herpes; vesicular skin eruptions"
        ];
        constitution = "Cold, damp sufferers with marked restlessness; rheumatic diathesis.";
      },

      // ── SEPIA ─────────────────────────────────────────────────────
      {
        id = "sepia-boericke";
        remedyId = "sepia";
        source = #boericke;
        name = "Sepia";
        latinName = "Sepia officinalis";
        keynotes = [
          "Bearing-down sensation in pelvis as if everything would escape through vulva",
          "Indifference to one's family, loved ones; aversion to those she once loved",
          "Flushes of heat upward; hot flushes followed by chilliness and sweat",
          "Yellowish-brown saddle across the nose; chloasma",
          "Better from vigorous exercise; dancing; dancing relieves all complaints"
        ];
        mentalSymptoms = [
          "Indifference to family; aversion to husband and children",
          "Irritability; vexed at trifles; snappy",
          "Sadness; weeping; easily offended",
          "Dread of being alone but averse to company",
          "Weakness and weeping going over the situation",
          "Does not want to be consoled or embraced"
        ];
        physicalSymptoms = [
          "Prolapse of uterus and vagina with bearing-down sensation",
          "Scanty, irregular menses; amenorrhoea in young girls",
          "Morning sickness of pregnancy; cannot tolerate smell of food",
          "Chronic leucorrhoea; yellow-greenish with offensive odour",
          "Liver spots and yellow saddle on nose; moth patches",
          "Constipation; rectal prolapse; ball-sensation in rectum",
          "Hair loss after parturition; dry, unhealthy skin"
        ];
        modalities = {
          worse = ["Before and during menses", "Afternoon and evening", "Cold air", "Sexual excesses", "Sweating"];
          better = ["Vigorous exercise", "Dancing", "Warm applications", "Pressure", "Drawing limbs up"];
        };
        clinicalUses = [
          "Female reproductive disorders",
          "Prolapse of pelvic organs",
          "Morning sickness of pregnancy",
          "Climacteric complaints",
          "Leucorrhoea and vaginal infections",
          "Skin diseases: chloasma, acne rosacea"
        ];
        constitution = "Typically a tall, lean, dark-haired woman of lymphatic or bilious temperament who is worn out by life's demands. She has lost enthusiasm for those around her, appears indifferent and emotionally flat, but responds beautifully to vigorous exercise and dancing.";
      },
      {
        id = "sepia-allens";
        remedyId = "sepia";
        source = #allensKeynotes;
        name = "Sepia";
        latinName = "Sepia officinalis";
        keynotes = [
          "Bearing-down pains in pelvis; sensation as if everything would fall out",
          "Indifference to loved ones; aversion to family",
          "Flushes of heat upward; hot flushes at menopause",
          "Yellow-brown saddle across nose; moth patches on face",
          "Better from vigorous dancing or rapid exercise",
          "Constipation with ball-like sensation in rectum"
        ];
        mentalSymptoms = [
          "Indifferent; averse to husband and children; snappy and irritable",
          "Weeps; dreads being alone but averse to company"
        ];
        physicalSymptoms = [
          "Prolapse of uterus; bearing-down pains",
          "Morning sickness; cannot tolerate smell of food"
        ];
        modalities = {
          worse = ["Before menses", "Cold air", "Afternoon"];
          better = ["Vigorous exercise", "Warmth", "Pressure"];
        };
        clinicalUses = [
          "Pelvic organ prolapse; climacteric complaints",
          "Leucorrhoea; morning sickness"
        ];
        constitution = "Lean, dark, worn-out woman; indifferent to loved ones; livid spots.";
      }
    ];

    for (entry in entries.vals()) {
      store.add(entry.id, entry);
    };

    // ── LOTUS ENTRIES FOR EXISTING REMEDIES ─────────────────────────
    let lotusEntries : [SourcedRemedy] = [
      {
        id = "arnica-montana-lotus";
        remedyId = "arnica-montana";
        source = #lotus;
        name = "Arnica Montana";
        latinName = "Arnica montana";
        keynotes = [
          "Constitutional remedy for those who have suffered repeated physical or emotional shocks",
          "The bruised, battered ego: refuses help, denies suffering, yet is hypersensitive inside",
          "Unresolved trauma stored in the body; the body never forgets the blow"
        ];
        mentalSymptoms = [
          "Denial as a defense; the 'I am fine' facade conceals deep inner disturbance",
          "The traumatized self: cut off from emotions after repeated wounding",
          "Stoicism that masks vulnerability"
        ];
        physicalSymptoms = [
          "Tissue memory of injury; old injuries that keep re-expressing",
          "Constitutional predisposition to haemorrhage and ecchymosis",
          "Deep muscle fatigue from accumulated physical stress"
        ];
        modalities = {
          worse = ["Touch", "Rest after exertion", "Damp cold"];
          better = ["Movement in chronic state", "Lying with head low"];
        };
        clinicalUses = [
          "Chronic PTSD with somatic expression",
          "Post-traumatic arthritis",
          "Repetitive strain and overuse injuries"
        ];
        constitution = "Lotus perspective: Arnica addresses the deep constitutional pattern of the person who has learned to dismiss their own pain. Their stoic exterior is a learned response to early or repeated trauma. The remedy restores the capacity to acknowledge suffering and receive care.";
      },
      {
        id = "bryonia-alba-lotus";
        remedyId = "bryonia-alba";
        source = #lotus;
        name = "Bryonia Alba";
        latinName = "Bryonia alba";
        keynotes = [
          "The constitutional type defined by dryness: dryness of membranes, dryness of emotions, dryness of spirit",
          "Material anxiety: life is about accumulation and security; illness is an unwanted interruption",
          "The business-mind: unable to switch off; every rest is a form of guilt"
        ];
        mentalSymptoms = [
          "Fear of poverty drives the Bryonia constitution",
          "Difficulty surrendering to illness; the mind stays on duty even in fever",
          "Isolation preferred; emotional dryness mirrors physical dryness"
        ];
        physicalSymptoms = [
          "All dry mucous membranes reflect the constitutional dryness",
          "Stitching pains on motion — the body enforces the stillness the mind refuses",
          "Constipation: the bowel holds on, like the constitution holds on to security"
        ];
        modalities = {
          worse = ["Motion", "Warm rooms", "Morning"];
          better = ["Complete rest", "Pressure", "Cold"];
        };
        clinicalUses = [
          "Inflammatory states in driven, materialistic individuals",
          "Pleuritis and hepatitis in the over-worked type",
          "Constipation with emotional holding"
        ];
        constitution = "Lotus perspective: Bryonia's constitutional theme is dryness — of body, emotions, and relationships. These individuals are driven by financial anxiety and cannot allow themselves to be ill. The remedy teaches them to rest and receive.";
      },
      {
        id = "phosphorus-lotus";
        remedyId = "phosphorus";
        source = #lotus;
        name = "Phosphorus";
        latinName = "Phosphorus";
        keynotes = [
          "Radiant, luminous, magnetic — but burns too brightly and burns out",
          "The empath who absorbs others' emotions and loses their own boundaries",
          "Haemorrhage at every level: physical blood, emotional energy, vital force"
        ];
        mentalSymptoms = [
          "Exquisite sensitivity is both gift and vulnerability",
          "Cannot sustain prolonged effort; the flame burns bright then dims",
          "Craves connection and company yet is easily depleted by others"
        ];
        physicalSymptoms = [
          "The delicate, fine-featured constitution that ages prematurely without care",
          "Bright-red haemorrhages reflect uncontained vital expression",
          "The liver and lungs — organs of transformation — are predominantly affected"
        ];
        modalities = {
          worse = ["Twilight", "Alone", "Thunderstorms", "Lying on left side"];
          better = ["Cold food", "Dark", "Company", "Massage"];
        };
        clinicalUses = [
          "Burnout in highly sensitive individuals",
          "Bleeding disorders with constitutional weakness",
          "Respiratory and liver pathologies in the Phosphorus type"
        ];
        constitution = "Lotus perspective: Phosphorus is the archetype of luminous sensitivity. These individuals illuminate every room but risk burning out if they cannot set boundaries. The constitutional theme is learning to contain and sustain the vital flame.";
      },
      {
        id = "sulphur-lotus";
        remedyId = "sulphur";
        source = #lotus;
        name = "Sulphur";
        latinName = "Sulphur";
        keynotes = [
          "The philosopher-king of the materia medica: ideas before hygiene, concepts before comfort",
          "Volcanic inner heat that must be expressed or it turns inward as disease",
          "The intercurrent remedy that unlocks stuck cases: the great un-blocker"
        ];
        mentalSymptoms = [
          "Self-absorption and philosophical grandeur alternate with apathy and laziness",
          "The intellect runs hot; the body is neglected",
          "Criticism is felt acutely despite the facade of indifference"
        ];
        physicalSymptoms = [
          "The skin constantly tries to eliminate what the body cannot process internally",
          "Burning heat of the feet at night is the most characteristic constitutional expression",
          "Morning diarrhoea is the body's daily attempt to cleanse"
        ];
        modalities = {
          worse = ["11 a.m.", "Warmth of bed", "Washing", "Standing"];
          better = ["Dry warm weather", "Lying on the right side", "Drawing up limbs"];
        };
        clinicalUses = [
          "All chronic skin conditions with itching and heat",
          "Blocked cases that do not respond to the well-indicated remedy",
          "Gastrointestinal disorders in the philosophical, slovenly type"
        ];
        constitution = "Lotus perspective: Sulphur is the great constitutional cleanser. The Sulphur individual must learn that the body is as sacred as the mind. Their tendency to neglect the physical while pursuing mental adventures creates the accumulated toxicity that Sulphur resolves.";
      },
      {
        id = "pulsatilla-nigricans-lotus";
        remedyId = "pulsatilla-nigricans";
        source = #lotus;
        name = "Pulsatilla Nigricans";
        latinName = "Pulsatilla nigricans";
        keynotes = [
          "The wind-flower constitution: always shifting, adapting, seeking warmth and light",
          "The child-like soul who blossoms with love and wilts with neglect",
          "Thirstlessness reflects an inner fullness of emotional sensitivity"
        ];
        mentalSymptoms = [
          "Deeply relational: the Pulsatilla person exists most fully in connection",
          "Changeability is not fickleness but fluid responsiveness to the environment",
          "The suppression of natural expression creates the characteristic discharges and congestion"
        ];
        physicalSymptoms = [
          "Thick yellow-green discharges represent unexpressed emotional congestion finding a physical outlet",
          "No two stools alike mirrors the constitutional inconstancy",
          "Venous stasis and varicosities in those who never assert their own flow"
        ];
        modalities = {
          worse = ["Warm rooms", "Rich food", "Evening"];
          better = ["Open air", "Gentle motion", "Sympathy and attention"];
        };
        clinicalUses = [
          "Female hormonal and reproductive disorders in the gentle, yielding type",
          "Catarrhal conditions in children who cling and weep",
          "Venous and circulatory disorders in the passive constitution"
        ];
        constitution = "Lotus perspective: Pulsatilla represents the principle of yielding and flowing. These individuals flourish when given warmth and direction but suffer when unsupported. The remedy restores the healthy capacity for both attachment and independence.";
      },
      {
        id = "nux-vomica-lotus";
        remedyId = "nux-vomica";
        source = #lotus;
        name = "Nux Vomica";
        latinName = "Nux vomica";
        keynotes = [
          "The high-achiever who self-medicates: coffee, stimulants, alcohol as performance tools",
          "The nervous system pushed beyond its sustainable limit",
          "Over-civilised, over-stimulated, under-rested — the modern epidemic in remedy form"
        ];
        mentalSymptoms = [
          "Perfectionism as a driver of both achievement and illness",
          "The inability to switch off is the core constitutional challenge",
          "Irritability is compressed vital energy seeking release"
        ];
        physicalSymptoms = [
          "The digestive system is the primary barometer of excess: liver, bowels, stomach all speak",
          "Constipation reflects the holding and controlling nature of the constitution",
          "The nervous hypersensitivity is the price paid for constant high performance"
        ];
        modalities = {
          worse = ["Morning", "Cold", "After eating", "Mental exertion", "Stimulants"];
          better = ["Warmth", "Evening", "Rest", "Damp weather"];
        };
        clinicalUses = [
          "Burnout and exhaustion in high-performing professionals",
          "Digestive disorders from dietary excess and stress",
          "Insomnia from mental overactivity"
        ];
        constitution = "Lotus perspective: Nux vomica is the remedy of modern civilised excess. It suits the driven individual who confuses productivity with worth. The healing task is learning to rest, digest — both food and experience — and release the tyranny of perfectionism.";
      },
      {
        id = "belladonna-lotus";
        remedyId = "belladonna";
        source = #lotus;
        name = "Belladonna";
        latinName = "Atropa belladonna";
        keynotes = [
          "Acute congestion as the body's response to suppressed vital force seeking expression",
          "The remedy of the plethoric, full-blooded constitution suddenly overwhelmed",
          "Sudden flares that come from nowhere and resolve as quickly"
        ];
        mentalSymptoms = [
          "The Belladonna delirium reveals what is normally hidden: wildness beneath the civilised surface",
          "Hypersensitivity to all impressions in the acute state",
          "The bright eyes and flushed face are the vital force at full intensity"
        ];
        physicalSymptoms = [
          "All complaints are about excess: too much heat, too much congestion, too much stimulation",
          "The nervous system and vascular system are always at full throttle",
          "Sudden onset mirrors the volcanic nature of the constitutional expression"
        ];
        modalities = {
          worse = ["Touch", "Noise", "Light", "Jarring", "3 p.m."];
          better = ["Rest in darkness", "Warmth", "Semi-erect position"];
        };
        clinicalUses = [
          "Acute febrile illnesses in the plethoric, congested type",
          "Suppressed eruptions with cerebral congestion",
          "Childhood fevers with sudden onset and intensity"
        ];
        constitution = "Lotus perspective: Belladonna addresses acute crises in the sanguine, congested constitution. It can also be viewed as the acute of the Calcarea constitition. The violent onset signals a vital force that has been over-contained and is finally expressing itself.";
      },
      {
        id = "calcarea-carbonica-lotus";
        remedyId = "calcarea-carbonica";
        source = #lotus;
        name = "Calcarea Carbonica";
        latinName = "Calcarea carbonica";
        keynotes = [
          "The shell-building remedy: calcium builds structure and protection at every level",
          "Slowness is a constitutional virtue, not a failing: these individuals build carefully",
          "The fear of exposure: fear of being found wanting, of chaos breaking through the shell"
        ];
        mentalSymptoms = [
          "Anxiety about security at every level: financial, health, social",
          "The compulsive building of routines and structures to manage anxiety",
          "The Calcarea child takes longer but builds more solidly when ready"
        ];
        physicalSymptoms = [
          "The soft, spongy, cold and damp constitution reflects insufficient mineralisation",
          "Slow metabolism accumulates fat and is resistant to change",
          "Profuse head sweats represent the effort of the vital force to maintain homeostasis"
        ];
        modalities = {
          worse = ["Cold and damp", "Exertion", "Full moon", "Ascending"];
          better = ["Dry weather", "Constipation (paradoxically)", "Lying on painful side"];
        };
        clinicalUses = [
          "Developmental delays and growth disorders",
          "Anxiety disorders with somatic expression",
          "Thyroid dysfunction and metabolic slowness"
        ];
        constitution = "Lotus perspective: Calcarea carbonica is the archetype of the person who builds security through structure. Their apparent stubbornness is self-protection. The remedy supports the gradual building of both physical and psychological strength at the pace that suits the constitution.";
      },
      {
        id = "lycopodium-clavatum-lotus";
        remedyId = "lycopodium-clavatum";
        source = #lotus;
        name = "Lycopodium Clavatum";
        latinName = "Lycopodium clavatum";
        keynotes = [
          "The gap between the public persona and private self-doubt is the Lycopodium wound",
          "The remedy of premature aging: living by the mind at the expense of the body",
          "Right-sided because the right represents the future: anxiety about what is to come"
        ];
        mentalSymptoms = [
          "The impostor syndrome remedy: highly capable yet chronically underconfident",
          "Control exerted at home compensates for anxiety experienced in the world",
          "The liver — seat of anger in traditional medicine — is the Lycopodium organ"
        ];
        physicalSymptoms = [
          "Bloating is the body holding what the mind cannot digest",
          "Renal deposits mirror the Lycopodium tendency to accumulate and crystallise",
          "Premature hair loss reflects premature depletion of vital reserves"
        ];
        modalities = {
          worse = ["4–8 p.m.", "Right side", "Pressure of clothes", "Cold food"];
          better = ["Warm food and drink", "Gentle movement", "After midnight"];
        };
        clinicalUses = [
          "Digestive disorders in intellectually driven but physically depleted types",
          "Hepatic and renal conditions in anxious high-achievers",
          "Sexual neurasthenia from overwork and anxiety"
        ];
        constitution = "Lotus perspective: Lycopodium heals the gap between the mind's ambition and the body's reality. The constitutional task is integrating confidence into genuine self-assurance rather than compensatory control.";
      },
      {
        id = "natrum-muriaticum-lotus";
        remedyId = "natrum-muriaticum";
        source = #lotus;
        name = "Natrum Muriaticum";
        latinName = "Natrum muriaticum";
        keynotes = [
          "Salt holds water: the constitutional tendency to retain emotion, to hold grief",
          "The independent facade that conceals profound need for connection",
          "The remedy of romantic idealism and the pain of disappointment"
        ];
        mentalSymptoms = [
          "Grief stored in the cells: the body maintains what the mind tries to release",
          "The extreme sensitivity to consolation reflects how much the inner wound requires protection",
          "Introversion as a learned response to repeated emotional injury"
        ];
        physicalSymptoms = [
          "Emaciation below the neck while the neck and face retain puffiness mirrors the psyche-soma split",
          "Constipation: the body holds what the psyche holds",
          "Herpes as the physical expression of suppressed grief at boundaries"
        ];
        modalities = {
          worse = ["10–11 a.m.", "Heat of sun", "Consolation", "Company"];
          better = ["Open air", "Cold bathing", "Solitude", "Fasting"];
        };
        clinicalUses = [
          "Chronic depression from unresolved grief",
          "Autoimmune conditions in the over-controlled type",
          "Migraine and intermittent fever in the suppressed emotional type"
        ];
        constitution = "Lotus perspective: Natrum muriaticum addresses the sorrow that lives in the body. These individuals have been hurt deeply and have learned not to show it. The remedy gently opens the inner vault so that grief can finally flow and heal.";
      },
      {
        id = "apis-mellifica-lotus";
        remedyId = "apis-mellifica";
        source = #lotus;
        name = "Apis Mellifica";
        latinName = "Apis mellifica";
        keynotes = [
          "The swarm mind: busy, purposeful, communal — when the hive is threatened, the sting comes",
          "Oedema as the body's inability to maintain its own boundaries against external invasion",
          "Thirstlessness despite swelling: the tissues are full of the wrong fluid"
        ];
        mentalSymptoms = [
          "Industrious and community-oriented, but jealous when the social role is threatened",
          "The sudden, violent reaction of the bee sting mirrors the emotional expression",
          "Apathy alternating with busy restlessness: the exhausted worker bee"
        ];
        physicalSymptoms = [
          "Every swelling speaks of inflammation at the boundary between self and environment",
          "The kidneys — organs of boundary and filtration — are frequently involved",
          "Thirstlessness differentiates from other inflammatory remedies with oedema"
        ];
        modalities = {
          worse = ["Heat", "Touch", "Pressure", "Right side", "After sleep"];
          better = ["Cold applications", "Open air", "Uncovering"];
        };
        clinicalUses = [
          "Oedematous and urticarial states in the industrious, reactive constitution",
          "Renal and inflammatory disorders with boundary issues",
          "Anaphylactic and hypersensitivity reactions"
        ];
        constitution = "Lotus perspective: Apis addresses acute boundary violations at every level. The constitutional picture includes the person who gives too much to the community and reacts violently when their own territory is invaded.";
      },
      {
        id = "ignatia-amara-lotus";
        remedyId = "ignatia-amara";
        source = #lotus;
        name = "Ignatia Amara";
        latinName = "Strychnos ignatii";
        keynotes = [
          "The acute grief remedy for idealists whose inner image of life has been shattered",
          "Contradiction is the essence: the body contradicts itself because the heart is at war with the mind",
          "The sigh is the body trying to release what the heart cannot yet let go"
        ];
        mentalSymptoms = [
          "Idealism as a source of both beauty and suffering: the higher the expectation, the greater the fall",
          "Spasm at every level — physical and emotional — when the containment breaks",
          "The Ignatia person is never fully present after the loss; part of them remains with what was"
        ];
        physicalSymptoms = [
          "The globus hystericus is unexpressed grief lodged in the throat",
          "Insomnia from the mind's inability to cease processing the loss",
          "Headache like a nail is the acute point of psychic pain finding a physical location"
        ];
        modalities = {
          worse = ["Morning", "Coffee", "Tobacco", "Open air", "Consolation"];
          better = ["Eating", "Change of position", "Pressure", "Swallowing solids"];
        };
        clinicalUses = [
          "Acute grief reactions in sensitive, idealistic individuals",
          "Hysterical and spasmodic conditions after emotional shock",
          "Insomnia and anxiety after bereavement"
        ];
        constitution = "Lotus perspective: Ignatia is the remedy for the shattered ideal. These sensitive souls have constructed beautiful inner worlds and suffer profoundly when reality fails to match the dream. The remedy helps them grieve the dream and open to what is real.";
      },
      {
        id = "arsenicum-album-lotus";
        remedyId = "arsenicum-album";
        source = #lotus;
        name = "Arsenicum Album";
        latinName = "Arsenicum album";
        keynotes = [
          "The perfectionist poisoned by their own standards: no amount of control is ever enough",
          "Restlessness is existential: the Arsenicum constitution is never at ease in the body or the world",
          "The midnight hour as the time of reckoning: when defenses are lowest, the deepest fears arise"
        ];
        mentalSymptoms = [
          "Fear of death conceals a deeper fear: of chaos, of loss of control, of dissolution",
          "Fastidiousness is the attempt to impose order on an inner world of anxiety",
          "The need for company at night reflects the unbearable quality of the existential aloneness"
        ];
        physicalSymptoms = [
          "Burning pains relieved by warmth: the cold of existential fear alleviated by external heat",
          "Prostration disproportionate to the disease reflects the drain of constant hypervigilance",
          "The burning, excoriating discharges are the inner anxiety finding physical form"
        ];
        modalities = {
          worse = ["Midnight", "Cold", "Alone", "Exertion"];
          better = ["Warmth", "Company", "Hot drinks", "Head elevated"];
        };
        clinicalUses = [
          "Anxiety disorders with somatic expression in the perfectionist type",
          "Acute gastroenteritis with existential fear",
          "Chronic disease with burning quality in the fastidious, restless constitution"
        ];
        constitution = "Lotus perspective: Arsenicum heals the constitutional pattern of control as a response to terror. The deepest healing for these individuals comes when they discover that they can surrender control and still be safe.";
      },
      {
        id = "rhus-toxicodendron-lotus";
        remedyId = "rhus-toxicodendron";
        source = #lotus;
        name = "Rhus Toxicodendron";
        latinName = "Rhus toxicodendron";
        keynotes = [
          "The restless remedy: the body cannot find ease, the mind mirrors this with anxiety",
          "Stiffness from stillness: this constitution requires continuous movement to remain fluid",
          "Cold and damp are the constitutional enemies: they crystallise what should flow"
        ];
        mentalSymptoms = [
          "The restlessness of Rhus tox reflects an inability to settle into the present moment",
          "Weeping without knowing why: the sadness is constitutional, pre-cognitive",
          "Anxiety is worse in the night when movement is no longer possible"
        ];
        physicalSymptoms = [
          "The joints and connective tissue are the constitutional terrain",
          "Vesicular skin eruptions reflect internal inflammation expressing outwardly",
          "The triangular red tip of tongue signals the inflammatory process at the body's centre"
        ];
        modalities = {
          worse = ["Cold and damp", "Initial motion", "Night", "Rest"];
          better = ["Continued motion", "Warmth", "Dry weather", "Hot applications"];
        };
        clinicalUses = [
          "Rheumatic and arthritic conditions in the cold, restless constitution",
          "Connective tissue disorders and sprains with Rhus tox pattern",
          "Viral exanthems with vesicular component"
        ];
        constitution = "Lotus perspective: Rhus tox addresses the constitutional need for perpetual movement as a defense against stagnation. These individuals must learn that rest and stillness, though feared, are also necessary for renewal.";
      },
      {
        id = "sepia-lotus";
        remedyId = "sepia";
        source = #lotus;
        name = "Sepia";
        latinName = "Sepia officinalis";
        keynotes = [
          "The exhausted nurturer: has given everything to others and has nothing left for herself",
          "Indifference is not cruelty but depletion: love has not died but the energy to express it has",
          "Vigorous dancing restores the Sepia constitution because it reconnects her to her own rhythm"
        ];
        mentalSymptoms = [
          "The bearing-down sensation is both physical and existential: the weight of being needed by all",
          "Irritability arises from the disparity between what is given and what is received",
          "The Sepia woman has often sacrificed her own creative and professional life for others"
        ];
        physicalSymptoms = [
          "Prolapse at every level mirrors the constitutional letting-go: what was held up can no longer be sustained",
          "The yellow-brown saddle is the Sepia constitution written on the face",
          "Morning sickness reflects the body's refusal to take in more when already overwhelmed"
        ];
        modalities = {
          worse = ["Before menses", "Cold air", "Afternoon", "Sexual excess", "Consolation"];
          better = ["Vigorous exercise", "Warmth", "Drawing up limbs", "Outdoor activity"];
        };
        clinicalUses = [
          "Burnout in caregiving women",
          "Pelvic organ prolapse and reproductive depletion",
          "Depression with flat affect in the over-extended constitution"
        ];
        constitution = "Lotus perspective: Sepia is the constitutional remedy for feminine depletion. The healing journey involves reclaiming the self that was given away — restoring creative expression, joy in movement, and the right to have needs.";
      },
    ];

    for (entry in lotusEntries.vals()) {
      store.add(entry.id, entry);
    };

    // ── ADDITIONAL REMEDIES × 3 SOURCES ────────────────────────────
    let additionalEntries : [SourcedRemedy] = [
      // ── ACONITUM NAPELLUS ─────────────────────────────────────────
      {
        id = "aconitum-napellus-boericke";
        remedyId = "aconitum-napellus";
        source = #boericke;
        name = "Aconitum Napellus";
        latinName = "Aconitum napellus";
        keynotes = [
          "Sudden, violent onset after exposure to dry cold wind",
          "Great fear and anxiety with prediction of death; fear of death is marked",
          "Extreme restlessness: tosses about in anguish",
          "Everything is intense and rapid: fever, pain, anxiety, thirst",
          "Tingling and numbness of the extremities"
        ];
        mentalSymptoms = [
          "Fear of death; predicts the exact time of death",
          "Anguish, restlessness; cannot bear pain",
          "Fear of future; of crowds; of going out",
          "Sudden fright as causation of illness"
        ];
        physicalSymptoms = [
          "Croup with sudden onset after cold dry wind",
          "Burning, lancinating pains; skin hot and dry",
          "Palpitations with anxiety; cardiac irregularities from fright",
          "Eye inflammation from cold air exposure",
          "Urinary retention from fear or cold"
        ];
        modalities = {
          worse = ["Evening and night", "Warm room", "Lying on affected side", "Cold dry winds"];
          better = ["Open air", "Rest", "Warm perspiration"];
        };
        clinicalUses = [
          "First stage of all inflammatory and febrile diseases",
          "Croup with sudden onset",
          "Anxiety and panic attacks",
          "Cardiac conditions from fright"
        ];
        constitution = "Robust, vigorous individuals struck suddenly by violent illness. Aconitum is the first-stage remedy par excellence — it is rarely needed after the first 24 hours.";
      },
      {
        id = "aconitum-napellus-allens";
        remedyId = "aconitum-napellus";
        source = #allensKeynotes;
        name = "Aconitum Napellus";
        latinName = "Aconitum napellus";
        keynotes = [
          "Great fear, anxiety and worry accompany every complaint",
          "Predicts the day of his death; fears death greatly",
          "After exposure to dry cold winds; or from fright or shock",
          "Sudden, violent onset; everything rapid in its progress",
          "Skin dry, hot; pulse full, hard, tense"
        ];
        mentalSymptoms = [
          "Extreme fear and anxiety; screams with pain",
          "Predicts death; says he will die in a certain number of hours"
        ];
        physicalSymptoms = [
          "High fever; dry burning skin; great thirst for cold water",
          "Palpitation from fright; numbness and tingling"
        ];
        modalities = {
          worse = ["Evening and night", "Fright", "Cold dry wind"];
          better = ["Open air", "Perspiration"];
        };
        clinicalUses = [
          "Sudden febrile illness; early inflammatory states",
          "Anxiety from fright; croup"
        ];
        constitution = "Vigorous, plethoric people; acute remedy only.";
      },
      {
        id = "aconitum-napellus-lotus";
        remedyId = "aconitum-napellus";
        source = #lotus;
        name = "Aconitum Napellus";
        latinName = "Aconitum napellus";
        keynotes = [
          "The shock of sudden danger meeting the threshold of the vital force",
          "Primal terror: the existential confrontation with mortality",
          "The acute state is the vital force at maximum intensity trying to expel the disease"
        ];
        mentalSymptoms = [
          "The Aconitum state is a flashpoint — complete and overwhelming",
          "Fear of death is paradoxically combined with extraordinary intensity of living",
          "After the Aconitum state passes, deeper constitutional remedies become visible"
        ];
        physicalSymptoms = [
          "The dryness, heat and restlessness mirror the state of extreme metabolic activation",
          "Everything burns: the vital force fighting maximally",
          "Rapid resolution or rapid deterioration — no middle ground"
        ];
        modalities = {
          worse = ["Night", "Dry cold wind", "Fright", "Warm rooms"];
          better = ["Open air", "Perspiration", "Rest"];
        };
        clinicalUses = [
          "Post-traumatic acute states; panic after accidents",
          "First prescriptions in acute febrile illness",
          "Shock states with intense fear and heat"
        ];
        constitution = "Lotus perspective: Aconitum addresses the primal terror of mortality. It is the acute remedy for those moments when life and death seem to hang in the balance. It rarely needs to be repeated — one dose in the acute state is sufficient.";
      },

      // ── GELSEMIUM SEMPERVIRENS ────────────────────────────────────
      {
        id = "gelsemium-sempervirens-boericke";
        remedyId = "gelsemium-sempervirens";
        source = #boericke;
        name = "Gelsemium Sempervirens";
        latinName = "Gelsemium sempervirens";
        keynotes = [
          "Muscular weakness and heaviness: eyelids droop, muscles refuse to obey",
          "Dizziness, drowsiness, dullness and trembling: the four Ds of Gelsemium",
          "Anticipatory anxiety with paralysis: cannot face what lies ahead",
          "Influenza with aching muscles and high fever without thirst",
          "Chills run up and down the spine"
        ];
        mentalSymptoms = [
          "Stage fright; performance anxiety; anticipatory dread",
          "Dull, confused, apathetic; does not want to be disturbed",
          "Fear of losing self-control; dread of the dentist",
          "Prostrated after emotional excitement"
        ];
        physicalSymptoms = [
          "Influenza: fever with profound muscular aching, no thirst",
          "Ptosis and diplopia; paralysis of muscles of eye",
          "Headache beginning in the neck; relieved by urination",
          "Trembling of hands and limbs; muscular inco-ordination",
          "Slow, soft pulse; low blood pressure"
        ];
        modalities = {
          worse = ["Damp weather", "Fog", "Before a thunderstorm", "Emotions", "Excitement"];
          better = ["Continued motion", "Urination", "Open air", "Stimulants"];
        };
        clinicalUses = [
          "Influenza and viral infections",
          "Stage fright and anticipatory anxiety",
          "Neurological conditions: facial palsy, diplopia",
          "Fevers of nervous origin"
        ];
        constitution = "Excitable, sensitive individuals who respond to stress and emotion with paralysis and prostration. Also useful in the phlegmatic, drowsy type who is easily overwhelmed.";
      },
      {
        id = "gelsemium-sempervirens-allens";
        remedyId = "gelsemium-sempervirens";
        source = #allensKeynotes;
        name = "Gelsemium Sempervirens";
        latinName = "Gelsemium sempervirens";
        keynotes = [
          "Dizziness, drowsiness, dullness and trembling",
          "Muscular weakness: eyelids heavy and drooping",
          "Complete motor paralysis; limbs feel heavy",
          "Chills up and down the spine; no thirst in fever",
          "Anticipatory anxiety; stage fright with diarrhoea"
        ];
        mentalSymptoms = [
          "Stage fright; anticipatory anxiety; dread of ordeal",
          "Dull, apathetic; wants to be left alone"
        ];
        physicalSymptoms = [
          "Influenza with great prostration, aching, and no thirst",
          "Ptosis; diplopia; trembling of extremities"
        ];
        modalities = {
          worse = ["Damp weather", "Bad news", "Emotions"];
          better = ["Profuse urination", "Open air", "Stimulants"];
        };
        clinicalUses = [
          "Influenza; neurological paralyses",
          "Anticipatory anxiety; examination fright"
        ];
        constitution = "Droopy, drowsy, dull; sensitive to excitement and emotion.";
      },
      {
        id = "gelsemium-sempervirens-lotus";
        remedyId = "gelsemium-sempervirens";
        source = #lotus;
        name = "Gelsemium Sempervirens";
        latinName = "Gelsemium sempervirens";
        keynotes = [
          "Paralysis as the psyche's response to overwhelm: when the demand exceeds the capacity",
          "The four Ds reflect the system shutting down to conserve what remains",
          "Anticipatory anxiety that immobilises: knowing what is coming is worse than the event itself"
        ];
        mentalSymptoms = [
          "The constitutional freeze response: fight-flight bypassed, going straight to freeze",
          "Performance anxiety as a constitutional pattern, not merely situational",
          "Dullness and apathy as protection against a world that demands too much"
        ];
        physicalSymptoms = [
          "The heavy, drooping quality reflects the downward collapse of vital energy",
          "Spinal chills are the nervous system dysregulation made visible",
          "Weakness after emotional shock or performance demands"
        ];
        modalities = {
          worse = ["Anticipation", "Damp weather", "Emotional excitement"];
          better = ["Urination", "Open air", "Continued gentle movement"];
        };
        clinicalUses = [
          "Performance anxiety in sensitive, impressionable individuals",
          "Post-viral fatigue following influenza-type illness",
          "Neurological weakness from emotional causes"
        ];
        constitution = "Lotus perspective: Gelsemium addresses the constitution that becomes paralysed by the anticipation of demand. The healing task is building the nervous system's resilience so that challenges can be met with engagement rather than collapse.";
      },

      // ── LACHESIS MUTA ─────────────────────────────────────────────
      {
        id = "lachesis-muta-boericke";
        remedyId = "lachesis-muta";
        source = #boericke;
        name = "Lachesis Muta";
        latinName = "Lachesis muta";
        keynotes = [
          "Left-sided remedy; symptoms move from left to right",
          "Aggravation from sleep; worse on waking and after sleep",
          "Cannot bear constriction: tight clothing around neck or abdomen",
          "Loquacity: talk jumps from subject to subject; cannot be stopped",
          "Haemorrhagic tendency: dark, decomposed blood"
        ];
        mentalSymptoms = [
          "Jealousy and suspicion; religious insanity",
          "Loquacious: jumps from subject to subject; pressure of speech",
          "Delirium tremens; alcoholism",
          "Persecution complex; highly suspicious",
          "Brilliant, intellectual, restless mind"
        ];
        physicalSymptoms = [
          "Left-sided tonsillitis and throat complaints",
          "Climacteric complaints: hot flushes, palpitations, jealousy",
          "Cardiac conditions; valvular diseases",
          "Septic states with dark, decomposed haemorrhage",
          "Purple or bluish discolouration of affected parts",
          "Morning aggravation and aggravation from sleep"
        ];
        modalities = {
          worse = ["Sleep", "Pressure and constriction", "Morning", "Hot drinks", "Left side"];
          better = ["Open air", "Cold drinks", "Discharges appearing", "Hard pressure"];
        };
        clinicalUses = [
          "Left-sided throat and tonsil conditions",
          "Climacteric and menopausal complaints",
          "Cardiac diseases; valvular affections",
          "Septicaemia; blood poisoning",
          "Varicose veins and ulcers"
        ];
        constitution = "Brilliant, talkative, jealous, suspicious individuals prone to vascular congestion and haemorrhage. Particularly useful in women at the climacteric who have suppressed feelings.";
      },
      {
        id = "lachesis-muta-allens";
        remedyId = "lachesis-muta";
        source = #allensKeynotes;
        name = "Lachesis Muta";
        latinName = "Lachesis muta";
        keynotes = [
          "Cannot bear touch or pressure about the throat and abdomen",
          "Left-sided; goes from left to right",
          "Worse on waking from sleep; all symptoms aggravated after sleep",
          "Loquacious; jumps from subject to subject",
          "Jealous, suspicious; religious mania",
          "Dark, decomposed haemorrhages; purplish hue"
        ];
        mentalSymptoms = [
          "Jealousy; persecution mania; loquacity",
          "Brilliant mind; alcoholism; religious insanity"
        ];
        physicalSymptoms = [
          "Left-sided throat; dark purplish inflammation",
          "Climacteric flushing; cardiac irregularities"
        ];
        modalities = {
          worse = ["After sleep", "Constriction", "Hot drinks", "Left side"];
          better = ["Cold drinks", "Discharges", "Open air"];
        };
        clinicalUses = [
          "Left-sided tonsillitis; climacteric complaints",
          "Septic states; cardiac disease"
        ];
        constitution = "Loquacious, jealous, brilliant but unstable; left-sided and constriction-intolerant.";
      },
      {
        id = "lachesis-muta-lotus";
        remedyId = "lachesis-muta";
        source = #lotus;
        name = "Lachesis Muta";
        latinName = "Lachesis muta";
        keynotes = [
          "The venom of unspoken truth: what cannot be expressed becomes toxic",
          "The climacteric as a constitutional crisis: the end of the reproductive role triggers existential questioning",
          "Loquacity is the dam breaking: what was contained now floods out"
        ];
        mentalSymptoms = [
          "Jealousy as unmet need for full creative expression",
          "The Lachesis person is often brilliantly gifted but feels constrained by their circumstances",
          "Aggravation from sleep: the unconscious erupts when the controlling ego rests"
        ];
        physicalSymptoms = [
          "Constriction intolerance reflects the need for unbounded expression",
          "Dark, decomposed blood mirrors toxic accumulation from suppression",
          "Left-sidedness: the left is associated with the unconscious, the feminine, the unexpressed"
        ];
        modalities = {
          worse = ["Constriction", "After sleep", "Suppressed discharges"];
          better = ["Free expression", "Discharges", "Cold drinks"];
        };
        clinicalUses = [
          "Climacteric complaints with emotional suppression",
          "Septic states in the vividly expressive but frustrated constitution",
          "Cardiac conditions where unexpressed feeling affects the heart directly"
        ];
        constitution = "Lotus perspective: Lachesis is the remedy of transformation through crisis. The venom of the snake is both poison and medicine — the concentrated life force that, when properly directed, transforms what it touches.";
      },

      // ── MERCURIUS SOLUBILIS ───────────────────────────────────────
      {
        id = "mercurius-solubilis-boericke";
        remedyId = "mercurius-solubilis";
        source = #boericke;
        name = "Mercurius Solubilis";
        latinName = "Mercurius solubilis";
        keynotes = [
          "Profuse, offensive sweating without relief; sweating makes everything worse",
          "Moist, flabby, tooth-indented tongue with offensive breath",
          "Trembling: of hands, of tongue, of limbs",
          "Aggravated by both heat and cold; cannot find a comfortable temperature",
          "Suppurative tendency: every inflammation tends toward pus formation"
        ];
        mentalSymptoms = [
          "Slowness; deliberate manner; stuttering",
          "Hurried feeling internally with slow external expression",
          "Impulse to kill; violent impulses",
          "Anxiety, especially at night; restlessness",
          "Feels instinctively that he is being watched"
        ];
        physicalSymptoms = [
          "Glandular affections: swollen, painful lymph nodes",
          "Dental caries; gums bleed easily; painful gums",
          "Syphilitic manifestations and gonorrhoeal sequelae",
          "Bone pains at night; violent, tearing pains",
          "Dysentery: tenesmus, bloody mucous stools; never-done sensation"
        ];
        modalities = {
          worse = ["Sweating", "Night", "Wet weather", "Both heat and cold", "Lying on right side"];
          better = ["Moderate temperatures", "Rest", "Morning"];
        };
        clinicalUses = [
          "Suppurative conditions: abscesses, tonsillitis",
          "Syphilis and syphilitic manifestations",
          "Glandular affections",
          "Dysentery",
          "Dental and gum diseases"
        ];
        constitution = "Slow, ponderous individuals prone to suppuration and glandular involvement. The mercury type is sensitive to both heat and cold, profusely sweating, and always feels worse after perspiration.";
      },
      {
        id = "mercurius-solubilis-allens";
        remedyId = "mercurius-solubilis";
        source = #allensKeynotes;
        name = "Mercurius Solubilis";
        latinName = "Mercurius solubilis";
        keynotes = [
          "Profuse, offensive perspiration that does not relieve",
          "Moist mouth; much saliva; offensive breath",
          "Flabby, tooth-indented tongue",
          "Worse from both heat and cold; sensitive to changes in temperature",
          "Trembling; shaking of limbs",
          "Suppuration: every inflamed part tends to go on to pus"
        ];
        mentalSymptoms = [
          "Slow, deliberate; hurried feeling internally",
          "Impulse to kill; anxiety and restlessness at night"
        ];
        physicalSymptoms = [
          "Glandular swellings; bone pains at night",
          "Dysentery with tenesmus; never-done sensation"
        ];
        modalities = {
          worse = ["Night", "Perspiration", "Extremes of temperature"];
          better = ["Moderate temperature", "Rest"];
        };
        clinicalUses = [
          "Suppurative conditions; syphilitic disorders",
          "Dysentery; glandular swellings; dental problems"
        ];
        constitution = "Slow, ponderous, sweating; suppurative tendency; sensitive to heat and cold.";
      },
      {
        id = "mercurius-solubilis-lotus";
        remedyId = "mercurius-solubilis";
        source = #lotus;
        name = "Mercurius Solubilis";
        latinName = "Mercurius solubilis";
        keynotes = [
          "Mercury as the alchemical symbol of transformation between states: neither fully fixed nor fully fluid",
          "The constitutional inability to regulate: sweating without relief, affected by heat and cold equally",
          "The suppurative tendency reflects the inability to hold what should be expressed"
        ];
        mentalSymptoms = [
          "The Mercurius mind is always processing: hurried internally, slow externally",
          "The impulse to violence reflects the toxic build-up in a system that cannot regulate its output",
          "Slowness as a compensatory defense against the inner chaos"
        ];
        physicalSymptoms = [
          "The profuse, offensive perspiration is the body trying to eliminate what it cannot hold",
          "Glandular involvement reflects the lymphatic system overwhelmed with what needs to be processed",
          "The toenail-indented, moist tongue is the constitutional state made visible in the mouth"
        ];
        modalities = {
          worse = ["Temperature extremes", "Night", "Perspiration"];
          better = ["Moderate, stable environment"];
        };
        clinicalUses = [
          "Suppurative and glandular conditions in the fluctuating, unstable constitution",
          "Syphilitic miasm cases where the constitutional state cannot regulate",
          "Dysentery and inflammatory bowel in the Mercury type"
        ];
        constitution = "Lotus perspective: Mercurius addresses the constitutional state of unregulated flux. These individuals fluctuate between extremes and cannot find a stable homeostasis. The remedy supports the development of inner regulatory capacity.";
      },

      // ── THUJA OCCIDENTALIS ────────────────────────────────────────
      {
        id = "thuja-occidentalis-boericke";
        remedyId = "thuja-occidentalis";
        source = #boericke;
        name = "Thuja Occidentalis";
        latinName = "Thuja occidentalis";
        keynotes = [
          "Fixed ideas: imagines body is fragile, made of glass; that a stranger is at his side",
          "Warts and warty excrescences; condylomata; polypi anywhere",
          "Nails brittle, soft, crumbling, or distorted",
          "Perspiration: sweetish, only on uncovered parts; oily skin",
          "Vaccinosis: ill-effects of vaccination"
        ];
        mentalSymptoms = [
          "Imagines he is made of glass; fear of being broken",
          "Fixed ideas which cannot be reasoned away",
          "Secretive nature; will not reveal thoughts or feelings",
          "Self-depreciation; feels ugly or unlovable",
          "Music causes weeping; melancholy music unbearable"
        ];
        physicalSymptoms = [
          "Warts and polypi on skin and mucous membranes",
          "Condylomata: fig-warts, cauliflower-like growths",
          "Left-sided headache; as if a nail is being driven in",
          "Ovarian cysts and tumours",
          "Urethral and prostatic affections"
        ];
        modalities = {
          worse = ["Damp cold", "Night", "3 a.m. and 3 p.m.", "Cold food", "Vaccination"];
          better = ["Sneezing", "Stretching", "Lying on left side"];
        };
        clinicalUses = [
          "Warts and condylomata",
          "Vaccinosis and post-vaccination complaints",
          "Sycotic miasm cases",
          "Ovarian and prostatic tumours",
          "Polypi and papillomata"
        ];
        constitution = "Pale, waxy or dark complexioned individuals with oily, lustrous skin, who are secretive and have fixed ideas. Chief remedy of the sycotic miasm.";
      },
      {
        id = "thuja-occidentalis-allens";
        remedyId = "thuja-occidentalis";
        source = #allensKeynotes;
        name = "Thuja Occidentalis";
        latinName = "Thuja occidentalis";
        keynotes = [
          "Fixed ideas: thinks body is made of glass or a living person accompanies him",
          "Warty excrescences; condylomata; warts large, seedy, or pedunculated",
          "Nails brittle and crumbling; perspiration with sweetish odour on uncovered parts",
          "Vaccinosis: bad effects of vaccination",
          "Sycotic miasm: the gonorrhoeal constitution"
        ];
        mentalSymptoms = [
          "Secretive; will not reveal inner life; fixed ideas",
          "Self-deprecating; feels ugly; music causes weeping"
        ];
        physicalSymptoms = [
          "Warts and polypi; condylomata from gonorrhoea",
          "Ovarian cysts; left-sided headache with nail sensation"
        ];
        modalities = {
          worse = ["Damp cold", "3 a.m. and 3 p.m.", "Vaccination"];
          better = ["Lying on left side", "Sneezing"];
        };
        clinicalUses = [
          "Warts and condylomata; vaccinosis",
          "Sycotic miasm; gonorrhoeal sequelae"
        ];
        constitution = "Waxy, pale or dark; oily skin; secretive; chief sycotic remedy.";
      },
      {
        id = "thuja-occidentalis-lotus";
        remedyId = "thuja-occidentalis";
        source = #lotus;
        name = "Thuja Occidentalis";
        latinName = "Thuja occidentalis";
        keynotes = [
          "The sycotic miasm as a constitutional pattern of concealment and excess growth",
          "Warts and growths represent the vital force's attempt to wall off what cannot be confronted",
          "The fixed idea of fragility mirrors the constitutional experience of self"
        ];
        mentalSymptoms = [
          "The secretive nature of Thuja reflects the sycotic suppression: what is expressed externally is never what is felt internally",
          "Self-image distortion: the beautiful outer appearance concealing the inner sense of being broken or unlovable",
          "Vaccinosis as the constitutional disruption of natural immune development"
        ];
        physicalSymptoms = [
          "All the growths and excrescences are the sycotic miasm's physical vocabulary",
          "Oily skin and sweetish perspiration are the constitutional signature",
          "The nail pathology reflects the deep constitutional involvement at the level of protectives"
        ];
        modalities = {
          worse = ["Damp cold", "3 a.m./p.m.", "Suppression"];
          better = ["Expression", "Lying on left side"];
        };
        clinicalUses = [
          "Deep sycotic constitutional cases with secrecy and self-image distortion",
          "Post-vaccination illness patterns",
          "Chronic growths and polypi in the sycotic constitution"
        ];
        constitution = "Lotus perspective: Thuja heals the sycotic wound: the deep constitutional pattern of shame, concealment, and compensatory growth. The tree itself — evergreen, concealing, towering — is the perfect image of this remedy's constitutional signature.";
      },

      // ── SILICEA (SILICEA TERRA) ────────────────────────────────────
      {
        id = "silicea-terra-boericke";
        remedyId = "silicea-terra";
        source = #boericke;
        name = "Silicea Terra";
        latinName = "Silicea terra";
        keynotes = [
          "Lack of vital heat; always cold; cannot get warm",
          "Deficient assimilation: food is well digested but poorly absorbed and utilised",
          "Offensiveness: sweating of feet with offensive odour; suppurations offensive",
          "Tendency to form fistulae; chronic suppurations that refuse to heal",
          "Fixed, obstinate; though timid and yielding in manner"
        ];
        mentalSymptoms = [
          "Yielding, timid, nervous; lacks self-confidence",
          "Conscientious anxiety about trifles; over-sensitive",
          "Fixed and obstinate in spite of apparent gentleness",
          "Fear of needles, pins, and sharp objects",
          "Fears failure despite ability; always feels underprepared"
        ];
        physicalSymptoms = [
          "Promotes suppuration and helps expel foreign bodies",
          "Chronic suppurating glands; fistulae",
          "Spinal irritation; curvature of spine",
          "Offensive sweating of feet; sweaty palms",
          "Malnutrition; failure to thrive despite eating",
          "Recurrent tonsillitis with tendency to suppurate"
        ];
        modalities = {
          worse = ["Cold in all forms", "Uncovering", "Draught", "Damp"];
          better = ["Warmth", "Wrapping up", "Warm room"];
        };
        clinicalUses = [
          "Chronic suppurations and fistulae",
          "Expulsion of foreign bodies",
          "Malnutrition and failure to thrive",
          "Recurrent infections with tendency to suppurate",
          "Spinal diseases"
        ];
        constitution = "Refined, delicate, thin-skinned individuals who appear yielding but are quietly stubborn. Always cold, with offensive sweating of the feet, poor stamina, and tendency to suppuration.";
      },
      {
        id = "silicea-terra-allens";
        remedyId = "silicea-terra";
        source = #allensKeynotes;
        name = "Silicea Terra";
        latinName = "Silicea terra";
        keynotes = [
          "Chilly; wants to be well-wrapped; cannot tolerate cold",
          "Yielding, timid; lacks self-confidence; over-conscientious",
          "Offensive sweating of feet; fetid foot-sweat",
          "Promotes suppuration and aids expulsion of foreign bodies",
          "Fistulae; abscesses that refuse to heal"
        ];
        mentalSymptoms = [
          "Wants to hide; dreads undertaking anything; mild but stubborn",
          "Fear of pins and sharp things"
        ];
        physicalSymptoms = [
          "Chronic suppurating glands; offensive foot sweat",
          "Foreign body expulsion; fistulae in ano"
        ];
        modalities = {
          worse = ["Cold air", "Uncovering", "Damp"];
          better = ["Warmth", "Wrapping up"];
        };
        clinicalUses = [
          "Chronic suppurations; foreign body expulsion",
          "Malnutrition; failure to thrive; spinal irritation"
        ];
        constitution = "Delicate, chilly, timid; offensive foot sweat; suppurative tendency.";
      },
      {
        id = "silicea-terra-lotus";
        remedyId = "silicea-terra";
        source = #lotus;
        name = "Silicea Terra";
        latinName = "Silicea terra";
        keynotes = [
          "Silica as crystal: it holds shape perfectly but requires great pressure to form",
          "The apparent gentleness conceals crystalline inner rigidity: the Silicea paradox",
          "The body's attempt to wall off what cannot be digested: abscesses as encapsulation of the unassimilable"
        ];
        mentalSymptoms = [
          "The fear of inadequacy drives the Silicea constitution into exhausting perfectionism",
          "Timidity is the interface through which the inner stubborn core protects itself",
          "Fear of sharp objects reflects the body's experienced vulnerability to penetration"
        ];
        physicalSymptoms = [
          "Poor assimilation reflects the constitutional difficulty absorbing and integrating experience",
          "Offensive foot sweat is the constitutional state expressed at the interface between body and ground",
          "Fistulae represent the body's chronic inability to fully resolve and close what has been opened"
        ];
        modalities = {
          worse = ["Cold", "Draughts", "Uncovering", "Mental effort"];
          better = ["Warmth", "Wrapping up", "Being protected"];
        };
        clinicalUses = [
          "Chronic recurrent infections in the under-confident, over-conscientious constitution",
          "Malnutrition and poor assimilation at constitutional level",
          "Post-surgical suppuration and non-healing wounds"
        ];
        constitution = "Lotus perspective: Silicea addresses the constitutional state of the person who has learned to conceal their inner strength behind apparent weakness. The healing involves reclaiming the quiet, crystalline authority that is genuinely theirs.";
      },

      // ── CALCAREA PHOSPHORICA ──────────────────────────────────────
      {
        id = "calcarea-phosphorica-boericke";
        remedyId = "calcarea-phosphorica";
        source = #boericke;
        name = "Calcarea Phosphorica";
        latinName = "Calcarea phosphorica";
        keynotes = [
          "Anaemia and emaciation; thin, lean children who grow too fast",
          "Rapid growth with insufficient bone density; growing pains",
          "Headache of school children with mental fatigue; worse from mental exertion",
          "Desire to travel; dissatisfied, restless; always wanting change",
          "Cold extremities; numbness and crawling sensations"
        ];
        mentalSymptoms = [
          "Peevish, unhappy; always wanting something new",
          "Difficulty concentrating; mental fatigue",
          "Homesick when away; dissatisfied at home",
          "School headaches; inability to study"
        ];
        physicalSymptoms = [
          "Delayed bone development; soft bones; late fontanelles",
          "Anaemia with pallor; bluish skin in cold",
          "Adenoid hypertrophy; open mouth breather",
          "Growing pains in limbs; rheumatism of joints",
          "Diarrhoea in dentition; infant digestive troubles"
        ];
        modalities = {
          worse = ["Cold", "Damp", "Teething", "Mental exertion", "Puberty"];
          better = ["Warmth", "Dry weather", "Summer"];
        };
        clinicalUses = [
          "Growth disorders and nutritional deficiency",
          "Anaemia in growing children",
          "Bone and dental development",
          "Adenoids and tonsils in children",
          "Rheumatic growing pains"
        ];
        constitution = "Thin, pallid, rapidly growing children and adolescents. The Calcarea phosphorica child grows faster than their constitution can support and needs this remedy to build solidity into their rapid development.";
      },
      {
        id = "calcarea-phosphorica-allens";
        remedyId = "calcarea-phosphorica";
        source = #allensKeynotes;
        name = "Calcarea Phosphorica";
        latinName = "Calcarea phosphorica";
        keynotes = [
          "Thin, anaemic, dark-haired children who grow rapidly",
          "Peevish, whining; always wanting to go somewhere",
          "Rheumatic pains when weather changes to cold or damp",
          "Bone-pains at night; growing pains",
          "Cold extremities; numbness"
        ];
        mentalSymptoms = [
          "Dissatisfied; wants change; homesick",
          "Mental fatigue from study; school headaches"
        ];
        physicalSymptoms = [
          "Delayed bone development; anaemia; soft bones",
          "Adenoids; growing pains in legs"
        ];
        modalities = {
          worse = ["Cold damp", "Teething", "Mental exertion"];
          better = ["Warmth", "Summer"];
        };
        clinicalUses = [
          "Nutritional disorders in rapidly growing children",
          "Bone development; anaemia; adenoids"
        ];
        constitution = "Thin, dark, fast-growing; anaemic; dissatisfied and restless.";
      },
      {
        id = "calcarea-phosphorica-lotus";
        remedyId = "calcarea-phosphorica";
        source = #lotus;
        name = "Calcarea Phosphorica";
        latinName = "Calcarea phosphorica";
        keynotes = [
          "Growth that outpaces the foundation: the constitutional challenge of developing too fast",
          "Dissatisfaction and restlessness as the expression of a self not yet consolidated",
          "The remedy for transitions: teething, puberty, growth spurts, life changes"
        ];
        mentalSymptoms = [
          "The desire for change and novelty reflects an incompletely formed sense of self",
          "Homesickness as the search for the stable centre not yet developed",
          "Mental fatigue from the enormous energetic demand of rapid growth"
        ];
        physicalSymptoms = [
          "Bone softness is constitutional: the scaffolding cannot keep up with the growth",
          "Growing pains are the cost of expansion without sufficient consolidation",
          "Cold extremities reflect energy directed to growth at the expense of circulation"
        ];
        modalities = {
          worse = ["Rapid growth phases", "Cold damp", "Mental demands"];
          better = ["Warmth", "Rest", "Summer sun"];
        };
        clinicalUses = [
          "Constitutional support during rapid growth phases",
          "Adolescent growing pains and developmental difficulties",
          "Transitional life phases requiring constitutional consolidation"
        ];
        constitution = "Lotus perspective: Calcarea phosphorica supports the constitutional process of building solid foundations during rapid development. It is the remedy for all transitions where the pace of change exceeds the capacity to consolidate.";
      },

      // ── STAPHYSAGRIA ──────────────────────────────────────────────
      {
        id = "staphysagria-boericke";
        remedyId = "staphysagria";
        source = #boericke;
        name = "Staphysagria";
        latinName = "Delphinium staphisagria";
        keynotes = [
          "Ailments from suppressed indignation; cannot express anger",
          "Sweet disposition masking deeply suppressed anger and resentment",
          "Sexual neurasthenia; ill effects of onanism and sexual excesses",
          "Post-surgical complaints: clean-cut incised wounds",
          "Toothache and dental decay; crumbling teeth"
        ];
        mentalSymptoms = [
          "Suppressed anger and indignation; cannot say no",
          "Feels humiliated; shame and mortification",
          "Extremely sensitive to rudeness; deeply wounded by words",
          "Romantic idealism; easily hurt in love matters",
          "Trembling with indignation; cannot control emotional reactions"
        ];
        physicalSymptoms = [
          "Incised wounds: post-surgical pain and slow healing",
          "Cystitis: from catheterisation or sexual activity ('honeymoon cystitis')",
          "Genital warts and condylomata in Staphysagria constitution",
          "Styes recurring; chalazia",
          "Toothache worse at night; teeth decay rapidly"
        ];
        modalities = {
          worse = ["Anger", "Indignation", "Sexual excesses", "Touch on affected parts", "Morning"];
          better = ["Warmth", "Rest", "Breakfast"];
        };
        clinicalUses = [
          "Post-operative wound healing",
          "Urinary tract infections from catheterisation",
          "Cystitis in newly-weds",
          "Ailments from indignation and suppressed anger",
          "Styes and chalazia"
        ];
        constitution = "Mild, yielding, over-controlled individuals who have learned to suppress anger and swallow indignation. They are typically gentle in manner but seething inside.";
      },
      {
        id = "staphysagria-allens";
        remedyId = "staphysagria";
        source = #allensKeynotes;
        name = "Staphysagria";
        latinName = "Delphinium staphisagria";
        keynotes = [
          "Ailments from suppressed indignation; ill-effects of anger, violence, pride",
          "Teeth black and crumbling from the roots; cannot be cleaned",
          "Cystitis from honeymoon or from catheterisation",
          "After clean-cut incised wounds: surgical wounds",
          "Sweet, mild temperament; trembles with indignation"
        ];
        mentalSymptoms = [
          "Suppressed anger; shame; cannot express indignation",
          "Deeply wounded by rudeness; idealistic in love"
        ];
        physicalSymptoms = [
          "Incised wounds; post-operative healing",
          "Cystitis from catheter or sexual intercourse; genital warts"
        ];
        modalities = {
          worse = ["Anger", "Sexual excess", "Touch"];
          better = ["Warmth", "Rest", "Breakfast"];
        };
        clinicalUses = [
          "Post-surgical healing; catheter cystitis",
          "Suppressed indignation; styes"
        ];
        constitution = "Gentle, yielding, deeply sensitive; suppresses anger; pride and idealism.";
      },
      {
        id = "staphysagria-lotus";
        remedyId = "staphysagria";
        source = #lotus;
        name = "Staphysagria";
        latinName = "Delphinium staphisagria";
        keynotes = [
          "The anatomy of the doormat: the person who has been taught that their anger is unacceptable",
          "Post-surgical healing requires not just physical but emotional integration of what was cut open",
          "The suppressed 'no' that creates the cystitis: the body's boundary where the voice has none"
        ];
        mentalSymptoms = [
          "The sweet disposition is a learned survival strategy in environments where anger was punished",
          "The body expresses through the urinary tract what the psyche cannot express through speech",
          "Healing involves reclaiming the right to be angry and to say no"
        ];
        physicalSymptoms = [
          "All post-surgical complaints carry the trauma of violation — however consensual and necessary",
          "Cystitis at transitions (honeymoon, new relationships) reflects boundary confusion",
          "Toothache and crumbling teeth mirror the constitutional self-deprecation"
        ];
        modalities = {
          worse = ["Suppression", "Indignation", "Morning"];
          better = ["Expression", "Warmth", "Sleep"];
        };
        clinicalUses = [
          "Post-trauma and post-surgical integration",
          "Chronic UTIs in over-accommodating individuals",
          "Conditions arising from long-term suppression of healthy anger"
        ];
        constitution = "Lotus perspective: Staphysagria is the remedy for the lost voice — for those who have learned that their anger, needs, and boundaries are unwelcome. The healing is the reclamation of the full emotional vocabulary including the right to refuse.";
      },

      // ── KALI BICHROMICUM ──────────────────────────────────────────
      {
        id = "kali-bichromicum-boericke";
        remedyId = "kali-bichromicum";
        source = #boericke;
        name = "Kali Bichromicum";
        latinName = "Kali bichromicum";
        keynotes = [
          "Tough, stringy, ropy mucous discharge that can be drawn into long strings",
          "Pains that wander and occur at the same time each day; periodical complaints",
          "Round punched-out ulcers in stomach, skin, or mucous membranes",
          "Post-nasal drip with tough mucus; sinusitis",
          "Bones, periosteum, and cartilages are affected; bony pains"
        ];
        mentalSymptoms = [
          "Methodical; precise; business-like",
          "Loves routine; dislikes novelty",
          "Indifferent to family and surroundings"
        ];
        physicalSymptoms = [
          "Catarrh: tough, sticky, stringy mucus from all mucous membranes",
          "Sinusitis with tough post-nasal drip",
          "Gastric ulcers: round, punched-out; vomiting of tough ropy mucus",
          "Psoriasis and skin ulcers with punched-out appearance",
          "Headache over one eye, alternating sides"
        ];
        modalities = {
          worse = ["Cold in any form", "Hot weather", "Undressing", "Morning on waking"];
          better = ["Heat", "Motion", "Pressure"];
        };
        clinicalUses = [
          "Sinusitis and chronic catarrh",
          "Gastric ulceration",
          "Psoriasis and skin ulcers",
          "Rheumatic conditions affecting periosteum",
          "Migraine over one eye"
        ];
        constitution = "Stout, light-complexioned individuals prone to catarrhal and ulcerative conditions. The Kali bich patient is practical and orderly but physically burdened by chronic mucous and catarrhal states.";
      },
      {
        id = "kali-bichromicum-allens";
        remedyId = "kali-bichromicum";
        source = #allensKeynotes;
        name = "Kali Bichromicum";
        latinName = "Kali bichromicum";
        keynotes = [
          "Tough, ropy, stringy mucus; can be drawn into long threads",
          "Complaints in isolated spots; pains wander to definite spots",
          "Round, punched-out ulcers in any tissue",
          "Post-nasal catarrh; tough mucus in throat",
          "Gastric complaints: vomiting of stringy, ropy mucus"
        ];
        mentalSymptoms = [
          "Methodical, precise; indifferent to family",
          "Loves routine; dislikes change"
        ];
        physicalSymptoms = [
          "Stringy mucous discharge from all membranes",
          "Round punched-out ulcers; headache over one eye"
        ];
        modalities = {
          worse = ["Cold", "Morning", "Undressing"];
          better = ["Heat", "Pressure", "Motion"];
        };
        clinicalUses = [
          "Sinusitis; chronic catarrh; gastric ulcers",
          "Skin ulcers; psoriasis; periosteal pains"
        ];
        constitution = "Stout, fair-complexioned; catarrhal and ulcerative tendency.";
      },
      {
        id = "kali-bichromicum-lotus";
        remedyId = "kali-bichromicum";
        source = #lotus;
        name = "Kali Bichromicum";
        latinName = "Kali bichromicum";
        keynotes = [
          "Stringiness as a constitutional metaphor: holding on, refusing to let go",
          "Periodicity reflects the underlying rhythm of the psoric or sycotic miasm",
          "The punched-out ulcer: the constitutional vulnerability finding its most characteristic physical expression"
        ];
        mentalSymptoms = [
          "The Kali constitution: duty, structure, reliability — but at the cost of emotional fluidity",
          "Indifference to family reflects the Kali pattern of principle over personal warmth",
          "Methodical precision is both strength and limitation"
        ];
        physicalSymptoms = [
          "The stringy mucus reflects a system that cannot fully let go of what it produces",
          "The round punched-out ulcer is the perfect physical image of targeted, localised pathology",
          "Wandering pains that return to the same spot: the body's memory of its own wounds"
        ];
        modalities = {
          worse = ["Cold", "Suppression", "Morning"];
          better = ["Warmth", "Routine", "Structure"];
        };
        clinicalUses = [
          "Chronic sinusitis in the duty-bound, orderly constitution",
          "Gastric ulceration in those who cannot release digestive tension",
          "Psoriasis as the kali constitution's skin expression"
        ];
        constitution = "Lotus perspective: Kali bichromicum is the constitutional remedy for those who value structure and duty above all. Their pathology is the body's cry for fluidity and release in a constitution built for holding and maintaining.";
      },

      // ── GRAPHITES ─────────────────────────────────────────────────
      {
        id = "graphites-boericke";
        remedyId = "graphites";
        source = #boericke;
        name = "Graphites";
        latinName = "Graphites";
        keynotes = [
          "Unhealthy skin; every injury tends to suppurate; cicatrices break open",
          "Constipation: stools knotted, large, with mucous threads",
          "Thick, honey-like or sticky discharge from skin eruptions",
          "Obesity, chilliness, and mental dullness in women",
          "Eyelids and canthi: thick, crusty eruptions"
        ];
        mentalSymptoms = [
          "Sad, despairing; music causes weeping",
          "Timid; cannot make decisions; slow",
          "Fidgety; cannot concentrate for long",
          "Apprehension; cowardice"
        ];
        physicalSymptoms = [
          "Eczema: raw, moist, honey-like discharge between fingers, behind ears",
          "Scars that break down; keloids; thick, hard skin",
          "Constipation with large knotty stools",
          "Hearing: crackling and hissing; hardness of hearing",
          "Cracked, rough, hard skin at muco-cutaneous junctions"
        ];
        modalities = {
          worse = ["Cold", "Dampness", "Left side", "Night"];
          better = ["Warmth", "Open air", "Eating"];
        };
        clinicalUses = [
          "Chronic skin conditions: eczema, psoriasis",
          "Scars and keloids",
          "Constipation in the obese, chilly woman",
          "Otitis media and hearing loss",
          "Nutritional disorders of skin and nails"
        ];
        constitution = "Obese, chilly, pale women who are slow mentally and physically. Unhealthy skin with a tendency to form cracks, crusts, and suppurations at every opportunity.";
      },
      {
        id = "graphites-allens";
        remedyId = "graphites";
        source = #allensKeynotes;
        name = "Graphites";
        latinName = "Graphites";
        keynotes = [
          "Unhealthy skin; every little injury suppurates",
          "Constipation: large, difficult stools with mucus threads",
          "Thick, honey-like discharge from eczematous eruptions",
          "Obese, chilly, pale; music makes her weep",
          "Eyelids: thickened, crusted; blepharitis"
        ];
        mentalSymptoms = [
          "Sad, timid, indecisive; music causes weeping",
          "Apprehensive; cannot make decisions"
        ];
        physicalSymptoms = [
          "Eczema with sticky, honey-like discharge",
          "Scars that breakdown; keloids; constipation"
        ];
        modalities = {
          worse = ["Cold", "Night", "Left side"];
          better = ["Warmth", "Open air", "Eating"];
        };
        clinicalUses = [
          "Chronic eczema; scar tissue; keloids",
          "Constipation; hearing disorders; skin diseases"
        ];
        constitution = "Obese, pale, chilly women; unhealthy skin; slow mentally.";
      },
      {
        id = "graphites-lotus";
        remedyId = "graphites";
        source = #lotus;
        name = "Graphites";
        latinName = "Graphites";
        keynotes = [
          "The carbon constitution: dense, solid, slow to change — and prone to accumulation",
          "The oozing, honey-like discharge is the body releasing what it cannot otherwise process",
          "Music causes weeping: the one channel through which the Graphites constitution can access emotion"
        ];
        mentalSymptoms = [
          "Slowness is constitutional, not intellectual failure: these individuals process deeply and thoroughly",
          "Indecision reflects the difficulty of choosing when so much is felt as equally weighty",
          "The Graphites constitution often carries inherited family patterns that have crystallised"
        ];
        physicalSymptoms = [
          "The unhealthy skin is the elimination organ bearing the load of constitutional accumulation",
          "Constipation is both physical and metaphorical: holding on to what should be released",
          "Obesity as accumulated unlived life stored in the body"
        ];
        modalities = {
          worse = ["Cold", "Suppression", "Night"];
          better = ["Warmth", "Eating", "Open air"];
        };
        clinicalUses = [
          "Chronic skin and bowel disorders in the dense, accumulating constitution",
          "Metabolic slowness and obesity with constitutional basis",
          "Hereditary patterns of skin disease and accumulation"
        ];
        constitution = "Lotus perspective: Graphites addresses the constitution built for depth and solidity but prone to accumulation and stagnation. The healing involves learning to release — emotionally, physically, and digestively — what has been held for too long.";
      },

      // ── CHAMOMILLA ────────────────────────────────────────────────
      {
        id = "chamomilla-boericke";
        remedyId = "chamomilla";
        source = #boericke;
        name = "Chamomilla";
        latinName = "Matricaria chamomilla";
        keynotes = [
          "Extreme irritability and impatience; cannot bear pain; whines and complains",
          "One cheek red and hot, the other pale and cold",
          "Teething children: irritable, wants to be carried; cries constantly",
          "Pains: cannot endure; drives to frenzy; worse at night",
          "Children want things only to refuse them when offered"
        ];
        mentalSymptoms = [
          "Spiteful, irritable, snappish; answer back and contradict",
          "Impossible to please; wants things only to refuse them",
          "Whining restlessness; nothing satisfies",
          "Sensitive to pain beyond normal; the pain seems to cause disproportionate anguish"
        ];
        physicalSymptoms = [
          "Teething: extreme irritability; green stools like chopped spinach",
          "One cheek red, one pale; typical in hot teething fever",
          "Toothache worse from warm applications",
          "Colic: infant doubles up; green, sour stools",
          "Earache: extreme pain, particularly at night"
        ];
        modalities = {
          worse = ["Anger", "Night", "Warmth", "Teething", "Coffee"];
          better = ["Being carried", "Cold", "Moist warm weather"];
        };
        clinicalUses = [
          "Teething in irritable infants",
          "Colic with extreme irritability",
          "Earache with marked irritability",
          "Pain that drives the patient to distraction"
        ];
        constitution = "The Chamomilla child or adult who cannot tolerate pain and whose irritability is out of all proportion to the cause. Often triggered or exacerbated by anger or teething.";
      },
      {
        id = "chamomilla-allens";
        remedyId = "chamomilla";
        source = #allensKeynotes;
        name = "Chamomilla";
        latinName = "Matricaria chamomilla";
        keynotes = [
          "Extreme sensitiveness to pain; pain seems unbearable",
          "Child asks for many things only to refuse them",
          "Teething; one cheek red, other pale",
          "Green chopped spinach-like stools in children",
          "Patient says 'I cannot bear it' — cannot endure the pain"
        ];
        mentalSymptoms = [
          "Irritable, snappish, cannot be spoken to; wants to be carried",
          "Impatient; cross; nothing pleases"
        ];
        physicalSymptoms = [
          "Green stools in teething; one cheek red, one pale",
          "Earache with extreme irritability at night"
        ];
        modalities = {
          worse = ["Anger", "Night", "Warmth", "Teething"];
          better = ["Being carried", "Cold applications"];
        };
        clinicalUses = [
          "Teething; colic; earache in the oversensitive, irritable child",
          "Any complaint accompanied by marked irritability and pain hypersensitivity"
        ];
        constitution = "Oversensitive to pain; impossible to please; irritable beyond measure.";
      },
      {
        id = "chamomilla-lotus";
        remedyId = "chamomilla";
        source = #lotus;
        name = "Chamomilla";
        latinName = "Matricaria chamomilla";
        keynotes = [
          "The oversensitive nervous system meeting pain for which it has no adequate response",
          "The infant archetype: wanting everything, satisfied by nothing, comforted only by motion",
          "Teething as the constitutional crisis of the first boundary between self and world"
        ];
        mentalSymptoms = [
          "The Chamomilla state is an acute constitutional decompensation: normal coping is overwhelmed",
          "The impossibility of being pleased reflects a need so deep that no external offering can meet it",
          "The carrying motion soothes because it reproduces the womb state of constant safe movement"
        ];
        physicalSymptoms = [
          "Teething as the body pushing through a new threshold: painful, inevitable, and formative",
          "One-sided heat (one cheek red, one pale) mirrors the constitutional asymmetry of the distressed state",
          "Green stools reflect the digestive system's response to the systemic inflammatory state of teething"
        ];
        modalities = {
          worse = ["Pain", "Night", "Warmth", "Being still"];
          better = ["Continuous gentle motion", "Cold applications", "Being held"];
        };
        clinicalUses = [
          "Acute constitutional crises in infants and young children",
          "Adult pain states with constitutional oversensitivity",
          "Any state where the normal pain threshold is completely overwhelmed"
        ];
        constitution = "Lotus perspective: Chamomilla addresses the acute state where the threshold for bearing experience has been exceeded. It is not about character weakness but about a nervous system at its limit that needs the reset that only this remedy can provide.";
      },

      // ── FERRUM PHOSPHORICUM ───────────────────────────────────────
      {
        id = "ferrum-phosphoricum-boericke";
        remedyId = "ferrum-phosphoricum";
        source = #boericke;
        name = "Ferrum Phosphoricum";
        latinName = "Ferrum phosphoricum";
        keynotes = [
          "First stage of all inflammatory conditions before exudation sets in",
          "Slow onset compared to Aconitum; more gradual beginning of febrile illness",
          "Anaemia: face pale with circumscribed red patches on cheeks",
          "Haemorrhage: bright red, fresh, not profuse",
          "Hollow, reverberating cough with haemoptysis"
        ];
        mentalSymptoms = [
          "Excited, talkative; desire for company",
          "Indifferent to usually pleasant things",
          "Lack of concentration in children"
        ];
        physicalSymptoms = [
          "First stage inflammation before exudation",
          "Anaemia with flushed cheeks",
          "Haemoptysis: bright red blood",
          "Otitis media: fever with redness of ear drum; first stage",
          "Rheumatic pains: better from gentle motion"
        ];
        modalities = {
          worse = ["Night", "4–6 a.m.", "Motion", "Jarring"];
          better = ["Cold applications", "Gentle motion"];
        };
        clinicalUses = [
          "Early febrile states before consolidation",
          "Anaemia with inflammatory tendency",
          "Haemoptysis",
          "Otitis media first stage",
          "Rheumatic joint disease"
        ];
        constitution = "Anaemic, pale individuals prone to inflammatory flare-ups. Ferrum phos bridges the gap between Aconitum (sudden, violent onset) and Belladonna (congestion, heat) in the first stage of inflammation.";
      },
      {
        id = "ferrum-phosphoricum-allens";
        remedyId = "ferrum-phosphoricum";
        source = #allensKeynotes;
        name = "Ferrum Phosphoricum";
        latinName = "Ferrum phosphoricum";
        keynotes = [
          "First stage of febrile and inflammatory conditions; before consolidation",
          "Anaemia with circumscribed red cheeks; pallor",
          "Bright-red haemorrhage; haemoptysis",
          "Slow onset of illness — not sudden like Aconitum",
          "Hollow, ringing cough"
        ];
        mentalSymptoms = [
          "Excited; talkative; wants company",
          "Indifferent; lacks concentration"
        ];
        physicalSymptoms = [
          "First stage inflammation; anaemia with flushed cheeks",
          "Bright-red haemorrhage; hollow cough with spitting of blood"
        ];
        modalities = {
          worse = ["Night", "Motion", "Jarring"];
          better = ["Cold applications", "Rest"];
        };
        clinicalUses = [
          "First stage of all inflammatory conditions",
          "Anaemia; haemoptysis; otitis media"
        ];
        constitution = "Pale, anaemic; circumscribed red cheeks; first-stage inflammatory remedy.";
      },
      {
        id = "ferrum-phosphoricum-lotus";
        remedyId = "ferrum-phosphoricum";
        source = #lotus;
        name = "Ferrum Phosphoricum";
        latinName = "Ferrum phosphoricum";
        keynotes = [
          "The threshold moment of illness: the first engagement between vital force and pathogen",
          "Ferrum gives iron strength; phosphorus gives luminous sensitivity — together they address the anaemic who flushes",
          "First stage medicine: catching the illness before it deepens is the Ferrum phos moment"
        ];
        mentalSymptoms = [
          "The anaemic type who nevertheless engages fully: excitable, social, wanting connection",
          "The circumscribed flush on pale cheeks is the constitutional state made visible",
          "Lack of concentration in children reflects the depletion of iron-level resources"
        ];
        physicalSymptoms = [
          "The first stage of inflammation is the optimal intervention point in the Lotus constitutional perspective",
          "Bright-red haemorrhage reflects iron-level disruption: the blood still holds its vitality",
          "Anaemia in those who give too much of themselves too quickly"
        ];
        modalities = {
          worse = ["Night", "Jarring", "Motion"];
          better = ["Cold", "Gentle movement", "Rest"];
        };
        clinicalUses = [
          "Constitutional support during acute inflammatory phases",
          "Anaemia in the over-giving, easily flushed individual",
          "First-stage intervention to prevent deepening of acute illness"
        ];
        constitution = "Lotus perspective: Ferrum phosphoricum is the constitutional remedy for the moment of active engagement — when the vital force is rising to meet a challenge. Supporting this initial response is the most elegant constitutional intervention.";
      },

      // ── HEPAR SULPHURIS CALCAREUM ─────────────────────────────────
      {
        id = "hepar-sulphuris-boericke";
        remedyId = "hepar-sulphuris";
        source = #boericke;
        name = "Hepar Sulphuris Calcareum";
        latinName = "Hepar sulphuris calcareum";
        keynotes = [
          "Extreme hypersensitivity to touch, pain, cold air, and all external impressions",
          "Every little injury suppurates; unhealthy skin",
          "Discharges smell like old cheese or are putrid and offensive",
          "Croupy, barking cough with choking sensation; croup worse in cold air",
          "Irritability: cannot tolerate pain, cold, contradiction, or rudeness"
        ];
        mentalSymptoms = [
          "Extremely irritable; violent impulse to kill those around him",
          "Hypersensitive to all external impressions",
          "Hasty, impulsive; cannot endure contradiction",
          "Dissatisfied with everything; fault-finding",
          "Violent anger from slight causes"
        ];
        physicalSymptoms = [
          "Suppurations: promoting healthy pus formation or aborting abscess",
          "Tonsils and glands: recurring tonsillitis with suppuration",
          "Otitis media with thick offensive discharge",
          "Cheesey, offensive discharges from all suppurations",
          "Croup: choking, barking; worse cold air, better warm moist air"
        ];
        modalities = {
          worse = ["Cold", "Dry cold air", "Slightest draught", "Touch", "Morning"];
          better = ["Warmth", "Wrapping up", "Warm moist air", "After eating"];
        };
        clinicalUses = [
          "Suppurative conditions: abscesses, tonsillitis",
          "Croup in the Hepar sulph constitution",
          "Otitis media with offensive discharge",
          "Skin diseases with suppuration",
          "To promote or abort abscess formation"
        ];
        constitution = "Chilly, sensitive, irritable individuals who react to every exposure with inflammation and suppuration. Small doses abort suppuration; large doses promote it.";
      },
      {
        id = "hepar-sulphuris-allens";
        remedyId = "hepar-sulphuris";
        source = #allensKeynotes;
        name = "Hepar Sulphuris Calcareum";
        latinName = "Hepar sulphuris calcareum";
        keynotes = [
          "Extreme sensitiveness to all impressions; touch causes agony",
          "Chilly; cannot bear cold air in the least",
          "Sweating without relief; skin moist, unhealthy",
          "Barking, croupy cough; worse slightest cold air",
          "Violent impulse to kill those who contradict him"
        ];
        mentalSymptoms = [
          "Irritable, violent; impulse to kill; cannot bear pain",
          "Hypersensitive; faultfinding; nothing pleases"
        ];
        physicalSymptoms = [
          "Suppurations with putrid, cheesy odour",
          "Croup worse cold air; otitis with thick discharge"
        ];
        modalities = {
          worse = ["Cold", "Touch", "Slightest draught"];
          better = ["Warmth", "Wrapping", "Moist warm air"];
        };
        clinicalUses = [
          "Abscesses; suppurating tonsils; croup",
          "Otitis media; hypersensitive, chilly individuals"
        ];
        constitution = "Chilly, hypersensitive, irritable; suppurative tendency; worse cold air.";
      },
      {
        id = "hepar-sulphuris-lotus";
        remedyId = "hepar-sulphuris";
        source = #lotus;
        name = "Hepar Sulphuris Calcareum";
        latinName = "Hepar sulphuris calcareum";
        keynotes = [
          "The threshold of tolerance is constitutional: these individuals are genuinely more sensitive, not merely hypochondriacal",
          "The suppurative tendency represents the vital force's choice to expel rather than contain",
          "Extreme cold sensitivity as constitutional vulnerability: the organism cannot maintain its boundary against cold"
        ];
        mentalSymptoms = [
          "The violent impulse to kill those who irritate reflects the cost of maintaining extreme sensitivity without an outlet",
          "The Hepar constitution often has a history of having been hypersensitive since birth",
          "The need for warmth and wrapping is both physical and emotional: to be contained and protected"
        ];
        physicalSymptoms = [
          "Suppurations that smell of cheese reflect the liver-sulphur constitutional chemistry",
          "Every wound suppurates: the body defaults to the expulsive route",
          "The croupy cough is the airway's hypersensitive response to the slightest cold challenge"
        ];
        modalities = {
          worse = ["Cold", "Exposure", "Touch", "Contradiction"];
          better = ["Warmth", "Containment", "Moist heat"];
        };
        clinicalUses = [
          "Suppurative conditions in the constitutionally hypersensitive individual",
          "Recurrent tonsillitis in the Hepar constitutional type",
          "Inflammatory conditions where the vital force chooses expulsion"
        ];
        constitution = "Lotus perspective: Hepar sulphuris is the constitutional remedy for the genuinely hypersensitive individual who cannot downregulate their reactivity. The healing involves building tolerance without suppression — a genuine thickening of the skin without loss of feeling.";
      },
    ];

    for (entry in additionalEntries.vals()) {
      store.add(entry.id, entry);
    };
  };
};
