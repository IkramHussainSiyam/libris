/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export function withPublicQuery<TSchema extends z.ZodType<any, any>, TResult>(
  schema: TSchema,
  handler: THandler<TSchema, TResult>
) {
  return async (params?: z.infer<TSchema>): Promise<TResult> => {
    if (params !== undefined) {
      const result = schema.safeParse(params);
      if (!result.success) {
        throw new Error(result.error.message);
      }
      return handler(result.data);
    }

    return handler();
  };
}

type THandler<TSchema extends z.ZodType<any, any>, TResult> = (
  parsedData?: z.infer<TSchema>
) => Promise<TResult>;
