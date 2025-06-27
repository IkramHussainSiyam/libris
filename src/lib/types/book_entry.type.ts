import { $Enums, Prisma } from "../../../prisma/generated/client";
import { array, boolean, custom, number, object, string } from "zod";

export type TReadingStatus = $Enums.ReadingStatus;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TBookEntry = Prisma.BookEntryGetPayload<{}>;

export const bookEntrySchema = object({
  book_ID: string(),

  status: custom<TReadingStatus>().default("planning").optional(),
  score: number().default(0).optional(),
  progress: number().default(0).optional(),
  start_date: string().optional(),
  finish_date: string().optional(),
  total_repeats: number().default(0).optional(),
  notes: string().optional(),
  private: boolean().default(false).optional(),
  custom_list_IDs: array(string()).optional(),
});
