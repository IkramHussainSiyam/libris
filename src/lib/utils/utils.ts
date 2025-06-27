import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and") // Replace & with 'and'
    .replace(/[^a-z0-9 ]+/g, "") // Remove all non-alphanumeric except spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim leading/trailing hyphens
}

export function isEmptyQuillContent(content: string): boolean {
  const cleaned = content
    .replace(/<p><br><\/p>/g, "")
    .replace(/<p><\/p>/g, "")
    .replace(/<br>/g, "")
    .replace(/\s/g, "");
  return cleaned.length === 0;
}
