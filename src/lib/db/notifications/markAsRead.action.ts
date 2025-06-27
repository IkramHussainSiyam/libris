"use server";
import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  notification_ID: string(),
  notification_IDs: array(string()),
});

export const markSingleNotificationAsRead_action = withUserAction(
  schema.pick({ notification_ID: true }),
  async function (_, params) {
    const { notification_ID } = params ?? {};

    try {
      await db.notification.update({
        where: { id: notification_ID },
        data: { isRead: true },
      });

      revalidatePaths([
        [routes.notifications],
        ["/src/app/social/[socialId]", "page"],
        ["/src/app/users/[userName]", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);

export const markAllNotificationAsRead_action = withUserAction(
  schema.pick({ notification_IDs: true }),
  async function (_, params) {
    const { notification_IDs } = params ?? {};

    try {
      await db.notification.updateMany({
        where: {
          id: {
            in: notification_IDs,
          },
        },
        data: {
          isRead: true,
        },
      });

      revalidatePaths([
        [routes.notifications],
        ["/src/app/social/[socialId]", "page"],
        ["/src/app/users/[userName]", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
