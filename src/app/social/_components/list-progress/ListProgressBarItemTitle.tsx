import { cn } from "~/lib/utils/utils";

export default function ListProgressBarItemTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return (
    <h4
      className={cn(
        "text-sm text-accent-foreground font-medium mb-4 pl-3",
        props.className
      )}
    >
      {props.children}
    </h4>
  );
}
