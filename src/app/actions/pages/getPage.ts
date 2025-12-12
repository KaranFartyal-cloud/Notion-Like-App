"use server";

import { db } from "@/db";
import { getCurrentUser } from "../helper/getCurrentUser";
import { eq } from "drizzle-orm";

export const getPage = async (subjectId: string | undefined) => {
  if (!subjectId) {
    return { success: false, message: "not provided subjectId" };
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "can't find user" };
    }

    const page = await db.query.pageTable.findFirst({
      where: (p, { eq }) => eq(p.subjectId, subjectId),
    });

    if (!page) {
      return { success: false, message: "can't find page" };
    }

    return { success: true, data: page, message: "page found" };
  } catch (error) {}
};
