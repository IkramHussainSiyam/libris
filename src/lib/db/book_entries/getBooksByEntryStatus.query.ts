import { Prisma } from "@prisma/client";
import { cache } from "react";
import { custom, object, string } from "zod";
import { TReadingStatus } from "~/lib/types/book_entry.type";
import { getSessionUser_query } from "../_config/session";
import { withPublicQuery } from "../_config/withPublicQuery";
import { getAllBooks_query } from "../books/getAllBooks.query";
import { getSingleUser_query } from "../users/getSingleUser.query";
import { getBookEntries_query } from "./getBookEntries.query";

const schema = object({
  user_name: string().optional(),
  status: custom<TReadingStatus>(),
  options: custom<Omit<Prisma.BookFindManyArgs, "where">>().optional(),
  where: custom<Prisma.BookWhereInput>().optional(),
});

export const getBooksByEntryStatus_query = cache(
  withPublicQuery(schema, async function (params) {
    const { user_name, status, options, where } = params ?? {};

    try {
      let userId: string | undefined = undefined;
      let isOwnProfile = false;

      if (user_name !== undefined) {
        const [singleUser, sessionUser] = await Promise.all([
          getSingleUser_query({
            user_name,
            options: { select: { id: true } },
          }),
          getSessionUser_query({ select: { id: true } }),
        ]);

        if (singleUser === null) return [];

        userId = singleUser.id;
        isOwnProfile = singleUser.id === sessionUser?.id;
      }

      const bookEntries = await getBookEntries_query({
        user_ID: userId,
        where: {
          status,
          private: isOwnProfile ? undefined : false,
        },
        options: {
          select: { book_ID: true },
        },
      });

      const books = await getAllBooks_query({
        options: {
          ...options,
          where: {
            ...where,
            id: {
              in: bookEntries?.map((e) => e.book_ID),
            },
          },
        },
      });

      return books;
    } catch (error) {
      throw error;
    }
  })
);
