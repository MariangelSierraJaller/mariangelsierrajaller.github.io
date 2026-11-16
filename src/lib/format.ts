import type { Lang } from "@/types/content";

export function careerYears(startYm = "2022-02", now = new Date()): number {
  const [y, m] = startYm.split("-").map(Number);
  if (!y || !m) return 4;
  const totalMonths = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.max(1, Math.floor(totalMonths / 12));
}

const MONTHS_ES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatYm(ym: string, lang: Lang): string {
  const [y, m] = ym.split("-");
  const monthIdx = Number(m) - 1;
  const months = lang === "es" ? MONTHS_ES : MONTHS_EN;
  const label = months[monthIdx];
  return label ? `${label} ${y}` : ym;
}

export function formatYmRange(
  start: string,
  end: string | null,
  lang: Lang,
  presentLabel: string,
): string {
  const startLabel = formatYm(start, lang);
  const endLabel = end ? formatYm(end, lang) : presentLabel;
  return `${startLabel} — ${endLabel}`;
}
