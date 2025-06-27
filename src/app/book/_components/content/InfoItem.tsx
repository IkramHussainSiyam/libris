import Show from "~/components/helpers/Show";
import { cn } from "~/lib/utils/utils";

export default function InfoItem({
  heading,
  description,
  className,
  children,
  ...props
}: InfoItemProps) {
  return (
    <div {...props} className={cn("space-y-1", className)}>
      <h4 className={"font-medium text-foreground/70 dark:text-foreground"}>
        {heading}
      </h4>
      <p className={"text-xs text-accent-foreground ml-0.5"}>{description}</p>
      <Show when={!description || description === ""}>
        <div className="text-xs text-accent-foreground ml-0.5 space-y-1">
          {children}
        </div>
      </Show>
    </div>
  );
}

type InfoItemProps = {
  heading: string;
  description?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
