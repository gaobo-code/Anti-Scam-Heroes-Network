import Image from "next/image";
import Link from "next/link";
import LiuRenLink from "../../criminals/liu-ren-link";
import { pageMetadata } from "../../seo";
import SiteFooter from "../../site-footer";
import SiteHeader from "../../site-header";
import "../../home.css";
import "./story.css";

export const metadata = pageMetadata("/heroes/huijian");
const timeline = [
  { year: "2023", title: "开始调查电诈园区", text: "徽剑开始关注缅北、柬埔寨等地的电诈园区，搜集线索、整理证据，并通过个人平台持续披露调查发现。" },
  {
    year: "2024.08",
    title: <>实名举报<LiuRenLink from="huijian" />团伙</>,
    text: "徽剑实名举报刘忍团伙并公开线索。刘忍团队随即派人私下开出高价，试图让他删帖撤稿，遭徽剑拒绝。",
  },
  { year: "2024.10", title: "针对徽剑的悬赏", text: "一名代号“少校”的境外人员通过加密软件悬赏杀害徽剑。赏金最初为30万元，后来增至100万元。" },
  { year: "2024.11.09", title: "最后一条朋友圈", text: "徽剑发布了生前最后一条朋友圈，明确表示，谢绝公关游说，只接受线索对接和官方沟通。" },
  { year: "2024.11.10", title: "在惠州被强行带走", text: "几名嫌疑人在广东惠州一处停车场冒充警察，将徽剑强行带走。他随后被转移到外省，并遭到严刑逼供。" },
  { year: "2024.11.11", title: "徽剑遇害", text: "徽剑在一处偏僻的山林中遭赵冰伤害身亡。赵冰用枯草遮盖遗体，随后与同伙离开现场。" },
  { year: "2024.11", title: "警方抓获境内涉案人员", text: "案发后半个月内，警方抓获赵冰等14名境内涉案人员。" },
  { year: "2025", title: "遇害后遭诬陷", text: "有人向徽剑的支付宝账户转账1.1万元，试图将这笔钱伪装成敲诈勒索所得。境外网络平台随后出现谣言，声称他因涉嫌敲诈而被捕。" },
  { year: "2025.12", title: "惠州中院一审宣判", text: "惠州中院以故意伤害罪判处赵冰死刑，缓期二年执行。其余13名被告人分别被判处一年三个月至八年不等的有期徒刑。" },
  { year: "2026.08", title: "广东高院二审维持原判", text: "广东高院二审裁定驳回上诉，维持原判。" },
];

export default function HuijianPage() {
  return (
    <main className="landing biography">
      <SiteHeader action={{ href: "/", label: "返回首页" }} showFriendlyLinks />
      <div className="bio-container">
        <div className="bio-breadcrumb"><Link href="/">首页</Link><span aria-hidden="true">/</span><span>铭记英雄 · 001</span></div>
        <section className="bio-hero" aria-labelledby="bio-title">
          <div className="bio-hero-copy">
            <p className="bio-eyebrow">THE COURAGE TO SPEAK OUT</p>
            <h1 id="bio-title">
              <span>吴恺</span>{" "}
              <span className="bio-title-alias">徽剑</span>
            </h1>
            <p className="bio-headline">他揭开黑暗，<br />我们<span>记住他的名字。</span></p>
            <p className="bio-intro">因揭露电诈犯罪，遭犯罪集团报复杀害。<br />一个为受害者发声、与罪恶抗争的普通人，<br className="bio-desktop-break" />不该被遗忘。</p>
            <div className="bio-actions">
              <Link className="bio-memorial-link" href="/heroes/huijian/memorial">祭奠徽剑 <span aria-hidden="true">↗</span></Link>
              <Link className="bio-history-link" href="/heroes/huijian/memorial/history">
                <span className="bio-history-icon" aria-hidden="true" />
                祭奠历史
                <span className="bio-history-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <aside className="bio-profile" aria-label="徽剑的人物资料"><div className="bio-profile-top"><span>人物档案 <b>/ 001</b></span><span className="bio-profile-emblem" aria-hidden="true">✳</span></div><div className="bio-profile-person"><div className="bio-photo"><Image src="/wukai.webp" alt="徽剑（吴恺）生前照片" fill sizes="(max-width: 540px) 112px, 144px" preload /></div><div className="bio-profile-identity"><span className="bio-profile-role">民间反诈人士</span><strong>吴恺</strong><span className="bio-profile-romanization">WU KAI</span></div></div><dl className="bio-facts"><div><dt>故乡</dt><dd>安徽 · 安庆</dd></div><div><dt>早年经历</dt><dd>在深圳从事互联网行业</dd></div><div><dt>离世时间</dt><dd>2024 年 11 月</dd></div></dl><div className="bio-profile-dedication"><span aria-hidden="true">“</span><p>一次次发声，一个人的坚持。<br /><strong>为素不相识的人，选择站出来。</strong></p></div></aside>
        </section>
        <section className="bio-chapter bio-introduction" aria-labelledby="intro-title"><div className="bio-section-label"><span>01 / 人物</span><h2 id="intro-title">他是谁</h2></div><div className="bio-prose"><p className="bio-lead">徽剑，本名吴恺，安徽安庆人。早年在深圳从事互联网行业。他本可以安稳经营事业、平淡度日，却选择走上一条艰难而危险的民间反诈之路。</p><p>没有官方侦查权限，没有专业团队支撑。他凭一台电脑，日夜搜集线索、整理证据，通过个人平台持续曝光电诈内幕。他知道揭开黑产会招致报复，却仍拒绝向黑恶势力妥协。</p></div></section>
        <div className="bio-life-lead">
          <p>
            <span>从搜集线索到实名举报，</span>
            徽剑一步步把电诈园区的内幕带到公众面前。
          </p>
          <span className="bio-life-lead-star" aria-hidden="true">✳</span>
        </div>
        <section className="bio-chapter" id="life" aria-labelledby="life-title"><div className="bio-section-label"><span>02 / 生平</span><h2 id="life-title">他走过的路</h2><p>从揭露罪恶，<br />到最后的坚守。</p></div><div className="bio-timeline">{timeline.map((item, index) => <article className="bio-event" key={item.year}><div className="bio-event-meta"><time>{item.year}</time><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
        <section className="bio-chapter bio-legacy" aria-labelledby="legacy-title"><div className="bio-section-label"><span>03 / 铭记</span><h2 id="legacy-title">勇气的回响</h2></div><div className="bio-prose"><h3>揭露罪恶的人，<br />不该付出<span>生命的代价。</span></h3><p>徽剑的故事提醒我们：诈骗从来不只是屏幕另一端的数字，而是一条侵害信任、自由与生命的黑色链条。记住他，是不忘受害者的苦难，也不忘为守护他人而牺牲的人。</p></div></section>
        <section className="bio-chapter bio-accountability" aria-labelledby="accountability-title">
          <div className="bio-section-label">
            <span>04 / 追责</span>
            <h2 id="accountability-title">人民的追责</h2>
          </div>
          <div className="bio-prose">
            <h3>记住英雄，<br />也要让罪恶<span>付出代价。</span></h3>
            <p>揭露迫害与暴行，追问犯罪者的责任。<br />让伤害无辜者的人，受到法律的惩处。</p>
            <Link className="bio-accountability-link" href="/criminals">查看罪犯页面 <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
      <SiteFooter action={{ href: "/", label: "返回首页" }} />
    </main>
  );
}
