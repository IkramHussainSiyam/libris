"use client";
import { use, useEffect } from "react";
import { object, string } from "zod";
import { Label } from "~/components/ui/label";
import { useTypedSearchParams } from "~/lib/hooks/useTypedSearchParams";
import { useFilterBoxStore } from "~/lib/hooks/zustand/useFilterBoxStore";
import { TSubject } from "~/lib/types/subjects.type";
import { cn } from "~/lib/utils/utils";
import Select from "../select/select";

export const filterSchema = object({
  subjects: string().optional(),
  sortBy: string().optional(),
  search: string().optional(),
});

const sortOptions = [
  "Newest",
  "Oldest",
  "Accending (name)",
  "Descending (name)",
];

export default function FilterBoxes({ className, subjectsPromise }: Props) {
  const { allSubjects: subjects } = use(subjectsPromise);
  const { queryParams, setQueryParams } = useTypedSearchParams(
    filterSchema.omit({ search: true })
  );

  const { isFilterBoxOpen, openFilterBox } = useFilterBoxStore();

  useEffect(() => {
    if (window.innerWidth > 1023) {
      openFilterBox();
    }
  }, [openFilterBox]);

  // Normalize subjects into array
  const selectedSubjects = queryParams?.subjects?.split(",") ?? [];
  const selectedSort = queryParams?.sortBy ?? "";

  return (
    <div className={cn(className, !isFilterBoxOpen && "hidden")}>
      <div className="space-y-1.5 w-full">
        <Label className="text-foreground/75 text-base ml-0.5">Filter By</Label>
        <Select
          placeholder="Subjects"
          className="bg-light dark:bg-muted hover:bg-light"
          options={subjects?.map((s) => s.name) ?? []}
          selected={selectedSubjects}
          onSelect={(opt) => {
            const updated = selectedSubjects.includes(opt)
              ? selectedSubjects.filter((s) => s !== opt)
              : [...selectedSubjects, opt];

            setQueryParams({ subjects: updated.join(",") });
          }}
          onClear={() => setQueryParams({ subjects: "" })}
          renderSelected={(selected) => `${selected?.length} Selected`}
          isSelected={(opt, selected) => selected?.includes(opt) ?? false}
          displayLabel={(sub) =>
            subjects?.find((s) => s.name === sub)?.name ?? "Unknown"
          }
        />
      </div>
      <div className="space-y-1.5 w-full">
        <Label className="text-foreground/75 text-base ml-0.5">Sort By</Label>
        <Select
          className="bg-light dark:bg-muted hover:bg-light"
          options={sortOptions}
          selected={selectedSort!}
          onSelect={(opt) => setQueryParams({ sortBy: opt })}
          onClear={() => setQueryParams({ sortBy: "" })}
          renderSelected={(selected) => selected}
          isSelected={(opt, selected) => selected === opt}
          displayLabel={(opt) => opt}
        />
      </div>
    </div>
  );
}

type Props = {
  className?: string;
  subjectsPromise: Promise<{ allSubjects: TSubject[] | null }>;
};
