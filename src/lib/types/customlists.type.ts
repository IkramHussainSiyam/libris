import { object, string } from "zod";
import { Prisma } from "../../../prisma/generated/client";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TCustomLists = Prisma.CustomListGetPayload<{}>;

export const customListsSchema = object({
  name: string()
    .min(3, "List name required with least 3 characters")
    .max(30, "List name can't be longer than 30 characters."),
});
