"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

import { deleteBookLists_action } from "~/lib/db/settings/deleteBookLists.action";
import { resetListsScores_action } from "~/lib/db/settings/resetListsScores.action";
import SettingsItem from "../../_components/SettingsItem";

export default function DangerZone() {
  const [isResetPending, startResetTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const route = useRouter();

  function handleResetListScores() {
    startResetTransition(async () => {
      const res = await resetListsScores_action();

      if (res.success) {
        toast.success("List scores reset successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }

      route.refresh();
    });
  }

  function handleDeleteBookLists() {
    startDeleteTransition(async () => {
      const res = await deleteBookLists_action();
      if (res.success) {
        toast.success("Book lists deleted successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    });
  }

  return (
    <div className="space-y-8">
      <SettingsItem heading="Danger Zone" className="text-sm">
        <h4 className="text-destructive mb-1.5">Reset List Scores</h4>
        <p className="text-accent-foreground mb-3">
          Clear all your book list scores
        </p>
        <Button
          disabled={isResetPending}
          onClick={handleResetListScores}
          variant={"destructive"}
        >
          Reset Scores
        </Button>
      </SettingsItem>
      <SettingsItem className="text-sm">
        <h4 className="text-destructive mb-1.5">Delete Lists</h4>
        <p className="text-accent-foreground mb-3">
          Warning! This will permanently delete all your book list entries
        </p>
        <Button
          disabled={isDeletePending}
          onClick={handleDeleteBookLists}
          variant={"destructive"}
        >
          Delete Book Lists
        </Button>
      </SettingsItem>
    </div>
  );
}
