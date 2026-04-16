module {
  public type RepertoryRemedy = {
    remedyId : Text;
    remedyName : Text;
    grade : Nat;
    notes : Text;
  };

  public type RepertoryEntry = {
    id : Text;
    symptomCategory : Text;
    symptomName : Text;
    description : Text;
    remedies : [RepertoryRemedy];
  };
};
