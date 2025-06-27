"use server";
import { string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = z.object({
  id: string(),
});

export const deleteBookEntry_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      await db.bookEntry.delete({
        where: {
          id: params?.id,
        },
      });

      revalidatePaths([
        ["/src/app/users/[userName]/booklist", "page"],
        ["/src/app/book/[bookSlug]", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
