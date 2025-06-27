import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createCustomList_action } from "~/lib/db/custom_lists/createCustomList.action";
import { updateCustomList_action } from "~/lib/db/custom_lists/updateCustomList.action";
import { useCustomListStore } from "~/lib/hooks/zustand/useCustomListStore";
import {
  customListsSchema as formSchema,
  TCustomLists,
} from "~/lib/types/customlists.type";

export function useManageCustomlist({ customListsPromise }: Params) {
  const customLists = use(customListsPromise);

  const { listToEdit, removeListToEdit } = useCustomListStore();
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: listToEdit?.name ?? "",
    },
  });

  async function handleListSubmit() {
    if (listToEdit) {
      const res = await updateCustomList_action({
        ...form.getValues(),
        listId: listToEdit.id,
      });

      if (res.success) {
        removeListToEdit();
        toast.success("List updated successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    } else {
      const res = await createCustomList_action({ ...form.getValues() });

      if (res.success) {
        toast.success("List created successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    }

    route.refresh();
  }

  return { customLists, form, listToEdit, handleListSubmit };
}

type Params = {
  customListsPromise: Promise<TCustomLists[] | null>;
};
