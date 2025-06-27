import { cache } from "react";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withAdminQuery } from "../_config/withAdminQuery";

const schema = object({
  subjectId: string(),
});

export const getCurrentSubjectsBooks_query = cache(
  withAdminQuery(schema, async function (_, params) {
    try {
      const currentSubjectsBooks = await db.book.findMany({
        where: {
          subject_IDs: {
            has: params?.subjectId,
          },
        },
      });

      return currentSubjectsBooks;
    } catch (error) {
      throw error;
    }
  })
);
