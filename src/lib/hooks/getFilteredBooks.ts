import { Prisma } from "~/lib/prisma/generated/client";
import { getAllBooks_query } from "../db/books/getAllBooks.query";
import { getGeneralSettings_query } from "../db/settings/getGeneralSettings.query";
import { getAllSubjects_query } from "../db/subjects/getAllSubjects.query";

export async function getFilteredBooks({ searchParams }: Params) {
  const searchQuery = searchParams.search;
  // convert to array by comma
  const subjectsQuery = searchParams.subjects?.split(",");
  const sortByQuery = searchParams.sortBy;

  const default_explore_order = (
    await getGeneralSettings_query({
      options: { select: { default_explore_order: true } },
    })
  )?.default_explore_order;

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
  else if (sortByQuery === "Newest") orderBy.published_date = "desc";
  else if (sortByQuery === "Oldest") orderBy.published_date = "asc";

  const defaultOrderBy: Prisma.BookFindManyArgs["orderBy"] = {};
  if (default_explore_order === "decsending") defaultOrderBy.name = "desc";
  else if (default_explore_order === "acsending") defaultOrderBy.name = "asc";
  else if (default_explore_order === "newest")
    defaultOrderBy.published_date = "desc";
  else if (default_explore_order === "oldest")
    defaultOrderBy.published_date = "asc";

  const allBooks = await getAllBooks_query({
    options: {
      where,
      // default sorting is according to user's setting
      orderBy: Object.keys(orderBy).length ? orderBy : defaultOrderBy,
    },
  });

  return { sortedFilteredBooks: allBooks };
}

type Params = {
  searchParams: { [key: string]: string | undefined };
};
