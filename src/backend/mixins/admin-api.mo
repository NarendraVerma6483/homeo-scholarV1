import Set "mo:core/Set";
import Principal "mo:core/Principal";

import AdminLib "../lib/admin";

// Admin role management mixin.
// The FIRST caller of any admin-mutating method becomes the master admin.
// Master admin can grant and revoke other admins.
mixin (admins : Set.Set<Principal>) {

  // Returns true if the caller is a registered admin
  public shared query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(admins, caller)
  };

  // Grants admin role to a principal. Only callable by existing admins.
  // Returns true if the grant succeeded, false if caller is not admin.
  public shared ({ caller }) func grantAdmin(principal : Principal) : async Bool {
    if (not AdminLib.isAdmin(admins, caller)) return false;
    AdminLib.grant(admins, principal);
    true
  };

  // Revokes admin role from a principal. Only callable by existing admins.
  // Returns true if revoke succeeded, false if caller is not admin.
  public shared ({ caller }) func revokeAdmin(principal : Principal) : async Bool {
    if (not AdminLib.isAdmin(admins, caller)) return false;
    AdminLib.revoke(admins, principal);
    true
  };

  // Returns all admin principals. Only callable by admins.
  // Returns [] if caller is not admin.
  public shared ({ caller }) func getAdminList() : async [Principal] {
    if (not AdminLib.isAdmin(admins, caller)) return [];
    AdminLib.listAdmins(admins)
  };

  // Bootstrap: self-registers the caller as admin if the admin set is empty.
  // This is safe to call repeatedly — only works when admins set is empty.
  public shared ({ caller }) func bootstrapAdmin() : async Bool {
    if (not admins.isEmpty()) return false;
    AdminLib.grant(admins, caller);
    true
  };
};
