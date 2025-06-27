import Image from "next/image";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import Link from "~/components/common/others/Link";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import Tooltip from "~/components/ui/tooltip";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { getUsersFollowers_query } from "~/lib/db/users/getUsersFollowers.query";
import { routes } from "~/lib/static-data/routes";

export default async function UserProfileSocialFollowersPage({
  params,
}: {
  params: { userName: string };
}) {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { id: true } },
  });
  const usersFollowers = await getUsersFollowers_query({
    user_ID: singleUser?.id ?? "",
  });

  return (
    <div className="flex flex-wrap items-center gap-4">
      <If
        condition={usersFollowers ? usersFollowers?.length > 0 : false}
        then={
          <For
            each={usersFollowers ?? []}
            render={(user) => (
              <Tooltip
                asChild={false}
                variant="dark"
                side="bottom"
                delayDuration={100}
                key={user.id}
                content={user.user_name}
              >
                <Link
                  href={routes.user.profile(user.user_name ?? "")}
                  className="block relative group/avatar"
                >
                  <Image
                    className="size-24 rounded-none text-2xl font-medium"
                    src={user.image ?? ""}
                    alt={user.user_name ?? ""}
                    width={96}
                    height={96}
                  />
                  <div className="absolute top-0 left-0 size-full bg-deep-gray/60 opacity-0 group-hover/avatar:opacity-100"></div>
                </Link>
              </Tooltip>
            )}
          />
        }
        otherwise={
          <EmptyMessage className="bg-light dark:bg-muted px-4 py-3 w-full">
            Nobody cares about me 😭
          </EmptyMessage>
        }
      />
    </div>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Followers - Social",
    openGraph: {
      title: "Followers - Social",
      url: `https://libris.vercel.app/users/${params.userName}/social/followers`,
    },
  };
}
