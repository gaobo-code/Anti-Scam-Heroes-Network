import type { MetadataRoute } from "next";
import { seoPages, siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seoPages).map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
