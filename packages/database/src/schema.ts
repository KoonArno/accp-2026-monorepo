// ACCP Conference Database Schema
// สร้างใหม่จาก scratch - เพิ่ม tables ตามต้องการ

import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";

// ========== ENUMS ==========
export const userRoleEnum = pgEnum("user_role", ["admin", "staff", "user"]);

// ========== TABLES ==========

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ========== TYPE EXPORTS ==========
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
