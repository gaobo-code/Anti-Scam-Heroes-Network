import type { Metadata } from "next";
import { siteName, siteUrl } from "./seo";
import "./globals.css";
import "./site-header.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteName,
  description: "记录并纪念为揭露诈骗、守护普通人而付出的反诈英雄。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
