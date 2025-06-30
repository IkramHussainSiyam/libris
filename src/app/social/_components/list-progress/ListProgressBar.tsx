import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import InProgressBooks from "../InProgressBooks";
import RecentBooks from "../RecentBooks";
import RecentReviews from "../RecentReviews";

export default function ListProgressBar() {
  return (
    <div className="max-w-full lg:max-w-full xl:max-w-md w-full space-y-8 -order-1 xl:order-none">
      <AsyncBoundary loadingWithBg>
        <InProgressBooks />
      </AsyncBoundary>

      <div className="hidden xl:block space-y-8">
        <AsyncBoundary loadingWithBg>
          <RecentReviews />
        </AsyncBoundary>

        <AsyncBoundary loadingWithBg>
          <RecentBooks />
        </AsyncBoundary>
      </div>
    </div>
  );
}
