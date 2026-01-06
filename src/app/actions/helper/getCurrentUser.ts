"use server";

import { db } from "@/db";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("session")?.value;

  if (!sessionId) return null;

  const session = await db.query.sessionsTable.findFirst({
    where: (s, { eq }) => eq(s.id, sessionId),
  });

  console.log(session);

  if (!session) return null;

  const user = await db.query.usersTable.findFirst({
    where: (u, { eq }) => eq(u.id, session.userId),
    columns: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
};
