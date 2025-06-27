import Container from "~/components/common/others/Container";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import ReviewWriter from "../_components/ReviewWriter";

export default async function CreateReviewPage({
  searchParams,
}: {
  searchParams: { book_slug: string };
}) {
  // check if book with that slug exists in database
  await validateParam(getAllBooks_query, "slug", searchParams, "book_slug");

  const singleBook = await getSingleBook_query({
    slug: searchParams.book_slug,
    options: {
      select: {
        id: true,
        name: true,
        cover_url: true,
        slug: true,
      },
    },
  });

  return (
    <Container>
      <ReviewWriter singleBook={singleBook} />
    </Container>
  );
}

export const metadata = {
  title: "Write Reviews",
  openGraph: {
    title: "Write Reviews",
    url: `https://libris-app.netlify.app/reviews/create`,
  },
};
