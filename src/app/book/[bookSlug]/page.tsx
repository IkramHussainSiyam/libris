import BookCard from "~/components/common/bookcard/BookCard";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import For from "~/components/helpers/For";
import Show from "~/components/helpers/Show";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import GroupItem from "../_components/GroupItem";
import SingleBookStats from "../_components/SingleBookStats";
import { getBookDetailsPageData } from "./_helper/getBookDetailsPageData";

export default async function BookDetailsPage({
  params,
}: {
  params: { bookSlug: string };
}) {
  const [{ relatedBooks, recommendedBooks }, singleBook] = await Promise.all([
    getBookDetailsPageData({
      slug: params.bookSlug,
    }),
    getSingleBook_query({
      slug: params.bookSlug,
      options: { select: { id: true } },
    }),
  ]);

  return (
    <div className="space-y-12">
      <Show when={relatedBooks?.length > 0}>
        <GroupItem title="Related Books">
          <div className="p-5 bg-light dark:bg-muted max-h-[12rem] scroll-area grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-10 gap-4">
            <For
              each={relatedBooks}
              render={(book) => (
                <BookCard key={book.id} size="sm" bookInfo={book} />
              )}
            />
          </div>
        </GroupItem>
      </Show>

      <GroupItem title="Book Stats">
        <AsyncBoundary>
          <SingleBookStats statCountText="Users" book_ID={singleBook?.id} />
        </AsyncBoundary>
      </GroupItem>

      <Show when={recommendedBooks?.length > 0}>
        <GroupItem title="Recommended Books">
          <div className="p-5 bg-light dark:bg-muted max-h-[12rem] scroll-area grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-10 gap-4">
            <For
              each={recommendedBooks}
              render={(book) => (
                <BookCard key={book.id} size="sm" bookInfo={book} />
              )}
            />
          </div>
        </GroupItem>
      </Show>
    </div>
  );
}
