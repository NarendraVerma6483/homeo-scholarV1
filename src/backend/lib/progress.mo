import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import ProgressTypes "../types/progress";

module {
  public type QuizList = List.List<ProgressTypes.QuizAttempt>;
  // Key is "principalText#remedyId" for per-user-per-remedy tracking
  public type RemedyProgressMap = Map.Map<Text, ProgressTypes.RemedyProgress>;

  public func saveQuizAttempt(attempts : QuizList, attempt : ProgressTypes.QuizAttempt) : () {
    attempts.add(attempt);
  };

  public func getQuizHistory(attempts : QuizList, userId : Principal) : [ProgressTypes.QuizAttempt] {
    attempts.filter(func(a : ProgressTypes.QuizAttempt) : Bool {
      Principal.equal(a.userId, userId)
    }).toArray();
  };

  func progressKey(userId : Principal, remedyId : Text) : Text {
    userId.toText() # "#" # remedyId
  };

  public func updateRemedyProgress(
    progressMap : RemedyProgressMap,
    userId : Principal,
    remedyId : Text,
    correct : Bool,
    timestamp : Int,
  ) : () {
    let key = progressKey(userId, remedyId);
    switch (progressMap.get(key)) {
      case (?existing) {
        let updated : ProgressTypes.RemedyProgress = {
          existing with
          correctCount = if (correct) existing.correctCount + 1 else existing.correctCount;
          incorrectCount = if (correct) existing.incorrectCount else existing.incorrectCount + 1;
          lastStudied = timestamp;
        };
        progressMap.add(key, updated);
      };
      case null {
        let newEntry : ProgressTypes.RemedyProgress = {
          remedyId = remedyId;
          userId = userId;
          correctCount = if (correct) 1 else 0;
          incorrectCount = if (correct) 0 else 1;
          lastStudied = timestamp;
        };
        progressMap.add(key, newEntry);
      };
    };
  };

  public func getRemedyProgressForUser(progressMap : RemedyProgressMap, userId : Principal) : [ProgressTypes.RemedyProgress] {
    let prefix = userId.toText() # "#";
    let iter = progressMap.entries().filter(func((k, _v) : (Text, ProgressTypes.RemedyProgress)) : Bool {
      k.startsWith(#text prefix)
    }).map(func((_k, v) : (Text, ProgressTypes.RemedyProgress)) : ProgressTypes.RemedyProgress {
      v
    });
    iter.toArray();
  };
};
