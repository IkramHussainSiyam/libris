"use server";
import { revalidatePath } from "next/cache";
import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import { withUserAction } from "../_config/withUserAction";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  /**
   * 🌟 user who clicked the favorite button
   */
  currentUserId: string(),
  /**
   * 🌟 book which is being saved to favorites.
   */
  bookId: string(),
  /**
   * 🌟 current user's favorite book ids
   */
  currentUserFavoriteBookIds: array(string()),
});

export const addBookToFavorites_action = withUserAction(
  schema.omit({ currentUserFavoriteBookIds: true }),
  async function (_, params) {
    const { currentUserId, bookId } = params ?? {};

    try {
      await db.book.update({
        where: { id: bookId },
        data: {
          favored_by_user_IDs: {
            push: currentUserId,
          },
        },
      });

      revalidatePath(routes.admin.books.list);
      revalidatePath(routes.explore);
      revalidatePath("/src/app/book/[bookSlug]", "page");
      revalidatePath("/src/app/admin/books/[bookId]", "page");
      revalidatePath(routes.admin.subjects);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);

export const removeBookFromFavorites_action = withUserAction(
  schema,
  async function (_, params) {
    const { currentUserId, bookId, currentUserFavoriteBookIds } = params ?? {};

    try {
      await db.book.update({
        where: { id: bookId },
        data: {
          favored_by_user_IDs: {
            set: currentUserFavoriteBookIds?.filter(
              (id) => id !== currentUserId
            ),
          },
        },
      });

      revalidatePath(routes.admin.books.list);
      revalidatePath(routes.explore);
      revalidatePath("/src/app/book/[bookSlug]", "page");
      revalidatePath("/src/app/admin/books/[bookId]", "page");
      revalidatePath(routes.admin.subjects);

      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
