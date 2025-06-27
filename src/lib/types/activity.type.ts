/* eslint-disable @typescript-eslint/no-empty-object-type */

import { object, string } from "zod";
import { Prisma } from "@prisma/client";

export type TActivity = Prisma.ActivityGetPayload<{}>;
export type TActivityComment = Prisma.ActivityCommentGetPayload<{}>;

export const activitySchema = object({
  content: string().min(1, "Content is required."),
  user_ID: string(),
});

export const activityCommentSchema = object({
  content: string().min(1, "Content is required."),
  activity_ID: string(),
});
