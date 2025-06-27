import Container from "~/components/common/others/Container";
import FilterBoxes from "~/components/common/others/FilterBoxes";
import SearchBox from "~/components/common/search/searchBox";
import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { getAllSubjects_query } from "~/lib/db/subjects/getAllSubjects.query";
import Booklist from "./_components/Booklist";
import SelectedFilterOptions from "./_components/SelectedFilterOptions";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const allSubjectsPromise = getAllSubjects_query();

  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <h1 className="text-3xl font-semibold mb-1 text-accent-foreground lg:hidden">
          Browse Books
        </h1>
        <SearchBox />
        <FilterBoxes
          subjectsPromise={allSubjectsPromise}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        />
      </div>
      <SelectedFilterOptions />
      <div className="my-10">
        <AsyncBoundary>
          <Booklist searchParams={searchParams} />
        </AsyncBoundary>
      </div>
    </Container>
  );
}

export function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return {
    title: searchParams.search
      ? `Search: ${searchParams.search}`
      : "Explore Books",
    openGraph: {
      title: searchParams.search
        ? `Search: ${searchParams.search}`
        : "Explore Books",
      url: `https://libris.vercel.app/explore?search=${decodeURIComponent(
        searchParams.search as string
      )}`,
    },
  };
}
