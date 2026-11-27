"use client";

import Image from "next/image";
import { useRef } from "react";

const siteHostname = "llwsydgs.com";
const siteIntroduction = [
  "《老赖王思宇的故事》是一个精美而有趣的网站，网站讲诉了一个盘踞在沈阳的骗子恶棍王思宇的故事，此人是老赖，他在沈阳有好几个软件公司，都是他用别人的名义开的。",
  "此人大肆欠薪，欺诈客户，殴打讨薪员工，十分嚣张，当年还想把单位的漂亮女程序员姜雪骗到西双版纳旅游，此人现在专注于在互联网上、QQ群中骗人，全国各地受害者很多。",
];

export default function FriendlyLinks() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls="friendly-links-dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <span className="site-header-friends-icon" aria-hidden="true" />
        <span className="site-header-friends-label">友情链接</span>
      </button>
      <dialog
        ref={dialog}
        className="landing-friends-dialog"
        id="friendly-links-dialog"
        aria-labelledby="friend-site-title"
        aria-describedby="friend-site-introduction"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <div className="landing-friends-panel">
          <div className="landing-friends-heading">
            <div className="landing-friends-identity">
              <p className="landing-friends-site-date">
                网站成立于 <time dateTime="2025-11-18">2025年11月18日</time>
              </p>
              <h2 id="friend-site-title">《老赖王思宇的故事》</h2>
            </div>
            <div className="landing-friend-portrait">
              <Image
                className="landing-friend-image"
                src="/wang-siyu-portrait.webp"
                alt="《老赖王思宇的故事》网站宣传图中的人物肖像"
                fill
                sizes="(min-width: 768px) 276px, (max-width: 460px) 129px, (max-width: 626px) 42.32vw, 265px"
              />
            </div>
            <form method="dialog">
              <button className="landing-friends-close" type="submit" aria-label="关闭友情链接">
                <span aria-hidden="true">×</span>
              </button>
            </form>
          </div>
          <div className="landing-friends-content" id="friend-site-introduction" role="region" aria-label="网站介绍" tabIndex={0}>
            {siteIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a
            className="landing-friend-link"
            href={`https://${siteHostname}`}
            target="_blank"
            rel="noopener"
            aria-label="访问网站（在新标签页打开）"
          >
            <span className="landing-friend-link-domain">{siteHostname}</span>
            <span className="landing-friend-link-action">
              访问网站 <span className="landing-friend-link-arrow" aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </dialog>
    </>
  );
}
