"use client";

import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import Dock from "~/components/ui/dock";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { TUser } from "~/lib/types/user.type";

export default function MobileNavDock({
  sessionUser,
}: {
  sessionUser: TUser | null;
}) {
  return (
    <Popover>
      <div className="lg:hidden fixed z-[999] bottom-4 right-4">
        <PopoverContent align="end" className="p-0 border-none w-fit">
          <Dock sessionUser={sessionUser} />
        </PopoverContent>
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
