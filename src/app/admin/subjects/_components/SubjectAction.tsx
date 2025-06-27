"use client";
import { PenLine, Trash2 } from "lucide-react";
import Spinner from "~/components/common/submit/spinner";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { TSubject } from "~/lib/types/subjects.type";
import { useSubjectAction } from "../_hooks/useSubjectAction";

export default function SubjectAction({ subject }: { subject: TSubject }) {
  const { handleDelete, handleEditMode, subjectToEdit, selectedSubjects } =
    useSubjectAction({ subject });

  return (
    <Show
      when={
        subjectToEdit ? subjectToEdit === null : selectedSubjects.length === 0
      }
    >
      <form action={handleDelete} className="flex items-center gap-1.5">
        <Button
          onClick={handleEditMode}
          type="button"
          size={"icon"}
          variant={"outlined"}
          className="size-5 rounded-full [&_svg]:size-[14px] border-none hover:bg-primary/20 hover:text-primary"
        >
          <PenLine />
        </Button>
        <SubmitButton
          size={"icon"}
          variant={"outlined"}
          className="size-5 rounded-full [&_svg]:size-[14px] border-none hover:bg-destructive/20 hover:text-destructive"
          render={(pending) =>
            pending ? <Spinner className="text-destructive" /> : <Trash2 />
          }
        />
      </form>
    </Show>
  );
}
