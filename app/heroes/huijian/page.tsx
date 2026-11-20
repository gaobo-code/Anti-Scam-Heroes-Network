import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FriendlyLinks from "../../friendly-links";
import "../../home.css";
import "./story.css";

export const metadata: Metadata = { title: "徽剑 · 吴恺", description: "记住反诈人士徽剑（吴恺）：他揭露电诈、直面罪恶，最终遭报复杀害。" };
const timeline = [
  { year: "2023", title: "以个人力量，揭露电诈内幕", text: "开始长期关注缅北、柬埔寨等地的电诈园区，搜集黑产线索、整理犯罪证据，并通过个人平台持续公开披露。" },
  { year: "2024.08", title: "实名举报，拒绝妥协", text: "将整理的线索公之于众。面对删帖撤稿的游说，他拒绝妥协，坚持揭露电诈犯罪。" },
  { year: "2024.11.09", title: "最后的公开表达", text: "他谢绝公关游说，只接受线索对接与官方沟通。这成为他留给世间最后的坚守。" },
  { year: "2024.11", title: "因揭露电诈，遭报复遇害", text: "在广东惠州遭诱骗控制，后被跨省转移并遇害。警方随后侦破案件，多名涉案人员被追究刑责。" },
];

export default function HuijianPage() {
  return (
    <main className="landing biography">
      <header className="landing-header">
        <Link className="landing-brand" href="/" aria-label="反诈英雄网首页"><span className="landing-logo"><Image src="/brand-light.png" alt="" width={34} height={34} /></span><span>反诈英雄网<small>COURAGE, REMEMBERED.</small></span></Link>
        <nav className="landing-nav" aria-label="主导航">
          <FriendlyLinks />
          <Link href="/">返回首页</Link>
        </nav>
      </header>
      <div className="bio-container">
        <div className="bio-breadcrumb"><Link href="/">首页</Link><span aria-hidden="true">/</span><span>铭记英雄 · 001</span></div>
        <section className="bio-hero" aria-labelledby="bio-title">
          <div className="bio-hero-copy"><p className="bio-eyebrow">THE COURAGE TO SPEAK OUT</p><h1 id="bio-title">徽剑<span>吴恺 / WU KAI</span></h1><p className="bio-headline">他揭开黑暗，<br />我们<span>记住他的名字。</span></p><p className="bio-intro">因揭露电诈犯罪，遭犯罪集团报复杀害。<br />一个为受害者发声、与罪恶抗争的普通人，<br className="bio-desktop-break" />不该被遗忘。</p><div className="bio-actions"><Link className="bio-memorial-link" href="/heroes/huijian/memorial">祭奠徽剑 <span aria-hidden="true">↗</span></Link><a className="bio-scroll" href="#life">读他走过的路 <span aria-hidden="true">↓</span></a></div></div>
          <aside className="bio-profile" aria-label="徽剑的人物资料"><div className="bio-profile-top"><span>人物档案 <b>/ 001</b></span><span className="bio-profile-emblem" aria-hidden="true">✳</span></div><div className="bio-profile-person"><div className="bio-photo"><Image src="/wukai-color.png" alt="徽剑（吴恺）生前照片" fill sizes="(max-width: 540px) 112px, 144px" preload /></div><div className="bio-profile-identity"><span className="bio-profile-role">民间反诈人士</span><strong>徽剑</strong><span>本名 吴恺</span></div></div><dl className="bio-facts"><div><dt>故乡</dt><dd>安徽 · 安庆</dd></div><div><dt>早年经历</dt><dd>在深圳从事互联网行业</dd></div><div><dt>离世时间</dt><dd>2024 年 11 月</dd></div></dl><div className="bio-profile-dedication"><span aria-hidden="true">“</span><p>一台电脑，一个人的坚持。<br /><strong>为素不相识的人，选择站出来。</strong></p></div></aside>
        </section>
        <section className="bio-chapter bio-introduction" aria-labelledby="intro-title"><div className="bio-section-label"><span>01 / 人物</span><h2 id="intro-title">他是谁</h2></div><div className="bio-prose"><p className="bio-lead">徽剑，本名吴恺，安徽安庆人。早年在深圳从事互联网行业。他本可以安稳经营事业、平淡度日，却选择走上一条艰难而危险的民间反诈之路。</p><p>没有官方侦查权限，没有专业团队支撑。他凭一台电脑，日夜搜集线索、整理证据，通过个人平台持续曝光电诈内幕。他知道揭开黑产会招致报复，却仍拒绝向黑恶势力妥协。</p></div></section>
        <section className="bio-quote" aria-label="徽剑最后的坚守"><span className="bio-quote-symbol" aria-hidden="true">“</span><div><p>只接受线索对接、官方沟通。</p><span>2024.11.09 / 最后的公开表达摘录</span></div><span className="bio-quote-star" aria-hidden="true">✳</span></section>
        <section className="bio-chapter" id="life" aria-labelledby="life-title"><div className="bio-section-label"><span>02 / 生平</span><h2 id="life-title">他走过的路</h2><p>从揭露罪恶，<br />到最后的坚守。</p></div><div className="bio-timeline">{timeline.map((item,index)=><article className="bio-event" key={item.year}><div className="bio-event-meta"><time>{item.year}</time><span>0{index+1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}<p className="bio-source">整理依据：本站收到的《徽剑介绍》材料。</p></div></section>
        <section className="bio-chapter bio-legacy" aria-labelledby="legacy-title"><div className="bio-section-label"><span>03 / 铭记</span><h2 id="legacy-title">勇气的回响</h2></div><div className="bio-prose"><h3>揭露罪恶的人，<br />不该付出<span>生命的代价。</span></h3><p>徽剑的故事提醒我们：诈骗从来不只是屏幕另一端的数字，而是一条侵害信任、自由与生命的黑色链条。记住他，是不忘受害者的苦难，也不忘为守护他人而牺牲的人。</p></div></section>
        <section className="bio-accountability" aria-labelledby="accountability-title"><div className="bio-accountability-label"><span>04 / 追责</span><span aria-hidden="true">↗</span></div><h2 id="accountability-title">记住英雄，<br />也要让罪恶<span>付出代价。</span></h2><div className="bio-accountability-bottom"><p>揭露迫害与暴行，追问犯罪者的责任。<br />让伤害无辜者的人，受到法律的惩处。</p><Link href="/criminals">查看罪犯页面 <span aria-hidden="true">↗</span></Link></div></section>
      </div>
      <footer className="landing-footer"><Link href="/" className="landing-footer-brand"><Image src="/brand-light.png" alt="" width={26} height={26} />反诈英雄网</Link><p>纪念与电诈恶势力抗争、为守护人民而付出的英雄。</p><span>铭记英雄 · 001</span></footer>
    </main>
  );
}