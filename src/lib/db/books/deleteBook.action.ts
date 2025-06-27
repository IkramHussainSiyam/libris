"use server";

import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  id: string(),
});

export const deleteBook_action = withAdminAction(
  schema,
  async function (_, { id }) {
    try {
      await Promise.all([
        db.bookEntry.deleteMany({ where: { book_ID: id } }),
        db.review.deleteMany({ where: { book_ID: id } }),
      ]);

      await db.book.delete({ where: { id } });

      revalidatePaths([
        [routes.admin.books.list],
        [routes.explore],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/admin/books/[bookId]", "page"],
        [routes.admin.subjects],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
