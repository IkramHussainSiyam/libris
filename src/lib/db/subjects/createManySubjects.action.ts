"use server";

import { array, object, string } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { isManySubjectsAlreadyExists } from "./getAllSubjects.query";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = object({
  data: array(
    object({
      name: string().min(3, "Subject name must be at least 3 characters long."),
    })
  ),
});

export const createManySubjects_action = withAdminAction(
  schema,
  async function (_, { data }) {
    try {
      const { isExists, names } = await isManySubjectsAlreadyExists(
        data.map((s) => s.name)
      );

      if (isExists) {
        throw new Error(`Subjects already exists: ${names}`);
      }

      await db.subject.createMany({ data });

      revalidatePaths([[routes.admin.subjects]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
