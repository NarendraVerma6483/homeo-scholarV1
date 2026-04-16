import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
function useSourcedRemedies() {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
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
    staleTime: 5 * 60 * 1e3
  });
}
function useGetSourcedRemedy(id) {
  const { backend, isLoading: backendLoading } = useBackend();
  const { data: sourcedRemedies } = useSourcedRemedies();
  const query = useQuery({
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
    staleTime: 5 * 60 * 1e3
  });
  const fallbackData = !query.isLoading && (query.data === null || query.data === void 0) ? (sourcedRemedies == null ? void 0 : sourcedRemedies.find((r) => r.id === id)) ?? null : query.data ?? null;
  return { ...query, data: fallbackData };
}
function useSourcesByRemedyName(name) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
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
    staleTime: 5 * 60 * 1e3
  });
}
function useSourcedRemediesBySource(source) {
  const { backend, isLoading: backendLoading } = useBackend();
  return useQuery({
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
    staleTime: 5 * 60 * 1e3
  });
}
export {
  useGetSourcedRemedy as a,
  useSourcesByRemedyName as b,
  useSourcedRemediesBySource as u
};
