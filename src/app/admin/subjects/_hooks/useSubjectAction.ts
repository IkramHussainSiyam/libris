import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSubject_action } from "~/lib/db/subjects/deleteSubject.action";
import { useSubjectStore } from "~/lib/hooks/zustand/useSubjectStore";
import { TSubject } from "~/lib/types/subjects.type";

export const useSubjectAction = ({ subject }: { subject: TSubject }) => {
  const { addSubjectToEdit, subjectToEdit, selectedSubjects } =
    useSubjectStore();

  const route = useRouter();

  async function handleDelete() {
    const res = await deleteSubject_action({ subId: subject.id });
    if (res.success) {
      toast.success("Subject deleted successfully");
    } else {
      toast.error(res.error as string);
      console.error(res.error);
    }

    route.refresh();
  }

  function handleEditMode() {
    addSubjectToEdit(subject);
  }

  return {
    handleDelete,
    handleEditMode,
    subjectToEdit,
    selectedSubjects,
  };
};
