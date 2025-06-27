import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  bookId: string(),
  options: custom<Omit<Prisma.ReviewFindFirstArgs, "where">>().optional(),
  where: custom<Prisma.ReviewFindFirstArgs["where"]>().optional(),
});

export const getCurrentBooksReview_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const { bookId, options, where } = params ?? {};

      const currentBooksReview = await db.review.findFirst({
        ...options,
        where: {
          ...where,
          book_ID: bookId,
        },
      });

      return { currentBooksReview };
    } catch (error) {
      throw error;
    }
  })
);
