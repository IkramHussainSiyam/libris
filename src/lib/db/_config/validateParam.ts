import { notFound, redirect } from "next/navigation";

type GetterFn<T> = () => Promise<T[] | null>;

/**
 * @example
 * // redirects to 404 page if book_slug doesn't exist on db
 * await validateParam(getAllBooks, "slug", searchParams, "book_slug");
 */

export async function validateParam<T, P extends Record<string, string>>(
  getter: GetterFn<T>, // e.g., getAllBooks
  field: keyof T, // e.g., 'slug' | 'name' | 'id'
  params: P, // dynamic route params
  paramKey: keyof P, // e.g., 'bookSlug' | 'subjectId'
  action?: "not-found" | "void"
) {
  const records = await getter();
  const valueToMatch = params[paramKey];

  const isValid = records?.some(
    (item) => (item[field] as string) === valueToMatch
  );

  if (!isValid && action === "not-found") {
    notFound();
  } else {
    redirect("/");
  }
}
