"use client";

import { useSyncExternalStore } from "react";

const supportEvent = "huijian:case-support";
const sessionSupport = new Map<string, boolean>();
const countFormat = new Intl.NumberFormat("zh-CN");

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(supportEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(supportEvent, onChange);
  };
}

function getServerSnapshot() {
  return false;
}

function getSupport(key: string) {
  const sessionValue = sessionSupport.get(key);
  if (sessionValue !== undefined) return sessionValue;

  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

type SupportButtonProps = {
  caseId: string;
  caseLabel: string;
  initialCount: number;
};

export default function SupportButton({ caseId, caseLabel, initialCount }: SupportButtonProps) {
  const storageKey = `huijian-case-support:${caseId}`;
  const supported = useSyncExternalStore(subscribe, () => getSupport(storageKey), getServerSnapshot);

  function toggleSupport() {
    const next = !getSupport(storageKey);
    try {
      window.localStorage.setItem(storageKey, next ? "1" : "0");
      sessionSupport.delete(storageKey);
    } catch {
      sessionSupport.set(storageKey, next);
    }
    window.dispatchEvent(new Event(supportEvent));
  }

  return (
    <div className="criminals-support">
      <span className="criminals-support-count" role="status">
        <strong>{countFormat.format(initialCount + Number(supported))}</strong>
        <span>人支持</span>
      </span>
      <button type="button" aria-label={`支持${caseLabel}的判刑主张`} aria-pressed={supported} onClick={toggleSupport}>
        <span aria-hidden="true">{supported ? "✓" : "+"}</span>
        {supported ? "已支持" : "支持"}
      </button>
    </div>
  );
}
