import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  slug: string().optional(),
  options: custom<Omit<Prisma.BookFindUniqueArgs, "where">>().optional(),
  where: custom<Prisma.BookFindUniqueArgs["where"]>().optional(),
});

export const getSingleBook_query = cache(
  withPublicQuery(schema, async function (params) {
    const { slug, options, where } = params ?? {};

    try {
      const singleBook = await db.book.findUnique({
        ...options,
        where: {
          ...where,
          slug,
        },
      });
      return singleBook;
    } catch (error) {
      throw error;
    }
  })
);
