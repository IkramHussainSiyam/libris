import { cache } from "react";
import { custom } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = custom<Prisma.ActivityFindManyArgs>().optional().optional();

export const getAllActivities_query = cache(
  withPublicQuery(schema, async function (options) {
    try {
      const allActivities = await db.activity.findMany(options);

      return allActivities;
    } catch (error) {
      throw error;
    }
  })
);
