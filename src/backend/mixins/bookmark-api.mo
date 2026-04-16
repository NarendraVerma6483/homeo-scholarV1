import BookmarkLib "../lib/bookmark";

mixin (bookmarks : BookmarkLib.BookmarkMap) {

  public shared ({ caller }) func toggleBookmark(remedyId : Text) : async () {
    BookmarkLib.toggleBookmark(bookmarks, caller, remedyId);
  };

  public query ({ caller }) func getMyBookmarks() : async [Text] {
    BookmarkLib.getBookmarks(bookmarks, caller);
  };
};
