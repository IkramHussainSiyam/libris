/* eslint-disable @typescript-eslint/no-explicit-any */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ZodSchema, z } from "zod";

export function useTypedSearchParams<T extends ZodSchema<any>>(
  schema: T
): TReturn<T> {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert URLSearchParams to plain object
  const rawParams = Object.fromEntries(searchParams.entries());
  const parsed = schema.safeParse(rawParams);

  const isFirstQuery = Object.keys(rawParams).length === 0;

  const setQueryParams = (newParams: Partial<z.infer<T>>) => {
    const updated = {
      ...rawParams,
      ...newParams,
    };

    const filtered = Object.entries(updated).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    );

    const queryString = new URLSearchParams(
      filtered as [string, string][]
    ).toString();

    const url = `${pathname}?${decodeURIComponent(queryString)}`;

    route.replace(url);
    if (isFirstQuery) {
      route.push(url);
    } else {
      route.replace(url);
    }
  };

  const clearQueryParams = () => {
    route.replace(pathname);
    route.refresh();
  };

  return {
    queryParams: parsed.success ? parsed.data : null,
    isFirstQuery,
    setQueryParams,
    clearQueryParams,
  };
}

type TReturn<T extends ZodSchema<any>> = {
  queryParams: z.infer<T> | undefined;
  isFirstQuery: boolean;
  setQueryParams: (params: Partial<z.infer<T>>) => void;
  clearQueryParams: () => void;
};
