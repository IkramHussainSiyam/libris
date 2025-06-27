import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import Container from "~/components/common/others/Container";
import Show from "~/components/helpers/Show";
import { isAdmin } from "~/lib/db/_config/main";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { TUser } from "~/lib/types/user.type";
import FollowButton from "./FollowButton";

export default async function UserMetadata({
  user_name,
}: {
  user_name: TUser["user_name"];
}) {
  const [singleUser, sessionUser] = await Promise.all([
    getSingleUser_query({ user_name: user_name ?? "" }),
    getSessionUser_query(),
  ]);

  // check if user in his own profile
  const isSessionUsersProfile = sessionUser?.email === singleUser?.email;

  return (
    <div className="w-full h-36 md:h-72 bg-deep-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 size-full z-10">
        <Image
          className="size-full object-cover select-none pointer-events-none"
          src={singleUser?.banner ?? "https://placehold.co/1000x256/png"}
          alt={"user banner"}
          width={1000}
          height={256}
        />
        <div className="absolute top-0 left-0 size-full bg-gradient-to-b from-transparent to-deep-gray/80"></div>
      </div>
      <div className="absolute size-full bottom-0 left-0 z-20">
        <Container className="flex flex-col justify-end my-0 md:my-0 h-full">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-end gap-2 md:gap-6 flex-1">
              <Image
                className="size-20 md:size-40 rounded-none text-5xl object-cover select-none pointer-events-none"
                src={singleUser?.image ?? "https://placehold.co/80x80/png"}
                alt={singleUser?.user_name ?? "Some Alt Text"}
                width={80}
                height={80}
                sizes="(min-width: 768px) 160px"
              />
              <div className="flex-1 flex items-center gap-2.5 pb-4 [&_svg]:text-primary-foreground [&_svg]:size-5">
                <h1 className="text-sm font-semibold md:font-normal md:text-2xl line-clamp-1 md:line-clamp-none text-primary-foreground">
                  {singleUser?.user_name}
                </h1>
                <Show when={isAdmin(singleUser?.email ?? "")}>
                  <MdAdminPanelSettings />
                </Show>
              </div>
            </div>
            <Show when={sessionUser !== null && !isSessionUsersProfile}>
              <FollowButton
                following_ID={singleUser?.id ?? ""}
                currentUser_following_IDs={sessionUser?.following_IDs ?? []}
              />
            </Show>
          </div>
        </Container>
      </div>
    </div>
  );
}
