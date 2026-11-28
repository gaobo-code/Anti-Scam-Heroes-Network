import type { Viewport } from "next";
import Link from "next/link";
import LoginForm from "./login-form";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-art" aria-hidden="true">
          <div className="admin-art-window">
            <div className="admin-art-toolbar"><i /><i /><i /></div>
            <div className="admin-art-rail"><i /><i /><i /></div>
            <div className="admin-art-content"><i /><i /><i /></div>
          </div>
        </div>
        <section className="admin-login-panel" aria-labelledby="admin-login-title">
          <header>
            <span className="admin-mark" aria-hidden="true" />
            <h1 id="admin-login-title">网站管理后台</h1>
            <p>请使用管理员账号登录</p>
          </header>
          <LoginForm />
          <Link className="admin-back" href="/"><span aria-hidden="true">←</span> 返回网站</Link>
        </section>
      </div>
    </main>
  );
}
