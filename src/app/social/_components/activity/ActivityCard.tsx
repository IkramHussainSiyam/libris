import { MessageCircle, SquareArrowOutUpRight } from "lucide-react";
import Card from "~/components/common/card/Card";
import Link from "~/components/common/others/Link";
import RenderRichText from "~/components/common/others/RenderRichText";
import UserInfoLink from "~/components/common/others/UserInfoLink";
import Show from "~/components/helpers/Show";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getActitysComments_query } from "~/lib/db/activity_comments/getActitysComments.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { routes } from "~/lib/static-data/routes";
import { TActivity } from "~/lib/types/activity.type";
import { formatDate } from "~/lib/utils/date-formatter";
import ActivityCardAction from "./ActivityCardAction";
import LikeActivity from "./LikeActivity";

export default async function ActivityCard({ activity }: Props) {
  const [sessionUser, singleUser, activityComments] = await Promise.all([
    getSessionUser_query({ select: { id: true } }),
    getSingleUser_query({
      user_name: undefined,
      where: {
        id: activity?.user_ID,
      },
      options: {
        select: { user_name: true, image: true, id: true },
      },
    }),
    getActitysComments_query({
      activity_ID: activity?.id ?? "",
      options: { select: { id: true } },
    }),
  ]);

  const isOwnActivity = sessionUser?.id === activity?.user_ID;

  return (
    <Card.Root>
      <Card.Content className={"p-4 space-y-5"}>
        <Card.Header className="flex-col items-start gap-2 justify-start sm:flex-row sm:items-center sm:justify-between">
          <UserInfoLink
            avatar={singleUser?.image ?? "https://placehold.co/24x24/png"}
            userName={singleUser?.user_name ?? "Some Alt Text"}
          />
          <Card.Stats asChild>
            <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-center">
              <Link
                href={routes.social.details(activity?.id ?? "")}
                className="flex items-center gap-1 group/like"
              >
                <span className="text-xs text-accent-foreground group-hover/like:text-secondary">
                  Direct link
                </span>
                <SquareArrowOutUpRight className="size-[14px] cursor-pointer stroke-accent-foreground group-hover/like:stroke-secondary" />
              </Link>
              <span className="text-xs text-accent-foreground">
                {formatDate(activity?.created_at ?? "", "withTime")}
              </span>
              <Show when={isOwnActivity}>
                <ActivityCardAction activity={activity} />
              </Show>
            </div>
          </Card.Stats>
        </Card.Header>
        <Card.Description asChild className="text-foreground/85 capitalize">
          <RenderRichText richTextContents={activity?.content ?? ""} />
        </Card.Description>
        <Card.Footer className="flex gap-2 justify-end">
          <div className="flex items-center gap-3">
            <LikeActivity
              activityId={activity?.id ?? ""}
              activityOwnerID={singleUser?.id ?? ""}
              current_userID={sessionUser?.id ?? ""}
              liked_by_userIDs={activity?.liked_by_userIDs ?? []}
            />

            <Link
              href={routes.social.details(activity?.id ?? "")}
              className="flex items-center gap-0.5 group/like"
            >
              <span className="text-xs text-accent-foreground group-hover/like:text-secondary">
                {activityComments.length > 99 ? "99+" : activityComments.length}
              </span>
              <MessageCircle className="size-[15px] stroke-none cursor-pointer fill-accent-foreground group-hover/like:fill-secondary" />
            </Link>
          </div>
        </Card.Footer>
      </Card.Content>
    </Card.Root>
  );
}

type Props = {
  activity: TActivity | null;
};
