import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
import { I as useQueryClient, u as useAuth } from "./index-zOgSu2VR.js";
import { u as useMutation } from "./useMutation-BW6BkhXL.js";
function useMyStats() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["user", "stats"],
    queryFn: async () => {
      if (!backend) return null;
      try {
        return await backend.getMyStats();
      } catch {
        return null;
      }
    },
    enabled: !backendLoading && isAuthenticated
  });
}
function useMySessions() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["user", "sessions"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getMySessions();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated
  });
}
function useSaveStudySession() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (session) => {
      if (!backend) throw new Error("Backend not available");
      return await backend.saveStudySession(
        session.mode,
        session.remediesStudied,
        BigInt(session.durationSeconds)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
}
export {
  useMyStats as a,
  useMySessions as b,
  useSaveStudySession as u
};
