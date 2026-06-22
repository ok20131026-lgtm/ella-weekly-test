import { QuizQuestion, QuizUnit } from "@/data/quizData";
import { AREA_LABELS } from "@/lib/quizUtils";
import PassageBox from "./PassageBox";

type Props = { unit: QuizUnit; question: QuizQuestion; current: number; total: number; selectedIndex?: number; onSelect: (index: number) => void; onPrev: () => void; onNext: () => void; canPrev: boolean };
export default function QuestionCard({ unit, question, current, total, selectedIndex, onSelect, onPrev, onNext, canPrev }: Props) {
  const answered = selectedIndex !== undefined;
  return <main className="mx-auto w-full max-w-md px-4 py-6"><section className="rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-200">
    <div className="flex items-center gap-2 text-sm font-extrabold text-violet-600"><span>✨</span><span>Ella Weekly Test Maker</span></div>
    <div className="mt-5 rounded-2xl bg-violet-50 p-3 text-sm font-black text-violet-700">{unit.unitTitle}</div>
    <div className="mt-4 flex items-center justify-between text-sm font-black text-slate-500"><span>{AREA_LABELS[question.section]}</span><span>{current} / {total}</span></div>
    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400" style={{ width: `${(current / total) * 100}%` }} /></div>
    {question.section !== "vocabulary" && <div className="mt-5"><PassageBox question={question} unit={unit} /></div>}
    <span className="mt-5 inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-extrabold text-violet-700">{question.questionType}</span>
    <h2 className="mt-3 text-2xl font-black leading-snug text-slate-900">Q{current}. {question.question}</h2>
    <div className="mt-5 grid gap-3">{question.choices.map((choice,index)=>{const correct=answered&&index===question.answerIndex; const wrong=answered&&index===selectedIndex&&index!==question.answerIndex; return <button key={`${question.id}-${choice}`} disabled={answered} onClick={()=>onSelect(index)} className={`rounded-3xl border-2 px-4 py-4 text-left text-base font-black transition ${correct ? "border-green-400 bg-green-100 text-green-800" : wrong ? "border-red-300 bg-red-100 text-red-700" : "border-slate-200 bg-white text-slate-800 hover:bg-violet-50"}`}><span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">{String.fromCharCode(65+index)}</span>{choice}</button>})}</div>
    {answered && <div className="mt-5 rounded-3xl bg-amber-50 p-4 text-sm leading-relaxed text-slate-700"><p className="font-extrabold text-amber-700">해설</p><p className="mt-1">{question.explanationKo}</p>{question.evidence && <div className="mt-3 border-t border-amber-200 pt-3"><p className="font-bold text-slate-800">본문 Lesson: {question.section === "reading1" ? "Reading 1" : "Reading 2"} · {question.readingTitle}</p><p className="mt-1 italic">“{question.evidence}”</p></div>}</div>}
    <div className="mt-5 grid grid-cols-2 gap-3"><button onClick={onPrev} disabled={!canPrev} className="rounded-full border border-slate-200 bg-white py-4 font-black text-slate-700 disabled:bg-slate-100 disabled:text-slate-300">이전 문제</button><button onClick={onNext} className="rounded-full bg-violet-600 py-4 font-black text-white shadow-lg shadow-violet-200">{current === total ? "결과 보기" : "다음 문제"}</button></div>
  </section></main>;
}
