"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { startMemorialMusic } from "./memorial-music";
import { flowers, type FlowerId } from "./flowers";
import { offerFlower, type FlowerBed } from "./flower-bed";

const Memorial3D = dynamic(() => import("./memorial-3d"), { ssr: false, loading: () => <div className="webgl-fallback">正在构建三维纪念园…</div> });

type RitualState = "idle" | "approach" | "bow" | "place" | "complete";

export default function MemorialExperience() {
  const [selected, setSelected] = useState<FlowerId>("chrysanthemum");
  const [bed, setBed] = useState<FlowerBed>({ offerings: [], nextSlot: 0, revision: 0 });
  const { offerings, nextSlot, revision } = bed;
  const [loaded, setLoaded] = useState(false);
  const [ritual, setRitual] = useState<RitualState>("idle");
  const [musicOn, setMusicOn] = useState(true);
  const stopMusic = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const updateViewport = () => {
      document.documentElement.style.setProperty("--memorial-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      document.documentElement.style.setProperty("--memorial-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      document.documentElement.style.removeProperty("--memorial-viewport-height");
      document.documentElement.style.removeProperty("--memorial-viewport-top");
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedBed = JSON.parse(window.localStorage.getItem("huijian-flower-bed-v3") ?? "null");
        const saved = savedBed?.offerings ?? JSON.parse(window.localStorage.getItem("huijian-offerings-v2") ?? "[]");
        if (Array.isArray(saved)) {
          const valid = saved.filter((id): id is FlowerId => flowers.some((item) => item.id === id)).slice(-24);
          const next = valid.length < 24 ? valid.length : Number.isInteger(savedBed?.nextSlot) && savedBed.nextSlot >= 0 && savedBed.nextSlot < 24 ? savedBed.nextSlot : 0;
          setBed({ offerings: valid, nextSlot: next, revision: 0 });
        }
      } catch { /* Keep an empty bed if the local record cannot be read. */ }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem("huijian-flower-bed-v3", JSON.stringify(bed));
      window.localStorage.setItem("huijian-offerings-v2", JSON.stringify(bed.offerings));
      window.localStorage.setItem("huijian-flower-count", String(bed.offerings.length));
    } catch { /* The ceremony still works when device storage is unavailable. */ }
  }, [bed, loaded]);

  useEffect(() => {
    stopMusic.current = startMemorialMusic();
    return () => {
      stopMusic.current?.();
      stopMusic.current = null;
    };
  }, []);

  function toggleMusic() {
    if (stopMusic.current) {
      stopMusic.current();
      stopMusic.current = null;
      setMusicOn(false);
    } else {
      stopMusic.current = startMemorialMusic();
      setMusicOn(true);
    }
  }

  function beginRitual() {
    if (!loaded || ritual !== "idle") return;
    setRitual("approach");
    window.setTimeout(() => setRitual("bow"), 5000);
    window.setTimeout(() => setRitual("place"), 6800);
    window.setTimeout(() => {
      setBed((current) => offerFlower(current, selected));
      setRitual("complete");
    }, 8100);
    window.setTimeout(() => setRitual("idle"), 12300);
  }

  const ritualText = { idle: "选择鲜花，开始祭奠", approach: "缓步上前……", bow: "静默鞠躬……", place: "敬献鲜花……", complete: "祭奠完成 · 愿英雄安息" }[ritual];

  return <section className={`memorial-world memorial-world-3d ritual-${ritual}`}>
    <Memorial3D ritual={ritual} selected={selected} offerings={offerings} nextSlot={nextSlot} revision={revision} />
    <header className="world-heading"><h1>山河为证，英名长存</h1></header>
    <button className={`music-toggle ${musicOn ? "playing" : ""}`} type="button" onClick={toggleMusic} aria-label={musicOn ? "关闭音乐" : "开启音乐"} aria-pressed={musicOn}><span className="music-bars" aria-hidden="true"><i /><i /><i /></span><span className="music-label-desktop">{musicOn ? "关闭音乐" : "开启音乐"}</span><span className="music-label-mobile"><svg className="music-speaker" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" />{musicOn ? <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 5 6m0-6-5 6" />}</svg>{musicOn ? "音乐" : "静音"}</span></button>
    <div className="world-stage-spacer" aria-label={`徽剑三维山水纪念园，碑前已有 ${offerings.length} 束鲜花`} />
    <aside className="ritual-panel" aria-label="献花祭奠">
    <div className="ritual-status" role="status" aria-live="polite"><span>{ritual === "complete" ? "✓" : "·"}</span>{ritualText}</div>
    <div className="world-controls">
      <div className="world-flower-options" role="radiogroup" aria-label="选择祭奠鲜花">{flowers.map((item) => <button key={item.id} type="button" role="radio" aria-checked={selected === item.id} className={selected === item.id ? "selected" : ""} onClick={() => setSelected(item.id)} disabled={ritual !== "idle" && ritual !== "complete"}><span className={`world-flower-icon flower-${item.id}`} style={{ color: `#${item.color.toString(16).padStart(6, "0")}` }}>{item.icon}</span><span><strong>{item.name}</strong><small>{item.meaning}</small></span></button>)}</div>
      <button className="ceremony-button" type="button" onClick={beginRitual} disabled={!loaded || ritual !== "idle"}><strong>{ritual === "idle" ? "开始祭奠" : ritual === "complete" ? "祭奠完成" : "仪式进行中"}</strong></button>
    </div>
    </aside>
  </section>;
}
