"use client";
import Show from "~/components/helpers/Show";

import { $Enums } from "~/lib/prisma/generated/client";
import { TUser } from "~/lib/types/user.type";
import { cn } from "~/lib/utils/utils";
import { useActivityBarHeader } from "../../_hooks/useActivityBarHeader";
import StatusWriter from "./StatusWriter";

export default function ActivityBarHeader({
  feedTab,
  sessionUser,
}: {
  feedTab: $Enums.FeedTab | undefined | null;
  sessionUser: TUser | null;
}) {
  const {
    handleFollowingTab,
    handleGlobalTab,
    followingActivity,
    globalActivity,
    isPending,
  } = useActivityBarHeader({ feedTab });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 justify-between text-sm text-accent-foreground font-medium">
        <h4 className="pl-3 font-medium">Activity</h4>
        <Show when={sessionUser !== null}>
          <div className="flex items-center text-xs">
            <button
              disabled={isPending}
              onClick={handleFollowingTab}
              className={cn(
                "px-2 py-1 bg-light dark:bg-accent",
                followingActivity &&
                  "bg-primary dark:bg-primary text-primary-foreground"
              )}
            >
              Following
            </button>
            <button
              disabled={isPending}
              onClick={handleGlobalTab}
              className={cn(
                "px-2 py-1 bg-light dark:bg-accent",
                globalActivity &&
                  "bg-primary dark:bg-primary text-primary-foreground"
              )}
            >
              Global
            </button>
          </div>
        </Show>
      </div>
      <StatusWriter />
    </div>
  );
}
