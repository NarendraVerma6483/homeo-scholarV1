import Common "common";

module {
  public type Remedy = {
    id : Text;
    name : Text;
    latinName : Text;
    description : Text;
    keySymptoms : [Text];
    mentalPicture : Text;
    physicalSymptoms : [Text];
    modalities : Text;
    clinicalNotes : Text;
    category : Text;
  };
};
