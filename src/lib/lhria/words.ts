const BELOW_TWENTY = [
  "",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
  "TWELVE",
  "THIRTEEN",
  "FOURTEEN",
  "FIFTEEN",
  "SIXTEEN",
  "SEVENTEEN",
  "EIGHTEEN",
  "NINETEEN",
];

const TENS = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

function chunk(n: number): string {
  if (n < 20) return BELOW_TWENTY[n] ?? "";
  if (n < 100) {
    const ten = Math.floor(n / 10);
    const rest = n % 10;
    return rest ? `${TENS[ten]} ${BELOW_TWENTY[rest]}` : (TENS[ten] ?? "");
  }
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  return rest
    ? `${BELOW_TWENTY[hundred]} HUNDRED ${chunk(rest)}`
    : `${BELOW_TWENTY[hundred]} HUNDRED`;
}

function integerWords(n: number): string {
  if (n === 0) return "ZERO";
  const parts: string[] = [];
  const billions = Math.floor(n / 1_000_000_000);
  const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  if (billions) parts.push(`${chunk(billions)} BILLION`);
  if (millions) parts.push(`${chunk(millions)} MILLION`);
  if (thousands) parts.push(`${chunk(thousands)} THOUSAND`);
  if (rest) parts.push(chunk(rest));
  return parts.join(" ");
}

/** English amount line used on the printed receipt, matching the workbook style. */
export function etbInWords(amount: number | null): string {
  if (amount == null || Number.isNaN(amount)) return "";
  const rounded = Math.round(amount * 100) / 100;
  const birr = Math.trunc(rounded);
  const santim = Math.round((rounded - birr) * 100);
  const head = integerWords(Math.abs(birr));
  if (santim === 0) return `${head} ETB ONLY`;
  return `${head} ETB AND ${integerWords(santim)} CENTS ONLY`;
}
