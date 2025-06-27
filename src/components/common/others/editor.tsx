"use client";
import dynamic from "next/dynamic";
import { ReactQuillProps } from "react-quill";
import LoadingText from "~/components/layout/loading/LoadingText";
import { cn, isEmptyQuillContent } from "~/lib/utils/utils";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <LoadingText noText showDots dotSize="8px" />,
});

export default function TextEditor({
  placeholder,
  hideToolbar = false,
  className,
  onChange: onEditorChange,
  ...props
}: Props) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "color",
    "background",
    "align",
    "link",
    "clean",
  ];

  return (
    <ReactQuill
      {...props}
      onChange={(val, delta, source, editor) => {
        const finVal = isEmptyQuillContent(val) ? "" : val;
        return onEditorChange?.(finVal, delta, source, editor);
      }}
      className={cn(className)}
      theme="snow"
      placeholder={placeholder}
      modules={hideToolbar ? { toolbar: false } : modules}
      formats={formats}
    />
  );
}

type Props = {
  hideToolbar?: boolean;
  className?: string;
} & ReactQuillProps;
