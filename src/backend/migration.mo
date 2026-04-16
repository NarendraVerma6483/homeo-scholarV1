import Map "mo:core/Map";
import List "mo:core/List";

import NewSourcedRemedyTypes "types/sourced-remedy";

module {
  // ---------------------------------------------------------------------------
  // Old types (copied from .old/src/backend/types/sourced-remedy.mo)
  // ---------------------------------------------------------------------------
  type OldMateriaSource = { #boericke; #allensKeynotes };

  type OldSourcedRemedyModalities = {
    worse : [Text];
    better : [Text];
  };

  type OldSourcedRemedy = {
    id          : Text;
    remedyId    : Text;
    source      : OldMateriaSource;
    name        : Text;
    latinName   : Text;
    keynotes    : [Text];
    mentalSymptoms  : [Text];
    physicalSymptoms : [Text];
    modalities  : OldSourcedRemedyModalities;
    clinicalUses : [Text];
    constitution : Text;
  };

  // ---------------------------------------------------------------------------
  // Actor stable state shapes
  // ---------------------------------------------------------------------------
  type OldActor = {
    sourcedRemedyStore : Map.Map<Text, OldSourcedRemedy>;
  };

  type NewActor = {
    sourcedRemedyStore : Map.Map<Text, NewSourcedRemedyTypes.SourcedRemedy>;
  };

  // ---------------------------------------------------------------------------
  // Migration: re-tag MateriaSource values to the new 3-variant type
  // ---------------------------------------------------------------------------
  func migrateSource(old : OldMateriaSource) : NewSourcedRemedyTypes.MateriaSource {
    switch old {
      case (#boericke)      #boericke;
      case (#allensKeynotes) #allensKeynotes;
    };
  };

  func migrateRemedy(old : OldSourcedRemedy) : NewSourcedRemedyTypes.SourcedRemedy {
    { old with source = migrateSource(old.source) };
  };

  public func run(old : OldActor) : NewActor {
    let sourcedRemedyStore = old.sourcedRemedyStore.map<Text, OldSourcedRemedy, NewSourcedRemedyTypes.SourcedRemedy>(
      func(_k, remedy) { migrateRemedy(remedy) }
    );
    { sourcedRemedyStore };
  };
};
