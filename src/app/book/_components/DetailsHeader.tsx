import Image from "next/image";
import RenderRichText from "~/components/common/others/RenderRichText";
import Show from "~/components/helpers/Show";

import { getSessionUser_query } from "~/lib/db/_config/session";
import { getSingleBookEntry_query } from "~/lib/db/book_entries/getSingleBookEntry.query";
import { getSingleBook_query } from "~/lib/db/books/getSingleBook.query";
import { getCustomLists_query } from "~/lib/db/custom_lists/getCustomLists.query";
import { getGeneralSettings_query } from "~/lib/db/settings/getGeneralSettings.query";
import DetailsHeaderActions from "./DetailsHeaderActions";
import HeaderLinks from "./HeaderLinks";

export default async function DetailsHeader({
  bookSlug,
}: {
  bookSlug: string;
}) {
  const singleBook = await getSingleBook_query({ slug: bookSlug });

  const [sessionUser, customLists, singleBookEntry, generalSettings] =
    await Promise.all([
      getSessionUser_query({ select: { id: true } }),
      getCustomLists_query({
        options: { select: { name: true, id: true } },
      }),
      getSingleBookEntry_query({
        book_ID: singleBook?.id ?? "",
      }),
      getGeneralSettings_query({
        options: {
          select: {
            default_bookEntry_status: true,
          },
        },
      }),
    ]);

  return (
    <div className="py-6 bg-light dark:bg-muted">
      <div className="flex flex-col gap-7 sm:flex-row lg:gap-10 container">
        <div className="self-center w-4/6 sm:w-2/6 lg:h-2/6 xl:w-1/6 flex flex-col">
          <div className="w-full lg:h-96 xl:h-72 overflow-hidden shadow-lg shadow-muted/5">
            <Image
              className="size-full object-cover"
              src={singleBook?.cover_url ?? "https://placehold.co/208x288/png"}
              alt={singleBook?.name ?? "Some book cover"}
              width={208}
              height={288}
            />
          </div>

          <Show when={sessionUser !== null}>
            <DetailsHeaderActions
              generalSettings={generalSettings}
              bookId={singleBook?.id}
              favored_by_user_IDs={singleBook?.favored_by_user_IDs}
              customLists={customLists}
              bookInfo={singleBook}
              singleBookEntry={singleBookEntry}
            />
          </Show>
        </div>

        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl text-foreground dark:text-foreground font-medium">
            {singleBook?.name}
          </h1>
          <div className="h-20 sm:h-64 lg:h-[340px] xl:h-60 scroll-area my-2 lg:my-3.5 text-sm">
            <RenderRichText richTextContents={singleBook?.description ?? ""} />
          </div>
          <HeaderLinks />
        </div>
      </div>
    </div>
  );
}
