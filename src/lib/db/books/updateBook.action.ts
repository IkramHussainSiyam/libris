"use server";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { createBookSchema } from "~/lib/types/books.type";
import { generateSlug } from "~/lib/utils/utils";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  id: string(),
  data: createBookSchema,
});

export const updateBook_action = withAdminAction(
  schema,
  async function (_, { id, data }) {
    try {
      await db.book.update({
        where: { id },
        data: {
          ...data,
          slug: generateSlug(data.name),
        },
      });

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
