"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { accountSettingsSchema } from "~/lib/types/settings.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  data: accountSettingsSchema,
});

export const saveAccountSettings_action = withUserAction(
  schema,
  async function (user, params) {
    try {
      await db.user.update({
        where: { id: user.id },
        data: params?.data ?? {},
      });

      revalidatePaths([[routes.settings.account]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
