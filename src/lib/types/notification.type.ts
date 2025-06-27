import { boolean, custom, object, string } from "zod";
import { $Enums, Prisma } from "../../../prisma/generated/client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TNotification = Prisma.NotificationGetPayload<{}>;

export const notificationSchema = object({
  target_userID: string().min(1, "Target user ID required."),
  from_userID: string().min(1, "From user ID required."),
  activity_ID: string().optional(),
  review_ID: string().optional(),
  type: custom<$Enums.NotificationType>(),
  isRead: boolean().default(false),
});
