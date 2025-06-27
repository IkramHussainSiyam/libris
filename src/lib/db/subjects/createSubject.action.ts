"use server";
import { string, z } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { routes } from "~/lib/static-data/routes";
import revalidatePaths from "../_config/revalidatePaths";
import { withAdminAction } from "../_config/withAdminAction";
import { isSubjectAlreadyExists } from "./getAllSubjects.query";
import { getErrorMessage } from "~/lib/utils/error-message";

const schema = z.object({
  name: string().min(3, "Subject name must be at least 3 characters long."),
});

export const createSubject_action = withAdminAction(
  schema,
  async function (_, { name }) {
    try {
      const { isExists } = await isSubjectAlreadyExists(name);

      if (isExists) {
        throw new Error(`Subject already exists: ${name}`);
      }

      await db.subject.create({ data: { name } });

      revalidatePaths([[routes.admin.subjects]]);
      return { success: true };
    } catch (error) {
      return { error: getErrorMessage(error), success: true };
    }
  }
);
