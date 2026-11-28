"use server";

import { and, eq, isNull, lte, or, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/admin-password.mjs";
import { administrators } from "@/lib/admin-schema.mts";
import { endAdminSession, startAdminSession } from "@/lib/admin-session";
import { getDatabase } from "@/lib/db";

type LoginState = { error: string } | null;

const maxFailedAttempts = 5;

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username");
  const password = formData.get("password");
  const invalidLogin = { error: "账号或密码错误。" };
  const lockedLogin = { error: "密码连续输错 5 次，账号已锁定 24 小时。请在锁定期结束后重试。" };

  if (typeof username !== "string" || typeof password !== "string" ||
      !username.trim() || username.length > 64 || !password || password.length > 256) {
    return invalidLogin;
  }

  try {
    const db = getDatabase();
    const matchingUsername = eq(administrators.username, username.trim());
    const [admin] = await db.select({
      id: administrators.id,
      passwordHash: administrators.passwordHash,
      locked: sql<boolean>`coalesce(${administrators.lockedUntil} > now(), false)`,
    }).from(administrators).where(matchingUsername);

    if (!admin) return invalidLogin;
    if (admin.locked) return lockedLogin;

    const passwordMatches = await verifyPassword(password, admin.passwordHash);
    // An expired lock starts a fresh count. Concurrent updates use the current row values.
    const failedAttempts = sql`case when ${administrators.lockedUntil} is not null then 1 else ${administrators.loginAttempts} + 1 end`;
    const [attempt] = await db.update(administrators).set(passwordMatches
      ? { loginAttempts: 0, lockedUntil: null }
      : {
          loginAttempts: failedAttempts,
          lockedUntil: sql`case when ${failedAttempts} >= ${maxFailedAttempts} then now() + interval '24 hours' end`,
        },
    ).where(and(
      eq(administrators.id, admin.id),
      matchingUsername,
      eq(administrators.passwordHash, admin.passwordHash),
      or(isNull(administrators.lockedUntil), lte(administrators.lockedUntil, sql`now()`)),
    )).returning({ lockedUntil: administrators.lockedUntil });

    if (!attempt) return invalidLogin;
    if (!passwordMatches) return attempt.lockedUntil ? lockedLogin : invalidLogin;

    await startAdminSession(admin.id);
  } catch {
    return { error: "暂时无法登录，请稍后再试。" };
  }

  redirect("/baba");
}

export async function logout() {
  await endAdminSession();
  redirect("/baba/login");
}
