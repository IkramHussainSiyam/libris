import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createManyBooks_action } from "~/lib/db/books/createManyBooks.action";
import { TBook } from "~/lib/types/books.type";
import { TSubject } from "~/lib/types/subjects.type";

export const useBulkCreateBook = ({ subjects }: { subjects: TSubject[] }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [booklist, setBooklist] = useState<CreateBook[] | null>(null);
  const route = useRouter();

  async function handleAction() {
    if (!booklist) {
      toast.error("Please upload a valid .json file.");
      return;
    }

    const res = await createManyBooks_action({ data: booklist });

    if (res.success) {
      setOpen(false);
      toast.success("Books created successfully");
    } else {
      toast.error(res.error as string);
      console.error(res.error);
    }

    route.refresh();
  }

  function handleFileUploadChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type !== "application/json") {
      toast.error("Please upload a valid .json file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileParsed = JSON.parse(reader.result as string);
      if (!fileParsed?.books) {
        toast.error("Invalid JSON format");
        return;
      }
      const books = fileParsed?.books as FileBook[];

      setBooklist(
        books.map((book) => ({
          author: book.author,
          cover_url: book.cover_url,
          description: book.description,
          name: book.name,
          published_date: new Date(book.published_date),
          total_pages: book.total_pages,
          related_book_IDs: book.related_book_titles,
          subject_IDs: getSubjectIDs(book.subject_names),
        }))
      );
    };

    reader.onerror = () => {
      toast.error("Failed to read the file.");
    };

    reader.readAsText(file);
  }

  function getSubjectIDs(names: string[]) {
    return subjects
      .filter((subject) => names.includes(subject.name))
      .map((s) => s.id);
  }

  function handleUploadClick() {
    inputRef.current?.click();
  }

  return {
    open,
    setOpen,
    handleAction,
    inputRef,
    handleUploadClick,
    fileName,
    handleFileUploadChange,
  };
};

type FileBook = {
  subject_names: string[];
  related_book_titles: string[];
} & Omit<
  TBook,
  "subject_IDs" | "related_book_IDs" | "favored_by_user_IDs" | "id" | "slug"
>;

type CreateBook = {
  subject_IDs: TBook["subject_IDs"];
  related_book_IDs?: TBook["related_book_IDs"];
} & Omit<FileBook, "subject_names" | "related_book_titles">;
