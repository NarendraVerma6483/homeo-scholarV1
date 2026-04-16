import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserLib "../lib/user";
import UserTypes "../types/user";

mixin (profiles : UserLib.ProfileMap, sessions : UserLib.SessionList) {

  public shared ({ caller }) func registerUser(displayName : Text) : async () {
    let profile : UserTypes.UserProfile = {
      principal = caller;
      displayName = displayName;
      createdAt = Time.now();
      themePreference = #dark;
    };
    UserLib.upsertProfile(profiles, profile);
  };

  public query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveStudySession(session : UserTypes.StudySession) : async () {
    let owned : UserTypes.StudySession = { session with userId = caller };
    UserLib.saveSession(sessions, owned);
  };

  public query ({ caller }) func getMySessions() : async [UserTypes.StudySession] {
    UserLib.getSessionsForUser(sessions, caller);
  };

  public query ({ caller }) func getMyStats() : async UserTypes.UserStats {
    UserLib.getUserStats(sessions, caller);
  };
};
