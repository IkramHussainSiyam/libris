"use client";

import SubmitButton from "~/components/common/submit/SubmitButton";
import If from "~/components/helpers/If";
import { Input } from "~/components/ui/input";
import { useBooklistImporter } from "../_hooks/useBooklistImporter";

export default function BooklistImporter() {
  const {
    handleAction,
    handleFileUploadChange,
    handleUploadTrigger,
    inputRef,
    fileName,
  } = useBooklistImporter();

  return (
    <form action={handleAction}>
      <Input
        className="hidden"
        ref={inputRef}
        onChange={handleFileUploadChange}
        name="booklist_import"
        id="booklist_import"
        type="file"
        accept="application/json"
      />
      <div
        onClick={handleUploadTrigger}
        className="size-56 bg-accent grid place-items-center"
      >
        <div className="size-52 border-2 border-dashed grid place-items-center text-center text-accent-foreground p-3 select-none pointer-events-none text-sm">
          <If
            condition={fileName !== null}
            then={<p>Uploaded &apos;{fileName}&apos;</p>}
            otherwise={
              <p>
                Click to upload the &apos;libris_booklist_export.json&apos; file
                you exported
              </p>
            }
          />
        </div>
      </div>
      <SubmitButton
        type="submit"
        className="mt-3"
        render={(pending) => (pending ? "Importing..." : "Import Booklists")}
      />
    </form>
  );
}
