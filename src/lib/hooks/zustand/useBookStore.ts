import { create } from "zustand";
import { TBook } from "~/lib/types/books.type";

export const useBookStore = create<State & Action>((set) => ({
  bookToEdit: null,
  addBookToEdit: (book: TBook) => set({ bookToEdit: book }),
  removeBookToEdit: () => set({ bookToEdit: null }),

  selectedBooks: [],
  toggleSelectedBook: (book: TBook) => {
    set((state) => ({
      selectedBooks: state.selectedBooks.includes(book)
        ? state.selectedBooks.filter((b) => b.id !== book.id)
        : [...state.selectedBooks, book],
    }));
  },
  unSelectAllBooks: () => set({ selectedBooks: [] }),
}));

type State = {
  bookToEdit: TBook | null;
  selectedBooks: TBook[];
};
type Action = {
  addBookToEdit: (book: TBook) => void;
  removeBookToEdit: () => void;

  toggleSelectedBook: (book: TBook) => void;
  unSelectAllBooks: () => void;
};
