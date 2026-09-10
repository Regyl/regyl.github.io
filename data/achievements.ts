export interface Achievement {
  year: number;
  title: string;
  items: string[];
  isPlaceholder?: boolean;
}

export const achievements: Achievement[] = [
  {
    year: 2021,
    title: "Digital Breakthrough",
    items: ["Finalist", "Prize recipient"],
  },
  {
    year: 0,
    title: "Coming soon",
    items: ["[PLACEHOLDER] Future achievement"],
    isPlaceholder: true,
  },
  {
    year: 0,
    title: "Coming soon",
    items: ["[PLACEHOLDER] Future achievement"],
    isPlaceholder: true,
  },
];
