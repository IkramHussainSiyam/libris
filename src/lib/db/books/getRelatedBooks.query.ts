import { cache } from "react";
import { array, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = array(string());

export const getRelatedBooks_query = cache(
  withPublicQuery(schema, async function (relatedBookIds) {
    try {
      const relatedBooks = await db.book.findMany({
        where: {
          id: {
            in: relatedBookIds,
          },
        },
        omit: {
          created_at: true,
          updated_at: true,
        },
      });

      return { relatedBooks };
    } catch (error) {
      throw error;
    }
  })
);
