import { Prisma } from "@prisma/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  user_ID: string().optional(),
  options: custom<Omit<Prisma.BookEntryFindManyArgs, "where">>().optional(),
  where: custom<Prisma.BookEntryWhereInput>().optional(),
});

export const getBookEntries_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_ID, options, where } = params ?? {};

    try {
      const bookEntries = await db.bookEntry.findMany({
        where: {
          ...where,
          user_ID,
        },
        ...options,
      });

      return bookEntries;
    } catch (error) {
      throw error;
    }
  })
);
