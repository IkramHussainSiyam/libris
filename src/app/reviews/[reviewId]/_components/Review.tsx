import Link from "~/components/common/others/Link";
import RenderRichText from "~/components/common/others/RenderRichText";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { routes } from "~/lib/static-data/routes";
import { TReview } from "~/lib/types/review.type";

export default async function Review({ review }: { review: TReview }) {
  const [reviewsBook, reviewOwner] = await Promise.all([
    getSingleBook_query({
      slug: undefined,
      where: {
        id: review?.book_ID,
      },
      options: {
        select: { slug: true, name: true },
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

  return (
    <div className="h-fit">
      <div className="bg-light dark:bg-muted relative px-6 py-6">
        <h1 className="text-base text-center italic font-medium text-foreground/80">
          Review of{" "}
          <Link
            href={routes.bookInfo.details(reviewsBook?.slug ?? "")}
            className="link"
          >
            {reviewsBook?.name}
          </Link>{" "}
          by{" "}
          <Link
            href={routes.user.profile(reviewOwner?.user_name ?? "")}
            className="link"
          >
            {reviewOwner?.user_name}
          </Link>
        </h1>
      </div>

      <div className="my-4 p-6 bg-light dark:bg-muted">
        <RenderRichText
          textSize="md"
          richTextContents={review?.content ?? ""}
        />
      </div>

      <div className="w-fit font-display font-medium px-8 py-4 rounded-sm bg-lime-500 text-primary-foreground mx-auto">
        <h6 className="flex items-end text-5xl">
          {review?.score} <span className="text-xs italic">/ 5</span>
        </h6>
      </div>
    </div>
  );
}
