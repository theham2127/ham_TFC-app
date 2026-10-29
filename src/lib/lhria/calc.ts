import { round2 } from "./format";
import {
  REASON_INHERIT,
  TYPE_APT,
  TYPE_CONDO,
  TYPE_OTHER,
  type EntryDraft,
  type GradeRow,
} from "./types";

export type Breakdown = {
  grade: GradeRow | null;
  landValue: number | null;
  buildingValue: number | null;
  assessedTotal: number | null;
  apartmentValue: number | null;
  condoValue: number | null;
  basis: number | null;
  basisLabel: string;
  documentFee: number | null;
  engineerFee: number | null;
  registrationFee: number | null;
  certificateFee: number | null;
  stampDuty: number | null;
  ashura: number | null;
  shareFraction: number | null;
  totalFee: number | null;
  securityFund: number | null;
  otherBuildingArea: number;
  messages: string[];
};

const BASIS_PREV = "የንብረቱ የቀድሞ የሽያጭ ዋጋ";
const BASIS_NOW = "አሁን የቀረበ የሽያጭ ዋጋ";
const BASIS_SUM = "ጠቅላላ ዋጋ ድምር";
const BASIS_APT = "ጠቅላላ የግንባታ ዋጋ (አፓርትመንት)";
const BASIS_CONDO = "ጠቅላላ የግንባታ ዋጋ (ኮንዶሚንየም)";

function num(value: number | null | undefined): number {
  if (value == null || Number.isNaN(value)) return 0;
  return value;
}

function positive(value: number | null | undefined): number | null {
  if (value == null || Number.isNaN(value) || value === 0) return null;
  return value;
}

function engineerFee(area: number): number {
  if (area <= 100) return 1000;
  if (area <= 500) return 1500;
  if (area <= 1000) return 4000;
  if (area <= 10000) return 5000;
  if (area <= 50000) return 9000;
  if (area <= 100000) return 15000;
  return 25000;
}

function shareFraction(percent: number | null): number | null {
  if (percent == null || Number.isNaN(percent)) return null;
  if (percent < 0) return null;
  if (percent > 1) return percent / 100;
  return percent;
}

/**
 * Mirrors TransactionFee formulas.
 * Land value D31, building H33, total H35, apartment Q31, condo Q35,
 * service lines D38–D44, stamp D46 (2%), ashura D48 (4%), total D50,
 * security fund = 2% of D50.
 */
