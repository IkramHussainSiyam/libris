import { cache } from "react";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withPublicQuery } from "../_config/withPublicQuery";

export const getAllSubjects_query = cache(
  withPublicQuery(object({}), async function () {
    try {
      const allSubjects = await db.subject.findMany({
        omit: {
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      return { allSubjects };
    } catch (error) {
      throw error;
    }
  })
);

export async function isSubjectAlreadyExists(name: string) {
  const { allSubjects } = await getAllSubjects_query();
  const isExists = allSubjects.some(
    (subject) => subject.name.toLowerCase() === name.toLowerCase()
  );

  return { isExists };
}

export async function isManySubjectsAlreadyExists(names: string[]) {
  const { allSubjects } = await getAllSubjects_query();
  const existingNames = new Set(allSubjects.map((s) => s.name.toLowerCase()));

  const duplicates = names.filter((name) =>
    existingNames.has(name.toLowerCase())
  );

  return { isExists: duplicates.length > 0, names: duplicates.join(", ") };
}
