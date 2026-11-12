import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <nav className="site-nav" aria-label="主导航">
        <Link className="brand" href="/"><span className="brand-mark">徽</span><span>无诈英雄纪念网</span></Link>
        <span className="nav-note">让勇气被看见，让正义被记住</span>
      </nav>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">致敬民间反诈英雄</p>
          <h1>有人曾独自<br />站在黑暗对面</h1>
          <p className="hero-intro">记录那些为揭露诈骗、守护普通人而付出的人。这里保存他们的名字，也保存我们不愿遗忘的勇气。</p>
          <div className="hero-actions"><Link className="primary-button" href="/heroes/huijian">走近徽剑 <span aria-hidden="true">→</span></Link><a className="text-link" href="#heroes">查看英雄名录</a></div>
        </div>
        <Link className="portrait-feature" href="/heroes/huijian" aria-label="查看徽剑的生平">
          <div className="portrait-frame"><Image src="/wukai.png" alt="反诈人士徽剑（吴恺）的照片" fill sizes="(max-width: 800px) 88vw, 42vw" className="portrait-image" preload /></div>
          <div className="portrait-caption"><div><span className="caption-kicker">本期纪念人物</span><strong>徽剑 · 吴恺</strong></div><span className="round-arrow" aria-hidden="true">↗</span></div>
        </Link>
      </section>
      <section className="manifesto" aria-label="网站宗旨"><p className="manifesto-number">01</p><p>他们的选择，让更多人看见骗局背后的真相。</p><span className="manifesto-line" /><p>我们的记住，让孤勇不再沉入无声的时间。</p></section>
      <section className="heroes-section" id="heroes">
        <div className="section-heading"><div><p className="eyebrow">英雄名录</p><h2>记住，一个真实的人</h2></div><p>首位收录人物 · 持续整理中</p></div>
        <Link className="hero-record" href="/heroes/huijian">
          <div className="record-index">001</div><div className="record-photo"><Image src="/wukai.png" alt="徽剑（吴恺）" fill sizes="180px" className="portrait-image" /></div>
          <div className="record-copy"><p>民间反诈人士</p><h3>徽剑 <span>／ 吴恺</span></h3><p className="record-summary">以一己之力追查境外电诈线索，持续公开揭露黑产内幕。</p></div>
          <div className="record-years"><span>生于安徽安庆</span><strong>— 2024</strong></div><span className="record-cta">阅读生平 <span aria-hidden="true">→</span></span>
        </Link>
      </section>
      <footer><span>无诈英雄纪念网</span><p>谨以此站，纪念每一位照亮黑暗的人。</p><span>始于 2026</span></footer>
    </main>
  );
}
