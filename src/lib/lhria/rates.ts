import type { GradeRow } from "./types";

/** LandGrade sheet, rows 4–21. Construction benchmarks are per square metre. */
const LOC = [
  39073, 36826, 34578, 31119, 29096, 27074, 25051, 23028, 21005, 18983, 16960, 14937, 12914, 10892,
  8869, 6846, 4823, 2801,
];
const APT = [
  81798, 79158, 77178, 75198, 64215, 63555, 62235, 60915, 59595, 56760, 56100, 54120, 52800, 51480,
  50820, 49500, 48840, 48180,
];
const CONDO = [
  47769, 46079, 44099, 42779, 41672, 41012, 39362, 38042, 36722, 35317, 34657, 33337, 32017, 30697,
  30037, 28717, 26400, 25080,
];

const GRADES = [
  "1/1",
  "1/2",
  "1/3",
  "1/4",
  "1/5",
  "2/1",
  "2/2",
  "2/3",
  "2/4",
  "2/5",
  "3/1",
  "3/2",
  "3/3",
  "3/4",
  "3/5",
  "4/1",
  "4/2",
  "4/3",
];

export const DEFAULT_GRADES: GradeRow[] = GRADES.map((grade, i) => ({
  grade,
  location: LOC[i] ?? 0,
  mud: 15000,
  hcbG0: 20000,
  hcbG1: 25000,
  hcbG6: 30000,
  apartment: APT[i] ?? 0,
  condo: CONDO[i] ?? 0,
  inheritG0: 10000,
  inheritG1: 12000,
  inheritApt: 12000,
  inheritCondo: 12000,
}));

export const SUBCITIES = [
  "አዲስ ከተማ",
  "አቃቂ ቃሊቲ",
  "አራዳ",
  "ቦሌ",
  "ጉለሌ",
  "ቂርቆስ",
  "ኮልፌ ቀራኒዮ",
  "ልደታ",
  "ንፋስ ስልክ ላፍቶ",
  "የካ",
  "ለሚ ኩራ",
];
