import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "~/components/ui/dialog";
import { TActivity } from "~/lib/types/activity.type";
import StatusWriter from "./StatusWriter";

export default function ActivityEditorModal({
  activity,
}: {
  activity: TActivity | null;
}) {
  return (
    <DialogContent className="max-w-5xl p-6 pr-12 bg-accent">
      <DialogTitle className="text-2xl font-semibold">
        Edit your status
      </DialogTitle>
      <StatusWriter statusToEdit={activity} />
    </DialogContent>
  );
}
