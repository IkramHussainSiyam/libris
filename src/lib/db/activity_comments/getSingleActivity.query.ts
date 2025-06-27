import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = z.object({
  id: string(),
  options: custom<Omit<Prisma.ActivityFindUniqueArgs, "where">>().optional(),
  where: custom<Prisma.ActivityFindUniqueArgs["where"]>().optional(),
});

export const getSingleActivity_query = cache(
  withPublicQuery(schema, async function (params) {
    const { id, options, where } = params ?? {};

    try {
      const singleActivity = await db.activity.findUnique({
        where: {
          ...where,
          id,
        },
        ...options,
      });

      return singleActivity;
    } catch (error) {
      throw error;
    }
  })
);
