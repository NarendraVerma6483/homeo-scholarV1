import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";

import Common "../types/common";
import LeaderboardTypes "../types/leaderboard";
import LeaderboardLib "../lib/leaderboard";

mixin (
  leaderboardStore : Map.Map<Text, List.List<LeaderboardTypes.LeaderboardEntry>>,
) {
  // Returns top 10 leaderboard entries for the given difficulty level
  public query func getLeaderboard(difficulty : Common.Difficulty) : async [LeaderboardTypes.LeaderboardEntry] {
    LeaderboardLib.getLeaderboard(leaderboardStore, difficulty);
  };

  // Called automatically on quiz completion; only records entries with score > 0
  public shared ({ caller }) func submitLeaderboardEntry(
    displayName : Text,
    score : Nat,
    total : Nat,
    difficulty : Common.Difficulty,
  ) : async () {
    if (score == 0) { return };
    let percentage : Float = if (total == 0) { 0.0 } else {
      score.toFloat() / total.toFloat() * 100.0
    };
    let entry : LeaderboardTypes.LeaderboardEntry = {
      userId = caller;
      displayName;
      score;
      total;
      percentage;
      difficulty;
      timestamp = Time.now();
    };
    LeaderboardLib.submitEntry(leaderboardStore, entry);
  };
};
