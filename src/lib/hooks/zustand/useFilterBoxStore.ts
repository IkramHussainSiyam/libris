import { create } from "zustand";

export const useFilterBoxStore = create<State & Action>((set) => ({
  isFilterBoxOpen: false,
  openFilterBox: () => set({ isFilterBoxOpen: true }),
  closeFilterBox: () => set({ isFilterBoxOpen: false }),
}));

type State = {
  isFilterBoxOpen: boolean;
};

type Action = {
  openFilterBox: () => void;
  closeFilterBox: () => void;
};
