"use server";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

const schema = object({
  activity_ID: string(),
});

export const deleteActivity_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      await Promise.all([
        db.activityComment.deleteMany({
          where: {
            activity_ID: params?.activity_ID,
          },
        }),
        db.notification.deleteMany({
          where: {
            activity_ID: params?.activity_ID,
          },
        }),
      ]);

      await db.activity.delete({
        where: {
          id: params?.activity_ID,
        },
      });

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
