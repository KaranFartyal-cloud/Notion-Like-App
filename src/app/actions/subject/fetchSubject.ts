import { db } from "@/db";
import { getCurrentUser } from "../helper/getCurrentUser";

export const fetchSubject = async (subjectId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "can't find user" };
    }

    const subject = await db.query.subjectTable.findFirst({
      where: (s, { eq }) => eq(s.id, subjectId),
    });

    if (!subject) {
      return { success: false, message: "subject not found" };
    }

    return { success: true, message: "subject found", data: subject };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error occured" };
  }
};
