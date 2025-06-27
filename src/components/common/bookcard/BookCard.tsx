import { Pen, Plus } from "lucide-react";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import HoverCard from "~/components/ui/hover-card";
import { getSessionUser_query } from "~/lib/db/_config/session";
import { getSingleBookEntry_query } from "~/lib/db/book_entries/getSingleBookEntry.query";
import { getCustomLists_query } from "~/lib/db/custom_lists/getCustomLists.query";
import { getGeneralSettings_query } from "~/lib/db/settings/getGeneralSettings.query";
import { routes } from "~/lib/static-data/routes";
import { TBook } from "~/lib/types/books.type";
import { cn } from "~/lib/utils/utils";
import Card from "../card/Card";
import Link from "../others/Link";
import Overlay from "../others/overlay";
import BookEntryRecorderModal from "./BookEntryRecorderModal";
import BookPreview from "./BookPreview";

export default async function BookCard({
  size = "lg",
  bookInfo,
}: BookCardProps) {
  const [sessionUser, customLists, singleBookEntry, generalSettings] =
    await Promise.all([
      getSessionUser_query({ select: { id: true } }),
      getCustomLists_query({
        options: { select: { name: true, id: true } },
      }),
      getSingleBookEntry_query({
        book_ID: bookInfo?.id,
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
    <HoverCard content={<BookPreview bookInfo={bookInfo} />}>
      <Card.Root className="bg-transparent dark:bg-transparent flex-col items-start space-y-2 group/bookCard">
        <div className="relative w-fit">
          <Link href={routes.bookInfo.details(bookInfo?.slug ?? "")}>
            <Card.Image
              className={cn(
                size === "sm"
                  ? "w-20 h-[115px]"
                  : size === "md"
                  ? "w-[150px] h-[212px]"
                  : "w-[185px] h-[262px]"
              )}
              src={bookInfo?.cover_url}
              alt={bookInfo?.name}
              width={size === "sm" ? 80 : size === "md" ? 150 : 185}
              height={size === "sm" ? 115 : size === "md" ? 212 : 262}
            />
          </Link>

          <Show when={sessionUser !== null}>
            <BookEntryRecorderModal
              customLists={customLists}
              bookInfo={bookInfo}
              singleBookEntry={singleBookEntry}
              generalSettings={generalSettings}
            >
              <Button
                className={cn(
                  "p-0 rounded-full transition scale-0 group-hover/bookCard:scale-100 absolute bottom-2 right-2 z-10",
                  size === "sm" ? "size-6" : "size-8",
                  singleBookEntry !== null
                    ? "bg-green-600 hover:bg-green-600/90"
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                {singleBookEntry !== null ? <Pen /> : <Plus />}
              </Button>
            </BookEntryRecorderModal>
          </Show>

          <Overlay className="bg-black/50 transition opacity-0 group-hover/bookCard:opacity-100" />
        </div>

        <Card.Footer>
          <Link
            href={routes.bookInfo.details(bookInfo?.slug ?? "")}
            className={cn(
              "block text-sm text-accent-foreground/80 group-hover/bookCard:text-secondary font-semibold",
              size === "sm" ? "text-xs line-clamp-1" : "text-sm line-clamp-2"
            )}
          >
            <h3>{bookInfo?.name}</h3>
          </Link>
        </Card.Footer>
      </Card.Root>
    </HoverCard>
  );
}

type BookCardProps = {
  bookInfo: TBook;
  size?: BookCardSize;
};

export type BookCardSize = "sm" | "md" | "lg";
