import { Prisma } from "~/lib/prisma/generated/client";

export type TSubject = Prisma.SubjectGetPayload<{
  omit: { created_at: true; updated_at: true };
}>;
