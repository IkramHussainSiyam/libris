import ActivityCard from "~/app/social/_components/activity/ActivityCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllActivities_query } from "~/lib/db/activity_comments/getAllActivities.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";

export default async function UserProfileSocialActivitiesPage({
  params,
}: {
  params: { userName: string };
}) {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { id: true } },
  });
  const allActivites = await getAllActivities_query({
    where: { user_ID: singleUser?.id },
  });

  return (
    <If
      condition={allActivites.length > 0}
      then={
        <div className="grid grid-cols-1 max-h-full scroll-area">
          <For
            each={allActivites}
            render={(activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            )}
          />
        </div>
      }
      otherwise={<EmptyMessage variant="light">No activities</EmptyMessage>}
    />
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Activities - Social",
    openGraph: {
      title: "Activities - Social",
      url: `https://libris.up.railway.app/users/${params.userName}/social/activities`,
    },
  };
}
