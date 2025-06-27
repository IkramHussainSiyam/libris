import Container from "~/components/common/others/Container";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";
import { getSingleReview_query } from "~/lib/db/reviews/getSingleReview.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import Review from "./_components/Review";
import ReviewAction from "./_components/ReviewAction";
import ReviewDetailsBanner from "./_components/ReviewDetailsBanner";

export default async function ReviewDetailsPage({
  params,
}: {
  params: { reviewId: string };
}) {
  await validateParam(getAllReviews_query, "id", params, "reviewId");

  const [{ singleReview }, sessionUser] = await Promise.all([
    getSingleReview_query({ reviewId: params.reviewId }),
    getSessionUser_query({ select: { id: true } }),
  ]);
  const isOwnReview = singleReview?.user_ID === sessionUser?.id;

  return (
    <div className="relative">
      <ReviewDetailsBanner reviewBookId={singleReview?.book_ID ?? ""} />
      <Container className="my-0 sm:my-0">
        <div className="max-w-screen-lg mx-auto pt-52 mb-6">
          <Review review={singleReview} />

          <ReviewAction
            review={singleReview}
            isOwnReview={isOwnReview}
            userId={sessionUser?.id ?? ""}
          />
        </div>
      </Container>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { reviewId: string };
}) {
  await validateParam(getAllReviews_query, "id", params, "reviewId");

  const { singleReview: review } = await getSingleReview_query({
    reviewId: params.reviewId,
    options: { select: { book_ID: true, user_ID: true } },
  });

  const [reviewsBook, reviewOwner] = await Promise.all([
    getSingleBook_query({
      slug: undefined,
      where: {
        id: review?.book_ID,
      },
      options: {
        select: { name: true },
      },
    }),
    getSingleUser_query({
      user_name: undefined,
      where: { id: review?.user_ID },
      options: {
        select: { user_name: true },
      },
    }),
  ]);

  return {
    title: `Review of ${reviewsBook?.name} by ${reviewOwner?.user_name}`,
    openGraph: {
      title: `Review of ${reviewsBook?.name} by ${reviewOwner?.user_name}`,
      url: `https://libris.vercel.app/reviews/${params.reviewId}`,
    },
  };
}
