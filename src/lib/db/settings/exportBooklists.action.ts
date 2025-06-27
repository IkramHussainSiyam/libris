"use server";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { getErrorMessage } from "~/lib/utils/error-message";
import { withUserAction } from "../_config/withUserAction";

export const exportBooklistsJSON_action = withUserAction(
  object({}),
  async function (user) {
    try {
      const book_entries = await db.bookEntry.findMany({
        where: { user_ID: user.id },
        omit: {
          id: true,
          user_ID: true,
          created_at: true,
          updated_at: true,
        },
      });

      const custom_lists = await db.customList.findMany({
        where: { user_ID: user.id },
        omit: { created_at: true, user_ID: true, updated_at: true },
      });

      if (book_entries.length > 0 || custom_lists.length > 0) {
        const jsonData = JSON.stringify(
          {
            book_entries,
            custom_lists,
          },
          null,
          2
        );
        return { success: true, data: jsonData };
      }

      return {
        success: false,
        error: "You have no book entries or custom lists to export.",
      };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  }
);
