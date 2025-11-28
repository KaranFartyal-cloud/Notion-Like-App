import { db } from "@/db";
import { getCurrentUser } from "../helper/getCurrentUser";

export const fetchSubjects = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "can't create workspaces, please login first",
      };
    }

    const subjects = await db.query.subjectTable.findMany({
      where: (subject, { eq }) => eq(subject.userId, user.id),
    });

    return {
      success: true,
      message: "subjects fetched successfullly",
      subjects: subjects,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "couldn't fetch subjects",
    };
  }
};
