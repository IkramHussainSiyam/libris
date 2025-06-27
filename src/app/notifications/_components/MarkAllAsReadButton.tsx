"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { markAllNotificationAsRead_action } from "~/lib/db/notifications/markAsRead.action";

export default function MarkAllAsReadButton({
  notification_IDs,
}: {
  notification_IDs: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  function handleMarkAllAsRead() {
    startTransition(async () => {
      const res = await markAllNotificationAsRead_action({
        notification_IDs,
      });

      if (res.success) {
        toast.success("Marked notification as read");
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
      onClick={handleMarkAllAsRead}
      size={"sm"}
      className="text-xs h-6 px-2"
    >
      Mark all as read
    </Button>
  );
}
