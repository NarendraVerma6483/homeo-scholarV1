import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { SavedCase } from "../types";
import { useBackend } from "./useBackend";

export function useMyCases() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SavedCase[]>({
    queryKey: ["cases", "mine"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.listMyCases();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCaseById(id: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SavedCase | null>({
    queryKey: ["cases", "detail", id],
    queryFn: async () => {
      if (!backend) return null;
      try {
        const result = await backend.getCaseById(id);
        // Backend returns Option<?SavedCase) — unwrap array-style option
        if (Array.isArray(result)) return result[0] ?? null;
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSaveCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    string,
    Error,
    {
      name: string;
      selectedSymptoms: string[];
      clinicalNotes: string;
      matchingRemedies: string[];
    }
  >({
    mutationFn: async ({
      name,
      selectedSymptoms,
      clinicalNotes,
      matchingRemedies,
    }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.saveCaseAnalysis(
        name,
        selectedSymptoms,
        clinicalNotes,
        matchingRemedies,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { id: string; name: string; clinicalNotes: string }
  >({
    mutationFn: async ({ id, name, clinicalNotes }) => {
      if (!backend) throw new Error("Backend not available");
      return backend.updateCase(id, name, clinicalNotes);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({
        queryKey: ["cases", "detail", variables.id],
      });
    },
  });
}

export function useDeleteCase() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Backend not available");
      return backend.deleteCase(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useSearchCases(rawQuery: string) {
  const { backend, isLoading: backendLoading } = useBackend();

  // 300 ms debounce
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(rawQuery), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  return useQuery<SavedCase[]>({
    queryKey: ["cases", "search", debouncedQuery],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.searchMyCases(debouncedQuery);
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && debouncedQuery.trim().length > 0,
    staleTime: 60 * 1000,
  });
}
