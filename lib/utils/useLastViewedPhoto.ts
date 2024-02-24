import { createGlobalState } from "react-hooks-global-state";

interface GlobalState {
  photoToScrollTo: number | null;
}

const initialState: GlobalState = { photoToScrollTo: null };
const { useGlobalState } = createGlobalState<GlobalState>(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};
