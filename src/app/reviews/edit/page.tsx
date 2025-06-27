import Container from "~/components/common/others/Container";
import { validateParam } from "~/lib/db/_config/validateParam";

import { getAllBooks_query } from "~/lib/db/books/getAllBooks.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";
import { getSingleReview_query } from "~/lib/db/reviews/getSingleReview.query";
import ReviewWriter from "../_components/ReviewWriter";

export default async function EditReviewPage({
  searchParams,
}: {
  searchParams: { book_slug: string; review_id: string };
}) {
  await Promise.all([
    validateParam(getAllBooks_query, "slug", searchParams, "book_slug"),
    validateParam(getAllReviews_query, "id", searchParams, "review_id"),
  ]);

  const [singleBook, { singleReview }] = await Promise.all([
    getSingleBook_query({
      slug: searchParams.book_slug,
      options: {
        select: {
          id: true,
          name: true,
          cover_url: true,
          slug: true,
        },
      },
    }),
    getSingleReview_query({ reviewId: searchParams.review_id }),
  ]);

  return (
    <Container>
      <ReviewWriter singleBook={singleBook} singleReview={singleReview} />
    </Container>
  );
}

export const metadata = {
  title: "Edit Reviews",
  openGraph: {
    title: "Edit Reviews",
    url: `https://libris-app.netlify.app/reviews/edit`,
  },
};
