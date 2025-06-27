"use client";

import { PenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Spinner from "~/components/common/submit/spinner";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { deleteActivity_action } from "~/lib/db/activity_comments/deleteActivity.action";
import { TActivity } from "~/lib/types/activity.type";
import ActivityEditorModal from "./ActivityEditorModal";

export default function ActivityCardAction({
  activity,
}: {
  activity: TActivity | null;
}) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteActivity_action({
        activity_ID: activity?.id ?? "",
      });

      if (res.success) {
        toast.success("Activity deleted successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }

      route.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <Button
          type="button"
          size={"icon"}
          variant={"destructive"}
          className="size-5 [&_svg]:size-3 rounded-full bg-accent-foreground/15 text-accent-foreground hover:bg-secondary/15 hover:text-secondary"
          asChild
        >
          <DialogTrigger>
            <PenLine />
          </DialogTrigger>
        </Button>
        <ActivityEditorModal activity={activity} />
      </Dialog>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        size={"icon"}
        variant={"destructive"}
        className="size-5 [&_svg]:size-3 rounded-full bg-accent-foreground/15 text-accent-foreground hover:bg-destructive/15 hover:text-destructive"
      >
        {isPending ? <Spinner className="stroke-destructive" /> : <Trash2 />}
      </Button>
    </div>
  );
}
