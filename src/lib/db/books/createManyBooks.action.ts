"use server";
import { array, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { createBookSchema } from "~/lib/types/books.type";
import { generateSlug } from "~/lib/utils/utils";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { isManyBooksAlreadyExists } from "./getAllBooks.query";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  data: array(createBookSchema),
});

export const createManyBooks_action = withAdminAction(
  schema,
  async function (_, { data }) {
    try {
      const { isExists, names } = await isManyBooksAlreadyExists(
        data.map((b) => b.name)
      );

      if (isExists) {
        throw new Error(`Book already exists: ${names}`);
      }

      await db.book.createMany({
        data: data.map((b) => ({
          ...b,
          slug: generateSlug(b.name),
        })),
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
