"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Spinner from "~/components/common/submit/spinner";
import If from "~/components/helpers/If";
import { authClient } from "~/lib/auth-client";
import { routes } from "~/lib/static-data/routes";

export default function LogoutButton() {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogoutUser() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            route.push(routes.home);
            toast.success("Logged out successfully");
            route.refresh();
          },
          onError(error) {
            console.error(error.error);
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleLogoutUser}
      type="submit"
      className="text-accent-foreground hover:text-foreground text-sm [&_svg]:size-4"
    >
      <If condition={isPending} then={<Spinner />} otherwise={<LogOut />} />
    </button>
  );
}
