import { c as createLucideIcon, I as useQueryClient, u as useAuth } from "./index-zOgSu2VR.js";
import { u as useBackend, a as useQuery } from "./useBackend-C6zFmRYr.js";
import { u as useMutation } from "./useMutation-BW6BkhXL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode);
function useMyBookmarks() {
  const { backend, isLoading: backendLoading } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      if (!backend) return [];
      try {
        return await backend.getMyBookmarks();
      } catch {
        return [];
      }
    },
    enabled: !backendLoading && isAuthenticated
  });
}
function useToggleBookmark() {
  const { backend } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (remedyId) => {
      if (!backend) throw new Error("Backend not available");
      return await backend.toggleBookmark(remedyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    }
  });
}
function useIsBookmarked(remedyId) {
  const { data: bookmarks } = useMyBookmarks();
  return (bookmarks == null ? void 0 : bookmarks.some((b) => b.remedyId === remedyId)) ?? false;
}
export {
  BookmarkCheck as B,
  useToggleBookmark as a,
  Bookmark as b,
  useMyBookmarks as c,
  useIsBookmarked as u
};
