"use client";

import { ThumbsUp } from "lucide-react";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { TReview } from "~/lib/types/review.type";
import { cn } from "~/lib/utils/utils";
import { useReviewReaction } from "../_hooks/useReviewReaction";

export default function ReviewAction({ review, userId, isOwnReview }: Props) {
  const { isPending, handleLikeButton, optimisticLiked } = useReviewReaction({
    review,
    userId,
  });

  return (
    <div className="mt-4 grid place-items-center sm:w-1/2 py-6 mx-auto bg-light dark:bg-muted">
      <div className="flex gap-2">
        <Show when={!isOwnReview && userId !== undefined}>
          <Button
            disabled={isPending}
            onClick={handleLikeButton}
            size={"icon"}
            className={cn(
              "shadow-none bg-transparent hover:bg-transparent [&_svg]:size-8 [&_svg]:stroke-green-600 [&_svg]:hover:fill-green-600/20 size-auto",
              optimisticLiked &&
                "[&_svg]:stroke-none [&_svg]:fill-green-600 [&_svg]:hover:fill-green-600/80"
            )}
          >
            <ThumbsUp />
          </Button>
        </Show>
        <div className="space-y-0.5">
          <h5 className="text-sm">Did you find this review helpful?</h5>
          <p className="text-foreground/80 text-xs">
            {review && review?.liked_by_userIDs.length < 9999
              ? review?.liked_by_userIDs.length
              : "9999+"}{" "}
            users also found this review helpful
          </p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  review: TReview;
  userId: string;
  isOwnReview: boolean;
};
