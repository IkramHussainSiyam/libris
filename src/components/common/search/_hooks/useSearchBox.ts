import { useState } from "react";
import { useTypedSearchParams } from "~/lib/hooks/useTypedSearchParams";
import { useFilterBoxStore } from "~/lib/hooks/zustand/useFilterBoxStore";
import { filterSchema } from "../../others/FilterBoxes";

export function useSearchBox() {
  const { openFilterBox, closeFilterBox, isFilterBoxOpen } =
    useFilterBoxStore();

  const { setQueryParams, queryParams } = useTypedSearchParams(
    filterSchema.pick({ search: true })
  );

  const [text, setText] = useState(queryParams?.search ?? "");

  const clear = () => {
    setText("");
    setQueryParams({ search: undefined });
  };

  const handleSearchText = () => {
    setQueryParams({ search: text });
  };

  return {
    text,
    setText,
    clear,
    handleSearchText,
    openFilterBox,
    closeFilterBox,
    isFilterBoxOpen,
  };
}
