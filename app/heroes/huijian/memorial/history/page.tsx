import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../../../site-header";
import HistoryRecords from "./history-records";
import "./history.css";

export const metadata: Metadata = {
  title: "祭奠历史",
  description: "纪念徽剑（吴恺）的献花与悼词。",
};

export default function MemorialHistoryPage() {
  return (
    <main className="history-page">
      <SiteHeader action={{ href: "/heroes/huijian", label: "返回徽剑生平" }} />

      <div className="history-content">
        <section className="history-hero" aria-labelledby="history-title">
          <div className="history-landscape">
            <Image
              src="/memorial-landscape.png"
              alt=""
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1440px) 67vw, 960px"
              preload
            />
          </div>
          <div className="history-hero-copy">
            <p className="history-eyebrow">纪念吴恺 · 徽剑</p>
            <h1 id="history-title">祭奠历史</h1>
            <Link className="history-offer" href="/heroes/huijian/memorial">
              前往献花 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <HistoryRecords />
      </div>
    </main>
  );
}
