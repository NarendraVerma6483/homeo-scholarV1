import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity != null;
  const isLoading = loginStatus === "logging-in";
  const principal = identity?.getPrincipal().toText();

  return {
    isAuthenticated,
    isLoading,
    identity,
    principal,
    login,
    logout: clear,
    loginStatus,
  };
}
