import Image from "next/image";
import { Suspense } from "react";
import { pageMetadata } from "../../seo";
import SiteFooter from "../../site-footer";
import SiteHeader from "../../site-header";
import { liuRenLinkId } from "../liu-ren-link";
import { caseReport, liuRenInvestigation, policeReport } from "../sources";
import "../criminals.css";

export const metadata = pageMetadata("/criminals/liu-ren");

const backToList = { href: `/criminals#${liuRenLinkId}`, label: "返回原处" };
const chamberReport = "https://www.chinanews.com.cn/hr/2015/06-17/7351382.shtml";
const allianceReport = "https://paper.people.com.cn/rmrbhwb/html/2022-06/08/content_25921786.htm";
const sanctionsDecision = "https://eur-lex.europa.eu/eli/dec/2026/1896/oj/eng/pdf";
const documentaryReport = "https://news.bjd.com.cn/2026/10/07/11986409.shtml";

type LiuRenPageProps = PageProps<"/criminals/liu-ren">;

async function ReturnNavigation({
  searchParams,
  Navigation,
}: {
  searchParams: LiuRenPageProps["searchParams"];
  Navigation: typeof SiteHeader | typeof SiteFooter;
}) {
  const { from } = await searchParams;
  const action = from === "huijian"
    ? { ...backToList, href: `/heroes/huijian#${liuRenLinkId}` }
    : backToList;

  return <Navigation action={action} />;
}

export default function LiuRenPage({ searchParams }: LiuRenPageProps) {
  return (
    <div className="criminals-page">
      <Suspense>
        <ReturnNavigation Navigation={SiteHeader} searchParams={searchParams} />
      </Suspense>

      <main className="criminals-container">
        <section className="criminals-hero" aria-labelledby="liu-ren-profile-title">
          <div className="criminals-hero-content">
            <p className="criminals-eyebrow">安徽灵璧人 · 曾任柬埔寨安徽总商会会长</p>
            <h1 id="liu-ren-profile-title">刘忍</h1>
          </div>
        </section>

        <section className="criminals-card criminals-profile" aria-labelledby="liu-ren-background">
          <h2 id="liu-ren-background">早年经历与在柬活动</h2>
          <div className="criminals-case-details">
            <div className="criminals-gallery criminals-liu-gallery">
              <a href="/criminals/liu-ren-1.jpg" target="_blank" rel="noopener" aria-label="在新标签页查看第一张照片原图">
                <Image src="/criminals/liu-ren-1.jpg" alt="刘忍在会场的资料照片" fill sizes="(max-width: 720px) 45vw, 560px" />
              </a>
              <a href="/criminals/liu-ren-2.jpg" target="_blank" rel="noopener" aria-label="在新标签页查看第二张照片原图">
                <Image src="/criminals/liu-ren-2.jpg" alt="刘忍的第二张资料照片" fill sizes="(max-width: 720px) 45vw, 560px" />
              </a>
            </div>
            <ol className="criminals-profile-timeline">
              <li>
                <h3>1977 年至 2000 年代初</h3>
                <p>据界面新闻调查，刘忍 1977 年出生于安徽省宿州市灵璧县。报道援引在柬华商回忆称，他在 2000 年代初已进入金边赌场行业，从事为赌客提供筹码的放贷生意。</p>
                <a className="criminals-source" href={liuRenInvestigation} target="_blank" rel="noopener">界面新闻人物调查</a>
              </li>
              <li>
                <h3>2012 年至 2015 年</h3>
                <p>据界面新闻报道，刘忍 2012 年成立徽邦国际投资集团，转向房地产。中新网于 2015 年 6 月报道，当年 4 月成立的柬埔寨安徽商会由刘忍担任会长。他曾率商会代表团赴安徽，与当地机构对接投资及经贸合作。</p>
                <a className="criminals-source" href={chamberReport} target="_blank" rel="noopener">中新网 2015 年商会报道</a>
              </li>
              <li>
                <h3>2022 年</h3>
                <p>《人民日报海外版》报道，多个国家的皖籍侨团发起成立 RCEP 国家皖籍侨团联盟，刘忍被推选为首任召集人，任期两年。该联盟成立时提出促进成员侨团之间的经贸合作。</p>
                <a className="criminals-source" href={allianceReport} target="_blank" rel="noopener">《人民日报海外版》侨团联盟报道</a>
              </li>
            </ol>
          </div>
        </section>

        <section className="criminals-card criminals-profile" aria-labelledby="liu-ren-jinbei">
          <h2 id="liu-ren-jinbei">金贝集团与跨境赌诈调查</h2>
          <div className="criminals-case-details">
            <p>据新华社 2026 年 6 月 17 日援引公安部消息，公安部认定刘忍为陈志犯罪集团的重要骨干成员。2016 年，陈志指挥刘忍等人在柬埔寨创立金贝集团，并运营多个面向中国境内人员招赌的网络平台。公安部称，该集团自 2020 年起在柬埔寨经营电诈园区。刘忍另涉嫌非法拘禁、故意伤害。</p>
            <a className="criminals-source" href={policeReport} target="_blank" rel="noopener">新华网刊载的公安部通报报道</a>
            <p>2026 年 7 月 30 日，欧盟理事会通过决定，将金贝集团列入限制措施名单。该决定列出的理由涉及诈骗园区内的人口贩运、强迫劳动与虐待，并记载了金贝集团与太子控股集团的关联。该条目针对金贝集团。</p>
            <a className="criminals-source" href={sanctionsDecision} target="_blank" rel="noopener">欧盟理事会决定（英文 PDF）</a>
          </div>
        </section>

        <section className="criminals-card criminals-profile" aria-labelledby="liu-ren-huijian-case">
          <h2 id="liu-ren-huijian-case">与徽剑案的关联</h2>
          <div className="criminals-case-details">
            <p>据界面新闻报道，2024 年 8 月，吴恺（徽剑）公开发文举报刘忍涉嫌经营电诈园区等行为。刘忍随后以柬埔寨安徽商会名义发表声明，否认相关指控。</p>
            <p>界面新闻援引知情者称，吴恺遇害前，曾有人打听他的住址，知情者称这些人与刘忍有关。同一报道披露的二审裁定记载，向赵冰发布劫持任务的人使用代号「少校」。公开报道所引述的裁定未认定刘忍是徽剑案的指使者。</p>
            <a className="criminals-source" href={caseReport} target="_blank" rel="noopener">界面新闻对徽剑案裁定的报道</a>
          </div>
        </section>

        <section className="criminals-card criminals-profile" aria-labelledby="liu-ren-investigation">
          <h2 id="liu-ren-investigation">押解回国与后续公开信息</h2>
          <div className="criminals-case-details">
            <p>2026 年 6 月 17 日，新华社报道，中方在柬埔寨有关部门协助下，已将刘忍从金边押解回国。报道援引公安部消息称，当时刘忍已被依法采取强制措施，相关案件仍在侦办。</p>
            <a className="criminals-source" href={policeReport} target="_blank" rel="noopener">新华网押解回国报道</a>
            <p>2026 年 10 月 7 日播出的纪录片《缅北电诈覆灭纪实》第三集《共筑天网》公开了押解现场画面。截至 2026 年 11 月 27 日，本页查阅的公开资料中未见刘忍所涉跨境赌诈案的起诉公告或生效裁判。</p>
            <a className="criminals-source" href={documentaryReport} target="_blank" rel="noopener">京报网对纪录片的报道</a>
          </div>
        </section>
      </main>

      <Suspense>
        <ReturnNavigation Navigation={SiteFooter} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
