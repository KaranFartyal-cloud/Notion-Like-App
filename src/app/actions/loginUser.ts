"use server";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;
    if (!email || !password) {
      return { success: false, message: "provide all the fields" };
    }

    const user = await db.query.usersTable.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (!user) {
      return { success: false, message: "can't find user with this email" };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return { success: false, message: "user is not authenticated" };
    }

    const sessionId = uuid();

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await db.insert(sessionsTable).values({
      id: sessionId,
      userId: user.id,
      expiresAt: expires,
    });

    const cookiesStore = await cookies();

    cookiesStore.set("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires,
    });

    return { success: true, message: "Logged in" };
  } catch (error) {
    console.log(error);

    return { success: false, message: "Couldn't log in user" };
  }
};
