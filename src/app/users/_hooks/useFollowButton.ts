import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import {
  followUser_action,
  unfollowUser_action,
} from "~/lib/db/users/toggleFollowUser.action";

export function useFollowButton({
  following_ID,
  currentUser_following_IDs,
}: {
  following_ID: string;
  currentUser_following_IDs: string[];
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticFollowing, setOptimisticFollowing] = useOptimistic(
    currentUser_following_IDs.includes(following_ID)
  );

  const route = useRouter();

  function handleFollowButton() {
    setOptimisticFollowing(!optimisticFollowing);

    startTransition(async () => {
      if (optimisticFollowing) {
        const res = await unfollowUser_action({
          following_ID,
        });

        if (res.success) {
          toast.success("Unfollowed successfully");
        } else {
          toast.error(res.error as string);
          setOptimisticFollowing(optimisticFollowing);
        }
      } else {
        const res = await followUser_action({ following_ID });

        if (res.success) {
          toast.success("Followed successfully");
        } else {
          toast.error(res.error as string);
          setOptimisticFollowing(optimisticFollowing);
        }
      }

      route.refresh();
    });
  }

  return { optimisticFollowing, handleFollowButton, isPending };
}
