import { PenLine } from "lucide-react";
import Link from "~/components/common/others/Link";
import For from "~/components/helpers/For";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";

import { getSessionUser_query } from "~/lib/db/_config/session";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { isUserAlreadyReviewed } from "~/lib/db/reviews/getAllReviews.query";
import { getCurrentBooksReview_query } from "~/lib/db/reviews/getCurrentBooksReview.query";
import { getCurrentBooksSubjects_query } from "~/lib/db/subjects/getCurrentBooksSubject.query";
import { routes } from "~/lib/static-data/routes";
import { formatDate } from "~/lib/utils/date-formatter";
import { cn } from "~/lib/utils/utils";
import InfoItem from "./InfoItem";

export default async function ContentSidebar({
  bookSlug,
}: {
  bookSlug: string;
}) {
  const singleBook = await getSingleBook_query({ slug: bookSlug });
  const [
    { isAlreadyReviewed },
    { currentBooksReview },
    { currentBooksSubjects },
    sessionUser,
  ] = await Promise.all([
    isUserAlreadyReviewed({ bookId: singleBook?.id ?? "" }),
    getCurrentBooksReview_query({
      bookId: singleBook?.id ?? "",
      options: { select: { id: true } },
    }),
    getCurrentBooksSubjects_query({
      currentBooksSubIds: singleBook?.subject_IDs ?? [],
    }),
    getSessionUser_query({ select: { id: true } }),
  ]);

  return (
    <div className="w-full sm:w-2/6 xl:w-1/6 space-y-4 text-sm text-foreground/70 dark:text-foreground">
      <div className="bg-light dark:bg-muted p-3 space-y-3.5 max-h-[12rem] sm:max-h-full scroll-area">
        <InfoItem heading="Subjects">
          <For
            each={currentBooksSubjects}
            render={(item) => (
              <Link
                href={{
                  pathname: routes.explore,
                  query: { subjects: item.name },
                }}
                key={item.id}
                className="hover:link block capitalize"
              >
                {item.name}
              </Link>
            )}
          />
        </InfoItem>
        <InfoItem
          heading="Total Pages"
          description={singleBook?.total_pages.toString()}
        />
        <InfoItem
          heading="Published Date"
          description={formatDate(
            singleBook?.published_date ?? "",
            "abbreviated"
          )}
        />
        {/* based on total reviews rating numbers */}
        <InfoItem heading="Average Score" description="82%" />
        {/* based on how many people completed reading the book */}
        <InfoItem heading="Popularity" description={"90123"} />
        <InfoItem
          heading="Favorites"
          description={singleBook?.favored_by_user_IDs.length.toString()}
        />
        <InfoItem heading="Author" description={singleBook?.author} />
      </div>

      <Show when={sessionUser !== null}>
        <Button
          asChild
          className={cn(
            "w-full gap-3",
            isAlreadyReviewed && "bg-green-600 hover:bg-green-600/90"
          )}
        >
          <Link
            href={{
              pathname: isAlreadyReviewed ? "/reviews/edit" : "/reviews/create",
              query: isAlreadyReviewed
                ? {
                    review_id: currentBooksReview?.id,
                    book_slug: singleBook?.slug,
                  }
                : { book_slug: singleBook?.slug },
            }}
          >
            <PenLine />{" "}
            {isAlreadyReviewed ? "Edit your review" : "Write a review"}
          </Link>
        </Button>
      </Show>
    </div>
  );
}