export function calculate(entry: EntryDraft, grades: GradeRow[]): Breakdown {
  const messages: string[] = [];
  const grade = grades.find((row) => row.grade === entry.landGrade) ?? null;
  if (!grade && entry.landGrade) messages.push("Invalid land grade.");
  if (!entry.landGrade) messages.push("Choose a land grade.");

  const inherit = entry.reason === REASON_INHERIT;
  const other = entry.propertyType === TYPE_OTHER;
  const apt = entry.propertyType === TYPE_APT;
  const condo = entry.propertyType === TYPE_CONDO;

  const mud = positive(entry.mudG0);
  const hcb0 = positive(entry.hcbG0);
  const hcb1 = positive(entry.hcbG1);
  const hcb6 = positive(entry.hcbG6);
  const otherBuildingArea = num(entry.mudG0) + num(entry.hcbG0) + num(entry.hcbG1) + num(entry.hcbG6);

  let landValue: number | null = null;
  if (grade && other && positive(entry.landArea) != null) {
    landValue = round2(num(entry.landArea) * grade.location);
  }

  let buildingValue: number | null = null;
  if (grade && (inherit || other)) {
    const g0Rate = inherit ? grade.inheritG0 : null;
    const g1Rate = inherit ? grade.inheritG1 : null;
    const mudRate = inherit ? g0Rate! : grade.mud;
    const h0Rate = inherit ? g0Rate! : grade.hcbG0;
    const h1Rate = inherit ? g1Rate! : grade.hcbG1;
    const h6Rate = inherit ? g1Rate! : grade.hcbG6;
    const sum =
      (mud != null ? mud * mudRate : 0) +
      (hcb0 != null ? hcb0 * h0Rate : 0) +
      (hcb1 != null ? hcb1 * h1Rate : 0) +
      (hcb6 != null ? hcb6 * h6Rate : 0);
    buildingValue = round2(sum);
  }

  let assessedTotal: number | null = null;
  if (other && buildingValue != null && buildingValue !== 0) {
    assessedTotal = round2(num(landValue) + buildingValue);
  }

  let apartmentValue: number | null = null;
  if (grade && positive(entry.apartment) != null && (inherit || apt)) {
    const rate = inherit ? grade.inheritApt : grade.apartment;
    apartmentValue = round2(num(entry.apartment) * rate);
  }

  let condoValue: number | null = null;
  if (grade && positive(entry.condo) != null && (inherit || condo)) {
    const rate = inherit ? grade.inheritCondo : grade.condo;
    condoValue = round2(num(entry.condo) * rate);
  }

  const valuation = apt ? apartmentValue : condo ? condoValue : assessedTotal;
  const prev = num(entry.previousPrice);
  const now = num(entry.currentPrice);
  const assessed = num(valuation);

  let basis: number | null = null;
  let basisLabel = "";
  if (valuation != null && valuation !== 0) {
    const max = Math.max(prev, now, assessed);
    basis = round2(max);
    if (prev === max) basisLabel = BASIS_PREV;
    else if (now === max) basisLabel = BASIS_NOW;
    else if (apt) basisLabel = BASIS_APT;
    else if (condo) basisLabel = BASIS_CONDO;
    else basisLabel = BASIS_SUM;
  } else if (entry.propertyType) {
    messages.push(
      other
        ? "Ordinary holdings need a building area so the assessed total can be formed."
        : "Enter the floor area for this property type.",
    );
  }

  const fraction = shareFraction(entry.sharePercent);
  if (entry.sharePercent == null) messages.push("Enter the ownership share percent.");
  else if (fraction == null) messages.push("Ownership share cannot be negative.");

  const maxComponent = Math.max(num(assessedTotal), num(apartmentValue), num(condoValue));

  let documentFee: number | null = null;
  let stampDuty: number | null = null;
  let ashura: number | null = null;
  if (valuation != null && valuation !== 0 && fraction != null && basis != null) {
    const residential = entry.usePlan === "መኖሪያ" && entry.usePhysical === "መኖሪያ";
    documentFee = residential ? 800 : 1000;
    stampDuty = round2(basis * 0.02 * fraction);
    ashura = round2(basis * 0.04 * fraction);
  }

  let engineer: number | null = null;
  const engineerArea = apt ? entry.apartment : condo ? entry.condo : entry.landArea;
  if (entry.propertyType && positive(engineerArea) != null) {
    engineer = engineerFee(num(engineerArea));
  }

  const registrationFee = maxComponent === 0 ? null : 1000;
  const certificateFee = maxComponent === 0 ? null : 1100;

  const parts = [documentFee, engineer, registrationFee, certificateFee, stampDuty, ashura];
  const any = parts.some((part) => part != null && part !== 0);
  const taxesReady = stampDuty != null && ashura != null;
  const totalFee = any && taxesReady ? round2(parts.reduce<number>((sum, part) => sum + num(part), 0)) : null;
  const securityFund = totalFee == null ? null : round2(totalFee * 0.02);

  return {
    grade,
    landValue,
    buildingValue: buildingValue === 0 ? (inherit || other ? 0 : null) : buildingValue,
    assessedTotal,
    apartmentValue,
    condoValue,
    basis,
    basisLabel,
    documentFee,
    engineerFee: engineer,
    registrationFee,
    certificateFee,
    stampDuty,
    ashura,
    shareFraction: fraction,
    totalFee,
    securityFund,
    otherBuildingArea,
    messages,
  };
}

export function feesMatch(stored: number, live: number | null): boolean {
  if (live == null) return false;
  return Math.abs(stored - live) < 0.5;
}
