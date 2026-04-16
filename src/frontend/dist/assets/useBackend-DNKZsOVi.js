import "./index-DkGDOaWJ.js";
import { a as useActor, c as createActor } from "./backend-Cse0PRbs.js";
function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return {
    backend: actor,
    isLoading: isFetching
  };
}
export {
  useBackend as u
};
