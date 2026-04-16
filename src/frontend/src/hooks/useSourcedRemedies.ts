import { useQuery } from "@tanstack/react-query";
import { MateriaSource, type SourcedRemedy } from "../backend.d";
import { useBackend } from "./useBackend";

export function useSourcedRemedies() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SourcedRemedy[]>({
    queryKey: ["sourced-remedies", "all"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.listSourcedRemedies();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetSourcedRemedy(id: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  const { data: sourcedRemedies } = useSourcedRemedies();

  const query = useQuery<SourcedRemedy | null>({
    queryKey: ["sourced-remedies", "detail", id],
    queryFn: async () => {
      if (!backend) return null;
      try {
        return await backend.getSourcedRemedy(id);
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && !!id,
    staleTime: 5 * 60 * 1000,
  });

  // Fallback: if backend returned null/undefined but we have the list, look it up
  const fallbackData =
    !query.isLoading && (query.data === null || query.data === undefined)
      ? (sourcedRemedies?.find((r) => r.id === id) ?? null)
      : (query.data ?? null);

  return { ...query, data: fallbackData };
}

export function useSourcesByRemedyName(name: string) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SourcedRemedy[]>({
    queryKey: ["sourced-remedies", "by-name", name],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.listSourcesByRemedyName(name);
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && name.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSourcedRemediesBySource(source: MateriaSource) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery<SourcedRemedy[]>({
    queryKey: ["sourced-remedies", "by-source", source],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.listSourcedRemediesBySource(source);
      } catch {
        return [];
      }
    },
    enabled: !backendLoading,
    staleTime: 5 * 60 * 1000,
  });
}

// Export MateriaSource enum for use in components
export { MateriaSource };
