import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createBook_action } from "~/lib/db/books/createBook.action";
import { updateBook_action } from "~/lib/db/books/updateBook.action";
import { useBookStore } from "~/lib/hooks/zustand/useBookStore";
import { createBookSchema as bookSchema } from "~/lib/types/books.type";

const formSchema = bookSchema
  .omit({ published_date: true })
  .extend({ published_date: z.string().min(1, "Published date required") });

export const useBookActionForm = () => {
  const { bookToEdit } = useBookStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      cover_url: bookToEdit?.cover_url ?? "",
      name: bookToEdit?.name ?? "",
      description: bookToEdit?.description ?? "",
      author: bookToEdit?.author ?? "",
      total_pages: bookToEdit?.total_pages ?? 0,
      published_date:
        bookToEdit?.published_date.toISOString().split("T")[0] ?? "",
      related_book_IDs: bookToEdit?.related_book_IDs ?? [],
      subject_IDs: bookToEdit?.subject_IDs ?? [],
    },
  });

  const route = useRouter();
  const searchParams = useSearchParams();
  const openModal =
    searchParams.get("create-book") !== null ||
    searchParams.get("edit-book") !== null;

  async function onSubmit() {
    if (bookToEdit) {
      const res = await updateBook_action({
        id: bookToEdit.id,
        data: {
          ...form.getValues(),
          published_date: new Date(form.getValues("published_date")),
        },
      });

      if (res.success) {
        toast.success("Book updated successfully");
        route.refresh();
      } else {
        form.setError("root", { message: res.error as string });
        console.error(res.error);
      }
    } else {
      const res = await createBook_action({
        data: {
          ...form.getValues(),
          published_date: new Date(form.getValues("published_date")),
        },
      });

      if (res.success) {
        toast.success("Book created successfully");
        route.refresh();
      } else {
        form.setError("root", { message: res.error as string });
        console.error(res.error);
      }
    }

    form.reset();
    handleCloseModal();
  }

  function handleCloseModal() {
    route.back();
  }

  return {
    openModal,
    handleCloseModal,
    form,
    onSubmit,
  };
};
