import { cn } from "~/lib/utils/utils";
import TextEditor from "./editor";

export default function RenderRichText({
  richTextContents,
  className,
  textSize = "sm",
}: Props) {
  return (
    <TextEditor
      hideToolbar
      readOnly
      value={richTextContents}
      className={cn(
        className,
        textSize === "sm" ? "preview-mode-md" : "preview-mode-base"
      )}
    />
  );
}

type Props = {
  richTextContents: string;
  className?: string;
  textSize?: "sm" | "md";
};
