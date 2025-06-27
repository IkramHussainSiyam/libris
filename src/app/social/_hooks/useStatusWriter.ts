import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createStatus_action } from "~/lib/db/activity_comments/createStatus.action";
import { updateStatus_action } from "~/lib/db/activity_comments/updateStatus.action";
import { activitySchema, TActivity } from "~/lib/types/activity.type";

const formSchema = activitySchema.pick({ content: true });

export function useStatusWriter({
  statusToEdit,
}: {
  statusToEdit?: TActivity | null;
}) {
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      content: statusToEdit?.content ?? "",
    },
  });

  async function onSubmit() {
    if (statusToEdit && form.formState.isDirty) {
      const res = await updateStatus_action({
        id: statusToEdit.id,
        content: form.getValues("content"),
      });

      if (res.success) {
        toast.success("Status updated successfully");
      } else {
        console.error(res.error);
        toast.error(res.error as string);
      }
    } else {
      const res = await createStatus_action({
        content: form.getValues("content"),
      });

      if (res.success) {
        toast.success("Status updated successfully");
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

  return {
    form,
    onSubmit,
    reset,
  };
}
