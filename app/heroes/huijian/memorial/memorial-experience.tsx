"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Memorial3D = dynamic(() => import("./memorial-3d"), { ssr: false, loading: () => <div className="webgl-fallback">正在构建三维纪念园…</div> });

const flowers = [
  { id: "chrysanthemum", name: "白菊", meaning: "肃穆追思", icon: "✿" },
  { id: "lily", name: "百合", meaning: "纯净安宁", icon: "⚜" },
  { id: "sunflower", name: "向日葵", meaning: "勇气与光", icon: "✺" },
] as const;
type FlowerId = (typeof flowers)[number]["id"];
type RitualState = "idle" | "approach" | "bow" | "place" | "complete";

export default function MemorialExperience() {
  const [selected, setSelected] = useState<FlowerId>("chrysanthemum");
  const [offerings, setOfferings] = useState<FlowerId[]>([]);
  const [ritual, setRitual] = useState<RitualState>("idle");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem("huijian-offerings-v2") ?? "[]") as FlowerId[];
        if (Array.isArray(saved)) setOfferings(saved.filter((id) => flowers.some((item) => item.id === id)).slice(-24));
      } catch { setOfferings([]); }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => () => {
    if (musicTimerRef.current) window.clearInterval(musicTimerRef.current);
    void audioRef.current?.close();
  }, []);

  function playChime(context: AudioContext, frequency: number, delay = 0) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, context.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.045, context.currentTime + delay + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + delay + 3.8);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + delay);
    oscillator.stop(context.currentTime + delay + 4);
  }

  function toggleMusic() {
    if (musicOn) {
      if (musicTimerRef.current) window.clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
      void audioRef.current?.suspend();
      setMusicOn(false);
      return;
    }
    const context = audioRef.current ?? new AudioContext();
    audioRef.current = context;
    void context.resume();
    const playPhrase = () => [261.63, 329.63, 392, 523.25].forEach((note, index) => playChime(context, note, index * 1.3));
    playPhrase();
    musicTimerRef.current = window.setInterval(playPhrase, 9000);
    setMusicOn(true);
  }

  function beginRitual() {
    if (ritual !== "idle" && ritual !== "complete") return;
    setRitual("approach");
    window.setTimeout(() => setRitual("bow"), 3200);
    window.setTimeout(() => setRitual("place"), 5000);
    window.setTimeout(() => {
      setOfferings((current) => {
        const next = [...current, selected].slice(-24);
        window.localStorage.setItem("huijian-offerings-v2", JSON.stringify(next));
        window.localStorage.setItem("huijian-flower-count", String(next.length));
        return next;
      });
      setRitual("complete");
    }, 6300);
    window.setTimeout(() => setRitual("idle"), 8300);
  }

  const chosen = flowers.find((item) => item.id === selected) ?? flowers[0];
  const ritualText = { idle: "选择鲜花，开始祭奠", approach: "缓步上前……", bow: "静默鞠躬……", place: "敬献鲜花……", complete: "祭奠完成 · 愿英雄安息" }[ritual];

  return <section className={`memorial-world memorial-world-3d ritual-${ritual}`}>
    <Memorial3D ritual={ritual} selected={selected} offerings={offerings} />
    <header className="world-heading"><p className="eyebrow">沉浸式纪念空间 · 001</p><h1>山河为证，英名长存</h1><p>请在这片山水间停留片刻，为徽剑献上一束花。</p></header>
    <button className={`music-toggle ${musicOn ? "playing" : ""}`} type="button" onClick={toggleMusic} aria-pressed={musicOn}><span className="music-bars" aria-hidden="true"><i /><i /><i /></span>{musicOn ? "关闭音乐" : "开启音乐"}</button>
    <div className="world-stage-spacer" aria-label={`徽剑三维山水纪念园，碑前已有 ${offerings.length} 束鲜花`} />
    <div className="ritual-status" role="status" aria-live="polite"><span>{ritual === "complete" ? "✓" : "·"}</span>{ritualText}</div>
    <div className="world-controls">
      <div className="world-flower-options" role="radiogroup" aria-label="选择祭奠鲜花">{flowers.map((item) => <button key={item.id} type="button" role="radio" aria-checked={selected === item.id} className={selected === item.id ? "selected" : ""} onClick={() => setSelected(item.id)} disabled={ritual !== "idle" && ritual !== "complete"}><span className={`world-flower-icon flower-${item.id}`}>{item.icon}</span><span><strong>{item.name}</strong><small>{item.meaning}</small></span></button>)}</div>
      <button className="ceremony-button" type="button" onClick={beginRitual} disabled={ritual !== "idle" && ritual !== "complete"}><span>敬献 {chosen.name}</span><strong>{ritual === "idle" || ritual === "complete" ? "开始祭奠" : "仪式进行中"}</strong></button>
    </div>
    <p className="offering-count">已有 <strong>{offerings.length}</strong> 束鲜花留在碑前 · 记录保存在此设备</p>
  </section>;
}
