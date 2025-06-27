"use client";
import { PenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Spinner from "~/components/common/submit/spinner";
import { Button } from "~/components/ui/button";
import { deleteCustomList_action } from "~/lib/db/custom_lists/deleteCustomList.action";
import { useCustomListStore } from "~/lib/hooks/zustand/useCustomListStore";
import { TCustomLists } from "~/lib/types/customlists.type";

export default function ListItem({ customList }: { customList: TCustomLists }) {
  const [isPending, startTransition] = useTransition();
  const { addListToEdit } = useCustomListStore();
  const route = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteCustomList_action({ listId: customList.id });

      if (res.success) {
        toast.success("Subject deleted successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    });

    route.refresh();
  }

  function handleEnterEditMode() {
    addListToEdit(customList);
  }

  return (
    <div className="px-3 bg-accent text-accent-foreground text-sm h-10 flex items-center justify-between gap-2">
      <span>{customList.name}</span>
      <div className="flex items-center gap-2">
        <Button
          onClick={handleEnterEditMode}
          size={"icon"}
          variant={"destructive"}
          className="size-6 rounded-full bg-accent-foreground/15 text-accent-foreground hover:bg-primary/15 hover:text-primary"
        >
          <PenLine />
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isPending}
          size={"icon"}
          variant={"destructive"}
          className="size-6 rounded-full bg-accent-foreground/15 text-accent-foreground hover:bg-destructive/15 hover:text-destructive"
        >
          {isPending ? <Spinner className="stroke-destructive" /> : <Trash2 />}
        </Button>
      </div>
    </div>
  );
}
