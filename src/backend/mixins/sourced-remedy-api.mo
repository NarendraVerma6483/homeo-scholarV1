import Map "mo:core/Map";

import SourcedRemedyTypes "../types/sourced-remedy";
import SourcedRemedyLib "../lib/sourced-remedy";

mixin (sourcedRemedyStore : Map.Map<Text, SourcedRemedyTypes.SourcedRemedy>) {
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
};
