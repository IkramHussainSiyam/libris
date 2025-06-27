"use server";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { activitySchema } from "~/lib/types/activity.type";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { sendManyNotification_action } from "../notifications/sendNotification.action";
import { getUsersFollowers_query } from "../users/getUsersFollowers.query";

const schema = activitySchema.pick({ content: true });

export const createStatus_action = withUserAction(
  schema,
  async function (user, params) {
    try {
      const createdActivity = await db.activity.create({
        data: {
          content: params?.content ?? "",
          user_ID: user.id,
        },
      });

      const followers = await getUsersFollowers_query({
        user_ID: user.id,
        options: { select: { id: true } },
      });

      if (followers === null || followers.length === 0) {
        return { success: true };
      }

      const notification_res = await sendManyNotification_action({
        data: followers.map((follower) => ({
          target_userID: follower.id,
          type: "status_post",
          activity_ID: createdActivity?.id,
        })),
      });

      if (!notification_res.success) {
        revalidatePaths([
          [routes.social.list],
          ["/src/app/social/[socialId]", "page"],
          ["/src/app/users/[userName]", "page"],
          ["/src/app/users/[userName]/social", "page"],
        ]);

        return {
          success: false,
          error: getErrorMessage(notification_res.error),
        };
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
