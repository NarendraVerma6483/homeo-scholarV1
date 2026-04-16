import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import UserTypes "../types/user";

module {
  public type ProfileMap = Map.Map<Principal, UserTypes.UserProfile>;
  public type SessionList = List.List<UserTypes.StudySession>;

  public func upsertProfile(profiles : ProfileMap, profile : UserTypes.UserProfile) : () {
    profiles.add(profile.principal, profile);
  };

  public func getProfile(profiles : ProfileMap, userId : Principal) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveSession(sessions : SessionList, session : UserTypes.StudySession) : () {
    sessions.add(session);
  };

  public func getSessionsForUser(sessions : SessionList, userId : Principal) : [UserTypes.StudySession] {
    sessions.filter(func(s : UserTypes.StudySession) : Bool {
      Principal.equal(s.userId, userId)
    }).toArray();
  };

  public func getUserStats(sessions : SessionList, userId : Principal) : UserTypes.UserStats {
    let userSessions = sessions.filter(func(s : UserTypes.StudySession) : Bool {
      Principal.equal(s.userId, userId)
    });
    let total = userSessions.size();
    if (total == 0) {
      return { totalSessions = 0; averageAccuracy = 0.0; totalStudyTimeSecs = 0 };
    };
    let totalAccuracy = userSessions.foldLeft(0.0, func(acc : Float, s : UserTypes.StudySession) : Float {
      acc + s.accuracy
    });
    let totalTime = userSessions.foldLeft(0, func(acc : Nat, s : UserTypes.StudySession) : Nat {
      acc + s.durationSecs
    });
    {
      totalSessions = total;
      averageAccuracy = totalAccuracy / total.toFloat();
      totalStudyTimeSecs = totalTime;
    };
  };
};
