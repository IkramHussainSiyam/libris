import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getFavoriteBooks_query } from "~/lib/db/books/getFavoriteBooks.query";

import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";

export default async function UserProfileFavoritesPage({
  params,
}: {
  params: { userName: string };
}) {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { id: true } },
  });
  const { favoriteBooks } = await getFavoriteBooks_query({
    userID: singleUser?.id ?? "",
  });

  return (
    <div className="space-y-3">
      <h4 className="ml-4 text-accent-foreground font-medium">
        Favorite Books
      </h4>
      <If
        condition={favoriteBooks.length > 0}
        then={
          <div className="bg-light dark:bg-muted p-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <For
              each={favoriteBooks}
              render={(book) => <BookCard key={book.id} bookInfo={book} />}
            />
          </div>
        }
        otherwise={
          <EmptyMessage variant="light">No favorite books</EmptyMessage>
        }
      />
    </div>
  );
}

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Favorites",
    openGraph: {
      title: "Favorites",
      url: `https://libris-app.onrender.com/users/${params.userName}/favorites`,
    },
  };
}
