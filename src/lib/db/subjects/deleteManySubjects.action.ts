"use server";
import { array, string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";

const schema = z.object({
  ids: array(string()),
});

export const deleteManySubjects_action = withAdminAction(
  schema,
  async function (_, { ids }) {
    try {
      const books = await db.book.findMany({
        where: {
          subject_IDs: {
            hasSome: ids,
          },
        },
      });

      for (const book of books) {
        const newSubjectIDs = book.subject_IDs.filter(
          (id) => !ids.includes(id)
        );

        await db.book.update({
          where: { id: book.id },
          data: {
            subject_IDs: newSubjectIDs,
          },
        });
      }

      await db.subject.deleteMany({ where: { id: { in: ids } } });

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
