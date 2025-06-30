"use client";

import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import Dock from "~/components/ui/dock";
import { Popover, PopoverTrigger } from "~/components/ui/popover";
import { TNotification } from "~/lib/types/notification.type";
import { TUser } from "~/lib/types/user.type";

export default function MobileNavDock({
  sessionUser,
  notifications,
}: {
  sessionUser: TUser | null;
  notifications: TNotification[] | null;
}) {
  return (
    <Popover>
      <div className="lg:hidden fixed z-[999] bottom-4 right-4">
        <Dock sessionUser={sessionUser} notifications={notifications} />

        <div className="mt-[30px] grid place-items-center shadow-xl">
          <Button
            asChild
            className="group/trigger [&_svg]:size-6 h-9 px-2 rounded-none"
          >
            <PopoverTrigger>
              <Menu className="group-data-[state=open]/trigger:hidden" />
              <X className="hidden group-data-[state=open]/trigger:block" />
            </PopoverTrigger>
          </Button>
        </div>
      </div>
    </Popover>
  );
}
