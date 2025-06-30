import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  BookMarked,
  Home,
  LogIn,
  Settings,
  ShieldUser,
  User,
  UserPlus,
} from "lucide-react";
import { isAdmin } from "~/lib/db/_config/main";
import { navlinks } from "~/lib/static-data/general";
import { routes } from "~/lib/static-data/routes";
import { TNotification } from "~/lib/types/notification.type";
import { TUser } from "~/lib/types/user.type";
import { cn } from "~/lib/utils/utils";
import Link from "../common/others/Link";
import For from "../helpers/For";
import If from "../helpers/If";
import Show from "../helpers/Show";
import LogoutButton from "../layout/navbar/LogoutButton";
import NotificationLink from "../layout/navbar/notification-link";
import { PopoverContent } from "./popover";

const Dock = ({
  sessionUser,
  notifications,
}: {
  sessionUser: TUser | null;
  notifications: TNotification[] | null;
}) => {
  const isCurrentUserAdmin = isAdmin(sessionUser?.email ?? "");

  return (
    <PopoverContent align="end" className="p-0 border-none w-80">
      <div className="bg-light dark:bg-muted shadow-xl px-2 py-4 grid grid-cols-4 gap-4 dock-menu">
        <For
          each={navlinks.filter((link) => link.icon)}
          render={(link) => (
            <DockIcon key={link.id} href={link.href} name={link.name}>
              {link.icon}
            </DockIcon>
          )}
        />
        <If
          condition={sessionUser !== null}
          then={
            <>
              <DockIcon
                href={routes.user.profile(sessionUser?.user_name ?? "")}
                name={"Profile"}
              >
                <User />
              </DockIcon>
              <DockIcon href={routes.settings.general} name={"Settings"}>
                <Settings />
              </DockIcon>
              <DockIcon
                href={routes.user.booklist.reading(
                  sessionUser?.user_name ?? ""
                )}
                name={"Book List"}
              >
                <BookMarked />
              </DockIcon>
              <Show when={isCurrentUserAdmin}>
                <DockIcon href={routes.admin.users} name={"Admin Panel"}>
                  <ShieldUser />
                </DockIcon>
              </Show>
              <DockIcon href={routes.notifications} name={"Notifications"}>
                <NotificationLink notifications={notifications} />
              </DockIcon>
              <DockIcon href={routes.home} name={"Home"}>
                <Home />
              </DockIcon>
              <DockIcon name={"Settings"}>
                <LogoutButton />
              </DockIcon>
            </>
          }
          otherwise={
            <>
              <DockIcon href={routes.auth.signup} name={"Signup"}>
                <UserPlus />
              </DockIcon>
              <DockIcon href={routes.auth.login} name={"Login"}>
                <LogIn />
              </DockIcon>
            </>
          }
        />
      </div>
    </PopoverContent>
  );
};

export default Dock;

export const DockIcon = ({
  name,
  children,
  className,
  href,
  asChild = false,
}: {
  name?: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      href={href || "#"}
      className={cn(
        "size-14 [&_svg]:size-7 text-[11px] text-center text-accent-foreground active:text-primary dark:hover:text-secondary grid place-items-center",
        className
      )}
    >
      <Slottable>{children}</Slottable>
      {name ? <span className="inline-block">{name}</span> : null}
    </Comp>
  );
};
