import { cn } from "~/lib/utils/utils";

export default function Container({
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div {...props} className={cn("container my-5 sm:my-10", className)}>
      {children}
    </div>
  );
}

type PageContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
