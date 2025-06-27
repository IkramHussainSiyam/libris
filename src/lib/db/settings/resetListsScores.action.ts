"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

export const resetListsScores_action = withUserAction(
  object({}),
  async function (user) {
    try {
      await db.bookEntry.updateMany({
        where: { user_ID: user.id },
        data: {
          score: 0,
        },
      });

      revalidatePaths([
        [routes.settings.account],
        [routes.explore],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/users/[userName]/booklist", "page"],
      ]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
