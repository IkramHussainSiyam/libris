import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { getSessionUser_query } from "../_config/session";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = custom<Prisma.ReviewFindManyArgs>().optional();

export const getAllReviews_query = cache(
  withPublicQuery(schema, async function (options) {
    try {
      const allReviews = await db.review.findMany({
        ...options,
        orderBy: {
          created_at: "desc",
        },
      });

      return allReviews;
    } catch (error) {
      throw error;
    }
  })
);

export async function isUserAlreadyReviewed({ bookId }: { bookId: string }) {
  const [allReviews, sessionUser] = await Promise.all([
    getAllReviews_query({ select: { book_ID: true, user_ID: true } }),
    getSessionUser_query({ select: { id: true } }),
  ]);

  const isAlreadyReviewed = allReviews.some(
    (review) => review.book_ID === bookId && review.user_ID === sessionUser?.id
  );
  return { isAlreadyReviewed };
}
