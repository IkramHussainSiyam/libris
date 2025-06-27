"use server";

import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";

const schema = object({
  id: string(),
  data: object({
    name: string().min(5, "Subject name must be at least 5 characters long."),
  }),
});

export const updateSubject_action = withAdminAction(
  schema,
  async function (_, { id, data }) {
    try {
      await db.subject.update({ where: { id }, data });

      revalidatePaths([
        [routes.admin.subjects],
        [routes.admin.books.list],
        ["/src/app/admin/books/[bookId]", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
