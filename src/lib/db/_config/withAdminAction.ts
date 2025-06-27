/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { TUser } from "~/lib/types/user.type";
import { getErrorMessage } from "~/lib/utils/error-message";
import { isAdmin } from "./main";
import { getSessionUser_query } from "./session";

export function withAdminAction<TSchema extends z.ZodType<any, any>, TResult>(
  schema: TSchema,
  handler: THandler<TSchema, TResult>
) {
  return async (params: z.infer<TSchema>) => {
    try {
      const sessionUser = await getSessionUser_query();

      if (!sessionUser) {
        return {
          success: false,
          error: "Access denied: You must be logged in to perform this action.",
        };
      }

      if (!isAdmin(sessionUser?.email ?? "")) {
        return {
          success: false,
          error: "Access denied: You must be an admin to perform this action.",
        };
      }

      const result = schema.safeParse(params ?? {});
      if (!result.success) {
        return {
          success: false,
          error: getErrorMessage(result.error.message),
        };
      }

      const res = await handler(sessionUser, result.data);

      return {
        success: res.success,
        error: getErrorMessage(res.error) ?? null,
        data: res.data ?? null,
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  };
}

type THandler<TSchema extends z.ZodType<any, any>, TResult> = (
  user: TUser,
  parsedData: z.infer<TSchema>
) => Promise<{
  success: boolean;
  error?: unknown;
  data?: TResult;
}>;
