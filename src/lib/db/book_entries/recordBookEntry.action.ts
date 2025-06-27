"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { bookEntrySchema } from "~/lib/types/book_entry.type";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";

const schema = object({
  data: bookEntrySchema,
});

export const recordBookEntry_action = withUserAction(
  schema,
  async function (user, params) {
    const { data } = params ?? {};

    try {
      await db.bookEntry.create({
        data: {
          user_ID: user.id,

          book_ID: data?.book_ID ?? "",
          status: data?.status ?? "planning",
          score: data?.score ?? 0,
          progress: data?.progress ?? 0,
          start_date: data?.start_date ?? "",
          finish_date: data?.finish_date ?? "",
          total_repeats: data?.total_repeats ?? 0,
          notes: data?.notes ?? "",
          private: data?.private ?? false,
          custom_list_IDs: data?.custom_list_IDs ?? [],
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
