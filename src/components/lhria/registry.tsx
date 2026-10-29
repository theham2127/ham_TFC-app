import { useMemo, useState } from "react";
import { calculate, feesMatch } from "@/lib/lhria/calc";
import { formatEc } from "@/lib/lhria/calendar";
import { formatBirr } from "@/lib/lhria/format";
import { canDelete, useLhria } from "@/lib/lhria/store";
import { PAYMENT_STATUSES, type PaymentStatus, type Transaction } from "@/lib/lhria/types";
import { Btn, Note, controlClass } from "./fields";

export function Registry({
  onEdit,
  onOpen,
}: {
  onEdit: (record: Transaction) => void;
  onOpen: (id: string) => void;
}) {
  const records = useLhria((s) => s.records);
  const grades = useLhria((s) => s.grades);
  const role = useLhria((s) => s.session?.role);
  const deleteRecord = useLhria((s) => s.deleteRecord);
  const setPayment = useLhria((s) => s.setPayment);
  const importBackup = useLhria((s) => s.importBackup);
  const [query, setQuery] = useState("");
  const [auditId, setAuditId] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (record) =>
        record.propertyId.toLowerCase().includes(q) ||
        record.ownerName.toLowerCase().includes(q) ||
        record.id.toLowerCase().includes(q) ||
        record.woreda.toLowerCase().includes(q),
    );
  }, [records, query]);

  const audit = records.find((record) => record.id === auditId) ?? null;
  const live = audit ? calculate(audit, grades) : null;

  function exportFile() {
    const payload = {
      kind: "lhria-backup",
      exportedAt: new Date().toISOString(),
      grades: role === "Admin Level 2" ? grades : undefined,
      records,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `LHRIA_registry_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex w-full flex-col gap-1.5 sm:max-w-md">
          <span className="text-sm font-medium">ፈልግ · መለያ፣ ስም ወይም የግብይት ቁጥር</span>
          <input
            className={controlClass}
            value={query}
            placeholder="AA00002127"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Btn onClick={exportFile}>Backup</Btn>
          {canDelete(role) ? (
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold">
              Restore
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const payload = JSON.parse(String(reader.result)) as {
                        records?: Transaction[];
                        grades?: typeof grades;
                      };
                      const result = importBackup(payload);
                      setNote(result.error ?? `${result.added} አዲስ መዝገብ ገብቷል።`);
                    } catch {
                      setNote("ፋይሉ አልተነበበም።");
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </label>
          ) : null}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        {records.length} መዝገብ በዚህ መሣሪያ ላይ ተቀምጧል። ወደ ሌላ ኮምፒውተር ለማዛወር Backup ይውሰዱ።
      </p>
      {note ? <Note tone="plain">{note}</Note> : null}

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-muted">
          የሚታይ መዝገብ የለም። ከመግቢያ ገጽ ይጨምሩ ወይም ከሪፖርት የናሙና ይዞታዎችን ያስገቡ።
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((record) => (
            <li key={record.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-serif text-lg leading-snug">{record.ownerName}</p>
                  <p className="text-sm text-muted">
                    {record.propertyId} · {record.propertyType || "—"} · {record.woreda || "ወረዳ ያልተሞላ"}
                  </p>
                </div>
                <p className="font-serif text-xl tabular-nums">{formatBirr(record.fee)}</p>
              </div>
              <p className="mt-2 text-xs text-muted">
                {record.id} · {formatEc(record.orderDate) || record.orderDate} · {record.createdBy}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <select
                  className="min-h-11 rounded-lg border border-line bg-paper px-2 text-sm"
                  value={record.paymentStatus}
                  onChange={(event) => setPayment(record.id, event.target.value as PaymentStatus)}
                >
                  {PAYMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Btn tone="primary" onClick={() => onOpen(record.id)}>
                  ደረሰኝ
                </Btn>
                <Btn onClick={() => onEdit(record)}>አርም</Btn>
                <Btn tone="ghost" onClick={() => setAuditId(record.id)}>
                  ኦዲት
                </Btn>
                {canDelete(role) ? (
                  <Btn
                    tone="ghost"
                    onClick={() => {
                      if (window.confirm(`መዝገብ ${record.id} ይሰረዝ?`)) deleteRecord(record.id);
                    }}
                  >
                    ሰርዝ
                  </Btn>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {audit && live ? (
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="font-serif text-lg">የክፍያ ኦዲት · {audit.propertyId}</h2>
            <Btn tone="ghost" onClick={() => setAuditId(null)}>
              ዝጋ
            </Btn>
          </div>
          <p className="text-sm">{audit.ownerName}</p>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">በመዝገብ የተቀመጠ</dt>
              <dd className="tabular-nums">{formatBirr(audit.fee)} ብር</dd>
            </div>
            <div>
              <dt className="text-muted">አሁን ካለው ተመን</dt>
              <dd className="tabular-nums">{formatBirr(live.totalFee)} ብር</dd>
            </div>
          </dl>
          <p className={`mt-3 text-sm font-medium ${feesMatch(audit.fee, live.totalFee) ? "text-primary" : "text-accent"}`}>
            {feesMatch(audit.fee, live.totalFee)
              ? "ተመሳሳይ ነው። የተቀመጠው ክፍያ ከአሁኑ ስሌት ጋር ይጣጣማል።"
              : `ልዩነት ${formatBirr((live.totalFee ?? 0) - audit.fee)} ብር። ተመኑ ከተቀየረ መዝገቡን አድሰው።`}
          </p>
        </div>
      ) : null}
    </div>
  );
}
