import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-session";
import { logout } from "../actions";
import AdminNavigation from "./admin-navigation";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<main className="admin-loading" role="status">正在验证登录状态…</main>}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}

async function DashboardShell({ children }: Readonly<{ children: ReactNode }>) {
  const admin = await requireAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-brand"><span className="admin-mark" aria-hidden="true" />网站管理后台</p>
        <AdminNavigation />
        <Link className="admin-back" href="/"><span aria-hidden="true">←</span> 返回网站</Link>
      </aside>
      <header className="admin-topbar">
        <h1>工作台</h1>
        <div className="admin-account">
          <span className="admin-avatar" aria-hidden="true">{admin.username.slice(0, 1).toUpperCase()}</span>
          <span>{admin.username}</span>
          <form action={logout}><button type="submit">退出登录</button></form>
        </div>
      </header>
      <main className="admin-content">{children}</main>
    </div>
  );
}
