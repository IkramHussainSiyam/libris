"use client";

import { Heart } from "lucide-react";
import { useLikeActivity } from "../../_hooks/useLikeActivity";

export default function LikeActivity({
  activityId,
  current_userID,
  activityOwnerID,
  liked_by_userIDs,
}: Props) {
  const { handleLikeToggle, isPending, optimisticLiked } = useLikeActivity({
    activityId,
    current_userID,
    activityOwnerID,
    liked_by_userIDs,
  });

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isPending}
      data-liked={optimisticLiked}
      className="flex items-center gap-0.5 group/like"
    >
      <span className="text-xs text-accent-foreground group-hover/like:text-destructive group-data-[liked=true]/like:text-destructive">
        {liked_by_userIDs && liked_by_userIDs?.length > 99
          ? "99+"
          : liked_by_userIDs?.length}
      </span>
      <Heart className="size-[15px] stroke-none cursor-pointer fill-accent-foreground group-hover/like:fill-destructive group-data-[liked=true]/like:fill-destructive" />
    </button>
  );
}

type Props = {
  activityId: string | undefined;
  activityOwnerID: string;
  current_userID: string | undefined;
  liked_by_userIDs: string[] | undefined;
};
