import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import {
  likeReview_action,
  unlikeReview_action,
} from "~/lib/db/reviews/toggleReviewLike.action";

import { TReview } from "~/lib/types/review.type";

export function useReviewReaction({
  review,
  userId,
}: {
  review: TReview;
  userId: string;
}) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    review?.liked_by_userIDs.includes(userId)
  );

  function handleLikeButton() {
    setOptimisticLiked(!optimisticLiked);
    startTransition(async () => {
      if (optimisticLiked) {
        const res = await unlikeReview_action({
          reviewId: review?.id ?? "",
          liked_by_userIDs: review?.liked_by_userIDs ?? [],
        });

        if (res.success) {
          toast.success("Unliked review successfully");
        } else {
          toast.error(res.error as string);
          console.error(res.error);
          setOptimisticLiked(!optimisticLiked);
        }
      } else {
        const res = await likeReview_action({
          reviewId: review?.id ?? "",
          reviewOwner_ID: review?.user_ID ?? "",
        });

        if (res.success) {
          toast.success("Liked review successfully");
        } else {
          toast.error(res.error as string);
          console.error(res.error);
          setOptimisticLiked(!optimisticLiked);
        }
      }

      route.refresh();
    });
  }

  return {
    isPending,
    handleLikeButton,
    optimisticLiked,
  };
}
