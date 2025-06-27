/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { TUser } from "~/lib/types/user.type";
import { getSessionUser_query } from "./session";

export function withUserQuery<TSchema extends z.ZodType<any, any>, TResult>(
  schema: TSchema,
  handler: THandler<TSchema, TResult>
) {
  return async (params?: z.infer<TSchema>): Promise<TResult | null> => {
    const sessionUser = await getSessionUser_query();

    if (sessionUser === null) {
      console.error(
        "Access denied: You must be logged in to access this resource."
      );
      return null;
    }

    if (params !== undefined) {
      const result = schema.safeParse(params);
      if (!result.success) {
        console.error(result.error.message);
        return null;
      }
      return handler(sessionUser, result.data);
    }

    return handler(sessionUser);
  };
}

type THandler<TSchema extends z.ZodType<any, any>, TResult> = (
  user: TUser,
  parsedData?: z.infer<TSchema>
) => Promise<TResult>;
