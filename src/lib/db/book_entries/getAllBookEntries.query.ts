import { Prisma } from "@prisma/client";
import { cache } from "react";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  options: custom<Prisma.BookEntryFindManyArgs>().optional(),
});

export const getAllBookEntries_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const bookEntries = await db.bookEntry.findMany(params?.options);
      return bookEntries;
    } catch (error) {
      throw error;
    }
  })
);
