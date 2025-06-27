"use server";

import { revalidatePath } from "next/cache";

export default async function revalidatePaths(paths: TPath[]) {
  for (const [path, type] of paths) {
    revalidatePath(path, type);
  }
}

type TType = "page" | "layout";
type TPath = [string, TType?];
