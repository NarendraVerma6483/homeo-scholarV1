import Set "mo:core/Set";
import Principal "mo:core/Principal";

module {
  public type AdminSet = Set.Set<Principal>;

  // Returns true if the given principal is in the admin set
  public func isAdmin(admins : AdminSet, caller : Principal) : Bool {
    admins.contains(caller)
  };

  // Adds a principal to the admin set (idempotent)
  public func grant(admins : AdminSet, principal : Principal) : () {
    admins.add(principal)
  };

  // Removes a principal from the admin set
  public func revoke(admins : AdminSet, principal : Principal) : () {
    admins.remove(principal)
  };

  // Returns all admin principals as an array
  public func listAdmins(admins : AdminSet) : [Principal] {
    admins.toArray()
  };
};
