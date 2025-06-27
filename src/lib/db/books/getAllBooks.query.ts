import { cache } from "react";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";
import { withPublicQuery } from "../_config/withPublicQuery";

const schema = object({
  options: custom<Prisma.BookFindManyArgs>().optional(),
});

export const getAllBooks_query = cache(
  withPublicQuery(schema, async function (params) {
    try {
      const allBooks = await db.book.findMany(params?.options);
      return allBooks;
    } catch (error) {
      throw error;
    }
  })
);

export const isBookAlreadyExists = async (name: string) => {
  const allBooks = await getAllBooks_query();
  const isExists = allBooks.some(
    (book) => book.name.toLowerCase() === name.toLowerCase()
  );
  return { isExists };
};

export const isManyBooksAlreadyExists = async (names: string[]) => {
  const allBooks = await getAllBooks_query();
  const existingNames = new Set(allBooks.map((b) => b.name.toLowerCase()));

  const duplicates = names.filter((name) =>
    existingNames.has(name.toLowerCase())
  );

  return { isExists: duplicates.length > 0, names: duplicates.join(", ") };
};
