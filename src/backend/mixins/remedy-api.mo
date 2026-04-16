import Map "mo:core/Map";
import RemedyLib "../lib/remedy";
import RemedyTypes "../types/remedy";

mixin (remedies : RemedyLib.RemedyMap) {

  public query func getRemedy(id : Text) : async ?RemedyTypes.Remedy {
    RemedyLib.getById(remedies, id);
  };

  public query func listRemedies() : async [RemedyTypes.Remedy] {
    RemedyLib.listAll(remedies);
  };

  public query func searchRemediesByName(term : Text) : async [RemedyTypes.Remedy] {
    RemedyLib.searchByName(remedies, term);
  };

  public query func searchRemediesBySymptom(keyword : Text) : async [RemedyTypes.Remedy] {
    RemedyLib.searchBySymptom(remedies, keyword);
  };

  public shared func upsertRemedy(remedy : RemedyTypes.Remedy) : async () {
    RemedyLib.upsert(remedies, remedy);
  };

  public shared func deleteRemedy(id : Text) : async () {
    RemedyLib.remove(remedies, id);
  };

  public shared func seedRemedies() : async () {
    RemedyLib.seedSampleData(remedies);
  };
};
