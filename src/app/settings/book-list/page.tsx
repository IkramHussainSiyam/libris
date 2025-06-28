import AsyncBoundary from "~/components/helpers/AsyncBoundary";
import { getCustomLists_query } from "~/lib/db/custom_lists/getCustomLists.query";
import DangerZone from "./_components/DangerZone";
import ManageCustomList from "./_components/ManageCustomList";

export default function CustomListsSettingPage() {
  const customListsPromise = getCustomLists_query();

  return (
    <div className="space-y-8">
      <AsyncBoundary>
        <ManageCustomList customListsPromise={customListsPromise} />
      </AsyncBoundary>
      <DangerZone />
    </div>
  );
}

export const metadata = {
  title: "Booklist Settings",
  openGraph: {
    title: "Booklist Settings",
    url: `https://libris.up.railway.app/book-list`,
  },
};
