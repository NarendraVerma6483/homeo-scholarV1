import Set "mo:core/Set";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

import SourcedRemedyTypes "../types/sourced-remedy";
import AdminTypes "../types/admin";
import SourcedRemedyLib "../lib/sourced-remedy";
import AdminLib "../lib/admin";

mixin (sourcedRemedyStore : Map.Map<Text, SourcedRemedyTypes.SourcedRemedy>, admins : Set.Set<Principal>) {
  // Returns all sourced remedy entries (both sources)
  public query func listSourcedRemedies() : async [SourcedRemedyTypes.SourcedRemedy] {
    SourcedRemedyLib.listAll(sourcedRemedyStore)
  };

  // Returns a single sourced remedy by its unique composite id
  public query func getSourcedRemedy(id : Text) : async ?SourcedRemedyTypes.SourcedRemedy {
    SourcedRemedyLib.getById(sourcedRemedyStore, id)
  };

  // Returns all source entries for a given remedy name (e.g. both Boericke and Allen's for "Arnica")
  public query func listSourcesByRemedyName(name : Text) : async [SourcedRemedyTypes.SourcedRemedy] {
    SourcedRemedyLib.listByRemedyName(sourcedRemedyStore, name)
  };

  // Returns all entries for a given source (Boericke or Allen's Keynotes)
  public query func listSourcedRemediesBySource(source : SourcedRemedyTypes.MateriaSource) : async [SourcedRemedyTypes.SourcedRemedy] {
    SourcedRemedyLib.listBySource(sourcedRemedyStore, source)
  };

  // Admin: seeds 30 entries (15 remedies × 2 sources)
  public shared (_) func seedSourcedRemedies() : async () {
    SourcedRemedyLib.seed(sourcedRemedyStore)
  };

  // Admin: creates or updates a sourced remedy.
  // If input.id is null, a new id is generated from remedyId + source.
  // Returns the id of the upserted entry.
  public shared ({ caller }) func adminUpsertSourcedRemedy(input : AdminTypes.SourcedRemedyInput) : async Text {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    let id = switch (input.id) {
      case (?existingId) existingId;
      case null {
        let sourceTag = switch (input.source) {
          case (#boericke) "boericke";
          case (#allensKeynotes) "allens";
          case (#lotus) "lotus";
        };
        input.remedyId # "-" # sourceTag
      };
    };
    let remedy : SourcedRemedyTypes.SourcedRemedy = {
      id;
      remedyId = input.remedyId;
      source = input.source;
      name = input.name;
      latinName = input.latinName;
      keynotes = input.keynotes;
      mentalSymptoms = input.mentalSymptoms;
      physicalSymptoms = input.physicalSymptoms;
      modalities = input.modalities;
      clinicalUses = input.clinicalUses;
      constitution = input.constitution;
    };
    sourcedRemedyStore.add(id, remedy);
    id
  };

  // Admin: deletes a sourced remedy by id. Returns true if found and deleted.
  public shared ({ caller }) func adminDeleteSourcedRemedy(id : Text) : async Bool {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    switch (sourcedRemedyStore.get(id)) {
      case null false;
      case (?_) {
        sourcedRemedyStore.remove(id);
        true
      };
    }
  };

  // Admin: bulk imports an array of sourced remedies. Returns count imported.
  public shared ({ caller }) func adminBulkImportSourcedRemedies(inputs : [AdminTypes.SourcedRemedyInput]) : async Nat {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    var count = 0;
    for (input in inputs.values()) {
      let id = switch (input.id) {
        case (?existingId) existingId;
        case null {
          let sourceTag = switch (input.source) {
            case (#boericke) "boericke";
            case (#allensKeynotes) "allens";
            case (#lotus) "lotus";
          };
          input.remedyId # "-" # sourceTag
        };
      };
      let remedy : SourcedRemedyTypes.SourcedRemedy = {
        id;
        remedyId = input.remedyId;
        source = input.source;
        name = input.name;
        latinName = input.latinName;
        keynotes = input.keynotes;
        mentalSymptoms = input.mentalSymptoms;
        physicalSymptoms = input.physicalSymptoms;
        modalities = input.modalities;
        clinicalUses = input.clinicalUses;
        constitution = input.constitution;
      };
      sourcedRemedyStore.add(id, remedy);
      count += 1;
    };
    count
  };
};
