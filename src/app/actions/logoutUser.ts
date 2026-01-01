"use server";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema";
import { cookies } from "next/headers";
import { getCurrentUser } from "./helper/getCurrentUser";
import { eq } from "drizzle-orm";

export const logoutUser = async () => {
  try {
    const user = await getCurrentUser()

    console.log(user);
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return { success: false, message: "No session found" };
    }

    const sessionId = sessionCookie?.value;

    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));

    cookieStore.delete('session');

    return {success: true}
  } catch (error) {
    console.log(error)
    return {success: false}
  }
};
