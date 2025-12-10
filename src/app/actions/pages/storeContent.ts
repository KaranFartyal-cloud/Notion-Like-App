"use server";

import { db } from "@/db";
import { getCurrentUser } from "../helper/getCurrentUser";
import { pageTable } from "@/db/schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

export const storeData = async (
  data: string,
  subjectId: string | undefined,
  title: string | undefined,
  icon?: string | undefined,
  banner?: string | undefined
) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "Can't get User" };
    }

    const page = await db.query.pageTable.findFirst({
      where: (page, { eq }) => eq(page.subjectId, subjectId),
    });

    if (!page) {
      const [createdPage] = await db
        .insert(pageTable)
        .values({
          id: uuid(),
          content: data,
          subjectId,
          title,
          icon,
          banner,
        })
        .returning();

      return { success: true, created: true, page: createdPage };
    } else {
      const [updatedPage] = await db
        .update(pageTable)
        .set({
          content: data,
          title,
          icon,
          banner,
        })
        .where(eq(pageTable.subjectId, subjectId))
        .returning();

      return { success: true, created: false, page: updatedPage };
    }
  } catch (error) {
    console.error("storeData error:", error);
    return { success: false, message: "Internal error" };
  }
};
