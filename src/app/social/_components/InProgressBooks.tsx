import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";

import { getSessionUser_query } from "~/lib/db/_config/session";
import { getBooksByEntryStatus_query } from "~/lib/db/book_entries/getBooksByEntryStatus.query";
import ListProgressBarItemTitle from "./list-progress/ListProgressBarItemTitle";

export default async function InProgressBooks() {
  const sessionUser = await getSessionUser_query({
    select: { id: true, user_name: true },
  });

  if (sessionUser === null) return null;

  const booksByEntries = await getBooksByEntryStatus_query({
    user_name: sessionUser.user_name ?? "",
    status: "reading",
  });

  return (
    <div>
      <ListProgressBarItemTitle>In Progress</ListProgressBarItemTitle>

      <If
        condition={booksByEntries && booksByEntries?.length > 0}
        then={
          <div className="p-5 bg-light dark:bg-muted max-h-[12rem] scroll-area grid grid-cols-3 md:grid-cols-7 lg:grid-cols-5 gap-4">
            <For
              each={booksByEntries ?? []}
              render={(book) => (
                <BookCard size="sm" key={book.id} bookInfo={book} />
              )}
            />
          </div>
        }
        otherwise={<EmptyMessage variant="light">No books found</EmptyMessage>}
      />
    </div>
  );
}
