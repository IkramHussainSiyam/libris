import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { TReadingStatus } from "~/lib/types/book_entry.type";
import { getFilteredBookEntries } from "../_hooks/getFilteredBookEntries";

export default async function BookEntryList({
  searchParams,
  status,
  userName,
}: {
  searchParams: { [key: string]: string | undefined };
  status: TReadingStatus;
  userName: string;
}) {
  const { sortedFilteredBooks } = await getFilteredBookEntries({
    user_name: userName,
    status,
    searchParams,
  });

  return (
    <div className="space-y-4">
      <h4 className="ml-4 text-accent-foreground font-medium text-lg capitalize flex items-center gap-2">
        {status}{" "}
        <span className="text-sm text-accent-foreground/60">
          {sortedFilteredBooks?.length}
        </span>
      </h4>
      <If
        condition={sortedFilteredBooks && sortedFilteredBooks?.length > 0}
        then={
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <For
              each={sortedFilteredBooks ?? []}
              render={(book) => <BookCard key={book.id} bookInfo={book} />}
            />
          </div>
        }
        otherwise={<EmptyMessage variant="light">No books found</EmptyMessage>}
      />
    </div>
  );
}
