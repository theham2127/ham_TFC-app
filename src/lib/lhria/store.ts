import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculate } from "./calc";
import { emptyDraft, workedExample } from "./draft";
import { DEFAULT_GRADES } from "./rates";
import type { EntryDraft, GradeRow, OfficeUser, Role, Session, Transaction } from "./types";

export const SEED_USERS: OfficeUser[] = [
  { 
    username: "hamlet", 
    password: "h@mlet212719", 
    role: "Admin Level 2", 
    fullName: "Master Super Admin" 
  },
  { 
    username: "admin1", 
    password: "admin@AA2026", 
    role: "Admin Level 1", 
    fullName: "System Administrator" 
  },
  { 
    username: "user1", 
    password: "user@AA2026", 
    role: "Authorized User", 
    fullName: "Data Entry Specialist" 
  },
  { 
    username: "finance1", 
    password: "financer@AA2026", 
    role: "Authorized Financer", 
    fullName: "Sub-City Financer Officer" 
  }
];

type State = {
  users: OfficeUser[];
  session: Session | null;
  grades: GradeRow[];
  records: Transaction[];
  draft: EntryDraft;
  editingId: string | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
  changeOwnPassword: (current: string, next: string) => string | null;
  resetUserPassword: (username: string, next: string) => string | null;
  addUser: (user: OfficeUser) => string | null;
  setDraft: (patch: Partial<EntryDraft>) => void;
  replaceDraft: (draft: EntryDraft, editingId?: string | null) => void;
  clearDraft: () => void;
  saveRecord: () => { error: string | null; id?: string; resale?: boolean };
  deleteRecord: (id: string) => void;
  setGrades: (grades: GradeRow[]) => void;
  resetGrades: () => void;
  seedSamples: () => void;
  setPayment: (id: string, paymentStatus: Transaction["paymentStatus"]) => void;
  importBackup: (payload: { records?: Transaction[]; grades?: GradeRow[] }) => {
    error: string | null;
    added: number;
  };
};

function nextId(records: Transaction[], now = new Date()): string {
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const max = records.reduce((top, record) => {
    const match = /-(\d+)$/.exec(record.id);
    return match ? Math.max(top, Number(match[1])) : top;
  }, 0);
  return `${stamp}-${String(max + 1).padStart(4, "0")}`;
}

function stampOfficer(draft: EntryDraft, session: Session): EntryDraft {
  return {
    ...draft,
    officer: draft.officer.trim() || session.fullName || session.username,
    propertyId: draft.propertyId.trim(),
    ownerName: draft.ownerName.trim(),
  };
}

