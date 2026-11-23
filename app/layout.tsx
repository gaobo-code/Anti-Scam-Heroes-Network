import type { Metadata } from "next";
import "./globals.css";
import "./site-header.css";

export const metadata: Metadata = {
  title: { default: "反诈英雄网", template: "%s｜反诈英雄网" },
  description: "记录并纪念为揭露诈骗、守护普通人而付出的反诈英雄。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
