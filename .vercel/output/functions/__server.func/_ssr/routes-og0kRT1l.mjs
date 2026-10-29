import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LogOut, c as ChartColumn, i as PenLine, l as BookOpen, n as Table2, o as Library, r as ScrollText, s as KeyRound } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-og0kRT1l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatBirr(value) {
	if (value == null || Number.isNaN(value)) return "—";
	const rounded = Math.round(value * 100) / 100;
	const fraction = Math.abs(rounded - Math.round(rounded)) > .001;
	return rounded.toLocaleString("en-US", {
		minimumFractionDigits: fraction ? 2 : 0,
		maximumFractionDigits: 2
	});
}
function formatFcn(raw) {
	const digits = raw.replace(/\D/g, "").slice(0, 16);
	return [
		digits.slice(0, 4),
		digits.slice(4, 8),
		digits.slice(8, 12),
		digits.slice(12, 16)
	].filter(Boolean).join("-");
}
function round2(value) {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}
var ROLES = [
	"Authorized User",
	"Admin Level 1",
	"Admin Level 2"
];
var PROPERTY_TYPES = [
	"ከአፓርትመንት እና ኮንዶሚንየም ዉጪ",
	"አፓርትመንት",
	"ኮንዶሚንየም"
];
var TYPE_OTHER = PROPERTY_TYPES[0];
var TYPE_APT = PROPERTY_TYPES[1];
var TYPE_CONDO = PROPERTY_TYPES[2];
var REASONS = [
	"በሽያጭ",
	"በስጦታ",
	"በዉርስ",
	"በፍ/ቤት ዉሳኔ",
	"በዕጣ",
	"ድርሻ መልቀቅ",
	"ለአክሲዮን ድርሻ መዋጮ"
];
var REASON_INHERIT = "በዉርስ";
var PLAN_USES = [
	"መኖሪያ",
	"ቅይጥ",
	"ድርጅት",
	"ማምረቻና ማከማቻ",
	"አገልግሎት",
	"አስተዳደራዊ",
	"የከተማ ግብርና",
	"አካባቢ ጥበቃ",
	"ደን",
	"መንገድና ትራንሰፖርት",
	"ልዩ አገልግሎት"
];
var PHYSICAL_USES = [
	"መኖሪያ",
	"ቅይጥ",
	"ድርጅት",
	"ማምረቻና ማከማቻ",
	"የከተማ ግብርና"
];
var TENURES = [
	"ነባር",
	"ሊዝ",
	"ነባርና ሊዝ"
];
var PAYMENT_STATUSES = [
	"የሚከፈል",
	"የተከፈለ",
	"ያልተከፈለ"
];
var SUBCITY = "ንፋስ ስልክ ላፍቶ";
var OFFICE_AM = "በአዲስ አበባ ከተማ አስተዳደር የመሬት ይዞታ ምዝገባ እና መረጃ ኤጄንሲ";
var WOREDAS = Array.from({ length: 16 }, (_, i) => `[${String(i + 1).padStart(2, "0")}]`);
var BASIS_PREV = "የንብረቱ የቀድሞ የሽያጭ ዋጋ";
var BASIS_NOW = "አሁን የቀረበ የሽያጭ ዋጋ";
var BASIS_SUM = "ጠቅላላ ዋጋ ድምር";
var BASIS_APT = "ጠቅላላ የግንባታ ዋጋ (አፓርትመንት)";
var BASIS_CONDO = "ጠቅላላ የግንባታ ዋጋ (ኮንዶሚንየም)";
function num(value) {
	if (value == null || Number.isNaN(value)) return 0;
	return value;
}
function positive(value) {
	if (value == null || Number.isNaN(value) || value === 0) return null;
	return value;
}
function engineerFee(area) {
	if (area <= 100) return 1e3;
	if (area <= 500) return 1500;
	if (area <= 1e3) return 4e3;
	if (area <= 1e4) return 5e3;
	if (area <= 5e4) return 9e3;
	if (area <= 1e5) return 15e3;
	return 25e3;
}
function shareFraction(percent) {
	if (percent == null || Number.isNaN(percent)) return null;
	if (percent < 0) return null;
	if (percent > 1) return percent / 100;
	return percent;
}
/**
* Mirrors TransactionFee formulas.
* Land value D31, building H33, total H35, apartment Q31, condo Q35,
* service lines D38–D44, stamp D46 (2%), ashura D48 (4%), total D50,
* security fund = 2% of D50.
*/
function calculate(entry, grades) {
	const messages = [];
	const grade = grades.find((row) => row.grade === entry.landGrade) ?? null;
	if (!grade && entry.landGrade) messages.push("Invalid land grade.");
	if (!entry.landGrade) messages.push("Choose a land grade.");
	const inherit = entry.reason === REASON_INHERIT;
	const other = entry.propertyType === TYPE_OTHER;
	const apt = entry.propertyType === TYPE_APT;
	const condo = entry.propertyType === TYPE_CONDO;
	const mud = positive(entry.mudG0);
	const hcb0 = positive(entry.hcbG0);
	const hcb1 = positive(entry.hcbG1);
	const hcb6 = positive(entry.hcbG6);
	const otherBuildingArea = num(entry.mudG0) + num(entry.hcbG0) + num(entry.hcbG1) + num(entry.hcbG6);
	let landValue = null;
	if (grade && other && positive(entry.landArea) != null) landValue = round2(num(entry.landArea) * grade.location);
	let buildingValue = null;
	if (grade && (inherit || other)) {
		const g0Rate = inherit ? grade.inheritG0 : null;
		const g1Rate = inherit ? grade.inheritG1 : null;
		const mudRate = inherit ? g0Rate : grade.mud;
		const h0Rate = inherit ? g0Rate : grade.hcbG0;
		const h1Rate = inherit ? g1Rate : grade.hcbG1;
		const h6Rate = inherit ? g1Rate : grade.hcbG6;
		buildingValue = round2((mud != null ? mud * mudRate : 0) + (hcb0 != null ? hcb0 * h0Rate : 0) + (hcb1 != null ? hcb1 * h1Rate : 0) + (hcb6 != null ? hcb6 * h6Rate : 0));
	}
	let assessedTotal = null;
	if (other && buildingValue != null && buildingValue !== 0) assessedTotal = round2(num(landValue) + buildingValue);
	let apartmentValue = null;
	if (grade && positive(entry.apartment) != null && (inherit || apt)) {
		const rate = inherit ? grade.inheritApt : grade.apartment;
		apartmentValue = round2(num(entry.apartment) * rate);
	}
	let condoValue = null;
	if (grade && positive(entry.condo) != null && (inherit || condo)) {
		const rate = inherit ? grade.inheritCondo : grade.condo;
		condoValue = round2(num(entry.condo) * rate);
	}
	const valuation = apt ? apartmentValue : condo ? condoValue : assessedTotal;
	const prev = num(entry.previousPrice);
	const now = num(entry.currentPrice);
	const assessed = num(valuation);
	let basis = null;
	let basisLabel = "";
	if (valuation != null && valuation !== 0) {
		const max = Math.max(prev, now, assessed);
		basis = round2(max);
		if (prev === max) basisLabel = BASIS_PREV;
		else if (now === max) basisLabel = BASIS_NOW;
		else if (apt) basisLabel = BASIS_APT;
		else if (condo) basisLabel = BASIS_CONDO;
		else basisLabel = BASIS_SUM;
	} else if (entry.propertyType) messages.push(other ? "Ordinary holdings need a building area so the assessed total can be formed." : "Enter the floor area for this property type.");
	const fraction = shareFraction(entry.sharePercent);
	if (entry.sharePercent == null) messages.push("Enter the ownership share percent.");
	else if (fraction == null) messages.push("Ownership share cannot be negative.");
	const maxComponent = Math.max(num(assessedTotal), num(apartmentValue), num(condoValue));
	let documentFee = null;
	let stampDuty = null;
	let ashura = null;
	if (valuation != null && valuation !== 0 && fraction != null && basis != null) {
		documentFee = entry.usePlan === "መኖሪያ" && entry.usePhysical === "መኖሪያ" ? 800 : 1e3;
		stampDuty = round2(basis * .02 * fraction);
		ashura = round2(basis * .04 * fraction);
	}
	let engineer = null;
	const engineerArea = apt ? entry.apartment : condo ? entry.condo : entry.landArea;
	if (entry.propertyType && positive(engineerArea) != null) engineer = engineerFee(num(engineerArea));
	const registrationFee = maxComponent === 0 ? null : 1e3;
	const certificateFee = maxComponent === 0 ? null : 1100;
	const parts = [
		documentFee,
		engineer,
		registrationFee,
		certificateFee,
		stampDuty,
		ashura
	];
	const totalFee = parts.some((part) => part != null && part !== 0) && stampDuty != null && ashura != null ? round2(parts.reduce((sum, part) => sum + num(part), 0)) : null;
	const securityFund = totalFee == null ? null : round2(totalFee * .02);
	return {
		grade,
		landValue,
		buildingValue: buildingValue === 0 ? inherit || other ? 0 : null : buildingValue,
		assessedTotal,
		apartmentValue,
		condoValue,
		basis,
		basisLabel,
		documentFee,
		engineerFee: engineer,
		registrationFee,
		certificateFee,
		stampDuty,
		ashura,
		shareFraction: fraction,
		totalFee,
		securityFund,
		otherBuildingArea,
		messages
	};
}
function feesMatch(stored, live) {
	if (live == null) return false;
	return Math.abs(stored - live) < .5;
}
/** Gregorian ↔ Ethiopian (ዓ.ም.) conversion. Epoch verified against 11 Sep 2026 = 1 Meskerem 2019. */
var ETHIOPIAN_EPOCH = 1723856;
var EC_MONTHS = [
	{
		n: 1,
		en: "Meskerem",
		am: "መስከረም"
	},
	{
		n: 2,
		en: "Tikimt",
		am: "ጥቅምት"
	},
	{
		n: 3,
		en: "Hidar",
		am: "ኅዳር"
	},
	{
		n: 4,
		en: "Tahsas",
		am: "ታኅሣሥ"
	},
	{
		n: 5,
		en: "Tir",
		am: "ጥር"
	},
	{
		n: 6,
		en: "Yekatit",
		am: "የካቲት"
	},
	{
		n: 7,
		en: "Megabit",
		am: "መጋቢት"
	},
	{
		n: 8,
		en: "Miazia",
		am: "ሚያዝያ"
	},
	{
		n: 9,
		en: "Ginbot",
		am: "ግንቦት"
	},
	{
		n: 10,
		en: "Sene",
		am: "ሰኔ"
	},
	{
		n: 11,
		en: "Hamle",
		am: "ሐምሌ"
	},
	{
		n: 12,
		en: "Nehase",
		am: "ነሐሴ"
	},
	{
		n: 13,
		en: "Pagume",
		am: "ጳጉሜ"
	}
];
function gregorianToJdn(year, month, day) {
	const a = Math.floor((14 - month) / 12);
	const y = year + 4800 - a;
	const m = month + 12 * a - 3;
	return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}
