import EmptyMessage from "~/components/common/others/EmptyMessage";
import ReviewCard from "~/components/common/reviewcard/ReviewCard";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";
import { getSingleUser_query } from "~/lib/db/users/getSingleUser.query";

export default async function UserProfileReviewsPage({
  params,
}: {
  params: { userName: string };
}) {
  const singleUser = await getSingleUser_query({
    user_name: params.userName,
    options: { select: { id: true } },
  });
  const loggedInUsersReviews = await getAllReviews_query({
    where: {
      user_ID: singleUser?.id,
    },
  });

  return (
    <div className="space-y-3">
      <h4 className="ml-4 text-accent-foreground font-medium">Reviews</h4>
      <If
        condition={loggedInUsersReviews.length > 0}
        then={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <For
              each={loggedInUsersReviews}
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

export function generateMetadata({ params }: { params: { userName: string } }) {
  return {
    title: "Reviews",
    openGraph: {
      title: "Reviews",
      url: `https://libris.vercel.app/users/${params.userName}/reviews`,
    },
  };
}
