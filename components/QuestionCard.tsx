import { QuizQuestion, QuizUnit } from "@/data/quizData";
import { AREA_LABELS } from "@/lib/quizUtils";
import PassageBox from "./PassageBox";

type Props = {
  unit: QuizUnit;
  question: QuizQuestion;
  current: number;
  total: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
  canPrev: boolean;
};

export default function QuestionCard({
  unit,
  question,
  current,
  total,
  selectedIndex,
  onSelect,
  onPrev,
  onNext,
  onHome,
  canPrev
}: Props) {
  const answered = selectedIndex !== undefined;

  return (
    <main className="mx-auto w-full max-w-md px-4 py-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-violet-600">
            <span>✨</span>
            <span>Ella Weekly Test Maker</span>
          </div>
          <button
            onClick={onHome}
            className="rounded-full bg-slate-100 px-3 py-2 text-sm font-black text-slate-700"
          >
            홈
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-violet-50 p-3 text-sm font-black text-violet-700">
          {unit.unitTitle}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-black text-slate-500">
          <span>{AREA_LABELS[question.section]}</span>
          <span>{current} / {total}</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>

        {question.section !== "vocabulary" && (
          <div className="mt-5">
            <PassageBox question={question} unit={unit} />
          </div>
        )}

        <span className="mt-5 inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-extrabold text-violet-700">
          {question.questionType}
        </span>

        <h2 className="mt-3 text-2xl font-black leading-snug text-slate-900">
          Q{current}. {question.question}
        </h2>

        {question.section === "vocabulary" && question.hintKo && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base font-bold leading-relaxed text-amber-800">
            💡 힌트: {question.hintKo}
          </div>
        )}

        <div className="mt-5 grid gap-3">
          {question.choices.map((choice, index) => {
            const correct = answered && index === question.answerIndex;
            const wrong = answered && index === selectedIndex && index !== question.answerIndex;
            const meaning = question.choiceMeanings?.[index];

            return (
              <button
                key={`${question.id}-${choice}`}
                disabled={answered}
                onClick={() => onSelect(index)}
                className={`rounded-3xl border-2 px-4 py-4 text-left transition ${
                  correct
                    ? "border-green-400 bg-green-50 text-green-800"
                    : wrong
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-base font-black text-slate-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xl font-black leading-snug">{choice}</p>
                    {answered && meaning && (
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-base font-bold leading-snug">
                        {correct && (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-black text-green-700">
                            정답
                          </span>
                        )}
                        {wrong && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-black text-red-700">
                            오답
                          </span>
                        )}
                        <span className={correct ? "text-green-700" : wrong ? "text-red-700" : "text-slate-600"}>
                          뜻: {meaning}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-5 rounded-3xl bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
            <p className="font-extrabold text-amber-700">해설</p>
            <p className="mt-1">{question.explanationKo}</p>
            {question.evidence && (
              <div className="mt-3 border-t border-amber-200 pt-3">
                <p className="font-bold text-slate-800">
                  본문 Lesson: {question.section === "reading1" ? "Reading 1" : "Reading 2"} · {question.readingTitle}
                </p>
                <p className="mt-1 italic">“{question.evidence}”</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="rounded-full border border-slate-200 bg-white py-4 font-black text-slate-700 disabled:bg-slate-100 disabled:text-slate-300"
          >
            이전 문제
          </button>
          <button
            onClick={onNext}
            className="rounded-full bg-violet-600 py-4 font-black text-white shadow-lg shadow-violet-200"
          >
            {current === total ? "결과 보기" : "다음 문제"}
          </button>
        </div>
      </section>
    </main>
  );
}
