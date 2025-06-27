import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  user_ID: string(),
  options: custom<Omit<Prisma.UserFindManyArgs, "where">>().optional(),
});

export const getUsersFollowers_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_ID, options } = params ?? {};

    try {
      if (!user_ID) return null;

      const usersFollowers = await db.user.findMany({
        where: {
          following_IDs: {
            has: user_ID,
          },
        },
        ...options,
      });

      return usersFollowers;
    } catch (error) {
      throw error;
    }
  })
);
