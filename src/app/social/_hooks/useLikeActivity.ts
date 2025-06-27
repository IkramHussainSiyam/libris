import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import {
  likeActivity_action,
  unlikeActivity_action,
} from "~/lib/db/activity_comments/toggleLikeActivity.action";

export function useLikeActivity({
  activityId,
  current_userID,
  activityOwnerID,
  liked_by_userIDs,
}: Params) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    liked_by_userIDs?.includes(current_userID ?? "")
  );
  const route = useRouter();

  function handleLikeToggle() {
    setOptimisticLiked(!optimisticLiked);

    startTransition(async () => {
      if (optimisticLiked) {
        const res = await unlikeActivity_action({
          activity_ID: activityId ?? "",
          liked_by_userIDs: liked_by_userIDs ?? [],
        });

        if (res.success) {
          toast.success("unliked activity successfully");
        } else {
          setOptimisticLiked(!optimisticLiked);
          toast.error(res.error as string);
          console.error(res.error);
        }
      } else {
        const res = await likeActivity_action({
          activityOwnerID,
          activity_ID: activityId ?? "",
        });

        if (res.success) {
          toast.success("liked activity successfully");
        } else {
          setOptimisticLiked(!optimisticLiked);
          toast.error(res.error as string);
          console.error(res.error);
        }
      }

      route.refresh();
    });
  }

  return { handleLikeToggle, isPending, optimisticLiked };
}

type Params = {
  activityId: string | undefined;
  activityOwnerID: string;
  current_userID: string | undefined;
  liked_by_userIDs: string[] | undefined;
};
