import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  options:
    custom<Omit<Prisma.UserFindManyArgs, "orderBy" | "omit">>().optional(),
});

export const getAllUsers_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const allUsers = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        ...params?.options,
      });

      return { allUsers };
    } catch (error) {
      throw error;
    }
  })
);
