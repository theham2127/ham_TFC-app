import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EC_MONTHS, currentEcYear, formatEc, gcToEc, matchEcMonth } from "@/lib/lhria/calendar";
import { formatBirr } from "@/lib/lhria/format";
import { useLhria } from "@/lib/lhria/store";
import { PAYMENT_STATUSES, PROPERTY_TYPES, TYPE_APT, TYPE_CONDO, TYPE_OTHER } from "@/lib/lhria/types";
import { Btn, controlClass } from "./fields";

const SHORT: Record<string, string> = {
  [TYPE_OTHER]: "ሌላ",
  [TYPE_APT]: "አፓርትመንት",
  [TYPE_CONDO]: "ኮንዶሚኒየም",
};

function axis(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(value);
}

export function Dashboard() {
  const records = useLhria((s) => s.records);
  const seedSamples = useLhria((s) => s.seedSamples);
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState(String(currentEcYear()));
  const [pay, setPay] = useState("all");

  const years = useMemo(() => {
    const set = new Set<number>([currentEcYear()]);
    for (const record of records) {
      const ec = gcToEc(record.orderDate);
      if (ec) set.add(ec.year);
    }
    return [...set].sort((a, b) => b - a);
  }, [records]);

  const rows = useMemo(() => {
    return records.filter((record) => {
      const ec = gcToEc(record.orderDate);
      if (year !== "all" && (!ec || String(ec.year) !== year)) return false;
      if (month !== "all") {
        const wanted = matchEcMonth(month);
        if (!ec || wanted == null || ec.month !== wanted) return false;
      }
      if (pay !== "all" && record.paymentStatus !== pay) return false;
      return true;
    });
  }, [records, month, year, pay]);

  const byType = PROPERTY_TYPES.map((type) => ({
    name: SHORT[type] ?? type,
    count: rows.filter((record) => record.propertyType === type).length,
    fee: rows.filter((record) => record.propertyType === type).reduce((sum, record) => sum + record.fee, 0),
  }));
  const byPay = PAYMENT_STATUSES.map((status) => ({
    name: status,
    count: rows.filter((record) => record.paymentStatus === status).length,
    fee: rows.filter((record) => record.paymentStatus === status).reduce((sum, record) => sum + record.fee, 0),
  }));
  const totalFee = rows.reduce((sum, record) => sum + record.fee, 0);
  const totalFund = rows.reduce((sum, record) => sum + record.securityFund, 0);
  const monthName = EC_MONTHS.find((item) => String(item.n) === month);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-serif text-xl">ወርሃዊ ሪፖርት · በኢትዮጵያ ዘመን</h2>
        <p className="mt-1 text-sm text-muted">
          {month === "all" ? "ሁሉም ወራት" : `${monthName?.am ?? month} / ${monthName?.en ?? ""}`}{" "}
          {year === "all" ? "" : year} ዓ.ም. · {rows.length} ግብይት · {formatBirr(totalFee)} ብር ክፍያ ·{" "}
          {formatBirr(totalFund)} ብር ዋስትና
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-sm">
            ወር
            <select className={controlClass} value={month} onChange={(event) => setMonth(event.target.value)}>
              <option value="all">ሁሉም</option>
              {EC_MONTHS.map((item) => (
                <option key={item.n} value={String(item.n)}>
                  {String(item.n).padStart(2, "0")} · {item.am} / {item.en}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            ዓመት
            <select className={controlClass} value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="all">ሁሉም</option>
              {years.map((item) => (
                <option key={item} value={String(item)}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            የክፍያ ሁኔታ
            <select className={controlClass} value={pay} onChange={(event) => setPay(event.target.value)}>
              <option value="all">ሁሉም</option>
              {PAYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {byType.map((item) => (
          <article key={item.name} className="rounded-xl border border-line bg-surface p-4">
            <p className="text-sm text-muted">{item.name}</p>
            <p className="font-serif text-2xl tabular-nums">{item.count}</p>
            <p className="text-sm tabular-nums text-muted">{formatBirr(item.fee)} ብር</p>
          </article>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface px-4 py-8 text-center">
          <p className="text-sm text-muted">በዚህ ወር ምንም መዝገብ የለም።</p>
          <Btn className="mt-3" onClick={() => seedSamples()}>
            ሦስት የናሙና ይዞታ ጨምር
          </Btn>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold">ክፍያ በንብረት ዓይነት</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byType}>
                  <CartesianGrid stroke="var(--color-line)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
                  <YAxis tickFormatter={axis} tick={{ fill: "var(--color-muted)", fontSize: 12 }} width={40} />
                  <Tooltip formatter={(value) => formatBirr(Number(value))} />
                  <Bar dataKey="fee" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="rounded-xl border border-line bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold">ክፍያ በሁኔታ</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byPay}>
                  <CartesianGrid stroke="var(--color-line)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} interval={0} />
                  <YAxis tickFormatter={axis} tick={{ fill: "var(--color-muted)", fontSize: 12 }} width={40} />
                  <Tooltip formatter={(value) => formatBirr(Number(value))} />
                  <Bar dataKey="fee" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {rows.slice(0, 8).map((record) => (
          <li key={record.id} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm">
            <span>
              <span className="font-medium">{record.ownerName}</span>
              <span className="block text-xs text-muted">
                {record.propertyId} · {formatEc(record.orderDate) || record.orderDate} · {record.paymentStatus}
              </span>
            </span>
            <span className="tabular-nums">{formatBirr(record.fee)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
