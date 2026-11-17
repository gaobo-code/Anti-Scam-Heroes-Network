import Image from "next/image";
import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="landing">
      <header className="landing-header">
        <Link className="landing-brand" href="/" aria-label="反诈英雄网首页"><span className="landing-logo"><Image src="/brand-light.png" alt="" width={34} height={34} /></span><span>反诈英雄网<small>COURAGE, REMEMBERED.</small></span></Link>
        <nav className="landing-nav" aria-label="主导航"><a href="#purpose">关于我们</a><Link href="/heroes/huijian">阅读故事 <span aria-hidden="true">↗</span></Link></nav>
      </header>
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-label"><span><i /> 纪念与电诈恶势力抗争的英雄</span><span>铭记牺牲 / 守护正义</span></div>
        <div className="landing-composition">
          <div className="landing-copy"><p className="landing-eyebrow">他们为揭露罪恶而战，我们为铭记英雄而来。</p><h1 id="landing-title">不忘记<span className="landing-title-line">每位<span className="landing-highlight">英雄<span className="landing-period">.</span></span></span></h1><p className="landing-description">他们揭露电诈、直面暴力，为受害者发声。<br />有人因此付出生命。我们不能让他们被遗忘。</p><a className="landing-about-link" href="#purpose">这份纪念，从这里开始 <span aria-hidden="true">↓</span></a></div>
          <aside className="landing-feature" aria-labelledby="featured-name">
            <div className="landing-card-top"><span>铭记英雄 / 001</span><span className="landing-card-star" aria-hidden="true">✳</span></div>
            <div className="landing-person"><div className="landing-avatar"><Image src="/wukai.png" alt="徽剑（吴恺）的照片" fill sizes="128px" preload /></div><div><p>民间反诈人士</p><h2 id="featured-name">徽剑</h2><span>吴恺 / WU KAI</span></div></div>
            <p className="landing-card-text">他揭露缅北、柬埔寨电诈园区的罪恶，<br />因触动犯罪集团利益，遭报复杀害。<br />他叫吴恺，人们记住他的名字：徽剑。</p>
            <Link className="landing-read" href="/heroes/huijian"><span>走近徽剑<small>阅读他的故事</small></span><span className="landing-arrow" aria-hidden="true">↗</span></Link>
          </aside>
        </div>
        <div className="landing-hero-foot"><span>THE COURAGE TO STAND UP.</span><span>献给每一位，与罪恶抗争的人。</span><a href="#purpose">向下探索 <span aria-hidden="true">↘</span></a></div>
      </section>
      <div className="landing-ribbon" aria-hidden="true"><span>铭记英雄</span><i>✳</i><span>REMEMBER THE BRAVE</span><i>✳</i><span>不忘牺牲，守护正义</span><i>✳</i><span>铭记英雄</span></div>
      <section className="landing-purpose" id="purpose" aria-labelledby="purpose-title"><div className="landing-purpose-label">OUR PURPOSE<span>关于这份纪念</span></div><div className="landing-purpose-body"><h2 id="purpose-title">揭露罪恶的人，<br />不该付出<span>生命的代价。</span></h2><div className="landing-purpose-details"><p>缅北、柬埔寨电诈园区背后的犯罪势力，以诈骗掠夺财产，以拘禁、虐待和暴力迫害无辜的人。面对这些罪恶，有人选择揭露，有人坚持抗争。</p><p>反诈英雄网为纪念这些英雄而建。徽剑因揭露电诈犯罪遭报复杀害，他的经历提醒我们：不能忘记受害者的苦难，也不能忘记为守护他人而牺牲的人。记录他们的故事，是对英雄的致敬，也是对罪恶永不妥协的态度。</p></div><Link href="/heroes/huijian" className="landing-dedicate">从徽剑的故事开始 <span aria-hidden="true">↗</span></Link></div></section>
      <footer className="landing-footer"><Link href="/" className="landing-footer-brand"><Image src="/brand-light.png" alt="" width={26} height={26} />反诈英雄网</Link><p>纪念与电诈恶势力抗争、为守护人民而付出的英雄。</p><span>始于 2026</span></footer>
    </main>
  );
}