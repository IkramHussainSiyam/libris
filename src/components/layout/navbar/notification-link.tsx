"use client";

import { Bell } from "lucide-react";
import Link from "~/components/common/others/Link";
import Show from "~/components/helpers/Show";
import { routes } from "~/lib/static-data/routes";
import { TNotification } from "~/lib/types/notification.type";

export default function NotificationLink({
  notifications,
}: {
  notifications: TNotification[] | null;
}) {
  const isNotificationsNotRead =
    notifications !== null &&
    notifications?.filter((n) => !n.isRead).length > 0;

  return (
    <Link href={routes.notifications} className="block relative">
      <Bell className="stroke-primary-foreground/80 size-5" />
      <Show when={isNotificationsNotRead}>
        <div className="absolute -top-1 -right-0.5 size-2 rounded-full bg-destructive" />
      </Show>
    </Link>
  );
}
