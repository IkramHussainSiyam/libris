"use server";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { customListsSchema } from "~/lib/types/customlists.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

export const createCustomList_action = withUserAction(
  customListsSchema,
  async function (user, params) {
    try {
      await db.customList.create({
        data: {
          name: params?.name ?? "",
          user_ID: user.id,
        },
      });

      revalidatePaths([
        [routes.settings.booklist],
        ["/src/app/users/[userName]/booklist", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
