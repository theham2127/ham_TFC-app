import { todayGC } from "./calendar";
import type { EntryDraft, PaymentStatus } from "./types";

export function emptyDraft(now = new Date()): EntryDraft {
  return {
    ownerName: "",
    woreda: "",
    phone: "",
    fcn: "",
    propertyId: "",
    propertyType: "",
    reason: "",
    previousPrice: null,
    currentPrice: null,
    landArea: null,
    tenure: "",
    landGrade: "",
    usePlan: "",
    usePhysical: "",
    mudG0: null,
    hcbG0: null,
    hcbG1: null,
    hcbG6: null,
    apartment: null,
    condo: null,
    officer: "",
    orderDate: todayGC(now),
    sharePercent: 100,
    paymentStatus: "የሚከፈል",
  };
}

export function workedExample(now = new Date()): EntryDraft {
  return {
    ...emptyDraft(now),
    ownerName: "አበበ ከበደ",
    woreda: "[09]",
    phone: "0911123456",
    fcn: "1234567890123456",
    propertyId: "AA00002127",
    propertyType: "ከአፓርትመንት እና ኮንዶሚንየም ዉጪ",
    reason: "በሽያጭ",
    previousPrice: 5_000_000,
    currentPrice: 8_000_000,
    landArea: 250,
    tenure: "ነባር",
    landGrade: "2/4",
    usePlan: "መኖሪያ",
    usePhysical: "መኖሪያ",
    hcbG0: 120,
    sharePercent: 100,
    paymentStatus: "የሚከፈል",
  };
}

export function isPaymentStatus(value: string): value is PaymentStatus {
  return value === "የሚከፈል" || value === "የተከፈለ" || value === "ያልተከፈለ";
}
