import BookCard from "~/components/common/bookcard/BookCard";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { validateParam } from "~/lib/db/_config/validateParam";
import { getCustomLists_query } from "~/lib/db/custom_lists/getCustomLists.query";
import { getCustomListsBooks_query } from "~/lib/db/custom_lists/getCustomListsBooks.query";
import { getSingleCustomList_query } from "~/lib/db/custom_lists/getSingleCustomList.query";

export default async function CustomListPage({
  params,
}: {
  params: { customList: string; userName: string };
  searchParams: { [key: string]: string | undefined };
}) {
  // check if this list exists
  await validateParam(
    () => getCustomLists_query({ user_name: params.userName }),
    "id",
    params,
    "customList"
  );

  const [customListsBooks, singleCustomList] = await Promise.all([
    getCustomListsBooks_query({
      user_name: params.userName,
      customListId: params.customList,
    }),
    getSingleCustomList_query({
      customListId: params.customList,
      options: { select: { name: true } },
    }),
  ]);

  return (
    <div className="space-y-4">
      <h4 className="ml-4 text-accent-foreground font-medium text-lg flex items-center gap-2">
        {singleCustomList?.name}{" "}
        <span className="text-sm text-accent-foreground/60">
          {customListsBooks?.length}
        </span>
      </h4>
      <div>
        <If
          condition={customListsBooks && customListsBooks?.length > 0}
          then={
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              <For
                each={customListsBooks ?? []}
                render={(book) => <BookCard key={book.id} bookInfo={book} />}
              />
            </div>
          }
          otherwise={
            <EmptyMessage variant="light">No books found</EmptyMessage>
          }
        />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { userName: string; customList: string };
}) {
  await validateParam(
    () => getCustomLists_query({ user_name: params.userName }),
    "id",
    params,
    "customList"
  );

  const customList = await getSingleCustomList_query({
    customListId: params.customList,
    options: { select: { name: true } },
  });

  return {
    title: `${customList?.name} - Booklist`,
    openGraph: {
      title: `${customList?.name} - Booklist`,
      url: `https://libris-app.netlify.app/users/${params.userName}/booklist/dropped`,
    },
  };
}
