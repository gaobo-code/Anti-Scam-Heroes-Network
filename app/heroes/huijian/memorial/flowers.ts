export const flowers = [
  { id: "chrysanthemum", name: "白菊", meaning: "肃穆追思", icon: "✿", color: 0xf7f0d7, shape: "chrysanthemum" },
  { id: "yellow-chrysanthemum", name: "黄菊", meaning: "深切怀念", icon: "✿", color: 0xeac35e, shape: "chrysanthemum" },
  { id: "pink-chrysanthemum", name: "粉菊", meaning: "温柔思念", icon: "✿", color: 0xe6b4c1, shape: "chrysanthemum" },
  { id: "lily", name: "百合", meaning: "纯净安宁", icon: "⚜", color: 0xfff7df, shape: "lily" },
  { id: "sunflower", name: "向日葵", meaning: "勇气与光", icon: "✺", color: 0xe8ad22, shape: "sunflower" },
  { id: "carnation", name: "康乃馨", meaning: "感恩铭记", icon: "❁", color: 0xe2a3ae, shape: "carnation" },
  { id: "white-rose", name: "白玫瑰", meaning: "纯洁敬意", icon: "❀", color: 0xf5eee4, shape: "rose" },
  { id: "pink-rose", name: "粉玫瑰", meaning: "温暖长存", icon: "❀", color: 0xe5a0b6, shape: "rose" },
  { id: "lisianthus", name: "桔梗", meaning: "永恒牵挂", icon: "✾", color: 0xb4a0d6, shape: "lily" },
  { id: "forget-me-not", name: "勿忘我", meaning: "永不忘记", icon: "✾", color: 0x91bce4, shape: "daisy" },
  { id: "daisy", name: "雏菊", meaning: "平静祝愿", icon: "✺", color: 0xf3f0df, shape: "daisy" },
  { id: "hydrangea", name: "绣球", meaning: "团聚与念", icon: "❁", color: 0xadc9df, shape: "carnation" },
] as const;

export type FlowerId = (typeof flowers)[number]["id"];
