import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "徽剑 · 吴恺", description: "民间反诈人士徽剑（吴恺）的生平纪念页。" };
const timeline = [
  { year: "2023", title: "走入反诈深水区", text: "开始长期关注缅北、柬埔寨等地的电诈园区，以个人力量搜集黑产线索、整理犯罪证据，并持续公开披露。" },
  { year: "2024.08", title: "实名公开举报", text: "将整理的线索公之于众。面对删帖撤稿的游说，他拒绝妥协，选择继续站在黑暗的对面。" },
  { year: "2024.11.09", title: "最后的公开表达", text: "他谢绝所有公关游说，只接受线索对接与官方沟通。这成为他留给世间最后的坚守。" },
  { year: "2024.11", title: "生命止于追凶途中", text: "他在广东惠州遭诱骗控制，后被跨省转移并遇害。警方随后侦破案件，多名涉案人员被追究刑责。" },
];

export default function HuijianPage() {
  return <main className="story-page">
    <nav className="site-nav story-nav" aria-label="主导航"><Link className="brand" href="/"><span className="brand-mark">徽</span><span>无诈英雄纪念网</span></Link><Link className="nav-back" href="/">← 返回英雄名录</Link></nav>
    <header className="story-hero">
      <div className="story-title"><p className="eyebrow">反诈英雄 · 001</p><h1>徽剑</h1><p className="real-name">本名 吴恺</p><blockquote>“只接受线索对接、官方沟通。”</blockquote><div className="story-meta"><span>安徽 · 安庆</span><span>民间反诈人士</span><span>逝于 2024 年</span></div></div>
      <div className="story-portrait-wrap"><div className="story-portrait"><Image src="/wukai.png" alt="徽剑（吴恺）的照片" fill sizes="(max-width: 800px) 90vw, 44vw" className="portrait-image" preload /></div><span className="photo-label">吴恺生前影像</span></div>
    </header>
    <section className="story-lead"><p className="dropcap">徽剑，本名吴恺，安徽安庆人。早年在深圳从事互联网行业。他本可以安稳经营事业、平淡度日，却选择走上一条艰难而危险的民间反诈之路。</p><p>没有官方侦查权限，没有专业团队支撑，也没有资源加持。他仅凭一台电脑，日夜搜集线索、整理证据，通过个人平台持续曝光电诈内幕。他知道揭开黑产会招致报复，却仍拒绝向黑恶势力妥协。</p></section>
    <section className="quote-band"><span className="quote-mark">“</span><p>当许多人选择绕开黑暗，<br />他选择把灯举得更高。</p><span className="quote-caption">写给徽剑</span></section>
    <section className="timeline-section"><div className="section-heading light-heading"><div><p className="eyebrow">生平纪事</p><h2>他走过的反诈之路</h2></div><p>内容依据本站收到的介绍材料整理</p></div><div className="timeline">{timeline.map((item, index) => <article className="timeline-item" key={item.year}><span className="timeline-dot" /><p className="timeline-year">{item.year}</p><div><span className="timeline-count">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
    <section className="legacy-section"><div><p className="eyebrow">留下的回声</p><h2>一个人的生命会停止，<br />追问真相的脚步不会。</h2></div><p>徽剑的故事提醒我们：诈骗从来不只是屏幕另一端的数字，而是一条吞噬信任、自由与生命的黑色链条。记住他，不是停留在悲恸里，而是让更多人理解反诈的重量，让仍在发声的人不再孤单。</p></section>
    <section className="memorial-cta"><div><p className="eyebrow">献一束花</p><h2>愿勇气长存，愿正义有回声</h2><p>前往线上纪念空间，为徽剑献上一束花。</p></div><Link className="memorial-button" href="/heroes/huijian/memorial">前往祭奠 <span aria-hidden="true">→</span></Link></section>
    <footer><Link href="/">无诈英雄纪念网</Link><p>谨以此站，纪念每一位照亮黑暗的人。</p><span>英雄 · 001</span></footer>
  </main>;
}
