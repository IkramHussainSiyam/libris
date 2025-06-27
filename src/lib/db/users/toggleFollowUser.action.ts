"use server";
import { revalidatePath } from "next/cache";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { sendNotification_action } from "../notifications/sendNotification.action";

const schema = object({
  following_ID: string(), // user who is being followed
});

export const followUser_action = withUserAction(
  schema,
  async function (user, params) {
    const { following_ID } = params ?? {};

    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          following_IDs: {
            push: following_ID,
          },
        },
      });

      const notificationRes = await sendNotification_action({
        target_userID: following_ID ?? "",
        type: "follow",
      });

      if (!notificationRes.success) {
        revalidatePaths([["/src/app/users/[userName]", "page"]]);
        return {
          error: getErrorMessage(notificationRes.error),
          success: false,
        };
      }

      revalidatePaths([
        ["/src/app/users/[userName]", "page"],
        [routes.notifications],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: false };
    }
  }
);

export const unfollowUser_action = withUserAction(
  schema,
  async function (user, params) {
    const { following_ID } = params ?? {};

    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          following_IDs: {
            set: user.following_IDs.filter((id) => id !== following_ID),
          },
        },
      });

      revalidatePath("/src/app/users/[userName]", "page");

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
