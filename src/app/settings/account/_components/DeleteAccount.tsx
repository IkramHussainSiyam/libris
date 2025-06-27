"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { authClient } from "~/lib/auth-client";
import { deleteUserAccount_action } from "~/lib/db/settings/deleteUserAccount.action";
import { routes } from "~/lib/static-data/routes";

export default function DeleteAccount() {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleUserAccountDelete() {
    startTransition(async () => {
      const res = await deleteUserAccount_action();

      if (res.success) {
        await authClient.signOut({
          fetchOptions: {
            onSuccess() {
              route.push(routes.home);
              route.refresh();
            },
            onError(error) {
              console.error(error.error);
              toast.error(error.error.message);
            },
          },
        });
        toast.success("Account deleted successfully");
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    });
  }

  return (
    <div>
      <Dialog>
        <Button asChild variant={"destructive"} type="button">
          <DialogTrigger>Delete Account</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription className="text-accent-foreground text-base">
              This action is permanent and cannot be undone. It&apos;ll delete
              all your activities, booklist and other settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button asChild type="button">
              <DialogClose className="static opacity-100">
                Nah, I&apos;m good
              </DialogClose>
            </Button>
            <Button
              onClick={handleUserAccountDelete}
              disabled={isPending}
              variant={"destructive"}
            >
              {isPending ? "Deleting..." : "Delete anyway"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
