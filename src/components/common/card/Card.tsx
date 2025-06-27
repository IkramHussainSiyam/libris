import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";
import { cn } from "~/lib/utils/utils";

type CardRootProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Card({ className, asChild, ...props }: CardRootProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      className={cn(
        "flex items-center bg-light dark:bg-muted dark:text-accent-foreground",
        className
      )}
    />
  );
}

type ContentProps = {} & React.HTMLAttributes<HTMLDivElement>;
function CardContent({ ...props }: ContentProps) {
  return (
    <div
      {...props}
      className={cn("flex-1 w-full px-4 text-sm space-y-2.5", props.className)}
    />
  );
}

type DescriptionProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;
function CardDescription({ asChild = false, ...props }: DescriptionProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      {...props}
      className={cn("text-accent-foreground", props.className)}
    />
  );
}

type FooterProps = {} & React.HTMLAttributes<HTMLDivElement>;
function CardFooter({ ...props }: FooterProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-2 justify-between", props.className)}
    />
  );
}

type HeaderProps = {} & React.HTMLAttributes<HTMLDivElement>;
function CardHeader({ ...props }: HeaderProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-2 justify-between", props.className)}
    />
  );
}

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  containerClassName?: string;
} & React.ComponentProps<typeof Image>;
function CardImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  ...props
}: ImageProps) {
  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <Image
        {...props}
        className={cn("size-full object-cover", className)}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}

type StatsProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
function CardStats({ asChild = false, ...props }: StatsProps) {
  const Comp = asChild ? Slot : "div";

  return <Comp {...props} className={cn(props.className)} />;
}

type TitleProps = {
  asChild?: boolean;
} & React.HtmlHTMLAttributes<HTMLHeadingElement>;
function CardTitle({ className, asChild = false, ...props }: TitleProps) {
  const Comp = asChild ? Slot : "h4";

  return (
    <Comp
      {...props}
      className={cn("text-base text-foreground/80 font-medium", className)}
    />
  );
}

Card.Root = Card;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Stats = CardStats;
Card.Description = CardDescription;
Card.Footer = CardFooter;
