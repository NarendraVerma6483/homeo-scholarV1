import Map "mo:core/Map";

import OrganonTypes "../types/organon";
import OrganonLib "../lib/organon";

mixin (organonStore : Map.Map<Nat, OrganonTypes.Aphorism>) {
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
};
