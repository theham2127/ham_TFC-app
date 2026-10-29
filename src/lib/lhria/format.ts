export function formatBirr(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const rounded = Math.round(value * 100) / 100;
  const fraction = Math.abs(rounded - Math.round(rounded)) > 0.001;
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: fraction ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function formatFcn(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  const parts = [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12), digits.slice(12, 16)].filter(
    Boolean,
  );
  return parts.join("-");
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
