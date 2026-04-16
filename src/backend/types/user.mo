import Common "common";

module {
  public type UserProfile = {
    principal : Principal;
    displayName : Text;
    createdAt : Common.Timestamp;
    themePreference : Common.ThemePreference;
  };

  public type StudySession = {
    sessionId : Text;
    userId : Principal;
    timestamp : Common.Timestamp;
    remedyIds : [Text];
    accuracy : Float;
    durationSecs : Nat;
    mode : Common.StudyMode;
  };

  public type UserStats = {
    totalSessions : Nat;
    averageAccuracy : Float;
    totalStudyTimeSecs : Nat;
  };
};
