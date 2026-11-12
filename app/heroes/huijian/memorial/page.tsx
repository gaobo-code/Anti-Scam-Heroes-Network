import type { Metadata } from "next";
import Link from "next/link";
import MemorialExperience from "./memorial-experience";

export const metadata: Metadata = { title: "祭奠徽剑", description: "为反诈英雄徽剑（吴恺）献上一束花。" };

export default function MemorialPage() {
  return <main className="memorial-page">
    <nav className="site-nav memorial-nav" aria-label="主导航"><Link className="brand" href="/"><span className="brand-mark">徽</span><span>无诈英雄纪念网</span></Link><Link className="nav-back" href="/heroes/huijian">← 返回徽剑生平</Link></nav>
    <MemorialExperience />
    <p className="memorial-footnote">愿每一份微小的纪念，都成为抵抗遗忘的力量。</p>
  </main>;
}
