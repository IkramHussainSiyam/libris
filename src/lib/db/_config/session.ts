"use server";
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "~/lib/auth";
import { db } from "~/lib/conf/prisma.conf";
import { Prisma } from "~/lib/prisma/generated/client";

const getSessionUserDetails_query = cache(async function ({
  id,
  options,
}: {
  id?: string;
  options?: SessionUserArgs["options"];
}) {
  try {
    const sessionUserDetails = await db.user.findUnique({
      ...options,
      where: {
        ...options?.where,
        id,
      },
    });

    return sessionUserDetails;
  } catch (error) {
    throw error;
  }
});

export async function getSessionUser_query(
  options?: SessionUserArgs["options"]
) {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) {
    console.error("User not found.");
    return null;
  }

  const sessionUser = await getSessionUserDetails_query({
    id: session?.user?.id,
    options,
  });

  return sessionUser;
}

export type SessionUserArgs = {
  options?: Omit<Prisma.UserFindUniqueArgs, "where"> & {
    where?: Prisma.UserFindUniqueArgs["where"];
  };
};
