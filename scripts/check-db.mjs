import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is missing. Add the Neon connection string to .env.local.");
  process.exitCode = 1;
} else {
  try {
    await drizzle(databaseUrl).execute(sql`SELECT 1`);
    console.log("Neon database connection is working.");
  } catch {
    console.error("Could not connect to Neon. Check DATABASE_URL and network access.");
    process.exitCode = 1;
  }
}
