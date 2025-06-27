import { cache } from "react";
import { object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  userID: string(),
});

export const getFavoriteBooks_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const favoriteBooks = await db.book.findMany({
        where: {
          favored_by_user_IDs: {
            has: params?.userID,
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return { favoriteBooks };
    } catch (error) {
      throw error;
    }
  })
);
