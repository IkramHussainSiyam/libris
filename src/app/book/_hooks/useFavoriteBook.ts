import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";
import {
  addBookToFavorites_action,
  removeBookFromFavorites_action,
} from "~/lib/db/books/toggleFavoriteBook.action";

import { TBook } from "~/lib/types/books.type";

export function useFavoriteBook({ bookId, favored_by_user_IDs }: Params) {
  const { data } = authClient.useSession();
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    favored_by_user_IDs?.includes(data?.user.id ?? "")
  );
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  function handleFavoriteButton() {
    setOptimisticFavorite(!optimisticFavorite);

    startTransition(async () => {
      if (optimisticFavorite) {
        const res = await removeBookFromFavorites_action({
          bookId: bookId ?? "",
          currentUserId: data?.user.id ?? "",
          currentUserFavoriteBookIds: favored_by_user_IDs ?? [],
        });

        if (res.success) {
          toast.success("Removed from favorites successfully");
        } else {
          setOptimisticFavorite(!optimisticFavorite);
          toast.error(res.error as string);
        }
      } else {
        const res = await addBookToFavorites_action({
          bookId: bookId ?? "",
          currentUserId: data?.user.id ?? "",
        });

        if (res.success) {
          toast.success("Added to favorites successfully");
        } else {
          setOptimisticFavorite(!optimisticFavorite);
          toast.error(res.error as string);
        }
      }
      route.refresh();
    });
  }
  return { isPending, handleFavoriteButton, optimisticFavorite };
}

type Params = {
  bookId: TBook["id"] | undefined;
  favored_by_user_IDs: TBook["favored_by_user_IDs"] | undefined;
};
