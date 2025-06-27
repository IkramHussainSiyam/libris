import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getFilteredBooks } from "~/lib/hooks/getFilteredBooks";

export default async function Booklist({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { sortedFilteredBooks } = await getFilteredBooks({ searchParams });

  return (
    <div>
      <If
        condition={sortedFilteredBooks?.length > 0}
        then={
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            <For
              each={sortedFilteredBooks}
              render={(book) => <BookCard key={book.id} bookInfo={book} />}
            />
          </div>
        }
        otherwise={<EmptyMessage variant="light">No books found</EmptyMessage>}
      />
    </div>
  );
}
