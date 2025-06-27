"use client";
import { toast } from "sonner";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { deleteManySubjects_action } from "~/lib/db/subjects/deleteManySubjects.action";
import { useSubjectStore } from "~/lib/hooks/zustand/useSubjectStore";
import { TSubject } from "~/lib/types/subjects.type";

export function SubjectSelector({ subject }: { subject: TSubject }) {
  const { selectedSubjects, selectSubject, unselectSubject } =
    useSubjectStore();

  function handleSelectSubject() {
    if (selectedSubjects.includes(subject)) {
      unselectSubject(subject);
    } else {
      selectSubject(subject);
    }
  }

  return (
    <>
      <input
        checked={selectedSubjects.includes(subject)}
        onChange={handleSelectSubject}
        id={subject.id}
        type="checkbox"
      />
    </>
  );
}

export function SelectedSubjectsAction() {
  const { selectedSubjects, unSelectAllSubjects } = useSubjectStore();

  async function handleBulkDelete() {
    const res = await deleteManySubjects_action({
      ids: selectedSubjects.map((s) => s.id),
    });

    if (res.success) {
      unSelectAllSubjects();
      toast.success("Subjects deleted successfully");
    } else {
      console.error(res.error);
      toast.error(res.error as string);
    }
  }

  return (
    <Show when={selectedSubjects.length > 0}>
      <form
        action={handleBulkDelete}
        className="flex items-center gap-3 justify-between px-1"
      >
        <span className="inline-block text-accent-foreground">
          {selectedSubjects.length}{" "}
          {selectedSubjects.length === 1 ? "item" : "items"} selected
        </span>
        <div className="flex items-center gap-2">
          <SubmitButton
            size={"sm"}
            className="h-6 text-xs px-2 bg-destructive hover:bg-destructive/80"
            render={(pending) => (pending ? "Deleting..." : "Delete Selected")}
          />
          <Button
            type="button"
            onClick={unSelectAllSubjects}
            size={"sm"}
            className="h-6 text-xs px-2 bg-zinc-900 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-accent dark:hover:bg-zinc-50/80"
          >
            Cencel
          </Button>
        </div>
      </form>
    </Show>
  );
}
