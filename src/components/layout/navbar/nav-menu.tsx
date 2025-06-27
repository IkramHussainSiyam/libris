import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "~/components/common/others/Link";
import For from "~/components/helpers/For";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { navlinks } from "~/lib/static-data/general";

export default function NavMenu(props: NavigationMenuProps) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="nav-menu gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <For
          each={navlinks}
          render={(link) => (
            <NavigationMenuItem key={link.id}>
              <Link href={link.href}>{link.name}</Link>
            </NavigationMenuItem>
          )}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
