"use client";

import { ArrowUpDown, Search, Tags, X } from "lucide-react";
import { filterSchema } from "~/components/common/others/FilterBoxes";
import For from "~/components/helpers/For";
import Show from "~/components/helpers/Show";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { useTypedSearchParams } from "~/lib/hooks/useTypedSearchParams";
import { useFilterBoxStore } from "~/lib/hooks/zustand/useFilterBoxStore";
import { cn } from "~/lib/utils/utils";

export default function SelectedFilterOptions() {
  const { queryParams, clearQueryParams } = useTypedSearchParams(filterSchema);
  const { isFilterBoxOpen } = useFilterBoxStore();

  return (
    <Show
      when={
        queryParams?.search !== undefined ||
        queryParams?.subjects !== undefined ||
        queryParams?.sortBy !== undefined
      }
    >
      <div className={cn("mt-8 gap-3", isFilterBoxOpen ? "flex" : "hidden")}>
        <div className="flex items-center flex-wrap gap-2">
          <Show when={queryParams?.search !== undefined}>
            <Badge className="rounded-sm px-1.5 font-normal bg-muted hover:bg-muted/80 items-start">
              <Search /> {queryParams?.search}
            </Badge>
          </Show>

          <Show when={queryParams?.subjects !== undefined}>
            <For
              each={queryParams?.subjects?.split(",") ?? []}
              render={(sub) => (
                <Badge key={sub} className="rounded-sm px-1.5 font-normal">
                  <Tags /> {sub}
                </Badge>
              )}
            />
          </Show>

          <Show when={queryParams?.sortBy !== undefined}>
            <Badge className="rounded-sm px-1.5 font-normal bg-secondary hover:bg-secondary/80">
              <ArrowUpDown /> {queryParams?.sortBy}
            </Badge>
          </Show>

          <Button
            onClick={clearQueryParams}
            variant={"destructive"}
            className="rounded-sm px-1.5 h-[22px] text-xs font-normal gap-0.5"
          >
            Clear all <X className="size-3" />
          </Button>
        </div>
      </div>
    </Show>
  );
}
