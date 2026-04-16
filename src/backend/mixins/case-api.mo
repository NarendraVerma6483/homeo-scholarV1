import Map "mo:core/Map";
import Principal "mo:core/Principal";

import CaseTypes "../types/case";
import CaseLib   "../lib/case";

mixin (caseStore : Map.Map<Text, CaseTypes.SavedCase>) {

  /// Save a new case analysis. Returns the generated case ID.
  public shared ({ caller }) func saveCaseAnalysis(
    name             : Text,
    selectedSymptoms : [Text],
    clinicalNotes    : Text,
    matchingRemedies : [Text]
  ) : async Text {
    let userId = caller.toText();
    let entry  = CaseLib.create(caseStore, userId, name, selectedSymptoms, clinicalNotes, matchingRemedies);
    entry.id
  };

  /// List all saved cases for the calling user.
  public shared query ({ caller }) func listMyCases() : async [CaseTypes.SavedCase] {
    CaseLib.listByUser(caseStore, caller.toText())
  };

  /// Fetch a specific case by ID. Returns null if not found or not owned by caller.
  public shared query ({ caller }) func getCaseById(id : Text) : async ?CaseTypes.SavedCase {
    switch (CaseLib.getById(caseStore, id)) {
      case null null;
      case (?c) {
        if (c.userId == caller.toText()) ?c else null
      };
    }
  };

  /// Update name and clinical notes for a case owned by the caller.
  public shared ({ caller }) func updateCase(
    id            : Text,
    name          : Text,
    clinicalNotes : Text
  ) : async Bool {
    switch (CaseLib.getById(caseStore, id)) {
      case null false;
      case (?c) {
        if (c.userId != caller.toText()) return false;
        switch (CaseLib.update(caseStore, id, name, clinicalNotes)) {
          case null false;
          case (?_) true;
        }
      };
    }
  };

  /// Delete a case owned by the caller.
  public shared ({ caller }) func deleteCase(id : Text) : async Bool {
    switch (CaseLib.getById(caseStore, id)) {
      case null false;
      case (?c) {
        if (c.userId != caller.toText()) return false;
        CaseLib.delete(caseStore, id)
      };
    }
  };

  /// Search the calling user's cases by keyword.
  public shared query ({ caller }) func searchMyCases(keyword : Text) : async [CaseTypes.SavedCase] {
    CaseLib.searchByUser(caseStore, caller.toText(), keyword)
  };
};
