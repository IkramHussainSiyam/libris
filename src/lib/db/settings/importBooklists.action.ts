"use server";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { TBookListsImport } from "~/lib/types/books.type";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  book_entries: custom<TBookListsImport["book_entries"]>(),
  custom_lists: custom<TBookListsImport["custom_lists"]>(),
});

export const importBooklistsJSON_action = withUserAction(
  schema,
  async function (user, params) {
    const { book_entries, custom_lists } = params ?? {};

    try {
      await db.bookEntry.createMany({
        data:
          book_entries?.map((entry) => ({
            ...entry,
            user_ID: user.id,
          })) ?? [],
      });

      await db.customList.createMany({
        data:
          custom_lists?.map((list) => ({
            ...list,
            user_ID: user.id,
          })) ?? [],
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  }
);
