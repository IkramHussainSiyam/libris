import { Prisma } from "../../../prisma/generated/client";

export type TUser = Prisma.UserGetPayload<{
  omit: { emailVerified: true; name: true };
}>;
