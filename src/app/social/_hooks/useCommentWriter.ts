import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateComment_action } from "~/lib/db/activity_comments/updateComment.action";
import { writeComment_action } from "~/lib/db/activity_comments/writeComment.action";
import {
  activityCommentSchema,
  TActivity,
  TActivityComment,
} from "~/lib/types/activity.type";

const formSchema = activityCommentSchema.pick({ content: true });

export function useCommentWriter({
  activity,
  commentToEdit,
}: {
  activity?: TActivity | null;
  commentToEdit?: TActivityComment | null;
}) {
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      content: commentToEdit?.content ?? "",
    },
  });

  async function onSubmit() {
    if (commentToEdit && form.formState.isDirty) {
      const res = await updateComment_action({
        id: commentToEdit.id,
        content: form.getValues("content"),
      });

      if (res.success) {
        toast.success("Comment updated successfully");
      } else {
        console.error(res.error);
        toast.error(res.error as string);
      }
    } else {
      const res = await writeComment_action({
        content: form.getValues("content"),
        activity_ID: activity?.id ?? "",
        target_userID: activity?.user_ID ?? "",
      });

      if (res.success) {
        toast.success("Comment created successfully");
      } else {
        console.error(res.error);
        toast.error(res.error as string);
      }
    }

    reset();
    route.refresh();
  }

  function reset() {
    form.reset();
  }

  return { form, onSubmit, reset };
}
