import Set "mo:core/Set";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

import OrganonTypes "../types/organon";
import AdminTypes "../types/admin";
import OrganonLib "../lib/organon";
import AdminLib "../lib/admin";

mixin (organonStore : Map.Map<Nat, OrganonTypes.Aphorism>, admins : Set.Set<Principal>) {
  // Returns all aphorisms in order
  public query func listAphorisms() : async [OrganonTypes.Aphorism] {
    OrganonLib.listAphorisms(organonStore)
  };

  // Returns a single aphorism by its canonical number (1-291)
  public query func getAphorism(number : Nat) : async ?OrganonTypes.Aphorism {
    OrganonLib.getAphorism(organonStore, number)
  };

  // Full-text search across authenticText, commentary, keyThemes, section
  public query func searchAphorisms(searchTerm : Text) : async [OrganonTypes.Aphorism] {
    OrganonLib.searchAphorisms(organonStore, searchTerm)
  };

  // Admin: seeds the store with the first 30 aphorisms
  public shared ({ caller = _ }) func seedOrganon() : async () {
    OrganonLib.seed(organonStore)
  };

  // Admin: creates or updates an aphorism.
  // If input.id is null, id defaults to number.
  // Returns the id (= number) of the upserted aphorism.
  public shared ({ caller }) func adminUpsertAphorism(input : AdminTypes.AphorismInput) : async Nat {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    let id = switch (input.id) {
      case (?existingId) existingId;
      case null input.number;
    };
    let aphorism : OrganonTypes.Aphorism = {
      id;
      number = input.number;
      section = input.section;
      authenticText = input.authenticText;
      commentary = input.commentary;
      keyThemes = input.keyThemes;
    };
    organonStore.add(id, aphorism);
    id
  };

  // Admin: deletes an aphorism by id (= number). Returns true if found and deleted.
  public shared ({ caller }) func adminDeleteAphorism(id : Nat) : async Bool {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    switch (organonStore.get(id)) {
      case null false;
      case (?_) {
        organonStore.remove(id);
        true
      };
    }
  };

  // Admin: bulk imports an array of aphorisms. Returns count imported.
  public shared ({ caller }) func adminBulkImportAphorisms(inputs : [AdminTypes.AphorismInput]) : async Nat {
    if (not AdminLib.isAdmin(admins, caller)) Runtime.trap("Unauthorized");
    var count = 0;
    for (input in inputs.values()) {
      let id = switch (input.id) {
        case (?existingId) existingId;
        case null input.number;
      };
      let aphorism : OrganonTypes.Aphorism = {
        id;
        number = input.number;
        section = input.section;
        authenticText = input.authenticText;
        commentary = input.commentary;
        keyThemes = input.keyThemes;
      };
      organonStore.add(id, aphorism);
      count += 1;
    };
    count
  };
};
