"use server";
import { array, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { notificationSchema } from "~/lib/types/notification.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

export const sendNotification_action = withUserAction(
  notificationSchema.omit({ isRead: true, from_userID: true }),
  async function (user, params) {
    const { target_userID, activity_ID, review_ID, type } = params ?? {};

    try {
      await db.notification.create({
        data: {
          target_userID: target_userID ?? "",
          type: type ?? "status_post",
          activity_ID,
          review_ID,

          from_userID: user.id,
        },
      });

      revalidatePaths([[routes.notifications]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);

const schema = object({
  data: array(notificationSchema.omit({ isRead: true, from_userID: true })),
});

export const sendManyNotification_action = withUserAction(
  schema,
  async function (user, params) {
    try {
      await db.notification.createMany({
        data:
          params?.data.map((notification) => ({
            target_userID: notification.target_userID,
            type: notification.type,
            activity_ID: notification.activity_ID,
            review_ID: notification.review_ID,

            from_userID: user.id,
          })) ?? [],
      });

      revalidatePaths([[routes.notifications]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
