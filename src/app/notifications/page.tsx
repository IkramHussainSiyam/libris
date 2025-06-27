import Container from "~/components/common/others/Container";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import Show from "~/components/helpers/Show";

import { getUsersNotifications_query } from "~/lib/db/notifications/getUsersNotifications.query";
import MarkAllAsReadButton from "./_components/MarkAllAsReadButton";
import NotificationCard from "./_components/NotificationCard";

export default async function NorificationsPage() {
  const notifications = await getUsersNotifications_query();

  return (
    <Container>
      <div className="flex items-center gap-2 justify-between">
        <h5 className="text-xl mb-4">Notifications</h5>
        <Show
          when={
            notifications
              ? notifications?.filter((n) => !n.isRead).length > 0
              : false
          }
        >
          <MarkAllAsReadButton
            notification_IDs={notifications?.map((n) => n.id) ?? []}
          />
        </Show>
      </div>
      <If
        condition={notifications ? notifications?.length > 0 : false}
        then={
          <div className="space-y-4 mt-6">
            <For
              each={notifications ?? []}
              render={(notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              )}
            />
          </div>
        }
        otherwise={
          <EmptyMessage variant="light">No notifications.</EmptyMessage>
        }
      />
    </Container>
  );
}

export const metadata = {
  title: "Notifications",
  openGraph: {
    title: "Notifications",
    url: `https://libris-app-eight.vercel.app/notifications`,
  },
};
