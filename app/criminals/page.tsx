import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../site-header";
import type { ReactNode } from "react";
import SupportButton from "./support-button";
import { verdictGroups } from "./verdicts";
import "./criminals.css";

export const metadata: Metadata = {
  title: "徽剑案罪犯名单与判刑主张",
  description: "按四组展示徽剑（吴恺）遇害案相关人员、判刑主张及实际裁判结果。",
};

const caseReport = "https://www.jiemian.com/article/15242658.html";
const followUpReport = "https://www.jiemian.com/article/15279448.html";
const policeReport = "https://www.xinhuanet.com/legal/20260617/169f83916d054810b1dc070f1d1f89ad/c.html";
const rumorReport = "https://www.sina.cn/news/detail/5358597815141061.html";
const convictedCount = verdictGroups.reduce((total, group) => total + group.people.length, 0);

const cases = {
  liu: { id: "liu-ren", label: "罪犯一", title: "刘忍", status: "本案指使关系未认定", initialSupport: 2864 },
  major: { id: "major", label: "罪犯二", title: "代号“少校”", status: "截至二审未归案", initialSupport: 2417 },
  zhao: { id: "zhao-bing", label: "罪犯三", title: "赵冰及其他获刑人员", status: null, initialSupport: 3296 },
  rumor: { id: "rumor", label: "罪犯四", title: "转账截图传播者", status: "身份未明", initialSupport: 1782 },
};

type CaseSectionProps = (typeof cases)[keyof typeof cases] & {
  proposal: ReactNode;
  children: ReactNode;
  records?: ReactNode;
};

function CaseSection({ id, label, title, status, initialSupport, proposal, children, records }: CaseSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="criminals-card">
      <header className="criminals-card-heading">
        <h2 id={`${id}-title`}><span>{label}</span>{title}</h2>
        {status && <span className="criminals-status">{status}</span>}
      </header>
      <div className="criminals-case-grid">
        <div className="criminals-case-details">{children}</div>
        {records}
        <div className="criminals-proposal">
          <h3>判刑主张</h3>
          <div className="criminals-proposal-text">{proposal}</div>
          <SupportButton caseId={id} caseLabel={label} initialCount={initialSupport} />
        </div>
      </div>
    </section>
  );
}

