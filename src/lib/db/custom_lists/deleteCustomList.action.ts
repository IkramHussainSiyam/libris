"use server";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  listId: string(),
});

export const deleteCustomList_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      const bookEntries = await db.bookEntry.findMany({
        where: {
          custom_list_IDs: {
            has: params?.listId,
          },
        },
      });

      for (const entry of bookEntries) {
        const newListIDs = entry.custom_list_IDs.filter(
          (id) => id !== params?.listId
        );

        await db.bookEntry.update({
          where: { id: entry.id },
          data: {
            custom_list_IDs: {
              set: newListIDs,
            },
          },
        });
      }

      await db.customList.delete({
        where: {
          id: params?.listId,
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
