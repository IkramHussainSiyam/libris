import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { importBooklistsJSON_action } from "~/lib/db/settings/importBooklists.action";
import { TBookListsImport } from "~/lib/types/books.type";

export function useBooklistImporter() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [booklist, setBooklist] = useState<TBookListsImport | null>(null);

  const route = useRouter();

  async function handleAction() {
    if (!booklist) {
      toast.error("Please upload a valid .json file.");
      return;
    }

    const res = await importBooklistsJSON_action({
      book_entries: booklist.book_entries,
      custom_lists: booklist.custom_lists,
    });

    if (res.success) {
      toast.success("Booklists imported successfully");
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
      if (!fileParsed?.book_entries || !fileParsed?.custom_lists) {
        toast.error("Invalid JSON format");
        return;
      }
      const booklists = fileParsed as TBookListsImport;

      setBooklist(booklists);
    };

    reader.onerror = () => {
      toast.error("Failed to read the file.");
    };

    reader.readAsText(file);
  }

  function handleUploadTrigger() {
    inputRef.current?.click();
  }

  return {
    handleAction,
    handleFileUploadChange,
    handleUploadTrigger,
    inputRef,
    fileName,
  };
}
