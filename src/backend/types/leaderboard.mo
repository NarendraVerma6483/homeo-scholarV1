import Common "common";

module {
  public type LeaderboardEntry = {
    userId : Principal;
    displayName : Text;
    score : Nat;
    total : Nat;
    percentage : Float;
    difficulty : Common.Difficulty;
    timestamp : Common.Timestamp;
  };
};
