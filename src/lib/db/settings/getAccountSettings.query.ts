import { cache } from "react";
import { object } from "zod";
import { db } from "~/lib/conf/prisma.conf";
import { withUserQuery } from "../_config/withUserQuery";

export const getUsersAccountSettings_query = cache(
  withUserQuery(object({}), async function (user) {
    try {
      const usersAccountSettings = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          user_name: true,
          image: true,
          banner: true,
          bio: true,
          account_visibility: true,
        },
      });

      return usersAccountSettings;
    } catch (error) {
      throw error;
    }
  })
);

export type AccountSettings = Awaited<
  ReturnType<typeof getUsersAccountSettings_query>
>;
