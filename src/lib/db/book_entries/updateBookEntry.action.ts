"use server";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { bookEntrySchema } from "~/lib/types/book_entry.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  book_entry_ID: string(),
  data: bookEntrySchema.omit({ book_ID: true }),
});

export const updateBookEntry_action = withUserAction(
  schema,
  async function (_, params) {
    const { data, book_entry_ID } = params ?? {};

    try {
      await db.bookEntry.update({
        where: { id: book_entry_ID },
        data: data ?? {},
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
