import type { Metadata, Viewport } from "next";
import { siteName, siteUrl } from "./seo";
import ServiceWorkerRegistration from "./service-worker-registration";
import "./globals.css";
import "./site-header.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteName,
  description: "记录并纪念为揭露诈骗、守护普通人而付出的反诈英雄。",
  appleWebApp: { capable: true, title: siteName },
};

export const viewport: Viewport = { themeColor: "#171c20" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
