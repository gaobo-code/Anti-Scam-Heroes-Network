"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flowers } from "../flowers";
import { mockRecords } from "./mock-records";

const pageSize = 10;
const pageCount = Math.ceil(mockRecords.length / pageSize);
const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
const mobileQuery = "(max-width: 767px), (hover: none) and (pointer: coarse)";

const dateFormat = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
});
const timeFormat = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

function subscribeToMobileQuery(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isMobileLayout() {
  return window.matchMedia(mobileQuery).matches;
}

function isMobileOnServer() {
  return false;
}

export default function HistoryRecords() {
  const isMobile = useSyncExternalStore(subscribeToMobileQuery, isMobileLayout, isMobileOnServer);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileCount, setMobileCount] = useState(pageSize);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const total = mockRecords.length;
  const start = isMobile ? 0 : (currentPage - 1) * pageSize;
  const end = isMobile ? mobileCount : Math.min(start + pageSize, total);
  const nextMobileCount = Math.min(mobileCount + pageSize, total);

  useEffect(() => {
    const trigger = loadMoreRef.current;
    if (!isMobile || !trigger || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      setMobileCount((count) => Math.max(count, nextMobileCount));
    }, { rootMargin: "0px 0px 100px" });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [isMobile, nextMobileCount, mobileCount]);

  function goToPage(page: number) {
    if (page < 1 || page > pageCount || page === currentPage) return;
    setCurrentPage(page);
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  return (
    <section className="history-records" aria-labelledby="record-title">
      <div className="history-record-heading">
        <h2 id="record-title" ref={headingRef} tabIndex={-1}>祭奠记录</h2>
        <p id="record-status" className="history-record-status">
          <span>示例数据</span>
          <span>{total} 条</span>
        </p>
      </div>

      <div className="history-table-frame">
        <table className="history-table" aria-labelledby="record-title" aria-describedby="record-status">
          <thead>
            <tr>
              <th className="history-date-column" scope="col" aria-sort="descending">日期</th>
              <th scope="col">悼词</th>
              <th className="history-flower-column" scope="col">鲜花</th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.slice(start, end).map((record) => {
              const date = new Date(record.dateTime);
              const flower = flowers.find(({ id }) => id === record.flower);

              return (
                <tr key={record.dateTime}>
                  <td className="history-date-column">
                    <time className="history-date" dateTime={record.dateTime}>
                      {dateFormat.format(date)}
                      <span>{timeFormat.format(date)}</span>
                    </time>
                  </td>
                  <td className="history-tribute">{record.tribute}</td>
                  <td className="history-flower-column">
                    {flower && (
                      <span className="history-flower">
                        <span aria-hidden="true" style={{ color: `#${flower.color.toString(16)}` }}>{flower.icon}</span>
                        {flower.name}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="history-table-note">按祭奠时间从新到旧排列 · 北京时间</p>
      </div>

      <div className="history-pagination">
        <p role="status">显示第 {start + 1}–{end} 条，共 {total} 条</p>
        <nav className="history-page-buttons" aria-label="祭奠记录分页">
          <button type="button" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>上一页</button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              aria-label={`第 ${page} 页`}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
          <button type="button" disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)}>下一页</button>
        </nav>
      </div>

      <div className="history-mobile-controls">
        <p role="status">
          {mobileCount === total ? `已显示全部 ${total} 条` : `已显示 ${mobileCount} / ${total} 条`}
        </p>
        {mobileCount < total && (
          <button
            type="button"
            ref={loadMoreRef}
            onClick={() => setMobileCount((count) => Math.max(count, nextMobileCount))}
          >
            加载更多
          </button>
        )}
      </div>
    </section>
  );
}
