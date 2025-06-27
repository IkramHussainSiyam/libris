"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { deleteManyBooks_action } from "~/lib/db/books/deleteManyBooks.action";
import { useBookStore } from "~/lib/hooks/zustand/useBookStore";
import { TBook } from "~/lib/types/books.type";

export function AdminBookCardSelector({ book }: { book: TBook }) {
  const { selectedBooks, toggleSelectedBook } = useBookStore();

  return (
    <div
      role="checkbox"
      aria-checked={selectedBooks.some((b) => b.id === book.id)}
      onClick={() => toggleSelectedBook(book)}
      className="absolute -top-[6px] -left-1.5 size-5 rounded-full bg-primary scale-0 group-hover/bookCard:scale-100 aria-[checked=true]:scale-100 transition-all"
    >
      <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[14px] text-primary-foreground stroke-[3px]" />
    </div>
  );
}

export function BookCardSelectedIndicator({ book }: { book: TBook }) {
  const { selectedBooks } = useBookStore();

  return (
    <div
      role="checkbox"
      aria-checked={selectedBooks.some((b) => b.id === book.id)}
      className="pointer-events-none select-none absolute top-0 left-0 size-full transition opacity-0 border-[3px] border-transparent bg-black/40 group-hover/bookCard:opacity-100 aria-[checked=true]:opacity-100 aria-[checked=true]:border-primary"
    />
  );
}

export function SelectedBooksAction() {
  const { selectedBooks, unSelectAllBooks } = useBookStore();

  async function handleDeleteManyBooks() {
    const res = await deleteManyBooks_action({
      ids: selectedBooks.map((b) => b.id),
    });

    if (res.success) {
      unSelectAllBooks();
      toast.success("Books deleted successfully");
    } else {
      toast.error(res.error as string);
      console.error(res.error);
    }
  }

  return (
    <Show when={selectedBooks.length > 0}>
      <form
        action={handleDeleteManyBooks}
        className="flex items-center gap-3 justify-between px-1"
      >
        <span className="inline-block text-accent-foreground">
          {selectedBooks.length} {selectedBooks.length === 1 ? "item" : "items"}{" "}
          selected
        </span>
        <div className="flex items-center gap-2">
          <SubmitButton
            size={"sm"}
            className="h-6 text-xs px-2 bg-destructive hover:bg-destructive/80"
            render={(pending) => (pending ? "Deleting..." : "Delete Selected")}
          />
          <Button
            type="button"
            onClick={unSelectAllBooks}
            size={"sm"}
            className="h-6 text-xs px-2 bg-zinc-900 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-accent dark:hover:bg-zinc-50/80"
          >
            Cencel
          </Button>
        </div>
      </form>
    </Show>
  );
}
