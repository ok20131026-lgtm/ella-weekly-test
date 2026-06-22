import { QuizUnit, quizUnits } from "@/data/quizData";

type MainMenuProps = { bestScores: Record<string, number>; onStartUnit: (unit: QuizUnit) => void };

export default function MainMenu({ bestScores, onStartUnit }: MainMenuProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-6">
      <section className="w-full rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200">
        <div className="flex items-center gap-2 text-sm font-extrabold text-violet-600"><span>✨</span><span>Ella Weekly Test Maker</span></div>
        <div className="mt-8 text-center"><div className="text-6xl">📚</div><h1 className="mt-4 text-4xl font-black text-violet-600">Weekly Test</h1><p className="mt-3 text-sm font-bold text-slate-500">ESL Rainbows Orange Vol.2</p><p className="mt-5 text-base font-bold text-slate-700">유닛을 누르면 30문제가 바로 시작됩니다.</p></div>
        <div className="mt-8 grid gap-4">
          {quizUnits.map((unit) => {
            const locked = unit.status !== "active";
            return <button key={unit.unitId} onClick={() => !locked && onStartUnit(unit)} disabled={locked} className={`rounded-[2rem] border p-5 text-left shadow-sm transition ${locked ? "border-slate-200 bg-slate-50 opacity-60" : "border-violet-200 bg-violet-50 hover:-translate-y-0.5 hover:shadow-md"}`}>
              <div className="flex items-center gap-4"><span className="text-4xl">{locked ? "🔒" : "📘"}</span><div><p className="text-2xl font-black text-slate-900">{unit.unitTitle}</p><p className="mt-2 text-sm font-bold text-slate-500">{locked ? "교재 Lesson 1·2 본문 자료 추가 필요" : "단어 10 + Reading 1 10 + Reading 2 10"}</p><p className="mt-1 text-sm font-black text-violet-600">{locked ? "잠금" : `최고 점수 ${bestScores[unit.unitId] ?? 0} / ${unit.totalQuestions}`}</p></div></div>
            </button>;
          })}
        </div>
      </section>
    </main>
  );
}
