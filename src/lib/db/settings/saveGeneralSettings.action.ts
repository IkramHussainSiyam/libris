"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { generalSettingsSchema } from "~/lib/types/settings.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  data: generalSettingsSchema,
});

export const saveGeneralSettings_action = withUserAction(
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

            default_bookEntry_status: params?.data?.default_bookEntry_status,
            default_feed_tab: params?.data?.default_feed_tab,
            default_explore_order: params?.data?.default_explore_order,
          },
        });
      } else {
        await db.setting.update({
          where: { user_ID: user.id },
          data: params?.data ?? {},
        });
      }

      revalidatePaths([[routes.settings.general]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
