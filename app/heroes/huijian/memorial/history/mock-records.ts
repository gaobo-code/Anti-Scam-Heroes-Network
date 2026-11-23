import { flowers, type FlowerId } from "../flowers";

type MemorialRecord = {
  dateTime: string;
  tribute: string;
  flower: FlowerId;
};

const recentRecords: readonly MemorialRecord[] = [
  { dateTime: "2026-11-21T10:24:00+08:00", tribute: "敬上一束白菊。谢谢你曾为素不相识的人站出来。", flower: "chrysanthemum" },
  { dateTime: "2026-11-21T08:17:00+08:00", tribute: "愿更多人知道你的故事，也愿每一个求助的人都能被听见。", flower: "forget-me-not" },
  { dateTime: "2026-11-20T21:06:00+08:00", tribute: "从安庆遥寄一束花。徽剑，一路走好。", flower: "lily" },
  { dateTime: "2026-11-20T16:38:00+08:00", tribute: "今天把你的故事讲给朋友听了。我们会记得你的名字。", flower: "sunflower" },
  { dateTime: "2026-11-20T09:52:00+08:00", tribute: "献一束黄菊，悼念那些为揭露诈骗付出代价的人。", flower: "yellow-chrysanthemum" },
  { dateTime: "2026-11-19T19:41:00+08:00", tribute: "愿受害者早日回家，愿你牵挂的人都平安。", flower: "white-rose" },
  { dateTime: "2026-11-19T12:13:00+08:00", tribute: "谢谢你坚持发声。愿你安息。", flower: "lisianthus" },
  { dateTime: "2026-11-18T20:05:00+08:00", tribute: "记住你做过的事，也记住那些仍在等待帮助的人。", flower: "daisy" },
];

const openings = [
  "今日献上一束花。",
  "读完你的故事，心里久久不能平静。",
  "谢谢你为素不相识的人发声。",
  "夜里想起你的故事，来这里看看你。",
  "家人今天在谈起如何防骗，我想到了你。",
  "远方有人记得你。",
  "清晨来这里，为你留一束花。",
  "从朋友那里听说了你的故事。",
  "替那些来不及说谢谢的人，向你致意。",
  "有些话说不出口，就留在这束花里。",
  "今天路过花店，想来看看你。",
  "重读你的生平，又想起你走过的路。",
];

const wishes = [
  "愿你安息。",
  "愿更多人知道你做过的事。",
  "愿受困的人早日平安归家。",
  "你的勇气，我们记在心里。",
  "愿每个求助的声音都能被听见。",
  "愿这束花带去一份迟来的谢意。",
  "愿你牵挂的人都平安。",
  "我们会继续把你的故事讲下去。",
];

const oldestRecentDate = Date.parse(recentRecords[recentRecords.length - 1].dateTime);
const olderRecords = Array.from({ length: 100 - recentRecords.length }, (_, index): MemorialRecord => {
  const group = Math.floor(index / openings.length);
  return {
    dateTime: new Date(oldestRecentDate - (index + 1) * 197 * 60_000).toISOString(),
    tribute: openings[index % openings.length] + wishes[group % wishes.length],
    flower: flowers[(index + group) % flowers.length].id,
  };
});

export const mockRecords = [...recentRecords, ...olderRecords];
