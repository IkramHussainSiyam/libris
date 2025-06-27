"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

export const deleteBookLists_action = withUserAction(
  object({}),
  async function (user) {
    try {
      await db.customList.deleteMany({ where: { user_ID: user.id } });
      await db.bookEntry.deleteMany({ where: { user_ID: user.id } });

      revalidatePaths([
        [routes.settings.account],
        [routes.explore],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/users/[userName]/booklist", "page"],
      ]);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
);
