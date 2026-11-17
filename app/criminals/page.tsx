import type { Metadata } from "next";

export const metadata: Metadata = { title: "罪犯页面" };

export default function CriminalsPage() {
  return <main aria-label="罪犯页面" style={{ minHeight: "100svh", background: "#171c20" }} />;
}
