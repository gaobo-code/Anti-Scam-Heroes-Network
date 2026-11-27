import type { Viewport } from "next";
import { pageMetadata } from "../../../seo";
import SiteHeader from "../../../site-header";
import MemorialExperience from "./memorial-experience";

export const metadata = pageMetadata("/heroes/huijian/memorial");

export const viewport: Viewport = { interactiveWidget: "resizes-content" };

export default function MemorialPage() {
  return <main className="memorial-page">
    <SiteHeader action={{ href: "/heroes/huijian", label: "返回徽剑生平" }} overlay />
    <MemorialExperience />
    <p className="memorial-footnote">愿每一份微小的纪念，都成为抵抗遗忘的力量。</p>
  </main>;
}

