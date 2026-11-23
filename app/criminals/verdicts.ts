type Person = {
  name: string;
  born: string;
  origin: string;
  education: string;
  sentence: string;
  priorConviction?: true;
};

export const verdictGroups: { charge: string; people: Person[] }[] = [
  {
    charge: "故意伤害罪",
    people: [
      { name: "赵冰", born: "1998年12月", origin: "河南民权", education: "中专", sentence: "死刑缓期二年执行" },
      { name: "陶腾飞", born: "1996年5月", origin: "河南民权", education: "小学", sentence: "八年" },
      { name: "宋海军", born: "1970年11月", origin: "河南民权", education: "文盲", sentence: "六年六个月" },
      { name: "吕红亮", born: "1981年7月", origin: "河南民权", education: "小学", sentence: "五年六个月", priorConviction: true },
    ],
  },
  {
    charge: "非法拘禁罪",
    people: [
      { name: "曹东", born: "1991年10月", origin: "重庆市城口县", education: "初中", sentence: "两年六个月" },
      { name: "陈建华", born: "1983年4月", origin: "河南民权", education: "初中", sentence: "两年六个月", priorConviction: true },
      { name: "陶友艮", born: "1991年11月", origin: "重庆市城口县", education: "初中", sentence: "两年两个月", priorConviction: true },
      { name: "谢金龙", born: "1986年3月", origin: "黑龙江肇州", education: "小学", sentence: "两年两个月" },
      { name: "于文良", born: "1978年5月", origin: "吉林德惠", education: "初中", sentence: "两年两个月", priorConviction: true },
      { name: "陈裕庭", born: "1989年5月", origin: "广西贵港", education: "初中", sentence: "一年七个月", priorConviction: true },
      { name: "慕军杰", born: "1980年1月", origin: "河南许昌", education: "小学", sentence: "一年五个月", priorConviction: true },
      { name: "刘帅岭", born: "1997年5月", origin: "河南民权", education: "初中", sentence: "一年四个月" },
    ],
  },
  {
    charge: "窝藏罪",
    people: [
      { name: "郭鸽鸽", born: "1992年8月", origin: "陕西潼关", education: "初中", sentence: "三年" },
      { name: "陈展鹏", born: "1999年", origin: "河南民权", education: "初中", sentence: "一年三个月" },
    ],
  },
];
