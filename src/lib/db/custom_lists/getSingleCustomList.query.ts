import { Prisma } from "../../../../prisma/generated/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  customListId: string(),
  options: custom<Omit<Prisma.CustomListFindUniqueArgs, "where">>().optional(),
});

export const getSingleCustomList_query = cache(
  withPublicQuery(schema, async function (params) {
    const { customListId, options } = params ?? {};

    try {
      const singleCustomList = await db.customList.findUnique({
        where: {
          id: customListId,
        },
        ...options,
      });

      return singleCustomList;
    } catch (error) {
      throw error;
    }
  })
);
