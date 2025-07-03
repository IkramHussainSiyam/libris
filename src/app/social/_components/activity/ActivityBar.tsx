import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getAllActivities_query } from "~/lib/db/activity_comments/getAllActivities.query";
import { getGeneralSettings_query } from "~/lib/db/settings/getGeneralSettings.query";
import { getUsersFollowings_query } from "~/lib/db/users/getUsersFollowings.query";
import { TActivity } from "~/lib/types/activity.type";
import ActivityBarHeader from "./ActivityBarHeader";
import ActivityCard from "./ActivityCard";

export default async function ActivityBar() {
  const sessionUser = await getSessionUser_query({
    select: { user_name: true, id: true },
  });
  const [activities, settings, usersFollowings] = await Promise.all([
    getAllActivities_query({
      orderBy: { updated_at: "desc" },
    }),
    getGeneralSettings_query({
      options: { select: { default_feed_tab: true } },
    }),
    getUsersFollowings_query({
      singeUser_username: sessionUser?.user_name ?? "",
      options: { select: { id: true } },
    }),
  ]);

  let allActivites: TActivity[] = [];

  if (settings?.default_feed_tab === "following") {
    // show only logged user's own status or poeple logged user following
    allActivites = activities.filter((activity) => {
      return (
        usersFollowings.some(
          (followingUser) => activity.user_ID === followingUser.id // following people's activities
        ) || activity.user_ID === sessionUser?.id // AND own activities
      );
    });
  } else {
    allActivites = activities;
  }

  return (
    <div className="flex-1">
      <ActivityBarHeader
        feedTab={settings?.default_feed_tab}
        sessionUser={sessionUser}
      />

      <If
        condition={allActivites.length > 0}
        then={
          <div className="space-y-4 mt-6">
            <For
              each={allActivites}
              render={(activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              )}
            />
          </div>
        }
        otherwise={
          <EmptyMessage className="bg-light dark:bg-muted py-12 mt-6">
            No activity found.
          </EmptyMessage>
        }
      />
    </div>
  );
}
