import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/admin-schema.mts",
  out: "./drizzle",
  ...(url ? { dbCredentials: { url } } : {}),
});
