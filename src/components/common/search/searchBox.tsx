"use client";
import { Menu, Search, X } from "lucide-react";
import If from "~/components/helpers/If";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSearchBox } from "./_hooks/useSearchBox";

export default function SearchBox({
  label = "Search",
  placeholder = "Search any books...",
}: {
  placeholder?: string;
  label?: string;
}) {
  const {
    text,
    setText,
    clear,
    handleSearchText,
    openFilterBox,
    closeFilterBox,
    isFilterBoxOpen,
  } = useSearchBox();

  return (
    <div className="flex items-center gap-3">
      <form action={handleSearchText} className="lg:space-y-1.5 w-full">
        <Label className="text-foreground/75 text-base ml-0.5 hidden lg:block">
          {label}
        </Label>
        <div className="relative bg-red-50">
          <Search className="size-4 stroke-accent-foreground absolute top-1/2 left-2.5 -translate-y-1/2 select-none pointer-events-none" />
          <Input
            type="text"
            name="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-8 bg-light dark:bg-muted shadow-md shadow-muted/5"
            placeholder={placeholder}
          />
          <Show when={text !== ""}>
            <X
              onClick={clear}
              className="size-4 stroke-accent-foreground absolute top-1/2 right-2.5 -translate-y-1/2 hover:stroke-foreground"
            />
          </Show>
        </div>
      </form>

      <div className="lg:hidden grid place-items-center">
        <Button
          onClick={isFilterBoxOpen ? closeFilterBox : openFilterBox}
          className="[&_svg]:size-6 h-9 px-2 rounded-none shadow-md shadow-muted/5"
        >
          <If condition={isFilterBoxOpen} then={<X />} otherwise={<Menu />} />
        </Button>
      </div>
    </div>
  );
}
