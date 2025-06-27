import { getBooksByEntryStatus_query } from "~/lib/db/book_entries/getBooksByEntryStatus.query";
import { Prisma } from "~/lib/prisma/generated/client";

import { getAllSubjects_query } from "~/lib/db/subjects/getAllSubjects.query";
import { TReadingStatus } from "~/lib/types/book_entry.type";

export async function getFilteredBookEntries({
  searchParams,
  status,
  user_name,
}: Params) {
  const searchQuery = searchParams.search;
  const subjectsQuery = searchParams.subjects?.split(",");
  const sortByQuery = searchParams.sortBy;

  let subjectIDs: string[] = [];
  if (subjectsQuery && subjectsQuery.length > 0) {
    const { allSubjects } = await getAllSubjects_query();
    subjectIDs = allSubjects
      .filter((subject) => subjectsQuery.includes(subject.name))
      .map((s) => s.id);
  }

  const filters: Prisma.BookFindManyArgs["where"][] = [];
  if (searchQuery) {
    filters.push({
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    });
  }
  if (subjectIDs.length > 0) {
    filters.push({
      subject_IDs: {
        hasSome: subjectIDs,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const where: Prisma.BookFindManyArgs["where"] =
    filters.length > 0 ? { AND: filters } : undefined;

  const orderBy: Prisma.BookFindManyArgs["orderBy"] = {};
  if (sortByQuery === "Descending (name)") orderBy.name = "desc";
  else if (sortByQuery === "Accending (name)") orderBy.name = "asc";
  else if (sortByQuery === "Newest") orderBy.created_at = "desc";
  else if (sortByQuery === "Oldest") orderBy.created_at = "asc";

  const allBooks = await getBooksByEntryStatus_query({
    user_name,
    status,
    where,
    options: {
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    },
  });

  return { sortedFilteredBooks: allBooks };
}

type Params = {
  searchParams: { [key: string]: string | undefined };
  status: TReadingStatus;
  user_name: string;
};
