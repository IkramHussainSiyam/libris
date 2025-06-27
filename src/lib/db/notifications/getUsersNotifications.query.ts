import { cache } from "react";
import { custom, object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "../../../../prisma/generated/client";
import { withUserQuery } from "../_config/withUserQuery";

const schema = object({
  options: custom<Omit<Prisma.NotificationFindFirstArgs, "where">>().optional(),
  where: custom<Prisma.NotificationFindFirstArgs["where"]>().optional(),
});

export const getUsersNotifications_query = cache(
  withUserQuery(schema, async function (user, params) {
    try {
      const usersNotifications = await db.notification.findMany({
        where: {
          target_userID: user.id ?? "",
        },
        orderBy: {
          ...params?.options?.orderBy,
          created_at: "desc",
        },
        ...params?.options,
      });

      return usersNotifications;
    } catch (error) {
      throw error;
    }
  })
);
