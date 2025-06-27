import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";
import { getSingleUser_query } from "./getSingleUser.query";

const schema = object({
  singeUser_username: string(),
  options: custom<Omit<Prisma.UserFindManyArgs, "where">>().optional(),
});

export const getUsersFollowings_query = cache(
  withPublicQuery(schema, async function (params) {
    const { singeUser_username, options } = params ?? {};

    try {
      const singleUser = await getSingleUser_query({
        user_name: singeUser_username ?? "",
        options: { select: { following_IDs: true } },
      });

      const usersFollowings = await db.user.findMany({
        where: {
          id: {
            in: singleUser?.following_IDs,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        ...options,
      });

      return usersFollowings;
    } catch (error) {
      throw error;
    }
  })
);
