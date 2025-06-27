import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { getSessionUser_query } from "../_config/session";
import { withPublicQuery } from "../_config/withPublicQuery";
import { getSingleUser_query } from "../users/getSingleUser.query";

const schema = object({
  user_name: string().optional(),
  options: custom<Omit<Prisma.CustomListFindManyArgs, "where">>().optional(),
  where: custom<Prisma.CustomListWhereInput>().optional(),
});

export const getCustomLists_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_name = undefined, options, where } = params ?? {};

    try {
      if (user_name !== undefined) {
        const singleUser = await getSingleUser_query({
          user_name,
          options: { select: { id: true } },
        });

        return await db.customList.findMany({
          where: {
            ...where,
            user_ID: singleUser?.id, // any user with matching user_name
          },
          ...options,
        });
      } else {
        const sessionUser = await getSessionUser_query({
          select: { id: true },
        });

        return await db.customList.findMany({
          where: {
            ...where,
            user_ID: sessionUser?.id, // current user
          },
          ...options,
        });
      }
    } catch (error) {
      throw error;
    }
  })
);
