import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookmarkEntry } from "../types";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

export function useMyBookmarks() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<BookmarkEntry[]>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await (
          backend as unknown as {
            getMyBookmarks: () => Promise<BookmarkEntry[]>;
          }
        ).getMyBookmarks();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated,
  });
}

export function useToggleBookmark() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (remedyId: string) => {
      if (!backend) throw new Error("Backend not available");
      return await (
        backend as unknown as {
          toggleBookmark: (id: string) => Promise<boolean>;
        }
      ).toggleBookmark(remedyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}

export function useIsBookmarked(remedyId: string): boolean {
  const { data: bookmarks } = useMyBookmarks();
  return bookmarks?.some((b) => b.remedyId === remedyId) ?? false;
}
