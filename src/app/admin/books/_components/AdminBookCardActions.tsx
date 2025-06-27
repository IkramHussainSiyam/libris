"use client";
import { PenLine, Trash2 } from "lucide-react";
import Spinner from "~/components/common/submit/spinner";
import SubmitButton from "~/components/common/submit/SubmitButton";
import { Button } from "~/components/ui/button";
import { TBook } from "~/lib/types/books.type";
import { cn } from "~/lib/utils/utils";
import { useAdminBookCard } from "../_hooks/useAdminBookCard";

export default function AdminBookCardActions({
  bookInfo,
}: {
  bookInfo: TBook;
}) {
  const { handleDeleteBook, handleEnterEditMode } = useAdminBookCard({
    bookInfo,
  });

  return (
    <form
      action={handleDeleteBook}
      className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5"
    >
      <Button
        onClick={handleEnterEditMode}
        type="button"
        className={cn(
          "p-0 [&_svg]:size-4 rounded-full transition scale-0 group-hover/bookCard:scale-100 size-7"
        )}
      >
        <PenLine />
      </Button>
      <SubmitButton
        variant={"destructive"}
        className={cn(
          "p-0 [&_svg]:size-4 rounded-full transition scale-0 group-hover/bookCard:scale-100 size-7"
        )}
        render={(pending) => (pending ? <Spinner /> : <Trash2 />)}
      />
    </form>
  );
}
