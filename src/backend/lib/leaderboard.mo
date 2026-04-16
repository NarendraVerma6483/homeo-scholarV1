import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

import Common "../types/common";
import LeaderboardTypes "../types/leaderboard";

module {
  public type LeaderboardEntry = LeaderboardTypes.LeaderboardEntry;

  // Returns the difficulty key used for Map lookup
  public func difficultyKey(difficulty : Common.Difficulty) : Text {
    switch (difficulty) {
      case (#beginner) "beginner";
      case (#intermediate) "intermediate";
      case (#advanced) "advanced";
    };
  };

  // Compares two entries: descending by percentage, then descending by score for ties
  func compareEntries(a : LeaderboardEntry, b : LeaderboardEntry) : Order.Order {
    if (a.percentage > b.percentage) { #less }      // #less = a comes first (sort ascending)
    else if (a.percentage < b.percentage) { #greater }
    else if (a.score > b.score) { #less }
    else if (a.score < b.score) { #greater }
    else { #equal };
  };

  // Returns top 10 entries for the given difficulty (sorted by percentage desc, then score desc)
  public func getLeaderboard(
    store : Map.Map<Text, List.List<LeaderboardEntry>>,
    difficulty : Common.Difficulty,
  ) : [LeaderboardEntry] {
    let key = difficultyKey(difficulty);
    let entries = switch (store.get(key)) {
      case (?list) list;
      case null { return [] };
    };
    let sorted = entries.sort(compareEntries);
    let top10 = sorted.values().take(10);
    top10.toArray();
  };

  // Submits a leaderboard entry; keeps top 50 per difficulty in state.
  // Replaces the existing entry for same userId+difficulty if the new percentage is higher.
  public func submitEntry(
    store : Map.Map<Text, List.List<LeaderboardEntry>>,
    entry : LeaderboardEntry,
  ) : () {
    let key = difficultyKey(entry.difficulty);
    let list : List.List<LeaderboardEntry> = switch (store.get(key)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<LeaderboardEntry>();
        store.add(key, fresh);
        fresh;
      };
    };

    // Check if this user already has an entry for this difficulty
    let existingIdx = list.findIndex(func(e : LeaderboardEntry) : Bool {
      Principal.equal(e.userId, entry.userId)
    });

    switch (existingIdx) {
      case (?idx) {
        // Replace only if new percentage is higher (or equal — keep newer)
        let existing = list.at(idx);
        if (entry.percentage >= existing.percentage) {
          list.put(idx, entry);
        };
      };
      case null {
        list.add(entry);
        // Keep top 50: if over limit, remove the lowest-ranked entry
        if (list.size() > 50) {
          list.sortInPlace(compareEntries);
          list.truncate(50);
        };
      };
    };
  };
};
