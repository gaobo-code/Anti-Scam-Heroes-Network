import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "./seo";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./home.css";

export const metadata = pageMetadata("/");

const tributeImageSizes = "(max-width: 767px) min(89vw, 542px), (max-width: 1100px) 45vw, 460px";

export default function Home() {
  return (
    <main className="landing landing-home" id="top">
      <SiteHeader action={{ href: "/heroes/huijian", label: "阅读故事" }} showFriendlyLinks />
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-label"><span><i /> 纪念与电诈恶势力抗争的英雄</span><span className="landing-motto">铭记牺牲 / 守护正义</span></div>
        <div className="landing-composition">
          <div className="landing-copy"><p className="landing-eyebrow">他们为揭露罪恶而战，我们为铭记英雄而来。</p><h1 id="landing-title">不忘记<span className="landing-title-line">每位<span className="landing-highlight">英雄<span className="landing-period">.</span></span></span></h1><p className="landing-description">他们揭露电诈、直面暴力，为受害者发声。<br />有人因此付出生命。我们不能让他们被遗忘。</p><Link className="landing-story-link" href="/heroes/huijian">从徽剑的故事开始 <span aria-hidden="true">↗</span></Link></div>
          <aside className="landing-feature" aria-labelledby="featured-name">
            <div className="landing-card-top"><span>铭记英雄 / 001</span><span className="landing-card-star" aria-hidden="true">✳</span></div>
            <div className="landing-person">
              <div className="landing-avatar">
                <Image src="/wukai.png" alt="徽剑（吴恺）的照片" fill sizes="(max-width: 767px) clamp(86px, 22vw, 108px), 120px" preload />
              </div>
              <div>
                <p>民间反诈人士</p>
                <h2 id="featured-name">吴恺</h2>
                <span className="landing-person-pinyin" lang="zh-Latn">WU KAI</span>
              </div>
            </div>
            <p className="landing-card-text">他揭露缅北、柬埔寨电诈园区的罪恶，<br />因触动犯罪集团利益，遭报复杀害。<br />他叫吴恺，人们记住他的名字：<strong>徽剑</strong>。</p>
            <Link className="landing-read" href="/heroes/huijian"><span>走近徽剑<small>阅读他的故事</small></span><span className="landing-arrow" aria-hidden="true">↗</span></Link>
          </aside>
        </div>
      </section>
      <div className="landing-ribbon" aria-hidden="true"><span>铭记英雄</span><i>✳</i><span>REMEMBER THE BRAVE</span><i>✳</i><span>不忘牺牲，守护正义</span><i>✳</i><span>铭记英雄</span></div>
      <section className="landing-purpose" id="purpose" aria-labelledby="purpose-title">
        <div>
          <div className="landing-purpose-label">
            <span className="landing-purpose-label-en" lang="en">OUR PURPOSE</span>
            <span className="landing-purpose-label-zh">关于这份纪念</span>
          </div>
          <p className="landing-purpose-note">在祭奠园献一束花，把敬意与思念留给每一位反诈英雄。</p>
        </div>
        <div className="landing-purpose-body">
          <h2 id="purpose-title">揭露罪恶的人，<br />不该付出<span>生命的代价。</span></h2>
          <div className="landing-purpose-details">
            <p>缅北、柬埔寨电诈园区背后的犯罪势力，以诈骗掠夺财产，以拘禁、虐待和暴力迫害无辜的人。面对这些罪恶，有人选择揭露，有人坚持抗争。</p>
            <p>反诈英雄网为纪念这些英雄而建。徽剑因揭露电诈犯罪遭报复杀害，他的经历提醒我们：不能忘记受害者的苦难，也不能忘记为守护他人而牺牲的人。记录他们的故事，是对英雄的致敬，也是对罪恶永不妥协的态度。</p>
          </div>
          <Link
            className="landing-purpose-tribute"
            href="/heroes/huijian/memorial"
            aria-labelledby="landing-tribute-title"
          >
            <div className="landing-tribute-gallery">
              <figure className="landing-tribute-image">
                <Image
                  src="/memorial-landscape.png"
                  alt="松树与银杏掩映着湖面，远处是雾中的山峦"
                  fill
                  sizes={tributeImageSizes}
                />
                <figcaption>徽剑祭奠园风景</figcaption>
              </figure>
              <figure className="landing-tribute-image">
                <Image
                  src="/memorial-flowers.webp"
                  alt="一束白菊放在湖畔园中的石台上"
                  fill
                  sizes={tributeImageSizes}
                />
                <figcaption>献花意象</figcaption>
              </figure>
            </div>
            <div className="landing-tribute-body">
              <div>
                <h3 id="landing-tribute-title">徽剑的祭奠园</h3>
                <p>在这里为徽剑献上一束花，写下想对他说的话。</p>
              </div>
              <span className="landing-tribute-action" aria-hidden="true">进入徽剑的祭奠园</span>
            </div>
          </Link>
        </div>
      </section>
      <SiteFooter action={{ href: "#top", label: "返回顶部" }} />
    </main>
  );
}
