"use client";
import For from "~/components/helpers/For";
import { Button } from "~/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils/utils";

type Props = {
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export default function DataSelect({
  placeholder = "Select item...",
  options,
  defaultValue,
  value,
  onChange,
  className,
}: Props) {
  return (
    <SelectRoot
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      <Button
        asChild
        className={cn(
          "w-full bg-accent hover:bg-accent text-accent-foreground font-normal justify-between",
          className
        )}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Button>
      <SelectContent>
        <For
          each={options}
          render={(option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          )}
        />
      </SelectContent>
    </SelectRoot>
  );
}
