import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Difficulty, type LeaderboardEntry } from "../backend.d";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

type DifficultyKey = "beginner" | "intermediate" | "advanced";

function toDifficultyEnum(d: DifficultyKey): Difficulty {
  return Difficulty[d as keyof typeof Difficulty];
}

export function useLeaderboard(difficulty: DifficultyKey) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", difficulty],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getLeaderboard(toDifficultyEnum(difficulty));
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && !!backend,
  });
}

export function useSubmitLeaderboardEntry() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      displayName: string;
      score: number;
      total: number;
      difficulty: DifficultyKey;
    }) => {
      if (!backend) throw new Error("Backend not available");
      await backend.submitLeaderboardEntry(
        params.displayName,
        BigInt(params.score),
        BigInt(params.total),
        toDifficultyEnum(params.difficulty),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useSeedData() {
  const { backend } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["seed", "init"],
    queryFn: async () => {
      if (!backend) return null;
      await Promise.allSettled([
        backend.seedOrganon(),
        backend.seedRepertory(),
        backend.seedSourcedRemedies(),
      ]);
      return true;
    },
    enabled: !!backend && isAuthenticated,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
}
