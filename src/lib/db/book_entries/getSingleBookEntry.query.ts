import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withUserQuery } from "../_config/withUserQuery";

const schema = object({
  book_ID: string(),
  options: custom<Omit<Prisma.BookFindUniqueArgs, "where">>().optional(),
});

export const getSingleBookEntry_query = cache(
  withUserQuery(schema, async function (user, params) {
    try {
      const singleBookEntry = await db.bookEntry.findUnique({
        where: {
          user_ID_book_ID: {
            user_ID: user.id,
            book_ID: params?.book_ID ?? "",
          },
        },
        ...params?.options,
      });

      return singleBookEntry;
    } catch (error) {
      throw error;
    }
  })
);
