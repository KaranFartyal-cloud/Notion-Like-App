"use server";

import { db } from "@/db";
import bcrypt from "bcrypt";
import { usersTable } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { name, email, password } = data;

    const existingUser = await db.query.usersTable.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (existingUser) {
      return {
        success: false,
        message: "user is already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    console.log(typeof userId);

    await db.insert(usersTable).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });
    return { success: true, message: "user created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "couldn't create User" };
  }
}
