import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudyMode, StudySession, UserProfile, UserStats } from "../types";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

export function useMyProfile() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<UserProfile | null>({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      if (!backend) return null;
      try {
        return await (
          backend as unknown as {
            getMyProfile: () => Promise<UserProfile | null>;
          }
        ).getMyProfile();
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useMyStats() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<UserStats | null>({
    queryKey: ["user", "stats"],
    queryFn: async () => {
      if (!backend) return null;
      try {
        return await (
          backend as unknown as { getMyStats: () => Promise<UserStats | null> }
        ).getMyStats();
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useMySessions() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<StudySession[]>({
    queryKey: ["user", "sessions"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await (
          backend as unknown as { getMySessions: () => Promise<StudySession[]> }
        ).getMySessions();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useRegisterUser() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (displayName?: string) => {
      if (!backend) throw new Error("Backend not available");
      return await (
        backend as unknown as {
          registerUser: (name?: string) => Promise<UserProfile>;
        }
      ).registerUser(displayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useSaveStudySession() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (session: {
      mode: StudyMode;
      remediesStudied: string[];
      durationSeconds: number;
    }) => {
      if (!backend) throw new Error("Backend not available");
      return await (
        backend as unknown as {
          saveStudySession: (
            mode: StudyMode,
            remedies: string[],
            duration: bigint,
          ) => Promise<void>;
        }
      ).saveStudySession(
        session.mode,
        session.remediesStudied,
        BigInt(session.durationSeconds),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
