import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  reviewId: string(),
  options: custom<Omit<Prisma.ReviewFindUniqueArgs, "where">>().optional(),
  where: custom<Prisma.ReviewFindUniqueArgs["where"]>().optional(),
});

export const getSingleReview_query = cache(
  withPublicQuery(schema, async function (params) {
    const { reviewId, options, where } = params ?? {};

    try {
      const singleReview = await db.review.findUnique({
        ...options,
        where: {
          ...where,
          id: reviewId,
        },
      });

      return { singleReview };
    } catch (error) {
      throw error;
    }
  })
);
