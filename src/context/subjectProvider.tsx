"use client";

import { createContext, useContext, useState } from "react";

export type Subject = {
  id: string;
  userId: string;
  title: string;
  icon: string | null;
  banner: string | null;
};

type SubjectsContextType = {
  subjects: Subject[];
  addSubject: (subject: Subject) => void;
  deleteSubject: (id: string | number) => void;
  setInitialSubjects: (subjects: Subject[]) => void;
};

const SubjectsContext = createContext<SubjectsContextType | null>(null);

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const addSubject = (subject: Subject) => {
    setSubjects((prev) => [...prev, subject]);
  };

  const deleteSubject = (id: string | number) => {
    const filterSubjects = subjects.filter((item) => item.id !== id);

    setSubjects(filterSubjects);
  };
  const setInitialSubjects = (subjectsFromDB: Subject[]) => {
    setSubjects(subjectsFromDB);
  };

  return (
    <SubjectsContext.Provider
      value={{ subjects, addSubject, deleteSubject, setInitialSubjects }}
    >
      {children}
    </SubjectsContext.Provider>
  );
}

export const useSubjects = () => {
  const ctx = useContext(SubjectsContext);
  if (!ctx) {
    throw new Error("useSubjects must be used within <SubjectsProvider>");
  }

  return ctx;
};
