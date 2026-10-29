import { OFFICE_AM, SUBCITY } from "@/lib/lhria/types";
import { Panel } from "./fields";

const STEPS = [
  {
    n: "01",
    title: "ይግቡ",
    body: "የተጠቃሚ ስም እና የይለፍ ቃል ያስገቡ። ስልጣኑ የሚከፍተውን ገጽ ብቻ ያያሉ፡፡ Authorized User መግቢያ፣ መዝገብ እና ሪፖርት። Admin Level 1 ተጠቃሚ ይጨምራል። Admin Level 2 የቦታ ደረጃ ተመን ያስተካክላል።",
  },
  {
    n: "02",
    title: "መረጃ ያስገቡ",
    body: "የተላላፊው ስም፣ የይዞታ መለያ፣ የንብረት ዓይነት፣ የዝውውር ምክንያት፣ የቦታ ደረጃ እና የባለቤትነት ድርሻ ይሙሉ። ክፍያው ከመመሪያው ተመን ጋር ወዲያውኑ ይሰላል።",
  },
  {
    n: "03",
    title: "ወደ መዝገብ ያስገቡ",
    body: "Add to registry ልዩ የግብይት መለያ ይሰጣል፣ ያዘጋጀውን ሰው ይመዘግባል፣ እና ተመሳሳይ የይዞታ መለያ እንደገና ሲገባ እንደ ተከታይ ሽያጭ ያስታውቃል።",
  },
  {
    n: "04",
    title: "ደረሰኝና ሪፖርት",
    body: "የክፍያ ቅጽ እና የዋስትና ፈንድ ቅጽ ለህትመት ወይም ለPDF ይከፈታሉ። ወርሃዊ ሪፖርቱ በኢትዮጵያ ዘመን አቆጣጠር ወር እና ዓመት ይጣራል።",
  },
];

export function Guide({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <Panel>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{SUBCITY}</p>
        <h2 className="mt-1 font-serif text-2xl leading-snug">{OFFICE_AM}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          የሥም ዝዉዉር ክፍያ ስሌት። የቦታ ዋጋ በቦታ ደረጃ እና የግንባታ ነጠላ ዋጋ በካሬ ከመመሪያው ሰንጠረዥ ይወሰዳል። የቴምብር 2%፣ የአሹራ 4%፣ የአገልግሎት ክፍያዎች እና የዋስትና ፈንድ 2% በተመሳሳይ የቀድሞው ኤክሴል ስሌት ይሰራሉ።
        </p>
        <button
          type="button"
          onClick={onEnter}
          className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg"
        >
          ወደ መረጃ ገጽ
        </button>
      </Panel>

      <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed">
        የስም ዝዉዉር ክፍያዉ የተሰላዉ «የቦታ ዋጋ በቦታ ደረጃ እና የግንባታ ነጠላ ዋጋ በካሬ» አግባብ የወጣዉን የመ/ቤቱን መመሪያ መነሻ በማድረግ ሲሆን፣ በማንኛዉም ጊዜ የመመሪያ ማሻሻያ በሚደረግበት ወቅት ይህን የስሌት ፕሮግራም በተሻሻለዉ የመመሪያ አግባብ መሰረት ማሻሻያ (ማስተካከያ) ሳይደረግበት መጠቀም ለስህተት እና ለከፍተኛ ኪሳራ ያጋልጣል።
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {STEPS.map((step) => (
          <article key={step.n} className="rounded-xl border border-line bg-surface p-4">
            <p className="font-serif text-primary">{step.n}</p>
            <h3 className="mt-1 font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
          </article>
        ))}
      </div>

      <Panel title="የስልጣን ደረጃ">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-muted">
              <tr className="border-b border-line">
                <th className="py-2 pr-3 font-medium">Role</th>
                <th className="py-2 pr-3 font-medium">ይችላል</th>
                <th className="py-2 font-medium">አይችልም</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-3 pr-3 font-medium">Authorized User</td>
                <td className="py-3 pr-3">መግቢያ፣ መዝገብ፣ ደረሰኝ፣ ሪፖርት፣ የራሱን የይለፍ ቃል መቀየር</td>
                <td className="py-3">ተጠቃሚ መጨመር፣ መዝገብ መሰረዝ፣ ተመን መቀየር</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3 pr-3 font-medium">Admin Level 1</td>
                <td className="py-3 pr-3">ከላይ ያለው ሁሉ፣ ተጠቃሚ መመዝገብ፣ የይለፍ ቃል መቀየር፣ መዝገብ መሰረዝ፣ ተመን ማየት</td>
                <td className="py-3">የቦታ ደረጃ ተመን ማስተካከል</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-medium">Admin Level 2</td>
                <td className="py-3 pr-3">ሙሉ መዳረሻ። መመሪያ ሲቀየር የካሬ ዋጋውን እዚህ ያድሱ</td>
                <td className="py-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="text-xs leading-relaxed text-muted">
        መዝገቡ በዚህ መሣሪያ ላይ ይቀመጣል። ስራ ከመጨረሻ በፊት ከመዝገብ ገጽ Backup ወስደው ይቆዩ፣ ከዚያ Logout ይጫኑ። By Habtie A. · +2519 11072173
      </p>
    </div>
  );
}
