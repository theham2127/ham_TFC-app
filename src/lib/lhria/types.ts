export const ROLES = ["Authorized User", "Admin Level 1", "Admin Level 2"] as const;
export type Role = (typeof ROLES)[number];

export const PROPERTY_TYPES = [
  "ከአፓርትመንት እና ኮንዶሚንየም ዉጪ",
  "አፓርትመንት",
  "ኮንዶሚንየም",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const TYPE_OTHER = PROPERTY_TYPES[0];
export const TYPE_APT = PROPERTY_TYPES[1];
export const TYPE_CONDO = PROPERTY_TYPES[2];

export const REASONS = [
  "በሽያጭ",
  "በስጦታ",
  "በዉርስ",
  "በፍ/ቤት ዉሳኔ",
  "በዕጣ",
  "ድርሻ መልቀቅ",
  "ለአክሲዮን ድርሻ መዋጮ",
] as const;

export const REASON_INHERIT = "በዉርስ";

export const PLAN_USES = [
  "መኖሪያ",
  "ቅይጥ",
  "ድርጅት",
  "ማምረቻና ማከማቻ",
  "አገልግሎት",
  "አስተዳደራዊ",
  "የከተማ ግብርና",
  "አካባቢ ጥበቃ",
  "ደን",
  "መንገድና ትራንሰፖርት",
  "ልዩ አገልግሎት",
] as const;

export const PHYSICAL_USES = [
  "መኖሪያ",
  "ቅይጥ",
  "ድርጅት",
  "ማምረቻና ማከማቻ",
  "የከተማ ግብርና",
] as const;

export const TENURES = ["ነባር", "ሊዝ", "ነባርና ሊዝ"] as const;

export const PAYMENT_STATUSES = ["የሚከፈል", "የተከፈለ", "ያልተከፈለ"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const SUBCITY = "ንፋስ ስልክ ላፍቶ";
export const OFFICE_AM = "በአዲስ አበባ ከተማ አስተዳደር የመሬት ይዞታ ምዝገባ እና መረጃ ኤጄንሲ";
export const OFFICE_SHORT = "LHRIA · Nefas Silk Lafto";

export const WOREDAS = Array.from({ length: 16 }, (_, i) => `[${String(i + 1).padStart(2, "0")}]`);

export type GradeRow = {
  grade: string;
  location: number;
  mud: number;
  hcbG0: number;
  hcbG1: number;
  hcbG6: number;
  apartment: number;
  condo: number;
  inheritG0: number;
  inheritG1: number;
  inheritApt: number;
  inheritCondo: number;
};

export type EntryDraft = {
  ownerName: string;
  woreda: string;
  phone: string;
  fcn: string;
  propertyId: string;
  propertyType: string;
  reason: string;
  previousPrice: number | null;
  currentPrice: number | null;
  landArea: number | null;
  tenure: string;
  landGrade: string;
  usePlan: string;
  usePhysical: string;
  mudG0: number | null;
  hcbG0: number | null;
  hcbG1: number | null;
  hcbG6: number | null;
  apartment: number | null;
  condo: number | null;
  officer: string;
  orderDate: string;
  sharePercent: number | null;
  paymentStatus: PaymentStatus;
};

export type Transaction = EntryDraft & {
  id: string;
  fee: number;
  securityFund: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type OfficeUser = {
  username: string;
  password: string;
  role: Role;
  fullName: string;
};

export type Session = {
  username: string;
  role: Role;
  fullName: string;
};
