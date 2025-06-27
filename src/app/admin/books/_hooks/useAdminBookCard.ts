import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteBook_action } from "~/lib/db/books/deleteBook.action";
import { useBookStore } from "~/lib/hooks/zustand/useBookStore";
import { routes } from "~/lib/static-data/routes";
import { TBook } from "~/lib/types/books.type";

export const useAdminBookCard = ({ bookInfo }: { bookInfo: TBook }) => {
  const { addBookToEdit } = useBookStore();
  const route = useRouter();

  async function handleDeleteBook() {
    const res = await deleteBook_action({ id: bookInfo.id });

    if (res.success) {
      toast.success("Book deleted successfully");
    } else {
      toast.error(res.error as string);
      console.error(res.error);
    }

    route.refresh();
  }

  function handleEnterEditMode() {
    addBookToEdit(bookInfo);
    route.push(routes.admin.books.edit(bookInfo.id));
  }

  return {
    handleDeleteBook,
    handleEnterEditMode,
  };
};
