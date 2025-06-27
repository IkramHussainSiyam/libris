import Image from "next/image";
import Link from "~/components/common/others/Link";
import Overlay from "~/components/common/others/overlay";
import RenderRichText from "~/components/common/others/RenderRichText";
import Show from "~/components/helpers/Show";
import { routes } from "~/lib/static-data/routes";
import { TUser } from "~/lib/types/user.type";
import FollowButton from "./FollowButton";

export default async function UserCard({
  user,
  sessionUser,
}: {
  user: TUser;
  sessionUser: TUser | null;
}) {
  return (
    <div className="min-w-72 bg-light dark:bg-muted">
      <div className="relative">
        <div className="w-full h-32 pointer-events-none select-none overflow-hidden">
          <Image
            className="size-full object-cover"
            src={user.banner ?? ""}
            alt={user.user_name ?? ""}
            width={1000}
            height={256}
          ></Image>
        </div>
        <Overlay className="z-10 bg-black/10 flex items-end select-text pointer-events-auto">
          <div className="size-16 absolute -bottom-3 left-3 z-20 shadow-lg">
            <Image
              className="size-full object-cover"
              src={user.image ?? ""}
              alt={user.user_name ?? ""}
              width={80}
              height={115}
            ></Image>
          </div>
          <div className="flex items-end gap-8 justify-between w-full pl-[85px] pr-3 pb-2 h-16 bg-gradient-to-b from-transparent to-black">
            <Link
              href={routes.user.profile(user.user_name ?? "")}
              className="link text-primary-foreground line-clamp-2"
            >
              {user.user_name}
            </Link>
            <div className="flex items-center gap-3">
              <Show when={sessionUser !== null}>
                <FollowButton
                  size={"sm"}
                  className="h-6 px-2"
                  containerClassName="pb-0"
                  following_ID={user?.id ?? ""}
                  currentUser_following_IDs={sessionUser?.following_IDs ?? []}
                />
              </Show>
            </div>
          </div>
        </Overlay>
      </div>
      <div className="pt-8 pb-3 px-3">
        <RenderRichText
          className="line-clamp [--clamp:4]"
          richTextContents={user.bio ?? ""}
        />
      </div>
    </div>
  );
}
