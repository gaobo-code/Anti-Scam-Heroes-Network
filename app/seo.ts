import type { Metadata } from "next";

export const siteUrl = new URL("https://www.fanzhahero.com");
export const siteName = "反诈英雄网";

const memorialImage = {
  url: "/memorial-landscape.png",
  alt: "徽剑祭奠园风景",
};

export const seoPages = {
  "/": {
    title: "纪念反诈英雄",
    description: "反诈英雄网记录为揭露电信诈骗而站出来的人。阅读徽剑（吴恺）的反诈故事，了解吴恺遇害案的裁判结果，也可以在祭奠园献花寄语。",
    image: memorialImage,
  },
  "/heroes/huijian": {
    title: "徽剑（吴恺）生平与反诈经历",
    description: "了解民间反诈人士徽剑（吴恺）的生平，以及他调查电诈园区、公开举报的经历。页面按时间整理吴恺遇害案的一审和二审进展。",
    image: { url: "/wukai-color.png", alt: "徽剑（吴恺）生前照片" },
  },
  "/criminals": {
    title: "徽剑案罪犯名单与判决结果",
    description: "查阅吴恺（徽剑）遇害案中赵冰等 14 名获刑人员的罪名与刑罚。页面同时整理案情报道和站内判刑主张。",
    image: { url: "/anti-fraud-heroes-icon.png", alt: siteName },
  },
  "/heroes/huijian/memorial": {
    title: "徽剑（吴恺）线上祭奠园",
    description: "在徽剑（吴恺）的线上祭奠园献上一束花，写下悼词，纪念这位为揭露电信诈骗而站出来的民间反诈人士。",
    image: memorialImage,
  },
  "/heroes/huijian/memorial/history": {
    title: "徽剑（吴恺）祭奠历史",
    description: "查看徽剑（吴恺）祭奠历史中的示例献花记录与悼词，或前往线上祭奠园献花寄语。",
    image: memorialImage,
  },
  "/criminals/liu-ren": {
    title: "刘忍资料与金贝集团案公开进展",
    description: "根据公开报道与官方文件，整理刘忍在柬埔寨的商业及商会活动、金贝集团案侦办信息，以及吴恺（徽剑）公开举报的相关报道。",
    image: { url: "/criminals/liu-ren-1.jpg", alt: "刘忍在会场的资料照片" },
  },
};

export function pageMetadata(path: keyof typeof seoPages): Metadata {
  const { title, description, image } = seoPages[path];
  const fullTitle = path === "/" ? `${siteName}｜${title}` : `${title}｜${siteName}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
