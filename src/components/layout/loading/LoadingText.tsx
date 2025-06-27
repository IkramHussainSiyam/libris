import Show from "~/components/helpers/Show";
import { cn } from "~/lib/utils/utils";
import "../../../lib/styles/motion/loading-text.css";

export default function LoadingText({
  className,
  showDots = false,
  noText = false,
  dotSize = "15px",
  containerClassName,
  ...props
}: ILoadingTextProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col gap-5",
        containerClassName
      )}
    >
      <Show when={!noText}>
        <span
          {...props}
          className={cn(
            "text-2xl font-heading loading-text before:content-['Loading...']",
            className
          )}
        />
      </Show>

      <Show when={showDots}>
        <div
          style={{ "--dot-size": dotSize } as React.CSSProperties}
          className="loading-dot"
        ></div>
      </Show>
    </div>
  );
}

type ILoadingTextProps = {
  showDots?: boolean;
  noText?: boolean;
  containerClassName?: string;
  dotSize?: string;
} & React.HTMLAttributes<HTMLSpanElement>;
