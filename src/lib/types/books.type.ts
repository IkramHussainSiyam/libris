import { $Enums, Prisma } from "@prisma/client";
import { array, date, number, object, string, z } from "zod";

export type TBook = Prisma.BookGetPayload<{
  omit: { created_at: true; updated_at: true };
}>;

export const createBookSchema = object({
  cover_url: string().url("Invalid URL"),
  name: string().min(8, "Book name required with least 8 characters"),
  description: z
    .string()
    .min(10, "Description required with least 10 characters"),
  author: string().nonempty("Author name required"),
  total_pages: number().min(1, "Total pages required"),
  published_date: date({ message: "Invalid date" }),
  subject_IDs: array(z.string()).min(1, "At least one subject required"),
  related_book_IDs: array(z.string()).optional(),
});

export type TBookListsImport = {
  book_entries: {
    progress: number | null;
    status: $Enums.ReadingStatus | null;
    private: boolean | null;
    book_ID: string;
    score: number | null;
    start_date: string | null;
    finish_date: string | null;
    total_repeats: number | null;
    notes: string | null;
    custom_list_IDs: string[];
  }[];
  custom_lists: {
    name: string;
    id: string;
  }[];
};
