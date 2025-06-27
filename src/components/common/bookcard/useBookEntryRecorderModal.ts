import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteBookEntry_action } from "~/lib/db/book_entries/deleteBookEntry.action";
import { recordBookEntry_action } from "~/lib/db/book_entries/recordBookEntry.action";
import { updateBookEntry_action } from "~/lib/db/book_entries/updateBookEntry.action";

import { GeneralSettings } from "~/lib/db/settings/getGeneralSettings.query";
import { bookEntrySchema, TBookEntry } from "~/lib/types/book_entry.type";
import { TBook } from "~/lib/types/books.type";

const formSchema = bookEntrySchema.omit({
  book_ID: true,
});

export function useBookEntryRecorderModal({
  bookInfo,
  singleBookEntry,
  generalSettings,
}: Params) {
  const isEntryExists = singleBookEntry !== null;
  const [isPending, startTransition] = useTransition();
  const [openModal, setOpenModal] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      status:
        singleBookEntry?.status ??
        generalSettings?.default_bookEntry_status ??
        "planning",
      score: singleBookEntry?.score ?? 0,
      progress: singleBookEntry?.progress ?? 0,
      start_date: singleBookEntry?.start_date ?? "",
      finish_date: singleBookEntry?.finish_date ?? "",
      total_repeats: singleBookEntry?.total_repeats ?? 0,
      notes: singleBookEntry?.notes ?? "",
      private: singleBookEntry?.private || false,
      custom_list_IDs: singleBookEntry?.custom_list_IDs ?? [],
    },
  });

  async function handleRecordEntry() {
    if (isEntryExists) {
      const res = await updateBookEntry_action({
        data: form.getValues(),
        book_entry_ID: singleBookEntry.id,
      });

      if (res.success) {
        toast.success("Book entry updated successfully");
      } else {
        toast.error(res.error as string);
      }
    } else {
      const res = await recordBookEntry_action({
        data: {
          ...form.getValues(),
          book_ID: bookInfo?.id ?? "",
        },
      });

      if (res.success) {
        toast.success("Book entry recorded successfully");
      } else {
        toast.error(res.error as string);
      }
    }

    form.reset();
    setOpenModal(false);
    route.refresh();
  }

  function handleDeleteEntry() {
    startTransition(async () => {
      const res = await deleteBookEntry_action({
        id: singleBookEntry?.id ?? "",
      });
      if (res.success) {
        toast.success("Book entry deleted successfully");
      } else {
        toast.error(res.error as string);
      }

      setOpenModal(false);
      route.refresh();
    });
  }

  return {
    form,
    isPending,
    isEntryExists,
    openModal,
    setOpenModal,
    handleDeleteEntry,
    handleRecordEntry,
  };
}

type Params = {
  singleBookEntry: TBookEntry | null;
  bookInfo: TBook | null;
  generalSettings: GeneralSettings;
};
