import { Slot, Slottable } from "@radix-ui/react-slot";
import { LogIn, Settings, User, UserPlus } from "lucide-react";
import { navlinks } from "~/lib/static-data/general";
import { routes } from "~/lib/static-data/routes";
import { TUser } from "~/lib/types/user.type";
import { cn } from "~/lib/utils/utils";
import Link from "../common/others/Link";
import For from "../helpers/For";
import If from "../helpers/If";

const Dock = ({ sessionUser }: { sessionUser: TUser | null }) => {
  return (
    <div className="bg-light dark:bg-muted shadow-xl px-2 py-4 grid grid-cols-3 gap-4 dock-menu">
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
      <For
        each={navlinks.filter((link) => link.icon)}
        render={(link) => (
          <DockIcon key={link.id} href={link.href} name={link.name}>
            {link.icon}
          </DockIcon>
        )}
      />
    </div>
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
        "size-14 [&_svg]:size-7 text-[11px] text-accent-foreground hover:text-primary dark:hover:text-secondary grid place-items-center",
        className
      )}
    >
      <Slottable>{children}</Slottable>
      {name ? <span className="inline-block">{name}</span> : null}
    </Comp>
  );
};
