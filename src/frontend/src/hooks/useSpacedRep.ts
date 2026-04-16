import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SpacedRepCard } from "../backend.d";
import { useBackend } from "./useBackend";

export function useDueCards() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SpacedRepCard[]>({
    queryKey: ["spaced-rep", "due"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getDueCards();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 60 * 1000,
  });
}

export function useAllCards() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SpacedRepCard[]>({
    queryKey: ["spaced-rep", "all"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getAllCards();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRecordReview() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      remedyId,
      quality,
    }: {
      remedyId: string;
      quality: number;
    }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.recordReview(remedyId, BigInt(quality));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaced-rep"] });
    },
  });
}

export function useInitializeCards() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not available");
      return backend.initializeCards();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaced-rep"] });
    },
  });
}
