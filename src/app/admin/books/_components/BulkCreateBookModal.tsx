"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { use } from "react";
import SubmitButton from "~/components/common/submit/SubmitButton";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { TSubject } from "~/lib/types/subjects.type";
import { useBulkCreateBook } from "../_hooks/useBulkCreateBook";

export default function BulkCreateBookModal({ subjectsPromise }: Props) {
  const { allSubjects } = use(subjectsPromise);
  const {
    open,
    setOpen,
    handleAction,
    inputRef,
    handleUploadClick,
    fileName,
    handleFileUploadChange,
  } = useBulkCreateBook({ subjects: allSubjects! });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="w-full lg:w-fit self-end [&_svg]:size-5">
        <DialogTrigger>
          <Plus />
          Bulk Add Books
        </DialogTrigger>
      </Button>
      <DialogContent className="px-0">
        <DialogTitle className="px-5 text-center text-xl mb-4">
          Create Multiple Books
        </DialogTitle>
        <form action={handleAction}>
          <div className="px-5 grid gap-6">
            <div
              onClick={handleUploadClick}
              className="w-full h-52 bg-accent p-2"
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/json"
                onChange={handleFileUploadChange}
                className="hidden"
              />
              <div className="border-2 border-dashed size-full grid place-items-center text-foreground/50">
                {fileName ? fileName : "Upload JSON File"}
              </div>
            </div>
            <div className="w-full">
              <SubmitButton
                className="w-full"
                render={(pending) => (
                  <>{pending ? "Submitting..." : "Submit"}</>
                )}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  subjectsPromise: Promise<{ allSubjects: TSubject[] | null }>;
};
