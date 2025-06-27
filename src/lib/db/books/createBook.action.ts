"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { createBookSchema } from "~/lib/types/books.type";
import { getErrorMessage } from "~/lib/utils/error-message";
import { generateSlug } from "~/lib/utils/utils";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { isBookAlreadyExists } from "./getAllBooks.query";

const schema = object({
  data: createBookSchema,
});

export const createBook_action = withAdminAction(
  schema,
  async function (_, { data }) {
    try {
      const { isExists } = await isBookAlreadyExists(data.name);

      if (isExists) {
        throw new Error(`Book already exists: ${data.name}`);
      }

      await db.book.create({
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
