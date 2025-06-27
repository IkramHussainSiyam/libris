import { create } from "zustand";
import { TCustomLists } from "../../types/customlists.type";

export const useCustomListStore = create<State & Action>((set) => ({
  listToEdit: null,
  addListToEdit: (list: TCustomLists) => set({ listToEdit: list }),
  removeListToEdit: () => set({ listToEdit: null }),
}));

type State = {
  listToEdit: TCustomLists | null;
};

type Action = {
  addListToEdit: (list: TCustomLists) => void;
  removeListToEdit: () => void;
};
