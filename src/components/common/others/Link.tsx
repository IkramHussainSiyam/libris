"use client";
import NextLink, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils/utils";

export default function Link(
  props: LinkProps &
    React.HtmlHTMLAttributes<HTMLAnchorElement> & {
      exact?: boolean;
    }
) {
  const pathname = usePathname();

  const isActive = props.exact
    ? pathname === props.href
    : pathname.startsWith(props.href as string) && props.href !== "/";

  return (
    <NextLink
      {...props}
      className={cn(isActive && "active", props.className)}
      prefetch
    >
      {props.children}
    </NextLink>
  );
}
