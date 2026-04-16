import Set "mo:core/Set";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

import RepertoryTypes "../types/repertory";
import AdminTypes "../types/admin";
import RepertoryLib "../lib/repertory";
import AdminLib "../lib/admin";

mixin (repertoryStore : Map.Map<Text, RepertoryTypes.RepertoryEntry>, admins : Set.Set<Principal>) {
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

  // Admin: creates or updates a repertory entry.
  // If input.id is null, a new id is derived from the symptomName (slugified).
  // Returns the id of the upserted entry.
  public shared ({ caller }) func adminUpsertRepertoryEntry(input : AdminTypes.RepertoryEntryInput) : async Text {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    let id = switch (input.id) {
      case (?existingId) existingId;
      case null {
        // simple slug: lowercase, spaces → hyphens
        let lower = input.symptomName.toLower();
        lower.replace(#text " ", "-")
      };
    };
    let entry : RepertoryTypes.RepertoryEntry = {
      id;
      symptomCategory = input.symptomCategory;
      symptomName = input.symptomName;
      description = input.description;
      remedies = input.remedies;
    };
    repertoryStore.add(id, entry);
    id
  };

  // Admin: deletes a repertory entry by id. Returns true if found and deleted.
  public shared ({ caller }) func adminDeleteRepertoryEntry(id : Text) : async Bool {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    switch (repertoryStore.get(id)) {
      case null false;
      case (?_) {
        repertoryStore.remove(id);
        true
      };
    }
  };

  // Admin: bulk imports an array of repertory entries. Returns count imported.
  public shared ({ caller }) func adminBulkImportRepertoryEntries(inputs : [AdminTypes.RepertoryEntryInput]) : async Nat {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    var count = 0;
    for (input in inputs.values()) {
      let id = switch (input.id) {
        case (?existingId) existingId;
        case null {
          let lower = input.symptomName.toLower();
          lower.replace(#text " ", "-")
        };
      };
      let entry : RepertoryTypes.RepertoryEntry = {
        id;
        symptomCategory = input.symptomCategory;
        symptomName = input.symptomName;
        description = input.description;
        remedies = input.remedies;
      };
      repertoryStore.add(id, entry);
      count += 1;
    };
    count
  };
};