export const useLhria = create<State>()(
  persist(
    (set, get) => ({
      users: SEED_USERS,
      session: null,
      grades: DEFAULT_GRADES,
      records: [],
      draft: emptyDraft(),
      editingId: null,
      login: (username, password) => {
        const user = get().users.find((item) => item.username === username.trim());
        if (!user) return "Invalid username. Access denied.";
        if (user.password !== password) return "Incorrect password. Access denied.";
        const name = user.fullName || user.username;
        const draft = get().draft;
        set({
          session: { username: user.username, role: user.role, fullName: name },
          draft: draft.officer.trim() ? draft : { ...draft, officer: name },
        });
        return null;
      },
      logout: () => set({ session: null, editingId: null }),
      changeOwnPassword: (current, next) => {
        const session = get().session;
        if (!session) return "Please log in first.";
        if (!next.trim()) return "Password cannot be blank.";
        const user = get().users.find((item) => item.username === session.username);
        if (!user || user.password !== current) return "Incorrect password.";
        set({
          users: get().users.map((item) =>
            item.username === session.username ? { ...item, password: next } : item,
          ),
        });
        return null;
      },
      resetUserPassword: (username, next) => {
        const session = get().session;
        if (!session || session.role === "Authorized User") {
          return "Only Admin Level 1 or 2 can reset another account.";
        }
        if (!next.trim()) return "Password cannot be blank.";
        const target = get().users.find((item) => item.username === username.trim());
        if (!target) return "Username not found.";
        if (session.role === "Admin Level 1" && target.role === "Admin Level 2") {
          return "Admin Level 1 cannot reset a master account.";
        }
        set({
          users: get().users.map((item) =>
            item.username === target.username ? { ...item, password: next } : item,
          ),
        });
        return null;
      },
      addUser: (user) => {
        const session = get().session;
        if (!session || session.role === "Authorized User") {
          return "Only Admin Level 1 or 2 can provision accounts.";
        }
        const username = user.username.trim();
        if (!username) return "Username is required.";
        if (!user.password.trim()) return "Password cannot be blank.";
        if (get().users.some((item) => item.username === username)) {
          return "Username already exists.";
        }
        const role: Role = user.role;
        if (role === "Admin Level 2" && session.role !== "Admin Level 2") {
          return "Only Admin Level 2 can assign master developer access.";
        }
        set({
          users: [
            ...get().users,
            { username, password: user.password, role, fullName: user.fullName.trim() || username },
          ],
        });
        return null;
      },
      setDraft: (patch) => set({ draft: { ...get().draft, ...patch } }),
      replaceDraft: (draft, editingId = null) => set({ draft, editingId }),
      clearDraft: () => {
        const session = get().session;
        const draft = emptyDraft();
        if (session) draft.officer = session.fullName || session.username;
        set({ draft, editingId: null });
      },
      saveRecord: () => {
        const { session, draft, grades, records, editingId } = get();
        if (!session) return { error: "Please log in first." };
        const entry = stampOfficer(draft, session);
        if (!entry.ownerName) return { error: "Transferee name is required." };
        if (!entry.propertyId) return { error: "Property ID is required." };
        if (!entry.propertyType) return { error: "Property type is required." };
        if (!entry.reason) return { error: "Transfer reason is required." };
        if (!entry.landGrade) return { error: "Land grade is required." };
        const breakdown = calculate(entry, grades);
        if (breakdown.totalFee == null) {
          return {
            error: breakdown.messages[0] ?? "The fee could not be calculated. Complete the valuation fields.",
          };
        }
        const now = new Date().toISOString();
        const duplicate = records.some(
          (record) => record.propertyId.toLowerCase() === entry.propertyId.toLowerCase() && record.id !== editingId,
        );
        if (editingId) {
          const existing = records.find((record) => record.id === editingId);
          if (!existing) return { error: "That record is no longer in the registry." };
          const updated: Transaction = {
            ...entry,
            id: existing.id,
            fee: breakdown.totalFee,
            securityFund: breakdown.securityFund ?? 0,
            createdBy: existing.createdBy,
            createdAt: existing.createdAt,
            updatedAt: now,
          };
          set({
            records: records.map((record) => (record.id === editingId ? updated : record)),
            draft: emptyDraft(),
            editingId: null,
          });
          return { error: null, id: updated.id, resale: duplicate };
        }
        const created: Transaction = {
          ...entry,
          id: nextId(records),
          fee: breakdown.totalFee,
          securityFund: breakdown.securityFund ?? 0,
          createdBy: session.username,
          createdAt: now,
          updatedAt: now,
        };
        set({ records: [created, ...records], draft: emptyDraft(), editingId: null });
        return { error: null, id: created.id, resale: duplicate };
      },
      deleteRecord: (id) => {
        const session = get().session;
        if (!session || session.role === "Authorized User") return;
        set({
          records: get().records.filter((record) => record.id !== id),
          editingId: get().editingId === id ? null : get().editingId,
        });
      },
      setGrades: (grades) => set({ grades }),
      resetGrades: () => set({ grades: DEFAULT_GRADES }),
      seedSamples: () => {
        const session = get().session;
        if (!session) return;
        const now = new Date();
        const base = workedExample(now);
        const drafts: EntryDraft[] = [
          { ...base, officer: session.fullName || session.username },
          {
            ...emptyDraft(now),
            ownerName: "ሳራ መኮንን",
            woreda: "[12]",
            phone: "0922001100",
            fcn: "9988776655443322",
            propertyId: "AA00004410",
            propertyType: "አፓርትመንት",
            reason: "በሽያጭ",
            previousPrice: 4_200_000,
            currentPrice: 6_500_000,
            landArea: null,
            tenure: "ሊዝ",
            landGrade: "1/2",
            usePlan: "መኖሪያ",
            usePhysical: "መኖሪያ",
            apartment: 96,
            sharePercent: 100,
            paymentStatus: "የተከፈለ",
            officer: session.fullName || session.username,
            orderDate: base.orderDate,
          },
          {
            ...emptyDraft(now),
            ownerName: "ዮሐንስ ተስፋዬ",
            woreda: "[05]",
            phone: "0933445566",
            fcn: "1122334455667788",
            propertyId: "AA00001880",
            propertyType: "ኮንዶሚንየም",
            reason: "በዉርስ",
            previousPrice: null,
            currentPrice: null,
            tenure: "ነባርና ሊዝ",
            landGrade: "3/1",
            usePlan: "መኖሪያ",
            usePhysical: "መኖሪያ",
            condo: 74,
            sharePercent: 50,
            paymentStatus: "ያልተከፈለ",
            officer: session.fullName || session.username,
            orderDate: base.orderDate,
          },
        ];
        const grades = get().grades;
        const existing = get().records;
        const created: Transaction[] = [];
        drafts.forEach((draft) => {
          if (existing.some((record) => record.propertyId.toLowerCase() === draft.propertyId.toLowerCase())) return;
          const breakdown = calculate(draft, grades);
          if (breakdown.totalFee == null) return;
          const stamp = new Date().toISOString();
          created.push({
            ...draft,
            id: nextId([...existing, ...created]),
            fee: breakdown.totalFee,
            securityFund: breakdown.securityFund ?? 0,
            createdBy: session.username,
            createdAt: stamp,
            updatedAt: stamp,
          });
        });
        set({ records: [...created, ...existing] });
      },
      setPayment: (id, paymentStatus) => {
        const now = new Date().toISOString();
        set({
          records: get().records.map((record) =>
            record.id === id ? { ...record, paymentStatus, updatedAt: now } : record,
          ),
        });
      },
      importBackup: (payload) => {
        const session = get().session;
        if (!canManageUsers(session?.role)) return { error: "Only an administrator can restore a backup.", added: 0 };
        const incoming = Array.isArray(payload.records) ? payload.records : [];
        const have = new Set(get().records.map((record) => record.id));
        const fresh = incoming.filter(
          (record) =>
            record &&
            typeof record.id === "string" &&
            typeof record.propertyId === "string" &&
            typeof record.ownerName === "string" &&
            typeof record.fee === "number" &&
            !have.has(record.id),
        );
        if (session?.role === "Admin Level 2" && Array.isArray(payload.grades) && payload.grades.length > 0) {
          set({ grades: payload.grades, records: [...fresh, ...get().records] });
        } else {
          set({ records: [...fresh, ...get().records] });
        }
        return { error: null, added: fresh.length };
      },
    }),
    {
      name: "lhria-tfc-v1",
      skipHydration: true,
      partialize: (state) => ({
        users: state.users,
        session: state.session,
        grades: state.grades,
        records: state.records,
      }),
    },
  ),
);

export function canManageUsers(role: Role | undefined): boolean {
  return role === "Admin Level 1" || role === "Admin Level 2";
}

export function canEditRates(role: Role | undefined): boolean {
  return role === "Admin Level 2";
}

export function canViewRates(role: Role | undefined): boolean {
  return role === "Admin Level 1" || role === "Admin Level 2";
}

export function canDelete(role: Role | undefined): boolean {
  return role === "Admin Level 1" || role === "Admin Level 2";
}

export { SEED_USERS };
