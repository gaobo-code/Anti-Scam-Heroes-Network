import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const administrators = pgTable("administrators", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  loginAttempts: integer("login_attempts").notNull().default(0),
  attemptWindowStartedAt: timestamp("attempt_window_started_at", { withTimezone: true }),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const administratorSessions = pgTable("administrator_sessions", {
  tokenHash: text("token_hash").primaryKey(),
  administratorId: integer("administrator_id").notNull()
    .references(() => administrators.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
