import BookCard from "~/components/common/bookcard/BookCard";
import For from "~/components/helpers/For";
import Show from "~/components/helpers/Show";
import { getFavoriteBooks_query } from "~/lib/db/books/getFavoriteBooks.query";
import { TUser } from "~/lib/types/user.type";

export default async function UserFavoriteBooks({
  userID,
}: {
  userID: TUser["id"];
}) {
  const { favoriteBooks } = await getFavoriteBooks_query({
    userID,
  });

  return (
    <Show when={favoriteBooks.length > 0}>
      <div className="space-y-3">
        <h4 className="ml-4 text-accent-foreground font-medium">
          Favorite Books
        </h4>
        <div className="bg-light dark:bg-muted p-6 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <For
            each={favoriteBooks.slice(0, 12)}
            render={(book) => (
              <BookCard key={book.id} bookInfo={book} size="sm" />
            )}
          />
        </div>
      </div>
    </Show>
  );
}
