"use server";
import { object } from "zod";

import { db } from "~/lib/conf/prisma.conf";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

// FIX_ME: Not entirely deleting the account but deleting most of the data
// I'll try to find other way

export const deleteUserAccount_action = withUserAction(
  object({}),
  async function (user) {
    try {
      const [
        activities,
        activityComments,
        bookEntries,
        customLists,
        notifications,
        reviews,
        settings,
      ] = await Promise.all([
        db.activity.findMany({ where: { user_ID: user.id ?? "" } }),
        db.activityComment.findMany({ where: { user_ID: user.id } }),
        db.bookEntry.findMany({ where: { user_ID: user.id } }),
        db.customList.findMany({ where: { user_ID: user.id } }),
        db.notification.findMany({
          where: { target_userID: user.id ?? "" },
        }),
        db.review.findMany({ where: { user_ID: user.id } }),
        db.setting.findUnique({ where: { user_ID: user.id ?? "" } }),
      ]);

      if (activities.length > 0) {
        await db.activity.deleteMany({ where: { user_ID: user.id ?? "" } });
      }
      if (activityComments.length > 0) {
        await db.activityComment.deleteMany({ where: { user_ID: user.id } });
      }
      if (bookEntries.length > 0) {
        await db.bookEntry.deleteMany({ where: { user_ID: user.id } });
      }
      if (customLists.length > 0) {
        await db.customList.deleteMany({ where: { user_ID: user.id } });
      }
      if (notifications.length > 0) {
        await db.notification.deleteMany({
          where: { target_userID: user.id ?? "" },
        });
      }
      if (reviews.length > 0) {
        await db.review.deleteMany({ where: { user_ID: user.id } });
      }
      if (settings !== null) {
        await db.setting.delete({ where: { user_ID: user.id ?? "" } });
      }

      await db.user.delete({ where: { id: user.id } });

      revalidatePaths([["/src/app", "layout"]]); // revalidate all pages

      return { success: true };
    } catch (error) {
      return {
        error: getErrorMessage(error),
        success: false,
      };
    }
  }
);
