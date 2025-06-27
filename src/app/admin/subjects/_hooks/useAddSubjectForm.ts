import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createManySubjects_action } from "~/lib/db/subjects/createManySubjects.action";
import { createSubject_action } from "~/lib/db/subjects/createSubject.action";
import { updateSubject_action } from "~/lib/db/subjects/updateSubject.action";
import { useSubjectStore } from "~/lib/hooks/zustand/useSubjectStore";

const formSchema = z.object({
  name: z.string().min(3, "Subject name required with least 3 characters."),
});

export const useAddSubjectForm = () => {
  const { subjectToEdit, removeSubjectToEdit } = useSubjectStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      name: subjectToEdit?.name ?? "",
    },
  });

  const route = useRouter();

  async function onSubmit() {
    const multipleSubs = form.getValues("name").trim().split(",");
    const isMulti = multipleSubs.length > 1;

    if (subjectToEdit) {
      const res = await updateSubject_action({
        id: subjectToEdit.id,
        data: { name: form.getValues("name") },
      });

      if (res.success) {
        toast.success("Subject updated successfully");
      } else {
        form.setError("root", { message: res.error as string });
      }
    } else {
      if (isMulti) {
        const data = multipleSubs.map((name) => ({ name: name.trim() }));
        const res = await createManySubjects_action({ data });

        if (res.success) {
          toast.success("Many Subjects added successfully");
        } else {
          form.setError("root", { message: res.error as string });
        }
      } else {
        const res = await createSubject_action({
          name: form.getValues("name"),
        });

        if (res.success) {
          toast.success("Subject added successfully");
        } else {
          form.setError("root", { message: res.error as string });
        }
      }
    }
    reset();
    route.refresh();
  }

  function reset() {
    form.reset();
    removeSubjectToEdit();
  }

  return {
    form,
    onSubmit,
    subjectToEdit,
    reset,
  };
};
