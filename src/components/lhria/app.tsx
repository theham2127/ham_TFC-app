import { useEffect, useState } from "react";
import {
  BookOpen,
  ChartColumn,
  KeyRound,
  Library,
  LogOut,
  PenLine,
  ScrollText,
  Table2,
} from "lucide-react";
import { clsx } from "clsx";
import { SEED_USERS, canManageUsers, canViewRates, useLhria } from "@/lib/lhria/store";
import { SUBCITY } from "@/lib/lhria/types";
import { Accounts } from "./accounts";
import { Dashboard } from "./dashboard";
import { EntryForm } from "./entry-form";
import { Btn, Note, TextField } from "./fields";
import { Guide } from "./guide";
import { RatesPanel } from "./rates-panel";
import { Receipt } from "./receipt";
import { Registry } from "./registry";

type View = "guide" | "entry" | "registry" | "receipt" | "report" | "rates" | "accounts";

const NAV: { id: View; label: string; en: string; icon: typeof BookOpen; admin?: "rates" | "users" }[] = [
  { id: "guide", label: "መመሪያ", en: "Guide", icon: BookOpen },
  { id: "entry", label: "መግቢያ", en: "Entry", icon: PenLine },
  { id: "registry", label: "መዝገብ", en: "Registry", icon: Library },
  { id: "receipt", label: "ደረሰኝ", en: "Receipt", icon: ScrollText },
  { id: "report", label: "ሪፖርት", en: "Report", icon: ChartColumn },
  { id: "rates", label: "ተመን", en: "Rates", icon: Table2, admin: "rates" },
  { id: "accounts", label: "ተጠቃሚ", en: "Accounts", icon: KeyRound, admin: "users" },
];

function Login() {
  const login = useLhria((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-4 py-10 lg:flex-row lg:items-center">
      <section className="flex-1">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Addis Ababa LHRIA</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight">የሥም ዝዉዉር ክፍያ</h1>
        <p className="mt-2 text-lg text-muted">{SUBCITY} ክፍለ ከተማ</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed">
          Property transaction fee, stamp duty, ashura and security fund — calculated from the land-grade directive
          used by the Nefas Silk Lafto landholding office.
        </p>
      </section>
      <form
        className="w-full max-w-md rounded-2xl border border-line bg-surface p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          const message = login(username, password);
          setError(message);
        }}
      >
        <h2 className="font-serif text-2xl">System login</h2>
        <div className="mt-4 flex flex-col gap-3">
          <TextField label="Username" value={username} autoComplete="username" onChange={setUsername} />
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base outline-none focus-visible:border-primary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <Note tone="bad">{error}</Note> : null}
          <Btn type="submit" tone="primary" className="w-full">
            ግባ
          </Btn>
        </div>
      </form>
    </main>
  );
}

export function LhriaApp() {
  const session = useLhria((s) => s.session);
  const logout = useLhria((s) => s.logout);
  const replaceDraft = useLhria((s) => s.replaceDraft);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("guide");
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {
    const persist = useLhria.persist;
    if (persist.hasHydrated()) {
      setReady(true);
      return;
    }
    const unsub = persist.onFinishHydration(() => setReady(true));
    void persist.rehydrate();
    return unsub;
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-serif text-3xl text-primary">LHRIA</p>
        <p className="text-sm text-muted">የስም ዝውውር ክፍያ በመከፈት ላይ…</p>
      </main>
    );
  }

  if (!session) return <Login />;

  const items = NAV.filter((item) => {
    if (item.admin === "rates") return canViewRates(session.role);
    if (item.admin === "users") return canManageUsers(session.role);
    return true;
  });

  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <div className="min-w-0">
            <p className="truncate font-serif text-lg leading-none">LHRIA · {SUBCITY}</p>
            <p className="truncate text-xs text-muted">
              {session.fullName} · {session.role}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              setView("guide");
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold hover:bg-ink/5"
          >
            <LogOut className="size-4" aria-hidden />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="no-print hidden gap-1 p-4 lg:flex lg:flex-col">
          {items.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={clsx(
                  "flex min-h-11 items-center gap-2 rounded-lg px-3 text-left text-sm",
                  active ? "bg-primary text-primary-fg" : "hover:bg-ink/5",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span>
                  {item.label}
                  <span className={clsx("block text-xs", active ? "text-primary-fg/80" : "text-muted")}>{item.en}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <main className="px-4 py-4 pb-28 lg:py-6 lg:pb-10">
          {view === "guide" ? <Guide onEnter={() => setView("entry")} /> : null}
          {view === "entry" ? (
            <EntryForm
              onSaved={(id) => {
                setFocusId(id);
              }}
            />
          ) : null}
          {view === "registry" ? (
            <Registry
              onEdit={(record) => {
                replaceDraft(record, record.id);
                setView("entry");
              }}
              onOpen={(id) => {
                setFocusId(id);
                setView("receipt");
              }}
            />
          ) : null}
          {view === "receipt" ? <Receipt focusId={focusId} /> : null}
          {view === "report" ? <Dashboard /> : null}
          {view === "rates" && canViewRates(session.role) ? <RatesPanel /> : null}
          {view === "accounts" && canManageUsers(session.role) ? <Accounts /> : null}
        </main>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface lg:hidden">
        <ul className="flex overflow-x-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <li key={item.id} className="min-w-[4.5rem] flex-1">
                <button
                  type="button"
                  onClick={() => setView(item.id)}
                  className={clsx(
                    "flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-xs",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
