"use client";

import Show from "~/components/helpers/Show";
import {
  FormControl,
  FormDescription,
  FormMessage as FormErrorMessage,
  FormLabel,
  FormItem as ShadcnFormItem,
} from "~/components/ui/form";
import { cn } from "~/lib/utils/utils";

export default function FormItem({
  children,
  label,
  description,
  className,
}: Props) {
  return (
    <ShadcnFormItem className={cn(className)}>
      <Show when={label !== undefined}>
        <FormLabel className="text-foreground/85">{label}</FormLabel>
      </Show>
      <FormControl className="focus-visible:[&_input]:aria-[invalid=true]:ring-destructive">
        {children}
      </FormControl>
      <Show when={description !== undefined}>
        <FormDescription>This is your public display name.</FormDescription>
      </Show>
      <FormErrorMessage className={cn(className)} />
    </ShadcnFormItem>
  );
}

export function FormRootErrorMessage({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof FormErrorMessage>) {
  return (
    <FormErrorMessage className={cn(className)} {...props}>
      {children}
    </FormErrorMessage>
  );
}

type Props = {
  children: React.ReactNode;
  label?: string;
  description?: string;
  className?: string;
};
