import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  user_name: string().optional(),
  options: custom<Omit<Prisma.UserFindUniqueArgs, "where">>().optional(),
  where: custom<Prisma.UserFindUniqueArgs["where"]>().optional(),
});

export const getSingleUser_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_name, options, where } = params ?? {};

    try {
      const singleUser = await db.user.findUnique({
        ...options,
        where: {
          ...where,
          user_name,
        },
      });

      return singleUser;
    } catch (error) {
      throw error;
    }
  })
);
