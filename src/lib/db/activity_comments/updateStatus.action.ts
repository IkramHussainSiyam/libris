"use server";
import { string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { activitySchema } from "~/lib/types/activity.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = activitySchema.pick({ content: true }).extend({
  id: string(),
});

export const updateStatus_action = withUserAction(
  schema,
  async function (_, params) {
    const { id, content } = params ?? {};

    try {
      await db.activity.update({
        where: {
          id,
        },
        data: {
          content,
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
