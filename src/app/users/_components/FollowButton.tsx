"use client";
import { Button } from "~/components/ui/button";
import Tooltip from "~/components/ui/tooltip";
import { cn } from "~/lib/utils/utils";
import { useFollowButton } from "../_hooks/useFollowButton";

export default function FollowButton({
  currentUser_following_IDs,
  following_ID,
  className,
  containerClassName,
  ...props
}: Props) {
  const { optimisticFollowing, handleFollowButton, isPending } =
    useFollowButton({
      currentUser_following_IDs,
      following_ID,
    });

  return (
    <div className={cn("pb-4", containerClassName)}>
      <Tooltip
        content={optimisticFollowing ? "Unfollow" : "Follow"}
        delayDuration={100}
      >
        <Button
          {...props}
          className={cn(
            optimisticFollowing
              ? "bg-green-600 hover:bg-green-600/80"
              : "bg-primary hover:bg-primary/80",
            className
          )}
          size="sm"
          onClick={handleFollowButton}
          disabled={isPending}
        >
          {optimisticFollowing ? "Following" : "Follow"}
        </Button>
      </Tooltip>
    </div>
  );
}

type Props = {
  following_ID: string;
  currentUser_following_IDs: string[];
  className?: string;
  containerClassName?: string;
} & React.ComponentProps<typeof Button>;
