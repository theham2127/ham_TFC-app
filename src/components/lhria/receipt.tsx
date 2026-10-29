import { useMemo, useState } from "react";
import { calculate } from "@/lib/lhria/calc";
import { formatEc } from "@/lib/lhria/calendar";
import { formatBirr, formatFcn } from "@/lib/lhria/format";
import { useLhria } from "@/lib/lhria/store";
import { OFFICE_AM, SUBCITY, TYPE_APT, TYPE_CONDO, TYPE_OTHER } from "@/lib/lhria/types";
import { etbInWords } from "@/lib/lhria/words";
import { Btn, controlClass } from "./fields";

function Mark({ ok }: { ok: boolean }) {
  return <span className={ok ? "text-primary" : "text-accent"}>{ok ? "✓" : "✗"}</span>;
}

function Row({ label, value }: { label: string; value: string }) {
  const filled = value.trim() !== "" && value !== "—";
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">
        {filled ? value : "—"} <Mark ok={filled} />
      </span>
    </div>
  );
}

export function Receipt({ focusId }: { focusId: string | null }) {
  const records = useLhria((s) => s.records);
  const grades = useLhria((s) => s.grades);
  const draft = useLhria((s) => s.draft);
  const [picked, setPicked] = useState<string>(focusId ?? "draft");
  const [kind, setKind] = useState<"fee" | "fund">("fee");

  const activeId = records.some((item) => item.id === picked) || picked === "draft" ? picked : "draft";
  const record = records.find((item) => item.id === activeId) ?? null;
  const source = record ?? draft;
  const breakdown = useMemo(() => calculate(source, grades), [source, grades]);
  const titleId = record?.id ?? "DRAFT";

  function printSheet(next: "fee" | "fund") {
    setKind(next);
    document.title = `LHRIA_${titleId}_${next === "fee" ? "TF" : "SF"}`;
    window.setTimeout(() => window.print(), 60);
  }

  const otherArea =
    (source.mudG0 ?? 0) + (source.hcbG0 ?? 0) + (source.hcbG1 ?? 0) + (source.hcbG6 ?? 0);
  const words = etbInWords(breakdown.totalFee);
  const fundWords = etbInWords(breakdown.securityFund);

  return (
    <div className="flex flex-col gap-4">
      <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex w-full flex-col gap-1.5 sm:max-w-md">
          <span className="text-sm font-medium">ደረሰኝ የሚወጣለት መዝገብ</span>
          <select className={controlClass} value={activeId} onChange={(event) => setPicked(event.target.value)}>
            <option value="draft">ያልተቀመጠው ረቂቅ</option>
            {records.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} · {item.ownerName}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn tone={kind === "fee" ? "primary" : "line"} onClick={() => setKind("fee")}>
            የክፍያ ቅጽ
          </Btn>
          <Btn tone={kind === "fund" ? "primary" : "line"} onClick={() => setKind("fund")}>
            የዋስትና ፈንድ
          </Btn>
          <Btn tone="accent" onClick={() => printSheet(kind)}>
            PDF / አትም
          </Btn>
        </div>
      </div>

      {kind === "fee" ? (
        <article className="print-sheet rounded-xl border border-line bg-surface p-4 sm:p-6">
          <header className="border-b border-ink pb-3 text-center">
            <p className="text-xs tracking-wide">{OFFICE_AM}</p>
            <p className="mt-1 font-serif text-xl">የ {SUBCITY} ክ/ከተማ ቅ/ጽ/ቤት</p>
            <h2 className="mt-1 font-serif text-2xl">የሥም ዝዉዉር ክፍያ ማጠናቀሪያ ቅፅ</h2>
            <p className="mt-1 text-xs text-muted">Transaction {titleId}</p>
          </header>

          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            <section>
              <h3 className="mb-2 text-sm font-semibold">የአገልግሎት ጠያቂ</h3>
              <Row label="ሙሉ ስም" value={source.ownerName} />
              <Row label="ክፍለ ከተማ" value={SUBCITY} />
              <Row label="ወረዳ" value={source.woreda} />
              <Row label="ስልክ" value={source.phone} />
              <Row label="ፋይዳ" value={formatFcn(source.fcn)} />
            </section>
            <section>
              <h3 className="mb-2 text-sm font-semibold">ቦታ</h3>
              <Row label="ልዩ መለያ" value={source.propertyId} />
              <Row label="ዓይነት" value={source.propertyType} />
              <Row label="ምክንያት" value={source.reason} />
              <Row label="የቀድሞ ዋጋ" value={formatBirr(source.previousPrice)} />
              <Row label="የአሁን ዋጋ" value={formatBirr(source.currentPrice)} />
              <Row label="የቦታ ስፋት" value={source.propertyType === TYPE_OTHER ? formatBirr(source.landArea) : "—"} />
              <Row label="ስሪት" value={source.tenure} />
              <Row label="ደረጃ" value={source.landGrade} />
              <Row label="አገልግሎት በካርታ" value={source.usePlan} />
              <Row label="አገልግሎት በአካል" value={source.usePhysical} />
            </section>
            <section>
              <h3 className="mb-2 text-sm font-semibold">ግንባታ</h3>
              <Row label="ጭቃ G+0" value={source.propertyType === TYPE_OTHER ? formatBirr(source.mudG0) : "—"} />
              <Row label="ብሎኬት G+0" value={source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG0) : "—"} />
              <Row label="ብሎኬት G+1–5" value={source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG1) : "—"} />
              <Row label="ብሎኬት ≥G+6" value={source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG6) : "—"} />
              <Row label="ጠቅላላ ሌላ ቤት" value={source.propertyType === TYPE_OTHER ? formatBirr(otherArea) : "—"} />
              <Row label="አፓርትመንት" value={source.propertyType === TYPE_APT ? formatBirr(source.apartment) : "—"} />
              <Row label="ኮንዶሚኒየም" value={source.propertyType === TYPE_CONDO ? formatBirr(source.condo) : "—"} />
            </section>
          </div>

          <div className="mt-5 grid gap-4 border-t border-ink pt-4 sm:grid-cols-2">
            <div className="text-sm">
              <h3 className="mb-2 font-semibold">የታክስ እና የአገልግሎት ክፍያዎች</h3>
              <Row label="የሰነድ ማጣራት" value={formatBirr(breakdown.documentFee)} />
              <Row label="የመሀንዲስ አገልግሎት" value={formatBirr(breakdown.engineerFee)} />
              <Row label="የባላቤትነት መመዝገቢያ" value={formatBirr(breakdown.registrationFee)} />
              <Row label="የይዞታ ማረጋገጫ" value={formatBirr(breakdown.certificateFee)} />
              <Row label="ቴምብር 2%" value={formatBirr(breakdown.stampDuty)} />
              <Row label="አሹራ 4%" value={formatBirr(breakdown.ashura)} />
              <p className="mt-3 font-serif text-2xl tabular-nums">{formatBirr(breakdown.totalFee)} ብር</p>
              <p className="mt-1 text-xs leading-relaxed tracking-wide uppercase">{words}</p>
              <p className="mt-2 text-xs text-muted">
                ድርሻ {source.sharePercent ?? "—"}% · ለክፍያ የዋለው ዋጋ {formatBirr(breakdown.basis)}
                {breakdown.basisLabel ? ` (${breakdown.basisLabel})` : ""}
              </p>
            </div>
            <div className="text-sm">
              <h3 className="mb-2 font-semibold">ያዘጋጀው ባለሙያ</h3>
              <p>ስም፡ {source.officer || "—"}</p>
              <p className="mt-6">ፊርማ፡ ______________________</p>
              <p className="mt-4">ቀን፡ {formatEc(source.orderDate) || source.orderDate}</p>
              {record && record.fee !== breakdown.totalFee ? (
                <p className="no-print mt-4 text-xs text-accent">
                  በመዝገብ የተቀመጠው {formatBirr(record.fee)} ነው። ይህ ቅጽ አሁን ካለው ተመን {formatBirr(breakdown.totalFee)} ያሳያል።
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed">
            ማሳሰቢያ፡ ገንዘቡ ገቢ የሚደረግበት አድራሻ NSL LANDHOLDING RIGIST INFO AGE · አካውንት 1000012950547 · ኢትዮጵያ ንግድ ባንክ። ገንዘቡ
            በባለይዞታው ወይም ክፍያ እንዲከፍል በታዘዘው ስም ብቻ ነው። በውክልና የሚከፈል ክፍያ ተቀባይነት የለውም።
          </p>
        </article>
      ) : (
        <article className="print-sheet mx-auto w-full max-w-3xl rounded-xl border border-line bg-surface p-4 sm:p-6">
          <header className="border-b border-ink pb-3 text-center">
            <p className="text-xs">በአዲስ አበባ ከተማ አስተዳደር</p>
            <p className="mt-1 font-serif text-lg">{SUBCITY} ክ/ከተማ የመሬት ይዞታ ምዝገባ እና መረጃ ኤጄንሲ ቅ/ጽ/ቤት</p>
            <h2 className="mt-1 font-serif text-2xl">የዋስትና ፈንድ ክፍያ ማጠናቀሪያ ቅፅ</h2>
            <p className="mt-1 text-xs text-muted">{titleId}</p>
          </header>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <section>
              <Row label="ሙሉ ስም" value={source.ownerName} />
              <Row label="ክፍለ ከተማ" value={SUBCITY} />
              <Row label="ወረዳ" value={source.woreda} />
              <Row label="ስልክ" value={source.phone} />
              <Row label="ፋይዳ" value={formatFcn(source.fcn)} />
              <Row label="ከአፓርትመንት ውጪ ስፋት" value={formatBirr(otherArea)} />
              <Row label="አፓርትመንት" value={formatBirr(source.apartment)} />
              <Row label="ኮንዶሚኒየም" value={formatBirr(source.condo)} />
            </section>
            <section>
              <Row label="ልዩ መለያ" value={source.propertyId} />
              <Row label="ዓይነት" value={source.propertyType} />
              <Row label="ምክንያት" value={source.reason} />
              <Row label="የቀድሞ ዋጋ" value={formatBirr(source.previousPrice)} />
              <Row label="የአሁን ዋጋ" value={formatBirr(source.currentPrice)} />
              <Row label="የቦታ ስፋት" value={formatBirr(source.landArea)} />
              <Row label="ስሪት" value={source.tenure} />
              <Row label="ደረጃ" value={source.landGrade} />
              <Row label="በካርታ" value={source.usePlan} />
              <Row label="በአካል" value={source.usePhysical} />
            </section>
          </div>
          <div className="mt-5 border-t border-ink pt-4">
            <p className="text-sm text-muted">ለስም ዝውውሩ የሚከፈል ጠቅላላ ክፍያ</p>
            <p className="font-serif text-2xl tabular-nums">{formatBirr(breakdown.totalFee)} ብር</p>
            <p className="text-xs tracking-wide uppercase">{words}</p>
            <p className="mt-4 text-sm text-muted">ለዋስትና ፈንድ የሚከፈል ጠቅላላ ክፍያ (2%)</p>
            <p className="font-serif text-2xl tabular-nums">{formatBirr(breakdown.securityFund)} ብር</p>
            <p className="text-xs tracking-wide uppercase">{fundWords}</p>
            <p className="mt-6 text-sm">ስም፡ {source.officer || "—"}</p>
            <p className="mt-4 text-sm">ፊርማ፡ ______________________</p>
            <p className="mt-4 text-sm">ቀን፡ {formatEc(source.orderDate) || source.orderDate}</p>
          </div>
          <p className="mt-5 text-xs leading-relaxed">
            ማሳሰቢያ፡ የስም ማዛወሪያ ከፋዩ ገዥ ሲሆን ገንዘቡ ገቢ የሚደረግበት አድራሻ የአዲስ አበባ ከተማ አስተዳደር የመሬት ይዞታ ምዝገባና መረጃ ኤጄንሲ ·
            አካውንት በመመሪያው የተሰጠው · ኢትዮጵያ ንግድ ባንክ። ገንዘቡ ይዞታው በሚተላለፍለት ወይም በገዥ ስም ብቻ መግባት አለበት።
          </p>
        </article>
      )}
    </div>
  );
}
