import { Prisma } from "@prisma/client";
import { cache } from "react";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withUserQuery } from "../_config/withUserQuery";

const schema = object({
  options: custom<Omit<Prisma.SettingFindUniqueArgs, "where">>().optional(),
  where: custom<Prisma.SettingFindUniqueArgs["where"]>().optional(),
});

export const getGeneralSettings_query = cache(
  withUserQuery(schema, async function (user, params) {
    try {
      const usersGeneralSettings = await db.setting.findUnique({
        where: {
          ...params?.where,
          user_ID: user.id ?? "",
        },
        ...params?.options,
      });

      return usersGeneralSettings;
    } catch (error) {
      throw error;
    }
  })
);

export type GeneralSettings = Awaited<
  ReturnType<typeof getGeneralSettings_query>
>;
