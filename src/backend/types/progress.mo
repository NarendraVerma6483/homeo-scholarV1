import Common "common";

module {
  public type QuizAttempt = {
    attemptId : Text;
    userId : Principal;
    timestamp : Common.Timestamp;
    difficulty : Common.Difficulty;
    score : Nat;
    total : Nat;
    timeSecs : Nat;
  };

  public type RemedyProgress = {
    remedyId : Text;
    userId : Principal;
    correctCount : Nat;
    incorrectCount : Nat;
    lastStudied : Common.Timestamp;
  };
};
