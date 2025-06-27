"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "~/components/common/others/Link";
import { routes } from "~/lib/static-data/routes";
import { cn } from "~/lib/utils/utils";

export default function HeaderLinks() {
  const param = useParams();
  const pathname = usePathname();

  const currentBookSlug = param.bookSlug as string;
  const isPathnameIndex = pathname === routes.bookInfo.details(currentBookSlug);
  const isPathnameReviews =
    pathname === routes.bookInfo.reviews(currentBookSlug);

  const isConditionMet = (condition: boolean) =>
    condition ? "active-link" : "text-accent-foreground hover:text-foreground";

  return (
    <div className="mt-5 flex items-center gap-7 lg:gap-12 [&_a]:h-8 [&_a]:grid [&_a]:place-items-center [&_a]:text-sm">
      <Link
        href={routes.bookInfo.details(currentBookSlug)}
        className={cn(isConditionMet(isPathnameIndex), "link")}
      >
        Overview
      </Link>
      <Link
        href={routes.bookInfo.reviews(currentBookSlug)}
        className={cn(isConditionMet(isPathnameReviews), "link")}
      >
        Reviews
      </Link>
    </div>
  );
}
