"use server";
import { string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { activityCommentSchema } from "~/lib/types/activity.type";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { sendNotification_action } from "../notifications/sendNotification.action";

const schema = activityCommentSchema.extend({
  target_userID: string(),
});

export const writeComment_action = withUserAction(
  schema,
  async function (user, params) {
    const { content, activity_ID, target_userID } = params ?? {};

    try {
      await db.activityComment.create({
        data: {
          content: content ?? "",
          activity_ID: activity_ID ?? "",
          user_ID: user.id,
        },
      });

      // no notification won't be sent if user is commenting on their own activity
      if (target_userID !== user?.id) {
        const res = await sendNotification_action({
          target_userID: target_userID ?? "",
          type: "comment",
          activity_ID: activity_ID ?? "",
        });

        if (!res.success) {
          revalidatePaths([
            [routes.social.list],
            ["/src/app/social/[socialId]", "page"],
            ["/src/app/users/[userName]", "page"],
            ["/src/app/users/[userName]/social", "page"],
          ]);

          return { error: getErrorMessage(res.error), success: false };
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
