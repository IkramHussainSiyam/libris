"use client";

import {
  BadgeInfo,
  CheckCircle,
  Loader,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const icons = () => {
    return {
      success: <CheckCircle className="size-5 stroke-green-600" />,
      error: <XCircle className="size-6 fill-destructive stroke-light" />,
      info: <BadgeInfo className="size-6 stroke-blue-600" />,
      warning: <TriangleAlert className="size-6 stroke-amber-600" />,
      loading: <Loader className="size-6 animate-spin" />,
    };
  };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={icons()}
      {...props}
    />
  );
};

export { Toaster };
