"use client";

import { usePathname } from "next/navigation";
import Link from "~/components/common/others/Link";
import For from "~/components/helpers/For";
import { cn } from "~/lib/utils/utils";

export default function Sidebar({ links, heading }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="space-y-2 text-sm">
      <h1 className="text-accent-foreground font-semibold text-[13px]">
        {heading}
      </h1>
      <ul className="space-y-2">
        <For
          each={links}
          render={(link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "block px-2 py-1 text-accent-foreground",
                isActive(link.href) &&
                  "bg-light dark:bg-muted text-accent-foreground"
              )}
            >
              <li>{link.name}</li>
            </Link>
          )}
        />
      </ul>
    </div>
  );
}

export type SidebarLinks = {
  id: number | string;
  name: string;
  href: string;
};

type SidebarProps = {
  links: SidebarLinks[];
  heading: string;
};
