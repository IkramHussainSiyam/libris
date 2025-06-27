"use server";
import { string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { reviewSchema } from "~/lib/types/review.type";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = reviewSchema.extend({
  book_ID: string(),
});

export const writeReview_action = withUserAction(
  schema,
  async function (user, params) {
    const { book_ID, content, score } = params ?? {};

    try {
      const createdReview = await db.review.create({
        data: {
          user_ID: user.id,
          book_ID: book_ID ?? "",

          content: content ?? "",
          score: score ?? 0,
        },
      });

      revalidatePaths([
        [routes.review.list],
        ["/src/app/reviews/[reviewId]", "page"],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/book/[bookSlug]/reviews", "page"],
      ]);

      return { success: true, data: createdReview };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
