"use server";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  reviewId: string(),
});

export const deleteReview_action = withUserAction(
  schema,
  async function (_, params) {
    try {
      await db.notification.deleteMany({
        where: { review_ID: params?.reviewId },
      });

      await db.review.delete({
        where: {
          id: params?.reviewId,
        },
      });

      revalidatePaths([
        [routes.review.list],
        ["/src/app/reviews/[reviewId]", "page"],
        ["/src/app/book/[bookSlug]", "page"],
        ["/src/app/book/[bookSlug]/reviews", "page"],
      ]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
