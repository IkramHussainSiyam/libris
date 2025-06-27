import EmptyMessage from "~/components/common/others/EmptyMessage";
import ReviewCard from "~/components/common/reviewcard/ReviewCard";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";
import ListProgressBarItemTitle from "./list-progress/ListProgressBarItemTitle";

export default async function RecentReviews() {
  const topThreeRecentReviews = await getAllReviews_query({
    take: 3,
  });

  return (
    <div>
      <ListProgressBarItemTitle>Recent Reviews</ListProgressBarItemTitle>
      <If
        condition={topThreeRecentReviews.length > 0}
        then={
          <div className="grid grid-cols-1 gap-6">
            <For
              each={topThreeRecentReviews}
              render={(review) => (
                <ReviewCard key={review.id} review={review} />
              )}
            />
          </div>
        }
        otherwise={
          <EmptyMessage variant="light">No reviews found.</EmptyMessage>
        }
      />
    </div>
  );
}
