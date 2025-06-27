import { cache } from "react";
import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  currentBooksSubIds: array(string()),
});

export const getCurrentBooksSubjects_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const currentBooksSubjects = await db.subject.findMany({
        where: {
          id: {
            in: params?.currentBooksSubIds,
          },
        },
      });

      return { currentBooksSubjects };
    } catch (error) {
      throw error;
    }
  })
);
