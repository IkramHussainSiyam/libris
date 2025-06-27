import SelectedFilterOptions from "~/app/explore/_components/SelectedFilterOptions";
import FilterBoxes from "~/components/common/others/FilterBoxes";
import Sidebar, { SidebarLinks } from "~/components/common/others/Sidebar";
import SearchBox from "~/components/common/search/searchBox";
import Show from "~/components/helpers/Show";
import { getCustomLists_query } from "~/lib/db/custom_lists/getCustomLists.query";

import { getAllSubjects_query } from "~/lib/db/subjects/getAllSubjects.query";
import { routes } from "~/lib/static-data/routes";

export default async function UserProfileBooklistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userName: string };
}) {
  const customlists = await getCustomLists_query({
    user_name: params?.userName,
  });
  const subjectsPromise = getAllSubjects_query();

  const links: SidebarLinks[] = [
    {
      id: 1,
      name: "Reading",
      href: routes.user.booklist.reading(params?.userName ?? ""),
    },
    {
      id: 2,
      name: "Completed",
      href: routes.user.booklist.completed(params?.userName ?? ""),
    },
    {
      id: 3,
      name: "On-Hold",
      href: routes.user.booklist.on_hold(params?.userName ?? ""),
    },
    {
      id: 4,
      name: "Planning",
      href: routes.user.booklist.planning(params?.userName ?? ""),
    },
    {
      id: 5,
      name: "Dropped",
      href: routes.user.booklist.dropped(params?.userName ?? ""),
    },
  ];

  const customListsLinks: SidebarLinks[] = customlists?.map((list) => ({
    id: list.id,
    name: list.name,
    href: routes.user.booklist.custom_list(params?.userName ?? "", list.id),
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/6 xl:w-1/6 space-y-7">
        <SearchBox />
        <Sidebar links={links} heading={"Booklist"} />
        <Show when={customlists?.length > 0}>
          <Sidebar links={customListsLinks} heading={"Custom Lists"} />
        </Show>
        <FilterBoxes
          subjectsPromise={subjectsPromise}
          className="w-full space-y-7"
        />
        <SelectedFilterOptions />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
