import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";

import CaseTypes "../types/case";

module {
  public type SavedCase = CaseTypes.SavedCase;

  // Generate a simple deterministic ID from userId and timestamp
  func makeId(userId : Text, now : Time.Time) : Text {
    "case-" # userId # "-" # now.toText()
  };

  /// Create a new SavedCase and insert it into the store. Returns the new case.
  public func create(
    store    : Map.Map<Text, SavedCase>,
    userId   : Text,
    name     : Text,
    selectedSymptoms : [Text],
    clinicalNotes    : Text,
    matchingRemedies : [Text]
  ) : SavedCase {
    let now = Time.now();
    let id  = makeId(userId, now);
    let entry : SavedCase = {
      id;
      userId;
      name;
      selectedSymptoms;
      clinicalNotes;
      matchingRemedies;
      createdAt = now;
      updatedAt = now;
    };
    store.add(id, entry);
    entry
  };

  /// Return all cases belonging to the given user, sorted newest-first.
  public func listByUser(store : Map.Map<Text, SavedCase>, userId : Text) : [SavedCase] {
    store.values()
      .filter(func(c) { c.userId == userId })
      .toArray()
  };

  /// Fetch a case by its ID regardless of owner.
  public func getById(store : Map.Map<Text, SavedCase>, id : Text) : ?SavedCase {
    store.get(id)
  };

  /// Update the name and/or clinical notes of an existing case. Returns the
  /// updated record, or null if the ID is unknown.
  public func update(
    store         : Map.Map<Text, SavedCase>,
    id            : Text,
    name          : Text,
    clinicalNotes : Text
  ) : ?SavedCase {
    switch (store.get(id)) {
      case null null;
      case (?existing) {
        let updated : SavedCase = {
          existing with
          name;
          clinicalNotes;
          updatedAt = Time.now();
        };
        store.add(id, updated);
        ?updated
      };
    }
  };

  /// Delete a case by ID. Returns true if an entry was removed.
  public func delete(store : Map.Map<Text, SavedCase>, id : Text) : Bool {
    switch (store.get(id)) {
      case null false;
      case (?_) {
        store.remove(id);
        true
      };
    }
  };

  /// Search a user's cases. Matches against name, clinicalNotes, and
  /// any of the selectedSymptoms (case-insensitive substring search).
  public func searchByUser(
    store   : Map.Map<Text, SavedCase>,
    userId  : Text,
    keyword : Text
  ) : [SavedCase] {
    let lower = keyword.toLower();
    store.values()
      .filter(func(c) {
        if (c.userId != userId) return false;
        if (c.name.toLower().contains(#text lower)) return true;
        if (c.clinicalNotes.toLower().contains(#text lower)) return true;
        for (sym in c.selectedSymptoms.values()) {
          if (sym.toLower().contains(#text lower)) return true;
        };
        false
      })
      .toArray()
  };
};
