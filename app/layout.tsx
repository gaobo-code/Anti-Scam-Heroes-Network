import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "无诈英雄纪念网", template: "%s｜无诈英雄纪念网" },
  description: "记录并纪念为揭露诈骗、守护普通人而付出的反诈英雄。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
