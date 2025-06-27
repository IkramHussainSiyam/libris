"use client";

import { usePathname } from "next/navigation";
import Link from "~/components/common/others/Link";
import For from "~/components/helpers/For";
import { routes } from "~/lib/static-data/routes";
import { cn } from "~/lib/utils/utils";

export default function UserNavLinks({ user_name }: { user_name: string }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const user_navlinks = [
    {
      id: 1,
      name: "Overview",
      href: routes.user.profile(user_name),
    },
    {
      id: 2,
      name: "Booklist",
      href: routes.user.booklist.reading(user_name),
    },
    {
      id: 3,
      name: "Favorites",
      href: routes.user.favorites(user_name),
    },
    {
      id: 5,
      name: "Social",
      href: routes.user.social.following(user_name),
    },
    {
      id: 6,
      name: "Reviews",
      href: routes.user.reviews(user_name),
    },
  ];

  return (
    <ul className="py-3 font-medium flex items-center justify-center text-sm [&_a]:px-8 flex-wrap gap-y-4">
      <For
        each={user_navlinks}
        render={(link) => (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              isActive(link.href)
                ? "text-primary hover:text-primary"
                : "text-accent-foreground hover:text-foreground"
            )}
          >
            <li>{link.name}</li>
          </Link>
        )}
      />
    </ul>
  );
}
