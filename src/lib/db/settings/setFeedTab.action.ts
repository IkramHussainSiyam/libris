"use server";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { $Enums } from "~/lib/prisma/generated/client";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

const schema = object({
  tab: custom<$Enums.FeedTab>(),
});

export const setFeedTab_action = withUserAction(
  schema,
  async function (user, params) {
    try {
      const usersSettings = await db.setting.findUnique({
        where: {
          user_ID: user.id,
        },
        select: { id: true },
      });

      if (usersSettings === null) {
        await db.setting.create({
          data: {
            user_ID: user.id,
            default_feed_tab: params?.tab,
          },
        });
      } else {
        await db.setting.update({
          where: { user_ID: user.id },
          data: { default_feed_tab: params?.tab },
        });
      }

      revalidatePaths([[routes.settings.account], [routes.social.list]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
