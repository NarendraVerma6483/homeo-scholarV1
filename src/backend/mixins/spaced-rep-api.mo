import Map "mo:core/Map";
import Time "mo:core/Time";

import SpacedRepTypes "../types/spaced-rep";
import SpacedRepLib "../lib/spaced-rep";

mixin (
  spacedRepStore : Map.Map<Text, SpacedRepTypes.SpacedRepCard>,
  remedyIds : Map.Map<Text, Text>,
) {
  // Returns cards where dueDate <= now for the calling user
  public shared query ({ caller }) func getDueCards() : async [SpacedRepTypes.SpacedRepCard] {
    let now : Int = Time.now();
    SpacedRepLib.getDueCards(spacedRepStore, caller, now);
  };

  // Returns all spaced repetition cards for the calling user
  public shared query ({ caller }) func getAllCards() : async [SpacedRepTypes.SpacedRepCard] {
    SpacedRepLib.getAllCards(spacedRepStore, caller);
  };

  // Records a review result and updates SM-2 scheduling; quality 0-5 (0-2 wrong, 3-5 correct)
  public shared ({ caller }) func recordReview(remedyId : Text, quality : Nat) : async SpacedRepTypes.SpacedRepCard {
    let now : Int = Time.now();
    SpacedRepLib.recordReview(spacedRepStore, caller, remedyId, quality, now);
  };

  // Creates cards for all current remedies for the calling user if not already present
  public shared ({ caller }) func initializeCards() : async () {
    let now : Int = Time.now();
    let ids = remedyIds.keys().toArray();
    SpacedRepLib.initializeCards(spacedRepStore, caller, ids, now);
  };
};
