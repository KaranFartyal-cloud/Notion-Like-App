import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
});

export const subjectTable = pgTable("subjects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon"),
  banner: text("banner"),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const pageTable = pgTable("pages", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon"),
  banner: text("banner"),
  content: text("content"),

  subjectId: text("subject_id")
    .notNull()
    .references(() => subjectTable.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSubject = typeof subjectTable.$inferInsert;
export type SelectSubject = typeof subjectTable.$inferSelect;

export type InsertPage = typeof pageTable.$inferInsert;
export type SelectPage = typeof pageTable.$inferSelect;
