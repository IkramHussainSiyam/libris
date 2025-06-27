"use server";
import { string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { customListsSchema } from "~/lib/types/customlists.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = customListsSchema.extend({
  listId: string(),
});

export const updateCustomList_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      await db.customList.update({
        where: {
          id: params?.listId,
        },
        data: {
          name: params?.name,
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
