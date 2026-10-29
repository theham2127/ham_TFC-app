import { useState } from "react";
import { canEditRates, useLhria } from "@/lib/lhria/store";
import type { GradeRow } from "@/lib/lhria/types";
import { Btn, Note } from "./fields";

const FIELDS: { key: keyof GradeRow; label: string }[] = [
  { key: "location", label: "የቦታ መገኛ" },
  { key: "mud", label: "ጭቃ G+0" },
  { key: "hcbG0", label: "ብሎኬት G+0" },
  { key: "hcbG1", label: "G+1–5" },
  { key: "hcbG6", label: "≥G+6" },
  { key: "apartment", label: "አፓርትመንት" },
  { key: "condo", label: "ኮንዶሚኒየም" },
  { key: "inheritG0", label: "ውርስ G+0" },
  { key: "inheritG1", label: "ውርስ ≥G+1" },
  { key: "inheritApt", label: "ውርስ አፓ." },
  { key: "inheritCondo", label: "ውርስ ኮን." },
];

export function RatesPanel() {
  const role = useLhria((s) => s.session?.role);
  const grades = useLhria((s) => s.grades);
  const setGrades = useLhria((s) => s.setGrades);
  const resetGrades = useLhria((s) => s.resetGrades);
  const editable = canEditRates(role);
  const [rows, setRows] = useState<GradeRow[]>(grades);
  const [saved, setSaved] = useState(false);

  function update(index: number, key: keyof GradeRow, raw: string) {
    const next = Number(raw);
    if (!Number.isFinite(next)) return;
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: next } : row)));
    setSaved(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Note tone={editable ? "bad" : "plain"}>
        {editable
          ? "Admin Level 2። መመሪያው ሲቀየር ብቻ ይህን ሰንጠረዥ ያስተካክሉ። ያለ ማሻሻያ መጠቀም ለስህተት እና ለኪሳራ ያጋልጣል።"
          : "ተመኑ ተቆልፏል። ማየት ይችላሉ፤ ማስተካከል የሚችለው Admin Level 2 ብቻ ነው።"}
      </Note>
      {saved ? <Note tone="good">የካሬ ዋጋው ተቀምጧል። አዲስ ስሌት ይህን ይጠቀማል።</Note> : null}

      <div className="hidden overflow-x-auto rounded-xl border border-line bg-surface lg:block">
        <table className="w-full min-w-[64rem] text-left text-xs">
          <thead className="text-muted">
            <tr className="border-b border-line">
              <th className="px-3 py-2 font-medium">ደረጃ</th>
              {FIELDS.map((field) => (
                <th key={field.key} className="px-2 py-2 font-medium">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.grade} className="border-b border-line">
                <th className="px-3 py-1.5 font-semibold">{row.grade}</th>
                {FIELDS.map((field) => (
                  <td key={field.key} className="px-1 py-1">
                    <input
                      className="w-full min-w-16 rounded border border-line bg-paper px-1 py-1 tabular-nums disabled:border-transparent disabled:bg-transparent"
                      disabled={!editable}
                      value={row[field.key]}
                      inputMode="decimal"
                      onChange={(event) => update(index, field.key, event.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {rows.map((row, index) => (
          <article key={row.grade} className="rounded-xl border border-line bg-surface p-4">
            <h3 className="font-serif text-lg">ደረጃ {row.grade}</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {FIELDS.map((field) => (
                <label key={field.key} className="flex flex-col gap-1 text-xs">
                  {field.label}
                  <input
                    className="min-h-11 rounded-lg border border-line bg-paper px-2 tabular-nums disabled:bg-paper"
                    disabled={!editable}
                    value={row[field.key]}
                    inputMode="decimal"
                    onChange={(event) => update(index, field.key, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </article>
        ))}
      </div>

      {editable ? (
        <div className="flex flex-wrap gap-2">
          <Btn
            tone="primary"
            onClick={() => {
              setGrades(rows);
              setSaved(true);
            }}
          >
            ተመኑን አስቀምጥ
          </Btn>
          <Btn
            onClick={() => {
              resetGrades();
              setRows(useLhria.getState().grades);
              setSaved(false);
            }}
          >
            ወደ መመሪያው መልስ
          </Btn>
        </div>
      ) : null}
    </div>
  );
}
