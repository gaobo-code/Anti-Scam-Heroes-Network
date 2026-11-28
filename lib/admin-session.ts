import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { and, eq, gt, lte, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { administrators, administratorSessions } from "./admin-schema.mts";
import { getDatabase } from "./db";

const cookieName = "huijian_admin_session";
const sessionDuration = 8 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/baba",
} as const;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function readSessionToken() {
  const token = (await cookies()).get(cookieName)?.value;
  return token && /^[a-f0-9]{64}$/.test(token) ? token : undefined;
}

export async function startAdminSession(administratorId: number) {
  const db = getDatabase();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + sessionDuration);
  const token = randomBytes(32).toString("hex");
  const previousToken = await readSessionToken();

  if (previousToken) await db.delete(administratorSessions)
    .where(eq(administratorSessions.tokenHash, hashToken(previousToken)));

  await db.delete(administratorSessions).where(and(
    eq(administratorSessions.administratorId, administratorId),
    lte(administratorSessions.expiresAt, now),
  ));
  await db.insert(administratorSessions).values({ administratorId, expiresAt, tokenHash: hashToken(token) });
  (await cookies()).set(cookieName, token, { ...cookieOptions, expires: expiresAt });
}

export async function endAdminSession() {
  const token = await readSessionToken();
  if (token) await getDatabase().delete(administratorSessions)
    .where(eq(administratorSessions.tokenHash, hashToken(token)));

  (await cookies()).set(cookieName, "", { ...cookieOptions, maxAge: 0 });
}

export async function requireAdmin() {
  await connection();
  const token = await readSessionToken();
  if (!token) redirect("/baba/login");

  const [admin] = await getDatabase().select({ username: administrators.username })
    .from(administratorSessions)
    .innerJoin(administrators, eq(administrators.id, administratorSessions.administratorId))
    .where(and(
      eq(administratorSessions.tokenHash, hashToken(token)),
      gt(administratorSessions.expiresAt, sql`now()`),
    ));

  if (!admin) redirect("/baba/login");
  return admin;
}