function VerdictTable() {
  return (
    <section className="criminals-verdicts" aria-labelledby="verdicts-title">
      <h3 id="verdicts-title">实际判决 · 共 {convictedCount} 人</h3>
      <p id="verdicts-note">罪名和刑罚依据所提供名单及公开报道整理。个人资料和前科标注按所提供名单列出。</p>
      <div className="criminals-table-frame">
        <table className="criminals-table" aria-labelledby="verdicts-title" aria-describedby="verdicts-note">
          <thead>
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">个人资料</th>
              <th scope="col">刑罚</th>
            </tr>
          </thead>
          {verdictGroups.map(({ charge, people }) => (
            <tbody key={charge}>
              <tr className="criminals-charge">
                <th scope="rowgroup" colSpan={3}>{charge}<span>{people.length} 人</span></th>
              </tr>
              {people.map(({ name, born, origin, education, sentence, priorConviction }) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>
                    <div className="criminals-details">
                      <span>{born}出生</span>
                      <span>{origin}人</span>
                      <span>{education}</span>
                      {priorConviction && <span>有前科</span>}
                    </div>
                  </td>
                  <td className="criminals-sentence">{sentence}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <a className="criminals-source" href={caseReport}>来源：界面新闻对裁判文书的报道</a>
    </section>
  );
}

export default function CriminalsPage() {
  return (
    <div className="criminals-page">
      <SiteHeader action={{ href: "/heroes/huijian", label: "返回徽剑生平" }} />

      <main className="criminals-container">
        <section className="criminals-hero" aria-labelledby="case-title">
          <div className="criminals-hero-content">
            <p className="criminals-eyebrow">徽剑（吴恺）遇害案</p>
            <h1 id="case-title">罪犯<span>名单</span></h1>
          </div>
        </section>

        <div className="criminals-cases">
          <CaseSection {...cases.liu} proposal={<p>刘忍应判处死刑</p>}>
            <div className="criminals-gallery criminals-liu-gallery">
              <a href="/criminals/liu-ren-1.jpg" target="_blank" rel="noopener" aria-label="在新标签页查看刘忍第一张照片原图">
                <Image src="/criminals/liu-ren-1.jpg" alt="刘忍的资料照片，会场画面" fill sizes="(max-width: 720px) 45vw, 390px" />
              </a>
              <a href="/criminals/liu-ren-2.jpg" target="_blank" rel="noopener" aria-label="在新标签页查看刘忍第二张照片原图">
                <Image src="/criminals/liu-ren-2.jpg" alt="刘忍的第二张资料照片" fill sizes="(max-width: 720px) 45vw, 390px" />
              </a>
            </div>
            <p>刘忍是吴恺生前公开举报的对象。据新华社援引公安部消息，陈志犯罪集团骨干刘忍于 2026 年 6 月从柬埔寨金边被押解回国。相关案件涉及经营电诈园区，刘忍还涉嫌非法拘禁、故意伤害等犯罪。</p>
            <p>徽剑案二审裁定未认定刘忍是本案指使者。该案庭审围绕已到案人员实施的行为展开，未审查电诈背景。</p>
            <a className="criminals-source" href={policeReport}>来源：新华社援引公安部消息</a>
          </CaseSection>

          <CaseSection {...cases.major} proposal={<p>“少校”应判处死刑</p>}>
            <p>据裁定书相关报道，“少校”通过境外加密平台发布悬赏，金额从 30 万元增至 100 万元，要求逼问吴恺公众号的幕后人员并删除相关文章，向接单者提供了吴恺的住址和车牌等信息。</p>
            <p>截至二审审结，其姓名、性别及所在地点均未查实。已到案人员均未与其线下见面。</p>
            <a className="criminals-source" href={followUpReport}>来源：界面新闻对庭审的跟进报道</a>
          </CaseSection>

          <CaseSection
            {...cases.zhao}
            proposal={<><p>赵冰应判处死刑</p><p>其他人员应按照原刑期加倍</p></>}
            records={<VerdictTable />}
          >
            <div className="criminals-zhao-profile">
              <div className="criminals-gallery criminals-zhao-gallery">
                <a href="/criminals/zhao-bing.jpg" target="_blank" rel="noopener" aria-label="在新标签页查看赵冰照片原图">
                  <Image src="/criminals/zhao-bing.jpg" alt="赵冰的资料照片" fill sizes="(max-width: 480px) 140px, 190px" />
                </a>
              </div>
              <div>
                <p>河南民权人。赵冰接下悬赏后纠集多人参与，直接对吴恺实施殴打。惠州市中级人民法院一审判处死刑缓期二年执行，广东省高级人民法院于 2026 年 8 月二审维持原判。</p>
                <p>据报道，赵冰经其母亲支付了 50 万元赔偿，法院未采信相关谅解书作为量刑依据。</p>
                <a className="criminals-source" href={followUpReport}>来源：界面新闻对二审裁定的报道</a>
              </div>
            </div>
          </CaseSection>

          <CaseSection {...cases.rumor} proposal={<p>涉事者应判处十年徒刑</p>}>
            <p>据界面新闻引述知情者说法，吴恺遇害后，有人向其支付宝账户转入 1.1 万元，并在境外平台传播收款截图，声称吴恺因敲诈勒索被警方带走。材料中的转账者及传播者身份尚未核实。</p>
            <a className="criminals-source" href={rumorReport}>来源：界面新闻发布的知情者说法</a>
          </CaseSection>
        </div>
      </main>

      <footer className="criminals-container criminals-footer">
        <Link href="/">反诈英雄网</Link>
        <Link href="/heroes/huijian">返回徽剑故事</Link>
      </footer>
    </div>
  );
}
