import Card from "~/components/common/card/Card";
import RenderRichText from "~/components/common/others/RenderRichText";
import UserInfoLink from "~/components/common/others/UserInfoLink";
import Show from "~/components/helpers/Show";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { TActivityComment } from "~/lib/types/activity.type";
import { formatDate } from "~/lib/utils/date-formatter";
import CommentCardAction from "./CommentCardAction";

export default async function CommentCard({ comment }: Props) {
  const [singleUser, sessionUser] = await Promise.all([
    getSingleUser_query({
      user_name: undefined,
      where: { id: comment?.user_ID },
      options: {
        select: { image: true, user_name: true },
      },
    }),
    getSessionUser_query({ select: { id: true } }),
  ]);
  const isOwnComment = sessionUser?.id === comment?.user_ID;

  return (
    <Card.Root>
      <Card.Content className="flex-1 p-4 text-sm space-y-3">
        <Card.Header className="flex items-center gap-2 justify-between">
          <UserInfoLink
            avatar={singleUser?.image ?? ""}
            userName={singleUser?.user_name ?? ""}
          />
          <Card.Stats asChild>
            <div className="flex items-center gap-3.5">
              <span className="block text-xs text-accent-foreground">
                {formatDate(comment?.created_at ?? "", "withTime")}
              </span>
              <Show when={isOwnComment}>
                <CommentCardAction comment={comment} />
              </Show>
            </div>
          </Card.Stats>
        </Card.Header>
        <Card.Description asChild className="text-accent-foreground">
          <RenderRichText richTextContents={comment?.content ?? ""} />
        </Card.Description>
      </Card.Content>
    </Card.Root>
  );
}

type Props = {
  comment?: TActivityComment;
};
