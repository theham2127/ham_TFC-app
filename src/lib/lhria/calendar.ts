/** Gregorian ↔ Ethiopian (ዓ.ም.) conversion. Epoch verified against 11 Sep 2026 = 1 Meskerem 2019. */

const ETHIOPIAN_EPOCH = 1723856;

export const EC_MONTHS: { n: number; en: string; am: string }[] = [
  { n: 1, en: "Meskerem", am: "መስከረም" },
  { n: 2, en: "Tikimt", am: "ጥቅምት" },
  { n: 3, en: "Hidar", am: "ኅዳር" },
  { n: 4, en: "Tahsas", am: "ታኅሣሥ" },
  { n: 5, en: "Tir", am: "ጥር" },
  { n: 6, en: "Yekatit", am: "የካቲት" },
  { n: 7, en: "Megabit", am: "መጋቢት" },
  { n: 8, en: "Miazia", am: "ሚያዝያ" },
  { n: 9, en: "Ginbot", am: "ግንቦት" },
  { n: 10, en: "Sene", am: "ሰኔ" },
  { n: 11, en: "Hamle", am: "ሐምሌ" },
  { n: 12, en: "Nehase", am: "ነሐሴ" },
  { n: 13, en: "Pagume", am: "ጳጉሜ" },
];

export type EcDate = { year: number; month: number; day: number };

function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function jdnToEthiopian(jdn: number): EcDate {
  const r = (jdn - ETHIOPIAN_EPOCH) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const year =
    4 * Math.floor((jdn - ETHIOPIAN_EPOCH) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  return { year, month, day };
}

export function gregorianToEthiopian(year: number, month: number, day: number): EcDate {
  return jdnToEthiopian(gregorianToJdn(year, month, day));
}

export function todayGC(now = new Date()): string {
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${now.getFullYear()}`;
}

export function parseGC(value: string): { year: number; month: number; day: number } | null {
  const match = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(value.trim());
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) return null;
  return { year, month, day };
}

export function gcToEc(value: string): EcDate | null {
  const g = parseGC(value);
  if (!g) return null;
  return gregorianToEthiopian(g.year, g.month, g.day);
}

export function formatEc(value: string): string {
  const ec = gcToEc(value);
  if (!ec) return "";
  const month = EC_MONTHS.find((m) => m.n === ec.month);
  const name = month ? `${month.am} / ${month.en}` : String(ec.month);
  return `${String(ec.day).padStart(2, "0")} ${name} ${ec.year} ዓ.ም.`;
}

export function currentEcYear(now = new Date()): number {
  return gregorianToEthiopian(now.getFullYear(), now.getMonth() + 1, now.getDate()).year;
}

/** Accepts "01", "1", "Meskerem", "መስከረም". */
export function matchEcMonth(input: string): number | null {
  const raw = input.trim().toLowerCase();
  if (!raw || raw === "all" || raw === "ሁሉ") return null;
  const asNum = Number(raw.replace(/^0+/, ""));
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= 13 && /^\d+$/.test(raw)) return asNum;
  const hit = EC_MONTHS.find(
    (m) => m.en.toLowerCase() === raw || m.am === input.trim() || m.en.toLowerCase().startsWith(raw),
  );
  return hit ? hit.n : null;
}
