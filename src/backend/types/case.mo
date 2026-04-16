import Time "mo:core/Time";

module {
  /// A persisted case diary entry capturing the full state of a repertory
  /// case analysis session: selected symptoms, clinical notes, and a snapshot
  /// of matching remedies at the time the case was saved.
  public type SavedCase = {
    id          : Text;
    userId      : Text;
    name        : Text;
    selectedSymptoms  : [Text];
    clinicalNotes     : Text;
    matchingRemedies  : [Text];
    createdAt   : Time.Time;
    updatedAt   : Time.Time;
  };
};
