import Container from "~/components/common/others/Container";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import Show from "~/components/helpers/Show";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getActitysComments_query } from "~/lib/db/activity_comments/getActitysComments.query";
import { getAllActivities_query } from "~/lib/db/activity_comments/getAllActivities.query";
import { getSingleActivity_query } from "~/lib/db/activity_comments/getSingleActivity.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import ActivityCard from "../_components/activity/ActivityCard";
import CommentCard from "./_components/CommentCard";
import CommentWriter from "./_components/CommentWriter";

export default async function SocialPage({
  params,
}: {
  params: { socialId: string };
}) {
  await validateParam(getAllActivities_query, "id", params, "socialId");

  const [sessionUser, singleActivity, activitysComments] = await Promise.all([
    getSessionUser_query({ select: { id: true } }),
    getSingleActivity_query({ id: params.socialId }),
    getActitysComments_query({
      activity_ID: params.socialId,
    }),
  ]);

  return (
    <Container className="space-y-4">
      <ActivityCard activity={singleActivity} />
      <div className="px-6 space-y-4">
        <Show when={sessionUser !== null}>
          <CommentWriter activity={singleActivity} />
        </Show>

        <div className="space-y-3">
          <h4 className="text-accent-foreground px-0.5 font-medium">
            Comments
          </h4>
          <If
            condition={activitysComments.length > 0}
            then={
              <For
                each={activitysComments}
                render={(comment) => (
                  <CommentCard key={comment?.id} comment={comment} />
                )}
              />
            }
            otherwise={
              <EmptyMessage variant="light">No comments found</EmptyMessage>
            }
          />
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { socialId: string };
}) {
  await validateParam(getAllActivities_query, "id", params, "socialId");

  const activity = await getSingleActivity_query({
    id: params.socialId,
    options: { select: { user_ID: true } },
  });
  const activityOwner = await getSingleUser_query({
    user_name: undefined,
    where: {
      id: activity?.user_ID,
    },
    options: {
      select: { user_name: true, image: true },
    },
  });

  return {
    title: `${activityOwner?.user_name}'s Activity Post`,
    openGraph: {
      title: "Social Activities",
      url: `https://libris.vercel.app/social/${params.socialId}`,
      images: activityOwner?.image ?? "https://placehold.co/64x64/png",
    },
  };
}
