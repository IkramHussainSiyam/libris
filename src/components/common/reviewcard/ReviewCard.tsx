import { Star, ThumbsUp } from "lucide-react";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";
import { routes } from "~/lib/static-data/routes";
import { TReview } from "~/lib/types/review.type";
import Card from "../card/Card";
import Link from "../others/Link";

export default async function ReviewCard({ review }: Props) {
  const [reviewsBook, reviewOwner] = await Promise.all([
    getSingleBook_query({
      slug: undefined,
      where: {
        id: review?.book_ID,
      },
      options: {
        select: {
          slug: true,
          cover_url: true,
          name: true,
        },
      },
    }),
    getSingleUser_query({
      user_name: undefined,
      where: { id: review?.user_ID },
      options: {
        select: { user_name: true, image: true },
      },
    }),
  ]);

  return (
    <Card.Root className="w-full flex flex-col items-start">
      <Link
        className="w-full block group/review"
        href={routes.review.details(review?.id ?? "")}
      >
        <div className="relative w-full overflow-hidden">
          <Card.Image
            containerClassName="w-32 h-[calc(100%-1rem)] shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            src={reviewOwner?.image ?? ""}
            alt={reviewOwner?.user_name ?? ""}
            width={128}
            height={80}
          />
          <Card.Image
            containerClassName="w-full h-44 bg-black/50"
            className="blur-sm opacity-70"
            src={reviewsBook?.cover_url ?? ""}
            alt={reviewsBook?.name ?? ""}
            width={240}
            height={80}
          />
          <div className="absolute top-0 left-0 size-full bg-deep-gray/80 grid place-items-center z-20 text-primary-foreground transition-opacity opacity-0 group-hover/review:opacity-100">
            See Full Review
          </div>
        </div>
      </Link>

      <Card.Content className="bg-light dark:bg-muted p-3 text-accent-foreground text-sm space-y-2.5">
        <Card.Header className="items-start gap-2 justify-between">
          <Card.Title className="font-bold text-[13px]">
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
          </Card.Title>
        </Card.Header>
        <Card.Footer className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-xs">
            <ThumbsUp className="size-4 stroke-none fill-accent-foreground" />{" "}
            {review?.liked_by_userIDs.length}
          </div>
          <div className="flex items-center gap-0.5 text-xs">
            <Star className="size-4 stroke-none fill-accent-foreground" />{" "}
            {review?.score}
          </div>
        </Card.Footer>
      </Card.Content>
    </Card.Root>
  );
}

type Props = {
  review: TReview;
};
