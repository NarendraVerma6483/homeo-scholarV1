import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";

import RemedyTypes "types/remedy";
import UserTypes "types/user";
import ProgressTypes "types/progress";
import LeaderboardTypes "types/leaderboard";
import SpacedRepTypes "types/spaced-rep";
import RepertoryTypes "types/repertory";
import OrganonTypes "types/organon";
import SourcedRemedyTypes "types/sourced-remedy";
import CaseTypes "types/case";

import RemedyApi "mixins/remedy-api";
import UserApi "mixins/user-api";
import BookmarkApi "mixins/bookmark-api";
import ProgressApi "mixins/progress-api";
import LeaderboardApi "mixins/leaderboard-api";
import SpacedRepApi "mixins/spaced-rep-api";
import RepertoryApi "mixins/repertory-api";
import OrganonApi "mixins/organon-api";
import SourcedRemedyApi "mixins/sourced-remedy-api";
import CaseApi "mixins/case-api";
import AdminApi "mixins/admin-api";

actor {
  // --- Admin state ---
  let adminPrincipals = Set.empty<Principal>();

  // --- Existing state ---
  let remedies = Map.empty<Text, RemedyTypes.Remedy>();
  let profiles = Map.empty<Principal, UserTypes.UserProfile>();
  let sessions = List.empty<UserTypes.StudySession>();
  let bookmarks = Map.empty<Principal, Set.Set<Text>>();
  let quizAttempts = List.empty<ProgressTypes.QuizAttempt>();
  let remedyProgress = Map.empty<Text, ProgressTypes.RemedyProgress>();

  // --- New feature state ---
  let leaderboardStore = Map.empty<Text, List.List<LeaderboardTypes.LeaderboardEntry>>();
  let spacedRepStore = Map.empty<Text, SpacedRepTypes.SpacedRepCard>();
  let remedyIdIndex = Map.empty<Text, Text>();
  let repertoryStore = Map.empty<Text, RepertoryTypes.RepertoryEntry>();
  let organonStore = Map.empty<Nat, OrganonTypes.Aphorism>();
  let sourcedRemedyStore = Map.empty<Text, SourcedRemedyTypes.SourcedRemedy>();
  let caseStore = Map.empty<Text, CaseTypes.SavedCase>();

  // --- Mixin includes ---
  include AdminApi(adminPrincipals);
  include RemedyApi(remedies);
  include UserApi(profiles, sessions);
  include BookmarkApi(bookmarks);
  include ProgressApi(quizAttempts, remedyProgress, leaderboardStore);
  include LeaderboardApi(leaderboardStore);
  include SpacedRepApi(spacedRepStore, remedyIdIndex);
  include RepertoryApi(repertoryStore, adminPrincipals);
  include OrganonApi(organonStore, adminPrincipals);
  include SourcedRemedyApi(sourcedRemedyStore, adminPrincipals);
  include CaseApi(caseStore);
};
