"use server";
import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";

import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { sendNotification_action } from "../notifications/sendNotification.action";

const schema = object({
  activity_ID: string(),
  liked_by_userIDs: array(string()),
  activityOwnerID: string(),
});

export const likeActivity_action = withUserAction(
  schema.omit({ liked_by_userIDs: true }),
  async function (user, params) {
    const { activity_ID, activityOwnerID } = params ?? {};

    try {
      await db.activity.update({
        where: {
          id: activity_ID,
        },
        data: {
          liked_by_userIDs: {
            push: user.id ?? "",
          },
        },
      });

      // don't send notification if user is liking their own activity
      if (activityOwnerID !== user.id) {
        const notification_res = await sendNotification_action({
          target_userID: activityOwnerID ?? "",
          type: "like",
          activity_ID: activity_ID,
        });

        if (!notification_res.success) {
          revalidatePaths([
            [routes.social.list],
            ["/src/app/social/[socialId]", "page"],
            ["/src/app/users/[userName]", "page"],
            ["/src/app/users/[userName]/social", "page"],
          ]);

          return {
            error: getErrorMessage(notification_res.error),
            success: true,
          };
        }
      }

      revalidatePaths([
        [routes.social.list],
        [routes.notifications],
        ["/src/app/social/[socialId]", "page"],
        ["/src/app/users/[userName]", "page"],
        ["/src/app/users/[userName]/social", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);

export const unlikeActivity_action = withUserAction(
  schema.omit({ activityOwnerID: true }),
  async function (user, params) {
    const { activity_ID, liked_by_userIDs } = params ?? {};

    try {
      await db.activity.update({
        where: {
          id: activity_ID,
        },
        data: {
          liked_by_userIDs: {
            set: liked_by_userIDs?.filter((id) => id !== user.id),
          },
        },
      });

      revalidatePaths([
        [routes.social.list],
        ["/src/app/social/[socialId]", "page"],
        ["/src/app/users/[userName]", "page"],
        ["/src/app/users/[userName]/social", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
