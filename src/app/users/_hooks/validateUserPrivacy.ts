import { getSessionUser_query } from "~/lib/db/_config/session";
import { getAllUsers_query } from "~/lib/db/users/getAllUsers.query";
import { getUsersFollowers_query } from "~/lib/db/users/getUsersFollowers.query";

export async function validateUserPrivacy({ userName }: { userName: string }) {
  const [{ allUsers }, sessionUser] = await Promise.all([
    getAllUsers_query({
      options: {
        select: { user_name: true, account_visibility: true, id: true },
      },
    }),
    getSessionUser_query({ select: { user_name: true } }),
  ]);
  const user_ID =
    allUsers.find((user) => user.user_name === userName)?.id ?? "";
  const usersFollowers = await getUsersFollowers_query({
    user_ID,
    options: { select: { user_name: true } },
  });

  const isUserExists = allUsers.some((user) => user.user_name === userName);

  // ---------------------------------------------------
  // only session user & follower can view the profile
  // ---------------------------------------------------
  // 👇 check if user's account private or not
  const isPrivateAccount = allUsers.some(
    (user) =>
      user.user_name === userName && user.account_visibility === "private"
  );
  // 👇 check if it's not his own profile
  const isNotOwnProfile = sessionUser?.user_name !== userName;
  // 👇 check if session user is following the user
  const isCurrentUserFollower = usersFollowers?.some(
    (follower) => follower.user_name === sessionUser?.user_name
  );
  const isShowPrivacyWarning =
    isPrivateAccount && isNotOwnProfile && !isCurrentUserFollower;

  return {
    isUserExists,
    isShowPrivacyWarning,
  };
}
