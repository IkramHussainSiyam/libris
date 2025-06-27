"use server";
import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { getErrorMessage } from "~/lib/utils/error-message";
import revalidatePaths from "../_config/revalidatePaths";
import { withUserAction } from "../_config/withUserAction";
import { sendNotification_action } from "../notifications/sendNotification.action";

const schema = object({
  reviewId: string(),
  reviewOwner_ID: string(),
  liked_by_userIDs: array(string()),
});

export const likeReview_action = withUserAction(
  schema.omit({ liked_by_userIDs: true }),
  async function (user, params) {
    try {
      await db.review.update({
        where: { id: params?.reviewId },
        data: { liked_by_userIDs: { push: user.id } },
      });

      if (params?.reviewOwner_ID !== user.id) {
        const notification_res = await sendNotification_action({
          target_userID: params?.reviewOwner_ID ?? "",
          type: "like",
          review_ID: params?.reviewId,
        });

        if (!notification_res.success) {
          revalidatePaths([
            [routes.review.list],
            ["/src/app/reviews/[reviewId]", "page"],
            ["/src/app/book/[bookSlug]/reviews", "page"],
          ]);

          return {
            error: getErrorMessage(notification_res.error),
            success: false,
          };
        }
      }

      revalidatePaths([
        [routes.review.list],
        [routes.notifications],
        ["/src/app/reviews/[reviewId]", "page"],
        ["/src/app/book/[bookSlug]/reviews", "page"],
      ]);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);

export const unlikeReview_action = withUserAction(
  schema.omit({ reviewOwner_ID: true }),
  async function (user, params) {
    try {
      await db.review.update({
        where: { id: params?.reviewId },
        data: {
          liked_by_userIDs: {
            set: params?.liked_by_userIDs.filter((id) => id !== user.id),
          },
        },
      });

      revalidatePaths([
        [routes.review.list],
        ["/src/app/reviews/[reviewId]", "page"],
        ["/src/app/book/[bookSlug]/reviews", "page"],
      ]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
