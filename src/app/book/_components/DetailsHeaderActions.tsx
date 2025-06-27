"use client";

import { Heart, Plus } from "lucide-react";
import BookEntryRecorderModal from "~/components/common/bookcard/BookEntryRecorderModal";
import { Button } from "~/components/ui/button";
import { GeneralSettings } from "~/lib/db/settings/getGeneralSettings.query";
import { TBookEntry } from "~/lib/types/book_entry.type";
import { TBook } from "~/lib/types/books.type";
import { TCustomLists } from "~/lib/types/customlists.type";
import { useFavoriteBook } from "../_hooks/useFavoriteBook";

export default function DetailsHeaderActions({
  bookId,
  favored_by_user_IDs,
  customLists,
  bookInfo,
  singleBookEntry,
  generalSettings,
}: Props) {
  const { handleFavoriteButton, isPending, optimisticFavorite } =
    useFavoriteBook({ bookId, favored_by_user_IDs });

  return (
    <div className="flex items-center gap-2 mt-5">
      <BookEntryRecorderModal
        customLists={customLists}
        bookInfo={bookInfo}
        singleBookEntry={singleBookEntry}
        generalSettings={generalSettings}
      >
        <Button className="flex-1 pl-2 pr-3.5 gap-0.5 h-8 bg-primary/80 rounded-sm">
          <Plus />
          {singleBookEntry ? "Update List" : "Add to List"}
        </Button>
      </BookEntryRecorderModal>
      <Button
        disabled={isPending}
        onClick={handleFavoriteButton}
        data-favorite={optimisticFavorite}
        variant={"outlined"}
        size={"icon"}
        className="size-8 border-destructive/15 bg-destructive/5 hover:bg-destructive/10 [&_svg]:stroke-destructive [&_svg]:data-[favorite=true]:fill-destructive"
      >
        <Heart />
      </Button>
    </div>
  );
}

type Props = {
  bookId: TBook["id"] | undefined;
  favored_by_user_IDs: TBook["favored_by_user_IDs"] | undefined;
  singleBookEntry: TBookEntry | null;
  bookInfo: TBook | null;
  customLists: TCustomLists[] | null;
  generalSettings: GeneralSettings;
};
