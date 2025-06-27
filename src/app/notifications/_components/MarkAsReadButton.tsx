"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { markSingleNotificationAsRead_action } from "~/lib/db/notifications/markAsRead.action";

export default function MarkAsReadButton({
  notification_ID,
  children,
}: {
  notification_ID: string;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  function handleMarkAsRead() {
    startTransition(async () => {
      const res = await markSingleNotificationAsRead_action({
        notification_ID,
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
    <button
      onClick={handleMarkAsRead}
      data-pending={isPending}
      className="group"
    >
      {children}
    </button>
  );
}
