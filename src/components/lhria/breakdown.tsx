import type { Breakdown } from "@/lib/lhria/calc";
import { formatBirr } from "@/lib/lhria/format";
import { etbInWords } from "@/lib/lhria/words";

function Line({ label, value, strong }: { label: string; value: number | null; strong?: boolean }) {
  return (
    <div className={strong ? "flex items-baseline justify-between gap-3 border-t border-line pt-2" : "flex items-baseline justify-between gap-3"}>
      <span className={strong ? "font-semibold" : "text-muted"}>{label}</span>
      <span className={strong ? "font-serif text-xl tabular-nums" : "tabular-nums"}>{formatBirr(value)}</span>
    </div>
  );
}

export function FeeSummary({ breakdown }: { breakdown: Breakdown }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <Line label="ጠቅላላ የቦታ ዋጋ" value={breakdown.landValue} />
      <Line label="የግንባታ ዋጋ (ከአፓርትመንት እና ኮንዶሚንየም ውጪ)" value={breakdown.buildingValue} />
      <Line label="ጠቅላላ ዋጋ ድምር" value={breakdown.assessedTotal} />
      <Line label="የአፓርትመንት ግንባታ" value={breakdown.apartmentValue} />
      <Line label="የኮንዶሚኒየም ግንባታ" value={breakdown.condoValue} />
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-muted">ለክፍያ የዋለው ዋጋ</span>
        <span className="text-right">
          <span className="tabular-nums">{formatBirr(breakdown.basis)}</span>
          {breakdown.basisLabel ? <span className="mt-0.5 block text-xs text-muted">{breakdown.basisLabel}</span> : null}
        </span>
      </div>
      <Line label="የሰነድ ማጣራት" value={breakdown.documentFee} />
      <Line label="የመሀንዲስ አገልግሎት" value={breakdown.engineerFee} />
      <Line label="የባላቤትነት መመዝገቢያ" value={breakdown.registrationFee} />
      <Line label="የይዞታ ማረጋገጫ ህትመት" value={breakdown.certificateFee} />
      <Line label="የቴምብር ቀረጥ 2%" value={breakdown.stampDuty} />
      <Line label="የአሹራ ክፍያ 4%" value={breakdown.ashura} />
      <Line label="ጠቅላላ የስም ዝውውር ክፍያ" value={breakdown.totalFee} strong />
      <Line label="የዋስትና ፈንድ 2%" value={breakdown.securityFund} />
      {breakdown.totalFee != null ? (
        <p className="text-xs leading-relaxed tracking-wide text-muted uppercase">{etbInWords(breakdown.totalFee)}</p>
      ) : null}
    </div>
  );
}
