import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
import { I as useQueryClient, u as useAuth } from "./index-zOgSu2VR.js";
import { u as useMutation } from "./useMutation-BW6BkhXL.js";
function useMyQuizHistory() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["progress", "quiz-history"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getMyQuizHistory();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated
  });
}
function useMyRemedyProgress() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["progress", "remedy-progress"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getMyRemedyProgress();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated
  });
}
function useSaveQuizAttempt() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attempt) => {
      if (!backend) throw new Error("Backend not available");
      return await backend.saveQuizAttempt(
        attempt.format,
        BigInt(attempt.total),
        BigInt(attempt.correct)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
}
function useUpdateRemedyProgress() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!backend) throw new Error("Backend not available");
      return await backend.updateRemedyProgress(params.remedyId, params.confidence);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    }
  });
}
export {
  useSaveQuizAttempt as a,
  useMyQuizHistory as b,
  useMyRemedyProgress as c,
  useUpdateRemedyProgress as u
};
