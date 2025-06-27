import { cn } from "~/lib/utils/utils";
import LoadingText from "./LoadingText";

export default function LoadingScreen({ className }: { className?: string }) {
  return (
    <div className="fixed top-0 left-0 z-[9999] w-screen h-screen grid place-items-center bg-accent">
      <LoadingText
        showDots
        className={cn("text-7xl font-display font-medium", className)}
      />
    </div>
  );
}
