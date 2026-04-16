module {
  public type MateriaSource = { #boericke; #allensKeynotes; #lotus };

  public type SourcedRemedyModalities = {
    worse : [Text];
    better : [Text];
  };

  public type SourcedRemedy = {
    id : Text;
    remedyId : Text;
    source : MateriaSource;
    name : Text;
    latinName : Text;
    keynotes : [Text];
    mentalSymptoms : [Text];
    physicalSymptoms : [Text];
    modalities : SourcedRemedyModalities;
    clinicalUses : [Text];
    constitution : Text;
  };
};
