import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  activity_ID: string(),
  options:
    custom<Omit<Prisma.ActivityCommentFindManyArgs, "where">>().optional(),
});

export const getActitysComments_query = cache(
  withPublicQuery(schema, async function (params) {
    const { activity_ID, options } = params ?? {};

    try {
      const activitysComments = await db.activityComment.findMany({
        where: {
          activity_ID: activity_ID,
        },
        ...options,
      });

      return activitysComments;
    } catch (error) {
      throw error;
    }
  })
);
