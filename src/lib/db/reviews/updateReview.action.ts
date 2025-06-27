"use server";
import { string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { reviewSchema } from "~/lib/types/review.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = reviewSchema.extend({
  reviewId: string(),
  book_ID: string(),
});

export const updateReview_action = withUserAction(
  schema,
  async function (user, params) {
    const { reviewId, book_ID, content, score } = params ?? {};

    try {
      const updatedReview = await db.review.update({
        where: {
          id: reviewId,
        },
        data: {
          user_ID: user.id,
          book_ID,
          content,
          score,
        },
      });

      revalidatePaths([
        [routes.review.list],
        ["/src/app/reviews/[reviewId]", "page"],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/book/[bookSlug]/reviews", "page"],
      ]);

      return { success: true, data: updatedReview };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
