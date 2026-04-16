import SourcedRemedyTypes "sourced-remedy";
import OrganonTypes "organon";
import RepertoryTypes "repertory";

module {
  // Input type for creating or updating a sourced remedy.
  // id = null → create new; id = ?someId → update existing
  public type SourcedRemedyInput = {
    id : ?Text;
    remedyId : Text;
    source : SourcedRemedyTypes.MateriaSource;
    name : Text;
    latinName : Text;
    keynotes : [Text];
    mentalSymptoms : [Text];
    physicalSymptoms : [Text];
    modalities : SourcedRemedyTypes.SourcedRemedyModalities;
    clinicalUses : [Text];
    constitution : Text;
  };

  // Input type for creating or updating an Organon aphorism.
  // id = null → create new (auto-assign id = number); id = ?n → update existing
  public type AphorismInput = {
    id : ?Nat;
    number : Nat;
    section : Text;
    authenticText : Text;
    commentary : Text;
    keyThemes : [Text];
  };

  // Input type for creating or updating a repertory entry.
  // id = null → create new; id = ?someId → update existing
  public type RepertoryEntryInput = {
    id : ?Text;
    symptomCategory : Text;
    symptomName : Text;
    description : Text;
    remedies : [RepertoryTypes.RepertoryRemedy];
  };
};
