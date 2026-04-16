import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Difficulty,
  QuizAttempt,
  QuizFormat,
  RemedyProgress,
} from "../types";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

export function useMyQuizHistory() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<QuizAttempt[]>({
    queryKey: ["progress", "quiz-history"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await (
          backend as unknown as {
            getMyQuizHistory: () => Promise<QuizAttempt[]>;
          }
        ).getMyQuizHistory();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useMyRemedyProgress() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<RemedyProgress[]>({
    queryKey: ["progress", "remedy-progress"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await (
          backend as unknown as {
            getMyRemedyProgress: () => Promise<RemedyProgress[]>;
          }
        ).getMyRemedyProgress();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useSaveQuizAttempt() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attempt: {
      format: QuizFormat;
      total: number;
      correct: number;
    }) => {
      if (!backend) throw new Error("Backend not available");
      return await (
        backend as unknown as {
          saveQuizAttempt: (
            format: QuizFormat,
            total: bigint,
            correct: bigint,
          ) => Promise<void>;
        }
      ).saveQuizAttempt(
        attempt.format,
        BigInt(attempt.total),
        BigInt(attempt.correct),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateRemedyProgress() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      remedyId: string;
      confidence: Difficulty;
    }) => {
      if (!backend) throw new Error("Backend not available");
      return await (
        backend as unknown as {
          updateRemedyProgress: (
            remedyId: string,
            confidence: Difficulty,
          ) => Promise<void>;
        }
      ).updateRemedyProgress(params.remedyId, params.confidence);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
