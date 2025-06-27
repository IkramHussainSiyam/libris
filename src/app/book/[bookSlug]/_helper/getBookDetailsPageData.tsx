import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getRelatedBooks_query } from "~/lib/db/books/getRelatedBooks.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";

export async function getBookDetailsPageData({ slug }: { slug: string }) {
  const singleBook = await getSingleBook_query({ slug });
  const [{ relatedBooks }, allBooks] = await Promise.all([
    getRelatedBooks_query(singleBook?.related_book_IDs ?? []),
    getAllBooks_query(),
  ]);

  const recommendedBooks = allBooks.filter((b) => {
    const subIds = new Set(allBooks.flatMap((b) => b.subject_IDs!));

    // return the books has the same id as current book, but not related or the current book
    return (
      b.subject_IDs?.some((id) => subIds.has(id)) &&
      b.id !== singleBook?.id &&
      !relatedBooks?.some((r) => r.id === b.id)
    );
  });

  return { relatedBooks, recommendedBooks };
}
