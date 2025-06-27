import UserBookStats from "~/app/book/_components/UserBookStats";
import RenderRichText from "~/components/common/others/RenderRichText";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import UserActivities from "../_components/UserActivities";
import UserFavoriteBooks from "../_components/UserFavoriteBooks";

export default async function UserProfileOverviewPage({
  params,
}: {
  params: { userName: string };
}) {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { bio: true, id: true, user_name: true } },
  });

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full sm:w-2/6 lg:w-2/6 space-y-6">
        <div className="space-y-3">
          <h4 className="ml-4 text-accent-foreground font-medium">Bio</h4>
          <RenderRichText
            className="bg-light dark:bg-muted p-6 text-sm text-accent-foreground"
            richTextContents={singleUser?.bio ?? ""}
          />
        </div>
        <div className="space-y-3">
          <h4 className="ml-4 text-accent-foreground font-medium">
            List Overview
          </h4>
          <AsyncBoundary>
            <UserBookStats
              className="sm:grid-cols-1 lg:grid-cols-2"
              statCountText="Books"
              userName={singleUser?.user_name}
            />
          </AsyncBoundary>
        </div>
        <AsyncBoundary>
          <UserFavoriteBooks userID={singleUser?.id ?? ""} />
        </AsyncBoundary>
      </div>

      <div className="flex-1 mb-8">
        <h4 className="mb-3 ml-4 text-accent-foreground font-medium">
          Social Activities
        </h4>

        <AsyncBoundary>
          <UserActivities singleUser_ID={singleUser?.id ?? ""} />
        </AsyncBoundary>
      </div>
    </div>
  );
}
