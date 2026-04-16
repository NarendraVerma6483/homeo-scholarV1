import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";

import ProgressLib "../lib/progress";
import ProgressTypes "../types/progress";
import LeaderboardTypes "../types/leaderboard";
import LeaderboardLib "../lib/leaderboard";

mixin (
  quizAttempts : ProgressLib.QuizList,
  remedyProgress : ProgressLib.RemedyProgressMap,
  leaderboardStore : Map.Map<Text, List.List<LeaderboardTypes.LeaderboardEntry>>,
) {

  public shared ({ caller }) func saveQuizAttempt(attempt : ProgressTypes.QuizAttempt) : async () {
    let owned : ProgressTypes.QuizAttempt = { attempt with userId = caller };
    ProgressLib.saveQuizAttempt(quizAttempts, owned);

    // Automatically submit to leaderboard if score > 0
    if (owned.score > 0) {
      let percentage : Float = if (owned.total == 0) { 0.0 } else {
        owned.score.toFloat() / owned.total.toFloat() * 100.0
      };
      let entry : LeaderboardTypes.LeaderboardEntry = {
        userId = caller;
        displayName = caller.toText();
        score = owned.score;
        total = owned.total;
        percentage;
        difficulty = owned.difficulty;
        timestamp = Time.now();
      };
      LeaderboardLib.submitEntry(leaderboardStore, entry);
    };
  };

  public query ({ caller }) func getMyQuizHistory() : async [ProgressTypes.QuizAttempt] {
    ProgressLib.getQuizHistory(quizAttempts, caller);
  };

  public shared ({ caller }) func updateRemedyProgress(remedyId : Text, correct : Bool) : async () {
    ProgressLib.updateRemedyProgress(remedyProgress, caller, remedyId, correct, Time.now());
  };

  public query ({ caller }) func getMyRemedyProgress() : async [ProgressTypes.RemedyProgress] {
    ProgressLib.getRemedyProgressForUser(remedyProgress, caller);
  };
};