function jdnToEthiopian(jdn) {
	const r = (jdn - ETHIOPIAN_EPOCH) % 1461;
	const n = r % 365 + 365 * Math.floor(r / 1460);
	return {
		year: 4 * Math.floor((jdn - ETHIOPIAN_EPOCH) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460),
		month: Math.floor(n / 30) + 1,
		day: n % 30 + 1
	};
}
function gregorianToEthiopian(year, month, day) {
	return jdnToEthiopian(gregorianToJdn(year, month, day));
}
function todayGC(now = /* @__PURE__ */ new Date()) {
	return `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}
function parseGC(value) {
	const match = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(value.trim());
	if (!match) return null;
	const day = Number(match[1]);
	const month = Number(match[2]);
	const year = Number(match[3]);
	if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) return null;
	return {
		year,
		month,
		day
	};
}
function gcToEc(value) {
	const g = parseGC(value);
	if (!g) return null;
	return gregorianToEthiopian(g.year, g.month, g.day);
}
function formatEc(value) {
	const ec = gcToEc(value);
	if (!ec) return "";
	const month = EC_MONTHS.find((m) => m.n === ec.month);
	const name = month ? `${month.am} / ${month.en}` : String(ec.month);
	return `${String(ec.day).padStart(2, "0")} ${name} ${ec.year} ዓ.ም.`;
}
function currentEcYear(now = /* @__PURE__ */ new Date()) {
	return gregorianToEthiopian(now.getFullYear(), now.getMonth() + 1, now.getDate()).year;
}
/** Accepts "01", "1", "Meskerem", "መስከረም". */
function matchEcMonth(input) {
	const raw = input.trim().toLowerCase();
	if (!raw || raw === "all" || raw === "ሁሉ") return null;
	const asNum = Number(raw.replace(/^0+/, ""));
	if (Number.isInteger(asNum) && asNum >= 1 && asNum <= 13 && /^\d+$/.test(raw)) return asNum;
	const hit = EC_MONTHS.find((m) => m.en.toLowerCase() === raw || m.am === input.trim() || m.en.toLowerCase().startsWith(raw));
	return hit ? hit.n : null;
}
function emptyDraft(now = /* @__PURE__ */ new Date()) {
	return {
		ownerName: "",
		woreda: "",
		phone: "",
		fcn: "",
		propertyId: "",
		propertyType: "",
		reason: "",
		previousPrice: null,
		currentPrice: null,
		landArea: null,
		tenure: "",
		landGrade: "",
		usePlan: "",
		usePhysical: "",
		mudG0: null,
		hcbG0: null,
		hcbG1: null,
		hcbG6: null,
		apartment: null,
		condo: null,
		officer: "",
		orderDate: todayGC(now),
		sharePercent: 100,
		paymentStatus: "የሚከፈል"
	};
}
function workedExample(now = /* @__PURE__ */ new Date()) {
	return {
		...emptyDraft(now),
		ownerName: "አበበ ከበደ",
		woreda: "[09]",
		phone: "0911123456",
		fcn: "1234567890123456",
		propertyId: "AA00002127",
		propertyType: "ከአፓርትመንት እና ኮንዶሚንየም ዉጪ",
		reason: "በሽያጭ",
		previousPrice: 5e6,
		currentPrice: 8e6,
		landArea: 250,
		tenure: "ነባር",
		landGrade: "2/4",
		usePlan: "መኖሪያ",
		usePhysical: "መኖሪያ",
		hcbG0: 120,
		sharePercent: 100,
		paymentStatus: "የሚከፈል"
	};
}
/** LandGrade sheet, rows 4–21. Construction benchmarks are per square metre. */
var LOC = [
	39073,
	36826,
	34578,
	31119,
	29096,
	27074,
	25051,
	23028,
	21005,
	18983,
	16960,
	14937,
	12914,
	10892,
	8869,
	6846,
	4823,
	2801
];
var APT = [
	81798,
	79158,
	77178,
	75198,
	64215,
	63555,
	62235,
	60915,
	59595,
	56760,
	56100,
	54120,
	52800,
	51480,
	50820,
	49500,
	48840,
	48180
];
var CONDO = [
	47769,
	46079,
	44099,
	42779,
	41672,
	41012,
	39362,
	38042,
	36722,
	35317,
	34657,
	33337,
	32017,
	30697,
	30037,
	28717,
	26400,
	25080
];
var DEFAULT_GRADES = [
	"1/1",
	"1/2",
	"1/3",
	"1/4",
	"1/5",
	"2/1",
	"2/2",
	"2/3",
	"2/4",
	"2/5",
	"3/1",
	"3/2",
	"3/3",
	"3/4",
	"3/5",
	"4/1",
	"4/2",
	"4/3"
].map((grade, i) => ({
	grade,
	location: LOC[i] ?? 0,
	mud: 15e3,
	hcbG0: 2e4,
	hcbG1: 25e3,
	hcbG6: 3e4,
	apartment: APT[i] ?? 0,
	condo: CONDO[i] ?? 0,
	inheritG0: 1e4,
	inheritG1: 12e3,
	inheritApt: 12e3,
	inheritCondo: 12e3
}));
var SEED_USERS = [
	{
		username: "hamlet",
		password: "h@mlet212719",
		role: "Admin Level 2",
		fullName: "Hamlet"
	},
	{
		username: "testadmin1",
		password: "admin1@LHRIA2026",
		role: "Admin Level 1",
		fullName: "Test Admin 1"
	},
	{
		username: "testadmin2",
		password: "admin2@LHRIA2026",
		role: "Admin Level 1",
		fullName: "Test Admin 2"
	},
	{
		username: "testuser1",
		password: "user1@lhria2026",
		role: "Authorized User",
		fullName: "Test User 1"
	},
	{
		username: "testuser2",
		password: "user2@lhria2026",
		role: "Authorized User",
		fullName: "Test User 2"
	},
	{
		username: "testuser3",
		password: "user3@lhria2026",
		role: "Authorized User",
		fullName: "Test User 3"
	},
	{
		username: "testuser4",
		password: "user4@lhria2026",
		role: "Authorized User",
		fullName: "Test User 4"
	},
	{
		username: "testuser5",
		password: "user5@lhria2026",
		role: "Authorized User",
		fullName: "Test User 5"
	},
	{
		username: "testuser6",
		password: "hayat1234",
		role: "Authorized User",
		fullName: "Test User 6"
	}
];
function nextId(records, now = /* @__PURE__ */ new Date()) {
	const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
	const max = records.reduce((top, record) => {
		const match = /-(\d+)$/.exec(record.id);
		return match ? Math.max(top, Number(match[1])) : top;
	}, 0);
	return `${stamp}-${String(max + 1).padStart(4, "0")}`;
}
function stampOfficer(draft, session) {
	return {
		...draft,
		officer: draft.officer.trim() || session.fullName || session.username,
		propertyId: draft.propertyId.trim(),
		ownerName: draft.ownerName.trim()
	};
}
var useLhria = create()(persist((set, get) => ({
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
			session: {
				username: user.username,
				role: user.role,
				fullName: name
			},
			draft: draft.officer.trim() ? draft : {
				...draft,
				officer: name
			}
		});
		return null;
	},
	logout: () => set({
		session: null,
		editingId: null
	}),
	changeOwnPassword: (current, next) => {
		const session = get().session;
		if (!session) return "Please log in first.";
		if (!next.trim()) return "Password cannot be blank.";
		const user = get().users.find((item) => item.username === session.username);
		if (!user || user.password !== current) return "Incorrect password.";
		set({ users: get().users.map((item) => item.username === session.username ? {
			...item,
			password: next
		} : item) });
		return null;
	},
	resetUserPassword: (username, next) => {
		const session = get().session;
		if (!session || session.role === "Authorized User") return "Only Admin Level 1 or 2 can reset another account.";
		if (!next.trim()) return "Password cannot be blank.";
		const target = get().users.find((item) => item.username === username.trim());
		if (!target) return "Username not found.";
		if (session.role === "Admin Level 1" && target.role === "Admin Level 2") return "Admin Level 1 cannot reset a master account.";
		set({ users: get().users.map((item) => item.username === target.username ? {
			...item,
			password: next
		} : item) });
		return null;
	},
	addUser: (user) => {
		const session = get().session;
		if (!session || session.role === "Authorized User") return "Only Admin Level 1 or 2 can provision accounts.";
		const username = user.username.trim();
		if (!username) return "Username is required.";
		if (!user.password.trim()) return "Password cannot be blank.";
		if (get().users.some((item) => item.username === username)) return "Username already exists.";
		const role = user.role;
		if (role === "Admin Level 2" && session.role !== "Admin Level 2") return "Only Admin Level 2 can assign master developer access.";
		set({ users: [...get().users, {
			username,
			password: user.password,
			role,
			fullName: user.fullName.trim() || username
		}] });
		return null;
	},
	setDraft: (patch) => set({ draft: {
		...get().draft,
		...patch
	} }),
	replaceDraft: (draft, editingId = null) => set({
		draft,
		editingId
	}),
	clearDraft: () => {
		const session = get().session;
		const draft = emptyDraft();
		if (session) draft.officer = session.fullName || session.username;
		set({
			draft,
			editingId: null
		});
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
		if (breakdown.totalFee == null) return { error: breakdown.messages[0] ?? "The fee could not be calculated. Complete the valuation fields." };
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const duplicate = records.some((record) => record.propertyId.toLowerCase() === entry.propertyId.toLowerCase() && record.id !== editingId);
		if (editingId) {
			const existing = records.find((record) => record.id === editingId);
			if (!existing) return { error: "That record is no longer in the registry." };
			const updated = {
				...entry,
				id: existing.id,
				fee: breakdown.totalFee,
				securityFund: breakdown.securityFund ?? 0,
				createdBy: existing.createdBy,
				createdAt: existing.createdAt,
				updatedAt: now
			};
			set({
				records: records.map((record) => record.id === editingId ? updated : record),
				draft: emptyDraft(),
				editingId: null
			});
			return {
				error: null,
				id: updated.id,
				resale: duplicate
			};
		}
		const created = {
			...entry,
			id: nextId(records),
			fee: breakdown.totalFee,
			securityFund: breakdown.securityFund ?? 0,
			createdBy: session.username,
			createdAt: now,
			updatedAt: now
		};
		set({
			records: [created, ...records],
			draft: emptyDraft(),
			editingId: null
		});
		return {
			error: null,
			id: created.id,
			resale: duplicate
		};
	},
	deleteRecord: (id) => {
		const session = get().session;
		if (!session || session.role === "Authorized User") return;
		set({
			records: get().records.filter((record) => record.id !== id),
			editingId: get().editingId === id ? null : get().editingId
		});
	},
	setGrades: (grades) => set({ grades }),
	resetGrades: () => set({ grades: DEFAULT_GRADES }),
	seedSamples: () => {
		const session = get().session;
		if (!session) return;
		const now = /* @__PURE__ */ new Date();
		const base = workedExample(now);
		const drafts = [
			{
				...base,
				officer: session.fullName || session.username
			},
			{
				...emptyDraft(now),
				ownerName: "ሳራ መኮንን",
				woreda: "[12]",
				phone: "0922001100",
				fcn: "9988776655443322",
				propertyId: "AA00004410",
				propertyType: "አፓርትመንት",
				reason: "በሽያጭ",
				previousPrice: 42e5,
				currentPrice: 65e5,
				landArea: null,
				tenure: "ሊዝ",
				landGrade: "1/2",
				usePlan: "መኖሪያ",
				usePhysical: "መኖሪያ",
				apartment: 96,
				sharePercent: 100,
				paymentStatus: "የተከፈለ",
				officer: session.fullName || session.username,
				orderDate: base.orderDate
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
				orderDate: base.orderDate
			}
		];
		const grades = get().grades;
		const existing = get().records;
		const created = [];
		drafts.forEach((draft) => {
			if (existing.some((record) => record.propertyId.toLowerCase() === draft.propertyId.toLowerCase())) return;
			const breakdown = calculate(draft, grades);
			if (breakdown.totalFee == null) return;
			const stamp = (/* @__PURE__ */ new Date()).toISOString();
			created.push({
				...draft,
				id: nextId([...existing, ...created]),
				fee: breakdown.totalFee,
				securityFund: breakdown.securityFund ?? 0,
				createdBy: session.username,
				createdAt: stamp,
				updatedAt: stamp
			});
		});
		set({ records: [...created, ...existing] });
	},
	setPayment: (id, paymentStatus) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ records: get().records.map((record) => record.id === id ? {
			...record,
			paymentStatus,
			updatedAt: now
		} : record) });
	},
	importBackup: (payload) => {
		const session = get().session;
		if (!canManageUsers(session?.role)) return {
			error: "Only an administrator can restore a backup.",
			added: 0
		};
		const incoming = Array.isArray(payload.records) ? payload.records : [];
		const have = new Set(get().records.map((record) => record.id));
		const fresh = incoming.filter((record) => record && typeof record.id === "string" && typeof record.propertyId === "string" && typeof record.ownerName === "string" && typeof record.fee === "number" && !have.has(record.id));
		if (session?.role === "Admin Level 2" && Array.isArray(payload.grades) && payload.grades.length > 0) set({
			grades: payload.grades,
			records: [...fresh, ...get().records]
		});
		else set({ records: [...fresh, ...get().records] });
		return {
			error: null,
			added: fresh.length
		};
	}
}), {
	name: "lhria-tfc-v1",
	skipHydration: true,
	partialize: (state) => ({
		users: state.users,
		session: state.session,
		grades: state.grades,
		records: state.records
	})
}));
function canManageUsers(role) {
	return role === "Admin Level 1" || role === "Admin Level 2";
}
function canEditRates(role) {
	return role === "Admin Level 2";
}
function canViewRates(role) {
	return role === "Admin Level 1" || role === "Admin Level 2";
}
function canDelete(role) {
	return role === "Admin Level 1" || role === "Admin Level 2";
}
var controlClass = "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base text-ink outline-none transition-colors focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted";
function Field({ label, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: clsx("flex flex-col gap-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium leading-snug",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs leading-relaxed text-muted",
				children: hint
			}) : null
		]
	});
}
function TextField({ label, value, onChange, hint, className, placeholder, inputMode, autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		hint,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: controlClass,
			value,
			placeholder,
			inputMode,
			autoComplete,
			onChange: (event) => onChange(event.target.value)
		})
	});
}
function NumField({ label, value, onChange, hint, className, disabled, suffix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		hint,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: clsx(controlClass, suffix && "pr-14"),
				inputMode: "decimal",
				disabled,
				value: value ?? "",
				onChange: (event) => {
					const raw = event.target.value.replace(/,/g, "").trim();
					if (!raw) {
						onChange(null);
						return;
					}
					const next = Number(raw);
					if (Number.isFinite(next)) onChange(next);
				}
			}), suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted",
				children: suffix
			}) : null]
		})
	});
}
function SelectField({ label, value, onChange, options, placeholder = "ይምረጡ", hint, className, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		hint,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: controlClass,
			value,
			disabled,
			onChange: (event) => onChange(event.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: placeholder
			}), options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option,
				children: option
			}, option))]
		})
	});
}
function Btn({ children, onClick, type = "button", tone = "line", disabled, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		disabled,
		className: clsx("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50", tone === "primary" && "bg-primary text-primary-fg hover:bg-primary/90", tone === "line" && "border border-line bg-surface text-ink hover:bg-paper", tone === "ghost" && "text-ink hover:bg-ink/5", tone === "accent" && "bg-accent text-accent-fg hover:bg-accent/90", className),
		children
	});
}
function Panel({ title, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: clsx("rounded-xl border border-line bg-surface p-4 sm:p-5", className),
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-lg leading-snug",
				children: title
			}), action]
		}) : null, children]
	});
}
function Note({ tone = "plain", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: clsx("rounded-lg px-3 py-2 text-sm leading-relaxed", tone === "plain" && "bg-paper text-ink", tone === "good" && "bg-primary/10 text-primary", tone === "bad" && "bg-accent/10 text-accent"),
		children
	});
}
var DEFAULTS = {
	"Authorized User": "user@lhria2026",
	"Admin Level 1": "admin1@LHRIA2026",
	"Admin Level 2": "h@mlet212719"
};
function Accounts() {
	const session = useLhria((s) => s.session);
	const users = useLhria((s) => s.users);
	const changeOwnPassword = useLhria((s) => s.changeOwnPassword);
	const resetUserPassword = useLhria((s) => s.resetUserPassword);
	const addUser = useLhria((s) => s.addUser);
	const admin = canManageUsers(session?.role);
	const [current, setCurrent] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("");
	const [reset, setReset] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("Authorized User");
	const [note, setNote] = (0, import_react.useState)(null);
	const roleOptions = ROLES.filter((item) => session?.role === "Admin Level 2" || item !== "Admin Level 2");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
					tone: note.tone,
					children: note.text
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-lg",
					children: "የራሴን የይለፍ ቃል ቀይር"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "የአሁኑ የይለፍ ቃል",
							value: current,
							onChange: setCurrent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "አዲስ የይለፍ ቃል",
							value: next,
							onChange: setNext
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "primary",
							onClick: () => {
								const error = changeOwnPassword(current, next);
								setNote(error ? {
									tone: "bad",
									text: error
								} : {
									tone: "good",
									text: "የይለፍ ቃልዎ ተቀይሯል።"
								});
								if (!error) {
									setCurrent("");
									setNext("");
								}
							},
							children: "ቀይር"
						})
					]
				})]
			}),
			admin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-lg",
					children: "የሌላ ተጠቃሚ የይለፍ ቃል ቀይር"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "ተጠቃሚ",
							value: target,
							options: users.map((user) => user.username),
							onChange: setTarget
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "አዲስ የይለፍ ቃል",
							value: reset,
							onChange: setReset
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => {
								const error = resetUserPassword(target, reset);
								setNote(error ? {
									tone: "bad",
									text: error
								} : {
									tone: "good",
									text: `${target} ተቀይሯል።`
								});
							},
							children: "አድስ"
						})
					]
				})]
			}) : null,
			admin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-4 sm:p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-lg",
						children: "አዲስ ተጠቃሚ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Username",
								value: username,
								onChange: setUsername
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "ሙሉ ስም",
								value: fullName,
								onChange: setFullName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "ስልጣን",
								value: role,
								options: roleOptions,
								onChange: (value) => {
									if (value === "Authorized User" || value === "Admin Level 1" || value === "Admin Level 2") setRole(value);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "self-end text-sm text-muted",
								children: ["ጊዜያዊ የይለፍ ቃል፡ ", DEFAULTS[role]]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-4",
						tone: "primary",
						onClick: () => {
							const error = addUser({
								username,
								fullName,
								role,
								password: DEFAULTS[role]
							});
							setNote(error ? {
								tone: "bad",
								text: error
							} : {
								tone: "good",
								text: `${username} ተፈጥሯል። ጊዜያዊ የይለፍ ቃል፡ ${DEFAULTS[role]}`
							});
							if (!error) {
								setUsername("");
								setFullName("");
							}
						},
						children: "መዝግብ"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-4 sm:p-5 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-lg",
					children: "የተመዘገቡ ሰዎች"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: user.fullName || user.username
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								user.username,
								" · ",
								user.role
							]
						})]
					}, user.username))
				})]
			})
		]
	});
}
var SHORT = {
	[TYPE_OTHER]: "ሌላ",
	[TYPE_APT]: "አፓርትመንት",
	[TYPE_CONDO]: "ኮንዶሚኒየም"
};
function axis(value) {
	if (value >= 1e6) return `${(value / 1e6).toFixed(1)}m`;
	if (value >= 1e3) return `${Math.round(value / 1e3)}k`;
	return String(value);
}
function Dashboard() {
	const records = useLhria((s) => s.records);
	const seedSamples = useLhria((s) => s.seedSamples);
	const [month, setMonth] = (0, import_react.useState)("all");
	const [year, setYear] = (0, import_react.useState)(String(currentEcYear()));
	const [pay, setPay] = (0, import_react.useState)("all");
	const years = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set([currentEcYear()]);
		for (const record of records) {
			const ec = gcToEc(record.orderDate);
			if (ec) set.add(ec.year);
		}
		return [...set].sort((a, b) => b - a);
	}, [records]);
	const rows = (0, import_react.useMemo)(() => {
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
	}, [
		records,
		month,
		year,
		pay
	]);
	const byType = PROPERTY_TYPES.map((type) => ({
		name: SHORT[type] ?? type,
		count: rows.filter((record) => record.propertyType === type).length,
		fee: rows.filter((record) => record.propertyType === type).reduce((sum, record) => sum + record.fee, 0)
	}));
	const byPay = PAYMENT_STATUSES.map((status) => ({
		name: status,
		count: rows.filter((record) => record.paymentStatus === status).length,
		fee: rows.filter((record) => record.paymentStatus === status).reduce((sum, record) => sum + record.fee, 0)
	}));
	const totalFee = rows.reduce((sum, record) => sum + record.fee, 0);
	const totalFund = rows.reduce((sum, record) => sum + record.securityFund, 0);
	const monthName = EC_MONTHS.find((item) => String(item.n) === month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: "ወርሃዊ ሪፖርት · በኢትዮጵያ ዘመን"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							month === "all" ? "ሁሉም ወራት" : `${monthName?.am ?? month} / ${monthName?.en ?? ""}`,
							" ",
							year === "all" ? "" : year,
							" ዓ.ም. · ",
							rows.length,
							" ግብይት · ",
							formatBirr(totalFee),
							" ብር ክፍያ ·",
							" ",
							formatBirr(totalFund),
							" ብር ዋስትና"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5 text-sm",
								children: ["ወር", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: controlClass,
									value: month,
									onChange: (event) => setMonth(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "ሁሉም"
									}), EC_MONTHS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: String(item.n),
										children: [
											String(item.n).padStart(2, "0"),
											" · ",
											item.am,
											" / ",
											item.en
										]
									}, item.n))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5 text-sm",
								children: ["ዓመት", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: controlClass,
									value: year,
									onChange: (event) => setYear(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "ሁሉም"
									}), years.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: String(item),
										children: item
									}, item))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5 text-sm",
								children: ["የክፍያ ሁኔታ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: controlClass,
									value: pay,
									onChange: (event) => setPay(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "ሁሉም"
									}), PAYMENT_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: status,
										children: status
									}, status))]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: byType.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl tabular-nums",
							children: item.count
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-muted",
							children: [formatBirr(item.fee), " ብር"]
						})
					]
				}, item.name))
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-line bg-surface px-4 py-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "በዚህ ወር ምንም መዝገብ የለም።"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3",
					onClick: () => seedSamples(),
					children: "ሦስት የናሙና ይዞታ ጨምር"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-semibold",
						children: "ክፍያ በንብረት ዓይነት"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: byType,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-line)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickFormatter: axis,
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										width: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => formatBirr(Number(value)) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "fee",
										fill: "var(--color-primary)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-semibold",
						children: "ክፍያ በሁኔታ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: byPay,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-line)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "var(--color-muted)",
											fontSize: 11
										},
										interval: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickFormatter: axis,
										tick: {
											fill: "var(--color-muted)",
											fontSize: 12
										},
										width: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => formatBirr(Number(value)) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "fee",
										fill: "var(--color-accent)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: rows.slice(0, 8).map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: record.ownerName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted",
						children: [
							record.propertyId,
							" · ",
							formatEc(record.orderDate) || record.orderDate,
							" · ",
							record.paymentStatus
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatBirr(record.fee)
					})]
				}, record.id))
			})
		]
	});
}
var BELOW_TWENTY = [
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
	"NINETEEN"
];
var TENS = [
	"",
	"",
	"TWENTY",
	"THIRTY",
	"FORTY",
	"FIFTY",
	"SIXTY",
	"SEVENTY",
	"EIGHTY",
	"NINETY"
];
function chunk(n) {
	if (n < 20) return BELOW_TWENTY[n] ?? "";
	if (n < 100) {
		const ten = Math.floor(n / 10);
		const rest = n % 10;
		return rest ? `${TENS[ten]} ${BELOW_TWENTY[rest]}` : TENS[ten] ?? "";
	}
	const hundred = Math.floor(n / 100);
	const rest = n % 100;
	return rest ? `${BELOW_TWENTY[hundred]} HUNDRED ${chunk(rest)}` : `${BELOW_TWENTY[hundred]} HUNDRED`;
}
function integerWords(n) {
	if (n === 0) return "ZERO";
	const parts = [];
	const billions = Math.floor(n / 1e9);
	const millions = Math.floor(n % 1e9 / 1e6);
	const thousands = Math.floor(n % 1e6 / 1e3);
	const rest = n % 1e3;
	if (billions) parts.push(`${chunk(billions)} BILLION`);
	if (millions) parts.push(`${chunk(millions)} MILLION`);
	if (thousands) parts.push(`${chunk(thousands)} THOUSAND`);
	if (rest) parts.push(chunk(rest));
	return parts.join(" ");
}
/** English amount line used on the printed receipt, matching the workbook style. */
function etbInWords(amount) {
	if (amount == null || Number.isNaN(amount)) return "";
	const rounded = Math.round(amount * 100) / 100;
	const birr = Math.trunc(rounded);
	const santim = Math.round((rounded - birr) * 100);
	const head = integerWords(Math.abs(birr));
	if (santim === 0) return `${head} ETB ONLY`;
	return `${head} ETB AND ${integerWords(santim)} CENTS ONLY`;
}
function Line({ label, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: strong ? "flex items-baseline justify-between gap-3 border-t border-line pt-2" : "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: strong ? "font-semibold" : "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: strong ? "font-serif text-xl tabular-nums" : "tabular-nums",
			children: formatBirr(value)
		})]
	});
}
function FeeSummary({ breakdown }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "ጠቅላላ የቦታ ዋጋ",
				value: breakdown.landValue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የግንባታ ዋጋ (ከአፓርትመንት እና ኮንዶሚንየም ውጪ)",
				value: breakdown.buildingValue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "ጠቅላላ ዋጋ ድምር",
				value: breakdown.assessedTotal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የአፓርትመንት ግንባታ",
				value: breakdown.apartmentValue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የኮንዶሚኒየም ግንባታ",
				value: breakdown.condoValue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "ለክፍያ የዋለው ዋጋ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatBirr(breakdown.basis)
					}), breakdown.basisLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted",
						children: breakdown.basisLabel
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የሰነድ ማጣራት",
				value: breakdown.documentFee
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የመሀንዲስ አገልግሎት",
				value: breakdown.engineerFee
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የባላቤትነት መመዝገቢያ",
				value: breakdown.registrationFee
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የይዞታ ማረጋገጫ ህትመት",
				value: breakdown.certificateFee
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የቴምብር ቀረጥ 2%",
				value: breakdown.stampDuty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የአሹራ ክፍያ 4%",
				value: breakdown.ashura
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "ጠቅላላ የስም ዝውውር ክፍያ",
				value: breakdown.totalFee,
				strong: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				label: "የዋስትና ፈንድ 2%",
				value: breakdown.securityFund
			}),
			breakdown.totalFee != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed tracking-wide text-muted uppercase",
				children: etbInWords(breakdown.totalFee)
			}) : null
		]
	});
}
function EntryForm({ onSaved }) {
	const draft = useLhria((s) => s.draft);
	const grades = useLhria((s) => s.grades);
	const editingId = useLhria((s) => s.editingId);
	const setDraft = useLhria((s) => s.setDraft);
	const clearDraft = useLhria((s) => s.clearDraft);
	const saveRecord = useLhria((s) => s.saveRecord);
	const [note, setNote] = (0, import_react.useState)(null);
	const breakdown = (0, import_react.useMemo)(() => calculate(draft, grades), [draft, grades]);
	const other = draft.propertyType === TYPE_OTHER;
	const apt = draft.propertyType === TYPE_APT;
	const condo = draft.propertyType === TYPE_CONDO;
	const ec = formatEc(draft.orderDate);
	function save() {
		const fcnDigits = draft.fcn.replace(/\D/g, "");
		if (fcnDigits && fcnDigits.length !== 16) {
			setNote({
				tone: "bad",
				text: "የፋይዳ ቁጥር 16 አሃዝ መሆን አለበት።"
			});
			return;
		}
		const result = saveRecord();
		if (result.error) {
			setNote({
				tone: "bad",
				text: result.error
			});
			return;
		}
		const resale = result.resale ? " ይህ የይዞታ መለያ ቀድሞ ተመዝግቦ ነበር — እንደ ተከታይ ሽያጭ ተቀምጧል።" : "";
		setNote({
			tone: "good",
			text: `ተመዝግቧል። መለያ ${result.id} · ክፍያ ${formatBirr(breakdown.totalFee)} ብር።${resale}`
		});
		if (result.id) onSaved(result.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: (event) => {
				event.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print sticky top-14 z-10 rounded-xl border border-primary/30 bg-primary px-4 py-3 text-primary-fg shadow-sm lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide uppercase",
							children: "ለስም ማዛወሪያ የሚከፈል ጠቅላላ ክፍያ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl tabular-nums",
							children: formatBirr(breakdown.totalFee)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-primary-fg/80",
							children: ["ዋስትና ፈንድ ", formatBirr(breakdown.securityFund)]
						})
					]
				}),
				editingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, {
					tone: "plain",
					children: [
						"እየታረመ ያለ መዝገብ፡ ",
						editingId,
						"። ማስቀመጥ ያለውን ክፍያ እንደገና ያሰላል።"
					]
				}) : null,
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
					tone: note.tone,
					children: note.text
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "የአገልግሎት ጠያቂ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								className: "sm:col-span-2",
								label: "የስመ-ንብረት የሚደረግለት አካል ሙሉ ሥም",
								value: draft.ownerName,
								onChange: (ownerName) => setDraft({ ownerName })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "ወረዳ",
								value: draft.woreda,
								options: WOREDAS,
								onChange: (woreda) => setDraft({ woreda })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "ስልክ ቁጥር",
								value: draft.phone,
								inputMode: "tel",
								onChange: (phone) => setDraft({ phone })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								className: "sm:col-span-2",
								label: "የፋይዳ ቁጥር",
								hint: "16 አሃዝ። በደረሰኝ ላይ በአራት እየተከፈለ ይታያል።",
								value: draft.fcn,
								inputMode: "numeric",
								onChange: (fcn) => setDraft({ fcn: fcn.replace(/\D/g, "").slice(0, 16) })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "ቦታውን የሚመለከት መረጃ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "የይዞታው ልዩ መለያ ቁጥር",
								value: draft.propertyId,
								onChange: (propertyId) => setDraft({ propertyId })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የንብረት ዓይነት",
								value: draft.propertyType,
								options: PROPERTY_TYPES,
								onChange: (propertyType) => setDraft({ propertyType })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "መብት የሚተላለፍበት ምክንያት",
								value: draft.reason,
								options: REASONS,
								onChange: (reason) => setDraft({ reason })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የቦታው ደረጃ",
								value: draft.landGrade,
								options: grades.map((row) => row.grade),
								onChange: (landGrade) => setDraft({ landGrade }),
								hint: breakdown.grade ? `የቦታ መገኛ ዋጋ ${formatBirr(breakdown.grade.location)} ብር / ሜ²` : void 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "የንብረቱ የቀድሞ የሽያጭ ዋጋ",
								suffix: "ብር",
								value: draft.previousPrice,
								onChange: (previousPrice) => setDraft({ previousPrice })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "አሁን የቀረበ የሽያጭ ዋጋ",
								suffix: "ብር",
								value: draft.currentPrice,
								onChange: (currentPrice) => setDraft({ currentPrice })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ጠቅላላ የቦታ ስፋት",
								suffix: "ሜ²",
								disabled: !other && draft.propertyType !== "",
								value: draft.landArea,
								onChange: (landArea) => setDraft({ landArea })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የቦታ ስሪት",
								value: draft.tenure,
								options: TENURES,
								onChange: (tenure) => setDraft({ tenure })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የይዞታው አገልግሎት (በካርታ)",
								value: draft.usePlan,
								options: PLAN_USES,
								onChange: (usePlan) => setDraft({ usePlan })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የይዞታው አገልግሎት (በአካል)",
								value: draft.usePhysical,
								options: PHYSICAL_USES,
								onChange: (usePhysical) => setDraft({ usePhysical })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "ግንባታውን የሚመለከት መረጃ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ከጭቃ የተሠራ (G+0) ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !other && draft.propertyType !== "",
								value: draft.mudG0,
								onChange: (mudG0) => setDraft({ mudG0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ከብሎኬት የተሠራ (G+0) ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !other && draft.propertyType !== "",
								value: draft.hcbG0,
								onChange: (hcbG0) => setDraft({ hcbG0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ከብሎኬት የተሠራ (G+1 - G+5) ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !other && draft.propertyType !== "",
								value: draft.hcbG1,
								onChange: (hcbG1) => setDraft({ hcbG1 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ከብሎኬት የተሠራ (>=G+6) ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !other && draft.propertyType !== "",
								value: draft.hcbG6,
								onChange: (hcbG6) => setDraft({ hcbG6 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "አፓርትመንት ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !apt && draft.propertyType !== "",
								value: draft.apartment,
								onChange: (apartment) => setDraft({ apartment })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "ኮንዶሚኒየም ቤት ስፋት",
								suffix: "ሜ²",
								disabled: !condo && draft.propertyType !== "",
								value: draft.condo,
								onChange: (condoArea) => setDraft({ condo: condoArea })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "ክፍያ እና አዘጋጅ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "የንብረት ባለቤትነት ድርሻ መጠን በ %",
								suffix: "%",
								hint: "ሙሉ ይዞታ 100። ግማሽ 50። የቴምብርና የአሹራ በዚህ ድርሻ ይባዛሉ።",
								value: draft.sharePercent,
								onChange: (sharePercent) => setDraft({ sharePercent })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								label: "የክፍያ ሁኔታ",
								value: draft.paymentStatus,
								options: PAYMENT_STATUSES,
								placeholder: "የሚከፈል",
								onChange: (paymentStatus) => {
									if (paymentStatus === "የሚከፈል" || paymentStatus === "የተከፈለ" || paymentStatus === "ያልተከፈለ") setDraft({ paymentStatus });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "ክፍያው የታዘዘበት ቀን",
								hint: ec ? `${ec}` : "ቀን/ወር/ዓመት እ.ኤ.አ. ለምሳሌ 20/09/2026",
								value: draft.orderDate,
								onChange: (orderDate) => setDraft({ orderDate })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "ያዘጋጀው ባለሙያ ሥም",
								value: draft.officer,
								onChange: (officer) => setDraft({ officer })
							})
						]
					})
				}),
				breakdown.messages.length > 0 && breakdown.totalFee == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
					tone: "bad",
					children: breakdown.messages[0]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-print flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							tone: "primary",
							children: editingId ? "መዝገቡን ያድሱ" : "ወደ መዝገብ ጨምር"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => {
								clearDraft();
								setNote(null);
							},
							children: "አጽዳ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ghost",
							onClick: () => {
								const sample = workedExample();
								setDraft(sample);
								setNote({
									tone: "good",
									text: "የናሙና ይዞታ ተሞልቷል። ከማስቀመጥዎ በፊት ይመልከቱ።"
								});
							},
							children: "የናሙና ይዞታ"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-20 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "የክፍያ ማጠቃለያ",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 font-serif text-3xl tabular-nums text-primary",
						children: formatBirr(breakdown.totalFee)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-xs leading-relaxed text-muted",
						children: etbInWords(breakdown.totalFee)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeeSummary, { breakdown })
				]
			})
		})]
	});
}
var STEPS = [
	{
		n: "01",
		title: "ይግቡ",
		body: "የተጠቃሚ ስም እና የይለፍ ቃል ያስገቡ። ስልጣኑ የሚከፍተውን ገጽ ብቻ ያያሉ፡፡ Authorized User መግቢያ፣ መዝገብ እና ሪፖርት። Admin Level 1 ተጠቃሚ ይጨምራል። Admin Level 2 የቦታ ደረጃ ተመን ያስተካክላል።"
	},
	{
		n: "02",
		title: "መረጃ ያስገቡ",
		body: "የተላላፊው ስም፣ የይዞታ መለያ፣ የንብረት ዓይነት፣ የዝውውር ምክንያት፣ የቦታ ደረጃ እና የባለቤትነት ድርሻ ይሙሉ። ክፍያው ከመመሪያው ተመን ጋር ወዲያውኑ ይሰላል።"
	},
	{
		n: "03",
		title: "ወደ መዝገብ ያስገቡ",
		body: "Add to registry ልዩ የግብይት መለያ ይሰጣል፣ ያዘጋጀውን ሰው ይመዘግባል፣ እና ተመሳሳይ የይዞታ መለያ እንደገና ሲገባ እንደ ተከታይ ሽያጭ ያስታውቃል።"
	},
	{
		n: "04",
		title: "ደረሰኝና ሪፖርት",
		body: "የክፍያ ቅጽ እና የዋስትና ፈንድ ቅጽ ለህትመት ወይም ለPDF ይከፈታሉ። ወርሃዊ ሪፖርቱ በኢትዮጵያ ዘመን አቆጣጠር ወር እና ዓመት ይጣራል።"
	}
];
function Guide({ onEnter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest text-primary uppercase",
					children: SUBCITY
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-serif text-2xl leading-snug",
					children: OFFICE_AM
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: "የሥም ዝዉዉር ክፍያ ስሌት። የቦታ ዋጋ በቦታ ደረጃ እና የግንባታ ነጠላ ዋጋ በካሬ ከመመሪያው ሰንጠረዥ ይወሰዳል። የቴምብር 2%፣ የአሹራ 4%፣ የአገልግሎት ክፍያዎች እና የዋስትና ፈንድ 2% በተመሳሳይ የቀድሞው ኤክሴል ስሌት ይሰራሉ።"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onEnter,
					className: "mt-4 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg",
					children: "ወደ መረጃ ገጽ"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed",
				children: "የስም ዝዉዉር ክፍያዉ የተሰላዉ «የቦታ ዋጋ በቦታ ደረጃ እና የግንባታ ነጠላ ዋጋ በካሬ» አግባብ የወጣዉን የመ/ቤቱን መመሪያ መነሻ በማድረግ ሲሆን፣ በማንኛዉም ጊዜ የመመሪያ ማሻሻያ በሚደረግበት ወቅት ይህን የስሌት ፕሮግራም በተሻሻለዉ የመመሪያ አግባብ መሰረት ማሻሻያ (ማስተካከያ) ሳይደረግበት መጠቀም ለስህተት እና ለከፍተኛ ኪሳራ ያጋልጣል።"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-primary",
							children: step.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-semibold",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: step.body
						})
					]
				}, step.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "የስልጣን ደረጃ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-medium",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-medium",
										children: "ይችላል"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "አይችልም"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3 font-medium",
										children: "Authorized User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: "መግቢያ፣ መዝገብ፣ ደረሰኝ፣ ሪፖርት፣ የራሱን የይለፍ ቃል መቀየር"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: "ተጠቃሚ መጨመር፣ መዝገብ መሰረዝ፣ ተመን መቀየር"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3 font-medium",
										children: "Admin Level 1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: "ከላይ ያለው ሁሉ፣ ተጠቃሚ መመዝገብ፣ የይለፍ ቃል መቀየር፣ መዝገብ መሰረዝ፣ ተመን ማየት"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: "የቦታ ደረጃ ተመን ማስተካከል"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3 font-medium",
									children: "Admin Level 2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-3",
									children: "ሙሉ መዳረሻ። መመሪያ ሲቀየር የካሬ ዋጋውን እዚህ ያድሱ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3",
									children: "—"
								})
							] })
						] })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted",
				children: "መዝገቡ በዚህ መሣሪያ ላይ ይቀመጣል። ስራ ከመጨረሻ በፊት ከመዝገብ ገጽ Backup ወስደው ይቆዩ፣ ከዚያ Logout ይጫኑ። By Habtie A. · +2519 11072173"
			})
		]
	});
}
var FIELDS = [
	{
		key: "location",
		label: "የቦታ መገኛ"
	},
	{
		key: "mud",
		label: "ጭቃ G+0"
	},
	{
		key: "hcbG0",
		label: "ብሎኬት G+0"
	},
	{
		key: "hcbG1",
		label: "G+1–5"
	},
	{
		key: "hcbG6",
		label: "≥G+6"
	},
	{
		key: "apartment",
		label: "አፓርትመንት"
	},
	{
		key: "condo",
		label: "ኮንዶሚኒየም"
	},
	{
		key: "inheritG0",
		label: "ውርስ G+0"
	},
	{
		key: "inheritG1",
		label: "ውርስ ≥G+1"
	},
	{
		key: "inheritApt",
		label: "ውርስ አፓ."
	},
	{
		key: "inheritCondo",
		label: "ውርስ ኮን."
	}
];
function RatesPanel() {
	const role = useLhria((s) => s.session?.role);
	const grades = useLhria((s) => s.grades);
	const setGrades = useLhria((s) => s.setGrades);
	const resetGrades = useLhria((s) => s.resetGrades);
	const editable = canEditRates(role);
	const [rows, setRows] = (0, import_react.useState)(grades);
	const [saved, setSaved] = (0, import_react.useState)(false);
	function update(index, key, raw) {
		const next = Number(raw);
		if (!Number.isFinite(next)) return;
		setRows((current) => current.map((row, i) => i === index ? {
			...row,
			[key]: next
		} : row));
		setSaved(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
				tone: editable ? "bad" : "plain",
				children: editable ? "Admin Level 2። መመሪያው ሲቀየር ብቻ ይህን ሰንጠረዥ ያስተካክሉ። ያለ ማሻሻያ መጠቀም ለስህተት እና ለኪሳራ ያጋልጣል።" : "ተመኑ ተቆልፏል። ማየት ይችላሉ፤ ማስተካከል የሚችለው Admin Level 2 ብቻ ነው።"
			}),
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
				tone: "good",
				children: "የካሬ ዋጋው ተቀምጧል። አዲስ ስሌት ይህን ይጠቀማል።"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto rounded-xl border border-line bg-surface lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[64rem] text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "ደረጃ"
							}), FIELDS.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 font-medium",
								children: field.label
							}, field.key))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-1.5 font-semibold",
							children: row.grade
						}), FIELDS.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full min-w-16 rounded border border-line bg-paper px-1 py-1 tabular-nums disabled:border-transparent disabled:bg-transparent",
								disabled: !editable,
								value: row[field.key],
								inputMode: "decimal",
								onChange: (event) => update(index, field.key, event.target.value)
							})
						}, field.key))]
					}, row.grade)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 lg:hidden",
				children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-serif text-lg",
						children: ["ደረጃ ", row.grade]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: FIELDS.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-xs",
							children: [field.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "min-h-11 rounded-lg border border-line bg-paper px-2 tabular-nums disabled:bg-paper",
								disabled: !editable,
								value: row[field.key],
								inputMode: "decimal",
								onChange: (event) => update(index, field.key, event.target.value)
							})]
						}, field.key))
					})]
				}, row.grade))
			}),
			editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "primary",
					onClick: () => {
						setGrades(rows);
						setSaved(true);
					},
					children: "ተመኑን አስቀምጥ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						resetGrades();
						setRows(useLhria.getState().grades);
						setSaved(false);
					},
					children: "ወደ መመሪያው መልስ"
				})]
			}) : null
		]
	});
}
function Mark({ ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: ok ? "text-primary" : "text-accent",
		children: ok ? "✓" : "✗"
	});
}
function Row({ label, value }) {
	const filled = value.trim() !== "" && value !== "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-line py-1.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-right font-medium",
			children: [
				filled ? value : "—",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { ok: filled })
			]
		})]
	});
}
function Receipt({ focusId }) {
	const records = useLhria((s) => s.records);
	const grades = useLhria((s) => s.grades);
	const draft = useLhria((s) => s.draft);
	const [picked, setPicked] = (0, import_react.useState)(focusId ?? "draft");
	const [kind, setKind] = (0, import_react.useState)("fee");
	const activeId = records.some((item) => item.id === picked) || picked === "draft" ? picked : "draft";
	const record = records.find((item) => item.id === activeId) ?? null;
	const source = record ?? draft;
	const breakdown = (0, import_react.useMemo)(() => calculate(source, grades), [source, grades]);
	const titleId = record?.id ?? "DRAFT";
	function printSheet(next) {
		setKind(next);
		document.title = `LHRIA_${titleId}_${next === "fee" ? "TF" : "SF"}`;
		window.setTimeout(() => window.print(), 60);
	}
	const otherArea = (source.mudG0 ?? 0) + (source.hcbG0 ?? 0) + (source.hcbG1 ?? 0) + (source.hcbG6 ?? 0);
	const words = etbInWords(breakdown.totalFee);
	const fundWords = etbInWords(breakdown.securityFund);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex w-full flex-col gap-1.5 sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: "ደረሰኝ የሚወጣለት መዝገብ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: activeId,
					onChange: (event) => setPicked(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "draft",
						children: "ያልተቀመጠው ረቂቅ"
					}), records.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: item.id,
						children: [
							item.id,
							" · ",
							item.ownerName
						]
					}, item.id))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: kind === "fee" ? "primary" : "line",
						onClick: () => setKind("fee"),
						children: "የክፍያ ቅጽ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: kind === "fund" ? "primary" : "line",
						onClick: () => setKind("fund"),
						children: "የዋስትና ፈንድ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "accent",
						onClick: () => printSheet(kind),
						children: "PDF / አትም"
					})
				]
			})]
		}), kind === "fee" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "print-sheet rounded-xl border border-line bg-surface p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-ink pb-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide",
							children: OFFICE_AM
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-serif text-xl",
							children: [
								"የ ",
								SUBCITY,
								" ክ/ከተማ ቅ/ጽ/ቤት"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl",
							children: "የሥም ዝዉዉር ክፍያ ማጠናቀሪያ ቅፅ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: ["Transaction ", titleId]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "የአገልግሎት ጠያቂ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ሙሉ ስም",
								value: source.ownerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ክፍለ ከተማ",
								value: SUBCITY
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ወረዳ",
								value: source.woreda
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ስልክ",
								value: source.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ፋይዳ",
								value: formatFcn(source.fcn)
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "ቦታ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ልዩ መለያ",
								value: source.propertyId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ዓይነት",
								value: source.propertyType
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ምክንያት",
								value: source.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የቀድሞ ዋጋ",
								value: formatBirr(source.previousPrice)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የአሁን ዋጋ",
								value: formatBirr(source.currentPrice)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የቦታ ስፋት",
								value: source.propertyType === TYPE_OTHER ? formatBirr(source.landArea) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ስሪት",
								value: source.tenure
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ደረጃ",
								value: source.landGrade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "አገልግሎት በካርታ",
								value: source.usePlan
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "አገልግሎት በአካል",
								value: source.usePhysical
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "ግንባታ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ጭቃ G+0",
								value: source.propertyType === TYPE_OTHER ? formatBirr(source.mudG0) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ብሎኬት G+0",
								value: source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG0) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ብሎኬት G+1–5",
								value: source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG1) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ብሎኬት ≥G+6",
								value: source.propertyType === TYPE_OTHER ? formatBirr(source.hcbG6) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ጠቅላላ ሌላ ቤት",
								value: source.propertyType === TYPE_OTHER ? formatBirr(otherArea) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "አፓርትመንት",
								value: source.propertyType === TYPE_APT ? formatBirr(source.apartment) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ኮንዶሚኒየም",
								value: source.propertyType === TYPE_CONDO ? formatBirr(source.condo) : "—"
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 border-t border-ink pt-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 font-semibold",
								children: "የታክስ እና የአገልግሎት ክፍያዎች"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የሰነድ ማጣራት",
								value: formatBirr(breakdown.documentFee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የመሀንዲስ አገልግሎት",
								value: formatBirr(breakdown.engineerFee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የባላቤትነት መመዝገቢያ",
								value: formatBirr(breakdown.registrationFee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "የይዞታ ማረጋገጫ",
								value: formatBirr(breakdown.certificateFee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "ቴምብር 2%",
								value: formatBirr(breakdown.stampDuty)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "አሹራ 4%",
								value: formatBirr(breakdown.ashura)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-serif text-2xl tabular-nums",
								children: [formatBirr(breakdown.totalFee), " ብር"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed tracking-wide uppercase",
								children: words
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									"ድርሻ ",
									source.sharePercent ?? "—",
									"% · ለክፍያ የዋለው ዋጋ ",
									formatBirr(breakdown.basis),
									breakdown.basisLabel ? ` (${breakdown.basisLabel})` : ""
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 font-semibold",
								children: "ያዘጋጀው ባለሙያ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["ስም፡ ", source.officer || "—"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6",
								children: "ፊርማ፡ ______________________"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4",
								children: ["ቀን፡ ", formatEc(source.orderDate) || source.orderDate]
							}),
							record && record.fee !== breakdown.totalFee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "no-print mt-4 text-xs text-accent",
								children: [
									"በመዝገብ የተቀመጠው ",
									formatBirr(record.fee),
									" ነው። ይህ ቅጽ አሁን ካለው ተመን ",
									formatBirr(breakdown.totalFee),
									" ያሳያል።"
								]
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs leading-relaxed",
					children: "ማሳሰቢያ፡ ገንዘቡ ገቢ የሚደረግበት አድራሻ NSL LANDHOLDING RIGIST INFO AGE · አካውንት 1000012950547 · ኢትዮጵያ ንግድ ባንክ። ገንዘቡ በባለይዞታው ወይም ክፍያ እንዲከፍል በታዘዘው ስም ብቻ ነው። በውክልና የሚከፈል ክፍያ ተቀባይነት የለውም።"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "print-sheet mx-auto w-full max-w-3xl rounded-xl border border-line bg-surface p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-ink pb-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs",
							children: "በአዲስ አበባ ከተማ አስተዳደር"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-serif text-lg",
							children: [SUBCITY, " ክ/ከተማ የመሬት ይዞታ ምዝገባ እና መረጃ ኤጄንሲ ቅ/ጽ/ቤት"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl",
							children: "የዋስትና ፈንድ ክፍያ ማጠናቀሪያ ቅፅ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: titleId
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ሙሉ ስም",
							value: source.ownerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ክፍለ ከተማ",
							value: SUBCITY
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ወረዳ",
							value: source.woreda
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ስልክ",
							value: source.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ፋይዳ",
							value: formatFcn(source.fcn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ከአፓርትመንት ውጪ ስፋት",
							value: formatBirr(otherArea)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "አፓርትመንት",
							value: formatBirr(source.apartment)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ኮንዶሚኒየም",
							value: formatBirr(source.condo)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ልዩ መለያ",
							value: source.propertyId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ዓይነት",
							value: source.propertyType
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ምክንያት",
							value: source.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "የቀድሞ ዋጋ",
							value: formatBirr(source.previousPrice)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "የአሁን ዋጋ",
							value: formatBirr(source.currentPrice)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "የቦታ ስፋት",
							value: formatBirr(source.landArea)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ስሪት",
							value: source.tenure
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ደረጃ",
							value: source.landGrade
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "በካርታ",
							value: source.usePlan
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "በአካል",
							value: source.usePhysical
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border-t border-ink pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "ለስም ዝውውሩ የሚከፈል ጠቅላላ ክፍያ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-serif text-2xl tabular-nums",
							children: [formatBirr(breakdown.totalFee), " ብር"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide uppercase",
							children: words
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "ለዋስትና ፈንድ የሚከፈል ጠቅላላ ክፍያ (2%)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-serif text-2xl tabular-nums",
							children: [formatBirr(breakdown.securityFund), " ብር"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide uppercase",
							children: fundWords
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-sm",
							children: ["ስም፡ ", source.officer || "—"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm",
							children: "ፊርማ፡ ______________________"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm",
							children: ["ቀን፡ ", formatEc(source.orderDate) || source.orderDate]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs leading-relaxed",
					children: "ማሳሰቢያ፡ የስም ማዛወሪያ ከፋዩ ገዥ ሲሆን ገንዘቡ ገቢ የሚደረግበት አድራሻ የአዲስ አበባ ከተማ አስተዳደር የመሬት ይዞታ ምዝገባና መረጃ ኤጄንሲ · አካውንት በመመሪያው የተሰጠው · ኢትዮጵያ ንግድ ባንክ። ገንዘቡ ይዞታው በሚተላለፍለት ወይም በገዥ ስም ብቻ መግባት አለበት።"
				})
			]
		})]
	});
}
function Registry({ onEdit, onOpen }) {
	const records = useLhria((s) => s.records);
	const grades = useLhria((s) => s.grades);
	const role = useLhria((s) => s.session?.role);
	const deleteRecord = useLhria((s) => s.deleteRecord);
	const setPayment = useLhria((s) => s.setPayment);
	const importBackup = useLhria((s) => s.importBackup);
	const [query, setQuery] = (0, import_react.useState)("");
	const [auditId, setAuditId] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return records;
		return records.filter((record) => record.propertyId.toLowerCase().includes(q) || record.ownerName.toLowerCase().includes(q) || record.id.toLowerCase().includes(q) || record.woreda.toLowerCase().includes(q));
	}, [records, query]);
	const audit = records.find((record) => record.id === auditId) ?? null;
	const live = audit ? calculate(audit, grades) : null;
	function exportFile() {
		const payload = {
			kind: "lhria-backup",
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			grades: role === "Admin Level 2" ? grades : void 0,
			records
		};
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `LHRIA_registry_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex w-full flex-col gap-1.5 sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "ፈልግ · መለያ፣ ስም ወይም የግብይት ቁጥር"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: query,
						placeholder: "AA00002127",
						onChange: (event) => setQuery(event.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: exportFile,
						children: "Backup"
					}), canDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold",
						children: ["Restore", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "application/json",
							className: "sr-only",
							onChange: (event) => {
								const file = event.target.files?.[0];
								event.target.value = "";
								if (!file) return;
								const reader = new FileReader();
								reader.onload = () => {
									try {
										const payload = JSON.parse(String(reader.result));
										const result = importBackup(payload);
										setNote(result.error ?? `${result.added} አዲስ መዝገብ ገብቷል።`);
									} catch {
										setNote("ፋይሉ አልተነበበም።");
									}
								};
								reader.readAsText(file);
							}
						})]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-muted",
				children: [records.length, " መዝገብ በዚህ መሣሪያ ላይ ተቀምጧል። ወደ ሌላ ኮምፒውተር ለማዛወር Backup ይውሰዱ።"]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
				tone: "plain",
				children: note
			}) : null,
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-muted",
				children: "የሚታይ መዝገብ የለም። ከመግቢያ ገጽ ይጨምሩ ወይም ከሪፖርት የናሙና ይዞታዎችን ያስገቡ።"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: rows.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-lg leading-snug",
								children: record.ownerName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									record.propertyId,
									" · ",
									record.propertyType || "—",
									" · ",
									record.woreda || "ወረዳ ያልተሞላ"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl tabular-nums",
								children: formatBirr(record.fee)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								record.id,
								" · ",
								formatEc(record.orderDate) || record.orderDate,
								" · ",
								record.createdBy
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "min-h-11 rounded-lg border border-line bg-paper px-2 text-sm",
									value: record.paymentStatus,
									onChange: (event) => setPayment(record.id, event.target.value),
									children: PAYMENT_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: status,
										children: status
									}, status))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									tone: "primary",
									onClick: () => onOpen(record.id),
									children: "ደረሰኝ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => onEdit(record),
									children: "አርም"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									tone: "ghost",
									onClick: () => setAuditId(record.id),
									children: "ኦዲት"
								}),
								canDelete(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									tone: "ghost",
									onClick: () => {
										if (window.confirm(`መዝገብ ${record.id} ይሰረዝ?`)) deleteRecord(record.id);
									},
									children: "ሰርዝ"
								}) : null
							]
						})
					]
				}, record.id))
			}),
			audit && live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-serif text-lg",
							children: ["የክፍያ ኦዲት · ", audit.propertyId]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ghost",
							onClick: () => setAuditId(null),
							children: "ዝጋ"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: audit.ownerName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid gap-2 text-sm sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "በመዝገብ የተቀመጠ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums",
							children: [formatBirr(audit.fee), " ብር"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "አሁን ካለው ተመን"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums",
							children: [formatBirr(live.totalFee), " ብር"]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-3 text-sm font-medium ${feesMatch(audit.fee, live.totalFee) ? "text-primary" : "text-accent"}`,
						children: feesMatch(audit.fee, live.totalFee) ? "ተመሳሳይ ነው። የተቀመጠው ክፍያ ከአሁኑ ስሌት ጋር ይጣጣማል።" : `ልዩነት ${formatBirr((live.totalFee ?? 0) - audit.fee)} ብር። ተመኑ ከተቀየረ መዝገቡን አድሰው።`
					})
				]
			}) : null
		]
	});
}
var NAV = [
	{
		id: "guide",
		label: "መመሪያ",
		en: "Guide",
		icon: BookOpen
	},
	{
		id: "entry",
		label: "መግቢያ",
		en: "Entry",
		icon: PenLine
	},
	{
		id: "registry",
		label: "መዝገብ",
		en: "Registry",
		icon: Library
	},
	{
		id: "receipt",
		label: "ደረሰኝ",
		en: "Receipt",
		icon: ScrollText
	},
	{
		id: "report",
		label: "ሪፖርት",
		en: "Report",
		icon: ChartColumn
	},
	{
		id: "rates",
		label: "ተመን",
		en: "Rates",
		icon: Table2,
		admin: "rates"
	},
	{
		id: "accounts",
		label: "ተጠቃሚ",
		en: "Accounts",
		icon: KeyRound,
		admin: "users"
	}
];
function Login() {
	const login = useLhria((s) => s.login);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-4 py-10 lg:flex-row lg:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
					children: "Addis Ababa LHRIA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl leading-tight",
					children: "የሥም ዝዉዉር ክፍያ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-lg text-muted",
					children: [SUBCITY, " ክፍለ ከተማ"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-sm leading-relaxed",
					children: "Property transaction fee, stamp duty, ashura and security fund — calculated from the land-grade directive used by the Nefas Silk Lafto landholding office."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-md rounded-2xl border border-line bg-surface p-5 shadow-sm",
			onSubmit: (event) => {
				event.preventDefault();
				const message = login(username, password);
				setError(message);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "System login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Username",
							value: username,
							autoComplete: "username",
							onChange: setUsername
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoComplete: "current-password",
								className: "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base outline-none focus-visible:border-primary",
								value: password,
								onChange: (event) => setPassword(event.target.value)
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							tone: "bad",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							tone: "primary",
							className: "w-full",
							children: "ግባ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "mt-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer text-muted",
						children: "የመዝገብ ስሞች ከወርክቡክ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-xs leading-relaxed",
						children: SEED_USERS.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: user.username
							}),
							" · ",
							user.password,
							" · ",
							user.role
						] }, user.username))
					})]
				})
			]
		})]
	});
}
function LhriaApp() {
	const session = useLhria((s) => s.session);
	const logout = useLhria((s) => s.logout);
	const replaceDraft = useLhria((s) => s.replaceDraft);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("guide");
	const [focusId, setFocusId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const persist = useLhria.persist;
		if (persist.hasHydrated()) {
			setReady(true);
			return;
		}
		const unsub = persist.onFinishHydration(() => setReady(true));
		persist.rehydrate();
		return unsub;
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-3xl text-primary",
			children: "LHRIA"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "የስም ዝውውር ክፍያ በመከፈት ላይ…"
		})]
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Login, {});
	const items = NAV.filter((item) => {
		if (item.admin === "rates") return canViewRates(session.role);
		if (item.admin === "users") return canManageUsers(session.role);
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate font-serif text-lg leading-none",
							children: ["LHRIA · ", SUBCITY]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted",
							children: [
								session.fullName,
								" · ",
								session.role
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							logout();
							setView("guide");
						},
						className: "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold hover:bg-ink/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							className: "size-4",
							"aria-hidden": true
						}), "Logout"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl lg:grid-cols-[13rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "no-print hidden gap-1 p-4 lg:flex lg:flex-col",
					children: items.map((item) => {
						const Icon = item.icon;
						const active = view === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView(item.id),
							className: clsx("flex min-h-11 items-center gap-2 rounded-lg px-3 text-left text-sm", active ? "bg-primary text-primary-fg" : "hover:bg-ink/5"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: clsx("block text-xs", active ? "text-primary-fg/80" : "text-muted"),
								children: item.en
							})] })]
						}, item.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "px-4 py-4 pb-28 lg:py-6 lg:pb-10",
					children: [
						view === "guide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, { onEnter: () => setView("entry") }) : null,
						view === "entry" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryForm, { onSaved: (id) => {
							setFocusId(id);
						} }) : null,
						view === "registry" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Registry, {
							onEdit: (record) => {
								replaceDraft(record, record.id);
								setView("entry");
							},
							onOpen: (id) => {
								setFocusId(id);
								setView("receipt");
							}
						}) : null,
						view === "receipt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { focusId }) : null,
						view === "report" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) : null,
						view === "rates" && canViewRates(session.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatesPanel, {}) : null,
						view === "accounts" && canManageUsers(session.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accounts, {}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex overflow-x-auto",
					children: items.map((item) => {
						const Icon = item.icon;
						const active = view === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "min-w-[4.5rem] flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView(item.id),
								className: clsx("flex min-h-14 w-full flex-col items-center justify-center gap-0.5 text-xs", active ? "text-primary" : "text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									"aria-hidden": true
								}), item.label]
							})
						}, item.id);
					})
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LhriaApp, {});
}
//#endregion
export { Home as component };
