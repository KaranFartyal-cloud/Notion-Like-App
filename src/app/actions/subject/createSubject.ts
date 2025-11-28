"use server";

import { db } from "@/db";
import { getCurrentUser } from "../helper/getCurrentUser";
import { subjectTable } from "@/db/schema";
import { v4 as uuid } from "uuid";

export const createSubject = async (title: string) => {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return {
        success: false,
        message: "can't create workspaces, please login first",
      };
    }

    const subjectId = uuid();
    const userId = user.id;

    const [createdSubject] = await db
      .insert(subjectTable)
      .values({
        id: subjectId,
        userId: userId,
        title,
      })
      .returning();

    return {
      success: true,
      message: "subject created successfully",
      subject: createdSubject,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "can't create subject" };
  }
};
