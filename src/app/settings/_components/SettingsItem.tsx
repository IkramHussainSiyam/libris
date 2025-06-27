import Show from "~/components/helpers/Show";
import { cn } from "~/lib/utils/utils";

export default function SettingsItem({
  children,
  heading,
  className,
  containerClassName,
  headingClassName,
  ...props
}: Props) {
  return (
    <div {...props} className={cn("space-y-3.5", containerClassName)}>
      <Show when={heading !== undefined}>
        <h3
          className={cn(
            "text-sm font-medium text-accent-foreground",
            headingClassName
          )}
        >
          {heading}
        </h3>
      </Show>
      <div className={cn(className)}>{children}</div>
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  heading?: string;
  containerClassName?: string;
  headingClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;
