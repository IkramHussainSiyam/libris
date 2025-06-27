"use client";

import { useTheme } from "next-themes";
import Show from "~/components/helpers/Show";
import Tooltip from "~/components/ui/tooltip";
import { cn } from "~/lib/utils/utils";

export default function ThemeSwitcher({
  variant = "dark",
  size = "md",
  showTitle = true,
}: {
  variant?: "light" | "dark";
  size?: "md" | "lg";
  showTitle?: boolean;
}) {
  const { setTheme } = useTheme();

  return (
    <div>
      <Show when={showTitle}>
        <h5 className="text-secondary font-semibold mb-4">App Theme</h5>
      </Show>
      <div className="flex items-center gap-3">
        <Tooltip
          variant={variant === "light" ? "dark" : "light"}
          content="Light Theme"
        >
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "text-left bg-light text-deep-gray",
              variant === "light" ? "border-secondary" : "border-muted",
              size === "lg"
                ? "size-9 flex items-end border-2 px-1.5"
                : "size-6 border px-0.5"
            )}
          >
            A
          </button>
        </Tooltip>
        <Tooltip
          variant={variant === "light" ? "dark" : "light"}
          content="Dark Theme"
        >
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "text-muted-foreground text-left",
              variant === "light"
                ? "bg-deep-gray border-secondary"
                : "bg-deep-gray border-muted",
              size === "lg"
                ? "size-9 flex items-end border-2 px-1.5"
                : "size-6 border px-0.5"
            )}
          >
            A
          </button>
        </Tooltip>
        <Tooltip
          variant={variant === "light" ? "dark" : "light"}
          content="System Theme"
        >
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "overflow-hidden relative bg-deep-gray text-muted-foreground text-left before:w-1/2 before:h-[130%] before:absolute before:bg-light before:-rotate-45",
              variant === "light" ? "border-secondary" : "border-muted",
              size === "lg"
                ? "size-9 flex items-end border-2 px-1.5 before:-right-2 before:-top-3"
                : "size-6 border px-0.5 before:-right-1 before:-top-2"
            )}
          >
            A
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
