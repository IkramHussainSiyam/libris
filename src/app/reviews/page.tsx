import Container from "~/components/common/others/Container";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import ReviewCard from "~/components/common/reviewcard/ReviewCard";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { getAllReviews_query } from "~/lib/db/reviews/getAllReviews.query";

export default async function ReviewsPage() {
  const allReviews = await getAllReviews_query();

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-6 text-accent-foreground">
        Book Reviews
      </h1>
      <If
        condition={allReviews.length > 0}
        then={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <For
              each={allReviews}
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
    </Container>
  );
}

export const metadata = {
  title: "Book Reviews",
  openGraph: {
    title: "Book Reviews",
    url: `https://libris-app.onrender.com/reviews`,
  },
};
