import { MailCheck } from "lucide-react";
import Card from "~/components/common/card/Card";
import Show from "~/components/helpers/Show";
import Tooltip from "~/components/ui/tooltip";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { TNotification } from "~/lib/types/notification.type";
import { formatDate } from "~/lib/utils/date-formatter";
import { cn } from "~/lib/utils/utils";
import MarkAsReadButton from "./MarkAsReadButton";
import NotificationMessage from "./NotificationMessage";

export default async function NotificationCard({
  notification,
}: {
  notification: TNotification;
}) {
  const singleUser = await getSingleUser_query({
    user_name: undefined,
    where: {
      id: notification.from_userID,
    },
    options: {
      select: { image: true, user_name: true },
    },
  });

  return (
    <Card.Root
      className={cn(
        "relative border-r-[6px] border-secondary",
        notification.isRead && "border-transparent"
      )}
    >
      <Card.Image
        containerClassName="w-16 h-20"
        src={singleUser?.image ?? "https://placehold.co/64x80/png"}
        alt={singleUser?.user_name ?? "Some Alt Text"}
        width={64}
        height={80}
      />

      <Card.Content className="space-y-0">
        <Card.Header className="absolute top-2.5 right-2.5">
          <Card.Stats className="flex items-center gap-2">
            <span className="text-xs text-accent-foreground">
              {formatDate(notification.created_at, "withTime")}
            </span>
            <Show when={!notification.isRead}>
              <Tooltip content="Mark as read" variant="dark">
                <MarkAsReadButton notification_ID={notification.id}>
                  <MailCheck className="size-[14px] text-primary group-data-[pending=true]:text-muted-foreground cursor-pointer" />
                </MarkAsReadButton>
              </Tooltip>
            </Show>
          </Card.Stats>
        </Card.Header>

        <Card.Description>
          <NotificationMessage
            review_ID={notification.review_ID}
            type={notification.type}
            activity_ID={notification.activity_ID}
            fromUsername={singleUser?.user_name}
          />
        </Card.Description>
      </Card.Content>
    </Card.Root>
  );
}
