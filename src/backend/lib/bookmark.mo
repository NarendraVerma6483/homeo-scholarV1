import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  public type BookmarkMap = Map.Map<Principal, Set.Set<Text>>;

  public func toggleBookmark(bookmarks : BookmarkMap, userId : Principal, remedyId : Text) : () {
    switch (bookmarks.get(userId)) {
      case (?existing) {
        if (existing.contains(remedyId)) {
          existing.remove(remedyId);
        } else {
          existing.add(remedyId);
        };
      };
      case null {
        let newSet = Set.empty<Text>();
        newSet.add(remedyId);
        bookmarks.add(userId, newSet);
      };
    };
  };

  public func getBookmarks(bookmarks : BookmarkMap, userId : Principal) : [Text] {
    switch (bookmarks.get(userId)) {
      case (?s) s.toArray();
      case null [];
    };
  };
};
