"use client";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils/utils";

type SelectProps<T> = {
  label?: string;
  placeholder?: string;
  options: string[];
  selected: T;
  clearable?: boolean;
  renderSelected: (selected: T) => string | string[];
  isSelected: (option: string, selected: T) => boolean;
  onSelect: (option: string) => void;
  onClear: () => void;
  displayLabel?: (value: string) => string; // 👈 new optional prop
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Select = <T extends unknown>({
  label,
  placeholder = "Any",
  options,
  selected,
  clearable = true,
  renderSelected,
  isSelected,
  onSelect,
  onClear,
  displayLabel,
  className,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const selectedCount = Array.isArray(selected)
    ? selected.length
    : selected
    ? 1
    : 0;

  return (
    <div className="space-y-2 w-full">
      <Show when={label !== undefined}>
        <Label className="text-foreground/75 ml-0.5 text-sm">{label}</Label>
      </Show>
      <Popover open={open} onOpenChange={setOpen}>
        <Button
          asChild
          role="combobox"
          aria-expanded={open}
          variant={"outlined"}
          className={cn(
            "justify-between bg-accent dark:bg-accent text-accent-foreground hover:bg-accent dark:hover:bg-accent w-full border-none shadow-none",
            className
          )}
        >
          <PopoverTrigger>
            <span>
              <span>
                {selectedCount > 0 ? renderSelected(selected) : placeholder}
              </span>
            </span>
            <If
              condition={clearable && selectedCount > 0}
              then={
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                >
                  <X className="stroke-muted-foreground" />
                </span>
              }
              otherwise={<ChevronsUpDown className="stroke-muted-foreground" />}
            />
          </PopoverTrigger>
        </Button>
        <PopoverContent align="start" className="w-full p-0 border-none">
          <Command>
            <CommandInput className="h-9" />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup>
                <For
                  each={options}
                  render={(option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={onSelect}
                      className={cn(
                        "capitalize",
                        isSelected(option, selected) && "text-primary"
                      )}
                    >
                      {displayLabel ? displayLabel(option) : option}
                      <Check
                        className={cn(
                          "ml-auto",
                          isSelected(option, selected)
                            ? "opacity-100 stroke-primary"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  )}
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Select;
