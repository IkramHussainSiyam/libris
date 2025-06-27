import { create } from "zustand";
import { TSubject } from "~/lib/types/subjects.type";

export const useSubjectStore = create<State & Action>((set) => ({
  subjectToEdit: null,
  addSubjectToEdit: (subject: TSubject) => set({ subjectToEdit: subject }),
  removeSubjectToEdit: () => set({ subjectToEdit: null }),

  selectedSubjects: [],
  selectSubject: (subject: TSubject) =>
    set((state) => ({
      selectedSubjects: [...state.selectedSubjects, subject],
    })),
  unselectSubject: (subject: TSubject) =>
    set((state) => ({
      selectedSubjects: state.selectedSubjects.filter(
        (s) => s.id !== subject.id
      ),
    })),
  unSelectAllSubjects: () => set({ selectedSubjects: [] }),
}));

type State = {
  subjectToEdit: TSubject | null;
  selectedSubjects: TSubject[];
};

type Action = {
  addSubjectToEdit: (subject: TSubject) => void;
  removeSubjectToEdit: () => void;
  selectSubject: (subject: TSubject) => void;
  unselectSubject: (subject: TSubject) => void;
  unSelectAllSubjects: () => void;
};
