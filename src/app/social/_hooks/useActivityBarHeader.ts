import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setFeedTab_action } from "~/lib/db/settings/setFeedTab.action";
import { $Enums } from "~/lib/prisma/generated/client";

export function useActivityBarHeader({
  feedTab,
}: {
  feedTab: $Enums.FeedTab | undefined | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTab, setOptimisticTab] = useState(feedTab ?? "global");
  const route = useRouter();

  const followingActivity = optimisticTab === "following";
  const globalActivity = optimisticTab === "global";

  function handleFollowingTab() {
    setOptimisticTab("following");

    startTransition(async () => {
      const res = await setFeedTab_action({ tab: "following" });

      if (res.success) {
        toast.success("Switched to following tab");
      } else {
        console.error(res.error);
        toast.error(res.error as string);
        setOptimisticTab(feedTab ?? "global");
      }

      route.refresh();
    });
  }

  function handleGlobalTab() {
    setOptimisticTab("global");

    startTransition(async () => {
      const res = await setFeedTab_action({ tab: "global" });

      if (res.success) {
        toast.success("Switched to global tab");
      } else {
        console.error(res.error);
        toast.error(res.error as string);
        setOptimisticTab(feedTab ?? "global");
      }

      route.refresh();
    });
  }

  return {
    handleFollowingTab,
    handleGlobalTab,
    followingActivity,
    globalActivity,
    isPending,
  };
}
