import { cache } from "react";
import { object, string } from "zod";
import { withPublicQuery } from "../_config/withPublicQuery";

import { getSessionUser_query } from "../_config/session";
import { getBookEntries_query } from "../book_entries/getBookEntries.query";
import { getAllBooks_query } from "../books/getAllBooks.query";
import { getSingleUser_query } from "../users/getSingleUser.query";

const schema = object({
  user_name: string(),
  customListId: string(),
});

export const getCustomListsBooks_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_name, customListId } = params ?? {};

    try {
      const [singleUser, sessionUser] = await Promise.all([
        getSingleUser_query({
          user_name,
          options: { select: { id: true } },
        }),
        getSessionUser_query({ select: { id: true } }),
      ]);
      const isOwnProfile = singleUser?.id === sessionUser?.id;

      const bookEntries = await getBookEntries_query({
        user_ID: singleUser?.id ?? "",
        where: {
          custom_list_IDs: {
            has: customListId,
          },
          // if it's his own profile he'll be able see his own private custom list entries but others cannot
          private: isOwnProfile ? undefined : false,
        },
      });

      const customListsBooks = await getAllBooks_query({
        options: {
          where: {
            id: {
              in: bookEntries?.map((entry) => entry.book_ID),
            },
          },
        },
      });

      return customListsBooks;
    } catch (error) {
      throw error;
    }
  })
);
