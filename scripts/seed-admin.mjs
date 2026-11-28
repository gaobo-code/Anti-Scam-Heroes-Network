import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { administrators } from "../lib/admin-schema.mts";
import { hashPassword } from "../lib/admin-password.mjs";

async function seedAdmin() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is missing. Add the Neon connection string to .env.local.");
    process.exitCode = 1;
    return;
  }

  const db = drizzle(databaseUrl);
  const username = "Wangyu";
  const [existing] = await db.select({ id: administrators.id })
    .from(administrators)
    .where(eq(administrators.username, username))
    .limit(1);

  if (existing) {
    console.log(`The ${username} account already exists.`);
    return;
  }

  const password = process.env.ADMIN_PASSWORD || (process.stdin.isTTY ? "" : readFileSync(0, "utf8").replace(/\r?\n$/, ""));
  if (password.length < 8 || password.length > 256) {
    console.error(`Set ADMIN_PASSWORD or provide an 8–256 character password on stdin to create ${username}.`);
    process.exitCode = 1;
    return;
  }

  const [created] = await db.insert(administrators)
    .values({ username, passwordHash: await hashPassword(password) })
    .onConflictDoNothing({ target: administrators.username })
    .returning({ id: administrators.id });

  console.log(created ? `Created the ${username} account.` : `The ${username} account already exists.`);
}

try {
  await seedAdmin();
} catch {
  console.error("Could not initialize the administrator account. Verify the database connection and apply migrations first.");
  process.exitCode = 1;
}
