import { useState } from "react";
import { canManageUsers, useLhria } from "@/lib/lhria/store";
import { ROLES, type Role } from "@/lib/lhria/types";
import { Btn, Note, SelectField, TextField } from "./fields";

const DEFAULTS: Record<Role, string> = {
  "Authorized User": "user@lhria2026",
  "Admin Level 1": "admin1@LHRIA2026",
  "Admin Level 2": "h@mlet212719",
};

export function Accounts() {
  const session = useLhria((s) => s.session);
  const users = useLhria((s) => s.users);
  const changeOwnPassword = useLhria((s) => s.changeOwnPassword);
  const resetUserPassword = useLhria((s) => s.resetUserPassword);
  const addUser = useLhria((s) => s.addUser);
  const admin = canManageUsers(session?.role);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [target, setTarget] = useState("");
  const [reset, setReset] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("Authorized User");
  const [note, setNote] = useState<{ tone: "good" | "bad"; text: string } | null>(null);

  const roleOptions = ROLES.filter((item) => session?.role === "Admin Level 2" || item !== "Admin Level 2");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {note ? (
        <div className="lg:col-span-2">
          <Note tone={note.tone}>{note.text}</Note>
        </div>
      ) : null}

      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <h2 className="font-serif text-lg">የራሴን የይለፍ ቃል ቀይር</h2>
        <div className="mt-4 flex flex-col gap-3">
          <TextField label="የአሁኑ የይለፍ ቃል" value={current} onChange={setCurrent} />
          <TextField label="አዲስ የይለፍ ቃል" value={next} onChange={setNext} />
          <Btn
            tone="primary"
            onClick={() => {
              const error = changeOwnPassword(current, next);
              setNote(error ? { tone: "bad", text: error } : { tone: "good", text: "የይለፍ ቃልዎ ተቀይሯል።" });
              if (!error) {
                setCurrent("");
                setNext("");
              }
            }}
          >
            ቀይር
          </Btn>
        </div>
      </section>

      {admin ? (
        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <h2 className="font-serif text-lg">የሌላ ተጠቃሚ የይለፍ ቃል ቀይር</h2>
          <div className="mt-4 flex flex-col gap-3">
            <SelectField
              label="ተጠቃሚ"
              value={target}
              options={users.map((user) => user.username)}
              onChange={setTarget}
            />
            <TextField label="አዲስ የይለፍ ቃል" value={reset} onChange={setReset} />
            <Btn
              onClick={() => {
                const error = resetUserPassword(target, reset);
                setNote(error ? { tone: "bad", text: error } : { tone: "good", text: `${target} ተቀይሯል።` });
              }}
            >
              አድስ
            </Btn>
          </div>
        </section>
      ) : null}

      {admin ? (
        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5 lg:col-span-2">
          <h2 className="font-serif text-lg">አዲስ ተጠቃሚ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <TextField label="Username" value={username} onChange={setUsername} />
            <TextField label="ሙሉ ስም" value={fullName} onChange={setFullName} />
            <SelectField
              label="ስልጣን"
              value={role}
              options={roleOptions}
              onChange={(value) => {
                if (value === "Authorized User" || value === "Admin Level 1" || value === "Admin Level 2") setRole(value);
              }}
            />
            <p className="self-end text-sm text-muted">ጊዜያዊ የይለፍ ቃል፡ {DEFAULTS[role]}</p>
          </div>
          <Btn
            className="mt-4"
            tone="primary"
            onClick={() => {
              const error = addUser({
                username,
                fullName,
                role,
                password: DEFAULTS[role],
              });
              setNote(
                error
                  ? { tone: "bad", text: error }
                  : { tone: "good", text: `${username} ተፈጥሯል። ጊዜያዊ የይለፍ ቃል፡ ${DEFAULTS[role]}` },
              );
              if (!error) {
                setUsername("");
                setFullName("");
              }
            }}
          >
            መዝግብ
          </Btn>
        </section>
      ) : null}

      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5 lg:col-span-2">
        <h2 className="font-serif text-lg">የተመዘገቡ ሰዎች</h2>
        <ul className="mt-3 divide-y divide-line">
          {users.map((user) => (
            <li key={user.username} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
              <span className="font-medium">{user.fullName || user.username}</span>
              <span className="text-muted">
                {user.username} · {user.role}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
