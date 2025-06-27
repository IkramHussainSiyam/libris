import SelectedFilterOptions from "~/app/explore/_components/SelectedFilterOptions";
import FilterBoxes from "~/components/common/others/FilterBoxes";
import SearchBox from "~/components/common/search/searchBox";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getAllSubjects_query } from "~/lib/db/subjects/getAllSubjects.query";
import { SelectedBooksAction } from "./_components/AdminBookCardSelector";
import BookActionForm from "./_components/BookActionForm";
import AdminBooklist from "./_components/Booklist";
import BulkCreateBookModal from "./_components/BulkCreateBookModal";

export default function AdminBooksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const booksPromise = getAllBooks_query();
  const subjectsPromise = getAllSubjects_query();

  return (
    <div className="space-y-7 flex flex-col">
      <div className="flex items-center justify-end gap-2">
        <BulkCreateBookModal subjectsPromise={subjectsPromise} />
        <BookActionForm
          subjectsPromise={subjectsPromise}
          booksPromise={booksPromise}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 xl:gap-y-0 gap-x-4">
        <SearchBox />
        <FilterBoxes
          subjectsPromise={subjectsPromise}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        />
        <SelectedFilterOptions />
      </div>
      <SelectedBooksAction />

      <AsyncBoundary>
        <AdminBooklist searchParams={searchParams} />
      </AsyncBoundary>
    </div>
  );
}

export const metadata = {
  title: "Books • Admin",
  openGraph: {
    title: "Books • Admin",
    url: `https://libris-app.vercel.app/admin/books`,
  },
};
