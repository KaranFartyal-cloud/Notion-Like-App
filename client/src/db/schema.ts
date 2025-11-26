import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// ------------------ USERS ------------------
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// ------------------ SUBJECTS ------------------
export const subjectTable = pgTable("subjects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon"),
  banner: text("banner"),

  // 👇 FOREIGN KEY: subject belongs to a user
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

    
});

// ------------------ PAGES ------------------
export const pageTable = pgTable("pages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon"),
  banner: text("banner"),
  content: text("content"),

  // 👇 FOREIGN KEY: page belongs to a subject
  subjectId: integer("subject_id")
    .notNull()
    .references(() => subjectTable.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSubject = typeof subjectTable.$inferInsert;
export type SelectSubject = typeof subjectTable.$inferSelect;

export type InsertPage = typeof pageTable.$inferInsert;
export type SelectPage = typeof pageTable.$inferSelect;
