import { number, object, string } from "zod";
import { Prisma } from "../../../prisma/generated/client";

export type TReview = Prisma.ReviewGetPayload<{
  omit: { created_at: true; updated_at: true };
}> | null;

export const reviewSchema = object({
  score: number(),
  content: string().min(1000, "Review must be at least 1000 characters long."),
});
