import { Prisma } from "@prisma/client";

export type TUser = Prisma.UserGetPayload<{
  omit: { emailVerified: true; name: true };
}>;
