import { useMemo, useState } from "react";
import { calculate } from "@/lib/lhria/calc";
import { formatEc } from "@/lib/lhria/calendar";
import { workedExample } from "@/lib/lhria/draft";
import { formatBirr } from "@/lib/lhria/format";
import { useLhria } from "@/lib/lhria/store";
import {
  PAYMENT_STATUSES,
  PHYSICAL_USES,
  PLAN_USES,
  PROPERTY_TYPES,
  REASONS,
  TENURES,
  TYPE_APT,
  TYPE_CONDO,
  TYPE_OTHER,
  WOREDAS,
} from "@/lib/lhria/types";
import { etbInWords } from "@/lib/lhria/words";
import { FeeSummary } from "./breakdown";
import { Btn, Note, NumField, Panel, SelectField, TextField } from "./fields";

export function EntryForm({ onSaved }: { onSaved: (id: string) => void }) {
  const draft = useLhria((s) => s.draft);
  const grades = useLhria((s) => s.grades);
  const editingId = useLhria((s) => s.editingId);
  const setDraft = useLhria((s) => s.setDraft);
  const clearDraft = useLhria((s) => s.clearDraft);
  const saveRecord = useLhria((s) => s.saveRecord);
  const [note, setNote] = useState<{ tone: "good" | "bad"; text: string } | null>(null);

  const breakdown = useMemo(() => calculate(draft, grades), [draft, grades]);
  const other = draft.propertyType === TYPE_OTHER;
  const apt = draft.propertyType === TYPE_APT;
  const condo = draft.propertyType === TYPE_CONDO;
  const ec = formatEc(draft.orderDate);

  function save() {
    const fcnDigits = draft.fcn.replace(/\D/g, "");
    if (fcnDigits && fcnDigits.length !== 16) {
      setNote({ tone: "bad", text: "የፋይዳ ቁጥር 16 አሃዝ መሆን አለበት።" });
      return;
    }
    const result = saveRecord();
    if (result.error) {
      setNote({ tone: "bad", text: result.error });
      return;
    }
    const resale = result.resale ? " ይህ የይዞታ መለያ ቀድሞ ተመዝግቦ ነበር — እንደ ተከታይ ሽያጭ ተቀምጧል።" : "";
    setNote({
      tone: "good",
      text: `ተመዝግቧል። መለያ ${result.id} · ክፍያ ${formatBirr(breakdown.totalFee)} ብር።${resale}`,
    });
    if (result.id) onSaved(result.id);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <div className="no-print sticky top-14 z-10 rounded-xl border border-primary/30 bg-primary px-4 py-3 text-primary-fg shadow-sm lg:hidden">
          <p className="text-xs tracking-wide uppercase">ለስም ማዛወሪያ የሚከፈል ጠቅላላ ክፍያ</p>
          <p className="font-serif text-2xl tabular-nums">{formatBirr(breakdown.totalFee)}</p>
          <p className="text-xs text-primary-fg/80">ዋስትና ፈንድ {formatBirr(breakdown.securityFund)}</p>
        </div>

        {editingId ? (
          <Note tone="plain">እየታረመ ያለ መዝገብ፡ {editingId}። ማስቀመጥ ያለውን ክፍያ እንደገና ያሰላል።</Note>
        ) : null}
        {note ? <Note tone={note.tone}>{note.text}</Note> : null}

        <Panel title="የአገልግሎት ጠያቂ">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              className="sm:col-span-2"
              label="የስመ-ንብረት የሚደረግለት አካል ሙሉ ሥም"
              value={draft.ownerName}
              onChange={(ownerName) => setDraft({ ownerName })}
            />
            <SelectField
              label="ወረዳ"
              value={draft.woreda}
              options={WOREDAS}
              onChange={(woreda) => setDraft({ woreda })}
            />
            <TextField
              label="ስልክ ቁጥር"
              value={draft.phone}
              inputMode="tel"
              onChange={(phone) => setDraft({ phone })}
            />
            <TextField
              className="sm:col-span-2"
              label="የፋይዳ ቁጥር"
              hint="16 አሃዝ። በደረሰኝ ላይ በአራት እየተከፈለ ይታያል።"
              value={draft.fcn}
              inputMode="numeric"
              onChange={(fcn) => setDraft({ fcn: fcn.replace(/\D/g, "").slice(0, 16) })}
            />
          </div>
        </Panel>

        <Panel title="ቦታውን የሚመለከት መረጃ">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="የይዞታው ልዩ መለያ ቁጥር"
              value={draft.propertyId}
              onChange={(propertyId) => setDraft({ propertyId })}
            />
            <SelectField
              label="የንብረት ዓይነት"
              value={draft.propertyType}
              options={PROPERTY_TYPES}
              onChange={(propertyType) => setDraft({ propertyType })}
            />
            <SelectField
              label="መብት የሚተላለፍበት ምክንያት"
              value={draft.reason}
              options={REASONS}
              onChange={(reason) => setDraft({ reason })}
            />
            <SelectField
              label="የቦታው ደረጃ"
              value={draft.landGrade}
              options={grades.map((row) => row.grade)}
              onChange={(landGrade) => setDraft({ landGrade })}
              hint={
                breakdown.grade
                  ? `የቦታ መገኛ ዋጋ ${formatBirr(breakdown.grade.location)} ብር / ሜ²`
                  : undefined
              }
            />
            <NumField
              label="የንብረቱ የቀድሞ የሽያጭ ዋጋ"
              suffix="ብር"
              value={draft.previousPrice}
              onChange={(previousPrice) => setDraft({ previousPrice })}
            />
            <NumField
              label="አሁን የቀረበ የሽያጭ ዋጋ"
              suffix="ብር"
              value={draft.currentPrice}
              onChange={(currentPrice) => setDraft({ currentPrice })}
            />
            <NumField
              label="ጠቅላላ የቦታ ስፋት"
              suffix="ሜ²"
              disabled={!other && draft.propertyType !== ""}
              value={draft.landArea}
              onChange={(landArea) => setDraft({ landArea })}
            />
            <SelectField
              label="የቦታ ስሪት"
              value={draft.tenure}
              options={TENURES}
              onChange={(tenure) => setDraft({ tenure })}
            />
            <SelectField
              label="የይዞታው አገልግሎት (በካርታ)"
              value={draft.usePlan}
              options={PLAN_USES}
              onChange={(usePlan) => setDraft({ usePlan })}
            />
            <SelectField
              label="የይዞታው አገልግሎት (በአካል)"
              value={draft.usePhysical}
              options={PHYSICAL_USES}
              onChange={(usePhysical) => setDraft({ usePhysical })}
            />
          </div>
        </Panel>

        <Panel title="ግንባታውን የሚመለከት መረጃ">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumField
              label="ከጭቃ የተሠራ (G+0) ቤት ስፋት"
              suffix="ሜ²"
              disabled={!other && draft.propertyType !== ""}
              value={draft.mudG0}
              onChange={(mudG0) => setDraft({ mudG0 })}
            />
            <NumField
              label="ከብሎኬት የተሠራ (G+0) ቤት ስፋት"
              suffix="ሜ²"
              disabled={!other && draft.propertyType !== ""}
              value={draft.hcbG0}
              onChange={(hcbG0) => setDraft({ hcbG0 })}
            />
            <NumField
              label="ከብሎኬት የተሠራ (G+1 - G+5) ቤት ስፋት"
              suffix="ሜ²"
              disabled={!other && draft.propertyType !== ""}
              value={draft.hcbG1}
              onChange={(hcbG1) => setDraft({ hcbG1 })}
            />
            <NumField
              label="ከብሎኬት የተሠራ (>=G+6) ቤት ስፋት"
              suffix="ሜ²"
              disabled={!other && draft.propertyType !== ""}
              value={draft.hcbG6}
              onChange={(hcbG6) => setDraft({ hcbG6 })}
            />
            <NumField
              label="አፓርትመንት ቤት ስፋት"
              suffix="ሜ²"
              disabled={!apt && draft.propertyType !== ""}
              value={draft.apartment}
              onChange={(apartment) => setDraft({ apartment })}
            />
            <NumField
              label="ኮንዶሚኒየም ቤት ስፋት"
              suffix="ሜ²"
              disabled={!condo && draft.propertyType !== ""}
              value={draft.condo}
              onChange={(condoArea) => setDraft({ condo: condoArea })}
            />
          </div>
        </Panel>

        <Panel title="ክፍያ እና አዘጋጅ">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumField
              label="የንብረት ባለቤትነት ድርሻ መጠን በ %"
              suffix="%"
              hint="ሙሉ ይዞታ 100። ግማሽ 50። የቴምብርና የአሹራ በዚህ ድርሻ ይባዛሉ።"
              value={draft.sharePercent}
              onChange={(sharePercent) => setDraft({ sharePercent })}
            />
            <SelectField
              label="የክፍያ ሁኔታ"
              value={draft.paymentStatus}
              options={PAYMENT_STATUSES}
              placeholder="የሚከፈል"
              onChange={(paymentStatus) => {
                if (paymentStatus === "የሚከፈል" || paymentStatus === "የተከፈለ" || paymentStatus === "ያልተከፈለ") {
                  setDraft({ paymentStatus });
                }
              }}
            />
            <TextField
              label="ክፍያው የታዘዘበት ቀን"
              hint={ec ? `${ec}` : "ቀን/ወር/ዓመት እ.ኤ.አ. ለምሳሌ 20/09/2026"}
              value={draft.orderDate}
              onChange={(orderDate) => setDraft({ orderDate })}
            />
            <TextField
              label="ያዘጋጀው ባለሙያ ሥም"
              value={specialistName} readOnly={true}
            />
          </div>
        </Panel>

        {breakdown.messages.length > 0 && breakdown.totalFee == null ? (
          <Note tone="bad">{breakdown.messages[0]}</Note>
        ) : null}

        <div className="no-print flex flex-wrap gap-2">
          <Btn type="submit" tone="primary">
            {editingId ? "መዝገቡን ያድሱ" : "ወደ መዝገብ ጨምር"}
          </Btn>
          <Btn
            onClick={() => {
              clearDraft();
              setNote(null);
            }}
          >
            አጽዳ
          </Btn>
          <Btn
            tone="ghost"
            onClick={() => {
              const sample = workedExample();
              setDraft(sample);
              setNote({ tone: "good", text: "የናሙና ይዞታ ተሞልቷል። ከማስቀመጥዎ በፊት ይመልከቱ።" });
            }}
          >
            የናሙና ይዞታ
          </Btn>
        </div>
      </form>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <Panel title="የክፍያ ማጠቃለያ">
          <p className="mb-3 font-serif text-3xl tabular-nums text-primary">{formatBirr(breakdown.totalFee)}</p>
          <p className="mb-4 text-xs leading-relaxed text-muted">{etbInWords(breakdown.totalFee)}</p>
          <FeeSummary breakdown={breakdown} />
        </Panel>
      </aside>
    </div>
  );
}
