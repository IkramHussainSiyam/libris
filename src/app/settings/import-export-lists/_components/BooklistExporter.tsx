"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { exportBooklistsJSON_action } from "~/lib/db/settings/exportBooklists.action";
import { triggerJsonDownload } from "~/lib/utils/jsonDownloader";

export default function BooklistExporter() {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  function handleExport() {
    startTransition(async () => {
      const res = await exportBooklistsJSON_action({ test: "test" });

      if (res.success) {
        triggerJsonDownload("libris_booklist_export.json", res.data ?? "");
        toast.success("Lists exported successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }

      route.refresh();
    });
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleExport}
      type="submit"
      className="mt-3"
    >
      Export Lists
    </Button>
  );
}
