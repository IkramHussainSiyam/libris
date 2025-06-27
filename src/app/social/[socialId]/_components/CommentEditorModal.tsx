import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "~/components/ui/dialog";
import { TActivityComment } from "~/lib/types/activity.type";
import CommentWriter from "./CommentWriter";

export default function CommentEditorModal({
  comment,
}: {
  comment: TActivityComment | undefined | null;
}) {
  return (
    <DialogContent className="max-w-5xl p-6 pr-12 bg-accent">
      <DialogTitle className="text-2xl font-semibold">
        Edit your status
      </DialogTitle>
      <CommentWriter commentToEdit={comment ? comment : null} />
    </DialogContent>
  );
}
