import EmptyMessage from "~/components/common/others/EmptyMessage";
import ReviewCard from "~/components/common/reviewcard/ReviewCard";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";

export default async function BookDetailsReviewsPage({
  params,
}: {
  params: { bookSlug: string };
}) {
  const singleBook = await getSingleBook_query({
    slug: params.bookSlug,
    options: { select: { id: true } },
  });
  const allReviews = await getAllReviews_query({
    where: { book_ID: singleBook?.id },
  });

  return (
    <If
      condition={allReviews.length > 0}
      then={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-14rem)] scroll-area">
          <For
            each={allReviews}
            render={(review) => <ReviewCard key={review.id} review={review} />}
          />
        </div>
      }
      otherwise={<EmptyMessage variant="light">No reviews found.</EmptyMessage>}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: { bookSlug: string };
}) {
  const singleBook = await getSingleBook_query({
    slug: params.bookSlug,
    options: { select: { name: true } },
  });

  return {
    title: `Reviews of ${singleBook?.name} • Book Details`,
    openGraph: {
      title: `Reviews of ${singleBook?.name} • Book Details`,
      url: `https://libris.up.railway.app/book/${params.bookSlug}/reviews`,
    },
  };
}
