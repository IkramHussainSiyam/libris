import ActivityCard from "~/app/social/_components/activity/ActivityCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllActivities_query } from "~/lib/db/activity_comments/getAllActivities.query";

export default async function UserActivities({
  singleUser_ID,
}: {
  singleUser_ID: string;
}) {
  const userActivities = await getAllActivities_query({
    where: { user_ID: singleUser_ID },
    take: 5,
  });

  return (
    <If
      condition={userActivities.length > 0}
      then={
        <For
          each={userActivities}
          render={(activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          )}
        />
      }
      otherwise={
        <EmptyMessage variant="light">No activities found.</EmptyMessage>
      }
    />
  );
}
