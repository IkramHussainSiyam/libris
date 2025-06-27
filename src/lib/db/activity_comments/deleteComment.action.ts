"use server";
import { string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

const schema = z.object({
  id: string(),
});

export const deleteComment_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      await db.activityComment.delete({
        where: {
          id: params?.id,
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
