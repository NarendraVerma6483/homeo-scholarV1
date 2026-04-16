import Map "mo:core/Map";

import RepertoryTypes "../types/repertory";
import RepertoryLib "../lib/repertory";

mixin (repertoryStore : Map.Map<Text, RepertoryTypes.RepertoryEntry>) {
  // Returns all repertory entries
  public query func listRepertoryEntries() : async [RepertoryTypes.RepertoryEntry] {
    RepertoryLib.listEntries(repertoryStore)
  };

  // Case-insensitive search on symptomName, description, category, and remedy names
  public query func searchRepertory(symptom : Text) : async [RepertoryTypes.RepertoryEntry] {
    RepertoryLib.searchEntries(repertoryStore, symptom)
  };

  // Returns a single repertory entry by id
  public query func getRepertoryEntry(id : Text) : async ?RepertoryTypes.RepertoryEntry {
    RepertoryLib.getEntry(repertoryStore, id)
  };

  // Admin: seeds the store with symptom entries
  public shared (_msg) func seedRepertory() : async () {
    RepertoryLib.seed(repertoryStore)
  };
};
