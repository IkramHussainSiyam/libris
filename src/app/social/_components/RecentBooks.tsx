import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import ListProgressBarItemTitle from "./list-progress/ListProgressBarItemTitle";

export default async function RecentBooks() {
  const recentBooks = await getAllBooks_query({
    options: { take: 5, orderBy: { published_date: "desc" } },
  });

  return (
    <div>
      <ListProgressBarItemTitle>Poular Books</ListProgressBarItemTitle>
      <If
        condition={recentBooks.length > 0}
        then={
          <div className="p-5 bg-light dark:bg-muted max-h-[12rem] scroll-area grid grid-cols-5 gap-4">
            <For
              each={recentBooks}
              render={(book) => (
                <BookCard size="sm" key={book.id} bookInfo={book} />
              )}
            />
          </div>
        }
        otherwise={
          <EmptyMessage variant="light">No reviews found.</EmptyMessage>
        }
      />
    </div>
  );
}
