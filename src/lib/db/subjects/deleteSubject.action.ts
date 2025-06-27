"use server";

import { string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = z.object({
  subId: string(),
});

export const deleteSubject_action = withAdminAction(
  schema,
  async function (_, { subId }) {
    try {
      const books = await db.book.findMany({
        where: {
          subject_IDs: {
            has: subId,
          },
        },
      });

      for (const book of books) {
        const newSubjectIDs = book.subject_IDs.filter((id) => id !== subId);

        await db.book.update({
          where: { id: book.id },
          data: {
            subject_IDs: {
              set: newSubjectIDs,
            },
          },
        });
      }

      await db.subject.delete({ where: { id: subId } });

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
