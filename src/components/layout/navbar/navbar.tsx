import { Bell } from "lucide-react";
import Link from "~/components/common/others/Link";
import If from "~/components/helpers/If";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { getSessionUser_query } from "~/lib/db/_config/session";

import { getUsersNotifications_query } from "~/lib/db/notifications/getUsersNotifications.query";
import { routes } from "~/lib/static-data/routes";
import Logo from "./logo";
import MobileNavDock from "./mobile-nav-dock";
import NavMenu from "./nav-menu";
import UserAvatar from "./UserAvatar";

export default async function Navbar() {
  const [sessionUser, notifications] = await Promise.all([
    getSessionUser_query(),
    getUsersNotifications_query({ where: { isRead: false } }),
  ]);
  const isLoggedIn = sessionUser !== null;

  return (
    <>
      <header className="hidden lg:block sticky inset-0 z-[99] bg-muted">
        <nav className="h-20 flex items-center justify-between container">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu />
          <If
            condition={isLoggedIn}
            then={
              <div className="flex items-center gap-5">
                <Link href={routes.notifications} className="block relative">
                  <Bell className="stroke-primary-foreground/80 size-5" />
                  <Show
                    when={
                      notifications !== null &&
                      notifications?.filter((n) => !n.isRead).length > 0
                    }
                  >
                    <div className="absolute -top-1 -right-0.5 size-2 rounded-full bg-destructive" />
                  </Show>
                </Link>
                <UserAvatar />
              </div>
            }
            otherwise={
              <div className="flex items-center gap-6 nav-menu">
                <Link href={routes.auth.login}>Login</Link>
                <Link href={routes.auth.signup}>
                  <Button size={"sm"}>Join Now</Button>
                </Link>
              </div>
            }
          />
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileNavDock sessionUser={sessionUser} />
    </>
  );
}
