import Common "common";

module {
  public type SpacedRepCard = {
    remedyId : Text;
    userId : Principal;
    dueDate : Common.Timestamp;
    intervalDays : Nat;
    easeFactor : Float;
    repetitions : Nat;
    lastReviewed : Common.Timestamp;
  };
};
