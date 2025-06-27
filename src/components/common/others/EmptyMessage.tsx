import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils/utils";

export default function EmptyMessage({
  children,
  className,
  variant = "accent",
  ...props
}: Props) {
  const emptyMessageVariant = cva("w-full text-accent-foreground text-center", {
    variants: {
      variant: {
        accent: "bg-inherit py-1.5",
        light: "bg-light dark:bg-muted py-6",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  });

  return (
    <p {...props} className={cn(emptyMessageVariant({ className, variant }))}>
      {children}
    </p>
  );
}

type Props = {
  children: React.ReactNode;
  variant?: "light" | "accent";
} & React.HTMLAttributes<HTMLParagraphElement>;
