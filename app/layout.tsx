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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
            const previousRestoration = history.scrollRestoration;
            history.scrollRestoration = "manual";

            const resetScroll = () => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              // The browser can still adjust the scroll position after pageshow.
              requestAnimationFrame(() => {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                history.scrollRestoration = previousRestoration;
              });
            };

            window.addEventListener("pageshow", resetScroll, { once: true });
          }
        ` }} />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
