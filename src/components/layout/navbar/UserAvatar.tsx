import { BookMarked, Settings2, ShieldUser, User } from "lucide-react";
import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "~/components/common/others/Link";
import Show from "~/components/helpers/Show";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { isAdmin } from "~/lib/db/_config/main";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { routes } from "~/lib/static-data/routes";
import LogoutButton from "./LogoutButton";

export default async function UserAvatar() {
  const sessionUser = await getSessionUser_query();

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="size-8 object-cover aspect-square rounded-full"
          width={32}
          height={32}
          src={sessionUser?.image as string}
          alt={sessionUser?.user_name as string}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={4}
        className="rounded-sm px-0 pt-2.5 pb-0"
      >
        <ul>
          <li>
            <PopoverClose asChild>
              <Link
                href={routes.user.profile(sessionUser?.user_name ?? "")}
                className="text-accent-foreground hover:text-foreground text-sm [&_svg]:size-4 flex items-center gap-2 px-3.5 py-2 hover:bg-accent"
              >
                <User /> Profile
              </Link>
            </PopoverClose>
          </li>
          <li>
            <PopoverClose asChild>
              <Link
                href={`${routes.user.profile(
                  sessionUser?.user_name as string
                )}/booklist`}
                className="text-accent-foreground hover:text-foreground text-sm [&_svg]:size-4 flex items-center gap-2 px-3.5 py-2 hover:bg-accent"
              >
                <BookMarked /> Book List
              </Link>
            </PopoverClose>
          </li>
          <li>
            <PopoverClose asChild>
              <Link
                href={routes.settings.general}
                className="text-accent-foreground hover:text-foreground text-sm [&_svg]:size-4 flex items-center gap-2 px-3.5 py-2 hover:bg-accent"
              >
                <Settings2 /> Settings
              </Link>
            </PopoverClose>
          </li>
          <Show when={isAdmin(sessionUser?.email as string)}>
            <li>
              <PopoverClose asChild>
                <Link
                  href={routes.admin.users}
                  className="text-accent-foreground hover:text-foreground text-sm [&_svg]:size-4 flex items-center gap-2 px-3.5 py-2 hover:bg-accent"
                >
                  <ShieldUser /> Admin Panel
                </Link>
              </PopoverClose>
            </li>
          </Show>
        </ul>
        <div className="border-t px-3.5 py-4 mt-2 flex items-center gap-2 justify-between">
          <div className="space-y-0.5">
            <h6 className="line-clamp-1 text-sm font-semibold [&_svg]:size-[14px] [&_svg]:text-primary flex items-center gap-1">
              {sessionUser?.user_name}{" "}
              <Show when={isAdmin(sessionUser?.email as string)}>
                <MdAdminPanelSettings />
              </Show>
            </h6>
            <p className="text-xs text-accent-foreground">
              {sessionUser?.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
