import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "网站管理后台",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin">{children}</div>;
}
