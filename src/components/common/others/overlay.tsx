import { cn } from "~/lib/utils/utils";

export default function Overlay({
  className,
  ...props
}: { className?: string } & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none select-none absolute top-0 left-0 size-full bg-black/15",
        className
      )}
    />
  );
}
