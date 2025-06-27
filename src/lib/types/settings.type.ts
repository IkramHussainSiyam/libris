import { enum as enum_, string, z } from "zod";
import { $Enums } from "~/lib/prisma/generated/client";

export const accountSettingsSchema = z.object({
  user_name: string()
    .min(3, "User name required with least 3 characters.")
    .max(30, "User name can't be longer than 30 characters.")
    .refine((val) => !val.includes(" "), {
      message: "Username can't contain spaces.",
    }),
  image: string().url("Invalid URL"),
  banner: string().url("Invalid URL"),
  bio: string().min(20, "Bio required with least 20 characters.").optional(),
  account_visibility: enum_(["private", "public"]).optional(),
});

export const generalSettingsSchema = z.object({
  default_feed_tab: z.custom<$Enums.FeedTab>().default("global").optional(),

  default_explore_order: z
    .custom<$Enums.ExploreOrder>()
    .default("acsending")
    .optional(),

  default_bookEntry_status: z
    .custom<$Enums.EntryStatus>()
    .default("planning")
    .optional(),
});
